import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {progress} from '../src/progress-4b.js';

const origin='https://ej-learning.test',secret='phase4e-test-secret-that-is-longer-than-thirty-two-characters',now=2_000_000_000;
const migration=name=>fs.readFileSync(new URL(`../migrations-staging-schema/${name}`,import.meta.url),'utf8');
const vocab=[
 ['v-alpha','en','Alpha','甲'],['v-bravo','en','Bravo','乙'],['v-charlie','en','Charlie','丙'],['v-delta','en','Delta','丁'],['v-echo','en','Echo','戊'],['v-foxtrot','en','Foxtrot','己'],
 ['v-ja-one','ja','水','水'],['v-ja-two','ja','火','火'],['v-ja-three','ja','木','木'],['v-ja-four','ja','金','金']
];
const grammar=[['g-might','en','might','可能性'],['g-can','en','can','能力'],['g-will','en','will','将来'],['g-must','en','must','义务'],['g-should','en','should','建议'],['g-could','en','could','较弱可能'],['en-greeting','en','greeting / thanks formula','程式化社交回应'],['35e1c-ja-condition-contrast','ja','なら・たら・ば・と（比較概要）','条件比较概览'],['35e1c-ja-workplace-register','ja','敬体・尊敬語・謙譲語（使い分け概要）','职场语域概览']];
const units=[
 ['en-s1-l1','en',1,'topic','Lesson A','Practice five items.',1,'published',15],
 ['en-s1-l2','en',1,'topic','Lesson B','Shared item must not leak.',2,'published',15],
 ['en-s1-l3','en',1,'topic','Sparse lesson','Practice one item.',3,'published',15]
];
const items=[...vocab.slice(0,5).map((x,i)=>['en-s1-l1','vocabulary',x[0],'required',i+1,1]),['en-s1-l1','grammar','en-greeting','required',1,1],['en-s1-l1','grammar','35e1c-ja-condition-contrast','support',2,0],['en-s1-l1','grammar','35e1c-ja-workplace-register','support',3,0],['en-s1-l2','vocabulary','v-alpha','required',1,1],['en-s1-l2','grammar','g-might','required',2,1],['en-s1-l3','vocabulary','v-foxtrot','required',1,1]];
const bundle={v:'phase4e-test',u:units,p:[],i:items,e:[]};

