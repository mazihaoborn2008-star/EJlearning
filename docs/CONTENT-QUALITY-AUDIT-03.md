# Content Quality Audit 03 — Blocking Japanese Grammar Models

Date: 2026-09-15

Baseline: pushed `main` at `eebb0589d8b181188855779fd7d7abd1970da498`

Hotfix branch: `hotfix/content-quality-03`

Scope: four canonical grammar-model corrections and their sentence-local practice authority only. This hotfix does not implement the approved Stage 5 curriculum design.

## Outcome

- Keep `ja-n-desu-ga`, `ja-node`, `ja-honorific`, and `ja-humble` published, current, and eligible for form selection and recall.
- Replace the two mixed or open-class answer models with bounded canonical targets.
- Replace English structural metalanguage in `ja-n-desu-ga` and remove the unrelated `て-form` strategy from `ja-node`.
- Generate controlled completion only from an approved form that occurs exactly once in the authored sentence.
- Reject sealed pre-hotfix recall or completion tokens when they contain an obsolete canonical form or a whole-sentence broad answer.
- Preserve IDs, publication state, examples, lesson links, lesson requirements, attempts, progress, and SRS state.

## Root causes and canonical corrections

| Record | Root cause | Before | After |
|---|---|---|---|
| `ja-n-desu-ga` | English structural terminology was learner-facing, while noun and ナ-adjective joining was not represented in the form. Some legacy sentence links also carried more than the local completion occurrence. | `〜んですが`; formula `plain form + んですが` | `普通形 + んですが（N・ナ形 + なんですが）` |
| `ja-node` | One answer combined `ので` with the distinct て-form reason strategy. | `普通形 + ので / て-form` | `普通形 + ので（N・ナ形 + なので）` |
| `ja-honorific` | `おっしゃる / なさる 等` represented an open lexical class and could not be one recall answer. | `おっしゃる / なさる 等` | `言う → おっしゃる` |
| `ja-humble` | `いたす / 伺う 等` combined unrelated humble mappings into one broad answer. | `いたす / 伺う 等` | `する → いたす` |

The honorific usage now explicitly assigns the action to the respected customer or other party. The humble usage explicitly assigns the lowered action to the speaker or staff member.

## Practice authority

All four records have one bounded `form_name`, which remains the exact authority for form selection and typed recall. No alternate answers were added, and Japanese normalization remains NFC plus whitespace normalization only.

Controlled completion is separate from abstract form recall. Hotfix 03 derives the answer from an approved local occurrence that appears exactly once in the selected published sentence:

| Record | Current deterministic example | Local completion answer |
|---|---|---|
| `ja-n-desu-ga` | `行くつもりだったんですが、急に用事ができました。` | `んですが` |
| `ja-node` | `急なので、調整が難しいです。` | `なので` |
| `ja-honorific` | `おっしゃることはわかります。` | `おっしゃる` |
| `ja-humble` | `確認いたします。` | `いたします` |

Approved, uniquely authored inflections of `おっしゃる` and `いたす` can likewise be local authorities. A sentence with no approved occurrence, an occurrence repeated in the same sentence, an obsolete て-form reason link, or a different敬語 lexeme cannot produce authoritative completion for these records.

The Phase 4E grading comparison, normalization, answer sealing, and accepted-answer policy were not weakened. Resolution now additionally checks Hotfix 03 local authority for these four IDs. A pre-hotfix token containing an obsolete form or whole-sentence completion answer returns `STALE_EXERCISE` before attempt insertion. Existing idempotency continues to prevent duplicate ledger/progress writes.

## Current lesson impact

The compiled current bundle is unchanged:

| Record | Current lessons | Role |
|---|---|---|
| `ja-n-desu-ga` | `ja-s4-l4`, `ja-s5-l2` | required |
| `ja-node` | `ja-s5-l2`, `ja-s5-l4` | required |
| `ja-honorific` | none | unlinked |
| `ja-humble` | none | unlinked |

No `lesson_items`, `required_items`, prerequisite, lesson, expression, dialogue, or bundle row is changed. Current lessons remain completable under the existing Phase 4E requirement calculation. Practice-session GET remains read-only and the migration creates no learner progress.

## Overview policy

`35e1c-ja-workplace-register` and `35e1c-ja-condition-contrast` remain published/readable, overview-only, practice-ineligible, and excluded from weakness, review, and SRS authority. Hotfix 03 does not change either record or restore either overview to practice.

## Historical-data safety and migration scope

`migrations-content-quality-03/0001_content_quality_hotfix_03.sql` contains four targeted `UPDATE v2_grammar_points` statements, one per reviewed ID. It contains no `DELETE`, curriculum mutation, learner-state DML, bootstrap, or reseed.

Historical references remain queryable through the unchanged IDs in `learning_attempts`, `grammar_progress`, `lesson_progress`, lesson bundles, grammar examples, and sentence-grammar links. SRS fields stored in `grammar_progress` are not reset or rewritten.

## Stage 5 blocker resolution

The model corrections resolve the five `B` dispositions in the approved 240-link planning matrix at the canonical-model level:

1. JA slot 2: `ja-n-desu-ga`.
2. JA slot 2: `ja-node`.
3. JA slot 3: `ja-honorific`.
4. JA slot 3: `ja-humble`.
5. JA slot 5: `ja-node`.

No relationship was added, removed, or reclassified. Resolving these modeling blockers does not authorize or perform Stage 5 implementation.

## Remaining editorial dependencies

Stage 5 still requires its separately authorized implementation batch. That later work includes authoring the remaining 26 grammar examples, inserting the 40 approved vocabulary-example candidates, inserting the two expression contexts, creating the three new six-turn dialogues, applying the approved relationship/role matrix, creating lessons, and changing prerequisites with graph validation. None is part of this hotfix.

Other Audit 02 `NEEDS CONTENT REVIEW` candidates remain unchanged and are not silently treated as confirmed defects.

Within the reviewed Hotfix 03 scope, no P0 issue remains after local regression. Remaining P1 work is the separately scoped Stage 5 editorial production, matrix implementation authorization, and staging validation of this feature branch. Stage 5 is not implementation-ready merely because these five model blockers are resolved.

## Validation contract

- Focused deterministic regression: `tests/content-quality-hotfix-03.test.js`.
- Prior content hotfixes: `tests/content-quality-hotfix-01.test.js` and `tests/content-quality-hotfix-02.test.js`.
- Practice authority and stale-token coverage: Phase 4E plus focused Hotfix 03 tests.
- Current lesson completion and learner-state coverage: Phase 4C, 4D, 4E, and 4F suites.
- Baseline curriculum regression: `npm run test:35e1c`.
- Read-only Stage 5 matrix consistency: focused Hotfix 03 assertions against the approved matrix and unchanged compiled lesson bundle.

This hotfix does not modify remote D1 and does not deploy staging or production. Pushing the reviewed Git feature branch does not change either runtime environment.
