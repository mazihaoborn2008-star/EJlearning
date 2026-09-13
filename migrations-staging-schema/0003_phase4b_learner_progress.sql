CREATE TABLE vocabulary_progress (
  user_id TEXT NOT NULL,
  vocabulary_id TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  correct_count INTEGER NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
  wrong_count INTEGER NOT NULL DEFAULT 0 CHECK (wrong_count >= 0),
  correct_streak INTEGER NOT NULL DEFAULT 0 CHECK (correct_streak >= 0),
  last_result INTEGER NOT NULL CHECK (last_result IN (0, 1)),
  first_seen_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  last_correct_at INTEGER,
  last_wrong_at INTEGER,
  PRIMARY KEY (user_id, vocabulary_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (vocabulary_id) REFERENCES v2_vocabulary_items(id),
  CHECK (attempts = correct_count + wrong_count)
);

CREATE INDEX idx_vocabulary_progress_user_recent
  ON vocabulary_progress(user_id, last_seen_at DESC);

CREATE TABLE grammar_progress (
  user_id TEXT NOT NULL,
  grammar_id TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  correct_count INTEGER NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
  wrong_count INTEGER NOT NULL DEFAULT 0 CHECK (wrong_count >= 0),
  correct_streak INTEGER NOT NULL DEFAULT 0 CHECK (correct_streak >= 0),
  last_result INTEGER NOT NULL CHECK (last_result IN (0, 1)),
  first_seen_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  last_correct_at INTEGER,
  last_wrong_at INTEGER,
  PRIMARY KEY (user_id, grammar_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (grammar_id) REFERENCES v2_grammar_points(id),
  CHECK (attempts = correct_count + wrong_count)
);

CREATE INDEX idx_grammar_progress_user_recent
  ON grammar_progress(user_id, last_seen_at DESC);

CREATE TABLE lesson_progress (
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')),
  started_at INTEGER NOT NULL,
  completed_at INTEGER,
  last_activity_at INTEGER NOT NULL,
  last_section_key TEXT CHECK (last_section_key IN ('overview', 'vocabulary', 'grammar', 'expressions', 'scenario', 'practice')),
  PRIMARY KEY (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lesson_id) REFERENCES lesson_units(id),
  CHECK ((status = 'completed' AND completed_at IS NOT NULL) OR (status = 'in_progress' AND completed_at IS NULL))
);

CREATE INDEX idx_lesson_progress_user_recent
  ON lesson_progress(user_id, last_activity_at DESC);
CREATE INDEX idx_lesson_progress_user_status
  ON lesson_progress(user_id, status, last_activity_at DESC);

-- Answers are deliberately not stored. This narrow ledger is the idempotency key
-- and authoritative result record. The composite key keeps attempt IDs user-scoped.
CREATE TABLE learning_attempts (
  user_id TEXT NOT NULL,
  attempt_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('vocabulary', 'grammar')),
  content_id TEXT NOT NULL,
  result INTEGER NOT NULL CHECK (result IN (0, 1)),
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, attempt_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_learning_attempts_user_recent
  ON learning_attempts(user_id, created_at DESC);

-- Trigger application makes the ledger insert and summary update one atomic SQLite
-- statement. INSERT OR IGNORE retries do not fire these triggers.
CREATE TRIGGER learning_attempt_vocabulary_apply
AFTER INSERT ON learning_attempts
WHEN NEW.content_type = 'vocabulary'
BEGIN
  INSERT INTO vocabulary_progress (
    user_id, vocabulary_id, attempts, correct_count, wrong_count,
    correct_streak, last_result, first_seen_at, last_seen_at,
    last_correct_at, last_wrong_at
  ) VALUES (
    NEW.user_id, NEW.content_id, 1, NEW.result, 1 - NEW.result,
    NEW.result, NEW.result, NEW.created_at, NEW.created_at,
    IIF(NEW.result = 1, NEW.created_at, NULL),
    IIF(NEW.result = 0, NEW.created_at, NULL)
  )
  ON CONFLICT(user_id, vocabulary_id) DO UPDATE SET
    attempts = attempts + 1,
    correct_count = correct_count + NEW.result,
    wrong_count = wrong_count + (1 - NEW.result),
    correct_streak = IIF(NEW.result = 1, correct_streak + 1, 0),
    last_result = NEW.result,
    last_seen_at = NEW.created_at,
    last_correct_at = IIF(NEW.result = 1, NEW.created_at, last_correct_at),
    last_wrong_at = IIF(NEW.result = 0, NEW.created_at, last_wrong_at);
END;

CREATE TRIGGER learning_attempt_grammar_apply
AFTER INSERT ON learning_attempts
WHEN NEW.content_type = 'grammar'
BEGIN
  INSERT INTO grammar_progress (
    user_id, grammar_id, attempts, correct_count, wrong_count,
    correct_streak, last_result, first_seen_at, last_seen_at,
    last_correct_at, last_wrong_at
  ) VALUES (
    NEW.user_id, NEW.content_id, 1, NEW.result, 1 - NEW.result,
    NEW.result, NEW.result, NEW.created_at, NEW.created_at,
    IIF(NEW.result = 1, NEW.created_at, NULL),
    IIF(NEW.result = 0, NEW.created_at, NULL)
  )
  ON CONFLICT(user_id, grammar_id) DO UPDATE SET
    attempts = attempts + 1,
    correct_count = correct_count + NEW.result,
    wrong_count = wrong_count + (1 - NEW.result),
    correct_streak = IIF(NEW.result = 1, correct_streak + 1, 0),
    last_result = NEW.result,
    last_seen_at = NEW.created_at,
    last_correct_at = IIF(NEW.result = 1, NEW.created_at, last_correct_at),
    last_wrong_at = IIF(NEW.result = 0, NEW.created_at, last_wrong_at);
END;
