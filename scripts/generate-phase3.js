import {readingTokens} from './japanese-tokens.js';
import fs from 'node:fs';
import {topicSpecs,blocks} from './curriculum-source.js';
const types=['vocabulary','phrase','sentence','scenario_response','pattern','dialogue','vocabulary','sentence','pattern','scenario_response','phrase','dialogue'];
const quote=v=>v==null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
let sql='-- Phase 3 authored curriculum. Generated from private scripts/curriculum-source.js.\n';
function insert(table,r){sql+=`INSERT INTO ${table} (${Object.keys(r).join(',')}) VALUES (${Object.values(r).map(quote).join(',')});\n`;}
const records=[];
for(const [ti,[topic,name,description]] of topicSpecs.entries()){
 if(ti>=3)insert('topics',{id:topic,slug:topic,name,description,icon:['⌂','◷','◇','↗','☀','♡','◌','♧','◎','✋','→'][ti-3],sort_order:ti+1});
 const lines=blocks[topic].split('\n');if(lines.length!==12)throw Error(topic+' must have 12 rows: '+lines.length);
 for(const [i,line] of lines.entries()){
  const parts=line.split('|');if(parts.length!==6||parts.some(p=>!p))throw Error('Invalid row '+line);
  const [zh,en,ipa,ja,reading,note]=parts.map(p=>p.replaceAll('\\n','\n')),id=16+records.length,conceptType=types[i],enLevel=Math.floor(i/2)+1;
  // Explicit practical register burden makes some Japanese items harder; a few idiomatic English items are harder than Japanese paraphrases.
  const jaLevel=i===3?3:i===4?2:i===5?4:i===6?3:i===9?6:i===10?5:enLevel;
  const r={id,topic,conceptType,zh,en,ipa,ja,reading,note,enLevel,jaLevel};records.push(r);
  insert('concepts',{id,slug:'concept-'+id,topic_id:topic,zh,sort_order:id,concept_type:conceptType,usage_note:note});
  insert('comparisons',{concept_id:id,explanation:note});
  for(const [li,lang] of ['en','ja'].entries()){
   const eid=id*2-1+li,text=r[lang],kana=lang==='ja'?reading:null;
   const examples=note.match(/例：(.+?)。/u)?.[1]?.split('／');
   const metadata={usage:note,example:examples?.[li]||text,...(conceptType==='vocabulary'?{partOfSpeech:lang==='en'?(text.includes(' ')?'词组':'词语'):'词语／表达'}:{}),...(conceptType==='pattern'?{structure:text}:{}),...(conceptType==='scenario_response'?{scenario:zh}:{}),...(conceptType==='dialogue'?{turns:text.split('\n').map((s,j)=>({speaker:s.slice(0,1),text:s.slice(3),...(lang==='ja'?{reading:reading.split('\n')[j].slice(3),readings:readingTokens(s.slice(3),reading.split('\n')[j].slice(3))}:{})}))}:{} )};
   insert('grammar_points',{id:eid,language:lang,title:zh,explanation:note,example:metadata.example});
   insert('expressions',{id:eid,concept_id:id,language:lang,text,ipa:lang==='en'?'/'+ipa+'/':null,hiragana:kana,difficulty:lang==='en'?enLevel:jaLevel,register:conceptType==='dialogue'?'见对话说明（朋友／同事／服务场景）':lang==='ja'&&/です|ます|ください/.test(text)?'礼貌':'日常；具体语气见用法',grammar_point_id:eid,metadata_json:JSON.stringify(metadata)});
   // Full-expression chunk avoids invented morpheme boundaries; each has a Chinese explanation.
   const tokens=lang==='ja'?readingTokens(text,reading):[];
   insert('expression_chunks',{id:eid*100,expression_id:eid,language:lang,grammar_point_id:eid,text,readings_json:JSON.stringify(tokens),sort_order:0});
   if(lang==='ja')tokens.forEach((t,j)=>insert('expression_readings',{expression_id:eid,sort_order:j,text:t.text,reading:t.reading}));
  }
 }
}
// Same-topic alternatives test communicative intent. They are distinct anchors, never typo traps.
// Separate question IDs/purpose ensure checkpoint grading cannot consume placement sessions.
for(const r of records)for(const lang of ['en','ja'])for(const purpose of ['placement','checkpoint']){
 const group=records.filter(x=>x.topic===r.topic&&x.id!==r.id);
 const meaning=['vocabulary','dialogue'].includes(r.conceptType);
 const alternatives=group.filter(x=>x.conceptType===r.conceptType).concat(group.filter(x=>x.conceptType!==r.conceptType)).slice(0,3);
 const correct=(r.id+(lang==='en'?1:2)+(purpose==='placement'?0:1))%4;
 const opts=alternatives.map(x=>meaning?x.zh:x[lang]);opts.splice(correct,0,meaning?r.zh:r[lang]);
 const id=`p3-${purpose}-${lang}-${r.id}`;
 insert('placement_questions',{id,language:lang,type:meaning?(r.conceptType==='dialogue'?'短对话理解':'意思识别'):r.conceptType==='scenario_response'?'情境回应':r.conceptType==='phrase'?'短语选择':r.conceptType==='pattern'?'结构选择':'自然表达选择',prompt:meaning?'这段表达最适合描述哪种意思或情境？':`要表达「${r.zh}」，哪项最合适？`,target_text:meaning?r[lang]:null,difficulty:r[lang+'Level'],sort_order:r.id,concept_id:r.id,purpose});
 opts.forEach((text,option_id)=>insert('placement_options',{question_id:id,option_id,text}));
 insert('placement_answer_keys',{question_id:id,correct_option:correct});
}
fs.writeFileSync('migrations/0004_curriculum.sql',sql);
fs.writeFileSync('tests/phase3-content-inventory.json',JSON.stringify(records,null,2));
console.log(`Generated ${records.length} new Concepts; ${records.length*4} new assessment questions.`);
