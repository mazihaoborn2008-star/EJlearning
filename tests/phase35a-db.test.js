import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {v2} from '../src/v2.js';
const db=new DatabaseSync(':memory:');
db.exec('PRAGMA foreign_keys=ON');
const legacy=fs.readdirSync('migrations').sort();
for(const name of legacy){assert(fs.readFileSync('migrations/'+name).equals(fs.readFileSync('migrations-v2/'+name)));db.exec(fs.readFileSync('migrations/'+name,'utf8'));}
const dump=()=>Object.fromEntries(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'v2_%' ORDER BY name").all().map(({name})=>[name,db.prepare(`SELECT * FROM ${name} ORDER BY rowid`).all()]));
const before=dump();
for(const name of fs.readdirSync('migrations-v2').sort().filter(n=>!legacy.includes(n)))db.exec(fs.readFileSync('migrations-v2/'+name,'utf8'));
const all=sql=>db.prepare(sql).all();
function rejects(sql,pattern){db.exec('SAVEPOINT negative');try{assert.throws(()=>db.exec(sql),pattern);}finally{db.exec('ROLLBACK TO negative; RELEASE negative');}}
test('additive stream preserves every legacy row and schema migration copy',()=>{assert.deepEqual(dump(),before);assert.equal(all('SELECT * FROM concepts').length,183);assert.deepEqual(all('PRAGMA foreign_key_check'),[]);});
test('representative counts, no forced language pairing, independent difficulty',()=>{
 assert.equal(all("SELECT * FROM v2_vocabulary_items WHERE language='en'").length,16);assert.equal(all("SELECT * FROM v2_vocabulary_items WHERE language='ja'").length,17);
 assert.equal(all('SELECT * FROM v2_grammar_points').length,19);assert.equal(all('SELECT * FROM v2_sentence_units').length,12);
 const e=all("SELECT * FROM v2_sentence_expressions WHERE unit_id='not-eaten' ORDER BY language");assert.notEqual(e[0].grammar_difficulty,e[1].grammar_difficulty);
 assert(all('SELECT * FROM v2_sentence_expressions WHERE overall_difficulty<>max(vocabulary_difficulty,grammar_difficulty)').length>0);
});
test('stage, level, language, publication and type constraints',()=>{
 for(const sql of ["UPDATE v2_vocabulary_items SET stage=7 WHERE id='en-eat'","UPDATE v2_vocabulary_items SET language='zh' WHERE id='en-eat'","UPDATE v2_grammar_points SET level=0 WHERE id='en-may'","UPDATE v2_sentence_units SET unit_type='pattern' WHERE id='rain'","UPDATE v2_sentence_expressions SET grammar_difficulty=7 WHERE id='rain-en'","UPDATE v2_vocabulary_items SET publication_state='live' WHERE id='en-eat'","UPDATE v2_vocabulary_items SET type='sentence' WHERE id='en-eat'","UPDATE v2_vocabulary_senses SET stage_override=4 WHERE id='en-eat-1'"])rejects(sql,/CHECK/);
});
test('composite foreign keys prevent cross-language sentence vocabulary and grammar links',()=>{
 rejects("UPDATE v2_sentence_vocabulary_links SET item_id='ja-taberu',sense_id=NULL WHERE id='vl-not-eaten-en-0'",/FOREIGN KEY/);
 rejects("UPDATE v2_sentence_grammar_links SET grammar_id='en-present-perfect' WHERE id='gl-not-eaten-ja-0'",/FOREIGN KEY/);
 rejects("UPDATE v2_sentence_vocabulary_links SET sense_id='en-yet-1' WHERE id='vl-not-eaten-en-0'",/FOREIGN KEY/);
 rejects("UPDATE v2_vocabulary_examples SET sense_id='en-expect-1' WHERE item_id='en-plan'",/FOREIGN KEY/);
 rejects("UPDATE v2_grammar_examples SET source_expression_id='not-eaten-ja' WHERE id='ge-en-present-perfect'",/FOREIGN KEY/);
});
test('lexical and grammar relations enforce language, no self links, and acyclic prerequisites',()=>{
 rejects("INSERT INTO v2_grammar_relations VALUES('en-may','ja-te-form','en','prerequisite','invalid')",/FOREIGN KEY/);
 rejects("INSERT INTO v2_vocabulary_relations VALUES('en-eat','ja-taberu','en','related','invalid')",/FOREIGN KEY/);
 rejects("INSERT INTO v2_grammar_relations VALUES('ja-te-form','ja-te-iru','ja','prerequisite','cycle')",/cycle/);
 rejects("INSERT INTO v2_grammar_relations VALUES('ja-te-form','ja-te-form','ja','related','self')",/CHECK/);
 db.exec('SAVEPOINT update_test');try{
  db.exec("INSERT INTO v2_grammar_relations VALUES('ja-te-form','ja-te-iru','ja','related','test')");
  rejects("UPDATE v2_grammar_relations SET type='prerequisite' WHERE source_id='ja-te-form'",/cycle/);
 }finally{db.exec('ROLLBACK TO update_test; RELEASE update_test');}
});
test('duplicate primary, lexical identity, relation and span protections',()=>{
 rejects("UPDATE v2_sentence_expressions SET is_primary=1 WHERE id='apology-en-casual'",/UNIQUE/);
 rejects("INSERT INTO v2_sentence_vocabulary_links SELECT 'duplicate',expression_id,language,item_id,sense_id,turn_id,displayed_form,occurrence,importance,is_new_target,note_zh,sort_order FROM v2_sentence_vocabulary_links WHERE id='vl-not-eaten-en-0'",/UNIQUE/);
 rejects("INSERT INTO v2_sentence_grammar_links SELECT 'duplicate',expression_id,language,grammar_id,turn_id,displayed_form,occurrence,note_zh,sort_order FROM v2_sentence_grammar_links WHERE id='gl-not-eaten-en-0'",/UNIQUE/);
 rejects("INSERT INTO v2_vocabulary_relations SELECT * FROM v2_vocabulary_relations LIMIT 1",/UNIQUE/);
 rejects("INSERT INTO v2_vocabulary_items SELECT 'duplicate',language,lemma,type,stage,ipa,reading,part_of_speech,register,publication_state,sort_order FROM v2_vocabulary_items WHERE id='en-eat'",/UNIQUE/);
});
test('scenario and dialogue ownership plus all reading/span content is valid',()=>{
 rejects("UPDATE v2_sentence_units SET context_zh=NULL WHERE id='apology'",/CHECK/);
 rejects("INSERT INTO v2_dialogue_turns(id,expression_id,speaker,text,sort_order) VALUES('bad','rain-en','A','bad',0)",/dialogue/);
 rejects("UPDATE v2_sentence_vocabulary_links SET turn_id='help-dialogue-en-0' WHERE id='vl-not-eaten-en-0'",/FOREIGN KEY/);
 for(const table of ['v2_sentence_expressions','v2_dialogue_turns','v2_grammar_examples','v2_vocabulary_examples'])for(const row of all('SELECT * FROM '+table)){
  const readings=JSON.parse(row.readings_json);for(const chunk of readings){assert.equal(typeof chunk.text,'string');if(chunk.reading!==undefined)assert.equal(typeof chunk.reading,'string');}
  if(readings.length)assert.equal(readings.map(x=>x.text).join(''),row.text);
 }
 for(const table of ['v2_sentence_vocabulary_links','v2_sentence_grammar_links'])for(const row of all(`SELECT l.*,coalesce(t.text,e.text) AS visible FROM ${table} l JOIN v2_sentence_expressions e ON e.id=l.expression_id LEFT JOIN v2_dialogue_turns t ON t.id=l.turn_id`)){
  assert(row.displayed_form.length>0);assert(row.visible.split(row.displayed_form).length-1>=row.occurrence,JSON.stringify(row));
 }
});
test('required semantic examples reference actual independent systems',()=>{
 assert.deepEqual(all("SELECT item_id FROM v2_sentence_vocabulary_links WHERE expression_id='not-eaten-en' ORDER BY item_id").map(x=>x.item_id),['en-eat','en-yet']);
 assert.deepEqual(all("SELECT grammar_id FROM v2_sentence_grammar_links WHERE expression_id='not-eaten-ja' ORDER BY grammar_id").map(x=>x.grammar_id),['ja-polite-negative','ja-te-iru']);
 assert.equal(all("SELECT * FROM v2_sentence_expressions WHERE unit_id='changed-plan'").length,2);
 assert.equal(all("SELECT * FROM v2_vocabulary_senses WHERE item_id='en-expect'").length,2);
});
test('integer affinity and dialogue invariants survive editorial updates',()=>{
 rejects("UPDATE v2_vocabulary_items SET stage=1.5 WHERE id='en-eat'",/integer/);
 rejects("UPDATE v2_grammar_points SET level=2.5 WHERE id='en-may'",/integer/);
 rejects("UPDATE v2_sentence_expressions SET overall_difficulty=2.5 WHERE id='rain-en'",/integer/);
 rejects("UPDATE v2_dialogue_turns SET expression_id='rain-en' WHERE id='help-dialogue-en-0'",/dialogue/);
 rejects("UPDATE v2_sentence_expressions SET unit_id='rain' WHERE id='help-dialogue-en'",/dialogue/);
 rejects("UPDATE v2_sentence_units SET unit_type='sentence' WHERE id='help-dialogue'",/dialogue/);
});
test('draft/archived records never leak via lists, links, examples or reverse navigation',async()=>{
 const adapter={prepare(sql){return {bind(...args){return {async all(){return {results:db.prepare(sql).all(...args)};}};}};}};
 const get=async path=>{const r=await v2(new Request('http://local/api/v2/'+path),adapter);return {status:r.status,...await r.json()};};
 db.exec('SAVEPOINT publication');try{
  db.exec("UPDATE v2_vocabulary_items SET publication_state='draft' WHERE id='en-eat'; UPDATE v2_grammar_points SET publication_state='archived' WHERE id='en-present-perfect'; UPDATE v2_sentence_expressions SET publication_state='draft' WHERE id='not-eaten-ja';");
  assert.equal((await get('vocabulary/en-eat')).status,404);assert.equal((await get('grammar/en-present-perfect')).status,404);
  assert(!(await get('vocabulary')).data.some(x=>x.id==='en-eat'));
  const unit=(await get('sentences/not-eaten')).data;assert.equal(unit.expressions.length,1);assert(!unit.expressions[0].vocabulary_links.some(x=>x.item_id==='en-eat'));assert.equal(unit.expressions[0].grammar_links.length,0);
  assert(!(await get('grammar/ja-te-iru/sentences')).data.some(x=>x.unit_id==='not-eaten'));
  assert.equal((await get('grammar/ja-te-iru')).data.examples[0].source_expression_id,null);
  db.exec("UPDATE v2_sentence_units SET publication_state='draft' WHERE id='not-eaten'");
  assert.equal((await get('sentences/not-eaten')).status,404);assert(!(await get('vocabulary/en-yet/sentences')).data.some(x=>x.unit_id==='not-eaten'));
  db.exec("UPDATE v2_vocabulary_items SET publication_state='draft' WHERE id='en-look-forward-to'");
  assert.equal((await get('vocabulary/en-expect')).data.relations.length,0);
 }finally{db.exec('ROLLBACK TO publication; RELEASE publication');}
});
