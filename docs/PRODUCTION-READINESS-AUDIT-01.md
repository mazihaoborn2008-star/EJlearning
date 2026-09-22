# EJ Learning — Production Readiness Audit 01

**Audit date:** 2026-09-22 (Pacific/Auckland)
**Repository:** `E:\E_J_Learn_web`
**Scope:** read-only Cloudflare inventory and local/fresh production release rehearsal
**Decision:** **NOT READY**
**Production resources created or deployed:** **NO**
**Staging mutated:** **NO**

## 1. Release baseline

| Gate | Result |
|---|---|
| Branch | `main` — PASS |
| `HEAD` | `ae4212c7cede3ab1e94cf06f7b8c1d548d47cb14` — exact |
| `origin/main` | `ae4212c7cede3ab1e94cf06f7b8c1d548d47cb14` — exact |
| Initial worktree | clean |
| Initial `git diff --check` | PASS |
| Tracked secret scan | PASS: no tracked `.env`/`.dev.vars`; no private-key, common provider-token, or named secret-assignment signatures |
| Cloudflare account | `bd05aa19111be95427af89be4e44f164` — exact |
| Wrangler auth | OAuth authenticated; no token value printed |
| Node / Wrangler | Node `v24.15.0`; Wrangler `4.130.0` |

Content evidence reports remaining content P0 = 0, remaining content P1 = 0, and **CONTENT READY FOR PRODUCTION: YES** in `docs/PRE-PRODUCTION-EN-WOULD-LIKE-REVIEW-01.md` and the Hotfix 04 implementation. The source does **not** contain the requested exact statement `CONTENT PHASE CLOSED: YES`. The evidence supports a closed content phase, but the strict documentary gate is missing and must be explicitly signed off before resource creation. P2/P3 editorial backlog was not reopened.

The immutable release identity and source-derived invariants pass:

| Invariant | Verified value |
|---|---:|
| Bundle | `curriculum-stage6-expansion-03-v1` |
| Schema | `CURRICULUM-STAGE6-EXPANSION-03` |
| Dataset marker | `2026-09-stage6-expansion-03-v1` |
| Lessons / prerequisite edges | 76 / 74 |
| Raw / runtime-active relationships | 1,130 / 1,126 |
| Roots / reachable | 2 / 76 |
| Terminals | `en-s6-l4`, `ja-s6-l3` |
| Vocabulary | EN 10,000; JA 8,235 |
| Grammar historical | EN 83; JA 98 |
| Grammar published | EN 82; JA 97 |
| Expressions | 713 |

## 2. Cloudflare resource inventory

### Worker inventory

The account contains these relevant Workers: `ej-learning`, `ej-learning-phase3`, `ej-learning-35a`, `ej-learning-35b`, `ej-learning-35c`, `ej-learning-35c1`, `ej-learning-35d`, `ej-learning-35d1`, `ej-learning-35e1c`, `ej-learning-35e2`, and `ej-learning-36`. All have `workers.dev` and preview URLs enabled. No Worker named `ej-learning-prod` exists, so the recommended production Worker name is available.

Only one relevant Worker route exists: `ej_learning.jwcglass.com/*` → `ej-learning`. No Worker Custom Domain record exists for either `ej-learning.jwcglass.com` or `ej_learning.jwcglass.com`. The historical Workers have no other matching routes/custom domains.

The verified staging Worker is `ej-learning-36`; current deployed version is `5b47652f-6be5-493c-a082-23ab5e24f71d`. Its deployed settings bind the expected current runtime resources and expose secret **names only**.

### D1 inventory

All listed D1 databases report backend/version `production`; no `ej-learning-prod-db` exists.

| Name | ID | Size (bytes) | Disposition |
|---|---|---:|---|
| `ej-learning-36-db` | `fcd78cc9-5f99-4677-9764-3713e3d1226b` | 25,116,672 | current staging; 54 tables from direct info |
| `ej-learning-35e2-db` | `8788e336-dc89-4ad9-b0fc-c58ae577d777` | 24,522,752 | historical staging |
| `ej-learning-35e1c-db` | `cc71642a-13e5-4a94-92c9-34372d8cbf3b` | 5,058,560 | historical staging |
| `ej-learning-35d-db` | `2cd594d3-cab0-4715-a154-9ea3d099c4c7` | 81,920 | historical staging/bundle DB |
| `ej-learning-35c1-db` | `3bf1fc19-e5ce-4521-b051-94f91fedfd82` | 3,346,432 | historical content DB |
| `ej-learning-35c-db` | `c854a0e6-d576-4254-b4b6-449fc7517437` | 3,416,064 | historical staging |
| `ej-learning-35b-db` | `97d676a7-e4c7-4d9e-a863-17f096f5cb9c` | 1,368,064 | historical staging |
| `ej-learning-35a-db` | `c5476d39-27ab-4899-b212-671e893971ee` | 1,314,816 | historical staging |
| `ej-learning-phase3-db` | `36c72b9b-da1f-425c-9b1a-6603b0f7d150` | 1,044,480 | historical staging |
| `ej-learning-db` | `e2e8f4c8-27e0-416e-993c-7510259a6b1d` | 139,264 | legacy production-looking DB; do not reuse |

