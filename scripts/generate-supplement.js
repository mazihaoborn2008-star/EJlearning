import fs from 'node:fs';
import vm from 'node:vm';
import {completions} from './assessment-supplement.js';
const old=vm.runInNewContext(fs.readFileSync('tests/fixtures/phase1-data.cjs','utf8')+';({concepts})').concepts;
const quote=v=>v==null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
let sql='-- Additional practical sentence completion, original-Concept checkpoint coverage, vocabulary metadata.\n';
function insert(table,r){sql+=`INSERT INTO ${table} (${Object.keys(r).join(',')}) VALUES (${Object.values(r).map(quote).join(',')});\n`;}
const keys={};
function question(id,lang,level,concept,type,prompt,target,options,key,purpose){insert('placement_questions',{id,language:lang,difficulty:level,concept_id:concept,type,prompt,target_text:target,sort_order:1000+Object.keys(keys).length,purpose});options.forEach((text,option_id)=>insert('placement_options',{question_id:id,option_id,text}));insert('placement_answer_keys',{question_id:id,correct_option:key});keys[id]={key,difficulty:level,conceptId:concept};}
for(const lang of ['en','ja']){
 completions[lang].forEach(([level,id,prompt,target,options,key],i)=>question(`p3-completion-${lang}-${i+1}`,lang,level,id,'句子补全',prompt,target,options,key,'placement'));
 for(const c of old){const alternatives=old.filter(x=>x.topic===c.topic&&x.id!==c.id).slice(0,3),key=(c.id+(lang==='en'?0:1))%4,options=alternatives.map(x=>x[lang]);options.splice(key,0,c[lang]);question(`p3-original-${lang}-${c.id}`,lang,c[lang+'Difficulty'],c.id,'自然表达选择',`要表达「${c.zh}」，哪项最合适？`,null,options,key,'checkpoint');}
}
// Label part of speech where useful instead of a generic 'word' label.
const items=JSON.parse(fs.readFileSync('tests/phase3-content-inventory.json','utf8'));
for(const c of items.filter(c=>c.conceptType==='vocabulary')){const adjective=['light','muggy','thirsty','run-down','glad','overwhelmed','considerate'].includes(c.en),verb=['get absorbed in','look forward to'].includes(c.en);const pos=verb?'动词短语':adjective?'形容词':'名词／名词短语';sql+=`UPDATE expressions SET metadata_json=json_set(metadata_json,'$.partOfSpeech',${quote(pos)}) WHERE concept_id=${c.id} AND language='en';\n`;}
sql+="UPDATE topics SET name='学校 / 工作', description='学习、协作与工作中的日常沟通' WHERE id='school';\n";
fs.writeFileSync('migrations/0005_assessment_refinements.sql',sql);fs.writeFileSync('tests/phase3-supplement-keys.json',JSON.stringify(keys,null,2));
console.log('Added 24 sentence completion questions and 30 original-Concept checkpoint questions.');
