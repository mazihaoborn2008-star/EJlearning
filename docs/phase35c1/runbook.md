# Phase 3.5C.1 isolated learner UX staging

- Worker: `ej-learning-35c1`
- D1: `ej-learning-35c1-db` (`3bf1fc19-e5ce-4521-b051-94f91fedfd82`)
- URL: https://ej-learning-35c1.yanjian-language-learning.workers.dev
- Source: `src/worker-35c1.js`, `src/academic-35c1.js`, `public-35c1/`
- Migrations: `migrations-35c1/` (byte-identical to Phase 3.5C)

Only `wrangler.35c1.jsonc` is authorized for this staging. It has no custom route or scheduled trigger and cannot change production traffic. `scripts/release-35c1.js` checks the isolated names, paths, D1 UUID, and migration byte identity before dry-run, migration, or deployment.

Local verification uses `wrangler.35c1.local.jsonc` with the isolated `.wrangler/35c1-local` persistence directory and port 8799. Do not reuse another phase's local persistence directory.

```powershell
node node_modules/wrangler/bin/wrangler.js d1 migrations apply DB --local --config wrangler.35c1.local.jsonc --persist-to .wrangler/35c1-local
node node_modules/wrangler/bin/wrangler.js dev --config wrangler.35c1.local.jsonc --port 8799 --persist-to .wrangler/35c1-local
$env:BASE_URL='http://127.0.0.1:8799'
node --test tests/phase35c1-api.test.js
node tests/phase35c1-browser.cjs
node tests/phase35c1-accessibility.cjs
node tests/phase35c1-legacy-navigation.cjs
node scripts/verify-35c1-d1.js
```

Guarded staging operations:

```powershell
node scripts/release-35c1.js check
node scripts/release-35c1.js migrate
node scripts/release-35c1.js deploy
node scripts/verify-35c1-d1.js --remote
```

Set `BASE_URL` to the staging URL and `TEST_LABEL=staging` for remote browser/accessibility/visual verification. Rollback means stop using the isolated URL; no production route or learner-progress migration is involved.
