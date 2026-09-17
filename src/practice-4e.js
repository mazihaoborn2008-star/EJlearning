import {lessonPracticeCurriculum} from './lessons-35d.js';
import {weakItems} from './recommendations-4d.js';
import {
 controlledCompletionAnswer,
 controlledCompletionForms,
 isGrammarExerciseTypeAllowed,
 isPracticeEligibleGrammarId,
 materializeGrammarExerciseTypes
} from './content-quality-04.js';

const encoder=new TextEncoder(),decoder=new TextDecoder();
const ID=/^[a-z0-9][a-z0-9-]{0,95}$/,TOKEN=/^[A-Za-z0-9_-]{40,4096}$/;
const TYPES=new Set(['vocabulary','grammar','mixed']),MODES=new Set(['mixed','recognition','selection','recall']);
const b64=bytes=>btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
const unb64=value=>{const raw=atob(value.replaceAll('-','+').replaceAll('_','/')+'='.repeat((4-value.length%4)%4));return Uint8Array.from(raw,c=>c.charCodeAt(0));};
const hash=value=>{let h=2166136261;for(const c of String(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const marks=n=>Array(n).fill('?').join(',');
const results=async statement=>(await statement.all()).results||[];

async function key(secret){
 if(typeof secret!=='string'||secret.length<32)throw new Error('PRACTICE_SECRET_UNAVAILABLE');
 const material=await crypto.subtle.digest('SHA-256',encoder.encode(`ej-learning:practice:v1:${secret}`));
 return crypto.subtle.importKey('raw',material,{name:'AES-GCM'},false,['encrypt','decrypt']);
}
async function seal(value,secret){
 const iv=crypto.getRandomValues(new Uint8Array(12)),plain=encoder.encode(JSON.stringify(value));
 const cipher=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode('practice-exercise-v1')},await key(secret),plain));
 const token=new Uint8Array(iv.length+cipher.length);token.set(iv);token.set(cipher,iv.length);return b64(token);
}
async function open(token,secret){
 if(!TOKEN.test(token||''))throw new Error('INVALID_EXERCISE');
 try{const bytes=unb64(token);if(b64(bytes)!==token)throw new Error('INVALID_EXERCISE');const iv=bytes.slice(0,12),cipher=bytes.slice(12),plain=await crypto.subtle.decrypt({name:'AES-GCM',iv,additionalData:encoder.encode('practice-exercise-v1')},await key(secret),cipher);return JSON.parse(decoder.decode(plain));}
 catch(error){if(error?.message==='PRACTICE_SECRET_UNAVAILABLE')throw error;throw new Error('INVALID_EXERCISE');}
}

