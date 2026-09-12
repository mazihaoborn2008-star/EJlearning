import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const config='wrangler.phase3.jsonc',cfg=JSON.parse(fs.readFileSync(config,'utf8'));
assert.equal(cfg.name,'ej-learning-phase3');assert.equal(cfg.d1_databases[0].database_id,'36c72b9b-da1f-425c-9b1a-6603b0f7d150');assert.deepEqual(cfg.routes,[]);
const base='https://ej-learning-phase3.yanjian-language-learning.workers.dev';
function query(sql){const r=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--remote','--config',config,'--command',sql,'--json'],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);return JSON.parse(r.stdout);}
// Synthetic expired test session only; never an existing learner or production record.
const id=crypto.randomUUID();query(`INSERT INTO assessment_sessions(id,kind,language,topic,state_json,version,expires_at) VALUES('${id}','placement','en',NULL,'{}',0,1);`);
const response=await fetch(base+'/api/placement/answer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:id,version:0,questionId:'en-1',optionId:0})});assert.equal(response.status,410);
const start=await fetch(base+'/api/placement/start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:'en'})});assert.equal(start.status,200);
const result=query(`SELECT COUNT(*) AS remaining FROM assessment_sessions WHERE id='${id}'; SELECT COUNT(*) AS completed_with_history FROM assessment_sessions WHERE json_extract(state_json,'$.response.complete')=1 AND json_array_length(json_extract(state_json,'$.history'))>0 AND expires_at>${Date.now()};`);
assert.equal(result[0].results[0].remaining,0);
// Older deployment's completed sessions may exist until their original expiry. Restrict final-version assurance via an explicit new complete run below.
let s=(await start.json()).data;const keys=JSON.parse(fs.readFileSync('tests/phase3-supplement-keys.json','utf8'));
while(!s.complete){const q=s.question;const option=keys[q.id]?.key??(q.id.startsWith('p3-')?(Number(q.id.split('-').at(-1))+1)%4:0);const r=await fetch(base+'/api/placement/answer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:s.sessionId,version:s.version,questionId:q.id,optionId:option})});assert.equal(r.status,200);s=(await r.json()).data;}
const completed=query(`SELECT json_array_length(json_extract(state_json,'$.history')) AS history_length FROM assessment_sessions WHERE id='${s.sessionId}';`);assert.equal(completed[0].results[0].history_length,0);
fs.writeFileSync('tests/phase3-staging-session-checks.json',JSON.stringify({passed:true,expiredStatus:response.status,expiredRowRemoved:true,completedHistoryLength:0,scheduledCleanup:cfg.triggers.crons},null,2));console.log('Staging expiry, start cleanup, and completed-history removal passed.');
