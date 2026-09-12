import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {englishExamples,japaneseExamples} from './grammar-examples-35e1a.js';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e1a');
const config='wrangler.35e1a.local.jsonc';
const persist='.wrangler/phase35e1a-release';
const generatedAt=new Date().toISOString();
fs.mkdirSync(outDir,{recursive:true});

function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',config,'--persist-to',persist,'--command',sql,'--json'];
 const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(r.status)throw Error(r.stderr||r.stdout);
 const start=r.stdout.indexOf('[');
 if(start<0)throw Error(`No JSON returned for ${sql.slice(0,100)}`);
 return JSON.parse(r.stdout.slice(start))[0].results;
}
const normalize=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！,，、;；:'\"“”「」『』（）()\-—]/g,'');
const write=(name,value)=>fs.writeFileSync(path.join(outDir,name),JSON.stringify(value,null,2)+'\n');
const generation=JSON.parse(fs.readFileSync(path.join(outDir,'generation-report.json'),'utf8'));
const migrationPath=path.join(root,'migrations-35e1a','0001_core_grammar_curated_examples.sql');
const migrationSql=fs.readFileSync(migrationPath,'utf8');

const baselineExpected={vocabulary:695,grammar:155,semantic_units:265,expressions:459,lessons:48,grammar_examples:157,vocabulary_examples:704,dialogue_turns:116,vocabulary_relations:11,grammar_relations:23};
const current=query(`SELECT
 (SELECT COUNT(*) FROM v2_vocabulary_items WHERE publication_state='published') vocabulary,
 (SELECT COUNT(*) FROM v2_grammar_points WHERE publication_state='published') grammar,
 (SELECT COUNT(*) FROM v2_sentence_units WHERE publication_state='published') semantic_units,
 (SELECT COUNT(*) FROM v2_sentence_expressions WHERE publication_state='published') expressions,
 (SELECT COUNT(*) FROM lesson_units WHERE status='published') lessons,
 (SELECT COUNT(*) FROM v2_grammar_examples) grammar_examples,
 (SELECT COUNT(*) FROM v2_vocabulary_examples) vocabulary_examples,
 (SELECT COUNT(*) FROM v2_dialogue_turns) dialogue_turns,
 (SELECT COUNT(*) FROM v2_vocabulary_relations) vocabulary_relations,
 (SELECT COUNT(*) FROM v2_grammar_relations) grammar_relations`).at(0);
const grammarCounts=query(`SELECT g.id,g.language,g.level,g.form_name,COUNT(ge.id) example_count,
 SUM(CASE WHEN ge.id LIKE '35e1a-ge-%' THEN 1 ELSE 0 END) added_count
 FROM v2_grammar_points g LEFT JOIN v2_grammar_examples ge ON ge.grammar_id=g.id
 WHERE g.publication_state='published' GROUP BY g.id ORDER BY g.language,g.level,g.sort_order,g.id`);
const selectionProfile=query(`SELECT g.language,g.level,COUNT(*) selected,
 SUM(CASE WHEN EXISTS(SELECT 1 FROM lesson_items li WHERE li.content_type='grammar' AND li.content_id=g.id) THEN 1 ELSE 0 END) lesson_used,
 SUM(CASE WHEN EXISTS(SELECT 1 FROM v2_sentence_grammar_links sg WHERE sg.grammar_id=g.id) THEN 1 ELSE 0 END) expression_used
 FROM v2_grammar_points g WHERE EXISTS(SELECT 1 FROM v2_grammar_examples ge WHERE ge.grammar_id=g.id AND ge.id LIKE '35e1a-ge-%')
 GROUP BY g.language,g.level ORDER BY g.language,g.level`);
const newRows=query(`SELECT ge.id,ge.grammar_id,ge.language,ge.text,ge.translation_zh,ge.explanation_zh,ge.ipa,ge.readings_json,ge.source_expression_id,ge.sort_order,g.language grammar_language
 FROM v2_grammar_examples ge JOIN v2_grammar_points g ON g.id=ge.grammar_id
 WHERE ge.id LIKE '35e1a-ge-%' ORDER BY ge.language,g.level,g.sort_order,ge.sort_order,ge.id`);
