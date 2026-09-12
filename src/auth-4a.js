const SESSION_COOKIE = 'ej_session';
const OTP_TTL_SECONDS = 10 * 60;
const OTP_MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 60;
const EMAIL_SEND_LIMIT_10_MIN = 3;
const EMAIL_SEND_LIMIT_HOUR = 5;
const IP_SEND_LIMIT_HOUR = 20;
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
const GENERIC_SENT_MESSAGE = '如果邮箱地址有效，验证码将发送到该邮箱。';

const encoder = new TextEncoder();

const json = (body, status = 200, headers) => {
  const resultHeaders = new Headers(headers);
  resultHeaders.set('Content-Type', 'application/json; charset=utf-8');
  resultHeaders.set('Cache-Control', 'no-store');
  return new Response(JSON.stringify(body), {status, headers: resultHeaders});
};

const error = (status, code, message, headers) => json({error: {code, message}}, status, headers);

export function normalizeEmail(value) {
  if (typeof value !== 'string') throw new TypeError('invalid email');
  const display = value.trim();
  if (!display || display.length > 254 || /[\s\u0000-\u001f\u007f]/.test(display)) throw new TypeError('invalid email');
  const at = display.lastIndexOf('@');
  if (at < 1 || at !== display.indexOf('@')) throw new TypeError('invalid email');
  const local = display.slice(0, at);
  const domain = display.slice(at + 1).toLowerCase();
  if (local.length > 64 || !domain || domain.length > 253 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) throw new TypeError('invalid email');
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) throw new TypeError('invalid email');
  if (!/^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(domain)) throw new TypeError('invalid email');
  return {normalized: `${local.toLowerCase()}@${domain}`, display: `${local}@${domain}`};
}

function bytesToBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function randomToken(length = 32) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

export const generateSecureToken = randomToken;
export const generateSecureCode = randomCode;

function randomCode() {
  const sample = new Uint32Array(1);
  const ceiling = Math.floor(0x1_0000_0000 / 1_000_000) * 1_000_000;
  do crypto.getRandomValues(sample); while (sample[0] >= ceiling);
  return String(sample[0] % 1_000_000).padStart(6, '0');
}

