-- Additive V2 domains. Legacy tables are never altered.
CREATE TABLE v2_vocabulary_items (
 id TEXT PRIMARY KEY, language TEXT NOT NULL CHECK(language IN ('en','ja')),
 lemma TEXT NOT NULL, type TEXT NOT NULL CHECK(type IN ('word','fixed_expression')),
 stage INTEGER NOT NULL CHECK(stage BETWEEN 1 AND 6), ipa TEXT, reading TEXT,
 part_of_speech TEXT NOT NULL, register TEXT NOT NULL DEFAULT 'neutral',
 publication_state TEXT NOT NULL DEFAULT 'draft' CHECK(publication_state IN ('draft','published','archived')),
 sort_order INTEGER NOT NULL DEFAULT 0,
 CHECK((language='en' AND reading IS NULL) OR (language='ja' AND ipa IS NULL)),
 UNIQUE(id,language), UNIQUE(language,lemma,part_of_speech)
);
CREATE INDEX v2_vocab_browse ON v2_vocabulary_items(language,publication_state,stage,sort_order,id);
CREATE TABLE v2_vocabulary_senses (
 id TEXT PRIMARY KEY, item_id TEXT NOT NULL REFERENCES v2_vocabulary_items(id),
 meaning_zh TEXT NOT NULL, usage_zh TEXT NOT NULL DEFAULT '', semantic_label TEXT,
 register_note TEXT, stage_override INTEGER CHECK(stage_override BETWEEN 1 AND 6), override_reason TEXT,
 sort_order INTEGER NOT NULL DEFAULT 0, UNIQUE(id,item_id),
 CHECK(stage_override IS NULL OR length(trim(override_reason))>0 AND override_reason IS NOT NULL)
);
CREATE INDEX v2_senses_item ON v2_vocabulary_senses(item_id,sort_order);
CREATE TABLE v2_vocabulary_examples (
 id TEXT PRIMARY KEY, item_id TEXT NOT NULL REFERENCES v2_vocabulary_items(id), sense_id TEXT,
 kind TEXT NOT NULL CHECK(kind IN ('example','collocation','pattern')), text TEXT NOT NULL,
 translation_zh TEXT NOT NULL, note_zh TEXT, readings_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(readings_json) AND json_type(readings_json)='array'),
 sort_order INTEGER NOT NULL DEFAULT 0,
 FOREIGN KEY(sense_id,item_id) REFERENCES v2_vocabulary_senses(id,item_id)
);
CREATE INDEX v2_vocab_examples_item ON v2_vocabulary_examples(item_id,sort_order);
CREATE TABLE v2_vocabulary_relations (
 source_id TEXT NOT NULL, target_id TEXT NOT NULL, language TEXT NOT NULL,
 type TEXT NOT NULL CHECK(type IN ('synonym','near_synonym','antonym','commonly_confused','related')),
 note_zh TEXT NOT NULL, PRIMARY KEY(source_id,target_id,type), CHECK(source_id<>target_id),
 FOREIGN KEY(source_id,language) REFERENCES v2_vocabulary_items(id,language),
 FOREIGN KEY(target_id,language) REFERENCES v2_vocabulary_items(id,language)
);
CREATE INDEX v2_vocab_relations_target ON v2_vocabulary_relations(target_id);
CREATE TABLE v2_grammar_points (
 id TEXT PRIMARY KEY, language TEXT NOT NULL CHECK(language IN ('en','ja')), slug TEXT NOT NULL,
 title_zh TEXT NOT NULL, form_name TEXT NOT NULL, level INTEGER NOT NULL CHECK(level BETWEEN 1 AND 6),
 core_zh TEXT NOT NULL, purpose_zh TEXT NOT NULL, formula TEXT NOT NULL,
 when_zh TEXT NOT NULL, mistakes_zh TEXT NOT NULL DEFAULT '', nuance_zh TEXT NOT NULL DEFAULT '',
 register TEXT NOT NULL DEFAULT 'neutral', usage_zh TEXT NOT NULL DEFAULT '',
 publication_state TEXT NOT NULL DEFAULT 'draft' CHECK(publication_state IN ('draft','published','archived')),
 sort_order INTEGER NOT NULL DEFAULT 0, UNIQUE(id,language), UNIQUE(language,slug)
);
CREATE INDEX v2_grammar_browse ON v2_grammar_points(language,publication_state,level,sort_order,id);
CREATE TABLE v2_grammar_relations (
 source_id TEXT NOT NULL, target_id TEXT NOT NULL, language TEXT NOT NULL,
 type TEXT NOT NULL CHECK(type IN ('prerequisite','related','contrast','commonly_confused','more_formal','more_casual')),
 note_zh TEXT NOT NULL, PRIMARY KEY(source_id,target_id,type), CHECK(source_id<>target_id),
 FOREIGN KEY(source_id,language) REFERENCES v2_grammar_points(id,language),
 FOREIGN KEY(target_id,language) REFERENCES v2_grammar_points(id,language)
);
CREATE INDEX v2_grammar_relations_target ON v2_grammar_relations(target_id);
-- source requires target. Reject prerequisite cycles on insert and update.
CREATE TRIGGER v2_prerequisite_insert BEFORE INSERT ON v2_grammar_relations WHEN NEW.type='prerequisite' BEGIN
 SELECT RAISE(ABORT,'prerequisite cycle') WHERE EXISTS (
 WITH RECURSIVE ancestors(id) AS (SELECT NEW.target_id UNION SELECT r.target_id FROM v2_grammar_relations r JOIN ancestors a ON r.source_id=a.id WHERE r.type='prerequisite') SELECT 1 FROM ancestors WHERE id=NEW.source_id);
