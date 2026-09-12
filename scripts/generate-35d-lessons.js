import fs from 'node:fs';

const curriculum={
 en:[
  ['chat','打招呼并开始简单交谈','能用基本问候开启并结束一段简短对话。'],
  ['social','道歉、感谢并自然回应','能在常见社交往来中道歉、致谢并作出自然回应。'],
  ['food','说出想吃喝的东西','能表达基本饮食需要并回应简单选择。'],
  ['help','提出一个简单请求','能用清楚、礼貌的方式请别人提供帮助。'],
  ['time','约定见面的时间','能询问时间并确认一项简单安排。'],
  ['shopping','询问价格并做选择','能在购物时问价、比较并说明选择。'],
  ['travel','问路并确认方向','能询问地点、理解并确认基本路线。'],
  ['home','描述日常生活安排','能谈论家中活动和每天的基本习惯。'],
  ['plans','讨论计划与期待','能说明计划变化、未来期待以及尚未确定的安排。'],
  ['health','描述今天的身体状态','能说出常见不适并回应基本健康建议。'],
  ['weather','根据天气调整计划','能描述天气并说明它对安排的影响。'],
  ['school','说明学习或工作任务','能谈论正在做的任务、期限和基本要求。'],
  ['feelings','解释感受和原因','能较具体地表达情绪并给出原因。'],
  ['social','在社交中表达界限','能礼貌回应私人问题、独处需要或提前离场。'],
  ['food','在餐厅完成点餐','能询问菜品、提出饮食要求并结账。'],
  ['hobbies','分享兴趣与偏好','能比较兴趣、说明偏好并继续相关交流。'],
  ['school','在限制下评估工作方案','能结合时间、证据和条件说明可行方案。'],
  ['travel','处理行程变化','能解释延误或变更并协商替代安排。'],
  ['help','清楚说明问题并寻求解决','能提供足够背景并提出有针对性的请求。'],
  ['plans','讨论选择与未来安排','能比较方案、表达条件并说明打算。'],
  ['school','陈述观点并用依据支持','能在较正式讨论中提出主张和理由。'],
  ['chat','澄清语气并讨论假设','能修正过强语气，并用假设说明不同可能。'],
  ['social','发出邀请并照顾对方选择','能提出活动邀请并给对方自然接受或拒绝的空间。'],
  ['plans','回顾经历并展望目标','能连接过去经验、当前判断与未来目标。']
 ],
 ja:[
  ['chat','基本のあいさつを交わす','能用日语基本寒暄自然地开始和结束交流。'],
  ['social','お礼・謝罪・誘いに応じる','能在感谢、道歉和简单邀请中作出合适回应。'],
  ['food','食べたい物を伝える','能说出基本饮食需要并回应简单选择。'],
  ['help','短いお願いをする','能用日语常见礼貌形式提出简单请求。'],
  ['travel','助詞を使って行き先を伝える','能用基本助词说明目的地、方向和移动。'],
  ['home','家の中で頼み事を伝える','能在家中说明已做事项、提出请求并确认设备状态。'],
  ['time','時間を聞いて約束する','能询问时间、邀请对方并确认约定。'],
  ['shopping','数と量を確認して買う','能在购物时询问数量、价格并做出选择。'],
  ['chat','誤解を解き、言い方を整える','能回顾交流、补充不同看法并澄清误会。'],
  ['plans','経験とこれからの予定を話す','能连接过去经验、未来计划和暂未确定的安排。'],
  ['help','てくださいで具体的に頼む','能提出明确请求并根据语境调整礼貌程度。'],
  ['health','体調と症状を説明する','能描述身体状态、症状及持续情况。'],
  ['weather','理由を添えて予定を変える','能说明天气情况、原因及计划变化。'],
  ['plans','予定と予想のずれを説明する','能说明计划变化、结果与原先预期的差异。'],
  ['social','距離感に配慮して境界を伝える','能顾及关系与气氛，表达独处需要或婉拒。'],
  ['hobbies','好みを比べて会話を続ける','能比较爱好、说明偏好并追问细节。'],
  ['school','改まった形で判断を述べる','能用较正式结构说明可能性、限制和一般判断。'],
  ['help','遠回しに配慮して依頼する','能照顾对方感受，以较委婉方式求助。'],
  ['travel','条件を示して変更を相談する','能用条件表达协商行程变化和替代方案。'],
  ['feelings','気持ちの度合いと背景を話す','能细致表达感受强度及其背景。'],
  ['school','根拠を整理して説明する','能以较正式的日语组织观点、依据和结论。'],
  ['chat','確認しながら控えめに意見を述べる','能确认理解，并以保留或缓和方式表达判断。'],
  ['plans','経験を振り返り判断を伝える','能连接经历、反思和当前判断。'],
  ['social','誘いに応じ、予定変更を伝える','能回应邀请，并得体说明自己可能提前离场。']
 ]
};

