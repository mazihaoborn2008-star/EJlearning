CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email_normalized TEXT NOT NULL COLLATE NOCASE UNIQUE,
  email_display TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  last_login_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled'))
);

CREATE TABLE email_login_codes (
  id TEXT PRIMARY KEY,
  email_normalized TEXT NOT NULL COLLATE NOCASE,
  code_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0 AND attempts <= 5),
  consumed_at INTEGER,
  requested_ip_hash TEXT NOT NULL,
  user_agent_hash TEXT NOT NULL
);

CREATE INDEX idx_email_login_codes_email_created
  ON email_login_codes(email_normalized, created_at DESC);
CREATE INDEX idx_email_login_codes_ip_created
  ON email_login_codes(requested_ip_hash, created_at DESC);
CREATE INDEX idx_email_login_codes_cleanup
  ON email_login_codes(expires_at, consumed_at);

CREATE TABLE auth_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  revoked_at INTEGER,
  created_ip_hash TEXT NOT NULL,
  user_agent_hash TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_auth_sessions_user_active
  ON auth_sessions(user_id, revoked_at, expires_at);
CREATE INDEX idx_auth_sessions_cleanup
  ON auth_sessions(expires_at, revoked_at);
