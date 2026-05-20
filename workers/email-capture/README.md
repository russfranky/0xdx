# 0xdx email-capture Worker

A tiny Cloudflare Worker that backs the email signup form on the 0xdx landing
page. Holds the Resend API key as a runtime secret; the static site never
sees it.

Endpoint: `POST /subscribe` with `{ "email": "user@example.com" }`.

On a valid submission it:

1. Stashes the address in Workers KV (`sub:<email>`) — the recoverable list.
2. Sends a notification email to the operator (`NOTIFY_TO`).
3. Returns `{ "ok": true }` with `200`.

Rate-limited to 5 submissions per IP per 10 minutes.

## v0 design choices

The shipped v0 works with a **send-only** Resend API key and Resend's default
`onboarding@resend.dev` sender. Implications:

- No Resend Audience write (the key can't do it).
- No confirmation email to the subscriber (default sender can only mail the
  Resend account owner).
- The "list" lives in Workers KV under the `sub:` prefix.

When you create a full-access Resend key and verify a sending domain,
extend `src/index.ts` to call `POST /audiences/{id}/contacts` and to send a
confirmation mail to the subscriber address. The frontend contract doesn't
change.

## Deploy (operator)

The two things only you can do:

1. **`npx wrangler login`** — opens a browser, completes Cloudflare OAuth.
   Alternative: create an API token at
   https://dash.cloudflare.com/profile/api-tokens (template: *Edit Cloudflare
   Workers*), export it: `export CLOUDFLARE_API_TOKEN=...`.
2. Confirm the Resend `NOTIFY_TO` address you want signups to land in.

Once authenticated, from `workers/email-capture/`:

```bash
# 1. Create the KV namespace and paste the returned id into wrangler.toml
npx wrangler kv namespace create EMAIL_RL

# 2. Set secrets
npx wrangler secret put RESEND_API_KEY         # paste the key
npx wrangler secret put RESEND_FROM_ADDRESS    # e.g. "0xdx signups <onboarding@resend.dev>"
npx wrangler secret put NOTIFY_TO              # operator address

# 3. Deploy
npm run deploy
```

Wrangler prints the URL, e.g.
`https://0xdx-email-capture.<your-subdomain>.workers.dev`.

## Wire the client

Set the GitHub repo variable so CI builds embed the endpoint:

```bash
gh variable set VITE_EMAIL_ENDPOINT \
  --body "https://0xdx-email-capture.<your-subdomain>.workers.dev/subscribe"
```

The next push to `main` rebuilds with the var; the form starts working.

For local dev, also add to `0xdx-docs/.env.local`:

```
VITE_EMAIL_ENDPOINT=https://0xdx-email-capture.<your-subdomain>.workers.dev/subscribe
```

## Local worker dev

```bash
echo 'RESEND_API_KEY="re_..."'                              > .dev.vars
echo 'RESEND_FROM_ADDRESS="onboarding@resend.dev"'         >> .dev.vars
echo 'NOTIFY_TO="russ@thingscorp.com"'                     >> .dev.vars
npm run dev   # serves on http://localhost:8787
```

`.dev.vars` is git-ignored; never commit it.

## Logs

```bash
npm run tail
```
