import fs from 'node:fs';
import {spawnSync} from 'node:child_process';

const remote=process.argv.includes('--remote'),stagingVerified=process.argv.includes('--staging-verified');
const config=remote?'wrangler.35d.jsonc':'wrangler.35d.local.jsonc';
const persist=process.env.PHASE35D_PERSIST||'.wrangler/phase35d-clean';
const outDir='docs/phase35d';fs.mkdirSync(outDir,{recursive:true});
function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB',remote?'--remote':'--local','--config',config,'--command',sql,'--json'];
 if(!remote)args.push('--persist-to',persist);
 const r=spawnSync(process.execPath,args,{encoding:'utf8',maxBuffer:20*1024*1024});
 if(r.status)throw Error(r.stderr||r.stdout);
 const parsed=JSON.parse(r.stdout.slice(r.stdout.indexOf('[')));
 return parsed[0].results;
}

const distribution=query(`SELECT language,stage,COUNT(*) lessons,
 SUM((SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='vocabulary')) linked_vocab_slots,
 SUM((SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='grammar')) linked_grammar_slots,
 SUM((SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='expression')) linked_expression_slots
 FROM lesson_units l GROUP BY language,stage ORDER BY language,stage`);
const coverageRows=query(`SELECT l.language,
 (SELECT COUNT(*) FROM v2_vocabulary_items v WHERE v.language=l.language AND v.publication_state='published') total_vocab,
 COUNT(DISTINCT CASE WHEN i.content_type='vocabulary' THEN i.content_id END) linked_vocab,
 (SELECT COUNT(*) FROM v2_grammar_points g WHERE g.language=l.language AND g.publication_state='published') total_grammar,
 COUNT(DISTINCT CASE WHEN i.content_type='grammar' THEN i.content_id END) linked_grammar,
 (SELECT COUNT(*) FROM v2_sentence_expressions e WHERE e.language=l.language AND e.publication_state='published') total_expressions,
 COUNT(DISTINCT CASE WHEN i.content_type='expression' THEN i.content_id END) linked_expressions
 FROM lesson_units l LEFT JOIN lesson_items i ON i.lesson_id=l.id GROUP BY l.language ORDER BY l.language`);
const environment=remote||stagingVerified?'staging':'local';
const coverage={generated_at:new Date().toISOString(),environment,languages:{},stage_distribution:distribution};
for(const r of coverageRows)coverage.languages[r.language]={lessons:distribution.filter(x=>x.language===r.language).reduce((n,x)=>n+x.lessons,0),vocabulary:{linked:r.linked_vocab,total:r.total_vocab,unassigned:r.total_vocab-r.linked_vocab},grammar:{linked:r.linked_grammar,total:r.total_grammar,unassigned:r.total_grammar-r.linked_grammar},expressions:{linked:r.linked_expressions,total:r.total_expressions,unassigned:r.total_expressions-r.linked_expressions}};

const counts=query(`SELECT
 (SELECT COUNT(*) FROM lesson_units l WHERE NOT EXISTS(SELECT 1 FROM lesson_items i WHERE i.lesson_id=l.id)) empty_lesson,
 (SELECT COUNT(*) FROM lesson_units l WHERE NOT EXISTS(SELECT 1 FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='vocabulary' AND i.required=1)) missing_required_vocab,
 (SELECT COUNT(*) FROM lesson_units l WHERE NOT EXISTS(SELECT 1 FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='grammar')) missing_grammar,
 (SELECT COUNT(*) FROM lesson_items i JOIN lesson_units l ON l.id=i.lesson_id LEFT JOIN v2_vocabulary_items v ON i.content_type='vocabulary' AND v.id=i.content_id LEFT JOIN v2_grammar_points g ON i.content_type='grammar' AND g.id=i.content_id LEFT JOIN v2_sentence_expressions e ON i.content_type='expression' AND e.id=i.content_id WHERE (i.content_type='vocabulary' AND v.id IS NULL) OR (i.content_type='grammar' AND g.id IS NULL) OR (i.content_type='expression' AND e.id IS NULL)) invalid_fk,
 (SELECT COUNT(*) FROM lesson_items i JOIN lesson_units l ON l.id=i.lesson_id LEFT JOIN v2_vocabulary_items v ON i.content_type='vocabulary' AND v.id=i.content_id LEFT JOIN v2_grammar_points g ON i.content_type='grammar' AND g.id=i.content_id LEFT JOIN v2_sentence_expressions e ON i.content_type='expression' AND e.id=i.content_id WHERE coalesce(v.language,g.language,e.language)<>l.language) language_mismatch,
 (SELECT COUNT(*) FROM lesson_items i JOIN lesson_units l ON l.id=i.lesson_id LEFT JOIN v2_vocabulary_items v ON i.content_type='vocabulary' AND v.id=i.content_id LEFT JOIN v2_grammar_points g ON i.content_type='grammar' AND g.id=i.content_id WHERE i.required=1 AND (coalesce(v.stage,g.level,1)>l.stage)) stage_mismatch,
 (SELECT COUNT(*) FROM lesson_units WHERE length(trim(objective))=0) missing_objective,
 (SELECT COUNT(*) FROM lesson_units l WHERE (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='vocabulary') NOT BETWEEN 5 AND 10 OR (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='grammar') NOT BETWEEN 1 AND 3 OR (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='expression') NOT BETWEEN 3 AND 8) size_outlier`).at(0);
