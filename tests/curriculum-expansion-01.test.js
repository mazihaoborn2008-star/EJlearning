import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {isPracticeEligibleGrammarId} from '../src/content-quality-02.js';
import {lessons} from '../src/lessons-35d.js';
import {bundleId,deferredPairs,loadExpansion,prerequisiteReplacements,targetLessons} from '../scripts/curriculum-expansion-01.js';

const root=new URL('..',import.meta.url).pathname.replace(/^\/(.:)/,'$1');
const {matrix,base,bundle}=loadExpansion(root);
const targetSet=new Set(targetLessons),migration=fs.readFileSync(new URL('../migrations-curriculum-expansion-01/0001_curriculum_expansion_01a_bundle.sql',import.meta.url),'utf8');
const itemKey=item=>`${item[0]}\0${item[1]}\0${item[2]}`;
const rowKey=row=>`${row.lesson_id}\0${row.content_type}\0${row.content_id}`;
const expected={
 'en-s2-l5':[7,3,4,10,29],'en-s3-l5':[8,3,4,11,32],'en-s3-l6':[8,2,4,10,29],'en-s3-l7':[7,3,4,10,29],
 'en-s3-l8':[8,2,4,10,30],'en-s3-l9':[8,3,4,11,31],'en-s4-l5':[8,3,3,11,31],'en-s4-l6':[8,3,4,11,32],
 'ja-s2-l5':[7,3,3,10,30],'ja-s2-l6':[8,3,4,11,33],'ja-s3-l5':[8,3,4,10,29],'ja-s3-l6':[8,3,4,11,32],
 'ja-s3-l7':[8,3,4,10,29],'ja-s3-l8':[8,2,4,9,26],'ja-s4-l5':[8,3,4,11,31],'ja-s4-l6':[8,3,4,9,27]
};

function canonicalDatabase(){
 const db=new DatabaseSync(':memory:');
 for(const directory of ['migrations-35d','migrations-35e1a','migrations-35e1a2','migrations-35e1b','migrations-35e1c'])for(const file of fs.readdirSync(`${root}/${directory}`).filter(name=>name.endsWith('.sql')).sort())db.exec(fs.readFileSync(`${root}/${directory}/${file}`,'utf8'));
 db.exec('CREATE TABLE IF NOT EXISTS v2_grammar_example_target_audits(example_id TEXT PRIMARY KEY,grammar_id TEXT,rationale_zh TEXT)');
 db.exec(fs.readFileSync(`${root}/migrations-content-quality-01/0001_content_quality_hotfix_01.sql`,'utf8'));
 db.exec(fs.readFileSync(`${root}/migrations-content-quality-02/0001_content_quality_hotfix_02.sql`,'utf8'));
 return db;
}

function d1(sqlite){
 const wrap=(sql,values=[])=>({bind:(...next)=>wrap(sql,next),async first(){return sqlite.prepare(sql).get(...values)||null;},async all(){return {results:sqlite.prepare(sql).all(...values)};},async run(){const result=sqlite.prepare(sql).run(...values);return {success:true,meta:{changes:Number(result.changes)}};}});
 return {prepare:sql=>wrap(sql)};
}

test('generated payload is an exact relationship-level implementation of the approved matrix',()=>{
 const targetItems=bundle.i.filter(item=>targetSet.has(item[0]));
 assert.equal(targetItems.length,232);assert.equal(bundle.i.length-base.i.length,105);
 const actual=new Map(targetItems.map(item=>[itemKey(item),item[6]]));
 const approved=new Map(matrix.approved.map(row=>[rowKey(row),row.instructional_role]));
 assert.deepEqual(actual,approved);
 assert.equal(new Set(targetItems.map(itemKey)).size,232);
 for(const [lesson,id] of deferredPairs)assert.equal(targetItems.some(item=>item[0]===lesson&&item[2]===id),false,`${id} -> ${lesson}`);
 assert.equal(actual.get('ja-s3-l5\0vocabulary\0ja-c-663'),'SUPPORT');
 assert.equal(actual.get('ja-s3-l7\0expression\0legacy-167-ja'),'NEW');
});

