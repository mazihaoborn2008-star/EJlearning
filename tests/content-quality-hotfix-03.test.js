import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import bundle from '../src/lesson-bundle-35d.js';
import {
  controlledCompletionAnswer,
  grammarContentCorrections,
  isPracticeEligibleGrammarId,
  overviewOnlyGrammarIds
} from '../src/content-quality-03.js';
import {normalizePracticeAnswer,practiceSession,resolvePracticeExercise} from '../src/practice-4e.js';

const ids=['ja-n-desu-ga','ja-node','ja-honorific','ja-humble'];
const baseline=JSON.parse(fs.readFileSync(new URL('../docs/phase35c/curriculum-final.json',import.meta.url),'utf8'));
const migration=fs.readFileSync(new URL('../migrations-content-quality-03/0001_content_quality_hotfix_03.sql',import.meta.url),'utf8');
const matrix=fs.readFileSync(new URL('../docs/STAGE-5-EXPANSION-02A-APPROVAL-MATRIX.md',import.meta.url),'utf8');
const byId=new Map(grammarContentCorrections.map(row=>[row.id,row]));
const secret='content-quality-03-secret-longer-than-thirty-two-characters';
const completionSentences={
 'ja-n-desu-ga':'行くつもりだったんですが、急に用事ができました。',
 'ja-node':'急なので、調整が難しいです。',
 'ja-honorific':'お客様がおっしゃる内容を確認します。',
 'ja-humble':'私が確認いたします。'
};

function migrationDatabase(){
 const db=new DatabaseSync(':memory:');
 db.exec(`
  CREATE TABLE v2_grammar_points(id TEXT PRIMARY KEY,language TEXT,form_name TEXT,formula TEXT,core_zh TEXT,purpose_zh TEXT,when_zh TEXT,mistakes_zh TEXT,nuance_zh TEXT,title_zh TEXT,usage_zh TEXT,publication_state TEXT);
  CREATE TABLE v2_grammar_examples(id TEXT PRIMARY KEY,grammar_id TEXT,text TEXT);
  CREATE TABLE v2_sentence_grammar_links(id TEXT PRIMARY KEY,grammar_id TEXT,displayed_form TEXT);
  CREATE TABLE lesson_items(lesson_id TEXT,content_type TEXT,content_id TEXT);
  CREATE TABLE learning_attempts(attempt_id TEXT PRIMARY KEY,content_id TEXT,result INTEGER);
  CREATE TABLE grammar_progress(user_id TEXT,grammar_id TEXT,attempts INTEGER,PRIMARY KEY(user_id,grammar_id));
  CREATE TABLE lesson_progress(user_id TEXT,lesson_id TEXT,status TEXT,PRIMARY KEY(user_id,lesson_id));
  CREATE TABLE srs_items(user_id TEXT,content_id TEXT,stage INTEGER,PRIMARY KEY(user_id,content_id));
 `);
 const insert=db.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?,?,?,?,?)');
 for(const row of baseline.v2_grammar_points)insert.run(row.id,row.language,row.form_name,row.formula,row.core_zh,row.purpose_zh,row.when_zh,row.mistakes_zh,row.nuance_zh,row.title_zh,row.usage_zh,row.publication_state);
 for(const id of ids){
  db.prepare('INSERT INTO v2_grammar_examples VALUES(?,?,?)').run(`example-${id}`,id,'preserved');
  db.prepare('INSERT INTO v2_sentence_grammar_links VALUES(?,?,?)').run(`link-${id}`,id,'preserved');
  db.prepare('INSERT INTO learning_attempts VALUES(?,?,?)').run(`attempt-${id}`,id,1);
  db.prepare('INSERT INTO grammar_progress VALUES(?,?,?)').run('historical-user',id,3);
  db.prepare('INSERT INTO srs_items VALUES(?,?,?)').run('historical-user',id,2);
 }
 db.prepare('INSERT INTO lesson_progress VALUES(?,?,?)').run('historical-user','ja-s5-l2','completed');
 return db;
}

const snapshot=(db,table)=>JSON.stringify(db.prepare(`SELECT * FROM ${table} ORDER BY 1,2`).all());

