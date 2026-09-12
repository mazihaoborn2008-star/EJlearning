import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {auth, authPolicy, generateSecureCode, generateSecureToken, normalizeEmail} from '../src/auth-4a.js';

const origin = 'https://ej-learning.test';
const secret = 'phase4a-test-secret-that-is-longer-than-thirty-two-characters';

function d1() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  sqlite.exec(fs.readFileSync(new URL('../migrations-staging-schema/0002_phase4a_email_auth.sql', import.meta.url), 'utf8'));
  const wrap = (sql, values = []) => ({
    bind: (...next) => wrap(sql, next),
    async first() { return sqlite.prepare(sql).get(...values) || null; },
    async all() { return {results: sqlite.prepare(sql).all(...values)}; },
    async run() {
      const result = sqlite.prepare(sql).run(...values);
      return {success: true, meta: {changes: Number(result.changes)}};
    }
  });
  return {
    sqlite,
    prepare: sql => wrap(sql),
    async batch(statements) {
      sqlite.exec('BEGIN');
      try {
        const results = [];
        for (const statement of statements) results.push(await statement.run());
        sqlite.exec('COMMIT');
        return results;
      } catch (error) {
        sqlite.exec('ROLLBACK');
        throw error;
      }
    }
  };
}

function harness(start = 2_000_000_000) {
  const DB = d1();
  let now = start;
  let sequence = 0;
  const deliveries = [];
  const services = {
    now: () => now,
    randomCode: () => String(123450 + sequence++).padStart(6, '0'),
    randomToken: length => `token_${length}_${sequence++}_${'x'.repeat(length)}`,
    mailSender: async (_env, message) => deliveries.push(message)
  };
  const env = {DB, AUTH_SECRET: secret};
  return {DB, env, services, deliveries, advance: seconds => { now += seconds; }, now: () => now};
}

function request(path, {method = 'GET', body, cookie, requestOrigin = origin, ip = '203.0.113.7'} = {}) {
  const headers = new Headers({'User-Agent': 'phase4a-test', 'CF-Connecting-IP': ip});
  if (body !== undefined) headers.set('Content-Type', 'application/json');
  if (requestOrigin !== null) headers.set('Origin', requestOrigin);
  if (cookie) headers.set('Cookie', cookie);
  return new Request(origin + path, {method, headers, body: body === undefined ? undefined : JSON.stringify(body)});
}

const post = (h, path, body, extra) => auth(request(path, {method: 'POST', body, ...extra}), h.env, h.services);
const cookieFrom = response => response.headers.get('Set-Cookie')?.split(';')[0];
const send = async (h, email = 'Learner@Example.COM', extra) => {
  const response = await post(h, '/api/auth/email/send-code', {email}, extra);
  return {response, body: await response.json(), code: h.deliveries.at(-1)?.code};
};
const verify = async (h, email, code, extra) => {
  const response = await post(h, '/api/auth/email/verify', {email, code}, extra);
  return {response, body: await response.json()};
};

test('email normalization is case-insensitive without provider-specific rewriting', () => {
  assert.deepEqual(normalizeEmail('  Name+Study@Example.COM  '), {normalized: 'name+study@example.com', display: 'Name+Study@example.com'});
  assert.throws(() => normalizeEmail('not-an-email'));
  assert.throws(() => normalizeEmail('a..b@example.com'));
});

test('production token and OTP generators use bounded cryptographic output shapes', () => {
  const tokens = new Set(Array.from({length: 100}, () => generateSecureToken()));
  assert.equal(tokens.size, 100);
  for (const token of tokens) assert.match(token, /^[A-Za-z0-9_-]{43}$/);
  for (let index = 0; index < 100; index += 1) assert.match(generateSecureCode(), /^\d{6}$/);
});

test('send-code accepts a valid email and returns only generic delivery copy', async () => {
  const h = harness();
  const {response, body, code} = await send(h);
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.match(body.message, /如果邮箱地址有效/);
  assert.equal(h.deliveries[0].to, 'Learner@example.com');
  assert(!JSON.stringify(body).includes(code));
});

test('send-code rejects malformed email syntax without sending mail', async () => {
  const h = harness();
  const result = await send(h, 'broken-address');
  assert.equal(result.response.status, 400);
  assert.equal(result.body.error.code, 'EMAIL_INVALID');
  assert.equal(h.deliveries.length, 0);
});

test('resend cooldown preserves a 60 second boundary', async () => {
  const h = harness();
  assert.equal((await send(h)).response.status, 200);
  h.advance(59);
  const blocked = await send(h);
  assert.equal(blocked.response.status, 429);
  assert.equal(blocked.body.error.code, 'RESEND_COOLDOWN');
  h.advance(1);
  assert.equal((await send(h)).response.status, 200);
});

