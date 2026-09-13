import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {progress} from '../src/progress-4b.js';

const origin = 'https://ej-learning.test';

function d1() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  sqlite.exec(fs.readFileSync(new URL('../migrations-staging-schema/0002_phase4a_email_auth.sql', import.meta.url), 'utf8'));
  sqlite.exec(`
    CREATE TABLE v2_vocabulary_items (
      id TEXT PRIMARY KEY, language TEXT NOT NULL, lemma TEXT NOT NULL,
      publication_state TEXT NOT NULL
    );
    CREATE TABLE v2_grammar_points (
      id TEXT PRIMARY KEY, language TEXT NOT NULL, form_name TEXT NOT NULL,
      title_zh TEXT NOT NULL, publication_state TEXT NOT NULL
    );
    CREATE TABLE lesson_units (
      id TEXT PRIMARY KEY, title TEXT NOT NULL, language TEXT NOT NULL,
      stage INTEGER NOT NULL, status TEXT NOT NULL
    );
  `);
  sqlite.exec(fs.readFileSync(new URL('../migrations-staging-schema/0003_phase4b_learner_progress.sql', import.meta.url), 'utf8'));
  const wrap = (sql, values = []) => ({
    bind: (...next) => wrap(sql, next),
    async first() { return sqlite.prepare(sql).get(...values) || null; },
    async all() { return {results: sqlite.prepare(sql).all(...values)}; },
    async run() { const result = sqlite.prepare(sql).run(...values); return {success: true, meta: {changes: Number(result.changes)}}; }
  });
  return {sqlite, prepare: sql => wrap(sql)};
}

function harness() {
  const DB = d1();
  const insertUser = DB.sqlite.prepare("INSERT INTO users VALUES(?,?,?,?,?,'active')");
  insertUser.run('user-a', 'a@example.com', 'a@example.com', 1, 1);
  insertUser.run('user-b', 'b@example.com', 'b@example.com', 1, 1);
  DB.sqlite.prepare('INSERT INTO v2_vocabulary_items VALUES(?,?,?,?)').run('en-choice', 'en', 'Choice', 'published');
  DB.sqlite.prepare('INSERT INTO v2_vocabulary_items VALUES(?,?,?,?)').run('en-draft', 'en', 'Hidden', 'draft');
  DB.sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?)').run('en-present-perfect', 'en', 'have + past participle', '现在完成时', 'published');
  DB.sqlite.prepare('INSERT INTO lesson_units VALUES(?,?,?,?,?)').run('en-s1-l1', '第一课', 'en', 1, 'published');
  let now = 2_000_000_000;
  const services = {now: () => now, session: async request => {
    const userId = request.headers.get('X-Test-User');
    return userId ? {user_id: userId} : null;
  }};
  return {DB, env: {DB, CONTENT_DB: DB}, services, advance: seconds => { now += seconds; }};
}

function request(path, {method = 'GET', user, body, requestOrigin = origin} = {}) {
  const headers = new Headers();
  if (user) headers.set('X-Test-User', user);
  if (body !== undefined) headers.set('Content-Type', 'application/json');
  if (requestOrigin !== null) headers.set('Origin', requestOrigin);
  return new Request(origin + path, {method, headers, body: body === undefined ? undefined : JSON.stringify(body)});
}

async function call(h, path, options) {
  const response = await progress(request(path, options), h.env, h.services);
  return {response, body: await response.json()};
}

const answer = (attemptId, answerText = 'Choice', extra = {}) => ({
  attempt_id: attemptId, content_type: 'vocabulary', content_id: 'en-choice', answer: answerText, ...extra
});

test('anonymous reads and writes are rejected while content APIs remain outside the progress router', async () => {
  const h = harness();
  assert.equal((await call(h, '/api/progress/summary')).response.status, 401);
  assert.equal((await call(h, '/api/learning/attempt', {method: 'POST', body: answer('anonymous_attempt_01')})).response.status, 401);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM learning_attempts').get().n, 0);
});