The staging database supports D1 Time Travel; `wrangler d1 time-travel info ej-learning-36-db` returned a current bookmark. No restore was run. A future production D1 must also use the `production` backend. Incident procedure:

```text
wrangler d1 time-travel info ej-learning-prod-db --config wrangler.production-v2.jsonc
wrangler d1 time-travel restore ej-learning-prod-db --bookmark=<approved-pre-change-bookmark> --config wrangler.production-v2.jsonc
```

The restore command is incident-only and requires explicit authorization.

### KV inventory

One account namespace exists: title `AI_SESSIONS`, ID `3a4a888f427d4d419ee6f56368338e71`. It is staging-only and must not be reused.

| Binding | Purpose | Staging namespace | Production action |
|---|---|---|---|
| `AI_SESSIONS` | bounded server-side AI conversation history; deletion on `DELETE /api/ai/tutor`; KV TTL is 3,600 seconds | `3a4a888f427d4d419ee6f56368338e71` | create isolated `ej-learning-prod-ai-sessions`, initially empty |

No other KV binding is referenced by the current Worker. The local rehearsal proved an empty namespace is accepted and remains empty under anonymous/auth-boundary smoke checks.

## 3. Production hostname

The `jwcglass.com` zone is **active**, unpaused, full setup. The intended hostname is **`ej-learning.jwcglass.com`**. The underscore label must not be used.

| Check | Finding |
|---|---|
| `ej-learning.jwcglass.com` DNS | exact public A/AAAA answers exist and return Cloudflare anycast addresses; a random sibling label did not resolve |
| Proxy state | proxied **YES**, inferred from Cloudflare anycast answers and Cloudflare HTTP response |
| Current HTTP/TLS | TLS succeeds, Cloudflare returns `502 Bad Gateway` |
| Exact record type | **UNKNOWN**: OAuth can read zone/routes but DNS record listing returns 403 |
| CNAME conflict | **UNRESOLVED**: public flattening prevents distinguishing proxied A/AAAA from a flattened CNAME without DNS-record read permission |
| Worker route on target | none |
| Worker Custom Domain on target | none |
| Certificate conflict | no certificate failure visible; an edge certificate is already served, but control-plane ownership was not established |
| Free for Worker Custom Domain | **NO, not currently proven free**; an exact proxied DNS presence must be owned and reconciled first |
| `ej_learning.jwcglass.com` public DNS | no A/AAAA/CNAME/TXT answer |
| `ej_learning.jwcglass.com` Worker attachment | stray legacy route `ej_learning.jwcglass.com/*` → `ej-learning` |

This is a stop condition from the brief. Do not create a CNAME. After the exact DNS record is identified and deliberately reconciled, the production Worker should be the origin and use a Worker **Custom Domain**, not a Worker Route.

## 4. Worker topology

Recommended future topology:

- Worker: `ej-learning-prod` (available at audit time).
- Entrypoint: `src/worker-36.js`.
- Assets: `public-36`, binding `ASSETS`, run Worker first.
- Compatibility date: `2026-09-08`; no compatibility flags are currently required.
- `workers_dev: false` after Custom Domain validation. If a private/preview validation path is deliberately used, disable it after public smoke.
- Custom Domain: `ej-learning.jwcglass.com`, represented as a custom-domain route with `custom_domain: true` only after DNS reconciliation.
- Rate-limit bindings: preserve `AI_RATE_LIMITER` and `AI_SHARED_RATE_LIMITER` semantics with production namespace identifiers rather than blindly copying staging identifiers.

No production Worker, version, route, or domain was created.

## 5. D1 topology

Current runtime intentionally uses two semantic binding names pointing to one database:

| Binding | Current target | Production target |
|---|---|---|
| `DB` | `ej-learning-36-db` / `fcd78cc9-5f99-4677-9764-3713e3d1226b` | new `ej-learning-prod-db` |
| `CONTENT_DB` | same staging D1 | the same new production D1 |

