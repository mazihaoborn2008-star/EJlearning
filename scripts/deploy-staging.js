import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {deployPlan, loadConfig} from './staging-db-policy.js';

const config = path.resolve(process.argv[2] || 'wrangler.36.jsonc');
const plan = deployPlan(loadConfig(config));
const dryRun = process.argv.includes('--dry-run');
const wranglerBin = path.resolve('node_modules/wrangler/bin/wrangler.js');
const run = args => {
  const result = spawnSync(process.execPath, [wranglerBin, ...args], {stdio: 'inherit'});
  if (result.status !== 0) throw Error(`Wrangler failed (${result.status}): ${result.error?.message || args.join(' ')}`);
};

console.log(JSON.stringify({
  event: 'staging_deploy_policy',
  worker: plan.identity.worker,
  database: plan.identity.database_name,
  database_id: plan.identity.database_id,
  mode: dryRun ? 'dry-run' : 'deploy',
  curriculum_seed_steps: 0,
  estimated_curriculum_row_writes: 0
}));
if (dryRun) {
  run(['d1', 'migrations', 'list', 'DB', '--remote', '--config', config]);
  run(['deploy', '--dry-run', '--config', config]);
  process.exit(0);
}
run(['d1', 'migrations', 'apply', 'DB', '--remote', '--config', config]);
run(['deploy', '--config', config]);
