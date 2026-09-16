# EJ Learning — Stage 6 Expansion 03 Implementation

**Implementation date:** 2026-09-16
**Starting main:** `95c36daa5d7a8647d1031e9c5a04ffa82d4eb016`
**Feature branch:** `feature/stage6-expansion-03`
**Scope:** local implementation only; no remote D1 access and no staging or production deployment

## 1. Frozen authority

| Input | SHA-256 |
|---|---|
| `docs/STAGE-6-EXPANSION-03A-APPROVAL-MATRIX.md` | `754cc5ff8cdcfdb471a53088e36a9c65c8bf8c39a1a767738602c1e724e61e29` |
| `docs/STAGE-6-EDITORIAL-03B-PAYLOAD.json` | `04a4afa47c51787dd546e49d2d54734fbc1c591e8ad08490a9916f4743cc78de` |
| `docs/STAGE-6-EDITORIAL-APPROVAL-03B.md` | `bb9cc782b38122cc1b783a95c9b31ece43f11bf9e0fa720813f8357767697710` |

`scripts/stage6-expansion-03.js` rejects changed hashes, a non-final approval report, any false authorization flag, relationship counts or roles that differ from the frozen totals, any 03A/03B relationship-field disagreement, duplicate relationships, and the reappearance of `en-would-like`, `looking-forward-en`, or `ja-c-699`.

## 2. Immutable release identity

| Field | Value |
|---|---|
| Bundle | `curriculum-stage6-expansion-03-v1` |
| Schema | `CURRICULUM-STAGE6-EXPANSION-03` |
| Dataset marker | `2026-09-stage6-expansion-03-v1` |
| Previous bundle | `curriculum-stage5-expansion-02-v1` |

The previous and all earlier bundles remain unchanged. The generated bundle is inserted as a new immutable row. Its 99,172-character JSON payload is assembled through deterministic guarded SQL chunks to remain below the local D1 statement-size limit.

## 3. Lessons, titles, and objectives

The four new production IDs are:

- `en-s6-03-synthesis`
- `en-s6-04-accountability`
- `ja-s6-03-reporting`
- `ja-s6-04-accountability`

All twelve final titles and objectives are projected exactly:

| Slot | Production lesson | Title | Target title | Objective |
|---|---|---|---|---|
| EN1 | `en-s6-l1` | 以证据构建有限定的论证 | Build a Qualified Evidence-Led Argument | 能选择相关证据、提出主张，并明确结论的适用范围。 |
| EN2 | `en-s6-l2` | 分析反事实并回应反方观点 | Reason Through Counterfactuals and Counterpositions | 能连接反事实条件与后果，承认反方依据，并说明不确定性。 |
| EN3 | `en-s6-03-synthesis` | 综合转述信息并区分证据与推断 | Synthesize Reports, Evidence, and Inference | 能综合多个来源，区分事实、证据与推断，并形成有限定的结论。 |
| EN4 | `en-s6-04-accountability` | 协商冲突需求并承担说明责任 | Negotiate Competing Demands and Accountability | 能权衡优先事项、分配责任、提出缓解措施，并作出正式承诺。 |
| EN5 | `en-s6-l3` | 作出不施压的正式承诺 | Make Pressure-Free Formal Commitments | 能说明限制、提出替代方案，并在不给对方压力的情况下明确承诺。 |
| EN6 | `en-s6-l4` | 回顾结果并承诺后续行动 | Reflect on Outcomes and Commit to Next Steps | 能根据证据评估结果、承担相应责任，并说明下一步行动。 |
| JA1 | `ja-s6-l1` | 组织依据并形成有限定的结论 | 根拠を整理し、限定した結論を述べる | 能整理相关依据、说明判断标准，并限定结论的适用范围。 |
| JA2 | `ja-s6-l2` | 谨慎表达判断并承认限制 | 判断を控えめに述べ、限界を認める | 能区分依据、推断与可能性，并以保留方式表达判断。 |
| JA3 | `ja-s6-03-reporting` | 综合转述信息并进行条件判断 | 報告をまとめ、条件付きで判断する | 能区分转述、传闻与推断，并在明确条件下作出决定。 |
| JA4 | `ja-s6-04-accountability` | 正式协商突发情况与说明责任 | 不測の事態と説明責任を改まって協議する | 能在正式角色中协商突发情况、缓解措施、说明责任与后续承诺。 |
| JA5 | `ja-s6-l4` | 调整安排并作出得体承诺 | 予定を調整し、配慮ある約束をする | 能说明限制、提出代案，并顾及对方作出明确承诺。 |
| JA6 | `ja-s6-l3` | 回顾结果并说明责任与下一步 | 結果を振り返り、責任と次の行動を述べる | 能评估实际结果、承认相应责任，并说明下一步行动。 |

## 4. Relationship authority and density

Final Stage 6 relationships are 88 English plus 89 Japanese, or 177 combined.

| Language | NEW | REVIEW | SUPPORT | Total |
|---|---:|---:|---:|---:|
| English | 32 | 30 | 26 | 88 |
| Japanese | 34 | 31 | 24 | 89 |
| Combined | 66 | 61 | 50 | 177 |

