-- Phase 4E: retain authoritative exercise and lesson context on the existing attempt ledger.
-- Historical attempts remain valid with NULL metadata and completed lessons are not changed.
ALTER TABLE learning_attempts ADD COLUMN exercise_type TEXT CHECK (exercise_type IN (
  'vocabulary_recognition', 'vocabulary_meaning_to_word', 'vocabulary_typed_recall',
  'grammar_form_selection', 'grammar_controlled_completion', 'grammar_form_recall'
));
ALTER TABLE learning_attempts ADD COLUMN context_type TEXT CHECK (context_type IN ('standalone', 'lesson', 'review'));
ALTER TABLE learning_attempts ADD COLUMN context_id TEXT;

CREATE INDEX idx_learning_attempts_lesson_evidence
  ON learning_attempts(user_id, context_id, content_type, content_id)
  WHERE context_type = 'lesson';
