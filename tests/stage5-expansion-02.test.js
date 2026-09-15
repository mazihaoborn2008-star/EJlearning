import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {lessons,lessonPracticeCurriculum,publishedLessonCurriculum} from '../src/lessons-35d.js';
import {practiceSession,resolvePracticeExercise} from '../src/practice-4e.js';
import {lessonRecommendations} from '../src/recommendations-4d.js';
import {grammarContentCorrections,isCurrentGrammarId,isPracticeEligibleGrammarId,overviewOnlyGrammarIds} from '../src/content-quality-03.js';
import {buildStage5Bundle,bundleId,datasetMarker,finalStage5Ids,loadStage5Expansion,newLessonIds,prerequisiteChains,schemaVersion,slotLessonIds} from '../scripts/stage5-expansion-02.js';

const root=new URL('..',import.meta.url).pathname.replace(/^\/(.:)/,'$1'),loaded=loadStage5Expansion(root),{base,bundle,payload,matrix}=loaded;
const migration=fs.readdirSync(`${root}/migrations-stage5-expansion-02`).filter(name=>name.endsWith('.sql')).sort().map(name=>fs.readFileSync(`${root}/migrations-stage5-expansion-02/${name}`,'utf8')).join('\n'),authSigningFixture='stage5-expansion-02-test-signing-fixture-40';
const itemKey=item=>`${item[0]}\0${item[1]}\0${item[2]}`;

function canonicalDatabase({stage5=true}={}){
 const db=new DatabaseSync(':memory:');
 for(const directory of ['migrations-35d','migrations-35e1a','migrations-35e1a2','migrations-35e1b','migrations-35e1c'])for(const file of fs.readdirSync(`${root}/${directory}`).filter(name=>name.endsWith('.sql')).sort())db.exec(fs.readFileSync(`${root}/${directory}/${file}`,'utf8'));
 db.exec('CREATE TABLE IF NOT EXISTS v2_grammar_example_target_audits(example_id TEXT PRIMARY KEY,grammar_id TEXT,rationale_zh TEXT)');
 for(const file of ['migrations-content-quality-01/0001_content_quality_hotfix_01.sql','migrations-content-quality-02/0001_content_quality_hotfix_02.sql','migrations-content-quality-03/0001_content_quality_hotfix_03.sql','migrations-curriculum-expansion-01/0001_curriculum_expansion_01a_bundle.sql'])db.exec(fs.readFileSync(`${root}/${file}`,'utf8'));
 if(stage5)db.exec(migration);
 return db;
}
function d1(sqlite){
 const wrap=(sql,values=[])=>({bind:(...next)=>wrap(sql,next),async first(){return sqlite.prepare(sql).get(...values)||null;},async all(){return {results:sqlite.prepare(sql).all(...values)};},async run(){const result=sqlite.prepare(sql).run(...values);return {success:true,meta:{changes:Number(result.changes)}};}});
 return {prepare:sql=>wrap(sql)};
}

test('immutable approved inputs pass exact hash, authorization, cardinality, and matrix-agreement gates',()=>{
 assert.equal(loaded.hashes.payload,'89b89d86bf2e7187ec437d85cd7141ef82e782cebd306c4a42a885a7e4490818');
 assert.equal(matrix.relationships.length,240);assert.equal(matrix.removals.length,19);
 assert.deepEqual(Object.fromEntries(Object.entries({vocabulary_examples:40,grammar_examples:39,expression_contexts:2,new_dialogues:3,reuse_dialogues:3,short_scenarios:2,lesson_titles:16,readiness_ledger:16}).map(([key])=>[key,payload[key].length])),{vocabulary_examples:40,grammar_examples:39,expression_contexts:2,new_dialogues:3,reuse_dialogues:3,short_scenarios:2,lesson_titles:16,readiness_ledger:16});
 const unauthorized=structuredClone(payload);unauthorized.grammar_examples[0].implementation_authorized=false;assert.throws(()=>buildStage5Bundle(base,unauthorized,matrix),/implementation_authorized/);
 const disagreement=structuredClone(payload);disagreement.readiness_ledger[0].relationships[0].canonical_id='en-c-999999';assert.throws(()=>buildStage5Bundle(base,disagreement,matrix),/disagree/);
 const wrongAuthority=structuredClone(payload);wrongAuthority.authority.human_approval_status='REVIEW REQUIRED';assert.throws(()=>buildStage5Bundle(base,wrongAuthority,matrix),/not HUMAN FINAL APPROVED/);
});