test('email and IP send frequency limits are enforced', async () => {
  const emailHarness = harness();
  for (let index = 0; index < authPolicy.emailSendLimit10Minutes; index += 1) {
    assert.equal((await send(emailHarness)).response.status, 200);
    emailHarness.advance(60);
  }
  const emailBlocked = await send(emailHarness);
  assert.equal(emailBlocked.body.error.code, 'RATE_LIMITED');

  const ipHarness = harness();
  for (let index = 0; index < authPolicy.ipSendLimitHour; index += 1) {
    const sent = await send(ipHarness, `person${index}@example.com`);
    assert.equal(sent.response.status, 200);
  }
  const ipBlocked = await send(ipHarness, 'one-more@example.com');
  assert.equal(ipBlocked.response.status, 429);
  assert.equal(ipBlocked.body.error.code, 'RATE_LIMITED');
});

test('OTP plaintext is never stored and the keyed hash verifies', async () => {
  const h = harness();
  const sent = await send(h);
  const row = h.DB.sqlite.prepare('SELECT * FROM email_login_codes').get();
  assert(!JSON.stringify(row).includes(sent.code));
  assert.match(row.code_hash, /^[a-f0-9]{64}$/);
  assert.equal((await verify(h, 'learner@example.com', sent.code)).response.status, 200);
});

test('wrong codes increment attempts and the fifth failure consumes the code', async () => {
  const h = harness();
  await send(h);
  for (let index = 1; index <= authPolicy.otpMaxAttempts; index += 1) {
    const failed = await verify(h, 'learner@example.com', '999999');
    assert.equal(failed.response.status, index === authPolicy.otpMaxAttempts ? 429 : 400);
    assert.equal(failed.body.error.code, index === authPolicy.otpMaxAttempts ? 'TOO_MANY_ATTEMPTS' : 'CODE_INVALID');
  }
  const row = h.DB.sqlite.prepare('SELECT attempts,consumed_at FROM email_login_codes').get();
  assert.equal(row.attempts, authPolicy.otpMaxAttempts);
  assert.notEqual(row.consumed_at, null);
});

test('expired codes and consumed codes are rejected with specific safe errors', async () => {
  const expired = harness();
  const first = await send(expired);
  expired.advance(authPolicy.otpTtlSeconds);
  const expiredResult = await verify(expired, 'learner@example.com', first.code);
  assert.equal(expiredResult.body.error.code, 'CODE_EXPIRED');

  const reused = harness();
  const second = await send(reused);
  assert.equal((await verify(reused, 'learner@example.com', second.code)).response.status, 200);
  const used = await verify(reused, 'learner@example.com', second.code);
  assert.equal(used.body.error.code, 'CODE_USED');
});

test('a new code supersedes the previous usable code', async () => {
  const h = harness();
  const first = await send(h);
  h.advance(60);
  const second = await send(h);
  const old = await verify(h, 'learner@example.com', first.code);
  assert.equal(old.body.error.code, 'CODE_INVALID');
  assert.equal((await verify(h, 'learner@example.com', second.code)).response.status, 200);
});

test('first login creates a user and normalized returning login reuses its identity', async () => {
  const h = harness();
  const first = await send(h, 'Same.User@Example.COM');
  const login1 = await verify(h, 'same.user@example.com', first.code);
  assert.equal(login1.response.status, 200);
  const id = login1.body.user.id;
  h.advance(60);
  const second = await send(h, 'SAME.USER@example.com');
  const login2 = await verify(h, 'same.user@EXAMPLE.COM', second.code);
  assert.equal(login2.body.user.id, id);
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM users').get().n, 1);
});

test('session token is cryptographically represented only by a server-side hash', async () => {
  const h = harness();
  const sent = await send(h);
  const login = await verify(h, 'learner@example.com', sent.code);
  const cookie = cookieFrom(login.response);
  const token = cookie.split('=')[1];
  const stored = h.DB.sqlite.prepare('SELECT token_hash FROM auth_sessions').get().token_hash;
  assert.notEqual(stored, token);
  assert.match(stored, /^[a-f0-9]{64}$/);
  assert(!JSON.stringify(login.body).includes(token));
  assert.match(login.response.headers.get('Set-Cookie'), /HttpOnly/);
  assert.match(login.response.headers.get('Set-Cookie'), /Secure/);
  assert.match(login.response.headers.get('Set-Cookie'), /SameSite=Lax/);
});

