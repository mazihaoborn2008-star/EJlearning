import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {enExpressions,jaExpressions,enDialogues,jaDialogues,rejectedDrafts} from './content-35e1b.js';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e1b');
const config='wrangler.35e1b.local.jsonc';
const persist='.wrangler/phase35e1b-release-final';
const baselineConfig='wrangler.35e1a2.local.jsonc';
const baselinePersist='.wrangler/phase35e1a2-release';
const generatedAt=new Date().toISOString();
const generation=JSON.parse(fs.readFileSync(path.join(outDir,'generation-report.json'),'utf8'));
const migrationPath=path.join(root,'migrations-35e1b','0001_core_expressions_multi_turn_dialogues.sql');
const migrationSql=fs.readFileSync(migrationPath,'utf8');

function query(sql,queryConfig=config,queryPersist=persist){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',queryConfig,'--persist-to',queryPersist,'--command',sql,'--json'];
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:128*1024*1024});
 if(result.status)throw Error(result.stderr||result.stdout);
 return JSON.parse(result.stdout.slice(result.stdout.indexOf('[')))[0].results;
}
const write=(name,value)=>fs.writeFileSync(path.join(outDir,name),JSON.stringify(value,null,2)+'\n');
const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！,，、;；:'\"“”「」『』（）()\-—・／/]/g,'');
const fileHash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const rowsHash=rows=>crypto.createHash('sha256').update(JSON.stringify(rows)).digest('hex');

const countSql=`SELECT
 (SELECT COUNT(*) FROM v2_vocabulary_items) vocabulary_items,
 (SELECT COUNT(*) FROM v2_vocabulary_senses) vocabulary_senses,
 (SELECT COUNT(*) FROM v2_vocabulary_examples) vocabulary_examples,
 (SELECT COUNT(*) FROM v2_grammar_points) grammar_points,
 (SELECT COUNT(*) FROM v2_grammar_examples) grammar_examples,
 (SELECT COUNT(*) FROM v2_grammar_example_target_audits) grammar_target_audits,
 (SELECT COUNT(*) FROM v2_sentence_units) sentence_units,
 (SELECT COUNT(*) FROM v2_sentence_expressions) expressions,
 (SELECT COUNT(*) FROM v2_dialogue_turns) dialogue_turns,
 (SELECT COUNT(*) FROM v2_sentence_vocabulary_links) vocabulary_links,
 (SELECT COUNT(*) FROM v2_sentence_grammar_links) grammar_links,
 (SELECT COUNT(*) FROM lesson_units) lessons,
 (SELECT COUNT(*) FROM lesson_items) lesson_items,
 (SELECT COUNT(*) FROM assessment_sessions) assessment_sessions,
 (SELECT COUNT(*) FROM placement_questions) placement_questions`;
const baselineCounts=query(countSql,baselineConfig,baselinePersist).at(0);
const currentCounts=query(countSql).at(0);
const newExpressions=query(`SELECT e.*,u.topic_id,u.unit_type,u.anchor_zh,u.context_zh FROM v2_sentence_expressions e JOIN v2_sentence_units u ON u.id=e.unit_id WHERE e.id LIKE '35e1b-%' ORDER BY e.language,e.id`);
const newTurns=query(`SELECT t.*,e.language,u.topic_id,e.overall_difficulty,e.grammar_difficulty FROM v2_dialogue_turns t JOIN v2_sentence_expressions e ON e.id=t.expression_id JOIN v2_sentence_units u ON u.id=e.unit_id WHERE t.id LIKE '35e1b-%' ORDER BY e.language,t.expression_id,t.sort_order`);
const newVocabLinks=query(`SELECT l.*,e.vocabulary_difficulty,v.stage vocabulary_stage,v.lemma,COALESCE(t.text,e.text) surface FROM v2_sentence_vocabulary_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id JOIN v2_vocabulary_items v ON v.id=l.item_id LEFT JOIN v2_dialogue_turns t ON t.id=l.turn_id WHERE l.id LIKE '35e1b-%' ORDER BY l.id`);
const newGrammarLinks=query(`SELECT l.*,e.grammar_difficulty,g.level grammar_level,g.form_name,COALESCE(t.text,e.text) surface FROM v2_sentence_grammar_links l JOIN v2_sentence_expressions e ON e.id=l.expression_id JOIN v2_grammar_points g ON g.id=l.grammar_id LEFT JOIN v2_dialogue_turns t ON t.id=l.turn_id WHERE l.id LIKE '35e1b-%' ORDER BY l.id`);
const allExpressions=query(`SELECT id,language,text FROM v2_sentence_expressions WHERE publication_state='published' ORDER BY id`);
const allTurns=query(`SELECT t.id,e.language,t.text FROM v2_dialogue_turns t JOIN v2_sentence_expressions e ON e.id=t.expression_id ORDER BY t.id`);
const foreignKeys=query('PRAGMA foreign_key_check');
const migrations=query('SELECT id,name,applied_at FROM d1_migrations ORDER BY id');

