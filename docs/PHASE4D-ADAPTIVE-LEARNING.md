# Phase 4D — Deterministic adaptive learning recommendations V1

## Scope and data audit

Phase 4D answers “what should this authenticated learner do next?” from the existing Phase 4B progress and Phase 4C schedule. It creates no recommendation, event, or mastery table.

The active lesson composition bundle contains 48 published lessons: 24 English and 24 Japanese lessons, ordered by `(language, stage, sequence, id)`. There are 46 explicit prerequisites, forming one linear 24-lesson chain per language. `lesson_progress.last_activity_at` identifies the most recently active in-progress lesson; an explicit completion row is the only evidence that a lesson is complete.

Vocabulary and grammar do have reliable canonical lesson links through `lesson_items`. The audited bundle contains 382 vocabulary links to 226 unique items and 144 grammar links to 85 unique items. These are many-to-many relationships: 90 vocabulary items and 30 grammar items occur in multiple lessons. Weak-item analysis therefore remains item-based rather than assigning a single inferred lesson or topic. Lesson recommendations use only lesson lifecycle rows, canonical order, and prerequisites.

The application has no persisted global language preference. The API consequently returns independent `lesson.paths.en` and `lesson.paths.ja` sections. A single primary next lesson is selected deterministically: the next lesson in the language of the learner's latest lesson activity when available, then English, then Japanese. Both first lessons remain visible to a new learner in the separated path sections. This tie policy is ordering, not a hidden preference.

## Recommendation priority

The primary action uses the following strict order:

1. `review_due`: any Phase 4C item with `next_review_at <= server_time`; target `/review.html`.
2. `continue_lesson`: the published in-progress lesson with the greatest `last_activity_at`, then lesson ID as a stable tie-break.
3. `start_next_lesson`: the earliest not-started, incomplete lesson whose explicit prerequisites are complete, according to canonical per-language order.
4. `all_lessons_complete`: every currently published English and Japanese lesson has an explicit completed row.

Future reviews never count as due. Their nearest `next_review_at` is reported for transparency, but they never displace a lesson action or enter the review queue early. Merely recommending a lesson does not create `lesson_progress`.

If no published curriculum is available, the service returns a `no_content` state and does not invent content. The current persisted/fallback bundle always supplies published lessons.

## Weakness classification and ranking

Classification is derived at read time and is never stored:

- `relearning`: `review_stage = 0` or the latest authoritative result is wrong.
- `weak`: not relearning, and either `lapse_count >= 2`, or at least three attempts with cumulative accuracy below 60%.
- `learning`: not weak/relearning and `review_stage IN (1, 2)`; defined for policy clarity but not returned in weak arrays.
- `stable`: `review_stage >= 3`, cumulative accuracy at least 80%, and latest result correct; excluded from weak arrays.
- `unscheduled`: a pre-4C row whose schedule remains null and that does not meet a higher-priority classification; excluded unless its real wrong/accuracy signals make it relearning or weak.
- `developing`: a scheduled row that is not weak/relearning and has not yet met the stable rule.

Only `relearning` and `weak` items are returned. Ordering is:

1. relearning before weak;
2. higher `lapse_count`;
3. lower cumulative accuracy;
4. more recent `last_wrong_at`;
5. stable content ID.

The default is five vocabulary and five grammar items. `limit` applies to each list and accepts 1–20. The progress candidate read is capped at four times the requested limit (maximum 80) so unpublished historical rows can be discarded without unbounded work. Reasons use stored facts such as “上次回答错误”, “已出现 2 次遗忘”, or “累计正确率 40%”; no unexplained score is emitted.

Weakness display never changes scheduling. A weak item with a future `next_review_at` may appear as an area to watch, but it is not inserted into or forced into the due queue.

## API

`GET /api/recommendations` requires a live Phase 4A session. `user_id` always comes from the session and session reads use `touch: false`. The only accepted query parameter is optional `limit`; `user_id`, scores, priorities, and recommendation overrides are rejected as invalid queries.

The response contains:

- `primary_action`: deterministic type, factual reason, target, and applicable count or lesson metadata;
- `review`: the shared Phase 4C due/scheduled aggregate and nearest future review;
- `weak_vocabulary` and `weak_grammar`: bounded item lists;
- `lesson`: selected continue/next state plus separate English and Japanese path states;
- `generated_at`: authoritative server Unix time;
- `limits`: applied and maximum weak-list limits.

The endpoint exposes Chinese meaning/title labels, language, public curriculum IDs, aggregate counters, and schedule timestamps. It does not expose vocabulary lemmas, grammar forms, raw answers, email addresses, session data, or another learner's rows.

## Query and index strategy

Due aggregates reuse the same `getReviewSnapshot` backend function as `/api/review/summary`, preventing policy drift. Due lookups use the Phase 4C covering indexes `(user_id, next_review_at, item_id)`. In-progress lesson lookup uses `(user_id, status, last_activity_at DESC)`. Weakness reads begin with the composite user/item primary key or an existing user-leading progress index, filter only that learner's progress rows, rank in SQLite, and return a capped candidate set. Only those candidate IDs are then loaded from curriculum metadata. No `learning_attempts` history scan and no full curriculum scan is used.

`EXPLAIN QUERY PLAN` assertions cover due, in-progress, and user-first weakness access. Existing indexes are sufficient, so no `0005_phase4d_recommendation_indexes.sql` migration is needed.

## Zero-write and SRS boundary

Every recommendation request performs zero D1 writes. It does not update session access time, create progress, mark a lesson started, write analytics, or mutate `next_review_at`, `review_stage`, intervals, lapses, or attempts. Repeated endpoint and dashboard-read tests compare SQLite `total_changes()` and complete progress/SRS/lesson rows before and after.

Phase 4C remains the sole owner of schedule mutation. Phase 4B remains the sole owner of authoritative grading and lesson lifecycle mutation. Recommendations are projections over those facts.

## Dashboard

“我的学习” loads the existing bounded progress summary and recent activity plus one recommendation snapshot. It no longer makes a separate review-summary request because the snapshot carries that shared aggregate. The page shows:

- “推荐下一步” with the priority action and factual explanation;
- nearest future review without enabling early review;
- separate alternative language-path link when applicable;
- “薄弱词汇” and “薄弱语法” with concise factual reasons;
- an honest new-account state with no claimed weaknesses;
- existing progress metrics and bounded recent activity.

Responsive tests cover 360, 390, 430, 768, and 1440 pixel widths, long lesson titles, large due counts, populated weakness lists, and empty weakness lists.

## Security and future AI boundary

All database predicates bind the authenticated session's user ID. Unknown/authority-shaped inputs are rejected. Recommendation endpoints are GET-only, cache-disabled, and read-only. Canonical grading answers stay behind the existing answer endpoint.

Phase 4D does not send learner data to DeepSeek and does not modify AI Tutor prompts. A future read-only personalization layer may consume a deliberately sanitized snapshot shaped like this API response, but it must remain advisory: deterministic SRS dates, weakness classification, lesson eligibility, grading, and progress mutation stay authoritative server responsibilities. Such personalization is explicitly unsupported in V1.