Instructional roles remain presentation/planning metadata. They do not change required flags, completion, recommendation, correctness, or SRS weighting.

| Slot | V/G/E | Assessable | Approved safe opportunities |
|---|---:|---:|---:|
| EN1 | 8/3/4 | 11 | 33 |
| EN2 | 8/3/4 | 11 | 33 |
| EN3 | 8/3/4 | 11 | 31 |
| EN4 | 8/3/4 | 11 | 32 |
| EN5 | 8/2/4 | 10 | 29 |
| EN6 | 8/3/3 | 11 | 33 |
| JA1 | 8/3/4 | 11 | 33 |
| JA2 | 7/3/4 | 10 | 30 |
| JA3 | 8/3/4 | 11 | 33 |
| JA4 | 8/3/4 | 11 | 33 |
| JA5 | 8/3/4 | 11 | 33 |
| JA6 | 8/3/4 | 11 | 33 |

No filler was added to EN5, EN6, or JA2.

## 5. Current-composition delta and raw/runtime explanation

The Stage 5 bundle contains 123 raw Stage 6 relationships and 122 runtime-active Stage 6 relationships. The only inactive member is the archived `en-greeting` link in the old English Stage 6 composition.

| Comparison | Retained | Added | Removed | Net |
|---|---:|---:|---:|---:|
| Raw relationship keys | 35 | 142 | 88 | +54 |
| Runtime-active relationship keys | 35 | 142 | 87 | +55 |

Replacing 123 old raw rows with 177 final active rows changes the global raw total from 1,076 to 1,130. Replacing 122 old active rows with 177 final active rows changes the global runtime total from 1,071 to 1,126. The raw/runtime difference therefore moves from five to four because the archived greeting remains in historical bundles but is absent from the new current composition.

## 6. Prerequisite graph

The current graph changes from 72 lessons / 70 edges to 76 lessons / 74 edges. It has exactly two roots, one per language, full reachability, no cycle, no missing or cross-language prerequisite, no Stage 6 bypass, and one terminal per language.

English:

`en-s5-08-reporting → en-s6-l1 → en-s6-l2 → en-s6-03-synthesis → en-s6-04-accountability → en-s6-l3 → en-s6-l4`

Japanese:

`ja-s5-08-benefit → ja-s6-l1 → ja-s6-l2 → ja-s6-03-reporting → ja-s6-04-accountability → ja-s6-l4 → ja-s6-l3`

The Japanese reorder intentionally makes `ja-s6-l3` terminal. The old `ja-s6-l3 → ja-s6-l4` edge is replaced rather than retained as a branch.

## 7. Editorial delta and controlled completion

- 40 vocabulary examples: 21 English and 19 Japanese, inserted under deterministic IDs without overwriting earlier examples.
- 60 grammar examples: 27 English across nine records and 33 Japanese across eleven records, exactly three additions per record.
- 38 `CC SAFE` reviews create authority rows with exact answer, occurrence, and offset.
- 22 `NOT FOR CC` reviews remain teaching examples and create no completion-authority row.
- All three `en-if-request` additions are `NOT FOR CC`; practice falls back to form selection and creates no Stage 6 controlled completion.
- Nine strict expression-context versions are stored, with full scenario, speaker relationship, pragmatic function, and register constraint metadata. Canonical expression text is unchanged.

The practice engine stops before its legacy link fallback when a grammar has been explicitly reviewed but has no safe authority. This prevents a reviewed `NOT FOR CC` set from being re-inferred as controlled completion.

## 8. Dialogues, prompts, and scenarios

The current bundle adds four exact six-turn dialogues at EN3, EN4, JA3, and JA4; five reuse-prompt layers at EN5, EN6, JA2, JA5, and JA6; and three short scenarios at EN1, EN2, and JA1. Reuse layers reference their source expression IDs and do not duplicate source dialogue turns. Scenario prose creates no canonical expression.

JA4 turn 5 retains both sentences and the structured newline inside one turn. The UI renders the two lines without leaking literal `<br>` text.

JA4 turn 3's `ja-c-827` is validated as the sole approved non-authoritative familiar-support exception. Demonstrated-ID metadata is omitted from the public asset, and the current relationship remains only `ja-s6-l4 → ja-c-827`; no `ja-s6-04-accountability → ja-c-827` relationship is created.

## 9. Canonical boundaries

No vocabulary, grammar, or expression identity is added. Authoritative totals remain:

- Vocabulary: EN 10,000; JA 8,235.
- Historical grammar: EN 83; JA 98.
- Published grammar: EN 82; JA 97.
- Expressions: 713.
- Lessons: 76.

`ja-c-859` and `ja-c-871` receive approved examples and occur only in JA4 Stage 6 relationships. Their L6 metadata does not authorize other placement.

Hotfix 03 remains exact: `ja-n-desu-ga` and `ja-node` retain the noun/na-adjective boundaries; `ja-honorific` remains `言う → おっしゃる`; `ja-humble` remains `する → いたす`. JA4's `報告いたします` demonstrates only `報告する → 報告いたします`; it does not authorize `伺う`, `申す`, `差し上げる`, or an open humble class.

