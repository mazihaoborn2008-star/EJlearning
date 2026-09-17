# EJ Learning — Content Quality Hotfix 04 Implementation

**Target:** `en-would-like`

**Human authority:** Option C — mode-specific authority restriction

**Implementation posture:** local implementation and Git feature branch only; no remote D1 access and no deployment

## 1. Review authority and starting revision

The authorizing review is `docs/PRE-PRODUCTION-EN-WOULD-LIKE-REVIEW-01.md`.

- review-document commit: `1e17406b36e30798cda9995255c6b10354b04ad8`
- synchronized pre-hotfix `main`: `1e17406b36e30798cda9995255c6b10354b04ad8`
- feature branch: `hotfix/content-quality-04-en-would-like`
- feature starting HEAD: `1e17406b36e30798cda9995255c6b10354b04ad8`
- release remains `curriculum-stage6-expansion-03-v1`
- schema remains `CURRICULUM-STAGE6-EXPANSION-03`
- dataset marker remains `2026-09-stage6-expansion-03-v1`

This is a one-record content-authority hotfix, not a curriculum release.

## 2. Preserved identity and inventory

The implementation preserves:

- canonical ID `en-would-like`;
- publication state, language, level, and register;
- the single active relationship at `en-s1-l2`, content type `grammar`, role `support`, required false;
- all nine grammar-example texts;
- all seven sentence-grammar links;
- historical `learning_attempts`;
- the `(user_id, grammar_id)` grammar-progress/SRS identity and all scheduling fields;
- lesson progress, evidence, and completion;
- weakness and recommendation identity.

The current active Stage 6 bundle has no `en-would-like` relationship. No relationship or bundle is changed by Hotfix 04.

The nine examples remain teaching evidence with the exact construction inventory:

- plain LIKE: 0
- WOULD LIKE: 6
- WOULD LOVE: 1
- WOULD PREFER: 2
- OTHER: 0

## 3. Canonical metadata before and after

| Field | Before | After |
|---|---|---|
| Title | `礼貌愿望与邀请` | `would like / would love / would prefer：礼貌愿望、邀请与偏好（对比）` |
| Form label | `would like / love / prefer` | `would like / would love / would prefer（对比）` |
| Formula | `would like / love / prefer + noun / to-infinitive` | `would like + noun / to + V / person + to + V; would love + to + V; would prefer + noun / to + V` |
| Core | one undifferentiated polite-wish/invitation label | explicitly distinguishes the three non-equivalent `would` constructions |
| Purpose | one undifferentiated polite-wish/invitation label | recognize different communicative functions without treating the forms as synonyms |
| Use/nuance | noted different force but retained one productive slash answer | assigns polite desire/offer/invitation, enthusiastic willingness/desire, and relative preference separately |
| Assessment usage | implicit productive authority | explicit closed-choice contrast overview; no typed recall or completion |

The full approved after-state is defined once in `src/content-quality-04.js` and mirrored exactly by the forward-only migration.

## 4. Practice-authority representation

`src/content-quality-04.js` layers one deterministic policy over the existing Hotfix 01–03 exports:

```text
en-would-like
  allowed_exercise_types: [grammar_form_selection]
  controlled_completion: NOT FOR CC
  legacy_cc_fallback: false
  typed_recall: false
  tokenless_grading: false
```

The record remains current, published, and practice eligible. It is not converted into a Hotfix 02 overview-only record because safe contrast recognition remains useful.

The policy helpers are consulted by generation, controlled-completion entry, sealed-token resolution, and tokenless grading. Records without a specific authority entry retain their existing modes.

## 5. Exact route behavior

| Route/context | Hotfix 04 behavior for `en-would-like` |
|---|---|
| standalone recognition | `grammar_form_selection` |
| standalone public selection | directly `grammar_form_selection`; CC is not attempted |
| direct targeted recall | no compatible exercise; response contains an empty data list |
| mixed session | `grammar_form_selection` whenever this item is materialized |
| lesson session | `grammar_form_selection`, including when the broader session requests recall |
| weakness session | retains the weakness item and materializes `grammar_form_selection` |
| due SRS review | retains the due identity; the subsequent practice materialization is `grammar_form_selection` |
| tokenless grammar attempt | rejected with the established `CONTENT_NOT_FOUND` response before any learner write |

The allowed answer is the exact visible choice `would like / would love / would prefer（对比）` under `choice_exact`. The slash label is not expanded into typed alternatives.

## 6. Legacy CC path closure

Before the hotfix, generic `mode=selection` requested controlled completion first. With no explicit completion review for this record, `controlledCompletion()` queried published sentence links and promoted their `displayed_form` values to exact answers.

Hotfix 04 closes this path at three boundaries:

1. per-record materialization converts the allowed request set directly to `grammar_form_selection`;
2. `controlledCompletion()` rejects a disallowed record before querying explicit authority or legacy links;
3. the resolver rejects any sealed `grammar_controlled_completion` for the record as stale.

All seven historical links remain stored. The three whole-sentence values and four `I’d like` values are all non-authoritative. No example, expression, or link is deleted.

The canonical chain still has zero explicit CC authority rows and zero explicit completion-review rows for this record. The source policy supplies the record-level `NOT FOR CC` decision.

## 7. Recall and tokenless grading closure

`grammar_form_recall` is not an allowed exercise type for this record. A direct targeted recall request produces no exercise. Broader sessions that must continue—lesson, mixed, weakness, and review materialization—use the approved closed-choice selection instead.

