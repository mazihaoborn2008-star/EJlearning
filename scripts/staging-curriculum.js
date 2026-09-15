import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {curriculumCountSql, loadPolicy, sameDataset} from './staging-db-policy.js';

const command = process.argv[2] || 'help';
const datasetName = process.argv[3];
const flags = new Set(process.argv.slice(command === 'update' ? 4 : 3));
const config = path.resolve('wrangler.36.jsonc');
const policy = loadPolicy();
const wranglerBin = path.resolve('node_modules/wrangler/bin/wrangler.js');
const expectedCounts = Object.fromEntries(policy.datasets.map(dataset => [dataset.name, dataset.row_count]));

function runWrangler(args, capture = false) {
  const result = spawnSync(process.execPath, [wranglerBin, ...args], {
    encoding: capture ? 'utf8' : undefined,
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
    maxBuffer: 20 * 1024 * 1024
  });
  if (result.status !== 0) throw Error(`Wrangler failed (${result.status}): ${result.error?.message || args.join(' ')}`);
  return result.stdout || '';
}

function execute(sql) {
  const output = runWrangler(['d1', 'execute', 'DB', '--remote', '--config', config, '--command', sql, '--json'], true).trim();
  const start = output.indexOf('[');
  if (start < 0) throw Error('Wrangler returned no JSON result');
  const payload = JSON.parse(output.slice(start));
  return payload.flatMap(batch => batch.results || []);
}

function quote(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function readCounts() {
  const row = execute(curriculumCountSql)[0];
  if (!row) throw Error('Could not read curriculum counts');
  return Object.fromEntries(Object.entries(row).map(([name, value]) => [name, Number(value)]));
}

function assertExpectedCounts(counts) {
  for (const [name, expected] of Object.entries(expectedCounts)) {
    if (counts[name] !== expected) throw Error(`${name}: expected ${expected}, found ${counts[name]}`);
  }
}

function tableExists() {
  return Number(execute("SELECT COUNT(*) AS n FROM sqlite_master WHERE type='table' AND name='curriculum_dataset_versions'")[0]?.n) === 1;
}

function installedDatasets() {
  if (!tableExists()) return [];
  return execute('SELECT dataset_name,dataset_version,applied_at,row_count,checksum FROM curriculum_dataset_versions ORDER BY dataset_name');
}

function writeMarkers(datasets) {
  if (!datasets.length) return;
  const values = datasets.map(dataset => `(${quote(dataset.name)},${quote(dataset.version)},datetime('now'),${dataset.row_count},${quote(dataset.checksum)})`).join(',');
  execute(`INSERT INTO curriculum_dataset_versions(dataset_name,dataset_version,applied_at,row_count,checksum) VALUES ${values} ON CONFLICT(dataset_name) DO UPDATE SET dataset_version=excluded.dataset_version,applied_at=excluded.applied_at,row_count=excluded.row_count,checksum=excluded.checksum`);
}

function applySchema() {
  runWrangler(['d1', 'migrations', 'apply', 'DB', '--remote', '--config', config]);
}

function applyDatasetMigrations(dataset) {
  runWrangler(['d1', 'migrations', 'apply', 'DB', '--remote', '--config', path.resolve(dataset.update_migration_config)]);
}

function showStatus() {
  const counts = readCounts();
  const installed = installedDatasets();
  const byName = new Map(installed.map(dataset => [dataset.dataset_name, dataset]));
  const datasets = policy.datasets.map(dataset => ({
    name: dataset.name,
    requested_version: dataset.version,
    installed_version: byName.get(dataset.name)?.dataset_version || null,
    count: counts[dataset.name],
    expected_count: dataset.row_count,
    exact_match: sameDataset(byName.get(dataset.name), dataset)
  }));
  console.log(JSON.stringify({database: policy.database, counts, datasets}, null, 2));
}

function adopt() {
  if (!flags.has('--confirm-existing-data')) {
    throw Error('Adoption writes five version markers. Re-run with --confirm-existing-data after reviewing status.');
  }
  const counts = readCounts();
  assertExpectedCounts(counts);
  applySchema();
  const installed = new Map(installedDatasets().map(dataset => [dataset.dataset_name, dataset]));
  const missing = policy.datasets.filter(dataset => !sameDataset(installed.get(dataset.name), dataset));
  writeMarkers(missing);
  console.log(JSON.stringify({event: 'curriculum_adopted', counts, metadata_rows_written: missing.length}, null, 2));
}

function bootstrap() {
  if (!flags.has('--confirm-empty-staging')) {
    throw Error('Full bootstrap is only for an authorized empty persistent staging D1. Re-run with --confirm-empty-staging.');
  }
  const userTables = Number(execute("SELECT COUNT(*) AS n FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%' AND name<>'d1_migrations'")[0]?.n);
  if (userTables !== 0) throw Error(`Bootstrap refused: persistent staging D1 has ${userTables} user tables.`);
  for (const migrationConfig of policy.bootstrap_migration_configs) {
    runWrangler(['d1', 'migrations', 'apply', 'DB', '--remote', '--config', path.resolve(migrationConfig)]);
  }
  applySchema();
  const counts = readCounts();
  assertExpectedCounts(counts);
  writeMarkers(policy.datasets);
  console.log(JSON.stringify({event: 'curriculum_bootstrapped_once', counts, metadata_rows_written: policy.datasets.length}, null, 2));
}

function update() {
  const dataset = policy.datasets.find(item => item.name === datasetName);
  if (!dataset) throw Error(`Unknown dataset: ${datasetName || '(missing)'}`);
  const installed = installedDatasets().find(item => item.dataset_name === dataset.name);
  if (sameDataset(installed, dataset)) {
    if (flags.has('--confirm-dataset-update') && dataset.update_migration_config) {
      applyDatasetMigrations(dataset);
      const counts = readCounts();
      if (counts[dataset.name] !== dataset.row_count) throw Error(`${dataset.name}: reconciliation produced ${counts[dataset.name]} rows; expected ${dataset.row_count}`);
      console.log(JSON.stringify({event: 'curriculum_dataset_reconciled', dataset: dataset.name, version: dataset.version, row_count: dataset.row_count}));
      return;
    }
    console.log(JSON.stringify({event: 'curriculum_update_skipped', dataset: dataset.name, reason: 'exact_version_count_checksum_match'}));
    return;
  }
  if (!flags.has('--confirm-dataset-update')) throw Error('Dataset update requires --confirm-dataset-update.');
  if (!dataset.update_migration_config) throw Error(`No reviewed delta migration is registered for ${dataset.name}; refusing a bulk rewrite.`);
  applyDatasetMigrations(dataset);
  const counts = readCounts();
  if (counts[dataset.name] !== dataset.row_count) throw Error(`${dataset.name}: update produced ${counts[dataset.name]} rows; expected ${dataset.row_count}`);
  writeMarkers([dataset]);
  console.log(JSON.stringify({event: 'curriculum_dataset_updated', dataset: dataset.name, version: dataset.version, row_count: dataset.row_count}));
}

const commands = {status: showStatus, adopt, bootstrap, update};
if (!commands[command]) {
  console.log('Usage: node scripts/staging-curriculum.js status | adopt --confirm-existing-data | bootstrap --confirm-empty-staging | update <dataset> --confirm-dataset-update');
  process.exit(command === 'help' ? 0 : 1);
}
commands[command]();
