import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e1a1');
const migrationDir=path.join(root,'migrations-35e1a1');
const config='wrangler.35e1a.local.jsonc';
const persist='.wrangler/phase35e1a-release';
fs.mkdirSync(outDir,{recursive:true});
fs.mkdirSync(migrationDir,{recursive:true});

function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',config,'--persist-to',persist,'--command',sql,'--json'];
 const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(r.status)throw Error(r.stderr||r.stdout);
 return JSON.parse(r.stdout.slice(r.stdout.indexOf('[')))[0].results;
}
const quote=value=>`'${String(value).replaceAll("'","''")}'`;
const id=(grammar,index)=>`35e1a-ge-${grammar}-${String(index).padStart(2,'0')}`;

const overrides=new Map([
 [id('en-wh-question',6),['CONTRAST','主语疑问词直接充当主语，不采用目标公式中的助动词倒装；作为必要语序对比保留。']],
 [id('en-possessive',6),['CONTRAST','mine 是独立所有格代词，不是目标公式中的 possessive determiner + noun；作为形式对比保留。']],
 [id('en-comparative',4),['CONTRAST','使用比较级 closer，但比较标准由语境省略，没有显式 than 短语。']],
 [id('en-comparative',6),['CONTRAST','使用 more convenient，但比较标准由问句语境恢复，没有显式 than 短语。']],
 [id('en-will',3),['CONTRAST','will 问句询问未来状态，不是该 Grammar 核心的当场决定或承诺。']],
 [id('en-will',4),['CONTRAST','will 表示安排/中性未来，不是该 Grammar 核心的当场决定或承诺。']],
 [id('en-will',5),['CONTRAST','will 表示预测，不是该 Grammar 核心的当场决定或承诺。']],
 [id('en-shall-suggestion',4),['CONTRAST','Where shall we… 是共同安排的 wh-question，不是 canonical Shall we…? 提议句。']],
 [id('en-shall-suggestion',6),['CONTRAST','What shall we do… 是共同决策问句，不是 canonical Shall we…? 提议句。']],
 [id('en-might',6),['CONTRAST','might want to 是委婉建议用法，不是单纯陈述事件可能性。']],
 [id('en-since-for',3),['SUPPORT','How long + present perfect 能引出 since/for 答语，但句内没有实际出现 since 或 for。']],
 [id('en-would-rather',6),['CONTRAST','would rather + different subject + past form 不同于目标公式的同主语 would rather + base verb。']],
 [id('en-ever-perfect',3),['CONTRAST','never 是经验问句中 ever 的否定对应形式；不直接实例化 Have you ever…?。']],

 [id('ja-plain-nonpast',4),['CONTRAST','行かない是普通体非过去否定形，不是目标公式的辞书形。']],
 [id('ja-copula',2),['CONTRAST','ではありません是礼貌否定 copula，与 canonical です作必要对比。']],
 [id('ja-copula',7),['CONTRAST','でした是礼貌过去 copula，与 canonical です作时态对比。']],
 [id('ja-ga-existence',3),['CONTRAST','否定存在句使用主题化的薬局はありません，没有直接出现名词 + がある/いる。']],
 [id('ja-ga-existence',5),['SUPPORT','店ができました表达“新店开成/出现”，教学上相关，但没有实例化がある/いる。']],
 [id('ja-ga-existence',6),['CONTRAST','には…いません是否定存在并带主题/范围化，不是 canonical 名词 + がいる。']],
 [id('ja-polite-present',3),['CONTRAST','使いません是礼貌非过去否定，与目标公式ます干 + ます作极性对比。']],
 [id('ja-plain-past',2),['CONTRAST','食べなかった是普通体过去否定，不是目标公式的肯定た形。']],
 [id('ja-plain-past',5),['CONTRAST','間に合わなかった是普通体过去否定，不是目标公式的肯定た形。']],
 [id('ja-polite-negative',5),['CONTRAST','使いませんでした是礼貌过去否定，与目标非过去〜ません作时态对比。']],
 [id('ja-polite-past',3),['CONTRAST','食べませんでした是礼貌过去否定，不直接实例化肯定〜ました。']],
 [id('ja-te-kudasai',4),['CONTRAST','撮らないでください是禁止/负向请求，接续为ないでください，不是 verb て形 + ください。']],
 [id('ja-ni-naru',4),['SUPPORT','午後三時からになります是日程确定表达；含になります，但补语不是目标公式的名词/な形容词 + に。']],
 [id('ja-ni-naru',5),['CONTRAST','眠くなる展示い形容词 + くなる，与目标名词/な形容词 + になる作必要接续对比。']]
]);

