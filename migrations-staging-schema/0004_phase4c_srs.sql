-- Phase 4C: deterministic timestamp-based spaced repetition for vocabulary and grammar.
-- Existing rows remain unscheduled until their next real learning attempt.

ALTER TABLE vocabulary_progress ADD COLUMN review_stage INTEGER CHECK (review_stage BETWEEN 0 AND 6);
ALTER TABLE vocabulary_progress ADD COLUMN review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0);
ALTER TABLE vocabulary_progress ADD COLUMN lapse_count INTEGER NOT NULL DEFAULT 0 CHECK (lapse_count >= 0);
ALTER TABLE vocabulary_progress ADD COLUMN last_reviewed_at INTEGER;
ALTER TABLE vocabulary_progress ADD COLUMN next_review_at INTEGER;
ALTER TABLE vocabulary_progress ADD COLUMN current_interval_seconds INTEGER CHECK (current_interval_seconds > 0);

ALTER TABLE grammar_progress ADD COLUMN review_stage INTEGER CHECK (review_stage BETWEEN 0 AND 6);
ALTER TABLE grammar_progress ADD COLUMN review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0);
ALTER TABLE grammar_progress ADD COLUMN lapse_count INTEGER NOT NULL DEFAULT 0 CHECK (lapse_count >= 0);
ALTER TABLE grammar_progress ADD COLUMN last_reviewed_at INTEGER;
ALTER TABLE grammar_progress ADD COLUMN next_review_at INTEGER;
ALTER TABLE grammar_progress ADD COLUMN current_interval_seconds INTEGER CHECK (current_interval_seconds > 0);

CREATE INDEX idx_vocabulary_progress_user_due
  ON vocabulary_progress(user_id, next_review_at, vocabulary_id);
CREATE INDEX idx_grammar_progress_user_due
  ON grammar_progress(user_id, next_review_at, grammar_id);

-- Keep the Phase 4B atomic write path: one ledger insert fires one progress upsert.
-- INSERT OR IGNORE retries do not fire these triggers and therefore cannot reschedule.
DROP TRIGGER learning_attempt_vocabulary_apply;
CREATE TRIGGER learning_attempt_vocabulary_apply
AFTER INSERT ON learning_attempts
WHEN NEW.content_type = 'vocabulary'
BEGIN
  INSERT INTO vocabulary_progress (
    user_id, vocabulary_id, attempts, correct_count, wrong_count,
    correct_streak, last_result, first_seen_at, last_seen_at,
    last_correct_at, last_wrong_at, review_stage, review_count, lapse_count,
    last_reviewed_at, next_review_at, current_interval_seconds
  ) VALUES (
    NEW.user_id, NEW.content_id, 1, NEW.result, 1 - NEW.result,
    NEW.result, NEW.result, NEW.created_at, NEW.created_at,
    IIF(NEW.result = 1, NEW.created_at, NULL),
    IIF(NEW.result = 0, NEW.created_at, NULL),
    IIF(NEW.result = 1, 1, 0), 1, 1 - NEW.result, NEW.created_at,
    NEW.created_at + IIF(NEW.result = 1, 86400, 600),
    IIF(NEW.result = 1, 86400, 600)
  )
  ON CONFLICT(user_id, vocabulary_id) DO UPDATE SET
    attempts = attempts + 1,
    correct_count = correct_count + NEW.result,
    wrong_count = wrong_count + (1 - NEW.result),
    correct_streak = IIF(NEW.result = 1, correct_streak + 1, 0),
    last_result = NEW.result,
    last_seen_at = NEW.created_at,
    last_correct_at = IIF(NEW.result = 1, NEW.created_at, last_correct_at),
    last_wrong_at = IIF(NEW.result = 0, NEW.created_at, last_wrong_at),
    review_stage = CASE WHEN NEW.result = 0 THEN 0 WHEN correct_streak >= 5 THEN 6 ELSE correct_streak + 1 END,
    review_count = review_count + 1,
    lapse_count = lapse_count + (1 - NEW.result),
    last_reviewed_at = NEW.created_at,
    current_interval_seconds = CASE
      WHEN NEW.result = 0 THEN 600 WHEN correct_streak = 0 THEN 86400
      WHEN correct_streak = 1 THEN 259200 WHEN correct_streak = 2 THEN 604800
      WHEN correct_streak = 3 THEN 1209600 WHEN correct_streak = 4 THEN 2592000
      ELSE 5184000 END,
    next_review_at = NEW.created_at + CASE
      WHEN NEW.result = 0 THEN 600 WHEN correct_streak = 0 THEN 86400
      WHEN correct_streak = 1 THEN 259200 WHEN correct_streak = 2 THEN 604800
      WHEN correct_streak = 3 THEN 1209600 WHEN correct_streak = 4 THEN 2592000
      ELSE 5184000 END;
END;

DROP TRIGGER learning_attempt_grammar_apply;
CREATE TRIGGER learning_attempt_grammar_apply
AFTER INSERT ON learning_attempts
WHEN NEW.content_type = 'grammar'
BEGIN
  INSERT INTO grammar_progress (
    user_id, grammar_id, attempts, correct_count, wrong_count,
    correct_streak, last_result, first_seen_at, last_seen_at,
    last_correct_at, last_wrong_at, review_stage, review_count, lapse_count,
    last_reviewed_at, next_review_at, current_interval_seconds
  ) VALUES (
    NEW.user_id, NEW.content_id, 1, NEW.result, 1 - NEW.result,
    NEW.result, NEW.result, NEW.created_at, NEW.created_at,
    IIF(NEW.result = 1, NEW.created_at, NULL),
    IIF(NEW.result = 0, NEW.created_at, NULL),
    IIF(NEW.result = 1, 1, 0), 1, 1 - NEW.result, NEW.created_at,
    NEW.created_at + IIF(NEW.result = 1, 86400, 600),
    IIF(NEW.result = 1, 86400, 600)
  )
  ON CONFLICT(user_id, grammar_id) DO UPDATE SET
    attempts = attempts + 1,
    correct_count = correct_count + NEW.result,
    wrong_count = wrong_count + (1 - NEW.result),
    correct_streak = IIF(NEW.result = 1, correct_streak + 1, 0),
    last_result = NEW.result,
    last_seen_at = NEW.created_at,
    last_correct_at = IIF(NEW.result = 1, NEW.created_at, last_correct_at),
    last_wrong_at = IIF(NEW.result = 0, NEW.created_at, last_wrong_at),
    review_stage = CASE WHEN NEW.result = 0 THEN 0 WHEN correct_streak >= 5 THEN 6 ELSE correct_streak + 1 END,
    review_count = review_count + 1,
    lapse_count = lapse_count + (1 - NEW.result),
    last_reviewed_at = NEW.created_at,
    current_interval_seconds = CASE
      WHEN NEW.result = 0 THEN 600 WHEN correct_streak = 0 THEN 86400
      WHEN correct_streak = 1 THEN 259200 WHEN correct_streak = 2 THEN 604800
      WHEN correct_streak = 3 THEN 1209600 WHEN correct_streak = 4 THEN 2592000
      ELSE 5184000 END,
    next_review_at = NEW.created_at + CASE
      WHEN NEW.result = 0 THEN 600 WHEN correct_streak = 0 THEN 86400
      WHEN correct_streak = 1 THEN 259200 WHEN correct_streak = 2 THEN 604800
      WHEN correct_streak = 3 THEN 1209600 WHEN correct_streak = 4 THEN 2592000
      ELSE 5184000 END;
END;
