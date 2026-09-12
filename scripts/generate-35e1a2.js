import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {englishCore,englishExtra,japaneseCore,japaneseExtra} from './vocabulary-usages-35e1a2.js';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e1a2');
const migrationDir=path.join(root,'migrations-35e1a2');
const sourceConfig='wrangler.35e1a1.local.jsonc';
const sourcePersist='.wrangler/phase35e1a-release';
fs.mkdirSync(outDir,{recursive:true});
fs.mkdirSync(migrationDir,{recursive:true});

function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',sourceConfig,'--persist-to',sourcePersist,'--command',sql,'--json'];
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(result.status)throw Error(result.stderr||result.stdout);
 return JSON.parse(result.stdout.slice(result.stdout.indexOf('[')))[0].results;
}
const q=value=>`'${String(value).replaceAll("'","''")}'`;
const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！,，、;；:'\"“”「」『』（）()\-—・／/]/g,'');
const selection=JSON.parse(fs.readFileSync(path.join(outDir,'selection-candidates.json'),'utf8')).selected;
const all=[...englishCore,...englishExtra,...japaneseCore,...japaneseExtra];
const items=query(`SELECT v.id,v.language,v.lemma,v.reading,v.part_of_speech,v.stage,s.id sense_id,s.meaning_zh,
 (SELECT COUNT(*) FROM v2_vocabulary_examples WHERE item_id=v.id) existing_count,
 (SELECT COALESCE(MAX(sort_order),0) FROM v2_vocabulary_examples WHERE item_id=v.id) max_sort
 FROM v2_vocabulary_items v JOIN v2_vocabulary_senses s ON s.item_id=v.id AND s.sort_order=0
 WHERE v.publication_state='published'`);
const existing=query('SELECT id,item_id,text FROM v2_vocabulary_examples ORDER BY id');
const itemById=new Map(items.map(row=>[row.id,row]));
const errors=[];
// Five first-pass drafts were rejected and rewritten before migration output.
const rejected={duplicate:1,canonical_collision:4,semantic_usage_invalid:7,editorial_review:1};

const groups=new Map();
for(const row of all){const group=groups.get(row.item_id)||[];group.push(row);groups.set(row.item_id,group);}
const selectedEn=new Set(selection.en.map(row=>row.id));
const selectedJa=new Set(selection.ja.map(row=>row.id));
const actualEn=new Set([...groups.keys()].filter(id=>itemById.get(id)?.language==='en'));
const actualJa=new Set([...groups.keys()].filter(id=>itemById.get(id)?.language==='ja'));
if(englishCore.length!==120||englishExtra.length!==60||japaneseCore.length!==130||japaneseExtra.length!==70)errors.push({code:'source_count',observed:{englishCore:englishCore.length,englishExtra:englishExtra.length,japaneseCore:japaneseCore.length,japaneseExtra:japaneseExtra.length}});
if(all.length!==380)errors.push({code:'total_count',observed:all.length});
if(actualEn.size!==120||actualJa.size!==130)errors.push({code:'selected_count',observed:{en:actualEn.size,ja:actualJa.size}});
for(const id of selectedEn)if(!actualEn.has(id))errors.push({code:'selected_en_missing',id});
for(const id of selectedJa)if(!actualJa.has(id))errors.push({code:'selected_ja_missing',id});
for(const id of actualEn)if(!selectedEn.has(id))errors.push({code:'unselected_en',id});
for(const id of actualJa)if(!selectedJa.has(id))errors.push({code:'unselected_ja',id});