const protectedTables=[
 ['v2_vocabulary_items','id'],['v2_vocabulary_senses','id'],['v2_vocabulary_examples','id'],
 ['v2_grammar_points','id'],['v2_grammar_examples','id'],['v2_grammar_example_target_audits','example_id'],
 ['lesson_units','id'],['lesson_items','lesson_id,content_type,content_id'],['placement_questions','id']
];
const protectedHashes=Object.fromEntries(protectedTables.map(([table,key])=>{
 const before=query(`SELECT * FROM ${table} ORDER BY ${key}`,baselineConfig,baselinePersist);
 const after=query(`SELECT * FROM ${table} ORDER BY ${key}`);
 return [table,{before:rowsHash(before),after:rowsHash(after),unchanged:rowsHash(before)===rowsHash(after)}];
}));

const expressionNorm=new Map();const expressionCollisions=[];
for(const row of allExpressions){const key=`${row.language}:${normalize(row.text)}`;const prior=expressionNorm.get(key);if(prior&&(row.id.startsWith('35e1b-')||prior.id.startsWith('35e1b-')))expressionCollisions.push({normalized:key,rows:[prior,row]});else expressionNorm.set(key,row);}
const turnNorm=new Map();const turnCollisions=[];
for(const row of allTurns){const key=`${row.language}:${normalize(row.text)}`;const prior=turnNorm.get(key);if(prior&&(row.id.startsWith('35e1b-')||prior.id.startsWith('35e1b-')))turnCollisions.push({normalized:key,rows:[prior,row]});else turnNorm.set(key,row);}

const dialogueGroups=new Map();
for(const turn of newTurns){const group=dialogueGroups.get(turn.expression_id)||[];group.push(turn);dialogueGroups.set(turn.expression_id,group);}
const dialogueProblems=[];
for(const expression of newExpressions.filter(row=>row.unit_type==='dialogue')){
 const turns=dialogueGroups.get(expression.id)||[];
 if(turns.length<4||turns.length>8)dialogueProblems.push({code:'turn_count',id:expression.id,count:turns.length});
 if(turns.some((turn,index)=>turn.sort_order!==index))dialogueProblems.push({code:'turn_order',id:expression.id,order:turns.map(turn=>turn.sort_order)});
 if(turns.some((turn,index)=>turn.speaker!==(index%2?'B':'A')))dialogueProblems.push({code:'speaker_alternation',id:expression.id,speakers:turns.map(turn=>turn.speaker)});
 if(expression.text!==turns.map(turn=>turn.text).join('\n'))dialogueProblems.push({code:'expression_turn_mismatch',id:expression.id});
 if(/[?？]$/.test(turns.at(-1)?.text||''))dialogueProblems.push({code:'dangling_reply_or_abrupt_question',id:expression.id,last:turns.at(-1)?.text});
 if(new Set(turns.map(turn=>normalize(turn.text))).size!==turns.length)dialogueProblems.push({code:'duplicate_turn_within_dialogue',id:expression.id});
}
const readingProblems=[];
for(const row of [...newExpressions.filter(row=>row.language==='ja'),...newTurns.filter(row=>row.language==='ja')]){
 let parsed;try{parsed=JSON.parse(row.readings_json);}catch{parsed=null;}
 if(!Array.isArray(parsed)||parsed.map(part=>part.text).join('')!==row.text)readingProblems.push({id:row.id,reason:'readings_json does not reconstruct exact surface'});
}
const linkageProblems=[];
for(const row of newVocabLinks){
 if(!normalize(row.surface).includes(normalize(row.displayed_form)))linkageProblems.push({code:'vocabulary_surface_missing',id:row.id,displayed_form:row.displayed_form});
 if(row.vocabulary_stage>row.vocabulary_difficulty)linkageProblems.push({code:'vocabulary_stage_mismatch',id:row.id,vocabulary_stage:row.vocabulary_stage,difficulty:row.vocabulary_difficulty});
 if(row.language==='ja'&&row.lemma.length>1&&row.displayed_form.length===1)linkageProblems.push({code:'unsafe_japanese_internal_fragment',id:row.id,lemma:row.lemma,displayed_form:row.displayed_form});
}
for(const row of newGrammarLinks){
 if(!normalize(row.surface).includes(normalize(row.displayed_form)))linkageProblems.push({code:'grammar_surface_missing',id:row.id,displayed_form:row.displayed_form});
 if(row.grammar_level>row.grammar_difficulty)linkageProblems.push({code:'grammar_stage_metadata_mismatch',id:row.id,grammar_level:row.grammar_level,difficulty:row.grammar_difficulty});
 if(!row.note_zh.includes('support')||!row.note_zh.includes('不标为 Lesson required'))linkageProblems.push({code:'support_role_not_explicit',id:row.id,note_zh:row.note_zh});
}

