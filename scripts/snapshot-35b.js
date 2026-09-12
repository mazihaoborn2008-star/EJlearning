// Only GET and read-only SQL. Never calls assessment/recommendation endpoints.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const auth=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config/.wrangler/config/default.toml'),'utf8');
const token=process.env.CLOUDFLARE_API_TOKEN||auth.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
if(!token)throw Error('Authentication unavailable');
const account='bd05aa19111be95427af89be4e44f164';
const hash=v=>createHash('sha256').update(typeof v==='string'?v:JSON.stringify(v)).digest('hex');
async function call(route,sql){
 const r=await fetch('https://api.cloudflare.com/client/v4/'+route,{method:sql?'POST':'GET',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},...(sql?{body:JSON.stringify({sql})}:{})});
 const b=await r.json();if(!b.success)throw Error('Read-only snapshot failed: '+r.status);return b.result;
}
const output={};
for(const [name,id,base] of [
 ['ej-learning','e2e8f4c8-27e0-416e-993c-7510259a6b1d','https://ej_learning.jwcglass.com'],
 ['ej-learning-phase3','36c72b9b-da1f-425c-9b1a-6603b0f7d150','https://ej-learning-phase3.yanjian-language-learning.workers.dev'],['ej-learning-35a','c5476d39-27ab-4899-b212-671e893971ee','https://ej-learning-35a.yanjian-language-learning.workers.dev']]){
 const item={deployments:await call(`accounts/${account}/workers/scripts/${name}/deployments`),settingsHash:hash(await call(`accounts/${account}/workers/scripts/${name}/settings`))};
 const query=sql=>call(`accounts/${account}/d1/database/${id}/query`,sql);
 item.schema=(await query("SELECT type,name,sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' ORDER BY type,name"))[0].results;
 item.migrations=(await query('SELECT * FROM d1_migrations ORDER BY id'))[0].results;
 item.tableHashes={};
 // Transient sessions and Cloudflare internals are excluded; scheduled cleanup is expected.
 for(const table of item.schema.filter(r=>r.type==='table'&&!r.name.startsWith('_')&&r.name!=='assessment_sessions'&&r.name!=='d1_migrations')){
  if(!/^[a-z0-9_]+$/.test(table.name))throw Error('Unexpected identifier');
  const data=(await query(`SELECT * FROM ${table.name} ORDER BY rowid`))[0].results;item.tableHashes[table.name]={count:data.length,sha256:hash(data)};
 }
 item.http={};for(const endpoint of ['/','/api/topics','/api/concepts']){const r=await fetch(base+endpoint);if(!r.ok)throw Error('Protected environment unavailable');item.http[endpoint]=hash(await r.text());}
 output[name]=item;
}
output.domains=await call(`accounts/${account}/workers/domains`);
for(const zone of await call('zones?name=jwcglass.com')){
 output.routes=await call(`zones/${zone.id}/workers/routes`);
 try{output.dns=await call(`zones/${zone.id}/dns_records?name=ej_learning.jwcglass.com`);}catch{output.dns='read permission unavailable';}
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);}
output.localHashes=Object.fromEntries([...walk('public'),...walk('migrations'),...walk('migrations-v2'),...walk('src'),...walk('docs/phase35a'),...['src/worker.js','src/assessments.js','src/engine.js','package.json','package-lock.json','wrangler.jsonc','wrangler.phase3.jsonc','wrangler.production.jsonc','wrangler.staging.jsonc']].map(p=>[p,hash(fs.readFileSync(p))]));
const label=process.argv[2]||'before';fs.writeFileSync(`docs/phase35b/integrity-${label}.json`,JSON.stringify(output,null,2));console.log('Protected environments read-only snapshot saved: '+label);

