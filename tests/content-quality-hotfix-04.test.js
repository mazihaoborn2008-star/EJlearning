import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {
  enWouldLikeContentCorrection,
  grammarPracticeAuthorities,
  grammarPracticeAuthority,
  isGrammarExerciseTypeAllowed,
  isPracticeEligibleGrammarId,
  isTokenlessGrammarGradingAllowed,
  materializeGrammarExerciseTypes
} from '../src/content-quality-04.js';
import {practiceSession,resolvePracticeExercise} from '../src/practice-4e.js';
import {progress} from '../src/progress-4b.js';
import {recommendationData} from '../src/recommendations-4d.js';

const root=new URL('..',import.meta.url).pathname.replace(/^\/(.:)/,'$1');
const target='en-would-like',origin='https://ej-learning.test',secret='content-quality-04-secret-longer-than-thirty-two-characters',now=2_000_000_000;
const migration=fs.readFileSync(`${root}/migrations-content-quality-04/0001_content_quality_hotfix_04.sql`,'utf8');
const schemaMigration=name=>fs.readFileSync(`${root}/migrations-staging-schema/${name}`,'utf8');
const oldModel={title_zh:'礼貌愿望与邀请',form_name:'would like / love / prefer',formula:'would like / love / prefer + noun / to-infinitive'};
const legacyLinks=[
  ['legacy-85-en',"I'd prefer to stay within my budget.","I'd prefer to stay within my budget."],
  ['legacy-150-en','Would you like to have lunch together?','Would you like to have lunch together?'],
  ['legacy-151-en',"I'd love to, but I have plans.","I'd love to, but I have plans."],
  ['35e1b-en-d-order-unavailable-expr',"I’d like the soup, please.","I’d like"],
  ['35e1b-en-d-return-exchange-expr',"I’d like to exchange this for a different size.","I’d like"],
  ['35e1b-en-x-appt-make-expr',"I’d like to make an appointment.","I’d like"],
  ['35e1b-en-x-return-wrong-size-expr',"I’d like to return this because it is the wrong size.","I’d like"]
];

function canonicalDatabase({hotfix04=false}={}){
  const db=new DatabaseSync(':memory:');
  for(const directory of ['migrations-35d','migrations-35e1a','migrations-35e1a2','migrations-35e1b','migrations-35e1c']){
    for(const file of fs.readdirSync(`${root}/${directory}`).filter(name=>name.endsWith('.sql')).sort())db.exec(fs.readFileSync(`${root}/${directory}/${file}`,'utf8'));
  }
  db.exec('CREATE TABLE IF NOT EXISTS v2_grammar_example_target_audits(example_id TEXT PRIMARY KEY,grammar_id TEXT,rationale_zh TEXT)');
  for(const file of [
    'migrations-content-quality-01/0001_content_quality_hotfix_01.sql',
    'migrations-content-quality-02/0001_content_quality_hotfix_02.sql',
    'migrations-content-quality-03/0001_content_quality_hotfix_03.sql',
    'migrations-curriculum-expansion-01/0001_curriculum_expansion_01a_bundle.sql'
  ])db.exec(fs.readFileSync(`${root}/${file}`,'utf8'));
  for(const directory of ['migrations-stage5-expansion-02','migrations-stage6-expansion-03']){
    for(const file of fs.readdirSync(`${root}/${directory}`).filter(name=>name.endsWith('.sql')).sort())db.exec(fs.readFileSync(`${root}/${directory}/${file}`,'utf8'));
  }
  if(hotfix04)db.exec(migration);
  return db;
}

const snapshot=(db,table)=>JSON.stringify(db.prepare(`SELECT * FROM ${table} ORDER BY 1,2`).all());

