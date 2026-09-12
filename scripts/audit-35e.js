import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';

const root=process.cwd();
const outDir=path.join(root,'docs','phase35e');
fs.mkdirSync(outDir,{recursive:true});
const generatedAt=new Date().toISOString();
const config='wrangler.35d1.local.jsonc';
const persist='.wrangler/phase35d-clean';

function query(sql){
 const args=['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config',config,'--persist-to',persist,'--command',sql,'--json'];
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
 if(result.status)throw Error(result.stderr||result.stdout);
 const start=result.stdout.indexOf('[');
 if(start<0)throw Error(`No JSON result for query: ${sql.slice(0,120)}`);
 return JSON.parse(result.stdout.slice(start))[0].results;
}
const write=(name,value)=>fs.writeFileSync(path.join(outDir,name),JSON.stringify(value,null,2)+'\n');
const pct=(n,d)=>d?Number((n*100/d).toFixed(1)):0;
const normalize=value=>String(value??'').normalize('NFKC').trim().toLocaleLowerCase();
const range=(min,max)=>({min,max});

const baseline=query(`SELECT
 (SELECT COUNT(*) FROM v2_vocabulary_items WHERE publication_state='published') vocabulary,
 (SELECT COUNT(*) FROM v2_grammar_points WHERE publication_state='published') grammar,
 (SELECT COUNT(*) FROM v2_sentence_units WHERE publication_state='published') semantic_units,
 (SELECT COUNT(*) FROM v2_sentence_expressions WHERE publication_state='published') expressions,
 (SELECT COUNT(*) FROM lesson_units WHERE status='published') lessons,
 (SELECT COUNT(*) FROM v2_grammar_examples) grammar_examples,
 (SELECT COUNT(*) FROM v2_vocabulary_examples) vocabulary_examples,
 (SELECT COUNT(*) FROM v2_dialogue_turns) dialogue_turns,
 (SELECT COUNT(*) FROM v2_vocabulary_relations) vocabulary_relations,
 (SELECT COUNT(*) FROM v2_grammar_relations) grammar_relations`).at(0);

const languageCoverage=query(`SELECT lang.language,
 (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language=lang.language AND publication_state='published') vocab,
 (SELECT COUNT(*) FROM v2_grammar_points WHERE language=lang.language AND publication_state='published') grammar,
 (SELECT COUNT(*) FROM v2_sentence_expressions WHERE language=lang.language AND publication_state='published') expressions,
 (SELECT COUNT(*) FROM lesson_units WHERE language=lang.language AND status='published') lessons,
 (SELECT COUNT(DISTINCT i.content_id) FROM lesson_items i JOIN lesson_units l ON l.id=i.lesson_id WHERE l.language=lang.language AND i.content_type='vocabulary') linked_vocab,
 (SELECT COUNT(DISTINCT i.content_id) FROM lesson_items i JOIN lesson_units l ON l.id=i.lesson_id WHERE l.language=lang.language AND i.content_type='grammar') linked_grammar,
 (SELECT COUNT(DISTINCT i.content_id) FROM lesson_items i JOIN lesson_units l ON l.id=i.lesson_id WHERE l.language=lang.language AND i.content_type='expression') linked_expressions
 FROM (SELECT 'en' language UNION ALL SELECT 'ja') lang ORDER BY lang.language`);

const topics=query(`SELECT id,name_zh,sort_order FROM v2_topics ORDER BY sort_order,id`);
const topicIds=new Set(topics.map(x=>x.id));
const vocab=query(`SELECT v.id,v.language,v.lemma,v.type,v.stage,v.reading,v.part_of_speech,v.register,
 MIN(s.meaning_zh) meaning_zh,COUNT(DISTINCT ex.id) example_count,
 COUNT(DISTINCT sv.expression_id) expression_uses,COUNT(DISTINCT li.lesson_id) lesson_uses,
 COUNT(DISTINCT vr.target_id||':'||vr.type) relation_count,
 GROUP_CONCAT(DISTINCT vt.topic_id) topic_ids
 FROM v2_vocabulary_items v
 LEFT JOIN v2_vocabulary_senses s ON s.item_id=v.id
 LEFT JOIN v2_vocabulary_examples ex ON ex.item_id=v.id
 LEFT JOIN v2_sentence_vocabulary_links sv ON sv.item_id=v.id
 LEFT JOIN lesson_items li ON li.content_type='vocabulary' AND li.content_id=v.id
 LEFT JOIN v2_vocabulary_relations vr ON vr.source_id=v.id
 LEFT JOIN v2_vocabulary_topics vt ON vt.item_id=v.id
 WHERE v.publication_state='published' GROUP BY v.id ORDER BY v.language,v.stage,v.sort_order,v.id`)
 .map(x=>({...x,topics:x.topic_ids?x.topic_ids.split(','):[]}));

const grammar=query(`SELECT g.id,g.language,g.level,g.slug,g.title_zh,g.form_name,g.core_zh,g.purpose_zh,g.formula,g.when_zh,g.register,
 COUNT(DISTINCT ge.id) example_count,COUNT(DISTINCT sg.expression_id) expression_uses,
 COUNT(DISTINCT li.lesson_id) lesson_uses,COUNT(DISTINCT gr.target_id||':'||gr.type) relation_count
 FROM v2_grammar_points g
 LEFT JOIN v2_grammar_examples ge ON ge.grammar_id=g.id
 LEFT JOIN v2_sentence_grammar_links sg ON sg.grammar_id=g.id
 LEFT JOIN lesson_items li ON li.content_type='grammar' AND li.content_id=g.id
 LEFT JOIN v2_grammar_relations gr ON gr.source_id=g.id
 WHERE g.publication_state='published' GROUP BY g.id ORDER BY g.language,g.level,g.sort_order,g.id`);

const grammarExampleRows=query(`SELECT grammar_id,language,text,translation_zh,explanation_zh,source_expression_id FROM v2_grammar_examples ORDER BY grammar_id,sort_order,id`);
const vocabularyExampleKinds=query(`SELECT v.language,ex.kind,COUNT(*) count FROM v2_vocabulary_examples ex JOIN v2_vocabulary_items v ON v.id=ex.item_id GROUP BY v.language,ex.kind ORDER BY v.language,ex.kind`);

const expressions=query(`SELECT e.id,e.language,e.text,e.register,e.overall_difficulty,e.vocabulary_difficulty,e.grammar_difficulty,
 u.id unit_id,u.topic_id,u.unit_type,u.anchor_zh,u.context_zh,
 COUNT(DISTINCT dt.id) dialogue_turns,COUNT(DISTINCT sv.item_id) vocabulary_links,
 COUNT(DISTINCT sg.grammar_id) grammar_links,COUNT(DISTINCT li.lesson_id) lesson_uses
 FROM v2_sentence_expressions e JOIN v2_sentence_units u ON u.id=e.unit_id
 LEFT JOIN v2_dialogue_turns dt ON dt.expression_id=e.id
 LEFT JOIN v2_sentence_vocabulary_links sv ON sv.expression_id=e.id
 LEFT JOIN v2_sentence_grammar_links sg ON sg.expression_id=e.id
 LEFT JOIN lesson_items li ON li.content_type='expression' AND li.content_id=e.id
 WHERE e.publication_state='published' AND u.publication_state='published'
 GROUP BY e.id ORDER BY e.language,u.sort_order,e.sort_order,e.id`);

const lessonRows=query(`SELECT l.id,l.language,l.stage,l.topic_id,l.title,l.objective,l.sequence,l.estimated_minutes,
 (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='vocabulary') vocab_count,
 (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='grammar') grammar_count,
 (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.content_type='expression') expression_count,
 (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.role='required') required_count,
 (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.role='support') support_count,
 (SELECT COUNT(*) FROM lesson_items i WHERE i.lesson_id=l.id AND i.role='exposure') exposure_count,
 (SELECT COUNT(DISTINCT dt.id) FROM lesson_items i JOIN v2_dialogue_turns dt ON i.content_type='expression' AND dt.expression_id=i.content_id WHERE i.lesson_id=l.id) dialogue_turns,
 (SELECT COUNT(DISTINCT CASE WHEN u.unit_type='scenario' THEN e.id END) FROM lesson_items i JOIN v2_sentence_expressions e ON i.content_type='expression' AND e.id=i.content_id JOIN v2_sentence_units u ON u.id=e.unit_id WHERE i.lesson_id=l.id) scenarios,
 (SELECT COUNT(DISTINCT CASE WHEN u.unit_type='dialogue' THEN e.id END) FROM lesson_items i JOIN v2_sentence_expressions e ON i.content_type='expression' AND e.id=i.content_id JOIN v2_sentence_units u ON u.id=e.unit_id WHERE i.lesson_id=l.id) dialogues,
 (SELECT COUNT(DISTINCT sv.item_id) FROM lesson_items ie JOIN v2_sentence_vocabulary_links sv ON ie.content_type='expression' AND sv.expression_id=ie.content_id JOIN lesson_items iv ON iv.lesson_id=l.id AND iv.content_type='vocabulary' AND iv.content_id=sv.item_id WHERE ie.lesson_id=l.id) used_lesson_vocab,
 (SELECT COUNT(DISTINCT sg.grammar_id) FROM lesson_items ie JOIN v2_sentence_grammar_links sg ON ie.content_type='expression' AND sg.expression_id=ie.content_id JOIN lesson_items ig ON ig.lesson_id=l.id AND ig.content_type='grammar' AND ig.content_id=sg.grammar_id WHERE ie.lesson_id=l.id) used_lesson_grammar,
 ROUND((SELECT AVG(v.stage) FROM lesson_items i JOIN v2_vocabulary_items v ON i.content_type='vocabulary' AND v.id=i.content_id WHERE i.lesson_id=l.id),2) avg_vocab_stage,
 ROUND((SELECT AVG(g.level) FROM lesson_items i JOIN v2_grammar_points g ON i.content_type='grammar' AND g.id=i.content_id WHERE i.lesson_id=l.id),2) avg_grammar_level,
 ROUND((SELECT AVG(e.overall_difficulty) FROM lesson_items i JOIN v2_sentence_expressions e ON i.content_type='expression' AND e.id=i.content_id WHERE i.lesson_id=l.id),2) avg_expression_difficulty
 FROM lesson_units l WHERE l.status='published' ORDER BY l.language,l.stage,l.sequence`);

const lessonItems=query(`SELECT i.lesson_id,i.content_type,i.content_id,i.role,i.required,i.sequence,
 COALESCE(v.lemma,g.form_name,e.text) label,
 COALESCE(v.stage,g.level,e.overall_difficulty) content_level
 FROM lesson_items i
 LEFT JOIN v2_vocabulary_items v ON i.content_type='vocabulary' AND v.id=i.content_id
 LEFT JOIN v2_grammar_points g ON i.content_type='grammar' AND g.id=i.content_id
 LEFT JOIN v2_sentence_expressions e ON i.content_type='expression' AND e.id=i.content_id
 ORDER BY i.lesson_id,i.content_type,i.sequence`);

const alignments=query(`SELECT framework_id,target,language,status,source_type,COUNT(*) items,
 SUM(vocabulary_id IS NOT NULL) vocabulary,SUM(grammar_id IS NOT NULL) grammar,SUM(expression_id IS NOT NULL) expressions
 FROM v2_content_alignments GROUP BY framework_id,target,language,status,source_type ORDER BY framework_id,target,source_type`);

const canonicalDuplicates=query(`SELECT language,LOWER(TRIM(lemma)) normalized_lemma,COUNT(*) count,GROUP_CONCAT(id,' | ') ids,GROUP_CONCAT(stage,' | ') stages
 FROM v2_vocabulary_items WHERE publication_state='published' GROUP BY language,LOWER(TRIM(lemma)) HAVING COUNT(*)>1 ORDER BY language,normalized_lemma`);

const languageName={en:'English',ja:'Japanese'};
const byLanguage=language=>languageCoverage.find(x=>x.language===language);
const stageVocabulary=['en','ja'].flatMap(language=>[1,2,3,4,5,6].map(stage=>{
 const rows=vocab.filter(x=>x.language===language&&x.stage===stage);
 return {language,stage,total:rows.length,lesson_linked:rows.filter(x=>x.lesson_uses>0).length,unassigned:rows.filter(x=>x.lesson_uses===0).length,
  no_expression_usage:rows.filter(x=>x.expression_uses===0).length,no_semantic_relation:rows.filter(x=>x.relation_count===0).length,
  examples:{zero:rows.filter(x=>x.example_count===0).length,one:rows.filter(x=>x.example_count===1).length,two_to_three:rows.filter(x=>x.example_count>=2&&x.example_count<=3).length,four_plus:rows.filter(x=>x.example_count>=4).length}};
}));

const grammarBuckets=['en','ja'].map(language=>{
 const rows=grammar.filter(x=>x.language===language);
 return {language,total:rows.length,zero:rows.filter(x=>x.example_count===0).length,one_to_two:rows.filter(x=>x.example_count>=1&&x.example_count<=2).length,
  three_to_five:rows.filter(x=>x.example_count>=3&&x.example_count<=5).length,six_to_eight:rows.filter(x=>x.example_count>=6&&x.example_count<=8).length,nine_plus:rows.filter(x=>x.example_count>=9).length};
});