const q=v=>`'${String(v).replaceAll("'","''")}'`;
const rows=[];
for(const [language,items] of Object.entries(curriculum))items.forEach(([topic,title,objective],i)=>{
 const stage=Math.floor(i/4)+1,sequence=i%4+1,id=`${language}-s${stage}-l${sequence}`;
 rows.push(`(${[id,language,stage,topic,title,objective,sequence,'published'].map(q).join(',')})`);
});

const sql=`-- Phase 3.5D: additive, canonical-ID-only lesson composition.\nPRAGMA foreign_keys=ON;\nCREATE TABLE lesson_units (\n+ id TEXT PRIMARY KEY, language TEXT NOT NULL CHECK(language IN ('en','ja')), stage INTEGER NOT NULL CHECK(stage BETWEEN 1 AND 6),\n+ topic_id TEXT NOT NULL REFERENCES v2_topics(id), title TEXT NOT NULL, objective TEXT NOT NULL, sequence INTEGER NOT NULL CHECK(sequence BETWEEN 1 AND 9),\n+ status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','archived')), estimated_minutes INTEGER NOT NULL DEFAULT 15 CHECK(estimated_minutes BETWEEN 10 AND 20),\n+ UNIQUE(language,stage,sequence)\n+);\nCREATE INDEX lesson_path_browse ON lesson_units(language,status,stage,sequence);\nCREATE TABLE lesson_prerequisites (\n+ lesson_id TEXT NOT NULL REFERENCES lesson_units(id), prerequisite_lesson_id TEXT NOT NULL REFERENCES lesson_units(id),\n+ PRIMARY KEY(lesson_id,prerequisite_lesson_id), CHECK(lesson_id<>prerequisite_lesson_id)\n+);\nCREATE TABLE lesson_items (\n+ lesson_id TEXT NOT NULL REFERENCES lesson_units(id), content_type TEXT NOT NULL CHECK(content_type IN ('vocabulary','grammar','expression')), content_id TEXT NOT NULL,\n+ role TEXT NOT NULL CHECK(role IN ('required','support','exposure')), sequence INTEGER NOT NULL, required INTEGER NOT NULL CHECK(required IN (0,1)),\n+ PRIMARY KEY(lesson_id,content_type,content_id), CHECK((role='required' AND required=1) OR (role<>'required' AND required=0))\n+);\nCREATE INDEX lesson_items_resolve ON lesson_items(lesson_id,content_type,sequence);\nCREATE INDEX lesson_items_coverage ON lesson_items(content_type,content_id);\nCREATE TABLE lesson_exam_recommendations (\n+ framework_id TEXT NOT NULL REFERENCES v2_alignment_frameworks(id), target TEXT NOT NULL, lesson_id TEXT NOT NULL REFERENCES lesson_units(id), relevance INTEGER NOT NULL CHECK(relevance BETWEEN 1 AND 3),\n+ PRIMARY KEY(framework_id,target,lesson_id)\n+);\nCREATE INDEX lesson_exam_lookup ON lesson_exam_recommendations(framework_id,target,relevance DESC,lesson_id);\nINSERT INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status) VALUES\n${rows.join(',\n')};\n\n-- A path is sequential within each language. This does not imply completion or locking.\nINSERT INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id)\nSELECT cur.id,prev.id FROM lesson_units cur JOIN lesson_units prev ON prev.language=cur.language AND ((prev.stage=cur.stage AND prev.sequence=cur.sequence-1) OR (cur.sequence=1 AND prev.stage=cur.stage-1 AND prev.sequence=4));\n\n-- Select four bounded, topic-coherent canonical expressions per lesson.\nINSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)\nWITH candidates AS (\n+ SELECT l.id lesson_id,e.id content_id,e.overall_difficulty,\n+ ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(e.overall_difficulty-l.stage),CASE u.unit_type WHEN 'dialogue' THEN 0 WHEN 'scenario' THEN 1 ELSE 2 END,e.is_primary DESC,u.sort_order,e.sort_order,e.id) rn\n+ FROM lesson_units l JOIN v2_sentence_units u ON u.topic_id=l.topic_id AND u.publication_state='published'\n+ JOIN v2_sentence_expressions e ON e.unit_id=u.id AND e.language=l.language AND e.publication_state='published'\n+ WHERE e.overall_difficulty<=l.stage+1\n+) SELECT lesson_id,'expression',content_id,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 'required' ELSE 'exposure' END,rn,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 1 ELSE 0 END FROM candidates WHERE rn<=4;\n\n-- Required vocabulary comes first from words actually used by the lesson expressions.\nINSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)\nWITH linked AS (\n+ SELECT li.lesson_id,v.id content_id,v.stage,MAX(svl.importance) importance,MIN(svl.sort_order) source_order\n+ FROM lesson_items li JOIN v2_sentence_vocabulary_links svl ON li.content_type='expression' AND svl.expression_id=li.content_id\n+ JOIN v2_vocabulary_items v ON v.id=svl.item_id AND v.publication_state='published'\n+ JOIN lesson_units l ON l.id=li.lesson_id AND l.language=v.language GROUP BY li.lesson_id,v.id,v.stage\n+), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 0 ELSE 1 END,importance DESC,source_order,content_id) rn FROM linked)\n+SELECT lesson_id,'vocabulary',content_id,CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 'required' ELSE 'support' END,rn,CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 1 ELSE 0 END FROM ranked WHERE rn<=8;\n\n-- Fill each lesson to 5-8 vocabulary items with same-topic, current-or-earlier canonical vocabulary.\nINSERT OR IGNORE INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)\nWITH candidates AS (\n+ SELECT l.id lesson_id,v.id content_id,ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(v.stage-l.stage),v.sort_order,v.id) rn\n+ FROM lesson_units l JOIN v2_vocabulary_topics vt ON vt.topic_id=l.topic_id JOIN v2_vocabulary_items v ON v.id=vt.item_id AND v.language=l.language AND v.publication_state='published' AND v.stage<=l.stage\n+), slots AS (SELECT l.id lesson_id,MAX(0,5-COUNT(li.content_id)) needed FROM lesson_units l LEFT JOIN lesson_items li ON li.lesson_id=l.id AND li.content_type='vocabulary' GROUP BY l.id)\n+SELECT c.lesson_id,'vocabulary',c.content_id,'required',100+c.rn,1 FROM candidates c JOIN slots s ON s.lesson_id=c.lesson_id WHERE c.rn<=s.needed+8;\n\n-- Keep at most eight vocabulary items after the fill (expression-linked items retain priority).\nDELETE FROM lesson_items WHERE content_type='vocabulary' AND rowid IN (SELECT rowid FROM (SELECT rowid,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY sequence,content_id) rn FROM lesson_items WHERE content_type='vocabulary') WHERE rn>8);\n\n-- Grammar must occur in a selected expression. Advanced structures stay support/exposure, never required.\nINSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)\nWITH linked AS (\n+ SELECT li.lesson_id,g.id content_id,g.level,MIN(sgl.sort_order) source_order\n+ FROM lesson_items li JOIN v2_sentence_grammar_links sgl ON li.content_type='expression' AND sgl.expression_id=li.content_id\n+ JOIN v2_grammar_points g ON g.id=sgl.grammar_id AND g.publication_state='published' JOIN lesson_units l ON l.id=li.lesson_id AND l.language=g.language\n+ GROUP BY li.lesson_id,g.id,g.level\n+), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 0 ELSE 1 END,source_order,content_id) rn FROM linked)\n+SELECT lesson_id,'grammar',content_id,CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 'required' ELSE 'support' END,rn,CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 1 ELSE 0 END FROM ranked WHERE rn<=3;\n\n-- Internal exam recommendations reuse lessons whose canonical items already carry the selected alignment.\nINSERT INTO lesson_exam_recommendations(framework_id,target,lesson_id,relevance)\nWITH overlap AS (\n+ SELECT a.framework_id,a.target,li.lesson_id,COUNT(*) hits FROM v2_content_alignments a JOIN lesson_items li ON (li.content_type='vocabulary' AND li.content_id=a.vocabulary_id) OR (li.content_type='grammar' AND li.content_id=a.grammar_id) OR (li.content_type='expression' AND li.content_id=a.expression_id)\n+ WHERE a.status='published' GROUP BY a.framework_id,a.target,li.lesson_id\n+), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY framework_id,target ORDER BY hits DESC,lesson_id) rn FROM overlap)\n+SELECT framework_id,target,lesson_id,CASE WHEN hits>=3 THEN 3 WHEN hits=2 THEN 2 ELSE 1 END FROM ranked WHERE rn<=6;\n`;

