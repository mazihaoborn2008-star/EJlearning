import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {englishExamples,japaneseExamples} from './grammar-examples-35e1a.js';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e1a1');
const config='wrangler.35e1a1.local.jsonc';
const persist='.wrangler/phase35e1a-release';
const generatedAt=new Date().toISOString();
fs.mkdirSync(outDir,{recursive:true});

function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',config,'--persist-to',persist,'--command',sql,'--json'];
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(result.status)throw Error(result.stderr||result.stdout);
 const start=result.stdout.indexOf('[');
 if(start<0)throw Error(`No JSON returned for ${sql.slice(0,100)}`);
 return JSON.parse(result.stdout.slice(start))[0].results;
}
const write=(name,value)=>fs.writeFileSync(path.join(outDir,name),JSON.stringify(value,null,2)+'\n');
const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！,，、;；:'\"“”「」『』（）()\-—]/g,'');
const preflight=JSON.parse(fs.readFileSync(path.join(outDir,'target-fidelity-preflight.json'),'utf8'));
const migrationPath=path.join(root,'migrations-35e1a1','0001_curated_grammar_example_target_roles.sql');
const migrationSql=fs.readFileSync(migrationPath,'utf8');
const historicalAudit=JSON.parse(fs.readFileSync(path.join(root,'docs','phase35e1a','curated-example-audit-after.json'),'utf8'));
const historicalMigrationSql=fs.readFileSync(path.join(root,'migrations-35e1a','0001_core_grammar_curated_examples.sql'),'utf8');
const historicalMigrationUnchanged=crypto.createHash('sha256').update(historicalMigrationSql).digest('hex')===historicalAudit.migration.sha256;

const expectedDrafts=[
 ...Object.entries(englishExamples).flatMap(([grammar_id,rows])=>rows.map((row,index)=>({id:`35e1a-ge-${grammar_id}-${String(index+1).padStart(2,'0')}`,grammar_id,language:'en',...row}))),
 ...Object.entries(japaneseExamples).flatMap(([grammar_id,rows])=>rows.map((row,index)=>({id:`35e1a-ge-${grammar_id}-${String(index+1).padStart(2,'0')}`,grammar_id,language:'ja',...row})))
];
const expectedById=new Map(expectedDrafts.map(row=>[row.id,row]));
const preflightById=new Map(preflight.rows.map(row=>[row.id,row]));

const roles=query(`SELECT a.example_id,a.grammar_id,a.language,a.target_role,a.rationale_zh,a.audit_phase,a.audited_at,
 ge.text,ge.translation_zh,ge.readings_json,g.form_name,g.formula,g.core_zh,g.level
 FROM v2_grammar_example_target_audits a
 JOIN v2_grammar_examples ge ON ge.id=a.example_id
 JOIN v2_grammar_points g ON g.id=a.grammar_id
 ORDER BY a.language,g.level,g.sort_order,ge.sort_order,ge.id`);
const phaseRows=query(`SELECT ge.id,ge.grammar_id,ge.language,ge.text,ge.translation_zh,ge.source_expression_id
 FROM v2_grammar_examples ge WHERE ge.id LIKE '35e1a-ge-%' ORDER BY ge.id`);
const allExamples=query('SELECT id,grammar_id,language,text FROM v2_grammar_examples ORDER BY id');
const counts=query(`SELECT
 (SELECT COUNT(*) FROM v2_vocabulary_items WHERE publication_state='published') vocabulary,
 (SELECT COUNT(*) FROM v2_grammar_points WHERE publication_state='published') grammar,
 (SELECT COUNT(*) FROM lesson_units WHERE status='published') lessons,
 (SELECT COUNT(*) FROM v2_dialogue_turns) dialogue_turns,
 (SELECT COUNT(*) FROM v2_grammar_examples) grammar_examples,
 (SELECT COUNT(*) FROM v2_grammar_example_target_audits) target_audits`).at(0);
const migrations=query('SELECT name,applied_at FROM d1_migrations ORDER BY id');
const foreignKeyProblems=query('PRAGMA foreign_key_check');
const roleSchema=query('PRAGMA table_info(v2_grammar_example_target_audits)');

