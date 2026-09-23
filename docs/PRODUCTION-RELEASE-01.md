# EJ Learning Production Release 01

Release status: **LIVE**

- Release branch: `release/production-v1`
- Remediation/main hash: `15459814add6256f6de05ab8338384fe3c524502`
- Public endpoint: `https://ej-learning.jwcglass.com/`
- Final Worker version: `9464c259-1dea-4161-abcf-11760fd6dc92`
- Final deployment time: `2026-09-23T09:51:52Z`

## Historical D1 slot reclamation

- Deleted database: `ej-learning-35d-db` (`2cd594d3-cab0-4715-a154-9ea3d099c4c7`)
- Private backup: `E:\E_J_Learn_web-private-backups\d1-slot-reclamation-01\ej-learning-35d-db-2026-09-23.sql`
- Backup size: 48,724 bytes
- Backup SHA-256: `03bd01001591d6707332f46f205804728db974046f49f5fe8febc92fa49da33f`
- The export was restored into an isolated in-memory SQLite database and its Phase 35D schema/content markers were verified before deletion.

## Production resources

- D1: `ej-learning-prod-db` (`864538ef-1e88-427f-83b7-2c0846d3133d`), production backend, OC placement
- KV: `ej-learning-prod-ai-sessions` (`0d20dbe0cefd4d57b6f3bff2a7f46c78`)
- Rate limits: `AI_RATE_LIMITER=370001` at 12/60 seconds; `AI_SHARED_RATE_LIMITER=370002` at 120/60 seconds
- Worker: `ej-learning-prod`
- Custom Domain: `ej-learning.jwcglass.com`
- Final exposure: `workers_dev=false`, `preview_urls=false`, one Cloudflare-managed Custom Domain, no Worker Route
- Required secret names present: `AUTH_SECRET`, `PRACTICE_SECRET`, `AUTH_SMTP_USER`, `AUTH_SMTP_PASSWORD`, `DEEPSEEK_API_KEY`

No secret value was printed, logged, written to the repository, or included in this document.

## Database initialization and acceptance

- The production database was initialized from empty using the audited 73-file manifest in `migrations-production-v2/manifest.json`.
- All 73 payloads are byte-identical to their audited source migrations and appear once in `d1_migrations`.
- Second migration run: `No migrations to apply`.
- Five reviewed dataset markers were adopted once; adoption wrote five metadata rows and zero curriculum rows.
- Dataset markers: EN/JA vocabulary and grammar `2026-09-v1`; lessons `2026-09-stage6-expansion-03-v1`.

Final accepted data:

- 76 lessons, 74 prerequisite edges, 1,130 raw relationships, 1,126 runtime-active relationships
- Vocabulary: EN 10,000; JA 8,235
- Grammar: EN 83 historical / 82 published; JA 98 historical / 97 published
- Expressions: 713
- Graph: 2 roots, 76 reachable, acyclic, zero missing prerequisites, zero cross-language edges, zero Stage 6 bypass
- Terminals: `en-s6-l4`, `ja-s6-l3`
- Hotfix 02/03/04: PASS/PASS/PASS
- Stage 5 CC: 28 SAFE / 11 NOT FOR CC
- Stage 6 CC: 38 SAFE / 22 NOT FOR CC
- Learner/auth tables: users, OTP codes, sessions, attempts, lesson progress, vocabulary progress, grammar progress, and settings all zero
- Production AI KV: zero keys

## Worker versions and rollback point

- Initial unreachable application version: `0e22437c-2bbb-41c0-8abd-082e86f080c3`
- Reviewed preview version: `d979fd11-c4b4-4b6d-a2cd-4220e05f052a`
- Temporary preview alias: `https://production-release-01-ej-learning-prod.yanjian-language-learning.workers.dev` (now disabled)
- Temporary preview-enablement deployment: `e9e4ab23-91cc-4784-865c-c97a4484302e`
- Pre-public-cutover D1 bookmark: `00000006-00000000-000050ef-58bd91d1f89347f84564edc5b765c515`
- Bookmark capture window: after preview zero-write acceptance and before the final DNS precheck at `2026-09-23T09:51:16.483Z`
- Final production version: `9464c259-1dea-4161-abcf-11760fd6dc92`
- Post-release reference bookmark observed at `2026-09-23T09:59:40.8664092Z`: `00000007-00000000-000050ef-7998c62f7ea140f0967548aa1e5de725`

## Smoke and security results

Pre-domain preview:

- Home, Stage 6 lesson list, `en-s6-l4` detail, and Hotfix 04 metadata: PASS
- Anonymous practice, recommendations, dashboard/progress, Tutor POST, Tutor DELETE, and remediation: `401 AUTH_REQUIRED`
- Privacy scan: no hidden answers, editorial approval fields, internal practice policy, secret names/values, derived KV keys, or user identifiers in inspected public payloads
- Browser matrix: home, lesson list, lesson detail, practice, and review at 360/390/430/768/1440; 25/25 checks passed with no horizontal overflow, page errors, or 5xx responses
- D1 learner/auth state and KV remained zero after smoke

Final public acceptance:

- Cloudflare Custom Domain enabled for `ej-learning-prod`; certificate present
- Public 1.1.1.1 and 8.8.8.8 DNS: Cloudflare A/AAAA answers, no CNAME
- TLS verification: PASS on both published IPv4 answers
- `GET /`: 200, expected `首页 · 言间` application, CSP and Cloudflare response headers present
- Stage 6 list: 200 with six English lessons
- `en-s6-l4`: 200 with 8 vocabulary, 3 grammar, and 3 expressions
- Hotfix 04 `en-would-like`: exact approved contrast, 9 examples, 7 sentence links
- Anonymous protected and AI boundaries: all required checks returned `401 AUTH_REQUIRED`
- Privacy: PASS
- Live browser matrix: 25/25 checks passed at 360/390/430/768/1440
- Final database and KV zero-write verification: PASS
- Focused gates: production remediation 4/4, content quality 21/21, Stage 6 7/7
- Production P0: 0; Production P1: 0
- Staging remained on version `fdc3b7b7-f7b8-49ec-b3e9-146ff311ee43` and was not modified.

## Rollback procedure

Rollback is incident-only and requires explicit authorization.

1. Stop or isolate public traffic first by removing the Custom Domain from a reviewed copy of `wrangler.production-v2.jsonc` and deploying the trigger change. Do not create a manual A/CNAME.
2. For a Worker-only rollback, deploy a reviewed known-good version, for example:

   `npx wrangler versions deploy 0e22437c-2bbb-41c0-8abd-082e86f080c3@100% --config wrangler.production-v2.jsonc --yes`

3. Do not restore D1 for a Worker-only incident. If and only if database rollback is separately approved, inspect the pre-cutover bookmark first and then use Cloudflare D1 Time Travel against `DB` with bookmark `00000006-00000000-000050ef-58bd91d1f89347f84564edc5b765c515`.
4. After any rollback, rerun the migration-status, production D1 acceptance, learner/auth zero-state, KV, TLS, authorization-boundary, privacy, and responsive checks before restoring public traffic.

The release branch must remain separate from `main` until separately reviewed and authorized for merge.
