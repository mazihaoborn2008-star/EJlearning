import {spawn,spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const config='wrangler.phase3.jsonc',directory=path.resolve('.wrangler','phase3-clean-'+Date.now()),wrangler=path.resolve('node_modules/wrangler/bin/wrangler.js');
const cfg=JSON.parse(fs.readFileSync(config,'utf8'));assert.equal(cfg.name,'ej-learning-phase3');assert.equal(cfg.d1_databases[0].database_name,'ej-learning-phase3-db');assert.notEqual(cfg.d1_databases[0].database_id,'e2e8f4c8-27e0-416e-993c-7510259a6b1d');assert.equal(cfg.routes.length,0);
function run(args){const r=spawnSync(process.execPath,[wrangler,...args,'--config',config],{encoding:'utf8',env:{...process.env,CI:'true'},maxBuffer:20*1024*1024});if(r.status!==0)throw Error(r.stdout+r.stderr);return r.stdout;}
console.log('Applying all migrations to a new isolated local database…');
run(['d1','migrations','apply','DB','--local','--persist-to',directory]);
const repeat=run(['d1','migrations','apply','DB','--local','--persist-to',directory]);assert(repeat.includes('No migrations'));
const sql=`PRAGMA foreign_key_check;
SELECT COUNT(*) AS concepts, SUM(published) AS published FROM concepts;
SELECT COUNT(*) AS expressions FROM expressions;
SELECT language,purpose,COUNT(*) AS questions,COUNT(DISTINCT difficulty) AS levels FROM placement_questions WHERE active=1 GROUP BY language,purpose;
SELECT COUNT(*) AS missing_keys FROM placement_questions q LEFT JOIN placement_answer_keys k ON k.question_id=q.id WHERE k.question_id IS NULL;
SELECT COUNT(*) AS invalid_options FROM (SELECT q.id FROM placement_questions q LEFT JOIN placement_options o ON o.question_id=q.id GROUP BY q.id HAVING COUNT(o.option_id)<3);
SELECT COUNT(*) AS missing_primary FROM concepts c WHERE (SELECT COUNT(*) FROM expressions e WHERE e.concept_id=c.id AND e.is_primary=1)!=2;
SELECT COUNT(*) AS invalid_json FROM expressions WHERE NOT json_valid(metadata_json);
SELECT COUNT(*) AS sessions FROM assessment_sessions;`;
const db=JSON.parse(run(['d1','execute','DB','--local','--persist-to',directory,'--command',sql,'--json']));
assert.equal(db[0].results.length,0);assert.deepEqual(db[1].results,[{concepts:183,published:183}]);assert.equal(db[2].results[0].expressions,366);for(const r of db[3].results){assert.equal(r.levels,6);assert.equal(r.questions,r.purpose==='placement'?192:183);}for(const result of db.slice(4))assert.equal(Object.values(result.results[0])[0],0);
const base='http://127.0.0.1:8792',server=spawn(process.execPath,[wrangler,'dev','--config',config,'--port','8792','--persist-to',directory],{stdio:['ignore','pipe','pipe'],env:{...process.env,CI:'true'}});let logs='';server.stdout.on('data',b=>logs+=b);server.stderr.on('data',b=>logs+=b);
try{
 let ready=false;for(let i=0;i<120;i++){if(server.exitCode!==null)throw Error(logs);try{if((await fetch(base+'/api/topics')).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,250));}assert(ready,logs);
 for(const args of [['--test','tests/phase3-engine.test.js','tests/phase3-api.test.js'],['scripts/audit-phase3.js'],['tests/phase3-browser.cjs']]){const status=await new Promise(resolve=>{const c=spawn(process.execPath,args,{stdio:'inherit',env:{...process.env,BASE_URL:base,AUDIT_LABEL:'clean',TEST_LABEL:'clean'}});c.on('exit',resolve);});assert.equal(status,0);}
 fs.writeFileSync('tests/phase3-clean-db.json',JSON.stringify({passed:true,directory,migrations:fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')),reapplication:'No migrations to apply',databaseChecks:db.map(r=>r.results)},null,2));console.log('Clean migration, API, browser and curriculum checks passed.');
}finally{server.kill();}
