-- Reuse internal lessons for exam-oriented paths. Alignment review state remains independent.
INSERT OR IGNORE INTO lesson_exam_recommendations(framework_id,target,lesson_id,relevance)
WITH overlap AS (
 SELECT a.framework_id,a.target,li.lesson_id,COUNT(*) hits
 FROM v2_content_alignments a
 JOIN lesson_items li ON
  (li.content_type='vocabulary' AND li.content_id=a.vocabulary_id) OR
  (li.content_type='grammar' AND li.content_id=a.grammar_id) OR
  (li.content_type='expression' AND li.content_id=a.expression_id)
 GROUP BY a.framework_id,a.target,li.lesson_id
), ranked AS (
 SELECT *,ROW_NUMBER() OVER(PARTITION BY framework_id,target ORDER BY hits DESC,lesson_id) rn FROM overlap
)
SELECT framework_id,target,lesson_id,CASE WHEN hits>=3 THEN 3 WHEN hits=2 THEN 2 ELSE 1 END
FROM ranked WHERE rn<=6;