test('the immutable bundle implements exactly 72 lessons, 70 edges, and the 240-link Stage 5 matrix',()=>{
 assert.equal(bundle.v,schemaVersion);assert.equal(bundle.u.length,72);assert.equal(bundle.p.length,70);assert.equal(bundle.i.length,1076);
 const stage5=bundle.i.filter(item=>finalStage5Ids.includes(item[0]));assert.equal(stage5.length,240);assert.equal(new Set(stage5.map(itemKey)).size,240);
 const totals=field=>Object.fromEntries([...new Set(stage5.map(item=>item[field]))].sort().map(value=>[value,stage5.filter(item=>item[field]===value).length]));
 assert.deepEqual(totals(1),{expression:64,grammar:48,vocabulary:128});assert.deepEqual(totals(6),{NEW:104,REVIEW:82,SUPPORT:54});
 for(const id of finalStage5Ids){const rows=stage5.filter(item=>item[0]===id);assert.deepEqual(['vocabulary','grammar','expression'].map(type=>rows.filter(item=>item[1]===type).length),[8,3,4],id);assert.equal(rows.filter(item=>item[1]!=='expression'&&isPracticeEligibleGrammarId(item[2])).length,11,id);}
 assert.equal(stage5.some(item=>item[2]==='en-c-1001'),false);
 for(const row of matrix.removals)assert.equal(stage5.some(item=>item[0]===row.lesson_id&&item[1]===row.content_type&&item[2]===row.content_id),false,itemKey([row.lesson_id,row.content_type,row.content_id]));
 const before=new Set(base.i.filter(item=>item[0].includes('-s5-')).map(itemKey)),after=new Set(stage5.map(itemKey));assert.equal([...after].filter(key=>!before.has(key)).length,137);assert.equal([...before].filter(key=>!after.has(key)).length,19);
 const runtime=bundle.i.filter(item=>item[1]!=='grammar'||isCurrentGrammarId(item[2]));assert.equal(runtime.length,1071);assert.equal(bundle.i.length-runtime.length,5);
});

test('production IDs, exact titles/objectives, ordering, and both prerequisite chains are authored without bypasses',()=>{
 assert.deepEqual(newLessonIds,['en-s5-02-tradeoffs','en-s5-03-consensus','en-s5-06-repair','en-s5-08-reporting','ja-s5-03-formal-role','ja-s5-06-repair','ja-s5-07-consensus','ja-s5-08-benefit']);
 const units=new Map(bundle.u.map(unit=>[unit[0],unit])),titles=new Map(payload.lesson_titles.map(row=>[slotLessonIds[row.slot_id],row]));
 for(const [id,title] of titles){const unit=units.get(id);assert(unit,id);assert.deepEqual([unit[4],unit[5],unit[9]],[title.title_zh,title.objective_zh,title.title_target],id);}
 const parents=new Map(bundle.p.map(edge=>edge));for(const chain of Object.values(prerequisiteChains))for(let index=1;index<chain.length;index++)assert.equal(parents.get(chain[index]),chain[index-1]);
 assert.equal([...parents].filter(([id])=>id.includes('-s5-')||id==='en-s6-l1'||id==='ja-s6-l1').length,18);
 for(const language of ['en','ja']){const languageUnits=bundle.u.filter(unit=>unit[1]===language),roots=languageUnits.filter(unit=>!parents.has(unit[0]));assert.deepEqual(roots.map(unit=>unit[0]),[`${language}-s1-l1`]);for(const unit of languageUnits){let current=unit[0];const seen=new Set();while(parents.has(current)){assert(!seen.has(current));seen.add(current);const next=parents.get(current);assert.equal(units.get(next)[1],language);current=next;}assert.equal(current,roots[0][0]);}}
});

