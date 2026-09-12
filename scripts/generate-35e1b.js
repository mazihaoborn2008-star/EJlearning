import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {enExpressions,jaExpressions,enDialogues,jaDialogues,rejectedDrafts} from './content-35e1b.js';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e1b');
const migrationDir=path.join(root,'migrations-35e1b');
const sourceConfig='wrangler.35e1a2.local.jsonc';
const sourcePersist='.wrangler/phase35e1a2-release';
fs.mkdirSync(outDir,{recursive:true});
fs.mkdirSync(migrationDir,{recursive:true});

function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',sourceConfig,'--persist-to',sourcePersist,'--command',sql,'--json'];
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(result.status)throw Error(result.stderr||result.stdout);
 return JSON.parse(result.stdout.slice(result.stdout.indexOf('[')))[0].results;
}
const q=value=>value==null?'NULL':`'${String(value).replaceAll("'","''")}'`;
const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！,，、;；:'\"“”「」『』（）()\-—・／/]/g,'');
const topics=new Set(query('SELECT id FROM v2_topics').map(row=>row.id));
const existingExpressions=query("SELECT id,language,text FROM v2_sentence_expressions WHERE publication_state='published'");
const existingTurns=query('SELECT id,text FROM v2_dialogue_turns');
const vocab=query("SELECT id,language,lemma,stage FROM v2_vocabulary_items WHERE publication_state='published' ORDER BY length(lemma) DESC,stage,id");
const grammar=query("SELECT id,language,level FROM v2_grammar_points WHERE publication_state='published'");
const grammarIds=new Set(grammar.map(row=>row.id));
const grammarLevel=new Map(grammar.map(row=>[row.id,row.level]));
const maxSort=query('SELECT COALESCE(MAX(sort_order),0) n FROM v2_sentence_units').at(0).n;
const errors=[];
const warnings=[];

const corpora={en:{standalone:enExpressions,dialogues:enDialogues},ja:{standalone:jaExpressions,dialogues:jaDialogues}};
if(enExpressions.length!==88||jaExpressions.length!==94||enDialogues.length!==32||jaDialogues.length!==36)errors.push({code:'source_count',observed:{enExpressions:enExpressions.length,jaExpressions:jaExpressions.length,enDialogues:enDialogues.length,jaDialogues:jaDialogues.length}});
const allNewTexts=[];
const allNewTurns=[];
for(const [language,corpus] of Object.entries(corpora)){
 const ids=new Set();
 for(const row of [...corpus.standalone,...corpus.dialogues]){
  if(ids.has(row.id))errors.push({code:'duplicate_source_id',language,id:row.id});
  ids.add(row.id);
  if(!topics.has(row.topic))errors.push({code:'invalid_topic',language,id:row.id,topic:row.topic});
  if(row.stage<1||row.stage>4)errors.push({code:'stage_out_of_scope',language,id:row.id,stage:row.stage});
  if(!['neutral','polite','casual','formal'].includes(row.register))errors.push({code:'invalid_register',language,id:row.id,register:row.register});
  if(!row.context?.trim())errors.push({code:'missing_context',language,id:row.id});
 }
 for(const row of corpus.standalone)allNewTexts.push({language,id:row.id,text:row.text,type:'scenario'});
 for(const row of corpus.dialogues){
  if(row.turns.length<4||row.turns.length>8)errors.push({code:'turn_count',language,id:row.id,count:row.turns.length});
  for(let index=0;index<row.turns.length;index++){
   const turn=row.turns[index];
   if(turn.speaker!==(index%2?'B':'A'))errors.push({code:'speaker_alternation',language,id:row.id,index,speaker:turn.speaker});
   if(!turn.text.trim()||!/[.!?。？！]$/.test(turn.text))errors.push({code:'turn_shape',language,id:row.id,index,text:turn.text});
   allNewTurns.push({language,id:`${row.id}-${index}`,text:turn.text,dialogue:row.id});
  }
  allNewTexts.push({language,id:row.id,text:row.turns.map(turn=>turn.text).join('\n'),type:'dialogue'});
 }
}
const existingExpressionNorm=new Map(existingExpressions.map(row=>[`${row.language}:${normalize(row.text)}`,row]));
const newExpressionNorm=new Map();
for(const row of allNewTexts){
 const key=`${row.language}:${normalize(row.text)}`;
 if(existingExpressionNorm.has(key))errors.push({code:'existing_expression_collision',row,existing:existingExpressionNorm.get(key)});
 if(newExpressionNorm.has(key))errors.push({code:'new_expression_duplicate',row,other:newExpressionNorm.get(key)});
 newExpressionNorm.set(key,row.id);
}
const existingTurnNorm=new Map(existingTurns.map(row=>[normalize(row.text),row]));
const newTurnNorm=new Map();
for(const row of allNewTurns){
 const key=`${row.language}:${normalize(row.text)}`;
 const old=existingTurnNorm.get(normalize(row.text));
 if(old)errors.push({code:'existing_turn_collision',row,existing:old});
 if(newTurnNorm.has(key))errors.push({code:'duplicate_turn',row,other:newTurnNorm.get(key)});
 newTurnNorm.set(key,row.id);
}
const rejectedCounts={duplicate:rejectedDrafts.filter(row=>row.type==='duplicate').length,semantic_communicative_invalid:rejectedDrafts.filter(row=>row.type==='semantic_invalid').length};
if(rejectedCounts.duplicate!==7||rejectedCounts.semantic_communicative_invalid!==11)errors.push({code:'rejection_log_count',rejectedCounts});

