import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {sameDataset} from './staging-db-policy.js';

const root = path.resolve(import.meta.dirname, '..');
const command = process.argv[2] || 'help';
const flags = new Set(process.argv.slice(3));
const config = path.join(root, 'wrangler.production-v2.jsonc');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config', 'staging-data-policy.json'), 'utf8'));
const expectedCounts = Object.fromEntries(policy.datasets.map(dataset => [dataset.name, dataset.row_count]));
const wranglerBin = path.join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
const productionMarkerCountSql = `SELECT
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='en' AND publication_state='published') AS en_vocabulary,
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published') AS ja_vocabulary,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='en') AS en_grammar,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='ja') AS ja_grammar,
  (SELECT COUNT(*) FROM lesson_units WHERE status='published') AS lessons`;

function runWrangler(args) {
  const result = spawnSync(process.execPath, [wranglerBin, ...args], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], maxBuffer: 20 * 1024 * 1024
  });
  if (result.status !== 0) throw Error(`Wrangler failed (${result.status}): ${result.error?.message || args.join(' ')}`);
  return result.stdout.trim();
}

function execute(sql) {
  const output = runWrangler(['d1', 'execute', 'DB', '--remote', '--config', config, '--command', sql, '--json']);
  const start = output.indexOf('[');
  if (start < 0) throw Error('Wrangler returned no JSON result');
  return JSON.parse(output.slice(start)).flatMap(batch => batch.results || []);
}

const quote = value => `'${String(value).replaceAll("'", "''")}'`;
const counts = () => Object.fromEntries(Object.entries(execute(productionMarkerCountSql)[0]).map(([name, value]) => [name, Number(value)]));
function assertCounts(actual) {
  for (const [name, expected] of Object.entries(expectedCounts)) {
    if (actual[name] !== expected) throw Error(`${name}: expected ${expected}, found ${actual[name]}`);
  }
}
function installed() {
  return execute('SELECT dataset_name,dataset_version,applied_at,row_count,checksum FROM curriculum_dataset_versions ORDER BY dataset_name');
}
function status() {
  const actual = counts();
  const rows = installed();
  console.log(JSON.stringify({database: 'ej-learning-prod-db', counts: actual, markers: rows}, null, 2));
}
function adopt() {
  if (!flags.has('--confirm-existing-data')) throw Error('Adoption requires --confirm-existing-data.');
  const actual = counts();
  assertCounts(actual);
  const existing = new Map(installed().map(row => [row.dataset_name, row]));
  const missing = policy.datasets.filter(dataset => !sameDataset(existing.get(dataset.name), dataset));
  if (existing.size !== 0) throw Error(`Production adoption requires an empty marker ledger; found ${existing.size}.`);
  if (missing.length !== 5) throw Error(`Expected exactly five missing markers, found ${missing.length}.`);
  const values = missing.map(dataset => `(${quote(dataset.name)},${quote(dataset.version)},datetime('now'),${dataset.row_count},${quote(dataset.checksum)})`).join(',');
  execute(`INSERT INTO curriculum_dataset_versions(dataset_name,dataset_version,applied_at,row_count,checksum) VALUES ${values}`);
  const after = installed();
  if (after.length !== 5 || !policy.datasets.every(dataset => sameDataset(after.find(row => row.dataset_name === dataset.name), dataset))) {
    throw Error('Production marker verification failed.');
  }
  console.log(JSON.stringify({event: 'production_curriculum_adopted', metadata_rows_written: 5, curriculum_row_writes: 0, counts: actual}, null, 2));
}

if (command === 'status') status();
else if (command === 'adopt') adopt();
else {
  console.log('Usage: node scripts/production-curriculum.js status | adopt --confirm-existing-data');
  process.exit(command === 'help' ? 0 : 1);
}
