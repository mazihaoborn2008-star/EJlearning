// New additive corrections after the first clean-D1 verification. Never rewrites 0011.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
const db=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations-35c').filter(f=>f<'0012').sort())db.exec(fs.readFileSync('migrations-35c/'+f,'utf8'));
const q=v=>v==null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
const sql=['-- Additive editorial/link corrections after clean-D1 regression. Legacy remains unchanged.'];
function exec(s){db.exec(s);sql.push(s);}
exec("DELETE FROM v2_sentence_vocabulary_links WHERE id LIKE 'c-vl-%' AND expression_id NOT LIKE 'legacy-%' AND expression_id NOT LIKE 'lesson-%';");
exec("UPDATE v2_sentence_expressions SET sort_order=100+(SELECT sort_order FROM v2_sentence_units u WHERE u.id=unit_id) WHERE id LIKE 'legacy-%' OR id LIKE 'lesson-%';");
const secondJa=new Set([45,57,75,93,105,111,117,141,147,153,177]);
for(const e of db.prepare("SELECT e.* FROM v2_sentence_expressions e JOIN v2_sentence_units u ON u.id=e.unit_id WHERE u.unit_type='dialogue' AND e.id LIKE 'legacy-%'").all()){
 const turns=db.prepare('SELECT * FROM v2_dialogue_turns WHERE expression_id=? ORDER BY sort_order').all(e.id);
 for(const l of db.prepare('SELECT * FROM v2_sentence_vocabulary_links WHERE expression_id=?').all(e.id)){const turn=turns.find(t=>t.text.includes(l.displayed_form));if(turn)exec(`UPDATE v2_sentence_vocabulary_links SET turn_id=${q(turn.id)} WHERE id=${q(l.id)};`);}
 for(const l of db.prepare('SELECT * FROM v2_sentence_grammar_links WHERE expression_id=?').all(e.id)){const cid=+e.id.split('-')[1],turn=turns[e.language==='ja'&&secondJa.has(cid)?1:0];exec(`UPDATE v2_sentence_grammar_links SET turn_id=${q(turn.id)},displayed_form=${q(turn.text)} WHERE id=${q(l.id)};`);}
}
// Topic memberships follow real example usage; they do not determine Stage.
exec('INSERT OR IGNORE INTO v2_vocabulary_topics(item_id,topic_id) SELECT DISTINCT l.item_id,u.topic_id FROM v2_sentence_vocabulary_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id JOIN v2_sentence_units u ON u.id=e.unit_id;');
// A noun-form surface cannot be taught as a verb merely because the spelling matches.
const rainId='en-c-rain-noun',workId='en-c-work-verb';
exec(`INSERT INTO v2_vocabulary_items(id,language,lemma,type,stage,ipa,part_of_speech,register,publication_state,sort_order) VALUES ('${rainId}','en','rain','word',1,'reɪn','noun','neutral','published',2000),('${workId}','en','work','word',1,'wɜːrk','verb','neutral','published',2001);`);
exec(`INSERT INTO v2_vocabulary_senses(id,item_id,meaning_zh,usage_zh) VALUES ('${rainId}-1','${rainId}','雨','不可数名词；与动词rain下雨分开。'),('${workId}-1','${workId}','工作；从事工作','动词；after work中的work则为名词。');`);
exec(`INSERT INTO v2_vocabulary_examples(id,item_id,kind,text,translation_zh) VALUES ('c-ve-rain-noun','${rainId}','example','I expect rain.','我预计会下雨。'),('c-ve-work-verb','${workId}','example','I had to work.','我不得不工作。');`);
for(const l of db.prepare("SELECT l.*,e.text FROM v2_sentence_vocabulary_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id JOIN v2_vocabulary_items v ON v.id=l.item_id WHERE v.language='en' AND v.lemma IN ('rain','work')").all()){
 const v=db.prepare('SELECT * FROM v2_vocabulary_items WHERE id=?').get(l.item_id);if(v.lemma==='rain'&&/expect rain/.test(l.text))exec(`UPDATE v2_sentence_vocabulary_links SET item_id='${rainId}',sense_id='${rainId}-1',note_zh='此处rain为名词，作expect宾语。' WHERE id=${q(l.id)};`);
 if(v.lemma==='work'&&/\b(?:to|can|will) work\b/.test(l.text))exec(`UPDATE v2_sentence_vocabulary_links SET item_id='${workId}',sense_id='${workId}-1',note_zh='此处work为动词。' WHERE id=${q(l.id)};`);
}
exec("UPDATE v2_grammar_points SET form_name='be + adjective / state phrase' WHERE id='en-be-adjective';");
const file='migrations-35c/0012_editorial_refinement.sql',output=sql.join('\n')+'\n';if(fs.existsSync(file))assert.equal(fs.readFileSync(file,'utf8'),output,'Applied migration 0012 is immutable');else fs.writeFileSync(file,output);console.log('Additive 0012 retained; 0011 retained unchanged.');