test('migration adds exact editorial examples and contexts once without changing canonical identities',()=>{
 const before=canonicalDatabase({stage5:false}),beforeGrammar=new Map([...new Set(payload.grammar_examples.map(row=>row.canonical_id))].map(id=>[id,before.prepare('SELECT COUNT(*) count FROM v2_grammar_examples WHERE grammar_id=?').get(id).count])),beforeVocabulary=new Map(payload.vocabulary_examples.map(row=>[row.canonical_id,before.prepare('SELECT COUNT(*) count FROM v2_vocabulary_examples WHERE item_id=?').get(row.canonical_id).count]));before.close();
 const db=canonicalDatabase();db.exec(migration);
 assert.equal(db.prepare("SELECT COUNT(*) count FROM v2_vocabulary_examples WHERE id LIKE 'stage5-02-ve-%'").get().count,40);assert.equal(db.prepare("SELECT COUNT(*) count FROM v2_grammar_examples WHERE id LIKE 'stage5-02-ge-%'").get().count,39);assert.equal(db.prepare('SELECT COUNT(*) count FROM v2_expression_context_versions WHERE dataset_marker=?').get(datasetMarker).count,2);assert.equal(db.prepare('SELECT COUNT(*) count FROM lesson_bundles WHERE id=?').get(bundleId).count,1);
 for(const [id,count] of beforeGrammar)assert.equal(db.prepare('SELECT COUNT(*) count FROM v2_grammar_examples WHERE grammar_id=?').get(id).count,count+3,id);
 for(const [id,count] of beforeVocabulary)assert.equal(db.prepare('SELECT COUNT(*) count FROM v2_vocabulary_examples WHERE item_id=?').get(id).count,count+1,id);
 for(const row of payload.vocabulary_examples){const actual=db.prepare("SELECT text,translation_zh FROM v2_vocabulary_examples WHERE item_id=? AND id LIKE 'stage5-02-ve-%'").get(row.canonical_id);assert.deepEqual({...actual},{text:row.sentence,translation_zh:row.translation_zh});}
 for(const row of payload.grammar_examples){const actual=db.prepare("SELECT text,translation_zh FROM v2_grammar_examples WHERE grammar_id=? AND id LIKE 'stage5-02-ge-%' AND id LIKE ?").get(row.canonical_id,`%-${row.example_label.toLowerCase()}`);assert.deepEqual({...actual},{text:row.sentence,translation_zh:row.translation_zh});}
 assert.deepEqual(db.prepare("SELECT language,COUNT(*) total,SUM(publication_state='published') published FROM v2_grammar_points GROUP BY language ORDER BY language").all().map(row=>[row.language,row.total,row.published]),[['en',83,82],['ja',98,97]]);assert.equal(db.prepare('SELECT COUNT(*) count FROM v2_sentence_expressions').get().count,713);assert.equal(db.prepare("SELECT COUNT(*) count FROM lesson_units WHERE status='published'").get().count,72);assert.equal(db.prepare('SELECT COUNT(*) count FROM lesson_prerequisites').get().count,70);
 assert.deepEqual(db.prepare("SELECT lesson_id,prerequisite_lesson_id FROM lesson_prerequisites WHERE lesson_id IN ('en-s5-l1','ja-s5-l1') ORDER BY lesson_id").all().map(row=>[row.lesson_id,row.prerequisite_lesson_id]),[['en-s5-l1','en-s4-l6'],['ja-s5-l1','ja-s4-l6']]);
 assert.deepEqual(JSON.parse(db.prepare('SELECT payload_json FROM lesson_bundles WHERE id=?').get(bundleId).payload_json),bundle);db.close();
});

