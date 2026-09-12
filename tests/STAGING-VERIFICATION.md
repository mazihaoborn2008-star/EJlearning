> Superseded milestone: production cutover has now passed verification. See [PRODUCTION-VERIFICATION.md](PRODUCTION-VERIFICATION.md) for current status. Historical details below remain for traceability.

# Phase 2 staging verification — 2026-09-09

Staging: https://ej-learning.yanjian-language-learning.workers.dev

Worker: `ej-learning`. Version: `19a090dc-4321-46af-a7cc-33995746dc10`.
Config: `wrangler.staging.jsonc`; `workers_dev: true`, `routes: []`, assets from `public/`, DB bound to existing `ej-learning-db` (`e2e8f4c8-27e0-416e-993c-7510259a6b1d`).

Authenticated account rechecked: `bd05aa19111be95427af89be4e44f164`. No existing Worker/Pages service was present before deployment, so this new service was required. Dry run passed before publishing.

## Remote D1

Before migration there were no course tables and both migrations were pending. Applied `0001_schema.sql` and `0002_seed.sql`; migration history contains each once, and subsequent migration listing reports none pending.

Verified: 3 topics; 15 Concepts; 30 expressions (15 English + 15 Japanese); 24 placement questions (12 + 12); 72 options; 24 answer keys. Foreign-key check returned no violations. Grouping expressions by Concept/language found no missing/duplicate pairs. API equivalence checks verified every seeded Concept and placement prompt/option against the approved fixture.

## Live verification

With `BASE_URL=https://ej-learning.yanjian-language-learning.workers.dev`:

- `npm run test:api`: 9/9 groups passed. Live HTTP tests cover topics, all Concepts/details/filtering, question allowlists, every possible score in both languages, malformed requests, and asset isolation. Two groups (exact synthetic percentage thresholds and injected DB error) run directly against Worker code rather than remotely.
- `npm run test:browser`: passed all four pages and all 15 Concepts at 360/390/430/1440; IPA, Japanese ruby and hiragana, all grammar chunks, comparisons, independent mastery/placement, navigation, refresh and progress verified. No horizontal overflow or JavaScript page errors.
- `npm run test:resilience`: passed storage compatibility, loading, API/question/scoring failure/retry, and safe text rendering. Failures are injected by Playwright, not by disrupting remote D1.
- Manual visual review of staging screenshots at all four widths passed. Browser emulation, not physical-device testing.
- Question responses contain no correct answers, keys, explanations revealing keys, or per-question correctness. Scoring returns aggregates only.
- Source, migrations, fixtures, node_modules, package/config files and old data.js return 404. Intended HTML/CSS/JS assets load.

Initial TLS handshake failures occurred while the newly registered workers.dev subdomain provisioned. Retrying the same deployment after provisioning resolved this without certificate bypass, code changes or redeployment.

## Existing hostname unchanged

No DNS writes, tunnel changes, hostname attachment, Worker route creation or Python process changes were performed in this staging step. Post-deployment Cloudflare queries show no custom domains or zone Worker routes. The existing HTTPS hostname returns 200 and the Phase 1 asset version. DNS read permission was unavailable, so record contents were not independently exported; no DNS mutation tool/command was used.

Staging has separate browser localStorage by design. No progress migration between origins was attempted. Phase 3 was not started. Stop here: custom-hostname cutover is not authorized.

## Proposed cutover — execute only after separate authorization

1. Recheck account, Worker version and zone routes. In Cloudflare DNS and Tunnel dashboards, record/export the existing `ej_learning.jwcglass.com` DNS record and tunnel public-hostname configuration. Confirm the current Phase 1 origin responds. Leave it running throughout cutover and rollback validation.
2. Confirm D1 has no pending migrations and staging tests remain green. No reseeding or additional schema changes are needed for cutover.
3. Add exactly one **Worker Route**, not a Custom Domain: Cloudflare dashboard → jwcglass.com → Workers Routes → Add route → pattern `ej_learning.jwcglass.com/*` → Worker `ej-learning`. Record the newly created route ID. Do not alter DNS, tunnel configuration or other routes. This requires the existing record to remain proxied; if it is not, stop and request review rather than changing DNS implicitly.
4. Reflect the route in the reviewed production Wrangler configuration for subsequent deployments; use the staging asset/D1 settings and keep workers.dev enabled for comparison. Do not redeploy a configuration with `routes: []` after cutover without reviewing its effect on the route.
5. Against `https://ej_learning.jwcglass.com`, run `npm run test:api`, `npm run test:browser`, and `npm run test:resilience` with BASE_URL set accordingly. Check an existing browser's Phase 1 progress without clearing storage. Verify all four pages, origin continuity, `/api/topics`, scoring and private-path 404s. Keep the tunnel/Python origin available until the user explicitly authorizes its retirement.

## Exact rollback plan

If custom-hostname checks fail after the proposed cutover, Cloudflare dashboard → jwcglass.com → Workers Routes → delete **only the newly recorded route ID** whose pattern is `ej_learning.jwcglass.com/*` and script is `ej-learning`. Do not delete the Worker, database, DNS record or tunnel. With the original DNS/tunnel untouched, requests resume reaching the still-running Phase 1 Python origin. Verify `/`, all four pages, Phase 1 asset version, and stored progress. If cached content persists, use a fresh request/cache-busting query for diagnosis; avoid clearing learner localStorage.

Retain D1 and staging for investigation; do not undo additive migrations or delete seeded tables. For a later bad Worker-code update that should retain Phase 2, restore tested version `19a090dc-4321-46af-a7cc-33995746dc10` through Workers & Pages → ej-learning → Deployments → select that version → Roll back. Database rollback is separate and unnecessary for the tested code-only/route cutover.

No rollback action is needed now: the production hostname was never cut over.