test('canonical migration changes one record, preserves nine examples, seven links, one lesson identity, and learner/SRS state',()=>{
  const db=canonicalDatabase(),before=db.prepare('SELECT title_zh,form_name,formula FROM v2_grammar_points WHERE id=?').get(target);
  assert.deepEqual({...before},oldModel);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM v2_grammar_examples WHERE grammar_id=?').get(target).n,9);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM v2_sentence_grammar_links WHERE grammar_id=?').get(target).n,7);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM v2_grammar_example_completion_authority WHERE grammar_id=?').get(target).n,0);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM v2_grammar_example_completion_reviews WHERE grammar_id=?').get(target).n,0);
  db.exec(`
    CREATE TABLE learning_attempts(user_id TEXT,attempt_id TEXT PRIMARY KEY,content_type TEXT,content_id TEXT,result INTEGER,created_at INTEGER,exercise_type TEXT,context_type TEXT,context_id TEXT);
    CREATE TABLE grammar_progress(user_id TEXT,grammar_id TEXT,attempts INTEGER,correct_count INTEGER,wrong_count INTEGER,correct_streak INTEGER,last_result INTEGER,first_seen_at INTEGER,last_seen_at INTEGER,last_correct_at INTEGER,last_wrong_at INTEGER,review_stage INTEGER,review_count INTEGER,lapse_count INTEGER,last_reviewed_at INTEGER,next_review_at INTEGER,current_interval_seconds INTEGER,PRIMARY KEY(user_id,grammar_id));
    CREATE TABLE lesson_progress(user_id TEXT,lesson_id TEXT,status TEXT,started_at INTEGER,completed_at INTEGER,last_activity_at INTEGER,last_section_key TEXT,PRIMARY KEY(user_id,lesson_id));
  `);
  db.prepare('INSERT INTO learning_attempts VALUES(?,?,?,?,?,?,?,?,?)').run('historical-user','historical-attempt','grammar',target,0,111,'grammar_form_recall','lesson','en-s1-l2');
  db.prepare('INSERT INTO grammar_progress VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run('historical-user',target,9,6,3,2,1,100,900,850,700,4,8,2,900,1900,86400);
  db.prepare('INSERT INTO lesson_progress VALUES(?,?,?,?,?,?,?)').run('historical-user','en-s1-l2','completed',10,20,30,'practice');
  const preserved=['v2_grammar_examples','v2_sentence_grammar_links','learning_attempts','grammar_progress','lesson_progress'];
  const state=new Map(preserved.map(table=>[table,snapshot(db,table)])),grammarCount=db.prepare('SELECT COUNT(*) n FROM v2_grammar_points').get().n;
  db.exec(migration);
  const actual=db.prepare('SELECT * FROM v2_grammar_points WHERE id=?').get(target);
  for(const [field,value] of Object.entries(enWouldLikeContentCorrection))if(field!=='id')assert.equal(actual[field],value,field);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM v2_grammar_points').get().n,grammarCount);
  for(const table of preserved)assert.equal(snapshot(db,table),state.get(table),table);
  const semantic=snapshot(db,'v2_grammar_points');db.exec(migration);assert.equal(snapshot(db,'v2_grammar_points'),semantic,'second application is semantically idempotent');
  const statements=migration.replace(/^--.*$/gm,'');
  assert.deepEqual([...migration.matchAll(/WHERE id='([^']+)'/g)].map(match=>match[1]),[target]);
  assert.doesNotMatch(statements,/\b(?:INSERT|DELETE)\b|UPDATE\s+(?:learning_attempts|grammar_progress|lesson_progress|vocabulary_progress|users|user_settings)/iu);
  db.close();
});

test('canonical inventory remains exactly 0 LIKE, 1 WOULD LOVE, 2 WOULD PREFER, 6 WOULD LIKE, with one Stage 1 lesson link',()=>{
  const db=canonicalDatabase({hotfix04:true}),examples=db.prepare('SELECT id,text FROM v2_grammar_examples WHERE grammar_id=? ORDER BY id').all(target);
  const classify=text=>/\bwould\s+love\b/iu.test(text)?'WOULD LOVE':/\bwould\s+prefer\b/iu.test(text)?'WOULD PREFER':/\bwould(?:\s+not)?\s+like\b/iu.test(text)||/\bwould\s+\w+\s+like\b/iu.test(text)?'WOULD LIKE':/\blike\b/iu.test(text)?'LIKE':'OTHER';
  const counts=Object.fromEntries(['LIKE','WOULD LOVE','WOULD PREFER','WOULD LIKE','OTHER'].map(kind=>[kind,examples.filter(row=>classify(row.text)===kind).length]));
  assert.equal(examples.length,9);assert.deepEqual(counts,{LIKE:0,'WOULD LOVE':1,'WOULD PREFER':2,'WOULD LIKE':6,OTHER:0});
  const activeBundle=JSON.parse(db.prepare("SELECT payload_json FROM lesson_bundles WHERE id='curriculum-stage6-expansion-03-v1'").get().payload_json),links=activeBundle.i.filter(row=>row[1]==='grammar'&&row[2]===target);assert.deepEqual(links,[['en-s1-l2','grammar',target,'support',3,0,null]]);
  assert.equal(activeBundle.i.some(row=>row[0].startsWith('en-s6-')&&row[2]===target),false);
  db.close();
});

