import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {grammarContentCorrections,reclassifiedGrammarIds} from '../src/content-quality-01.js';

const baseline=JSON.parse(fs.readFileSync(new URL('../docs/phase35c/curriculum-final.json',import.meta.url),'utf8')).v2_grammar_points;
const migration=fs.readFileSync(new URL('../migrations-content-quality-01/0001_content_quality_hotfix_01.sql',import.meta.url),'utf8');

function database(){
 const db=new DatabaseSync(':memory:');
 db.exec(`
  CREATE TABLE v2_grammar_points(id TEXT PRIMARY KEY,language TEXT,form_name TEXT,formula TEXT,core_zh TEXT,purpose_zh TEXT,when_zh TEXT,mistakes_zh TEXT,nuance_zh TEXT,publication_state TEXT);
  CREATE TABLE v2_grammar_example_target_audits(example_id TEXT PRIMARY KEY,grammar_id TEXT,rationale_zh TEXT);
  CREATE TABLE v2_grammar_examples(id TEXT PRIMARY KEY,grammar_id TEXT,explanation_zh TEXT);
  CREATE TABLE v2_sentence_grammar_links(id TEXT PRIMARY KEY,grammar_id TEXT,note_zh TEXT);
  CREATE TABLE v2_sentence_expressions(id TEXT PRIMARY KEY,note_zh TEXT);
  CREATE TABLE learning_attempts(attempt_id TEXT PRIMARY KEY,content_id TEXT);
  CREATE TABLE grammar_progress(user_id TEXT,grammar_id TEXT,attempts INTEGER,PRIMARY KEY(user_id,grammar_id));
 `);
 const insert=db.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?,?,?)');
 for(const x of baseline)insert.run(x.id,x.language,x.form_name,x.formula,x.core_zh,x.purpose_zh,x.when_zh,x.mistakes_zh,x.nuance_zh,x.publication_state);
 db.prepare('INSERT INTO v2_grammar_example_target_audits VALUES(?,?,?)').run('audit-1','ja-masen-ka','直接实现「ます干 + ませんか」的目标形式。');
 db.prepare('INSERT INTO v2_grammar_examples VALUES(?,?,?)').run('example-1','ja-hearsay-sou','转述所得信息；不用ます干。');
 db.prepare('INSERT INTO v2_sentence_grammar_links VALUES(?,?,?)').run('link-1','ja-hearsay-sou','转述所得信息；不用ます干。');
 db.prepare('INSERT INTO v2_sentence_expressions VALUES(?,?)').run('lesson-ja-hearsay-sou-ex','转述所得信息；不用ます干。');
 db.prepare('INSERT INTO learning_attempts VALUES(?,?)').run('historical-attempt','ja-greeting');
 db.prepare('INSERT INTO grammar_progress VALUES(?,?,?)').run('historical-user','ja-greeting',3);
 return db;
}

test('reviewed canonical delta fixes invitation and every high-confidence stem terminology anomaly',()=>{
 const db=database();db.exec(migration);
 for(const correction of grammarContentCorrections){
  const actual=db.prepare('SELECT * FROM v2_grammar_points WHERE id=?').get(correction.id);assert(actual,correction.id);
  for(const [field,value] of Object.entries(correction))if(field!=='id')assert.equal(actual[field],value,`${correction.id}.${field}`);
 }
 const invitation=db.prepare("SELECT form_name,formula,core_zh,purpose_zh FROM v2_grammar_points WHERE id='ja-masen-ka'").get();
 assert.equal(invitation.form_name,'Vます → Vませんか');assert.equal(invitation.formula,'Vます → Vませんか');assert.match(invitation.core_zh,/「ます」替换为「ませんか」/);
 const exposed=db.prepare("SELECT id FROM v2_grammar_points WHERE publication_state='published' AND (form_name LIKE '%干%' OR formula LIKE '%干%' OR lower(form_name) LIKE '%stem%' OR lower(formula) LIKE '%stem%' OR when_zh LIKE '%干%' OR mistakes_zh LIKE '%干%' OR nuance_zh LIKE '%干%')").all();
 assert.deepEqual(exposed,[]);db.close();
});

test('social-response grammar IDs are archived while dependent historical evidence is preserved',()=>{
 const db=database(),before=db.prepare('SELECT count(*) n FROM v2_grammar_points').get().n;db.exec(migration);
 assert.equal(db.prepare('SELECT count(*) n FROM v2_grammar_points').get().n,before);
 for(const id of reclassifiedGrammarIds)assert.equal(db.prepare('SELECT publication_state FROM v2_grammar_points WHERE id=?').get(id).publication_state,'archived');
 assert.equal(db.prepare("SELECT count(*) n FROM learning_attempts WHERE content_id='ja-greeting'").get().n,1);
 assert.equal(db.prepare("SELECT attempts FROM grammar_progress WHERE grammar_id='ja-greeting'").get().attempts,3);
 assert.equal(db.prepare("SELECT count(*) n FROM v2_grammar_example_target_audits WHERE rationale_zh LIKE '%干%'").get().n,0);
 assert.equal(db.prepare("SELECT count(*) n FROM v2_grammar_examples WHERE explanation_zh LIKE '%干%'").get().n,0);
 assert.equal(db.prepare("SELECT count(*) n FROM v2_sentence_grammar_links WHERE note_zh LIKE '%干%'").get().n,0);
 assert.equal(db.prepare("SELECT count(*) n FROM v2_sentence_expressions WHERE note_zh LIKE '%干%'").get().n,0);db.close();
});

test('post-hotfix published grammar forms contain no semantic-category answer key',()=>{
 const db=database();db.exec(migration);
 const invalid=db.prepare("SELECT id,form_name FROM v2_grammar_points WHERE publication_state='published' AND (form_name='greeting / thanks formula' OR form_name='固定问候 / 感谢 / 祝愿')").all();
 assert.deepEqual(invalid,[]);
 assert.equal(db.prepare("SELECT count(*) n FROM v2_grammar_points WHERE publication_state='published'").get().n,baseline.filter(x=>x.publication_state==='published').length-2);db.close();
});
