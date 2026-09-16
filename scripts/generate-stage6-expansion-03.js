import fs from 'node:fs';
import path from 'node:path';
import {bundleId,datasetMarker,loadStage6Expansion,newLessonIds,publishedAt,schemaVersion,slotLessonIds} from './stage6-expansion-03.js';

const root=process.cwd(),directory=path.join(root,'migrations-stage6-expansion-03'),file=path.join(directory,'0004_stage6_expansion_03.sql'),projectionFile=path.join(directory,'0005_stage6_lesson_projection.sql'),reconciliationFile=path.join(directory,'0006_stage6_prerequisite_reconciliation.sql');
const {bundle,payload,delta,counts,typeTotals,roleTotals,hashes}=loadStage6Expansion(root),q=value=>`'${String(value).replaceAll("'","''")}'`;
const statements=[
 '-- Stage 6 Expansion 03: exact human-approved editorial delta and immutable bundle.',
 'PRAGMA foreign_keys=ON;',
 `CREATE TABLE IF NOT EXISTS v2_grammar_example_completion_reviews (
 example_id TEXT PRIMARY KEY REFERENCES v2_grammar_examples(id), grammar_id TEXT NOT NULL, language TEXT NOT NULL CHECK(language IN ('en','ja')),
 cc_safety TEXT NOT NULL CHECK(cc_safety IN ('CC SAFE','NOT FOR CC')), answer TEXT, answer_occurrence INTEGER, answer_start INTEGER, review_note TEXT NOT NULL, dataset_marker TEXT NOT NULL,
 CHECK((cc_safety='CC SAFE' AND answer IS NOT NULL AND length(answer)>0 AND answer_occurrence>=1 AND answer_start>=0) OR (cc_safety='NOT FOR CC' AND answer IS NULL AND answer_occurrence IS NULL AND answer_start IS NULL))
);`,
 `CREATE INDEX IF NOT EXISTS v2_grammar_example_review_lookup ON v2_grammar_example_completion_reviews(grammar_id,language,cc_safety,example_id);`,
 `CREATE TABLE IF NOT EXISTS v2_expression_context_details (
 canonical_id TEXT NOT NULL REFERENCES v2_sentence_expressions(id), dataset_marker TEXT NOT NULL, canonical_text TEXT NOT NULL, scenario TEXT NOT NULL,
 speaker_relationship TEXT NOT NULL, intended_pragmatic_function TEXT NOT NULL, register_constraint TEXT NOT NULL,
 PRIMARY KEY(canonical_id,dataset_marker)
);`
];
payload.vocabulary_examples.forEach((row,index)=>statements.push(`INSERT OR IGNORE INTO v2_vocabulary_examples(id,item_id,sense_id,kind,text,translation_zh,note_zh,readings_json,sort_order) VALUES(${q(`stage6-03-ve-${String(index+1).padStart(2,'0')}-${row.canonical_id}`)},${q(row.canonical_id)},NULL,'example',${q(row.final_sentence)},${q(row.translation_zh)},${q(`${row.register_note} ${row.semantic_fit_note}`)},'[]',${600+index});`));
payload.grammar_examples.forEach((row,index)=>{
 statements.push(`INSERT OR IGNORE INTO v2_grammar_examples(id,grammar_id,language,text,translation_zh,explanation_zh,ipa,readings_json,source_expression_id,sort_order) VALUES(${q(row.example_id)},${q(row.canonical_id)},${q(row.canonical_id.startsWith('en-')?'en':'ja')},${q(row.text)},${q(row.translation_zh)},${q(row.cc_review_note)},NULL,'[]',NULL,${600+index});`);
 statements.push(`INSERT OR IGNORE INTO v2_grammar_example_completion_reviews(example_id,grammar_id,language,cc_safety,answer,answer_occurrence,answer_start,review_note,dataset_marker) VALUES(${q(row.example_id)},${q(row.canonical_id)},${q(row.canonical_id.startsWith('en-')?'en':'ja')},${q(row.cc_safety)},${row.cc_answer===null?'NULL':q(row.cc_answer)},${row.cc_occurrence===null?'NULL':row.cc_occurrence},${row.cc_answer_start===null?'NULL':row.cc_answer_start},${q(row.cc_review_note)},${q(datasetMarker)});`);
 if(row.cc_safety==='CC SAFE')statements.push(`INSERT OR IGNORE INTO v2_grammar_example_completion_authority(example_id,grammar_id,language,cc_safety,answer,answer_start,reason,dataset_marker) VALUES(${q(row.example_id)},${q(row.canonical_id)},${q(row.canonical_id.startsWith('en-')?'en':'ja')},'CC SAFE',${q(row.cc_answer)},${row.cc_answer_start},${q(row.cc_review_note)},${q(datasetMarker)});`);
});
payload.expression_contexts.forEach(row=>{
 statements.push(`INSERT OR IGNORE INTO v2_expression_context_versions(canonical_id,dataset_marker,context,reason) VALUES(${q(row.canonical_id)},${q(datasetMarker)},${q(row.scenario)},${q(`${row.speaker_relationship} ${row.intended_pragmatic_function} ${row.register_constraint}`)});`);
 statements.push(`INSERT OR IGNORE INTO v2_expression_context_details(canonical_id,dataset_marker,canonical_text,scenario,speaker_relationship,intended_pragmatic_function,register_constraint) VALUES(${q(row.canonical_id)},${q(datasetMarker)},${q(row.canonical_text)},${q(row.scenario)},${q(row.speaker_relationship)},${q(row.intended_pragmatic_function)},${q(row.register_constraint)});`);
});
const bundleJson=JSON.stringify(bundle),bundleChunks=[];for(let at=0;at<bundleJson.length;at+=30000)bundleChunks.push(bundleJson.slice(at,at+30000));
statements.push(`CREATE TABLE IF NOT EXISTS stage6_bundle_payload_chunks (sequence INTEGER PRIMARY KEY,chunk TEXT NOT NULL);`);
bundleChunks.forEach((chunk,index)=>statements.push(`INSERT OR IGNORE INTO stage6_bundle_payload_chunks(sequence,chunk) VALUES(${index+1},${q(chunk)});`));
statements.push(`INSERT OR IGNORE INTO lesson_bundles(id,schema_version,payload_json,published_at) SELECT ${q(bundleId)},${q(schemaVersion)},group_concat(chunk,''),${q(publishedAt)} FROM (SELECT chunk FROM stage6_bundle_payload_chunks ORDER BY sequence);`);
statements.push(`DROP TABLE stage6_bundle_payload_chunks;`);
const sql=statements.join('\n\n')+'\n';fs.mkdirSync(directory,{recursive:true});
if(fs.existsSync(file)&&fs.readFileSync(file,'utf8')!==sql&&!process.argv.includes('--refresh'))throw Error('Stage 6 Expansion 03 migration is immutable and differs from approved generated source');
if(!fs.existsSync(file)||process.argv.includes('--refresh'))fs.writeFileSync(file,sql);

