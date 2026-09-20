# Lumen Analytics — GA4 + Next.js classroom demo

The same GA4 teaching demo as the plain-HTML version in the parent folder,
rewritten in Next.js (App Router + TypeScript) for classes where students'
prototypes are built in Next.js. Same fictional SaaS brand, same funnel,
same events — different plumbing.

## How GA4 is wired in (and why)

Two options exist for getting gtag.js into a Next.js app: paste the raw
`<script>` snippet into `<head>` yourself, or use
[`@next/third-parties`](https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics-ga),
the official Next.js package for exactly this. This project uses the
module, because it:

- Loads the script via `next/script` with an optimized strategy, instead of
  a plain blocking `<script>` tag.
- Gives you `sendGAEvent()` for custom events, so you're not reaching for a
  raw `window.gtag` that may or may not exist yet.
- Is what you'd reach for on a real Next.js project anyway — worth teaching
  once, the "module" way, rather than the copy-paste way you'd use on a
  plain static site (see the [static version](../README.md) for that
  approach, for contrast).

See [`src/lib/gtag.ts`](src/lib/gtag.ts) (the `trackEvent()` helper) and
[`src/app/layout.tsx`](src/app/layout.tsx) (where `<GoogleAnalytics>` is
mounted).

### The SPA page_view gotcha

GA4's snippet only fires `page_view` once, when the script first loads — it
has no way to know when Next.js swaps the page client-side without a full
reload. [`src/components/GAPageViewTracker.tsx`](src/components/GAPageViewTracker.tsx)
fixes this: it watches the route with `usePathname`/`useSearchParams` and
sends `page_view` manually on every client-side navigation after the first
(the first is already covered by the module's initial `gtag('config', …)`
call). This is a good moment in class to contrast single-page apps against
the multi-page static version, where every navigation is a full reload and
GA's snippet re-fires naturally.

## What's on the site

| Route | Purpose |
|---|---|
| `/` | Homepage — hero CTAs, UTM campaign-link simulator, newsletter signup. |
| `/pricing` | Three plans, starts the ecommerce funnel. |
| `/checkout/[plan]` | Fake checkout (dynamic route — `/checkout/starter`, `/checkout/pro`, `/checkout/business`). |
| `/thank-you` | Purchase confirmation / conversion landing page. |
| `/blog` | Long article for scroll tracking, outbound links, a PDF download, and site search. |
| `/contact` | Lead-gen form. |
| `/login` | Fake login (no real backend) — demonstrates the `login` event and GA4's User-ID field. |
| `/account` | A page gated behind that fake login — demonstrates tracking "behind login" content. |

Custom event names and parameters are identical to the static version —
see the [event reference table in the parent README](../README.md#events-this-site-fires-and-where-to-see-them-in-ga4).
The `/checkout/[plan]` route additionally demonstrates `generateStaticParams`,
required for static export since there's no server to resolve dynamic
routes at request time.

### Tracking pages behind login, the Next.js way

Same concept as the static site — see [the parent README's section on
this](../README.md#tracking-pages-behind-login-loginhtml--accounthtml) for
the GA4/User-ID/PII explanation — but the implementation looks different
because of how an SPA holds state:

- [`src/lib/auth.ts`](src/lib/auth.ts) stores the fake "logged in" flag and
  a random, non-identifying user ID in `localStorage`, exposed as React
  hooks (`useIsLoggedIn()`, `useUserId()`) built on `useSyncExternalStore` —
  the correct way to subscribe a component to state that lives outside
  React, so every component using them (the nav, the account page) updates
  immediately on login/logout with no prop drilling or manual refresh.
- [`src/components/AuthUserIdSync.tsx`](src/components/AuthUserIdSync.tsx),
  mounted once in the root layout, is the only place that actually calls
  `setGaUserId()`. Because layouts persist across client-side navigations
  in the App Router, this runs once per login (or once on load if already
  logged in from a previous visit) rather than once per page — unlike the
  static site, which has to re-read `localStorage` and re-call `gtag('set',
  ...)` in every single page's `<head>`, since a full page load resets its
  JS state. Worth pointing out in class as a concrete SPA-vs-MPA difference.
- `/login` and `/account` are both plain client components using those
  hooks directly — no `useEffect`/`useState` dance to read `localStorage`,
  which also sidesteps the SSR/static-export hazard of touching
  `localStorage` during a build (there's no `window` at build time; the
  hook's server-snapshot value is just "logged out").

## 1. Set up GA4

Same as the static version: create a GA4 property + Web data stream at
[analytics.google.com](https://analytics.google.com), copy the Measurement
ID (`G-XXXXXXXXXX`), and confirm Enhanced Measurement is on for the stream.

## 2. Configure the app

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` and set:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-REAL-ID
```

The `NEXT_PUBLIC_` prefix is required — it's what tells Next.js to expose
the variable to browser-side code (anything without that prefix stays
server-only and `<GoogleAnalytics>` wouldn't see it). `.env.local` is
gitignored, so each student can drop in their own ID without it ending up
in version control.

```bash
npm run dev
```

## 3. Publish with GitHub Pages

This project builds to static HTML (`output: "export"` in
[`next.config.ts`](next.config.ts)), so it can be hosted on GitHub Pages
like any static site — just via a build step first.

**Option A — GitHub Actions (recommended):** a workflow is already set up
at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It runs
`npm run build` and deploys the `out/` folder on every push to `main`.

1. Push this folder to a GitHub repo (if it's nested inside a larger repo,
   move `.github/workflows/deploy.yml` to that repo's root first — GitHub
   only looks for workflows there).
2. In the repo: **Settings → Secrets and variables → Actions → Variables tab**
   → add a repository *variable* (not a secret — a Measurement ID isn't
   sensitive, it's visible in every visitor's page source anyway) named
   `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your real ID.
3. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Push to `main` — the workflow builds and deploys automatically.

**Option B — manual:**

```bash
npm run build
npx gh-pages -d out
```

### A note on basePath

GitHub Pages serves a project repo at `https://<user>.github.io/<repo>/`,
not the domain root, so `next.config.ts` automatically sets `basePath`/
`assetPrefix` to `/<repo>/` when running inside GitHub Actions (via the
`GITHUB_REPOSITORY` env var it sets automatically) — otherwise every CSS/JS
asset would 404 once deployed. Local dev is unaffected. Skip this entirely
if the repo is named `<username>.github.io`, since that one deploys at the
domain root.

## 4. Verify and teach from it

Same as the static version — GA4 Realtime, DebugView, and the DevTools
console (every `trackEvent()` call logs there too). See the
[classroom exercises in the parent README](../README.md#5-suggested-classroom-exercises)
— they all still apply here.
