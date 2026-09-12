import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {DatabaseSync} from 'node:sqlite';
import {audit} from './audit-35c.js';
const remote=process.argv.includes('--remote'),config=remote?'wrangler.35c1.jsonc':'wrangler.35c1.local.jsonc',cfg=JSON.parse(fs.readFileSync(config));
assert.equal(cfg.name,remote?'ej-learning-35c1':'ej-learning-35c1-local');assert.equal(cfg.d1_databases[0].database_id,remote?'3bf1fc19-e5ce-4521-b051-94f91fedfd82':'35c10000-0000-4000-8000-000000000001');
const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');for(const f of fs.readdirSync('migrations-35c1').sort())db.exec(fs.readFileSync('migrations-35c1/'+f,'utf8'));
let token;if(remote){const auth=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config/.wrangler/config/default.toml'),'utf8');token=process.env.CLOUDFLARE_API_TOKEN||auth.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];assert(token);}
async function query(sql){assert(/^SELECT|^PRAGMA foreign_key_check/.test(sql));if(remote){const r=await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfg.account_id}/d1/database/${cfg.d1_databases[0].database_id}/query`,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({sql})});const b=await r.json();assert(b.success,'Isolated D1 read failed '+r.status);return b.result[0].results;}
const dir=path.join(process.env.D1_DIRECTORY||'.wrangler/35c1-local','v3/d1/miniflare-D1DatabaseObject');const files=fs.readdirSync(dir).filter(f=>f.endsWith('.sqlite')&&f!=='metadata.sqlite');assert.equal(files.length,1);const local=new DatabaseSync(path.join(dir,files[0]),{readOnly:true});try{return JSON.parse(JSON.stringify(local.prepare(sql).all()));}finally{local.close();}}
const data={},tables=db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name<>'assessment_sessions'").all();
for(const {name} of tables){assert(/^[a-z0-9_]+$/.test(name));const actual=await query('SELECT * FROM '+name+' ORDER BY rowid'),expected=JSON.parse(JSON.stringify(db.prepare('SELECT * FROM '+name+' ORDER BY rowid').all()));assert.deepEqual(actual,expected,name);if(name.startsWith('v2_'))data[name]=actual;}
assert.deepEqual(await query('PRAGMA foreign_key_check'),[]);const migrations=await query('SELECT name FROM d1_migrations ORDER BY id');assert.deepEqual(migrations.map(x=>x.name),fs.readdirSync('migrations-35c1').sort());
const report=audit(data);assert(report.passed,JSON.stringify(report.errors));fs.mkdirSync('docs/phase35c1',{recursive:true});fs.writeFileSync(`docs/phase35c1/audit-${remote?'staging':'d1-local'}.json`,JSON.stringify({...report,verifiedTables:tables.map(x=>x.name),exactMatchToCleanMigration:true,migrations},null,2));console.log('Isolated D1 exact table comparison and curriculum audit passed: '+(remote?'remote':'local'));
