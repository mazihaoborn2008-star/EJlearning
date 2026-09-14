# Phase 4F — Remediation Loop and Learner Experience V1

## Existing journey audit

Before Phase 4F, the dashboard weakness rows linked to vocabulary or grammar detail pages. The recommendation card followed the Phase 4D priority order (due review, in-progress lesson, next lesson), while `practice.html` supported lesson, single-item, and broad standalone Phase 4E sessions. A wrong answer displayed the canonical answer and linked to the ordinary content-grounded Tutor; the browser composed that context and no graded-attempt proof was carried. OTP verification always navigated to `/progress.html`. SRS and due checks used absolute server UTC; timestamps were displayed in browser-local time, but the dashboard “today” count began at UTC midnight. New-account lesson selection was English-first. There was no account learning-language or timezone setting.

Phase 4F reuses the Phase 4D weakness query and ordering, the Phase 4E exercise/token builder and authoritative attempt endpoint, the Phase 4C attempt triggers, the Phase 4B progress tables, and the Phase 4A session. It does not introduce a second weakness classifier, grading engine, review queue, or learning-state writer.

## Focused weakness practice

`GET /api/practice/session?source=weakness&type=vocabulary` and the grammar equivalent are authenticated extensions of Phase 4E. The server obtains candidates from the shared Phase 4D `weakItems` service, filters unpublished content, preserves the Phase 4D order (relearning first, then lapse/accuracy/last-wrong/id ranking), and builds normal opaque exercises. The default is five and the maximum is ten. Sparse sets stay sparse; unseen or random content is never used as filler.

Opening a weakness session performs no writes and never inserts items into `/api/review/queue`. Future-scheduled weak items may be intentionally practiced. `next_review_at` changes only when a real answer inserts into `learning_attempts` and the existing Phase 4C trigger runs. Attempt retries remain idempotent.

Dashboard vocabulary and grammar weakness cards retain factual Phase 4D reasons and now expose a “专项练习” action. The practice page retains the next-question state in bounded tab session storage before the learner explicitly opens an explanation, so returning continues the session without resurrecting or resubmitting an attempt.

## Wrong-answer AI boundary

Only a newly inserted, authoritative incorrect Phase 4E attempt receives a 30-minute encrypted remediation token. A distinct key derivation and authenticated-data purpose separate it from exercise tokens. It binds the authenticated user, attempt identity, public content, exercise type, prompt, submitted answer, canonical answer, deterministic incorrect result, optional lesson, issue time, and expiry. The AI endpoint decrypts it, verifies the current Phase 4A user, expiry, and matching incorrect ledger entry, then builds a bounded remediation-only prompt. Modified tokens, fabricated context, expired tokens, and cross-user replay are rejected.

The AI receives only:

- learning language and content type;
- public content ID and exercise type;
- the exact exercise prompt;
- the submitted answer;
- the canonical answer, only after grading;
- the deterministic result `incorrect`;
- a bounded curriculum title/meaning/explanation;
- lesson ID only when the exercise came from a lesson.

It does not receive email, user ID, session token, weakness score, progress rows, SRS schedule, attempt history, or unrelated recommendations. The answer and prompt are sent to DeepSeek only after the learner selects “让 AI 解释” and then explicitly invokes the explanation on the Tutor page. AI is advisory: it cannot re-grade or mutate progress, SRS, lapses, lesson completion, weakness classification, or recommendation priority. Existing standalone and contextual Tutor flows retain their provider, model, timeout, history, and bounds.

## Settings model and API

Migration `0006_phase4f_learner_experience.sql` adds a separate `user_settings` table with `user_id` as PK/FK, nullable `preferred_learning_language` (`en` or `ja`), nullable IANA `timezone`, and `updated_at`. Existing users receive no row. No curriculum is changed or initialized.

Authenticated `GET /api/settings` returns nullable settings with zero writes. Same-origin `PATCH /api/settings` accepts only `preferred_learning_language` and `timezone`, derives the user from the session, validates language and a real IANA zone, and performs one upsert only when values change. Unknown fields, identity/email fields, offsets, and invalid zones are rejected.

`preferred_learning_language` means the language being learned, not UI language. Recommendation precedence is: due review; most recent in-progress lesson; eligible next lesson in the latest active language; preferred language; deterministic English then Japanese fallback. It chooses the first lesson for a new account and the default broad practice language, but never overrides due review, explicit content/language navigation, or legitimate current lesson activity. No lesson progress is created when the preference is saved.

SRS timestamps and due comparisons remain absolute UTC. The stored timezone affects only calendar concepts. Dashboard “today” starts at midnight in that IANA zone; without a setting it explicitly falls back to UTC. The UI may show the browser zone as a suggestion, but it is saved only by an explicit action. Recent timestamp display remains browser-local.

## Login return security and first run

Login links carry only a bounded relative app target. Validation rejects absolute and protocol-relative URLs, credentials, backslashes, controls, API/auth targets, encoded/double-encoded protocol tricks, and cross-origin resolution. Invalid targets fall back to `/progress.html`; email, OTP, and session tokens are never placed in the URL. Lesson, vocabulary, grammar, practice, dashboard, fragments, and nested query strings are preserved.

The dashboard shows a lightweight, skippable setup when both settings are absent. It asks for English or Japanese and shows the browser IANA timezone as an unpersisted suggestion. This never blocks browsing.

## Privacy and conversation deletion

The UI discloses that the selected wrong exercise and submitted answer may be sent to the AI provider. No remediation request is automatic. “新对话” now states that it only clears the local view and the old KV record expires normally. A separate “删除当前对话” action issues a same-origin delete request for the unguessable current session ID and deletes that KV key.

## Write budget

- Weakness session GET: zero writes.
- Stateless remediation token creation: zero additional writes.
- AI remediation request: no learning-state writes (normal bounded AI KV history only).
- GET settings: zero writes.
- Changed PATCH: one settings upsert; unchanged PATCH: zero writes.
- Login return target: no additional database writes.
- No analytics table or remediation row was added.

## Deferred scope

Expression grading remains unsupported. A later content-authoring phase needs authored exercise forms, accepted answers and variants, and explicit ambiguity rules. AI-generated answer keys are not acceptable. Curriculum expansion and production deployment are outside Phase 4F.
