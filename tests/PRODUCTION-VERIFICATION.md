# Phase 2 production completion — 2026-09-09

Production: https://ej_learning.jwcglass.com/
Worker: `ej-learning`
Version: `19a090dc-4321-46af-a7cc-33995746dc10` (same tested staging version; no code redeployment during cutover).
Route: `ej_learning.jwcglass.com/*` → `ej-learning`
Route ID: `a5f2ea2a7ed24ad7b9cf3d664f2d4198`
Zone ID: `1671867c0ca18c2a4479d8d6fe7c5d47`
Route created: `2026-09-09T01:03:56.492Z`.

## Preflight and changes

Rechecked authenticated account `bd05aa19111be95427af89be4e44f164`, deployed version, migration status, healthy staging, and empty zone route list. Public DNS resolved to Cloudflare addresses `104.21.4.143` and `172.67.154.33`; HTTPS returned Cloudflare headers. Before cutover, the public hostname's HTML exactly matched the local Phase 1 rollback origin. DNS-record API read permission remains unavailable; proxying was verified through DNS/HTTP evidence. No DNS changes were made.

Added exactly the single route above using `scripts/production-route.js create`. No broader routes, Custom Domains, tunnel edits, server stops, D1 reseeding or database changes. Saved route identity in `.wrangler/production-route.json` for guarded rollback.

`wrangler.production.jsonc` preserves the route, assets, D1 binding and workers.dev. `wrangler.staging.jsonc` now preserves the same route because it targets the same Worker; using its earlier empty-route configuration could remove the production route. Both URLs now address the same service/database, not isolated staging infrastructure. Production configuration dry run passed. Use `npm run deploy` for future authorized releases.

## D1

`ej-learning-db`, binding `DB`, ID `e2e8f4c8-27e0-416e-993c-7510259a6b1d`.
Migrations `0001_schema.sql` and `0002_seed.sql` are applied; none pending before or after cutover. No migrations applied in this cutover.
Previously verified remote counts: 3 topics, 15 Concepts, 30 expressions (15 per language), 24 questions (12 per language), 72 options, 24 keys; no FK violations or duplicate expression pairs. Production API equivalence tests reconfirm all approved Concepts, expressions, IPA, readings, grammar, comparisons and question content.

## Production tests

Executed with `BASE_URL=https://ej_learning.jwcglass.com`:

- `npm run test:api`: 9 groups passed. Topics, all Concepts/filter/detail, both placement question APIs, all scores in both languages, validation and private asset isolation. Synthetic threshold and injected database-error unit cases run directly against Worker code; HTTP cases hit production.
- `npm run test:browser`: passed four pages and all 15 Concepts at 360/390/430/1440 px. IPA, ruby/hiragana, grammar drawers/chunks, comparisons, topics, previous/next, Continue Learning, placement, independent mastery/results, progress and persistence all passed. No page errors or horizontal overflow.
- `npm run test:resilience`: passed loading, content/question/scoring retry, saved-state compatibility and safe text rendering. Network failures were injected in the isolated browser; production service was not disrupted.
- Manually inspected production screenshots for all four pages at every required viewport width. Mobile testing used browser emulation rather than physical devices.
- Question GET responses expose no answer keys/correct answers/per-question correctness. Score response is aggregate only.
- Source, migrations, fixtures, configuration, package/dependency files and old data.js return 404; intended static assets load.

## Same-origin state across the actual cutover

Opened an isolated browser session on the live Phase 1 custom hostname before changing the route. Marked Concept 8 English learned and Japanese review, and stored valid English Level 5 / Japanese Level 1 results under `kotoba.phase1.v1`. Kept the session open through cutover. After navigating to the Worker-served Home page, the entire stored JSON was byte-for-byte unchanged. Home displayed both levels and Continue Learning linked to Concept 8; both independent mastery selections remained selected. No storage clearing occurred during this compatibility test. This tests representative valid existing state without accessing or modifying the user's personal browser profile.

## Rollback infrastructure and issues

No critical failures; rollback was not triggered. Existing tunnel configuration and DNS remain untouched. The Python Phase 1 origin still responds with 200 at `http://127.0.0.1:8765/`, and rollback files remain at `.wrangler/phase1-rollback`. workers.dev still returns 200 and remains enabled.

If rollback is required, run from the project directory:

```powershell
node scripts/production-route.js rollback
```

The script verifies recorded ID/pattern/Worker and deletes only route `a5f2ea2a7ed24ad7b9cf3d664f2d4198`. It does not alter Worker/D1/DNS/tunnel. Then verify the custom hostname returns Phase 1 and stored progress remains intact. Update both deployment configurations to remove that route before any subsequent deployment, otherwise they will recreate it. No rollback command was executed during successful verification.

Phase 2 is complete: D1 is the runtime source of truth, Phase 1 UX/content and local state compatibility are preserved, local/clean/staging/production verification passed. Phase 3 was not started.
