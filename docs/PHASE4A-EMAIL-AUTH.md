# Phase 4A email authentication

Phase 4A adds passwordless email verification to the Phase 3.6 staging Worker. It does not add learner progress storage, change AI prompts, or migrate curriculum data.

## Runtime configuration

Authentication fails closed unless all required bindings are present:

- `DB`: the existing `ej-learning-36-db` D1 binding.
- `AUTH_SECRET`: a random secret of at least 32 characters, configured with `wrangler secret put`; it keys OTP, session, IP, and user-agent hashes.
- `AUTH_EMAIL`: a Cloudflare Email Service send binding.
- `MAIL_FROM_ADDRESS`: a sender address on a domain onboarded to Cloudflare Email Service.

No SMTP password, provider API key, or sender credential belongs in Git, D1, the frontend, fixtures, or Wrangler variables.

The existing reference application's QQ Mail SMTP transport is not copied. Its Python `smtplib` implementation and implicit-TLS connection are not directly reusable inside the current Worker application. The Worker adapter instead uses Cloudflare's native email binding, so no third-party SDK is added.

## Staging activation (after implementation review)

Do not perform these steps while D1 write quota is exhausted.

1. In the existing Cloudflare account, onboard the chosen sender domain to Email Service and verify the sending DNS records.
2. Choose a sender such as `login@your-onboarded-domain.example` and set `MAIL_FROM_ADDRESS` as a non-secret staging variable.
3. Add a `send_email` binding named `AUTH_EMAIL` to the reviewed staging Wrangler configuration, restricted to the chosen sender address where supported.
4. Generate an independent high-entropy value and run `npx wrangler secret put AUTH_SECRET --config wrangler.36.jsonc`. Do not reuse or copy the reference application's SMTP password or auth secrets.
5. When the D1 quota has recovered and deployment is explicitly authorized, run the configured pending schema-migration command against the existing `ej-learning-36-db` (including `0002_phase4a_email_auth.sql`), deploy the staging Worker, and validate delivery to controlled test mailboxes.

Tests inject a mock mail sender directly into the auth handler. They never invoke the live binding and never log a verification code from a staging or production request.

## Policy

- OTP: six numeric digits, 10-minute expiry, five attempts.
- Sending: 60-second cooldown, three sends per normalized email per 10 minutes, five per hour, and 20 per source IP per hour.
- Identity: trimmed email, lower-cased for unique comparison; no provider-specific dot or plus rewriting.
- Session: random 256-bit bearer token in an `HttpOnly`, `SameSite=Lax`, `Path=/` cookie, with `Secure` on HTTPS and a seven-day lifetime. D1 stores only its HMAC-SHA-256 representation.
- CSRF: every state-changing auth request requires an exact same-origin `Origin`; the session cookie's SameSite policy provides a second browser boundary.
- Cleanup: old consumed/expired codes and sessions are removed opportunistically during code-send traffic.
