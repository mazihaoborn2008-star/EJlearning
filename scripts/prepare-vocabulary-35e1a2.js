import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root=process.cwd();
const config='wrangler.35e1a1.local.jsonc';
const persist='.wrangler/phase35e1a-release';
const outDir=path.join(root,'docs','phase35e1a2');
fs.mkdirSync(outDir,{recursive:true});

function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',config,'--persist-to',persist,'--command',sql,'--json'];
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(result.status)throw Error(result.stderr||result.stdout);
 return JSON.parse(result.stdout.slice(result.stdout.indexOf('[')))[0].results;
}

const rows=query(`SELECT v.id,v.language,v.lemma,v.reading,v.part_of_speech,v.stage,v.sort_order,
 s.id sense_id,s.meaning_zh,s.usage_zh,
 (SELECT COUNT(DISTINCT lesson_id) FROM lesson_items WHERE content_type='vocabulary' AND content_id=v.id) lesson_uses,
 (SELECT COUNT(DISTINCT expression_id) FROM v2_sentence_vocabulary_links WHERE item_id=v.id) expression_uses,
 (SELECT COUNT(*) FROM v2_vocabulary_examples WHERE item_id=v.id) usage_count,
 (SELECT GROUP_CONCAT(kind||':'||text,' | ') FROM v2_vocabulary_examples WHERE item_id=v.id) existing
 FROM v2_vocabulary_items v JOIN v2_vocabulary_senses s ON s.item_id=v.id AND s.sort_order=0
 WHERE v.publication_state='published' AND v.stage<=3
 ORDER BY v.language,v.stage,v.sort_order,v.id`);

function score(row){
 const stageScore={1:35,2:28,3:20}[row.stage]??0;
 const lessonScore=Math.min(row.lesson_uses,4)*18;
 const expressionScore=Math.min(row.expression_uses,8)*4;
 const ambiguityBonus=/verb|phrasal|adjective|adverb|expression|particle/i.test(row.part_of_speech)?5:0;
 return stageScore+lessonScore+expressionScore+ambiguityBonus;
}
// Exclude a known baseline sense-label defect rather than manufacturing a usage
// that would conflict with the stored meaning. Fixing that sense is outside 1A.2.
const excludedIds=new Set(['ja-c-1087']);
const eligible=rows.filter(row=>row.usage_count===1&&!excludedIds.has(row.id)).map(row=>({...row,priority_score:score(row),priority:row.lesson_uses>0?'P0':row.expression_uses>0?'P1':'P2'}));
const selected={};
for(const [language,limit] of [['en',120],['ja',130]]){
 selected[language]=eligible.filter(row=>row.language===language).sort((a,b)=>b.priority_score-a.priority_score||b.lesson_uses-a.lesson_uses||b.expression_uses-a.expression_uses||a.stage-b.stage||a.sort_order-b.sort_order||a.id.localeCompare(b.id)).slice(0,limit);
}
const report={generated_at:new Date().toISOString(),method:'P0 lesson usage, P1 expression usage, Stage 1–3, communicative/ambiguity score; not ID order',excluded:[{id:'ja-c-1087',reason:'baseline meaning_zh conflicts with はっきり; sense correction is out of scope'}],eligible:{en:eligible.filter(row=>row.language==='en').length,ja:eligible.filter(row=>row.language==='ja').length},selected};
fs.writeFileSync(path.join(outDir,'selection-candidates.json'),JSON.stringify(report,null,2)+'\n');
for(const language of ['en','ja']){
 console.log(`\n${language.toUpperCase()} ${selected[language].length}`);
 for(const row of selected[language])console.log([row.id,row.stage,row.priority,row.lesson_uses,row.expression_uses,row.lemma,row.reading||'',row.part_of_speech,row.meaning_zh,row.existing].join('\t'));
}