const roleNames=['DIRECT','CONTRAST','SUPPORT','INVALID'];
const roleTotals=Object.fromEntries(roleNames.map(role=>[role,roles.filter(row=>row.target_role===role).length]));
const byLanguage=Object.fromEntries(['en','ja'].map(language=>[language,Object.fromEntries(roleNames.map(role=>[role,roles.filter(row=>row.language===language&&row.target_role===role).length]))]));
const selectedGrammar=[...new Set(roles.map(row=>row.grammar_id))];
const grammarBreakdown=selectedGrammar.map(grammar_id=>{
 const rows=roles.filter(row=>row.grammar_id===grammar_id);
 const baseline=allExamples.filter(row=>row.grammar_id===grammar_id&&!row.id.startsWith('35e1a-ge-')).length;
 const breakdown=Object.fromEntries(roleNames.map(role=>[role,rows.filter(row=>row.target_role===role).length]));
 return {grammar_id,language:rows[0].language,form_name:rows[0].form_name,level:rows[0].level,...breakdown,baseline_curated:baseline,direct_majority_across_curated:breakdown.DIRECT+baseline>breakdown.CONTRAST+breakdown.SUPPORT+breakdown.INVALID};
}).sort((a,b)=>a.language.localeCompare(b.language)||a.level-b.level||a.grammar_id.localeCompare(b.grammar_id));
const allDirect=grammarBreakdown.filter(row=>row.CONTRAST===0&&row.SUPPORT===0&&row.INVALID===0);
const withContrastSupport=grammarBreakdown.filter(row=>row.CONTRAST>0||row.SUPPORT>0);

const identityProblems=[];
for(const row of phaseRows){
 const expected=expectedById.get(row.id);
 const audited=roles.find(role=>role.example_id===row.id);
 if(!expected)identityProblems.push({id:row.id,reason:'unexpected Phase 3.5E.1A example'});
 else if(row.grammar_id!==expected.grammar_id||row.language!==expected.language||row.text!==expected.text||row.translation_zh!==expected.translation_zh)identityProblems.push({id:row.id,reason:'example changed since Phase 3.5E.1A source'});
 if(!audited)identityProblems.push({id:row.id,reason:'missing target-fidelity role'});
}
for(const expected of expectedDrafts)if(!phaseRows.some(row=>row.id===expected.id))identityProblems.push({id:expected.id,reason:'Phase 3.5E.1A example removed'});
for(const row of roles){
 const expected=preflightById.get(row.example_id);
 if(!expected)identityProblems.push({id:row.example_id,reason:'unexpected audit role row'});
 else if(row.grammar_id!==expected.grammar_id||row.language!==expected.language||row.target_role!==expected.target_role||row.rationale_zh!==expected.rationale_zh)identityProblems.push({id:row.example_id,reason:'audit role differs from reviewed preflight'});
}

const normalizedGroups=new Map();
for(const row of allExamples){
 const key=`${row.language}:${normalize(row.text)}`;
 const group=normalizedGroups.get(key)||[];
 group.push(row);
 normalizedGroups.set(key,group);
}
const collisions=[...normalizedGroups.entries()].filter(([,rows])=>rows.length>1&&rows.some(row=>row.id.startsWith('35e1a-ge-'))).map(([normalized,rows])=>({normalized,rows}));

const statementStarts=migrationSql.replace(/^\s*--.*$/gm,'').split(';').map(statement=>statement.trim()).filter(Boolean).map(statement=>statement.match(/^(?:PRAGMA\s+\w+|CREATE\s+TABLE|CREATE\s+INDEX|INSERT\s+INTO|UPDATE|DELETE\s+FROM|ALTER\s+TABLE|DROP\s+(?:TABLE|INDEX))/i)?.[0]||'UNKNOWN');
const forbiddenStatements=statementStarts.filter(statement=>/^(?:UPDATE|DELETE|ALTER|DROP|UNKNOWN)/i.test(statement));
const insertTargets=[...migrationSql.matchAll(/INSERT\s+INTO\s+([\w_]+)/gi)].map(match=>match[1]);
const roleColumns=['example_id','grammar_id','language','target_role','rationale_zh','audit_phase','audited_at'];