test('/api/me authenticates only live sessions and exposes no internal identifiers', async () => {
  const h = harness();
  assert.deepEqual(await (await auth(request('/api/me'), h.env, h.services)).json(), {authenticated: false});
  const sent = await send(h);
  const login = await verify(h, 'learner@example.com', sent.code);
  const body = await (await auth(request('/api/me', {cookie: cookieFrom(login.response)}), h.env, h.services)).json();
  assert.equal(body.authenticated, true);
  assert.equal(body.user.email, 'learner@example.com');
  assert(!JSON.stringify(body).includes('token_hash'));
});

test('logout revokes the current session and expires its cookie', async () => {
  const h = harness();
  const sent = await send(h);
  const login = await verify(h, 'learner@example.com', sent.code);
  const cookie = cookieFrom(login.response);
  const logout = await post(h, '/api/auth/logout', undefined, {cookie});
  assert.equal(logout.status, 200);
  assert.match(logout.headers.get('Set-Cookie'), /Max-Age=0/);
  assert.equal((await (await auth(request('/api/me', {cookie}), h.env, h.services)).json()).authenticated, false);
});

test('expired, revoked, foreign, and forged sessions are rejected', async () => {
  const h = harness();
  const sent = await send(h);
  const login = await verify(h, 'learner@example.com', sent.code);
  const cookie = cookieFrom(login.response);
  h.advance(authPolicy.sessionTtlSeconds + 1);
  assert.equal((await (await auth(request('/api/me', {cookie}), h.env, h.services)).json()).authenticated, false);
  assert.equal((await (await auth(request('/api/me', {cookie: 'ej_session=forged'}), h.env, h.services)).json()).authenticated, false);
  assert.equal((await (await auth(request('/api/me', {cookie: 'other_cookie=value'}), h.env, h.services)).json()).authenticated, false);
});

test('login rotates any presented session and does not accept a fixation token', async () => {
  const h = harness();
  const sent = await send(h);
  const login = await verify(h, 'learner@example.com', sent.code, {cookie: 'ej_session=attacker-fixed'});
  assert.equal(login.response.status, 200);
  assert.notEqual(cookieFrom(login.response), 'ej_session=attacker-fixed');
  assert.equal(h.DB.sqlite.prepare('SELECT COUNT(*) AS n FROM auth_sessions').get().n, 1);
});

test('state-changing routes require an exact same-origin Origin header', async () => {
  const h = harness();
  const absent = await post(h, '/api/auth/email/send-code', {email: 'a@example.com'}, {requestOrigin: null});
  const foreign = await post(h, '/api/auth/email/send-code', {email: 'a@example.com'}, {requestOrigin: 'https://evil.example'});
  assert.equal(absent.status, 403);
  assert.equal(foreign.status, 403);
  assert.equal((await foreign.json()).error.code, 'ORIGIN_REJECTED');
  assert.equal(h.deliveries.length, 0);
});

test('mail failures fail closed, consume the pending code, and expose no OTP', async () => {
  const h = harness();
  h.services.mailSender = async () => { throw new Error('provider detail and credential-like material'); };
  const result = await send(h);
  assert.equal(result.response.status, 503);
  assert.equal(result.body.error.code, 'MAIL_UNAVAILABLE');
  assert(!JSON.stringify(result.body).includes('123450'));
  assert.notEqual(h.DB.sqlite.prepare('SELECT consumed_at FROM email_login_codes').get().consumed_at, null);
});

test('send traffic opportunistically removes stale codes and sessions', async () => {
  const h = harness();
  const old = h.now() - 8 * 24 * 60 * 60;
  h.DB.sqlite.prepare("INSERT INTO users VALUES(?,?,?,?,?,'active')").run('old-user', 'old@example.com', 'old@example.com', old, old);
  h.DB.sqlite.prepare('INSERT INTO email_login_codes VALUES(?,?,?,?,?,0,?,?,?)').run('old-code', 'old@example.com', 'hash', old, old, old, 'ip', 'ua');
  h.DB.sqlite.prepare('INSERT INTO auth_sessions VALUES(?,?,?,?,?,NULL,?,?)').run('old-session', 'old-user', old, old, old, 'ip', 'ua');
  assert.equal((await send(h, 'fresh@example.com')).response.status, 200);
  assert.equal(h.DB.sqlite.prepare("SELECT COUNT(*) AS n FROM email_login_codes WHERE id='old-code'").get().n, 0);
  assert.equal(h.DB.sqlite.prepare("SELECT COUNT(*) AS n FROM auth_sessions WHERE token_hash='old-session'").get().n, 0);
});

test('missing server configuration fails closed without database access', async () => {
  const response = await auth(request('/api/me'), {});
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error.code, 'AUTH_UNAVAILABLE');
});
