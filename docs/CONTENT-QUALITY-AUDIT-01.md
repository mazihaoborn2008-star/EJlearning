# Content Quality Audit 01

Date: 2026-09-14

Baseline: `main` at `efaab84876d3ea629ede026a3fd05b7495b63745`

Scope: local content/modeling hotfix only; no curriculum expansion, deployment, or remote D1 write.

## Outcome

- Corrected the Japanese invitation record `ja-masen-ka` to the learner-facing structure `Vます → Vませんか` and added a direct Chinese explanation of the transformation.
- Reclassified `ja-greeting` and its exact English analogue `en-greeting` as expression categories, not grammar. Both IDs are archived rather than deleted.
- Removed those two IDs from current lesson grammar composition, new grammar practice, weakness practice, and current review counts through an explicit authored ID policy.
- Preserved the expression records that already teach greetings, thanks, introductions, and social formulae.
- Corrected every high-confidence learner-facing `干`/raw `stem` anomaly found in the current English/Japanese grammar corpus (13 records total).
- Suppressed exact duplicate semantic paragraphs in the grammar detail and lesson-detail renderers. This does not deduplicate examples or merely similar prose.

## Exact reported records and source of truth

### Japanese invitation

- Content ID: `ja-masen-ka`
- Historical authoring input: `scripts/grammar-35c.js` (`masen-ka` row)
- Canonical table: `v2_grammar_points`
- Historical canonical creation: `migrations-35c/0011_curriculum.sql`
- Curated examples: `migrations-35e1a/0001_core_grammar_curated_examples.sql`
- Example-target audit metadata: `migrations-35e1a1/0001_curated_grammar_example_target_roles.sql`
- Current reviewed delta source: `src/content-quality-01.js`
- Current additive data migration: `migrations-content-quality-01/0001_content_quality_hotfix_01.sql`

The malformed value was authored as `ます干 + ませんか` and then copied into both `form_name` and `formula`; later target-audit rationales copied the same label. It was therefore a source-content problem, not an HTML-only problem.

Current lesson links in the active `phase-35e1c-v2` bundle:

- `ja-s1-l2` — support grammar
- `ja-s6-l4` — required grammar

Current expression links:

- `c-gl-1669` → `legacy-61-ja` (`家事の分担を一度見直しませんか。`)
- `c-gl-2228` → `legacy-150-ja` (`一緒にお昼を食べませんか。`)
- `35e1b-ja-x-alternative-split-work-gl1` → `35e1b-ja-x-alternative-split-work-expr` (`ませんか`)

The eight canonical/curated examples remain unchanged and grammatical. They include `食べませんか`, `見ませんか`, `休みませんか`, and `歩きませんか`, consistent with the new displayed transformation.

Exact fix:

- `form_name`: `Vます → Vませんか`
- `formula`: `Vます → Vませんか`
- `core_zh`: `把动词ます形中的「ます」替换为「ませんか」，用于礼貌地邀请对方。`
- `purpose_zh`: `礼貌地邀请对方一起做某事。`

### Formulaic social responses

- Reported content ID: `ja-greeting`
- Additional exact analogue: `en-greeting`
- Historical authoring input: `scripts/migration-decisions-35c.js` (`supplementalGrammar` rows)
- Canonical table: `v2_grammar_points`
- Historical canonical creation: `migrations-35c/0011_curriculum.sql`
- Expanded examples: `migrations-35e1a/0001_core_grammar_curated_examples.sql`
- Target-role metadata: `migrations-35e1a1/0001_curated_grammar_example_target_roles.sql`
- Lesson composition artifact: persisted `phase-35e1c-v2` bundle and fallback `src/lesson-bundle-35d.js`
- Current classification policy and reviewed delta: `src/content-quality-01.js` and `migrations-content-quality-01/0001_content_quality_hotfix_01.sql`

Root cause: a pragmatic collection (greeting, thanks, well-wishing, apology response) was imported into `v2_grammar_points`. Its category label was assigned to `form_name`/`formula`, making all published grammar automatically eligible for `grammar_form_selection` and `grammar_form_recall`. The authoritative grader correctly compared against the invalid stored canonical answer.

Historical active-bundle grammar links removed at runtime:

- `ja-greeting`: `ja-s1-l1`, `ja-s1-l2`
- `en-greeting`: `en-s1-l1`, `en-s1-l2`, `en-s6-l3`

The IDs and their dependent rows are retained with `publication_state='archived'`. No examples or sentence-grammar links are deleted.

## Existing expression representation

The lesson concept already has expression content, so no curriculum was generated. Relevant Japanese records include:

- `lesson-ja-greeting-ex` — `おはようございます。`
- `legacy-17-ja` — `おはよう。`
- `legacy-153-ja` — dialogue containing `初めまして。`
- `legacy-149-ja` — `どうもありがとう。`
- `lesson-ja-te-kureru-ex` — `気にかけてくれてありがとう。`
- `legacy-113-ja` — `お大事に。`

The exact expanded strings `こんにちは。今日は暑いですね。`, `初めまして。山田と申します。`, and `どうもありがとうございます。` remain as curated grammar-example rows under the archived historical ID. Equivalent lesson concepts are already represented by published expression rows; those exact expanded examples should be migrated into first-class expression records only as separately reviewed curriculum work, not invented in this hotfix.

English lessons likewise already use `Morning!`, `Thanks a lot.`, `No worries.`, and `Thanks for the invitation.` as expression content.

## Practice eligibility audit

