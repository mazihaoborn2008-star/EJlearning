import assert from 'node:assert/strict';
import fs from 'node:fs';

const configPath='wrangler.35d.jsonc';
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));

assert.equal(config.name,'ej-learning-35d','DeepSeek bindings must target only the Phase 3.5D staging Worker.');
assert.equal(config.env,undefined,'The Phase 3.5D staging config must not require a Wrangler --env selector.');
assert.equal(config.vars?.DEEPSEEK_BASE_URL,'https://api.deepseek.com');
assert.equal(config.vars?.DEEPSEEK_MODEL,'deepseek-v4-flash');
assert.equal(Object.hasOwn(config.vars??{},'DEEPSEEK_API_KEY'),false,'DEEPSEEK_API_KEY must not be a plaintext var.');
assert.deepEqual(config.secrets?.required,['DEEPSEEK_API_KEY'],'DEEPSEEK_API_KEY must be declared as the only required secret for this integration.');

const ignored=fs.readFileSync('.gitignore','utf8').split(/\r?\n/).map(line=>line.trim());
assert(ignored.includes('.dev.vars*'),'.dev.vars files must remain git-ignored.');
assert(ignored.includes('.env*'),'.env files must remain git-ignored.');

console.log('DeepSeek staging config check passed: required secret binding declared; non-secret defaults present.');