test('first correct attempt lazily creates one vocabulary row with authoritative counters', async () => {
  const h = harness(), before = h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n;
  const result = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('first_correct_0001', '  choice  ')});
  assert.equal(result.response.status, 200);
  assert.equal(result.body.data.correct, true);
  assert.deepEqual({...h.DB.sqlite.prepare('SELECT attempts,correct_count,wrong_count,correct_streak,last_result FROM vocabulary_progress').get()}, {attempts: 1, correct_count: 1, wrong_count: 0, correct_streak: 1, last_result: 1});
  assert.equal(h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n - before, 2, 'one attempt row plus one summary row');
});

test('wrong answers update counts and reset a correct streak', async () => {
  const h = harness();
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('streak_correct_001')});
  h.advance(1);
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('streak_correct_002')});
  h.advance(1);
  const wrong = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('streak_wrong_00001', 'not choice')});
  assert.equal(wrong.body.data.correct, false);
  assert.deepEqual({...h.DB.sqlite.prepare('SELECT attempts,correct_count,wrong_count,correct_streak,last_result FROM vocabulary_progress').get()}, {attempts: 3, correct_count: 2, wrong_count: 1, correct_streak: 0, last_result: 0});
});

test('the read-time familiar state is deterministic and stores no mastery score', async () => {
  const h = harness();
  for (const id of ['familiar_attempt_01', 'familiar_attempt_02', 'familiar_attempt_03']) {
    await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer(id)});
  }
  const result = await call(h, '/api/progress/vocabulary?ids=en-choice', {user: 'user-a'});
  assert.equal(result.body.data[0].state, 'familiar');
  assert.equal(h.DB.sqlite.prepare("SELECT COUNT(*) AS n FROM pragma_table_info('vocabulary_progress') WHERE name='mastery_score'").get().n, 0);
});

test('same attempt ID is idempotent and a cross-content reuse is rejected', async () => {
  const h = harness(), body = answer('idempotent_retry_01');
  const first = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body});
  const retry = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body});
  assert.equal(first.body.data.idempotent, false);
  assert.equal(retry.body.data.idempotent, true);
  assert.equal(h.DB.sqlite.prepare('SELECT attempts FROM vocabulary_progress').get().attempts, 1);
  const conflict = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: {...body, content_type: 'grammar', content_id: 'en-present-perfect', answer: 'have + past participle'}});
  assert.equal(conflict.response.status, 409);
});

test('browser cannot forge correctness or send a user ID', async () => {
  const h = harness();
  const forged = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: {attempt_id: 'forged_correct_0001', content_type: 'vocabulary', content_id: 'en-choice', answer: 'wrong', correct: true}});
  assert.equal(forged.response.status, 400);
  const foreign = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: {...answer('forged_user_000001'), user_id: 'user-b'}});
  assert.equal(foreign.response.status, 400);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM learning_attempts').get().n, 0);
});

test('published canonical vocabulary is required and grading comes from its lemma', async () => {
  const h = harness();
  const draft = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: {...answer('draft_content_0001'), content_id: 'en-draft', answer: 'Hidden'}});
  const missing = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: {...answer('missing_content_01'), content_id: 'en-missing'}});
  assert.equal(draft.response.status, 404);
  assert.equal(missing.response.status, 404);
});

test('grammar uses its canonical form and has independent streak/counters', async () => {
  const h = harness(), base = {content_type: 'grammar', content_id: 'en-present-perfect'};
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: {...base, attempt_id: 'grammar_wrong_0001', answer: 'past simple'}});
  const correct = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: {...base, attempt_id: 'grammar_right_0001', answer: 'HAVE + PAST PARTICIPLE'}});
  assert.equal(correct.body.data.correct, true);
  assert.deepEqual({...h.DB.sqlite.prepare('SELECT attempts,correct_count,wrong_count,correct_streak FROM grammar_progress').get()}, {attempts: 2, correct_count: 1, wrong_count: 1, correct_streak: 1});
});

test('two users answering the same item receive isolated rows and cannot select another user', async () => {
  const h = harness();
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('user_a_attempt_0001')});
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-b', body: answer('user_b_attempt_0001', 'wrong')});
  const a = await call(h, '/api/progress/vocabulary?ids=en-choice', {user: 'user-a'});
  const b = await call(h, '/api/progress/vocabulary?ids=en-choice', {user: 'user-b'});
  assert.equal(a.body.data[0].correct_count, 1);
  assert.equal(a.body.data[0].wrong_count, 0);
  assert.equal(b.body.data[0].correct_count, 0);
  assert.equal(b.body.data[0].wrong_count, 1);
  assert(!JSON.stringify(a.body).includes('user-b'));
  assert(!JSON.stringify(a.body).includes('@example.com'));
});

