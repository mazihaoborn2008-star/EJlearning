-- The Japanese appearance example was reused from 3.5A. Its source crosswalk also needs the independently selected grammar point.
INSERT INTO v2_legacy_crosswalk(id,concept_id,legacy_expression_id,language,grammar_id,role,note_zh)
SELECT 'review-pattern-104-ja',104,id,'ja','ja-sou','primary','根据眼前天空迹象使用样态そう；复用已有具体雨例，不映射到传闻そう。'
FROM expressions WHERE concept_id=104 AND language='ja' AND is_primary=1;