const examples=query(`SELECT ge.id,ge.grammar_id,ge.language,ge.text,ge.translation_zh,g.form_name,g.formula,g.core_zh
 FROM v2_grammar_examples ge JOIN v2_grammar_points g ON g.id=ge.grammar_id
 WHERE ge.id LIKE '35e1a-ge-%' ORDER BY ge.language,g.level,g.sort_order,ge.sort_order,ge.id`);
const errors=[];
if(examples.length!==490)errors.push({code:'example_count',expected:490,observed:examples.length});
if(new Set(examples.map(x=>x.grammar_id)).size!==75)errors.push({code:'grammar_count',expected:75,observed:new Set(examples.map(x=>x.grammar_id)).size});
if(examples.filter(x=>x.language==='en').length!==210||examples.filter(x=>x.language==='ja').length!==280)errors.push({code:'language_counts'});
for(const key of overrides.keys())if(!examples.some(x=>x.id===key))errors.push({code:'override_missing',id:key});

const directMarkers={
 'en-simple-present':/\b(?:do|does|walks|eat|drink|closes|live|boils)\b/i,'en-be-adjective':/\b(?:am|is|are|was|were)\b/i,'en-present-continuous':/\b(?:am|is|are)\b[^.?!]{0,45}\bing\b|\b(?:waiting|using|looking|sleeping|staying|making)\b/i,
 'en-do-question':/^(?:Do|Does)\b.+\?$/,'en-there-is':/^There (?:is|are|was)\b|^(?:Is|Are) there\b/,'en-have-possession':/\b(?:have|has)\b/i,'en-wh-question':/^(?:What|Where|Why|How|When|Which)\b.+\?$/,
 'en-imperative':/^(?:Turn|Please keep|Do not touch|Take|Let|Check)\b/,'en-want-to':/\bwant(?:ed|s)? to\b/i,'en-possessive':/\b(?:my|your|his|her|our|their)\b/i,'en-greeting':/.+/,'en-noun-please':/.+/,
 'en-simple-past':/\b(?:arrived|did|left|changed|was|were|said)\b/i,'en-plan-to':/\bplan(?:ned|s)? to\b/i,'en-can-request':/^Can you\b.+\?$/,'en-can-ability':/\b(?:can|cannot)\b/i,'en-could-request':/^Could you\b.+\?$/,
 'en-going-to':/\b(?:am|is|are)\b[^.?!]{0,20}\bgoing to\b/i,'en-will':/\b(?:will|won't|'ll)\b/i,'en-comparative':/\b(?:cheaper|faster|warmer|busier)\b[^.?!]*\bthan\b/i,'en-would-like':/\bwould (?:not )?(?:like|prefer)|\bWould\b.+\blike\b/i,
 'en-let-us':/\bLet's\b/,'en-before-after':/\b(?:before|after)\b/i,'en-enjoy-ing':/\benjoy(?:ed|s)?\b[^.?!]{0,35}\b\w+ing\b/i,'en-take-time':/\bIt (?:does not take|takes|took|will take)\b|\bdoes it take\b/i,
 'en-shall-suggestion':/^Shall we\b.+\?$/,'en-ellipsis':/.+/,'en-may':/\bmay\b/i,'en-might':/\bmight\b/i,'en-indirect-question':/\b(?:tell me|know|remember|explain|asked|wonder)\b/i,
 'en-since-for':/\b(?:have|has|'ve)\b[^.?!]{0,60}\b(?:since|for)\b|\b(?:since|for)\b[^.?!]{0,60}\b(?:have|has|'ve)\b/i,'en-as-long-as':/\bas long as\b/i,'en-would-rather':/\bwould rather (?:not )?[a-z]+\b|\bWould you rather\b/i,'en-what-if':/^What if\b.+\?$/,'en-ever-perfect':/\bever\b/i,
 'ja-plain-nonpast':/(?:る|う|く|す|つ|む|ぶ|ぬ|ぐ)[。？?]$/,'ja-copula':/です(?:か)?[。？?]$/,'ja-wa-topic':/は/,'ja-ga-existence':/が(?:あります|います|ありません|いません)/,'ja-wo-object':/を/,'ja-ni-time':/に/,'ja-de-place':/で/,'ja-no-possession':/の/,'ja-ka-question':/か[。？?]$/,
 'ja-i-adjective':/(?:いです|くないです|かったです|くありません|い店)/,'ja-suki':/好き/,'ja-polite-present':/ます(?:か)?[。？?]$/,'ja-greeting':/.+/,'ja-plain-past':/(?:た|った|んだ|いだ)の?[。？?]$/,'ja-te-form':/(?:て|で)/,
 'ja-polite-negative':/ません(?:か)?[。？?]$/,'ja-polite-past':/ました(?:か)?[。？?]$/,'ja-te-kudasai':/(?:て|で)ください/,'ja-tai':/た(?:い|くありません|かった)/,'ja-nai':/ない/,'ja-potential':/(?:話せ|でき|行け|眠れ|使え|開けられ)/,
 'ja-te-mo-ii':/(?:てもいい|でもいい|なくてもいい)/,'ja-mashou':/ましょう/,'ja-masen-ka':/ませんか/,'ja-mae-ni':/前に/,'ja-kara-after':/(?:て|で)から/,'ja-request-onegai':/お願い/,'ja-hodo-approx':/ほど/,'ja-dake':/だけ/,
 'ja-duration':/かかり|かかる/,'ja-ni-naru':/(?:に)(?:なり|なる)/,'ja-te-iru':/(?:て|で)い(?:る|ます|ません)/,'ja-tsumori':/つもり/,'ja-kamoshirenai':/かもしれ/,'ja-sou':/そう/,'ja-hou-ga-ii':/ほうがいい/,
 'ja-te-morau':/(?:て|で)もら/,'ja-nara':/なら/,'ja-tara':/(?:たら|だったら)/,'ja-koto-ga-aru':/たこと(?:が|は)ある|たこと(?:が|は)あり/
};

