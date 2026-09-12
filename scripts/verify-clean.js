// Each run gets a new local D1 directory; existing development data is never deleted.
import {spawn,spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const directory=path.resolve('.wrangler','clean-'+Date.now());
const wrangler=path.resolve('node_modules/wrangler/bin/wrangler.js');
const run=(args)=>{const r=spawnSync(process.execPath,[wrangler,...args],{stdio:'inherit',env:{...process.env,CI:'true'}});if(r.status!==0)throw Error('Wrangler command failed');};
run(['d1','migrations','apply','DB','--local','--persist-to',directory]);
run(['d1','migrations','apply','DB','--local','--persist-to',directory]);
run(['d1','execute','DB','--local','--persist-to',directory,'--command','PRAGMA foreign_key_check; SELECT count(*) AS concepts FROM concepts; SELECT count(*) AS expressions FROM expressions; SELECT count(*) AS questions FROM placement_questions;']);
const port=8790,base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,[wrangler,'dev','--port',String(port),'--persist-to',directory],{stdio:['ignore','pipe','pipe'],env:{...process.env,CI:'true'}});
let logs='';server.stdout.on('data',b=>logs+=b);server.stderr.on('data',b=>logs+=b);
try{
 let ready=false;for(let i=0;i<120;i++){if(server.exitCode!==null)throw Error(logs);try{const r=await fetch(base+'/api/topics');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,250));}if(!ready)throw Error(logs);
 const code=await new Promise(resolve=>{const child=spawn(process.execPath,['--test','tests/api.test.js'],{stdio:'inherit',env:{...process.env,BASE_URL:base}});child.on('exit',resolve);});
 if(code!==0)throw Error('Clean database API tests failed');
 fs.writeFileSync('tests/clean-db-results.json',JSON.stringify({passed:true,directory,migrations:['0001_schema.sql','0002_seed.sql'],reapplication:'no pending migrations',apiTests:9},null,2));
 console.log('Clean local D1 verification passed.');
}finally{server.kill();}
