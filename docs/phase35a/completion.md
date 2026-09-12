# Phase 3.5A completion report

Learning Architecture V2 is implemented as separate Vocabulary, Grammar and Sentence/Expression domains, with a read-only V2 API and isolated staging. The visible app intentionally remains Phase 3. This report and linked evidence cover the requested domain/API phase; no UI cutover or curriculum bulk migration is included.

## Architecture and new migrations

The [architecture specification](architecture.md) describes all **14 V2 tables**, their responsibilities, a compact ER diagram, language ownership, difficulty semantics, relation direction and limitations. Vocabulary owns lexical items, independent Stage 1–6, senses, examples/collocations, relations and optional topics. Grammar owns per-language points, Level 1–6, named explanation fields, examples and advisory prerequisite/contrast relationships. Sentence units own Chinese communicative anchors; language-specific expressions own wording, variants, register, readings, dialogue turns and all three difficulty dimensions.

New additive files in `migrations-v2/`:

1. `0006_v2_domains.sql` — 14 tables, foreign keys, checks, query indexes, duplicate protections and prerequisite/dialogue integrity.
2. `0007_v2_representative.sql` — small bilingual editorial sample; no legacy data updates.
3. `0008_v2_editorial_guards.sql` — strict integer metadata and dialogue ownership guards on later edits.

`migrations-v2/0001…0005` are exact copies of the immutable legacy files. The original `migrations/` directory is unchanged, so existing Phase 3 migration commands cannot accidentally pick up V2 migrations. `src/worker-v2.js` is a dedicated wrapper; the legacy Worker entry point and frontend sources are unchanged.

Important integrity controls:

- Composite language foreign keys reject EN↔JA lexical/grammar links and inconsistent prerequisites. Sense/item and turn/expression foreign keys protect ownership.
- Partial primary-expression uniqueness; lexical lemma/POS uniqueness per language; grammar slug uniqueness per language; duplicate relation/chunk protection.
- Stage, Level and three expression difficulty fields accept integers 1–6; publication and domain types are checked.
- Recursive prerequisite checks reject cycles on insert/update. Prerequisites remain suggestions and never lock content.
- Browse/detail/reverse indexes support actual API access patterns. SQL values are parameterized; search wildcard characters are escaped.

## Relationship and difficulty model

Sentence vocabulary links name the actual item and optionally its sense, with visible chunk/occurrence, optional dialogue turn, importance, new-target/supporting flag and order. Sentence grammar links name the actual point with chunk/occurrence and a local note; library explanations are not copied into Sentence records. Both domains expose compact reverse Sentence navigation.

Visible form + 1-based literal occurrence avoids byte offsets. Reading arrays support Japanese Unicode and furigana display. This is editorial chunk metadata, not automatic tokenization; source edits require revalidation.

Vocabulary, grammar and overall difficulties are independently stored per expression. Overall difficulty is an editorial judgment with a required rationale, not a computed max. Required examples are available as `not-eaten` and `changed-plan`; they share Chinese anchors but have different EN/JA grammar links and independent difficulty values. The Japanese analysis of まだ食べていません links ている and its polite negative, rather than assigning the English Present Perfect identity.

## Representative data

| Data | Count |
|---|---:|
| English vocabulary | 16 |
| Japanese vocabulary | 17 |
| Vocabulary senses | 34 |
| English grammar | 9 |
| Japanese grammar | 10 |
| Semantic Sentence units | 12 |
| Language expressions, including a response variant | 25 |
| Sentence vocabulary links | 36 |
| Sentence grammar links | 27 |
| Dialogue turns | 4 |

The sample includes simple and mixed-difficulty sentences, fixed expressions, two meanings of `expect`, lexical confusion, grammar prerequisites/contrasts, a scenario response variant and a bilingual two-turn dialogue. It is not a complete curriculum or complete lexical coverage corpus.

## V2 API

See the [full API contract](api.md). Implemented routes:

- `GET /api/v2/vocabulary` and `/vocabulary/:id`
- `GET /api/v2/grammar` and `/grammar/:id`
- `GET /api/v2/sentences` and `/sentences/:id`
- `GET /api/v2/vocabulary/:id/sentences`
- `GET /api/v2/grammar/:id/sentences`

Lists use bounded pagination (default 20, maximum 100). Filters include language, Vocabulary Stage/type/POS/register/search, Grammar Level/search, and Sentence topic/type/language plus all three difficulty dimensions. Sentence filters match one expression consistently. Details include the requested sense, structured explanation, examples, relationships, readings and scenario/dialogue fields. Unpublished content is omitted; malformed requests and missing resources are distinguished; errors are sanitized.

## Verification evidence

