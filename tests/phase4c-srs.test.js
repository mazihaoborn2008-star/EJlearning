import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {progress} from '../src/progress-4b.js';

const origin = 'https://ej-learning.test';
const migration = name => fs.readFileSync(new URL(`../migrations-staging-schema/${name}`, import.meta.url), 'utf8');

function database({phase4c = true} = {}) {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  sqlite.exec(migration('0002_phase4a_email_auth.sql'));
  sqlite.exec(`
    CREATE TABLE v2_vocabulary_items (id TEXT PRIMARY KEY,language TEXT NOT NULL,lemma TEXT NOT NULL,publication_state TEXT NOT NULL);
    CREATE TABLE v2_vocabulary_senses (id TEXT PRIMARY KEY,item_id TEXT NOT NULL,meaning_zh TEXT NOT NULL,sort_order INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX v2_senses_item ON v2_vocabulary_senses(item_id,sort_order);
    CREATE TABLE v2_grammar_points (id TEXT PRIMARY KEY,language TEXT NOT NULL,form_name TEXT NOT NULL,title_zh TEXT NOT NULL,publication_state TEXT NOT NULL);
    CREATE TABLE lesson_units (id TEXT PRIMARY KEY,title TEXT NOT NULL,language TEXT NOT NULL,stage INTEGER NOT NULL,status TEXT NOT NULL);
  `);
  sqlite.exec(migration('0003_phase4b_learner_progress.sql'));
  if (phase4c) sqlite.exec(migration('0004_phase4c_srs.sql'));
  const wrap = (sql, values = []) => ({
    bind: (...next) => wrap(sql, next),
    async first() { return sqlite.prepare(sql).get(...values) || null; },
    async all() { return {results: sqlite.prepare(sql).all(...values)}; },
    async run() { const result = sqlite.prepare(sql).run(...values); return {success: true, meta: {changes: Number(result.changes)}}; }
  });
  return {sqlite, prepare: sql => wrap(sql)};
}

function harness() {
  const DB = database(), insertUser = DB.sqlite.prepare("INSERT INTO users VALUES(?,?,?,?,?,'active')");
  insertUser.run('user-a', 'a@example.com', 'a@example.com', 1, 1);
  insertUser.run('user-b', 'b@example.com', 'b@example.com', 1, 1);
  const vocabulary = [['en-choice','en','Choice','选择'],['en-future','en','Future','未来'],['ja-water','ja','水','水']];
  for (const [id, language, lemma, meaning] of vocabulary) {
    DB.sqlite.prepare('INSERT INTO v2_vocabulary_items VALUES(?,?,?,?)').run(id, language, lemma, 'published');
    DB.sqlite.prepare('INSERT INTO v2_vocabulary_senses VALUES(?,?,?,?)').run(`sense-${id}`, id, meaning, 0);
  }
  for(const row of [['en-present-perfect','en','have + past participle','现在完成时'],['35e1c-ja-condition-contrast','ja','なら・たら・ば・と（比較概要）','条件比较概览'],['35e1c-ja-workplace-register','ja','敬体・尊敬語・謙譲語（使い分け概要）','职场语域概览']])DB.sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?)').run(...row,'published');
  let now = 2_000_000_000;
  const services = {now: () => now, session: async request => request.headers.get('X-Test-User') ? {user_id: request.headers.get('X-Test-User')} : null};
  return {DB, env: {DB, CONTENT_DB: DB}, services, now: () => now, setNow: value => { now = value; }, advance: seconds => { now += seconds; }};
}

function request(path, {method = 'GET', user, body} = {}) {
  const headers = new Headers({Origin: origin});
  if (user) headers.set('X-Test-User', user);
  if (body !== undefined) headers.set('Content-Type', 'application/json');
  return new Request(origin + path, {method, headers, body: body === undefined ? undefined : JSON.stringify(body)});
}
async function call(h, path, options = {}) {
  const response = await progress(request(path, options), h.env, h.services);
  return {response, body: await response.json()};
}
const answer = (attemptId, text = 'Choice', contentType = 'vocabulary', contentId = 'en-choice') =>
  ({attempt_id: attemptId, content_type: contentType, content_id: contentId, answer: text});

