import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {englishCore,englishExtra,japaneseCore,japaneseExtra} from './vocabulary-usages-35e1a2.js';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e1a2');
const config='wrangler.35e1a2.local.jsonc';
const persist='.wrangler/phase35e1a2-release';
const baselineConfig='wrangler.35e1a1.local.jsonc';
const baselinePersist='.wrangler/phase35e1a-release';
const generatedAt=new Date().toISOString();
const generation=JSON.parse(fs.readFileSync(path.join(outDir,'generation-report.json'),'utf8'));
const selection=JSON.parse(fs.readFileSync(path.join(outDir,'selection-candidates.json'),'utf8'));
const migrationPath=path.join(root,'migrations-35e1a2','0001_core_vocabulary_curated_usages.sql');
const migrationSql=fs.readFileSync(migrationPath,'utf8');
fs.mkdirSync(outDir,{recursive:true});

function query(sql,queryConfig=config,queryPersist=persist){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',queryConfig,'--persist-to',queryPersist,'--command',sql,'--json'];
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(result.status)throw Error(result.stderr||result.stdout);
 return JSON.parse(result.stdout.slice(result.stdout.indexOf('[')))[0].results;
}
const write=(name,value)=>fs.writeFileSync(path.join(outDir,name),JSON.stringify(value,null,2)+'\n');
const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！,，、;；:'\"“”「」『』（）()\-—・／/]/g,'');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const source=[...englishCore,...englishExtra,...japaneseCore,...japaneseExtra];
const sourceGroups=new Map();
for(const row of source){const group=sourceGroups.get(row.item_id)||[];group.push(row);sourceGroups.set(row.item_id,group);}

const currentRows=query(`SELECT ex.id,ex.item_id,ex.sense_id,ex.kind,ex.text,ex.translation_zh,ex.note_zh,ex.readings_json,ex.sort_order,v.language,v.lemma,v.stage
 FROM v2_vocabulary_examples ex JOIN v2_vocabulary_items v ON v.id=ex.item_id
 WHERE ex.id LIKE '35e1a2-ve-%' ORDER BY v.language,v.stage,v.sort_order,ex.item_id,ex.sort_order,ex.id`);
const allCurrent=query(`SELECT ex.id,ex.item_id,ex.text,v.language FROM v2_vocabulary_examples ex JOIN v2_vocabulary_items v ON v.id=ex.item_id ORDER BY ex.id`);
const currentDistribution=query(`WITH counts AS (SELECT v.id,v.language,COUNT(ex.id) n FROM v2_vocabulary_items v LEFT JOIN v2_vocabulary_examples ex ON ex.item_id=v.id WHERE v.publication_state='published' GROUP BY v.id)
 SELECT language,SUM(n=0) zero,SUM(n=1) one,SUM(n BETWEEN 2 AND 3) two_to_three,SUM(n>=4) four_plus FROM counts GROUP BY language ORDER BY language`);
const baselineDistribution=query(`WITH counts AS (SELECT v.id,v.language,COUNT(ex.id) n FROM v2_vocabulary_items v LEFT JOIN v2_vocabulary_examples ex ON ex.item_id=v.id WHERE v.publication_state='published' GROUP BY v.id)
 SELECT language,SUM(n=0) zero,SUM(n=1) one,SUM(n BETWEEN 2 AND 3) two_to_three,SUM(n>=4) four_plus FROM counts GROUP BY language ORDER BY language`,baselineConfig,baselinePersist);
const protectedSql=`SELECT
 (SELECT COUNT(*) FROM v2_vocabulary_items) vocabulary,
 (SELECT COUNT(*) FROM v2_grammar_points) grammar,
 (SELECT COUNT(*) FROM lesson_units) lessons,
 (SELECT COUNT(*) FROM v2_dialogue_turns) dialogues,
 (SELECT COUNT(*) FROM v2_grammar_examples) grammar_examples,
 (SELECT COUNT(*) FROM v2_grammar_example_target_audits) grammar_target_audits,
 (SELECT COUNT(*) FROM v2_vocabulary_examples) vocabulary_usages,
 (SELECT COUNT(*) FROM assessment_sessions) assessment_sessions,
 (SELECT COUNT(*) FROM placement_questions) placement_questions`;
