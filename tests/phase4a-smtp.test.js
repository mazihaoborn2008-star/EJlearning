import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {sendQqSmtp, SmtpError} from '../src/mail-qq-smtp.js';

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const env = {
  AUTH_SMTP_HOST: 'smtp.qq.com',
  AUTH_SMTP_PORT: '465',
  AUTH_SMTP_USER: 'sender@qq.com',
  AUTH_SMTP_PASSWORD: 'test-only-authorization-code',
  MAIL_FROM_NAME: 'EJ Learning'
};
const message = {to: 'learner@example.com', code: '246810', expiresMinutes: 10};

test('staging config selects QQ SMTP without embedding secrets or an AUTH_EMAIL binding', () => {
  const config = JSON.parse(fs.readFileSync(new URL('../wrangler.36.jsonc', import.meta.url), 'utf8'));
  assert.equal(config.vars.AUTH_SMTP_HOST, 'smtp.qq.com');
  assert.equal(config.vars.AUTH_SMTP_PORT, '465');
  assert.equal(config.vars.MAIL_FROM_NAME, 'EJ Learning');
  for (const secret of ['AUTH_SECRET', 'AUTH_SMTP_USER', 'AUTH_SMTP_PASSWORD']) assert.equal(config.vars[secret], undefined);
  assert.equal(config.send_email, undefined);
  assert(!JSON.stringify(config).includes('AUTH_EMAIL'));
});

function scriptedSocket(script, {openError, writeErrorAt} = {}) {
  let controller;
  const writes = [];
  let closeCalls = 0;
  const readable = new ReadableStream({
    start(value) {
      controller = value;
      if (script) value.enqueue(encoder.encode(script));
    }
  });
  const writable = new WritableStream({
    write(chunk) {
      writes.push(decoder.decode(chunk));
      if (writeErrorAt && writes.length === writeErrorAt) throw new Error('simulated socket write failure');
    }
  });
  const socket = {
    readable,
    writable,
    opened: openError ? Promise.reject(new Error('simulated TLS failure')) : Promise.resolve({}),
    closed: new Promise(() => {}),
    async close() {
      closeCalls += 1;
      try { controller.close(); } catch {}
    }
  };
  return {socket, writes, get closeCalls() { return closeCalls; }};
}

function successfulScript(overrides = {}) {
  return [
    overrides.greeting || '220 smtp.qq.com ready\r\n',
    overrides.ehlo || '250-smtp.qq.com\r\n250-AUTH LOGIN PLAIN XOAUTH2\r\n250 SIZE 73400320\r\n',
    overrides.authStart || '334 VXNlcm5hbWU6\r\n',
    overrides.authUser || '334 UGFzc3dvcmQ6\r\n',
    overrides.authPassword || '235 Authentication successful\r\n',
    overrides.mailFrom || '250 Sender OK\r\n',
    overrides.recipient || '250 Recipient OK\r\n',
    overrides.data || '354 End data with <CR><LF>.<CR><LF>\r\n',
    overrides.dataBody || '250 Message accepted\r\n',
    overrides.quit || '221 Bye\r\n'
  ].join('');
}

function connector(fake, assertions) {
  return async (address, options) => {
    assertions?.(address, options);
    return fake.socket;
  };
}

async function rejected(errorCode, script, socketOptions) {
  const fake = scriptedSocket(script, socketOptions);
  await assert.rejects(
    sendQqSmtp(env, message, {connectImpl: connector(fake), connectTimeoutMs: 50, commandTimeoutMs: 50}),
    error => error instanceof SmtpError && error.code === errorCode
  );
  assert.equal(fake.closeCalls, 1);
  return fake;
}

test('successful QQ SMTP flow uses implicit TLS, multiline EHLO, AUTH LOGIN, and UTF-8 MIME', async () => {
  const fake = scriptedSocket(successfulScript());
  const result = await sendQqSmtp(env, message, {connectImpl: connector(fake, (address, options) => {
    assert.deepEqual(address, {hostname: 'smtp.qq.com', port: 465});
    assert.deepEqual(options, {secureTransport: 'on', allowHalfOpen: false});
  })});
  assert.deepEqual(result, {accepted: true});
  assert.equal(fake.closeCalls, 1);
  assert.deepEqual(fake.writes.slice(0, 7), [
    'EHLO ej-learning.invalid\r\n',
    'AUTH LOGIN\r\n',
    `${btoa(env.AUTH_SMTP_USER)}\r\n`,
    `${btoa(env.AUTH_SMTP_PASSWORD)}\r\n`,
    `MAIL FROM:<${env.AUTH_SMTP_USER}>\r\n`,
    `RCPT TO:<${message.to}>\r\n`,
    'DATA\r\n'
  ]);
  assert.match(fake.writes[7], /Content-Type: text\/plain; charset=UTF-8/);
  assert.match(fake.writes[7], /Content-Transfer-Encoding: base64/);
  assert.match(fake.writes[7], /Subject: =\?UTF-8\?B\?/);
  const encodedBody = fake.writes[7].split('\r\n\r\n')[1].replace(/\r\n\.\r\n$/, '').replace(/\r\n/g, '');
  const bytes = Uint8Array.from(atob(encodedBody), character => character.charCodeAt(0));
  const decodedBody = new TextDecoder().decode(bytes);
  assert.match(decodedBody, /您的 EJ Learning 登录验证码是：/);
  assert.match(decodedBody, /246810/);
  assert.match(fake.writes[7], /\r\n\.\r\n$/);
  assert.equal(fake.writes.at(-1), 'QUIT\r\n');
});