function database(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');sqlite.exec(migration('0002_phase4a_email_auth.sql'));
 sqlite.exec(`
 CREATE TABLE v2_vocabulary_items(id TEXT PRIMARY KEY,language TEXT NOT NULL,lemma TEXT NOT NULL,stage INTEGER NOT NULL,part_of_speech TEXT NOT NULL,publication_state TEXT NOT NULL,sort_order INTEGER NOT NULL);
 CREATE TABLE v2_vocabulary_senses(id TEXT PRIMARY KEY,item_id TEXT NOT NULL,meaning_zh TEXT NOT NULL,sort_order INTEGER NOT NULL);
 CREATE TABLE v2_vocabulary_relations(source_id TEXT NOT NULL,target_id TEXT NOT NULL,type TEXT NOT NULL);
 CREATE TABLE v2_grammar_points(id TEXT PRIMARY KEY,language TEXT NOT NULL,form_name TEXT NOT NULL,title_zh TEXT NOT NULL,purpose_zh TEXT NOT NULL,level INTEGER NOT NULL,publication_state TEXT NOT NULL,sort_order INTEGER NOT NULL);
 CREATE TABLE v2_grammar_relations(source_id TEXT NOT NULL,target_id TEXT NOT NULL,type TEXT NOT NULL);
 CREATE TABLE v2_sentence_expressions(id TEXT PRIMARY KEY,language TEXT NOT NULL,text TEXT NOT NULL,publication_state TEXT NOT NULL);
 CREATE TABLE v2_sentence_grammar_links(id TEXT PRIMARY KEY,expression_id TEXT NOT NULL,grammar_id TEXT NOT NULL,language TEXT NOT NULL,displayed_form TEXT NOT NULL,sort_order INTEGER NOT NULL);
 CREATE TABLE lesson_units(id TEXT PRIMARY KEY,title TEXT NOT NULL,language TEXT NOT NULL,stage INTEGER NOT NULL,status TEXT NOT NULL);
 CREATE TABLE lesson_bundles(id TEXT PRIMARY KEY,schema_version TEXT NOT NULL,payload_json TEXT NOT NULL,published_at TEXT NOT NULL);
 `);
 for(const [i,x] of vocab.entries()){sqlite.prepare('INSERT INTO v2_vocabulary_items VALUES(?,?,?,?,?,?,?)').run(x[0],x[1],x[2],1,'noun','published',i);sqlite.prepare('INSERT INTO v2_vocabulary_senses VALUES(?,?,?,?)').run('s-'+x[0],x[0],x[3],0);}
 for(const [i,x] of grammar.entries()){sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?)').run(x[0],x[1],x[2],x[3],`说明${x[3]}`,1,'published',i);sqlite.prepare('INSERT INTO v2_sentence_expressions VALUES(?,?,?,?)').run('e-'+x[0],'en',`I ${x[2]} take action ${i}.`,'published');sqlite.prepare('INSERT INTO v2_sentence_grammar_links VALUES(?,?,?,?,?,?)').run('l-'+x[0],'e-'+x[0],x[0],'en',x[2],i);}
 for(const x of units)sqlite.prepare('INSERT INTO lesson_units VALUES(?,?,?,?,?)').run(x[0],x[4],x[1],x[2],x[7]);
 sqlite.prepare('INSERT INTO lesson_bundles VALUES(?,?,?,?)').run('phase-35e1c-v2','test',JSON.stringify(bundle),'2026-09-14');
 sqlite.exec(migration('0003_phase4b_learner_progress.sql'));sqlite.exec(migration('0004_phase4c_srs.sql'));sqlite.exec(migration('0005_phase4e_practice_engine.sql'));
 const wrap=(sql,values=[])=>({bind:(...next)=>wrap(sql,next),async first(){return sqlite.prepare(sql).get(...values)||null;},async all(){return {results:sqlite.prepare(sql).all(...values)};},async run(){const result=sqlite.prepare(sql).run(...values);return {success:true,meta:{changes:Number(result.changes)}};}});
 return {sqlite,prepare:sql=>wrap(sql)};
}
function harness(){const DB=database();for(const [id,email] of [['user-a','a@example.com'],['user-b','b@example.com']])DB.sqlite.prepare("INSERT INTO users VALUES(?,?,?,?,?,'active')").run(id,email,email,1,1);return {DB,env:{DB,CONTENT_DB:DB,AUTH_SECRET:secret},services:{now:()=>now,session:async request=>request.headers.get('X-Test-User')?{user_id:request.headers.get('X-Test-User')}:null}};}
function request(path,{method='GET',user='user-a',body}={}){const headers=new Headers({Origin:origin});if(user)headers.set('X-Test-User',user);if(body!==undefined)headers.set('Content-Type','application/json');return new Request(origin+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});}
async function call(h,path,options={}){const response=await progress(request(path,options),h.env,h.services);return {response,body:await response.json()};}
const session=(h,query)=>call(h,'/api/practice/session?'+query);
const answer=async(h,exercise,text,id='phase4e_attempt_0001',user='user-a')=>call(h,'/api/learning/attempt',{method:'POST',user,body:{attempt_id:id,exercise_token:exercise.exercise_id,answer:text}});
function expected(exercise){
 if(exercise.exercise_type==='vocabulary_recognition')return vocab.find(x=>exercise.prompt.includes(`“${x[2]}”`))?.[3];
 if(['vocabulary_meaning_to_word','vocabulary_typed_recall'].includes(exercise.exercise_type))return vocab.find(x=>exercise.prompt.includes(`“${x[3]}”`))?.[2];
 if(['grammar_form_selection','grammar_form_recall'].includes(exercise.exercise_type))return grammar.find(x=>exercise.prompt.includes(`“${x[3]}”`))?.[2];
 return grammar.find(x=>exercise.prompt.includes(` ${x[2]} `)||exercise.prompt.includes(`___${x[2]} `))?.[2];
}