`DB` owns auth, learner, SRS, lesson projection, and migrations; `CONTENT_DB` makes content-read intent explicit. Production must preserve both binding names while using one **new** production D1. The staging ID and every historical ID are forbidden in the new config.

Production starts with empty learner/auth state. No staging users, sessions, OTPs, attempts, progress, settings, or SRS rows are copied.

## 6. Secrets and variables

### Secret names and plan

No values were read or printed.

| Secret | Deploy/startup required | Purpose | Plan |
|---|---|---|---|
| `AUTH_SECRET` | not upload-time; required for functional auth/session endpoints; minimum 32 characters | OTP, session, IP and user-agent keyed hashes | **CREATE NEW VALUE**; production-specific |
| `PRACTICE_SECRET` | not upload-time; required for dedicated practice/remediation token isolation; runtime can fall back to `AUTH_SECRET` but production should not | sealed practice and remediation tokens | **CREATE NEW VALUE**; production-specific |
| `AUTH_SMTP_USER` | not upload-time; required when sending OTP | QQ sender mailbox / SMTP username | **INTENTIONALLY REUSE EXISTING PROVIDER CREDENTIAL** only after sender approval |
| `AUTH_SMTP_PASSWORD` | not upload-time; required when sending OTP | QQ SMTP authorization code | **INTENTIONALLY REUSE EXISTING PROVIDER CREDENTIAL** only after sender approval |
| `DEEPSEEK_API_KEY` | not upload-time; required only when AI provider routes execute | DeepSeek provider authentication | **INTENTIONALLY REUSE EXISTING PROVIDER CREDENTIAL** only after quota/abuse-policy approval; otherwise issue a production-scoped key |

### Non-secret variables

