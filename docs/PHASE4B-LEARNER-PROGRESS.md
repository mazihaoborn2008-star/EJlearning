# Phase 4B learner progress

## Grading audit

| Interaction | Canonical ID | Correct answer source | Existing grading | Phase 4B account tracking |
| --- | --- | --- | --- | --- |
| Modern vocabulary library/detail | `v2_vocabulary_items.id` | Published `v2_vocabulary_items.lemma` | No scored exercise before 4B | Server-graded recall check |
| Modern grammar library/detail | `v2_grammar_points.id` | Published `v2_grammar_points.form_name` | No scored exercise before 4B | Server-graded recall check |
| Modern lesson practice | `lesson_units.id`; linked V2 item IDs | No lesson answer key | Explicitly unscored review links | Start, stable position, explicit completion only |
| Legacy placement/checkpoint | `placement_questions.id`, optional legacy `concept_id` | `placement_answer_keys.correct_option` | Server-side and authoritative | Unchanged; not mapped into V2 vocabulary/grammar progress |
| Legacy mastery buttons | Legacy `concept.id` | Learner self-report | Browser/local-storage only | Unchanged and not imported |
| Expression review | `v2_sentence_units.id` / expression ID | No objective answer key | No scored exercise | Unsupported for scored progress |
| AI Tutor | Public V2 or lesson context IDs | Generative response, not an answer key | AI provider | Read/write boundary unchanged; cannot write progress |

The two new recall checks submit an actual answer, never a `correct` flag. The Worker loads a published canonical item and performs normalization and comparison. English matching is case-insensitive after NFKC and whitespace normalization; Japanese matching is NFKC/whitespace normalized and case-preserving.

## Storage and atomicity

`0003_phase4b_learner_progress.sql` adds lazy, per-user `vocabulary_progress`, `grammar_progress`, and `lesson_progress` rows. Composite primary keys enforce one summary per user and curriculum item. Foreign keys target `users` and the applicable curriculum table.

`learning_attempts` is deliberately narrow: `(user_id, attempt_id)`, content type/ID, authoritative result, and timestamp. It stores no raw learner answer. `AFTER INSERT` triggers update the applicable summary in the same SQLite statement. A retry uses `INSERT OR IGNORE`; an ignored duplicate does not fire a trigger. Thus the ledger and summary either both change or neither changes.

The UI state is derived at read time:

- no row: `unseen`
- otherwise: `learning`
- `familiar`: at least 3 attempts, at least 80% correct, and current correct streak at least 2

There is no mastery score, review interval, or `next_review_at`. Phase 4C owns SRS.

## API

All routes below require a live Phase 4A session. Writes additionally require exact same-origin requests. The server derives `user_id`; request bodies containing unknown fields such as `user_id` or `correct` are rejected.

- `POST /api/learning/attempt`
- `POST /api/lessons/:id/start`
- `POST /api/lessons/:id/position`
- `POST /api/lessons/:id/complete`
- `GET /api/progress/summary`
- `GET /api/progress/recent?limit=8`
- `GET /api/progress/vocabulary?ids=id1,id2`
- `GET /api/progress/grammar?ids=id1,id2`
- `GET /api/progress/lessons?ids=id1,id2`

Bulk item lookups accept at most 100 explicitly requested IDs. Collection reads use bounded limit/offset pagination. Passive content browsing creates no progress row.

## Logical D1 row writes

| Action | First time | Repeat/subsequent |
| --- | ---: | ---: |
| Vocabulary answer | 2 (attempt + summary insert) | 2 (attempt + summary update) |
| Grammar answer | 2 (attempt + summary insert) | 2 (attempt + summary update) |
| Retry same attempt ID | 0 | 0 |
| Lesson start | 1 | 0 |
| New stable lesson position | 1 | 0 when unchanged |
| Lesson completion after start | 1 | 0 when already completed |

No migration creates progress rows for existing users or curriculum content. `/api/me`, list browsing, summary reads, and progress reads perform zero learner-progress writes.

## User experience

Authenticated vocabulary and grammar detail pages include a compact recall check. Current library pages request progress only for rendered items and show a small `学习中` / `已熟悉` indicator when a row exists. Anonymous visitors retain normal browsing and see a login invitation instead of a persistent check.

Opening a published lesson transitions `not_started` to `in_progress` once. Stable keys (`overview`, `vocabulary`, `grammar`, `expressions`, `scenario`, `practice`) support continue-learning. Reaching the final tab does not complete a lesson: the learner must select `完成课程`.

`我的学习` shows real vocabulary/grammar counts and accuracy, completed/in-progress lessons, the latest in-progress lesson, and a bounded recent list. Empty accounts get a zero-data welcome state.
