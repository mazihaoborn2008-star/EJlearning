import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {enVocabularyCandidates,jaVocabularyCandidates,grammarCandidates,lessonBlueprints,restructureItems,rejectedDrafts} from './content-35e1c.js';
import baselineLessonBundle from '../src/lesson-bundle-35d.js';

const root=process.cwd(),outDir=path.join(root,'docs','phase35e1c'),migrationDir=path.join(root,'migrations-35e1c');
fs.mkdirSync(outDir,{recursive:true});fs.mkdirSync(migrationDir,{recursive:true});
const sourceConfig='wrangler.35e1b.local.jsonc',sourcePersist='.wrangler/phase35e1b-release-final';
function query(sql){const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',sourceConfig,'--persist-to',sourcePersist,'--command',sql,'--json'];const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});if(r.status)throw Error(r.stderr||r.stdout);return JSON.parse(r.stdout.slice(r.stdout.indexOf('[')))[0].results;}
const q=v=>v==null?'NULL':`'${String(v).replaceAll("'","''")}'`;
const norm=v=>String(v??'').normalize('NFKC').toLocaleLowerCase().replace(/[\s。.!?？！,，、;；:'"“”「」『』（）()\-—・／/]/g,'');
const chunks=(table,columns,data,size=40)=>{const sql=[];for(let i=0;i<data.length;i+=size)sql.push(`INSERT INTO ${table}(${columns.join(',')}) VALUES\n${data.slice(i,i+size).map(r=>`(${columns.map(c=>q(r[c])).join(',')})`).join(',\n')};`);return sql;};
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function writeOnce(file,content){if(fs.existsSync(file)){if(fs.readFileSync(file,'utf8')!==content)throw Error(`Historical migration is immutable: ${path.relative(root,file)}`);return;}fs.writeFileSync(file,content);}

const existingVocab=query("SELECT id,language,lemma,part_of_speech FROM v2_vocabulary_items WHERE publication_state='published'");
const existingGrammar=query("SELECT id,language,slug,title_zh FROM v2_grammar_points WHERE publication_state='published'");
const existingLessonItems=query('SELECT lesson_id,content_type,content_id FROM lesson_items');
const topics=new Set(query('SELECT id FROM v2_topics').map(x=>x.id));
const expressions=new Set(query("SELECT id FROM v2_sentence_expressions WHERE publication_state='published'").map(x=>x.id));
const maxV=Number(query('SELECT coalesce(max(sort_order),0) n FROM v2_vocabulary_items')[0].n);
const maxG=Number(query('SELECT coalesce(max(sort_order),0) n FROM v2_grammar_points')[0].n);
const existingLemma=new Set(existingVocab.map(x=>`${x.language}:${norm(x.lemma)}`));
const existingGrammarScope=new Set(existingGrammar.flatMap(x=>[`${x.language}:${norm(x.slug)}`,`${x.language}:${norm(x.title_zh)}`]));
const errors=[],warnings=[],rejected=[];

function selectVocabulary(language,candidates,target){
 const seen=new Set(),selected=[];
 for(const candidate of candidates){
  const key=`${language}:${norm(candidate.lemma)}`;
  if(existingLemma.has(key)){rejected.push({kind:'duplicate',language,lemma:candidate.lemma,reason:'canonical lemma collision'});continue;}
  if(seen.has(key)){rejected.push({kind:'duplicate',language,lemma:candidate.lemma,reason:'normalized candidate duplicate'});continue;}
  if(!topics.has(candidate.topic)){errors.push({code:'invalid_topic',language,lemma:candidate.lemma,topic:candidate.topic});continue;}
  if(language==='ja'&&!candidate.reading?.trim()){errors.push({code:'missing_reading',lemma:candidate.lemma});continue;}
  if(!candidate.pos||!candidate.zh||!candidate.example||!candidate.translation){errors.push({code:'incomplete_vocabulary',language,lemma:candidate.lemma});continue;}
  seen.add(key);selected.push(candidate);if(selected.length===target)break;
 }
 if(selected.length!==target)errors.push({code:'vocabulary_target_shortfall',language,target,actual:selected.length});
 return selected;
}
const enSelected=selectVocabulary('en',enVocabularyCandidates,90),jaSelected=selectVocabulary('ja',jaVocabularyCandidates,100);
const vocabulary=[];const senses=[];const vocabExamples=[];const vocabTopics=[];const vocabByLemma=new Map(existingVocab.map(x=>[`${x.language}:${norm(x.lemma)}`,x.id]));
for(const [language,list] of [['en',enSelected],['ja',jaSelected]])list.forEach((v,index)=>{
 const id=`35e1c-${language}-v${String(index+1).padStart(3,'0')}`,senseId=`${id}-s1`;
 vocabulary.push({id,language,lemma:v.lemma,type:v.lemma.includes(' ')?'fixed_expression':'word',stage:v.stage,ipa:null,reading:v.reading,part_of_speech:v.pos,register:'neutral',publication_state:'published',sort_order:maxV+vocabulary.length+1});
 senses.push({id:senseId,item_id:id,meaning_zh:v.zh,usage_zh:`核心任务词；在${v.topic}交流中按自然搭配使用。`,semantic_label:'Phase 3.5E P0/P1 task gap',register_note:'日常中性；具体礼貌度由句型和场景决定。',stage_override:null,override_reason:null,sort_order:1});
 vocabExamples.push({id:`${id}-ex1`,item_id:id,sense_id:senseId,kind:'example',text:v.example,translation_zh:v.translation,note_zh:'经语义范围、搭配/助词与编辑复核。',readings_json:language==='ja'?JSON.stringify([{text:v.example}]):'[]',sort_order:1});
 vocabTopics.push({item_id:id,topic_id:v.topic});vocabByLemma.set(`${language}:${norm(v.lemma)}`,id);
});

const grammar=[];const grammarExamples=[];
for(const g of grammarCandidates){
 const slug=g.id.replace(/^35e1c-(en|ja)-/,'');
 if(existingGrammarScope.has(`${g.language}:${norm(slug)}`)||existingGrammarScope.has(`${g.language}:${norm(g.title)}`)){errors.push({code:'grammar_scope_collision',id:g.id});continue;}
 if(g.examples.length<4)errors.push({code:'grammar_example_shortfall',id:g.id});
 grammar.push({id:g.id,language:g.language,slug,title_zh:g.title,form_name:g.form,level:g.level,core_zh:g.core,purpose_zh:g.purpose,formula:g.formula,when_zh:g.when,mistakes_zh:g.mistakes,nuance_zh:g.nuance,register:'neutral',usage_zh:'系统/对比型 canonical grammar；保留 required/support/exposure 区分。',publication_state:'published',sort_order:maxG+grammar.length+1});
 g.examples.forEach(([text,translation],i)=>grammarExamples.push({id:`${g.id}-ex${i+1}`,grammar_id:g.id,language:g.language,text,translation_zh:translation,explanation_zh:'直接实例化本语法的核心形式或必要对比。',ipa:null,readings_json:g.language==='ja'?JSON.stringify([{text}]):'[]',source_expression_id:null,sort_order:i+1}));
}
const grammarIds=new Set([...existingGrammar.map(x=>x.id),...grammar.map(x=>x.id)]);

const lessons=[],prerequisites=[],lessonItems=[];
for(const [id,language,stage,topic,title,objective,expressionId,vocabLemmas,grammarTargets] of lessonBlueprints){
 const sequence=Number(id.match(/-l(\d+)$/)?.[1]);if(!sequence||sequence>9)errors.push({code:'lesson_sequence',id});
 if(!topics.has(topic)||!expressions.has(expressionId))errors.push({code:'lesson_reference',id,topic,expressionId});
 lessons.push({id,language,stage,topic_id:topic,title,objective,sequence,status:'published',estimated_minutes:18});
 prerequisites.push({lesson_id:id,prerequisite_lesson_id:`${language}-s${stage}-l${sequence-1}`});
 lessonItems.push({lesson_id:id,content_type:'expression',content_id:expressionId,role:'required',sequence:1,required:1});
 vocabLemmas.forEach((lemma,i)=>{const contentId=vocabByLemma.get(`${language}:${norm(lemma)}`);if(!contentId)errors.push({code:'lesson_vocab_missing',id,lemma});else lessonItems.push({lesson_id:id,content_type:'vocabulary',content_id:contentId,role:i<4?'required':'support',sequence:i+1,required:i<4?1:0});});
 grammarTargets.forEach((contentId,i)=>{if(!grammarIds.has(contentId))errors.push({code:'lesson_grammar_missing',id,contentId});else lessonItems.push({lesson_id:id,content_type:'grammar',content_id:contentId,role:i?'support':'required',sequence:i+1,required:i?0:1});});
}
const existingItemKey=new Set(existingLessonItems.map(x=>`${x.lesson_id}:${x.content_type}:${x.content_id}`));
for(const [lesson_id,content_id,role,type='expression'] of restructureItems){const key=`${lesson_id}:${type}:${content_id}`;if(existingItemKey.has(key))errors.push({code:'restructure_collision',key});else if(type==='expression'&&!expressions.has(content_id)||type==='grammar'&&!grammarIds.has(content_id))errors.push({code:'restructure_reference',key});else lessonItems.push({lesson_id,content_type:type,content_id,role,sequence:900+lessonItems.length,required:role==='required'?1:0});}

const duplicateExamples=[];const allExampleNorm=new Map();
for(const row of [...vocabExamples,...grammarExamples]){const key=`${row.language||vocabulary.find(v=>v.id===row.item_id)?.language}:${norm(row.text)}`;if(allExampleNorm.has(key))duplicateExamples.push([allExampleNorm.get(key),row.id]);else allExampleNorm.set(key,row.id);}
if(duplicateExamples.length)errors.push({code:'new_example_duplicates',duplicateExamples});
if(enSelected.length!==90||jaSelected.length!==100||grammar.filter(x=>x.language==='en').length!==10||grammar.filter(x=>x.language==='ja').length!==16)errors.push({code:'acceptance_counts'});

const sql=[
 '-- Phase 3.5E.1C: curriculum gap filling and lesson bundle version 35e1c.',
 '-- Additive canonical curriculum only. No learner, Dynamic AI, historical migration or production mutation.',
 'PRAGMA foreign_keys=ON;',
 ...chunks('v2_vocabulary_items',['id','language','lemma','type','stage','ipa','reading','part_of_speech','register','publication_state','sort_order'],vocabulary),
 ...chunks('v2_vocabulary_senses',['id','item_id','meaning_zh','usage_zh','semantic_label','register_note','stage_override','override_reason','sort_order'],senses),
 ...chunks('v2_vocabulary_examples',['id','item_id','sense_id','kind','text','translation_zh','note_zh','readings_json','sort_order'],vocabExamples),
 ...chunks('v2_vocabulary_topics',['item_id','topic_id'],vocabTopics),
 ...chunks('v2_grammar_points',['id','language','slug','title_zh','form_name','level','core_zh','purpose_zh','formula','when_zh','mistakes_zh','nuance_zh','register','usage_zh','publication_state','sort_order'],grammar),
 ...chunks('v2_grammar_examples',['id','grammar_id','language','text','translation_zh','explanation_zh','ipa','readings_json','source_expression_id','sort_order'],grammarExamples),
 ...chunks('lesson_units',['id','language','stage','topic_id','title','objective','sequence','status','estimated_minutes'],lessons),
 ...chunks('lesson_prerequisites',['lesson_id','prerequisite_lesson_id'],prerequisites),
 ...chunks('lesson_items',['lesson_id','content_type','content_id','role','sequence','required'],lessonItems)
].join('\n\n')+'\n';
if(!errors.length)writeOnce(path.join(migrationDir,'0001_curriculum_gap_filling_lesson_bundle.sql'),sql);
const lessonBundle={
 ...baselineLessonBundle,v:'3.5E.1C',
 u:[...baselineLessonBundle.u,...lessons.map(x=>[x.id,x.language,x.stage,x.topic_id,x.title,x.objective,x.sequence,x.status,x.estimated_minutes])],
 p:[...baselineLessonBundle.p,...prerequisites.map(x=>[x.lesson_id,x.prerequisite_lesson_id])],
 i:[...baselineLessonBundle.i,...lessonItems.map(x=>[x.lesson_id,x.content_type,x.content_id,x.role,x.sequence,x.required])]
};
const bundleJson=JSON.stringify(lessonBundle).replaceAll("'","''");
const bundleSql=`-- Phase 3.5E.1C additive lesson composition document.\nCREATE TABLE IF NOT EXISTS lesson_bundles (id TEXT PRIMARY KEY,schema_version TEXT NOT NULL,payload_json TEXT NOT NULL CHECK(json_valid(payload_json)),published_at TEXT NOT NULL);\nINSERT INTO lesson_bundles(id,schema_version,payload_json,published_at) VALUES('phase-35e1c-v1','3.5E.1C','${bundleJson}','2026-09-11T00:00:00Z');\n`;
if(!errors.length)writeOnce(path.join(migrationDir,'0002_lesson_bundle_version.sql'),bundleSql);

const historical={
 phase35e1a:'migrations-35e1a/0001_core_grammar_curated_examples.sql',
 phase35e1a1:'migrations-35e1a1/0001_curated_grammar_example_target_roles.sql',
 phase35e1a2:'migrations-35e1a2/0001_core_vocabulary_curated_usages.sql',
 phase35e1b:'migrations-35e1b/0001_core_expressions_multi_turn_dialogues.sql'
};
const hashes=Object.fromEntries(Object.entries(historical).map(([k,v])=>[k,{file:v,sha256:sha(path.join(root,v))}]));
const samples=lessons.filter(x=>x.language==='en').slice(0,3).concat(lessons.filter(x=>x.language==='ja').slice(0,3)).map(l=>({id:l.id,language:l.language,title:l.title,objective:l.objective,items:lessonItems.filter(i=>i.lesson_id===l.id)}));
const report={generated_at:new Date().toISOString(),phase:'3.5E.1C',status:errors.length?'QA_FAILED':'GENERATED',curriculum:{en_vocab_added:enSelected.length,ja_vocab_added:jaSelected.length,en_grammar_added:grammar.filter(x=>x.language==='en').length,ja_grammar_added:grammar.filter(x=>x.language==='ja').length,en_lessons_added:lessons.filter(x=>x.language==='en').length,ja_lessons_added:lessons.filter(x=>x.language==='ja').length,existing_lessons_restructured:restructureItems.length,grammar_examples_added:grammarExamples.length,vocabulary_examples_added:vocabExamples.length},rejected:{duplicates:rejected.filter(x=>x.kind==='duplicate').length+rejectedDrafts.duplicate,semantic_invalid:rejectedDrafts.semantic_invalid},rejection_log:rejected,errors,warnings,historical_migration_hashes:hashes,samples,changes:{learner_engine:0,learner_progress:0,dynamic_ai_examples:0,production:0,phase4_started:false}};
fs.writeFileSync(path.join(outDir,'generation-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,curriculum:report.curriculum,rejected:report.rejected,errors,warnings,hashes},null,2));if(errors.length)process.exitCode=1;