async function hmac(secret, value) {
  if (typeof secret !== 'string' || secret.length < 32) throw new Error('AUTH_SECRET must contain at least 32 characters');
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  const digest = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
  return [...digest].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function safeEqual(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string' || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

const otpHash = (secret, id, email, code) => hmac(secret, `otp:${id}:${email}:${code}`);
const sessionHash = (secret, token) => hmac(secret, `session:${token}`);
const requestHash = (secret, kind, value) => hmac(secret, `${kind}:${value || 'unknown'}`);

function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 'unknown';
}

function parseCookies(request) {
  const result = new Map();
  for (const part of (request.headers.get('Cookie') || '').split(';')) {
    const separator = part.indexOf('=');
    if (separator > 0) result.set(part.slice(0, separator).trim(), part.slice(separator + 1).trim());
  }
  return result;
}

function sessionCookie(token, request, maxAge = SESSION_TTL_SECONDS) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${maxAge}`;
}

function requireSameOrigin(request) {
  const expected = new URL(request.url).origin;
  const origin = request.headers.get('Origin');
  const fetchSite = request.headers.get('Sec-Fetch-Site');
  if (origin !== expected || (fetchSite && !['same-origin', 'none'].includes(fetchSite))) {
    return error(403, 'ORIGIN_REJECTED', '请求来源无效，请刷新页面后重试。');
  }
  return null;
}

async function bodyJson(request) {
  const type = request.headers.get('Content-Type') || '';
  if (!type.toLowerCase().startsWith('application/json')) throw new TypeError('json required');
  return request.json();
}

async function cleanup(db, now) {
  const weekAgo = now - 7 * 24 * 60 * 60;
  await db.batch([
    db.prepare('DELETE FROM email_login_codes WHERE expires_at < ? AND (consumed_at IS NOT NULL OR expires_at < ?)').bind(weekAgo, weekAgo),
    db.prepare('DELETE FROM auth_sessions WHERE expires_at < ? OR (revoked_at IS NOT NULL AND revoked_at < ?)').bind(weekAgo, weekAgo)
  ]);
}

async function sendCode(request, env, services) {
  const originFailure = requireSameOrigin(request);
  if (originFailure) return originFailure;
  let body;
  try {
    body = await bodyJson(request);
  } catch {
    return error(400, 'INVALID_REQUEST', '请提供有效的邮箱地址。');
  }
  let email;
  try {
    email = normalizeEmail(body.email);
  } catch {
    return error(400, 'EMAIL_INVALID', '请输入有效的邮箱地址。');
  }
  const now = services.now();
  const ipHash = await requestHash(env.AUTH_SECRET, 'ip', clientIp(request));
  const [latest, recentEmail, hourlyEmail, hourlyIp] = await Promise.all([
    env.DB.prepare('SELECT created_at FROM email_login_codes WHERE email_normalized = ? ORDER BY created_at DESC LIMIT 1').bind(email.normalized).first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM email_login_codes WHERE email_normalized = ? AND created_at > ?').bind(email.normalized, now - 600).first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM email_login_codes WHERE email_normalized = ? AND created_at > ?').bind(email.normalized, now - 3600).first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM email_login_codes WHERE requested_ip_hash = ? AND created_at > ?').bind(ipHash, now - 3600).first()
  ]);
  if (latest && now - Number(latest.created_at) < RESEND_COOLDOWN_SECONDS) {
    const retryAfter = RESEND_COOLDOWN_SECONDS - (now - Number(latest.created_at));
    return error(429, 'RESEND_COOLDOWN', `请在 ${retryAfter} 秒后重新发送。`, {'Retry-After': String(retryAfter)});
  }
  if (Number(recentEmail?.count || 0) >= EMAIL_SEND_LIMIT_10_MIN || Number(hourlyEmail?.count || 0) >= EMAIL_SEND_LIMIT_HOUR || Number(hourlyIp?.count || 0) >= IP_SEND_LIMIT_HOUR) {
    return error(429, 'RATE_LIMITED', '请求过于频繁，请稍后再试。', {'Retry-After': '600'});
  }
  const code = services.randomCode();
  const id = services.randomToken(18);
  const codeHash = await otpHash(env.AUTH_SECRET, id, email.normalized, code);
  const userAgentHash = await requestHash(env.AUTH_SECRET, 'ua', request.headers.get('User-Agent'));
  await env.DB.batch([
    env.DB.prepare('UPDATE email_login_codes SET consumed_at = ? WHERE email_normalized = ? AND consumed_at IS NULL').bind(now, email.normalized),
    env.DB.prepare(`INSERT INTO email_login_codes
      (id,email_normalized,code_hash,created_at,expires_at,attempts,consumed_at,requested_ip_hash,user_agent_hash)
      VALUES(?,?,?,?,?,0,NULL,?,?)`).bind(id, email.normalized, codeHash, now, now + OTP_TTL_SECONDS, ipHash, userAgentHash)
  ]);
  try {
    await services.mailSender(env, {to: email.display, code, expiresMinutes: OTP_TTL_SECONDS / 60});
  } catch {
    console.error('[auth] mail delivery failed provider=qq_smtp');
    await env.DB.prepare('UPDATE email_login_codes SET consumed_at = ? WHERE id = ? AND consumed_at IS NULL').bind(now, id).run();
    return error(503, 'MAIL_UNAVAILABLE', '验证邮件暂时无法发送，请稍后重试。');
  }
  await cleanup(env.DB, now);
  return json({ok: true, message: GENERIC_SENT_MESSAGE, expires_in: OTP_TTL_SECONDS, resend_after: RESEND_COOLDOWN_SECONDS});
}

async function verifyCode(request, env, services) {
  const originFailure = requireSameOrigin(request);
  if (originFailure) return originFailure;
  let body;
  try {
    body = await bodyJson(request);
  } catch {
    return error(400, 'INVALID_REQUEST', '请提供邮箱和验证码。');
  }
  let email;
  try {
    email = normalizeEmail(body.email);
  } catch {
    return error(400, 'CODE_INVALID', '验证码无效。');
  }
  if (!/^\d{6}$/.test(String(body.code || ''))) return error(400, 'CODE_INVALID', '验证码无效。');
  const now = services.now();
  const record = await env.DB.prepare(`SELECT id,code_hash,expires_at,attempts,consumed_at
    FROM email_login_codes WHERE email_normalized = ? ORDER BY created_at DESC LIMIT 1`).bind(email.normalized).first();
  if (!record) return error(400, 'CODE_INVALID', '验证码无效。');
  const candidate = await otpHash(env.AUTH_SECRET, record.id, email.normalized, String(body.code));
  if (record.consumed_at !== null && record.consumed_at !== undefined) {
    return error(400, safeEqual(candidate, record.code_hash) ? 'CODE_USED' : 'CODE_INVALID', safeEqual(candidate, record.code_hash) ? '该验证码已经使用。' : '验证码无效。');
  }
  if (Number(record.expires_at) <= now) {
    await env.DB.prepare('UPDATE email_login_codes SET consumed_at = ? WHERE id = ? AND consumed_at IS NULL').bind(now, record.id).run();
    return error(400, 'CODE_EXPIRED', '验证码已过期，请重新发送。');
  }
  if (Number(record.attempts) >= OTP_MAX_ATTEMPTS) return error(429, 'TOO_MANY_ATTEMPTS', '尝试次数过多，请重新发送验证码。');
  if (!safeEqual(candidate, record.code_hash)) {
    const result = await env.DB.prepare(`UPDATE email_login_codes
      SET attempts = attempts + 1, consumed_at = CASE WHEN attempts + 1 >= ? THEN ? ELSE consumed_at END
      WHERE id = ? AND consumed_at IS NULL AND attempts < ?`).bind(OTP_MAX_ATTEMPTS, now, record.id, OTP_MAX_ATTEMPTS).run();
    const exhausted = Number(record.attempts) + 1 >= OTP_MAX_ATTEMPTS && Number(result.meta?.changes || 0) > 0;
    return error(exhausted ? 429 : 400, exhausted ? 'TOO_MANY_ATTEMPTS' : 'CODE_INVALID', exhausted ? '尝试次数过多，请重新发送验证码。' : '验证码无效。');
  }
  const consumed = await env.DB.prepare(`UPDATE email_login_codes SET consumed_at = ?
    WHERE id = ? AND consumed_at IS NULL AND attempts < ? AND expires_at > ?`).bind(now, record.id, OTP_MAX_ATTEMPTS, now).run();
  if (Number(consumed.meta?.changes || 0) !== 1) return error(409, 'CODE_ALREADY_PROCESSED', '该验证码已处理，请重新获取。');

  const newUserId = services.randomToken(18);
  await env.DB.batch([
    env.DB.prepare(`INSERT OR IGNORE INTO users(id,email_normalized,email_display,created_at,last_login_at,status)
      VALUES(?,?,?,?,?,'active')`).bind(newUserId, email.normalized, email.display, now, now),
    env.DB.prepare(`UPDATE users SET last_login_at = ?, email_display = ?
      WHERE email_normalized = ? AND status = 'active'`).bind(now, email.display, email.normalized)
  ]);
  const user = await env.DB.prepare(`SELECT id,email_display FROM users
    WHERE email_normalized = ? AND status = 'active'`).bind(email.normalized).first();
  if (!user) return error(403, 'ACCOUNT_DISABLED', '该账户暂时无法登录。');

  const oldToken = parseCookies(request).get(SESSION_COOKIE);
  const oldHash = oldToken ? await sessionHash(env.AUTH_SECRET, oldToken) : null;
  const token = services.randomToken(32);
  const tokenHash = await sessionHash(env.AUTH_SECRET, token);
  const ipHash = await requestHash(env.AUTH_SECRET, 'ip', clientIp(request));
  const userAgentHash = await requestHash(env.AUTH_SECRET, 'ua', request.headers.get('User-Agent'));
  const statements = [];
  if (oldHash) statements.push(env.DB.prepare('UPDATE auth_sessions SET revoked_at = ? WHERE token_hash = ? AND revoked_at IS NULL').bind(now, oldHash));
  statements.push(env.DB.prepare(`INSERT INTO auth_sessions(token_hash,user_id,created_at,expires_at,last_seen_at,revoked_at,created_ip_hash,user_agent_hash)
    VALUES(?,?,?,?,?,NULL,?,?)`).bind(tokenHash, user.id, now, now + SESSION_TTL_SECONDS, now, ipHash, userAgentHash));
  await env.DB.batch(statements);
  return json({authenticated: true, user: {id: user.id, email: user.email_display}}, 200, {'Set-Cookie': sessionCookie(token, request)});
}

async function currentSession(request, env, services, touch = true) {
  const token = parseCookies(request).get(SESSION_COOKIE);
  if (!token) return null;
  const tokenHash = await sessionHash(env.AUTH_SECRET, token);
  const now = services.now();
  const row = await env.DB.prepare(`SELECT s.token_hash,s.user_id,s.expires_at,s.last_seen_at,u.email_display
    FROM auth_sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.revoked_at IS NULL AND s.expires_at > ? AND u.status = 'active'`).bind(tokenHash, now).first();
  if (!row) return null;
  if (touch && now - Number(row.last_seen_at) >= 15 * 60) {
    await env.DB.prepare('UPDATE auth_sessions SET last_seen_at = ? WHERE token_hash = ? AND revoked_at IS NULL').bind(now, tokenHash).run();
  }
  return row;
}

async function me(request, env, services) {
  const session = await currentSession(request, env, services);
  if (!session) return json({authenticated: false});
  return json({authenticated: true, user: {id: session.user_id, email: session.email_display}});
}

async function logout(request, env, services) {
  const originFailure = requireSameOrigin(request);
  if (originFailure) return originFailure;
  const token = parseCookies(request).get(SESSION_COOKIE);
  if (token) {
    const hash = await sessionHash(env.AUTH_SECRET, token);
    await env.DB.prepare('UPDATE auth_sessions SET revoked_at = ? WHERE token_hash = ? AND revoked_at IS NULL').bind(services.now(), hash).run();
  }
  return json({ok: true}, 200, {'Set-Cookie': sessionCookie('', request, 0)});
}

async function defaultMailSender(env, message) {
  const {sendQqSmtp} = await import('./mail-qq-smtp.js');
  return sendQqSmtp(env, message);
}

const defaults = {now: () => Math.floor(Date.now() / 1000), randomCode, randomToken, mailSender: defaultMailSender};

export async function auth(request, env, overrides = {}) {
  const services = {...defaults, ...overrides};
  if (!env.DB || typeof env.AUTH_SECRET !== 'string' || env.AUTH_SECRET.length < 32) {
    return error(503, 'AUTH_UNAVAILABLE', '登录服务暂未配置。');
  }
  const {pathname} = new URL(request.url);
  try {
    if (pathname === '/api/auth/email/send-code' && request.method === 'POST') return await sendCode(request, env, services);
    if (pathname === '/api/auth/email/verify' && request.method === 'POST') return await verifyCode(request, env, services);
    if (pathname === '/api/auth/logout' && request.method === 'POST') return await logout(request, env, services);
    if (pathname === '/api/me' && request.method === 'GET') return await me(request, env, services);
    return error(405, 'METHOD_NOT_ALLOWED', '请求方法不受支持。', {Allow: pathname === '/api/me' ? 'GET' : 'POST'});
  } catch (cause) {
    console.error('[auth] request failed', cause instanceof Error ? cause.name : 'UnknownError');
    return error(500, 'AUTH_ERROR', '登录服务暂时不可用。');
  }
}

export const authPolicy = Object.freeze({
  otpTtlSeconds: OTP_TTL_SECONDS,
  otpMaxAttempts: OTP_MAX_ATTEMPTS,
  resendCooldownSeconds: RESEND_COOLDOWN_SECONDS,
  emailSendLimit10Minutes: EMAIL_SEND_LIMIT_10_MIN,
  emailSendLimitHour: EMAIL_SEND_LIMIT_HOUR,
  ipSendLimitHour: IP_SEND_LIMIT_HOUR,
  sessionTtlSeconds: SESSION_TTL_SECONDS,
  sessionCookie: SESSION_COOKIE
});
