// Analyze immutable Phase 3 migrations. This produces reports only, never writes a database.
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
const db=new DatabaseSync(':memory:');
for(const file of fs.readdirSync('migrations').sort())db.exec(fs.readFileSync('migrations/'+file,'utf8'));
const concepts=db.prepare('SELECT c.*,e.text AS en,j.text AS ja FROM concepts c JOIN expressions e ON e.concept_id=c.id AND e.language=\'en\' AND e.is_primary=1 JOIN expressions j ON j.concept_id=c.id AND j.language=\'ja\' AND j.is_primary=1 ORDER BY c.id').all();
// Editorial decisions for phrases. Pragmatic utterances remain Sentence units;
// discourse connectors may become lexical fixed expressions after sense review.
const phraseNotes={
 17:'问候是完整社交回应，保留情境和礼貌变体。',26:'That said / とはいえ 是可复用话语连接表达；各自建固定表达义项和例句，核对语篇功能。',
 29:'点单/递水请求是交际句，不把 water 与完整请求视为同一词条。',38:'完整判断句含 acquired taste 词汇成分；句子为主，后续可另抽取词条。',
 41:'确认收到并致谢，两个交际动作组成回应。',50:'保留判断的完整陈述；reserve judgment 可另提取词组。',
 53:'邀请客人坐下的场景回应。',62:'待客用语，英语习语和日语自然回应不应逐词等同。',
 65:'请求稍候的完整场景回应；日语敬语需要独立标注。',74:'暂定日期的完整建议；pencil in 可另提取词组。',
 77:'商店场景的自然回应。',86:'完整评价句，并非词汇短语。',89:'通行场景回应；英语 excuse me 的其他功能必须分义。',
 98:'完整接送承诺句；pick up 和 on the way 可另提取词组。',101:'完整天气感叹。',110:'描述天气变化的完整推测句。',
 113:'对病人的场景回应；Take care 的告别义与お大事に并非普遍等价。',122:'完整恢复状态陈述；get back on one’s feet 可单列义项。',
 125:'对好消息的场景反应。',134:'完整情绪陈述；mixed feelings 可另建词汇。',137:'回应邀约的场景反应。',
 146:'完整变化陈述；grow on somebody 需要单独义项，不直配日语句子。',149:'完整致谢场景。',158:'完整请求延后答复，保留语用条件。',
 161:'致谢场景；助かります含受益语气，非逐词等价。',170:'完整请求铺垫；日语以ので结尾依赖后续语境，需审定响应边界。',
 173:'婉拒或延后邀请的场景回应，语气依情境。',182:'完整回顾后悔句；不是固定词汇短语。'
};
const lexicalReview={
 34:'英语 light 为多义形容词；日语あっさりした需确定词头为あっさり，不能照抄修饰形式。',
 46:'日语改善のための意見是说明性名词短语；需编辑选择自然词头及词义范围。',
 58:'日语散らかった物是描述短语；英语 clutter 为不可数名词，需独立选词。',
 64:'appointment与予約范围不完全相同；区分私人见面、预约服务与约定。',
 70:'buffer与余裕语义范围不同，须限制为时间余量并补搭配。',
 82:'英语 good value 可作词汇搭配；日语値段の割にいい含可生产语法结构，建议另保留句子例证。',
 112:'英语 thirsty 是形容词；日语喉が渇いた是完整状态表达，可拆词汇与Sentence，不能伪造一对一词头。',
 118:'英语 run-down 是词汇项；日语疲れがたまっている是状态句，需拆分词汇与Sentence。',
 130:'日语いっぱいいっぱい口语用法与英语 overwhelmed含义范围不同。',
 142:'两边均为可复用词组，但要分别处理get absorbed in的介词补足与夢中になる。',
 154:'日语気遣いができる包含能力结构，优先词头気遣い并保留句子用法。',
 172:'legacy plan未标明名词/动词语义；日语予定是名词。代表样本en-plan为动词，不可直接复用该ID。',
 178:'look forward to / 楽しみにする表示愉快期待，不等于expect或所有期待する用法。'
};
const scenarioPhrases=new Set([17,29,41,53,62,65,77,89,113,125,137,149,158,161,170,173]);
const records=concepts.map(c=>{
 let destination,notes,review=false,confidence='high';
 if(c.concept_type==='vocabulary'){
  destination='Vocabulary';notes=lexicalReview[c.id]||'按目标语言分别抽取词头、词性、义项和阶段；不共享词汇ID。';
  review=!!lexicalReview[c.id];
 }else if(c.concept_type==='pattern'){
  destination='Grammar + Sentence examples';notes='分别从 '+c.en+' 与 '+c.ja+' 提取语法功能，去重到独立语法库；把省略槽位填成经审定的具体例句，模板本身不作Sentence。';
  review=true;
  if(c.id===180)notes+=' 英语would have为反事实条件/未实现结果，日语つもりでした为过去意图；二者不是语法等价，需要重审共同锚点。';
  if(c.id===104)notes+=' 日语そう的样态/传闻须分开；不能仅由中文看起来决定。';
 }else if(c.concept_type==='phrase'){
  destination=c.id===26?'Vocabulary fixed_expression':scenarioPhrases.has(c.id)?'Sentence scenario':'Sentence';
  notes=phraseNotes[c.id];if(!notes)throw Error('Missing phrase editorial decision '+c.id);
  review=[26,38,62,74,89,113,122,146,170,182].includes(c.id);
 }else {destination=c.concept_type==='dialogue'?'Sentence dialogue':c.concept_type==='scenario_response'?'Sentence scenario':'Sentence';notes=c.concept_type==='dialogue'?'保留共同交际目标；各语言独立拆成有序说话人轮次，链接到实际词汇/语法。':c.concept_type==='scenario_response'?'将中文交际条件放入context，保留各语言自然回应及适切性说明。':'保留中文语义锚点，各语言分别建立表达、阅读、三维难度及实际知识链接。';}
 if(review)confidence=c.id===180||[46,82,112,118,154,172].includes(c.id)?'low':'medium';
 const lexical=destination.startsWith('Vocabulary'),grammar=destination.startsWith('Grammar');
 const handling=Object.fromEntries(['en','ja'].map(language=>[language,{source_expression:c[language],action:grammar?'独立语法点去重 + 具体Sentence例句':lexical?'独立词头/词性/义项；不沿用另一语言阶段':'独立表达与实际知识链接',difficulty:lexical?'重新编辑Stage 1–6':grammar?'重新编辑Grammar Level 1–6':'独立评定词汇、语法、整体难度'}]));
 return {legacy_concept_id:c.id,legacy_type:c.concept_type,chinese_anchor:c.zh,proposed_v2_destination:destination,proposed_language_handling:handling,confidence,notes,human_review_needed:review};
});
if(records.length!==183||new Set(records.map(x=>x.legacy_concept_id)).size!==183)throw Error('Expected all 183 concepts');
const count=key=>records.reduce((a,r)=>(a[r[key]]=(a[r[key]]||0)+1,a),{});
const summary={total:183,destination_counts:count('proposed_v2_destination'),confidence_counts:count('confidence'),human_review_ids:records.filter(x=>x.human_review_needed).map(x=>x.legacy_concept_id)};
fs.writeFileSync('docs/phase35a/legacy-mapping.json',JSON.stringify({version:'3.5A-proposal-1',source:'Immutable migrations 0001–0005; no data migrated',summary,records},null,2));
const escape=s=>s.replaceAll('|','\\|').replaceAll('\n',' ');
fs.writeFileSync('docs/phase35a/legacy-mapping.md',`# Phase 3 → V2 mapping proposal\n\nAll 183 Concepts are analyzed from local immutable migrations. This report is an editorial migration proposal, not executed migration or approval. Per-language source text and proposed handling are in the JSON companion.\n\n${Object.entries(summary.destination_counts).map(([k,v])=>'- '+k+': '+v).join('\n')}\n\nHuman review: ${summary.human_review_ids.length} items (${summary.human_review_ids.join(', ')}). Every pattern requires independent grammar selection and concrete examples; ambiguous lexical identity and communicative phrase boundaries are marked below. High confidence classifies the destination only, not content approval or automatic mastery transfer.\n\n| ID | Legacy type | Chinese anchor | Destination | Language handling (EN / JA) | Confidence | Review | Editorial decision |\n|---|---|---|---|---|---|---|---|\n${records.map(r=>`| ${r.legacy_concept_id} | ${r.legacy_type} | ${escape(r.chinese_anchor)} | ${r.proposed_v2_destination} | ${escape(r.proposed_language_handling.en.source_expression)} / ${escape(r.proposed_language_handling.ja.source_expression)}; independent IDs & difficulty | ${r.confidence} | ${r.human_review_needed?'Yes':'No'} | ${escape(r.notes)} |`).join('\n')}\n`);
console.log(JSON.stringify(summary,null,2));
