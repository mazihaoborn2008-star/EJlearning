function configuredAddress(value) {
  if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /[\r\n]/.test(value)) {
    throw new Error('MAIL_FROM_ADDRESS is not configured');
  }
  return value;
}

export async function sendCloudflareVerificationEmail(env, {to, code, expiresMinutes}) {
  if (!env.AUTH_EMAIL || typeof env.AUTH_EMAIL.send !== 'function') throw new Error('AUTH_EMAIL binding is not configured');
  const from = configuredAddress(env.MAIL_FROM_ADDRESS);
  const recipient = configuredAddress(to);
  if (!/^\d{6}$/.test(code)) throw new Error('Invalid verification code');
  const {EmailMessage} = await import('cloudflare:email');
  const messageId = crypto.randomUUID();
  const raw = [
    `From: EJ Learning <${from}>`,
    `To: ${recipient}`,
    'Subject: EJ Learning login verification code',
    `Message-ID: <${messageId}@${from.split('@')[1]}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    `Your EJ Learning verification code is: ${code}`,
    '',
    `This code expires in ${expiresMinutes} minutes. Do not share it with anyone.`
  ].join('\r\n');
  await env.AUTH_EMAIL.send(new EmailMessage(from, recipient, raw));
}
