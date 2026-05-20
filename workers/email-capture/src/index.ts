/**
 * 0xdx email-capture Worker.
 *
 * POST /subscribe
 *   body: { "email": "user@example.com" }
 *   → stashes the address in KV (the recoverable list) and notifies the
 *     operator via Resend.
 *
 * This is the v0 design that works with a send-only Resend API key. There is
 * no Audience write and no confirmation mail to the subscriber (Resend's
 * default `onboarding@resend.dev` sender can only mail the account owner
 * until a domain is verified). When you create a full-access Resend key and
 * verify a domain, swap in `addToAudience` + `sendConfirmation`.
 */

export interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM_ADDRESS: string;   // e.g. "0xdx signups <onboarding@resend.dev>"
  NOTIFY_TO: string;             // operator address (Resend account owner)
  ALLOWED_ORIGINS: string;
  EMAIL_RL?: KVNamespace;        // dual-use: rate limit + subscriber list
}

// RFC 5322-ish; deliberately conservative.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 5;            // submissions per IP per window
const RATE_LIMIT_WINDOW_S = 60 * 10; // 10 minutes

function corsHeaders(origin: string | null, allowedOrigins: string): Record<string, string> {
  const allowed = allowedOrigins.split(',').map((s) => s.trim()).filter(Boolean);
  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0] ?? '*';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(status: number, body: unknown, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  if (!env.EMAIL_RL) return true; // KV not bound; skip
  const key = `rl:${ip}`;
  const current = parseInt((await env.EMAIL_RL.get(key)) ?? '0', 10);
  if (current >= RATE_LIMIT_MAX) return false;
  await env.EMAIL_RL.put(key, String(current + 1), { expirationTtl: RATE_LIMIT_WINDOW_S });
  return true;
}

/** Store the subscriber. Returns true if newly added, false if already present. */
async function recordSubscriber(env: Env, email: string, ip: string, ua: string): Promise<boolean> {
  if (!env.EMAIL_RL) return true; // can't dedup without KV
  const key = `sub:${email}`;
  const existing = await env.EMAIL_RL.get(key);
  if (existing) return false;
  const value = JSON.stringify({ at: new Date().toISOString(), ip, ua });
  await env.EMAIL_RL.put(key, value);
  return true;
}

async function notifyOperator(env: Env, email: string, ip: string, ua: string, isNew: boolean): Promise<void> {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_ADDRESS,
        to: [env.NOTIFY_TO],
        subject: `[0xdx] ${isNew ? 'new signup' : 'repeat signup'}: ${email}`,
        text:
          `Email:  ${email}\n` +
          `IP:     ${ip}\n` +
          `UA:     ${ua}\n` +
          `When:   ${new Date().toISOString()}\n` +
          `Status: ${isNew ? 'first time' : 'already on the list'}\n` +
          `\n` +
          `List is in Workers KV (namespace EMAIL_RL, key prefix "sub:").\n`,
      }),
    });
  } catch {
    /* swallow — never let a notify failure block the 200 */
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin, env.ALLOWED_ORIGINS);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname !== '/subscribe') {
      return json(404, { error: 'not_found' }, cors);
    }

    if (request.method !== 'POST') {
      return json(405, { error: 'method_not_allowed' }, cors);
    }

    let body: { email?: unknown };
    try {
      body = await request.json();
    } catch {
      return json(400, { error: 'invalid_json' }, cors);
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return json(400, { error: 'invalid_email' }, cors);
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const ua = request.headers.get('User-Agent') ?? 'unknown';

    if (!(await checkRateLimit(env, ip))) {
      return json(429, { error: 'rate_limited' }, cors);
    }

    const isNew = await recordSubscriber(env, email, ip, ua);

    // Notify is fire-and-forget so it doesn't delay the response.
    ctx.waitUntil(notifyOperator(env, email, ip, ua, isNew));

    return json(200, { ok: true }, cors);
  },
};
