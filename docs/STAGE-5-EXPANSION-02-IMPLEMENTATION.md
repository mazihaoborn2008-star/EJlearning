# Stage 5 Expansion 02 implementation

## Approved immutable input

Implementation is generated from the human-approved Stage 5 matrix and final editorial payload without paraphrasing learner-facing text. The source gate rejects a changed payload hash, any changed cardinality, an authority state other than `HUMAN FINAL APPROVED`, any false `implementation_authorized` value, or any relationship/role disagreement between the matrix and payload.

| Input | SHA-256 |
|---|---|
| `docs/STAGE-5-EXPANSION-02A-APPROVAL-MATRIX.md` | `b66c6bc401500cafacd751375b75fb210ac3d533ff40aa414769005b2fe0a2a0` |
| `docs/STAGE-5-EDITORIAL-APPROVAL-02B.md` | `b171c21451e27de0d91854dfc797ef2d85f67f814de8098678ffc50a8ebcda18` |
| `docs/STAGE-5-EDITORIAL-02B-PAYLOAD.json` | `89b89d86bf2e7187ec437d85cd7141ef82e782cebd306c4a42a885a7e4490818` |

## Versioned source and migration

The deterministic path is:

`02A matrix + 02B JSON + curriculum-expansion-01a-v1 + Hotfix 03 runtime policy` → `scripts/stage5-expansion-02.js` → `scripts/generate-stage5-expansion-02.js` → `migrations-stage5-expansion-02/0001_stage5_expansion_02.sql`.

The generated immutable identifiers are:

- bundle: `curriculum-stage5-expansion-02-v1`
- schema: `CURRICULUM-STAGE5-EXPANSION-02`
- dataset marker: `2026-09-stage5-expansion-02-v1`

The migrations use stable IDs plus `INSERT OR IGNORE`. The first creates a separate grammar-example completion-authority table and expression-context version table, adds the approved examples/context versions, and inserts one new bundle row. The second deterministically projects the versioned bundle's eight new lessons, exact current titles/objectives/order, and prerequisite replacements into the current `lesson_units`/`lesson_prerequisites` index required by the existing progress foreign key. Neither edits `curriculum-expansion-01a-v1`, any historical migration or bundle, learner progress, attempts, SRS state, or settings. Applying them twice leaves one copy of every new example, authority row, context version, lesson, edge, and bundle.

The registered future update config points only to `migrations-stage5-expansion-02`; it cannot replay bootstrap, Expansion 01, or Hotfix 03. Normal Worker deployment remains schema-only and does not apply curriculum migrations.

## Lessons and graph

The bundle grows from 64 to 72 lessons and from 62 to 70 prerequisite edges. It has exactly two roots (`en-s1-l1` and `ja-s1-l1`), is fully reachable and acyclic, and contains no missing or cross-language prerequisite.

Production IDs added:

- English: `en-s5-02-tradeoffs`, `en-s5-03-consensus`, `en-s5-06-repair`, `en-s5-08-reporting`
- Japanese: `ja-s5-03-formal-role`, `ja-s5-06-repair`, `ja-s5-07-consensus`, `ja-s5-08-benefit`

The final English chain is `en-s4-l6 → en-s5-l1 → en-s5-02-tradeoffs → en-s5-03-consensus → en-s5-l2 → en-s5-l3 → en-s5-06-repair → en-s5-l4 → en-s5-08-reporting → en-s6-l1`.

The final Japanese chain is `ja-s4-l6 → ja-s5-l1 → ja-s5-l2 → ja-s5-03-formal-role → ja-s5-l3 → ja-s5-l4 → ja-s5-06-repair → ja-s5-07-consensus → ja-s5-08-benefit → ja-s6-l1`.

All 16 approved Chinese titles, target-language titles, and Chinese objectives are copied exactly from 02B. Existing IDs are retained; Stage 5 sequences are 1–8 in each language. The exact revised Japanese target titles are `限界を示しつつ、改まった場面で判断を述べる` and `背景を説明し、相手に配慮して依頼する`.

## Exact Stage 5 composition

Each of the 16 slots has exactly 8 vocabulary, 3 assessable grammar, and 4 expression relationships. Final totals are:

| Measure | EN | JA | Combined |
|---|---:|---:|---:|
| Relationships | 120 | 120 | 240 |
| Vocabulary | 64 | 64 | 128 |
| Grammar | 24 | 24 | 48 |
| Expressions | 32 | 32 | 64 |
| NEW | 53 | 51 | 104 |
| REVIEW | 40 | 42 | 82 |
| SUPPORT | 27 | 27 | 54 |

Compared with the previous current bundle, 103 Stage 5 relationships are retained, 137 are added (73 vocabulary / 28 grammar / 36 expression), and the exact 19 reviewed `DO NOT ADD` relationships are omitted only from this new bundle (10 EN / 9 JA). Net growth is +59 EN, +59 JA, +118 combined. `en-c-1001` is absent from final Stage 5, while its canonical vocabulary record remains unchanged.