END;
CREATE TRIGGER v2_prerequisite_update BEFORE UPDATE ON v2_grammar_relations WHEN NEW.type='prerequisite' BEGIN
 SELECT RAISE(ABORT,'prerequisite cycle') WHERE EXISTS (
 WITH RECURSIVE ancestors(id) AS (SELECT NEW.target_id UNION SELECT r.target_id FROM v2_grammar_relations r JOIN ancestors a ON r.source_id=a.id WHERE r.type='prerequisite' AND NOT(r.source_id=OLD.source_id AND r.target_id=OLD.target_id AND r.type=OLD.type)) SELECT 1 FROM ancestors WHERE id=NEW.source_id);
END;
CREATE TABLE v2_topics (id TEXT PRIMARY KEY, name_zh TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE v2_vocabulary_topics (item_id TEXT NOT NULL REFERENCES v2_vocabulary_items(id), topic_id TEXT NOT NULL REFERENCES v2_topics(id), PRIMARY KEY(item_id,topic_id));
CREATE TABLE v2_sentence_units (
 id TEXT PRIMARY KEY, anchor_zh TEXT NOT NULL, topic_id TEXT NOT NULL REFERENCES v2_topics(id),
 unit_type TEXT NOT NULL CHECK(unit_type IN ('sentence','scenario','dialogue')),
 context_zh TEXT, comparison_zh TEXT,
 publication_state TEXT NOT NULL DEFAULT 'draft' CHECK(publication_state IN ('draft','published','archived')),
 sort_order INTEGER NOT NULL DEFAULT 0,
 CHECK(unit_type<>'scenario' OR (context_zh IS NOT NULL AND length(trim(context_zh))>0))
);
CREATE INDEX v2_sentence_browse ON v2_sentence_units(publication_state,topic_id,unit_type,sort_order,id);
CREATE TABLE v2_sentence_expressions (
 id TEXT PRIMARY KEY, unit_id TEXT NOT NULL REFERENCES v2_sentence_units(id),
 language TEXT NOT NULL CHECK(language IN ('en','ja')), text TEXT NOT NULL,
 is_primary INTEGER NOT NULL DEFAULT 1 CHECK(is_primary IN (0,1)), register TEXT NOT NULL DEFAULT 'neutral',
 note_zh TEXT, ipa TEXT, readings_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(readings_json) AND json_type(readings_json)='array'),
 overall_difficulty INTEGER NOT NULL CHECK(overall_difficulty BETWEEN 1 AND 6),
 vocabulary_difficulty INTEGER NOT NULL CHECK(vocabulary_difficulty BETWEEN 1 AND 6),
 grammar_difficulty INTEGER NOT NULL CHECK(grammar_difficulty BETWEEN 1 AND 6),
 difficulty_note_zh TEXT NOT NULL CHECK(length(trim(difficulty_note_zh))>0),
 publication_state TEXT NOT NULL DEFAULT 'draft' CHECK(publication_state IN ('draft','published','archived')),
 sort_order INTEGER NOT NULL DEFAULT 0, UNIQUE(id,language), CHECK(language='en' OR ipa IS NULL)
);
CREATE UNIQUE INDEX v2_primary_expression ON v2_sentence_expressions(unit_id,language) WHERE is_primary=1;
CREATE INDEX v2_expression_filter ON v2_sentence_expressions(language,publication_state,overall_difficulty,vocabulary_difficulty,grammar_difficulty,unit_id);
CREATE INDEX v2_expression_unit ON v2_sentence_expressions(unit_id,sort_order,id);
CREATE TABLE v2_dialogue_turns (
 id TEXT PRIMARY KEY, expression_id TEXT NOT NULL REFERENCES v2_sentence_expressions(id),
 speaker TEXT NOT NULL, text TEXT NOT NULL,
 readings_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(readings_json) AND json_type(readings_json)='array'),
 sort_order INTEGER NOT NULL, UNIQUE(id,expression_id), UNIQUE(expression_id,sort_order)
);
CREATE TRIGGER v2_dialogue_only BEFORE INSERT ON v2_dialogue_turns BEGIN
 SELECT RAISE(ABORT,'turn requires dialogue') WHERE NOT EXISTS(SELECT 1 FROM v2_sentence_expressions e JOIN v2_sentence_units u ON u.id=e.unit_id WHERE e.id=NEW.expression_id AND u.unit_type='dialogue');
