import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const cfg=JSON.parse(fs.readFileSync('wrangler.35b.jsonc','utf8')),account=cfg.account_id;
const auth=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config/.wrangler/config/default.toml'),'utf8');
const token=process.env.CLOUDFLARE_API_TOKEN||auth.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
async function get(route){const r=await fetch('https://api.cloudflare.com/client/v4/'+route,{headers:{Authorization:'Bearer '+token}}),b=await r.json();assert(b.success,'Read-only release check '+r.status);return b.result;}
const settings=await get(`accounts/${account}/workers/scripts/ej-learning-35b/settings`);
assert.equal(settings.bindings.find(x=>x.name==='DB').id,cfg.d1_databases[0].database_id);
assert(!(await get(`accounts/${account}/workers/domains`)).some(x=>x.service==='ej-learning-35b'));
for(const zone of await get('zones?name=jwcglass.com'))assert(!(await get(`zones/${zone.id}/workers/routes`)).some(x=>x.script==='ej-learning-35b'));
const deployments=await get(`accounts/${account}/workers/scripts/ej-learning-35b/deployments`);
assert.equal((await get(`accounts/${account}/workers/scripts/ej-learning-35b/subdomain`)).enabled,true);
const before=JSON.parse(fs.readFileSync('docs/phase35b/integrity-before.json')),after=JSON.parse(fs.readFileSync('docs/phase35b/integrity-after.json'));
// New 35b-owned source files are allowed; every previously existing protected file must be identical.
for(const [file,hash] of Object.entries(before.localHashes))assert.equal(after.localHashes[file],hash,file);
const {localHashes:b,...remoteBefore}=before,{localHashes:a,...remoteAfter}=after;assert.deepEqual(remoteAfter,remoteBefore);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);}
for(const file of walk('public'))assert(fs.readFileSync(file).equals(fs.readFileSync(file.replace(/^public\//,'public-v2/legacy/'))),file);
const base='https://ej-learning-35b.yanjian-language-learning.workers.dev';
for(const route of ['/','/vocabulary.html','/grammar.html','/sentences.html','/academic.html','/ielts.html','/jlpt.html','/ai.html','/progress.html','/legacy/','/api/v2/sentences/academic-approach'])assert.equal((await fetch(base+route)).status,200,route);
for(const route of ['/src/worker-35b.js','/migrations-35b/0010_academic_expression_example.sql','/docs/phase35b/integrity-before.json','/scripts/prepare-35b.js','/wrangler.35b.jsonc'])assert.equal((await fetch(base+route)).status,404,route);
fs.writeFileSync('docs/phase35b/release-verification.json',JSON.stringify({passed:true,worker:cfg.name,database:cfg.d1_databases[0],url:base,deployments,customDomains:[],customRoutes:[],protectedEnvironments:['ej-learning','ej-learning-phase3','ej-learning-35a'],remoteBeforeAfterEqual:true,protectedLocalFilesUnchanged:Object.keys(b).length,legacyAssetsByteIdentical:true,privatePaths404:true,checkedAt:new Date().toISOString()},null,2));
console.log('35b deployment binding, routing/privacy, legacy copies and all three protected environments verified.');
