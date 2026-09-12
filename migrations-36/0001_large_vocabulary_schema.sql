-- Phase 3.5E.2: scalable imported vocabulary metadata and course-estimate pools.
PRAGMA foreign_keys=ON;
CREATE TABLE v2_vocabulary_sources (
id TEXT PRIMARY KEY, title TEXT NOT NULL, url TEXT NOT NULL, license TEXT NOT NULL, attribution TEXT NOT NULL, source_version TEXT NOT NULL, source_sha256 TEXT, modifications TEXT NOT NULL, imported_at TEXT NOT NULL
);
CREATE TABLE v2_vocabulary_import_metadata (
item_id TEXT PRIMARY KEY REFERENCES v2_vocabulary_items(id), source_id TEXT NOT NULL REFERENCES v2_vocabulary_sources(id), source_key TEXT NOT NULL, source_rank INTEGER, frequency_bnc INTEGER, frequency_modern INTEGER, inflections_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(inflections_json)), estimate_note TEXT NOT NULL, UNIQUE(source_id,source_key)
);
CREATE INDEX v2_vocab_import_source_rank ON v2_vocabulary_import_metadata(source_id,source_rank,item_id);
CREATE TABLE v2_vocabulary_course_ranks (
framework_id TEXT NOT NULL REFERENCES v2_alignment_frameworks(id), item_id TEXT NOT NULL REFERENCES v2_vocabulary_items(id), language TEXT NOT NULL, course_rank INTEGER NOT NULL CHECK(course_rank>0), estimated_target TEXT, editorial_boost INTEGER NOT NULL DEFAULT 0 CHECK(editorial_boost IN (0,1)), basis TEXT NOT NULL, PRIMARY KEY(framework_id,item_id), FOREIGN KEY(framework_id,language) REFERENCES v2_alignment_frameworks(id,language), FOREIGN KEY(framework_id,estimated_target) REFERENCES v2_alignment_targets(framework_id,target)
);
CREATE INDEX v2_vocab_course_target ON v2_vocabulary_course_ranks(framework_id,language,estimated_target,course_rank,item_id);
CREATE INDEX v2_vocab_course_rank ON v2_vocabulary_course_ranks(framework_id,language,course_rank,item_id);
CREATE TABLE v2_vocabulary_course_targets (
framework_id TEXT NOT NULL, target TEXT NOT NULL, language TEXT NOT NULL, pool_mode TEXT NOT NULL CHECK(pool_mode IN ('cumulative','level')), pool_size INTEGER NOT NULL CHECK(pool_size>0), notice_zh TEXT NOT NULL, PRIMARY KEY(framework_id,target), FOREIGN KEY(framework_id,target) REFERENCES v2_alignment_targets(framework_id,target), FOREIGN KEY(framework_id,language) REFERENCES v2_alignment_frameworks(id,language)
);
INSERT INTO v2_vocabulary_sources VALUES
('ecdict','ECDICT','https://github.com/skywind3000/ECDICT','MIT','ECDICT © Linwei / skywind3000; MIT License.','bc015ed2e24a7abef49fc6dbbb7fe32c1dadaf8b','1a6947e04785db63613a92e14903cdae7954f7e84860b10e68e5c7cbb3f9c3cf','Selected high-value lowercase lemmas; removed proper names, malformed/noisy rows, and rows explicitly mapped to another lemma; concise Chinese meanings derived from source translations.',datetime('now')),
('jld-jlpt','Japanese Language Data — Waller JLPT classifications','https://github.com/jkindrix/japanese-language-data','CC BY-SA 4.0','JLPT estimates adapted from Jonathan Waller; redistribution by Japanese Language Data. Community/course estimates, not official JLPT lists.','04014e06019fc9d4af76e6dbb64ec709fe863c4d','1dc9e9c168b5cb2754efd766b3d4c69f6eb2d51cb90bcade011b3e4f0fd1ae83','Deduplicated by normalized headword; joined to JMdict identifiers for reading and POS.',datetime('now')),
('tomoshi-zh','Tomoshi Dictionary Open Data Layer','https://github.com/tomoshi-app/tomoshi-dict-data','CC BY-SA 4.0','JMdict © EDRDG; derived Simplified Chinese glosses © Tomoshi (Y1Z).','v2026-09-02','7153dfd7a8e42e2d920308370eac90cf9f2e4b4cfe67fb9a86e9aa1c89494073','Used concise Simplified Chinese glosses and JMdict-derived POS; no examples imported.',datetime('now'));
INSERT INTO v2_vocabulary_course_targets VALUES
('IELTS','5.0','en','cumulative',3000,'言间内部课程目标：累计高价值词汇约 3,000；不是 IELTS 官方逐词表。'),
('IELTS','5.5','en','cumulative',4000,'言间内部课程目标：累计高价值词汇约 4,000；不是 IELTS 官方逐词表。'),
('IELTS','6.0','en','cumulative',5500,'言间内部课程目标：累计高价值词汇约 5,500；不是 IELTS 官方逐词表。'),
('IELTS','6.5','en','cumulative',7000,'言间内部课程目标：累计高价值词汇约 7,000；不是 IELTS 官方逐词表。'),
('IELTS','7.0+','en','cumulative',10000,'言间内部课程目标：累计高价值词汇约 10,000；不是 IELTS 官方逐词表。'),
('JLPT','N5','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),
('JLPT','N4','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),
('JLPT','N3','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),
('JLPT','N2','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。'),
('JLPT','N1','ja','level',1,'基于社区资料的课程估计；JLPT 官方不发布完整逐词表。');
UPDATE v2_alignment_frameworks SET notice_zh='Band 词汇池是言间按词频、通用性与学术用途建立的累计课程目标，不是 IELTS 官方逐词表，也不构成成绩保证。' WHERE id='IELTS';
UPDATE v2_alignment_frameworks SET notice_zh='N5–N1 词汇分组来自社区资料与言间课程估计；JLPT 官方不发布完整逐词表。' WHERE id='JLPT';