function practiceDatabase(){
  const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');sqlite.exec(schemaMigration('0002_phase4a_email_auth.sql'));
  sqlite.exec(`
    CREATE TABLE v2_vocabulary_items(id TEXT PRIMARY KEY,language TEXT,lemma TEXT,stage INTEGER,part_of_speech TEXT,publication_state TEXT,sort_order INTEGER);
    CREATE TABLE v2_vocabulary_senses(id TEXT PRIMARY KEY,item_id TEXT,meaning_zh TEXT,sort_order INTEGER);
    CREATE TABLE v2_vocabulary_relations(source_id TEXT,target_id TEXT,type TEXT);
    CREATE TABLE v2_grammar_points(id TEXT PRIMARY KEY,language TEXT,slug TEXT,title_zh TEXT,form_name TEXT,level INTEGER,core_zh TEXT,purpose_zh TEXT,formula TEXT,when_zh TEXT,mistakes_zh TEXT,nuance_zh TEXT,usage_zh TEXT,register TEXT,publication_state TEXT,sort_order INTEGER);
    CREATE TABLE v2_grammar_examples(id TEXT PRIMARY KEY,grammar_id TEXT,language TEXT,text TEXT,sort_order INTEGER);
    CREATE TABLE v2_grammar_relations(source_id TEXT,target_id TEXT,type TEXT);
    CREATE TABLE v2_sentence_expressions(id TEXT PRIMARY KEY,language TEXT,text TEXT,publication_state TEXT);
    CREATE TABLE v2_sentence_grammar_links(id TEXT PRIMARY KEY,expression_id TEXT,grammar_id TEXT,language TEXT,displayed_form TEXT,sort_order INTEGER);
    CREATE TABLE v2_grammar_example_completion_reviews(example_id TEXT PRIMARY KEY,grammar_id TEXT,language TEXT,cc_safety TEXT);
    CREATE TABLE v2_grammar_example_completion_authority(example_id TEXT PRIMARY KEY,grammar_id TEXT,language TEXT,cc_safety TEXT,answer TEXT,answer_start INTEGER);
    CREATE TABLE lesson_units(id TEXT PRIMARY KEY,title TEXT,language TEXT,stage INTEGER,status TEXT);
    CREATE TABLE lesson_bundles(id TEXT PRIMARY KEY,schema_version TEXT,payload_json TEXT,published_at TEXT);
  `);
  const c=enWouldLikeContentCorrection;
  sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(target,'en','would-like',c.title_zh,c.form_name,2,c.core_zh,c.purpose_zh,c.formula,c.when_zh,c.mistakes_zh,c.nuance_zh,c.usage_zh,'neutral','published',1);
  const distractors=[['g-can','can','能力'],['g-might','might','可能性'],['g-should','should','建议'],['g-will','will','将来'],['g-must','must','义务']];
  for(const [index,[id,form,title]] of distractors.entries())sqlite.prepare('INSERT INTO v2_grammar_points VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(id,'en',id,title,form,2,title,`说明${title}`,form,`使用${form}`,`不要误用${form}`,`语气${form}`,`练习${form}`,'neutral','published',index+2);
  const exampleTexts=['Would you like to have lunch together?','I would love to, but I have plans.','I would prefer to stay within my budget.','I would like a glass of water, please.','We would like to check in now.','Would you like some more rice?','I would not like to discuss that at work.','She would prefer a seat near the door.','Would they like us to call a taxi?'];
  for(const [index,text] of exampleTexts.entries())sqlite.prepare('INSERT INTO v2_grammar_examples VALUES(?,?,?,?,?)').run(`example-${index}`,target,'en',text,index);
  for(const [index,[id,text,displayed]] of legacyLinks.entries()){
    sqlite.prepare('INSERT INTO v2_sentence_expressions VALUES(?,?,?,?)').run(id,'en',text,'published');
    sqlite.prepare('INSERT INTO v2_sentence_grammar_links VALUES(?,?,?,?,?,?)').run(`link-${index}`,id,target,'en',displayed,index);
  }
  for(const [index,[id,form]] of distractors.entries()){
    sqlite.prepare('INSERT INTO v2_sentence_expressions VALUES(?,?,?,?)').run(`expression-${id}`,'en',`We ${form} continue.`,'published');
    sqlite.prepare('INSERT INTO v2_sentence_grammar_links VALUES(?,?,?,?,?,?)').run(`link-${id}`,`expression-${id}`,id,'en',form,index+20);
  }
  sqlite.prepare('INSERT INTO lesson_units VALUES(?,?,?,?,?)').run('en-s1-l2','道歉、感谢并自然回应','en',1,'published');
  const lessonBundle={v:'hotfix04-test',u:[['en-s1-l2','en',1,'social','道歉、感谢并自然回应','能在常见社交往来中道歉、致谢并作出自然回应。',2,'published',15]],p:[],i:[['en-s1-l2','grammar',target,'support',3,0]],e:[]};
  sqlite.prepare('INSERT INTO lesson_bundles VALUES(?,?,?,?)').run('phase-35d-v1','hotfix04-test',JSON.stringify(lessonBundle),'2026-09-17');
  sqlite.exec(schemaMigration('0003_phase4b_learner_progress.sql'));sqlite.exec(schemaMigration('0004_phase4c_srs.sql'));sqlite.exec(schemaMigration('0005_phase4e_practice_engine.sql'));sqlite.exec(schemaMigration('0006_phase4f_learner_experience.sql'));
  sqlite.prepare("INSERT INTO users VALUES(?,?,?,?,?,'active')").run('hotfix-user','hotfix@example.com','hotfix@example.com',1,1);
  const wrap=(sql,values=[])=>({bind:(...next)=>wrap(sql,next),async first(){return sqlite.prepare(sql).get(...values)||null;},async all(){return {results:sqlite.prepare(sql).all(...values)};},async run(){const result=sqlite.prepare(sql).run(...values);return {success:true,meta:{changes:Number(result.changes)}};}});
  return {sqlite,prepare:sql=>wrap(sql)};
}

const envFor=DB=>({DB,CONTENT_DB:DB,AUTH_SECRET:secret});
const session={user_id:'hotfix-user'};
const load=(DB,query)=>practiceSession(new URL(`https://test/api/practice/session?${query}`),envFor(DB),session);

async function legacyToken(spec){
  const encoder=new TextEncoder(),iv=crypto.getRandomValues(new Uint8Array(12));
  const material=await crypto.subtle.digest('SHA-256',encoder.encode(`ej-learning:practice:v1:${secret}`));
  const key=await crypto.subtle.importKey('raw',material,{name:'AES-GCM'},false,['encrypt']);
  const cipher=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode('practice-exercise-v1')},key,encoder.encode(JSON.stringify(spec))));
  const token=new Uint8Array(iv.length+cipher.length);token.set(iv);token.set(cipher,iv.length);return Buffer.from(token).toString('base64url');
}

