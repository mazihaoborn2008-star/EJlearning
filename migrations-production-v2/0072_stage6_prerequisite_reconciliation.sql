-- Stage 6 Expansion 03 staging reconciliation: align four stale current-index boundaries with the immutable bundle.

-- This migration changes only the current prerequisite projection; historical bundles and learner/SRS evidence remain unchanged.

PRAGMA foreign_keys=ON;

UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s2-l5' WHERE lesson_id='en-s3-l1' AND prerequisite_lesson_id='en-s2-l4';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s3-l9' WHERE lesson_id='en-s4-l1' AND prerequisite_lesson_id='en-s3-l4';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s2-l6' WHERE lesson_id='ja-s3-l1' AND prerequisite_lesson_id='ja-s2-l4';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s3-l8' WHERE lesson_id='ja-s4-l1' AND prerequisite_lesson_id='ja-s3-l4';