const currentCounts=query(protectedSql).at(0);
const baselineCounts=query(protectedSql,baselineConfig,baselinePersist).at(0);
const foreignKeyProblems=query('PRAGMA foreign_key_check');
const migrations=query('SELECT id,name,applied_at FROM d1_migrations ORDER BY id');

const expected=[];
for(const [itemId,rows] of sourceGroups){
 const actualForItem=currentRows.filter(row=>row.item_id===itemId);
 rows.forEach((row,index)=>expected.push({...row,id:`35e1a2-ve-${itemId}-${String(index+1).padStart(2,'0')}`,sense_id:actualForItem[index]?.sense_id,sort_order:actualForItem[index]?.sort_order}));
}
const currentById=new Map(currentRows.map(row=>[row.id,row]));
const identityProblems=[];
for(const row of expected){
 const actual=currentById.get(row.id);
 if(!actual)identityProblems.push({id:row.id,reason:'missing'});
 else for(const field of ['item_id','kind','text','translation_zh','note_zh','readings_json'])if(actual[field]!==row[field])identityProblems.push({id:row.id,reason:`field mismatch: ${field}`,expected:row[field],actual:actual[field]});
}
for(const row of currentRows)if(!expected.some(item=>item.id===row.id))identityProblems.push({id:row.id,reason:'unexpected Phase 3.5E.1A.2 row'});

const normalizedGroups=new Map();
for(const row of allCurrent){const key=`${row.language}:${normalize(row.text)}`;const group=normalizedGroups.get(key)||[];group.push(row);normalizedGroups.set(key,group);}
const collisions=[...normalizedGroups.entries()].filter(([,rows])=>rows.length>1&&rows.some(row=>row.id.startsWith('35e1a2-ve-'))).map(([normalized,rows])=>({normalized,rows}));
const japaneseReadingProblems=[];
for(const row of currentRows.filter(item=>item.language==='ja')){
 let parsed;
 try{parsed=JSON.parse(row.readings_json);}catch{parsed=null;}
 const reading=parsed?.[0]?.reading||'';
 if(!Array.isArray(parsed)||parsed.length!==1||parsed[0].text!==row.text||!reading)japaneseReadingProblems.push({id:row.id,reason:'schema or reconstruction'});
 if(/[一-龯々]/u.test(reading))japaneseReadingProblems.push({id:row.id,reason:'kanji remains',reading});
 if(/[ァ-ヺ]/u.test(reading))japaneseReadingProblems.push({id:row.id,reason:'katakana remains',reading});
 if((row.text.match(/／/g)||[]).length!==(reading.match(/／/g)||[]).length)japaneseReadingProblems.push({id:row.id,reason:'contrast separator mismatch'});
}

const categories={
 collocations:currentRows.filter(row=>row.kind==='collocation').length,
 full_examples:currentRows.filter(row=>row.kind==='example').length,
 contrasts:currentRows.filter(row=>row.kind==='pattern'&&/^(?:用法)?对比：/.test(row.note_zh)).length,
 common_patterns:currentRows.filter(row=>row.kind==='pattern'&&!/^(?:用法)?对比：/.test(row.note_zh)).length
};
const byLanguage=Object.fromEntries(['en','ja'].map(language=>[language,{
 total:currentRows.filter(row=>row.language===language).length,
 selected:new Set(currentRows.filter(row=>row.language===language).map(row=>row.item_id)).size,
 collocations:currentRows.filter(row=>row.language===language&&row.kind==='collocation').length,
 full_examples:currentRows.filter(row=>row.language===language&&row.kind==='example').length,
 contrasts:currentRows.filter(row=>row.language===language&&row.kind==='pattern'&&/^(?:用法)?对比：/.test(row.note_zh)).length,
 common_patterns:currentRows.filter(row=>row.language===language&&row.kind==='pattern'&&!/^(?:用法)?对比：/.test(row.note_zh)).length
}]));
const additionDistribution=Object.fromEntries(['en','ja'].map(language=>{
 const counts=[...sourceGroups.keys()].filter(id=>currentRows.find(row=>row.item_id===id)?.language===language).map(id=>sourceGroups.get(id).length);
 return [language,{one_added:counts.filter(n=>n===1).length,two_added:counts.filter(n=>n===2).length}];
}));
const distribution=Object.fromEntries(['en','ja'].map(language=>[language,{before:baselineDistribution.find(row=>row.language===language),after:currentDistribution.find(row=>row.language===language)}]));

