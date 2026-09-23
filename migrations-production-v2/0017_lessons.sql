-- Phase 3.5D: additive, canonical-ID-only lesson composition.
PRAGMA foreign_keys=ON;
CREATE TABLE lesson_units (
 id TEXT PRIMARY KEY, language TEXT NOT NULL CHECK(language IN ('en','ja')), stage INTEGER NOT NULL CHECK(stage BETWEEN 1 AND 6),
 topic_id TEXT NOT NULL REFERENCES v2_topics(id), title TEXT NOT NULL, objective TEXT NOT NULL, sequence INTEGER NOT NULL CHECK(sequence BETWEEN 1 AND 9),
 status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','archived')), estimated_minutes INTEGER NOT NULL DEFAULT 15 CHECK(estimated_minutes BETWEEN 10 AND 20),
 UNIQUE(language,stage,sequence)
);
CREATE INDEX lesson_path_browse ON lesson_units(language,status,stage,sequence);
CREATE TABLE lesson_prerequisites (
 lesson_id TEXT NOT NULL REFERENCES lesson_units(id), prerequisite_lesson_id TEXT NOT NULL REFERENCES lesson_units(id),
 PRIMARY KEY(lesson_id,prerequisite_lesson_id), CHECK(lesson_id<>prerequisite_lesson_id)
);
CREATE TABLE lesson_items (
 lesson_id TEXT NOT NULL REFERENCES lesson_units(id), content_type TEXT NOT NULL CHECK(content_type IN ('vocabulary','grammar','expression')), content_id TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('required','support','exposure')), sequence INTEGER NOT NULL, required INTEGER NOT NULL CHECK(required IN (0,1)),
 PRIMARY KEY(lesson_id,content_type,content_id), CHECK((role='required' AND required=1) OR (role<>'required' AND required=0))
);
CREATE INDEX lesson_items_resolve ON lesson_items(lesson_id,content_type,sequence);
CREATE INDEX lesson_items_coverage ON lesson_items(content_type,content_id);
CREATE TABLE lesson_exam_recommendations (
 framework_id TEXT NOT NULL REFERENCES v2_alignment_frameworks(id), target TEXT NOT NULL, lesson_id TEXT NOT NULL REFERENCES lesson_units(id), relevance INTEGER NOT NULL CHECK(relevance BETWEEN 1 AND 3),
 PRIMARY KEY(framework_id,target,lesson_id)
);
CREATE INDEX lesson_exam_lookup ON lesson_exam_recommendations(framework_id,target,relevance DESC,lesson_id);
INSERT INTO lesson_units(id,language,stage,topic_id,title,objective,sequence,status) VALUES
('en-s1-l1','en','1','chat','打招呼并开始简单交谈','能用基本问候开启并结束一段简短对话。','1','published'),
('en-s1-l2','en','1','social','介绍自己和身边的人','能说明姓名、身份以及与他人的基本关系。','2','published'),
('en-s1-l3','en','1','food','说出想吃喝的东西','能表达基本饮食需要并回应简单选择。','3','published'),
('en-s1-l4','en','1','help','提出一个简单请求','能用清楚、礼貌的方式请别人提供帮助。','4','published'),
('en-s2-l1','en','2','time','约定见面的时间','能询问时间并确认一项简单安排。','1','published'),
('en-s2-l2','en','2','shopping','询问价格并做选择','能在购物时问价、比较并说明选择。','2','published'),
('en-s2-l3','en','2','travel','问路并确认方向','能询问地点、理解并确认基本路线。','3','published'),
('en-s2-l4','en','2','home','描述日常生活安排','能谈论家中活动和每天的基本习惯。','4','published'),
('en-s3-l1','en','3','plans','讲述一次过去的经历','能按基本时间顺序说明已经发生的事情。','1','published'),
('en-s3-l2','en','3','health','描述今天的身体状态','能说出常见不适并回应基本健康建议。','2','published'),
('en-s3-l3','en','3','weather','根据天气调整计划','能描述天气并说明它对安排的影响。','3','published'),
('en-s3-l4','en','3','school','说明学习或工作任务','能谈论正在做的任务、期限和基本要求。','4','published'),
('en-s4-l1','en','4','feelings','解释感受和原因','能较具体地表达情绪并给出原因。','1','published'),
('en-s4-l2','en','4','social','协调一次社交安排','能提出建议、回应邀请并协商细节。','2','published'),
('en-s4-l3','en','4','food','在餐厅完成点餐','能询问菜品、提出饮食要求并结账。','3','published'),
('en-s4-l4','en','4','hobbies','分享兴趣与偏好','能比较兴趣、说明偏好并继续相关交流。','4','published'),
('en-s5-l1','en','5','school','汇报学习或工作进展','能组织进展、困难和下一步行动。','1','published'),
('en-s5-l2','en','5','travel','处理行程变化','能解释延误或变更并协商替代安排。','2','published'),
('en-s5-l3','en','5','help','清楚说明问题并寻求解决','能提供足够背景并提出有针对性的请求。','3','published'),
('en-s5-l4','en','5','plans','讨论选择与未来安排','能比较方案、表达条件并说明打算。','4','published'),
('en-s6-l1','en','6','school','陈述观点并用依据支持','能在较正式讨论中提出主张和理由。','1','published'),
('en-s6-l2','en','6','chat','礼貌表达不同意见','能承认对方观点并作出有分寸的回应。','2','published'),
('en-s6-l3','en','6','social','提出正式而委婉的请求','能根据关系和场合调整请求语气。','3','published'),
('en-s6-l4','en','6','plans','回顾经历并展望目标','能连接过去经验、当前判断与未来目标。','4','published'),
('ja-s1-l1','ja','1','chat','基本のあいさつを交わす','能用日语基本寒暄自然地开始和结束交流。','1','published'),
('ja-s1-l2','ja','1','social','です・ますで自己紹介する','能用敬体介绍姓名、身份和身边的人。','2','published'),
('ja-s1-l3','ja','1','food','食べたい物を伝える','能说出基本饮食需要并回应简单选择。','3','published'),
('ja-s1-l4','ja','1','help','短いお願いをする','能用日语常见礼貌形式提出简单请求。','4','published'),
('ja-s2-l1','ja','2','travel','助詞を使って行き先を伝える','能用基本助词说明目的地、方向和移动。','1','published'),
('ja-s2-l2','ja','2','home','ある・いるで身の回りを話す','能区分有生命与无生命事物并说明所在。','2','published'),
('ja-s2-l3','ja','2','time','時間を聞いて約束する','能询问时间、邀请对方并确认约定。','3','published'),
('ja-s2-l4','ja','2','shopping','数と量を確認して買う','能在购物时询问数量、价格并做出选择。','4','published'),
('ja-s3-l1','ja','3','chat','ている形で今の状態を伝える','能说明正在进行的动作和持续状态。','1','published'),
('ja-s3-l2','ja','3','plans','したことを順に話す','能用适当的过去表达讲述经历。','2','published'),
('ja-s3-l3','ja','3','help','てくださいで具体的に頼む','能提出明确请求并根据语境调整礼貌程度。','3','published'),
('ja-s3-l4','ja','3','health','体調と症状を説明する','能描述身体状态、症状及持续情况。','4','published'),
('ja-s4-l1','ja','4','weather','理由を添えて予定を変える','能说明天气情况、原因及计划变化。','1','published'),
('ja-s4-l2','ja','4','plans','つもり・予定で意向を伝える','能区分意向与既定安排并说明未来计划。','2','published'),
('ja-s4-l3','ja','4','social','許可を求め、断りに応じる','能询问许可并自然回应同意或拒绝。','3','published'),
('ja-s4-l4','ja','4','hobbies','好みを比べて会話を続ける','能比较爱好、说明偏好并追问细节。','4','published'),
('ja-s5-l1','ja','5','school','場面に合う敬語で報告する','能在学习或工作场景中得体地汇报进展。','1','published'),
('ja-s5-l2','ja','5','help','遠回しに配慮して依頼する','能照顾对方感受，以较委婉方式求助。','2','published'),
('ja-s5-l3','ja','5','travel','条件を示して変更を相談する','能用条件表达协商行程变化和替代方案。','3','published'),
('ja-s5-l4','ja','5','feelings','気持ちの度合いと背景を話す','能细致表达感受强度及其背景。','4','published'),
('ja-s6-l1','ja','6','school','根拠を整理して説明する','能以较正式的日语组织观点、依据和结论。','1','published'),
('ja-s6-l2','ja','6','chat','立場を和らげて意見を述べる','能使用缓和表达礼貌陈述不同立场。','2','published'),
('ja-s6-l3','ja','6','plans','経験を振り返り判断を伝える','能连接经历、反思和当前判断。','3','published'),
('ja-s6-l4','ja','6','social','関係に合わせて言い方を選ぶ','能依据人际关系和场合选择恰当语域。','4','published');