test('vocabulary recognition and reverse choice hide answers, have four unique choices, and grade correct and wrong',async()=>{
 const h=harness();
 for(const [mode,expectedType] of [['recognition','vocabulary_recognition'],['selection','vocabulary_meaning_to_word']]){
  const loaded=await session(h,`type=vocabulary&mode=${mode}&limit=1`),exercise=loaded.body.data[0];
  assert.equal(exercise.exercise_type,expectedType);assert.equal(exercise.choices.length,4);assert.equal(new Set(exercise.choices).size,4);assert(!JSON.stringify(exercise).includes('answer'));
  const correct=expected(exercise),correctResult=await answer(h,exercise,correct,`correct_${mode}_0001`);assert.equal(correctResult.body.data.correct,true);
  const wrong=exercise.choices.find(x=>x!==correct),wrongResult=await answer(h,exercise,wrong,`wrong_${mode}_000001`);assert.equal(wrongResult.body.data.correct,false);assert.equal(wrongResult.body.data.expected_answer,correct);
 }
});

test('typed recall documents conservative normalization and rejects unlisted variants',async()=>{
 const h=harness(),exercise=(await session(h,'type=vocabulary&mode=recall&limit=10')).body.data.find(x=>x.prompt.includes('甲'));
 assert.equal((await answer(h,exercise,'  ALPHA  ','typed_normal_0001')).body.data.correct,true);
 assert.equal((await answer(h,exercise,'alphas','typed_variant_bad1')).body.data.correct,false);
 const japanese=(await session(h,'type=vocabulary&mode=recall&limit=10')).body.data.find(x=>x.prompt.includes('水'));
 assert(japanese);assert.equal((await answer(h,japanese,'みず','japanese_variant01')).body.data.correct,false);
});

test('grammar form selection and authored controlled completion grade authoritatively',async()=>{
 const h=harness(),selection=(await session(h,'type=grammar&mode=recognition&limit=1')).body.data[0];assert.equal(selection.exercise_type,'grammar_form_selection');assert(!JSON.stringify(selection).includes('"answer"'));assert.equal(selection.choices.length,4);
 assert.equal((await answer(h,selection,expected(selection),'grammar_select_01')).body.data.correct,true);
 const completion=(await session(h,'type=grammar&mode=selection&limit=6')).body.data.find(x=>x.exercise_type==='grammar_controlled_completion');
 const completionIndex=Number(completion?.prompt.match(/action (\d)/)?.[1]),completionAnswer=grammar[completionIndex]?.[2];assert(completion&&completionAnswer);assert.match(completion.prompt,/___/);assert.equal((await answer(h,completion,completionAnswer,'grammar_complete1')).body.data.correct,true);const wrongChoice=completion.choices.find(x=>x!==completionAnswer);assert(wrongChoice);assert.equal((await answer(h,completion,wrongChoice,'grammar_complete2')).body.data.correct,false);
});

test('ambiguous authored completion is not generated and safely falls back to form selection',async()=>{
 const h=harness();h.DB.sqlite.prepare("UPDATE v2_sentence_expressions SET text='I might act because I might help.' WHERE id='e-g-might'").run();
 const loaded=await session(h,'type=grammar&mode=selection&limit=1&content_id=g-might');assert.equal(loaded.body.data.length,1);assert.equal(loaded.body.data[0].exercise_type,'grammar_form_selection');
});

test('reclassified social-expression categories are excluded from standalone and lesson grammar practice',async()=>{
 const h=harness(),standalone=await session(h,'type=grammar&mode=recall&limit=1&content_id=en-greeting&language=en');
 assert.equal(standalone.body.data.length,0);
 const lesson=await session(h,'type=mixed&mode=mixed&limit=20&context=lesson&lesson_id=en-s1-l1');
 assert.equal(lesson.body.meta.requirement.assessable_items,5);
 assert(!lesson.body.data.some(x=>x.prompt.includes('程式化社交回应')||x.prompt.includes('greeting / thanks formula')));
});

