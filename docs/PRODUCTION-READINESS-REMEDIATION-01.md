# EJ Learning — Production Readiness Remediation 01

**Date:** 2026-09-23 (Pacific/Auckland)

**Branch:** `hotfix/production-readiness-01-ai-auth`

**Audit commit / pre-hotfix main:** `a24c652f90938c109a75f4928b14ee9c41dc66b4`

**Staging Worker:** `ej-learning-36`

**Validated staging version:** `fdc3b7b7-f7b8-49ec-b3e9-146ff311ee43`

## Decision

Repository-side production-readiness remediation is complete.

- Security P0: 0
- Security P1: 0
- CONTENT PHASE CLOSED: YES
- CONTENT READY FOR PRODUCTION: YES
- Remaining production blocker: exact `ej-learning.jwcglass.com` DNS ownership/type reconciliation only

Production was not deployed and no production resource was created. DNS was not changed.

## Content-phase closure

The exact documentary authority is in `docs/CONTENT-PHASE-CLOSURE.md`. It freezes Stage 1–6 for launch, leaves P2/P3 editorial debt as non-blocking backlog, disallows Stage 7 or another pre-launch expansion, and requires future content work to use a separately versioned post-launch task. No curriculum row or relationship was changed.

## Defect and runtime fix

Before this change, an anonymous general `POST /api/ai/tutor` passed request validation and both limiters, reached provider configuration/invocation, and used the client-only KV key `session:<client-session-id>`. Remediation AI already performed its own authentication check. General DELETE also deleted the client-only key without authentication.

The route now uses the canonical `getAuthenticatedSession(request, env, {touch: false})` helper once at its entry point. A missing or invalid session returns `401 AUTH_REQUIRED` before request parsing, rate limiters, curriculum/remediation lookup, KV access, provider configuration, or provider invocation. Remediation reuses that authenticated identity and retains its signed-token, user, and recorded-incorrect-attempt checks.

The exact POST order is:

1. canonical session authentication;
2. bounded request validation;
3. `AI_RATE_LIMITER` and `AI_SHARED_RATE_LIMITER`;
4. bounded canonical/remediation context and user-bound KV history;
5. pinned DeepSeek provider/model invocation;
6. bounded user-bound KV save.

No AI path writes learner progress or curriculum state.

## KV ownership and lifecycle

The old key model was `session:<client-session-id>`. The new model is `session:v2:<HMAC-SHA-256>`, where the HMAC input is a versioned server-side namespace containing the authenticated server user identity and client conversation ID, keyed by `AUTH_SECRET`.

Consequences:

- the same authenticated user and client conversation ID reach the same history;
- two users presenting the same client conversation ID receive different opaque keys;
- a different conversation ID for one user remains distinct;
- neither the raw user ID nor client conversation ID appears in the KV key or public response;
- old staging keys safely age out and are not migrated;
- DELETE derives and removes only the current authenticated user's key.

The remediation authority required an AI history TTL of 3,600 seconds. The implementation had drifted to six hours; this change restores the required `expirationTtl: 3600`. Production will begin with an empty namespace.

## Local evidence

All provider behavior was deterministic and mocked. No real DeepSeek request, OTP delivery, or email delivery occurred.

- `npm run test:production-readiness-remediation-01`: 4/4 pass. Covers anonymous POST/DELETE/remediation cost boundary, two-user isolation, same-user continuity, distinct conversations, owner-scoped delete, 3,600-second TTL, EN/JA prompt separation, pinned provider/model, client override rejection, both limiters, API privacy, and remediation authority.
- `npm run test:4f`: pass. Includes Phase 4F, Phase 4E, recommendations, SRS, progress, auth, SMTP mocks, staging DB policy, AI/API, and browser suites.
- `npm run test:content-quality`: 21/21 pass.
- `npm run test:stage6-expansion-03`: 7/7 pass plus responsive browser matrix.
- `npm run test:36:api`: 8/8 pass.
- `npm run check:36`: pass; no pending migration, zero curriculum seed steps, estimated curriculum row writes 0, correct existing D1/KV bindings.
- `git diff --check`: pass.
- High-confidence tracked secret scan: pass, no matches.

## Staging evidence

Only the existing Worker `ej-learning-36` was deployed. It retained existing D1 `ej-learning-36-db` (`fcd78cc9-5f99-4677-9764-3713e3d1226b`) and KV `AI_SESSIONS` (`3a4a888f427d4d419ee6f56368338e71`). Wrangler reported no migrations to apply and no updated asset files; normal deployment performed no D1 migration or curriculum write.

Live anonymous acceptance on version `fdc3b7b7-f7b8-49ec-b3e9-146ff311ee43`:

- general POST: `401 AUTH_REQUIRED`;
- DELETE: `401 AUTH_REQUIRED`;
- remediation POST: `401 AUTH_REQUIRED`.

The post-deploy deterministic authenticated runtime harness passed general Tutor acceptance, cross-user isolation, same-user continuation, delete ownership, EN/JA isolation, override rejection, both rate limiters, and remediation checks. It used the exact deployed worktree with an in-memory session database, KV, and mock provider because no reusable staging login session was available. It did not send email, write staging D1, or call DeepSeek.

Release identity remained exact:

- bundle: `curriculum-stage6-expansion-03-v1`;
- schema: `CURRICULUM-STAGE6-EXPANSION-03`;
- marker: `2026-09-stage6-expansion-03-v1`;
- lessons / prerequisite edges: 76 / 74;
- raw / runtime-active relationships: 1130 / 1126.

Read-only canonical JSON fingerprints of learner/SRS tables were identical before and after deployment and acceptance:

| Table | Rows | SHA-256 before and after |
| --- | ---: | --- |
| `learning_attempts` | 46 | `0d73e4db5441b3b8ec44d262253544e36aadd7f6c76300d4b1bd30826533bd47` |
| `vocabulary_progress` | 15 | `a842d596d18e72cfd77c43950e4e9be59a17acdef42dc672b299cd48373e3b51` |
| `grammar_progress` | 7 | `2a7a19c3328bb59b8def97077087552aabbf317a91bbfef2612cec8ffbbfeaa5` |
| `lesson_progress` | 5 | `5d3b8827602cefdae4f9d9a81fe5e92a94359e1927160c28c4323c756ceb6b95` |
| `user_settings` | 1 | `b8ec1e298fb7cf788929ca8b17f47e92ae37b95e9a044353a2b4daa7616d6b37` |

## Remaining blocker

The sole remaining production blocker is identifying and reconciling the exact existing proxied DNS record for `ej-learning.jwcglass.com`. This task intentionally did not inspect beyond the already documented permission boundary, alter DNS, create a production Worker/D1/KV/custom domain, or deploy production.

The remediation branch is ready for review and merge. It has not been merged into `main`.