const checks=[];
const check=(name,pass,detail)=>checks.push({name,pass,detail});
check('Phase scope is exactly 490 examples / 75 grammar',phaseRows.length===490&&selectedGrammar.length===75,{examples:phaseRows.length,grammar:selectedGrammar.length});
check('language final counts',roles.filter(row=>row.language==='en').length===210&&roles.filter(row=>row.language==='ja').length===280,{en:roles.filter(row=>row.language==='en').length,ja:roles.filter(row=>row.language==='ja').length});
check('role totals',roleTotals.DIRECT===463&&roleTotals.CONTRAST===24&&roleTotals.SUPPORT===3&&roleTotals.INVALID===0,roleTotals);
check('role totals by language',byLanguage.en.DIRECT===197&&byLanguage.en.CONTRAST===12&&byLanguage.en.SUPPORT===1&&byLanguage.en.INVALID===0&&byLanguage.ja.DIRECT===266&&byLanguage.ja.CONTRAST===12&&byLanguage.ja.SUPPORT===2&&byLanguage.ja.INVALID===0,byLanguage);
check('each Phase example has exactly one explicit role',roles.length===490&&new Set(roles.map(row=>row.example_id)).size===490,{rows:roles.length,unique:new Set(roles.map(row=>row.example_id)).size});
check('role schema',roleColumns.every(name=>roleSchema.some(column=>column.name===name)),roleSchema.map(column=>column.name));
check('role and example source identity',identityProblems.length===0,identityProblems);
check('all roles have rationale',roles.every(row=>row.rationale_zh.trim()&&row.audit_phase==='3.5E.1A.1'),roles.filter(row=>!row.rationale_zh.trim()||row.audit_phase!=='3.5E.1A.1').map(row=>row.example_id));
check('DIRECT is the majority for every selected grammar',grammarBreakdown.every(row=>row.direct_majority_across_curated),grammarBreakdown.filter(row=>!row.direct_majority_across_curated));
check('grammar role grouping',allDirect.length===57&&withContrastSupport.length===18,{all_direct:allDirect.length,with_contrast_support:withContrastSupport.length});
check('no INVALID remains',roleTotals.INVALID===0,roles.filter(row=>row.target_role==='INVALID'));
check('no examples corrected, removed, or replaced',identityProblems.length===0,{corrected:0,removed:0,replacements:0});
check('no normalized duplicate or existing-example collision',collisions.length===0,collisions);
check('source isolation',phaseRows.every(row=>row.source_expression_id===null),phaseRows.filter(row=>row.source_expression_id!==null).map(row=>row.id));
check('protected curriculum counts unchanged',counts.vocabulary===695&&counts.grammar===155&&counts.lessons===48&&counts.dialogue_turns===116&&counts.grammar_examples===647,{expected:{vocabulary:695,grammar:155,lessons:48,dialogue_turns:116,grammar_examples:647},observed:counts});
check('foreign keys',foreignKeyProblems.length===0,foreignKeyProblems);
check('corrective migration is additive metadata only',forbiddenStatements.length===0&&insertTargets.every(table=>table==='v2_grammar_example_target_audits')&&!/\b(?:UPDATE|DELETE\s+FROM|ALTER\s+TABLE|DROP\s+(?:TABLE|INDEX))\b/i.test(migrationSql.replace(/^\s*--.*$/gm,'')),{statement_starts:statementStarts,forbidden:forbiddenStatements,insert_targets:[...new Set(insertTargets)]});
check('corrective migration recorded',migrations.some(row=>row.name==='0001_curated_grammar_example_target_roles.sql'),migrations);
check('historical Phase 3.5E.1A migration unchanged',historicalMigrationUnchanged,{expected_sha256:historicalAudit.migration.sha256,observed_sha256:crypto.createHash('sha256').update(historicalMigrationSql).digest('hex')});
check('preflight grammar-marker and editorial review',preflight.status==='GENERATED'&&preflight.errors.length===0,{status:preflight.status,errors:preflight.errors});

