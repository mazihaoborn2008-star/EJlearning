-- Phase 4F: narrow account preferences. Existing users intentionally have no row.
CREATE TABLE user_settings (
  user_id TEXT PRIMARY KEY,
  preferred_learning_language TEXT CHECK (preferred_learning_language IN ('en', 'ja')),
  timezone TEXT,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
