import test from 'node:test';
import assert from 'node:assert/strict';
import {v2} from '../src/v2.js';
const base=process.env.BASE_URL||'http://127.0.0.1:8795';
async function get(path,status=200){const r=await fetch(base+'/api/v2/'+path);assert.equal(r.status,status,path);const b=await r.json();assert(status===200?'data'in b:'error'in b);return b;}
test('vocabulary list filters, Chinese/target search, senses and bounded pagination',async()=>{
 const list=await get('vocabulary?language=en&stage=1&type=word&part_of_speech=verb&register=neutral');assert(list.data.length);assert(list.data.every(x=>x.language==='en'&&x.stage===1));assert(!JSON.stringify(list).includes('senses'));
 assert((await get('vocabulary?search=预料')).data.some(x=>x.id==='en-expect'));
 assert((await get('vocabulary?language=ja&search=食べ')).data.some(x=>x.id==='ja-taberu'));
 const first=await get('vocabulary?limit=2');assert(first.pagination.has_more);const second=await get('vocabulary?limit=2&offset=2');assert(!second.data.some(x=>first.data.some(y=>x.id===y.id)));
 const expect=(await get('vocabulary/en-expect')).data;assert.equal(expect.senses.length,2);assert(expect.relations.some(x=>x.target_id==='en-look-forward-to'));assert(expect.examples.length>=2);
 const plan=(await get('vocabulary/en-plan')).data;assert.equal(plan.examples.filter(x=>x.kind==='pattern').length,2);
 assert((await get('vocabulary?search=%25')).data.length===0);assert((await get('vocabulary?search=%27%20OR%201%3D1')).data.length===0);
});
test('grammar levels, multilingual search, explanations, directed prerequisites and contrasts',async()=>{
 assert((await get('grammar?language=ja&level=3')).data.every(x=>x.language==='ja'&&x.level===3));
 assert((await get('grammar?search=现在完成')).data.some(x=>x.id==='en-present-perfect'));
 assert((await get('grammar?search=Present%20Perfect')).data.some(x=>x.id==='en-present-perfect'));
 const point=(await get('grammar/ja-te-iru')).data;assert(point.core_zh&&point.formula&&point.when_zh&&point.mistakes_zh&&point.nuance_zh);assert.equal(point.prerequisites[0].target_id,'ja-te-form');assert(point.examples[0].readings.length);
 assert((await get('grammar/ja-te-form')).data.recommended_for.length>=2);
 assert((await get('grammar/en-may')).data.relations.some(x=>x.type==='contrast'&&x.target_id==='en-might'));
});
test('sentence filters apply difficulty and language to the SAME expression',async()=>{
 assert((await get('sentences?language=en&grammar_difficulty=4&vocabulary_difficulty=1&overall_difficulty=3')).data.some(x=>x.id==='not-eaten'));
 assert(!(await get('sentences?language=ja&grammar_difficulty=4&vocabulary_difficulty=1&overall_difficulty=3')).data.some(x=>x.id==='not-eaten'));
 assert.equal((await get('sentences?unit_type=scenario&topic=social')).data[0].id,'apology');
 assert(!(await get('sentences?limit=1')).data[0].expressions);
});
test('required not-eaten example, independent difficulty and exact vocabulary/grammar links',async()=>{
 const unit=(await get('sentences/not-eaten')).data;assert.equal(unit.anchor_zh,'我还没吃饭。');
 const en=unit.expressions.find(x=>x.language==='en'),ja=unit.expressions.find(x=>x.language==='ja');
 assert.equal(en.text,"I haven't eaten yet.");assert.equal(ja.text,'まだ食べていません。');
 assert.deepEqual(en.vocabulary_links.map(x=>x.item_id),['en-eat','en-yet']);assert.equal(en.grammar_links[0].grammar_id,'en-present-perfect');
 assert.deepEqual(ja.grammar_links.map(x=>x.grammar_id),['ja-te-iru','ja-polite-negative']);assert.notEqual(en.grammar_difficulty,ja.grammar_difficulty);assert.notEqual(en.overall_difficulty,ja.overall_difficulty);
 assert.equal(ja.readings.map(x=>x.text).join(''),ja.text);assert(en.vocabulary_links.every(x=>x.sense_id&&x.displayed_form));
});
test('changed plans, scenario variants, dialogue turns and turn relationships',async()=>{
 const changed=(await get('sentences/changed-plan')).data;assert.equal(changed.expressions.length,2);assert.notEqual(changed.expressions[0].overall_difficulty,changed.expressions[1].overall_difficulty);
 const scenario=(await get('sentences/apology')).data;assert(scenario.context_zh);assert.equal(scenario.expressions.filter(x=>x.language==='en').length,2);
 const dialogue=(await get('sentences/help-dialogue')).data;for(const e of dialogue.expressions){assert.equal(e.turns.length,2);assert.deepEqual(e.turns.map(x=>x.speaker),['A','B']);assert.equal(e.vocabulary_links[0].turn_id,e.turns[0].id);}
});
test('reverse relationship endpoints return compact correct units in both directions',async()=>{
 for(const path of ['vocabulary/en-eat','vocabulary/ja-taberu','grammar/en-present-perfect','grammar/ja-te-iru']){
  const compact=(await get(path+'/sentences?limit=1')).data;assert(compact.length);assert(!('expressions'in compact[0]));
  const d=(await get(path)).data;assert(d.sentences.data.some(x=>x.unit_id==='not-eaten'));
 }
 assert((await get('vocabulary/en-look-forward-to')).data.relations.some(x=>x.direction==='incoming'&&x.source_id==='en-expect'));
});
test('invalid filters, pagination, IDs, unknown routes and methods',async()=>{
 for(const path of ['vocabulary?language=zh','vocabulary?stage=0','vocabulary?stage=7','grammar?level=1.5','sentences?grammar_difficulty=7','sentences?unit_type=pattern','vocabulary?limit=101','grammar?offset=-1','vocabulary?type=sentence','grammar?language=en&language=ja','grammar?bogus=x','vocabulary?search=','vocabulary/en-eat?stage=1','vocabulary/en-eat/sentences?stage=1','vocabulary/%27'])await get(path,400);
 for(const path of ['vocabulary/missing','grammar/missing','sentences/missing','sentences/not-eaten/sentences','unknown'])await get(path,404);
 const r=await fetch(base+'/api/v2/vocabulary',{method:'POST'});assert.equal(r.status,405);assert.equal(r.headers.get('allow'),'GET');
 for(const path of ['/src/v2.js','/src/worker-v2.js','/migrations-v2/0006_v2_domains.sql','/scripts/seed-35a.js','/docs/phase35a/integrity-before.json','/wrangler.35a.jsonc'])assert.equal((await fetch(base+path)).status,404,path);
});
test('database failures are sanitized',async()=>{const r=await v2(new Request(base+'/api/v2/vocabulary'),{prepare(){throw Error('private database SQL');}});assert.equal(r.status,503);assert(!JSON.stringify(await r.json()).includes('private'));});