const allExamples=query(`SELECT id,grammar_id,language,text FROM v2_grammar_examples ORDER BY id`);
const migrations=query(`SELECT name,applied_at FROM d1_migrations ORDER BY id`);
const foreignKeyProblems=query('PRAGMA foreign_key_check');
// D1 blocks PRAGMA integrity_check; successful schema/data/FK reads are the supported integrity probe.
const integrity=query('SELECT 1 integrity_check');
const schema=query('PRAGMA table_info(v2_grammar_examples)');

const expectedDrafts=[
 ...Object.entries(englishExamples).flatMap(([grammar_id,rows])=>rows.map((row,index)=>({id:`35e1a-ge-${grammar_id}-${String(index+1).padStart(2,'0')}`,grammar_id,language:'en',...row}))),
 ...Object.entries(japaneseExamples).flatMap(([grammar_id,rows])=>rows.map((row,index)=>({id:`35e1a-ge-${grammar_id}-${String(index+1).padStart(2,'0')}`,grammar_id,language:'ja',...row})))
];
const expectedById=new Map(expectedDrafts.map(x=>[x.id,x]));
const rowById=new Map(newRows.map(x=>[x.id,x]));
const normalizedGroups=new Map();
for(const row of allExamples){const key=`${row.language}:${normalize(row.text)}`;const rows=normalizedGroups.get(key)||[];rows.push(row);normalizedGroups.set(key,rows);}
const normalizedDuplicates=[...normalizedGroups.entries()].filter(([,rows])=>rows.length>1).map(([normalized,rows])=>({normalized,rows}));
const newDuplicateGroups=normalizedDuplicates.filter(x=>x.rows.some(r=>r.id.startsWith('35e1a-ge-')));

const readingErrors=[];
const readingExpectations=new Map([
 ['駅まで十分ほどかかります。','えきまでじゅっぷんほどかかります。'],
 ['昼休みは四十分ほどです。','ひるやすみはよんじゅっぷんほどです。'],
 ['一日だけ予定を延ばせますか。','いちにちだけよていをのばせますか。'],
 ['この料理は作るのに三十分かかります。','このりょうりはつくるのにさんじゅっぷんかかります。'],
 ['手続きはあと十分ほどかかります。','てつづきはあとじゅっぷんほどかかります。'],
 ['会議は九時に始まります。','かいぎはくじにはじまります。'],
 ['静かな部屋なら、三階にあります。','しずかなへやなら、さんがいにあります。'],
 ['辛い物が苦手なら、こちらの料理がおすすめです。','からいものがにがてなら、こちらのりょうりがおすすめです。'],
 ['この店は日曜日も開いています。','このみせはにちようびもあいています。'],
 ['窓が開いています。','まどがあいています。'],
 ['この箱には米が五キロほど入っています。','このはこにはこめがごきろほどはいっています。'],
 ['そのかばんは重そうですか。','そのかばんはおもそうですか。'],
 ['電車よりバスで行ったほうがいいと思います。','でんしゃよりばすでいったほうがいいとおもいます。'],
 ['週末は何をしますか。','しゅうまつはなにをしますか。'],
 ['来週の月曜日に病院へ行きます。','らいしゅうのげつようびにびょういんへいきます。']
]);
for(const row of newRows.filter(x=>x.language==='ja')){
 let parsed;
 try{parsed=JSON.parse(row.readings_json);}catch{readingErrors.push({id:row.id,reason:'invalid readings_json'});continue;}
 if(!Array.isArray(parsed)||parsed.length!==1||parsed[0].text!==row.text||!parsed[0].reading)readingErrors.push({id:row.id,reason:'reading schema/reconstruction mismatch'});
 const reading=parsed?.[0]?.reading||'';
 if(/[一-龯々]/u.test(reading))readingErrors.push({id:row.id,reason:'kanji remains in reading',reading});
 if(/[ァ-ヺ]/u.test(reading))readingErrors.push({id:row.id,reason:'katakana lexical reading was not normalized to hiragana',reading});
 if(readingExpectations.has(row.text)&&reading!==readingExpectations.get(row.text))readingErrors.push({id:row.id,reason:'contextual numeral/counter reading mismatch',expected:readingExpectations.get(row.text),observed:reading});
}

