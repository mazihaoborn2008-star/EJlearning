-- One semi-academic English example to demonstrate academic usage and live V2 links.
INSERT INTO v2_sentence_units(id,anchor_zh,topic_id,unit_type,context_zh,comparison_zh,publication_state,sort_order)
 VALUES('academic-approach','这个方法可能有帮助，但我预计会有实际困难。','plans','sentence','在讨论方案时，先承认可能的好处，再说明保留意见。','当前只有英语代表表达；不为展示而强行补配日语。','published',20);
INSERT INTO v2_sentence_expressions(id,unit_id,language,text,vocabulary_difficulty,grammar_difficulty,overall_difficulty,difficulty_note_zh,publication_state)
 VALUES('academic-approach-en','academic-approach','en','This approach might help, but I expect practical difficulties.',4,3,4,'approach 与 practical difficulties 增加词汇负担；might 保留判断，后半句说明预测。','published');
INSERT INTO v2_sentence_vocabulary_links(id,expression_id,language,item_id,sense_id,displayed_form,importance,is_new_target,sort_order) VALUES
 ('vl-academic-help','academic-approach-en','en','en-help','en-help-1','help',2,0,0),
 ('vl-academic-expect','academic-approach-en','en','en-expect','en-expect-1','expect',3,1,1);
INSERT INTO v2_sentence_grammar_links(id,expression_id,language,grammar_id,displayed_form,note_zh,sort_order) VALUES
 ('gl-academic-might','academic-approach-en','en','en-might','might help','保留判断，不承诺一定有效。',0),
 ('gl-academic-present','academic-approach-en','en','en-simple-present','I expect practical difficulties','用一般现在时表达当前的预测判断。',1);
INSERT INTO v2_content_alignments(id,framework_id,target,language,expression_id,relevance_zh,tags_json,status,basis_zh,source_type,source_title,editorial_note_zh)
 VALUES('ielts-approach','IELTS','6.5','en','academic-approach-en','先承认可能的好处，再表达限制；适合讨论方案时练习有分寸的观点。','["Speaking","Writing","Hedging","Opinion"]','draft','以半学术讨论语境展示保留语气与预测。','editorial_demo','言间课程参考样本','仅为待审课程组织示例，不是官方 Band 分类；没有自动评分或考试模拟。');
