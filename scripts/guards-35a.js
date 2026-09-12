// Additive guards for SQLite numeric affinity and dialogue ownership on edits.
import fs from 'node:fs';
const sql=['-- V2 editorial integrity guards. No legacy table writes.'];
for(const [table,fields] of Object.entries({vocabulary_items:['stage','sort_order'],vocabulary_senses:['stage_override','sort_order'],grammar_points:['level','sort_order'],sentence_expressions:['overall_difficulty','vocabulary_difficulty','grammar_difficulty','sort_order'],sentence_vocabulary_links:['occurrence','importance','sort_order'],sentence_grammar_links:['occurrence','sort_order'],dialogue_turns:['sort_order']})){
 for(const operation of ['INSERT','UPDATE'])sql.push(`CREATE TRIGGER v2_${table}_integers_${operation.toLowerCase()} BEFORE ${operation} ON v2_${table} BEGIN
 SELECT RAISE(ABORT,'integer metadata required') WHERE ${fields.map(f=>`(NEW.${f} IS NOT NULL AND typeof(NEW.${f})<>'integer')`).join(' OR ')};
END;`);
}
sql.push(`CREATE TRIGGER v2_dialogue_update BEFORE UPDATE OF expression_id ON v2_dialogue_turns BEGIN
 SELECT RAISE(ABORT,'turn requires dialogue') WHERE NOT EXISTS(SELECT 1 FROM v2_sentence_expressions e JOIN v2_sentence_units u ON u.id=e.unit_id WHERE e.id=NEW.expression_id AND u.unit_type='dialogue');
END;
CREATE TRIGGER v2_dialogue_expression_move BEFORE UPDATE OF unit_id ON v2_sentence_expressions WHEN EXISTS(SELECT 1 FROM v2_dialogue_turns WHERE expression_id=OLD.id) BEGIN
 SELECT RAISE(ABORT,'turn requires dialogue') WHERE NOT EXISTS(SELECT 1 FROM v2_sentence_units WHERE id=NEW.unit_id AND unit_type='dialogue');
END;
CREATE TRIGGER v2_dialogue_unit_type BEFORE UPDATE OF unit_type ON v2_sentence_units WHEN NEW.unit_type<>'dialogue' BEGIN
 SELECT RAISE(ABORT,'dialogue still owns turns') WHERE EXISTS(SELECT 1 FROM v2_dialogue_turns t JOIN v2_sentence_expressions e ON e.id=t.expression_id WHERE e.unit_id=OLD.id);
END;`);
fs.writeFileSync('migrations-v2/0008_v2_editorial_guards.sql',sql.join('\n')+'\n');
