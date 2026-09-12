import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'http://127.0.0.1:8814';
const get=async path=>{const response=await fetch(base+path);return {response,body:await response.json()};};

test('vocabulary list is compact, bounded and language scoped',async()=>{
 const en=await get('/api/v2/vocabulary?language=en&browse=C&limit=40');assert.equal(en.response.status,200);assert(en.body.data.length<=40);assert(en.body.data.every(x=>x.language==='en'&&/^c/i.test(x.lemma)));assert(en.body.data.every(x=>x.meaning_zh&&'ipa' in x&&'reading' in x));assert(!JSON.stringify(en.body).includes('senses'));
 const ja=await get('/api/v2/vocabulary?language=ja&browse=や行&limit=40');assert.equal(ja.response.status,200);assert(ja.body.data.every(x=>x.language==='ja'&&x.reading));
 for(const path of ['/api/v2/vocabulary?part_of_speech=noun','/api/v2/vocabulary?language=en&part_of_speech=adjectival%20noun','/api/v2/vocabulary?language=ja&part_of_speech=phrasal%20verb','/api/v2/vocabulary?language=en&browse=あ行','/api/v2/vocabulary?language=ja&browse=A'])assert.equal((await get(path)).response.status,400,path);
});

test('gojuon grouping uses canonical reading',async()=>{
 for(const [term,group] of [['予定','や行'],['サイズ','さ行'],['確認する','か行']]){const grouped=await get('/api/v2/vocabulary?language=ja&browse='+encodeURIComponent(group)+'&limit=100');assert.equal(grouped.response.status,200);assert(grouped.body.data.some(x=>x.lemma===term),term+' group');const searched=await get('/api/v2/vocabulary?language=ja&browse='+encodeURIComponent(group)+'&search='+encodeURIComponent(term)+'&limit=10');assert(searched.body.data.some(x=>x.lemma===term),term+' search coexistence');}
});

test('exam POS rejects cross-language taxonomy at the API',async()=>{
 let r=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&part_of_speech=adjectival%20noun');assert.equal(r.response.status,400);
 r=await get('/api/v2/academic/alignments?framework=JLPT&target=N3&domain=vocabulary&part_of_speech=phrasal%20verb');assert.equal(r.response.status,400);
 r=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&part_of_speech=noun&limit=20');assert.equal(r.response.status,200);assert(r.body.data.every(x=>x.language==='en'&&x.part_of_speech==='noun'));
 r=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&limit=100');assert.equal(r.response.status,200);assert(r.body.data.length>=20);assert(r.body.data.some(x=>x.content_id==='35e1c-en-v069'));
 r=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&browse=A&limit=100');assert.equal(r.response.status,200);assert(r.body.data.length>0&&r.body.data.every(x=>/^a/i.test(x.title)));
 for(const [target,browse,title] of [['N3','か行','確認する'],['N4','さ行','サイズ'],['N4','や行','予定']]){r=await get(`/api/v2/academic/alignments?framework=JLPT&target=${target}&domain=vocabulary&browse=${encodeURIComponent(browse)}&limit=100`);assert.equal(r.response.status,200);assert(r.body.data.some(x=>x.title===title),title);}
 for(const path of ['/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&browse=あ行','/api/v2/academic/alignments?framework=JLPT&target=N3&domain=vocabulary&browse=A'])assert.equal((await get(path)).response.status,400,path);
});

test('new lessons resolve canonical vocabulary grammar and multi-turn dialogue',async()=>{
 for(const id of ['en-s3-l6','en-s3-l7','en-s4-l5','ja-s2-l6','ja-s3-l6','ja-s4-l5']){const r=await get('/api/v2/lessons/'+id);assert.equal(r.response.status,200,id);assert(r.body.data.vocabulary.length>=4,id);assert(r.body.data.grammar.length>=2,id);assert(r.body.data.expressions.some(x=>x.unit_type==='dialogue'&&x.dialogue.length>=4),id);}
});
