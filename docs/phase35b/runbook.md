# Phase 3.5B runbook

Use only `wrangler.35b.local.jsonc` and `wrangler.35b.jsonc` for this phase. Never use the default, production, Phase 3 or Phase 3.5A deployment/migration commands.

## Local

```powershell
node scripts/prepare-35b.js
node node_modules/wrangler/bin/wrangler.js d1 migrations apply DB --local --config wrangler.35b.local.jsonc --persist-to .wrangler/35b-local
node node_modules/wrangler/bin/wrangler.js dev --config wrangler.35b.local.jsonc --port 8797 --persist-to .wrangler/35b-local
```

Open `http://127.0.0.1:8797`. Original UI is at `/legacy/`. Choose a new persistence directory for a completely fresh build; no existing local databases need deletion. Migration copies 0001–0008 must match `migrations-v2/` byte-for-byte. Additive 0009/0010 belong only to the `migrations-35b/` stream.

```powershell
$env:BASE_URL='http://127.0.0.1:8797'
node --test tests/phase35b.test.js tests/phase35a-api.test.js tests/phase35a-db.test.js tests/phase3-api.test.js tests/phase3-engine.test.js
node tests/phase35b-browser.cjs
node tests/phase35b-accessibility.cjs
node scripts/verify-35b-d1.js
$env:BASE_URL='http://127.0.0.1:8797/legacy'
$env:TEST_LABEL='35b-local'
node tests/phase3-browser.cjs
```

Browser tests use installed Chrome and Playwright. Set `TEST_LABEL=staging` and `BASE_URL` to the isolated 35b origin for new-UI testing; append `/legacy` only for the old browser suite. Existing API tests should use the base origin. `verify-35b-d1.js --remote` targets only the new D1 and performs rejected negative-write probes; never repoint it at another environment.

## Dedicated staging

- Worker `ej-learning-35b`
- D1 `ej-learning-35b-db`: `97d676a7-e4c7-4d9e-a863-17f096f5cb9c`
- [workers.dev preview](https://ej-learning-35b.yanjian-language-learning.workers.dev)
- No custom route/domain; no cron, AI binding, token or secret.

The database was newly created and migrated from scratch, not cloned from production. Release guards assert Worker, entry point, assets directory, binding name/ID, no routes, dedicated migration stream, and exclusion of all three protected D1 IDs.

```powershell
node scripts/release-35b.js migrate
node scripts/release-35b.js deploy
node scripts/verify-35b-d1.js --remote
node scripts/snapshot-35b.js after
node scripts/verify-35b-release.js
```

Applied migrations are immutable. Subsequent changes require new additive migration files. The preparation script only verifies/copies old migrations and legacy assets; it does not regenerate representative seed content.

## Integrity evidence

`snapshot-35b.js` reads deployments, settings hashes, schema, migration history, content table hashes, GET response hashes, and available route/domain/DNS metadata for production, Phase 3 staging and Phase 3.5A staging. It writes no remote state. Transient assessment sessions are excluded because existing cleanup runs may change them independently.

The final release verifier compares remote snapshots exactly and every protected local file hash individually (new 35b-owned files are allowed). It additionally verifies byte-identical legacy asset copies and the dedicated 35b binding, workers.dev status, absence of custom routes/domains, public pages and private-path 404s.

No production cutover is authorized by this runbook. 3.5C curriculum review/migration, 3.5D progress/engine migration and Phase 4 AI remain separate future work.
