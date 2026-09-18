# GDA Website — Architecture

Approved implementation of the master handoff. Companion to the design proposal (v0.2) that was approved before build.

Principle: **Simple on the surface. Serious underneath.** GDA coordinates; professional partners review, advise, validate, verify or approve within their scope; technical providers implement. Readiness before activation. No invented content.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 with design tokens as CSS custom properties (`src/styles/tokens.css`)
- Motion (`motion/react`) for the few restrained animations
- react-hook-form + zod for the two flows and the contact form (same zod schemas on client and server)
- Resend (email), Airtable / HubSpot / webhook adapters via `fetch`
- Vitest for unit tests (fit rules, schemas)

## Languages (English and Spanish)

- **URLs:** English at the root (`/how-it-works`), Spanish under `/es` (`/es/how-it-works`). `/en/…` permanently redirects to the root form so English has one canonical URL.
- **Routing:** every page lives under `app/[locale]/`, which holds the root layout (`<html lang>`), `generateStaticParams` for both locales, `not-found`, `error` and the OG image. `src/proxy.ts` rewrites unprefixed requests to `/en/…` internally, and on a **first visit** redirects to `/es/…` when the browser's `Accept-Language` prefers Spanish. An explicit choice in the language switcher sets a one-year functional cookie (`gda-locale`) that wins over the browser setting on later visits. Search engines get English at the root and find Spanish through `hreflang` alternates on every page and in the sitemap.
- **Content:** `src/content/en` and `src/content/es` export identical shapes; `content/index.ts` enforces this with `satisfies Content`, so an untranslated key fails the build. Server code reads the locale with `getLocale()` (`next/root-params`) and calls `getContent(locale)`. Client Components use `useLocale()` / `useContent()` (a smaller bundle: navigation, legal lines, flows, contact, errors). Flow definitions are built per locale by `getFlow(id, locale)`.
- **Links:** content keeps locale-free hrefs; `LocalizedLink` (used by `Button`, `TextLink`, `ArrowLink`, header, footer, menu) adds the `/es` prefix. Validation messages are emitted in English by the shared zod schemas and translated at display time through `flowUi.validation`. Country names and dates use `Intl` for the locale. Confirmation emails go out in the submitter's chosen language; the internal notification stays in English and notes the language.
- **Adding a locale:** one entry in `lib/i18n/locales.ts`, a `content/<locale>` directory of the same shape, and a row in `flowUi.validation`. Portuguese is reserved (`features.reservedLocales`).

## Directory map

```
src/
  proxy.ts                     locale routing: rewrite to /en, redirect Spanish-preferring first visits to /es
  app/
    [locale]/layout.tsx        root: <html lang>, fonts (self-hosted via next/font), metadata, LocaleProvider
    [locale]/(marketing)/      header + footer; static pages, prerendered per locale
    [locale]/(flows)/          minimal header, standing disclosure, noindex; /evaluate and /investors/access
    [locale]/not-found.tsx error.tsx opengraph-image.tsx
    api/submit/[kind]/route.ts one submission handler for fit-check | investor-access | contact
    global-error.tsx sitemap.ts robots.ts favicon.ico
  components/
    layout/      Section (sets the ground via data-theme), Container, Grid, Hairline, SiteHeader, MobileMenu, SiteFooter, Wordmark
    typography/  Eyebrow, Heading, Text, RevealLines
    actions/     Button, TextLink, ArrowLink
    content/     Hero, HeroGrid, PageHero, SectionHead, PillarRow, ProcessTimeline, ProcessStage, ApplicationList,
                 ValidationMatrix, ResponsibilityLedger, PathwaySplit, PartnerCategories, TeamGrid, PrincipleList,
                 FAQ, Disclosure, FinalCTA, ContentBlock, LegalDocument, FootprintList
    forms/       FlowShell, FlowProgress, StepFields, Field, Choice, Controls, ReviewSummary, ResultState,
                 ContactForm, Turnstile, draft (browser draft store)
    utilities/   Reveal, VisuallyHidden, JsonLd, useReducedMotion
  content/       en/*.ts (all copy), types.ts, index.ts (getContent)
  forms/         types.ts, common.ts, registry.ts, fit-check/, investor-access/, contact/
  lib/           fit/rules.ts (+tests), jurisdictions/, countries.ts, analytics/, security/, seo/, email/
  integrations/  types.ts, index.ts (composer), airtable.ts, email.ts, hubspot.ts, webhook.ts, log.ts
  config/        site.ts, features.ts, jurisdictions.ts (server-only), retention.ts
  styles/        tokens.css
scripts/check-placeholders.mjs   fails production builds if placeholders remain
```

## Design system

- Tokens: colour primitives + semantic (`--bg`, `--fg`, `--fg-2`, `--fg-3`, `--rule`), type scale, 8-pt spacing, layout, shape, motion. `Section theme="light|white|dark|navy"` sets `data-theme`; every component reads the semantic tokens, so no component takes a colour prop.
- Type: Instrument Sans (display + body), Geist Mono (eyebrows, numerals, meta). Scale utilities: `text-display-xl`, `text-display-l`, `text-h3`, `text-h4`, `text-body-l`, `text-body`, `text-small`, `text-eyebrow`.
- Hairlines, not cards. Bordered containers only in the pathway split, team grid and form controls. Radius 4px on controls, 0 elsewhere. One glass surface: the scrolled header.
- Motion: one easing, four durations, all in tokens. Reveals are visible at rest (CSS keyframes for headlines; `data-reveal` only added after hydration for scroll reveals). `prefers-reduced-motion` zeroes every duration.

