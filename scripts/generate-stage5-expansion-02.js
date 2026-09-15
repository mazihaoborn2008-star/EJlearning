import fs from 'node:fs';
import path from 'node:path';
import {isCurrentGrammarId} from '../src/content-quality-03.js';
import {approvedPayloadSha256,bundleId,controlledCompletionAnswerStart,datasetMarker,loadStage5Expansion,publishedAt,schemaVersion} from './stage5-expansion-02.js';

const root=process.cwd(),directory=path.join(root,'migrations-stage5-expansion-02'),file=path.join(directory,'0001_stage5_expansion_02.sql'),projectionFile=path.join(directory,'0002_stage5_lesson_projection.sql');
const {bundle,payload,delta,typeTotals,roleTotals,hashes}=loadStage5Expansion(root),q=value=>`'${String(value).replaceAll("'","''")}'`;
const statements=[
 '-- Stage 5 Expansion 02: exact human-approved editorial delta and immutable current bundle.',
 'PRAGMA foreign_keys=ON;',
 `CREATE TABLE IF NOT EXISTS v2_grammar_example_completion_authority (
 example_id TEXT PRIMARY KEY REFERENCES v2_grammar_examples(id), grammar_id TEXT NOT NULL, language TEXT NOT NULL CHECK(language IN ('en','ja')),
 cc_safety TEXT NOT NULL CHECK(cc_safety IN ('CC SAFE','NOT FOR CC')), answer TEXT, answer_start INTEGER, reason TEXT NOT NULL, dataset_marker TEXT NOT NULL,
 CHECK((cc_safety='CC SAFE' AND answer IS NOT NULL AND length(answer)>0 AND answer_start IS NOT NULL AND answer_start>=0) OR (cc_safety='NOT FOR CC' AND answer IS NULL AND answer_start IS NULL))
);`,
 `CREATE INDEX IF NOT EXISTS v2_grammar_example_cc_lookup ON v2_grammar_example_completion_authority(grammar_id,language,cc_safety,example_id);`,
 `CREATE TABLE IF NOT EXISTS v2_expression_context_versions (
 canonical_id TEXT NOT NULL REFERENCES v2_sentence_expressions(id), dataset_marker TEXT NOT NULL, context TEXT NOT NULL, reason TEXT NOT NULL,
 PRIMARY KEY(canonical_id,dataset_marker)
);`
];
payload.vocabulary_examples.forEach((row,index)=>statements.push(`INSERT OR IGNORE INTO v2_vocabulary_examples(id,item_id,sense_id,kind,text,translation_zh,note_zh,readings_json,sort_order) VALUES(${q(`stage5-02-ve-${String(index+1).padStart(2,'0')}-${row.canonical_id}`)},${q(row.canonical_id)},NULL,'example',${q(row.sentence)},${q(row.translation_zh)},${q(row.reason)},'[]',${500+index});`));
payload.grammar_examples.forEach((row,index)=>{
 const id=`stage5-02-ge-${String(index+1).padStart(2,'0')}-${row.canonical_id}-${row.example_label.toLowerCase()}`;
 statements.push(`INSERT OR IGNORE INTO v2_grammar_examples(id,grammar_id,language,text,translation_zh,explanation_zh,ipa,readings_json,source_expression_id,sort_order) VALUES(${q(id)},${q(row.canonical_id)},${q(row.language)},${q(row.sentence)},${q(row.translation_zh)},${q(row.context_note)},NULL,'[]',NULL,${500+index});`);
 const answerStart=controlledCompletionAnswerStart(row);statements.push(`INSERT OR IGNORE INTO v2_grammar_example_completion_authority(example_id,grammar_id,language,cc_safety,answer,answer_start,reason,dataset_marker) VALUES(${q(id)},${q(row.canonical_id)},${q(row.language)},${q(row.cc_safety)},${row.cc_answer===null?'NULL':q(row.cc_answer)},${answerStart===null?'NULL':answerStart},${q(row.cc_reason)},${q(datasetMarker)});`);
});
payload.expression_contexts.forEach(row=>statements.push(`INSERT OR IGNORE INTO v2_expression_context_versions(canonical_id,dataset_marker,context,reason) VALUES(${q(row.canonical_id)},${q(datasetMarker)},${q(row.context)},${q(row.reason)});`));
statements.push(`INSERT OR IGNORE INTO lesson_bundles(id,schema_version,payload_json,published_at) VALUES(${q(bundleId)},${q(schemaVersion)},${q(JSON.stringify(bundle))},${q(publishedAt)});`);
const sql=statements.join('\n\n')+'\n';fs.mkdirSync(directory,{recursive:true});
if(fs.existsSync(file)&&fs.readFileSync(file,'utf8')!==sql&&!process.argv.includes('--refresh'))throw Error('Stage 5 Expansion 02 migration is immutable and differs from approved generated source');
if(!fs.existsSync(file)||process.argv.includes('--refresh'))fs.writeFileSync(file,sql);
const units=new Map(bundle.u.map(unit=>[unit[0],unit])),newIds=new Set(['en-s5-02-tradeoffs','en-s5-03-consensus','en-s5-06-repair','en-s5-08-reporting','ja-s5-03-formal-role','ja-s5-06-repair','ja-s5-07-consensus','ja-s5-08-benefit']),existingIds=[...units.keys()].filter(id=>id.includes('-s5-')&&!newIds.has(id));
const projection=[
 '-- Stage 5 Expansion 02: current lesson index projection from the immutable bundle.',
 '-- Historical bundle payloads and all learner evidence remain unchanged.',
 'PRAGMA foreign_keys=ON;',
 ...[['en-s5-l4',7],['en-s5-l3',5],['en-s5-l2',4],['ja-s5-l4',5],['ja-s5-l3',4]].map(([id,sequence])=>`UPDATE lesson_units SET sequence=${sequence} WHERE id=${q(id)} AND sequence<>${sequence};`),
 ...existingIds.map(id=>{const unit=units.get(id);return `UPDATE lesson_units SET topic_id=${q(unit[3])},title=${q(unit[4])},objective=${q(unit[5])},sequence=${unit[6]},status='published',estimated_minutes=${unit[8]} WHERE id=${q(id)};`;}),
 ...[...newIds].map(id=>{const unit=units.get(id);return `INSERT OR IGNORE INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status,estimated_minutes) VALUES(${q(unit[0])},${q(unit[1])},5,${q(unit[3])},${q(unit[4])},${q(unit[5])},${unit[6]},'published',${unit[8]});`;}),
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s5-03-consensus' WHERE lesson_id='en-s5-l2' AND prerequisite_lesson_id='en-s5-l1';`,
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s5-06-repair' WHERE lesson_id='en-s5-l4' AND prerequisite_lesson_id='en-s5-l3';`,
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s5-08-reporting' WHERE lesson_id='en-s6-l1' AND prerequisite_lesson_id='en-s5-l4';`,
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s5-03-formal-role' WHERE lesson_id='ja-s5-l3' AND prerequisite_lesson_id='ja-s5-l2';`,
 `UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s5-08-benefit' WHERE lesson_id='ja-s6-l1' AND prerequisite_lesson_id='ja-s5-l4';`,
 ...bundle.p.filter(([lesson])=>newIds.has(lesson)).map(([lesson,parent])=>`INSERT OR IGNORE INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id) VALUES(${q(lesson)},${q(parent)});`)
].join('\n\n')+'\n';
if(fs.existsSync(projectionFile)&&fs.readFileSync(projectionFile,'utf8')!==projection&&!process.argv.includes('--refresh'))throw Error('Stage 5 lesson projection migration is immutable and differs from approved generated source');
if(!fs.existsSync(projectionFile)||process.argv.includes('--refresh'))fs.writeFileSync(projectionFile,projection);
console.log(JSON.stringify({bundle_id:bundleId,schema_version:schemaVersion,dataset_marker:datasetMarker,payload_sha256:approvedPayloadSha256,input_hashes:hashes,lessons:bundle.u.length,prerequisites:bundle.p.length,relationships:{raw:bundle.i.length,runtime_active:bundle.i.filter(item=>item[1]!=='grammar'||isCurrentGrammarId(item[2])).length,stage5:240,types:typeTotals,roles:roleTotals,delta},editorial:{vocabulary_examples:payload.vocabulary_examples.length,grammar_examples:payload.grammar_examples.length,cc_safe:payload.grammar_examples.filter(row=>row.cc_safety==='CC SAFE').length,not_for_cc:payload.grammar_examples.filter(row=>row.cc_safety==='NOT FOR CC').length,expression_contexts:payload.expression_contexts.length,new_dialogues:payload.new_dialogues.length,reuse:payload.reuse_dialogues.length,scenarios:payload.short_scenarios.length,titles:payload.lesson_titles.length}},null,2));
