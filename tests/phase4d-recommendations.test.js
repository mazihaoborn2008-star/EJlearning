import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {progress} from '../src/progress-4b.js';
import {classifyProgress} from '../src/recommendations-4d.js';

const origin='https://ej-learning.test',now=2_000_000_000;
const migration=name=>fs.readFileSync(new URL(`../migrations-staging-schema/${name}`,import.meta.url),'utf8');
const units=[
 ['en-s1-l1','en',1,'chat','English first','Start English.',1,'published',15],
 ['en-s1-l2','en',1,'chat','English second','Continue English.',2,'published',15],
 ['ja-s1-l1','ja',1,'chat','日本語一','日本語を始める。',1,'published',15],
 ['ja-s1-l2','ja',1,'chat','日本語二','日本語を続ける。',2,'published',15]
];
const bundle={v:'test',u:units,p:[['en-s1-l2','en-s1-l1'],['ja-s1-l2','ja-s1-l1']],i:[],e:[]};

function database(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');sqlite.exec(migration('0002_phase4a_email_auth.sql'));
 sqlite.exec(`CREATE TABLE v2_vocabulary_items(id TEXT PRIMARY KEY,language TEXT NOT NULL,lemma TEXT NOT NULL,publication_state TEXT NOT NULL);
 CREATE TABLE v2_vocabulary_senses(id TEXT PRIMARY KEY,item_id TEXT NOT NULL,meaning_zh TEXT NOT NULL,sort_order INTEGER NOT NULL DEFAULT 0);
 CREATE TABLE v2_grammar_points(id TEXT PRIMARY KEY,language TEXT NOT NULL,form_name TEXT NOT NULL,title_zh TEXT NOT NULL,publication_state TEXT NOT NULL);
 CREATE TABLE lesson_units(id TEXT PRIMARY KEY,title TEXT NOT NULL,language TEXT NOT NULL,stage INTEGER NOT NULL,status TEXT NOT NULL);
 CREATE TABLE lesson_bundles(id TEXT PRIMARY KEY,schema_version TEXT NOT NULL,payload_json TEXT NOT NULL,published_at TEXT NOT NULL);`);
 for(const lesson of units)sqlite.prepare('INSERT INTO lesson_units VALUES(?,?,?,?,?)').run(lesson[0],lesson[4],lesson[1],lesson[2],lesson[7]);
 sqlite.prepare('INSERT INTO lesson_bundles VALUES(?,?,?,?)').run('phase-35e1c-v2','test',JSON.stringify(bundle),'2026-09-13');
 sqlite.exec(migration('0003_phase4b_learner_progress.sql'));sqlite.exec(migration('0004_phase4c_srs.sql'));
 const wrap=(sql,values=[])=>({bind:(...next)=>wrap(sql,next),async first(){return sqlite.prepare(sql).get(...values)||null;},async all(){return {results:sqlite.prepare(sql).all(...values)};},async run(){const result=sqlite.prepare(sql).run(...values);return {success:true,meta:{changes:Number(result.changes)}};}});
 return {sqlite,prepare:sql=>wrap(sql)};
}

function harness(){
 const DB=database();
 for(const [id,email] of [['user-a','a@example.com'],['user-b','b@example.com']])DB.sqlite.prepare("INSERT INTO users VALUES(?,?,?,?,?,'active')").run(id,email,email,1,1);
 const vocab=[['v-a','en','Answer A','词 A'],['v-b','en','Answer B','词 B'],['v-c','ja','答えC','词 C'],['v-d','en','Answer D','词 D'],['v-e','en','Answer E','词 E'],['v-stable','en','Stable answer','稳定词'],['v-unseen','en','Unseen','未见词']];
 for(const [id,language,lemma,label] of vocab){DB.sqlite.prepare('INSERT INTO v2_vocabulary_items VALUES(?,?,?,?)').run(id,language,lemma,'published');DB.sqlite.prepare('INSERT INTO v2_vocabulary_senses VALUES(?,?,?,?)').run('sense-'+id,id,label,0);}
 for(const [id,language,form,label] of [['g-a','en','secret form a','语法 A'],['g-b','ja','秘密の形','语法 B']])DB.sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?)').run(id,language,form,label,'published');
 const services={now:()=>now,session:async request=>request.headers.get('X-Test-User')?{user_id:request.headers.get('X-Test-User')}:null};
 return {DB,env:{DB,CONTENT_DB:DB},services};
}