function visibleVocab(language,text,stage){
 const candidates=vocab.filter(row=>row.language===language&&row.stage<=stage).map(row=>{
  if(language==='en'){
   const escaped=row.lemma.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
   const match=text.toLowerCase().match(new RegExp(`\\b${escaped}\\b`,'i'));
   return match?{...row,displayed:match[0],index:match.index}:null;
  }
  const forms=row.lemma.length>=2?[row.lemma]:[];
  if(row.lemma.endsWith('する')&&row.lemma.length>2)forms.push(row.lemma.slice(0,-2));
  const form=forms.sort((a,b)=>b.length-a.length).find(value=>value&&text.includes(value));
  return form?{...row,displayed:form,index:text.indexOf(form)}:null;
 }).filter(Boolean).sort((a,b)=>a.index-b.index||b.displayed.length-a.displayed.length||a.stage-b.stage);
 const chosen=[];
 for(const row of candidates)if(!chosen.some(item=>item.id===row.id)&&!chosen.some(item=>item.displayed.includes(row.displayed)||row.displayed.includes(item.displayed))){chosen.push(row);if(chosen.length===3)break;}
 return chosen;
}

const enGrammarRules=[
 ['en-since-for',/(?:\bhave\b|\bhas\b|'ve|'s)\s+[^.!?]*(?:\bsince\b|\bfor\b)/i],
 ['en-could-request',/\bCould you\b/i],['en-can-request',/\bCan you\b/i],['en-do-question',/^(?:Do|Does)\s+\w+/i],
 ['en-would-like',/\b(?:I['’]d|I would)\s+(?:like|love|prefer)\b/i],['en-let-us',/\bLet['’]s\b/i],['en-will',/\bwill\b/i],
 ['en-be-adjective',/\b(?:am|is|are|['’]m|['’]re)\s+(?:not\s+)?(?:fine|free|ready|right|wrong|available|allergic|comfortable|quiet|sorry|sure|far|safe|light|small|blue|black|included)\b/i],
 ['en-can-ability',/\b(?:I|we|you|they|he|she|it)\s+can(?!['’])(?:not|'t)?\b/i],['en-mind-ing',/\bWould you mind\s+\w+ing\b/i],
 ['en-present-perfect',/\b(?:have|has|'ve|'s)\s+(?:had|been|done|seen|heard|made|left|lost|written|taken|worked|stopped|missed|ordered|booked|finished)\b/i],
 ['en-wh-question',/\b(?:What|When|Where|Which|Who|How|Why)\b[^.!?]*\?/i],
 ['en-simple-past',/\b(?:was|were|did|had|thought|meant|missed|ordered|stopped|received|forgot|found|moved|sounded|came|wrote)\b/i],
 ['en-noun-please',/\bplease\b/i],['en-simple-present',/\b(?:need|needs|mean|means|take|takes|work|works|agree|think|prefer|contain|contains|start|starts|leave|leaves|stop|stops|include|includes|sound|sounds|get|gets|have|has|know|knows|want|wants)\b/i]
];
const jaGrammarRules=[
 ['ja-te-itadaku',/(?:て|で)いただけますか/],['ja-te-kudasai',/(?:て|で)ください/],['ja-masen-ka',/ませんか/],['ja-request-onegai',/(?:を|で)お願いします/],
 ['ja-tai',/(?:たい|たくて|たかった)/],['ja-polite-negative',/ません/],['ja-polite-past',/ました/],['ja-ka-question',/(?:です|ます|ません|でした)か/],
 ['ja-te-morau',/(?:て|で)もらえ/],['ja-n-desu-ga',/(?:んですが|のですが)/],['ja-tara',/(?:たら|かったら|だったら)/],['ja-nara',/なら/],
 ['ja-te-mo-ii',/(?:て|で)も(?:いい|大丈夫)/],['ja-kamoshirenai',/かもしれません/],['ja-mashou',/ましょう/],['ja-potential',/(?:られ|え|け|げ|せ|て)ますか/],
 ['ja-polite-present',/(?:ます|いたします|ございます)/],['ja-copula',/(?:です|ですね|でしょう)/],['ja-plain-nonpast',/(?:る|う|く|ぐ|す|つ|ぬ|ぶ|む)(?:よ|ね|の|？|。|、|$)/]
];
function grammarMatch(language,text){
 const rules=language==='en'?enGrammarRules:jaGrammarRules;
 for(const [id,pattern] of rules){const match=text.match(pattern);if(match&&grammarIds.has(id))return {id,displayed:match[0]};}
 return null;
}

const units=[];const expressions=[];const turns=[];const vocabLinks=[];const grammarLinks=[];
let serial=0;
for(const [language,corpus] of Object.entries(corpora)){
 for(const [kind,rows] of [['scenario',corpus.standalone],['dialogue',corpus.dialogues]])for(const row of rows){
  serial++;
  const prefix=`35e1b-${language}-${kind==='dialogue'?'d':'x'}-${row.id}`;
  const expressionId=`${prefix}-expr`;
  const dialogueTurns=kind==='dialogue'?row.turns:[];
  const text=kind==='dialogue'?dialogueTurns.map(turn=>turn.text).join('\n'):row.text;
  units.push({id:prefix,anchor_zh:kind==='dialogue'?row.goal:row.anchor,topic_id:row.topic,unit_type:kind,context_zh:row.context,comparison_zh:'本条按目标语言真实语用独立编辑；不假定跨语言逐词对应。',publication_state:'published',sort_order:maxSort+serial});
  expressions.push({id:expressionId,unit_id:prefix,language,text,is_primary:1,register:row.register,note_zh:kind==='dialogue'?`交际目标：${row.goal}`:'可复用核心表达块。',ipa:null,readings_json:language==='ja'?JSON.stringify([{text}]):'[]',overall_difficulty:row.stage,vocabulary_difficulty:row.stage,grammar_difficulty:row.stage,difficulty_note_zh:'按词汇熟悉度、语法负担、关系距离与多轮交际任务分别编辑评定。',publication_state:'published',sort_order:maxSort+serial});
  if(kind==='dialogue')dialogueTurns.forEach((turn,index)=>turns.push({id:`${prefix}-t${String(index+1).padStart(2,'0')}`,expression_id:expressionId,speaker:turn.speaker,text:turn.text,readings_json:language==='ja'?JSON.stringify([{text:turn.text}]):'[]',sort_order:index,role:turn.role}));
  const surfaces=kind==='dialogue'?dialogueTurns.map((turn,index)=>({text:turn.text,turn_id:`${prefix}-t${String(index+1).padStart(2,'0')}`})):[{text,turn_id:null}];
  const usedVocab=new Set();
  for(const surface of surfaces){
   for(const match of visibleVocab(language,surface.text,row.stage))if(!usedVocab.has(match.id)){
    usedVocab.add(match.id);vocabLinks.push({id:`${prefix}-vl${vocabLinks.length+1}`,expression_id:expressionId,language,item_id:match.id,turn_id:surface.turn_id,displayed_form:match.displayed,note_zh:'复用当前或更低 Stage 的现有 canonical vocabulary。',sort_order:usedVocab.size});
    if(usedVocab.size===3)break;
   }
   if(usedVocab.size===3)break;
  }
  const grammarSurface=surfaces.map(surface=>({...surface,match:grammarMatch(language,surface.text)})).find(surface=>surface.match);
  if(grammarSurface){
   grammarLinks.push({id:`${prefix}-gl1`,expression_id:expressionId,language,grammar_id:grammarSurface.match.id,turn_id:grammarSurface.turn_id,displayed_form:grammarSurface.match.displayed,note_zh:'复用现有 canonical grammar；仅作 support，不标为 Lesson required。',sort_order:1});
   expressions.at(-1).grammar_difficulty=Math.max(expressions.at(-1).grammar_difficulty,grammarLevel.get(grammarSurface.match.id)||row.stage);
  }
  // A link is emitted only when surface realization is high-confidence. Omitting a
  // support link is safer than inventing a required target or a false occurrence.
 }
}

function chunks(table,columns,rows,size=40){
 const result=[];
 for(let index=0;index<rows.length;index+=size)result.push(`INSERT INTO ${table}(${columns.join(',')}) VALUES\n${rows.slice(index,index+size).map(row=>`(${columns.map(column=>q(row[column])).join(',')})`).join(',\n')};`);
 return result;
}
const sql=[
 '-- Phase 3.5E.1B: core expressions and multi-turn dialogue expansion.',
 '-- Additive canonical content only. No lesson, vocabulary, grammar, learner, Dynamic AI, or production mutation.',
 'PRAGMA foreign_keys=ON;',
 ...chunks('v2_sentence_units',['id','anchor_zh','topic_id','unit_type','context_zh','comparison_zh','publication_state','sort_order'],units),
 ...chunks('v2_sentence_expressions',['id','unit_id','language','text','is_primary','register','note_zh','ipa','readings_json','overall_difficulty','vocabulary_difficulty','grammar_difficulty','difficulty_note_zh','publication_state','sort_order'],expressions),
 ...chunks('v2_dialogue_turns',['id','expression_id','speaker','text','readings_json','sort_order'],turns),
 ...chunks('v2_sentence_vocabulary_links',['id','expression_id','language','item_id','sense_id','turn_id','displayed_form','occurrence','importance','is_new_target','note_zh','sort_order'],vocabLinks.map(row=>({...row,sense_id:null,occurrence:1,importance:1,is_new_target:0}))),
 ...chunks('v2_sentence_grammar_links',['id','expression_id','language','grammar_id','turn_id','displayed_form','occurrence','note_zh','sort_order'],grammarLinks.map(row=>({...row,occurrence:1})))
].join('\n\n')+'\n';
if(!errors.length)fs.writeFileSync(path.join(migrationDir,'0001_core_expressions_multi_turn_dialogues.sql'),sql);

const dialogueStats=language=>{
 const rows=language==='en'?enDialogues:jaDialogues;const count=rows.length;const turnCount=rows.reduce((sum,row)=>sum+row.turns.length,0);
 return {count,turns:turnCount,average_turns:Number((turnCount/count).toFixed(2)),with_4_plus:rows.filter(row=>row.turns.length>=4).length,min_turns:Math.min(...rows.map(row=>row.turns.length)),max_turns:Math.max(...rows.map(row=>row.turns.length))};
};
const byLanguage=language=>({expressions:expressions.filter(row=>row.language===language).length,standalone_scenario_expressions:units.filter(row=>row.id.startsWith(`35e1b-${language}-x-`)).length,dialogues:dialogueStats(language),vocabulary_links:vocabLinks.filter(row=>row.language===language).length,grammar_links:grammarLinks.filter(row=>row.language===language).length});
const report={generated_at:new Date().toISOString(),phase:'3.5E.1B',status:errors.length?'QA_FAILED':'GENERATED',source:{baseline:'Phase 3.5E audit + completed 3.5E.1A/1A.1/1A.2',editorial_review:true},by_language:{en:byLanguage('en'),ja:byLanguage('ja')},totals:{units:units.length,expressions:expressions.length,dialogues:enDialogues.length+jaDialogues.length,turns:turns.length,vocabulary_links:vocabLinks.length,grammar_links:grammarLinks.length},rejected:rejectedCounts,rejection_log:rejectedDrafts,errors,warnings,changes:{new_vocabulary:0,new_grammar:0,lessons:0,dynamic_ai_examples:0,learner_progress:0,production:0,phase35e1c_started:false,phase4_started:false},dialogues:[...enDialogues.map(row=>({language:'en',...row})),...jaDialogues.map(row=>({language:'ja',...row}))]};
fs.writeFileSync(path.join(outDir,'generation-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,by_language:report.by_language,totals:report.totals,rejected:report.rejected,errors,warnings},null,2));
if(errors.length)process.exitCode=1;