test('28 safe and 11 unsafe grammar examples govern actual controlled-completion generation',async()=>{
 const db=canonicalDatabase(),DB=d1(db),authority=db.prepare("SELECT example_id,grammar_id,language,cc_safety,answer,answer_start FROM v2_grammar_example_completion_authority WHERE dataset_marker=? ORDER BY example_id").all(datasetMarker);assert.equal(authority.filter(row=>row.cc_safety==='CC SAFE').length,28);assert.equal(authority.filter(row=>row.cc_safety==='NOT FOR CC').length,11);
 for(const row of authority){const example=db.prepare('SELECT text FROM v2_grammar_examples WHERE id=?').get(row.example_id);if(row.cc_safety==='CC SAFE'){assert(row.answer);assert.equal(example.text.slice(row.answer_start,row.answer_start+row.answer.length),row.answer,row.example_id);}else {assert.equal(row.answer,null);assert.equal(row.answer_start,null);}}
 for(const id of [...new Set(authority.filter(row=>row.cc_safety==='CC SAFE').map(row=>row.grammar_id))]){const result=await practiceSession(new URL(`https://test/api/practice/session?type=grammar&mode=selection&content_id=${id}&limit=1`),{DB,CONTENT_DB:DB,AUTH_SECRET:authSigningFixture},{user_id:`cc-${id}`});assert.equal(result.data[0].exercise_type,'grammar_controlled_completion',id);const spec=await resolvePracticeExercise(result.data[0].exercise_id,{DB,CONTENT_DB:DB,AUTH_SECRET:authSigningFixture},{user_id:`cc-${id}`});const approved=authority.find(row=>row.example_id===spec.authority_example_id);assert.equal(approved?.cc_safety,'CC SAFE',id);assert.equal(spec.answer,approved.answer,id);}
 const unsafeSentences=new Set(payload.grammar_examples.filter(row=>row.cc_safety==='NOT FOR CC').map(row=>row.sentence));for(const row of authority.filter(row=>row.cc_safety==='CC SAFE'))assert.equal(unsafeSentences.has(db.prepare('SELECT text FROM v2_grammar_examples WHERE id=?').get(row.example_id).text),false);
 db.close();
});

test('lesson API selects the new bundle, overlays versioned contexts, exposes public assets, and remains zero-write',async()=>{
 const sqlite=canonicalDatabase(),DB=d1(sqlite),before=sqlite.prepare('SELECT total_changes() count').get().count;
 let response=await lessons(new Request('https://test/api/v2/lessons?language=en&stage=5'),DB,DB),body=await response.json();assert.equal(response.status,200);assert.deepEqual(body.data.map(row=>row.id),prerequisiteChains.en.slice(1,-1));
 response=await lessons(new Request('https://test/api/v2/lessons/en-s5-03-consensus'),DB,DB);body=await response.json();assert.equal(response.status,200);assert.equal(body.data.title_target,'Negotiate priorities and reach consensus');assert.deepEqual([body.data.vocabulary.length,body.data.grammar.length,body.data.expressions.length],[8,3,4]);assert.equal(body.data.lesson_assets.filter(asset=>asset.kind==='dialogue')[0].turns.length,6);assert.doesNotMatch(JSON.stringify(body),/implementation_authorized|human_approval_status|cc_answer|cc_safety/);
 response=await lessons(new Request('https://test/api/v2/lessons/en-s5-08-reporting'),DB,DB);body=await response.json();assert.equal(body.data.expressions.find(row=>row.id==='legacy-108-en').context_zh,payload.expression_contexts.find(row=>row.canonical_id==='legacy-108-en').context);
 const curriculum=await lessonPracticeCurriculum(DB,'ja-s5-07-consensus');assert.equal(curriculum.items.length,11);assert.equal((await publishedLessonCurriculum(DB)).lessons.length,72);await practiceSession(new URL('https://test/api/practice/session?context=lesson&lesson_id=ja-s5-07-consensus&type=mixed&mode=mixed&limit=10'),{DB,CONTENT_DB:DB,AUTH_SECRET:authSigningFixture},{user_id:'zero-write'});assert.equal(sqlite.prepare('SELECT total_changes() count').get().count,before);sqlite.close();
});

