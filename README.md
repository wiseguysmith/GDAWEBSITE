# Global Digital Access — website

Real-world value. Digital infrastructure. Global access.

The public website for Global Digital Access (GDA): homepage, How It Works, Projects, Investors, Partners, About, Contact, the Project Fit Check and Investor Access flows, and the legal/supporting pages.

## Run locally

Requires Node.js 20.9+ (24 recommended).

```bash
npm install
cp .env.example .env.local   # optional: configure adapters, analytics, protection
npm run dev
```

Open http://localhost:3000. Without any adapters configured, submissions are written to the server log (development only).

## Verify

```bash
npm run verify   # lint, typecheck, unit tests, production build
```

The build runs `scripts/check-placeholders.mjs` first. Locally it warns; on production deploys (`VERCEL_ENV=production`) it fails while any content placeholder — legal entity, addresses, privacy contact, processors — remains. Fill those in `src/config/site.ts` and `src/content/en/{privacy,terms}.ts` with counsel before launch.

## Before launch

1. Fill the placeholders above and have counsel review `/disclosures`, `/privacy`, `/terms`, the flow result copy and the standing disclosure (`src/content/en/legal.ts`).
2. Configure a durable submission destination (Airtable recommended) and email (Resend, with a verified sending domain and SPF/DKIM/DMARC).
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
4. Optionally: Upstash (shared rate limiting), Cloudflare Turnstile, Plausible.
5. Add real team members to `src/content/en/team.ts` when portraits and bios are approved — the section stays hidden until then.

See `docs/ARCHITECTURE.md` for the full architecture.