| Verification | Result / evidence |
|---|---|
| Reproducible fresh-environment run | **35 combined tests passed**, all eight migrations from scratch, D1 constraints, browser regression and curriculum audit passed — [run record](clean-run.json), [full log](clean-run.txt) |
| Local V2 API + legacy API + engine | **25 passed, 0 failed** — [log](local-api-tests.txt) |
| Database semantics and publication API checks | **10 passed, 0 failed** — [log](database-tests.txt) |
| Clean local D1 | Eight migrations applied; reapplication is a no-op; no FK violations; 183 legacy Concepts; representative counts verified; **11 invalid writes rejected** — [evidence](d1-local.json) |
| Staging V2 + legacy API | **17 passed, 0 failed** — [log](staging-api-tests.txt) |
| Staging D1 | Eight tracked migrations; no FK violations; counts verified; **11 invalid writes rejected** — [evidence](d1-staging.json) |
| Local and staging browser regressions | **10 behavior groups passed**, no page errors, 360/390/430/1440 layouts, original state compatibility, independent language progress, placement/checkpoint, retry and blocked-storage behavior — [local](local-browser-tests.txt), [staging](staging-browser-tests.txt) |
| Local and staging legacy curriculum audit | **183 Concepts**, all six types, 366 expressions, independent language difficulties preserved, no suspicious duplicates or audit errors — [local](local-curriculum-tests.txt), [staging](staging-curriculum-tests.txt) |
| Deployment/privacy | Dedicated D1 binding, workers.dev enabled, no custom domains/routes; pages/APIs 200 and private source/migration/report paths 404 — [evidence](release-verification.json) |
| Protected environment comparison | Exact before/after equality — [comparison](integrity-comparison.json), [before](integrity-before.json), [after](integrity-after.json) |

Database tests check cross-language expression links, sense ownership, prerequisite consistency/cycles, duplicate protections, numeric ranges, reading reconstruction and visible occurrence validity. Publication tests exercise the real API handler against a SQLite adapter with draft/archived fixtures. D1 probes repeat critical constraints against actual local and remote D1. Clean local verification uses a fresh directory, never an existing Phase 3 database.

## All 183 legacy Concepts mapped

The [human-readable mapping](legacy-mapping.md) and [machine-readable mapping](legacy-mapping.json) classify every Concept with source type, anchor, destination, per-language handling, confidence, notes and review flag:

- Vocabulary: 28; fixed expression: 1.
- Sentence: 54; scenario: 44; dialogue: 28.
- Grammar plus concrete Sentence examples: 28.
- Human review: **51**; destination confidence: 132 high, 44 medium, 7 low.

The [migration plan](migration-plan.md) identifies ambiguous lexical heads, idiomatic utterance boundaries, differing EN/JA semantics and every pattern needing review. Notable issues include Japanese explanatory phrases in legacy Vocabulary, noun/verb `plan` (172), and counterfactual English versus past-intention Japanese (180). The report is a proposal, not an executed crosswalk or approval. No learner mastery is inferred from it.

## Isolated staging and protected environments

- Worker: **ej-learning-35a**
- D1: **ej-learning-35a-db**
- D1 ID: `c5476d39-27ab-4899-b212-671e893971ee`
- Staging URL: [ej-learning-35a.yanjian-language-learning.workers.dev](https://ej-learning-35a.yanjian-language-learning.workers.dev)
- Deployed version: `d830a5c4-82a8-437e-9228-6c4f427fad90`
- Built from a newly created D1 using all migrations; no production clone, custom hostname or route.

Production `ej-learning` / `ej-learning-db` and existing staging `ej-learning-phase3` / `ej-learning-phase3-db` have unchanged deployment metadata, settings hashes, schema, migration history, content table hashes and existing GET API hashes. Available domain/routes/DNS metadata also matches. Protected local UI, engine, Worker, package files, configs and original migrations remain byte-identical. Snapshot calls were read-only. Existing transient assessment sessions were deliberately excluded from content equality because scheduled cleanup can legitimately change them. No production route, DNS, Tunnel or rollback infrastructure operation was performed.

## Explicit scope confirmation

- Vocabulary, Grammar and Sentences are separate first-class domains.
- Vocabulary and Grammar are language-specific.
- Sentence expressions reference Vocabulary/senses and Grammar through enforced relationships.
- English/Japanese Sentence difficulty dimensions are independent.
- Existing Phase 3 functionality remains intact.
- No curriculum bulk migration or final UI redesign was performed.
- Production and existing Phase 3 staging were not modified.
- Phase 3.5B and Phase 4 were not started.

Deferred deliberately: 3.5B final library/learning UI; 3.5C reviewed bulk content migration/provenance; 3.5D learner-state migration, separate knowledge profiles, placement/recommendation/checkpoint changes. Phase 4 AI remains out of scope. Search is simple substring search, editorial metadata is not psychometrically calibrated, and representative links are not complete enough for learner coverage percentages. Work stops at the domain/API model, documentation, tests and isolated staging verification.