test('addition counts are exact by language and type, and no other lesson composition changes',()=>{
 const count=(language,type)=>matrix.additions.filter(row=>row.lesson_id.startsWith(language+'-')&&row.content_type===type).length;
 assert.deepEqual(['vocabulary','grammar','expression'].map(type=>count('en',type)),[22,6,23]);
 assert.deepEqual(['vocabulary','grammar','expression'].map(type=>count('ja',type)),[24,7,23]);
 assert.equal(matrix.additions.length,105);
 const before=base.i.filter(item=>!targetSet.has(item[0])).map(item=>item.slice(0,6));
 const after=bundle.i.filter(item=>!targetSet.has(item[0])).map(item=>item.slice(0,6));
 assert.deepEqual(after,before);
 const baseByKey=new Map(base.i.map(item=>[itemKey(item),item]));
 for(const item of bundle.i.filter(item=>targetSet.has(item[0])&&baseByKey.has(itemKey(item))))assert.deepEqual(item.slice(0,6),baseByKey.get(itemKey(item)));
 for(const item of bundle.i.filter(item=>!baseByKey.has(itemKey(item))))assert.deepEqual([item[3],item[5]],['support',0]);
});

test('approved densities, Hotfix 02 assessability, completion gates, and opportunity estimates are exact',()=>{
 for(const lesson of targetLessons){
  const rows=matrix.approved.filter(row=>row.lesson_id===lesson),counts=['vocabulary','grammar','expression'].map(type=>rows.filter(row=>row.content_type===type).length);
  const assessable=rows.filter(row=>row.content_type==='vocabulary'||row.content_type==='grammar'&&isPracticeEligibleGrammarId(row.content_id));
  const opportunities=rows.filter(row=>row.content_type==='vocabulary').length*3+rows.filter(row=>row.content_type==='grammar'&&isPracticeEligibleGrammarId(row.content_id)).reduce((n,row)=>n+2+(row.evidence.includes('CC yes')?1:0),0);
  assert.deepEqual([...counts,assessable.length,opportunities],expected[lesson],lesson);
  assert.equal(Math.min(5,assessable.length),5,`${lesson} required_items`);
 }
 assert.equal(expected['ja-s3-l8'][3],9);assert.equal(expected['ja-s4-l6'][3],9);
 for(const id of ['35e1c-ja-condition-contrast','35e1c-ja-workplace-register'])assert.equal(isPracticeEligibleGrammarId(id),false);
 assert.equal(isPracticeEligibleGrammarId('35e1c-ja-counter-system'),true);
});

test('exactly six prerequisite edges change and the 64-lesson graph is connected, acyclic, and language-safe',()=>{
 const before=new Map(base.p.map(edge=>[edge[0],edge[1]])),after=new Map(bundle.p.map(edge=>[edge[0],edge[1]]));
 const changed=[...after].filter(([lesson,prerequisite])=>before.get(lesson)!==prerequisite);
 assert.deepEqual(changed,prerequisiteReplacements.map(([lesson,,replacement])=>[lesson,replacement]));
 assert.equal(bundle.u.length,64);assert.equal(bundle.p.length,62);
 const units=new Map(bundle.u.map(unit=>[unit[0],unit]));
 for(const language of ['en','ja']){
  const languageUnits=bundle.u.filter(unit=>unit[1]===language),roots=languageUnits.filter(unit=>!after.has(unit[0]));
  assert.deepEqual(roots.map(unit=>unit[0]),[`${language}-s1-l1`]);
  for(const unit of languageUnits){const seen=new Set();let current=unit[0];while(after.has(current)){assert.equal(seen.has(current),false,`cycle at ${current}`);seen.add(current);const parent=after.get(current);assert(units.has(parent),`missing ${parent}`);assert.equal(units.get(parent)[1],language,`${current} cross-language`);current=parent;}assert.equal(current,roots[0][0],`${unit[0]} unreachable`);}
 }
});

