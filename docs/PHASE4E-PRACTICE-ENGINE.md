# Phase 4E — Deterministic Practice Engine V1

## Scope and pre-implementation audit

Phase 4E adds authoritative vocabulary, grammar, and lesson practice. It does not grade expressions, change SRS/recommendation rules, add mastery weighting, gamification, or send learner state to AI.

Before Phase 4E, vocabulary and grammar detail pages asked for a typed canonical lemma/form and posted `content_type`, `content_id`, and `answer` to `POST /api/learning/attempt`. The Worker graded with normalized exact equality. Due review used the same path. Lesson practice cards only opened reference details, and `POST /api/lessons/:id/complete` completed a lesson without assessed work.

Safe pre-answer fields are prompts, language, Chinese title/meaning/purpose, and the four rendered choice strings. Canonical lemmas, grammar forms, correct meanings, accepted-answer sets, choice-to-answer mapping, content IDs that reveal a lemma, and grading policy remain inside an opaque token. Vocabulary has enough metadata for recognition, reverse choice, and conservative typed recall. Grammar has enough metadata for form selection/recall; controlled completion is generated only from an authored sentence expression whose linked `displayed_form` occurs exactly once. Expressions lack a dedicated authoritative accepted-answer model and remain reference-only.

## Exercise contract and APIs

`GET /api/practice/session` is authenticated and performs no writes. Parameters are:

- `type=vocabulary|grammar|mixed` (default `mixed`)
- `mode=mixed|recognition|selection|recall` (default `mixed`)
- `limit=1..20` (default `10`, maximum `20`)
- optional `language=en|ja`
- optional standalone focus: `content_id`, with one non-mixed type and `limit=1`
- lesson context: `context=lesson&lesson_id=...`; otherwise context is `standalone`

The response contains a bounded array of `exercise_id`, `content_type`, `exercise_type`, prompt, optional safe detail, optional four plain-text choices, and context. It never contains a canonical answer, content ID, grading policy, or accepted variants before submission. Loading a session creates no session/exercise/progress row.

Modern practice submits:

```json
{
  "attempt_id": "client-generated-idempotency-key",
  "exercise_token": "opaque-authenticated-token",
  "answer": "visible choice text or typed answer"
}
```

The existing legacy `{attempt_id, content_type, content_id, answer}` shape remains supported for Phase 4C due-review compatibility. New practice clients cannot mix the two shapes or add authority fields.

After grading, feedback may expose `correct`, the submitted answer, canonical answer, content identity for an optional AI Tutor navigation handoff, exercise/context labels, current item progress, and SRS state. AI does not grade or write progress.

## Exercise types

Vocabulary:

- `vocabulary_recognition`: target lemma → four Chinese meanings.
- `vocabulary_meaning_to_word`: Chinese meaning → four target-language lemmas.
- `vocabulary_typed_recall`: Chinese meaning → conservative typed canonical lemma.

Grammar:

- `grammar_form_selection`: Chinese grammar title/purpose → four canonical forms.
- `grammar_controlled_completion`: an authored expression with one exact linked `displayed_form` replaced by a blank → four authored displayed forms.
- `grammar_form_recall`: Chinese title/purpose → conservative typed canonical form.

If four unambiguous unique choices cannot be produced, choice generation returns no exercise and the mode falls back to the next safe configured type. Controlled completion is never generated when the authored displayed form is absent or occurs more than once. Open-ended sentence generation is not used.

## Identity and tamper resistance

`exercise_id` is an AES-256-GCM authenticated, opaque compact token. Its key is SHA-256-derived with the scope `ej-learning:practice:v1` from `PRACTICE_SECRET`, or from the existing `AUTH_SECRET` when the dedicated binding is absent. Secrets never reach the browser.

The encrypted specification binds the authenticated user, content type and item, exercise type, exact prompt, choice set, canonical answer, normalization policy, and context type/ID. Submission rejects malformed/non-canonical encoding, modified ciphertext/tag, cross-user replay, unpublished/stale content, invalid lesson membership, invalid choice sets, and stale authored controlled-completion forms. No expiry is used because the Worker revalidates current canonical content at submission and returns `STALE_EXERCISE` after content changes. No exercise row is persisted.

## Normalization and accepted variants

All typed answers use Unicode NFC normalization, trim outer whitespace, and collapse internal whitespace runs to one ordinary space. English answers additionally use English case folding. Punctuation is not removed. Japanese does not case-fold or equate kanji, hiragana, katakana, or romaji. Tests explicitly demonstrate English surrounding whitespace/case acceptance and rejection of an unlisted inflection, plus rejection of kana for a kanji canonical answer.