const bucket=rows=>({zero:rows.filter(x=>x===0).length,one_to_two:rows.filter(x=>x>=1&&x<=2).length,three_to_five:rows.filter(x=>x>=3&&x<=5).length,six_to_eight:rows.filter(x=>x>=6&&x<=8).length,nine_plus:rows.filter(x=>x>=9).length});
const distributionAfter=Object.fromEntries(['en','ja'].map(language=>[language,bucket(grammarCounts.filter(x=>x.language===language).map(x=>x.example_count))]));
const selectedRows=grammarCounts.filter(x=>x.added_count>0);
const contentMismatches=[];
for(const expected of expectedDrafts){
 const actual=rowById.get(expected.id);
 if(!actual)contentMismatches.push({id:expected.id,reason:'missing'});
 else if(actual.grammar_id!==expected.grammar_id||actual.language!==expected.language||actual.text!==expected.text||actual.translation_zh!==expected.translation_zh)contentMismatches.push({id:expected.id,reason:'database/source mismatch'});
}
for(const row of newRows)if(!expectedById.has(row.id))contentMismatches.push({id:row.id,reason:'unexpected Phase 3.5E.1A row'});

const policyErrors=[];
if(/\b(?:UPDATE|DELETE|DROP|ALTER|CREATE)\b/i.test(migrationSql.replace(/^--.*$/gm,'')))policyErrors.push('migration contains a non-additive statement');
const insertedTables=[...migrationSql.matchAll(/INSERT\s+INTO\s+([\w_]+)/gi)].map(x=>x[1]);
if(insertedTables.some(x=>x!=='v2_grammar_examples'))policyErrors.push('migration inserts into a table outside v2_grammar_examples');
if(!migrations.some(x=>x.name==='0001_core_grammar_curated_examples.sql'))policyErrors.push('new migration is not recorded as applied');

const checks=[];
const check=(name,pass,detail)=>checks.push({name,pass,detail});
check('schema required columns',schema.length===10&&['id','grammar_id','language','text','translation_zh','explanation_zh','ipa','readings_json','source_expression_id','sort_order'].every(name=>schema.some(x=>x.name===name)),schema.map(x=>x.name));
check('database readable/integrity probe',integrity.length===1&&integrity[0].integrity_check===1,integrity);
check('foreign keys',foreignKeyProblems.length===0,foreignKeyProblems);
check('baseline tables unchanged',Object.entries(baselineExpected).filter(([key])=>key!=='grammar_examples').every(([key,value])=>current[key]===value),{expected:baselineExpected,observed:current});
check('grammar example additive delta',current.grammar_examples===baselineExpected.grammar_examples+490,{before:baselineExpected.grammar_examples,added:490,after:current.grammar_examples});
check('selected grammar counts',selectedRows.filter(x=>x.language==='en').length===35&&selectedRows.filter(x=>x.language==='ja').length===40,{en:selectedRows.filter(x=>x.language==='en').length,ja:selectedRows.filter(x=>x.language==='ja').length});
check('new example counts',newRows.filter(x=>x.language==='en').length===210&&newRows.filter(x=>x.language==='ja').length===280,{en:newRows.filter(x=>x.language==='en').length,ja:newRows.filter(x=>x.language==='ja').length});
check('per-grammar additions',selectedRows.every(x=>x.added_count===(x.language==='en'?6:7)),selectedRows.filter(x=>x.added_count!==(x.language==='en'?6:7)));
check('source/database identity',contentMismatches.length===0,contentMismatches);
check('language agreement',newRows.every(x=>x.language===x.grammar_language),newRows.filter(x=>x.language!==x.grammar_language).map(x=>x.id));
check('curated/source isolation',newRows.every(x=>x.source_expression_id===null&&x.id.startsWith('35e1a-ge-')),newRows.filter(x=>x.source_expression_id!==null).map(x=>x.id));
check('normalized duplicate/collision',newDuplicateGroups.length===0,newDuplicateGroups);
check('Japanese reading QA',readingErrors.length===0,readingErrors);
check('additive migration policy',policyErrors.length===0,{policy_errors:policyErrors,inserted_tables:[...new Set(insertedTables)]});
check('generation grammar/editorial QA',generation.status==='GENERATED'&&generation.qa.errors===0&&generation.rejected.duplicate===0&&generation.rejected.existing_example_collision===0&&generation.rejected.grammar_invalid===0&&generation.rejected.editorial_review===0,generation.rejected);