test('authentication rejection stops before envelope commands and closes safely', async () => {
  const fake = await rejected('SMTP_REJECTED', successfulScript({authPassword: '535 Authentication failed\r\n'}));
  assert(!fake.writes.some(value => value.startsWith('MAIL FROM')));
});

test('recipient rejection stops before DATA and closes safely', async () => {
  const fake = await rejected('SMTP_REJECTED', successfulScript({recipient: '550 Mailbox unavailable\r\n'}));
  assert(!fake.writes.includes('DATA\r\n'));
});

test('DATA command rejection sends no MIME body', async () => {
  const fake = await rejected('SMTP_REJECTED', successfulScript({data: '554 Transaction failed\r\n'}));
  assert.equal(fake.writes.length, 7);
});

test('unexpected and unsupported server responses fail closed', async () => {
  await rejected('SMTP_UNEXPECTED_RESPONSE', 'not-an-smtp-response\r\n');
  await rejected('SMTP_AUTH_UNSUPPORTED', successfulScript({ehlo: '250-smtp.qq.com\r\n250 SIZE 1000\r\n'}));
});

test('connection and implicit-TLS opening failures are sanitized', async () => {
  await assert.rejects(
    sendQqSmtp(env, message, {connectImpl: async () => { throw new Error('network internals'); }}),
    error => error instanceof SmtpError && error.code === 'SMTP_CONNECTION_FAILED' && !error.message.includes('network internals')
  );
  await rejected('SMTP_CONNECTION_FAILED', '', {openError: true});
});

test('socket write failure closes the connection and does not continue', async () => {
  const fake = await rejected('SMTP_WRITE_FAILED', successfulScript(), {writeErrorAt: 1});
  assert.equal(fake.writes.length, 1);
});

test('command read timeout cancels the hanging session and closes the socket', async () => {
  const fake = scriptedSocket('220 smtp.qq.com ready\r\n');
  await assert.rejects(
    sendQqSmtp(env, message, {connectImpl: connector(fake), commandTimeoutMs: 20}),
    error => error instanceof SmtpError && error.code === 'SMTP_TIMEOUT' && error.stage === 'ehlo'
  );
  assert.equal(fake.closeCalls, 1);
});

test('header injection and non-QQ endpoint configuration are rejected before connecting', async () => {
  let calls = 0;
  const connectImpl = async () => { calls += 1; };
  await assert.rejects(sendQqSmtp(env, {...message, to: 'victim@example.com\r\nBcc: bad@example.com'}, {connectImpl}), /SMTP recipient failed/);
  await assert.rejects(sendQqSmtp({...env, MAIL_FROM_NAME: 'EJ\r\nBcc'}, message, {connectImpl}), /SMTP from_name failed/);
  await assert.rejects(sendQqSmtp({...env, AUTH_SMTP_PORT: '25'}, message, {connectImpl}), /SMTP endpoint failed/);
  assert.equal(calls, 0);
});

test('credentials and OTP are never written to normal logs', async () => {
  const fake = scriptedSocket(successfulScript());
  const captured = [];
  const original = {log: console.log, error: console.error, warn: console.warn};
  console.log = (...values) => captured.push(values.join(' '));
  console.error = (...values) => captured.push(values.join(' '));
  console.warn = (...values) => captured.push(values.join(' '));
  try {
    await sendQqSmtp(env, message, {connectImpl: connector(fake)});
  } finally {
    Object.assign(console, original);
  }
  const output = captured.join('\n');
  assert(!output.includes(env.AUTH_SMTP_USER));
  assert(!output.includes(env.AUTH_SMTP_PASSWORD));
  assert(!output.includes(btoa(env.AUTH_SMTP_USER)));
  assert(!output.includes(btoa(env.AUTH_SMTP_PASSWORD)));
  assert(!output.includes(message.code));
});