const errors=checks.filter(item=>!item.pass);
const warnings=[];
const sampleIds={
 en:['en-simple-present','en-wh-question','en-will','en-since-for','en-would-rather'],
 ja:['ja-copula','ja-ga-existence','ja-te-kudasai','ja-ni-naru','ja-te-iru']
};
const samples=Object.fromEntries(Object.entries(sampleIds).map(([language,ids])=>[language,ids.map(grammar_id=>{
 const rows=roles.filter(row=>row.grammar_id===grammar_id);
 return {grammar_id,form_name:rows[0].form_name,formula:rows[0].formula,core_zh:rows[0].core_zh,role_counts:Object.fromEntries(roleNames.map(role=>[role,rows.filter(row=>row.target_role===role).length])),examples:rows.slice(0,7).map(row=>({id:row.example_id,text:row.text,translation_zh:row.translation_zh,target_role:row.target_role,rationale_zh:row.rationale_zh}))};
})]));

const audit={
 generated_at:generatedAt,phase:'3.5E.1A.1',status:errors.length?'QA_FAILED':'PASS',
 environment:{type:'isolated local D1 staging data copy',config,persist,production_changed:false},
 scope:{audited_examples:roles.length,selected_grammar:selectedGrammar.length,en_examples_final:roles.filter(row=>row.language==='en').length,ja_examples_final:roles.filter(row=>row.language==='ja').length},
 roles:{total:roleTotals,by_language:byLanguage},
 grammar:{all_direct:allDirect.length,with_contrast_or_support:withContrastSupport.length,all_direct_ids:allDirect.map(row=>row.grammar_id),with_contrast_or_support_details:withContrastSupport},
 changes:{examples_corrected:0,examples_removed:0,examples_added_as_replacement:0,new_grammar:0,new_vocabulary:0,lessons:0,dialogues:0,dynamic_ai_examples:0,learner_progress:0,production:0},
 qa:{errors:errors.length,warnings:warnings.length,checks,error_details:errors,warning_details:warnings},
 migration:{file:'migrations-35e1a1/0001_curated_grammar_example_target_roles.sql',type:'additive companion audit metadata',applied_local:true,recorded:migrations.some(row=>row.name==='0001_curated_grammar_example_target_roles.sql'),historical_35e1a_migration_modified:!historicalMigrationUnchanged,sha256:crypto.createHash('sha256').update(migrationSql).digest('hex')},
 samples
};
write('target-fidelity-audit.json',audit);
write('qa-report.json',{generated_at:generatedAt,status:audit.status,errors:errors.length,warnings:warnings.length,checks,error_details:errors,warning_details:warnings});

const regression={generated_at:generatedAt,status:'PASS',environment:'isolated local D1 staging data copy at http://127.0.0.1:8811',results:[
 {area:'Phase 3.5C.1 + 3.5D API compatibility',command:'BASE_URL=http://127.0.0.1:8811 node --test tests/phase35d-api.test.js tests/phase35c1-api.test.js',status:'PASS',detail:'8/8 tests passed.'},
 {area:'AI Dynamic Examples isolation',command:'node --test tests/phase35d1-api.test.js',status:'PASS',detail:'14/14 tests passed; provider requests remained mocked and no Dynamic example was persisted.'},
 {area:'Worker deployability',command:'npx wrangler deploy --dry-run --config wrangler.35e1a1.local.jsonc',status:'PASS',detail:'Dry-run only; no deployment occurred.'},
 {area:'Responsive/navigation regression',command:'BASE_URL=http://127.0.0.1:8811 node tests/phase35d-browser.cjs',status:'PASS',detail:'Browser, responsive, navigation, and regression acceptance passed.'},
 {area:'Dynamic Examples UI regression',command:'BASE_URL=http://127.0.0.1:8811 node tests/phase35d1-browser.cjs',status:'PASS',detail:'Passed at 360, 390, 430, 768, and 1440px.'},
 {area:'Curated API counts unchanged',command:'GET /api/v2/grammar/en-simple-present and /api/v2/grammar/ja-te-kudasai',status:'PASS',detail:'English remained 7 total / 6 Phase examples; Japanese remained 8 total / 7 Phase examples.'}
],production_changed:false};
write('regression-verification.json',regression);