test('deterministic SRS stages use 1, 3, 7, 14, 30, then capped 60 day intervals', async () => {
  const h = harness(), intervals = [86400, 259200, 604800, 1209600, 2592000, 5184000, 5184000];
  for (let index = 0; index < intervals.length; index++) {
    const at = h.now();
    const result = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer(`schedule_correct_${String(index).padStart(2,'0')}`)});
    assert.equal(result.body.data.progress.review_stage, Math.min(index + 1, 6));
    assert.equal(result.body.data.progress.review_count, index + 1);
    assert.equal(result.body.data.progress.current_interval_seconds, intervals[index]);
    assert.equal(result.body.data.progress.last_reviewed_at, at);
    assert.equal(result.body.data.progress.next_review_at, at + intervals[index]);
    h.advance(1);
  }
});

test('wrong answers enter 10 minute relearning and the next correct answer restarts at one day', async () => {
  const h = harness();
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('before_lapse_good1')});
  h.advance(3);
  const atWrong = h.now(), wrong = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('trigger_lapse_bad1', 'wrong')});
  assert.deepEqual({stage: wrong.body.data.progress.review_stage, interval: wrong.body.data.progress.current_interval_seconds,
    lapse: wrong.body.data.progress.lapse_count, streak: wrong.body.data.progress.correct_streak, due: wrong.body.data.progress.next_review_at},
  {stage: 0, interval: 600, lapse: 1, streak: 0, due: atWrong + 600});
  h.advance(600);
  const atCorrect = h.now(), correct = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body: answer('after_lapse_good1')});
  assert.deepEqual({stage: correct.body.data.progress.review_stage, interval: correct.body.data.progress.current_interval_seconds,
    lapse: correct.body.data.progress.lapse_count, streak: correct.body.data.progress.correct_streak, due: correct.body.data.progress.next_review_at},
  {stage: 1, interval: 86400, lapse: 1, streak: 1, due: atCorrect + 86400});
});

test('an identical attempt retry causes zero writes and leaves all SRS fields unchanged', async () => {
  const h = harness(), body = answer('srs_idempotent_001');
  await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body});
  const before = {...h.DB.sqlite.prepare('SELECT * FROM vocabulary_progress').get()}, changes = h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n;
  h.advance(999);
  const retry = await call(h, '/api/learning/attempt', {method: 'POST', user: 'user-a', body});
  assert.equal(retry.body.data.idempotent, true);
  assert.equal(h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n, changes);
  assert.deepEqual({...h.DB.sqlite.prepare('SELECT * FROM vocabulary_progress').get()}, before);
});

