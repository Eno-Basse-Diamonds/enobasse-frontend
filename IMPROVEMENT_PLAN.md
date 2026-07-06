# Enobasse Frontend — Improvement Plan

Tracking doc for code quality, performance, and SEO work. Based on a full audit of the codebase (356 source files, Next.js 16 App Router, React 19, TanStack Query, Zustand, next-auth, three.js).

Check items off as they're completed. Update the "Findings" notes if something changes once we're in the code.

---

## Decision: no automated tests

This project will not have unit tests or e2e tests. The old Playwright stub (`tests/browser.test.ts`) and the `@playwright/test` dependency have been removed. Phase 5's CI item is scoped to lint + typecheck only, no test runner.

## Phase 0 — Critical fixes (done)

- [x] **Next.js security patch**: upgraded `next` 16.0.7 → 16.0.10. 16.0.7 had an unpatched High-severity DoS vulnerability (CVE-2025-55184 / CVE-2025-67779, no workaround) plus a medium-severity source-code-exposure issue (CVE-2025-55183). Applied via `npx fix-react2shell-next --fix` + `pnpm install`.
- [x] **Fixed a broken production build**: `framer-motion` and `three-stdlib` were imported directly in code (`image-gallery.tsx`, `three-d-ring.tsx`) but never declared in `package.json` — they only resolved before by accident via npm's flat `node_modules` hoisting (as transitive deps of `motion` and `@react-three/drei`). Under pnpm's strict linking this broke the build entirely. Fixed by converting `image-gallery.tsx` from the legacy `framer-motion` import to the already-standard `motion/react-client` pattern used everywhere else in the codebase, and adding `three-stdlib` as an explicit dependency. `pnpm build` now succeeds.
- [ ] Turn on `@typescript-eslint/no-unused-vars` in `eslint.config.mjs` (currently off)
- [ ] Bump `@typescript-eslint/no-explicit-any` from `warn` to `error` (ratchet in — fix existing violations incrementally, don't block CI day one)

## Phase 1 — Quick, high-impact fixes (done)

- [x] Replaced raw `<img>` in `src/components/hero-section/index.tsx` with `next/image` (`fill` + `priority`) — this is the homepage LCP element. Also removed a genuinely unused `Link` import found while in the file.
- [x] **Removed `hero.mov` and `maintenance.mov` entirely instead of compressing them.** Both `<video>` elements list `.mp4` (H.264) first in their `<source>` list, and virtually every browser supports H.264 — so the `.mov` (HEVC/QuickTime) fallback was *never actually downloaded by any real user*, just dead weight in the repo (~8MB). Removed the files and their `<source>` tags from `hero-section/index.tsx` and `(home)/_components/services-section.tsx`. `public/videos/` went from 14MB → 6.4MB.
- [x] **Draco-compressed all 46 `.glb` files** in `public/3d-models/`: 71MB → 7MB (~10x reduction), geometry-lossless (draco-only, no mesh simplification, vertex counts unchanged — verified via `gltf-transform inspect`/`validate`). Verified end-to-end in a real headless-browser run of `/creative-studio`: the live `ThreeDRing` WebGL canvas loads and renders the compressed models correctly, with no visual artifacts, missing geometry, or console/page errors from the 3D pipeline. (Note: the batch compression script had two nasty gotchas worth remembering — a `while read` loop sharing stdin with the CLI process corrupted output silently, and naming the temp output file with a non-`.glb` extension made `gltf-transform` misdetect the format and write a near-empty stub. Both were caught via per-file sanity checks before anything was committed.)
- [x] Added `"analyze": "cross-env ANALYZE=true next build"` script (`cross-env` added as a dev dep for Windows compatibility). Ran it: **`@next/bundle-analyzer` produces no output under Next 16's default Turbopack build** (it only hooks into webpack). Not worth chasing further right now — noted as a known ecosystem gap, not a bug in this repo.
- [x] Routed all 19 stray `console.*` calls through `src/lib/utils/logger.ts` (across 13 files). Deleted two calls that were pure dead debug code (`console.log(response)` in `lib/api/cart.ts`, an argument-less `console.log()` in `diamond-type-selection.tsx`).
- [x] Restricted `images.remotePatterns` in `next.config.ts` to `res.cloudinary.com` (the only real image host in use — verified via grep across `src/`) instead of `hostname: "**"`.
- [x] Added `"image/avif"` to `next.config.ts` image `formats`.

**New finding from verification (not yet actioned):** while browser-testing the above, `next start` intermittently returns `500`/`504` from `/_next/image` for some Cloudinary-proxied images, with the server log showing `TimeoutError: The operation was aborted due to timeout`. Direct requests to the same Cloudinary URLs succeed instantly, so this is Next's image-optimization worker timing out during fetch+resize, not a bad host/format config (reproduced this consistently on 5/5 requests for one asset). Didn't chase root cause further since it wasn't introduced by anything in this session — worth a dedicated investigation later (possible causes: `sharp` install issue, resource limits, or an upstream Cloudinary rate limit under burst load).

**Also noticed, not fixed (small, low-priority):** `src/app/(store)/products/[slug]/_components/reviews.tsx:54` defaults a new review's `authorImage.url` to `https://via.placeholder.com/40x40` — an external placeholder service. Since `remotePatterns` is now locked to `res.cloudinary.com`, this would render as a broken image (harmless — the component already has an `onError` fallback to a generic user icon), but it'd be cleaner to just default to `null`/no image and let the existing fallback icon handle it, rather than depend on an external service at all.

## Unplanned: Tailwind v3 → v4 migration (done)

Dependencies got bumped externally to their latest majors (Next 16.2.10, Tailwind v4, Zod v4, TypeScript 6, etc.). This broke the build: Tailwind v4 moved the PostCSS plugin to a separate package and changed how "satellite" CSS files (outside the main entry) see the theme/utilities. Fixed:
- [x] `postcss.config.mjs`: `tailwindcss` → `@tailwindcss/postcss` (and dropped `autoprefixer`, which v4 handles internally — removed the now-unused dependency too)
- [x] Split the Tailwind bootstrap (`@import "tailwindcss"; @config "...";`) out of `globals.scss` into a new plain `src/app/tailwind.css`, since Tailwind v4 parses `@reference`/`@import` targets as literal CSS and chokes on Sass-only syntax (`//` comments, `&__foo` BEM nesting) that `globals.scss` still needs for its component classes. `globals.scss` now just does `@import "./tailwind.css";`.
- [x] `header/styles.scss` (the only component-level `.scss` using `@apply` outside the main entry) now has `@reference "../../app/tailwind.css";` at the top, per Tailwind v4's rules for satellite stylesheets.
- [x] Renamed `tailwind.config.js` → `tailwind.config.mjs` (it already used ESM `import`/`export default` syntax; this was silently triggering a Node module-type reparse warning on every build).
- [x] Kept the existing JS config (`tailwind.config.mjs` — custom colors, fonts, content globs, the `tailwind-scrollbar` plugin) via v4's `@config` compatibility directive rather than rewriting everything to CSS-first `@theme` — lower risk, verified working. A full native-v4 `@theme` migration is a nice-to-have, not required; not added to the plan since the compat path works fine.
- [x] Verified via clean rebuild (no warnings/errors) and a real headless-browser pass over the homepage, `/about`, and `/faqs` — styling, fonts, colors, and layout all render correctly post-migration.

## Phase 2 — SEO fixes (done)

- [x] Replaced static `sitemap.xml`/`robots.txt` with dynamic `src/app/sitemap.ts` / `src/app/robots.ts`. Sitemap pulls all products (paginated loop), published collections, and published blog posts live from the API, with real `lastModified` where the data has it (products' `createdAt`, blog posts' `updatedAt`/`createdAt`); static marketing pages listed directly. Each data source is wrapped in its own try/catch so one API failure can't take down the whole sitemap — verified this actually works by building with the backend unreachable (sandbox has no backend running) and confirming it falls back to just the static routes instead of failing the build. `revalidate = 3600` so it refreshes hourly in production. `robots.ts` disallows all private/utility routes (account, cart, checkout, orders, wishlist, auth flows, admin, api).
- [x] Added `ItemList` + `BreadcrumbList` JSON-LD to both the products list and collections list pages (new reusable `src/components/seo/ItemListSchema.tsx`).
- [x] Added explicit `metadata` to the home page (`(home)/layout.tsx`) instead of relying solely on root defaults, plus two services pages that had **no metadata at all** because they had no `layout.tsx`: created `(services)/maintenance-repairs/layout.tsx` and `(services)/ring-resizing/layout.tsx` (their `page.tsx` files are `"use client"`, so metadata has to live in a layout).
- [x] Added `public/llms.txt` — a curated markdown overview of the site for LLM consumption, per the emerging (not yet a guaranteed/universally-adopted standard) `llms.txt` convention.

### Real bugs found and fixed during the SEO pass

- [x] **Domain inconsistency**: metadata/canonicals were split between `https://enobasse.com` and `https://www.enobasse.com` across ~17 files (root layout/robots.txt use the apex domain). Standardized everything on the apex domain to avoid canonical/duplicate-content confusion.
- [x] **Wrong URLs in schema**: `ProductSchema.tsx` and `CollectionSchema.tsx` built product URLs as `/product/{slug}` (singular) — the real route is `/products/{slug}` (plural). Every product URL in that JSON-LD was 404ing.
- [x] **Broken logo URL**: `OrganizationSchema.tsx` and `ArticleSchema.tsx` referenced `https://enobasse.com/logo.png`, which doesn't exist (no `public/logo.png`). Pointed both at the real Cloudinary-hosted logo used everywhere else in the app.
- [x] **Fake business data**: `OrganizationSchema.tsx` had a placeholder phone number (`+1-234-567-890`) and generic/wrong social URLs (`facebook.com/enobasse` instead of the real `facebook.com/eno.basse`, etc.). Replaced with the real phone, email, and social handles pulled from the actual contact page and footer. Also upgraded `@type` from generic `Organization` to `JewelryStore` (a schema.org `LocalBusiness` subtype) and added a real `PostalAddress` (Admiralty Mall, Lekki Phase 1, Lekki, Lagos) — this is the single highest-leverage change for local/"near me" search discoverability.
- [x] **Fake search feature**: `WebSiteSchema.tsx` had a `SearchAction` pointing at `/search?q=` — there is no `/search` route; search is a client-side overlay only. This could have sent Google's Sitelinks Search Box feature to a dead page. Removed it.
- [x] **A page-crash bug that would have hidden the products page from every crawler**: `products/(list-view)/layout.tsx` directly `await`s `getPreferredCurrency(...)` with no error handling. When that one API call fails, it throws and takes down the *entire* products route — page heading, empty state, and my new BreadcrumbList schema all vanish, with no visible error (silent blank render in production mode). Caught this by literally testing with the backend unreachable. Fixed with a fallback-to-`"USD"` try/catch, and found + fixed the exact same unguarded pattern in `products/[slug]/layout.tsx` and `collections/[slug]/layout.tsx` — meaning every single product and collection detail page had the same fragility. These are the highest-traffic, most SEO-valuable pages on the site, so this was worth fixing now rather than filing for later.
- [x] **Stray literal quote in title metadata**: both `products/[slug]/layout.tsx` and `collections/[slug]/layout.tsx` had `` `${name} - Eno Bassé Diamonds"` `` in their Twitter title — a copy-paste typo leaving a literal trailing `"` character in the rendered title. Fixed both.
- [x] Fixed a title-duplication bug I introduced myself while adding home page metadata: setting a full literal title string gets wrapped by the root layout's `title.template`, producing "...Diamond Collections - Eno Bassé Diamonds". Fixed with `title: { absolute: "..." }` to bypass the template for the homepage, verified in a real browser render.
- [x] Aligned brand name casing across schemas (`"Enobasse"` → `"Eno Bassé Diamonds"` in `ProductSchema`/`ArticleSchema`/`OrganizationSchema`, matching the root layout's branding).

### Not fixed / flagged for later (out of scope for this pass)

- Product JSON-LD offers could add `hasMerchantReturnPolicy`/`shippingDetails` (Google's newer Merchant Listing recommendations), but that requires exact shipping cost/return-window data I don't have confirmed — fabricating it would be worse than omitting it.
- `reviews.tsx`'s `https://via.placeholder.com` default avatar (noted in Phase 1) is now more visible since `remotePatterns` is locked down — still just cosmetically falls back to a generic icon, not broken.

## Phase 3 — Server-render the catalog (biggest structural change)

- [ ] Migrate `src/app/(store)/products/(list-view)/page.tsx` from client-fetched (`"use client"` + TanStack Query hook) to a server component using prefetch + `HydrationBoundary` — same pattern the home page already uses correctly
- [ ] Do the same for `src/app/(store)/collections/(list-view)/page.tsx`
- [ ] Once server-rendered, replace blanket `no-store` in `src/lib/api/products.ts` / `collections.ts` / `blog-posts.ts` with `revalidate`/ISR where appropriate

## Phase 4 — Code quality cleanup

- [ ] Eliminate `any` usage in `src/lib/config/auth.ts` (NextAuth `signIn` callback types `user`, `account`, `profile`, `email`, `credentials` all as `any`) — highest-risk spot given it's auth code
- [ ] Add zod schemas for cart, checkout, orders, reviews, and contact forms (currently only auth/blog/collections have them, in `src/lib/validations/`)
- [ ] Add a validated env schema (zod) in `src/lib/config/env.ts` so missing/malformed env vars fail fast at boot instead of via `!` non-null assertions scattered across 17 call sites
- [ ] Break up god-components:
  - [ ] `src/components/header/index.tsx` (886 lines)
  - [ ] `src/app/(others)/admin/blog/_components/blog-post-form.tsx` (673 lines)
  - [ ] `src/app/(store)/products/[slug]/page.tsx` (666 lines)
  - [ ] `product-form.tsx` (~575 lines), `reviews.tsx` (~578 lines)
- [ ] Migrate remaining `.scss` files to Tailwind (`globals.scss`, `creative-studio/styles.scss`, `header/styles.scss`, `hero-section/styles.scss`)
- [ ] Start a `components/ui` primitives layer instead of the current flat ~30-folder ad hoc structure (do opportunistically as components are touched, not a big-bang rewrite)

## Phase 5 — Process / tooling ("industry standard")

- [ ] Add CI (GitHub Actions) running lint + typecheck + build on every PR
- [ ] Add Husky + lint-staged pre-commit hook (lint/format/typecheck on staged files)
- [ ] Add bundle-size and Lighthouse CI budgets to catch performance regressions before merge

---

## Reference: audit findings (for context, not action items)

**Performance**
- API layer (`src/lib/api/*`) is clean — single axios client with cache interceptor, thin domain wrappers. No raw `fetch`/`axios` calls scattered in components. Keep this pattern.
- `next/font` already used correctly with `display: "swap"`.
- three.js/react-three-fiber already isolated to creative-studio and loaded via `next/dynamic` — good.
- 45 files already use `next/image` correctly; only the hero-section offenders remain.

**SEO**
- Root layout, product detail pages, and collection detail pages already have solid `generateMetadata()` + JSON-LD (Organization, WebSite, Product, Collection, Article, FAQ, Breadcrumb schemas all wired in `src/components/seo/`).

**Code quality**
- Zustand stores (9, in `src/lib/store/`) are well organized, one per domain.
- Git history is real and meaningful (179 commits, conventional style) — not a scaffold dump.
- Only 1 TODO/FIXME in the whole codebase.