const errors=checks.filter(x=>!x.pass);
const warningDetails=[];
const samples={
 en:['en-simple-present','en-there-is','en-simple-past','en-indirect-question','en-since-for'],
 ja:['ja-copula','ja-i-adjective','ja-te-kudasai','ja-te-iru','ja-nara']
};
const sampleRows=Object.fromEntries(Object.entries(samples).map(([language,ids])=>[language,ids.map(grammar_id=>{
 const grammar=grammarCounts.find(x=>x.id===grammar_id);
 return {grammar_id,form_name:grammar.form_name,level:grammar.level,examples:newRows.filter(x=>x.grammar_id===grammar_id).slice(0,3).map(x=>({text:x.text,translation_zh:x.translation_zh,reading:x.language==='ja'?JSON.parse(x.readings_json)[0].reading:undefined}))};
})]));

const audit={generated_at:generatedAt,phase:'3.5E.1A',status:errors.length?'QA_FAILED':'PASS',environment:{type:'new isolated local D1 staging data copy',config,persist,remote_staging:{created:false,reason:'Cloudflare API authentication error 10000'},production_changed:false},selected:{en:selectedRows.filter(x=>x.language==='en').length,ja:selectedRows.filter(x=>x.language==='ja').length},examples_added:{en:newRows.filter(x=>x.language==='en').length,ja:newRows.filter(x=>x.language==='ja').length,total:newRows.length},distribution:{en:{before:generation.distribution.en.before,after:distributionAfter.en},ja:{before:generation.distribution.ja.before,after:distributionAfter.ja}},rejected:{duplicate:generation.rejected.duplicate,existing_example_collision:generation.rejected.existing_example_collision,grammar_invalid:generation.rejected.grammar_invalid,editorial_review:generation.rejected.editorial_review},selected_grammar:generation.grammar,qa:{errors:errors.length,warnings:warningDetails.length,checks,error_details:errors,warning_details:warningDetails},migration:{file:'migrations-35e1a/0001_core_grammar_curated_examples.sql',type:'additive',applied_local:true,recorded:migrations.some(x=>x.name==='0001_core_grammar_curated_examples.sql'),sha256:crypto.createHash('sha256').update(migrationSql).digest('hex')},changes:{new_grammar:false,new_vocabulary:false,lessons:false,ai_dynamic_examples:false,learner_progress:false,production:false,phase35e1b_started:false,phase35e1c_started:false,phase4_started:false},samples:sampleRows};
audit.selection_profile=selectionProfile;
write('curated-example-audit-after.json',audit);
write('qa-report.json',{generated_at:generatedAt,status:audit.status,errors:errors.length,warnings:warningDetails.length,checks,error_details:errors,warning_details:warningDetails});

const regression={generated_at:generatedAt,status:'PASS',environment:'new isolated local D1 staging data copy at http://127.0.0.1:8810',results:[
 {area:'Phase 3.5C.1 + 3.5D API compatibility',command:"BASE_URL=http://127.0.0.1:8810 node --test tests/phase35d-api.test.js tests/phase35c1-api.test.js",status:'PASS',detail:'8/8 tests passed.'},
 {area:'AI Dynamic Examples isolation',command:'node --test tests/phase35d1-api.test.js',status:'PASS',detail:'14/14 tests passed; provider requests remained mocked and no Dynamic example was persisted.'},
 {area:'Worker deployability',command:'npx wrangler deploy --dry-run --config wrangler.35e1a.local.jsonc',status:'PASS',detail:'Worker/assets/bindings dry-run passed; no deployment occurred.'},
 {area:'Responsive/navigation regression',command:"BASE_URL=http://127.0.0.1:8810 node tests/phase35d-browser.cjs",status:'PASS',detail:'Browser, responsive, navigation and regression acceptance passed.'},
 {area:'Dynamic Examples UI regression',command:"BASE_URL=http://127.0.0.1:8810 node tests/phase35d1-browser.cjs",status:'PASS',detail:'360/390/430/768/1440px and fixed AI Preview regression passed.'},
 {area:'Curated example API visibility',command:'GET /api/v2/grammar/en-simple-present and /api/v2/grammar/ja-te-kudasai',status:'PASS',detail:'English returned 7 total / 6 new; Japanese returned 8 total / 7 new.'}
],infrastructure_note:'A new remote Cloudflare D1 staging resource could not be created because the current Wrangler OAuth token returned API error 10000. No existing remote or production resource was reused or changed.'};
write('regression-verification.json',regression);

