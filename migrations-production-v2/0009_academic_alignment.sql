-- Editorial reference metadata only. No curriculum or learner records are changed.
CREATE TABLE v2_alignment_frameworks (
 id TEXT PRIMARY KEY CHECK(id IN ('IELTS','JLPT')), language TEXT NOT NULL CHECK(language IN ('en','ja')),
 title_zh TEXT NOT NULL, notice_zh TEXT NOT NULL, UNIQUE(id,language),
 CHECK((id='IELTS' AND language='en') OR (id='JLPT' AND language='ja'))
);
CREATE TABLE v2_alignment_targets (
 framework_id TEXT NOT NULL REFERENCES v2_alignment_frameworks(id), target TEXT NOT NULL,
 sort_order INTEGER NOT NULL, PRIMARY KEY(framework_id,target)
);
CREATE TABLE v2_content_alignments (
 id TEXT PRIMARY KEY, framework_id TEXT NOT NULL, target TEXT NOT NULL, language TEXT NOT NULL,
 vocabulary_id TEXT, grammar_id TEXT, expression_id TEXT,
 relevance_zh TEXT NOT NULL, tags_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(tags_json) AND json_type(tags_json)='array'),
 status TEXT NOT NULL CHECK(status IN ('draft','reviewed','verified')), basis_zh TEXT NOT NULL,
 source_type TEXT NOT NULL, source_title TEXT NOT NULL, source_reference TEXT,
 editorial_note_zh TEXT NOT NULL, last_reviewed_at TEXT,
 FOREIGN KEY(framework_id,language) REFERENCES v2_alignment_frameworks(id,language),
 FOREIGN KEY(framework_id,target) REFERENCES v2_alignment_targets(framework_id,target),
 FOREIGN KEY(vocabulary_id,language) REFERENCES v2_vocabulary_items(id,language),
 FOREIGN KEY(grammar_id,language) REFERENCES v2_grammar_points(id,language),
 FOREIGN KEY(expression_id,language) REFERENCES v2_sentence_expressions(id,language),
 CHECK((vocabulary_id IS NOT NULL)+(grammar_id IS NOT NULL)+(expression_id IS NOT NULL)=1),
 CHECK(status='draft' OR last_reviewed_at IS NOT NULL)
);
CREATE UNIQUE INDEX v2_alignment_identity ON v2_content_alignments(framework_id,target,ifnull(vocabulary_id,''),ifnull(grammar_id,''),ifnull(expression_id,''));
CREATE INDEX v2_alignment_browse ON v2_content_alignments(framework_id,target,language);
CREATE INDEX v2_alignment_vocabulary ON v2_content_alignments(vocabulary_id);
CREATE INDEX v2_alignment_grammar ON v2_content_alignments(grammar_id);
CREATE INDEX v2_alignment_expression ON v2_content_alignments(expression_id);
INSERT INTO v2_alignment_frameworks VALUES ('IELTS','en','IELTS 目标学习','Band 分组是课程参考，不代表 IELTS 官方逐词分类或成绩保证。'),('JLPT','ja','JLPT 目标学习','N 级分组是课程参考，不代表 JLPT 官方完整词汇或语法清单。');
INSERT INTO v2_alignment_targets VALUES ('IELTS','5.0',0),('IELTS','5.5',1),('IELTS','6.0',2),('IELTS','6.5',3),('IELTS','7.0+',4),('JLPT','N5',0),('JLPT','N4',1),('JLPT','N3',2),('JLPT','N2',3),('JLPT','N1',4);
INSERT INTO v2_content_alignments(id,framework_id,target,language,vocabulary_id,grammar_id,expression_id,relevance_zh,tags_json,status,basis_zh,source_type,source_title,editorial_note_zh) VALUES
 ('ielts-expect','IELTS','6.5','en','en-expect',NULL,NULL,'区分预测与要求，练习准确表达观点。','["Speaking","Vocabulary"]','draft','按语义区分和口语任务用途选择的展示样本。','editorial_demo','言间课程参考样本','仅演示目标课程组织方式，尚未经过考试对齐审校。'),
 ('ielts-may','IELTS','6.5','en',NULL,'en-may',NULL,'用保留语气表达不确定性。','["Writing","Hedging"]','draft','用于解释不确定观点的基础结构。','editorial_demo','言间课程参考样本','不是该分数独有语法，也不表示掌握后可达到目标分数。'),
 ('ielts-plan','IELTS','5.5','en',NULL,NULL,'changed-plan-en','练习叙述过去计划与变化，可用于口语经历说明。','["Speaking","Narrative"]','draft','从现有生活表达中选取叙述用途。','editorial_demo','言间课程参考样本','沿用现有代表表达，不作为完整学术写作课程。'),
 ('ielts-rain','IELTS','6.5','en',NULL,NULL,'rain-en','练习用 may 保留判断；可作为观点表达的基础。','["Speaking","Hedging"]','draft','以简短自然句展示语气功能。','editorial_demo','言间课程参考样本','基础用例不是完整考试题目。'),
 ('jlpt-yotei','JLPT','N4','ja','ja-yotei',NULL,NULL,'用于说明日常安排。','["词汇","日常安排"]','draft','按常见学习主题选取的展示样本。','editorial_demo','言间课程参考样本','N4 为待审课程参考，不代表官方词表。'),
 ('jlpt-teiru','JLPT','N4','ja',NULL,'ja-te-iru',NULL,'理解状态及尚未发生的表达。','["语法","状态"]','draft','按て形接续与状态理解选取的展示样本。','editorial_demo','言间课程参考样本','内部 Grammar Level 3 保持不变；与 N4 不存在换算。'),
 ('jlpt-eaten','JLPT','N4','ja',NULL,NULL,'not-eaten-ja','在真实用法中理解まだ和否定形式。','["用法","日常交流"]','draft','现有双语语义单元的日语表达。','editorial_demo','言间课程参考样本','只对齐日语表达，不给同单元英语添加 JLPT 标签。');