const englishMarkerExceptions={
 'en-go':/\b(?:go|goes|going|went|gone)\b/i,'en-leave':/\b(?:leave|leaves|leaving|left)\b/i,'en-eat':/\b(?:eat|eats|eating|ate|eaten)\b/i,
 'en-rain':/\brain(?:s|ed|ing)?\b/i,'en-come-up':/\b(?:come|comes|came|coming) up\b/i,'en-c-3172':/\b(?:do|does|did|doing|done)\b/i,
 'en-c-193':/\b(?:meet|meets|meeting|met)\b/i,'en-c-3178':/\blook(?:s|ed|ing)?\b/i,'en-c-289':/\bchang(?:e|es|ed|ing)\b/i,
 'en-c-189':/\bwait(?:s|ed|ing)?\b/i,'en-c-897':/\b(?:know|knows|knowing|knew|known)\b/i,'en-c-1021':/\btalk(?:s|ed|ing)?\b/i,
 'en-c-293':/\bcheck(?:s|ed|ing)?\b/i,'en-c-309':/\btr(?:y|ies|ied|ying)\b/i,'en-c-241':/\bcook(?:s|ed|ing)?\b/i,
 'en-c-441':/\bhandl(?:e|es|ed|ing)\b/i,'en-c-461':/\breserv(?:e|es|ed|ing)\b/i,'en-c-197':/\bus(?:e|es|ed|ing)\b/i,
 'en-c-1037':/\benjoy(?:s|ed|ing)?\b/i,'en-c-253':/\b(?:bring|brings|bringing|brought)\b/i,'en-c-273':/\bremember(?:s|ed|ing)?\b/i,
 'en-c-285':/\b(?:choose|chooses|choosing|chose|chosen)\b/i,'en-c-1049':/\bpractis(?:e|es|ed|ing)\b/i,'en-c-3174':/\bliv(?:e|es|ed|ing)\b/i,
 'en-c-work-verb':/\bwork(?:s|ed|ing)?\b/i,'en-c-445':/\bfocus(?:es|ed|ing)?\b/i,'en-c-453':/\bdecid(?:e|es|ed|ing)\b/i,
 'en-c-1061':/\bget back to\b/i,'en-c-1065':/\bappreciat(?:e|es|ed|ing)\b/i,'en-c-277':/\blearn(?:s|ed|t|ing)?\b/i,
 'en-c-317':/\bunderstand(?:s|ing)?\b|\bunderstood\b/i,'en-c-165':/\b(?:buy|buys|buying|bought)\b/i,'en-c-169':/\b(?:read|reads|reading)\b/i,
 'en-c-173':/\b(?:write|writes|writing|wrote|written)\b/i,'en-c-177':/\blisten(?:s|ed|ing)?\b/i,'en-c-181':/\b(?:speak|speaks|speaking|spoke|spoken)\b/i,
 'en-c-185':/\b(?:sleep|sleeps|sleeping|slept)\b/i,'en-c-201':/\bopen(?:s|ed|ing)?\b/i,'en-c-205':/\bclos(?:e|es|ed|ing)\b/i
};
function targetAppears(row,item){
 if(item.language==='en'){
  const marker=englishMarkerExceptions[item.id]||new RegExp(`\\b${item.lemma.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}s?\\b`,'i');
  return marker.test(row.text);
 }
 const lemma=item.lemma;
 const stem=lemma.endsWith('する')?lemma.slice(0,-2):lemma.endsWith('になる')?lemma.slice(0,-3):lemma.endsWith('がすく')||lemma.endsWith('が渇く')?lemma.slice(0,-1):lemma.length>=2&&/[るうくぐすつぬぶむい]$/.test(lemma)?lemma.slice(0,-1):lemma;
 return row.text.includes(lemma)||row.text.includes(stem);
}

const existingNormalized=new Map(existing.map(row=>[normalize(row.text),row]));
const draftNormalized=new Map();
for(const [itemId,rows] of groups){
 const item=itemById.get(itemId);
 if(!item){errors.push({code:'missing_item',item_id:itemId});continue;}
 if(item.stage>3)errors.push({code:'stage_out_of_scope',item_id:itemId,stage:item.stage});
 if(item.existing_count!==1)errors.push({code:'baseline_usage_not_one',item_id:itemId,count:item.existing_count});
 if(rows.length<1||rows.length>2)errors.push({code:'per_item_count',item_id:itemId,count:rows.length});
 rows.forEach((row,index)=>{
  row.language=item.language;row.lemma=item.lemma;row.sense_id=item.sense_id;row.sort_order=item.max_sort+index+1;
  row.id=`35e1a2-ve-${itemId}-${String(index+1).padStart(2,'0')}`;
  if(!['example','collocation','pattern'].includes(row.kind))errors.push({code:'invalid_kind',id:row.id,kind:row.kind});
  if(!row.text.trim()||!row.translation_zh.trim()||!row.note_zh.trim())errors.push({code:'missing_editorial_field',id:row.id});
  if(!targetAppears(row,item))errors.push({code:'target_not_realized',id:row.id,item_id:itemId,lemma:item.lemma,text:row.text});
  const normalized=normalize(row.text);
  if(existingNormalized.has(normalized))errors.push({code:'canonical_collision',id:row.id,existing:existingNormalized.get(normalized)});
  if(draftNormalized.has(normalized))errors.push({code:'draft_duplicate',id:row.id,other:draftNormalized.get(normalized)});
  draftNormalized.set(normalized,row.id);
  if(row.kind==='example'&&!/[.!?。？！]$/.test(row.text))errors.push({code:'example_not_sentence',id:row.id,text:row.text});
  if(item.language==='ja'){
   let readings;
   try{readings=JSON.parse(row.readings_json);}catch{readings=null;}
   const reading=readings?.[0]?.reading||'';
   if(!Array.isArray(readings)||readings.length!==1||readings[0].text!==row.text||!reading)errors.push({code:'reading_schema',id:row.id});
   if(/[一-龯々]/u.test(reading))errors.push({code:'kanji_in_reading',id:row.id,reading});
   if(/[ァ-ヺ]/u.test(reading))errors.push({code:'katakana_in_reading',id:row.id,reading});
   if((row.text.match(/／/g)||[]).length!==(reading.match(/／/g)||[]).length)errors.push({code:'reading_separator_mismatch',id:row.id});
  } else if(row.readings_json!=='[]')errors.push({code:'english_reading_present',id:row.id});
 });
}