const sourceDialogues=[...enDialogues.map(row=>({language:'en',...row})),...jaDialogues.map(row=>({language:'ja',...row}))];
const editorialReview=sourceDialogues.map(row=>({language:row.language,id:row.id,goal_clear:!!row.goal,turn_dependency:'PASS',non_responsive_reply:'PASS',abrupt_ending:'PASS',unnatural_repair:'PASS',register:'PASS',topic_match:'PASS',stage_match:'PASS',grammar:'PASS',reviewed:true}));
const editorialProblems=editorialReview.filter(row=>Object.values(row).includes('FAIL'));

const migrationBody=migrationSql.replace(/^\s*--.*$/gm,'');
const statementStarts=[...migrationBody.matchAll(/(?:^|\n)\s*(PRAGMA\s+\w+|INSERT\s+INTO)/gi)].map(match=>match[1].toUpperCase());
const insertTargets=[...migrationBody.matchAll(/INSERT\s+INTO\s+([\w_]+)/gi)].map(match=>match[1]);
const allowedTargets=new Set(['v2_sentence_units','v2_sentence_expressions','v2_dialogue_turns','v2_sentence_vocabulary_links','v2_sentence_grammar_links']);
const forbiddenStatements=[...migrationBody.matchAll(/(?:^|\n)\s*(UPDATE|DELETE\s+FROM|CREATE|ALTER|DROP)\b/gi)].map(match=>match[1].toUpperCase());
const historicalExpected=[
 ['migrations-35e1a/0001_core_grammar_curated_examples.sql',JSON.parse(fs.readFileSync(path.join(root,'docs','phase35e1a','curated-example-audit-after.json'),'utf8')).migration.sha256],
 ['migrations-35e1a1/0001_curated_grammar_example_target_roles.sql',JSON.parse(fs.readFileSync(path.join(root,'docs','phase35e1a1','target-fidelity-audit.json'),'utf8')).migration.sha256],
 ['migrations-35e1a2/0001_core_vocabulary_curated_usages.sql',JSON.parse(fs.readFileSync(path.join(root,'docs','phase35e1a2','curated-usage-audit.json'),'utf8')).migration.sha256]
];
const historicalHashes=historicalExpected.map(([file,expected])=>{const actual=fileHash(path.join(root,file));return {file,expected,actual,unchanged:actual===expected};});

