const encoder = new TextEncoder();
const decoder = new TextDecoder();
const QQ_SMTP_HOST = 'smtp.qq.com';
const QQ_SMTP_PORT = 465;
const CONNECT_TIMEOUT_MS = 10_000;
const COMMAND_TIMEOUT_MS = 15_000;
const MAX_RESPONSE_BYTES = 32 * 1024;

export class SmtpError extends Error {
  constructor(code, stage) {
    super(`SMTP ${stage} failed`);
    this.name = 'SmtpError';
    this.code = code;
    this.stage = stage;
  }
}

function timeout(promise, milliseconds, stage, onTimeout) {
  let timer;
  const expired = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new SmtpError('SMTP_TIMEOUT', stage));
      try { onTimeout?.(); } catch {}
    }, milliseconds);
  });
  return Promise.race([promise, expired]).finally(() => clearTimeout(timer));
}

function asciiCredential(value, name) {
  if (typeof value !== 'string' || !value || value.length > 256 || /[^\x21-\x7e]/.test(value)) {
    throw new SmtpError('SMTP_CONFIGURATION', name);
  }
  return value;
}

function mailbox(value, name) {
  const address = asciiCredential(value, name);
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(address) || /[\r\n]/.test(address)) {
    throw new SmtpError('SMTP_CONFIGURATION', name);
  }
  return address;
}

function displayName(value) {
  const name = typeof value === 'string' && value.trim() ? value.trim() : 'EJ Learning';
  if (name.length > 80 || !/^[A-Za-z0-9 ._-]+$/.test(name)) throw new SmtpError('SMTP_CONFIGURATION', 'from_name');
  return name;
}

function smtpConfig(env) {
  const host = env.AUTH_SMTP_HOST || QQ_SMTP_HOST;
  const port = Number(env.AUTH_SMTP_PORT || QQ_SMTP_PORT);
  if (host !== QQ_SMTP_HOST || port !== QQ_SMTP_PORT) throw new SmtpError('SMTP_CONFIGURATION', 'endpoint');
  return {
    host,
    port,
    username: mailbox(env.AUTH_SMTP_USER, 'username'),
    password: asciiCredential(env.AUTH_SMTP_PASSWORD, 'password'),
    fromName: displayName(env.MAIL_FROM_NAME)
  };
}

function encodeHeader(value) {
  const bytes = encoder.encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `=?UTF-8?B?${btoa(binary)}?=`;
}

function encodeBody(value) {
  const bytes = encoder.encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).match(/.{1,76}/g).join('\r\n');
}

