import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const config=JSON.parse(fs.readFileSync('wrangler.35d1.jsonc','utf8'));
assert.equal(config.name,'ej-learning-35d1');
assert.equal(config.main,'src/worker-35d1.js');
assert.equal(config.assets?.directory,'./public-35d1');
assert.equal(config.env,undefined,'The isolated Worker does not use a Wrangler named environment.');
assert.equal(config.vars?.DEEPSEEK_BASE_URL,'https://api.deepseek.com');
assert.equal(config.vars?.DEEPSEEK_MODEL,'deepseek-v4-flash');
assert.equal(Object.hasOwn(config.vars??{},'DEEPSEEK_API_KEY'),false,'The API key must never be a plaintext var.');
assert.deepEqual(config.secrets?.required,['DEEPSEEK_API_KEY']);
assert.deepEqual(config.d1_databases?.map(x=>[x.binding,x.database_id]),[['DB','2cd594d3-cab0-4715-a154-9ea3d099c4c7'],['CONTENT_DB','3bf1fc19-e5ce-4521-b051-94f91fedfd82']]);
assert(config.d1_databases.every(x=>!Object.hasOwn(x,'migrations_dir')),'Phase 3.5D.1 must not own or migrate curriculum databases.');
assert.deepEqual(config.ratelimits?.map(x=>x.name),['AI_RATE_LIMITER','AI_SHARED_RATE_LIMITER']);

const frontend=[];
const walk=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else frontend.push(full);}};
walk('public-35d1');
const frontendSource=frontend.filter(file=>/\.(?:html|js|css)$/.test(file)).map(file=>fs.readFileSync(file,'utf8')).join('\n');
assert(!frontendSource.includes('DEEPSEEK_API_KEY'),'The frontend must not reference the secret binding.');
assert(!frontendSource.includes('api.deepseek.com'),'The frontend must not receive or select the provider URL.');
assert(!frontendSource.includes('deepseek-v4-flash'),'The frontend must not receive or select the model.');

const endpoint=fs.readFileSync('src/ai-examples-35d1.js','utf8');
assert(!/\b(?:INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|REPLACE\s+INTO|CREATE\s+TABLE|ALTER\s+TABLE|DROP\s+TABLE)\b/i.test(endpoint),'The AI endpoint must remain read-only.');
assert(!/console\.(?:log|error|warn)\([^\n]*(?:DEEPSEEK_API_KEY|Authorization|prompt)/.test(endpoint),'Sensitive provider material must not be logged.');

console.log('Phase 3.5D.1 isolation/config audit passed.');