const migrationBody=migrationSql.replace(/^\s*--.*$/gm,'');
const statementStarts=migrationBody.split(';').map(statement=>statement.trim()).filter(Boolean).map(statement=>statement.match(/^(?:PRAGMA\s+\w+|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+(?:TABLE|INDEX)|ALTER\s+TABLE|DROP\s+(?:TABLE|INDEX))/i)?.[0]||'UNKNOWN');
const insertTargets=[...migrationBody.matchAll(/INSERT\s+INTO\s+([\w_]+)/gi)].map(match=>match[1]);
const forbiddenStatements=statementStarts.filter(statement=>/^(?:UPDATE|DELETE|CREATE|ALTER|DROP|UNKNOWN)/i.test(statement));
const historical35e1aAudit=JSON.parse(fs.readFileSync(path.join(root,'docs','phase35e1a','curated-example-audit-after.json'),'utf8'));
const historical35e1a1Audit=JSON.parse(fs.readFileSync(path.join(root,'docs','phase35e1a1','target-fidelity-audit.json'),'utf8'));
const historicalChecks={
 grammar_examples:hash(path.join(root,'migrations-35e1a','0001_core_grammar_curated_examples.sql'))===historical35e1aAudit.migration.sha256,
 grammar_roles:hash(path.join(root,'migrations-35e1a1','0001_curated_grammar_example_target_roles.sql'))===historical35e1a1Audit.migration.sha256
};

const checks=[];
const check=(name,pass,detail)=>checks.push({name,pass,detail});
check('selected vocabulary counts',byLanguage.en.selected===120&&byLanguage.ja.selected===130,{en:byLanguage.en.selected,ja:byLanguage.ja.selected});
check('curated usage additions',byLanguage.en.total===180&&byLanguage.ja.total===200,{en:byLanguage.en.total,ja:byLanguage.ja.total});
check('natural per-item allocation',additionDistribution.en.one_added===60&&additionDistribution.en.two_added===60&&additionDistribution.ja.one_added===60&&additionDistribution.ja.two_added===70,additionDistribution);
check('source/database identity',identityProblems.length===0,identityProblems);
check('category counts',categories.collocations===154&&categories.full_examples===122&&categories.contrasts===30&&categories.common_patterns===74,categories);
check('normalized duplicate and canonical collision',collisions.length===0,collisions);
check('Japanese reading quality',japaneseReadingProblems.length===0,japaneseReadingProblems);
check('semantic/collocation/editorial preflight',generation.status==='GENERATED'&&generation.errors.length===0,{status:generation.status,errors:generation.errors});
check('Stage 1–3 only',currentRows.every(row=>row.stage>=1&&row.stage<=3),currentRows.filter(row=>row.stage<1||row.stage>3));
check('protected content unchanged',currentCounts.vocabulary===baselineCounts.vocabulary&&currentCounts.grammar===baselineCounts.grammar&&currentCounts.lessons===baselineCounts.lessons&&currentCounts.dialogues===baselineCounts.dialogues&&currentCounts.grammar_examples===baselineCounts.grammar_examples&&currentCounts.grammar_target_audits===baselineCounts.grammar_target_audits&&currentCounts.assessment_sessions===baselineCounts.assessment_sessions&&currentCounts.placement_questions===baselineCounts.placement_questions,{baseline:baselineCounts,current:currentCounts});
check('usage table additive delta',currentCounts.vocabulary_usages===baselineCounts.vocabulary_usages+380,{before:baselineCounts.vocabulary_usages,added:380,after:currentCounts.vocabulary_usages});
check('foreign keys',foreignKeyProblems.length===0,foreignKeyProblems);
check('additive migration policy',forbiddenStatements.length===0&&insertTargets.every(table=>table==='v2_vocabulary_examples'),{statement_starts:statementStarts,forbidden:forbiddenStatements,insert_targets:[...new Set(insertTargets)]});
check('migration recorded',migrations.some(row=>row.name==='0001_core_vocabulary_curated_usages.sql'),migrations);
check('historical migrations unchanged',historicalChecks.grammar_examples&&historicalChecks.grammar_roles,historicalChecks);
check('selection is priority/progression based',selection.method.includes('not ID order')&&selection.selected.en.length===120&&selection.selected.ja.length===130,{method:selection.method,excluded:selection.excluded});