| Variable | Value/classification |
|---|---|
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com`; same as staging; code pins HTTPS and host |
| `DEEPSEEK_MODEL` | `deepseek-v4-flash`; same as staging; code rejects other models |
| `AUTH_SMTP_HOST` | `smtp.qq.com`; same as staging |
| `AUTH_SMTP_PORT` | `465`; same as staging; implicit TLS |
| `MAIL_FROM_NAME` | `EJ Learning`; explicit production decision, current value may be retained |

Bindings `ASSETS`, `AI_RATE_LIMITER`, and `AI_SHARED_RATE_LIMITER` are runtime resources, not vars or secrets.

## 7. Wrangler configuration audit

| Files | Classification | Reason |
|---|---|---|
| `wrangler.36.jsonc` | **STAGING ONLY / SAFE REFERENCE** | current Worker/runtime shape; binds staging D1/KV and permits `workers.dev` |
| `wrangler.36.local.jsonc` | **SAFE REFERENCE — LOCAL ONLY** | local runtime shape and fake IDs |
| `wrangler.36.bootstrap.jsonc`; all `wrangler.36.remote-*.jsonc` | **STAGING RECOVERY ONLY — DO NOT USE FOR PRODUCTION** | historical bootstrap shards target the staging D1 and bootstrap Worker |
| `wrangler.curriculum-expansion-01.jsonc`, `wrangler.stage5-expansion-02.jsonc`, `wrangler.stage6-expansion-03.jsonc` | **STAGING UPDATE ONLY** | all bind staging D1/KV; normal production deploy must not use them |
| corresponding `.local.jsonc` expansion configs | **SAFE REFERENCE — LOCAL ONLY** | local delta verification only |
| `wrangler.35a*.jsonc`, `wrangler.35b*.jsonc`, `wrangler.35c*.jsonc`, `wrangler.35c1*.jsonc`, `wrangler.35d*.jsonc`, `wrangler.35d1*.jsonc` | **LEGACY/HISTORICAL STAGING — DO NOT USE** | obsolete Workers, entrypoints, databases, and/or local fixtures |
| all `wrangler.35e1a*.jsonc`, `wrangler.35e1a1*.jsonc`, `wrangler.35e1a2*.jsonc`, `wrangler.35e1b*.jsonc` | **HISTORICAL DATA-BUILD / LOCAL ONLY** | individual migration-family fixtures, not complete runtime configs |
| `wrangler.35e1c.jsonc`, bootstrap/local/base/grammar/roles/vocabulary/expressions and remote variants | **HISTORICAL STAGING / LOCAL — DO NOT USE** | obsolete D1 and split bootstrap topology |
| `wrangler.35e2.jsonc`, bootstrap/local and all remote variants | **HISTORICAL STAGING / LOCAL — DO NOT USE** | obsolete Worker/D1 and split large-vocabulary bootstrap |
| `wrangler.phase3.jsonc` | **LEGACY STAGING — DO NOT USE** | obsolete entrypoint and isolated Phase 3 D1 |
| `wrangler.jsonc` | **LEGACY — DO NOT USE** | legacy `src/worker.js`, `public`, one `DB`, old D1 |
| `wrangler.production.jsonc` | **LEGACY/UNSAFE — DO NOT USE** | invalid underscore Worker Route, legacy entrypoint/assets, `workers_dev: true`, old D1, missing current bindings/secrets/vars |
| `wrangler.production.example.jsonc` | **LEGACY/UNSAFE — DO NOT COPY** | same invalid hostname, old entrypoint/assets/D1, incomplete current runtime |
| `wrangler.staging.jsonc` | **LEGACY/UNSAFE — DO NOT USE** | targets the old `ej-learning` Worker and old D1 and preserves the invalid route |

No existing config is a safe production candidate. The future file should be `wrangler.production-v2.jsonc`; this audit deliberately did not create it. It must contain zero staging IDs, use `src/worker-36.js`, `public-36`, the bindings above, a new D1/KV, unique production rate-limit namespaces, no normal-deploy curriculum import, and eventually one Custom Domain route for `ej-learning.jwcglass.com`.

## 8. Hostname and staging-resource leakage

Tracked occurrences were classified as follows:

- `ej-learning-36`: staging policy/config, staging bootstrap code, tests, and docs only. The bootstrap literal is staging-only, not reached by the production entrypoint.
- `workers.dev`: historical staging docs/tests/scripts and config flags only. `tests/phase36-real-acceptance.mjs` defaults to the current staging URL. No current runtime asset or API emits a hard-coded staging origin.
- `ej_learning.jwcglass.com`: legacy configs, historical route scripts/docs, and the live legacy route. **Production blocker/config hazard**, never a valid target for v2.
- `localhost` / `127.0.0.1`: tests, local audit scripts, and historical docs only; no current `src/worker-36.js`/`public-36` production origin dependency.
- staging D1 ID `fcd78cc9-5f99-4677-9764-3713e3d1226b`: current staging policy/configs/tests/docs only.
- staging KV ID `3a4a888f427d4d419ee6f56368338e71`: current staging policy/configs/tests/docs only.

The future production config must contain none of those staging resource IDs.

## 9. Email, cookie, origin, redirects, and PWA review

- Session cookie is `HttpOnly`, `SameSite=Lax`, `Path=/`, and becomes `Secure` on HTTPS. It has no `Domain` attribute, so production cookies are host-only to `ej-learning.jwcglass.com`.
- A new production `AUTH_SECRET` makes staging cookies cryptographically invalid in production.
- Login rotation revokes a presented prior token; logout revokes the server session and expires the same host-only cookie.
- State-changing auth/progress/settings routes require exact same-origin `Origin`; this derives from `request.url` and works on the custom domain without a hard-coded hostname.
- Navigation/return targets accept only same-origin allowlisted paths and reject open-redirect/encoding attacks.
- OTP email is code-based and carries no absolute return URL.
- Frontend/API fetches are same-origin relative paths. No CORS allowlist is opened.
- No current service worker/PWA registration was found, so there is no stale origin or scope to migrate.

The auth/origin/cookie model is suitable for the custom domain.

## 10. Authoritative from-zero migration manifest

The production runner must preserve the following exact semantic order and assign globally unique migration ledger names. Reusing each directory's local `0001` filename without a consolidated sequence is ambiguous and forbidden.

1. `migrations-35d/0001_schema.sql`
2. `migrations-35d/0002_seed.sql`
3. `migrations-35d/0003_engine.sql`
4. `migrations-35d/0004_curriculum.sql`
5. `migrations-35d/0005_assessment_refinements.sql`
6. `migrations-35d/0006_v2_domains.sql`
7. `migrations-35d/0007_v2_representative.sql`
8. `migrations-35d/0008_v2_editorial_guards.sql`
9. `migrations-35d/0009_academic_alignment.sql`
10. `migrations-35d/0010_academic_expression_example.sql`
11. `migrations-35d/0011_curriculum.sql`
12. `migrations-35d/0012_editorial_refinement.sql`
13. `migrations-35d/0013_reviewed_speech_link.sql`
14. `migrations-35d/0014_final_editorial_judgments.sql`
15. `migrations-35d/0015_reused_pattern_provenance.sql`
16. `migrations-35d/0016_request_variants.sql`
17. `migrations-35d/0017_lessons.sql`
18. `migrations-35d/0018_lesson_exam_recommendations.sql`
19. `migrations-35d/0019_distinct_progression.sql`
20. `migrations-35d/0020_editorial_objectives.sql`
21. `migrations-35e1a/0001_core_grammar_curated_examples.sql`
22. `migrations-35e1a1/0001_curated_grammar_example_target_roles.sql`
23. `migrations-35e1a2/0001_core_vocabulary_curated_usages.sql`
24. `migrations-35e1b/0001_core_expressions_multi_turn_dialogues.sql`
25. `migrations-35e1c/0001_curriculum_gap_filling_lesson_bundle.sql`
26. `migrations-35e1c/0002_lesson_bundle_version.sql`
27. `migrations-35e1c/0003_lesson_target_fidelity_corrective.sql`
28. `migrations-35e1c/0004_ielts65_vocabulary_discovery_corrective.sql`
29. `migrations-35e1c/0005_jlpt_vocabulary_discovery_corrective.sql`
30. `migrations-36/0001_large_vocabulary_schema.sql`
31. `migrations-36/0002_vocabulary_chunk_01.sql`
32. `migrations-36/0003_vocabulary_chunk_02.sql`
33. `migrations-36/0004_vocabulary_chunk_03.sql`
34. `migrations-36/0005_vocabulary_chunk_04.sql`
35. `migrations-36/0006_vocabulary_chunk_05.sql`
36. `migrations-36/0007_vocabulary_chunk_06.sql`
37. `migrations-36/0008_vocabulary_chunk_07.sql`
38. `migrations-36/0009_vocabulary_chunk_08.sql`
39. `migrations-36/0010_vocabulary_chunk_09.sql`
40. `migrations-36/0011_vocabulary_chunk_10.sql`
41. `migrations-36/0012_vocabulary_chunk_11.sql`
42. `migrations-36/0013_vocabulary_chunk_12.sql`
43. `migrations-36/0014_vocabulary_chunk_13.sql`
44. `migrations-36/0015_vocabulary_chunk_14.sql`
45. `migrations-36/0016_vocabulary_chunk_15.sql`
46. `migrations-36/0017_vocabulary_chunk_16.sql`
47. `migrations-36/0018_vocabulary_chunk_17.sql`
48. `migrations-36/0019_vocabulary_chunk_18.sql`
49. `migrations-36/0020_vocabulary_chunk_19.sql`
50. `migrations-36/0021_vocabulary_chunk_20.sql`
51. `migrations-36/0022_vocabulary_chunk_21.sql`
52. `migrations-36/0023_vocabulary_chunk_22.sql`
53. `migrations-36/0024_vocabulary_chunk_23.sql`
54. `migrations-36/0025_vocabulary_chunk_24.sql`
55. `migrations-36/0026_vocabulary_chunk_25.sql`
56. `migrations-36/0027_existing_curated_course_ranks.sql`
57. `migrations-staging-schema/0001_curriculum_dataset_versions.sql`
58. `migrations-staging-schema/0002_phase4a_email_auth.sql`
59. `migrations-staging-schema/0003_phase4b_learner_progress.sql`
60. `migrations-staging-schema/0004_phase4c_srs.sql`
61. `migrations-staging-schema/0005_phase4e_practice_engine.sql`
62. `migrations-staging-schema/0006_phase4f_learner_experience.sql`
63. `migrations-content-quality-01/0001_content_quality_hotfix_01.sql`
64. `migrations-content-quality-02/0001_content_quality_hotfix_02.sql`
65. `migrations-content-quality-03/0001_content_quality_hotfix_03.sql`
66. `migrations-curriculum-expansion-01/0001_curriculum_expansion_01a_bundle.sql`
67. `migrations-stage5-expansion-02/0001_stage5_expansion_02.sql`
68. `migrations-stage5-expansion-02/0002_stage5_lesson_projection.sql`
69. `migrations-stage5-expansion-02/0003_stage5_boundary_projection.sql`
70. `migrations-stage6-expansion-03/0004_stage6_expansion_03.sql`
71. `migrations-stage6-expansion-03/0005_stage6_lesson_projection.sql`
72. `migrations-stage6-expansion-03/0006_stage6_prerequisite_reconciliation.sql`
73. `migrations-content-quality-04/0001_content_quality_hotfix_04.sql`

After all 73 migrations and exact-count validation, run the existing guarded dataset-marker adoption logic for the five entries in `config/staging-data-policy.json`, retargeted to production. Marker adoption is initialization-only and must not run during normal Worker deploys.

## 11. From-zero rehearsal

Two independent fresh rehearsals were run with no staging snapshot or service:

1. An in-memory D1-compatible SQLite database applied the 73 source files from empty with foreign keys enabled and recorded each file's result.
2. A fresh Wrangler local D1 applied byte-identical files under globally unique sequence names. All 73 entered the D1 migration ledger. A second `wrangler d1 migrations apply` returned **No migrations to apply**.

The Wrangler database then adopted exactly five dataset markers through the reviewed policy shape. Normal schema-only deploy remains separate and reports zero curriculum seed steps/writes.

### Final rehearsal invariants

| Check | Result |
|---|---|
| Lessons / edges | 76 / 74 |
| Raw / runtime-active | 1,130 / 1,126 |
| Vocabulary | EN 10,000; JA 8,235 |
| Grammar historical / published | EN 83/82; JA 98/97 |
| Expressions | 713 |
| Bundle / schema / marker | exact required values |
| Roots | `en-s1-l1`, `ja-s1-l1` |
| Reachable / acyclic | 76 / YES |
| Cross-language / missing prerequisites | 0 / 0 |
| Terminals | `en-s6-l4`, `ja-s6-l3` |
| Stage 6 bypass | none |
| Stage 5 CC | 28 `CC SAFE`, 11 `NOT FOR CC` |
| Stage 6 CC | 38 `CC SAFE`, 22 `NOT FOR CC` |
| Expressions assessment authority | none |

Hotfix 02 overview exclusions and Hotfix 03's four bounded Japanese models passed focused and aggregate tests. Hotfix 04 ends with one `en-would-like` canonical record, the approved contrast metadata, one current lesson relationship (`en-s1-l2`), nine examples, seven sentence links, zero CC authority, and runtime policy allowing only `grammar_form_selection`; direct recall returns no compatible exercise.

Fresh learner/auth state after migration, marker adoption, Worker boot, and anonymous smoke remained: 0 users, 0 OTP codes, 0 sessions, 0 attempts, 0 lesson progress, 0 vocabulary progress, 0 grammar progress, and 0 settings. KV contained zero keys.

Dataset markers are exact: EN/JA vocabulary and grammar `2026-09-v1`, lessons `2026-09-stage6-expansion-03-v1`. The first normal Worker request performs no adoption/replay; the 89k-style bootstrap is not in the Worker request/deploy path.

## 12. Local Worker rehearsal

`src/worker-36.js` booted through Wrangler against the fresh local D1 and isolated local KV.

| Check | Result |
|---|---|
| `GET /` | 200; CSP present |
| Stage 6 lesson list | 200; exact six English lessons |
| `en-s6-l4` detail | 200; 8 vocabulary / 3 grammar / 3 expressions; no editorial metadata leak |
| Grammar list | 200; Hotfix 04 contrast metadata visible |
| Anonymous practice | 401 `AUTH_REQUIRED` |
| Anonymous recommendations | 401 `AUTH_REQUIRED` |
| Anonymous dashboard/progress | 401 `AUTH_REQUIRED` |
| Invalid OTP send/verify contracts | 400; no mail sent, no DB writes |
| Remediation AI anonymous boundary | 401 `AUTH_REQUIRED`; no model call |
| General AI Tutor anonymous request | reached provider configuration and returned 503 only because no local API key existed; see P1 below |

Focused validation passed: content quality 21/21; Expansion 01 7/7 plus responsive fixture; Stage 5 9/9 plus responsive fixture; Stage 6 7/7 plus responsive fixture; Phase 4/auth/progress/SRS/practice/AI/deploy-policy 107/107.

## 13. Auth, KV, AI, and SMTP production model

### Auth

The schema is fresh and empty. Staging users/sessions must not migrate. Cookies and same-origin controls are custom-domain compatible. Auth, progress, correctness, SRS schedule, and recommendation priority remain server-authoritative; tests reject client `user_id`, correctness, SRS, and priority-shaped input.

### KV

Production KV starts empty. Conversation keys are `session:<client-session-id>`, history is bounded, and normal records expire after one hour. `DELETE /api/ai/tutor` deletes the KV record. No staging conversation can appear because the namespace is isolated.

### AI Tutor

EN and JA system prompts are independently bounded; curriculum fields are treated as data. Context is canonical, language-checked, size-bounded, and cannot override system/model/provider. Model and provider are server-pinned. Remediation is user-bound to a server-recorded incorrect attempt and advisory only; AI does not write progress or curriculum.

**P1:** the general (non-remediation) `/api/ai/tutor` flow does not call `getAuthenticatedSession`. It is rate-limited but can invoke DeepSeek anonymously when `DEEPSEEK_API_KEY` is configured. The brief explicitly requires an AI endpoint auth boundary. Before production, either require authentication for general Tutor requests or obtain explicit production acceptance of anonymous provider spend/abuse exposure and revise the gate. Remediation already returns 401 anonymously.

### SMTP

The configured shape is `smtp.qq.com:465`, implicit TLS, EHLO, `AUTH LOGIN`, UTF-8 MIME, and sender name from `MAIL_FROM_NAME`. Tests prove credential/OTP log redaction and fail-closed behavior. Existing mailbox credentials may be reused only deliberately; no mail was sent in this audit.

## 14. Security findings

| Severity | Count | Finding |
|---|---:|---|
| P0 | 0 | none |
| P1 | 1 | general AI Tutor is not authenticated and can incur provider calls once the production key is installed |
| P2 | 0 | none opened for this release gate |
| P3 | 1 | numerous legacy configs/scripts can target old Workers/D1 or the invalid underscore route if manually selected; disposition is explicit `DO NOT USE` |

Additional gates passed: no committed secret file/value, no unsafe CORS, no admin/debug route in the current Worker, no browser-authoritative user/correctness/SRS/recommendation fields, no arbitrary AI model/system override, and no public hidden answers/editorial fields.

## 15. Build and dependency findings

The current runtime build path passed through `npm run check:36`; Wrangler read 44 assets, produced a 280.82 KiB upload (66.44 KiB gzip), found no pending staging schema migration, and exited at `--dry-run`. It did not deploy.

`npm audit --json` reports 0 critical, 3 high, 0 moderate/low vulnerabilities: direct dev dependency Wrangler `4.130.0`, transitive Miniflare, and transitive Sharp/libheif. The available non-major update is Wrangler `4.136.2` / Sharp `0.35.4+`. These packages are local development/build tooling; the audit found no separate application production-runtime package vulnerability. Do not auto-upgrade in this task; validate the update separately.

## 16. Future authorized deployment sequence

1. Resolve the exact `ej-learning.jwcglass.com` DNS record type/owner and reconcile it; separately decide whether to remove the invalid underscore Worker route.
2. Close the general AI Tutor auth decision/fix and add the explicit content-phase closure marker.
3. Create production D1 `ej-learning-prod-db` on the production backend.
4. Create KV `ej-learning-prod-ai-sessions`.
5. Record IDs locally; do not commit secrets.
6. Materialize the reviewed, globally unique 73-file production migration manifest and `wrangler.production-v2.jsonc` with no staging IDs.
7. Initialize the empty D1; validate counts, graph, Hotfixes, and empty learner state before exposure; adopt the five dataset markers once.
8. Create/upload `ej-learning-prod` using `src/worker-36.js`; configure the five secrets and non-secret vars.
9. Validate privately by version preview or an intentionally enabled temporary `workers.dev` path.
10. Run public/API/auth-boundary/zero-write smoke against production resources without sending OTP or calling AI unless separately authorized.
11. Capture and record a production D1 Time Travel bookmark.
12. Attach `ej-learning.jwcglass.com` as a Worker Custom Domain; do not pre-create a competing CNAME.
13. Verify DNS/TLS, run final public smoke, then disable `workers.dev`/preview exposure if policy requires.

Normal deploy thereafter applies only pending schema migrations and Worker code; curriculum updates use a separately authorized forward-only dataset path.

## 17. Rollback and monitoring

### Rollback

- Worker defect: deploy/rollback to the last known-good production Worker version; leave D1 unchanged.
- D1 defect: stop writes/exposure, inspect `wrangler d1 time-travel info ej-learning-prod-db`, and restore only the approved pre-change bookmark under incident authorization.
- Domain defect: detach/change the Worker Custom Domain only under explicit incident action; do not improvise a route/CNAME.
- Secret defect: correct the named secret and redeploy/roll back the Worker as appropriate. Rotating `AUTH_SECRET` intentionally invalidates all production sessions; coordinate it as an incident action.

### Minimum post-live smoke

Check `GET /`, lesson list/detail, review and practice pages, invalid send-code/verify contracts without delivery, protected endpoints returning 401 anonymously, recommendation ordering, Hotfix 02/03/04 behavior, zero-write GETs, absence of hidden editorial/internal fields, TLS/DNS, and representative 360/390/430/768/1440 widths. Provider/SMTP live calls require separate authorization.

## 18. Production resource creation decision

**READY FOR PRODUCTION RESOURCE CREATION: NO**

Blocking items:

1. `ej-learning.jwcglass.com` already has an exact proxied DNS presence and returns Cloudflare 502. DNS-record read permission was unavailable, so its type/owner and any flattened CNAME conflict are unresolved. The hostname is not proven free for a Worker Custom Domain.
2. General `/api/ai/tutor` is not authenticated and would call the provider anonymously once the production key exists (P1).
3. The existing source does not contain the required exact `CONTENT PHASE CLOSED: YES` sign-off.

The migration chain, local D1/Worker rehearsal, content invariants, secrets plan, topology, and rollback design otherwise pass. No production Worker, D1, KV, DNS record, route, custom domain, secret, or version was created; staging remained untouched.

## 19. Requested final-report checklist

1. Main hash: `ae4212c7cede3ab1e94cf06f7b8c1d548d47cb14`.
2. Cloudflare account: `bd05aa19111be95427af89be4e44f164`.
3. `jwcglass.com` zone: active YES.
4. Underscore hostname: invalid label; no public answer; stray Worker route exists to legacy `ej-learning`.
5. `ej-learning.jwcglass.com` availability: NO, not proven free.
6. Conflict: exact proxied public DNS presence, Cloudflare 502; no Worker route/custom domain; record type/CNAME status unavailable due 403.
7. Staging: Worker `ej-learning-36`, version `5b47652f-6be5-493c-a082-23ab5e24f71d`; D1 `ej-learning-36-db` exact ID confirmed.
8. Production-like Workers: legacy `ej-learning`; no `ej-learning-prod`; historical inventory recorded above.
9. Production-like D1: legacy `ej-learning-db`; no `ej-learning-prod-db`; full inventory above.
10. D1 bindings: `DB`, `CONTENT_DB`, intentionally same new production D1.
11. KV bindings: `AI_SESSIONS`, new isolated namespace.
12. Secret names: `AUTH_SECRET`, `PRACTICE_SECRET`, `AUTH_SMTP_USER`, `AUTH_SMTP_PASSWORD`, `DEEPSEEK_API_KEY`.
13. Non-secret vars: `DEEPSEEK_BASE_URL`, `DEEPSEEK_MODEL`, `AUTH_SMTP_HOST`, `AUTH_SMTP_PORT`, `MAIL_FROM_NAME`.
14. Legacy production config: `LEGACY/UNSAFE — DO NOT USE`.
15. Worker name: `ej-learning-prod`.
16. D1 name: `ej-learning-prod-db`.
17. KV name: `ej-learning-prod-ai-sessions`.
18. Final hostname: `ej-learning.jwcglass.com` after reconciliation.
19. Migration manifest: exact 73-file sequence in section 10 plus guarded five-marker adoption.
20. From-zero result: PASS in SQLite and Wrangler local D1.
21. Lessons/edges: 76/74.
22. Raw/runtime: 1,130/1,126.
23. Canonical totals: EN vocab 10,000; JA vocab 8,235; grammar EN 83/82, JA 98/97; expressions 713.
24. Bundle/schema/marker: exact required values.
25. Graph: 2 roots, 76 reachable, acyclic, no missing/cross-language edge or Stage 6 bypass; exact terminals.
26. Hotfix 02: PASS; overview records non-authoritative.
27. Hotfix 03: PASS; bounded Japanese forms exact.
28. Hotfix 04: PASS; exact metadata/1 relationship/9 examples/7 links/0 CC/selection-only.
29. Stage 5 CC: 28 safe / 11 not-for-CC.
30. Stage 6 CC: 38 safe / 22 not-for-CC.
31. Fresh learner/auth: all eight checked tables zero.
32. Markers/adoption: five exact markers; no request/deploy replay.
33. Second run: PASS, no migrations to apply; no duplicate/count/learner change.
34. Worker rehearsal: PASS except identified general-AI auth P1.
35. Auth production review: cookie/origin/logout/session isolation PASS; empty start.
36. KV production review: isolated empty namespace, TTL/deletion behavior PASS.
37. AI Tutor review: bounded prompts/context/provider PASS; general auth boundary FAIL (P1).
38. SMTP review: QQ 465 implicit TLS/AUTH LOGIN and sender name PASS; no mail sent.
39. Secrets plan: new auth/practice secrets; deliberate provider credential reuse only.
40. Custom-domain architecture: correct target, but blocked on existing DNS reconciliation.
41. Rollback: Worker version + D1 Time Travel bookmark + explicit domain/secret incident actions.
42. Security counts: P0 0 / P1 1.
43. Build/dependency: build PASS; Node 24.15.0; Wrangler 4.130.0; three high dev-tool audit entries.
44. Remaining blockers: DNS ownership/type, general AI auth, missing exact content-phase closure marker.
45. READY FOR PRODUCTION RESOURCE CREATION: **NO**.
46. Document: `docs/PRODUCTION-READINESS-AUDIT-01.md`.
47. Production resources created: **NO**.
48. Staging untouched: **YES**.