test('migration changes exactly the four reviewed canonical records and preserves all learner evidence',()=>{
 const db=migrationDatabase(),tables=['v2_grammar_examples','v2_sentence_grammar_links','lesson_items','learning_attempts','grammar_progress','lesson_progress','srs_items'];
 const before=new Map(tables.map(table=>[table,snapshot(db,table)])),count=db.prepare('SELECT COUNT(*) count FROM v2_grammar_points').get().count;
 db.exec(migration);
 assert.equal(db.prepare('SELECT COUNT(*) count FROM v2_grammar_points').get().count,count);
 assert.deepEqual([...migration.matchAll(/WHERE id='([^']+)'/g)].map(match=>match[1]),ids);
 const statements=migration.split('\n').filter(line=>!line.trimStart().startsWith('--')).join('\n');
 assert.doesNotMatch(statements,/\bDELETE\b|\bINSERT\b|UPDATE\s+(learning_attempts|grammar_progress|lesson_progress|srs\w*)/iu);
 for(const correction of grammarContentCorrections){
  const actual=db.prepare('SELECT * FROM v2_grammar_points WHERE id=?').get(correction.id);
  for(const [field,value] of Object.entries(correction))if(field!=='id')assert.equal(actual[field],value,`${correction.id}.${field}`);
  assert.equal(actual.publication_state,'published');
 }
 for(const table of tables)assert.equal(snapshot(db,table),before.get(table),table);
 db.close();
});

test('the four canonical targets are bounded and retain selection and recall eligibility',()=>{
 assert.equal(byId.get('ja-n-desu-ga').form_name,'普通形 + んですが（N・ナ形 + なんですが）');
 assert.match(byId.get('ja-n-desu-ga').usage_zh,/名词、ナ形容词接なんですが/);
 assert.equal(byId.get('ja-node').form_name,'普通形 + ので（N・ナ形 + なので）');
 assert.doesNotMatch(JSON.stringify(byId.get('ja-node')),/\/ て-form/);
 assert.equal(byId.get('ja-honorific').form_name,'言う → おっしゃる');
 assert.match(byId.get('ja-honorific').usage_zh,/主语是受尊敬的客户或对方/);
 assert.doesNotMatch(JSON.stringify(byId.get('ja-honorific')),/なさる 等/);
 assert.equal(byId.get('ja-humble').form_name,'する → いたす');
 assert.match(byId.get('ja-humble').usage_zh,/说话者或工作人员降低自己的动作/);
 assert.doesNotMatch(JSON.stringify(byId.get('ja-humble')),/伺う 等/);
 for(const id of ids)assert.equal(isPracticeEligibleGrammarId(id),true,id);
 for(const id of overviewOnlyGrammarIds)assert.equal(isPracticeEligibleGrammarId(id),false,id);
});

test('controlled completion derives only the sentence-local authored occurrence',()=>{
 assert.equal(controlledCompletionAnswer('ja-n-desu-ga','行くつもりだったんですが、急に用事ができました。'),'んですが');
 assert.equal(controlledCompletionAnswer('ja-n-desu-ga','静かなんですが、少し狭いです。'),'なんですが');
 assert.equal(controlledCompletionAnswer('ja-node','急なので、調整が難しいです。'),'なので');
 assert.equal(controlledCompletionAnswer('ja-honorific','お客様がおっしゃる内容を確認します。'),'おっしゃる');
 assert.equal(controlledCompletionAnswer('ja-honorific','お客様がおっしゃった内容を確認します。'),'おっしゃった');
 assert.equal(controlledCompletionAnswer('ja-humble','私が確認いたします。'),'いたします');
 assert.equal(controlledCompletionAnswer('ja-node','参加できる体調ではなくて。'),null);
 assert.equal(controlledCompletionAnswer('ja-honorific','部長がなさる仕事です。'),null);
});

function practiceDatabase(){
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec(`
  CREATE TABLE v2_grammar_points(id TEXT PRIMARY KEY,language TEXT,form_name TEXT,title_zh TEXT,purpose_zh TEXT,level INTEGER,publication_state TEXT,sort_order INTEGER);
  CREATE TABLE v2_grammar_relations(source_id TEXT,target_id TEXT,type TEXT);
  CREATE TABLE v2_sentence_expressions(id TEXT PRIMARY KEY,language TEXT,text TEXT,publication_state TEXT);
  CREATE TABLE v2_sentence_grammar_links(id TEXT PRIMARY KEY,expression_id TEXT,grammar_id TEXT,language TEXT,displayed_form TEXT,sort_order INTEGER);
 `);
 let order=0;
 for(const correction of grammarContentCorrections){
  sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?)').run(correction.id,'ja',correction.form_name,correction.title_zh,correction.purpose_zh,4,'published',order);
  sqlite.prepare('INSERT INTO v2_sentence_expressions VALUES(?,?,?,?)').run(`expression-${correction.id}`,'ja',completionSentences[correction.id],'published');
  sqlite.prepare('INSERT INTO v2_sentence_grammar_links VALUES(?,?,?,?,?,?)').run(`link-${correction.id}`,`expression-${correction.id}`,correction.id,'ja',completionSentences[correction.id],order++);
 }
 for(const [id,form] of [['d1','〜ても'],['d2','〜ながら'],['d3','〜そうだ'],['d4','〜らしい'],['d5','〜はずだ']]){
  sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?)').run(id,'ja',form,`区别${id}`,`说明${id}`,4,'published',order);
  sqlite.prepare('INSERT INTO v2_sentence_expressions VALUES(?,?,?,?)').run(`expression-${id}`,'ja',`例文${form}です。`,'published');
  sqlite.prepare('INSERT INTO v2_sentence_grammar_links VALUES(?,?,?,?,?,?)').run(`link-${id}`,`expression-${id}`,id,'ja',form,order++);
 }
 const wrap=(sql,values=[])=>({bind:(...next)=>wrap(sql,next),async first(){return sqlite.prepare(sql).get(...values)||null;},async all(){return {results:sqlite.prepare(sql).all(...values)};}});
 return {sqlite,prepare:sql=>wrap(sql)};
}