END;
CREATE TABLE v2_sentence_vocabulary_links (
 id TEXT PRIMARY KEY, expression_id TEXT NOT NULL, language TEXT NOT NULL, item_id TEXT NOT NULL, sense_id TEXT,
 turn_id TEXT, displayed_form TEXT NOT NULL, occurrence INTEGER NOT NULL DEFAULT 1 CHECK(occurrence>=1),
 importance INTEGER NOT NULL DEFAULT 1 CHECK(importance BETWEEN 1 AND 3), is_new_target INTEGER NOT NULL DEFAULT 0 CHECK(is_new_target IN (0,1)),
 note_zh TEXT, sort_order INTEGER NOT NULL DEFAULT 0,
 FOREIGN KEY(expression_id,language) REFERENCES v2_sentence_expressions(id,language),
 FOREIGN KEY(item_id,language) REFERENCES v2_vocabulary_items(id,language),
 FOREIGN KEY(sense_id,item_id) REFERENCES v2_vocabulary_senses(id,item_id),
 FOREIGN KEY(turn_id,expression_id) REFERENCES v2_dialogue_turns(id,expression_id)
);
CREATE UNIQUE INDEX v2_vocab_link_unique ON v2_sentence_vocabulary_links(expression_id,item_id,ifnull(sense_id,''),ifnull(turn_id,''),displayed_form,occurrence);
CREATE INDEX v2_vocab_link_reverse ON v2_sentence_vocabulary_links(item_id,expression_id);
CREATE TABLE v2_sentence_grammar_links (
 id TEXT PRIMARY KEY, expression_id TEXT NOT NULL, language TEXT NOT NULL, grammar_id TEXT NOT NULL,
 turn_id TEXT, displayed_form TEXT NOT NULL, occurrence INTEGER NOT NULL DEFAULT 1 CHECK(occurrence>=1),
 note_zh TEXT, sort_order INTEGER NOT NULL DEFAULT 0,
 FOREIGN KEY(expression_id,language) REFERENCES v2_sentence_expressions(id,language),
 FOREIGN KEY(grammar_id,language) REFERENCES v2_grammar_points(id,language),
 FOREIGN KEY(turn_id,expression_id) REFERENCES v2_dialogue_turns(id,expression_id)
);
CREATE UNIQUE INDEX v2_grammar_link_unique ON v2_sentence_grammar_links(expression_id,grammar_id,ifnull(turn_id,''),displayed_form,occurrence);
CREATE INDEX v2_grammar_link_reverse ON v2_sentence_grammar_links(grammar_id,expression_id);
CREATE TABLE v2_grammar_examples (
 id TEXT PRIMARY KEY, grammar_id TEXT NOT NULL, language TEXT NOT NULL,
 text TEXT NOT NULL, translation_zh TEXT NOT NULL, explanation_zh TEXT, ipa TEXT,
 readings_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(readings_json) AND json_type(readings_json)='array'),
 source_expression_id TEXT, sort_order INTEGER NOT NULL DEFAULT 0,
 FOREIGN KEY(grammar_id,language) REFERENCES v2_grammar_points(id,language),
 FOREIGN KEY(source_expression_id,language) REFERENCES v2_sentence_expressions(id,language), CHECK(language='en' OR ipa IS NULL)
);
CREATE INDEX v2_grammar_examples_point ON v2_grammar_examples(grammar_id,sort_order);