export function normalizePracticeAnswer(value,language){
 const normalized=String(value).normalize('NFC').trim().replace(/\s+/gu,' ');
 return language==='en'?normalized.toLocaleLowerCase('en'):normalized;
}
const meaningKey=(value,language)=>normalizePracticeAnswer(value,language).split(/[；;，,、（(]/u)[0].trim();
const uniqueText=(items,semantic=false)=>{const seen=new Set(),meanings=new Set();return items.filter(x=>{const key=normalizePracticeAnswer(x.text,x.language),meaning=meaningKey(x.text,x.language);if(!key||seen.has(key)||semantic&&meanings.has(meaning)){return false;}seen.add(key);if(semantic)meanings.add(meaning);return true;});};
const ordered=(items,seed)=>[...items].sort((a,b)=>hash(`${seed}:${a.id}`)-hash(`${seed}:${b.id}`)||a.id.localeCompare(b.id));

async function vocabularyPool(db,ids=null,language=null){
 if(Array.isArray(ids)&&!ids.length)return [];
 const conditions=[ids?.length?`v.id IN (${marks(ids.length)})`:`v.publication_state='published'`],args=[...(ids||[])];if(language){conditions.push('v.language=?');args.push(language);}
 return results(db.prepare(`SELECT v.id,v.language,v.lemma,v.stage,v.part_of_speech,
   (SELECT s.meaning_zh FROM v2_vocabulary_senses s WHERE s.item_id=v.id ORDER BY s.sort_order,s.id LIMIT 1) meaning
   FROM v2_vocabulary_items v WHERE ${conditions.join(' AND ')} AND v.publication_state='published' ORDER BY v.stage,v.sort_order,v.id LIMIT 240`).bind(...args));
}
async function grammarPool(db,ids=null,language=null){
 if(Array.isArray(ids)&&!ids.length)return [];
 const conditions=[ids?.length?`g.id IN (${marks(ids.length)})`:`g.publication_state='published'`],args=[...(ids||[])];if(language){conditions.push('g.language=?');args.push(language);}
 const items=await results(db.prepare(`SELECT g.id,g.language,g.form_name,g.title_zh,g.purpose_zh,g.level
   FROM v2_grammar_points g WHERE ${conditions.join(' AND ')} AND g.publication_state='published' ORDER BY g.level,g.sort_order,g.id LIMIT 160`).bind(...args));
 return items.filter(item=>isPracticeEligibleGrammarId(item.id));
}
async function excludedRelations(db,type,id){
 try{
  const table=type==='vocabulary'?'v2_vocabulary_relations':'v2_grammar_relations';
  const rows=await results(db.prepare(`SELECT source_id,target_id,type FROM ${table} WHERE source_id=? OR target_id=?`).bind(id,id));
  return new Set(rows.filter(x=>!['antonym','contrast'].includes(x.type)).flatMap(x=>[x.source_id,x.target_id]));
 }catch{return new Set([id]);}
}
async function choices(db,type,item,pool,field,seed){
 const blocked=await excludedRelations(db,type,item.id),answer=String(item[field]||'').trim();
 const ranked=pool.filter(x=>x.id!==item.id&&x.language===item.language&&!blocked.has(x.id)&&String(x[field]||'').trim()).map(x=>({...x,text:String(x[field]).trim()})).sort((a,b)=>{
  const taxonomy=type==='vocabulary'?Number(a.part_of_speech!==item.part_of_speech)-Number(b.part_of_speech!==item.part_of_speech):0;
  const distance=Math.abs(Number(a.stage??a.level)-Number(item.stage??item.level))-Math.abs(Number(b.stage??b.level)-Number(item.stage??item.level));
  return taxonomy||distance||hash(`${seed}:${a.id}`)-hash(`${seed}:${b.id}`)||a.id.localeCompare(b.id);
 });
 const candidates=uniqueText([{id:item.id,text:answer,language:item.language},...ranked.map(x=>({id:x.id,text:x.text,language:x.language}))],field==='meaning');
 if(candidates.length<4)return null;
 return ordered(candidates.slice(0,4),`${seed}:order`).map(x=>x.text);
}
async function controlledCompletion(db,item,pool,seed){
 if(!isGrammarExerciseTypeAllowed(item.id,'grammar_controlled_completion'))return null;
 try{
  let approved=[];try{approved=await results(db.prepare(`SELECT a.example_id id,a.answer,a.answer_start,e.text
    FROM v2_grammar_example_completion_authority a JOIN v2_grammar_examples e ON e.id=a.example_id
    WHERE a.grammar_id=? AND a.language=? AND a.cc_safety='CC SAFE' ORDER BY e.sort_order,e.id`).bind(item.id,item.language));}catch{}
  for(const example of ordered(approved,seed)){
   const text=String(example.text||''),displayed=String(example.answer||''),at=Number(example.answer_start);
   if(!displayed||!Number.isInteger(at)||at<0||text.slice(at,at+displayed.length)!==displayed)continue;
   let authorityOptions=[];try{authorityOptions=await results(db.prepare(`SELECT a.example_id id,a.answer text,a.language FROM v2_grammar_example_completion_authority a WHERE a.grammar_id<>? AND a.language=? AND a.cc_safety='CC SAFE' LIMIT 120`).bind(item.id,item.language));}catch{}
   let linkedOptions=[];try{linkedOptions=await results(db.prepare(`SELECT DISTINCT l.id,l.displayed_form AS text,l.language FROM v2_sentence_grammar_links l JOIN v2_grammar_points g ON g.id=l.grammar_id WHERE l.grammar_id<>? AND l.language=? AND g.publication_state='published' LIMIT 80`).bind(item.id,item.language));}catch{}
   const optionRows=uniqueText([{id:example.id,text:displayed,language:item.language},...ordered([...authorityOptions,...linkedOptions],seed)]);
   if(optionRows.length<4)continue;
   return {prompt:`选择最适合填入空格的形式：${text.slice(0,at)}___${text.slice(at+displayed.length)}`,choices:ordered(optionRows.slice(0,4),`${seed}:order`).map(x=>x.text),answer:displayed,policy:'choice_exact',authority_example_id:example.id};
  }
  let reviewedPolicy=false;
  try{reviewedPolicy=Boolean(await db.prepare(`SELECT 1 found FROM v2_grammar_example_completion_reviews WHERE grammar_id=? AND language=? LIMIT 1`).bind(item.id,item.language).first());}catch{}
  if(!reviewedPolicy)try{reviewedPolicy=Boolean(await db.prepare(`SELECT 1 found FROM v2_grammar_example_completion_authority WHERE grammar_id=? AND language=? LIMIT 1`).bind(item.id,item.language).first());}catch{}
  if(reviewedPolicy)return null;
  const links=await results(db.prepare(`SELECT l.expression_id,l.displayed_form,e.text
    FROM v2_sentence_grammar_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id
    WHERE l.grammar_id=? AND l.language=? AND e.publication_state='published' ORDER BY l.sort_order,l.id LIMIT 12`).bind(item.id,item.language));
  for(const link of ordered(links.map(x=>({...x,id:x.expression_id})),seed)){
   const text=String(link.text||''),localForms=controlledCompletionForms[item.id];
   const displayed=localForms?controlledCompletionAnswer(item.id,text):String(link.displayed_form||'').trim(),at=text.indexOf(displayed||'');
   if(!displayed||at<0||text.indexOf(displayed,at+displayed.length)>=0)continue;
   let other=[];try{other=await results(db.prepare(`SELECT DISTINCT l.id,l.displayed_form AS text,l.language FROM v2_sentence_grammar_links l JOIN v2_grammar_points g ON g.id=l.grammar_id WHERE l.grammar_id<>? AND l.language=? AND g.publication_state='published' LIMIT 80`).bind(item.id,item.language));}catch{}
   const optionRows=uniqueText([{id:item.id,text:displayed,language:item.language},...ordered(other,seed)]);
   if(optionRows.length<4)continue;
   return {prompt:`选择最适合填入空格的形式：${text.slice(0,at)}___${text.slice(at+displayed.length)}`,choices:ordered(optionRows.slice(0,4),`${seed}:order`).map(x=>x.text),answer:displayed,policy:'choice_exact'};
  }
 }catch{}
 return null;
}

function requestedExerciseTypes(type,mode,index){
 if(type==='vocabulary'){
  if(mode==='recognition')return ['vocabulary_recognition'];
  if(mode==='selection')return ['vocabulary_meaning_to_word'];
  if(mode==='recall')return ['vocabulary_typed_recall'];
  return [['vocabulary_recognition'],['vocabulary_meaning_to_word'],['vocabulary_typed_recall']][index%3];
 }
 if(mode==='recall')return ['grammar_form_recall'];
 if(mode==='recognition')return ['grammar_form_selection'];
 if(mode==='selection')return ['grammar_controlled_completion','grammar_form_selection'];
 return [['grammar_form_selection'],['grammar_controlled_completion','grammar_form_selection'],['grammar_form_recall']][index%3];
}

const grammarFormSelectionPrompt=item=>`选择与“${item.title_zh}”匹配的语法形式。`;

async function build(db,type,item,pool,requested,seed){
 for(const exerciseType of requested.filter(exerciseType=>type!=='grammar'||isGrammarExerciseTypeAllowed(item.id,exerciseType))){
  if(exerciseType==='vocabulary_recognition'){
   const optionList=await choices(db,type,item,pool,'meaning',seed);if(optionList)return {exercise_type:exerciseType,prompt:`选择“${item.lemma}”的意思。`,choices:optionList,answer:item.meaning,policy:'choice_exact'};
  }else if(exerciseType==='vocabulary_meaning_to_word'){
   const optionList=await choices(db,type,item,pool,'lemma',seed);if(optionList)return {exercise_type:exerciseType,prompt:`选择最符合“${item.meaning}”的${item.language==='ja'?'日语':'英语'}词汇。`,choices:optionList,answer:item.lemma,policy:'choice_exact'};
  }else if(exerciseType==='vocabulary_typed_recall')return {exercise_type:exerciseType,prompt:`根据中文“${item.meaning}”，写出${item.language==='ja'?'日语':'英语'}词汇。`,choices:null,answer:item.lemma,policy:item.language==='en'?'english_typed_v1':'japanese_typed_v1'};
  else if(exerciseType==='grammar_form_selection'){
   const optionList=await choices(db,type,item,pool,'form_name',seed);if(optionList)return {exercise_type:exerciseType,prompt:grammarFormSelectionPrompt(item),detail:item.purpose_zh||null,choices:optionList,answer:item.form_name,policy:'choice_exact'};
  }else if(exerciseType==='grammar_controlled_completion'){
   const result=await controlledCompletion(db,item,pool,seed);if(result)return {exercise_type:exerciseType,...result};
  }else if(exerciseType==='grammar_form_recall')return {exercise_type:exerciseType,prompt:`根据“${item.title_zh}”，写出目标语法形式。`,detail:item.purpose_zh||null,choices:null,answer:item.form_name,policy:item.language==='en'?'english_typed_v1':'japanese_typed_v1'};
 }
 return null;
}

function sessionQuery(url){
 const allowed=new Set(['type','mode','limit','context','lesson_id','content_id','language','source']);
 for(const [key,value] of url.searchParams)if(!allowed.has(key)||url.searchParams.getAll(key).length!==1||!value)throw new Error('INVALID_QUERY');
 const source=url.searchParams.get('source')||'standard',type=url.searchParams.get('type')||'mixed',mode=url.searchParams.get('mode')||'mixed',limit=Number(url.searchParams.get('limit')||(source==='weakness'?5:10)),context=url.searchParams.get('context')||'standalone',lessonId=url.searchParams.get('lesson_id'),contentId=url.searchParams.get('content_id'),language=url.searchParams.get('language');
 if(!TYPES.has(type)||!MODES.has(mode)||!Number.isInteger(limit)||limit<1||limit>20||!['standalone','lesson'].includes(context))throw new Error('INVALID_QUERY');
 if((context==='lesson')!==Boolean(lessonId)||lessonId&&!ID.test(lessonId)||!['standard','weakness'].includes(source))throw new Error('INVALID_QUERY');
 if(contentId&&(!ID.test(contentId)||context!=='standalone'||type==='mixed')||language&&!['en','ja'].includes(language)||contentId&&limit!==1)throw new Error('INVALID_QUERY');
 if(source==='weakness'&&(context!=='standalone'||contentId||!['vocabulary','grammar'].includes(type)||limit>10))throw new Error('INVALID_QUERY');
 return {source,type,mode,limit,context,lessonId,contentId,language};
}

export async function practiceSession(url,env,session){
 const query=sessionQuery(url),contentDb=env.CONTENT_DB||env.DB;let lessonData=null,allowed={vocabulary:query.type==='vocabulary'&&query.contentId?[query.contentId]:null,grammar:query.type==='grammar'&&query.contentId?[query.contentId]:null};
 let weakness=[];
 if(query.source==='weakness'){
  weakness=await weakItems(env.DB,contentDb,session.user_id,query.type,query.limit);
  if(query.language)weakness=weakness.filter(x=>x.language===query.language);
  allowed[query.type]=weakness.map(x=>x.id);
 }
 if(query.context==='lesson'){
  lessonData=await lessonPracticeCurriculum(env.DB,query.lessonId);if(!lessonData)throw new Error('LESSON_NOT_FOUND');
  allowed={vocabulary:lessonData.items.filter(x=>x.content_type==='vocabulary').map(x=>x.content_id),grammar:lessonData.items.filter(x=>x.content_type==='grammar').map(x=>x.content_id)};
 }
 const [vocabulary,grammar,vocabularyFull,grammarFull]=await Promise.all([
  query.type==='grammar'?[]:vocabularyPool(contentDb,allowed.vocabulary,query.language),query.type==='vocabulary'?[]:grammarPool(contentDb,allowed.grammar,query.language),
  query.type==='grammar'?[]:vocabularyPool(contentDb,null,query.language),query.type==='vocabulary'?[]:grammarPool(contentDb,null,query.language)
 ]);
 const visibleVocabulary=query.language?vocabulary.filter(x=>x.language===query.language):vocabulary,visibleGrammar=query.language?grammar.filter(x=>x.language===query.language):grammar;
 let candidates=[];if(query.source==='weakness'){const pool=query.type==='vocabulary'?visibleVocabulary:visibleGrammar,byId=new Map(pool.map(x=>[x.id,x]));candidates=weakness.map(x=>({type:query.type,item:byId.get(x.id)})).filter(x=>x.item);}else if(query.type==='vocabulary')candidates=visibleVocabulary.map(x=>({type:'vocabulary',item:x}));else if(query.type==='grammar')candidates=visibleGrammar.map(x=>({type:'grammar',item:x}));else{const size=Math.max(visibleVocabulary.length,visibleGrammar.length);for(let i=0;i<size;i++){if(visibleVocabulary[i])candidates.push({type:'vocabulary',item:visibleVocabulary[i]});if(visibleGrammar[i])candidates.push({type:'grammar',item:visibleGrammar[i]});}}
 const day=Math.floor(Date.now()/86400000),seed=`${session.user_id}:${query.type}:${query.mode}:${query.context}:${query.lessonId||''}:${day}`;
 candidates=candidates.map(x=>({...x,id:`${x.type}:${x.item.id}`}));if(query.source!=='weakness')candidates=ordered(candidates,seed);
 const exercises=[];
 for(let i=0;i<candidates.length&&exercises.length<query.limit;i++){
  const candidate=candidates[i],pool=candidate.type==='vocabulary'?vocabularyFull:grammarFull,genericTypes=requestedExerciseTypes(candidate.type,query.mode,exercises.length),requested=candidate.type==='grammar'?materializeGrammarExerciseTypes(candidate.item.id,genericTypes,{directExplicitRecall:query.mode==='recall'&&query.contentId===candidate.item.id}):genericTypes,exercise=await build(contentDb,candidate.type,candidate.item,pool,requested,`${seed}:${candidate.item.id}`);
  if(!exercise)continue;
  const privateSpec={v:1,uid:session.user_id,content_type:candidate.type,content_id:candidate.item.id,language:candidate.item.language,exercise_type:exercise.exercise_type,context_type:query.context,context_id:query.lessonId||null,source:query.source,prompt:exercise.prompt,choices:exercise.choices,answer:exercise.answer,policy:exercise.policy,...(exercise.authority_example_id?{authority_example_id:exercise.authority_example_id}:{})};
  exercises.push({exercise_id:await seal(privateSpec,env.PRACTICE_SECRET||env.AUTH_SECRET),content_type:candidate.type,exercise_type:exercise.exercise_type,prompt:exercise.prompt,...(exercise.detail?{detail:exercise.detail}:{}),...(exercise.choices?{choices:exercise.choices}:{}),context:{type:query.context,...(query.lessonId?{id:query.lessonId}:{})}});
 }
  return {data:exercises,meta:{source:query.source,type:query.type,mode:query.mode,language:query.language||null,context:query.context,context_id:query.lessonId||null,limit:query.limit,returned:exercises.length,maximum:query.source==='weakness'?10:20,...(lessonData?{lesson:{id:lessonData.lesson.id,title:lessonData.lesson.title},requirement:await lessonEvidence(env.DB,session.user_id,lessonData)}:{})}};
}

export async function resolvePracticeExercise(token,env,session){
 const spec=await open(token,env.PRACTICE_SECRET||env.AUTH_SECRET);
 if(!spec||spec.v!==1||spec.uid!==session.user_id||!['vocabulary','grammar'].includes(spec.content_type)||!ID.test(spec.content_id)||!['standalone','lesson'].includes(spec.context_type))throw new Error('INVALID_EXERCISE');
 const item=spec.content_type==='vocabulary'?(await vocabularyPool(env.CONTENT_DB||env.DB,[spec.content_id],spec.language))[0]:(await grammarPool(env.CONTENT_DB||env.DB,[spec.content_id],spec.language))[0];
 if(!item||item.language!==spec.language)throw new Error('INVALID_EXERCISE');
 if(spec.content_type==='grammar'&&!isGrammarExerciseTypeAllowed(spec.content_id,spec.exercise_type))throw new Error('STALE_EXERCISE');
 if(spec.context_type==='lesson'){
  if(!ID.test(spec.context_id||''))throw new Error('INVALID_EXERCISE');const curriculum=await lessonPracticeCurriculum(env.DB,spec.context_id);
  if(!curriculum?.items.some(x=>x.content_type===spec.content_type&&x.content_id===spec.content_id))throw new Error('INVALID_EXERCISE');
 }
 let canonical=spec.exercise_type==='vocabulary_recognition'?item.meaning:spec.exercise_type.startsWith('vocabulary_')?item.lemma:item.form_name;
 if(spec.exercise_type==='grammar_form_selection'&&(spec.prompt!==grammarFormSelectionPrompt(item)||spec.policy!=='choice_exact'))throw new Error('STALE_EXERCISE');
 if(spec.exercise_type==='grammar_controlled_completion'){
  let authored=null;
  if(spec.authority_example_id){
   try{authored=await (env.CONTENT_DB||env.DB).prepare(`SELECT a.answer FROM v2_grammar_example_completion_authority a JOIN v2_grammar_examples e ON e.id=a.example_id WHERE a.example_id=? AND a.grammar_id=? AND a.language=? AND a.cc_safety='CC SAFE' AND a.answer=? AND substr(e.text,a.answer_start+1,length(a.answer))=a.answer LIMIT 1`).bind(spec.authority_example_id,spec.content_id,spec.language,spec.answer).first();}catch{}
   canonical=authored?.answer;
  }else if(controlledCompletionForms[spec.content_id]){
   let rows=[];try{rows=await results((env.CONTENT_DB||env.DB).prepare(`SELECT e.text FROM v2_sentence_grammar_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id WHERE l.grammar_id=? AND l.language=? AND e.publication_state='published' LIMIT 40`).bind(spec.content_id,spec.language));}catch{}
   authored=rows.find(row=>controlledCompletionAnswer(spec.content_id,row.text)===spec.answer);canonical=authored?spec.answer:null;
  }else{
   try{authored=await (env.CONTENT_DB||env.DB).prepare(`SELECT l.displayed_form FROM v2_sentence_grammar_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id WHERE l.grammar_id=? AND l.language=? AND l.displayed_form=? AND e.publication_state='published' LIMIT 1`).bind(spec.content_id,spec.language,spec.answer).first();}catch{}
   canonical=authored?.displayed_form;
  }
  if(!authored)throw new Error('STALE_EXERCISE');
 }
 if(normalizePracticeAnswer(canonical,spec.language)!==normalizePracticeAnswer(spec.answer,spec.language))throw new Error('STALE_EXERCISE');
 if(spec.choices&&(!Array.isArray(spec.choices)||spec.choices.length!==4||new Set(spec.choices.map(x=>normalizePracticeAnswer(x,spec.language))).size!==4||!spec.choices.some(x=>normalizePracticeAnswer(x,spec.language)===normalizePracticeAnswer(spec.answer,spec.language))))throw new Error('INVALID_EXERCISE');
 return spec;
}

export async function lessonEvidence(db,userId,curriculumOrId){
 const curriculum=typeof curriculumOrId==='string'?await lessonPracticeCurriculum(db,curriculumOrId):curriculumOrId;
 if(!curriculum)return null;const assessable=new Set(curriculum.items.map(x=>`${x.content_type}:${x.content_id}`)),requiredItems=Math.min(5,assessable.size);
 let attempts;try{attempts=await results(db.prepare(`SELECT content_type,content_id FROM learning_attempts WHERE user_id=? AND context_type='lesson' AND context_id=?`).bind(userId,curriculum.lesson.id));}
 catch{return {assessable_items:assessable.size,required_items:0,required_attempts:0,completed_items:0,completed_attempts:0,remaining_items:0,remaining_attempts:0,eligible:true,legacy_schema:true};}
 const valid=attempts.filter(x=>assessable.has(`${x.content_type}:${x.content_id}`)),unique=new Set(valid.map(x=>`${x.content_type}:${x.content_id}`)).size;
 return {assessable_items:assessable.size,required_items:requiredItems,required_attempts:requiredItems,completed_items:unique,completed_attempts:valid.length,remaining_items:Math.max(0,requiredItems-unique),remaining_attempts:Math.max(0,requiredItems-valid.length),eligible:unique>=requiredItems&&valid.length>=requiredItems};
}
