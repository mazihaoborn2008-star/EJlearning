# 言间 · Phase 3

Chinese-first practical English × Japanese learning. Published curriculum lives in **D1 → Worker API → browser**. Independent learner progress lives only in this browser's localStorage. Phase 3 is staged separately; production cutover is not authorized.

## Safe local development

```powershell
npm ci
npm run db:migrate
npm run dev
```

Open [localhost](http://127.0.0.1:8787). These commands explicitly select `wrangler.phase3.jsonc` and `.wrangler/phase3-current`. Changing a D1 binding ID creates a different local database: apply migrations to the same config/persistence directory before testing.

```powershell
npm test
npm run test:clean
npm run check:deploy
```

`npm test` runs deterministic engine, API, browser/resilience, and curriculum checks against localhost:8787. Set `BASE_URL` for another environment. Browser checks use installed Chrome (`CHROME_PATH` override). `test:clean` creates a new local directory, applies and reapplies every migration, verifies relational integrity/counts, launches port 8792, then runs the full test/audit suite. Existing local data is never deleted.

## Isolated staging

- Worker: `ej-learning-phase3`
- D1: `ej-learning-phase3-db`
- D1 ID: `36c72b9b-da1f-425c-9b1a-6603b0f7d150`
- Preview: [Phase 3 staging](https://ej-learning-phase3.yanjian-language-learning.workers.dev)
- Config: `wrangler.phase3.jsonc`; no custom-domain routes.

```powershell
npm run db:migrate:phase3
npm run deploy:phase3
```

Both commands explicitly target isolated staging. `npm run deploy` and the old generic remote migration command stop with an explanatory error.

**Do not use `wrangler.staging.jsonc` for Phase 3.** That historical Phase 2 file points to the live `ej-learning` Worker, its production D1 and production route. The historical production/default configs remain unchanged for review. Do not deploy with them or run bare remote Wrangler commands. No production cutover, DNS, Tunnel or rollback-origin action is authorized.

## Architecture and source

- `src/engine.js`: deterministic adaptive inference and per-language recommendations, directly unit-testable.
- `src/assessments.js`: bounded request validation, lightweight catalog, temporary session persistence, objective grading, optimistic concurrency/idempotent retry.
- `src/worker.js`: API routing, on-demand card details, sanitized errors, expired-session cleanup.
- `public/js/state.js`: versioned local state migration and independent language profiles.
- `public/js/api.js`: catalog loading and in-memory detail cache. No bundled content fallback.
- `public/js/app.js`: independent recommendations, queues, topic navigation and progress.
- `public/js/learn.js`: shared cards for six Concept types, IPA, furigana, kana view, grammar, comparison and independent mastery.
- `public/js/placement.js`, `checkpoint.js`: adaptive assessment and topic-checkpoint flows.
- `scripts/curriculum-source.js`, `assessment-supplement.js`: private authoring sources; never deployed as assets.

Only `public/` is deployed as static assets. Fixtures, answer keys, source scripts and SQL remain private. The Worker queries D1 for runtime content. No AI or network model calls occur at runtime.

## Migrations

Applied Phase 2 files `0001_schema.sql` and `0002_seed.sql` are unchanged. New files:

1. `0003_engine.sql`: Concept type/usage note, expression JSON metadata, assessment purpose/Concept linkage, short-lived anonymous sessions and indexes.
2. `0004_curriculum.sql`: 168 new bilingual Concepts and 672 assessment questions.
3. `0005_assessment_refinements.sql`: 24 practical sentence-completion placement questions, 30 checkpoint questions for the original 15 Concepts, useful vocabulary part-of-speech labels, and school topic renamed to 学校 / 工作. Original 15 Concept wording remains unchanged.

Total: 183 published Concepts, 366 primary expressions, 14 topics, 192 placement questions per language and 183 checkpoint questions per language. See the [curriculum audit](tests/PHASE3-CURRICULUM-STAGING.md) and [completion report](tests/PHASE3-COMPLETION.md) for distributions and evidence.

The generators document migration provenance. Do not regenerate an already applied migration to change content; author a new additive migration instead.

## Placement algorithm

Assessments start with a Level 3 question. For each candidate ability Level 1–6, a six-point Bayesian model accumulates evidence using question difficulty and correct/incorrect answers; a bounded logistic success curve includes a guessing floor. The rounded posterior mean selects the estimated level. Selection targets the evolving mean, probes an adjacent level every fourth question, favors less-covered topics, excludes answered questions, and uses a session-seeded stable hash only for ties. Identical pool, seed and history produce identical questions; a new session can follow a different equivalent route.

Stop after at least eight answers when the maximum posterior mass is at least .68, at least two difficulties are covered and at least five answers are near the estimated level. At 15 answers, sufficiently concentrated adjacent-level evidence permits completion; 18 is an unconditional maximum. No single answer determines an extreme level. The confidence label is heuristic, not a validated statistical certification or CEFR/JLPT mapping.

Results include language, level, starting difficulty, Chinese ability summary, learner-readable evidence, recommended topics and answered count. Home then combines that result with the existing local mastery/recent state to choose actual content. Retesting English does not update Japanese, or vice versa.

## Session/security design

A cryptographically random UUID identifies an anonymous D1 session. The browser never submits scoring weights, difficulty or claimed level to assessment endpoints. D1 holds the hidden question/history state; mutations use a version compare-and-swap. Changed/stale replays return 409. An exact retry of the most recent committed answer returns the same response without scoring twice, recovering lost responses. Session kind and language cannot be switched through answer requests.

Sessions expire after 30 minutes. Completed sessions immediately discard answer history and retain only the final retry response until expiry. Expired rows are deleted at new-session start and by a staging Worker scheduled cleanup every 30 minutes. There are no durable server learner profiles, identity records, progress sync or cookies. The cleanup schedule is server data maintenance, not a learner reminder/SRS feature. D1 platform backup retention is governed by Cloudflare, not an application learner-history feature.

The session token is a bearer capability: someone possessing it can act on that session. There is no account-backed anti-cheating guarantee, IP rate limiter or proctored testing. This is a low-stakes learning estimate. LocalStorage levels/recommendation inputs are intentionally editable because recommendations do not grant privileges. Assessment answers and weights are never returned; repeated retesting or studying public curriculum can still reveal knowledge being assessed.

## Recommendation algorithm

Each language is evaluated alone. The deterministic score uses distance from its level, mastery (`new`, `learning`, `learned`, `review`), checkpoint weaknesses, recent items, last unfinished item, topic progress, and selected-topic/type variety penalties. Four core picks target the level, followed by an easier consolidation slot and a stretch slot when available. Review needs may outrank these slots. Learned items are strongly demoted but can appear if alternatives are exhausted.

The response returns up to six lightweight items with Chinese reasons. Starting a queue saves only its IDs under that language. Users can choose any topic/Concept at any time; a higher difficulty shows 较难, never a lock. Recent state is a bounded list, not a time-based review schedule.

## Checkpoints

A topic/language checkpoint selects up to eight distinct questions, evenly distributed over the sorted difficulty range (all present topics have eight). It is objectively graded server-side. Results return score/total/percentage and weak Concept IDs. Incorrect items become review-marked for that language and influence recommendations. Correct answers do not automatically turn items or the whole topic into mastered content. Later successful checkpoints remove prior checkpoint priority for recovered items while manual review flags remain until the learner changes them.

## Local progress migration

`kotoba.phase3.v1` is the new key. If absent, valid data is restored from `kotoba.phase1.v1`: separate levels, learned/review marks for original IDs, last item and activity. The original key is never overwritten. The new model adds independent last position, recent IDs, queue, weak IDs and checkpoint results. Valid `learning` status is preserved on subsequent loads. Malformed fields are ignored, storage failure displays a warning, and failed content loads do not write state.

Progress shows each language separately. `learned` contributes 1, `learning` contributes .35, and `new`/`review` contribute 0 to the displayed learning-progress percentage. Separate counts clarify that partial learning is not mastery. Origins remain independent: staging cannot access production-origin localStorage; there is no cloud sync.

## API contracts

All success responses are `{ "data": ... }`; errors are `{ "error": { "code": "...", "message": "中文信息" } }`. JSON POST bodies are bounded to 16 KiB and reject unknown fields, invalid types and invalid language values. D1 value queries are parameterized.

| Method and route | Request/result |
|---|---|
| `GET /api/topics` | Published topic metadata |
| `GET /api/concepts?topic=food` | Lightweight list: id, topic, Chinese anchor, type, independent difficulty; no full expressions/grammar |
| `GET /api/concepts/8` | Full primary expressions, IPA, structured readings/chunks, grammar, comparison, register, type metadata |
| `POST /api/placement/start` | `{lang}` → sessionId, version, answered, question |
| `POST /api/placement/answer` | `{sessionId,version,questionId,optionId}` → next question or `complete:true,result` |
| `POST /api/checkpoint/start` | `{lang,topic}` → analogous session plus total |
| `POST /api/checkpoint/answer` | Same answer contract → next question or checkpoint result |
| `POST /api/recommendations` | `{lang,level?,mastery?,recent?,weak?,last?,topic?}` → independent recommended items/reasons |

Public questions contain only id, type, prompt, optional targetText and options `{id,text}`. Placement responses contain no per-question correctness, hidden scoring weights, question difficulty or answer keys. Checkpoint completion intentionally reveals weak Concepts to support review.

The old fixed `/api/placement/questions` and `/api/placement/score` endpoints return 410 with a refresh message; their UI is intentionally superseded. All 15 original detail contracts remain compatible with added metadata. Catalog callers must now request detail explicitly. Status codes include 400 malformed input, 404 missing content, 405 method mismatch, 409 session conflict, 410 expired/deprecated session/API, 413 oversized body, 415 wrong media type and 503 content/database failure. Published GET content caches for 60 seconds; all personalized/assessment responses use `no-store`.

## Scope and limitations

Content was machine-authored and reviewed in structured passes, with automated validation of every Concept. It has not been independently reviewed by a human bilingual linguist, and difficulty/placement calibration has not been validated with real learners. See the QA report for precise verification limits.

No AI tutor/grading, SRS, accounts, cloud progress sync, audio, speech recognition, payments, social features, XP, streaks or Phase 4 functionality was introduced. Stop after staging verification. Production requires separate authorization.