async function legacyToken(spec){
 const encoder=new TextEncoder(),iv=crypto.getRandomValues(new Uint8Array(12));
 const material=await crypto.subtle.digest('SHA-256',encoder.encode(`ej-learning:practice:v1:${secret}`));
 const key=await crypto.subtle.importKey('raw',material,{name:'AES-GCM'},false,['encrypt']);
 const cipher=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode('practice-exercise-v1')},key,encoder.encode(JSON.stringify(spec))));
 const token=new Uint8Array(iv.length+cipher.length);token.set(iv);token.set(cipher,iv.length);
 return Buffer.from(token).toString('base64url');
}

test('new selection, recall, and completion tokens use one corrected authority per record',async()=>{
 const db=practiceDatabase(),env={DB:db,CONTENT_DB:db,AUTH_SECRET:secret},session={user_id:'hotfix-user'};
 for(const id of ids){
  const expected=byId.get(id).form_name;
  for(const mode of ['recognition','recall']){
   const result=await practiceSession(new URL(`https://test/api/practice/session?type=grammar&mode=${mode}&content_id=${id}&limit=1`),env,session);
   assert.equal(result.data.length,1,id);
   const spec=await resolvePracticeExercise(result.data[0].exercise_id,env,session);
   assert.equal(spec.answer,expected,`${id}:${mode}`);
  }
  const result=await practiceSession(new URL(`https://test/api/practice/session?type=grammar&mode=selection&content_id=${id}&limit=1`),env,session);
  assert.equal(result.data[0].exercise_type,'grammar_controlled_completion',id);
  const spec=await resolvePracticeExercise(result.data[0].exercise_id,env,session);
  assert.equal(spec.answer,controlledCompletionAnswer(id,completionSentences[id]),id);
  assert.match(result.data[0].prompt,/___/);
 }
 db.sqlite.close();
});

test('stale broad completion tokens and obsolete answers are rejected without writes',async()=>{
 const db=practiceDatabase(),env={DB:db,CONTENT_DB:db,AUTH_SECRET:secret},session={user_id:'hotfix-user'},before=db.sqlite.prepare('SELECT total_changes() count').get().count;
 const obsoleteForms={
  'ja-n-desu-ga':'plain form + んですが','ja-node':'普通形 + ので / て-form','ja-honorific':'おっしゃる / なさる 等','ja-humble':'いたす / 伺う 等'
 };
 const obsoleteCompletions={
  'ja-n-desu-ga':'行くつもりだったんですが、急に用事ができました。','ja-node':'急なので、調整が難しいです。','ja-honorific':'おっしゃることはわかります。','ja-humble':'確認いたします。'
 };
 for(const id of ids){
  const base={v:1,uid:session.user_id,content_type:'grammar',content_id:id,language:'ja',context_type:'standalone',context_id:null,source:'standard',prompt:'legacy',choices:null};
  const completionToken=await legacyToken({...base,exercise_type:'grammar_controlled_completion',answer:obsoleteCompletions[id],policy:'choice_exact'});
  await assert.rejects(resolvePracticeExercise(completionToken,env,session),/STALE_EXERCISE/,`${id}:completion`);
  const recallToken=await legacyToken({...base,exercise_type:'grammar_form_recall',answer:obsoleteForms[id],policy:'japanese_typed_v1'});
  await assert.rejects(resolvePracticeExercise(recallToken,env,session),/STALE_EXERCISE/,`${id}:recall`);
  assert.notEqual(normalizePracticeAnswer(obsoleteForms[id],'ja'),normalizePracticeAnswer(byId.get(id).form_name,'ja'));
 }
 assert.equal(db.sqlite.prepare('SELECT total_changes() count').get().count,before);
 db.sqlite.close();
});

test('current lesson placement is unchanged and the five proposed Stage 5 blockers are model-only',()=>{
 const links=bundle.i.filter(row=>row[1]==='grammar'&&ids.includes(row[2])).map(row=>[row[0],row[2],row[3],row[4],row[5]]);
 assert.deepEqual(links,[
  ['ja-s4-l4','ja-n-desu-ga','required',1,1],
  ['ja-s5-l2','ja-n-desu-ga','required',1,1],
  ['ja-s5-l2','ja-node','required',2,1],
  ['ja-s5-l4','ja-node','required',1,1]
 ]);
 const relationshipMatrix=matrix.slice(matrix.indexOf('## 5. Exact proposed'),matrix.indexOf('## 6. Vocabulary'));
 const proposed=relationshipMatrix.slice(relationshipMatrix.indexOf('### Japanese'));
 assert.equal((proposed.match(/`ja-n-desu-ga` R\/B/g)||[]).length,1);
 assert.equal((proposed.match(/`ja-node` [NR]\/B/g)||[]).length,2);
 assert.equal((proposed.match(/`ja-honorific` N\/B/g)||[]).length,1);
 assert.equal((proposed.match(/`ja-humble` N\/B/g)||[]).length,1);
});