const unitDistribution=['en','ja'].flatMap(language=>['sentence','scenario','dialogue'].map(unit_type=>{
 const rows=expressions.filter(x=>x.language===language&&x.unit_type===unit_type);
 return {language,unit_type,expressions:rows.length,with_dialogue_turns:rows.filter(x=>x.dialogue_turns>0).length,dialogue_turns:rows.reduce((n,x)=>n+x.dialogue_turns,0)};
}));

const topicCoverage=['en','ja'].flatMap(language=>topics.map(topic=>{
 const topicVocab=vocab.filter(x=>x.language===language&&x.topics.includes(topic.id));
 const topicExpressions=expressions.filter(x=>x.language===language&&x.topic_id===topic.id);
 const topicLessons=lessonRows.filter(x=>x.language===language&&x.topic_id===topic.id);
 return {language,topic_id:topic.id,topic_name_zh:topic.name_zh,lessons:topicLessons.length,
  lesson_stages:[...new Set(topicLessons.map(x=>x.stage))],vocabulary:topicVocab.length,lesson_linked_vocabulary:topicVocab.filter(x=>x.lesson_uses>0).length,
  expressions:topicExpressions.length,lesson_linked_expressions:topicExpressions.filter(x=>x.lesson_uses>0).length,
  sentences:topicExpressions.filter(x=>x.unit_type==='sentence').length,scenarios:topicExpressions.filter(x=>x.unit_type==='scenario').length,
  dialogues:topicExpressions.filter(x=>x.unit_type==='dialogue').length,dialogue_turns:topicExpressions.reduce((n,x)=>n+x.dialogue_turns,0)};
}));

const lessonNotes={
 'en-s1-l1':['Needs enrichment','问候目标与 “What are you doing?/tired/don’t know” 混在一起，且没有问答轮次。','聚焦 greeting/self-introduction/closing；增加 1 个三轮微对话和回应式表达。'],
 'en-s1-l2':['Needs enrichment','道歉、感谢、拒绝邀请三个功能同课，但目前全是孤立 scenario。','补 apology→response、thanks→response、decline→follow-up 三组配对语境。'],
 'en-s1-l3':['Needs enrichment','能表达饮食需要，但没有店员回应、数量、价格或饮食限制。','补点单问答、数量/容器词和 1 个餐饮服务对话。'],
 'en-s1-l4':['Needs restructuring','含 Stage 3 passive support，且请求、拒绝、感谢回应边界不清。','移出被动语态；保留 can/could request，补澄清与可执行回应。'],
 'en-s2-l1':['Strong','时间、改期和确认基本一致；已有短对话。','补一个确认地点/迟到通知的 follow-up 即可。'],
 'en-s2-l2':['Strong','购物选择、试穿、支付、收据形成可用任务链。','补价格比较与退换货的 staff response。'],
 'en-s2-l3':['Strong','路线、换乘、票价与时长相互支持。','补听不清后的确认和方向复述。'],
 'en-s2-l4':['Needs enrichment','标题是日常安排，内容实际偏家务请求与设备轮用。','明确改为 household routines/chores，补频率与责任分工。'],
 'en-s3-l1':['Needs enrichment','表达未来计划，但核心语法仍主要是 Stage 1，且固定表达重复。','加入 going to/will/present continuous 的用途对比与确定度。'],
 'en-s3-l2':['Needs enrichment','症状描述可用，但没有求医问答、严重度、持续时长追问。','补 pharmacy/clinic 情境和 advice/should 支撑。'],
 'en-s3-l3':['Strong','天气、建议、偏好和改变计划对齐。','补天气预报不确定性与最终确认。'],
 'en-s3-l4':['Needs enrichment','任务/期限词汇一致，但 present perfect 句未映射为课程语法。','补进度汇报、分工确认和 deadline negotiation 对话。'],
 'en-s4-l1':['Strong','感受、边界与支持性回应形成连贯任务。','增加情绪强度词和开放式 follow-up。'],
 'en-s4-l2':['Strong','隐私、独处和提前离场的语用边界清楚。','补不同关系距离下的 register 对比。'],
 'en-s4-l3':['Needs restructuring','标题为完整点餐，但实际集中在改错单/换菜，缺入座、点单、饮食限制、结账链。','拆成服务流程或扩充为完整餐厅多轮对话。'],
 'en-s4-l4':['Strong','兴趣、偏好、变化和职业化追问具连贯性。','补反问与共同兴趣延展。'],
 'en-s5-l1':['Strong','条件、证据、范围和可行性形成高级任务。','补资格化结论和反方回应。'],
 'en-s5-l2':['Needs restructuring','Stage 5 课程主要使用 Stage 1–2 语法，任务复杂度没有达到协商变化。','补原因、条件、替代方案比较、赔偿/确认的多轮链。'],
 'en-s5-l3':['Needs enrichment','礼貌请求充分，但词汇和功能与低阶段 help 重叠。','提升到问题诊断、约束说明、责任边界与解决确认。'],
 'en-s5-l4':['Needs enrichment','回顾经历较多，但“未来安排”语法层级偏低且重复旧表达。','加入方案权衡、条件承诺与 contingency。'],
 'en-s6-l1':['Needs enrichment','语法层级高，但只有孤立句，没有论证互动或反驳。','加入 claim→evidence→qualification→challenge 的四轮讨论。'],
 'en-s6-l2':['Needs enrichment','有语气修复对话，但其余句型分散，缺持续澄清。','增加误解定位、rephrase、确认理解和保留意见链。'],
 'en-s6-l3':['Needs restructuring','Stage 6 使用 Stage 1–2 邀请表达，能力明显倒挂。','降级或改造成高阶敏感邀请、婉拒、替代方案与关系修复。'],
 'en-s6-l4':['Needs restructuring','标题要求连接过去/现在/未来，当前语法只覆盖简单过去/现在进行。','补叙事时序、反思、因果和未来目标的段落级产出。'],
 'ja-s1-l1':['Needs enrichment','寒暄可用，但缺自我介绍、身份提问和自然结束。','补名乗り、相手情報の確認、別れの三轮微对话。'],
 'ja-s1-l2':['Needs enrichment','感谢、道歉、邀请回应并列，但缺关系/礼貌度差异。','补 です/ます 基础回应和接受/婉拒的成对表达。'],
 'ja-s1-l3':['Needs enrichment','饮食愿望有基础，但数量ほど在 Stage 1 过早且没有店员回应。','先教 〜たい/お願いします；将近似数量移后并补点单对话。'],
 'ja-s1-l4':['Needs enrichment','请求与提供帮助基本对齐，但 ましょう混入且拒绝/回应语境薄。','补 依頼→確認→応答，并区分 ください/ましょうか。'],
 'ja-s2-l1':['Needs enrichment','路线词汇相对一致，但核心助词目标未显式覆盖 に/へ/で 对比。','补移动助词、换乘确认和路线复述。'],
 'ja-s2-l2':['Strong','家务、许可和礼貌请求形成可执行家庭任务。','补频率/责任分工和 plain/polite 切换提示。'],
 'ja-s2-l3':['Needs enrichment','标题要求邀请与约定，但表达只有时间/预约陈述，没有邀请问答。','补 ませんか→回应→时间地点确认对话。'],
 'ja-s2-l4':['Strong','试穿、支付、尺寸和浏览形成购物任务链。','补数量词/助数词、价格和找零。'],
 'ja-s3-l1':['Strong','误解、言い直し、冗談のつもり、逆接具语用一致性。','补确认理解与缓和语气的 follow-up。'],
 'ja-s3-l2':['Needs enrichment','计划表达集中但无互动，且经验目标没有 ことがある。','补经验问答、确定度和计划变更。'],
 'ja-s3-l3':['Strong','请求形式、条件铺垫和回应完整，已有多轮。','补拒绝后的替代请求和礼貌度对比。'],
 'ja-s3-l4':['Strong','症状、持续、反复与追问高度一致。','补程度、诱因、受诊建议与药局场景。'],
 'ja-s4-l1':['Needs restructuring','天气目标清楚，但语法仍为 Stage 1–2，且「雨を予期」不够自然日常。','使用 そう/かもしれない/ので，补预报→建议→改期链。'],
 'ja-s4-l2':['Strong','预期落差、后悔、决定与结果连贯。','补对方回应和替代安排确认。'],
 'ja-s4-l3':['Strong','距离感、边界和体贴回应自然且有互动。','补关系层级的 plain/polite/register 变体。'],
 'ja-s4-l4':['Strong','兴趣变化、比较和延展问答具连贯性。','补偏好理由与共同活动建议。'],
 'ja-s5-l1':['Needs enrichment','正式判断结构集中，但全是孤立句，缺论证互动。','补主张、限定、反例和结论的小型讨论。'],
 'ja-s5-l2':['Strong','委婉铺垫、请求、限制和反馈基本完整。','补服务/职场 register 与解决确认。'],
 'ja-s5-l3':['Needs restructuring','Stage 5 旅行课使用 Level 1–2 语法，只有简单询问/陈述，未体现条件协商。','补 なら/ても/場合、代替案、遅延交渉和多轮确认。'],
 'ja-s5-l4':['Strong','感受、担忧、失望和支持回应形成较深交流。','补不确定度和原因追问。'],
 'ja-s6-l1':['Needs enrichment','高级书面结构齐，但无观点交换或质疑。','补 根拠→限定→反論→再主張 的多轮讨论。'],
 'ja-s6-l2':['Needs enrichment','确认/缓和表达不错，但全是孤立句且敬体/常体策略未展开。','补误解澄清、保留意见、理解确认的连续会话。'],
 'ja-s6-l3':['Needs enrichment','反思表达连贯，但重复 Stage 4 计划素材，独立性提升有限。','增加因果、评价基准与未来行动承诺。'],
 'ja-s6-l4':['Needs restructuring','Stage 6 回退到 Level 1–3 的邀请句型，缺高级语用与协商。','降级或重构为复杂婉拒、条件接受、改期与关系维护。']
};

function lessonScore(row){
 const semantic=Math.round(25*Math.min(1,row.used_lesson_vocab/Math.max(1,row.vocab_count)));
 const grammarAlignment=Math.round(25*Math.min(1,row.used_lesson_grammar/Math.max(1,row.grammar_count)));
 const context=Math.min(25,(row.dialogues?18:0)+(row.scenarios?7:0)+(row.dialogue_turns>=4?5:0));
 const distance=Math.abs(row.avg_expression_difficulty-row.stage);
 let progression=Math.max(4,25-Math.round(distance*7));
 if(row.stage>=5&&row.avg_grammar_level<row.stage-2)progression=Math.max(4,progression-8);
 const total=semantic+grammarAlignment+context+progression;
 return {total,components:{semantic_cohesion:semantic,grammar_expression_alignment:grammarAlignment,context_and_dialogue:context,stage_progression:progression},
  rubric:'Each component is 0–25. Semantic = share of lesson vocabulary used by selected expressions; grammar alignment = share of lesson grammar actually linked to selected expressions; context = dialogue/scenario evidence and turn depth; progression = distance between lesson Stage and expression difficulty, with a penalty for advanced lessons using much lower grammar. This is an editorial triage heuristic, not an objective linguistic score.'};
}

const lessonReport=lessonRows.map(row=>{
 const items=lessonItems.filter(x=>x.lesson_id===row.id);
 const note=lessonNotes[row.id]??['Needs enrichment','需要人工复核。','补充语义和交流链。'];
 return {...row,content:{vocabulary:items.filter(x=>x.content_type==='vocabulary'),grammar:items.filter(x=>x.content_type==='grammar'),expressions:items.filter(x=>x.content_type==='expression')},
  score:lessonScore(row),health_category:note[0],editorial_gap:note[1],recommendation:note[2],
  curated_grammar_examples:items.filter(x=>x.content_type==='grammar').reduce((n,x)=>n+(grammar.find(g=>g.id===x.content_id)?.example_count??0),0),
  practice_coverage:{canonical_lesson_practice_mapping:false,proxy:'required/support/exposure roles plus expression contexts',warning:'No lesson-scoped practice-item table exists; outcome practice breadth cannot be directly audited.'}};
});