function request(path,{method='GET',body}={}){
  const headers=new Headers({Origin:origin,'X-Test-User':'hotfix-user'});if(body!==undefined)headers.set('Content-Type','application/json');
  return new Request(origin+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});
}
async function api(DB,path,options={}){const response=await progress(request(path,options),envFor(DB),{now:()=>now,session:async()=>session});return {response,body:await response.json()};}

test('one-record authority is explicit and leaves all unrelated grammar modes unchanged',()=>{
  assert.deepEqual(grammarPracticeAuthorities[target],{allowed_exercise_types:['grammar_form_selection'],controlled_completion:'NOT FOR CC',legacy_cc_fallback:false,typed_recall:false,tokenless_grading:false});
  assert.equal(isPracticeEligibleGrammarId(target),true);assert.equal(isGrammarExerciseTypeAllowed(target,'grammar_form_selection'),true);assert.equal(isGrammarExerciseTypeAllowed(target,'grammar_form_recall'),false);assert.equal(isGrammarExerciseTypeAllowed(target,'grammar_controlled_completion'),false);assert.equal(isTokenlessGrammarGradingAllowed(target),false);
  assert.deepEqual(materializeGrammarExerciseTypes(target,['grammar_controlled_completion','grammar_form_selection']),['grammar_form_selection']);
  assert.deepEqual(materializeGrammarExerciseTypes(target,['grammar_form_recall'],{directExplicitRecall:true}),[]);
  for(const id of ['35e1c-ja-condition-contrast','ja-node','en-inversion']){assert.equal(grammarPracticeAuthority(id),null,id);assert.equal(isGrammarExerciseTypeAllowed(id,'grammar_form_recall'),true,id);assert.equal(isGrammarExerciseTypeAllowed(id,'grammar_controlled_completion'),true,id);assert.equal(isTokenlessGrammarGradingAllowed(id),true,id);}
});

