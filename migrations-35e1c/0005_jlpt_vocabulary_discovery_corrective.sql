-- Phase 3.5E.1C staging acceptance corrective.
-- Additive curriculum discovery alignment; not an official JLPT vocabulary claim.
INSERT INTO v2_content_alignments(
  id,framework_id,target,language,vocabulary_id,grammar_id,expression_id,
  relevance_zh,tags_json,status,basis_zh,source_type,source_title,source_reference,
  editorial_note_zh,last_reviewed_at
) VALUES(
  '35e1c-align-jlpt-n4-size','JLPT','N4','ja','ja-c-395',NULL,NULL,
  '用于购物与住宿场景中询问、比较并确认尺寸。',
  '["買い物","実用表現","カタカナ語"]','reviewed',
  '依据 3.5E P0/P1 实际交流任务、Stage 与搭配价值编排；属于课程复习推荐，不代表官方 JLPT 词表。',
  'curriculum_editorial','Phase 3.5E.1C curriculum review',NULL,
  '已完成 reading、语义、Stage 与交际任务审校；非官方 JLPT 词表。',
  '2026-09-11T04:00:00Z'
);