-- A path is sequential within each language. This does not imply completion or locking.
INSERT INTO lesson_prerequisites(lesson_id,prerequisite_lesson_id)
SELECT cur.id,prev.id FROM lesson_units cur JOIN lesson_units prev ON prev.language=cur.language AND ((prev.stage=cur.stage AND prev.sequence=cur.sequence-1) OR (cur.sequence=1 AND prev.stage=cur.stage-1 AND prev.sequence=4));

-- Select four bounded, topic-coherent canonical expressions per lesson.
INSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH lesson_runs AS (
 SELECT l.*,(SELECT COUNT(*) FROM lesson_units p WHERE p.language=l.language AND p.topic_id=l.topic_id AND (p.stage<l.stage OR (p.stage=l.stage AND p.sequence<l.sequence))) topic_run FROM lesson_units l
), candidates AS (
 SELECT l.id lesson_id,e.id content_id,e.overall_difficulty,l.topic_run,
 ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(e.overall_difficulty-l.stage),CASE u.unit_type WHEN 'dialogue' THEN 0 WHEN 'scenario' THEN 1 ELSE 2 END,e.is_primary DESC,u.sort_order,e.sort_order,e.id) rn
 FROM lesson_runs l JOIN v2_sentence_units u ON u.topic_id=l.topic_id AND u.publication_state='published'
 JOIN v2_sentence_expressions e ON e.unit_id=u.id AND e.language=l.language AND e.publication_state='published'
 WHERE e.overall_difficulty<=l.stage+1
) SELECT lesson_id,'expression',content_id,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 'required' ELSE 'exposure' END,rn-topic_run*4,CASE WHEN overall_difficulty<=CAST(substr(lesson_id,5,1) AS INTEGER) THEN 1 ELSE 0 END FROM candidates WHERE rn BETWEEN topic_run*4+1 AND topic_run*4+4;

