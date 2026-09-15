import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {
  deployPlan,
  loadConfig,
  loadPolicy,
  sameDataset,
  synchronizeDatasets,
  validateStagingConfig,
  workerConfigFor
} from '../scripts/staging-db-policy.js';

const policy = loadPolicy();
const stagingConfig = loadConfig(path.resolve('wrangler.36.jsonc'));

test('normal deploy is schema-only and has zero curriculum writes', () => {
  const plan = deployPlan(stagingConfig, policy);
  assert.deepEqual(plan.steps, ['apply_pending_schema_migrations', 'deploy_worker']);
  assert.deepEqual(plan.curriculum_seed_steps, []);
  assert.equal(plan.estimated_curriculum_row_writes, 0);
  assert.equal(plan.identity.database_id, policy.database.id);
});

test('fresh bootstrap imports once and an identical second run performs zero writes', async () => {
  const installed = [];
  let importCalls = 0;
  let markerWrites = 0;
  const run = () => synchronizeDatasets({
    datasets: policy.datasets,
    installed,
    applyDataset: async dataset => {
      importCalls += 1;
      return {curriculum_row_writes: dataset.row_count};
    },
    writeMarker: async dataset => {
      markerWrites += 1;
      installed.push({dataset_name: dataset.name, dataset_version: dataset.version, row_count: dataset.row_count, checksum: dataset.checksum});
    }
  });
  const first = await run();
  assert.equal(first.curriculum_row_writes, policy.datasets.reduce((total,dataset)=>total+dataset.row_count,0));
  assert.equal(first.metadata_row_writes, 5);
  assert.equal(importCalls, 5);
  assert.equal(markerWrites, 5);
  const second = await run();
  assert.equal(second.curriculum_row_writes, 0);
  assert.equal(second.metadata_row_writes, 0);
  assert.equal(importCalls, 5);
  assert.equal(markerWrites, 5);
});

test('one deliberate version bump applies once, then skips exactly', async () => {
  const requested = {...policy.datasets[0], version: '2026-10-v2', row_count: 10_001, checksum: 'sha256:reviewed-delta-v2'};
  const installed = [{
    dataset_name: requested.name,
    dataset_version: policy.datasets[0].version,
    row_count: policy.datasets[0].row_count,
    checksum: policy.datasets[0].checksum
  }];
  let updateCalls = 0;
  const apply = () => synchronizeDatasets({
    datasets: [requested],
    installed,
    applyDataset: async () => {
      updateCalls += 1;
      return {curriculum_row_writes: 1};
    },
    writeMarker: async dataset => Object.assign(installed[0], {
      dataset_version: dataset.version,
      row_count: dataset.row_count,
      checksum: dataset.checksum
    })
  });
  assert.equal((await apply()).curriculum_row_writes, 1);
  assert.equal(updateCalls, 1);
  assert.equal((await apply()).curriculum_row_writes, 0);
  assert.equal(updateCalls, 1);
  assert.ok(sameDataset(installed[0], requested));
});

test('multiple Worker names preserve one D1 and one AI session KV', () => {
  for (const name of ['ej-learning-36', 'ej-learning-37', 'ej-learning-38']) {
    const config = workerConfigFor(name, stagingConfig, policy);
    const identity = validateStagingConfig(config, policy);
    assert.equal(identity.worker, name);
    assert.equal(identity.database_name, 'ej-learning-36-db');
    assert.equal(identity.database_id, 'fcd78cc9-5f99-4677-9764-3713e3d1226b');
    assert.equal(identity.session_storage_id, '3a4a888f427d4d419ee6f56368338e71');
  }
});

test('phase-based replacement D1 is rejected', () => {
  const invalid = structuredClone(stagingConfig);
  invalid.name = 'ej-learning-37';
  invalid.d1_databases[0].database_name = 'ej-learning-37-db';
  invalid.d1_databases[0].database_id = '00000000-0000-0000-0000-000000000037';
  assert.throws(() => validateStagingConfig(invalid, policy), /persistent staging D1/);
});

test('dataset version schema is idempotent and stores exact markers', () => {
  const db = new DatabaseSync(':memory:');
  const migration = fs.readFileSync(path.resolve('migrations-staging-schema/0001_curriculum_dataset_versions.sql'), 'utf8');
  db.exec(migration);
  db.exec(migration);
  const insert = db.prepare('INSERT INTO curriculum_dataset_versions(dataset_name,dataset_version,applied_at,row_count,checksum) VALUES(?,?,?,?,?)');
  for (const dataset of policy.datasets) insert.run(dataset.name, dataset.version, '2026-09-12T00:00:00Z', dataset.row_count, dataset.checksum);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM curriculum_dataset_versions').get().n, 5);
  db.close();
});

test('schema-only deploy migrations contain no curriculum DML or destructive rebuilds', () => {
  const files = fs.readdirSync(path.resolve(policy.schema_migrations)).filter(name => name.endsWith('.sql'));
  assert.ok(files.length > 0);
  for (const file of files) {
    const sql = fs.readFileSync(path.resolve(policy.schema_migrations, file), 'utf8');
    const triggers = sql.match(/^CREATE TRIGGER\b[\s\S]*?^END;\s*$/gim) || [];
    const topLevel = sql.replace(/^CREATE TRIGGER\b[\s\S]*?^END;\s*$/gim, '').replace(/^--.*$/gm, '');
    assert.doesNotMatch(topLevel, /\b(?:INSERT|UPDATE|DELETE|REPLACE)\b/i, file);
    for (const trigger of triggers) {
      const writeTargets = [...trigger.matchAll(/^\s*(?:INSERT(?:\s+OR\s+\w+)?\s+INTO|UPDATE|DELETE\s+FROM|REPLACE\s+INTO)\s+([a-z0-9_]+)/gim)].map(match => match[1]);
      assert.ok(writeTargets.every(table => ['vocabulary_progress', 'grammar_progress', 'lesson_progress', 'learning_attempts'].includes(table)), `${file} trigger writes only learner-progress tables`);
    }
    assert.doesNotMatch(sql, /\bDROP\s+TABLE\b/i, file);
  }
});

test('the exact historical bootstrap initializes a fresh SQLite database once', () => {
  const db = new DatabaseSync(':memory:');
  for (const configFile of policy.bootstrap_migration_configs) {
    const config = loadConfig(path.resolve(configFile));
    const directory = config.d1_databases.find(binding => binding.binding === policy.database.binding).migrations_dir;
    for (const file of fs.readdirSync(path.resolve(directory)).filter(name => name.endsWith('.sql')).sort()) {
      db.exec(fs.readFileSync(path.resolve(directory, file), 'utf8'));
    }
  }
  const counts = db.prepare(`SELECT
    (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='en' AND publication_state='published') AS en_vocabulary,
    (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published') AS ja_vocabulary,
    (SELECT COUNT(*) FROM v2_grammar_points WHERE language='en' AND publication_state='published') AS en_grammar,
    (SELECT COUNT(*) FROM v2_grammar_points WHERE language='ja' AND publication_state='published') AS ja_grammar,
    (SELECT COUNT(*) FROM lesson_units WHERE status='published') AS lessons`).get();
  assert.deepEqual({...counts}, {
    en_vocabulary: 10_000,
    ja_vocabulary: 8_235,
    en_grammar: 83,
    ja_grammar: 98,
    lessons: 64
  });
  assert.equal(db.prepare('SELECT total_changes() AS n').get().n, 89_508);
  db.close();
});
