-- Stage 5 Expansion 02: forward-only correction for the pre-Stage-5 boundary in the legacy prerequisite index.

-- The immutable bundle was already correct; this projects its two Stage 4 lesson-six boundaries without touching learner evidence.

PRAGMA foreign_keys=ON;

UPDATE lesson_prerequisites SET prerequisite_lesson_id='en-s4-l6' WHERE lesson_id='en-s5-l1' AND prerequisite_lesson_id='en-s4-l4';

UPDATE lesson_prerequisites SET prerequisite_lesson_id='ja-s4-l6' WHERE lesson_id='ja-s5-l1' AND prerequisite_lesson_id='ja-s4-l4';