test('standalone recognition and selection use only the visible bounded contrast label; direct recall returns no compatible exercise',async()=>{
  const DB=practiceDatabase();
  for(const mode of ['recognition','selection']){
    const result=await load(DB,`type=grammar&mode=${mode}&content_id=${target}&limit=1`);assert.equal(result.data.length,1,mode);const exercise=result.data[0];
    assert.equal(exercise.exercise_type,'grammar_form_selection',mode);assert.match(exercise.prompt,/would like \/ would love \/ would prefer：/u);assert(exercise.choices.includes(enWouldLikeContentCorrection.form_name));
    assert.doesNotMatch(JSON.stringify(exercise),/"answer"|allowed_exercise_types|tokenless_grading|legacy_cc_fallback/);
    const spec=await resolvePracticeExercise(exercise.exercise_id,envFor(DB),session);assert.equal(spec.answer,enWouldLikeContentCorrection.form_name);assert.equal(spec.policy,'choice_exact');
  }
  const recall=await load(DB,`type=grammar&mode=recall&content_id=${target}&limit=1`);assert.deepEqual(recall.data,[]);assert.equal(recall.meta.returned,0);
  DB.sqlite.close();
});

test('lesson, mixed, weakness, due-review, and recommendation routes preserve identity but materialize selection only',async()=>{
  const DB=practiceDatabase();
  DB.sqlite.prepare(`INSERT INTO grammar_progress(user_id,grammar_id,attempts,correct_count,wrong_count,correct_streak,last_result,first_seen_at,last_seen_at,last_correct_at,last_wrong_at,review_stage,review_count,lapse_count,last_reviewed_at,next_review_at,current_interval_seconds) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .run('hotfix-user',target,5,2,3,0,0,100,900,700,900,0,5,3,900,now-10,600);
  const lesson=await load(DB,'type=grammar&mode=recall&context=lesson&lesson_id=en-s1-l2&limit=10');assert.equal(lesson.data.length,1);assert.equal(lesson.data[0].exercise_type,'grammar_form_selection');assert.equal(lesson.meta.requirement.assessable_items,1);
  const mixed=await load(DB,'type=mixed&mode=mixed&limit=20');const mixedTarget=mixed.data.find(item=>item.prompt.includes(enWouldLikeContentCorrection.title_zh));assert(mixedTarget);assert.equal(mixedTarget.exercise_type,'grammar_form_selection');
  const weakness=await load(DB,'source=weakness&type=grammar&mode=recall&limit=5');assert.equal(weakness.data.length,1);assert.equal(weakness.data[0].exercise_type,'grammar_form_selection');
  const queue=await api(DB,'/api/review/queue?type=grammar&limit=5');assert.equal(queue.response.status,200);assert.deepEqual(queue.body.data.map(item=>item.id),[target]);
  const dueMaterialized=await load(DB,`type=grammar&mode=mixed&content_id=${target}&limit=1`);assert.equal(dueMaterialized.data[0].exercise_type,'grammar_form_selection');
  const recommendation=await recommendationData(new URL('https://test/api/recommendations?limit=5'),envFor(DB),'hotfix-user',now);assert.equal(recommendation.review.total_due,1);assert.equal(recommendation.weak_grammar[0].id,target);
  DB.sqlite.close();
});

test('all seven historical sentence links are NOT FOR CC and cannot generate or resolve controlled completion',async()=>{
  const DB=practiceDatabase(),selection=await load(DB,`type=grammar&mode=selection&content_id=${target}&limit=1`);assert.equal(selection.data[0].exercise_type,'grammar_form_selection');
  const rows=DB.sqlite.prepare('SELECT e.id,e.text,l.displayed_form FROM v2_sentence_grammar_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id WHERE l.grammar_id=? ORDER BY l.sort_order').all(target);assert.equal(rows.length,7);assert.equal(rows.filter(row=>row.displayed_form===row.text).length,3);assert.equal(rows.filter(row=>row.displayed_form==='I’d like').length,4);
  for(const row of rows){
    const token=await legacyToken({v:1,uid:session.user_id,content_type:'grammar',content_id:target,language:'en',exercise_type:'grammar_controlled_completion',context_type:'standalone',context_id:null,source:'standard',prompt:'legacy',choices:[row.displayed_form,'can','might','should'],answer:row.displayed_form,policy:'choice_exact'});
    await assert.rejects(resolvePracticeExercise(token,envFor(DB),session),/STALE_EXERCISE/,row.id);
  }
  DB.sqlite.close();
});

test('pre-hotfix recall, whole-sentence CC, short CC, and old selection tokens return 409 with zero learner writes',async()=>{
  const DB=practiceDatabase(),base={v:1,uid:session.user_id,content_type:'grammar',content_id:target,language:'en',context_type:'standalone',context_id:null,source:'standard'},fixtures=[
    ['recall',{...base,exercise_type:'grammar_form_recall',prompt:'根据“礼貌愿望与邀请”，写出目标语法形式。',choices:null,answer:oldModel.form_name,policy:'english_typed_v1'}],
    ['whole',{...base,exercise_type:'grammar_controlled_completion',prompt:'___',choices:[legacyLinks[0][2],'can','might','should'],answer:legacyLinks[0][2],policy:'choice_exact'}],
    ['short',{...base,exercise_type:'grammar_controlled_completion',prompt:'___ to exchange this for a different size.',choices:['I’d like','can','might','should'],answer:'I’d like',policy:'choice_exact'}],
    ['selection',{...base,exercise_type:'grammar_form_selection',prompt:'选择与“礼貌愿望与邀请”匹配的语法形式。',choices:[oldModel.form_name,'can','might','should'],answer:oldModel.form_name,policy:'choice_exact'}]
  ];
  const before=DB.sqlite.prepare('SELECT total_changes() n').get().n;
  for(const [name,spec] of fixtures){
    const token=await legacyToken(spec),result=await api(DB,'/api/learning/attempt',{method:'POST',body:{attempt_id:`stale_${name}_attempt`,exercise_token:token,answer:spec.answer}});
    assert.equal(result.response.status,409,name);assert.equal(result.body.error.code,'STALE_EXERCISE',name);assert.equal(DB.sqlite.prepare('SELECT total_changes() n').get().n,before,name);
  }
  assert.equal(DB.sqlite.prepare('SELECT COUNT(*) n FROM learning_attempts').get().n,0);assert.equal(DB.sqlite.prepare('SELECT COUNT(*) n FROM grammar_progress').get().n,0);assert.equal(DB.sqlite.prepare('SELECT COUNT(*) n FROM lesson_progress').get().n,0);
  DB.sqlite.close();
});

test('tokenless grading is rejected without writes while post-hotfix selection continues normal SRS scheduling',async()=>{
  const DB=practiceDatabase(),before=DB.sqlite.prepare('SELECT total_changes() n').get().n;
  const blocked=await api(DB,'/api/learning/attempt',{method:'POST',body:{attempt_id:'tokenless_blocked_01',content_type:'grammar',content_id:target,answer:enWouldLikeContentCorrection.form_name}});
  assert.equal(blocked.response.status,404);assert.equal(blocked.body.error.code,'CONTENT_NOT_FOUND');assert.equal(DB.sqlite.prepare('SELECT total_changes() n').get().n,before);
  const exercise=(await load(DB,`type=grammar&mode=recognition&content_id=${target}&limit=1`)).data[0],graded=await api(DB,'/api/learning/attempt',{method:'POST',body:{attempt_id:'safe_selection_0001',exercise_token:exercise.exercise_id,answer:enWouldLikeContentCorrection.form_name}});
  assert.equal(graded.response.status,200);assert.equal(graded.body.data.correct,true);
  const row=DB.sqlite.prepare('SELECT attempts,review_count,review_stage,next_review_at,current_interval_seconds FROM grammar_progress WHERE user_id=? AND grammar_id=?').get('hotfix-user',target);assert.deepEqual({...row},{attempts:1,review_count:1,review_stage:1,next_review_at:now+86400,current_interval_seconds:86400});
  assert.equal(DB.sqlite.prepare('SELECT exercise_type FROM learning_attempts WHERE attempt_id=?').get('safe_selection_0001').exercise_type,'grammar_form_selection');DB.sqlite.close();
});
