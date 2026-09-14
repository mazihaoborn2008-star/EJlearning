import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {grammarCandidates,lessonBlueprints} from '../scripts/content-35e1c.js';
import {
  grammarContentCorrections,
  isCurrentGrammarId,
  isPracticeEligibleGrammarId,
  overviewOnlyGrammarIds,
  practiceIneligibleGrammarIds
} from '../src/content-quality-02.js';

const baseline=JSON.parse(fs.readFileSync(new URL('../docs/phase35c/curriculum-final.json',import.meta.url),'utf8')).v2_grammar_points;
const migration01=fs.readFileSync(new URL('../migrations-content-quality-01/0001_content_quality_hotfix_01.sql',import.meta.url),'utf8');
const migration02=fs.readFileSync(new URL('../migrations-content-quality-02/0001_content_quality_hotfix_02.sql',import.meta.url),'utf8');
const affected=['35e1c-ja-counter-system',...overviewOnlyGrammarIds];
const candidateRows=grammarCandidates.map(x=>({
 id:x.id,language:x.language,form_name:x.form,formula:x.formula,core_zh:x.core,purpose_zh:x.purpose,
 when_zh:x.when,mistakes_zh:x.mistakes,nuance_zh:x.nuance,title_zh:x.title,
 usage_zh:'系统/对比型 canonical grammar；保留 required/support/exposure 区分。',publication_state:'published'
}));
const sourceRows=[...baseline,...candidateRows.filter(candidate=>!baseline.some(row=>row.id===candidate.id))];

function database(){
 const db=new DatabaseSync(':memory:');
 db.exec(`
  CREATE TABLE v2_grammar_points(id TEXT PRIMARY KEY,language TEXT,form_name TEXT,formula TEXT,core_zh TEXT,purpose_zh TEXT,when_zh TEXT,mistakes_zh TEXT,nuance_zh TEXT,title_zh TEXT,usage_zh TEXT,publication_state TEXT);
  CREATE TABLE v2_grammar_example_target_audits(example_id TEXT PRIMARY KEY,grammar_id TEXT,rationale_zh TEXT);
  CREATE TABLE v2_grammar_examples(id TEXT PRIMARY KEY,grammar_id TEXT,explanation_zh TEXT);
  CREATE TABLE v2_sentence_grammar_links(id TEXT PRIMARY KEY,grammar_id TEXT,note_zh TEXT);
  CREATE TABLE v2_sentence_expressions(id TEXT PRIMARY KEY,note_zh TEXT);
  CREATE TABLE lesson_items(lesson_id TEXT,content_type TEXT,content_id TEXT,PRIMARY KEY(lesson_id,content_type,content_id));
  CREATE TABLE learning_attempts(attempt_id TEXT PRIMARY KEY,content_type TEXT,content_id TEXT);
  CREATE TABLE grammar_progress(user_id TEXT,grammar_id TEXT,attempts INTEGER,review_stage INTEGER,next_review_at INTEGER,PRIMARY KEY(user_id,grammar_id));
 `);
 const insert=db.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?,?,?,?,?)');
 for(const x of sourceRows)insert.run(x.id,x.language,x.form_name,x.formula,x.core_zh,x.purpose_zh,x.when_zh,x.mistakes_zh,x.nuance_zh,x.title_zh,x.usage_zh,x.publication_state);
 let sequence=0;
 for(const blueprint of lessonBlueprints)for(const id of blueprint[8])if(affected.includes(id))db.prepare('INSERT INTO lesson_items VALUES(?,?,?)').run(blueprint[0],'grammar',id);
 for(const id of affected){
  for(let index=0;index<4;index++)db.prepare('INSERT INTO v2_grammar_examples VALUES(?,?,?)').run(`${id}-example-${index}`,id,'preserved');
  db.prepare('INSERT INTO learning_attempts VALUES(?,?,?)').run(`attempt-${sequence++}`,'grammar',id);
  db.prepare('INSERT INTO grammar_progress VALUES(?,?,?,?,?)').run('historical-user',id,3,2,2_000_000_000);
 }
 return db;
}

test('reviewed canonical delta fixes the counter and models multi-system records as explicit overviews',()=>{
 const db=database(),before=db.prepare('SELECT COUNT(*) count FROM v2_grammar_points').get().count;
 db.exec(migration01);db.exec(migration02);
 assert.equal(db.prepare('SELECT COUNT(*) count FROM v2_grammar_points').get().count,before);
 for(const correction of grammarContentCorrections){
  const actual=db.prepare('SELECT * FROM v2_grammar_points WHERE id=?').get(correction.id);
  for(const [field,value] of Object.entries(correction))if(field!=='id')assert.equal(actual[field],value,`${correction.id}.${field}`);
 }
 assert.equal(db.prepare("SELECT form_name FROM v2_grammar_points WHERE id='35e1c-ja-counter-system'").get().form_name,'数 + 助数詞');
 assert.equal(db.prepare("SELECT COUNT(*) count FROM v2_grammar_points WHERE form_name LIKE '%た形ら%' OR formula LIKE '%た形ら%'").get().count,0);
 for(const id of affected){
  assert.equal(db.prepare('SELECT COUNT(*) count FROM v2_grammar_examples WHERE grammar_id=?').get(id).count,4);
  assert.equal(db.prepare('SELECT COUNT(*) count FROM learning_attempts WHERE content_id=?').get(id).count,1);
  assert.equal(db.prepare('SELECT attempts FROM grammar_progress WHERE grammar_id=?').get(id).attempts,3);
 }
 db.close();
});

test('overview records stay readable but cannot become authoritative practice answers',()=>{
 assert.equal(isCurrentGrammarId('35e1c-ja-counter-system'),true);
 assert.equal(isPracticeEligibleGrammarId('35e1c-ja-counter-system'),true);
 for(const id of overviewOnlyGrammarIds){assert.equal(isCurrentGrammarId(id),true);assert.equal(isPracticeEligibleGrammarId(id),false);}
 for(const id of ['en-greeting','ja-greeting']){assert.equal(isCurrentGrammarId(id),false);assert.equal(isPracticeEligibleGrammarId(id),false);}
 assert.deepEqual(practiceIneligibleGrammarIds,['en-greeting','ja-greeting',...overviewOnlyGrammarIds]);
});

test('the seven active links retain their historical IDs and exact lesson placement',()=>{
 const links=lessonBlueprints.flatMap(row=>row[8].filter(id=>affected.includes(id)).map(id=>[row[0],id]));
 assert.deepEqual(links,[
  ['ja-s2-l5','35e1c-ja-counter-system'],
  ['ja-s2-l6','35e1c-ja-counter-system'],
  ['ja-s3-l5','35e1c-ja-condition-contrast'],
  ['ja-s3-l7','35e1c-ja-condition-contrast'],
  ['ja-s3-l8','35e1c-ja-workplace-register'],
  ['ja-s4-l6','35e1c-ja-workplace-register'],
  ['ja-s4-l6','35e1c-ja-condition-contrast']
 ]);
});

test('no affected authoritative answer is malformed or a multi-system overview',()=>{
 const db=database();db.exec(migration01);db.exec(migration02);
 const rows=db.prepare("SELECT id,form_name FROM v2_grammar_points WHERE id IN (?,?,?)").all(...affected);
 const invalid=rows.filter(row=>isPracticeEligibleGrammarId(row.id)&&(/number + counter|た形ら|比較概要|使い分け概要/u.test(row.form_name)));
 assert.deepEqual(invalid,[]);
 assert.equal(rows.find(row=>row.id==='35e1c-ja-counter-system').form_name,'数 + 助数詞');
 db.close();
});
