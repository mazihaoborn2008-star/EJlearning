import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
const base='https://ej-learning-phase3.yanjian-language-learning.workers.dev';
const files=fs.readdirSync('public',{recursive:true}).filter(p=>fs.statSync('public/'+p).isFile()&&p!=='_headers'),assets=[];
for(const file of files){const r=await fetch(base+'/'+file.replaceAll('\\','/'));assert.equal(r.status,200);const remote=Buffer.from(await r.arrayBuffer()),local=fs.readFileSync('public/'+file);assert.equal(hash(remote),hash(local),file);assets.push({file,bytes:local.length,sha256:hash(local)});}
const migrations=fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).map(file=>({file,sha256:hash(fs.readFileSync('migrations/'+file))}));
const catalog=await fetch(base+'/api/concepts'),bytes=Buffer.byteLength(await catalog.text());
const r=await fetch(base+'/api/concepts/183'),detailBytes=Buffer.byteLength(await r.text());
const protectedFiles=JSON.parse(fs.readFileSync('tests/phase2-baseline/protected-hashes.json','utf8').replace(/^\uFEFF/,''));for(const p of protectedFiles)assert.equal(hash(fs.readFileSync(p.Path)).toUpperCase(),p.Hash);
assert.deepEqual(JSON.parse(fs.readFileSync('tests/phase3-production-before.json')),JSON.parse(fs.readFileSync('tests/phase3-production-after.json')));
const report={passed:true,verifiedAt:new Date().toISOString(),base,worker:'ej-learning-phase3',version:'73b035df-53a2-4987-9275-6752ad917ff4',database:'ej-learning-phase3-db',databaseId:'36c72b9b-da1f-425c-9b1a-6603b0f7d150',routes:[],assets,migrations,catalogBytes:bytes,longDialogueDetailBytes:detailBytes,protectedFilesUnchanged:true,productionSnapshotsEqual:true};
fs.writeFileSync('tests/phase3-release-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:true,assets:assets.length,catalogBytes:bytes,longDialogueDetailBytes:detailBytes},null,2));
