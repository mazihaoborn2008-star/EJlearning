import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  grammarContentCorrections as hotfix02Corrections,
  isPracticeEligibleGrammarId,
  isCurrentGrammarId,
  overviewOnlyGrammarIds
} from '../src/content-quality-02.js';
import {grammarContentCorrections as hotfix03Corrections} from '../src/content-quality-03.js';
import {enWouldLikeContentCorrection, grammarPracticeAuthorities} from '../src/content-quality-04.js';
import {sameDataset} from './staging-db-policy.js';

const root = path.resolve(import.meta.dirname, '..');
const wrangler = path.join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
const config = path.join(root, 'wrangler.production-v2.jsonc');
const markerPolicy = JSON.parse(fs.readFileSync(path.join(root, 'config', 'staging-data-policy.json'), 'utf8'));

function query(sql) {
  const result = spawnSync(process.execPath, [wrangler, 'd1', 'execute', 'DB', '--remote', '--config', config, '--command', sql, '--json'], {
    cwd: root, encoding: 'utf8', maxBuffer: 30 * 1024 * 1024
  });
  if (result.status !== 0) throw Error(result.stderr || `Wrangler query failed: ${sql.slice(0, 80)}`);
  const start = result.stdout.indexOf('[');
  if (start < 0) throw Error('Wrangler returned no JSON');
  return JSON.parse(result.stdout.slice(start)).flatMap(batch => batch.results || []);
}

const quote = value => `'${String(value).replaceAll("'", "''")}'`;
const scalar = sql => query(sql)[0];
const totals = scalar(`SELECT
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='en') AS en_vocabulary,
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='ja') AS ja_vocabulary,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='en') AS en_grammar_historical,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='ja') AS ja_grammar_historical,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='en' AND publication_state='published') AS en_grammar_published,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='ja' AND publication_state='published') AS ja_grammar_published,
  (SELECT COUNT(*) FROM v2_sentence_expressions) AS expressions,
  (SELECT COUNT(*) FROM curriculum_dataset_versions) AS dataset_markers,
  (SELECT COUNT(*) FROM users) AS users,
  (SELECT COUNT(*) FROM email_login_codes) AS otp_codes,
  (SELECT COUNT(*) FROM auth_sessions) AS sessions,
  (SELECT COUNT(*) FROM learning_attempts) AS learning_attempts,
  (SELECT COUNT(*) FROM lesson_progress) AS lesson_progress,
  (SELECT COUNT(*) FROM vocabulary_progress) AS vocabulary_progress,
  (SELECT COUNT(*) FROM grammar_progress) AS grammar_progress,
  (SELECT COUNT(*) FROM user_settings) AS user_settings`);

for (const [name, expected] of Object.entries({
  en_vocabulary: 10000, ja_vocabulary: 8235,
  en_grammar_historical: 83, ja_grammar_historical: 98,
  en_grammar_published: 82, ja_grammar_published: 97,
  expressions: 713, dataset_markers: 5,
  users: 0, otp_codes: 0, sessions: 0, learning_attempts: 0,
  lesson_progress: 0, vocabulary_progress: 0, grammar_progress: 0, user_settings: 0
})) assert.equal(Number(totals[name]), expected, name);

const markerRows = query('SELECT dataset_name,dataset_version,row_count,checksum FROM curriculum_dataset_versions ORDER BY dataset_name');
assert.equal(markerRows.length, markerPolicy.datasets.length, 'dataset marker count');
for (const expected of markerPolicy.datasets) {
  assert(sameDataset(markerRows.find(row => row.dataset_name === expected.name), expected), `dataset marker ${expected.name}`);
}

const migrationTotals = scalar('SELECT COUNT(*) AS ledger,COUNT(DISTINCT name) AS distinct_names FROM d1_migrations');
assert.equal(Number(migrationTotals.ledger), 73, 'migration ledger');
assert.equal(Number(migrationTotals.distinct_names), 73, 'distinct migration names');

const bundleRow = scalar("SELECT id,schema_version,payload_json FROM lesson_bundles WHERE id='curriculum-stage6-expansion-03-v1'");
assert.equal(bundleRow.schema_version, 'CURRICULUM-STAGE6-EXPANSION-03');
const bundle = JSON.parse(bundleRow.payload_json);
assert.equal(bundle.u.length, 76);
assert.equal(bundle.p.length, 74);
assert.equal(bundle.i.length, 1130);
const runtimeItems = bundle.i.filter(item => item[1] !== 'grammar' || isCurrentGrammarId(item[2]));
assert.equal(runtimeItems.length, 1126);

const units = new Map(bundle.u.map(unit => [unit[0], unit]));
const parent = new Map(bundle.p.map(edge => [edge[0], edge[1]]));
const roots = bundle.u.filter(unit => !parent.has(unit[0])).map(unit => unit[0]);
assert.deepEqual(roots, ['en-s1-l1', 'ja-s1-l1']);
let reachable = 0, cycles = 0, missing = 0, crossLanguage = 0, stage6Bypass = 0;
for (const unit of bundle.u) {
  let current = unit[0];
  const seen = new Set();
  let sawStage5 = unit[2] < 6;
  while (parent.has(current)) {
    if (seen.has(current)) { cycles++; break; }
    seen.add(current);
    const next = parent.get(current);
    const prerequisite = units.get(next);
    if (!prerequisite) { missing++; break; }
    if (prerequisite[1] !== unit[1]) crossLanguage++;
    if (prerequisite[2] === 5) sawStage5 = true;
    current = next;
  }
  if (current === `${unit[1]}-s1-l1`) reachable++;
  if (unit[2] === 6 && !sawStage5) stage6Bypass++;
}
const terminals = bundle.u.filter(unit => !bundle.p.some(edge => edge[1] === unit[0])).map(unit => unit[0]);
assert.deepEqual([reachable, cycles, missing, crossLanguage, stage6Bypass], [76, 0, 0, 0, 0]);
assert.deepEqual(terminals, ['en-s6-l4', 'ja-s6-l3']);

