/**
 * 0xdx email-capture Worker.
 *
 * POST /subscribe
 *   body: { "email": "user@example.com" }
 *   → adds the address to a Resend Audience and sends a confirmation email.
 *
 * The Resend API key, audience ID, and sender address are runtime secrets and
 * never appear in source. Set them with:
 *
 *   wrangler secret put RESEND_API_KEY
 *   wrangler secret put RESEND_AUDIENCE_ID
 *   wrangler secret put RESEND_FROM_ADDRESS
 */

export interface Env {
  RESEND_API_KEY: string;
  RESEND_AUDIENCE_ID: string;
  RESEND_FROM_ADDRESS: string;
  ALLOWED_ORIGINS: string;
  EMAIL_RL?: KVNamespace;
}

// RFC 5322-ish; deliberately conservative.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 5; // submissions per IP per window
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

async function addToAudience(env: Env, email: string): Promise<{ ok: boolean; status: number; error?: string }> {
  const res = await fetch(
    `https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  );
  if (res.ok) return { ok: true, status: res.status };
  // Resend returns 409-style errors as 400 with a JSON body; treat dup as success.
  const text = await res.text();
  if (text.includes('already exists') || text.includes('Contact already exists')) {
    return { ok: true, status: 200 };
  }
  return { ok: false, status: res.status, error: text };
}

async function sendConfirmation(env: Env, email: string): Promise<void> {
  // Fire-and-forget. We don't want a Resend email failure to block the 200 to the user.
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_ADDRESS,
        to: [email],
        subject: "You're on the 0xdx list",
        text:
          "Thanks for the interest in 0xdx.\n\n" +
          "You've been added to the pre-launch list. We'll write when testnet is ready, and not before — no newsletters, no drip campaigns.\n\n" +
          "In the meantime, the litepaper is the most useful thing to read:\n" +
          "https://0xdx.com/#litepaper\n\n" +
          "Source, issues, and discussion live on GitHub:\n" +
          "https://github.com/russfranky/0xdx\n\n" +
          "— 0xdx",
      }),
    });
  } catch {
    /* swallow */
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
    if (!(await checkRateLimit(env, ip))) {
      return json(429, { error: 'rate_limited' }, cors);
    }

    const audienceResult = await addToAudience(env, email);
    if (!audienceResult.ok) {
      return json(502, { error: 'audience_failed', detail: audienceResult.error }, cors);
    }

    // Confirmation email is fire-and-forget so it doesn't delay the response.
    ctx.waitUntil(sendConfirmation(env, email));

    return json(200, { ok: true }, cors);
  },
};
