import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'http://127.0.0.1:8815';
const get=async path=>{const response=await fetch(base+path);return{response,body:await response.json()};};

test('large course pools expose exact bounded totals',async()=>{
 for(const [target,total] of [['5.0',3000],['5.5',4000],['6.0',5500],['6.5',7000],['7.0+',10000]]){
  const r=await get(`/api/v2/academic/alignments?framework=IELTS&target=${encodeURIComponent(target)}&domain=vocabulary&limit=1`);
  assert.equal(r.response.status,200,target);assert.equal(r.body.pagination.total,total,target);assert.equal(r.body.data.length,1);assert.equal(r.body.pagination.limit,1);assert.match(r.body.pool.notice_zh,/不是 IELTS 官方逐词表/);
 }
 for(const [target,total] of [['N5',680],['N4',675],['N3',1749],['N2',1833],['N1',3298]]){
  const r=await get(`/api/v2/academic/alignments?framework=JLPT&target=${target}&domain=vocabulary&limit=1`);
  assert.equal(r.response.status,200,target);assert.equal(r.body.pagination.total,total,target);assert.match(r.body.pool.notice_zh,/社区资料|课程估计/);
 }
});

test('pagination, search and detail stay server-side and bounded',async()=>{
 const a=await get('/api/v2/academic/alignments?framework=IELTS&target=7.0%2B&domain=vocabulary&limit=100&offset=0');
 const b=await get('/api/v2/academic/alignments?framework=IELTS&target=7.0%2B&domain=vocabulary&limit=100&offset=100');
 assert.equal(a.response.status,200);assert.equal(b.response.status,200);assert.equal(a.body.data.length,100);assert.equal(b.body.data.length,100);assert.equal(new Set([...a.body.data,...b.body.data].map(x=>x.content_id)).size,200);
 const search=await get('/api/v2/academic/alignments?framework=IELTS&target=7.0%2B&domain=vocabulary&search=serious&limit=20');assert.equal(search.response.status,200);assert(search.body.data.some(x=>x.title==='serious'));
 const located=await get('/api/v2/academic/alignments?framework=IELTS&target=7.0%2B&domain=vocabulary&search=serious&limit=20');const imported=located.body.data.find(x=>x.content_id.startsWith('35e2-en-'));assert(imported);
 const detail=await get('/api/v2/vocabulary/'+imported.content_id);assert.equal(detail.response.status,200);assert(detail.body.data.senses.length>=1);assert.equal(detail.body.data.examples.length,0);
});

test('language-scoped POS and browsing regressions pass',async()=>{
 for(const path of ['/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&part_of_speech=adjectival%20noun','/api/v2/academic/alignments?framework=JLPT&target=N3&domain=vocabulary&part_of_speech=phrasal%20verb','/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&browse=あ行','/api/v2/academic/alignments?framework=JLPT&target=N3&domain=vocabulary&browse=A'])assert.equal((await get(path)).response.status,400,path);
 for(const letter of ['A','M','X','Z']){const r=await get(`/api/v2/academic/alignments?framework=IELTS&target=7.0%2B&domain=vocabulary&browse=${letter}&limit=100`);assert.equal(r.response.status,200);assert(r.body.data.length>0,letter);assert(r.body.data.every(x=>x.title.toUpperCase().startsWith(letter)));}
 for(const [term,group] of [['予定','や行'],['サイズ','さ行'],['確認する','か行']]){const r=await get(`/api/v2/vocabulary?language=ja&browse=${encodeURIComponent(group)}&search=${encodeURIComponent(term)}&limit=20`);assert.equal(r.response.status,200);assert(r.body.data.some(x=>x.lemma===term),term);}
});

test('existing curated content and non-vocabulary domains remain live',async()=>{
 const found=await get('/api/v2/vocabulary?language=en&search=choice&limit=20');const id=found.body.data.find(x=>x.lemma==='choice').id;const core=await get('/api/v2/vocabulary/'+id);assert.equal(core.response.status,200);assert(core.body.data.examples.length>=1);
 const grammar=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=grammar&limit=20');assert.equal(grammar.response.status,200);assert(grammar.body.data.length>0);
 let lessonCount=0;for(let stage=1;stage<=6;stage++){const lessons=await get(`/api/v2/lessons?language=en&stage=${stage}`);assert.equal(lessons.response.status,200);lessonCount+=lessons.body.data.length;}assert.equal(lessonCount,32);
});