test('queue due boundary, ordering, filters, limits, isolation, and hidden answers are exact', async () => {
  const h = harness(), base = h.now();
  const attempts = [
    ['due_vocab_item_01','Choice','vocabulary','en-choice'],
    ['future_vocab_001','Future','vocabulary','en-future'],
    ['due_grammar_0001','have + past participle','grammar','en-present-perfect'],
    ['other_user_item01','水','vocabulary','ja-water']
  ];
  for (const [id,text,type,item] of attempts.slice(0,3)) await call(h, '/api/learning/attempt', {method:'POST',user:'user-a',body:answer(id,text,type,item)});
  await call(h, '/api/learning/attempt', {method:'POST',user:'user-b',body:answer(...attempts[3])});
  h.DB.sqlite.prepare("UPDATE vocabulary_progress SET next_review_at=? WHERE user_id='user-a' AND vocabulary_id='en-choice'").run(base - 5);
  h.DB.sqlite.prepare("UPDATE vocabulary_progress SET next_review_at=? WHERE user_id='user-a' AND vocabulary_id='en-future'").run(base + 1);
  h.DB.sqlite.prepare("UPDATE grammar_progress SET next_review_at=? WHERE user_id='user-a'").run(base);
  const combined = await call(h, '/api/review/queue', {user:'user-a'});
  assert.deepEqual(combined.body.data.map(x => [x.type,x.id]), [['vocabulary','en-choice'],['grammar','en-present-perfect']]);
  assert(!JSON.stringify(combined.body).includes('Choice'));
  assert(!JSON.stringify(combined.body).includes('have + past participle'));
  assert.equal(combined.body.data[0].prompt, '选择');
  assert.equal((await call(h, '/api/review/queue?type=vocabulary', {user:'user-a'})).body.data.length, 1);
  assert.equal((await call(h, '/api/review/queue?type=grammar', {user:'user-a'})).body.data.length, 1);
  assert.equal((await call(h, '/api/review/queue?limit=1', {user:'user-a'})).body.data.length, 1);
  assert.equal((await call(h, '/api/review/queue?limit=51', {user:'user-a'})).response.status, 400);
  assert.equal((await call(h, '/api/review/queue', {user:'user-b'})).body.data.length, 0);
  h.advance(1);
  assert.equal((await call(h, '/api/review/queue?type=vocabulary', {user:'user-a'})).body.data.length, 2, 'future item appears only once server time reaches it');
});

test('empty and learned-but-not-due summaries are honest; unseen curriculum is never queued', async () => {
  const h = harness(), empty = await call(h, '/api/review/summary', {user:'user-a'});
  assert.deepEqual({due: empty.body.data.total_due, scheduled: empty.body.data.total_scheduled, next: empty.body.data.next_review_at}, {due:0,scheduled:0,next:null});
  await call(h, '/api/learning/attempt', {method:'POST',user:'user-a',body:answer('not_due_learned01')});
  const future = await call(h, '/api/review/summary', {user:'user-a'}), queue = await call(h, '/api/review/queue', {user:'user-a'});
  assert.equal(future.body.data.total_due, 0);
  assert.equal(future.body.data.total_scheduled, 1);
  assert.equal(future.body.data.next_review_at, h.now() + 86400);
  assert.equal(queue.body.data.length, 0);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM vocabulary_progress').get().n, 1, 'two unseen curriculum rows were not initialized');
});

test('overview-only grammar history stays queryable without entering SRS review',async()=>{
 const h=harness(),base=h.now();
 for(const [index,id] of ['35e1c-ja-condition-contrast','35e1c-ja-workplace-register'].entries()){
  h.DB.sqlite.prepare('INSERT INTO learning_attempts VALUES(?,?,?,?,?,?)').run('user-a',`historical_overview_${index}`,'grammar',id,0,base-index);
  h.DB.sqlite.prepare('UPDATE grammar_progress SET next_review_at=? WHERE user_id=? AND grammar_id=?').run(base,'user-a',id);
 }
 const summary=(await call(h,'/api/review/summary',{user:'user-a'})).body.data,queue=(await call(h,'/api/review/queue?type=grammar',{user:'user-a'})).body.data,recent=(await call(h,'/api/progress/recent?limit=8',{user:'user-a'})).body.data;
 assert.equal(summary.grammar.scheduled_count,0);assert.equal(summary.grammar.due_count,0);assert.deepEqual(queue,[]);
 assert.deepEqual(recent.filter(x=>x.type==='grammar').map(x=>x.id).sort(),['35e1c-ja-condition-contrast','35e1c-ja-workplace-register']);
 for(const id of ['35e1c-ja-condition-contrast','35e1c-ja-workplace-register'])assert.equal(h.DB.sqlite.prepare('SELECT attempts FROM grammar_progress WHERE user_id=? AND grammar_id=?').get('user-a',id).attempts,1);
});

