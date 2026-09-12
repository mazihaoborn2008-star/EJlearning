// Narrow release tool: the only writable remote targets are the dedicated 35a resources.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const config='wrangler.35a.jsonc',cfg=JSON.parse(fs.readFileSync(config,'utf8'));
assert.equal(cfg.name,'ej-learning-35a');assert.equal(cfg.main,'src/worker-v2.js');assert.equal(cfg.workers_dev,true);
assert.deepEqual(cfg.routes,[]);assert(!cfg.route);assert(!cfg.triggers);assert.equal(cfg.assets.directory,'./public');
assert.equal(cfg.d1_databases.length,1);const db=cfg.d1_databases[0];
assert.equal(db.database_name,'ej-learning-35a-db');assert.equal(db.migrations_dir,'migrations-v2');
assert(!['00000000-0000-0000-0000-000000000035','e2e8f4c8-27e0-416e-993c-7510259a6b1d','36c72b9b-da1f-425c-9b1a-6603b0f7d150'].includes(db.database_id));
for(const file of fs.readdirSync('migrations'))assert(fs.readFileSync('migrations/'+file).equals(fs.readFileSync('migrations-v2/'+file)));
const command=process.argv[2];
const args=command==='migrate'?['d1','migrations','apply','DB','--remote']:command==='deploy'?['deploy']:command==='dry-run'?['deploy','--dry-run']:null;
assert(args,'Use migrate, deploy or dry-run');
const r=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js',...args,'--config',config],{stdio:'inherit',env:{...process.env,CI:'true'}});process.exit(r.status??1);
