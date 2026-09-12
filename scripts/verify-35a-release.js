import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const cfg=JSON.parse(fs.readFileSync('wrangler.35a.jsonc','utf8')),account=cfg.account_id;
const auth=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config/.wrangler/config/default.toml'),'utf8');
const token=process.env.CLOUDFLARE_API_TOKEN||auth.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
async function get(route){const r=await fetch('https://api.cloudflare.com/client/v4/'+route,{headers:{Authorization:'Bearer '+token}});const data=await r.json();assert(data.success,'Read-only release query '+r.status);return data.result;}
const settings=await get(`accounts/${account}/workers/scripts/ej-learning-35a/settings`);
const binding=settings.bindings.find(x=>x.name==='DB');assert(binding);assert.equal(binding.type,'d1');assert.equal(binding.id,cfg.d1_databases[0].database_id);
const domains=await get(`accounts/${account}/workers/domains`);assert(!domains.some(x=>x.service==='ej-learning-35a'));
for(const zone of await get('zones?name=jwcglass.com'))assert(!(await get(`zones/${zone.id}/workers/routes`)).some(x=>x.script==='ej-learning-35a'));
const deployments=await get(`accounts/${account}/workers/scripts/ej-learning-35a/deployments`);
const subdomain=await get(`accounts/${account}/workers/scripts/ej-learning-35a/subdomain`);assert.equal(subdomain.enabled,true);
const base='https://ej-learning-35a.yanjian-language-learning.workers.dev',http={};
for(const endpoint of ['/','/learn.html','/progress.html','/placement.html','/checkpoint.html','/api/topics','/api/concepts','/api/v2/vocabulary','/api/v2/grammar','/api/v2/sentences/not-eaten','/api/v2/sentences/changed-plan']){
 const r=await fetch(base+endpoint);assert.equal(r.status,200,endpoint);http[endpoint]={status:r.status,sha256:createHash('sha256').update(await r.text()).digest('hex')};
}
for(const endpoint of ['/migrations-v2/0007_v2_representative.sql','/src/v2.js','/scripts/map-35a.js','/docs/phase35a/legacy-mapping.json','/wrangler.35a.jsonc'])assert.equal((await fetch(base+endpoint)).status,404);
const before=JSON.parse(fs.readFileSync('docs/phase35a/integrity-before.json')),after=JSON.parse(fs.readFileSync('docs/phase35a/integrity-after.json'));assert.deepEqual(before,after);
fs.writeFileSync('docs/phase35a/release-verification.json',JSON.stringify({passed:true,worker:cfg.name,database:cfg.d1_databases[0],base,deployments,workersDev:subdomain.enabled,customDomains:[],customRoutes:[],http,privatePathsStatus:404,protectedEnvironmentsUnchanged:true,checkedAt:new Date().toISOString()},null,2));
console.log('Isolated release binding, workers.dev, no custom domains/routes, pages, APIs, privacy and protected integrity verified.');
