import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const configPath = path.join(root, 'wrangler.production-v2.jsonc');
const manifestPath = path.join(root, 'migrations-production-v2', 'manifest.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

assert.equal(config.name, 'ej-learning-prod');
assert.equal(config.main, 'src/worker-36.js');
assert.equal(config.compatibility_date, '2026-09-08');
assert.equal(config.workers_dev, false);
assert.equal(config.preview_urls, false);
assert.deepEqual(config.routes, [
  {pattern: 'ej-learning.jwcglass.com', custom_domain: true}
]);
assert.deepEqual(config.secrets.required, [
  'AUTH_SECRET', 'PRACTICE_SECRET', 'AUTH_SMTP_USER', 'AUTH_SMTP_PASSWORD', 'DEEPSEEK_API_KEY'
]);
assert.deepEqual(config.ratelimits.map(row => [row.name, row.namespace_id, row.simple.limit, row.simple.period]), [
  ['AI_RATE_LIMITER', '370001', 12, 60],
  ['AI_SHARED_RATE_LIMITER', '370002', 120, 60]
]);
assert.deepEqual(config.kv_namespaces, [{binding: 'AI_SESSIONS', id: '0d20dbe0cefd4d57b6f3bff2a7f46c78'}]);
assert.equal(config.d1_databases.length, 2);
for (const database of config.d1_databases) {
  assert.equal(database.database_name, 'ej-learning-prod-db');
  assert.equal(database.database_id, '864538ef-1e88-427f-83b7-2c0846d3133d');
}
assert.equal(config.d1_databases[0].migrations_dir, 'migrations-production-v2');

const serialized = JSON.stringify(config);
for (const forbidden of [
  'fcd78cc9-5f99-4677-9764-3713e3d1226b',
  '3a4a888f427d4d419ee6f56368338e71',
  'e2e8f4c8-27e0-416e-993c-7510259a6b1d',
  'ej_learning.jwcglass.com'
]) assert.equal(serialized.includes(forbidden), false, `Forbidden production reference: ${forbidden}`);

assert.equal(manifest.migration_count, 73);
assert.equal(manifest.mappings.length, 73);
assert.deepEqual(manifest.mappings.map(row => row.sequence), Array.from({length: 73}, (_, index) => index + 1));
assert.equal(new Set(manifest.mappings.map(row => row.production_file)).size, 73);
for (const row of manifest.mappings) {
  const source = fs.readFileSync(path.join(root, row.source_file));
  const production = fs.readFileSync(path.join(root, 'migrations-production-v2', row.production_file));
  assert.equal(source.equals(production), true, `Payload mismatch: ${row.production_file}`);
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), row.sha256);
  assert.equal(source.length, row.bytes);
}

console.log(JSON.stringify({config: 'PASS', manifest: '73/73 PASS', payloads: 'byte-identical'}));