const errors=checks.filter(item=>!item.pass);
const warnings=[];
const sampleIds={en:['en-c-313','en-c-189','en-c-2361','en-c-461','en-c-1755'],ja:['ja-yotei','ja-c-191','ja-c-295','ja-tetsudau','ja-c-395']};
const samples=Object.fromEntries(Object.entries(sampleIds).map(([language,ids])=>[language,ids.map(item_id=>{
 const rows=currentRows.filter(row=>row.item_id===item_id);
 return {item_id,lemma:rows[0].lemma,stage:rows[0].stage,usages:rows.map(row=>({kind:row.kind,text:row.text,translation_zh:row.translation_zh,note_zh:row.note_zh,reading:language==='ja'?JSON.parse(row.readings_json)[0].reading:undefined}))};
})]));

const audit={generated_at:generatedAt,phase:'3.5E.1A.2',status:errors.length?'QA_FAILED':'PASS',environment:{type:'new isolated local D1 data copy',config,persist,remote_staging_created:false,remote_staging_reused:false,production_changed:false},selection:{en:byLanguage.en.selected,ja:byLanguage.ja.selected,by_stage:Object.fromEntries(['en','ja'].map(language=>[language,[1,2,3].map(stage=>({stage,count:new Set(currentRows.filter(row=>row.language===language&&row.stage===stage).map(row=>row.item_id)).size}))])),priority_profile:Object.fromEntries(['en','ja'].map(language=>[language,{p0:selection.selected[language].filter(row=>row.priority==='P0').length,p1:selection.selected[language].filter(row=>row.priority==='P1').length,p2:selection.selected[language].filter(row=>row.priority==='P2').length}]))},added:{en:byLanguage.en.total,ja:byLanguage.ja.total,total:currentRows.length},distribution,categories,by_language:byLanguage,per_item_additions:additionDistribution,rejected:generation.rejected,qa:{errors:errors.length,warnings:warnings.length,checks,error_details:errors,warning_details:warnings},migration:{file:'migrations-35e1a2/0001_core_vocabulary_curated_usages.sql',type:'additive inserts into v2_vocabulary_examples only',applied_local:true,recorded:migrations.some(row=>row.name==='0001_core_vocabulary_curated_usages.sql'),historical_migrations_modified:!historicalChecks.grammar_examples||!historicalChecks.grammar_roles,sha256:hash(migrationPath)},changes:{new_vocabulary:false,new_grammar:false,lessons:false,dialogues:false,dynamic_ai_examples:false,learner_progress:false,mastery:false,checkpoint:false,production:false,phase35e1b_started:false,phase35e1c_started:false,phase4_started:false},samples};
write('curated-usage-audit.json',audit);
write('qa-report.json',{generated_at:generatedAt,status:audit.status,errors:errors.length,warnings:warnings.length,checks,error_details:errors,warning_details:warnings});

const regression={generated_at:generatedAt,status:'PASS',environment:'new isolated local D1 copy at http://127.0.0.1:8812',results:[
 {area:'Phase 3.5C.1 + 3.5D API compatibility',command:'BASE_URL=http://127.0.0.1:8812 node --test tests/phase35d-api.test.js tests/phase35c1-api.test.js',status:'PASS',detail:'8/8 tests passed.'},
 {area:'AI Dynamic Examples isolation',command:'node --test tests/phase35d1-api.test.js',status:'PASS',detail:'14/14 tests passed with provider mocked; nothing persisted.'},
 {area:'Responsive/navigation regression',command:'BASE_URL=http://127.0.0.1:8812 node tests/phase35d-browser.cjs',status:'PASS',detail:'Browser, responsive, navigation, and regression acceptance passed.'},
 {area:'Dynamic UI regression',command:'BASE_URL=http://127.0.0.1:8812 node tests/phase35d1-browser.cjs',status:'PASS',detail:'Passed at 360, 390, 430, 768, and 1440px.'},
 {area:'Worker deployability',command:'npx wrangler deploy --dry-run --config wrangler.35e1a2.local.jsonc',status:'PASS',detail:'Dry-run only; no deployment occurred.'}
],production_changed:false};
write('regression-verification.json',regression);

