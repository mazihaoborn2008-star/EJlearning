-- Content only. Learner state remains in the browser.
PRAGMA foreign_keys = ON;
CREATE TABLE topics (
  id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '', icon TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL, published INTEGER NOT NULL DEFAULT 1 CHECK(published IN (0,1))
);
CREATE TABLE concepts (
  id INTEGER PRIMARY KEY, slug TEXT NOT NULL UNIQUE,
  topic_id TEXT NOT NULL REFERENCES topics(id), zh TEXT NOT NULL,
  sort_order INTEGER NOT NULL, published INTEGER NOT NULL DEFAULT 1 CHECK(published IN (0,1))
);
CREATE INDEX concepts_by_topic ON concepts(topic_id, published, sort_order);
CREATE TABLE grammar_points (
  id INTEGER PRIMARY KEY, language TEXT NOT NULL CHECK(language IN ('en','ja')),
  title TEXT NOT NULL, explanation TEXT NOT NULL, example TEXT NOT NULL,
  UNIQUE(id, language)
);
CREATE TABLE expressions (
  id INTEGER PRIMARY KEY, concept_id INTEGER NOT NULL REFERENCES concepts(id),
  language TEXT NOT NULL CHECK(language IN ('en','ja')), text TEXT NOT NULL,
  ipa TEXT, hiragana TEXT, difficulty INTEGER NOT NULL CHECK(difficulty BETWEEN 1 AND 6),
  register TEXT, sort_order INTEGER NOT NULL DEFAULT 0,
  is_primary INTEGER NOT NULL DEFAULT 1 CHECK(is_primary IN (0,1)),
  grammar_point_id INTEGER NOT NULL,
  FOREIGN KEY(grammar_point_id, language) REFERENCES grammar_points(id, language),
  CHECK((language='en' AND ipa IS NOT NULL) OR (language='ja' AND hiragana IS NOT NULL)),
  UNIQUE(id, language)
);
CREATE UNIQUE INDEX one_primary_expression ON expressions(concept_id, language) WHERE is_primary=1;
CREATE INDEX expressions_by_concept ON expressions(concept_id, language, sort_order);
CREATE TABLE expression_chunks (
  id INTEGER PRIMARY KEY, expression_id INTEGER NOT NULL,
  language TEXT NOT NULL CHECK(language IN ('en','ja')), grammar_point_id INTEGER,
  text TEXT NOT NULL,
  readings_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(readings_json)),
  sort_order INTEGER NOT NULL,
  FOREIGN KEY(expression_id, language) REFERENCES expressions(id, language),
  FOREIGN KEY(grammar_point_id, language) REFERENCES grammar_points(id, language),
  UNIQUE(expression_id, sort_order)
);
CREATE TABLE expression_readings (
  expression_id INTEGER NOT NULL REFERENCES expressions(id), sort_order INTEGER NOT NULL,
  text TEXT NOT NULL, reading TEXT,
  PRIMARY KEY(expression_id, sort_order)
);
CREATE TABLE comparisons (
  concept_id INTEGER PRIMARY KEY REFERENCES concepts(id), explanation TEXT NOT NULL
);
CREATE TABLE placement_questions (
  id TEXT PRIMARY KEY, language TEXT NOT NULL CHECK(language IN ('en','ja')),
  type TEXT NOT NULL, prompt TEXT NOT NULL, target_text TEXT,
  difficulty INTEGER NOT NULL CHECK(difficulty BETWEEN 1 AND 6), explanation TEXT,
  sort_order INTEGER NOT NULL, active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1))
);
CREATE INDEX placement_by_language ON placement_questions(language, active, sort_order);
CREATE TABLE placement_options (
  question_id TEXT NOT NULL REFERENCES placement_questions(id),
  option_id INTEGER NOT NULL CHECK(option_id>=0), text TEXT NOT NULL,
  PRIMARY KEY(question_id, option_id)
);
-- Separate answer keys simplify auditing public question queries.
CREATE TABLE placement_answer_keys (
  question_id TEXT PRIMARY KEY REFERENCES placement_questions(id), correct_option INTEGER NOT NULL,
  FOREIGN KEY(question_id, correct_option) REFERENCES placement_options(question_id, option_id)
);
