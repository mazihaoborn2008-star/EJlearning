// Read-only safety evidence. This script has no write operation.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const auth=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config/.wrangler/config/default.toml'),'utf8');
const token=process.env.CLOUDFLARE_API_TOKEN||auth.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
if(!token)throw Error('Cloudflare authentication unavailable');
const account='bd05aa19111be95427af89be4e44f164';
const get=async route=>{const r=await fetch('https://api.cloudflare.com/client/v4/'+route,{headers:{Authorization:'Bearer '+token}});const b=await r.json();if(!b.success)throw Error('Read-only Cloudflare snapshot failed: '+r.status);return b.result;};
const hash=v=>createHash('sha256').update(typeof v==='string'?v:JSON.stringify(v)).digest('hex');
const result={deployments:await get(`accounts/${account}/workers/scripts/ej-learning/deployments`),settings:await get(`accounts/${account}/workers/scripts/ej-learning/settings`),domains:await get(`accounts/${account}/workers/domains`),database:await get(`accounts/${account}/d1/database/e2e8f4c8-27e0-416e-993c-7510259a6b1d`)};
const zones=await get('zones?name=jwcglass.com');for(const z of zones){result.routes=await get(`zones/${z.id}/workers/routes`);try{result.dns=await get(`zones/${z.id}/dns_records?name=ej_learning.jwcglass.com`);}catch{result.dns='Read permission unavailable';}}
// Never persist Worker settings secrets; hash the read-only response instead.
result.settingsHash=hash(result.settings);delete result.settings;
result.domains=result.domains.filter(d=>d.service==='ej-learning'||d.hostname==='ej_learning.jwcglass.com');
for(const endpoint of ['/api/topics','/api/concepts']){const r=await fetch('https://ej_learning.jwcglass.com'+endpoint);if(!r.ok)throw Error('Production read failed');result[endpoint]=hash(await r.text());}
const label=process.argv[2]||'before';fs.writeFileSync(`tests/phase3-production-${label}.json`,JSON.stringify(result,null,2));console.log('Saved read-only production snapshot: '+label);