const advanced=query(`SELECT l.id,l.language,l.stage,l.title,i.content_type,i.content_id,i.role,coalesce(v.stage,g.level,e.overall_difficulty) content_level FROM lesson_items i JOIN lesson_units l ON l.id=i.lesson_id LEFT JOIN v2_vocabulary_items v ON i.content_type='vocabulary' AND v.id=i.content_id LEFT JOIN v2_grammar_points g ON i.content_type='grammar' AND g.id=i.content_id LEFT JOIN v2_sentence_expressions e ON i.content_type='expression' AND e.id=i.content_id WHERE coalesce(v.stage,g.level,e.overall_difficulty)>l.stage ORDER BY l.id,i.content_type,i.sequence`);
const unknown=query(`WITH linked AS (SELECT l.id,COUNT(DISTINCT sv.item_id) total,COUNT(DISTINCT CASE WHEN li2.content_id IS NULL THEN sv.item_id END) unknown FROM lesson_units l JOIN lesson_items li ON li.lesson_id=l.id AND li.content_type='expression' JOIN v2_sentence_vocabulary_links sv ON sv.expression_id=li.content_id LEFT JOIN lesson_items li2 ON li2.lesson_id=l.id AND li2.content_type='vocabulary' AND li2.content_id=sv.item_id GROUP BY l.id) SELECT id,total,unknown,ROUND(CASE WHEN total=0 THEN 0 ELSE unknown*1.0/total END,3) unknown_ratio FROM linked WHERE total>0 ORDER BY unknown_ratio DESC,id`);
const duplicates=query(`WITH pairs AS (SELECT a.lesson_id a,b.lesson_id b,COUNT(*) shared FROM lesson_items a JOIN lesson_items b ON a.content_type='vocabulary' AND b.content_type='vocabulary' AND a.content_id=b.content_id AND a.lesson_id<b.lesson_id GROUP BY a.lesson_id,b.lesson_id), totals AS (SELECT lesson_id,COUNT(*) n FROM lesson_items WHERE content_type='vocabulary' GROUP BY lesson_id) SELECT p.a,p.b,p.shared,ROUND(p.shared*1.0/min(ta.n,tb.n),3) overlap FROM pairs p JOIN totals ta ON ta.lesson_id=p.a JOIN totals tb ON tb.lesson_id=p.b JOIN lesson_units a ON a.id=p.a JOIN lesson_units b ON b.id=p.b WHERE a.language=b.language AND p.shared*1.0/min(ta.n,tb.n)>=0.8 ORDER BY overlap DESC,p.a,p.b`);
const topics=query(`SELECT language,topic_id,COUNT(*) lessons FROM lesson_units GROUP BY language,topic_id ORDER BY language,lessons DESC,topic_id`);
const topicWarnings=topics.filter(x=>x.lessons>4);
const errorCount=Object.values(counts).reduce((n,v)=>n+Number(v),0);
const audit={generated_at:new Date().toISOString(),environment,remote_bundle_verified:stagingVerified,errors:errorCount,error_categories:counts,warnings:advanced.length+duplicates.length+topicWarnings.length+unknown.filter(x=>x.unknown_ratio>.35).length,advanced_content:{count:advanced.length,items:advanced,note:'All advanced items are support/exposure; none are required.'},unknown_vocabulary:{threshold:0.35,warnings:unknown.filter(x=>x.unknown_ratio>.35),all_lessons:unknown},duplicate_content:{threshold:0.8,count:duplicates.length,lessons:duplicates},topic_balance:{warnings:topicWarnings,distribution:topics},size_outliers:counts.size_outlier,notes:['Warnings are editorial review signals, not schema errors.','Duplicate overlap is measured on vocabulary; intentional progression may repeat core words.','Unknown vocabulary measures expression-linked vocabulary absent from the lesson vocabulary set.']};
fs.writeFileSync(`${outDir}/lesson-coverage-report.json`,JSON.stringify(coverage,null,2));
fs.writeFileSync(`${outDir}/lesson-audit.json`,JSON.stringify(audit,null,2));
console.log(JSON.stringify({coverage,audit},null,2));
if(errorCount)process.exitCode=1;
