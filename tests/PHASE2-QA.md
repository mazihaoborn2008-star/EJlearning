> Superseded milestone: production cutover has now passed verification. See [PRODUCTION-VERIFICATION.md](PRODUCTION-VERIFICATION.md) for current status. Historical details below remain for traceability.

> Update: staging deployment and remote D1 verification are complete; see [STAGING-VERIFICATION.md](STAGING-VERIFICATION.md). Custom-hostname cutover remains deferred. The following audit records the preceding local milestone.

# Phase 2 verification and deployment handoff

Local implementation verified on 2026-09-09 (Pacific/Auckland). **Overall Phase 2 completion remains unproven: production deployment was explicitly deferred by the user.** Phase 3 has not started.

## Requirement audit

| Requirement | Current evidence |
| --- | --- |
| Phase 1 UX preserved | Original CSS retained; four page layouts and interactions inspected in Chrome at 360, 390, 430, 1440 px. |
| Exactly 15 approved Concepts | API equivalence tests compare every expression, IPA, difficulty, grammar/example, chunk, reading and comparison against the frozen Phase 1 fixture. |
| D1 as content source | Worker queries D1; frontend loads `/api/topics` and `/api/concepts`, with no dataset or offline content fallback under `public/`. |
| Practical normalized model | 10 tables; language-specific expression variants, one primary expression, chunk grammar links, structured Japanese reading tokens. |
| Stable APIs | Topics, collection/filter/detail, both question languages, scoring; documented JSON/status contract. |
| Answers server-side | Public question field allowlist tested; score calculated from D1 answer keys; no keys or per-question correctness returned. |
| Independent results | Browser completes EN 12/12 and JA 3/12, refreshes, retests EN 7/12; JA remains Level 1. |
| Existing storage preserved | `kotoba.phase1.v1`, IDs 1–15 unchanged; seeded Phase 1 levels/mastery/last item survive initialization and refresh. |
| Independent mastery/progress | EN learned / JA review persist; totals and topic percentages differ correctly; Continue Learning resumes last item. |
| Local D1 | `npm run db:migrate`, Wrangler dev and API/browser suites pass. |
| Clean migration | `scripts/verify-clean.js` creates a new local database, applies both migrations, reapplies with none pending, and passes API tests. Foreign-key check empty; 15 Concepts, 30 expressions, 24 questions. |
| Static asset safety | Only `public/` deployed. Tests assert source, fixtures, migrations, package/config files, dependencies, and old `/js/data.js` return 404. |
| Loading/error handling | Delayed content loading, content 503/retry, question 503/retry, scoring 503/retry tested. Answers and existing saved results survive failures. |
| Responsive controls | All pages and all 15 Concepts checked at each required width; IPA, ruby/hiragana, every grammar chunk, comparison, selector, previous/next, final route and navigation pass with no horizontal overflow. |
| Console | No page errors during browser regression/resilience tests. Expected server-error injection is handled without returning internal details. |
| Production build | `wrangler deploy --dry-run` succeeds with D1 and Static Assets bindings. This is a build check, not proof of deployment. |
| Production deployment | **Deferred by user.** Existing URL continues to serve the Phase 1 rollback view through its original tunnel/local origin. No production Worker/API or remote migrations verified. |

## Test commands and results

- `npm run test:api`: 9 test groups pass, including all 13 attainable scores in each language, exact threshold boundaries, invalid requests, content equivalence and asset isolation.
- `npm run test:browser`: four widths × all pages/15 Concepts; independent placement/mastery, pronunciation, grammar/comparison, navigation and storage checks pass.
- `npm run test:resilience`: Phase 1 state compatibility, loading, three retry flows, and text-escaping checks pass.
- `npm run test:clean`: clean D1 migrations + repeat application + API suite pass.
- `npm run check:deploy`: local build/static asset/binding validation passes.

Machine-readable local results: `phase2-browser-results.json`, `clean-db-results.json`. Images: `phase2-screenshots/`. Screenshots were visually reviewed; widths are browser emulation, not physical devices.

## Fixes during migration

- Root `/` initially returned 404 with explicit `.html` asset routing; Worker now maps it to `index.html`.
- Async initialization waits for content before restoring/rendering progress and selecting the current Concept.
- Grammar chunks now use their own grammar link when present, while preserving the approved explanations.
- Database text is HTML-escaped; drawer bodies still use `textContent`.
- Script URLs are versioned and static assets revalidate, avoiding mixed old/new cached scripts.
- Saved placement values are validated before display; valid Phase 1 results remain compatible.

## Existing production discovery and rollback

The authenticated account lists the supplied `ej-learning-db` but no Workers, Pages projects, Worker custom domains or Worker routes. Public requests were positively correlated with the existing Python file server at `127.0.0.1:8765`. It had been serving the workspace root through a tunnel.

Moving the UI into `public/` exposed a directory listing at that old origin. This was corrected by serving an isolated Phase 1 rollback view from `.wrangler/phase1-rollback` on the same port. Public checks confirm the UI loads and `/migrations/0002_seed.sql`, `/.wrangler/`, and `/src/worker.js` return 404. DNS, tunnel and Cloudflare routing were not modified. The rollback view is not a Phase 2 fallback and is not shipped in Worker assets.

The user selected **“Keep production unchanged for now.”** Therefore no new Worker, remote migrations or hostname route was created. Production verification remains outstanding; the goal must not be marked complete on the strength of local tests.

## Later deployment checklist (requires resumed authorization)

1. Recheck account and routing state; review `wrangler.production.example.jsonc` against the existing hostname and supplied database.
2. Confirm the intended new `ej-learning` Worker/route, retaining the existing DNS/tunnel as rollback. Copy the reviewed example to `wrangler.production.jsonc`.
3. Review remote migration status, apply schema/seed, verify counts/foreign keys and migration history.
4. Dry-run and deploy the Worker with the production config.
5. Run API, browser and resilience suites against the original HTTPS hostname; inspect all four pages, asset exposure, cache behavior and localStorage compatibility.
6. Only then declare production architecture complete. Keep accounts, SRS, AI and other Phase 3 work excluded.

## Content changes

No approved course or placement wording was corrected or rewritten. Structured reading records reproduce the same kana/kanji and punctuation. Placement difficulty metadata (1–6 by consecutive pairs) is new schema metadata only; scoring remains the same non-adaptive threshold model.


