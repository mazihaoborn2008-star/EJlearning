// Read-only discovery. Never prints authentication credentials.
import fs from 'node:fs';
import path from 'node:path';
const config=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config/.wrangler/config/default.toml'),'utf8');
const token=process.env.CLOUDFLARE_API_TOKEN||config.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
if(!token)throw Error('Run npx wrangler login first.');
const account='bd05aa19111be95427af89be4e44f164';
const get=async route=>{const response=await fetch('https://api.cloudflare.com/client/v4/'+route,{headers:{Authorization:'Bearer '+token}});const body=await response.json();if(!body.success)throw Error(JSON.stringify(body.errors));return body.result;};
const domains=await get(`accounts/${account}/workers/domains`);
const match=domains.filter(d=>d.hostname==='ej_learning.jwcglass.com');
console.log(JSON.stringify({domains:match},null,2));
for(const domain of match){
 const settings=await get(`accounts/${account}/workers/scripts/${domain.service}/settings`);
 console.log(JSON.stringify({worker:domain.service,settings},null,2));
 const deployments=await get(`accounts/${account}/workers/scripts/${domain.service}/deployments`);
 console.log(JSON.stringify({deployments},null,2));
}
if(!match.length){const projects=await get(`accounts/${account}/pages/projects`);console.log(JSON.stringify({pages:projects.map(p=>({name:p.name,domains:p.domains}))},null,2));const workers=await get(`accounts/${account}/workers/scripts`);console.log(JSON.stringify({workers:workers.map(w=>({id:w.id,modified_on:w.modified_on}))},null,2));const zones=await get('zones?name=jwcglass.com');for(const zone of zones){const routes=await get(`zones/${zone.id}/workers/routes`);console.log(JSON.stringify({routes},null,2));try{const dns=await get(`zones/${zone.id}/dns_records?name=ej_learning.jwcglass.com`);console.log(JSON.stringify({dns:dns.map(d=>({type:d.type,name:d.name,content:d.content,proxied:d.proxied}))},null,2));}catch{console.log('DNS read unavailable with current credentials.');}}}