test('all additions resolve to published same-language canonical records and canonical data is unchanged',()=>{
 const db=canonicalDatabase(),tables={vocabulary:'v2_vocabulary_items',grammar:'v2_grammar_points',expression:'v2_sentence_expressions'};
 const canonicalCounts=()=>({
  grammar:db.prepare("SELECT language,COUNT(*) total,SUM(publication_state='published') published FROM v2_grammar_points GROUP BY language ORDER BY language").all(),
  expressions:db.prepare('SELECT COUNT(*) total FROM v2_sentence_expressions').get().total
 });
 const before=canonicalCounts();assert.deepEqual(before.grammar.map(row=>[row.language,row.total,row.published]),[['en',83,82],['ja',98,97]]);assert.equal(before.expressions,713);
 for(const row of matrix.additions){const canonical=db.prepare(`SELECT language,publication_state FROM ${tables[row.content_type]} WHERE id=?`).get(row.content_id);assert(canonical,`${row.content_type}:${row.content_id}`);assert.equal(canonical.language,row.lesson_id.slice(0,2));assert.equal(canonical.publication_state,'published');}
 db.exec(migration);db.exec(migration);
 assert.deepEqual(canonicalCounts(),before);
 const persisted=JSON.parse(db.prepare('SELECT payload_json FROM lesson_bundles WHERE id=?').get(bundleId).payload_json);assert.deepEqual(persisted,bundle);
 const policy=JSON.parse(fs.readFileSync(`${root}/config/staging-data-policy.json`,'utf8')),datasets=Object.fromEntries(policy.datasets.map(row=>[row.name,row]));
 assert.deepEqual([datasets.en_vocabulary.row_count,datasets.ja_vocabulary.row_count],[10000,8235]);
 assert.deepEqual([datasets.lessons.row_count,datasets.lessons.version,datasets.lessons.checksum,datasets.lessons.update_migration_config],[72,'2026-09-stage5-expansion-02-v1','bundle:curriculum-stage5-expansion-02-v1','wrangler.stage5-expansion-02.jsonc']);
 db.close();
});

test('migration is bundle-only, additive, idempotent, and does not touch learner evidence',()=>{
 const statements=migration.replace(/^--.*$/gm,'');
 assert.doesNotMatch(statements,/\b(?:INSERT|UPDATE|DELETE)\s+(?:INTO\s+)?(?:v2_|lesson_progress|learning_attempts|vocabulary_progress|grammar_progress)/i);
 assert.match(migration,/INSERT OR IGNORE INTO lesson_bundles/);
 const empty=new DatabaseSync(':memory:');empty.exec(migration);empty.exec(migration);assert.equal(empty.prepare('SELECT COUNT(*) count FROM lesson_bundles WHERE id=?').get(bundleId).count,1);empty.close();
});

test('lesson API serializes instructional roles and safely reads historical six-column bundles',async()=>{
 const sqlite=canonicalDatabase();sqlite.exec(migration);const DB=d1(sqlite);
 let response=await lessons(new Request('https://ej-learning.test/api/v2/lessons/ja-s3-l5'),DB,DB),body=await response.json();assert.equal(response.status,200);
 const serialized=[...body.data.vocabulary,...body.data.grammar,...body.data.expressions],approved=matrix.approved.filter(row=>row.lesson_id==='ja-s3-l5');
 assert.deepEqual(new Map(serialized.map(item=>[item.id,item.instructional_role])),new Map(approved.map(row=>[row.content_id,row.instructional_role])));
 sqlite.prepare('DELETE FROM lesson_bundles WHERE id=?').run(bundleId);
 response=await lessons(new Request('https://ej-learning.test/api/v2/lessons/ja-s3-l5'),DB,DB);body=await response.json();assert.equal(response.status,200);assert([...body.data.vocabulary,...body.data.grammar,...body.data.expressions].every(item=>item.instructional_role===null));
 sqlite.close();
});
