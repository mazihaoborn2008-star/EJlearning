import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {DatabaseSync} from 'node:sqlite';

const root=path.resolve(import.meta.dirname,'..');
const outDir=path.join(root,'migrations-35e2');
const reportDir=path.join(root,'docs/phase35e2');
fs.mkdirSync(outDir,{recursive:true});
fs.mkdirSync(reportDir,{recursive:true});
for(const file of fs.readdirSync(outDir))if(/^\d+_.*\.sql$/.test(file))fs.rmSync(path.join(outDir,file));

const localDbDir=path.join(root,'.wrangler/phase35e1c-release-final-2/v3/d1/miniflare-D1DatabaseObject');
const localDbFile=fs.readdirSync(localDbDir).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite');
if(!localDbFile)throw Error('Phase 3.5E.1C source D1 not found');
const existingDb=new DatabaseSync(path.join(localDbDir,localDbFile),{readOnly:true});
const tomoshi=new DatabaseSync(path.join(root,'.cache/phase35e2/tomoshi-dict-open.db'),{readOnly:true});
const ecdictCsv=path.join(root,'.cache/phase35e2/ECDICT/ecdict.csv');
const jlptFile=path.join(root,'.cache/phase35e2/JapaneseLanguageData/data/enrichment/jlpt-classifications.json');

const sha256=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const idHash=value=>crypto.createHash('sha256').update(value).digest('hex').slice(0,16);
const norm=value=>String(value||'').normalize('NFKC').trim();
const normEn=value=>norm(value).replace(/[‘’]/g,"'").toLowerCase();
const hira=value=>norm(value).replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
const sql=value=>value===null||value===undefined?'NULL':"'"+String(value).replaceAll("'","''")+"'";
const sqlValues=rows=>rows.map(row=>'('+row.map(sql).join(',')+')').join(',\n');
const levelOrder={N5:0,N4:1,N3:2,N2:3,N1:4};

function* csvRecords(text){
 let row=[],field='',quoted=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else quoted=false;}else field+=c;continue;}
  if(c==='"'){quoted=true;continue;}
  if(c===','){row.push(field);field='';continue;}
  if(c==='\n'){row.push(field.replace(/\r$/,''));yield row;row=[];field='';continue;}
  field+=c;
 }
 if(field||row.length){row.push(field);yield row;}
}

function mapEnglishPos(raw,definition,translation,exchange){
 const codes=[...String(raw||'').matchAll(/(?:^|\/)([a-z-]+)(?::\d+)?/g)].map(x=>x[1]);
 if(!codes.length){
  const text=String(definition||'')+'\n'+String(translation||'');
  for(const m of text.matchAll(/(?:^|\n)\s*(n|v|vt|vi|a|s|adj|r|adv|prep|p|conj|c|pron|art|det|num|int|aux)\./gi))codes.push(m[1].toLowerCase());
 }
 const has=x=>codes.some(c=>x.includes(c));
 if(/(?:^|\/)(?:p|d|i|3):/.test(exchange)&&!has(['n']))return'verb';
 if(has(['n']))return'noun';
 if(has(['v','vt','vi'])||codes.some(x=>x.startsWith('v')))return'verb';
 if(has(['a','s','adj']))return'adjective';
 if(has(['r','adv']))return'adverb';
 if(has(['p','prep']))return'preposition';
 if(has(['c','conj']))return'conjunction';
 if(has(['d','det','art']))return'determiner';
 if(has(['m','num']))return'numeral';
 if(has(['pron']))return'pronoun';
 if(has(['int']))return'interjection';
 if(has(['u','aux']))return'auxiliary';
 return null;
}

function conciseEnglishMeaning(raw){
 const lines=norm(raw).split(/\n+/).map(x=>x.trim()).filter(Boolean)
  .filter(x=>!/^(?:\[网络\]|\[(?:计|医|化|法|经|电子|航海|军)\])/.test(x));
 for(let text of lines){
  text=text.replace(/^(?:n|v|vt|vi|a|s|adj|adv|prep|conj|pron|art|det|num|interj|int)\.\s*/i,'').trim();
  if(!/[\p{Script=Han}]/u.test(text))continue;
  const parts=text.split(/[,，；;]/).map(x=>x.trim()).filter(Boolean).slice(0,3);
  const result=parts.join('；').replace(/\s+/g,' ').slice(0,96).trim();
  if(result)return result;
 }
 return '';
}