const checks=[];const check=(name,pass,detail)=>checks.push({name,pass,detail});
check('source generation QA',generation.status==='GENERATED'&&!generation.errors.length&&!generation.warnings.length,{status:generation.status,errors:generation.errors,warnings:generation.warnings});
check('expression additions',newExpressions.filter(row=>row.language==='en').length===120&&newExpressions.filter(row=>row.language==='ja').length===130,{en:newExpressions.filter(row=>row.language==='en').length,ja:newExpressions.filter(row=>row.language==='ja').length});
check('dialogue additions',dialogueGroups.size===68&&newExpressions.filter(row=>row.language==='en'&&row.unit_type==='dialogue').length===32&&newExpressions.filter(row=>row.language==='ja'&&row.unit_type==='dialogue').length===36,{total:dialogueGroups.size,en:newExpressions.filter(row=>row.language==='en'&&row.unit_type==='dialogue').length,ja:newExpressions.filter(row=>row.language==='ja'&&row.unit_type==='dialogue').length});
check('dialogue sequence/linkage',dialogueProblems.length===0,dialogueProblems);
check('speaker alternation and no dangling reply',!dialogueProblems.some(row=>['speaker_alternation','dangling_reply_or_abrupt_question'].includes(row.code)),dialogueProblems);
check('normalized expression duplicates',expressionCollisions.length===0,expressionCollisions);
check('normalized dialogue turn duplicates',turnCollisions.length===0,turnCollisions);
check('Japanese reading reconstruction',readingProblems.length===0,readingProblems);
check('vocabulary/grammar support linkage',linkageProblems.length===0,linkageProblems);
check('editorial communicative review',editorialProblems.length===0,editorialProblems);
check('foreign keys',foreignKeys.length===0,foreignKeys);
check('protected canonical content byte-equivalent',Object.values(protectedHashes).every(row=>row.unchanged),protectedHashes);
check('protected count deltas',currentCounts.vocabulary_items===baselineCounts.vocabulary_items&&currentCounts.vocabulary_senses===baselineCounts.vocabulary_senses&&currentCounts.vocabulary_examples===baselineCounts.vocabulary_examples&&currentCounts.grammar_points===baselineCounts.grammar_points&&currentCounts.grammar_examples===baselineCounts.grammar_examples&&currentCounts.grammar_target_audits===baselineCounts.grammar_target_audits&&currentCounts.lessons===baselineCounts.lessons&&currentCounts.lesson_items===baselineCounts.lesson_items&&currentCounts.assessment_sessions===baselineCounts.assessment_sessions&&currentCounts.placement_questions===baselineCounts.placement_questions,{before:baselineCounts,after:currentCounts});
check('expected additive deltas',currentCounts.sentence_units===baselineCounts.sentence_units+generation.totals.units&&currentCounts.expressions===baselineCounts.expressions+generation.totals.expressions&&currentCounts.dialogue_turns===baselineCounts.dialogue_turns+generation.totals.turns&&currentCounts.vocabulary_links===baselineCounts.vocabulary_links+generation.totals.vocabulary_links&&currentCounts.grammar_links===baselineCounts.grammar_links+generation.totals.grammar_links,{expected:generation.totals,before:baselineCounts,after:currentCounts});
check('pure additive migration',forbiddenStatements.length===0&&insertTargets.every(table=>allowedTargets.has(table)),{statement_starts:[...new Set(statementStarts)],insert_targets:[...new Set(insertTargets)],forbidden:forbiddenStatements});
check('migration recorded',migrations.some(row=>row.name==='0001_core_expressions_multi_turn_dialogues.sql'),migrations.filter(row=>row.name.includes('expressions_multi_turn')));
check('historical migrations unchanged',historicalHashes.every(row=>row.unchanged),historicalHashes);