const units=new Map(bundle.u.map(unit=>[unit[0],unit])),allStage6=[...Object.values(slotLessonIds)],existing=allStage6.filter(id=>!newLessonIds.includes(id));
const projection=[
 '-- Stage 6 Expansion 03: current lesson index projection from the immutable bundle.',
 '-- Historical bundles and all learner/SRS evidence remain unchanged.',
 'PRAGMA foreign_keys=ON;',
 `UPDATE lesson_units SET sequence=6 WHERE id='en-s6-l4' AND sequence=4;`,
 `UPDATE lesson_units SET sequence=5 WHERE id='en-s6-l3' AND sequence=3;`,
 `UPDATE lesson_units SET sequence=6 WHERE id='ja-s6-l3' AND sequence=3;`,
 `UPDATE lesson_units SET sequence=5 WHERE id='ja-s6-l4' AND sequence=4;`,
 ...existing.map(id=>{const unit=units.get(id);return `UPDATE lesson_units SET topic_id=${q(unit[3])},title=${q(unit[4])},objective=${q(unit[5])},sequence=${unit[6]},status='published',estimated_minutes=${unit[8]} WHERE id=${q(id)};`;}),
 ...newLessonIds.map(id=>{const unit=units.get(id);return `INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES(${q(unit[0])},${q(unit[1])},6,${q(unit[3])},${q(unit[4])},${q(unit[5])},${unit[6]},'published',${unit[8]});`;}),
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s6-04-accountability' WHERE lesson_id='en-s6-l3' AND prerequisite_lesson_id='en-s6-l2';`,
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s6-l4' WHERE lesson_id='ja-s6-l3' AND prerequisite_lesson_id='ja-s6-l2';`,
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s6-04-accountability' WHERE lesson_id='ja-s6-l4' AND prerequisite_lesson_id='ja-s6-l3';`,
 `INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s6-03-synthesis','en-s6-l2');`,
 `INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('en-s6-04-accountability','en-s6-03-synthesis');`,
 `INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s6-03-reporting','ja-s6-l2');`,
 `INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES('ja-s6-04-accountability','ja-s6-03-reporting');`
].join('\n\n')+'\n';
if(fs.existsSync(projectionFile)&&fs.readFileSync(projectionFile,'utf8')!==projection&&!process.argv.includes('--refresh'))throw Error('Stage 6 current-index projection differs from approved generated source');
if(!fs.existsSync(projectionFile)||process.argv.includes('--refresh'))fs.writeFileSync(projectionFile,projection);

