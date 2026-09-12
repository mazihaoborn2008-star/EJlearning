import fs from 'node:fs';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import local from '../src/lesson-bundle-35d.js';

const result=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--remote','--config','wrangler.35d.jsonc','--command',"SELECT id,schema_version,published_at,payload_json FROM lesson_bundles WHERE id='phase-35d-v1' LIMIT 1",'--json'],{encoding:'utf8',maxBuffer:5*1024*1024});
if(result.status)throw Error(result.stderr||result.stdout);
const row=JSON.parse(result.stdout.slice(result.stdout.indexOf('[')))[0].results[0];
if(!row)throw Error('Remote lesson bundle is missing.');
const remote=JSON.parse(row.payload_json),hash=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
const report={verified_at:new Date().toISOString(),database:'ej-learning-35d-db',bundle_id:row.id,schema_version:row.schema_version,local_sha256:hash(local),remote_sha256:hash(remote),match:hash(local)===hash(remote),lessons:remote.u.length,lesson_links:remote.i.length,exam_recommendations:remote.e.length};
if(!report.match||report.lessons!==48||report.lesson_links!==718)throw Error('Remote bundle differs from audited composition.');
fs.writeFileSync('docs/phase35d/d1-staging.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
