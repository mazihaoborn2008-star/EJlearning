-- Ensure repeated topics advance to a different canonical expression set.
DELETE FROM lesson_items WHERE lesson_id IN ('en-s6-l3','en-s6-l4','ja-s6-l4');

INSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH lesson_runs AS (
 SELECT l.*,(SELECT COUNT(*) FROM lesson_units p WHERE p.language=l.language AND p.topic_id=l.topic_id AND (p.stage<l.stage OR (p.stage=l.stage AND p.sequence<l.sequence))) topic_run
 FROM lesson_units l WHERE l.id IN ('en-s6-l3','en-s6-l4','ja-s6-l4')
), candidates AS (
 SELECT l.id lesson_id,e.id content_id,e.overall_difficulty,l.stage,l.topic_run,
 ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(e.overall_difficulty-l.stage),CASE u.unit_type WHEN 'dialogue' THEN 0 WHEN 'scenario' THEN 1 ELSE 2 END,e.is_primary DESC,u.sort_order,e.sort_order,e.id) rn
 FROM lesson_runs l JOIN v2_sentence_units u ON u.topic_id=l.topic_id AND u.publication_state='published'
 JOIN v2_sentence_expressions e ON e.unit_id=u.id AND e.language=l.language AND e.publication_state='published'
 WHERE e.overall_difficulty<=l.stage+1
)
SELECT lesson_id,'expression',content_id,CASE WHEN overall_difficulty<=stage THEN 'required' ELSE 'exposure' END,rn-topic_run*4,CASE WHEN overall_difficulty<=stage THEN 1 ELSE 0 END
FROM candidates WHERE rn BETWEEN topic_run*4+1 AND topic_run*4+4;

INSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH linked AS (
 SELECT li.lesson_id,v.id content_id,v.stage,MAX(svl.importance) importance,MIN(svl.sort_order) source_order
 FROM lesson_items li JOIN v2_sentence_vocabulary_links svl ON li.content_type='expression' AND svl.expression_id=li.content_id
 JOIN v2_vocabulary_items v ON v.id=svl.item_id AND v.publication_state='published'
 JOIN lesson_units l ON l.id=li.lesson_id AND l.language=v.language
 WHERE li.lesson_id IN ('en-s6-l3','en-s6-l4','ja-s6-l4') GROUP BY li.lesson_id,v.id,v.stage
), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 0 ELSE 1 END,importance DESC,source_order,content_id) rn FROM linked)
SELECT lesson_id,'vocabulary',content_id,CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 'required' ELSE 'support' END,rn,CASE WHEN stage<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 1 ELSE 0 END FROM ranked WHERE rn<=8;

INSERT OR IGNORE INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH candidates AS (
 SELECT l.id lesson_id,v.id content_id,ROW_NUMBER() OVER(PARTITION BY l.id ORDER BY abs(v.stage-l.stage),v.sort_order,v.id) rn
 FROM lesson_units l JOIN v2_vocabulary_topics vt ON vt.topic_id=l.topic_id JOIN v2_vocabulary_items v ON v.id=vt.item_id AND v.language=l.language AND v.publication_state='published' AND v.stage<=l.stage
 WHERE l.id IN ('en-s6-l3','en-s6-l4','ja-s6-l4')
), slots AS (SELECT l.id lesson_id,MAX(0,5-COUNT(li.content_id)) needed FROM lesson_units l LEFT JOIN lesson_items li ON li.lesson_id=l.id AND li.content_type='vocabulary' WHERE l.id IN ('en-s6-l3','en-s6-l4','ja-s6-l4') GROUP BY l.id)
SELECT c.lesson_id,'vocabulary',c.content_id,'required',100+c.rn,1 FROM candidates c JOIN slots s ON s.lesson_id=c.lesson_id WHERE c.rn<=s.needed+8;

DELETE FROM lesson_items WHERE content_type='vocabulary' AND lesson_id IN ('en-s6-l3','en-s6-l4','ja-s6-l4') AND rowid IN (
 SELECT rowid FROM (SELECT rowid,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY sequence,content_id) rn FROM lesson_items WHERE content_type='vocabulary' AND lesson_id IN ('en-s6-l3','en-s6-l4','ja-s6-l4')) WHERE rn>8
);

INSERT INTO lesson_items(lesson_id,content_type,content_id,role,sequence,required)
WITH linked AS (
 SELECT li.lesson_id,g.id content_id,g.level,MIN(sgl.sort_order) source_order
 FROM lesson_items li JOIN v2_sentence_grammar_links sgl ON li.content_type='expression' AND sgl.expression_id=li.content_id
 JOIN v2_grammar_points g ON g.id=sgl.grammar_id AND g.publication_state='published' JOIN lesson_units l ON l.id=li.lesson_id AND l.language=g.language
 WHERE li.lesson_id IN ('en-s6-l3','en-s6-l4','ja-s6-l4') GROUP BY li.lesson_id,g.id,g.level
), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY lesson_id ORDER BY CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 0 ELSE 1 END,source_order,content_id) rn FROM linked)
SELECT lesson_id,'grammar',content_id,CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 'required' ELSE 'support' END,rn,CASE WHEN level<=(SELECT stage FROM lesson_units WHERE id=lesson_id) THEN 1 ELSE 0 END FROM ranked WHERE rn<=3;

DELETE FROM lesson_exam_recommendations;
INSERT INTO lesson_exam_recommendations(framework_id,target,lesson_id,relevance)
WITH overlap AS (
 SELECT a.framework_id,a.target,li.lesson_id,COUNT(*) hits FROM v2_content_alignments a JOIN lesson_items li ON
 (li.content_type='vocabulary' AND li.content_id=a.vocabulary_id) OR (li.content_type='grammar' AND li.content_id=a.grammar_id) OR (li.content_type='expression' AND li.content_id=a.expression_id)
 GROUP BY a.framework_id,a.target,li.lesson_id
), ranked AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY framework_id,target ORDER BY hits DESC,lesson_id) rn FROM overlap)
SELECT framework_id,target,lesson_id,CASE WHEN hits>=3 THEN 3 WHEN hits=2 THEN 2 ELSE 1 END FROM ranked WHERE rn<=6;