test('tampering, cross-user replay, forged authority fields, mixed identity fields, and off-list choices are rejected without writes',async()=>{
 const h=harness(),exercise=(await session(h,'type=vocabulary&mode=recognition&limit=1')).body.data[0],before=h.DB.sqlite.prepare('SELECT total_changes() n').get().n;
 const at=Math.floor(exercise.exercise_id.length/2),tampered=exercise.exercise_id.slice(0,at)+(exercise.exercise_id[at]==='A'?'B':'A')+exercise.exercise_id.slice(at+1);assert.equal((await answer(h,{exercise_id:tampered},'甲','tampered_token_001')).response.status,400);
 assert.equal((await answer(h,exercise,'甲','foreign_replay_001','user-b')).response.status,400);
 const forged=await call(h,'/api/learning/attempt',{method:'POST',body:{attempt_id:'forged_fields_0001',exercise_token:exercise.exercise_id,answer:'甲',correct:true}});assert.equal(forged.response.status,400);
 const forgedType=await call(h,'/api/learning/attempt',{method:'POST',body:{attempt_id:'forged_type_000001',exercise_token:exercise.exercise_id,answer:'甲',exercise_type:'vocabulary_typed_recall'}});assert.equal(forgedType.response.status,400);
 const forgedContext=await call(h,'/api/learning/attempt',{method:'POST',body:{attempt_id:'forged_context_001',exercise_token:exercise.exercise_id,answer:'甲',context_type:'lesson',context_id:'en-s1-l1'}});assert.equal(forgedContext.response.status,400);
 const mixed=await call(h,'/api/learning/attempt',{method:'POST',body:{attempt_id:'mixed_fields_00001',exercise_token:exercise.exercise_id,answer:'甲',content_id:'v-bravo'}});assert.equal(mixed.response.status,400);
 assert.equal((await answer(h,exercise,'not a visible choice','off_list_choice_001')).response.status,400);
 assert.equal(h.DB.sqlite.prepare('SELECT total_changes() n').get().n,before);
});

test('tokenized attempts are idempotent and feed the existing item-level progress and SRS stream',async()=>{
 const h=harness(),exercise=(await session(h,'type=vocabulary&mode=recognition&limit=1')).body.data[0],body={attempt_id:'idempotent_attempt1',exercise_token:exercise.exercise_id,answer:expected(exercise)},before=h.DB.sqlite.prepare('SELECT total_changes() n').get().n;
 const first=await call(h,'/api/learning/attempt',{method:'POST',body}),changes=h.DB.sqlite.prepare('SELECT total_changes() n').get().n,retry=await call(h,'/api/learning/attempt',{method:'POST',body});
 assert.equal(changes-before,2,'one ledger insert plus one trigger-driven progress/SRS upsert');
 assert.equal(first.body.data.correct,true);assert.equal(retry.body.data.idempotent,true);assert.equal(h.DB.sqlite.prepare('SELECT total_changes() n').get().n,changes);
 const row=h.DB.sqlite.prepare("SELECT p.attempts,p.review_count,p.review_stage,a.exercise_type,a.context_type FROM vocabulary_progress p JOIN learning_attempts a ON a.content_id=p.vocabulary_id WHERE a.attempt_id='idempotent_attempt1'").get();assert.deepEqual({...row},{attempts:1,review_count:1,review_stage:1,exercise_type:'vocabulary_recognition',context_type:'standalone'});
});