Before the hotfix, Phase 4E treated every published grammar row as eligible. The current local canonical database contained 181 published grammar rows (83 English, 98 Japanese). Every form was checked for category-only labels, topic descriptions, explanation sentences, unrelated category lists, and non-producible answer keys.

Invalid authoritative-answer records found:

1. `ja-greeting` — `固定问候 / 感谢 / 祝愿`
2. `en-greeting` — `greeting / thanks formula`

No other current form met those invalid-answer criteria. After archiving the two records, 179 published grammar rows remain (82 English and 97 Japanese).

The primary eligibility fix is canonical classification (`archived`). `src/content-quality-01.js` also supplies an explicit, deterministic ID policy used by lesson composition, practice pools, and review-summary counts. This is defense in depth for a stale content snapshot; it is not a text heuristic and AI does not decide eligibility. Authoritative grading and normalization were not weakened.

Regression coverage proves the former records cannot produce form recall or selection in standalone or lesson practice, and stale historical progress remains stored without re-entering weakness/review practice.

## Duplicate-field audit

The reported repeated “核心感觉” was caused by two distinct canonical columns (`core_zh` and `purpose_zh`) containing identical imported text; the UI rendered both as designed. In the pre-hotfix current corpus:

- 134 of 181 published records had identical `title_zh`, `core_zh`, and `purpose_zh`.
- 132 of 181 had identical `when_zh`, `mistakes_zh`, and `nuance_zh`.

The renderers now omit a paragraph/section only when its full text is exactly identical to an already displayed semantic field. Legitimate repeated examples are untouched. The invitation source fields were separately corrected to distinct, useful content.

This broad duplication is import-era content-depth debt. Authoring genuinely distinct explanations, mistakes, and nuances for 100+ records requires human editorial work and is outside a high-confidence terminology hotfix.

## Other high-confidence terminology corrections

The audit found 12 records containing learner-facing `干` and one containing raw English `stem`. All were corrected:

| Content ID | Old learner-facing notation | New notation |
| --- | --- | --- |
| `ja-polite-negative` | `ます干 + ません` | `Vます → Vません` |
| `ja-polite-past` | `ます干 + ました` | `Vます → Vました` |
| `ja-copula` | `noun / な-adjective stem + です` | `名词 / な形容词 + です` |
| `ja-sou` | `verb ます干 + そうだ` | `Vます → Vそうだ` |
| `ja-tai` | `ます干 + たい` | `Vます → Vたい` |
| `ja-mashou` | `ます干 + ましょう` | `Vます → Vましょう` |
| `ja-masen-ka` | `ます干 + ませんか` | `Vます → Vませんか` |
| `ja-hajimeru` | `ます干 + 始める` | `Vます → V始める` |
| `ja-hearsay-sou` | prose saying `不用ます干` | explicit contrast with `普通形 + そうだ` |
| `ja-zaru-wo-enai` | `ない干 + ざるを得ない` | `Vない（去掉「ない」）+ ざるを得ない` |
| `ja-kanenai` | `ます干 + かねない` | `Vます → Vかねない` |
| `ja-polite-present` | `ます干 + ます` | `Vます` |
| `ja-honorific-request` | `お + ます干 + ください` | `お + Vます（去掉「ます」）+ ください` |

Copied audit/explanation/link metadata containing the same malformed terminology is updated by the additive migration. Historical migration files and old generated audit snapshots remain immutable historical evidence.

## Needs content review

No additional grammar form was ambiguous enough to list as an invalid authoritative answer after the two greeting-category records were removed.

Human editorial follow-up is still warranted for the import-era duplicate semantic fields described above. Those records are not automatically rewritten because identical placeholder prose does not provide enough evidence to invent separate core, purpose, mistake, and nuance explanations. This is a bulk editorial-depth issue, not a claim that all affected grammar forms are invalid.

## Historical attempts, progress, and SRS

The data migration updates parent content fields and publication state only. It performs no `DELETE`, changes no primary key, and does not touch:

- `learning_attempts`
- `grammar_progress`
- SRS stage, lapse, interval, or schedule columns
- lesson completion/progress rows

Existing evidence referencing `en-greeting` or `ja-greeting` remains queryable. New library, lesson, practice, weakness, and review-queue paths exclude the archived grammar records. Review summary counts explicitly ignore those two retired IDs so preserved due rows cannot create a ghost “review due” action.

Before a future staging application, run read-only counts for both IDs in `learning_attempts` and `grammar_progress`, back up the persistent D1, apply the reviewed additive migration once, and verify: both parent IDs still exist as archived; dependent-row counts are unchanged; current lesson/practice APIs omit both IDs; and no due-review action is produced solely by either ID. Remote execution was intentionally not performed in this task.

## Curriculum depth

Manual use correctly reveals that some lessons/stages have relatively few grammar items, expressions, and exercises. This hotfix did not add stages, lessons, grammar, expressions, examples, or generated curriculum. Curriculum-depth planning remains separate follow-up work requiring human editorial scope.

## Verification plan/results

- Focused content/migration/practice unit regressions.
- Phase 4B, 4C, 4D, 4E, and 4F suites.
- Current Phase 3.6 API/browser suite inherited by those commands.
- Browser inspection of the invitation detail at mobile width, checking corrected structure, four consistent examples, absence of `ます干`, and exact-duplicate suppression.
- Additive migration applied to a local copy of the current 3.5E.1C content database: grammar/example/link row counts were unchanged; both category IDs became archived; no published malformed terminology or category answer remained.
- `git diff --check` and repository secret scan before commit.

Final command results and commit/push identifiers are recorded in the task handoff rather than backfilled into this source audit.