let output=sql.replace(/^\+/gm,'');
output=output.replace("WITH candidates AS (\n SELECT l.id lesson_id,e.id content_id,e.overall_difficulty,\n ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(e.overall_difficulty-l.stage),CASE u.unit_type WHEN 'dialogue' THEN 0 WHEN 'scenario' THEN 1 ELSE 2 END,e.is_primary DESC,u.sort_order,e.sort_order,e.id) rn\n FROM lesson_units l JOIN v2_sentence_units u ON u.topic_id=l.topic_id AND u.publication_state='published'\n JOIN v2_sentence_expressions e ON e.unit_id=u.id AND e.language=l.language AND e.publication_state='published'\n WHERE e.overall_difficulty<=l.stage+1\n) SELECT lesson_id,'expression',content_id,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 'required' ELSE 'exposure' END,rn,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 1 ELSE 0 END FROM candidates WHERE rn<=4;","WITH lesson_runs AS (\n SELECT l.*,(SELECT COUNT(*) FROM lesson_units p WHERE p.language=l.language AND p.topic_id=l.topic_id AND (p.stage<l.stage OR (p.stage=l.stage AND p.sequence<l.sequence))) topic_run FROM lesson_units l\n), candidates AS (\n SELECT l.id lesson_id,e.id content_id,e.overall_difficulty,l.topic_run,\n ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(e.overall_difficulty-l.stage),CASE u.unit_type WHEN 'dialogue' THEN 0 WHEN 'scenario' THEN 1 ELSE 2 END,e.is_primary DESC,u.sort_order,e.sort_order,e.id) rn\n FROM lesson_runs l JOIN v2_sentence_units u ON u.topic_id=l.topic_id AND u.publication_state='published'\n JOIN v2_sentence_expressions e ON e.unit_id=u.id AND e.language=l.language AND e.publication_state='published'\n WHERE e.overall_difficulty<=l.stage+1\n) SELECT lesson_id,'expression',content_id,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 'required' ELSE 'exposure' END,rn-topic_run*4,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 1 ELSE 0 END FROM candidates WHERE rn BETWEEN topic_run*4+1 AND topic_run*4+4;");
fs.writeFileSync('migrations-35d/0017_lessons.sql',output);
console.log(`Generated ${rows.length} lessons in migrations-35d/0017_lessons.sql`);
