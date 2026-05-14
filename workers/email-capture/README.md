# 0xdx email-capture Worker

A tiny Cloudflare Worker that backs the email signup form on the 0xdx landing
page. Holds the Resend API key as a runtime secret; the static site never sees
it.

Endpoint: `POST /subscribe` with `{ "email": "user@example.com" }`.

On a valid submission it:

1. Adds the address to a Resend Audience.
2. Sends a one-time confirmation email (fire-and-forget).
3. Returns `{ "ok": true }` with `200`.

Rate-limited to 5 submissions per IP per 10 minutes when a KV namespace is
bound (see `wrangler.toml`).

## One-time setup

```bash
cd workers/email-capture
npm install
npx wrangler login
```

1. **Create the Resend audience** (https://resend.com/audiences → New
   Audience). Copy the audience UUID.
2. **Verify a sending domain** in Resend (https://resend.com/domains). The
   `from` address must use a verified domain.
3. **Set secrets**:
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put RESEND_AUDIENCE_ID
   npx wrangler secret put RESEND_FROM_ADDRESS   # e.g. "0xdx <hello@0xdx.com>"
   ```
4. **(Optional) Rate limiting via KV**:
   ```bash
   npx wrangler kv namespace create EMAIL_RL
   ```
   Paste the returned `id` into `wrangler.toml` under the commented-out
   `kv_namespaces` block, uncomment it, and re-deploy.

## Deploy

```bash
npm run deploy
```

Wrangler will print the deployed URL, e.g.
`https://0xdx-email-capture.<your-subdomain>.workers.dev`.

## Wire the client

In the website repo root, set:

```bash
# .env.production (or .env.local for dev)
VITE_EMAIL_ENDPOINT=https://0xdx-email-capture.<your-subdomain>.workers.dev/subscribe
```

If you have a custom domain, you can map the Worker to `email.0xdx.com` via
Cloudflare → Workers → Routes; then point `VITE_EMAIL_ENDPOINT` there instead.

## Local dev

```bash
# In workers/email-capture
echo 'RESEND_API_KEY="re_..."' > .dev.vars
echo 'RESEND_AUDIENCE_ID="..."' >> .dev.vars
echo 'RESEND_FROM_ADDRESS="..."' >> .dev.vars
npm run dev   # serves on http://localhost:8787
```

`.dev.vars` is git-ignored; never commit it.

## Logs

```bash
npm run tail
```

Streams Worker logs in real time.