const enVocabularySeed=[
 ['allergy','过敏；可用于说明食物或药物风险',2,'health','noun','en-s4-l3','P0','餐厅和医疗表达缺安全关键信息'],
 ['dietary restriction','饮食限制的上位概念',3,'food','noun phrase','en-s4-l3','P1','现有点餐缺饮食限制'],
 ['ingredient','配料/成分',2,'food','noun','en-s4-l3','P1','无法询问菜品内容'],
 ['vegetarian','素食者/素食的',2,'food','noun/adjective','en-s4-l3','P1','缺常见饮食偏好'],
 ['bill','餐厅账单',2,'food','noun','en-s4-l3','P1','完整点餐任务缺结账词汇'],
 ['refill','续杯/补充',3,'food','noun/verb','en-s4-l3','P2','餐厅 follow-up 能力薄'],
 ['refund','退款',3,'shopping','noun/verb','NEW-en-s3-returns','P1','购物课止于选择，缺售后'],
 ['exchange','换货/交换',3,'shopping','noun/verb','NEW-en-s3-returns','P1','缺退换货协商'],
 ['aisle','超市通道',2,'shopping','noun','NEW-en-s2-supermarket','P1','没有超市找货语境'],
 ['checkout counter','收银台',2,'shopping','noun phrase','NEW-en-s2-supermarket','P1','缺超市支付任务'],
 ['contactless payment','非接触式支付',3,'shopping','noun phrase','en-s2-l2','P2','支付词汇过窄'],
 ['fever','发烧',2,'health','noun','NEW-en-s3-clinic','P0','常见症状缺口'],
 ['cough','咳嗽',2,'health','noun/verb','NEW-en-s3-clinic','P0','常见症状缺口'],
 ['dizzy','头晕的',3,'health','adjective','NEW-en-s3-clinic','P1','症状严重度表达不足'],
 ['pharmacy','药房',2,'health','noun','NEW-en-s3-clinic','P1','缺求药场景'],
 ['prescription','处方',3,'health','noun','NEW-en-s3-clinic','P1','医疗后续任务缺失'],
 ['time slot','可预约的时间段',2,'time','noun phrase','NEW-en-s3-appointment','P0','改约和取消缺可选时段表达'],
 ['landlord','房东',3,'home','noun','NEW-en-s4-renting','P1','租房角色缺失'],
 ['tenant','租客',3,'home','noun','NEW-en-s4-renting','P2','租房角色缺失'],
 ['rent','租金；租用',3,'home','noun/verb','NEW-en-s4-renting','P1','住房支付能力缺失'],
 ['deposit','押金/定金',4,'home','noun','NEW-en-s4-renting','P1','租房协商缺关键概念'],
 ['lease','租约',4,'home','noun','NEW-en-s4-renting','P2','住房合同语境缺失'],
 ['maintenance','维护/报修',3,'home','noun','NEW-en-s4-renting','P1','家庭课没有报修链'],
 ['bank transfer','银行转账',3,'shopping','noun phrase','en-s2-l2','P1','银行/支付能力未覆盖'],
 ['account balance','账户余额',3,'shopping','noun phrase','en-s2-l2','P1','无法处理余额问题'],
 ['service fee','服务费',3,'shopping','noun phrase','en-s2-l2','P2','费用澄清能力缺失'],
 ['PIN','个人识别码',2,'shopping','noun','en-s2-l2','P1','支付故障语境缺词'],
 ['charger','充电器',2,'help','noun','NEW-en-s3-connectivity','P1','手机故障求助缺基本物件'],
 ['Wi-Fi','无线网络',2,'help','noun','NEW-en-s3-connectivity','P1','数字生活主题缺失'],
 ['password','密码',2,'help','noun','NEW-en-s3-connectivity','P1','登录求助缺核心词'],
 ['signal','信号',3,'help','noun','NEW-en-s3-connectivity','P1','网络问题诊断缺词'],
 ['connection','连接',3,'help','noun','NEW-en-s3-connectivity','P1','网络问题诊断缺词'],
 ['restart','重启',2,'help','verb/noun','NEW-en-s3-connectivity','P1','缺基本故障排除动作'],
 ['platform','站台',2,'travel','noun','en-s2-l3','P1','交通课缺站内导航'],
 ['delay','延误',2,'travel','noun/verb','en-s5-l2','P0','行程变化课缺核心词'],
 ['traffic jam','堵车',2,'travel','noun phrase','en-s5-l2','P1','驾车语境未覆盖'],
 ['seat belt','安全带',2,'travel','noun phrase','en-s5-l2','P1','驾驶安全功能缺失'],
 ['parking','停车/停车位',2,'travel','noun','en-s5-l2','P1','驾车任务缺失'],
 ['check-in','入住/报到手续',3,'travel','noun','NEW-en-s4-accommodation','P1','住宿任务未覆盖'],
 ['key card','房卡',2,'travel','noun phrase','NEW-en-s4-accommodation','P1','住宿问题处理缺词'],
 ['accommodation','住宿',4,'travel','noun','NEW-en-s4-accommodation','P2','旅行范围偏交通'],
 ['colleague','同事',2,'school','noun','NEW-en-s3-workplace','P1','学校/工作主题缺职场角色'],
 ['shift','班次',3,'school','noun','NEW-en-s3-workplace','P1','缺工作排班能力'],
 ['salary','工资',3,'school','noun','NEW-en-s3-workplace','P2','工作条件表达不足'],
 ['interview','面试/采访',3,'school','noun/verb','NEW-en-s3-workplace','P1','大学到工作过渡缺失'],
 ['performance review','绩效评估/工作回顾',3,'school','noun phrase','NEW-en-s3-workplace','P1','任务协作缺正式反馈语境']
];

const jaVocabularySeed=[
 ['アレルギー','过敏；说明食物或药物风险',2,'health','外来语名词','ja-s3-l4','P0','饮食与医疗缺安全关键信息','アレルギー'],
 ['食事制限','饮食限制',3,'food','汉语名词','NEW-ja-s2-restaurant','P1','点餐缺饮食限制','しょくじせいげん'],
 ['原材料','原材料/配料',3,'food','汉语名词','NEW-ja-s2-restaurant','P1','无法询问食品成分','げんざいりょう'],
 ['ベジタリアン','素食者',2,'food','外来语名词','NEW-ja-s2-restaurant','P1','缺常见饮食偏好','ベジタリアン'],
 ['会計','结账/账款',2,'food','汉语名词','NEW-ja-s2-restaurant','P1','餐饮任务缺结账','かいけい'],
 ['おかわり','再来一份/续杯',2,'food','和语名词','NEW-ja-s2-restaurant','P2','餐厅 follow-up 薄弱','おかわり'],
 ['返品','退货',3,'shopping','汉语名词/サ变','NEW-ja-s3-returns','P1','购物课止于购买','へんぴん'],
 ['交換','换货/交换',3,'shopping','汉语名词/サ变','NEW-ja-s3-returns','P1','缺售后协商','こうかん'],
 ['通路','通道',2,'shopping','汉语名词','NEW-ja-s2-supermarket','P1','没有超市找货语境','つうろ'],
 ['レジ','收银台/收银机',1,'shopping','外来语名词','NEW-ja-s2-supermarket','P1','缺超市支付任务','レジ'],
 ['タッチ決済','非接触式支付',3,'shopping','复合名词','ja-s2-l4','P2','支付词汇过窄','タッチけっさい'],
 ['発熱','发热',2,'health','汉语名词/サ变','NEW-ja-s3-clinic','P0','常见症状缺口','はつねつ'],
 ['咳','咳嗽',2,'health','和语名词','NEW-ja-s3-clinic','P0','常见症状缺口','せき'],
 ['めまい','眩晕',3,'health','和语名词','NEW-ja-s3-clinic','P1','症状描述深度不足','めまい'],
 ['薬局','药房',2,'health','汉语名词','NEW-ja-s3-clinic','P1','缺求药场景','やっきょく'],
 ['処方箋','处方',3,'health','汉语名词','NEW-ja-s3-clinic','P1','医疗后续任务缺失','しょほうせん'],
 ['診察','诊察',3,'health','汉语名词/サ变','NEW-ja-s3-clinic','P1','缺就诊流程','しんさつ'],
 ['大家','房东',3,'home','汉语名词','NEW-ja-s4-renting','P1','租房角色缺失','おおや'],
 ['借主','承租人',4,'home','汉语名词','NEW-ja-s4-renting','P2','租房角色缺失','かりぬし'],
 ['家賃','房租',3,'home','汉语名词','NEW-ja-s4-renting','P1','住房支付能力缺失','やちん'],
 ['敷金','押金',4,'home','汉语名词','NEW-ja-s4-renting','P1','租房协商缺关键概念','しききん'],
 ['賃貸契約','租赁合同',4,'home','复合名词','NEW-ja-s4-renting','P2','住房合同语境缺失','ちんたいけいやく'],
 ['修理','修理/报修',2,'home','汉语名词/サ变','NEW-ja-s4-renting','P1','家庭课没有报修链','しゅうり'],
 ['振込','转账/汇款',3,'shopping','汉语名词','ja-s2-l4','P1','银行/支付能力未覆盖','ふりこみ'],
 ['残高','余额',3,'shopping','汉语名词','ja-s2-l4','P1','无法处理余额问题','ざんだか'],
 ['手数料','手续费',3,'shopping','复合名词','ja-s2-l4','P2','费用澄清能力缺失','てすうりょう'],
 ['暗証番号','密码/PIN',2,'shopping','复合名词','ja-s2-l4','P1','支付故障语境缺词','あんしょうばんごう'],
 ['充電器','充电器',2,'help','汉语名词','NEW-ja-s3-connectivity','P1','手机故障求助缺物件','じゅうでんき'],
 ['Wi-Fi','无线网络',2,'help','外来语名词','NEW-ja-s3-connectivity','P1','数字生活主题缺失','ワイファイ'],
 ['パスワード','密码',2,'help','外来语名词','NEW-ja-s3-connectivity','P1','登录求助缺核心词','パスワード'],
 ['電波','信号/无线电波',3,'help','汉语名词','NEW-ja-s3-connectivity','P1','网络诊断缺词','でんぱ'],
 ['接続','连接',3,'help','汉语名词/サ变','NEW-ja-s3-connectivity','P1','网络诊断缺词','せつぞく'],
 ['再起動','重启',3,'help','汉语名词/サ变','NEW-ja-s3-connectivity','P1','缺基本故障排除动作','さいきどう'],
 ['ホーム','站台',2,'travel','外来语名词','ja-s2-l1','P1','交通课缺站内导航','ホーム'],
 ['遅延','延误',3,'travel','汉语名词/サ变','ja-s5-l3','P0','行程变化课缺核心词','ちえん'],
 ['渋滞','交通拥堵',3,'travel','汉语名词/サ变','ja-s5-l3','P1','驾车语境未覆盖','じゅうたい'],
 ['シートベルト','安全带',2,'travel','外来语名词','ja-s5-l3','P1','驾驶安全功能缺失','シートベルト'],
 ['駐車','停车',2,'travel','汉语名词/サ变','ja-s5-l3','P1','驾车任务缺失','ちゅうしゃ'],
 ['チェックイン','入住/报到',3,'travel','外来语名词/サ变','NEW-ja-s4-accommodation','P1','住宿任务未覆盖','チェックイン'],
 ['カードキー','房卡',2,'travel','外来语复合名词','NEW-ja-s4-accommodation','P1','住宿问题处理缺词','カードキー'],
 ['宿泊','住宿',3,'travel','汉语名词/サ变','NEW-ja-s4-accommodation','P2','旅行范围偏交通','しゅくはく'],
 ['同僚','同事',3,'school','汉语名词','NEW-ja-s3-workplace','P1','学校/工作主题缺职场角色','どうりょう'],
 ['シフト','班次/排班',3,'school','外来语名词','NEW-ja-s3-workplace','P1','缺工作排班能力','シフト'],
 ['給料','工资',2,'school','汉语名词','NEW-ja-s3-workplace','P2','工作条件表达不足','きゅうりょう'],
 ['面接','面试',3,'school','汉语名词/サ变','NEW-ja-s3-workplace','P1','大学到工作过渡缺失','めんせつ'],
 ['フィードバック','反馈',3,'school','外来语名词','NEW-ja-s3-workplace','P1','任务协作缺反馈语言','フィードバック']
];

const vocabularyCandidates=[
 ...enVocabularySeed.map(([candidate,meaning,stage,topic,part_of_speech,target_lesson,priority,gap])=>({language:'en',candidate,meaning_semantic_scope:meaning,recommended_stage:stage,topic,part_of_speech,why_needed:gap,existing_curriculum_gap:gap,likely_lesson_use:target_lesson,priority,confidence:'medium-high',source_strategy:'AI-assisted + editorial review',requires_human_review:true,duplicate_risk:'validate inflection, sense and multiword boundary'})),
 ...jaVocabularySeed.map(([candidate,meaning,stage,topic,lexical_type,target_lesson,priority,gap,reading])=>({language:'ja',candidate,reading,lexical_type,meaning_semantic_scope:meaning,recommended_stage:stage,topic,why_needed:gap,existing_curriculum_gap:gap,likely_lesson_use:target_lesson,priority,confidence:'medium-high',source_strategy:'AI-assisted + native editorial review',requires_human_review:true,duplicate_risk:'validate orthography, reading, sense and register'}))
];

