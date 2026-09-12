# Phase 3.5C isolated curriculum release

Worker: `ej-learning-35c`  
D1: `ej-learning-35c-db` (`c854a0e6-d576-4254-b4b6-449fc7517437`)  
URL: https://ej-learning-35c.yanjian-language-learning.workers.dev

Only `wrangler.35c.jsonc` is authorized for this phase. It reuses the unchanged 3.5B Worker/API, with separately copied `public-35c/` assets and `migrations-35c/`. There are no custom routes or scheduled triggers. Do not use default deploy/migration scripts or previous staging configurations.

Migrations 0001–0010 are byte-identical copies of the 3.5B stream. 0011 adds curriculum, source decisions and a many-to-many source crosswalk. 0012–0015 contain additive review corrections, including dialogue turn ownership, noun/verb distinctions, semantic scenario classification, final independent difficulty judgments and provenance for a reused pattern example. Applied migration files are immutable. The authoring generators assert byte identity when an output already exists; future corrections require a new migration.

Local clean verification:

```powershell
node node_modules/wrangler/bin/wrangler.js d1 migrations apply DB --local --config wrangler.35c.jsonc --persist-to .wrangler/35c-clean-1
node scripts/audit-35c.js
node scripts/verify-35c-d1.js
node node_modules/wrangler/bin/wrangler.js dev --config wrangler.35c.jsonc --port 8798 --persist-to .wrangler/35c-clean-1
$env:BASE_URL='http://127.0.0.1:8798'
node --test tests/phase35c.test.js tests/phase35c-v2-regression.test.js tests/phase3-api.test.js tests/phase3-engine.test.js tests/phase35a-db.test.js
node tests/phase35c-browser.cjs
node tests/phase35c-accessibility.cjs
node tests/phase35c-legacy-navigation.cjs
```

For a new clean replay, choose a new persistence directory and pass it consistently; never delete or reuse another phase's local database. The local D1 verifier opens only the selected isolated SQLite file read-only, avoiding concurrent Wrangler runtime contention. It compares every curriculum and legacy table with a fresh in-memory replay, excluding only transient assessment sessions, then checks all migration names and foreign keys.

Guarded remote operations:

```powershell
node scripts/release-35c.js check
node scripts/release-35c.js migrate
node scripts/release-35c.js deploy
node scripts/verify-35c-d1.js --remote
```

Set `BASE_URL` to the staging URL and `TEST_LABEL=staging` for browser verification. The original legacy browser suite uses `BASE_URL=<staging URL>/legacy` and a unique `TEST_LABEL=35c-staging`. Legacy API tests and curriculum audit use the origin without `/legacy`.

`phase35c-v2-regression.test.js` retains the V2 regression assertions and changes one fixture-size assumption: reverse examples are checked through the 100-item paginated endpoint instead of assuming a particular example is in the embedded first ten. The existing API and learner engine are unchanged.

`snapshot-35c.js before/after` makes only GET/read-only SQL requests to production and all three existing staging environments. `verify-35c-release.js` compares those snapshots and the protected local file hashes, then checks release artifacts. Transient assessment-session cleanup is excluded from comparison because existing environments may run it independently.

Rollback for this isolated release means stopping use of the new staging URL or visiting its retained `/legacy/`; it does not require changing production, deleting legacy data, or transferring mastery. Phase 3.5D and Phase 4 remain unstarted.