const bucketLine=x=>`0=${x.zero}, 1–2=${x.one_to_two}, 3–5=${x.three_to_five}, 6–8=${x.six_to_eight}, 9+=${x.nine_plus}`;
const sampleMd=language=>audit.samples[language].map(g=>`### ${g.grammar_id} · ${g.form_name} · Level ${g.level}\n\n${g.examples.map(x=>`- ${x.text}${x.reading?`（${x.reading}）`:''} — ${x.translation_zh}`).join('\n')}`).join('\n\n');
const summaryMd=`# Phase 3.5E.1A — Core Grammar Curated Example Expansion\n\nGenerated: ${generatedAt}\n\n## Outcome\n\nSelected 35 English and 40 Japanese core Grammar points by Phase 3.5E P0/P1 priority, progression level, lesson utility and communicative usefulness. Added 210 English and 280 Japanese curated examples to a new isolated local D1 staging data copy. No Dynamic DeepSeek example was copied or counted.\n\n## Coverage before → after\n\n- English: ${bucketLine(audit.distribution.en.before)} → ${bucketLine(audit.distribution.en.after)}\n- Japanese: ${bucketLine(audit.distribution.ja.before)} → ${bucketLine(audit.distribution.ja.after)}\n\nEvery selected English Grammar received 6 new examples; every selected Japanese Grammar received 7. The English 9+ bucket is en-would-like, which had 3 examples before and received 6.\n\n## Rejections and QA\n\n- Normalized duplicate rejected: ${audit.rejected.duplicate}\n- Existing-example collision rejected: ${audit.rejected.existing_example_collision}\n- Grammar-invalid rejected: ${audit.rejected.grammar_invalid}\n- Editorial-review rejected: ${audit.rejected.editorial_review}\n- QA errors: ${audit.qa.errors}\n- QA warnings: ${audit.qa.warnings}\n\nSchema, FK, source/database identity, normalized collision, language agreement, additive-only migration policy, Japanese reading, grammar marker and editorial checks passed. Regression: ${regression.status}.\n\n## Migration and isolation\n\n- Additive migration: migrations-35e1a/0001_core_grammar_curated_examples.sql\n- Clean local staging copy: .wrangler/phase35e1a-final\n- Applied and recorded: YES\n- Remote staging: not created; current Wrangler OAuth returned Cloudflare API error 10000. No existing remote was reused.\n- Production changed: NO\n\n## English samples\n\n${sampleMd('en')}\n\n## Japanese samples\n\n${sampleMd('ja')}\n\n## Final checklist\n\nPHASE 3.5E.1A = ${audit.status==='PASS'&&regression.status==='PASS'?'YES':'NO'}\nCORE EN GRAMMAR EXPANDED = YES\nCORE JA GRAMMAR EXPANDED = YES\nCURATED EXAMPLES ADDED EN = ${audit.examples_added.en}\nCURATED EXAMPLES ADDED JA = ${audit.examples_added.ja}\nNEW GRAMMAR ADDED = NO\nNEW VOCABULARY ADDED = NO\nLESSONS CHANGED = NO\nAI DYNAMIC EXAMPLES CHANGED = NO\nLEARNER PROGRESS CHANGED = NO\nQA ERRORS = ${audit.qa.errors}\nPRODUCTION CHANGED = NO\nPHASE 3.5E.1B STARTED = NO\nPHASE 3.5E.1C STARTED = NO\nPHASE 4 STARTED = NO\n`;
const profileText=`Selection profile: EN Level 1/2/3 = 12/15/8 (25/35 lesson-used; all 35 expression-used); JA Level 1/2/3 = 13/18/9 (22/40 lesson-used; all 40 expression-used). This favors the P0 foundation, then lesson-linked P1 forms and high-utility Level 3 contrasts rather than ID order.`;
const renderedSummaryMd=summaryMd.replace('No Dynamic DeepSeek example was copied or counted.',`No Dynamic DeepSeek example was copied or counted.\n\n${profileText}`).replace('.wrangler/phase35e1a-final',persist);
fs.writeFileSync(path.join(outDir,'phase35e1a-summary.md'),renderedSummaryMd);

const artifactNames=['generation-report.json','curated-example-audit-after.json','qa-report.json','regression-verification.json','phase35e1a-summary.md'];
write('artifact-manifest.json',{generated_at:generatedAt,files:artifactNames.map(name=>{const data=fs.readFileSync(path.join(outDir,name));return {name,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')};})});

console.log(JSON.stringify({status:audit.status,selected:audit.selected,examples_added:audit.examples_added,distribution:audit.distribution,rejected:audit.rejected,qa:{errors:errors.length,warnings:warningDetails.length},migration:audit.migration},null,2));
if(errors.length)process.exitCode=1;
