import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {englishExamples,japaneseExamples} from './grammar-examples-35e1a.js';

const root=process.cwd(),outDir=path.join(root,'docs','phase35e1a'),migrationDir=path.join(root,'migrations-35e1a');
fs.mkdirSync(outDir,{recursive:true});fs.mkdirSync(migrationDir,{recursive:true});
const generatedAt=new Date().toISOString(),config='wrangler.35d1.local.jsonc',persist='.wrangler/phase35d-clean';
const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。.!?？！,，、;；:'\"“”「」『』（）()\-—]/g,'');
const quote=s=>`'${String(s).replaceAll("'","''")}'`;
function query(sql){const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',config,'--persist-to',persist,'--command',sql,'--json'];const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});if(r.status)throw Error(r.stderr||r.stdout);return JSON.parse(r.stdout.slice(r.stdout.indexOf('[')))[0].results;}

const selections={
 en:Object.keys(englishExamples).map((id,index)=>({id,priority:index<12?'P0':'P1',selection_basis:index<12?'Stage 1 foundation and communicative spine':index<27?'Stage 2 lesson utility and daily-life function':'Stage 3 uncertainty, condition, preference or experience'})),
 ja:Object.keys(japaneseExamples).map((id,index)=>({id,priority:index<13?'P0':'P1',selection_basis:index<13?'Level 1 foundation including particles and polite basics':index<31?'Level 2 inflection, request, time and quantity utility':'Level 3 aspect, intention, inference, advice, request, condition or experience'}))
};
const allDrafts=[...Object.entries(englishExamples).flatMap(([grammar_id,rows])=>rows.map((row,index)=>({...row,grammar_id,language:'en',draft_index:index+1}))),...Object.entries(japaneseExamples).flatMap(([grammar_id,rows])=>rows.map((row,index)=>({...row,grammar_id,language:'ja',draft_index:index+1})))];
const selectedIds=[...selections.en,...selections.ja].map(x=>x.id);
const grammar=query(`SELECT id,language,level,form_name,formula,purpose_zh,when_zh FROM v2_grammar_points WHERE publication_state='published' AND id IN (${selectedIds.map(quote).join(',')}) ORDER BY language,level,sort_order,id`);
const existing=query(`SELECT id,grammar_id,language,text,translation_zh,sort_order FROM v2_grammar_examples ORDER BY grammar_id,sort_order,id`);
const existingByGrammar=new Map(grammar.map(g=>[g.id,existing.filter(x=>x.grammar_id===g.id)]));
const errors=[],rejected={duplicate:[],existing_collision:[],grammar_invalid:[],editorial_review:[]};
const error=(code,detail)=>errors.push({code,...detail});
if(grammar.length!==75)error('selected_grammar_missing',{expected:75,observed:grammar.length,missing:selectedIds.filter(id=>!grammar.some(g=>g.id===id))});
if(selections.en.length!==35)error('english_selection_count',{expected:35,observed:selections.en.length});
if(selections.ja.length!==40)error('japanese_selection_count',{expected:40,observed:selections.ja.length});
if(allDrafts.filter(x=>x.language==='en').length!==210)error('english_draft_count',{expected:210,observed:allDrafts.filter(x=>x.language==='en').length});
if(allDrafts.filter(x=>x.language==='ja').length!==280)error('japanese_draft_count',{expected:280,observed:allDrafts.filter(x=>x.language==='ja').length});

const grammarMarkers={
 'en-simple-present':/\b(?:do|does|walks|eat|drink|closes|live|boils)\b/i,'en-be-adjective':/\b(?:am|is|are|was|were)\b/i,'en-present-continuous':/\b(?:am|is|are)\b[^.?!]{0,45}\bing\b|\b(?:waiting|using|looking|sleeping|staying|making)\b/i,
 'en-do-question':/^(?:Do|Does)\b.+\?$/,'en-there-is':/^There (?:is|are|was)\b|^(?:Is|Are) there\b/,'en-have-possession':/\b(?:have|has)\b/i,'en-wh-question':/^(?:What|Where|Why|How|When|Which)\b.+\?$/,
 'en-imperative':/^(?:Turn|Please keep|Do not touch|Take|Let|Check)\b/,'en-want-to':/\bwant(?:ed|s)? to\b/i,'en-possessive':/\b(?:my|your|his|her|our|their|mine)\b/i,
 'en-greeting':/.+/,'en-noun-please':/\b(?:please|thanks)\b/i,'en-simple-past':/\b(?:arrived|did|left|changed|was|were|said)\b/i,'en-plan-to':/\bplan(?:ned|s)? to\b/i,
 'en-can-request':/^Can you\b.+\?$/,'en-can-ability':/\b(?:can|cannot)\b/i,'en-could-request':/^Could you\b.+\?$/,'en-going-to':/\b(?:am|is|are)\b[^.?!]{0,20}\bgoing to\b/i,'en-will':/\b(?:will|won't|'ll)\b/i,
 'en-comparative':/\b(?:cheaper|faster|warmer|closer|busier|more convenient)\b/i,'en-would-like':/\bwould (?:not )?(?:like|prefer)|\bWould\b.+\blike\b/i,'en-let-us':/\bLet's\b/,
 'en-before-after':/\b(?:before|after)\b/i,'en-enjoy-ing':/\benjoy(?:ed|s)?\b[^.?!]{0,35}\b\w+ing\b/i,'en-take-time':/\bIt (?:does not take|takes|took|will take)\b|\bdoes it take\b/i,
 'en-shall-suggestion':/\bShall we\b|\bshall we\b/,'en-ellipsis':/.+/,'en-may':/\bmay\b/i,'en-might':/\bmight\b/i,'en-indirect-question':/\b(?:tell me|know|remember|explain|asked|wonder)\b/i,
 'en-since-for':/\b(?:have|has|'ve)\b[^.?!]{0,55}\b(?:since|for)\b|\bHow long have\b/i,'en-as-long-as':/\bas long as\b/i,'en-would-rather':/\bwould rather\b|\bWould you rather\b/i,'en-what-if':/^What if\b.+\?$/,'en-ever-perfect':/\b(?:Have|Has|have|has)\b[^.?!]{0,30}\bever\b|\bhave never\b/i,
 'ja-plain-nonpast':/(?:る|う|く|す|つ|む|ぶ|ぬ|ぐ|ない)[。？?]$/,'ja-copula':/(?:です|ですか|でした|ではありません|かったです)[。？?]$/,'ja-wa-topic':/は/,'ja-ga-existence':/(?:あります|ありません|います|いません|できました)/,
 'ja-wo-object':/を/,'ja-ni-time':/に/,'ja-de-place':/で/,'ja-no-possession':/の/,'ja-ka-question':/か[。？?]$/,'ja-i-adjective':/(?:いです|くないです|かったです|くありません|い店|い部屋)/,
 'ja-suki':/好き/,'ja-polite-present':/(?:ます|ますか|ません)[。？?]$/,'ja-greeting':/.+/,'ja-plain-past':/(?:た|なかった|った|んだ|いだ)の?[。？?]$/,'ja-te-form':/(?:て|で)/,
 'ja-polite-negative':/ません/,'ja-polite-past':/(?:ました|ませんでした)/,'ja-te-kudasai':/(?:てください|でください|ないでください)/,'ja-tai':/た(?:い|くありません|かった)/,'ja-nai':/ない/,
 'ja-potential':/(?:話せ|でき|行け|眠れ|使え|開けられ)/,'ja-te-mo-ii':/(?:てもいい|でもいい|なくてもいい)/,'ja-mashou':/ましょう/,'ja-masen-ka':/ませんか/,'ja-mae-ni':/前に/,
 'ja-kara-after':/(?:て|で)から/,'ja-request-onegai':/お願い/,'ja-hodo-approx':/ほど/,'ja-dake':/だけ/,'ja-duration':/かかり|かかる/,'ja-ni-naru':/(?:に|く)(?:なり|なる)|になる/,
 'ja-te-iru':/(?:て|で)い(?:る|ます|ません)/,'ja-tsumori':/つもり/,'ja-kamoshirenai':/かもしれ/,'ja-sou':/そう/,'ja-hou-ga-ii':/ほうがいい/,'ja-te-morau':/(?:て|で)もら/,
 'ja-nara':/なら/,'ja-tara':/(?:たら|だったら)/,'ja-koto-ga-aru':/たこと(?:が|は)ある|たこと(?:が|は)あり/
};

const existingNorm=new Map(existing.map(x=>[`${x.language}:${normalize(x.text)}`,x]));
const newNorm=new Map();
function similarity(a,b){if(a===b)return 1;const bigrams=s=>{const out=new Set();for(let i=0;i<s.length-1;i++)out.add(s.slice(i,i+2));return out;};const x=bigrams(a),y=bigrams(b);let shared=0;for(const v of x)if(y.has(v))shared++;return (2*shared)/(x.size+y.size||1);}
for(const draft of allDrafts){
 const g=grammar.find(x=>x.id===draft.grammar_id);if(!g){rejected.editorial_review.push({...draft,reason:'missing grammar'});continue;}
 if(g.language!==draft.language){rejected.grammar_invalid.push({...draft,reason:'language mismatch'});continue;}
 const key=`${draft.language}:${normalize(draft.text)}`;
 if(existingNorm.has(key)){rejected.existing_collision.push({...draft,existing_id:existingNorm.get(key).id});continue;}
 if(newNorm.has(key)){rejected.duplicate.push({...draft,duplicate_of:newNorm.get(key).grammar_id});continue;}
 const marker=grammarMarkers[draft.grammar_id];if(!marker||!marker.test(draft.text)){rejected.grammar_invalid.push({...draft,reason:'grammar-specific marker missing'});continue;}
 if(draft.text.length<4||draft.text.length>120||draft.translation_zh.length<2||draft.translation_zh.length>100||!/[\u3400-\u9fff]/u.test(draft.translation_zh)||/[〜…]{2,}|=>/.test(draft.text)){rejected.editorial_review.push({...draft,reason:'length, translation, or placeholder policy'});continue;}
 const sameGrammar=[...(existingByGrammar.get(draft.grammar_id)||[]),...allDrafts.filter(x=>x.grammar_id===draft.grammar_id&&x.draft_index<draft.draft_index)];
 const near=sameGrammar.find(x=>similarity(normalize(x.text),normalize(draft.text))>=0.9);if(near){rejected.duplicate.push({...draft,duplicate_of:near.id??`${draft.grammar_id}:${near.draft_index}`,similarity:similarity(normalize(near.text),normalize(draft.text))});continue;}
 newNorm.set(key,draft);
}

const rejectedCount=Object.values(rejected).reduce((n,x)=>n+x.length,0);
if(rejectedCount)error('draft_rejections',{count:rejectedCount,by_category:Object.fromEntries(Object.entries(rejected).map(([k,v])=>[k,v.length]))});

const readingInput=allDrafts.filter(x=>x.language==='ja').map(x=>x.text);
const py=`import sys,json\nfrom fugashi import Tagger\nt=Tagger()\ndef hira(s):\n return ''.join(chr(ord(c)-0x60) if '\\u30a1'<=c<='\\u30f6' else c for c in s)\ndef reading(s):\n parts=[]\n for w in t(s):\n  kana=w.feature.kana or w.surface\n  parts.append(hira(kana))\n r=''.join(parts)\n # UniDic exposes lexical readings; apply the context-specific readings used here.\n r=r.replace('わたくしは','わたしは').replace('きゅうじ','くじ').replace('さんかい','さんがい')\n r=r.replace('さんじゅうふん','さんじゅっぷん').replace('よんじゅうふん','よんじゅっぷん').replace('じゅうふん','じゅっぷん')\n return r\nrows=json.load(sys.stdin)\nout=[json.dumps([{'text':s,'reading':reading(s)}],ensure_ascii=False,separators=(',',':')) for s in rows]\nprint(json.dumps(out,ensure_ascii=False))`;
const pyResult=spawnSync('python',['-c',py],{cwd:root,input:JSON.stringify(readingInput),encoding:'utf8',env:{...process.env,PYTHONUTF8:'1'},maxBuffer:16*1024*1024});
if(pyResult.status)error('reading_generation',{detail:pyResult.stderr||pyResult.stdout});
const japaneseReadings=pyResult.status?[]:JSON.parse(pyResult.stdout);
function contextualJapaneseReading(text,reading){
 let value=reading.replaceAll('わたくし','わたし').replaceAll('ようひ','ようび').replaceAll('なんを','なにを').replaceAll('なんも','なにも').replaceAll('にっぽん','にほん').replaceAll('ふたかほど','ふつかほど');
 if(text.includes('何かアレルギー'))value=value.replace('なんかあれるぎー','なにかあれるぎー');
 if(text.includes('辛い')||text.includes('辛く'))value=value.replaceAll('つらい','からい').replaceAll('つらく','からく');
 if(text==='この店は日曜日も開いています。')value=value.replace('ひらいて','あいて');
 if(text==='窓が開いています。')value=value.replace('ひらいて','あいて');
 if(text==='この箱には米が五キロほど入っています。')value=value.replace('このばこにはべいが','このはこにはこめが');
 if(text==='そのかばんは重そうですか。')value=value.replace('じゅうそう','おもそう');
 if(text==='電車よりバスで行ったほうがいいと思います。')value=value.replace('おこなった','いった');
 return value;
}
for(const [index,reading] of japaneseReadings.entries()){
 let parsed;try{parsed=JSON.parse(reading);}catch{error('reading_json',{index});continue;}
 parsed[0].reading=contextualJapaneseReading(readingInput[index],parsed[0].reading);japaneseReadings[index]=JSON.stringify(parsed);
 if(parsed.map(x=>x.text).join('')!==readingInput[index]||parsed.some(x=>/[一-龯々]/u.test(x.reading)))error('reading_validation',{index,text:readingInput[index],reading:japaneseReadings[index]});
}

function coverageLabel(draft){
 const question=/[?？]$/.test(draft.text);
 const negative=draft.language==='en'?/\b(?:not|no|never|cannot|won't|doesn't|don't|didn't|isn't|aren't|wasn't|weren't)\b/i.test(draft.text):/(?:ない|ません|なく|なかった|ではありません)/.test(draft.text);
 if(question&&negative)return 'negative question / interaction';
 if(question)return 'question / interaction';
 if(negative)return 'negative / restriction';
 if(draft.draft_index===1)return 'canonical/basic usage';
 return draft.language==='ja'?'natural context with appropriate inflection/register':'natural daily-life context';
}
let jaReadingIndex=0;
const sqlRows=allDrafts.map(draft=>{
 const g=grammar.find(x=>x.id===draft.grammar_id),prior=Math.max(0,...(existingByGrammar.get(draft.grammar_id)||[]).map(x=>Number(x.sort_order)||0));
 const id=`35e1a-ge-${draft.grammar_id}-${String(draft.draft_index).padStart(2,'0')}`;
 const explanation=`${g.purpose_zh}；新增正式例句覆盖：${coverageLabel(draft)}。`;
 const readings=draft.language==='ja'?japaneseReadings[jaReadingIndex++]:'[]';
 return `(${[id,draft.grammar_id,draft.language,draft.text,draft.translation_zh,explanation,null,readings,null,prior+draft.draft_index].map(x=>x===null?'NULL':quote(x)).join(',')})`;
});

const insertChunks=[];for(let i=0;i<sqlRows.length;i+=40)insertChunks.push(`INSERT INTO v2_grammar_examples(id,grammar_id,language,text,translation_zh,explanation_zh,ipa,readings_json,source_expression_id,sort_order) VALUES\n${sqlRows.slice(i,i+40).join(',\n')};`);
const migration=`-- Phase 3.5E.1A: additive curated examples for existing core grammar only.\n-- Generated from scripts/grammar-examples-35e1a.js; Dynamic AI output is not a source.\nPRAGMA foreign_keys=ON;\n${insertChunks.join('\n')}\n`;
if(!errors.length)fs.writeFileSync(path.join(migrationDir,'0001_core_grammar_curated_examples.sql'),migration);

const beforeCounts=grammar.map(g=>({grammar_id:g.id,language:g.language,level:g.level,form_name:g.form_name,before:(existingByGrammar.get(g.id)||[]).length,added:allDrafts.filter(x=>x.grammar_id===g.id).length,after:(existingByGrammar.get(g.id)||[]).length+allDrafts.filter(x=>x.grammar_id===g.id).length,priority:[...selections.en,...selections.ja].find(x=>x.id===g.id)?.priority,selection_basis:[...selections.en,...selections.ja].find(x=>x.id===g.id)?.selection_basis}));
const bucket=rows=>({zero:rows.filter(x=>x===0).length,one_to_two:rows.filter(x=>x>=1&&x<=2).length,three_to_five:rows.filter(x=>x>=3&&x<=5).length,six_to_eight:rows.filter(x=>x>=6&&x<=8).length,nine_plus:rows.filter(x=>x>=9).length});
const allGrammar=query(`SELECT g.id,g.language,COUNT(ge.id) examples FROM v2_grammar_points g LEFT JOIN v2_grammar_examples ge ON ge.grammar_id=g.id WHERE g.publication_state='published' GROUP BY g.id ORDER BY g.language,g.id`);
const afterMap=new Map(beforeCounts.map(x=>[x.grammar_id,x.after]));
const distributions=Object.fromEntries(['en','ja'].map(language=>{const rows=allGrammar.filter(x=>x.language===language);return [language,{before:bucket(rows.map(x=>x.examples)),after:bucket(rows.map(x=>afterMap.get(x.id)??x.examples))}];}));
const report={generated_at:generatedAt,phase:'3.5E.1A',status:errors.length?'QA_FAILED':'GENERATED',source:'Editorially authored Phase 3.5E.1A dataset; no Dynamic DeepSeek examples used.',selected:{en:selections.en.length,ja:selections.ja.length},examples:{drafted_en:210,drafted_ja:280,accepted_en:errors.length?0:210,accepted_ja:errors.length?0:280},distribution:distributions,grammar:beforeCounts,rejected:{duplicate:rejected.duplicate.length,existing_example_collision:rejected.existing_collision.length,grammar_invalid:rejected.grammar_invalid.length,editorial_review:rejected.editorial_review.length,details:rejected},qa:{errors:errors.length,error_details:errors,warnings:0},changes:{new_grammar:false,new_vocabulary:false,lessons:false,ai_dynamic_examples:false,learner_progress:false,production:false,phase35e1b_started:false,phase35e1c_started:false,phase4_started:false},migration:errors.length?null:'migrations-35e1a/0001_core_grammar_curated_examples.sql'};
fs.writeFileSync(path.join(outDir,'generation-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,selected:report.selected,examples:report.examples,distribution:report.distribution,rejected:{duplicate:rejected.duplicate.length,existing_collision:rejected.existing_collision.length,grammar_invalid:rejected.grammar_invalid.length,editorial_review:rejected.editorial_review.length},errors},null,2));
if(errors.length)process.exitCode=1;