const correctionIds = [...new Set([
  ...hotfix02Corrections.map(row => row.id),
  ...hotfix03Corrections.map(row => row.id),
  enWouldLikeContentCorrection.id
])];
const grammarRows = query(`SELECT * FROM v2_grammar_points WHERE id IN (${correctionIds.map(quote).join(',')})`);
const grammarById = new Map(grammarRows.map(row => [row.id, row]));
for (const correction of [...hotfix02Corrections, ...hotfix03Corrections, enWouldLikeContentCorrection]) {
  const actual = grammarById.get(correction.id);
  assert(actual, correction.id);
  for (const [field, value] of Object.entries(correction)) assert.equal(actual[field], value, `${correction.id}.${field}`);
}
assert(overviewOnlyGrammarIds.every(id => !isPracticeEligibleGrammarId(id)));
const hotfix02Links = bundle.i.filter(item => item[1] === 'grammar' && [
  '35e1c-ja-counter-system', ...overviewOnlyGrammarIds
].includes(item[2]));
assert.equal(hotfix02Links.length, 7);

const hotfix04 = scalar(`SELECT
  (SELECT COUNT(*) FROM v2_grammar_points WHERE id='en-would-like') AS canonical_rows,
  (SELECT COUNT(*) FROM v2_grammar_examples WHERE grammar_id='en-would-like') AS examples,
  (SELECT COUNT(*) FROM v2_sentence_grammar_links WHERE grammar_id='en-would-like') AS sentence_links,
  (SELECT COUNT(*) FROM v2_grammar_example_completion_authority WHERE grammar_id='en-would-like') AS cc_authority`);
assert.deepEqual(Object.fromEntries(Object.entries(hotfix04).map(([key, value]) => [key, Number(value)])), {
  canonical_rows: 1, examples: 9, sentence_links: 7, cc_authority: 0
});
const hotfix04BundleLinks = bundle.i.filter(item => item[1] === 'grammar' && item[2] === 'en-would-like');
assert.deepEqual(hotfix04BundleLinks.map(item => item[0]), ['en-s1-l2']);
assert.deepEqual(grammarPracticeAuthorities['en-would-like'].allowed_exercise_types, ['grammar_form_selection']);

const stage5Payload = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'STAGE-5-EDITORIAL-02B-PAYLOAD.json'), 'utf8'));
const stage5Cc = {
  safe: stage5Payload.grammar_examples.filter(row => row.cc_safety === 'CC SAFE').length,
  not_for_cc: stage5Payload.grammar_examples.filter(row => row.cc_safety === 'NOT FOR CC').length
};
assert.deepEqual(stage5Cc, {safe: 28, not_for_cc: 11});
const stage6CcRows = query("SELECT cc_safety,COUNT(*) AS n FROM v2_grammar_example_completion_reviews WHERE dataset_marker='2026-09-stage6-expansion-03-v1' GROUP BY cc_safety ORDER BY cc_safety");
const stage6Cc = {
  safe: Number(stage6CcRows.find(row => row.cc_safety === 'CC SAFE')?.n || 0),
  not_for_cc: Number(stage6CcRows.find(row => row.cc_safety === 'NOT FOR CC')?.n || 0)
};
assert.deepEqual(stage6Cc, {safe: 38, not_for_cc: 22});

console.log(JSON.stringify({
  release: {bundle: bundleRow.id, schema: bundleRow.schema_version, marker: '2026-09-stage6-expansion-03-v1'},
  migrations: {ledger: Number(migrationTotals.ledger), distinct: Number(migrationTotals.distinct_names)},
  curriculum: {lessons: bundle.u.length, edges: bundle.p.length, raw_relationships: bundle.i.length, runtime_active: runtimeItems.length},
  canonical: {
    vocabulary: {en: Number(totals.en_vocabulary), ja: Number(totals.ja_vocabulary)},
    grammar_historical: {en: Number(totals.en_grammar_historical), ja: Number(totals.ja_grammar_historical)},
    grammar_published: {en: Number(totals.en_grammar_published), ja: Number(totals.ja_grammar_published)},
    expressions: Number(totals.expressions)
  },
  graph: {roots, reachable, acyclic: cycles === 0, missing_prerequisites: missing, cross_language: crossLanguage, stage6_bypass: stage6Bypass, terminals},
  hotfixes: {hotfix02: 'PASS', hotfix03: 'PASS', hotfix04: 'PASS'},
  cc: {stage5: stage5Cc, stage6: stage6Cc},
  learner_auth: {
    users: Number(totals.users), otp_codes: Number(totals.otp_codes), sessions: Number(totals.sessions),
    learning_attempts: Number(totals.learning_attempts), lesson_progress: Number(totals.lesson_progress),
    vocabulary_progress: Number(totals.vocabulary_progress), grammar_progress: Number(totals.grammar_progress),
    user_settings: Number(totals.user_settings)
  },
  dataset_markers: Number(totals.dataset_markers)
}, null, 2));