test('attempt identity cannot be reused across standalone and lesson contexts for the same item',async()=>{
 const h=harness(),standalone=(await session(h,'type=vocabulary&mode=recall&limit=1&content_id=v-alpha')).body.data[0],lesson=(await session(h,'type=vocabulary&mode=recall&limit=5&context=lesson&lesson_id=en-s1-l1')).body.data.find(x=>x.prompt.includes('甲')),id='context_conflict_001';
 assert.equal((await answer(h,standalone,'Alpha',id)).response.status,200);const conflict=await answer(h,lesson,'Alpha',id);assert.equal(conflict.response.status,409);assert.equal(conflict.body.error.code,'ATTEMPT_ID_CONFLICT');
});

test('practice session GET is authenticated, bounded to 20, hides canonical fields, and performs zero writes',async()=>{
 const h=harness(),before=h.DB.sqlite.prepare('SELECT total_changes() n').get().n;assert.equal((await call(h,'/api/practice/session?type=vocabulary',{user:null})).response.status,401);assert.equal((await session(h,'type=vocabulary&limit=21')).response.status,400);
 const loaded=await session(h,'type=mixed&mode=mixed&limit=20');assert(loaded.body.data.length<=20);for(const item of loaded.body.data){assert.deepEqual(Object.keys(item).filter(x=>['answer','expected_answer','content_id','grading_policy'].includes(x)),[]);}assert.equal(h.DB.sqlite.prepare('SELECT total_changes() n').get().n,before);
});

test('migration columns are nullable for history and the lesson evidence index has the intended key order',()=>{
 const h=harness(),columns=h.DB.sqlite.prepare("SELECT name,\"notnull\" AS required FROM pragma_table_info('learning_attempts') WHERE name IN ('exercise_type','context_type','context_id') ORDER BY cid").all();assert.deepEqual(columns.map(x=>[x.name,x.required]),[['exercise_type',0],['context_type',0],['context_id',0]]);
 const index=h.DB.sqlite.prepare("SELECT name FROM pragma_index_info('idx_learning_attempts_lesson_evidence') ORDER BY seqno").all().map(x=>x.name);assert.deepEqual(index,['user_id','context_id','content_type','content_id']);
});

async function complete(h,id){return call(h,`/api/lessons/${id}/complete`,{method:'POST',body:{}});}
test('lesson completion requires five unique lesson-context attempts but not correct answers',async()=>{
 const h=harness();assert.equal((await complete(h,'en-s1-l1')).body.error.code,'LESSON_PRACTICE_REQUIRED');const loaded=await session(h,'type=vocabulary&mode=recognition&limit=5&context=lesson&lesson_id=en-s1-l1');assert.equal(loaded.body.meta.requirement.required_items,5);
 for(let i=0;i<4;i++)await answer(h,loaded.body.data[i],loaded.body.data[i].choices.at(-1),`lesson_partial_${i}000`);assert.equal((await complete(h,'en-s1-l1')).body.error.code,'LESSON_PRACTICE_REQUIRED');
 await answer(h,loaded.body.data[4],loaded.body.data[4].choices.at(-1),'lesson_enough_0001');const done=await complete(h,'en-s1-l1');assert.equal(done.body.data.status,'completed');assert.equal((await complete(h,'en-s1-l1')).body.data.changed,false);
});

test('sparse lessons are achievable, existing completion is grandfathered, and credit never leaks across lessons',async()=>{
 const h=harness(),sparse=(await session(h,'type=vocabulary&mode=recall&limit=10&context=lesson&lesson_id=en-s1-l3')).body.data;assert.equal(sparse.length,1);await answer(h,sparse[0],'wrong','sparse_attempt_001');assert.equal((await complete(h,'en-s1-l3')).body.data.status,'completed');
 h.DB.sqlite.prepare("INSERT INTO lesson_progress VALUES('user-a','en-s1-l2','completed',1,1,1,'practice')").run();const grandfathered=await complete(h,'en-s1-l2');assert.equal(grandfathered.body.data.grandfathered,true);
 const h2=harness(),lessonA=(await session(h2,'type=vocabulary&mode=recall&limit=5&context=lesson&lesson_id=en-s1-l1')).body.data;await answer(h2,lessonA.find(x=>x.prompt.includes('甲')),'Alpha','shared_item_context1');const lessonB=await complete(h2,'en-s1-l2');assert.equal(lessonB.body.error.code,'LESSON_PRACTICE_REQUIRED');assert.equal(lessonB.body.error.evidence.completed_items,0);
});

