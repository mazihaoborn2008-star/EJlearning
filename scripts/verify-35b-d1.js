import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const remote=process.argv.includes('--remote'),config=remote?'wrangler.35b.jsonc':'wrangler.35b.local.jsonc',cfg=JSON.parse(fs.readFileSync(config,'utf8'));
assert.equal(cfg.name,'ej-learning-35b');assert.equal(cfg.d1_databases[0].database_name,'ej-learning-35b-db');assert.deepEqual(cfg.routes,[]);
assert(!['e2e8f4c8-27e0-416e-993c-7510259a6b1d','36c72b9b-da1f-425c-9b1a-6603b0f7d150','c5476d39-27ab-4899-b212-671e893971ee'].includes(cfg.d1_databases[0].database_id));
const location=remote?['--remote']:['--local','--persist-to',process.env.D1_DIRECTORY||'.wrangler/35b-local'];
function run(args){return spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js',...args,'--config',config,...location],{encoding:'utf8',env:{...process.env,CI:'true'},maxBuffer:20*1024*1024});}
function query(sql){const r=run(['d1','execute','DB','--command',sql,'--json']);assert.equal(r.status,0,r.stdout+r.stderr);return JSON.parse(r.stdout).map(x=>x.results);}
const repeat=run(['d1','migrations','apply','DB']);assert.equal(repeat.status,0,repeat.stdout+repeat.stderr);assert(repeat.stdout.includes('No migrations'));
const checks=query(`PRAGMA foreign_key_check;
SELECT name FROM d1_migrations ORDER BY id;
SELECT count(*) AS count FROM concepts;
SELECT language,count(*) AS count FROM v2_vocabulary_items GROUP BY language;
SELECT language,count(*) AS count FROM v2_grammar_points GROUP BY language;
SELECT count(*) AS count FROM v2_sentence_units;
SELECT count(*) AS count FROM v2_sentence_expressions;
SELECT count(*) AS count FROM v2_sentence_vocabulary_links;
SELECT count(*) AS count FROM v2_sentence_grammar_links;
SELECT count(*) AS count FROM v2_dialogue_turns;`);
assert.deepEqual(checks[0],[]);assert.equal(checks[1].length,10);assert.equal(checks[2][0].count,183);assert.deepEqual(checks[3],[{language:'en',count:16},{language:'ja',count:17}]);assert.deepEqual(checks[4],[{language:'en',count:9},{language:'ja',count:10}]);assert.equal(checks[5][0].count,13);assert.equal(checks[6][0].count,26);
// Each statement MUST fail. They modify only V2 representatives if a guard is broken;
// stop immediately on unexpected success, before continuing to deployment.
const negative=[
 ["UPDATE v2_content_alignments SET vocabulary_id='ja-yotei' WHERE id='ielts-expect'",'FOREIGN KEY'],
 ["UPDATE v2_content_alignments SET framework_id='JLPT',target='N4' WHERE id='ielts-expect'",'FOREIGN KEY'],
 ["UPDATE v2_content_alignments SET grammar_id='en-may' WHERE id='ielts-expect'",'CHECK'],
 ["UPDATE v2_content_alignments SET target='N1' WHERE id='ielts-expect'",'FOREIGN KEY'],
 ["UPDATE v2_vocabulary_items SET stage=7 WHERE id='en-eat'",'CHECK'],
 ["UPDATE v2_grammar_points SET level=0 WHERE id='en-may'",'CHECK'],
 ["UPDATE v2_vocabulary_items SET stage=1.5 WHERE id='en-eat'",'integer'],
 ["UPDATE v2_vocabulary_items SET language='zh' WHERE id='en-eat'",'CHECK'],
 ["UPDATE v2_sentence_vocabulary_links SET item_id='ja-taberu',sense_id=NULL WHERE id='vl-not-eaten-en-0'",'FOREIGN KEY'],
 ["UPDATE v2_sentence_grammar_links SET grammar_id='en-present-perfect' WHERE id='gl-not-eaten-ja-0'",'FOREIGN KEY'],
 ["UPDATE v2_sentence_vocabulary_links SET sense_id='en-yet-1' WHERE id='vl-not-eaten-en-0'",'FOREIGN KEY'],
 ["INSERT INTO v2_grammar_relations VALUES('en-may','ja-te-form','en','prerequisite','invalid')",'FOREIGN KEY'],
 ["INSERT INTO v2_grammar_relations VALUES('ja-te-form','ja-te-iru','ja','prerequisite','invalid')",'cycle'],
 ["UPDATE v2_sentence_expressions SET is_primary=1 WHERE id='apology-en-casual'",'UNIQUE'],
 ["UPDATE v2_sentence_units SET unit_type='sentence' WHERE id='help-dialogue'",'dialogue']
];
for(const [sql,error] of negative){const r=run(['d1','execute','DB','--command',sql,'--json']);assert.notEqual(r.status,0,sql);assert((r.stdout+r.stderr).includes(error),r.stdout+r.stderr);}
assert.deepEqual(query('PRAGMA foreign_key_check')[0],[]);
fs.writeFileSync(`docs/phase35b/d1-${remote?'staging':'local'}.json`,JSON.stringify({passed:true,location:remote?'isolated remote D1':location,config,migration_reapplication:'No migrations to apply',checks,negativeChecks:negative.map(([sql,error])=>({sql,expected:error,rejected:true}))},null,2));
assert.equal(query('SELECT COUNT(*) AS count FROM v2_content_alignments')[0][0].count,8);
console.log('D1 checks passed: clean migration tracking, counts, foreign keys, 15 rejected invalid writes.');

