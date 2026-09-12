-- V2 editorial integrity guards. No legacy table writes.
CREATE TRIGGER v2_vocabulary_items_integers_insert BEFORE INSERT ON v2_vocabulary_items BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.stage IS NOT NULL AND typeof(NEW.stage)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_vocabulary_items_integers_update BEFORE UPDATE ON v2_vocabulary_items BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.stage IS NOT NULL AND typeof(NEW.stage)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_vocabulary_senses_integers_insert BEFORE INSERT ON v2_vocabulary_senses BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.stage_override IS NOT NULL AND typeof(NEW.stage_override)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_vocabulary_senses_integers_update BEFORE UPDATE ON v2_vocabulary_senses BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.stage_override IS NOT NULL AND typeof(NEW.stage_override)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_grammar_points_integers_insert BEFORE INSERT ON v2_grammar_points BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.level IS NOT NULL AND typeof(NEW.level)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_grammar_points_integers_update BEFORE UPDATE ON v2_grammar_points BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.level IS NOT NULL AND typeof(NEW.level)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_sentence_expressions_integers_insert BEFORE INSERT ON v2_sentence_expressions BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.overall_difficulty IS NOT NULL AND typeof(NEW.overall_difficulty)<>'integer') OR (NEW.vocabulary_difficulty IS NOT NULL AND typeof(NEW.vocabulary_difficulty)<>'integer') OR (NEW.grammar_difficulty IS NOT NULL AND typeof(NEW.grammar_difficulty)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_sentence_expressions_integers_update BEFORE UPDATE ON v2_sentence_expressions BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.overall_difficulty IS NOT NULL AND typeof(NEW.overall_difficulty)<>'integer') OR (NEW.vocabulary_difficulty IS NOT NULL AND typeof(NEW.vocabulary_difficulty)<>'integer') OR (NEW.grammar_difficulty IS NOT NULL AND typeof(NEW.grammar_difficulty)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_sentence_vocabulary_links_integers_insert BEFORE INSERT ON v2_sentence_vocabulary_links BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.occurrence IS NOT NULL AND typeof(NEW.occurrence)<>'integer') OR (NEW.importance IS NOT NULL AND typeof(NEW.importance)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_sentence_vocabulary_links_integers_update BEFORE UPDATE ON v2_sentence_vocabulary_links BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.occurrence IS NOT NULL AND typeof(NEW.occurrence)<>'integer') OR (NEW.importance IS NOT NULL AND typeof(NEW.importance)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_sentence_grammar_links_integers_insert BEFORE INSERT ON v2_sentence_grammar_links BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.occurrence IS NOT NULL AND typeof(NEW.occurrence)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_sentence_grammar_links_integers_update BEFORE UPDATE ON v2_sentence_grammar_links BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.occurrence IS NOT NULL AND typeof(NEW.occurrence)<>'integer') OR (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_dialogue_turns_integers_insert BEFORE INSERT ON v2_dialogue_turns BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_dialogue_turns_integers_update BEFORE UPDATE ON v2_dialogue_turns BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE (NEW.sort_order IS NOT NULL AND typeof(NEW.sort_order)<>'integer');
END;
CREATE TRIGGER v2_dialogue_update BEFORE UPDATE OF expression_id ON v2_dialogue_turns BEGIN
 SELECT RAISE(ABORT,'turn requires dialogue') WHERE NOT EXISTS(SELECT 1 FROM v2_sentence_expressions e JOIN v2_sentence_units u ON u.id=e.unit_id WHERE e.id=NEW.expression_id AND u.unit_type='dialogue');
END;
CREATE TRIGGER v2_dialogue_expression_move BEFORE UPDATE OF unit_id ON v2_sentence_expressions WHEN EXISTS(SELECT 1 FROM v2_dialogue_turns WHERE expression_id=OLD.id) BEGIN
 SELECT RAISE(ABORT,'turn requires dialogue') WHERE NOT EXISTS(SELECT 1 FROM v2_sentence_units WHERE id=NEW.unit_id AND unit_type='dialogue');
END;
CREATE TRIGGER v2_dialogue_unit_type BEFORE UPDATE OF unit_type ON v2_sentence_units WHEN NEW.unit_type<>'dialogue' BEGIN
 SELECT RAISE(ABORT,'dialogue still owns turns') WHERE EXISTS(SELECT 1 FROM v2_dialogue_turns t JOIN v2_sentence_expressions e ON e.id=t.expression_id WHERE e.unit_id=OLD.id);
END;
