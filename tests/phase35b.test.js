import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
const base=process.env.BASE_URL||'http://127.0.0.1:8797';
test('all migrations preserve legacy and 35a records; alignment is relational and language-safe',()=>{
 const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');
 for(const f of fs.readdirSync('migrations-v2').sort()){assert(fs.readFileSync('migrations-v2/'+f).equals(fs.readFileSync('migrations-35b/'+f)));db.exec(fs.readFileSync('migrations-v2/'+f,'utf8'));}
 const dump=()=>Object.fromEntries(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'v2_alignment%' AND name<>'v2_content_alignments'").all().map(x=>[x.name,db.prepare('SELECT * FROM '+x.name).all()]));
 const before=dump();db.exec(fs.readFileSync('migrations-35b/0009_academic_alignment.sql','utf8'));assert.deepEqual(dump(),before);assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(),[]);
 assert.equal(db.prepare('SELECT count(*) AS n FROM v2_content_alignments').get().n,7);
 for(const sql of ["UPDATE v2_content_alignments SET vocabulary_id='ja-yotei' WHERE id='ielts-expect'","UPDATE v2_content_alignments SET framework_id='JLPT',target='N4' WHERE id='ielts-expect'","UPDATE v2_content_alignments SET grammar_id='en-may' WHERE id='ielts-expect'","UPDATE v2_content_alignments SET target='8.0' WHERE id='ielts-expect'","UPDATE v2_content_alignments SET status='verified' WHERE id='ielts-expect'"]){assert.throws(()=>db.exec(sql),/FOREIGN KEY|CHECK/);}
});
async function get(path,status=200){const r=await fetch(base+'/api/v2/'+path);assert.equal(r.status,status,path);return r.json();}
test('library summaries supply meaning, pronunciation and purpose without full details',async()=>{
 const v=await get('vocabulary?language=en&limit=1');assert(v.data[0].meaning_zh&&v.data[0].ipa);assert(!v.data[0].senses);
 const j=await get('vocabulary?language=ja&topic=food');assert(j.data.length&&j.data.every(x=>x.language==='ja'&&x.reading));
 const g=await get('grammar?language=en&limit=1');assert(g.data[0].purpose_zh);assert(!g.data[0].examples);
});
test('academic targets, provenance, independent stages and missing alignment',async()=>{
 const f=(await get('academic/frameworks')).data;assert.equal(f.length,10);
 const en=(await get('academic/alignments?framework=IELTS&target=6.5')).data;assert.equal(en.length,4);assert(en.every(x=>x.language==='en'&&x.status==='draft'&&x.basis_zh&&x.source_title));
 const ja=(await get('academic/alignments?framework=JLPT&target=N4')).data;assert.equal(ja.length,3);assert(ja.every(x=>x.language==='ja'));assert.equal(ja.find(x=>x.grammar_id==='ja-te-iru').level,3);
 assert.equal((await get('academic/alignments?framework=JLPT&target=N1')).data.length,0);
 assert.equal((await get('academic/alignments?domain=vocabulary&id=en-eat')).data.length,0);
 for(const s of ['framework=BAD','framework=IELTS&target=N4','framework=JLPT&target=6.5','id=en-eat','domain=bad','limit=101','offset=-1','framework=IELTS&framework=JLPT'])await get('academic/alignments?'+s,400);
 const r=await get('academic/alignments?domain=sentences&id=not-eaten');assert(r.data.every(x=>x.expression_id==='not-eaten-ja'));
});
test('new UI is isolated, original assets and APIs remain usable, private files stay private',async()=>{
 assert((await (await fetch(base+'/')).text()).includes('data-page="index"'));
 assert((await (await fetch(base+'/legacy/')).text()).includes('data-page="home"'));
 for(const path of ['/src/worker-35b.js','/migrations-35b/0009_academic_alignment.sql','/docs/phase35b/integrity-before.json','/scripts/pages-35b.js','/wrangler.35b.local.jsonc'])assert.equal((await fetch(base+path)).status,404);
 const csp=(await fetch(base+'/ai.html')).headers.get('content-security-policy');assert(csp.includes("connect-src 'self'"));
 assert.equal((await (await fetch(base+'/api/concepts')).json()).data.length,183);
});