test('lesson start, stable position, and explicit completion are idempotent', async () => {
  const h = harness();
  const start = await call(h, '/api/lessons/en-s1-l1/start', {method: 'POST', user: 'user-a', body: {}});
  const refresh = await call(h, '/api/lessons/en-s1-l1/start', {method: 'POST', user: 'user-a', body: {}});
  assert.equal(start.body.data.status, 'in_progress');
  assert.equal(start.body.data.changed, true);
  assert.equal(refresh.body.data.changed, false);
  h.advance(2);
  const position = await call(h, '/api/lessons/en-s1-l1/position', {method: 'POST', user: 'user-a', body: {section_key: 'grammar'}});
  assert.equal(position.body.data.last_section_key, 'grammar');
  const samePosition = await call(h, '/api/lessons/en-s1-l1/position', {method: 'POST', user: 'user-a', body: {section_key: 'grammar'}});
  assert.equal(samePosition.body.data.changed, false);
  const completed = await call(h, '/api/lessons/en-s1-l1/complete', {method: 'POST', user: 'user-a', body: {}});
  const repeated = await call(h, '/api/lessons/en-s1-l1/complete', {method: 'POST', user: 'user-a', body: {}});
  assert.equal(completed.body.data.status, 'completed');
  assert.equal(completed.body.data.changed, true);
  assert.equal(repeated.body.data.changed, false);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM lesson_progress').get().n, 1);
});

test('empty and populated summaries are mathematically exact', async () => {
  const h = harness();
  const empty = await call(h, '/api/progress/summary', {user: 'user-b'});
  assert.deepEqual(empty.body.data.vocabulary, {studied: 0, attempts: 0, correct_count: 0, wrong_count: 0, accuracy: null});
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('summary_correct_001')});
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('summary_wrong_00001', 'wrong')});
  await call(h, '/api/lessons/en-s1-l1/start', {method: 'POST', user: 'user-a', body: {}});
  const populated = await call(h, '/api/progress/summary', {user: 'user-a'});
  assert.deepEqual(populated.body.data.vocabulary, {studied: 1, attempts: 2, correct_count: 1, wrong_count: 1, accuracy: 50});
  assert.deepEqual(populated.body.data.lessons, {studied: 1, completed: 0, in_progress: 1});
});

test('bulk lookup is bounded to current-page IDs and never initializes unseen content', async () => {
  const h = harness();
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('bulk_visible_000001')});
  const visible = await call(h, '/api/progress/vocabulary?ids=en-choice', {user: 'user-a'});
  assert.equal(visible.body.data.length, 1);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM vocabulary_progress').get().n, 1);
  const tooMany = Array.from({length: 101}, (_, index) => `item-${index}`).join(',');
  assert.equal((await call(h, '/api/progress/vocabulary?ids=' + tooMany, {user: 'user-a'})).response.status, 400);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM vocabulary_progress').get().n, 1);
});

test('all progress writes enforce exact same-origin requests', async () => {
  const h = harness();
  const absent = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('origin_absent_0001'), requestOrigin: null});
  const foreign = await call(h, '/api/lessons/en-s1-l1/start', {method: 'POST', user: 'user-a', body: {}, requestOrigin: 'https://evil.example'});
  assert.equal(absent.response.status, 403);
  assert.equal(foreign.response.status, 403);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM learning_attempts').get().n, 0);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM lesson_progress').get().n, 0);
});

test('trigger failure rolls back the attempt ledger and counter update together', () => {
  const h = harness();
  assert.throws(() => h.DB.sqlite.prepare(`INSERT INTO learning_attempts(user_id,attempt_id,content_type,content_id,result,created_at)
    VALUES('user-a','atomic_failure_0001','vocabulary','missing-item',1,1)`).run(), /FOREIGN KEY/);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM learning_attempts').get().n, 0);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM vocabulary_progress').get().n, 0);
});
