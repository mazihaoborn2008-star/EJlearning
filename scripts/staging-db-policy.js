import fs from 'node:fs';
import path from 'node:path';

export const policyPath = path.resolve('config/staging-data-policy.json');
export const loadPolicy = (file = policyPath) => JSON.parse(fs.readFileSync(file, 'utf8'));
export const loadConfig = file => JSON.parse(fs.readFileSync(file, 'utf8'));

export const curriculumCountSql = `SELECT
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='en' AND publication_state='published') AS en_vocabulary,
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published') AS ja_vocabulary,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='en' AND publication_state='published') AS en_grammar,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='ja' AND publication_state='published') AS ja_grammar,
  (SELECT COUNT(*) FROM lesson_units WHERE status='published') AS lessons`;

export function validateStagingConfig(config, policy = loadPolicy()) {
  const databases = Array.isArray(config.d1_databases) ? config.d1_databases : [];
  const byBinding = new Map(databases.map(database => [database.binding, database]));
  for (const binding of [policy.database.binding, policy.database.content_binding]) {
    const database = byBinding.get(binding);
    if (!database) throw Error(`Missing persistent staging D1 binding: ${binding}`);
    if (database.database_name !== policy.database.name || database.database_id !== policy.database.id) {
      throw Error(`${config.name || 'Worker'} must bind ${binding} to persistent staging D1 ${policy.database.name} (${policy.database.id})`);
    }
  }
  const session = (config.kv_namespaces || []).find(namespace => namespace.binding === policy.session_storage.binding);
  if (!session || session.id !== policy.session_storage.id) throw Error(`Missing persistent staging KV binding: ${policy.session_storage.binding}`);
  if (byBinding.get(policy.database.binding).migrations_dir !== policy.schema_migrations) {
    throw Error(`Normal deploy may only use schema migrations: ${policy.schema_migrations}`);
  }
  return {
    worker: config.name,
    database_name: policy.database.name,
    database_id: policy.database.id,
    session_storage_id: policy.session_storage.id
  };
}

export const deployPlan = (config, policy = loadPolicy()) => ({
  identity: validateStagingConfig(config, policy),
  steps: ['apply_pending_schema_migrations', 'deploy_worker'],
  curriculum_seed_steps: [],
  estimated_curriculum_row_writes: 0
});

export const sameDataset = (installed, requested) => Boolean(
  installed &&
  installed.dataset_version === requested.version &&
  Number(installed.row_count) === requested.row_count &&
  installed.checksum === requested.checksum
);

export async function synchronizeDatasets({datasets, installed = [], applyDataset, writeMarker}) {
  const existing = new Map(installed.map(item => [item.dataset_name, item]));
  const results = [];
  for (const dataset of datasets) {
    if (sameDataset(existing.get(dataset.name), dataset)) {
      results.push({dataset: dataset.name, status: 'skipped', curriculum_row_writes: 0, metadata_row_writes: 0});
      continue;
    }
    const applied = await applyDataset(dataset, existing.get(dataset.name) || null);
    if (!applied || !Number.isInteger(applied.curriculum_row_writes) || applied.curriculum_row_writes < 0) {
      throw Error(`Importer did not report writes for ${dataset.name}`);
    }
    await writeMarker(dataset);
    results.push({dataset: dataset.name, status: 'applied', curriculum_row_writes: applied.curriculum_row_writes, metadata_row_writes: 1});
  }
  return {
    results,
    curriculum_row_writes: results.reduce((sum, item) => sum + item.curriculum_row_writes, 0),
    metadata_row_writes: results.reduce((sum, item) => sum + item.metadata_row_writes, 0)
  };
}

export function workerConfigFor(name, baseConfig, policy = loadPolicy()) {
  if (!/^ej-learning-[a-z0-9-]+$/.test(name)) throw Error('Invalid staging Worker name');
  const config = structuredClone(baseConfig);
  config.name = name;
  for (const database of config.d1_databases || []) {
    if ([policy.database.binding, policy.database.content_binding].includes(database.binding)) {
      database.database_name = policy.database.name;
      database.database_id = policy.database.id;
      if (database.binding === policy.database.binding) database.migrations_dir = policy.schema_migrations;
    }
  }
  const session = (config.kv_namespaces || []).find(namespace => namespace.binding === policy.session_storage.binding);
  if (session) session.id = policy.session_storage.id;
  validateStagingConfig(config, policy);
  return config;
}