-- Required vocabulary comes first from words actually used by the lesson expressions.
INSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH linked AS (
 SELECT li.lesson_id,v.id content_id,v.stage,MAX(svl.importance) importance,MIN(svl.sort_order) source_order
 FROM lesson_items li JOIN v2_sentence_vocabulary_links svl ON li.content_type='expression' AND svl.expression_id=li.content_id
 JOIN v2_vocabulary_items v ON v.id=svl.item_id AND v.publication_state='published'
 JOIN lesson_units l ON l.id=li.lesson_id AND l.language=v.language GROUP BY li.lesson_id,v.id,v.stage
), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 0 ELSE 1 END,importance DESC,source_order,content_id) rn FROM linked)
SELECT lesson_id,'vocabulary',content_id,CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 'required' ELSE 'support' END,rn,CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 1 ELSE 0 END FROM ranked WHERE rn<=8;

-- Fill each lesson to 5-8 vocabulary items with same-topic, current-or-earlier canonical vocabulary.
INSERT OR IGNORE INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH candidates AS (
 SELECT l.id lesson_id,v.id content_id,ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(v.stage-l.stage),v.sort_order,v.id) rn
 FROM lesson_units l JOIN v2_vocabulary_topics vt ON vt.topic_id=l.topic_id JOIN v2_vocabulary_items v ON v.id=vt.item_id AND v.language=l.language AND v.publication_state='published' AND v.stage<=l.stage
), slots AS (SELECT l.id lesson_id,MAX(0,5-COUNT(li.content_id)) needed FROM lesson_units l LEFT JOIN lesson_items li ON li.lesson_id=l.id AND li.content_type='vocabulary' GROUP BY l.id)
SELECT c.lesson_id,'vocabulary',c.content_id,'required',100+c.rn,1 FROM candidates c JOIN slots s ON s.lesson_id=c.lesson_id WHERE c.rn<=s.needed+8;

-- Keep at most eight vocabulary items after the fill (expression-linked items retain priority).
DELETE FROM lesson_items WHERE content_type='vocabulary' AND rowid IN (SELECT rowid FROM (SELECT rowid,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY sequence,content_id) rn FROM lesson_items WHERE content_type='vocabulary') WHERE rn>8);

-- Grammar must occur in a selected expression. Advanced structures stay support/exposure, never required.
INSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH linked AS (
 SELECT li.lesson_id,g.id content_id,g.level,MIN(sgl.sort_order) source_order
 FROM lesson_items li JOIN v2_sentence_grammar_links sgl ON li.content_type='expression' AND sgl.expression_id=li.content_id
 JOIN v2_grammar_points g ON g.id=sgl.grammar_id AND g.publication_state='published' JOIN lesson_units l ON l.id=li.lesson_id AND l.language=g.language
 GROUP BY li.lesson_id,g.id,g.level
), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 0 ELSE 1 END,source_order,content_id) rn FROM linked)
SELECT lesson_id,'grammar',content_id,CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 'required' ELSE 'support' END,rn,CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 1 ELSE 0 END FROM ranked WHERE rn<=3;

-- Internal exam recommendations reuse lessons whose canonical items already carry the selected alignment.
INSERT INTO lesson_exam_recommendations(framework_id,target,lesson_id,relevance)
WITH overlap AS (
 SELECT a.framework_id,a.target,li.lesson_id,COUNT(*) hits FROM v2_content_alignments a JOIN lesson_items li ON (li.content_type='vocabulary' AND li.content_id=a.vocabulary_id) OR (li.content_type='grammar' AND li.content_id=a.grammar_id) OR (li.content_type='expression' AND li.content_id=a.expression_id)
 WHERE a.status='published' GROUP BY a.framework_id,a.target,li.lesson_id
), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY framework_id,target ORDER BY hits DESC,lesson_id) rn FROM overlap)
SELECT framework_id,target,lesson_id,CASE WHEN hits>=3 THEN 3 WHEN hits=2 THEN 2 ELSE 1 END FROM ranked WHERE rn<=6;