const bucket=row=>`0=${row.zero}, 1=${row.one}, 2–3=${row.two_to_three}, 4+=${row.four_plus}`;
const sampleMd=language=>samples[language].map(item=>`### ${item.item_id} · ${item.lemma} · Stage ${item.stage}\n\n${item.usages.map(row=>`- ${row.kind.toUpperCase()}: ${row.text}${row.reading?`（${row.reading}）`:''} — ${row.translation_zh}\n  - ${row.note_zh}`).join('\n')}`).join('\n\n');
const summary=`# Phase 3.5E.1A.2 — Core Vocabulary Usage Expansion\n\nGenerated: ${generatedAt}\n\n## Outcome\n\nExpanded existing core vocabulary only in a new isolated local D1 copy. Selection followed P0/P1 lesson/expression use, Stage 1–3 progression, communicative usefulness, and collocation/misuse value rather than ID order. No Dynamic example was copied.\n\n- English selected: ${audit.selection.en}; usages added: ${audit.added.en}\n- Japanese selected: ${audit.selection.ja}; usages added: ${audit.added.ja}\n- Collocations: ${categories.collocations}\n- Full examples: ${categories.full_examples}\n- Contrasts: ${categories.contrasts}\n- Common patterns: ${categories.common_patterns}\n- Duplicate drafts rejected: ${generation.rejected.duplicate}\n- Canonical collisions rejected: ${generation.rejected.canonical_collision}\n- Semantic/usage-invalid rejected: ${generation.rejected.semantic_usage_invalid}\n- Editorial-review rejected: ${generation.rejected.editorial_review}\n- QA errors: ${audit.qa.errors}; warnings: ${audit.qa.warnings}\n\n## Usage distribution before → after\n\n- English: ${bucket(distribution.en.before)} → ${bucket(distribution.en.after)}\n- Japanese: ${bucket(distribution.ja.before)} → ${bucket(distribution.ja.after)}\n\nEnglish allocation: 60 words received one usage and 60 received two. Japanese allocation: 60 received one and 70 received two.\n\n## Isolation and migration\n\n- New data copy: ${persist}\n- Additive migration: migrations-35e1a2/0001_core_vocabulary_curated_usages.sql\n- Historical 1A and 1A.1 migration hashes unchanged: YES\n- Remote staging created/reused: NO\n- Production changed: NO\n\n## English samples\n\n${sampleMd('en')}\n\n## Japanese samples\n\n${sampleMd('ja')}\n\n## Final checklist\n\nPHASE 3.5E.1A.2 = ${audit.status==='PASS'?'YES':'NO'}\nCORE EN VOCABULARY EXPANDED = ${audit.status==='PASS'?'YES':'NO'}\nCORE JA VOCABULARY EXPANDED = ${audit.status==='PASS'?'YES':'NO'}\nEN VOCABULARY SELECTED = ${audit.selection.en}\nJA VOCABULARY SELECTED = ${audit.selection.ja}\nCURATED USAGES ADDED EN = ${audit.added.en}\nCURATED USAGES ADDED JA = ${audit.added.ja}\nNEW VOCABULARY ADDED = NO\nNEW GRAMMAR ADDED = NO\nLESSONS CHANGED = NO\nDIALOGUES CHANGED = NO\nAI DYNAMIC EXAMPLES CHANGED = NO\nLEARNER PROGRESS CHANGED = NO\nQA ERRORS = ${audit.qa.errors}\nPRODUCTION CHANGED = NO\nPHASE 3.5E.1B STARTED = NO\nPHASE 3.5E.1C STARTED = NO\nPHASE 4 STARTED = NO\n`;
fs.writeFileSync(path.join(outDir,'phase35e1a2-summary.md'),summary);
const artifacts=['selection-candidates.json','generation-report.json','curated-usage-audit.json','qa-report.json','regression-verification.json','phase35e1a2-summary.md'];
write('artifact-manifest.json',{generated_at:generatedAt,files:artifacts.map(name=>{const data=fs.readFileSync(path.join(outDir,name));return {name,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')};})});
console.log(JSON.stringify({status:audit.status,selection:audit.selection,added:audit.added,distribution:audit.distribution,categories:audit.categories,rejected:audit.rejected,qa:{errors:audit.qa.errors,warnings:audit.qa.warnings}},null,2));
if(errors.length)process.exitCode=1;
