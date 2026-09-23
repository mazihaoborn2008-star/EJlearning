-- Schema only. Dataset imports are deliberately separate from normal deploys.
CREATE TABLE IF NOT EXISTS curriculum_dataset_versions (
  dataset_name TEXT PRIMARY KEY,
  dataset_version TEXT NOT NULL,
  applied_at TEXT NOT NULL,
  row_count INTEGER NOT NULL CHECK(row_count >= 0),
  checksum TEXT NOT NULL
);