const grammarCandidateSeed={
 en:[
  ['be / do negation and short answers',1,'chat','否定、纠正和自然短答是基础交流骨架','en-s1-l1','P0'],
  ['wh-questions as a taught question system',1,'chat','已有 grammar 但未进 Lesson；信息提问能力断层','en-s1-l1','P0'],
  ['articles: a/an/the/zero',1,'chat','基础名词短语没有显式教学支架',null,'P1'],
  ['some/any with count and non-count nouns',2,'food','点餐、购物和库存询问需要数量限定','en-s1-l3','P1'],
  ['past simple questions and negatives',2,'plans','过去经历只有肯定陈述，缺问答和否定',null,'P0'],
  ['should / should not for advice',2,'health','健康课缺核心建议结构','en-s3-l2','P0'],
  ['must / have to / do not have to contrast',3,'school','义务、规则与非必要的语义边界未成体系','en-s3-l4','P1'],
  ['first conditional',3,'plans','真实未来条件是计划和协商的核心缺口','en-s5-l4','P0'],
  ['present continuous for future arrangements',3,'time','安排语法与正在进行混在同一形式下','en-s2-l1','P1'],
  ['present perfect versus simple past',4,'plans','两种过去关联方式未有对比式教学','en-s6-l4','P1'],
  ['reported speech for relaying information',4,'school','工作/学校缺转述指示和信息','NEW-en-s3-workplace','P2'],
  ['modal deduction: must/might/can\'t',4,'chat','不确定、推断和澄清缺完整强度轴','en-s6-l2','P2']
 ],
 ja:[
  ['助詞 に・へ・で（移動と場所）の対比',1,'travel','路线课目标要求助词但现有 Lesson 未显式形成对比','ja-s2-l1','P0'],
  ['助詞 から・まで',1,'travel','起点终点和时间范围是基础出行能力',null,'P0'],
  ['い形容詞／な形容詞の否定・過去',2,'chat','形容词变化未形成可学习 progression',null,'P0'],
  ['普通形の否定（ない形）と過去',2,'chat','常体只有辞书形/た形碎片，缺体系','ja-s3-l1','P0'],
  ['て形による順序・接続',2,'home','て形存在但未作为动作链教学','ja-s2-l2','P1'],
  ['〜てはいけない／〜てもいい',2,'home','许可有单点，禁止和规则对比缺失',null,'P1'],
  ['助数詞（人・本・枚・個・つ）',2,'shopping','购物数量任务没有 counter progression','ja-s2-l4','P0'],
  ['〜なければならない／〜なくてもいい',3,'school','义务与非必要的高价值对比缺失',null,'P0'],
  ['〜から／〜ので の理由対比',3,'plans','给理由依赖零散 ので，缺语用对比',null,'P1'],
  ['〜より／〜ほうが（比較）',3,'shopping','购物和偏好目标缺核心比较结构',null,'P1'],
  ['〜たことがある（経験）',3,'plans','已有 grammar 但未进入经验课','ja-s3-l2','P0'],
  ['あげる・くれる・もらう',3,'social','受益方向和人际视角未成体系',null,'P1'],
  ['んです／んですが（説明と前置き）',3,'help','现有 んですが Level 4，基础解释功能出现过晚',null,'P1'],
  ['尊敬語・謙譲語の役割別導入',4,'school','已有条目但都未进 Lesson，缺职场语境','NEW-ja-s3-workplace','P1'],
  ['条件形 なら・たら・ば・と の使い分け',4,'plans','四种条件散落，缺 communicative contrast','ja-s5-l3','P1'],
  ['終助詞 ね・よ・かな と断定緩和',3,'chat','日语自然会话的句末语气未显式覆盖','ja-s6-l2','P1']
 ]
};
const grammarCandidates=Object.entries(grammarCandidateSeed).flatMap(([language,rows])=>rows.map(([proposed_content,stage,topic,reason,target_lesson,priority])=>({item_type:'grammar',language,stage_level:stage,topic,proposed_content,reason,target_lesson,priority,confidence:'medium-high',source_strategy:'editorially authored; examples may be AI-assisted then reviewed',requires_human_review:true,duplicate_risk:'conceptual overlap review required against existing granular points'})));

const newLessonSeed={
 en:[
  ['NEW-en-s2-supermarket',2,'shopping','在超市找货并结账','能询问商品位置、数量、价格并完成支付','超市是高频独立任务，现购物课偏服装试穿','P1'],
  ['NEW-en-s3-returns',3,'shopping','退货与换货','能说明问题、提出退款/换货并理解处理条件','现有购物没有售后与协商','P1'],
  ['NEW-en-s3-clinic',3,'health','在药房或诊所说明症状','能描述症状、持续时间、严重度并理解基本建议','现健康课只有四个表达且无求医链','P0'],
  ['NEW-en-s3-appointment',3,'time','预约、取消与改期','能预约、确认、取消并协商替代时间','时间课只有简单见面安排','P0'],
  ['NEW-en-s3-connectivity',3,'help','处理手机与网络问题','能描述连接问题并执行/确认排障步骤','数字生活完全缺课','P1'],
  ['NEW-en-s3-workplace',3,'school','职场任务、排班与反馈','能汇报进度、协调班次并回应反馈','school/work 主题偏任务句和学术表达','P1'],
  ['NEW-en-s4-renting',4,'home','租房、报修与房东沟通','能说明住房问题、请求维修并确认费用/时间','家庭课没有租房生活能力','P1'],
  ['NEW-en-s4-accommodation',4,'travel','入住酒店并处理住宿问题','能入住、询问设施并处理房间问题','旅行内容几乎只覆盖交通','P1']
 ],
 ja:[
  ['NEW-ja-s2-supermarket',2,'shopping','スーパーで商品を探して会計する','能询问位置、数量、价格并完成超市支付','购物课缺超市和助数词任务','P1'],
  ['NEW-ja-s2-restaurant',2,'food','店で注文し、希望を伝える','能点餐、说明饮食限制并结账','日语 food 仅一课且不含完整服务互动','P0'],
  ['NEW-ja-s3-returns',3,'shopping','返品・交換を相談する','能说明商品问题并协商退换','现有购物止于购买','P1'],
  ['NEW-ja-s3-clinic',3,'health','薬局・病院で症状を説明する','能说明症状、程度、持续并理解建议','已有健康表达但缺就诊流程','P0'],
  ['NEW-ja-s3-connectivity',3,'help','スマホ・通信の問題を伝える','能描述连接问题并确认排障步骤','数字生活完全缺课','P1'],
  ['NEW-ja-s3-workplace',3,'school','職場で報告・連絡・相談する','能汇报、联络、商量并切换礼貌度','敬语条目未进入职场教学','P0'],
  ['NEW-ja-s4-renting',4,'home','賃貸・修理について相談する','能向房东/管理方报修并确认费用时间','家庭课没有租房生活能力','P1'],
  ['NEW-ja-s4-accommodation',4,'travel','宿泊手続きと部屋の問題に対応する','能入住、询问设施并处理房间问题','旅行内容偏交通','P1']
 ]
};

function reusableContent(language,topic,stage){
 return {
  vocabulary_ids:vocab.filter(x=>x.language===language&&x.lesson_uses===0&&x.stage<=stage+1&&x.topics.includes(topic)).slice(0,10).map(x=>x.id),
  expression_ids:expressions.filter(x=>x.language===language&&x.lesson_uses===0&&x.overall_difficulty<=stage+1&&x.topic_id===topic).slice(0,8).map(x=>x.id),
  grammar_ids:grammar.filter(x=>x.language===language&&x.lesson_uses===0&&x.level<=stage+1&&x.expression_uses>0).slice(0,5).map(x=>x.id)
 };
}
const newLessonCandidates=Object.entries(newLessonSeed).flatMap(([language,rows])=>rows.map(([id,stage,topic,title,objective,reason,priority])=>({id,language,stage,title,objective,topic,reason,existing_content_reusable:reusableContent(language,topic,stage),missing_content_needed:'6–10 focused vocabulary, 8–12 core expressions, one 3–5 turn dialogue, and 6–10 curated grammar examples across the lesson grammar',estimated_lesson_size:{vocabulary:'8–12',grammar:'2–3',expressions:'8–12',dialogue_scenario:'1–2',minutes:'15–20'},priority,confidence:'medium-high',source_strategy:'reuse canonical IDs first; author missing content with editorial review',requires_human_review:true}))); 

const expressionClusters=[
 ['en',2,'food','service-response pairs for ordering, availability, substitution and payment','en-s4-l3','P0'],
 ['en',3,'health','symptom severity, duration, advice and safety-net follow-ups','NEW-en-s3-clinic','P0'],
 ['en',3,'time','book, confirm, cancel and reschedule with alternatives','NEW-en-s3-appointment','P0'],
 ['en',3,'shopping','problem description, return conditions, refund/exchange negotiation','NEW-en-s3-returns','P1'],
 ['en',3,'help','digital troubleshooting instructions and confirmation','NEW-en-s3-connectivity','P1'],
 ['en',4,'home','housing repair, access, cost and timing negotiation','NEW-en-s4-renting','P1'],
 ['en',4,'school','claim, reason, example, qualification and disagreement','en-s6-l1','P0'],
 ['en',4,'social','invitation, tactful refusal, alternative and relationship repair','en-s6-l3','P1'],
 ['ja',2,'food','注文、在庫確認、代替、食事制限、会計の応答ペア','NEW-ja-s2-restaurant','P0'],
 ['ja',2,'shopping','助数詞を使う数量・価格・会計の往復','NEW-ja-s2-supermarket','P0'],
 ['ja',3,'health','症状・程度・期間・助言・確認の連鎖','NEW-ja-s3-clinic','P0'],
 ['ja',3,'school','報告・連絡・相談と敬体/常体/敬語の切替','NEW-ja-s3-workplace','P0'],
 ['ja',3,'help','通信問題の説明、手順確認、解決確認','NEW-ja-s3-connectivity','P1'],
 ['ja',4,'travel','遅延理由、条件、代替案、最終確認','ja-s5-l3','P0'],
 ['ja',4,'chat','誤解特定、言い換え、保留意見、理解確認','ja-s6-l2','P1'],
 ['ja',4,'social','婉拒、条件接受、改期、关系维护','ja-s6-l4','P1']
].map(([language,stage_level,topic,proposed_content,target_lesson,priority])=>({item_type:'core_expression_cluster',language,stage_level,topic,proposed_content,reason:'现有课程主要由孤立句或两轮对话构成，缺完整互动链',target_lesson,priority,confidence:'high',source_strategy:'AI-assisted + native/editorial review',requires_human_review:true,duplicate_risk:'check against unassigned expressions before authoring'}));

const dialogueClusters=[
 ['en',2,'food','restaurant ordering with availability and dietary restriction','en-s4-l3','P0'],
 ['en',3,'time','reschedule an appointment after rejecting the first alternative','NEW-en-s3-appointment','P0'],
 ['en',3,'travel','ask directions, clarify a missed step, and confirm route','en-s2-l3','P1'],
 ['en',3,'shopping','return an item and negotiate refund or exchange','NEW-en-s3-returns','P1'],
 ['en',3,'health','describe symptoms and answer clinician follow-ups','NEW-en-s3-clinic','P0'],
 ['en',4,'school','group-work disagreement and negotiated division of work','en-s5-l1','P1'],
 ['en',5,'chat','clarify misunderstanding, rephrase, and confirm understanding','en-s6-l2','P1'],
 ['en',5,'school','support an opinion, answer a challenge, and qualify the claim','en-s6-l1','P0'],
 ['ja',2,'food','注文・品切れ・代替・食事制限・会計','NEW-ja-s2-restaurant','P0'],
 ['ja',2,'time','誘い・都合確認・別案・最終確認','ja-s2-l3','P0'],
 ['ja',3,'health','症状説明・質問・助言・受診確認','NEW-ja-s3-clinic','P0'],
 ['ja',3,'shopping','返品理由・条件確認・交換/返金','NEW-ja-s3-returns','P1'],
 ['ja',3,'school','報告・質問・確認・次の行動','NEW-ja-s3-workplace','P0'],
 ['ja',4,'travel','遅延・条件・代替案・合意','ja-s5-l3','P0'],
 ['ja',5,'chat','誤解・言い換え・控えめな反対・理解確認','ja-s6-l2','P1'],
 ['ja',5,'school','根拠・反論・限定・再主張','ja-s6-l1','P0']
].map(([language,stage_level,topic,proposed_content,target_lesson,priority])=>({item_type:'dialogue_scenario',language,stage_level,topic,proposed_content,reason:'该任务天然需要三轮以上互动；单句不能验证修复、追问与确认',target_lesson,priority,confidence:'high',source_strategy:'editorial task design; AI-assisted drafting + native review',requires_human_review:true,duplicate_risk:'reuse/extend existing two-turn dialogue where coherent'}));

const duplicateLemmaKeys=new Set(canonicalDuplicates.map(x=>`${x.language}:${x.normalized_lemma}`));
const lessonTopicsByLanguage=Object.fromEntries(['en','ja'].map(language=>[language,new Set(lessonRows.filter(x=>x.language===language).map(x=>x.topic_id))]));