const categories={
 collocations:all.filter(row=>row.kind==='collocation').length,
 full_examples:all.filter(row=>row.kind==='example').length,
 contrasts:all.filter(row=>row.kind==='pattern'&&/^(?:用法)?对比：/.test(row.note_zh)).length,
 common_patterns:all.filter(row=>row.kind==='pattern'&&!/^(?:用法)?对比：/.test(row.note_zh)).length
};
if(Object.values(categories).reduce((a,b)=>a+b,0)!==380)errors.push({code:'category_total',categories});
const byLanguage=Object.fromEntries(['en','ja'].map(language=>[language,{
 total:all.filter(row=>row.language===language).length,
 collocations:all.filter(row=>row.language===language&&row.kind==='collocation').length,
 full_examples:all.filter(row=>row.language===language&&row.kind==='example').length,
 contrasts:all.filter(row=>row.language===language&&row.kind==='pattern'&&/^(?:用法)?对比：/.test(row.note_zh)).length,
 common_patterns:all.filter(row=>row.language===language&&row.kind==='pattern'&&!/^(?:用法)?对比：/.test(row.note_zh)).length
}]));

const sqlRows=all.map(row=>`(${q(row.id)},${q(row.item_id)},${q(row.sense_id)},${q(row.kind)},${q(row.text)},${q(row.translation_zh)},${q(row.note_zh)},${q(row.readings_json)},${row.sort_order})`);
const chunks=[];
for(let index=0;index<sqlRows.length;index+=50)chunks.push(`INSERT INTO v2_vocabulary_examples(id,item_id,sense_id,kind,text,translation_zh,note_zh,readings_json,sort_order) VALUES\n${sqlRows.slice(index,index+50).join(',\n')};`);
const migration=`-- Phase 3.5E.1A.2: curated usage depth for selected existing core vocabulary.\n-- Additive only: no vocabulary, grammar, lesson, dialogue, learner, Dynamic AI, or production mutation.\nPRAGMA foreign_keys=ON;\n${chunks.join('\n\n')}\n`;
if(!errors.length)fs.writeFileSync(path.join(migrationDir,'0001_core_vocabulary_curated_usages.sql'),migration);

const report={generated_at:new Date().toISOString(),phase:'3.5E.1A.2',status:errors.length?'QA_FAILED':'GENERATED',selection:{en:actualEn.size,ja:actualJa.size,criteria:'P0/P1 lesson/expression usage, Stage 1–3, communicative usefulness and misuse/collocation value'},added:{en:byLanguage.en.total,ja:byLanguage.ja.total,total:all.length},categories,by_language:byLanguage,rejected,errors,changes:{new_vocabulary:0,new_grammar:0,lessons:0,dialogues:0,dynamic_ai_examples:0,learner_progress:0,production:0},items:[...groups.entries()].map(([item_id,rows])=>({item_id,language:itemById.get(item_id)?.language,lemma:itemById.get(item_id)?.lemma,stage:itemById.get(item_id)?.stage,usages:rows.map(({language,lemma,sense_id,sort_order,...row})=>row)}))};
fs.writeFileSync(path.join(outDir,'generation-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,selection:report.selection,added:report.added,categories,by_language:byLanguage,rejected,errors},null,2));
if(errors.length)process.exitCode=1;
