# Phase 4C — Deterministic Spaced Repetition V1

Phase 4C adds timestamp-based review scheduling for authenticated users' vocabulary and grammar attempts. SRS v1 is deterministic and intentionally simpler than FSRS: it has no AI, machine-learned weights, timezone reset, XP, or permanent mastery score.

## Scheduling policy

The Worker supplies the authoritative Unix timestamp in UTC seconds as `learning_attempts.created_at`. The existing SQLite triggers use that same timestamp for every schedule calculation.

| Result / new consecutive-correct stage | Interval |
| --- | ---: |
| Wrong / relearning stage 0 | 600 seconds (10 minutes) |
| Correct stage 1 | 86,400 seconds (1 day) |
| Correct stage 2 | 259,200 seconds (3 days) |
| Correct stage 3 | 604,800 seconds (7 days) |
| Correct stage 4 | 1,209,600 seconds (14 days) |
| Correct stage 5 | 2,592,000 seconds (30 days) |
| Correct stage 6+ | 5,184,000 seconds (60 days, capped) |

A wrong answer increments `review_count` and `lapse_count`, resets the existing Phase 4B `correct_streak`, sets `review_stage` to 0, and schedules a 10-minute relearning review. The first later correct answer starts again at stage 1 / one day. A late answer is scheduled solely from its actual result and current consecutive-correct streak; lateness does not add a penalty or multiplier.

## Data model and migration

`0004_phase4c_srs.sql` adds these columns to both `vocabulary_progress` and `grammar_progress`:

- `review_stage` (nullable integer 0–6)
- `review_count` (non-negative integer, default 0)
- `lapse_count` (non-negative integer, default 0)
- `last_reviewed_at` (nullable UTC Unix seconds)
- `next_review_at` (nullable UTC Unix seconds)
- `current_interval_seconds` (nullable positive integer)

It adds covering due indexes `(user_id, next_review_at, vocabulary_id)` and `(user_id, next_review_at, grammar_id)`. The curriculum tables are not rebuilt or changed.

Existing Phase 4B progress rows retain every attempt, correct/wrong count, streak, and timestamp. The migration performs no mass progress update: new scheduling fields remain `NULL`/zero until that item receives its next real answer. Unseen curriculum has no progress or schedule row.

## Atomic answer path and idempotency

The write path remains:

1. Canonical published content is loaded and the Worker grades the submitted answer.
2. One `INSERT OR IGNORE` writes `learning_attempts` using server time.
3. The existing content-type trigger atomically upserts the Phase 4B counters and Phase 4C schedule in the same progress row.

A new answer is approximately two logical row writes: one attempt row and one progress row. There is no review-event or analytics row. An identical `(user_id, attempt_id)` retry is detected before insertion, performs zero writes, does not fire a trigger, and returns the original result plus the unchanged progress/SRS state. `(user_id, attempt_id)` remains the primary key and cross-content attempt-ID reuse remains a conflict.

## Due definition and APIs

An item is due exactly when `next_review_at IS NOT NULL AND next_review_at <= server_time`. Due items remain due until answered. Never-seen content and pre-4C rows that have not been answered again are not manufactured into the queue.

- `GET /api/review/summary` returns per-type learned-state, scheduled and due counts; totals; the server timestamp; and the nearest future review when nothing is currently due.
- `GET /api/review/queue?type=all&limit=20` returns a bounded due queue. `type` may be `all`, `vocabulary`, or `grammar`; the default limit is 20 and maximum is 50.

Both endpoints require an authenticated session and derive `user_id` on the server. Ordering is `next_review_at ASC`, then content type, then content ID, so the most overdue/earliest due item comes first with stable ties. Queries constrain the user's due progress rows through the covering indexes before returning a bounded set. Only those rows join curriculum metadata. The queue exposes the Chinese prompt, language, content ID/type, due metadata, and progress summary; it does not expose `lemma` or `form_name`, the canonical grading answers.

## UI behavior

“我的学习” displays real vocabulary, grammar, and total due counts, plus the nearest upcoming review when none are due. `/review.html` loads at most 20 due items, presents one at a time, and submits through the existing authoritative `/api/learning/attempt` endpoint. Feedback is immediate. Answered items leave the in-memory queue; a wrong item scheduled for 10 minutes later cannot loop immediately in the same session.

The empty states distinguish no vocabulary/grammar learning from learned content with nothing due. Browser-local time is used only to display server timestamps.

## Scope and future upgrades

SRS v1 schedules vocabulary and grammar only. Lessons retain their Phase 4B lifecycle. Expressions, AI conversations, and legacy self-reported mastery are not scheduled. AI Tutor cannot write attempts, progress, or review state.

A future policy, including FSRS, may replace the deterministic trigger rules or migrate the compact scheduling columns without losing the raw authoritative `learning_attempts` history. Phase 4C itself does not begin Phase 4D.
