import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const config='wrangler.35c1.jsonc',c=JSON.parse(fs.readFileSync(config));
assert.equal(c.name,'ej-learning-35c1');
assert.equal(c.main,'src/worker-35c1.js');
assert.equal(c.assets.directory,'./public-35c1');
assert.deepEqual(c.routes,[]);assert(!c.route&&!c.triggers);assert.equal(c.workers_dev,true);
assert.deepEqual(c.d1_databases,[{binding:'DB',database_name:'ej-learning-35c1-db',database_id:'3bf1fc19-e5ce-4521-b051-94f91fedfd82',migrations_dir:'migrations-35c1'}]);
for(const f of fs.readdirSync('migrations-35c'))assert(fs.readFileSync('migrations-35c/'+f).equals(fs.readFileSync('migrations-35c1/'+f)),f);
const command=process.argv[2];assert(['migrate','deploy','check'].includes(command));
const args=command==='migrate'?['d1','migrations','apply','DB','--remote']:command==='deploy'?['deploy']:['deploy','--dry-run'];
const result=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js',...args,'--config',config],{stdio:'inherit',env:{...process.env,CI:'true'}});
process.exit(result.status??1);
