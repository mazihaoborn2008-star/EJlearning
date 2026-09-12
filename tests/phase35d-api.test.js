import test from 'node:test';
import assert from 'node:assert/strict';

const base=process.env.BASE_URL||'http://127.0.0.1:8799';
const get=async path=>{const response=await fetch(base+path);let body;try{body=await response.json();}catch{body=null;}return {response,body};};

test('lesson list is language/stage bounded',async()=>{
 for(const language of ['en','ja'])for(let stage=1;stage<=6;stage++){
  const {response,body}=await get(`/api/v2/lessons?language=${language}&stage=${stage}`);
  assert.equal(response.status,200);assert.equal(body.data.length,4);assert.equal(body.bounded,true);
  assert(body.data.every(x=>x.language===language&&x.stage===stage&&x.vocabulary_count>=5&&x.vocabulary_count<=10&&x.grammar_count>=1&&x.grammar_count<=3&&x.expression_count>=3&&x.expression_count<=8));
 }
});

test('lesson composition reports its runtime source',async()=>{
 const {response,body}=await get('/api/v2/lessons/status');assert.equal(response.status,200);assert(['d1','audited-fallback'].includes(body.source));
 if(process.env.REQUIRE_D1==='1'){assert.equal(body.source,'d1');assert.equal(body.persisted,true);assert.equal(body.bundle.lessons,48);assert.equal(body.bundle.links,718);}
});

test('lesson detail resolves only current canonical links',async()=>{
 const {response,body}=await get('/api/v2/lessons/en-s1-l1');assert.equal(response.status,200);const x=body.data;
 assert.equal(x.id,'en-s1-l1');assert(x.objective);assert.equal(x.vocabulary.length,x.vocabulary_count);assert.equal(x.grammar.length,x.grammar_count);assert.equal(x.expressions.length,x.expression_count);
 assert(x.vocabulary.every(v=>v.language==='en'&&v.id&&v.lemma));assert(x.grammar.every(g=>g.language==='en'&&g.id));assert(x.expressions.every(e=>e.language==='en'&&e.unit_id));
 assert(x.vocabulary.every(v=>v.required?v.stage<=x.stage:v.role!=='required'));assert(x.grammar.every(g=>g.required?g.level<=x.stage:g.role!=='required'));
 assert.equal(body.bounded,true);
});

test('lesson API validates filters and ids strictly',async()=>{
 for(const path of ['/api/v2/lessons?language=fr&stage=1','/api/v2/lessons?language=en&stage=7','/api/v2/lessons?language=en&stage=1&limit=99','/api/v2/lessons/not-a-lesson','/api/v2/lessons/en-s1-l1?extra=1'])assert.equal((await get(path)).response.status,400,path);
 assert.equal((await get('/api/v2/lessons/en-s6-l9')).response.status,404);
});

test('IELTS and JLPT paths reuse lesson identities',async()=>{
 for(const [framework,target,language] of [['IELTS','6.5','en'],['JLPT','N3','ja']]){const {response,body}=await get(`/api/v2/lessons/recommended?framework=${framework}&target=${target}`);assert.equal(response.status,200);assert(body.data.length>0&&body.data.length<=6);assert(body.data.every(x=>x.language===language&&/^(en|ja)-s[1-6]-l[1-9]$/.test(x.id)));}
});

test('3.5C.1 and legacy endpoints remain available',async()=>{
 for(const path of ['/api/v2/vocabulary?language=en&stage=1&limit=1','/api/v2/grammar?language=ja&level=3&limit=1','/api/v2/sentences?language=en&topic=food&limit=1','/api/topics'])assert.equal((await fetch(base+path)).status,200,path);
});