The legacy attempt route now distinguishes tokenless from sealed attempts. A tokenless request for `en-would-like` is rejected before canonical-answer lookup and therefore cannot grade either the old slash string or the new contrast label. Valid post-hotfix sealed form-selection attempts continue through the unchanged grading and SRS triggers.

## 8. Stale sealed exercises

`resolvePracticeExercise()` rechecks current per-record authority after opening a token. Cryptographic validity alone is insufficient.

- old `grammar_form_recall`: `STALE_EXERCISE`;
- old whole-sentence `grammar_controlled_completion`: `STALE_EXERCISE`;
- old short `I’d like` controlled completion: `STALE_EXERCISE`;
- old `grammar_form_selection` with the former title/prompt or answer label: `STALE_EXERCISE`;
- current selection with the approved prompt, answer, and `choice_exact` policy: valid.

The existing attempt endpoint maps stale resolution to HTTP 409. Resolution occurs before insert, so stale submissions create no attempt, progress, lesson, SRS, or weakness mutation.

## 9. Learner and SRS preservation

The migration updates only the `en-would-like` row in `v2_grammar_points`. It contains no insert, delete, identity replacement, curriculum mutation, or learner-table DML.

Focused fixtures seed a historical unsafe attempt, completed lesson progress, and non-default grammar SRS values for:

- attempts and correct/wrong counters;
- correct streak and last result;
- first/last seen and correct/wrong timestamps;
- review stage and review count;
- lapse count;
- last reviewed and next review timestamps;
- current interval.

Byte/value-equivalent snapshots are asserted before and after migration. Applying the metadata migration a second time produces the same semantic database state. A new correct safe-selection attempt continues to use the ordinary SRS policy without replacing or resetting the grammar identity.

## 10. Migration strategy

`migrations-content-quality-04/0001_content_quality_hotfix_04.sql` is a forward-only, one-row metadata update.

It does not alter:

- examples or sentence links;
- completion-authority tables;
- lesson bundles, items, prerequisites, or release markers;
- attempts, progress, SRS, lesson progress, users, auth, or settings.

The runtime policy is source-controlled rather than persisted in a new D1 table. This is the smallest mechanism because the exception applies to exactly one ID and must be available before legacy fallback and during sealed-token resolution. No new schema is required.

Local migration verification uses both a fresh D1-compatible SQLite reconstruction of the full canonical migration chain and a fresh Wrangler local D1 fixture. Each applies Hotfix 04 and reapplies it, then checks exact metadata, one record, nine examples, seven links, zero CC authorities, the active one-lesson relationship, and unchanged learner snapshots. The Wrangler check retained the seeded attempt, completed lesson, and non-default SRS values (`review_stage=4`, `review_count=8`, `lapse_count=2`, `next_review_at=1900`, interval `86400`) after both applications.

## 11. Focused and regression validation

Focused command:

- `npm run test:content-quality:04` — 8/8 tests passed.

Aggregate required commands:

- `npm run test:content-quality` — 21/21 tests passed.
- `npm run test:stage6-expansion-03` — 7/7 unit tests plus browser fixture passed; Stage 6 remains 38 CC SAFE / 22 NOT FOR CC.
- `npm run test:stage5-expansion-02` — 9/9 unit tests plus browser fixture passed.
- `npm run test:curriculum-expansion-01` — 7/7 unit tests plus browser fixture passed.
- `npm run test:35e1c` — 4/4 API tests and browser suite passed against the expected local port 8814 server.
- `npm run test:4f` — passed, including Hotfix 01–04, Phase 4E/4D/4C/4B/4A, Phase 3.6 API/browser, learner experience, return target, and browser suites against the expected local port 8816 server.

Focused coverage includes:

- exact canonical model and inventory;
- direct recognition, selection, and recall;
- lesson, mixed, weakness, due-review, and recommendation behavior;
- all seven legacy sentence links;
- stale recall, whole-sentence CC, short CC, and old selection tokens;
- tokenless rejection with zero writes;
- post-hotfix selection grading and SRS scheduling;
- public-payload privacy;
- migration scope, preservation, and semantic idempotence;
- no policy changes for unrelated IDs.

## 12. API privacy

Public practice payloads continue to omit the sealed answer, grading policy, content ID, and internal authority fields. Only the normal visible multiple-choice options expose the selectable label. Stale responses use the existing generic `STALE_EXERCISE` message and do not disclose which internal authority check failed. User binding and cross-user token protection are unchanged and covered by the inherited Phase 4E/4F regressions.

## 13. Production content-gate effect

After this feature branch is applied to staging and the same migration/runtime checks pass there:

- remaining P0: 0
- remaining P1: 0
- content ready for production: **YES**

P2/P3 enrichment remains non-blocking and is intentionally absent from this hotfix.

## 14. Future staging-validation boundary

This local implementation does not authorize staging mutation or deployment. A separate staging-validation task must:

1. capture remote read-only counts and learner-state samples for `en-would-like`;
2. back up the persistent staging D1 under the established data policy;
3. apply only the reviewed Hotfix 04 metadata migration and deploy the reviewed runtime commit;
4. confirm the one canonical row, nine examples, seven links, one active lesson relationship, zero CC authority, and unchanged learner/SRS state;
5. exercise recognition/selection and stale-token behavior without using real learner data;
6. rerun staging privacy, practice, lesson, recommendation, and SRS checks.

Until that separately authorized work completes, the correct status is **ready for Hotfix 04 staging validation**, not deployed.