There is no dedicated authored alternate-answer table in the current curriculum. Imported `inflections_json` describes morphology, not validated equivalence for the prompted lemma, so V1 does not treat those values as accepted answers. V1 accepts the canonical stored answer after the documented normalization only. The encrypted specification can later carry a reviewed accepted-answer array without changing the browser contract; no AI/synthetic variants were created.

## Distractor policy

Distractors are deterministic. Candidates must have the same language, be published, have non-empty answer text, and not duplicate normalized visible text. Vocabulary ranks the same part of speech first and then nearest stage; grammar ranks nearest level. Stable hashing supplies deterministic tie-breaking and final choice order. Synonym, near-synonym, related, commonly-confused, prerequisite, and similar non-contrast relations are excluded when relationship metadata is available. Exact duplicate meanings/forms and duplicate leading Chinese glosses are removed. The canonical answer is inserted exactly once. If four safe choices are unavailable, the engine falls back instead of displaying an ambiguous question.

## Attempts, SRS, and recommendations

Migration `0005_phase4e_practice_engine.sql` adds nullable `exercise_type`, `context_type`, and `context_id` columns to `learning_attempts`, with constrained known values, plus the partial lesson-evidence index `(user_id, context_id, content_type, content_id) WHERE context_type='lesson'`. Historical attempts remain unchanged and valid. No attempts/progress table is rebuilt.

One new graded answer still performs one `learning_attempts` insert. Existing SQLite triggers atomically perform the one item-level vocabulary/grammar progress and SRS upsert. An idempotent retry performs zero writes. Exercise types do not create separate progress or SRS rows and are retained only for future analysis. Recognition and recall both enter the existing unweighted result stream; no evidence-strength formula is introduced.

Phase 4D continues reading the same authoritative item progress and therefore benefits from broader evidence without any priority/classification change.

## Lesson practice and completion

Lesson sessions resolve the current persisted lesson bundle and use only its linked vocabulary/grammar items. They mix whatever safe exercise types the linked metadata can produce. Expressions are not counted as assessable items.

Completion policy:

```text
required_items = min(5, number of assessable linked vocabulary/grammar items)
required_attempts = required_items
eligible = attempts >= required_attempts
           AND unique attempted linked items >= required_items
```

Accuracy is not part of eligibility. A sparse lesson with one assessable item requires one attempt; a lesson with no assessable items remains completable. `POST /api/lessons/:id/complete` queries the authoritative ledger and returns HTTP 409 `LESSON_PRACTICE_REQUIRED` with completed/remaining evidence without mutating lesson progress when insufficient.

Every lesson token binds `context_type=lesson` and the exact lesson ID. The Worker rechecks that the content item belongs to that lesson before recording. Therefore an item attempted in standalone/review context, or for another lesson in a many-to-many relationship, gives no credit to the lesson being completed.

Existing `lesson_progress.status='completed'` records are returned idempotently with `grandfathered=true` before applying the new gate. Phase 4E never revokes them.

## UI, feedback, and accessibility

`/practice.html` is mobile-first and presents one question at a time, a visible exercise label, large choice targets, immediate deterministic feedback, next-question focus, and a final count/correct/wrong/accuracy summary. It contains no XP or synthetic mastery score. Wrong feedback includes learner and canonical answers plus a navigation-only “让 AI 解释” affordance using the existing safe item-context handoff.

Choice groups use `fieldset`/`legend`, native radio controls, explicit typed-input labels, keyboard navigation, visible focus, `role=status`/`aria-live`, and text plus border/icon-independent correctness wording. Japanese and long prompts use wrapping rules. Browser coverage targets 360, 390, 430, 768, and 1440 pixels.

## Write budget and operations boundary

- Session/question GET: zero writes.
- Graded answer: one attempt insert plus the existing trigger-driven progress/SRS update; context is stored in the same attempt row.
- Idempotent retry: zero writes.
- Failed lesson eligibility: zero writes.
- Successful lesson completion: the existing single lesson-progress upsert.

There are no exercise-generation, session, analytics-event, or accepted-variant rows. Phase 4E local work performs no remote D1 mutation, deployment, email, user creation, or main-branch merge.

## Fixture drift and future work

The fallback source bundle in `src/lesson-bundle-35d.js` contains the earlier 48-lesson path, while the current persisted Phase 3.5E.1C bundle and canonical staging schema expose 64 published lessons. Phase 4B/4D browser recommendation fixtures still claimed `available: 48`; Phase 4E updates those fixture values to 64 without changing production curriculum. Runtime lesson practice reads the persisted bundle when available and retains the audited fallback for resilience.

Phase 4F can add reviewed accepted variants and expression answer models, richer authored controlled-completion distractors, and evidence-strength analysis after real exercise-type data exists. It must not infer correctness from AI or automatically synthesize accepted variants.
