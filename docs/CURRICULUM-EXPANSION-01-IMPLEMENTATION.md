# Curriculum Expansion 01A implementation

## Scope and source

This change implements only the human-approved rows in `docs/CURRICULUM-EXPANSION-01A-MATRIX.md` for the 16 named Stage 2–4 supplemental lessons. Rows whose status contains `DEFERRED — REMOVED FROM 01A` remain documentary history and are not present in the new bundle. No lesson or canonical vocabulary, grammar, expression, example, accepted answer, distractor, or expression text is added or edited.

The reproducible source path is:

`CURRICULUM-EXPANSION-01A-MATRIX.md` + immutable `phase-35e1c-v2` payload → `scripts/curriculum-expansion-01.js` → `curriculum-expansion-01a-v1`.

`npm run generate:curriculum-expansion-01` verifies the matrix and generates the immutable additive migration. The gate stops unless it finds 240 reviewed rows, 232 approved rows, 127 exact existing relationships, and 105 exact additions.

## Bundle, migration, and roles

The new bundle ID is `curriculum-expansion-01a-v1`, with schema version `CURRICULUM-EXPANSION-01A`. It is stored as one new `lesson_bundles` row; historical bundles and migrations are unchanged. `INSERT OR IGNORE`, the bundle primary key, the immutable generator check, and D1's migration ledger make reapplication safe and keep the marker exact-once. The `lessons` dataset marker advances to `2026-09-expansion-01a-v1` / `bundle:curriculum-expansion-01a-v1`, with the reviewed delta config registered for a later explicitly authorized staging update and no change to the 64-lesson count.

Lesson-item tuples gain a seventh, backward-compatible `instructional_role` field. All 232 target relationships author exactly one of `NEW`, `REVIEW`, or `SUPPORT` (158 / 31 / 43). Existing six-column bundles decode the missing value as `null`. The existing transport `role` and `required` fields are preserved for all current relationships; additions use non-required `support` transport. Instructional role does not affect assessment, completion, recommendation weighting, or SRS.

The lesson API serializes `instructional_role`. The lesson UI renders compact `新内容`, `复习`, and `辅助` labels, including the dialogue card, while falling back to the historical transport label for old bundles.

## Exact link delta

| Language | Vocabulary | Grammar | Expressions | Total |
|---|---:|---:|---:|---:|
| English | +22 | +6 | +23 | +51 |
| Japanese | +24 | +7 | +23 | +54 |
| Total | +46 | +13 | +46 | +105 |

Target relationships increase from 127 to 232. The other 48 lessons retain byte-equivalent six-field composition. In particular, the implementation includes `ja-c-663 → ja-s3-l5` as `SUPPORT` and `legacy-167-ja → ja-s3-l7` as `NEW`.

The following relationships are proven absent: `en-c-969 → en-s2-l5`, `35e1c-en-v089 → en-s3-l7`, `ja-c-971 → ja-s2-l5`, `en-present-perfect → en-s3-l6`, `en-not-quite → en-s3-l8`, `ja-indirect-ka → ja-s3-l8`, `legacy-52-en → en-s4-l5`, and `legacy-76-ja → ja-s2-l5`.

## Final density and practice readiness

Opportunity estimates use three deterministic vocabulary modes, two grammar form modes, and one additional controlled-completion opportunity where the matrix records `CC yes`. Expressions are not assessed. Hotfix 02's shared policy excludes overview grammar.

| Lesson | V/G/E | Assessable | Approx. opportunities | Required items |
|---|---:|---:|---:|---:|
| en-s2-l5 | 7/3/4 | 10 | 29 | 5 |
| en-s3-l5 | 8/3/4 | 11 | 32 | 5 |
| en-s3-l6 | 8/2/4 | 10 | 29 | 5 |
| en-s3-l7 | 7/3/4 | 10 | 29 | 5 |
| en-s3-l8 | 8/2/4 | 10 | 30 | 5 |
| en-s3-l9 | 8/3/4 | 11 | 31 | 5 |
| en-s4-l5 | 8/3/3 | 11 | 31 | 5 |
| en-s4-l6 | 8/3/4 | 11 | 32 | 5 |
| ja-s2-l5 | 7/3/3 | 10 | 30 | 5 |
| ja-s2-l6 | 8/3/4 | 11 | 33 | 5 |
| ja-s3-l5 | 8/3/4 | 10 | 29 | 5 |
| ja-s3-l6 | 8/3/4 | 11 | 32 | 5 |
| ja-s3-l7 | 8/3/4 | 10 | 29 | 5 |
| ja-s3-l8 | 8/2/4 | 9 | 26 | 5 |
| ja-s4-l5 | 8/3/4 | 11 | 31 | 5 |
| ja-s4-l6 | 8/3/4 | 9 | 27 | 5 |

`35e1c-ja-condition-contrast` and `35e1c-ja-workplace-register` remain visible, non-assessable overviews. `35e1c-ja-counter-system` remains assessable. Consequently every target lesson still satisfies `required_items = min(5, assessable linked vocabulary/grammar) = 5` without filler.

## Required supplemental chain

Exactly six prerequisite edges are replaced:

| Lesson | Previous prerequisite | New prerequisite |
|---|---|---|
| en-s3-l1 | en-s2-l4 | en-s2-l5 |
| en-s4-l1 | en-s3-l4 | en-s3-l9 |
| en-s5-l1 | en-s4-l4 | en-s4-l6 |
| ja-s3-l1 | ja-s2-l4 | ja-s2-l6 |
| ja-s4-l1 | ja-s3-l4 | ja-s3-l8 |
| ja-s5-l1 | ja-s4-l4 | ja-s4-l6 |

The resulting 64-lesson graph has one root per language, no cycle, missing prerequisite, cross-language edge, or unreachable lesson. These authored edges are the only recommendation-path input changed; the `review_due → continue_lesson → start_next_lesson → all complete` ordering is unchanged.

## Learner-state and canonical safety

The migration writes only the versioned bundle row. It cannot create or update lesson progress, attempts, vocabulary/grammar progress, SRS data, settings, timezone data, or AI state. GET behavior remains zero-write. Existing completed lessons remain grandfathered by the existing completion code; no historical completion is recalculated or reset. New and incomplete flows resolve the latest bundle under the existing current-bundle policy.

Canonical integrity remains: vocabulary EN 10,000 / JA 8,235; historical grammar EN 83 / JA 98; published grammar EN 82 / JA 97; expressions 713; lessons 64. The focused regression resolves every addition to a published, same-language canonical record and proves canonical counts are unchanged after applying the migration twice.

## Deliberately deferred debt

One-example vocabulary depth remains documented for later human editorial work; no example was invented. Duplicate grammar prose fields and legacy expressions without standalone context remain separate editorial debt. The eight deferred candidates, broader Content Quality Audit 02 review list, Stage 5/6 composition, and Expansion 02 are outside this change.
