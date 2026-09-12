// Controlled route-only cutover and rollback. Does not deploy code or mutate DNS/D1/Tunnel.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const account='bd05aa19111be95427af89be4e44f164',pattern='ej_learning.jwcglass.com/*',script='ej-learning';
const cfg=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config/.wrangler/config/default.toml'),'utf8');
const token=cfg.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];if(!token)throw Error('Wrangler authentication required');
async function api(route,method='GET',body){const r=await fetch('https://api.cloudflare.com/client/v4/'+route,{method,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const j=await r.json();if(!j.success)throw Error(JSON.stringify(j.errors));return j.result;}
const record='.wrangler/production-route.json';
if(process.argv[2]==='rollback'){
 const saved=JSON.parse(fs.readFileSync(record,'utf8'));assert.equal(saved.pattern,pattern);assert.equal(saved.script,script);
 const routes=await api(`zones/${saved.zoneId}/workers/routes`),route=routes.find(r=>r.id===saved.id);
 assert(route&&route.pattern===pattern&&route.script===script,'Recorded route changed; manual review required');
 await api(`zones/${saved.zoneId}/workers/routes/${saved.id}`,'DELETE');console.log('Removed only recorded production route',saved.id);
}else if(process.argv[2]==='create'){
 const zones=await api('zones?name=jwcglass.com');assert.equal(zones.length,1);assert.equal(zones[0].account.id,account);assert.equal(zones[0].status,'active');
 const zoneId=zones[0].id,routes=await api(`zones/${zoneId}/workers/routes`);assert.equal(routes.length,0,'Route state differs from approved handoff; stop for review');
 const deployments=await api(`accounts/${account}/workers/scripts/${script}/deployments`);
 assert(deployments.deployments[0].versions.some(v=>v.version_id==='19a090dc-4321-46af-a7cc-33995746dc10'&&v.percentage===100),'Unexpected deployed version');
 const old=await fetch('https://ej_learning.jwcglass.com/'),local=await fetch('http://127.0.0.1:8765/');assert.equal(old.status,200);assert(old.headers.get('cf-ray'));assert.equal(await old.text(),await local.text(),'Origin differs from rollback origin');
 const staged=await fetch('https://ej-learning.yanjian-language-learning.workers.dev/api/concepts');assert.equal(staged.status,200);assert.equal((await staged.json()).data.length,15);
 const created=await api(`zones/${zoneId}/workers/routes`,'POST',{pattern,script});
 const result={...created,zoneId,pattern,script,createdAt:new Date().toISOString()};fs.writeFileSync(record,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}else throw Error('Choose create or rollback');