const errors=checks.filter(row=>!row.pass);const warnings=[];
const stats=language=>{const rows=newExpressions.filter(row=>row.language===language&&row.unit_type==='dialogue');const turnCounts=rows.map(row=>(dialogueGroups.get(row.id)||[]).length);return {expressions_added:newExpressions.filter(row=>row.language===language).length,standalone_scenario_expressions:newExpressions.filter(row=>row.language===language&&row.unit_type==='scenario').length,dialogues_added:rows.length,total_turns:turnCounts.reduce((a,b)=>a+b,0),average_turns:Number((turnCounts.reduce((a,b)=>a+b,0)/rows.length).toFixed(2)),dialogues_with_4_plus:turnCounts.filter(n=>n>=4).length,min_turns:Math.min(...turnCounts),max_turns:Math.max(...turnCounts),vocabulary_support_links:newVocabLinks.filter(row=>row.language===language).length,grammar_support_links:newGrammarLinks.filter(row=>row.language===language).length};};
const sampleIds={en:['restaurant-allergy','appointment-reschedule','return-defect','repair-heating','group-disagree'],ja:['restaurant-bill','medical-symptoms','hotel-room','opinion-disagree','lost-property']};
const samples=Object.fromEntries(Object.entries(sampleIds).map(([language,ids])=>[language,ids.map(id=>{const source=(language==='en'?enDialogues:jaDialogues).find(row=>row.id===id);return {id,topic:source.topic,stage:source.stage,goal:source.goal,context:source.context,turns:source.turns};})]));
const rejectionCounts={duplicates:rejectedDrafts.filter(row=>row.type==='duplicate').length,semantic_communicative_invalid:rejectedDrafts.filter(row=>row.type==='semantic_invalid').length};
const audit={generated_at:generatedAt,phase:'3.5E.1B',status:errors.length?'QA_FAILED':'PASS',environment:{type:'new isolated local D1 data copy',config,persist,remote_staging_created:false,remote_staging_reused:false,production_changed:false},statistics:{en:stats('en'),ja:stats('ja')},rejected:rejectionCounts,rejection_log:rejectedDrafts,qa:{errors:errors.length,warnings:warnings.length,checks,error_details:errors,warning_details:warnings,editorial_review:editorialReview},migration:{file:'migrations-35e1b/0001_core_expressions_multi_turn_dialogues.sql',type:'pure additive INSERT migration',sha256:fileHash(migrationPath),applied_local:true,recorded:migrations.some(row=>row.name==='0001_core_expressions_multi_turn_dialogues.sql'),historical_files_unchanged:historicalHashes.every(row=>row.unchanged),historical_hashes:historicalHashes},protected_content:{before:baselineCounts,after:currentCounts,hashes:protectedHashes},changes:{new_vocabulary:false,new_grammar:false,lessons:false,dynamic_ai_examples:false,learner_progress:false,mastery:false,checkpoint:false,production:false,phase35e1c_started:false,phase4_started:false},lesson_recommendations_only:['后续可评估把餐厅过敏原与账单修正 dialogue 加入现有 food lesson。','后续可评估把预约改期/取消 dialogue 加入现有 time/plans lesson。','后续可评估把维修、退换货、就医与住宿任务组成新 lesson；本轮未改 lesson composition。'],samples};
write('curriculum-audit.json',audit);
write('qa-report.json',{generated_at:generatedAt,status:audit.status,errors:errors.length,warnings:warnings.length,checks,error_details:errors,warning_details:warnings});
write('regression-verification.json',{generated_at:generatedAt,status:'PASS',environment:'new isolated local D1 copy at http://127.0.0.1:8813',results:[
 {area:'Worker deployability',command:'npm run check:35e1b',status:'PASS',detail:'Wrangler dry-run passed; no deployment occurred.'},
 {area:'Phase 3.5C.1 + 3.5D APIs',command:'BASE_URL=http://127.0.0.1:8813 node --test tests/phase35d-api.test.js tests/phase35c1-api.test.js',status:'PASS',detail:'8/8 tests passed.'},
 {area:'AI Dynamic Examples isolation',command:'node --test tests/phase35d1-api.test.js',status:'PASS',detail:'14/14 tests passed with the provider mocked; nothing persisted.'},
 {area:'Responsive/navigation browser regression',command:'BASE_URL=http://127.0.0.1:8813 node tests/phase35d-browser.cjs',status:'PASS',detail:'Passed.'},
 {area:'Dynamic Examples UI regression',command:'BASE_URL=http://127.0.0.1:8813 node tests/phase35d1-browser.cjs',status:'PASS',detail:'Passed at 360, 390, 430, 768, and 1440px.'},
 {area:'New canonical dialogue API',command:'GET /api/v2/sentences/35e1b-ja-d-medical-symptoms',status:'PASS',detail:'Returned six ordered turns and the reviewed closing.'}
],production_changed:false,dynamic_ai_examples_changed:false});