### Design direction v2 — instrumentation set

Implemented on top of the launch system (see the design-direction document):

- **Hero as instrument** — `HeroGrid` draws its lines on mount (`.grid-line` / `.drawn`); registration marks and a `§` coordinate frame the sheet; `SystemStrip` settles four structural counts derived from the content arrays (never typed). Grain on navy grounds via the `grain` utility, tuned by `--grain-opacity` (set to 0 to disable).
- **Stage position** — `StagePosition` shows the five-stage line with the honest state of every stage; used on the Fit Check result screen and in the confirmation email.
- **Information drawer** — `InfoDrawer` (native `<details>`) on both contact steps and the contact form, values from `config/retention.ts`.
- **Controls matrix** — `LegalDocument.controls` renders the Security page's implemented / not-claimed table.
- **Blueprint coordinates** — `Section` accepts `coordinate`, `coordinateRight` and `ticks` (desktop only).
- **Controls with weight** — primary buttons carry an edge light (`--edge-light`); text controls sit in a `.focus-draw` wrapper; checkbox ticks draw (`.tick-path`).
- `/dev/components` is a development-only gallery (404 in production) for reviewing components on both grounds.

## Flows

`FlowShell` renders any `FlowDefinition` (`src/forms/*/definition.ts`): intro → one question per screen → review → result. Each step has its own zod schema (used by react-hook-form via `zodResolver` and again on the server). Focus moves to the heading on every screen change; progress is announced via a live region; Enter on a radio advances.

Drafts: steps marked `draft: true` are saved to `localStorage` (never the contact step); expire after `retention.localDraftDays`; cleared on submit. `useDraft` reads storage as an external store.

Result copy is rendered verbatim from `content/en/flows.ts` by result key. The "confirmation sent to your email" line appears only when the email adapter actually succeeded (`emailed` in the API response).

### Fit Check routing (`lib/fit/rules.ts`)

Two user-facing results. `potential-fit` requires **all** of: relationship ∈ {owner, controlling, developer, government}; stage ∈ {documented, development, operating, operating-financed}; country in the public supported list; project type ≠ other. Everything else → `submitted-for-review`. Value, capital sought and objective never affect the result — they become internal tags. "Not a fit" is never automated.

Internal jurisdiction review tags come from `config/jurisdictions.ts` (server-only, env-driven) and never appear in copy.

## Submission pipeline (`app/api/submit/[kind]/route.ts`)

origin check → meta validation → rate limit (per hashed IP: 10/10 min; per email: 5/h) → idempotency (attempt key, 10 min) → spam (honeypot, minimum fill time, optional Turnstile) → zod schema → sanitise → rules → reference id → `deliver()` → response `{ id, result, emailed }`.

`deliver()` runs the **primary** adapter's `persist` (must succeed → otherwise 503 and the user can retry), then secondaries best-effort, then the primary's own `notify`. Adapters are composed from env in `integrations/index.ts`; a `log` primary is refused in production unless explicitly allowed.

Logs carry reference, kind, result and tags only — never answers.

## Guards against invented content

- `content/en/team.ts` is empty → the team section is not rendered.
- Partner logos render only with `permission: true`; none exist.
- `scripts/check-placeholders.mjs` runs before every build; fails when `VERCEL_ENV=production` or `GDA_STRICT_CONTENT=1` while any `[PLACEHOLDER]`-style marker remains in `src/content` or `src/config`.
- `/security` and `/privacy` describe implemented behaviour; retention values come from `config/retention.ts`.

## Security headers

Set in `next.config.ts`: CSP (static pages, so `'unsafe-inline'` is required for the App Router's inline scripts and Motion's inline styles; everything else strict), HSTS, nosniff, DENY framing, referrer policy, permissions policy, COOP. `/api/*` is `no-store`.

## SEO

Per-page metadata from each content module's `meta` (template appends the site name; homepage uses an absolute title). Organization + WebSite JSON-LD from `config/site.ts`; FAQPage on How It Works. `sitemap.ts` lists indexable pages only; `robots.ts` disallows flows, API and reserved routes, and disallows everything on non-production deployments. OG image generated from the design system.

## Environment

See `.env.example`. Nothing sensitive is `NEXT_PUBLIC_`. Required for launch: `NEXT_PUBLIC_SITE_URL`, a durable adapter (`AIRTABLE_*` or `SUBMISSIONS_WEBHOOK_URL`), `RESEND_API_KEY` + `EMAIL_FROM` + `SUBMISSIONS_TO_EMAIL`, `IP_HASH_SALT`. Recommended: `UPSTASH_REDIS_REST_*` (shared rate limiting), Turnstile keys, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

## Commands

```
npm run dev          # local development
npm run verify       # lint + typecheck + tests + build
npm run test         # vitest
npm run check:placeholders
```