function messageSource({from, fromName, to, code, expiresMinutes}) {
  const subject = 'EJ Learning 登录验证码';
  const domain = from.split('@')[1];
  const body = [
    '您的 EJ Learning 登录验证码是：',
    '',
    code,
    '',
    `验证码将在 ${expiresMinutes} 分钟后失效。`,
    '如果这不是您本人的操作，请忽略此邮件。'
  ].join('\r\n');
  return [
    `From: ${fromName} <${from}>`,
    `To: ${to}`,
    `Subject: ${encodeHeader(subject)}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    encodeBody(body)
  ].join('\r\n');
}

class ResponseReader {
  constructor(reader, commandTimeoutMs) {
    this.reader = reader;
    this.commandTimeoutMs = commandTimeoutMs;
    this.buffer = '';
  }

  async line(stage) {
    while (!this.buffer.includes('\r\n')) {
      const chunk = await timeout(this.reader.read(), this.commandTimeoutMs, stage, () => this.reader.cancel());
      if (chunk.done) throw new SmtpError('SMTP_CONNECTION_CLOSED', stage);
      this.buffer += decoder.decode(chunk.value, {stream: true});
      if (this.buffer.length > MAX_RESPONSE_BYTES) throw new SmtpError('SMTP_RESPONSE_TOO_LARGE', stage);
    }
    const boundary = this.buffer.indexOf('\r\n');
    const line = this.buffer.slice(0, boundary);
    this.buffer = this.buffer.slice(boundary + 2);
    return line;
  }

  async response(stage) {
    const lines = [];
    const first = await this.line(stage);
    if (!/^\d{3}[ -]/.test(first)) throw new SmtpError('SMTP_UNEXPECTED_RESPONSE', stage);
    const code = Number(first.slice(0, 3));
    lines.push(first);
    if (first[3] === '-') {
      while (true) {
        const next = await this.line(stage);
        if (!new RegExp(`^${code}[ -]`).test(next)) throw new SmtpError('SMTP_UNEXPECTED_RESPONSE', stage);
        lines.push(next);
        if (next[3] === ' ') break;
      }
    }
    return {code, lines};
  }
}

function assertResponse(response, expected, stage) {
  if (!expected.includes(response.code)) throw new SmtpError('SMTP_REJECTED', stage);
}

function authMethods(response) {
  const methods = new Set();
  for (const line of response.lines) {
    const capability = line.slice(4).trim();
    const match = capability.match(/^AUTH(?:=|\s+)(.+)$/i);
    if (match) for (const method of match[1].trim().split(/\s+/)) methods.add(method.toUpperCase());
  }
  return [...methods];
}

async function defaultConnect(address, options) {
  const {connect} = await import('cloudflare:sockets');
  return connect(address, options);
}

async function openSession(connectImpl, host, port, timeouts) {
  let socket;
  try {
    socket = await connectImpl({hostname: host, port}, {secureTransport: 'on', allowHalfOpen: false});
    void socket.closed?.catch?.(() => {});
    await timeout(socket.opened, timeouts.connect, 'connect', () => socket.close());
    const reader = socket.readable.getReader();
    const writer = socket.writable.getWriter();
    return {socket, reader, writer, responses: new ResponseReader(reader, timeouts.command), commandTimeoutMs: timeouts.command};
  } catch (cause) {
    try { await socket?.close?.(); } catch {}
    if (cause instanceof SmtpError) throw cause;
    throw new SmtpError('SMTP_CONNECTION_FAILED', 'connect');
  }
}

async function closeSession(session) {
  if (!session) return;
  try { session.writer?.releaseLock(); } catch {}
  try { session.reader?.releaseLock(); } catch {}
  try { await session.socket?.close?.(); } catch {}
}

async function command(session, value, expected, stage) {
  try {
    await timeout(session.writer.write(encoder.encode(`${value}\r\n`)), session.commandTimeoutMs, stage, () => session.socket.close());
  } catch (cause) {
    if (cause instanceof SmtpError) throw cause;
    throw new SmtpError('SMTP_WRITE_FAILED', stage);
  }
  const response = await session.responses.response(stage);
  assertResponse(response, expected, stage);
  return response;
}

export async function sendQqSmtp(env, {to, code, expiresMinutes}, options = {}) {
  const config = smtpConfig(env);
  const recipient = mailbox(to, 'recipient');
  if (!/^\d{6}$/.test(code) || expiresMinutes !== 10) throw new SmtpError('SMTP_CONFIGURATION', 'message');
  const timeouts = {connect: options.connectTimeoutMs || CONNECT_TIMEOUT_MS, command: options.commandTimeoutMs || COMMAND_TIMEOUT_MS};
  let session;
  let accepted = false;
  try {
    session = await openSession(options.connectImpl || defaultConnect, config.host, config.port, timeouts);
    assertResponse(await session.responses.response('greeting'), [220], 'greeting');
    const capabilities = await command(session, 'EHLO ej-learning.invalid', [250], 'ehlo');
    if (!authMethods(capabilities).includes('LOGIN')) throw new SmtpError('SMTP_AUTH_UNSUPPORTED', 'auth');
    await command(session, 'AUTH LOGIN', [334], 'auth');
    await command(session, btoa(config.username), [334], 'auth_username');
    await command(session, btoa(config.password), [235], 'auth_password');
    await command(session, `MAIL FROM:<${config.username}>`, [250], 'mail_from');
    await command(session, `RCPT TO:<${recipient}>`, [250, 251], 'recipient');
    await command(session, 'DATA', [354], 'data');
    const source = messageSource({from: config.username, fromName: config.fromName, to: recipient, code, expiresMinutes});
    const dotStuffed = source.replace(/(^|\r\n)\./g, '$1..');
    await timeout(session.writer.write(encoder.encode(`${dotStuffed}\r\n.\r\n`)), timeouts.command, 'data_body', () => session.socket.close());
    assertResponse(await session.responses.response('data_body'), [250], 'data_body');
    accepted = true;
    try { await command(session, 'QUIT', [221], 'quit'); } catch {}
    return {accepted: true};
  } catch (cause) {
    if (cause instanceof SmtpError) throw cause;
    throw new SmtpError('SMTP_TRANSPORT_FAILED', accepted ? 'quit' : 'send');
  } finally {
    await closeSession(session);
  }
}

export async function probeQqSmtp(options = {}) {
  const timeouts = {connect: options.connectTimeoutMs || CONNECT_TIMEOUT_MS, command: options.commandTimeoutMs || COMMAND_TIMEOUT_MS};
  let session;
  try {
    session = await openSession(options.connectImpl || defaultConnect, QQ_SMTP_HOST, QQ_SMTP_PORT, timeouts);
    assertResponse(await session.responses.response('greeting'), [220], 'greeting');
    const capabilities = await command(session, 'EHLO ej-learning-probe.invalid', [250], 'ehlo');
    const methods = authMethods(capabilities);
    try { await command(session, 'QUIT', [221], 'quit'); } catch {}
    return {tcpConnected: true, tlsOpened: true, greetingAccepted: true, ehloAccepted: true, authMethods: methods};
  } finally {
    await closeSession(session);
  }
}

export const qqSmtpPolicy = Object.freeze({
  host: QQ_SMTP_HOST,
  port: QQ_SMTP_PORT,
  secureTransport: 'on',
  authMechanism: 'LOGIN',
  connectTimeoutMs: CONNECT_TIMEOUT_MS,
  commandTimeoutMs: COMMAND_TIMEOUT_MS
});