test('weakness vocabulary and grammar sessions contain only ranked real weaknesses, allow future-scheduled items, and do zero writes',async()=>{
 const h=harness();
 const insert=(table,key,id,{last=0,stage=0,lapses=1,next=now+86400}={})=>h.DB.sqlite.prepare(`INSERT INTO ${table}(user_id,${key},attempts,correct_count,wrong_count,correct_streak,last_result,first_seen_at,last_seen_at,last_correct_at,last_wrong_at,review_stage,review_count,lapse_count,last_reviewed_at,next_review_at,current_interval_seconds) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run('user-a',id,3,last?2:1,last?1:2,last?1:0,last,now-100,now-10,last?now-10:null,now-10,stage,3,lapses,now-10,next,stage?86400:600);
 insert('vocabulary_progress','vocabulary_id','v-bravo',{last:1,stage:2,lapses:2});insert('vocabulary_progress','vocabulary_id','v-alpha');
 insert('grammar_progress','grammar_id','g-can',{last:1,stage:2,lapses:2});insert('grammar_progress','grammar_id','g-might');
 const before=h.DB.sqlite.prepare('SELECT total_changes() n').get().n,v=await session(h,'source=weakness&type=vocabulary&mode=recall'),g=await session(h,'source=weakness&type=grammar&mode=recall');
 assert.equal(v.body.meta.limit,5);assert.equal(v.body.meta.maximum,10);assert.equal(v.body.data.length,2);assert.match(v.body.data[0].prompt,/甲/);assert.match(v.body.data[1].prompt,/乙/);
 assert.equal(g.body.data.length,2);assert.match(g.body.data[0].prompt,/可能性/);assert.match(g.body.data[1].prompt,/能力/);assert.equal(h.DB.sqlite.prepare('SELECT total_changes() n').get().n,before);
 assert.equal((await session(h,'source=weakness&type=vocabulary&limit=11')).response.status,400);assert.equal((await session(h,'source=weakness&type=mixed')).response.status,400);assert.equal((await session(h,'source=weakness&type=vocabulary&content_id=v-alpha&limit=1')).response.status,400);
});

test('overview-only grammar cannot create standalone, lesson, weakness, or direct legacy practice',async()=>{
 const h=harness();
 for(const id of ['35e1c-ja-condition-contrast','35e1c-ja-workplace-register']){
  assert.equal((await session(h,`type=grammar&mode=recall&content_id=${id}&language=ja&limit=1`)).body.data.length,0);
  h.DB.sqlite.prepare(`INSERT INTO grammar_progress(user_id,grammar_id,attempts,correct_count,wrong_count,correct_streak,last_result,first_seen_at,last_seen_at,last_correct_at,last_wrong_at,review_stage,review_count,lapse_count,last_reviewed_at,next_review_at,current_interval_seconds) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
   .run('user-a',id,1,0,1,0,0,now-10,now-10,null,now-10,0,1,1,now-10,now,600);
 }
 const lesson=await session(h,'type=grammar&mode=recall&context=lesson&lesson_id=en-s1-l1&limit=10');
 assert.deepEqual(lesson.body.data,[]);
 const weakness=await session(h,'source=weakness&type=grammar&mode=recall&language=ja');
 assert.deepEqual(weakness.body.data,[]);
 const direct=await call(h,'/api/learning/attempt',{method:'POST',body:{attempt_id:'blocked_overview_0001',content_type:'grammar',content_id:'35e1c-ja-condition-contrast',answer:'なら'}});
 assert.equal(direct.response.status,404);assert.equal(direct.body.error.code,'CONTENT_NOT_FOUND');
 assert.equal(h.DB.sqlite.prepare("SELECT COUNT(*) count FROM learning_attempts WHERE content_id='35e1c-ja-condition-contrast'").get().count,0);
});
