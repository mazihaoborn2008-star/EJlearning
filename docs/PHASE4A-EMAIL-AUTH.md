# Phase 4A email authentication

Phase 4A adds passwordless email verification to the Phase 3.6 staging Worker. It does not add learner progress storage, change AI prompts, or migrate curriculum data.

## Runtime configuration

Authentication fails closed unless all required bindings are present:

- `DB`: the existing `ej-learning-36-db` D1 binding.
- `AUTH_SECRET`: a random secret of at least 32 characters, configured with `wrangler secret put`; it keys OTP, session, IP, and user-agent hashes.
- `AUTH_SMTP_USER`: the QQ Mail sender address, configured as a Worker secret.
- `AUTH_SMTP_PASSWORD`: the QQ Mail SMTP authorization code (not the account password), configured as a Worker secret.
- `AUTH_SMTP_HOST=smtp.qq.com`, `AUTH_SMTP_PORT=465`, and `MAIL_FROM_NAME=EJ Learning`: non-secret staging variables.

No SMTP password, provider API key, or sender credential belongs in Git, D1, the frontend, fixtures, or Wrangler variables.

The reference application's Python `smtplib` implementation is not copied. The Worker uses `cloudflare:sockets` for a fresh implicit-TLS connection to QQ Mail on every message, implements only the required SMTP commands, and selects the server-advertised `AUTH LOGIN` mechanism. It does not use port 25, STARTTLS, Cloudflare Email Service, or a third-party mail provider.

## Staging activation (after implementation review)

Do not perform these steps while D1 write quota is exhausted.

1. Confirm SMTP service is enabled for the approved QQ Mail sender and obtain its SMTP authorization code. Do not use the normal QQ account password.
2. Generate an independent high-entropy auth value and run `npx wrangler secret put AUTH_SECRET --config wrangler.36.jsonc`.
3. Run `npx wrangler secret put AUTH_SMTP_USER --config wrangler.36.jsonc` and enter the QQ sender address only at Wrangler's hidden prompt.
4. Run `npx wrangler secret put AUTH_SMTP_PASSWORD --config wrangler.36.jsonc` and enter the QQ SMTP authorization code only at Wrangler's hidden prompt.
5. When the D1 quota has recovered and deployment is explicitly authorized, run the configured pending schema-migration command against the existing `ej-learning-36-db` (including `0002_phase4a_email_auth.sql`), deploy the staging Worker, and perform one controlled login-code delivery test.

Tests inject a mock mail sender directly into the auth handler. They never authenticate to the live SMTP service and never log a verification code from a staging or production request.

## Policy

- OTP: six numeric digits, 10-minute expiry, five attempts.
- Sending: 60-second cooldown, three sends per normalized email per 10 minutes, five per hour, and 20 per source IP per hour.
- Identity: trimmed email, lower-cased for unique comparison; no provider-specific dot or plus rewriting.
- Session: random 256-bit bearer token in an `HttpOnly`, `SameSite=Lax`, `Path=/` cookie, with `Secure` on HTTPS and a seven-day lifetime. D1 stores only its HMAC-SHA-256 representation.
- CSRF: every state-changing auth request requires an exact same-origin `Origin`; the session cookie's SameSite policy provides a second browser boundary.
- Cleanup: old consumed/expired codes and sessions are removed opportunistically during code-send traffic.