function classifyVocabulary(item){
 if(duplicateLemmaKeys.has(`${item.language}:${normalize(item.lemma)}`))return ['POSSIBLE_DUPLICATE','Exact normalized lemma collision; review sense/POS before merge.'];
 if(item.topics.includes('body'))return ['SHOULD_FORM_NEW_LESSON','The orphan body topic has no lesson; decide whether to form a body/health lesson or merge taxonomy.'];
 if(item.expression_uses>0&&item.topics.some(t=>lessonTopicsByLanguage[item.language].has(t))&&item.stage<=4)return ['SHOULD_ASSIGN_EXISTING_LESSON','Already used by canonical expressions in a taught topic and within V1 stage range.'];
 if(item.expression_uses>0)return ['SUPPORT_ONLY','Has authentic expression usage but is not an immediate required target.'];
 if(item.stage>=5)return ['LIBRARY_ONLY_VALID','Advanced/long-tail item can remain reference-only until an advanced communicative task needs it.'];
 if(item.topics.length===0)return ['NEEDS_EDITORIAL_REVIEW','No topic and no expression use; intent and natural context are not evidenced.'];
 return ['LIBRARY_ONLY_VALID','Topic-tagged reference item without current expression demand.'];
}
function classifyGrammar(item){
 if(item.level<=2&&item.expression_uses>=2)return ['SHOULD_ASSIGN_EXISTING_LESSON','Foundational grammar already supports multiple expressions but is absent from Lesson Path.'];
 if(item.level<=4&&item.expression_uses>=2)return ['SUPPORT_ONLY','Useful in expressions; introduce as support after checking lesson objective and load.'];
 if(item.level>=5)return ['LIBRARY_ONLY_VALID','Advanced structure is valid as reference until a matching production task exists.'];
 return ['NEEDS_EDITORIAL_REVIEW','Only one expression use and no lesson; confirm usefulness, granularity and placement.'];
}
function classifyExpression(item){
 if(item.topic_id==='body')return ['SHOULD_FORM_NEW_LESSON','Body unit has no Lesson Path container; resolve body/health taxonomy first.'];
 if(item.unit_type==='dialogue'&&item.overall_difficulty<=5)return ['SHOULD_ASSIGN_EXISTING_LESSON','A curated dialogue is high-value contextual material; prefer assigning/restructuring over authoring duplicates.'];
 if(item.unit_type==='scenario'&&item.overall_difficulty<=4)return ['SHOULD_ASSIGN_EXISTING_LESSON','A curated scenario in an existing topic can enrich a thin lesson.'];
 if(item.overall_difficulty>=5)return ['LIBRARY_ONLY_VALID','Advanced expression can remain discovery/reference content until a coherent advanced task exists.'];
 if(item.vocabulary_links===0||item.grammar_links===0)return ['NEEDS_EDITORIAL_REVIEW','Expression lacks vocabulary or grammar linkage needed for accountable lesson use.'];
 return ['SUPPORT_ONLY','Useful contextual support but not necessarily a required lesson target.'];
}

const unassignedRecords=[
 ...vocab.filter(x=>x.lesson_uses===0).map(item=>{const [classification,rationale]=classifyVocabulary(item);return {content_type:'vocabulary',language:item.language,id:item.id,label:item.lemma,stage_level:item.stage,topics:item.topics,expression_uses:item.expression_uses,classification,rationale};}),
 ...grammar.filter(x=>x.lesson_uses===0).map(item=>{const [classification,rationale]=classifyGrammar(item);return {content_type:'grammar',language:item.language,id:item.id,label:item.form_name,stage_level:item.level,expression_uses:item.expression_uses,classification,rationale};}),
 ...expressions.filter(x=>x.lesson_uses===0).map(item=>{const [classification,rationale]=classifyExpression(item);return {content_type:'expression',language:item.language,id:item.id,label:item.text,stage_level:item.overall_difficulty,topics:[item.topic_id],unit_type:item.unit_type,classification,rationale};})
];
const unassignedClasses=['SHOULD_ASSIGN_EXISTING_LESSON','SHOULD_FORM_NEW_LESSON','LIBRARY_ONLY_VALID','SUPPORT_ONLY','POSSIBLE_DUPLICATE','NEEDS_EDITORIAL_REVIEW','POSSIBLE_REMOVE_MERGE'];
const unassignedSummary=Object.fromEntries(unassignedClasses.map(classification=>[classification,{
 total:unassignedRecords.filter(x=>x.classification===classification).length,
 en:unassignedRecords.filter(x=>x.classification===classification&&x.language==='en').length,
 ja:unassignedRecords.filter(x=>x.classification===classification&&x.language==='ja').length,
 by_type:Object.fromEntries(['vocabulary','grammar','expression'].map(type=>[type,unassignedRecords.filter(x=>x.classification===classification&&x.content_type===type).length]))
}]));
unassignedSummary.POSSIBLE_REMOVE_MERGE={total:canonicalDuplicates.reduce((n,x)=>n+x.count-1,0),en:canonicalDuplicates.filter(x=>x.language==='en').reduce((n,x)=>n+x.count-1,0),ja:canonicalDuplicates.filter(x=>x.language==='ja').reduce((n,x)=>n+x.count-1,0),by_type:{vocabulary:canonicalDuplicates.reduce((n,x)=>n+x.count-1,0),grammar:0,expression:0},note:'Proposal set, not a mutually exclusive primary classification; includes assigned duplicate lemmas.'};

const topicJudgments={
 en:{overrepresented:['chat: 39 expressions and broad catch-all use','school: 25 expressions across task and academic discourse'],underrepresented:['body: 2 expressions, 0 lessons; overlaps health label','health, home, shopping, time, hobbies: one lesson each','travel: two lessons but almost entirely transport'],missing_functions:['cooking and supermarket workflow','renting and maintenance','bank/payment problems','phone/network troubleshooting','accommodation','driving','medical service interaction']},
 ja:{overrepresented:['chat: 48 expressions and broad catch-all use','school: 26 expressions, with advanced written forms concentrated late'],underrepresented:['body: 2 expressions, 0 lessons; overlaps health label','food: one lesson and no full restaurant workflow','health, home, shopping, time, hobbies: one lesson each'],missing_functions:['助数詞を伴う買物','飲食店の多輪やり取り','賃貸・修理','報告・連絡・相談','通信トラブル','宿泊','医療サービス interaction']}
};

const functionProgression=[
 {stage:1,covered:['greet','thank','apologize','make a basic request','state basic wants'],gaps:['introduce self/others as a complete exchange','ask follow-up questions','close a conversation','basic negative correction']},
 {stage:2,covered:['ask','answer','confirm time','choose','ask directions','request permission'],gaps:['clarify after non-understanding','reschedule','counter/quantity interaction','respond to refusal']},
 {stage:3,covered:['describe symptoms','plan','suggest','explain a task','make a polite request'],gaps:['compare systematically','narrate a past experience through Q&A','give advice','service complaint/return','multi-step problem solving']},
 {stage:4,covered:['express feelings','set boundaries','discuss preferences','describe expectation mismatch'],gaps:['negotiate','complain and seek remedy','qualify an opinion','manage register across relationships']},
 {stage:5,covered:['give conditions','cite evidence','make indirect requests','reflect on outcomes'],gaps:['sustain disagreement','test alternatives and reach agreement','repair failed service interactions','extended turn-taking']},
 {stage:6,covered:['advanced hypothesis','formal evidence framing','hedging/clarification fragments'],gaps:['paragraph-level narration','claim→challenge→qualification dialogue','advanced social negotiation','clear independence over Stage 4–5']}
];

const expansionTargets={
 minimum:{en_vocab:range(45,60),ja_vocab:range(50,65),en_grammar:range(6,8),ja_grammar:range(8,10),en_curated_grammar_examples:range(260,320),ja_curated_grammar_examples:range(300,360),en_expressions:range(60,80),ja_expressions:range(70,90),en_dialogues_scenarios:range(16,20),ja_dialogues_scenarios:range(18,22),en_new_lessons:range(4,5),ja_new_lessons:range(5,6),rationale:'Close P0 path breaks: foundational grammar, clinic/appointment/restaurant/counters, and multi-turn interaction.'},
 recommended:{en_vocab:range(90,110),ja_vocab:range(100,125),en_grammar:range(10,14),ja_grammar:range(14,18),en_curated_grammar_examples:range(390,470),ja_curated_grammar_examples:range(450,540),en_expressions:range(110,140),ja_expressions:range(120,150),en_dialogues_scenarios:range(28,36),ja_dialogues_scenarios:range(32,40),en_new_lessons:range(6,8),ja_new_lessons:range(7,9),rationale:'A coherent V1: cover the eight proposed daily-life task families, deepen core grammar to a differentiated 6–10 examples, and add interaction chains without forcing all library items into lessons.'},
 extended:{en_vocab:range(150,190),ja_vocab:range(165,210),en_grammar:range(18,24),ja_grammar:range(22,30),en_curated_grammar_examples:range(620,760),ja_curated_grammar_examples:range(700,860),en_expressions:range(220,280),ja_expressions:range(240,300),en_dialogues_scenarios:range(50,70),ja_dialogues_scenarios:range(55,75),en_new_lessons:range(10,12),ja_new_lessons:range(11,14),rationale:'Future depth: workplace, driving, banking, accommodation and advanced discourse variants after V1 validation.'}
};

const top30=[
 ['P0','en',1,'grammar','Basic negation/short-answer system is not a taught grammar point in the path','Without correction and negative answers, Stage 1 interaction is brittle','Add be/do negation with affirmative/negative/question variants','2 grammar concepts + 16–20 examples + 8 expressions'],
 ['P0','ja',1,'grammar','Core particle progression is not explicit in lessons','に/へ/で and から/まで are essential for travel and time','Teach particles through route and appointment tasks','2–3 grammar concepts + 18–24 examples + 10 expressions'],
 ['P0','en',1,'curated_examples','72/73 grammar points have only one curated example','A single form cannot show polarity, question, tense or usage conditions','Prioritize 35 core grammar points at 6–10 examples','+210–280 examples first wave'],
 ['P0','ja',1,'curated_examples','82/82 grammar points have only one curated example','Japanese needs form, politeness, register and particle variation','Prioritize 40 core grammar points at 6–10 examples','+260–340 examples first wave'],
 ['P0','en',2,'dialogue','All 29 English dialogues are only two turns','Learners never practice follow-up, repair or final confirmation','Extend high-value service and planning tasks to 3–5 turns','+14–18 dialogues/scenarios'],
 ['P0','ja',2,'dialogue','All 29 Japanese dialogues are only two turns','Politeness and response choice require sustained context','Extend service, requests and register tasks to 3–5 turns','+16–20 dialogues/scenarios'],
 ['P0','en',3,'topic','Clinic/pharmacy interaction is absent','Four isolated health expressions do not support safe symptom communication','Create clinic lesson and symptom/advice set','10–14 vocab + 10–12 expressions + 2 contexts'],
 ['P0','ja',2,'topic','Restaurant ordering workflow is absent','The single food lesson cannot cover ordering, restrictions, substitution and payment','Create restaurant lesson with service responses','10–14 vocab + 10–12 expressions + 2 contexts'],
 ['P0','en',3,'function','Booking, canceling and rescheduling are not a complete task','Time lesson confirms a meeting but does not handle change','Create appointment lesson with alternative negotiation','8–12 vocab + 10 expressions + 2 dialogues'],
 ['P0','ja',2,'grammar','助数詞 progression is absent from the shopping path','Quantity cannot be handled naturally with generic number words alone','Teach 人/本/枚/個/つ through supermarket tasks','1 grammar family + 20–30 examples/expressions'],
 ['P0','en',5,'lesson','en-s5-l2 has Stage 5 objective but average grammar Level 2.67','The path labels simple travel statements as advanced negotiation','Restructure around conditions, alternatives and confirmation','+8 expressions + 1 dialogue; replace/re-role grammar'],
 ['P0','ja',5,'lesson','ja-s5-l3 has average grammar Level 1.33','The lesson does not realize its condition/negotiation objective','Use なら/ても/場合 and multi-turn travel disruption','+8 expressions + 1 dialogue; grammar re-composition later'],
 ['P0','en',6,'lesson','en-s6-l3 regresses to Stage 1–2 invitation language','Stage 6 independence is broken by a basic social lesson','Move down or rebuild as tactful negotiation and repair','+8 advanced expressions + 1 dialogue'],
 ['P0','ja',6,'lesson','ja-s6-l4 regresses to Level 1–3 invitation language','Late-stage progression is not demonstrably harder','Move down or rebuild around conditional acceptance and rescheduling','+8 advanced expressions + 1 dialogue'],
 ['P0','ja',2,'progression','Polite/plain forms are present as fragments, not a deliberate transition','Register errors affect naturalness and social appropriateness','Add explicit plain/polite conversion and relationship conditions','3 grammar contrasts + 24–30 examples'],
 ['P1','en',1,'vocabulary_examples','341/345 English vocabulary items have exactly one curated usage','Core words lack collocation, context and sense contrast','Add stable usage to 120 highest-use/core items','+180–240 vocab examples/collocations'],
 ['P1','ja',1,'vocabulary_examples','346/350 Japanese vocabulary items have exactly one curated usage','Reading alone does not show particles, conjugation or collocation','Add stable usage to 130 core items','+200–260 vocab examples/collocations'],
 ['P1','both',1,'semantic_relations','Only 11 vocabulary relations cover a 695-item lexicon','Synonym, contrast, register and collocation navigation is almost absent','Author reviewed relations for high-confusion clusters','+90–130 relation edges'],
 ['P1','en',4,'lesson','en-s4-l3 claims full restaurant ordering but covers mainly order correction','Learners cannot complete the full service encounter','Add seating/order/restriction/check/bill sequence','+6–8 vocab + 8 expressions + 1 dialogue'],
 ['P1','ja',4,'lesson','ja-s4-l1 uses low-level grammar and unnatural daily wording for weather planning','Form difficulty and communicative naturalness are misaligned','Use そう/かもしれない/ので and natural forecast language','+6 expressions + 6 examples'],
 ['P1','en',3,'topic','Digital phone/network troubleshooting is absent','A common daily help task has no vocabulary or scenario','Create connectivity lesson or module','8–12 vocab + 10 expressions + 1 dialogue'],
 ['P1','ja',3,'topic','報告・連絡・相談 and workplace register are absent','Existing honorific/humble grammar remains library-only','Create workplace lesson with register ladder','10–14 vocab + 12 expressions + 2 dialogues'],
 ['P1','en',4,'topic','Renting and maintenance communication is absent','Home content only covers chores and shared equipment','Create renting/repair lesson','10–14 vocab + 10 expressions + 2 contexts'],
 ['P1','ja',4,'topic','賃貸・修理 interaction is absent','Housing problems require role and politeness choices','Create landlord/management repair lesson','10–14 vocab + 10 expressions + 2 contexts'],
 ['P1','both',3,'topic','Shopping lacks returns/refunds/exchanges','Buying without after-sales repair leaves the task incomplete','Add a returns lesson per language','8–12 vocab + 10 expressions + 1 dialogue each'],
 ['P1','both',4,'topic','Travel is transport-heavy and lacks accommodation','Check-in, facilities and room problems are common travel tasks','Add accommodation lesson per language','8–12 vocab + 10 expressions + 1 dialogue each'],
 ['P1','en',3,'grammar','Advice, obligation and first conditional are missing as a coherent progression','Health, school and plans lack reusable functional grammar','Add should, must/have to and first conditional','3 concepts + 24–30 examples'],
 ['P1','ja',3,'grammar','Experience, comparison and condition contrasts exist only partially or unassigned','Core communicative functions are not sequenced','Assign たことがある and add comparison/condition contrast','3–4 concepts + 28–36 examples'],
 ['P2','both',5,'exam_support','IELTS/JLPT alignments are sparse draft mappings','They support discovery but cannot evidence broad target coverage','Keep draft; expand only after communicative core is repaired','review 78 mappings; no official-list claim'],
 ['P2','both',1,'taxonomy','`body` and `health` duplicate the same Chinese topic label','Two IDs split tiny body content and distort the stated 14-topic baseline','Editorially merge, rename or define distinct scopes','review 4 expressions + 4 vocab links; no automatic merge']
].map(([priority,language,stage,type,gap,why_it_matters,proposed_solution,estimated_amount_of_new_content],index)=>({rank:index+1,priority,language,stage,type,gap,why_it_matters,proposed_solution,estimated_amount_of_new_content}));