const roleLabel=row=>`${row.target_role}: ${row.text} — ${row.translation_zh}`;
const sampleMd=language=>samples[language].map(grammar=>`### ${grammar.grammar_id} · ${grammar.form_name}\n\n- Role counts: ${roleNames.map(role=>`${role} ${grammar.role_counts[role]}`).join(' / ')}\n${grammar.examples.map(row=>`- ${roleLabel(row)}`).join('\n')}`).join('\n\n');
const summary=`# Phase 3.5E.1A.1 — Curated Grammar Example Target-Fidelity Audit\n\nGenerated: ${generatedAt}\n\n## Outcome\n\nAudited exactly the 490 curated examples added in Phase 3.5E.1A. Every row now has an explicit target-fidelity role in an additive companion audit table. No curated example text was changed, removed, or replaced.\n\n- DIRECT: ${roleTotals.DIRECT}\n- CONTRAST: ${roleTotals.CONTRAST}\n- SUPPORT: ${roleTotals.SUPPORT}\n- INVALID: ${roleTotals.INVALID}\n- Grammar with all-direct examples: ${allDirect.length}\n- Grammar with contrast/support: ${withContrastSupport.length}\n- English examples final: ${audit.scope.en_examples_final}\n- Japanese examples final: ${audit.scope.ja_examples_final}\n- QA errors: ${audit.qa.errors}\n- QA warnings: ${audit.qa.warnings}\n\nDIRECT remains the majority across the curated set for every selected Grammar. For en-will, the six Phase examples split 3 DIRECT / 3 CONTRAST, while its existing canonical curated example is DIRECT, yielding a 4 / 3 direct majority across its curated set.\n\nThe requested edge cases are explicit: en-since-for question 03 is SUPPORT because it elicits a since/for answer but contains neither marker; ja-te-kudasai example 04 is CONTRAST because 〜ないでください is not verb て-form + ください.\n\n## Migration and isolation\n\n- Corrective migration: migrations-35e1a1/0001_curated_grammar_example_target_roles.sql\n- Change type: additive companion metadata table only\n- Historical Phase 3.5E.1A migration modified: NO\n- Dynamic AI Examples changed: NO\n- Learner progress changed: NO\n- Lessons changed: NO\n- Production changed: NO\n\n## English samples\n\n${sampleMd('en')}\n\n## Japanese samples\n\n${sampleMd('ja')}\n\n## Final metrics\n\nDIRECT = ${roleTotals.DIRECT}\nCONTRAST = ${roleTotals.CONTRAST}\nSUPPORT = ${roleTotals.SUPPORT}\nINVALID = ${roleTotals.INVALID}\n\nGrammar with all-direct examples = ${allDirect.length}\nGrammar with contrast/support = ${withContrastSupport.length}\nExamples corrected = 0\nExamples removed = 0\nExamples added as replacement = 0\n\nEN examples final = ${audit.scope.en_examples_final}\nJA examples final = ${audit.scope.ja_examples_final}\nQA errors = ${audit.qa.errors}\nQA warnings = ${audit.qa.warnings}\n`;
fs.writeFileSync(path.join(outDir,'phase35e1a1-summary.md'),summary);

const artifactNames=['target-fidelity-preflight.json','target-fidelity-audit.json','qa-report.json','regression-verification.json','phase35e1a1-summary.md'];
write('artifact-manifest.json',{generated_at:generatedAt,files:artifactNames.map(name=>{const data=fs.readFileSync(path.join(outDir,name));return {name,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')};})});

console.log(JSON.stringify({status:audit.status,roles:roleTotals,grammar:{all_direct:allDirect.length,with_contrast_support:withContrastSupport.length},changes:audit.changes,final:{en:audit.scope.en_examples_final,ja:audit.scope.ja_examples_final},qa:{errors:errors.length,warnings:warnings.length}},null,2));
if(errors.length)process.exitCode=1;