function request(path,{method='GET',user}={}){const headers=new Headers({Origin:origin});if(user)headers.set('X-Test-User',user);return new Request(origin+path,{method,headers});}
async function call(h,path,options={}){const response=await progress(request(path,options),h.env,h.services);return {response,body:await response.json()};}
function lessonProgress(h,user,id,status,activity=now-10){h.DB.sqlite.prepare('INSERT INTO lesson_progress VALUES(?,?,?,?,?,?,?)').run(user,id,status,activity,status==='completed'?activity:null,activity,status==='completed'?'practice':'grammar');}
function itemProgress(h,{user='user-a',type='vocabulary',id,attempts=1,correct=0,lastResult=0,stage=0,lapses=1,lastWrong=now-20,next=now+600}){
 const table=type==='vocabulary'?'vocabulary_progress':'grammar_progress',key=type==='vocabulary'?'vocabulary_id':'grammar_id',wrong=attempts-correct;
 h.DB.sqlite.prepare(`INSERT INTO ${table}(user_id,${key},attempts,correct_count,wrong_count,correct_streak,last_result,first_seen_at,last_seen_at,last_correct_at,last_wrong_at,review_stage,review_count,lapse_count,last_reviewed_at,next_review_at,current_interval_seconds) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
  .run(user,id,attempts,correct,wrong,lastResult?1:0,lastResult,now-100,now-10,lastResult?now-10:null,lastWrong,stage,attempts,lapses,now-10,next,stage===0?600:86400);
}

test('the documented progress classifications are deterministic and do not use a stored score',()=>{
 assert.equal(classifyProgress({attempts:1,correct_count:0,last_result:0,review_stage:0,lapse_count:1}),'relearning');
 assert.equal(classifyProgress({attempts:5,correct_count:2,last_result:1,review_stage:2,lapse_count:0}),'weak');
 assert.equal(classifyProgress({attempts:2,correct_count:2,last_result:1,review_stage:2,lapse_count:0}),'learning');
 assert.equal(classifyProgress({attempts:5,correct_count:4,last_result:1,review_stage:3,lapse_count:0}),'stable');
 assert.equal(classifyProgress({attempts:2,correct_count:2,last_result:1,review_stage:null,lapse_count:0}),'unscheduled');
});

test('brand-new account gets the canonical first lesson with separated language paths',async()=>{
 const h=harness(),result=await call(h,'/api/recommendations',{user:'user-a'}),data=result.body.data;
 assert.equal(data.primary_action.type,'start_next_lesson');assert.equal(data.primary_action.lesson.id,'en-s1-l1');
 assert.equal(data.lesson.paths.en.next.id,'en-s1-l1');assert.equal(data.lesson.paths.ja.next.id,'ja-s1-l1');
 assert.deepEqual(data.weak_vocabulary,[]);assert.deepEqual(data.weak_grammar,[]);
});

test('due review wins over an in-progress lesson',async()=>{
 const h=harness();lessonProgress(h,'user-a','en-s1-l1','in_progress');itemProgress(h,{id:'v-a',next:now});
 const data=(await call(h,'/api/recommendations',{user:'user-a'})).body.data;
 assert.equal(data.primary_action.type,'review_due');assert.equal(data.primary_action.count,1);assert.equal(data.lesson.continue.id,'en-s1-l1');
});

test('without due reviews the most recently active in-progress lesson wins deterministically',async()=>{
 const h=harness();lessonProgress(h,'user-a','en-s1-l1','in_progress',now-30);lessonProgress(h,'user-a','ja-s1-l1','in_progress',now-5);
 const data=(await call(h,'/api/recommendations',{user:'user-a'})).body.data;
 assert.equal(data.primary_action.type,'continue_lesson');assert.equal(data.primary_action.lesson.id,'ja-s1-l1');
});

test('completed prerequisites advance to the next incomplete canonical lesson',async()=>{
 const h=harness();lessonProgress(h,'user-a','en-s1-l1','completed');
 const data=(await call(h,'/api/recommendations',{user:'user-a'})).body.data;
 assert.equal(data.primary_action.type,'start_next_lesson');assert.equal(data.primary_action.lesson.id,'en-s1-l2');assert.match(data.primary_action.reason,/前面的课程已经完成/);
});

test('all published lessons complete returns an honest completion state',async()=>{
 const h=harness();for(const lesson of units)lessonProgress(h,'user-a',lesson[0],'completed');
 const data=(await call(h,'/api/recommendations',{user:'user-a'})).body.data;
 assert.equal(data.primary_action.type,'all_lessons_complete');assert.equal(data.lesson.all_complete,true);assert.equal(data.lesson.next,null);
});

test('future reviews remain future and do not override new learning',async()=>{
 const h=harness();itemProgress(h,{id:'v-a',lastResult:1,stage:1,lapses:0,correct:1,next:now+86400,lastWrong:null});
 const data=(await call(h,'/api/recommendations',{user:'user-a'})).body.data;
 assert.equal(data.review.total_due,0);assert.equal(data.review.next_review_at,now+86400);assert.equal(data.primary_action.type,'start_next_lesson');
});

test('weakness rules, ranking, tie-breaks, metadata safety, and type separation are deterministic',async()=>{
 const h=harness();
 itemProgress(h,{id:'v-b',attempts:4,correct:2,lastResult:1,stage:2,lapses:2,lastWrong:now-40});
 itemProgress(h,{id:'v-a',attempts:2,correct:1,lastResult:0,stage:0,lapses:1,lastWrong:now-5});
 itemProgress(h,{id:'v-c',attempts:2,correct:1,lastResult:0,stage:0,lapses:1,lastWrong:now-5});
 itemProgress(h,{id:'v-d',attempts:5,correct:2,lastResult:1,stage:2,lapses:0,lastWrong:now-100});
 itemProgress(h,{id:'v-stable',attempts:5,correct:5,lastResult:1,stage:4,lapses:0,lastWrong:null});
 itemProgress(h,{type:'grammar',id:'g-a',attempts:4,correct:1,lastResult:1,stage:2,lapses:0,lastWrong:now-100});
 itemProgress(h,{type:'grammar',id:'g-b',attempts:3,correct:2,lastResult:0,stage:0,lapses:1,lastWrong:now-2});
 itemProgress(h,{user:'user-b',id:'v-e',attempts:5,correct:0,lastResult:0,stage:0,lapses:5});
 const data=(await call(h,'/api/recommendations?limit=20',{user:'user-a'})).body.data;
 assert.deepEqual(data.weak_vocabulary.map(x=>x.id),['v-a','v-c','v-b','v-d']);
 assert.deepEqual(data.weak_grammar.map(x=>x.id),['g-b','g-a']);
 assert.equal(data.weak_vocabulary[0].classification,'relearning');assert.equal(data.weak_vocabulary[2].classification,'weak');
 assert.match(data.weak_vocabulary[2].reasons.join(' '),/2 次遗忘/);assert.match(data.weak_vocabulary[3].reason,/累计正确率 40%/);
 const serialized=JSON.stringify(data);assert(!serialized.includes('Answer A'));assert(!serialized.includes('secret form'));assert(!serialized.includes('v-stable'));assert(!serialized.includes('v-unseen'));assert(!serialized.includes('v-e'));
});

test('weak arrays honor default and maximum bounds',async()=>{
 const h=harness();for(const id of ['v-a','v-b','v-c','v-d','v-e','v-stable'])itemProgress(h,{id,attempts:1,lastResult:0,stage:0,lapses:1});
 assert.equal((await call(h,'/api/recommendations',{user:'user-a'})).body.data.weak_vocabulary.length,5);
 assert.equal((await call(h,'/api/recommendations?limit=2',{user:'user-a'})).body.data.weak_vocabulary.length,2);
 assert.equal((await call(h,'/api/recommendations?limit=21',{user:'user-a'})).response.status,400);
});

test('recommendation endpoint is authenticated, rejects authority-shaped query input, and is GET-only',async()=>{
 const h=harness();assert.equal((await call(h,'/api/recommendations')).response.status,401);
 assert.equal((await call(h,'/api/recommendations?user_id=user-b',{user:'user-a'})).response.status,400);
 assert.equal((await call(h,'/api/recommendations',{method:'POST',user:'user-a'})).response.status,405);
});

test('repeated recommendation and dashboard reads perform zero writes or SRS/lesson mutation',async()=>{
 const h=harness();itemProgress(h,{id:'v-a',next:now});lessonProgress(h,'user-a','en-s1-l1','in_progress');
 const beforeChanges=h.DB.sqlite.prepare('SELECT total_changes() n').get().n,beforeVocab={...h.DB.sqlite.prepare('SELECT * FROM vocabulary_progress').get()},beforeLesson={...h.DB.sqlite.prepare('SELECT * FROM lesson_progress').get()};
 for(let index=0;index<3;index++){await call(h,'/api/recommendations',{user:'user-a'});await call(h,'/api/progress/summary',{user:'user-a'});await call(h,'/api/progress/recent',{user:'user-a'});}
 assert.equal(h.DB.sqlite.prepare('SELECT total_changes() n').get().n,beforeChanges);assert.deepEqual({...h.DB.sqlite.prepare('SELECT * FROM vocabulary_progress').get()},beforeVocab);assert.deepEqual({...h.DB.sqlite.prepare('SELECT * FROM lesson_progress').get()},beforeLesson);
});

test('existing indexes constrain due, in-progress, and user-first weakness reads',()=>{
 const h=harness();
 const due=h.DB.sqlite.prepare('EXPLAIN QUERY PLAN SELECT vocabulary_id FROM vocabulary_progress WHERE user_id=? AND next_review_at<=? ORDER BY next_review_at,vocabulary_id LIMIT 5').all('user-a',now);
 const active=h.DB.sqlite.prepare("EXPLAIN QUERY PLAN SELECT lesson_id FROM lesson_progress WHERE user_id=? AND status='in_progress' ORDER BY last_activity_at DESC LIMIT 1").all('user-a');
 const weak=h.DB.sqlite.prepare('EXPLAIN QUERY PLAN SELECT vocabulary_id FROM vocabulary_progress WHERE user_id=? AND (review_stage=0 OR last_result=0 OR lapse_count>=2) LIMIT 5').all('user-a');
 assert(due.some(row=>String(row.detail).includes('idx_vocabulary_progress_user_due')));assert(active.some(row=>String(row.detail).includes('idx_lesson_progress_user_status')));assert(weak.some(row=>/SEARCH vocabulary_progress USING INDEX .*\(user_id=\?\)/.test(String(row.detail))));
});