test('dialogue/scenario/reuse assets are exact, nonduplicated, and keep editorial metadata private',()=>{
 const assets=bundle.a;assert.deepEqual(Object.fromEntries(['dialogue','reuse_prompt','scenario'].map(kind=>[kind,assets.filter(asset=>asset.kind===kind).length])),{dialogue:3,reuse_prompt:3,scenario:2});
 for(const row of payload.new_dialogues){const asset=assets.find(item=>item.kind==='dialogue'&&item.lesson_id===slotLessonIds[row.slot_id]);assert.deepEqual(asset.turns,row.turns.map(turn=>({turn_number:turn.turn_number,speaker:turn.speaker,role:turn.role,text:turn.text,translation_zh:turn.translation_zh})));assert.equal(asset.turns.length,6);}
 for(const row of payload.reuse_dialogues){const asset=assets.find(item=>item.kind==='reuse_prompt'&&item.lesson_id===slotLessonIds[row.slot_id]);assert.deepEqual(asset.canonical_ids,row.canonical_ids);assert.deepEqual(asset.adaptation_prompt_layer,row.adaptation_prompt_layer);assert.equal(Object.hasOwn(asset,'turns'),false);}
 for(const row of payload.short_scenarios)assert.equal(assets.find(item=>item.kind==='scenario'&&item.lesson_id===slotLessonIds[row.slot_id]).scenario,row.scenario);
 assert.doesNotMatch(JSON.stringify(assets),/implementation_authorized|human_approval_status|relationship_ids_intentionally_demonstrated|role_notes/);
 const ja3=assets.find(item=>item.kind==='dialogue'&&item.lesson_id===slotLessonIds.JA3);assert.match(ja3.turns[5].text,/おっしゃいました/);assert.match(ja3.turns[5].text,/いたします/);assert.equal(ja3.turns[5].text.includes('<br>'),false);
});

test('practice density, learner-state safety, Hotfix 01-03, SRS identity, and deployment policy remain bounded',()=>{
 const expected32=new Set(['en-s5-08-reporting']);for(const id of finalStage5Ids){const rows=bundle.i.filter(item=>item[0]===id),opportunities=rows.filter(item=>item[1]==='vocabulary').length*3+rows.filter(item=>item[1]==='grammar').length*2+(expected32.has(id)?2:3);assert.equal(opportunities,expected32.has(id)?32:33,id);assert.equal(Math.min(5,rows.filter(item=>item[1]!=='expression').length),5);}
 const statements=migration.replace(/^--.*$/gm,'');assert.doesNotMatch(statements,/\b(?:INSERT|UPDATE|DELETE)\s+(?:INTO\s+)?(?:lesson_progress|learning_attempts|vocabulary_progress|grammar_progress|srs_items|user_settings)/i);assert.doesNotMatch(statements,/\bDELETE\b/i);assert.match(migration,/INSERT OR IGNORE INTO lesson_bundles/);
 for(const correction of grammarContentCorrections){const db=canonicalDatabase(),actual=db.prepare('SELECT form_name,formula FROM v2_grammar_points WHERE id=?').get(correction.id);assert.deepEqual({...actual},{form_name:correction.form_name,formula:correction.formula});db.close();}
 for(const id of overviewOnlyGrammarIds)assert.equal(isPracticeEligibleGrammarId(id),false);assert.equal(isPracticeEligibleGrammarId('35e1c-ja-counter-system'),true);
 const policy=JSON.parse(fs.readFileSync(`${root}/config/staging-data-policy.json`,'utf8')),lessonsPolicy=policy.datasets.find(row=>row.name==='lessons');assert.deepEqual([lessonsPolicy.version,lessonsPolicy.row_count,lessonsPolicy.checksum,lessonsPolicy.update_migration_config],[datasetMarker,72,`bundle:${bundleId}`,'wrangler.stage5-expansion-02.jsonc']);
 const config=fs.readFileSync(`${root}/wrangler.stage5-expansion-02.jsonc`,'utf8');assert.match(config,/migrations-stage5-expansion-02/);assert.doesNotMatch(config,/migrations-curriculum-expansion-01|migrations-content-quality-03|bootstrap/);
});