const boundaryReconciliations=[
 ['en-s3-l1','en-s2-l4','en-s2-l5'],
 ['en-s4-l1','en-s3-l4','en-s3-l9'],
 ['ja-s3-l1','ja-s2-l4','ja-s2-l6'],
 ['ja-s4-l1','ja-s3-l4','ja-s3-l8']
];
const reconciliation=[
 '-- Stage 6 Expansion 03 staging reconciliation: align four stale current-index boundaries with the immutable bundle.',
 '-- This migration changes only the current prerequisite projection; historical bundles and learner/SRS evidence remain unchanged.',
 'PRAGMA foreign_keys=ON;',
 ...boundaryReconciliations.map(([lessonId,stalePrerequisite,currentPrerequisite])=>`UPDATE lesson_prerequisites SET prerequisite_lesson_id=${q(currentPrerequisite)} WHERE lesson_id=${q(lessonId)} AND prerequisite_lesson_id=${q(stalePrerequisite)};`)
].join('\n\n')+'\n';
if(fs.existsSync(reconciliationFile)&&fs.readFileSync(reconciliationFile,'utf8')!==reconciliation&&!process.argv.includes('--refresh'))throw Error('Stage 6 prerequisite reconciliation differs from approved generated source');
if(!fs.existsSync(reconciliationFile)||process.argv.includes('--refresh'))fs.writeFileSync(reconciliationFile,reconciliation);
console.log(JSON.stringify({bundle_id:bundleId,schema_version:schemaVersion,dataset_marker:datasetMarker,input_hashes:hashes,lessons:bundle.u.length,prerequisites:bundle.p.length,relationships:{raw:counts.raw,runtime_active:counts.runtime_active,stage6:177,types:typeTotals,roles:roleTotals,delta},editorial:{vocabulary_examples:payload.vocabulary_examples.length,grammar_examples:payload.grammar_examples.length,cc_safe:payload.grammar_examples.filter(row=>row.cc_safety==='CC SAFE').length,not_for_cc:payload.grammar_examples.filter(row=>row.cc_safety==='NOT FOR CC').length,expression_contexts:payload.expression_contexts.length,dialogues:payload.new_dialogues.length,reuse_prompts:payload.reuse_prompt_layers.length,scenarios:payload.short_scenarios.length,titles:payload.titles_objectives.length}},null,2));
