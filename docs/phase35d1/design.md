# Phase 3.5D.1 — AI Dynamic Examples

This phase is isolated in the `ej-learning-35d1` Worker and `public-35d1` asset directory. Phase 3.5D remains the baseline and is not deployed or mutated by this phase.

## Scope

- One endpoint: `POST /api/ai/examples`.
- One feature: five temporary Dynamic Examples for a canonical grammar point.
- Supported contexts: Grammar Library detail and the Lesson Grammar step.
- Supported modes: default, refresh, simpler, and harder.
- No lesson generation, curriculum mutation, grading, tutor proxy, exercise engine, or database population.

## Trust and storage boundaries

- `DEEPSEEK_API_KEY` is a required Cloudflare Worker secret. Only the secret name is declared in configuration; its value is never stored in the repository.
- Provider host and model come only from server bindings. The provider URL is additionally pinned to HTTPS on `api.deepseek.com` to prevent SSRF.
- The client can submit only `grammar_id`, optional `lesson_id`, and a fixed mode enum. Unknown fields are rejected.
- Grammar, existing curated examples, lesson membership, stage, and linked vocabulary are resolved server-side from canonical IDs using SELECT-only queries.
- Generated examples are never written to D1 or curriculum data. Cache API entries are ephemeral, isolated from curriculum, and expire after 300 seconds.
- Telemetry contains outcome category, latency, cache hit, result count, provider-call count, and aggregate token count only. It never contains the key, prompt, provider response, or generated sentences.

## Cost and failure boundaries

- Maximum five returned examples and two provider calls per learner request.
- Provider timeout: 9 seconds per call. Provider response limit: 64 KiB. Client request limit: 1 KiB. Output limit: 700 tokens per call.
- Rate limits: 12 requests per actor and a shared cap of 120 requests per 60 seconds per Cloudflare location, enforced by isolated Cloudflare Rate Limiting bindings.
- Provider errors, timeouts, quota errors, invalid JSON, invalid schemas, and missing configuration produce one sanitized learner message. Curated content remains available.

Representative DeepSeek outputs, when staging is authorized, are QA-only artifacts under this directory. They are not runtime assets or curriculum content and should be retained only for phase acceptance/review.