`ja-kamoshirenai` retains `〜かもしれない` and receives no Stage 6 completion authority. Its unresolved-possibility function remains distinct from indirect-evidence `ようだ` and overstrong-inference rejection `わけではない`.

Stages 1–5 relationship keys are byte-for-byte unchanged. Earlier lessons that reuse an affected canonical record can see additional approved example variety, but required items, accepted answers, SRS identity, and historical completion are unchanged. Unsafe additions have no completion authority.

## 10. Grandfathering and recommendation behavior

The bundle carries `prior-curriculum-completion-v1` metadata listing the exact prior bundle lesson IDs by language. Recommendation code derives grandfathered completion from preserved progress rows at read time. It writes no synthetic completion and changes no learner row.

| Fixture | Verified behavior |
|---|---|
| A. Previous stages complete, no Stage 6 evidence | Starts the new sequence at Stage 6 lesson 1; no bypass or grandfathered completion. |
| B. Stage 6 lesson 1 complete | Recommends Stage 6 lesson 2. |
| C. Stage 6 lessons 1–2 complete | Recommends the new synthesis/reporting lesson. |
| D. Old EN/JA Stage 6 lesson 3 active | Preserves `continue_lesson`; does not restart or recommend around the active lesson. |
| E. Old JA `ja-s6-l3` complete, `ja-s6-l4` incomplete | Keeps `ja-s6-l3` complete and recommends `ja-s6-03-reporting` as the first reachable new incomplete step. |
| F. Old JA `ja-s6-l4` complete, `ja-s6-l3` incomplete | Keeps `ja-s6-l4` complete and recommends `ja-s6-03-reporting`; the out-of-order row is not deleted or rewritten. |
| G. All four old Stage 6 lessons and all prior language lessons complete | Preserves prior-language completion with no new lesson recommendation. |
| H. Both old language courses complete | Preserves `all_complete`; four new lessons do not make the learner incomplete. |

Priority remains `review_due → continue_lesson → start_next_lesson → all_lessons_complete`. Instructional roles do not participate in ordering. The full 4D/4F regression proves due-review priority, active-lesson priority, SRS continuity, and zero-write recommendation/dashboard reads.

## 11. Migration and idempotence

Generated migrations are additive and versioned:

- `migrations-stage6-expansion-03/0004_stage6_expansion_03.sql`
- `migrations-stage6-expansion-03/0005_stage6_lesson_projection.sql`

They add examples, completion reviews, 38 safe authorities, context versions/details, and the immutable bundle; then project current lesson metadata and prerequisite edges. They contain no learner-progress, attempt, evidence, vocabulary-progress, grammar-progress, SRS, user-setting, bootstrap, reseed, or historical-bundle DML.

Applying the generated SQL twice in an isolated in-memory D1-compatible SQLite database leaves exactly 40 vocabulary examples, 60 grammar examples, 60 reviews, 38 authority rows, nine contexts, one bundle, 76 lessons, and 74 edges. Local Wrangler D1 application also completed successfully and persisted the 99,172-character bundle. A subsequent migration check has no pending Stage 6 migration.

## 12. API, privacy, and browser behavior

Lesson list/detail, practice-session, and recommendation GET paths were verified zero-write. Existing 4F regression covers dashboard/progress GET zero-write behavior. Public lesson payloads expose titles, objectives, content, role labels, and learner-facing assets but not approval flags, implementation authorization, review source/rationale, hidden CC answers, offsets, or non-authoritative support metadata.

All twelve final Stage 6 lessons passed fixture-backed browser checks at 360, 390, 430, 768, and 1440 px: no horizontal overflow, exact single rendering of each relationship, title wrapping, role badges, approved example drawer, dialogues and translations, two-line JA4 turn 5, scenarios, reuse prompts, practice CTA, and correct terminal behavior.

## 13. Regression evidence

- `npm run test:stage6-expansion-03`: 7 focused engine/integration tests plus 60 responsive lesson cases passed.
- `npm run test:content-quality`: Hotfix 01–03 passed (13 tests).
- `npm run test:curriculum-expansion-01`: Expansion 01 passed (7 tests plus responsive browser suite).
- `npm run test:stage5-expansion-02`: Stage 5 passed (9 tests plus responsive browser suite).
- `npm run test:4f`: full 4F → 4E → 4D → 4C → 4B → 4A → 3.6 cascade and browser suites passed with the required local server active.
- `npm run test:35e1c`: 4 API tests and the 360/390/430/768/1440 vocabulary browser suite passed with the required local server active.
- Local D1 Stage 6 migration and semantic count queries passed.

Final `git diff --check`, deterministic regeneration, and the high-confidence secret scan are release gates run after this document is generated.

## 14. Future staging activation boundary

`wrangler.stage6-expansion-03.jsonc` and the staging data-policy marker describe the future activation target, but `deploy:stage6-expansion-03` is deliberately blocked. Staging activation requires separate human authorization to apply the additive migrations to remote D1 and deploy the Worker. This implementation did not access remote D1, deploy staging or production, merge `main`, call DeepSeek, or send OTP/email.
