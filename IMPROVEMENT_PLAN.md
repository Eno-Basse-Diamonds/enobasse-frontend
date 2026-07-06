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

## Phase 2 — SEO fixes

- [ ] Replace static `src/app/sitemap.xml` (hand-written, 25 URLs, hardcoded `lastmod: 2025-06-07`, no products/blog posts) with a dynamic `src/app/sitemap.ts` that pulls all products, collections, and blog posts with real `lastmod` values
- [ ] Replace static `src/app/robots.txt` with `src/app/robots.ts`
- [ ] Add `ItemList`/`BreadcrumbList` JSON-LD to the products and collections list pages (reuse existing `src/components/seo/*` schema components)
- [ ] Add page-specific `metadata` export to the home page (`src/app/(home)/page.tsx`) instead of relying solely on root layout defaults

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