const contentCreationStrategy={
 Vocabulary:{strategy:'AI-assisted + editorial/native review',boundary:'Canonical lemma, sense, reading/POS, stage and collisions must be human-approved; dynamic AI is not canonical.'},
 Grammar:{strategy:'Editorially authored',boundary:'Scope, formula, contrast, level and progression require editorial ownership.'},
 Curated_Examples:{strategy:'AI-assisted drafting + editorial/native review',boundary:'Validate naturalness, form targeting, polarity/question/register coverage and vocabulary difficulty before insertion.'},
 Expressions:{strategy:'Derived from existing canonical items first; otherwise AI-assisted + review',boundary:'Each core expression needs a communicative function and vocabulary/grammar linkage.'},
 Dialogues:{strategy:'Editorial task design + AI-assisted drafting + native review',boundary:'Require role, context, 3–5 turn goal progression, repair/follow-up and register checks.'},
 Dynamic_AI_Examples:{strategy:'DeepSeek runtime only',boundary:'Ephemeral expansion layer; never counted as curated coverage and never written to curriculum.'}
};

const grammarExampleAudit=grammar.map(item=>{
 const examplesForItem=grammarExampleRows.filter(x=>x.grammar_id===item.id);
 const texts=examplesForItem.map(x=>x.text);
 const negativePattern=item.language==='en'?/\b(?:not|n't|no|never|neither)\b/i:/(?:ない|ません|なかった|ませんでした|ぬ|ず)/;
 const questionPattern=item.language==='en'?/\?/:/(?:[？?]|か[。！!]?$)/;
 return {grammar_id:item.id,language:item.language,level:item.level,form_name:item.form_name,linked_lessons:item.lesson_uses,expression_usage:item.expression_uses,related_grammar:item.relation_count,
  curated_examples:item.example_count,bucket:item.example_count===0?'0':item.example_count<=2?'1-2':item.example_count<=5?'3-5':item.example_count<=8?'6-8':'9+',
  has_negative:texts.some(x=>negativePattern.test(x)),has_question:texts.some(x=>questionPattern.test(x)),has_register_variation:item.example_count>1&&new Set(examplesForItem.map(x=>x.source_expression_id??'standalone')).size>1,
  has_form_or_tense_variation:item.example_count>1,
  diagnosis:item.example_count===0?'No curated evidence.':item.example_count<=2?'Insufficient to demonstrate affirmative/negative/question and usage conditions reliably.':'Review semantic and register diversity manually.',
  recommended_target:item.expression_uses>=5||item.lesson_uses>=2?'6–10':'3–6'};
});

const stageProgression=['en','ja'].flatMap(language=>[1,2,3,4,5,6].map(stage=>{
 const rows=lessonRows.filter(x=>x.language===language&&x.stage===stage);
 const avg=key=>Number((rows.reduce((n,x)=>n+Number(x[key]||0),0)/rows.length).toFixed(2));
 return {language,stage,lessons:rows.length,avg_vocabulary_level:avg('avg_vocab_stage'),avg_grammar_level:avg('avg_grammar_level'),avg_expression_difficulty:avg('avg_expression_difficulty'),lessons_with_dialogue:rows.filter(x=>x.dialogues>0).length,
  interpretation:stage<=2?'Foundational task growth is visible.':stage<=4?'Expression complexity rises, but grammar/vocabulary lag behind stage labels.':'High-stage lexical/grammar progression plateaus or reverses; task depth is not consistently higher.'};
}));

const candidateVocabularyKeys=new Map();
const duplicateCandidates=[];
for(const item of vocabularyCandidates){const key=`${item.language}:${normalize(item.candidate)}`;if(candidateVocabularyKeys.has(key))duplicateCandidates.push([candidateVocabularyKeys.get(key),item.candidate]);else candidateVocabularyKeys.set(key,item.candidate);}
const canonicalVocabKeys=new Set(vocab.map(x=>`${x.language}:${normalize(x.lemma)}`));
const canonicalCandidateCollisions=vocabularyCandidates.filter(x=>canonicalVocabKeys.has(`${x.language}:${normalize(x.candidate)}`)).map(x=>({language:x.language,candidate:x.candidate}));
const invalidStages=[...vocabularyCandidates.filter(x=>x.recommended_stage<1||x.recommended_stage>6),...grammarCandidates.filter(x=>x.stage_level<1||x.stage_level>6),...newLessonCandidates.filter(x=>x.stage<1||x.stage>6)];
const unsupportedTopics=[...vocabularyCandidates,...grammarCandidates,...expressionClusters,...dialogueClusters,...newLessonCandidates].filter(x=>!topicIds.has(x.topic));
const validTargetLessons=new Set([...lessonRows.map(x=>x.id),...newLessonCandidates.map(x=>x.id),null]);
const invalidLessonReferences=[...vocabularyCandidates.map(x=>({...x,target_lesson:x.likely_lesson_use})),...grammarCandidates,...expressionClusters,...dialogueClusters].filter(x=>!validTargetLessons.has(x.target_lesson)).map(x=>({item_type:x.item_type??'vocabulary',language:x.language,target_lesson:x.target_lesson,proposed_content:x.proposed_content??x.candidate}));
const contentLanguage=new Map([...vocab,...grammar,...expressions].map(x=>[x.id,x.language]));
const invalidCanonicalLessonReferences=lessonItems.filter(x=>!contentLanguage.has(x.content_id));
const lessonLanguage=new Map(lessonRows.map(x=>[x.id,x.language]));
const crossLanguageMismatch=lessonItems.filter(x=>contentLanguage.get(x.content_id)!==lessonLanguage.get(x.lesson_id));
const countChecks={
 vocabulary:{expected:baseline.vocabulary,observed:vocab.length,pass:baseline.vocabulary===vocab.length},
 grammar:{expected:baseline.grammar,observed:grammar.length,pass:baseline.grammar===grammar.length},
 expressions:{expected:baseline.expressions,observed:expressions.length,pass:baseline.expressions===expressions.length},
 lessons:{expected:baseline.lessons,observed:lessonRows.length,pass:baseline.lessons===lessonRows.length},
 unassigned_vocabulary:{expected:languageCoverage.reduce((n,x)=>n+x.vocab-x.linked_vocab,0),observed:unassignedRecords.filter(x=>x.content_type==='vocabulary').length,pass:languageCoverage.reduce((n,x)=>n+x.vocab-x.linked_vocab,0)===unassignedRecords.filter(x=>x.content_type==='vocabulary').length},
 unassigned_grammar:{expected:languageCoverage.reduce((n,x)=>n+x.grammar-x.linked_grammar,0),observed:unassignedRecords.filter(x=>x.content_type==='grammar').length,pass:languageCoverage.reduce((n,x)=>n+x.grammar-x.linked_grammar,0)===unassignedRecords.filter(x=>x.content_type==='grammar').length},
 unassigned_expressions:{expected:languageCoverage.reduce((n,x)=>n+x.expressions-x.linked_expressions,0),observed:unassignedRecords.filter(x=>x.content_type==='expression').length,pass:languageCoverage.reduce((n,x)=>n+x.expressions-x.linked_expressions,0)===unassignedRecords.filter(x=>x.content_type==='expression').length}
};
const qaErrors={duplicate_candidate:duplicateCandidates,existing_canonical_collision:canonicalCandidateCollisions,english_japanese_cross_language_mismatch:crossLanguageMismatch,invalid_stage_proposal:invalidStages,unsupported_topic:unsupportedTopics,invalid_lesson_reference:invalidLessonReferences,hallucinated_existing_content:invalidCanonicalLessonReferences,count_inconsistency:Object.entries(countChecks).filter(([,x])=>!x.pass).map(([name,x])=>({name,...x}))};
const errorCount=Object.values(qaErrors).reduce((n,items)=>n+items.length,0);
const warnings={
 baseline_delta:[
  {metric:'English linked vocabulary',brief:118,canonical:byLanguage('en').linked_vocab},
  {metric:'English linked grammar',brief:40,canonical:byLanguage('en').linked_grammar},
  {metric:'English linked expressions',brief:87,canonical:byLanguage('en').linked_expressions},
  {metric:'Japanese linked grammar',brief:42,canonical:byLanguage('ja').linked_grammar},
  {metric:'Japanese linked expressions',brief:88,canonical:byLanguage('ja').linked_expressions}
 ],
 curated_example_depth:{grammar_one_to_two:grammar.filter(x=>x.example_count<=2).length,vocabulary_exactly_one:vocab.filter(x=>x.example_count===1).length},
 taxonomy:[{issue:'The database has 15 topic IDs while the brief says 14.',detail:'body and health both display as 身体状态; no automatic merge was performed.'}],
 dialogue_depth:{en_dialogue_expressions:expressions.filter(x=>x.language==='en'&&x.unit_type==='dialogue').length,ja_dialogue_expressions:expressions.filter(x=>x.language==='ja'&&x.unit_type==='dialogue').length,dialogues_over_two_turns:expressions.filter(x=>x.dialogue_turns>2).length},
 semantic_links:{vocabulary_relations:baseline.vocabulary_relations,grammar_relations:baseline.grammar_relations},
 progression:stageProgression.filter(x=>x.stage>=5),
 regression:[{issue:'An optional REQUIRE_D1=1 probe against the already-running local Worker reported audited-fallback instead of d1.',impact:'The normal regression contract explicitly permits audited-fallback. Canonical counts and reports were independently read from the local D1 clone through Wrangler SELECT queries; no write occurred.'}],
 editorial:['Cohesion scores are transparent heuristics, not objective linguistics scores.','Lesson practice coverage is inferred because no canonical lesson-practice mapping table exists.','Unassigned primary classes are planning judgments; POSSIBLE_REMOVE_MERGE is a non-destructive overlapping proposal set.']
};

const qa={generated_at:generatedAt,source_environment:'local read-only clone of Phase 3.5D.1 canonical D1',errors:errorCount,error_categories:Object.fromEntries(Object.entries(qaErrors).map(([k,v])=>[k,v.length])),error_details:qaErrors,warnings,warnings_count:warnings.baseline_delta.length+warnings.taxonomy.length+warnings.regression.length+warnings.editorial.length+2,count_consistency:countChecks,duplicate_candidates:duplicateCandidates,invalid_references:invalidLessonReferences,regression_scope:{curriculum_files_modified:false,d1_modified:false,lesson_composition_modified:false,learner_progress_modified:false,ai_dynamic_examples_modified:false,production_modified:false,verification:['read-only SELECTs against .wrangler/phase35d-clean','Phase 3.5D.1 isolation/config unit test','Phase 3.5D.1 Dynamic Examples unit suite','Phase 3.5D Lesson Path/API regression against local Worker','Phase 3.5C.1/Library endpoints exercised through Phase 3.5D regression'],note:'Runtime regression commands and the accepted local fallback observation are recorded in regression-verification.json.'}};

const vocabularyGapReport={generated_at:generatedAt,read_only:true,methodology:{coverage_is_not_quality:true,definitions:{lesson_linked:'Distinct canonical vocabulary ID present in lesson_items.',unassigned:'Published canonical vocabulary with zero lesson references.',expression_usage:'Distinct curated expressions linked through v2_sentence_vocabulary_links.',semantic_relation:'Outgoing reviewed link in v2_vocabulary_relations.'}},baseline:languageCoverage.map(x=>({language:x.language,total:x.vocab,lesson_linked:x.linked_vocab,coverage_percent:pct(x.linked_vocab,x.vocab),unassigned:x.vocab-x.linked_vocab})),by_stage:stageVocabulary,example_buckets:{zero:vocab.filter(x=>x.example_count===0).length,one:vocab.filter(x=>x.example_count===1).length,two_to_three:vocab.filter(x=>x.example_count>=2&&x.example_count<=3).length,four_plus:vocab.filter(x=>x.example_count>=4).length},underused:vocab.filter(x=>x.expression_uses===0).map(x=>({id:x.id,language:x.language,stage:x.stage,lemma:x.lemma,topics:x.topics,example_count:x.example_count,relation_count:x.relation_count})),high_reuse:vocab.filter(x=>x.lesson_uses>=3||x.expression_uses>=8).map(x=>({id:x.id,language:x.language,lemma:x.lemma,lesson_uses:x.lesson_uses,expression_uses:x.expression_uses})),canonical_duplicates:canonicalDuplicates,missing_high_value_candidates:vocabularyCandidates,editorial_conclusions:['No vocabulary lacks an example, but 687/695 have only one; this is breadth without usage depth.','English has 153 and Japanese 183 vocabulary items with zero expression use.','Only 11 vocabulary relation rows exist, so semantic navigation is effectively absent.','High-value additions should follow communicative tasks, not equalize topic counts.']};

const grammarGapReport={generated_at:generatedAt,read_only:true,baseline:languageCoverage.map(x=>({language:x.language,total:x.grammar,lesson_linked:x.linked_grammar,coverage_percent:pct(x.linked_grammar,x.grammar),unassigned:x.grammar-x.linked_grammar})),by_level:['en','ja'].flatMap(language=>[1,2,3,4,5,6].map(level=>{const rows=grammar.filter(x=>x.language===language&&x.level===level);return {language,level,total:rows.length,lesson_linked:rows.filter(x=>x.lesson_uses>0).length,unassigned:rows.filter(x=>x.lesson_uses===0).length,expression_unused:rows.filter(x=>x.expression_uses===0).length};})),underused:grammar.filter(x=>x.lesson_uses===0).map(x=>({id:x.id,language:x.language,level:x.level,form_name:x.form_name,expression_uses:x.expression_uses,curated_examples:x.example_count,relations:x.relation_count})),missing_progression_candidates:grammarCandidates,possible_merge_review:[{language:'en',items:['en-simple-present','en-do-question','proposed basic negation'],reason:'Keep distinct entries but design one question/negative progression and explicit relations.'},{language:'en',items:['en-would-have','en-third-conditional','en-mixed-conditional'],reason:'Not duplicates; current granularity needs relation and prerequisite review.'},{language:'ja',items:['ja-te-kudasai','ja-te-morau','ja-te-itadaku','ja-honorific-request'],reason:'Build a politeness/request ladder; do not merge mechanically.'},{language:'ja',items:['ja-nara','ja-tara','ja-ba-condition','ja-to-condition'],reason:'Keep semantic distinctions but teach contrastively.'}],conclusions:['All published grammar has at least one curated example and expression use, but 70 points are not in any lesson.','Japanese plain/polite, particles, counters and condition contrasts need deliberate sequencing.','English tense/question/negation/modality progression has foundational holes despite advanced structures being present.']};

const curatedExampleGapReport={generated_at:generatedAt,read_only:true,dynamic_examples_count_as_curated:false,grammar_buckets:{combined:{zero:grammar.filter(x=>x.example_count===0).length,one_to_two:grammar.filter(x=>x.example_count>=1&&x.example_count<=2).length,three_to_five:grammar.filter(x=>x.example_count>=3&&x.example_count<=5).length,six_to_eight:grammar.filter(x=>x.example_count>=6&&x.example_count<=8).length,nine_plus:grammar.filter(x=>x.example_count>=9).length},by_language:grammarBuckets},grammar_points:grammarExampleAudit,vocabulary_buckets:{combined:{zero:vocab.filter(x=>x.example_count===0).length,one:vocab.filter(x=>x.example_count===1).length,two_to_three:vocab.filter(x=>x.example_count>=2&&x.example_count<=3).length,four_plus:vocab.filter(x=>x.example_count>=4).length},by_stage:stageVocabulary.map(x=>({language:x.language,stage:x.stage,...x.examples})),kinds:vocabularyExampleKinds},targets:{core_grammar:'6–10 curated examples normally; up to 12 where polarity, question, tense or register contrasts justify it.',secondary_grammar:'3–6 curated examples.',core_vocabulary:'2–4 stable usages across collocation, sentence and contrast; not every library-only item needs equal depth.'},conclusions:[`154/155 grammar points sit in the 1–2 bucket; ${grammarExampleAudit.filter(x=>!x.has_negative).length} have no negative example and ${grammarExampleAudit.filter(x=>!x.has_question).length} have no question example by surface-form audit.`,'Single-example items cannot demonstrate tense/register/form variation.','687/695 vocabulary items have exactly one example; eight have 2–3; none have 4+.']};

const lessonGapReport={generated_at:generatedAt,read_only:true,scoring:{disclaimer:'Editorial heuristic, not an objective linguistics score.',total:100,components:{semantic_cohesion:'25 × fraction of lesson vocabulary used by selected expressions.',grammar_expression_alignment:'25 × fraction of lesson grammar linked to selected expressions.',context_depth:'18 if any dialogue + 7 if any scenario + 5 bonus for at least four dialogue turns, capped at 25.',progression_fit:'25 minus 7 × absolute gap between lesson Stage and mean expression difficulty, floor 4.'},category_note:'Final category combines score evidence with the explicit editorial judgment recorded per lesson; serious objective/progression mismatches override the numeric band.'},summary:Object.fromEntries(['Strong','Needs enrichment','Needs restructuring'].map(category=>[category,lessonReport.filter(x=>x.health_category===category).length])),lessons:lessonReport,new_lesson_candidates:newLessonCandidates,conclusions:['All 48 lessons have canonical items and valid links, but composition quality is uneven.','High-stage vocabulary averages remain around Stage 2–3; Stage 5–6 complexity is driven by a few grammar forms rather than broader lexical and dialogic independence.','English Stage 6 and Japanese Stage 6 have only one lesson with any dialogue.','The most urgent restructures are en-s1-l4, en-s4-l3, en-s5-l2, en-s6-l3, en-s6-l4, ja-s4-l1, ja-s5-l3 and ja-s6-l4.']};

const topicFunctionGapReport={generated_at:generatedAt,read_only:true,topic_count:topics.length,topics,coverage:topicCoverage,judgments:topicJudgments,communicative_functions:functionProgression,stage_progression:stageProgression,exam_support:{alignment_status:'draft',alignments,IELTS:{strengths:['Some opinion, evidence, comparison, qualification and formal grammar anchors exist.'],gaps:['Sparse item counts per target','Little sustained speaking interaction','Reason-example-qualification sequences are not systematic']},JLPT:{strengths:['N5–N1 draft targets each have vocabulary, grammar and expression anchors.'],gaps:['Not an official word-by-word classification','Polite/plain and particle progression is incomplete internally','N1/N2 support is sparse and largely isolated']},alignment_changed:false}};

const unassignedReport={generated_at:generatedAt,read_only:true,definition:'Published canonical items with zero lesson_items references.',totals:{all:unassignedRecords.length,en:unassignedRecords.filter(x=>x.language==='en').length,ja:unassignedRecords.filter(x=>x.language==='ja').length,by_type:{vocabulary:unassignedRecords.filter(x=>x.content_type==='vocabulary').length,grammar:unassignedRecords.filter(x=>x.content_type==='grammar').length,expression:unassignedRecords.filter(x=>x.content_type==='expression').length}},classification_rules_are_editorial:true,summary:unassignedSummary,possible_remove_merge_proposals:canonicalDuplicates,items:unassignedRecords,warning:'Unassigned does not mean bad. Classification proposes placement/review intent and performs no assignment, merge or deletion.'};

const curriculumExpansionPlan={generated_at:generatedAt,read_only:true,phase35e1_started:false,tiers:expansionTargets,items:[...vocabularyCandidates.map(x=>({item_type:'vocabulary',language:x.language,stage_level:x.recommended_stage,topic:x.topic,proposed_content:x.candidate,reason:x.why_needed,target_lesson:x.likely_lesson_use,priority:x.priority,confidence:x.confidence,source_strategy:x.source_strategy,requires_human_review:x.requires_human_review,duplicate_risk:x.duplicate_risk})),...grammarCandidates,...expressionClusters,...dialogueClusters,...newLessonCandidates.map(x=>({item_type:'lesson',language:x.language,stage_level:x.stage,topic:x.topic,proposed_content:x.title,reason:x.reason,target_lesson:x.id,priority:x.priority,confidence:x.confidence,source_strategy:x.source_strategy,requires_human_review:x.requires_human_review,duplicate_risk:'compare objective and reusable canonical set with all existing lessons'}))],top_30_curriculum_gaps:top30,content_creation_strategy:contentCreationStrategy};

const regressionVerification={generated_at:generatedAt,read_only:true,environment:'local',results:[
 {area:'Phase 3.5D.1 isolation/config',command:'node scripts/check-35d1-config.js',status:'PASS',detail:'Worker isolation, bindings, provider configuration and read-only endpoint checks passed.'},
 {area:'AI Dynamic Examples',command:'node --test tests/phase35d1-api.test.js',status:'PASS',detail:'14/14 tests passed; dynamic output remains ephemeral and separated from curated examples.'},
 {area:'Phase 3.5D.1 deployability',command:'npm run check:35d1',status:'PASS',detail:'Wrangler dry-run passed; no deployment occurred.'},
 {area:'Lesson Path + Phase 3.5C.1 + Library APIs',command:'node --test tests/phase35d-api.test.js tests/phase35c1-api.test.js',status:'PASS',detail:'8/8 tests passed against http://127.0.0.1:8800.'},
 {area:'Phase 3.5D responsive/navigation regression',command:'node tests/phase35d-browser.cjs',status:'PASS',detail:'Browser, responsive, navigation and regression acceptance passed.'},
 {area:'Phase 3.5D.1 responsive Dynamic Examples',command:'node tests/phase35d1-browser.cjs',status:'PASS',detail:'360/390/430/768/1440 widths passed; fixed AI Preview regression passed.'}
 ],observations:[{severity:'warning',detail:'An optional REQUIRE_D1=1 probe saw audited-fallback on the already-running local Worker. The normal API contract permits this. Canonical audit data was queried independently from .wrangler/phase35d-clean through read-only D1 SELECTs.'}],not_directly_mutated_or_exercised:['placement learner state','recommendation learner state','mastery/checkpoint learner state','localStorage contents'],reason:'No learner-facing/source change occurred; browser regression covers navigation/rendering, while this phase did not write or migrate learner state.'};

const phaseReport={generated_at:generatedAt,phase:'3.5E',status:errorCount===0?'complete':'qa_failed',read_only:true,source:{database:'local Phase 3.5D.1-compatible canonical D1 clone',config,persist,remote_audit:false,worker_deployed:false,d1_created:false},current_curriculum_health:{baseline,language_coverage:languageCoverage.map(x=>({...x,vocab_coverage_percent:pct(x.linked_vocab,x.vocab),grammar_coverage_percent:pct(x.linked_grammar,x.grammar),expression_coverage_percent:pct(x.linked_expressions,x.expressions)})),strengths:['Balanced 345/350 bilingual lexicons and complete Stage 1–6 lesson skeletons.','Every grammar and vocabulary item has at least one curated example.','All lesson references are canonical and language-valid.','Scenario/dialogue infrastructure and draft IELTS/JLPT supporting alignment already exist.'],weaknesses:['Curated example depth is almost uniformly one item.','Dialogue depth stops at two turns.','High-stage lexical and communicative complexity plateaus.','Several high-value daily-life tasks are absent.','Semantic relations are extremely sparse.']},vocabulary_gap_summary:vocabularyGapReport.baseline,grammar_gap_summary:grammarGapReport.baseline,curated_example_summary:curatedExampleGapReport.grammar_buckets,expression_sentence_summary:unitDistribution,lesson_health:lessonGapReport.summary,unassigned_summary:unassignedReport.totals,topic_function_summary:topicJudgments,progression:stageProgression,exam_support:topicFunctionGapReport.exam_support,top_30_curriculum_gaps:top30,expansion_recommendation:expansionTargets,content_creation_strategy:contentCreationStrategy,qa,changes:{curriculum_changed:false,D1_changed:false,lessons_changed:false,learner_progress_changed:false,AI_Dynamic_Examples_changed:false,production_changed:false,phase35e1_started:false,phase4_started:false}};

write('vocabulary-gap-report.json',vocabularyGapReport);
write('grammar-gap-report.json',grammarGapReport);
write('curated-example-gap-report.json',curatedExampleGapReport);
write('lesson-gap-report.json',lessonGapReport);
write('topic-function-gap-report.json',topicFunctionGapReport);
write('unassigned-content-classification.json',unassignedReport);
write('curriculum-expansion-plan.json',curriculumExpansionPlan);
write('phase35e-gap-report.json',phaseReport);
write('regression-verification.json',regressionVerification);

const en=byLanguage('en'),ja=byLanguage('ja');
const en6=stageProgression.find(x=>x.language==='en'&&x.stage===6),ja6=stageProgression.find(x=>x.language==='ja'&&x.stage===6);
const strong=lessonReport.filter(x=>x.health_category==='Strong').map(x=>x.id).join(', ');
const enrich=lessonReport.filter(x=>x.health_category==='Needs enrichment').map(x=>x.id).join(', ');
const restructure=lessonReport.filter(x=>x.health_category==='Needs restructuring').map(x=>x.id).join(', ');
const tierLine=tier=>`EN vocab ${tier.en_vocab.min}–${tier.en_vocab.max}; JA vocab ${tier.ja_vocab.min}–${tier.ja_vocab.max}; EN grammar ${tier.en_grammar.min}–${tier.en_grammar.max}; JA grammar ${tier.ja_grammar.min}–${tier.ja_grammar.max}; EN curated grammar examples ${tier.en_curated_grammar_examples.min}–${tier.en_curated_grammar_examples.max}; JA ${tier.ja_curated_grammar_examples.min}–${tier.ja_curated_grammar_examples.max}; EN expressions ${tier.en_expressions.min}–${tier.en_expressions.max}; JA ${tier.ja_expressions.min}–${tier.ja_expressions.max}; EN dialogues/scenarios ${tier.en_dialogues_scenarios.min}–${tier.en_dialogues_scenarios.max}; JA ${tier.ja_dialogues_scenarios.min}–${tier.ja_dialogues_scenarios.max}; EN lessons ${tier.en_new_lessons.min}–${tier.en_new_lessons.max}; JA ${tier.ja_new_lessons.min}–${tier.ja_new_lessons.max}.`;
const top30Md=top30.map(x=>`${x.rank}. **${x.priority} · ${x.language.toUpperCase()} · Stage ${x.stage} · ${x.type}** — ${x.gap} Why: ${x.why_it_matters} Solution: ${x.proposed_solution} Estimate: ${x.estimated_amount_of_new_content}.`).join('\n');
const summaryMd=`# Phase 3.5E — Content Gap Analysis & Curriculum Expansion Planning

Audit time: ${generatedAt}  
Source: local read-only Phase 3.5D.1-compatible canonical D1 clone. Dynamic AI examples are excluded from curated coverage. No Worker or D1 was created or deployed.

## 【Current Curriculum Health】

English: ${en.vocab} vocabulary (${en.linked_vocab} linked, ${pct(en.linked_vocab,en.vocab)}%), ${en.grammar} grammar (${en.linked_grammar} linked, ${pct(en.linked_grammar,en.grammar)}%), ${en.expressions} expressions (${en.linked_expressions} linked, ${pct(en.linked_expressions,en.expressions)}%), 24 lessons.

Japanese: ${ja.vocab} vocabulary (${ja.linked_vocab} linked, ${pct(ja.linked_vocab,ja.vocab)}%), ${ja.grammar} grammar (${ja.linked_grammar} linked, ${pct(ja.linked_grammar,ja.grammar)}%), ${ja.expressions} expressions (${ja.linked_expressions} linked, ${pct(ja.linked_expressions,ja.expressions)}%), 24 lessons.

overall strengths: complete bilingual Stage 1–6 skeleton; canonical lesson references are valid; all vocabulary/grammar has at least one curated example; scenarios, dialogues and draft exam support exist.

overall weaknesses: coverage is shallow—154/155 grammar points have only 1–2 examples, 687/695 vocabulary items have exactly one, all dialogues stop at two turns, semantic relations are sparse, and several high-value daily tasks are absent.

## 【Vocabulary Gaps】

English: Stage totals 88/83/69/51/22/32. Linked 119/345; 153 have no curated-expression use; 341 have exactly one vocabulary example.

Japanese: Stage totals 97/79/80/48/25/21. Linked 107/350; 183 have no curated-expression use; 346 have exactly one vocabulary example.

missing high-value: restaurant safety/payment, supermarket/returns, clinic/pharmacy, appointments, renting/maintenance, banking/payment, connectivity, accommodation, driving and workplace terms. ${vocabularyCandidates.length} representative candidates are fully specified in vocabulary-gap-report.json; they are not inserts.

underused: ${vocab.filter(x=>x.expression_uses===0).length} items have no expression use. library-only: retain advanced/long-tail items until a coherent task needs them. duplicate/review candidates: four English normalized-lemma groups (help, plan, rain, work); no automatic merge.

## 【Grammar Gaps】

English: missing an explicit negation/short-answer spine, past questions/negatives, advice/obligation, first conditional, and tense contrast. 31/73 points are unassigned.

Japanese: particles, adjective/plain-form conjugation, counters, obligation, giving/receiving, register transition and condition contrasts need deliberate sequencing. 39/82 points are unassigned.

missing progression: high-level structures exist before foundational communicative contrasts are securely in the path. underused grammar: 70 points are library-only in lessons even though all have at least one expression. possible merge/review: teach related families contrastively; do not mechanically merge them.

## 【Curated Example Gaps】

grammar 0 examples: 0.  
grammar 1–2: 154.  
grammar 3–5: 1.  
grammar 6+: 0.

vocabulary example gaps: 0 with none; 687 with one; 8 with 2–3; 0 with 4+. One example cannot demonstrate polarity, questions, tense/register variation, collocation range or usage conditions.

## 【Expression / Sentence Gaps】

English: 151 sentences, 46 scenario expressions, 29 dialogue expressions / 58 turns.

Japanese: 159 sentences, 45 scenario expressions, 29 dialogue expressions / 58 turns.

sentence: 310/459 expressions are isolated sentence units. scenario: contexts exist but generally lack follow-up. dialogue: every one of 58 dialogue expressions is exactly two turns; none models repair plus final confirmation.

## 【Lesson Health】

strong (${lessonGapReport.summary.Strong}): ${strong}.

needs enrichment (${lessonGapReport.summary['Needs enrichment']}): ${enrich}.

needs restructure (${lessonGapReport.summary['Needs restructuring']}): ${restructure}.

new lesson candidates: ${newLessonCandidates.filter(x=>x.language==='en').length} English and ${newLessonCandidates.filter(x=>x.language==='ja').length} Japanese candidates covering clinic, restaurant/supermarket/returns, appointment/connectivity/workplace, renting and accommodation. Every lesson’s score, content counts, diagnosis and recommendation is in lesson-gap-report.json.

## 【Unassigned Content】

English: ${unassignedRecords.filter(x=>x.language==='en').length} published items across vocabulary/grammar/expressions. Japanese: ${unassignedRecords.filter(x=>x.language==='ja').length}.

SHOULD_ASSIGN_EXISTING_LESSON: ${unassignedSummary.SHOULD_ASSIGN_EXISTING_LESSON.total}.  
SHOULD_FORM_NEW_LESSON: ${unassignedSummary.SHOULD_FORM_NEW_LESSON.total}.  
LIBRARY_ONLY_VALID: ${unassignedSummary.LIBRARY_ONLY_VALID.total}.  
SUPPORT_ONLY: ${unassignedSummary.SUPPORT_ONLY.total}.  
POSSIBLE_DUPLICATE: ${unassignedSummary.POSSIBLE_DUPLICATE.total}.  
NEEDS_EDITORIAL_REVIEW: ${unassignedSummary.NEEDS_EDITORIAL_REVIEW.total}.  
POSSIBLE_REMOVE/MERGE: ${unassignedSummary.POSSIBLE_REMOVE_MERGE.total} overlapping proposals; no deletion.

## 【Topic Coverage】

overrepresented: chat is a catch-all (EN 39, JA 48 expressions); school is also large (EN 25, JA 26) but mixes work and academic discourse.

underrepresented: body has 2 expressions per language and no lesson; health/home/shopping/time/hobbies have one lesson per language; Japanese food has one lesson.

missing functions: cooking/supermarket, returns, medical service, renting, banking/payment, connectivity, accommodation, driving and workplace operations. Database taxonomy warning: 15 topic IDs exist because body and health share the label 身体状态.

## 【Communicative Function Coverage】

Stage 1: greet/thank/apologize/request/want; gaps in full introductions, follow-up, closing and negative correction.  
Stage 2: ask/answer/confirm/choose/directions/permission; gaps in clarification, rescheduling, counters and refusal response.  
Stage 3: describe/plan/suggest/request; gaps in advice, past-experience Q&A, returns and multi-step problem solving.  
Stage 4: feelings/boundaries/preferences; gaps in complaint, remedy, negotiation and register movement.  
Stage 5: conditions/evidence/indirect requests; gaps in sustained disagreement and agreement-building.  
Stage 6: hypothesis/formal framing/hedging fragments; gaps in paragraph narration, challenge-response and advanced social negotiation.

## 【Progression】

English: expression averages rise to Stage 5 then fall at Stage 6; Stage 6 average vocabulary/grammar levels are only ${en6.avg_vocabulary_level}/${en6.avg_grammar_level} in the unweighted lesson audit.

Japanese: expression difficulty rises more steadily, but Stage 5 travel and Stage 6 social lessons regress sharply; Stage 6 average vocabulary/grammar levels remain ${ja6.avg_vocabulary_level}/${ja6.avg_grammar_level}.

difficulty inversions: en-s5-l2, en-s6-l3, en-s6-l4, ja-s4-l1, ja-s5-l3, ja-s6-l4. stage jumps: early exposure/support items jump above stage, while later stages reuse low-level material without sufficient interaction depth.

## 【Exam Supporting Coverage】

IELTS: useful draft anchors for opinion/evidence/comparison exist, but speaking sequences, qualification and examples are sparse. JLPT: N5→N1 draft anchors exist, but this is not official word-by-word classification and internal grammar/register progression is incomplete. alignment changed: NO.

## 【Top 30 Curriculum Gaps】

${top30Md}

## 【Expansion Recommendation】

MINIMUM: ${tierLine(expansionTargets.minimum)} ${expansionTargets.minimum.rationale}

RECOMMENDED: ${tierLine(expansionTargets.recommended)} ${expansionTargets.recommended.rationale}

EXTENDED: ${tierLine(expansionTargets.extended)} ${expansionTargets.extended.rationale}

具体推荐（Phase 3.5E.1 review baseline）: EN vocab 90–110; JA vocab 100–125; EN grammar 10–14; JA grammar 14–18; EN curated grammar examples 390–470; JA 450–540; EN expressions 110–140; JA 120–150; EN dialogues/scenarios 28–36; JA 32–40; EN new lessons 6–8; JA 7–9.

## 【Content Creation Strategy】

Vocabulary: AI-assisted + editorial/native review. Grammar: editorially authored. Curated Examples: AI-assisted drafting + editorial/native review. Expressions: derive from canonical items first, otherwise AI-assisted + review. Dialogues: editorial task design + AI-assisted drafting + native review. Dynamic AI Examples: DeepSeek runtime only; ephemeral and never counted as curated curriculum.

## 【QA】

errors: ${errorCount}. warnings: categorized in phase35e-gap-report.json (baseline deltas, topic taxonomy, example depth, dialogue depth, sparse relations, progression, heuristic limits). duplicate candidates: ${duplicateCandidates.length}. invalid references: ${invalidLessonReferences.length}. count consistency: ${Object.values(countChecks).every(x=>x.pass)?'PASS':'FAIL'}.

## 【Changes】

curriculum changed: NO. D1 changed: NO. lessons changed: NO. learner progress changed: NO. AI Dynamic Examples changed: NO. production changed: NO.

## 【Conclusion】

PHASE 3.5E CONTENT GAP ANALYSIS = ${errorCount===0?'YES':'NO'}
CURRICULUM DATABASE MODIFIED = NO
LESSON COMPOSITION MODIFIED = NO
LEARNER PROGRESS MODIFIED = NO
AI DYNAMIC EXAMPLES MODIFIED = NO
CONTENT GAPS IDENTIFIED = YES
UNASSIGNED CONTENT CLASSIFIED = YES
TOP 30 CURRICULUM GAPS PRODUCED = YES
EXPANSION COUNTS RECOMMENDED = YES
CURATED EXAMPLE GAPS AUDITED = YES
VOCABULARY GAPS AUDITED = YES
GRAMMAR GAPS AUDITED = YES
LESSON GAPS AUDITED = YES
PHASE 3.5E.1 STARTED = NO
PHASE 4 STARTED = NO
PRODUCTION CHANGED = NO
`;
fs.writeFileSync(path.join(outDir,'phase35e-gap-summary.md'),summaryMd);

const manifest={generated_at:generatedAt,files:fs.readdirSync(outDir).filter(x=>x.startsWith('phase35e-')||x.endsWith('-gap-report.json')||x==='unassigned-content-classification.json'||x==='curriculum-expansion-plan.json'||x==='regression-verification.json').sort().map(name=>{const data=fs.readFileSync(path.join(outDir,name));return {name,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')};})};
write('artifact-manifest.json',manifest);
console.log(JSON.stringify({status:phaseReport.status,errors:errorCount,warnings:qa.warnings_count,outputs:manifest.files.map(x=>x.name),lesson_health:lessonGapReport.summary,unassigned:unassignedReport.totals,expansion:expansionTargets.recommended},null,2));
if(errorCount)process.exitCode=1;