test('anonymous review APIs return 401 and GETs make zero writes', async () => {
  const h = harness();
  assert.equal((await call(h, '/api/review/summary')).response.status, 401);
  assert.equal((await call(h, '/api/review/queue')).response.status, 401);
  const before = h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n;
  await call(h, '/api/review/summary', {user:'user-a'});
  await call(h, '/api/review/queue', {user:'user-a'});
  assert.equal(h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n, before);
});

test('clients cannot submit authoritative SRS fields', async () => {
  const h = harness(), body = {...answer('forged_schedule_01'), next_review_at: 1, review_stage: 6, lapse_count: 0};
  const result = await call(h, '/api/learning/attempt', {method:'POST',user:'user-a',body});
  assert.equal(result.response.status, 400);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM learning_attempts').get().n, 0);
});

test('normal answers retain the two-write budget for vocabulary and grammar', async () => {
  const h = harness();
  for (const [id,text,type,item] of [['writes_vocab_001','Choice','vocabulary','en-choice'],['writes_grammar01','have + past participle','grammar','en-present-perfect']]) {
    const before = h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n;
    await call(h, '/api/learning/attempt', {method:'POST',user:'user-a',body:answer(id,text,type,item)});
    assert.equal(h.DB.sqlite.prepare('SELECT total_changes() AS n').get().n - before, 2);
  }
});

test('migration preserves Phase 4B history and leaves existing rows unscheduled', () => {
  const DB = database({phase4c:false});
  DB.sqlite.prepare("INSERT INTO users VALUES('user-a','a@example.com','a@example.com',1,1,'active')").run();
  DB.sqlite.prepare("INSERT INTO v2_vocabulary_items VALUES('en-choice','en','Choice','published')").run();
  DB.sqlite.prepare("INSERT INTO learning_attempts VALUES('user-a','legacy_attempt_001','vocabulary','en-choice',1,100)").run();
  const before = {...DB.sqlite.prepare('SELECT * FROM vocabulary_progress').get()};
  DB.sqlite.exec(migration('0004_phase4c_srs.sql'));
  const after = {...DB.sqlite.prepare('SELECT * FROM vocabulary_progress').get()};
  for (const [key,value] of Object.entries(before)) assert.equal(after[key], value);
  assert.deepEqual({stage:after.review_stage,count:after.review_count,lapses:after.lapse_count,last:after.last_reviewed_at,next:after.next_review_at,interval:after.current_interval_seconds},
    {stage:null,count:0,lapses:0,last:null,next:null,interval:null});
  DB.sqlite.prepare("INSERT INTO learning_attempts VALUES('user-a','legacy_attempt_002','vocabulary','en-choice',1,200)").run();
  const scheduled = DB.sqlite.prepare('SELECT review_stage,review_count,last_reviewed_at,next_review_at,current_interval_seconds FROM vocabulary_progress').get();
  assert.deepEqual({...scheduled}, {review_stage:2,review_count:1,last_reviewed_at:200,next_review_at:259400,current_interval_seconds:259200});
});

test('due indexes are covering user/time/id indexes used by bounded queue lookups', () => {
  const h = harness();
  const vocabColumns = h.DB.sqlite.prepare("SELECT name FROM pragma_index_info('idx_vocabulary_progress_user_due') ORDER BY seqno").all().map(x=>x.name);
  const grammarColumns = h.DB.sqlite.prepare("SELECT name FROM pragma_index_info('idx_grammar_progress_user_due') ORDER BY seqno").all().map(x=>x.name);
  assert.deepEqual(vocabColumns, ['user_id','next_review_at','vocabulary_id']);
  assert.deepEqual(grammarColumns, ['user_id','next_review_at','grammar_id']);
  const plan = h.DB.sqlite.prepare('EXPLAIN QUERY PLAN SELECT vocabulary_id FROM vocabulary_progress WHERE user_id=? AND next_review_at<=? ORDER BY next_review_at,vocabulary_id LIMIT ?').all('user-a',h.now(),20);
  assert(plan.some(row => String(row.detail).includes('idx_vocabulary_progress_user_due')));
});
