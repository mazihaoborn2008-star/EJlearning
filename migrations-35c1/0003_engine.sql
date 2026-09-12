-- Additive Phase 3 metadata; original approved content is unchanged.
ALTER TABLE concepts ADD COLUMN concept_type TEXT NOT NULL DEFAULT 'sentence' CHECK(concept_type IN ('vocabulary','phrase','sentence','pattern','scenario_response','dialogue'));
ALTER TABLE concepts ADD COLUMN usage_note TEXT NOT NULL DEFAULT '';
ALTER TABLE expressions ADD COLUMN metadata_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(metadata_json));
ALTER TABLE placement_questions ADD COLUMN concept_id INTEGER REFERENCES concepts(id);
ALTER TABLE placement_questions ADD COLUMN purpose TEXT NOT NULL DEFAULT 'placement' CHECK(purpose IN ('placement','checkpoint'));
CREATE INDEX assessment_pool ON placement_questions(purpose,language,active,difficulty);
-- Anonymous assessment evidence only, expires after 30 minutes. No permanent learner profile.
CREATE TABLE assessment_sessions (
 id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('placement','checkpoint')),
 language TEXT NOT NULL CHECK(language IN ('en','ja')), topic TEXT REFERENCES topics(id),
 state_json TEXT NOT NULL CHECK(json_valid(state_json)), version INTEGER NOT NULL DEFAULT 0,
 expires_at INTEGER NOT NULL
);
CREATE INDEX session_expiry ON assessment_sessions(expires_at);
