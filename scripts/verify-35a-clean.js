import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const directory=path.resolve('.wrangler','35a-clean-'+Date.now()),config='wrangler.35a.local.jsonc',port=8796;
const cfg=JSON.parse(fs.readFileSync(config,'utf8'));assert.equal(cfg.name,'ej-learning-35a');assert.deepEqual(cfg.routes,[]);assert.equal(cfg.d1_databases[0].database_name,'ej-learning-35a-db');
async function run(args,env={}){const result=await new Promise(resolve=>{const p=spawn(process.execPath,args,{stdio:'inherit',env:{...process.env,CI:'true',...env}});p.on('error',()=>resolve(-1));p.on('exit',resolve);});assert.equal(result,0,args.join(' '));}
await run(['scripts/prepare-35a.js']);
await run(['node_modules/wrangler/bin/wrangler.js','d1','migrations','apply','DB','--local','--config',config,'--persist-to',directory]);
await run(['scripts/verify-35a-d1.js'],{D1_DIRECTORY:directory});
const server=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--config',config,'--port',String(port),'--persist-to',directory],{stdio:['ignore','pipe','pipe'],env:{...process.env,CI:'true'}});
let logs='';server.stdout.on('data',b=>logs+=b);server.stderr.on('data',b=>logs+=b);
const BASE_URL='http://127.0.0.1:'+port;
try{
 let ready=false;for(let i=0;i<120;i++){if(server.exitCode!==null)throw Error(logs);try{if((await fetch(BASE_URL+'/api/v2/vocabulary')).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,250));}assert(ready,logs);
 await run(['--test','tests/phase35a-db.test.js','tests/phase35a-api.test.js','tests/phase3-api.test.js','tests/phase3-engine.test.js'],{BASE_URL});
 await run(['tests/phase3-browser.cjs'],{BASE_URL,TEST_LABEL:'35a-clean'});
 await run(['scripts/audit-phase3.js'],{BASE_URL,AUDIT_LABEL:'35a-clean'});
 fs.writeFileSync('docs/phase35a/clean-run.json',JSON.stringify({passed:true,directory,config,allMigrations:fs.readdirSync('migrations-v2').sort(),finishedAt:new Date().toISOString()},null,2));
}finally{
 if(process.platform==='win32')await new Promise(resolve=>{const cleanup=spawn('taskkill',['/PID',String(server.pid),'/T','/F'],{stdio:'ignore'});cleanup.on('exit',resolve);cleanup.on('error',resolve);});
 else server.kill();
}