Global bundle relationships move from 958 raw / 953 runtime-active to 1,076 raw / 1,071 runtime-active. The raw/runtime difference remains exactly five archived greeting grammar links; historical raw evidence is not deleted.

## Canonical editorial delta and practice

The migration adds, without overwriting prior examples:

- 40 exact vocabulary examples across 40 records (24 EN / 16 JA)
- 39 exact grammar examples across 13 records, three additions per record
- two versioned expression contexts for `legacy-108-en` and `legacy-156-ja`, without changing canonical expression text

Canonical identities remain EN vocabulary 10,000, JA vocabulary 8,235, grammar 83 EN / 98 JA historical and 82 EN / 97 JA published, and 713 expressions. No vocabulary, grammar, or expression ID is added.

Grammar-example authority preserves exactly 28 `CC SAFE` and 11 `NOT FOR CC` decisions. Safe rows store the exact approved answer and exact sentence offset; this is necessary for the approved Japanese `か` example, whose sentence also contains lexical `か` inside `わかりません`. Practice generation reads only `CC SAFE` rows and revalidates the exact offset when resolving the opaque exercise. `NOT FOR CC` rows remain teaching examples but cannot be selected as controlled-completion authority. No accepted-answer set is broadened.

Hotfix 03 remains exact for `ja-n-desu-ga`, `ja-node`, `ja-honorific`, and `ja-humble`. The two overview records `35e1c-ja-workplace-register` and `35e1c-ja-condition-contrast` remain published/readable and practice-ineligible.

Every final lesson has 11 assessable items and `required_items = 5`. Deterministic opportunity estimates are 33 except EN8, which has 32 because reported statements intentionally has no safe controlled completion. Expressions remain non-authoritative context content.

## Dialogue, scenario, and reuse assets

The bundle carries three exact new six-turn lesson dialogues (EN3, JA3, JA7), three prompt-only reuse layers (EN6, JA6, JA8), and two short scenarios (EN2, EN8). These are lesson assets rather than new canonical expressions, so the 713-expression identity count is unchanged. Reuse rows contain canonical references and prompts only; no dialogue is copied.

JA3 keeps the customer as owner of the saying action reported by staff with `おっしゃる`, and staff as owner of both `いたす` actions. The UI renders embedded newlines as structured lines and never emits literal `<br>` content. Chinese turn translations, speaker roles, scenarios, and reuse prompts are serialized as supported public lesson data. Authorization states, review rationale, CC answers, and other editorial-only metadata are not returned by the lesson API.

## Learner-state and recommendation policy

The migration contains no learner-state DML. It cannot create attempts, lesson/vocabulary/grammar progress, SRS rows, settings, or evidence. Lesson, dashboard, recommendation, and practice-session GET paths remain zero-write.

Historical completed lessons stay completed because completion is never recalculated. Existing in-progress rows, saved section, attempts, and evidence remain unchanged; the current expanded composition becomes visible through the normal latest-bundle rule without restarting the row. The same canonical item reused in multiple lessons remains one `(user_id, canonical_id)` progress/SRS identity, with no migration change to review stage, count, lapses, next review, or interval.

Recommendation priority remains `review_due → continue_lesson → start_next_lesson → all_complete`. Instructional role is display/authored metadata only and has no weighting. Existing Stage 6 in-progress lessons retain `continue_lesson` priority. Once a learner has any Stage 6 progress evidence, the next eligible recommendation stays in Stage 6; a learner with no Stage 6 evidence must complete the new Stage 5 chain. Preferred-language paths remain isolated.

## Local regression evidence

Focused tests validate payload immutability, matrix equality, all exact counts/deltas, canonical resolution/publication/language, graph properties, learner grandfathering, migration idempotence, API privacy, zero-write GETs, CC exercise behavior, Hotfix bounds, dataset policy, and non-replay deployment config.

Browser validation covers the eight requested representative lessons at 360, 390, 430, 768, and 1440 pixels. It verifies no horizontal overflow, title wrapping, all 15 relationships rendered once, role labels, examples/content cards, six-turn dialogue structure and Chinese translations, scenarios, prompt layers, practice CTA, and absence of raw `<br>` artifacts.

The complete local regression set passed: `test:stage5-expansion-02`, `test:35e1c`, `test:content-quality`, `test:curriculum-expansion-01`, and `test:4f` (including Phase 4E, 4D, 4C, 4B, 4A, Phase 3.6, staging deployment-policy, and all associated browser suites).

## Future staging activation boundary

No remote D1 command or staging/production deployment was run. After separate staging authorization, activation requires checking the persistent staging dataset marker, applying the reviewed update through `wrangler.stage5-expansion-02.jsonc` (the policy-driven `curriculum:staging:update` path), verifying the marker exactly once, then deploying and executing the same focused/API/browser audits against staging. Bootstrap must not be used for this update.
