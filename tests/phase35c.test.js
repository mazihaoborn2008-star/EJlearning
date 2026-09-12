import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {audit} from '../scripts/audit-35c.js';
const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');
for(const f of fs.readdirSync('migrations-35c').sort())db.exec(fs.readFileSync('migrations-35c/'+f,'utf8'));
const data=Object.fromEntries(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'v2_%'").all().map(({name})=>[name,db.prepare('SELECT * FROM '+name).all()]));
const base=process.env.BASE_URL||'http://127.0.0.1:8798';
const get=async path=>{const r=await fetch(base+'/api/v2/'+path);assert.equal(r.status,200,path);return r.json();};
test('all 183 sources preserved byte-for-byte in legacy tables and provenance',()=>{
 const legacy=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations').sort())legacy.exec(fs.readFileSync('migrations/'+f,'utf8'));
 for(const {name} of legacy.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all())assert.deepEqual(db.prepare('SELECT * FROM '+name+' ORDER BY rowid').all(),legacy.prepare('SELECT * FROM '+name+' ORDER BY rowid').all(),name);
 assert.equal(data.v2_editorial_decisions.length,183);assert.equal(data.v2_editorial_decisions.filter(x=>x.prior_review_flag).length,51);
 for(const d of data.v2_editorial_decisions){const s=JSON.parse(d.source_json);assert.deepEqual(JSON.parse(JSON.stringify(db.prepare('SELECT * FROM concepts WHERE id=?').get(d.concept_id))),s.concept);assert.equal(d.status,'resolved');}
 assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(),[]);
});
test('curriculum QA fails for missing readings, invalid links, empty bands and unreviewed alignment',()=>{
 assert(audit(data).passed);
 const bad=structuredClone(data);bad.v2_vocabulary_items.find(v=>v.language==='en').ipa=null;bad.v2_vocabulary_items.find(v=>v.language==='ja').reading=null;
 bad.v2_sentence_vocabulary_links[0].language='ja';bad.v2_sentence_vocabulary_links[0].displayed_form='ABSENT';bad.v2_sentence_expressions.find(e=>e.language==='ja').readings_json='[]';bad.v2_content_alignments.find(a=>a.source_type==='model_editorial').status='verified';
 bad.v2_grammar_points=bad.v2_grammar_points.filter(g=>!(g.language==='en'&&g.level===6));bad.v2_editorial_decisions[0].status='unresolved';
 const report=audit(bad);assert(!report.passed);for(const code of ['missing_ipa','missing_japanese_reading','cross_language_link','invalid_span','furigana_reconstruction','unverified_model_alignment','uneven_grammar_coverage','unresolved_editorial'])assert(report.errors.some(e=>e.code===code),code);
 const dup=structuredClone(data);dup.v2_vocabulary_items.push({...dup.v2_vocabulary_items[0],id:'duplicate'});dup.v2_sentence_expressions.push({...dup.v2_sentence_expressions[0],id:'duplicate'});assert(audit(dup).warnings.some(x=>x.code==='duplicate_lexical_head'));assert(audit(dup).warnings.some(x=>x.code==='duplicate_expression'));
});
test('new crosswalk rejects inconsistent source language/concept and invalid owners',()=>{
 const x=data.v2_legacy_crosswalk[0];assert.throws(()=>db.exec(`UPDATE v2_legacy_crosswalk SET language='${x.language==='en'?'ja':'en'}' WHERE id='${x.id}'`),/mismatch|FOREIGN/);
 assert.throws(()=>db.exec(`UPDATE v2_legacy_crosswalk SET concept_id=999 WHERE id='${x.id}'`),/mismatch|FOREIGN/);
 assert.throws(()=>db.exec("UPDATE v2_vocabulary_items SET stage=7 WHERE id='en-eat'"),/CHECK/);
});
test('both languages have nonempty six-band libraries, correct filters and bounded pagination',async()=>{
 for(const language of ['en','ja'])for(let band=1;band<=6;band++)for(const [domain,key] of [['vocabulary','stage'],['grammar','level']]){const r=await get(`${domain}?language=${language}&${key}=${band}&limit=100`);assert(r.data.length>=4);assert(r.data.every(x=>x.language===language&&x[key]===band));}
 const first=await get('vocabulary?language=en&limit=12'),second=await get('vocabulary?language=en&limit=12&offset=12');assert(first.pagination.has_more);assert(!first.data.some(x=>second.data.some(y=>y.id===x.id)));
});
test('migration semantic decisions and complete pattern examples are served',async()=>{
 const thirsty=(await get('sentences/legacy-112')).data;assert(thirsty.expressions.some(e=>e.language==='ja'&&e.text.includes('喉が渇')));
 const p=(await get('vocabulary?language=en&search=plan&limit=100')).data;assert(p.some(x=>x.lemma==='plan'&&x.part_of_speech==='noun'));assert(p.some(x=>x.id==='en-plan'&&x.part_of_speech==='verb'));
 for(const id of [20,24,32,44,104,170,180]){const s=(await get('sentences/legacy-'+id)).data;assert(s.expressions.every(e=>!e.text.includes('...')&&!e.text.includes('〜')));for(const e of s.expressions){assert(e.grammar_links.length);assert(e.vocabulary_links.length);assert(e.grammar_links.every(l=>l.language===e.language));}}
 const s=(await get('sentences/legacy-180')).data;assert(s.expressions.find(e=>e.language==='en').grammar_links.some(l=>l.grammar_id==='en-would-have'));assert(s.expressions.find(e=>e.language==='ja').grammar_links.some(l=>l.grammar_id==='ja-tsumori'));
});
test('all exam targets have draft content across domains without difficulty equivalence',async()=>{
 for(const [framework,targets] of [['IELTS',['5.0','5.5','6.0','6.5','7.0+']],['JLPT',['N5','N4','N3','N2','N1']]])for(const target of targets){const r=await get('academic/alignments?'+new URLSearchParams({framework,target,limit:100}));assert(r.data.length>=5);for(const domain of ['vocabulary','grammar','sentences'])assert(r.data.some(x=>x.domain===domain),framework+target+domain);assert(r.data.every(x=>x.status==='draft'&&x.editorial_note_zh));}
});
test('isolated UI keeps legacy available and private assets inaccessible',async()=>{
 for(const path of ['/','/vocabulary.html','/legacy/'])assert.equal((await fetch(base+path)).status,200);
 for(const path of ['/docs/phase35c/curriculum.json','/scripts/generate-35c.js','/migrations-35c/0011_curriculum.sql','/wrangler.35c.jsonc','/.env'])assert.equal((await fetch(base+path)).status,404,path);
});