const sourceRows=csvRecords(fs.readFileSync(ecdictCsv,'utf8'));
const headers=sourceRows.next().value;
const col=Object.fromEntries(headers.map((x,i)=>[x,i]));
const numberOrNull=value=>{const n=Number(value);return Number.isFinite(n)&&n>0?n:null;};
const enRejected={malformed:0,proper:0,inflected:0,missing_meaning:0,missing_pos:0,source_duplicate:0,existing_collision:0};
const enCandidates=new Map();
for(const row of sourceRows){
 const raw=norm(row[col.word]),word=normEn(raw);
 if(!/^[a-z][a-z'-]{1,29}$/.test(word)||word.includes('--')||word.startsWith("'")||word.endsWith("'")){enRejected.malformed++;continue;}
 if(raw!==word){enRejected.proper++;continue;}
 const exchange=norm(row[col.exchange]),sourceLemma=(exchange.match(/(?:^|\/)0:([^/]+)/)||[])[1];
 if(sourceLemma&&normEn(sourceLemma)!==word){enRejected.inflected++;continue;}
 const meaning=conciseEnglishMeaning(row[col.translation]);if(!meaning){enRejected.missing_meaning++;continue;}
 const pos=mapEnglishPos(row[col.pos],row[col.definition],row[col.translation],exchange);if(!pos){enRejected.missing_pos++;continue;}
 const bnc=numberOrNull(row[col.bnc]),frq=numberOrNull(row[col.frq]);
 if(!bnc&&!frq&&!row[col.oxford]&&!row[col.collins]&&!row[col.tag]){enRejected.malformed++;continue;}
 const tags=norm(row[col.tag]).split(/\s+/).filter(Boolean);
 if(tags.includes('X')){enRejected.malformed++;continue;}
 let score=Math.min(bnc??999999,frq??999999);
 if(String(row[col.oxford])==='1')score-=1800;
 score-=Math.min(5,numberOrNull(row[col.collins])||0)*180;
 if(tags.includes('gk'))score-=500;if(tags.includes('cet4'))score-=700;if(tags.includes('cet6'))score-=400;
 if(tags.includes('ielts'))score-=900;if(tags.includes('toefl'))score-=250;if(bnc&&frq)score-=150;
 const candidate={word,pos,meaning,score,bnc,frq,phonetic:norm(row[col.phonetic])||null,exchange:exchange||null,tags};
 const previous=enCandidates.get(word);
 if(previous){enRejected.source_duplicate++;if(previous.score<=candidate.score)continue;}
 enCandidates.set(word,candidate);
}

const existingEn=existingDb.prepare("SELECT id,lemma,stage,ipa,part_of_speech,publication_state FROM v2_vocabulary_items WHERE language='en'").all();
const existingEnPublished=existingEn.filter(x=>x.publication_state==='published');
const existingEnByLemma=new Map(existingEn.map(x=>[normEn(x.lemma),x]));
const rankedEnCandidates=[...enCandidates.values()].filter(x=>{
 if(existingEnByLemma.has(x.word)){enRejected.existing_collision++;return false;}return true;
}).sort((a,b)=>a.score-b.score||a.word.localeCompare(b.word));
const importedEn=rankedEnCandidates.slice(0,10000-existingEnPublished.length);
const selectedEnWords=new Set(importedEn.map(x=>x.word));
for(const letter of 'abcdefghijklmnopqrstuvwxyz')if(!existingEnByLemma.has(letter)&&![...existingEnByLemma.keys(),...selectedEnWords].some(x=>x.startsWith(letter))){
 const replacement=rankedEnCandidates.find(x=>x.word.startsWith(letter)&&!selectedEnWords.has(x.word));
 if(replacement){const removed=importedEn.pop();selectedEnWords.delete(removed.word);importedEn.push(replacement);selectedEnWords.add(replacement.word);}
}
importedEn.sort((a,b)=>a.score-b.score||a.word.localeCompare(b.word));
if(importedEn.length!==10000-existingEnPublished.length)throw Error('Insufficient cleaned ECDICT candidates');
const editorialEn=new Set(existingDb.prepare("SELECT DISTINCT vocabulary_id id FROM v2_content_alignments WHERE framework_id='IELTS' AND vocabulary_id IS NOT NULL").all().map(x=>x.id));
const enRankable=[
 ...existingEnPublished.map(x=>{const source=enCandidates.get(normEn(x.lemma));return{id:x.id,word:normEn(x.lemma),score:(source?.score??x.stage*1300)-2400,editorial:editorialEn.has(x.id)?1:0,existing:1};}),
 ...importedEn.map(x=>({id:'35e2-en-'+idHash(x.word),word:x.word,score:x.score,editorial:0,existing:0}))
].sort((a,b)=>(b.editorial-a.editorial)||(b.existing-a.existing)||a.score-b.score||a.word.localeCompare(b.word));
if(enRankable.length!==10000)throw Error('English course rank count mismatch');
const enRankById=new Map(enRankable.map((x,i)=>[x.id,i+1]));

function japanesePos(tags,word){
 const set=new Set(tags||[]),all=[...set],hasPrefix=prefix=>all.some(x=>x.startsWith(prefix)),hasText=text=>all.some(x=>x.toLowerCase().includes(text));
 if(set.has('n-pr')||hasText('proper noun'))return'proper noun';
 if(hasPrefix('adj-i')||hasText('adjective (keiyoushi)')||hasText('pre-noun adjectival'))return'adjective';
 if(set.has('adj-na')||set.has('adj-no')||set.has('adj-t')||hasText('adjectival nouns')||hasText('na-adjective'))return'adjectival noun';
 if(/する$/u.test(word)&&(all.some(x=>x==='vs'||x.startsWith('vs-'))||hasText('suru verb')))return'verb';
 if(set.has('n')||set.has('n-adv')||set.has('n-t')||set.has('n-pref')||set.has('n-suf')||hasText('noun (common)')||hasText('adverbial noun')||hasText('temporal noun'))return'noun';
 if(hasPrefix('v')||set.has('vs')||set.has('vk')||set.has('vz')||hasText('verb'))return'verb';
 if(set.has('adv')||set.has('adv-to')||hasText('adverb'))return'adverb';
 if(set.has('ctr')||hasText('counter'))return'counter';
 if(set.has('pn')||hasText('pronoun'))return'pronoun';
 if(hasText('numeric'))return'numeral';
 if(set.has('prt')||hasText('particle'))return'particle';
 if(set.has('conj')||hasText('conjunction'))return'conjunction';
 if(set.has('int')||hasText('interjection'))return'interjection';
 if(set.has('aux')||set.has('aux-v')||set.has('aux-adj')||set.has('cop')||hasText('auxiliary')||hasText('copula'))return'auxiliary';
 if(set.has('pref')||set.has('suf')||hasText('prefix')||hasText('suffix'))return'affix';
 if(set.has('exp')||hasText('expression'))return'fixed expression';
 return null;
}

function conciseJapaneseMeaning(raw){
 const parsed=JSON.parse(raw),parts=[];
 for(const sense of Object.values(parsed.senses||{}))for(const gloss of sense.glosses||[]){
  for(const piece of norm(gloss.text).replace(/\s+/g,' ').split(/[;；]/).map(x=>x.trim()).filter(Boolean))if(!parts.includes(piece))parts.push(piece);
  if(parts.length>=3)break;
 }
 return parts.slice(0,3).join('；').slice(0,96).trim();
}

const jlptRows=JSON.parse(fs.readFileSync(jlptFile,'utf8')).classifications.filter(x=>x.kind==='vocab');
const tomoshiEntry=tomoshi.prepare('SELECT data FROM entries WHERE id=?');
const tomoshiZh=tomoshi.prepare("SELECT data FROM zh_defs WHERE entry_id=? AND locale='zh-CN'");
const jaRejected={normalized_duplicate:0,missing_jmdict:0,missing_reading:0,missing_meaning:0,missing_pos:0,proper_name:0,existing_collision:0,unmapped_pos:{}};
const jaCandidatesByLemma=new Map();
for(const source of jlptRows){
 const word=norm(source.text),key=word;
 if(!word||!source.jmdict_seq){jaRejected.missing_jmdict++;continue;}
 const entryRow=tomoshiEntry.get(String(source.jmdict_seq)),zhRow=tomoshiZh.get(String(source.jmdict_seq));
 if(!entryRow||!zhRow){jaRejected.missing_jmdict++;continue;}
 const entry=JSON.parse(entryRow.data);
 let reading=hira(source.reading);
 if(!reading&&/^[\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u.test(word))reading=hira(word);
 if(!reading){jaRejected.missing_reading++;continue;}
 const sense=entry.senses?.find(s=>s.pos?.length)||entry.senses?.[0],pos=japanesePos(sense?.pos,word);
 if(!pos){jaRejected.missing_pos++;for(const tag of sense?.pos||[])jaRejected.unmapped_pos[tag]=(jaRejected.unmapped_pos[tag]||0)+1;continue;}if(pos==='proper noun'){jaRejected.proper_name++;continue;}
 const meaning=conciseJapaneseMeaning(zhRow.data);if(!meaning){jaRejected.missing_meaning++;continue;}
 const candidate={word,reading,pos,meaning,level:source.level,jmdictSeq:String(source.jmdict_seq),source};
 const previous=jaCandidatesByLemma.get(key);
 if(previous){jaRejected.normalized_duplicate++;if(levelOrder[previous.level]<=levelOrder[candidate.level])continue;}
 jaCandidatesByLemma.set(key,candidate);
}

const existingJa=existingDb.prepare("SELECT id,lemma,reading,stage,part_of_speech,publication_state FROM v2_vocabulary_items WHERE language='ja'").all();
const existingJaPublished=existingJa.filter(x=>x.publication_state==='published');
const existingJaByLemma=new Map(existingJa.map(x=>[norm(x.lemma),x]));
const importedJa=[...jaCandidatesByLemma.values()].filter(x=>{
 if(existingJaByLemma.has(x.word)){jaRejected.existing_collision++;return false;}return true;
}).sort((a,b)=>levelOrder[a.level]-levelOrder[b.level]||a.reading.localeCompare(b.reading,'ja')||a.word.localeCompare(b.word,'ja'));
const stageLevel=stage=>stage<=1?'N5':stage===2?'N4':stage===3?'N3':stage===4?'N2':'N1';
const existingJlptAlignment=new Map(existingDb.prepare("SELECT vocabulary_id,target FROM v2_content_alignments WHERE framework_id='JLPT' AND vocabulary_id IS NOT NULL ORDER BY CASE target WHEN 'N5' THEN 0 WHEN 'N4' THEN 1 WHEN 'N3' THEN 2 WHEN 'N2' THEN 3 ELSE 4 END").all().map(x=>[x.vocabulary_id,x.target]));
const jaRankable=[
 ...existingJaPublished.map(x=>{const source=jaCandidatesByLemma.get(norm(x.lemma));return{id:x.id,word:x.lemma,reading:x.reading,level:source?.level||existingJlptAlignment.get(x.id)||stageLevel(x.stage),editorial:existingJlptAlignment.has(x.id)?1:0,existing:1};}),
 ...importedJa.map(x=>({id:'35e2-ja-'+x.jmdictSeq+'-'+idHash(x.word+'\u0000'+x.reading).slice(0,8),word:x.word,reading:x.reading,level:x.level,editorial:0,existing:0}))
].sort((a,b)=>levelOrder[a.level]-levelOrder[b.level]||b.editorial-a.editorial||b.existing-a.existing||hira(a.reading).localeCompare(hira(b.reading),'ja')||a.word.localeCompare(b.word,'ja'));
const jaRankById=new Map();
for(const level of ['N5','N4','N3','N2','N1'])jaRankable.filter(x=>x.level===level).forEach((x,i)=>jaRankById.set(x.id,i+1));

const sourceHashes={
 ecdict_commit:'bc015ed2e24a7abef49fc6dbbb7fe32c1dadaf8b',ecdict_csv_sha256:sha256(ecdictCsv),
 jlpt_data_commit:'04014e06019fc9d4af76e6dbb64ec709fe863c4d',jlpt_classifications_sha256:sha256(jlptFile),
 tomoshi_release:'v2026-09-02',tomoshi_zst_sha256:sha256(path.join(root,'.cache/phase35e2/tomoshi-dict-open.db.zst'))
};

const schema=`-- Phase 3.5E.2: scalable imported vocabulary metadata and course-estimate pools.\nPRAGMA foreign_keys=ON;\nCREATE TABLE v2_vocabulary_sources (\n+ id TEXT PRIMARY KEY, title TEXT NOT NULL, url TEXT NOT NULL, license TEXT NOT NULL, attribution TEXT NOT NULL, source_version TEXT NOT NULL, source_sha256 TEXT, modifications TEXT NOT NULL, imported_at TEXT NOT NULL\n+);\nCREATE TABLE v2_vocabulary_import_metadata (\n+ item_id TEXT PRIMARY KEY REFERENCES v2_vocabulary_items(id), source_id TEXT NOT NULL REFERENCES v2_vocabulary_sources(id), source_key TEXT NOT NULL, source_rank INTEGER, frequency_bnc INTEGER, frequency_modern INTEGER, inflections_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(inflections_json)), estimate_note TEXT NOT NULL, UNIQUE(source_id,source_key)\n+);\nCREATE INDEX v2_vocab_import_source_rank ON v2_vocabulary_import_metadata(source_id,source_rank,item_id);\nCREATE TABLE v2_vocabulary_course_ranks (\n+ framework_id TEXT NOT NULL REFERENCES v2_alignment_frameworks(id), item_id TEXT NOT NULL REFERENCES v2_vocabulary_items(id), language TEXT NOT NULL, course_rank INTEGER NOT NULL CHECK(course_rank>0), estimated_target TEXT, editorial_boost INTEGER NOT NULL DEFAULT 0 CHECK(editorial_boost IN (0,1)), basis TEXT NOT NULL, PRIMARY KEY(framework_id,item_id), FOREIGN KEY(framework_id,language) REFERENCES v2_alignment_frameworks(id,language), FOREIGN KEY(framework_id,estimated_target) REFERENCES v2_alignment_targets(framework_id,target)\n+);\nCREATE INDEX v2_vocab_course_target ON v2_vocabulary_course_ranks(framework_id,language,estimated_target,course_rank,item_id);\nCREATE INDEX v2_vocab_course_rank ON v2_vocabulary_course_ranks(framework_id,language,course_rank,item_id);\nCREATE TABLE v2_vocabulary_course_targets (\n+ framework_id TEXT NOT NULL, target TEXT NOT NULL, language TEXT NOT NULL, pool_mode TEXT NOT NULL CHECK(pool_mode IN ('cumulative','level')), pool_size INTEGER NOT NULL CHECK(pool_size>0), notice_zh TEXT NOT NULL, PRIMARY KEY(framework_id,target), FOREIGN KEY(framework_id,target) REFERENCES v2_alignment_targets(framework_id,target), FOREIGN KEY(framework_id,language) REFERENCES v2_alignment_frameworks(id,language)\n+);\nINSERT INTO v2_vocabulary_sources VALUES\n+ ('ecdict','ECDICT','https://github.com/skywind3000/ECDICT','MIT','ECDICT © Linwei / skywind3000; MIT License.','${sourceHashes.ecdict_commit}','${sourceHashes.ecdict_csv_sha256}','Selected high-value lowercase lemmas; removed proper names, malformed/noisy rows, and rows explicitly mapped to another lemma; concise Chinese meanings derived from source translations.',datetime('now')),\n+ ('jld-jlpt','Japanese Language Data — Waller JLPT classifications','https://github.com/jkindrix/japanese-language-data','CC BY-SA 4.0','JLPT estimates adapted from Jonathan Waller; redistribution by Japanese Language Data. Community/course estimates, not official JLPT lists.','${sourceHashes.jlpt_data_commit}','${sourceHashes.jlpt_classifications_sha256}','Deduplicated by normalized headword; joined to JMdict identifiers for reading and POS.',datetime('now')),\n+ ('tomoshi-zh','Tomoshi Dictionary Open Data Layer','https://github.com/tomoshi-app/tomoshi-dict-data','CC BY-SA 4.0','JMdict © EDRDG; derived Simplified Chinese glosses © Tomoshi (Y1Z).','${sourceHashes.tomoshi_release}','${sourceHashes.tomoshi_zst_sha256}','Used concise Simplified Chinese glosses and JMdict-derived POS; no examples imported.',datetime('now'));\nINSERT INTO v2_vocabulary_course_targets VALUES\n+ ('IELTS','5.0','en','cumulative',3000,'言间内部课程目标：累计高价值词汇约 3,000；不是 IELTS 官方逐词表。'),\n+ ('IELTS','5.5','en','cumulative',4000,'言间内部课程目标：累计高价值词汇约 4,000；不是 IELTS 官方逐词表。'),\n+ ('IELTS','6.0','en','cumulative',5500,'言间内部课程目标：累计高价值词汇约 5,500；不是 IELTS 官方逐词表。'),\n+ ('IELTS','6.5','en','cumulative',7000,'言间内部课程目标：累计高价值词汇约 7,000；不是 IELTS 官方逐词表。'),\n+ ('IELTS','7.0+','en','cumulative',10000,'言间内部课程目标：累计高价值词汇约 10,000；不是 IELTS 官方逐词表。'),\n+ ('JLPT','N5','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),\n+ ('JLPT','N4','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),\n+ ('JLPT','N3','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),\n+ ('JLPT','N2','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),\n+ ('JLPT','N1','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。');\nUPDATE v2_alignment_frameworks SET notice_zh='Band 词汇池是言间按词频、通用性与学术用途建立的累计课程目标，不是 IELTS 官方逐词表，也不构成成绩保证。' WHERE id='IELTS';\nUPDATE v2_alignment_frameworks SET notice_zh='N5–N1 词汇分组来自社区资料与言间课程估计；JLPT 官方不发布完整逐词表。' WHERE id='JLPT';\n`;
fs.writeFileSync(path.join(outDir,'0001_large_vocabulary_schema.sql'),schema.replace(/^\+ ?/gm,''));

const records=[];
for(const x of importedEn){
 const id='35e2-en-'+idHash(x.word),rank=enRankById.get(id),stage=rank<=1500?1:rank<=3000?2:rank<=5000?3:rank<=7000?4:rank<=8500?5:6;
 records.push({language:'en',item:[id,'en',x.word,'word',stage,x.phonetic,null,x.pos,'neutral','published',100000+rank],sense:[id+'-s1',id,x.meaning,'','ECDICT concise gloss',null,null,null,0],meta:[id,'ecdict',x.word,rank,x.bnc,x.frq,JSON.stringify({exchange:x.exchange,tags:x.tags}),`ECDICT frequency/usefulness rank ${rank}`],rank:['IELTS',id,'en',rank,null,0,'ECDICT frequency + general usefulness + academic usefulness; existing editorial alignments receive a relevance boost.']});
}
for(const x of importedJa){
 const id='35e2-ja-'+x.jmdictSeq+'-'+idHash(x.word+'\u0000'+x.reading).slice(0,8),rank=jaRankById.get(id),stage=x.level==='N5'?1:x.level==='N4'?2:x.level==='N3'?3:x.level==='N2'?4:5;
 records.push({language:'ja',item:[id,'ja',x.word,/\s/.test(x.word)?'fixed_expression':'word',stage,null,x.reading,x.pos,'neutral','published',200000+levelOrder[x.level]*10000+rank],sense:[id+'-s1',id,x.meaning,'','JMdict/Tomoshi concise gloss',null,null,null,0],meta:[id,'tomoshi-zh',x.jmdictSeq+':'+idHash(x.word+'\u0000'+x.reading).slice(0,8),rank,null,null,JSON.stringify({jlpt_source:'jld-jlpt',source_text:x.word}),`Waller community estimate ${x.level}; not official JLPT vocabulary`],rank:['JLPT',id,'ja',rank,x.level,0,'Waller community JLPT estimate joined to JMdict/Tomoshi; not an official JLPT list.']});
}

let migrationNumber=2;
for(let start=0;start<records.length;start+=700){
 const chunk=records.slice(start,start+700),parts=['-- Phase 3.5E.2 additive bulk vocabulary chunk.','PRAGMA foreign_keys=ON;'];
 for(let i=0;i<chunk.length;i+=100){
  const batch=chunk.slice(i,i+100);
  parts.push(`INSERT INTO v2_vocabulary_items(id,language,lemma,type,stage,ipa,reading,part_of_speech,register,publication_state,sort_order) VALUES\n${sqlValues(batch.map(x=>x.item))};`);
  parts.push(`INSERT INTO v2_vocabulary_senses(id,item_id,meaning_zh,usage_zh,semantic_label,register_note,stage_override,override_reason,sort_order) VALUES\n${sqlValues(batch.map(x=>x.sense))};`);
  parts.push(`INSERT INTO v2_vocabulary_import_metadata(item_id,source_id,source_key,source_rank,frequency_bnc,frequency_modern,inflections_json,estimate_note) VALUES\n${sqlValues(batch.map(x=>x.meta))};`);
  parts.push(`INSERT INTO v2_vocabulary_course_ranks(framework_id,item_id,language,course_rank,estimated_target,editorial_boost,basis) VALUES\n${sqlValues(batch.map(x=>x.rank))};`);
 }
 const name=String(migrationNumber++).padStart(4,'0')+`_vocabulary_chunk_${String(start/700+1).padStart(2,'0')}.sql`;
 fs.writeFileSync(path.join(outDir,name),parts.join('\n\n')+'\n');
}

const existingRanks=[];
for(const x of enRankable.filter(x=>x.existing))existingRanks.push(['IELTS',x.id,'en',enRankById.get(x.id),null,x.editorial,'Existing curated content retained; ECDICT match and editorial alignment used only as ranking signals.']);
for(const x of jaRankable.filter(x=>x.existing))existingRanks.push(['JLPT',x.id,'ja',jaRankById.get(x.id),x.level,x.editorial,'Existing curated content retained; source match, editorial alignment, or Stage used for a community/course estimate.']);
const finalSql=['-- Preserve existing curated vocabulary while adding it to scalable discovery pools.','PRAGMA foreign_keys=ON;'];
for(let i=0;i<existingRanks.length;i+=100)finalSql.push(`INSERT INTO v2_vocabulary_course_ranks(framework_id,item_id,language,course_rank,estimated_target,editorial_boost,basis) VALUES\n${sqlValues(existingRanks.slice(i,i+100))};`);
fs.writeFileSync(path.join(outDir,String(migrationNumber).padStart(4,'0')+'_existing_curated_course_ranks.sql'),finalSql.join('\n\n')+'\n');

const byCount=(items,key)=>Object.fromEntries([...new Set(items.map(key))].sort().map(k=>[k,items.filter(x=>key(x)===k).length]));
const enAll=enRankable;
const jaAll=jaRankable;
const audit={
 generated_at:new Date().toISOString(),source_hashes:sourceHashes,
 english:{published_final:enAll.length,existing_published:existingEnPublished.length,imported:importedEn.length,rejected:enRejected,missing_ipa_imported:importedEn.filter(x=>!x.phonetic).length,pos_distribution:byCount([...existingEnPublished.map(x=>({pos:x.part_of_speech})),...importedEn],x=>x.pos),az_distribution:Object.fromEntries('ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map(letter=>[letter,enAll.filter(x=>letter==='#'?!/^[a-z]/.test(x.word):x.word.startsWith(letter.toLowerCase())).length])),ielts_pools:{'5.0':3000,'5.5':4000,'6.0':5500,'6.5':7000,'7.0+':10000}},
 japanese:{published_final:jaAll.length,existing_published:existingJaPublished.length,imported:importedJa.length,rejected:jaRejected,missing_reading:jaAll.filter(x=>!x.reading).length,pos_distribution:byCount([...existingJaPublished.map(x=>({pos:x.part_of_speech})),...importedJa],x=>x.pos),jlpt_distribution:Object.fromEntries(['N5','N4','N3','N2','N1'].map(level=>[level,jaAll.filter(x=>x.level===level).length]))},
 migration:{files:fs.readdirSync(outDir).filter(x=>x.endsWith('.sql')).length,records:records.length,existing_rank_rows:existingRanks.length},
 curated_preservation:{vocabulary_items_before:existingDb.prepare('SELECT count(*) n FROM v2_vocabulary_items').get().n,vocabulary_examples_before:existingDb.prepare('SELECT count(*) n FROM v2_vocabulary_examples').get().n,vocabulary_senses_before:existingDb.prepare('SELECT count(*) n FROM v2_vocabulary_senses').get().n}
};
fs.writeFileSync(path.join(reportDir,'source-import-audit.json'),JSON.stringify(audit,null,2)+'\n');
console.log(JSON.stringify(audit,null,2));
