import fs from 'node:fs';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {dialogueCandidates} from './content-35e1c.js';
const root=process.cwd(),dbDir=path.join(root,'.wrangler','phase35e1c-release-final-2','v3','d1','miniflare-D1DatabaseObject');
const dbFile=fs.readdirSync(dbDir).filter(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite').map(x=>path.join(dbDir,x)).find(file=>{try{const d=new DatabaseSync(file);const ok=d.prepare("SELECT count(*) n FROM sqlite_master WHERE type='table' AND name='lesson_bundles'").get().n;d.close();return ok;}catch{return false;}});
if(!dbFile)throw Error('Phase 3.5E.1C isolated D1 not found');const db=new DatabaseSync(dbFile);
const q=v=>v==null?'NULL':`'${String(v).replaceAll("'","''")}'`;
const rows=(table,cols,data)=>`INSERT INTO ${table}(${cols.join(',')}) VALUES\n${data.map(r=>`(${cols.map(c=>q(r[c])).join(',')})`).join(',\n')};`;
const old=JSON.parse(db.prepare("SELECT payload_json FROM lesson_bundles WHERE id='phase-35e1c-v1'").get().payload_json);
const replacements=new Map([['en-s2-l5','35e1c-en-d-supermarket-expr'],['en-s3-l8','35e1c-en-d-connectivity-expr'],['ja-s2-l5','35e1c-ja-d-supermarket-expr'],['ja-s3-l7','35e1c-ja-d-connectivity-expr']]);
const bundle={...old,v:'3.5E.1C.1',i:old.i.map(item=>replacements.has(item[0])&&item[1]==='expression'?[item[0],item[1],replacements.get(item[0]),item[3],item[4],item[5]]:item)};
const units=[],expressions=[],turns=[],vocabLinks=[],grammarLinks=[];
const vocabId=(language,lemma)=>db.prepare('SELECT id FROM v2_vocabulary_items WHERE language=? AND lower(lemma)=lower(?) ORDER BY CASE WHEN id LIKE \'35e1c-%\' THEN 0 ELSE 1 END LIMIT 1').get(language,lemma)?.id;
const linkSpecs={
 '35e1c-en-d-supermarket':[['aisle',2,'aisle'],['receipt',5,'receipt']],
 '35e1c-en-d-connectivity':[['Wi-Fi',1,'Wi-Fi'],['password',3,'password'],['signal',5,'signal'],['restart',6,'restart'],['router',6,'router']],
 '35e1c-ja-d-supermarket':[['通路',1,'通路'],['レジ',4,'レジ'],['レシート',6,'レシート']],
 '35e1c-ja-d-connectivity':[['Wi-Fi',1,'Wi-Fi'],['パスワード',3,'パスワード'],['接続',4,'接続'],['電波',5,'電波'],['ルーター',6,'ルーター'],['再起動',6,'再起動']]
};
const grammarSpecs={
 '35e1c-en-d-supermarket':['en-wh-question',1,'where can I find'],
 '35e1c-en-d-connectivity':['35e1c-en-first-conditional',6,'If that does not help'],
 '35e1c-ja-d-supermarket':['35e1c-ja-counter-system',5,'二本'],
 '35e1c-ja-d-connectivity':['35e1c-ja-condition-contrast',6,'直らなければ']
};
for(const [di,d] of dialogueCandidates.entries()){
 const expressionId=`${d.id}-expr`,text=d.turns.map(x=>x[1]).join('\n');
 units.push({id:d.id,anchor_zh:d.anchor,topic_id:d.topic,unit_type:'dialogue',context_zh:d.context,comparison_zh:'本对话围绕当前 Lesson 的交际目标独立编辑。',publication_state:'published',sort_order:5000+di});
 expressions.push({id:expressionId,unit_id:d.id,language:d.language,text,is_primary:1,register:'polite',note_zh:'Phase 3.5E.1C Lesson cohesion corrective dialogue.',ipa:null,readings_json:d.language==='ja'?JSON.stringify([{text}]):'[]',overall_difficulty:d.stage,vocabulary_difficulty:d.stage,grammar_difficulty:d.stage,difficulty_note_zh:'按当前任务词汇、语法与多轮依赖编辑评定。',publication_state:'published',sort_order:5000+di});
 d.turns.forEach(([speaker,line],index)=>turns.push({id:`${d.id}-t${index+1}`,expression_id:expressionId,speaker,text:line,readings_json:d.language==='ja'?JSON.stringify([{text:line}]):'[]',sort_order:index}));
 for(const [li,[lemma,turnNo,displayed]] of linkSpecs[d.id].entries()){const item_id=vocabId(d.language,lemma);if(!item_id)throw Error(`Missing vocabulary ${d.language}:${lemma}`);vocabLinks.push({id:`${d.id}-vl${li+1}`,expression_id:expressionId,language:d.language,item_id,sense_id:null,turn_id:`${d.id}-t${turnNo}`,displayed_form:displayed,occurrence:1,importance:2,is_new_target:1,note_zh:'Lesson required/support vocabulary realized in this dialogue.',sort_order:li+1});}
 const [grammar_id,turnNo,displayed_form]=grammarSpecs[d.id];grammarLinks.push({id:`${d.id}-gl1`,expression_id:expressionId,language:d.language,grammar_id,turn_id:`${d.id}-t${turnNo}`,displayed_form,occurrence:1,note_zh:'Lesson grammar realized in the corrective dialogue.',sort_order:1});
}
const sql=[
 '-- Phase 3.5E.1C.1: additive corrective dialogues for lesson target fidelity.',
 '-- Historical 3.5E.1C migrations remain unchanged.',
 'PRAGMA foreign_keys=ON;',
 rows('v2_sentence_units',['id','anchor_zh','topic_id','unit_type','context_zh','comparison_zh','publication_state','sort_order'],units),
 rows('v2_sentence_expressions',['id','unit_id','language','text','is_primary','register','note_zh','ipa','readings_json','overall_difficulty','vocabulary_difficulty','grammar_difficulty','difficulty_note_zh','publication_state','sort_order'],expressions),
 rows('v2_dialogue_turns',['id','expression_id','speaker','text','readings_json','sort_order'],turns),
 rows('v2_sentence_vocabulary_links',['id','expression_id','language','item_id','sense_id','turn_id','displayed_form','occurrence','importance','is_new_target','note_zh','sort_order'],vocabLinks),
 rows('v2_sentence_grammar_links',['id','expression_id','language','grammar_id','turn_id','displayed_form','occurrence','note_zh','sort_order'],grammarLinks),
 `INSERT INTO lesson_bundles(id,schema_version,payload_json,published_at) VALUES('phase-35e1c-v2','3.5E.1C.1',${q(JSON.stringify(bundle))},'2026-09-11T00:00:00Z');`
].join('\n\n')+'\n';
const file=path.join(root,'migrations-35e1c','0003_lesson_target_fidelity_corrective.sql');if(fs.existsSync(file)&&fs.readFileSync(file,'utf8')!==sql)throw Error('Corrective migration is immutable');if(!fs.existsSync(file))fs.writeFileSync(file,sql);console.log(JSON.stringify({dialogues:units.length,turns:turns.length,vocabulary_links:vocabLinks.length,grammar_links:grammarLinks.length,bundle:'phase-35e1c-v2'},null,2));db.close();