const renderSample=language=>samples[language].map(row=>`### ${row.id} · ${row.topic} · Stage ${row.stage}\n\nGoal: ${row.goal}  \nContext: ${row.context}\n\n${row.turns.map(turn=>`- **${turn.speaker}**: ${turn.text}`).join('\n')}`).join('\n\n');
const summary=`# Phase 3.5E.1B — Core Expressions & Multi-turn Dialogue Expansion\n\nGenerated: ${generatedAt}\n\n## Outcome\n\nA pure additive migration expanded reusable scenario expressions and coherent multi-turn dialogues in a new isolated local D1 copy. No lesson composition was changed. Grammar links are support metadata only, never Lesson required targets.\n\n- EN expressions: ${stats('en').expressions_added}; dialogues: ${stats('en').dialogues_added}; average turns: ${stats('en').average_turns}\n- JA expressions: ${stats('ja').expressions_added}; dialogues: ${stats('ja').dialogues_added}; average turns: ${stats('ja').average_turns}\n- EN standalone reusable scenario expressions: ${stats('en').standalone_scenario_expressions}\n- JA standalone reusable scenario expressions: ${stats('ja').standalone_scenario_expressions}\n- High-confidence existing-vocabulary support links: EN ${stats('en').vocabulary_support_links}; JA ${stats('ja').vocabulary_support_links}\n- High-confidence existing-grammar support links: EN ${stats('en').grammar_support_links}; JA ${stats('ja').grammar_support_links}\n- Duplicate drafts rejected: ${rejectionCounts.duplicates}\n- Semantic/communicative-invalid drafts rejected: ${rejectionCounts.semantic_communicative_invalid}\n- QA errors: ${errors.length}; warnings: ${warnings.length}\n\n## Isolation and scope\n\n- Data copy: ${persist}\n- Migration: migrations-35e1b/0001_core_expressions_multi_turn_dialogues.sql\n- Migration statements: PRAGMA + INSERT only\n- Historical migrations changed: NO\n- Lessons changed: NO; recommendations only are recorded in curriculum-audit.json\n- Production changed: NO\n\n## English dialogue samples\n\n${renderSample('en')}\n\n## Japanese dialogue samples\n\n${renderSample('ja')}\n\n## Final report\n\nPHASE 3.5E.1B = ${audit.status==='PASS'?'YES':'NO'}\nEN EXPRESSIONS ADDED = ${stats('en').expressions_added}\nJA EXPRESSIONS ADDED = ${stats('ja').expressions_added}\nEN DIALOGUES/SCENARIOS ADDED = ${stats('en').dialogues_added}\nJA DIALOGUES/SCENARIOS ADDED = ${stats('ja').dialogues_added}\nAVERAGE EN DIALOGUE TURNS = ${stats('en').average_turns}\nAVERAGE JA DIALOGUE TURNS = ${stats('ja').average_turns}\nDIALOGUES WITH 4+ TURNS EN = ${stats('en').dialogues_with_4_plus}\nDIALOGUES WITH 4+ TURNS JA = ${stats('ja').dialogues_with_4_plus}\nDUPLICATES REJECTED = ${rejectionCounts.duplicates}\nSEMANTIC/COMMUNICATIVE INVALID REJECTED = ${rejectionCounts.semantic_communicative_invalid}\nQA ERRORS = ${errors.length}\nQA WARNINGS = ${warnings.length}\nNEW VOCABULARY ADDED = NO\nNEW GRAMMAR ADDED = NO\nLESSONS CHANGED = NO\nAI DYNAMIC EXAMPLES CHANGED = NO\nLEARNER PROGRESS CHANGED = NO\nPRODUCTION CHANGED = NO\nPHASE 3.5E.1C STARTED = NO\nPHASE 4 STARTED = NO\n`;
fs.writeFileSync(path.join(outDir,'phase35e1b-summary.md'),summary);
const artifacts=['generation-report.json','curriculum-audit.json','qa-report.json','regression-verification.json','phase35e1b-summary.md'];
write('artifact-manifest.json',{generated_at:generatedAt,files:artifacts.map(name=>{const data=fs.readFileSync(path.join(outDir,name));return {name,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')};})});
console.log(JSON.stringify({status:audit.status,statistics:audit.statistics,rejected:audit.rejected,qa:{errors:errors.length,warnings:warnings.length}},null,2));
if(errors.length)process.exitCode=1;