test('historical completion, in-progress lessons, Stage 6 grandfathering, and language-isolated recommendations survive the new chain',async()=>{
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('CREATE TABLE lesson_bundles(id TEXT PRIMARY KEY,schema_version TEXT,payload_json TEXT,published_at TEXT);CREATE TABLE lesson_progress(user_id TEXT,lesson_id TEXT,status TEXT,last_activity_at INTEGER,last_section_key TEXT);');sqlite.prepare('INSERT INTO lesson_bundles VALUES(?,?,?,?)').run(bundleId,schemaVersion,JSON.stringify(bundle),'2026-09-15');
 const DB=d1(sqlite),insert=(user,id,status,time)=>sqlite.prepare('INSERT INTO lesson_progress VALUES(?,?,?,?,?)').run(user,id,status,time,status==='completed'?'practice':'grammar');
 for(const id of ['en-s1-l1','en-s1-l2','en-s1-l3','en-s1-l4','en-s2-l1','en-s2-l2','en-s2-l3','en-s2-l4','en-s2-l5','en-s3-l1','en-s3-l2','en-s3-l3','en-s3-l4','en-s3-l5','en-s3-l6','en-s3-l7','en-s3-l8','en-s3-l9','en-s4-l1','en-s4-l2','en-s4-l3','en-s4-l4','en-s4-l5','en-s4-l6','en-s5-l1','en-s5-l2','en-s5-l3','en-s5-l4'])insert('pre-stage6',id,'completed',1);
 let result=await lessonRecommendations(DB,'pre-stage6','en');assert.equal(result.next.id,'en-s5-02-tradeoffs');assert.notEqual(result.next.id,'en-s6-l1');
 insert('in-progress-existing','en-s5-l2','in_progress',20);result=await lessonRecommendations(DB,'in-progress-existing','en');assert.equal(result.continue.id,'en-s5-l2');
 insert('in-progress-stage6','en-s6-l1','in_progress',30);result=await lessonRecommendations(DB,'in-progress-stage6','en');assert.equal(result.continue.id,'en-s6-l1');
 for(const id of ['en-s1-l1','en-s1-l2','en-s1-l3','en-s1-l4','en-s2-l1','en-s2-l2','en-s2-l3','en-s2-l4','en-s2-l5','en-s3-l1','en-s3-l2','en-s3-l3','en-s3-l4','en-s3-l5','en-s3-l6','en-s3-l7','en-s3-l8','en-s3-l9','en-s4-l1','en-s4-l2','en-s4-l3','en-s4-l4','en-s4-l5','en-s4-l6','en-s5-l1','en-s5-l2','en-s5-l3','en-s5-l4','en-s6-l1'])insert('completed-stage6',id,'completed',40);result=await lessonRecommendations(DB,'completed-stage6','en');assert.equal(result.paths.en.next.id,'en-s6-l2');
 result=await lessonRecommendations(DB,'new-ja-user','ja');assert.equal(result.next.id,'ja-s1-l1');assert.equal(result.paths.en.next.id,'en-s1-l1');assert.equal(result.paths.ja.next.id,'ja-s1-l1');
 assert.equal(sqlite.prepare("SELECT COUNT(*) count FROM lesson_progress WHERE status='completed'").get().count,57);assert.equal(sqlite.prepare("SELECT COUNT(*) count FROM lesson_progress WHERE status='in_progress'").get().count,2);sqlite.close();
});