const classified=examples.map(example=>{
 const override=overrides.get(example.id);
 const target_role=override?.[0]||'DIRECT';
 const rationale_zh=override?.[1]||`直接实现「${example.form_name}」的目标形式，并保持该 Grammar 的核心功能。`;
 if(target_role==='DIRECT'){
  const marker=directMarkers[example.grammar_id];
  if(!marker||!marker.test(example.text))errors.push({code:'direct_marker_missing',id:example.id,grammar_id:example.grammar_id,text:example.text});
 }
 return {...example,target_role,rationale_zh};
});
const totals=Object.fromEntries(['DIRECT','CONTRAST','SUPPORT','INVALID'].map(role=>[role,classified.filter(x=>x.target_role===role).length]));
if(Object.values(totals).reduce((a,b)=>a+b,0)!==490)errors.push({code:'role_total'});
if(totals.INVALID!==0)errors.push({code:'invalid_examples_remain',count:totals.INVALID});

const sqlRows=classified.map(row=>`(${quote(row.id)},${quote(row.grammar_id)},${quote(row.language)},${quote(row.target_role)},${quote(row.rationale_zh)},'3.5E.1A.1','2026-09-10')`);
const chunks=[];
for(let i=0;i<sqlRows.length;i+=50)chunks.push(`INSERT INTO v2_grammar_example_target_audits(example_id,grammar_id,language,target_role,rationale_zh,audit_phase,audited_at) VALUES\n${sqlRows.slice(i,i+50).join(',\n')};`);
const migration=`-- Phase 3.5E.1A.1: additive target-fidelity roles for the 490 Phase 3.5E.1A examples.\n-- This migration does not change, delete, or replace curated examples.\nPRAGMA foreign_keys=ON;\nCREATE TABLE v2_grammar_example_target_audits (\n example_id TEXT PRIMARY KEY REFERENCES v2_grammar_examples(id) ON DELETE CASCADE,\n grammar_id TEXT NOT NULL REFERENCES v2_grammar_points(id) ON DELETE CASCADE,\n language TEXT NOT NULL CHECK(language IN ('en','ja')),\n target_role TEXT NOT NULL CHECK(target_role IN ('DIRECT','CONTRAST','SUPPORT','INVALID')),\n rationale_zh TEXT NOT NULL,\n audit_phase TEXT NOT NULL,\n audited_at TEXT NOT NULL\n);\nCREATE INDEX idx_v2_grammar_example_target_audits_grammar_role ON v2_grammar_example_target_audits(grammar_id,target_role);\n${chunks.join('\n')}\n`;
if(!errors.length)fs.writeFileSync(path.join(migrationDir,'0001_curated_grammar_example_target_roles.sql'),migration);

const report={generated_at:new Date().toISOString(),phase:'3.5E.1A.1',status:errors.length?'QA_FAILED':'GENERATED',scope:{examples:examples.length,grammar:new Set(examples.map(x=>x.grammar_id)).size,en:examples.filter(x=>x.language==='en').length,ja:examples.filter(x=>x.language==='ja').length},totals,errors,changes:{examples_corrected:0,examples_removed:0,replacements_added:0,new_grammar:0,new_vocabulary:0,lessons:0,dialogues:0,dynamic_examples:0,learner_progress:0,production:0},rows:classified.map(({form_name,formula,core_zh,...row})=>row)};
fs.writeFileSync(path.join(outDir,'target-fidelity-preflight.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,scope:report.scope,totals,errors},null,2));
if(errors.length)process.exitCode=1;
