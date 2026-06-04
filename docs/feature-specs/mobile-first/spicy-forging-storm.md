# Kicksnare — Responsive Layout Shaping Doc

## Frame

### Problem

- Site is 100% desktop-first: hardcoded multi-column inline styles, no responsive breakpoints
- At 375px, 3–4 column grids shrink to unreadable widths
- Navigation horizontal flex with no mobile menu
- Section padding hardcoded at 56px; `--wrap-pad-mobile: 24px` declared but never used
- Modals: no mobile treatment + hidden-start animations that freeze at opacity:0
- Oversized footer wordmark bleeds past viewport, causing horizontal scroll on mobile
- Design prototype files in `docs/` not ported; case data inline; fonts via CDN; missing `'use client'`

### Outcome

- Real full-width fluid experience from 375px → 1440px; no horizontal scroll at any viewport
- Desktop design unchanged at ≥1024px
- Modals open visibly; both CaseStudyModal and ContactModal full-screen on mobile
- Header nav collapses to hamburger on mobile
- All code structure improvements in place (case data, fonts, directives, prototypes)

---

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | Real full-width fluid site from 375px up — no artificial container or phone frame | Core goal |
| R1 | Every multi-column grid must stack to 1 column as the mobile default | Must-have |
| R2 | Header nav collapses on mobile — all 4 links + CTA reachable via hamburger | Must-have |
| R3 | Headlines scale with `clamp()` — existing values preserved, not replaced | Must-have |
| R4 | Section horizontal padding: 24px mobile (`--wrap-pad-mobile`), 56px desktop | Must-have |
| R5 | Desktop design (≥1024px) must remain pixel-identical to current | Must-have |
| R6 | No SSR hydration mismatch for above-the-fold / page-level layouts | Must-have |
| R7 | No new npm dependencies | Must-have |
| R8 | CaseStudyModal: full-screen on mobile, centered dialog on desktop | Must-have |
| R9 | 🟡 ContactModal: full-screen task view on mobile (`fixed inset-0`, solid background, 44px close target, safe-area inset padding) — no partial overlay; centered card on desktop unchanged | Must-have |
| R10 | Modals adapt via `useIsMobile()` hook — one component each, no duplication | Must-have |
| R11 | Soundwave logo SVG + beat animation preserved exactly | Must-have |
| R12 | Full CSS token palette preserved as-is | Must-have |
| R13 | Contact form submits to info@kicksnare.digital | Must-have |
| R14 | "Book a slot" CTA card preserved in contact section | Must-have |
| R15 | Tweaks panel (`tweaks-panel.jsx`) is prototype-only — do NOT port to `components/` | Must-have |
| R16 | Port `portfolio-app.jsx` and `portfolio-desktop-app.jsx` → `components/*.tsx` | Must-have |
| R17 | Case study data → `lib/cases.ts`, typed, imported | Must-have |
| R18 | Fonts: swap Google `<link>` for `next/font/google`; wire to `--display / --serif / --mono` | Must-have |
| R19 | All components using `useState`/`useEffect` must have `'use client'` as first line | Must-have |
| R20 | Modals must open visible — remove hidden-start opacity:0 animations; modal base state `opacity:1` | Must-have |
| R21 | 🟡 No horizontal scroll on mobile — clip the oversized footer wordmark bleed with `overflow-x: hidden` on the footer element (NOT on `html`/`body`, which would break the sticky header); verify `scrollWidth === clientWidth` | Must-have |
| R22 | Section vertical padding scales down on mobile | Nice-to-have |
| R23 | 🟡 On mobile, Contact section presents a single primary full-width "Contact us" button; "DM @kicksnare ↗" and "Book a slot ↗" demoted to quiet text links below it; desktop three-card layout unchanged (R14 preserved on desktop) | Must-have |
| R24 | 🟡 On mobile, header CTA pill is hidden (`opacity-0 pointer-events-none`) while hero is in viewport (scrollY ≤ 560px); transitions to visible (`opacity-100`) after hero passes; desktop header CTA unchanged | Must-have |
| R25 | 🟡 Hero left column (default layout): on mobile, headline + CTA (P1) appear above the fold together; description paragraph (P3) moves below the CTA; desktop column order unchanged | Must-have |
| R26 | 🟡 Problem pain cards and Process steps — on mobile, descriptions collapsed behind a tap (accordion); titles always visible as scannable triggers; rotating +/× indicator; smooth `grid-template-rows: 0fr → 1fr` expand; Process step 1 open by default; desktop: both sections fully open and unchanged | Must-have |
| R27 | 🟡 Card grids (work cards, stats, pain cards, process steps) use `repeat(auto-fit, minmax(min(100%, Xpx), 1fr))` with content-derived column floors (work ~300px, stats ~160px, pain/process rows ~220px); asymmetric sidebar layouts (hero, audit, about, problem, process intro, contact) switch stacked→side-by-side via `@container` at a content-derived threshold; no `sm:`/`lg:` breakpoint utilities remain in any grid-column definition | Must-have |
| R28 | 🟡 `@container` queries drive the **mode switch** for nav collapse and accordion/expanded display — each component declares `container-type: inline-size` on its wrapper and CSS reacts to its own available width; individual accordion item open/close state is managed by `useState` with a deterministic server-safe initial value; `useIsMobile()` is not used for any structural render branch | Must-have |
| R29 | 🟡 Any remaining pixel thresholds (e.g., contact modal going full-screen) are content-derived and documented as "this layout breaks below Xpx" — not chosen from a device chart | Must-have |
| R30 | 🟡 Body copy minimum 16px across all sections (Problem pains, Work blurbs, Process steps, case-study lede/detail/steps/CTA) and contact form inputs; side-effect: iOS no longer auto-zooms on field focus | Must-have |
| R31 | 🟡 Line-height ≥1.5 on all body and descriptive text — no `1.4` values remain in body copy or form fields | Must-have |
| R32 | 🟡 Max 2 font families site-wide: sans (`--display`, Space Grotesk, 5 weights 300–700) + serif (`--serif`, Crimson Pro, italic accent); drop JetBrains Mono entirely; all eyebrow/meta roles that used `--mono` fold into `--display` with `textTransform: 'uppercase'` and `letterSpacing: '0.14em'` | Must-have |
| R33 | 🟡 All interactive elements (buttons, links, icons, form fields) must have a minimum tappable area of 44×44px on mobile | Must-have |
| R34 | 🟡 Visual size of an element may be smaller than its tap zone — invisible padding / `minHeight` / `minWidth` used to reach 44px minimum without altering visual design; desktop untouched | Must-have |
| R35 | 🟡 Mobile primary CTA moves from top-right header to a sticky bottom bar: full-width "Let's talk", 52px tall, `padding-bottom: env(safe-area-inset-bottom)`; appears once hero scrolls out of viewport; auto-hides when Contact section enters view (never competes with Contact CTA); header CTA pill is desktop-only | Must-have |
| R36 | 🟡 Minimum 8px spacing between all adjacent tap targets on mobile | Must-have |
| R37 | 🟡 Primary CTAs and nav items reachable without repositioning hand grip — bottom-bar placement + hamburger menu satisfy one-handed reach | Must-have |
| R38 | 🟡 Contact form inputs: minimum height 44px; every field has a visible label above it (not placeholder-only) | Must-have |
| R39 | 🟡 No double-tap required for any primary action — all links and buttons respond to single tap | Must-have |
| R40 | 🟡 Maximum navigation depth on mobile: 2 levels (nav links → case study modal); no third level introduced | Must-have |
| R41 | 🟡 Back / close navigation always accessible without scrolling — modal close buttons remain fixed/sticky in the viewport at all times | Must-have |
| R42 | 🟡 Active state clearly visible on the current nav section — in-viewport section highlighted in the hamburger menu and/or header nav | Must-have |
| R43 | 🟡 All `<img>` elements replaced with `next/image`; `sizes` prop set to match CSS layout width — handles srcset, mobile-optimised resizing, AVIF-first / WebP-fallback conversion, and lazy loading automatically (UX severity: High — image-optimization, lazy-loading) | Must-have |
| R44 | 🟡 `<Image priority />` on exactly one element per page (the LCP / most important above-fold image) — sets `fetchpriority="high"` and disables lazy loading; never apply to more than one image or it defeats the purpose | Must-have |
| R45 | 🟡 AuditFig `<img>` inside SVG `<foreignObject>` cannot use `next/image` — add `loading="lazy"`, explicit `width`, `height`, and serve a WebP src manually; this is the one `<img>` tag exception in the codebase | Must-have |
| R46 | 🟡 No photography exists yet (Brand Non-Negotiable #9 — striped SVG placeholders); if hero photography is introduced on mobile, replace with `var(--primary)` brand color or compress aggressively — eliminates the largest per-page byte cost on mobile | Nice-to-have |
| R47 | 🟡 Any video introduced must have `muted`, `playsinline` (required on iOS to prevent full-screen takeover), and an explicit play button — no autoplay on mobile; respect `prefers-reduced-motion: reduce` | Must-have |
| R48 | 🟡 Colour contrast: contact form input text on `rgba(249,254,253,0.06)` dark background fails 4.5:1 — raise input background to `rgba(249,254,253,0.10)` minimum and verify input text uses `var(--paper)` at full opacity; all other text tokens in the current palette already pass WCAG AA | Must-have |
| R49 | 🟡 Keyboard navigation: remove `outline: none` from contact form inputs (WCAG violation — removes only focus indicator with no replacement); WorkCard `<a href="#">` + `preventDefault` anti-pattern replaced with `<button>` or a real `href` | Must-have |
| R50 | 🟡 Alt text: all non-decorative images have descriptive `alt` text; decorative SVGs keep `aria-hidden="true"`; decorative `<img>` keeps `alt=""`; any real photography introduced must follow this pattern before shipping | Must-have |
| R51 | 🟡 `<main>` landmark wraps all primary page content between `<header>` and `<footer>` — enables screen-reader "jump to content" and satisfies WCAG landmark requirement | Must-have |
| R52 | 🟡 Layout functional at 200% browser zoom — hardcoded `height` values (e.g. StripedFig 460px) replaced with `aspect-ratio`; SVG text (`fontSize="9.5"` in AuditFig) accepted as non-scalable illustration or replaced with CSS-rendered text | Must-have |
| R53 | 🟡 Body and UI font sizes migrated from `px` to `rem` — enables OS-level large-text accessibility settings; CSS tokens updated (`--fs-body: 1rem`, `--fs-eyebrow: 0.6875rem`, etc.); `clamp()` values updated to `clamp(Xrem, Yvw, Zrem)`; display/hero headline sizes may keep `px` if purely decorative | Must-have |
| R54 | 🟡 Global `:focus-visible` rule in `globals.css`: `outline: 2px solid var(--accent); outline-offset: 2px` on all interactive elements; `.navlink` and `.link-uline` hover underline also triggered on `:focus-visible`; `outline: none` on contact inputs removed | Must-have |
| R55 | 🟡 Contact form inputs have `<label htmlFor="id">` linked to matching `<input id="...">` (visually-hidden labels acceptable if design requires); any remaining icon-only interactive elements have `aria-label`; if multiple `<nav>` landmarks exist, add `aria-label="Main"` to distinguish them | Must-have |

---

## Content Priority Matrix (Kicksnare)

*Applied from CIA.1. Scope: default ("left") hero layout only — tweak panel variants (centered, split) are prototype-only (R15) and excluded.*

| Tier | Content | Mobile treatment | Desktop treatment |
|------|---------|-----------------|------------------|
| **P1** | Headline + "Request free audit" CTA | Above fold, headline and CTA together | Above fold |
| **P2** | Hero visual (split layout only) | Below headline | Beside headline |
| **P3** | Sub-paragraph ("We build everything from…") | Below CTA (yields to P1) | Inline between headline and CTA |
| **P4** | Selected-projects list | Below the fold | Right sidebar column |

*Reference prototype: `docs/feature-specs/lets-talk-rework/Done Portfolio Responsive.html`*

---

## Shapes

### A: CSS classes in globals.css + useIsMobile() for modals

| Part | Mechanism |
|------|-----------|
| A1 | 17 responsive layout classes in globals.css |
| A2 | `.section-pad` / `.section-vert` padding classes |
| A3 | Mobile nav CSS classes |
| A4 | Wire classes into 14 grid containers; add hamburger + `navOpen` state |
| A5 | `useIsMobile()` hook (`hooks/useIsMobile.ts`) |
| A6 | CaseStudyModal full-screen mobile variant |
| A7 | 🟡 ContactModal full-screen mobile variant (`fixed inset-0`, solid background, 44px close) |
| A8 | Move prototype files → `components/*.tsx` (tweaks panel excluded) |
| A9 | `lib/cases.ts` — typed `CaseStudy[]`, imported |
| A10 | `app/layout.tsx` font loading + `<html>` className |
| A11 | `app/globals.css` CSS var update |
| A12 | Audit all components; add `'use client'` where missing |
| A13 | Remove hidden-start entrance animations from modals |
| A14 | 🟡 Add `overflow-x: hidden` to the **footer** element in `globals.css` or via className; verify no horizontal scroll at 375px |

### B: Pure CSS (no hook) — fails R10

### C: Tailwind arbitrary values + useIsMobile() for modals

| Part | Mechanism |
|------|-----------|
| C1–C10 | Same as A1–A13 (Tailwind arbitrary classes for grids) |
| C11 | 🟡 Footer `overflow-x: hidden` — add `overflow-x-hidden` class or inline style to footer; same as A14 |
| C14 | 🟡 Contact section mobile CTA: `useIsMobile()` gates layout — mobile renders full-width primary "Contact us" `<button>` + `"or DM @kicksnare ↗ · Book a slot ↗"` text links row; desktop renders existing three-card layout unchanged |
| C15 | 🟡 Header scroll gate: `heroPassed` state (`scrollY > 560`) added to PortfolioClient alongside existing `scrolled` state; Header receives `heroPassed` + `isMobile` props; CTA pill gets `opacity-0 pointer-events-none` when `isMobile && !heroPassed`, transitions to `opacity-100`; desktop pill always visible |
| C16 | 🟡 Hero P1/P3 mobile reorder (default layout only): description `<Reveal>` wrapper gets `order-3 lg:order-2`; CTA `<Reveal>` wrapper gets `order-2 lg:order-3`; headline wrapper unchanged; parent flex column unchanged; desktop order identical to current |
| C17 | 🟡 `PainItem` accordion component + Process step accordion: each item is a **single always-rendered structure** — no conditional render branch; `useState(defaultOpen)` (pain cards: `false`; process step index 0: `true`, steps 1–3: `false`) drives `data-open` attribute; description in `overflow-hidden` wrapper with `grid-template-rows: 0fr → 1fr` CSS transition keyed on `[data-open="true"]`; rotating `+` indicator via `transform: rotate(45deg)` on open; `@container (min-width: 520px)` in `globals.css` sets `.pain-item__toggle { display: none }` and `.pain-item__body { grid-template-rows: 1fr !important }` — **no `useIsMobile()` used** (see spike-r28-c17-accordion.md) |
| C18 | 🟡 Replace all fixed-count grid-column definitions with intrinsic layout: card grids use `[grid-template-columns:repeat(auto-fit,minmax(min(100%,Xpx),1fr))]` Tailwind arbitrary value (floors: work ~300px, stats ~160px, pain/process ~220px); asymmetric sidebar layouts (hero, audit, about, problem, process intro, contact) get `container-type: inline-size` on their section wrapper and switch stacked→columns via `@container (min-width: Xpx)` in `globals.css`; all `sm:grid-cols-*` and `lg:grid-cols-*` column utilities removed |
| C19 | 🟡 Nav collapse driven by `@container`: header wrapper gets `container-type: inline-size`; links + hamburger toggle via `@container (min-width: Npx)` where N is the width at which logo + links + CTA no longer fit; accordion open/collapsed mode also container-driven; no `@media` queries for any behavior mode switch |
| C20 | 🟡 Drop `JetBrains_Mono` from `next/font/google` import and `--font-mono` variable; load Space Grotesk with explicit `weight: ['300','400','500','600','700']`; update `--mono` CSS token to alias `var(--font-display)`; replace every `fontFamily: 'var(--mono)'` call site with `fontFamily: 'var(--display)', textTransform: 'uppercase', letterSpacing: '0.14em'`; remove `--font-mono` className from `<html>` |
| C21 | 🟡 `BottomBar` component (`components/BottomBar.tsx`): `position: fixed; bottom: 0; left: 0; right: 0; height: 52px; padding-bottom: env(safe-area-inset-bottom)`, full-width "Let's talk" pill; shown when `isMobile && heroPassed` (reuses `heroPassed` state already on PortfolioClient from C15/R24); `useIntersectionObserver` on `#contact` section — hides bar when contact is ≥50% in view; `display: none` (or `hidden`) on `lg:` desktop; header CTA pill gets `hidden lg:flex` — desktop-only |
| C22 | 🟡 Invisible tap-zone padding on small interactive elements: "See selected work" text link, contact secondary text links ("DM @kicksnare", "Book a slot"), footer links, and case-study modal Close button → `display: inline-flex; align-items: center; min-height: 44px; padding: 0 8px` (or equivalent negative-margin wrapper); visual appearance and desktop layout unchanged |
| C23 | 🟡 Contact form input background raised to `rgba(249,254,253,0.10)` on dark section; input text set to `var(--paper)` (full opacity) — satisfies 4.5:1 contrast against `--primary` background |
| C24 | 🟡 Add `<main>` wrapper around page body in `PortfolioClient.tsx` (between `<header>` and `<footer>`); WorkCard `<a href="#">` + `preventDefault` → `<button type="button">` with explicit `onClick` |
| C25 | 🟡 Global `:focus-visible` rule added to `globals.css`: `outline: 2px solid var(--accent); outline-offset: 2px` — covers buttons, links, inputs, textareas; `.navlink`/`.link-uline` `::after` underline also triggered on `:focus-visible`; `outline: none` removed from contact form inputs |
| C26 | 🟡 Body/UI font-size tokens migrated to `rem`: `--fs-body: 1rem`, `--fs-body-sm: 0.875rem`, `--fs-eyebrow: 0.6875rem`, `--fs-ui: 0.875rem`; `clamp()` expressions updated to rem min/max (e.g. `clamp(4rem, 8.5vw, 8rem)` for H1); StripedFig hardcoded `height` → `aspect-ratio` |
| C27 | 🟡 Contact form inputs: add `<label htmlFor="name" className="sr-only">Name</label>` + matching `id` on each input; AuditFig SVG text (`fontSize="9.5"`) accepted as non-scalable illustration (aria-hidden); `<nav aria-label="Main">` if a second nav landmark is introduced |
| C28 | 🟡 `activeSection: string \| null` state on `PortfolioClient`; `useEffect` sets up one `IntersectionObserver` per nav section (`#audit`, `#work`, `#about`, `#contact`) with `rootMargin: '-70px 0px -55% 0px'`; `activeSection` passed to `Header` as prop; `.navlink--active` added to `globals.css` forces `::after` underline visible; same class applied to hamburger menu links via shared `navLinks` array (satisfies R42 — see spike-r42-active-nav.md) |

---

## Fit Check

| Req | Requirement | Status | A | B | C |
|-----|-------------|--------|---|---|---|
| R0 | Real full-width fluid site from 375px up | Core goal | ✅ | ✅ | ✅ |
| R1 | Every grid stacks to 1-col on mobile | Must-have | ✅ | ✅ | ✅ |
| R2 | Header nav collapses, hamburger menu | Must-have | ✅ | ✅ | ✅ |
| R3 | Headlines `clamp()` preserved | Must-have | ✅ | ✅ | ✅ |
| R4 | Padding 24px mobile (CSS token) → 56px desktop | Must-have | ✅ | ✅ | ✅ |
| R5 | Desktop pixel-identical at ≥1024px | Must-have | ✅ | ✅ | ✅ |
| R6 | No SSR hydration mismatch for page layout | Must-have | ✅ | ✅ | ✅ |
| R7 | No new npm dependencies | Must-have | ✅ | ✅ | ✅ |
| R8 | CaseStudyModal full-screen mobile / centered desktop | Must-have | ✅ | ✅ | ✅ |
| R9 | 🟡 ContactModal full-screen task view on mobile (`fixed inset-0`, solid bg, 44px close, safe-area padding); centered card on desktop | Must-have | ✅ | ✅ | ✅ |
| R10 | Modals adapt via `useIsMobile()` hook | Must-have | ✅ | ❌ | ✅ |
| R11 | Soundwave logo + animation preserved | Must-have | ✅ | ✅ | ✅ |
| R12 | CSS token palette preserved | Must-have | ✅ | ✅ | ✅ |
| R13 | Contact form → info@kicksnare.digital | Must-have | ✅ | ✅ | ✅ |
| R14 | "Book a slot" card preserved | Must-have | ✅ | ✅ | ✅ |
| R15 | Tweaks panel NOT ported | Must-have | ✅ | ✅ | ✅ |
| R16 | Prototype files → `components/` | Must-have | ✅ | ✅ | ✅ |
| R17 | Case data → `lib/cases.ts` | Must-have | ✅ | ✅ | ✅ |
| R18 | Fonts → `next/font/google` | Must-have | ✅ | ✅ | ✅ |
| R19 | `'use client'` on all hook-using components | Must-have | ✅ | ✅ | ✅ |
| R20 | Modals open visible — no hidden-start opacity:0 | Must-have | ✅ | ✅ | ✅ |
| R21 | No horizontal scroll — footer `overflow-x: hidden` (not on html/body) | Must-have | ✅ | ✅ | ✅ |
| R22 | Section vertical padding scales on mobile | Nice-to-have | ✅ | ✅ | ✅ |
| R23 | 🟡 On mobile, Contact section: single primary full-width "Contact us" button; "DM @kicksnare" and "Book a slot" demoted to text links; desktop unchanged | Must-have | ✅ | ✅ | ✅ |
| R24 | 🟡 On mobile, header CTA pill hidden when hero in viewport (scrollY ≤ 560px); fades in after hero passes; desktop unchanged | Must-have | ✅ | ❌ | ✅ |
| R25 | 🟡 Hero left column (default layout): on mobile, headline + CTA travel together above the fold; description (P3) yields to below the CTA; desktop order unchanged | Must-have | ✅ | ✅ | ✅ |
| R26 | 🟡 Problem pains + Process steps: on mobile, descriptions collapsed behind a tap; titles always visible; rotating +/× indicator; grid-template-rows expand; Process step 1 open by default; desktop unchanged | Must-have | ✅ | ✅ | ✅ |
| R27 | 🟡 Card grids intrinsic (`auto-fit`/`minmax`, content-derived floors); sidebar layouts via `@container`; no `sm:`/`lg:` in any grid-column definition | Must-have | ✅ | ✅ | ✅ |
| R28 | 🟡 Behavior mode switches (nav collapse, accordion vs. expanded) use `@container` — react to own available width | Must-have | ✅ | ✅ | ✅ |
| R29 | 🟡 Remaining pixel thresholds content-derived and documented | Must-have | ✅ | ✅ | ✅ |
| R30 | 🟡 Body copy minimum 16px everywhere + form inputs (iOS zoom prevention) | Must-have | ✅ | ✅ | ✅ |
| R31 | 🟡 Line-height ≥1.5 on all body/descriptive text — no 1.4 values | Must-have | ✅ | ✅ | ✅ |
| R32 | 🟡 Max 2 families: Space Grotesk (5 weights) + Crimson Pro; mono dropped; eyebrows fold into Space Grotesk uppercase | Must-have | ✅ | ✅ | ✅ |
| R33 | 🟡 All interactive elements min 44×44px tappable area on mobile | Must-have | ✅ | ✅ | ✅ |
| R34 | 🟡 Invisible padding / minHeight to reach tap zone; visual size unchanged; desktop untouched | Must-have | ✅ | ✅ | ✅ |
| R35 | 🟡 Mobile primary CTA → sticky bottom bar (52px, safe-area); appears post-hero; hides near Contact; header CTA desktop-only | Must-have | ✅ | ❌ | ✅ |
| R36 | 🟡 Min 8px spacing between adjacent tap targets on mobile | Must-have | ✅ | ✅ | ✅ |
| R37 | 🟡 Primary CTAs + nav reachable without repositioning grip — bottom bar + hamburger satisfy one-handed reach | Must-have | ✅ | ❌ | ✅ |
| R38 | 🟡 Contact form inputs: min height 44px; visible label above each field | Must-have | ✅ | ✅ | ✅ |
| R39 | 🟡 No double-tap for any primary action | Must-have | ✅ | ✅ | ✅ |
| R40 | 🟡 Max 2 navigation levels on mobile (nav links → case study modal); no third level introduced | Must-have | ✅ | ✅ | ✅ |
| R41 | 🟡 Back / close navigation always accessible without scrolling — modal close buttons fixed in viewport | Must-have | ✅ | ✅ | ✅ |
| R42 | 🟡 Active state clearly visible on current nav section — in-viewport section highlighted in hamburger menu and/or header nav | Must-have | ✅ | ✅ | ✅ |
| R43 | 🟡 All `<img>` → `next/image`; `sizes` prop matches CSS layout width; AVIF/WebP/srcset/lazy automatic | Must-have | ✅ | ✅ | ✅ |
| R44 | 🟡 `<Image priority />` on exactly one LCP image per page; `fetchpriority="high"` + preload | Must-have | ✅ | ✅ | ✅ |
| R45 | 🟡 AuditFig `<img>` exception: manual `loading="lazy"`, `width`, `height`, WebP src | Must-have | ✅ | ✅ | ✅ |
| R46 | 🟡 If photography introduced on mobile: use brand color or compress aggressively | Nice-to-have | ✅ | ✅ | ✅ |
| R47 | 🟡 Video (if introduced): `muted`, `playsinline`, explicit play button; `prefers-reduced-motion` respected | Must-have | ✅ | ✅ | ✅ |
| R48 | 🟡 Form input contrast: raise input bg to `rgba(249,254,253,0.10)` min; input text `var(--paper)` full opacity | Must-have | ✅ | ✅ | ✅ |
| R49 | 🟡 Remove `outline: none` from inputs; WorkCard `<a href="#">` anti-pattern → `<button>` | Must-have | ✅ | ✅ | ✅ |
| R50 | 🟡 All non-decorative images: descriptive `alt`; decorative: `aria-hidden` / `alt=""`; pattern enforced for future photography | Must-have | ✅ | ✅ | ✅ |
| R51 | 🟡 `<main>` landmark wraps primary page content — screen-reader jump-to-content | Must-have | ✅ | ✅ | ✅ |
| R52 | 🟡 200% zoom: hardcoded heights → `aspect-ratio`; AuditFig SVG text accepted as non-scalable illustration | Must-have | ✅ | ✅ | ✅ |
| R53 | 🟡 Body/UI font sizes in `rem`; `clamp()` updated to rem; OS large-text settings take effect | Must-have | ✅ | ✅ | ✅ |
| R54 | 🟡 Global `:focus-visible` in `globals.css`; `.navlink`/`.link-uline` focus = same as hover; no bare `outline: none` | Must-have | ✅ | ✅ | ✅ |
| R55 | 🟡 Contact inputs: `<label htmlFor>` + matching `id`; icon-only buttons: `aria-label`; nav landmark labelled if multiple | Must-have | ✅ | ✅ | ✅ |

**B fails R10, R24, R35, and R37. A and C both pass all requirements.**

**Spikes resolved:** R42 mechanism added as C28 (spike-r42-active-nav.md). R28 × C17 conflict resolved — C17 rewritten to use `@container` + `data-open` with no `useIsMobile()` render branch; R28 narrowed to clarify layer split (spike-r28-c17-accordion.md).

**Selected shape: C — Tailwind arbitrary values + useIsMobile() for modals**

---

## Horizontal Scroll Fix Detail (R21)

**Root cause:** The footer wordmark (`clamp(80px, 16vw, 260px)` font-size) at large display font renders wider than the viewport on mobile, pushing the document scrollWidth beyond clientWidth.

**Fix (scoped — does NOT break sticky header):**
```css
/* globals.css or footer element */
footer { overflow-x: hidden; }
```

**Why NOT on `html` or `body`:** `overflow: hidden` on these elements prevents `position: sticky` from working — the sticky header would stop sticking.

**Verification:** `document.documentElement.scrollWidth === document.documentElement.clientWidth` at 375px viewport.

---

## Content-Derived Thresholds (R27–R29)

### Card grid floors (R27)

| Grid | Floor | Derivation |
|------|-------|------------|
| Work cards | 300px | Card holds thumbnail + title + 2-line description comfortably at ~300px |
| Pain cards / Process steps | 220px | Title-only cards; wrap gracefully at ~220px |
| Stats | 160px | Number + label pair; minimum readable at ~160px |

### Sidebar layout switch thresholds (R27)

| Section | `@container` threshold | Derivation |
|---------|----------------------|------------|
| Hero | 700px | Headline column readable at ~430px; sidebar project list min ~200px; gap 80px → 700px total |
| Audit, About, Problem, Process intro | 640px | Label column ~200px + content ~360px + gap 80px |
| Contact | 640px | Form card ~380px + aside ~180px + gap 80px |

### Behavior switch thresholds (R28)

| Switch | `@container` threshold | Derivation |
|--------|----------------------|------------|
| Nav collapse | 760px | Logo ~130px + links 4×80px + CTA ~120px + gaps ≈ 570px; 760px leaves comfortable breathing room |
| Accordion (pain/process) | 520px | Two-column pain card fits comfortably at ≥220px each; below 520px the grid is 1-col and vertical scanning benefits from collapse |

### Full-screen overlay threshold (R29)

| Component | Threshold | Derivation |
|-----------|-----------|------------|
| ContactModal / full-screen | below 560px | Form card with padding + fields + submit is uncomfortable below ~560px; goes full-screen there |

---

## Modal Entrance Fix (R20)

Remove `r-fade`, `r-rise`, `r-sheet` keyframes that start at `opacity:0`. Replace with CSS `transition`:
- CaseStudyModal: `transition: transform 350ms; transform: scale(0.98) → scale(1)` on open
- ContactModal: `transition: opacity 300ms; opacity: 0 → 1` on open (full-screen, no translateY — same fade-in as CaseStudyModal)

---

## Font Loading (R18 + R32)

2 families only — JetBrains Mono dropped (R32).

```ts
import { Space_Grotesk, Crimson_Pro } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],  // explicit — 5 weights (R32)
  variable: '--font-display',
  display: 'swap',
})
const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
})
<html className={`${spaceGrotesk.variable} ${crimsonPro.variable}`}>
```

```css
--display: var(--font-display), system-ui, sans-serif;
--serif:   var(--font-serif), Georgia, serif;
--mono:    var(--font-display), system-ui, sans-serif;  /* aliases display — mono role = Space Grotesk + uppercase + letter-spacing (R32) */
```

**Eyebrow/meta call sites (R32):** replace `fontFamily: 'var(--mono)'` with:
```tsx
fontFamily: 'var(--display)',
textTransform: 'uppercase',
letterSpacing: '0.14em',
```
No other change — size, weight, and color stay as-is.

---

## Detail C: Grid Tailwind classes

| Container | Tailwind classes / mechanism |
|-----------|------------------------------|
| Header | `flex items-center justify-between px-[var(--wrap-pad-mobile)] py-5` + `container-type: inline-size`; `@container (min-width: 760px)` in globals.css switches to `grid grid-cols-[1fr_auto_1fr]` (threshold: width at which logo + links + CTA no longer fit inline) |
| Nav links | visible via `@container (min-width: 760px)` on header wrapper; hidden (hamburger shown) below |
| Hamburger | hidden via `@container (min-width: 760px)`; shown below |
| Hero | `grid` + `container-type: inline-size` on section; `@container (min-width: 700px)` → `grid-template-columns: 1.4fr 1fr; gap: 80px` (threshold: headline column too narrow to read comfortably below ~700px) |
| Audit | `grid` + `@container (min-width: 640px)` → `1fr 1.2fr; gap: 80px` |
| Problem outer | `grid gap-12` + `@container (min-width: 640px)` → `1fr 2fr; gap: 80px` |
| Pain cards | 🟡 `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5` — drops 2→1 col wherever 220px can't be held |
| Work cards | 🟡 `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 lg:gap-7` — drops 3→2→1 wherever 300px can't be held |
| About | `grid` + `@container (min-width: 640px)` → `1fr 2fr; gap: 80px` |
| Stats | 🟡 `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-6` — drops 4→2→1 wherever 160px can't be held |
| Process intro | `grid` + `@container (min-width: 640px)` → `1fr 2fr; gap: 80px` |
| Process steps | 🟡 `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]` — drops 4→2→1 wherever 220px can't be held |
| Contact | `grid gap-5` + `@container (min-width: 640px)` → `1.6fr 1fr; gap: 32px` |

**Layout convention — Flexbox vs Grid:**
- **CSS Grid** for any layout with two spatial axes or where items must align across rows *and* columns (all containers above)
- **Flexbox** for single-direction flows where items align on one axis only: button rows, nav link bars, hamburger bar, stat label + value pairs, CTA + icon rows

---

## Detail A: Responsive CSS classes

| Class | Mobile base | 640px | 768px | 1024px |
|-------|-------------|-------|-------|--------|
| `.header-grid` | flex, space-between | — | — | grid `1fr auto 1fr` |
| `.nav-links` | display:none | — | flex gap:36px | — |
| `.nav-hamburger` | display:flex | — | display:none | — |
| `.nav-mobile` | fixed, hidden | — | display:none !important | — |
| `.nav-mobile.open` | flex col, center, primary bg, z-99 | — | — | — |
| `.hero-grid` | grid 1fr | — | — | `1.4fr 1fr` gap 80px |
| `.audit-grid` | grid 1fr | — | — | `1fr 1.2fr` gap 80px |
| `.problem-grid` | grid 1fr, gap 48px | — | — | `1fr 2fr` gap 80px |
| `.pain-cards` | grid 1fr | `1fr 1fr` | — | — |
| `.work-cards` | grid 1fr, gap 20px | `1fr 1fr` | — | `repeat(3,1fr)` gap 28px |
| `.about-grid` | grid 1fr | — | — | `1fr 2fr` gap 80px |
| `.stats-grid` | grid `1fr 1fr`, gap 24px | — | — | `repeat(4,1fr)` gap 32px |
| `.process-intro` | grid 1fr | — | — | `1fr 2fr` gap 80px |
| `.process-grid` | grid 1fr | `1fr 1fr` | — | `repeat(4,1fr)` |
| `.contact-grid` | grid 1fr, gap 20px | — | — | `1.6fr 1fr` gap 32px |
| `.section-pad` | padding-inline: 24px | — | — | 56px |
| `.section-vert` | padding-block: 80px | — | — | 120px |

---

## Detail C: Breadboard

### UI Affordances

| ID | Affordance | Place | Wires Out |
|----|------------|-------|-----------|
| U1 | Section wrappers — `px-[--wrap-pad-mobile]` + `py-[80px]` mobile; `px-[--wrap-pad-desktop]` + `py-[120px]` desktop | All sections | — |
| U2 | Card grids — `auto-fit minmax(min(100%, Xpx), 1fr)` (work: 300px · pain/process: 220px · stats: 160px) | Problem, Work, About, Process | ← N3 |
| U3 | Sidebar layouts — stacked on mobile → two-column via `@container (min-width: Xpx)` on section wrapper (hero: 700px · others: 640px) | Hero, Audit, Problem, About, Process, Contact | ← N3 |
| U4 | Hero left column — description `order-3` / CTA `order-2` on mobile; desktop order unchanged | Hero | — |
| U5 | Hamburger button — visible below `@container (min-width: 760px)`; hidden at or above | Header | → U7 (navOpen toggle) |
| U6 | Desktop nav links + CTA pill — visible `@container (min-width: 760px)`; hidden below | Header | ← N3, N10 |
| U7 | Mobile nav overlay — `fixed inset-0`, `var(--primary)` bg, all 4 links + header CTA, close button | Header | ← U5 |
| U8 | Active nav highlight — `.navlink--active` class on current-section link forces `::after` underline visible | Header | ← N4, N10 |
| U9 | Header CTA pill — `opacity-0 pointer-events-none` on mobile when `!heroPassed`; desktop always visible | Header | ← N10 |
| U10 | Pain card accordion — toggle button + `[data-open]` → `grid-template-rows: 0fr → 1fr` transition; rotating `+` indicator | Problem | ← N11, N3 |
| U11 | Process step accordion — same structure as U10; step-0 open by default | Process | ← N12, N3 |
| U12 | Contact mobile — full-width "Contact us" `<button>` + quiet "DM @kicksnare ↗ · Book a slot ↗" text links | Contact | ← N7 |
| U13 | Contact desktop — three-card layout (DM card · Contact us · Book a slot) unchanged | Contact | ← N7 |
| U14 | BottomBar — `fixed bottom-0`, 52px, `env(safe-area-inset-bottom)`, full-width "Let's talk"; hidden on desktop; hides when contact in view | BottomBar | ← N8, N13 |
| U15 | CaseStudyModal — `fixed inset-0` full-screen on mobile; max-width centered dialog on desktop | CaseStudyModal | ← N14 |
| U16 | ContactModal — `fixed inset-0` solid `var(--primary)` full-screen on mobile; centered card on desktop | ContactModal | ← N15 |
| U17 | Modal entrances — `opacity: 0 → 1` (Contact) / `scale(0.98 → 1)` (CaseStudy); no `opacity: 0` keyframe start | Modals | — |
| U18 | Tap zone padding — `min-height: 44px; display: inline-flex; align-items: center` on small interactives (text links, footer links, close buttons) | Various | — |
| U19 | Contact form inputs — `min-height: 44px`; visible `<label>` above each field; contrast-passing background | ContactModal | ← N20 |
| U20 | Global `:focus-visible` — `outline: 2px solid var(--accent); outline-offset: 2px` on all interactive elements | globals.css | ← N5 |
| U21 | Footer `overflow-x: hidden` — clips oversized wordmark bleed; does NOT go on `html`/`body` | Footer | — |

### Non-UI Affordances

| ID | Affordance | Place | Wires Out |
|----|------------|-------|-----------|
| N1 | `app/layout.tsx` — `next/font/google`: Space Grotesk (5 weights 300–700), Crimson Pro; JetBrains Mono dropped | layout.tsx | → N2 |
| N2 | `globals.css` — `--display`/`--serif`/`--mono` vars; `--fs-*` tokens in `rem`; `--mono` aliases `var(--font-display)` | globals.css | → all sections |
| N3 | `globals.css` — `@container` rules: nav collapse ≥760px; accordion toggle hidden ≥520px + body forced `1fr` ≥520px; sidebar 2-col at 640px/700px | globals.css | → U3, U5, U6, U10, U11 |
| N4 | `globals.css` — `.navlink--active::after { transform: scaleX(1) }` | globals.css | → U8 |
| N5 | `globals.css` — `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }`; `.navlink:focus-visible::after` same as hover | globals.css | → U20 |
| N6 | `lib/cases.ts` — `CaseStudy` interface + `cases: CaseStudy[]`; replaces inline arrays in PortfolioClient | lib/cases.ts | → N14 |
| N7 | `hooks/useIsMobile.ts` — `useState(false)`, updates in `useEffect` on mount + resize; threshold `< 1024` | hooks/ | → N10, N14, N15, U12 |
| N8 | `PortfolioClient` states — `scrolled` (scrollY > 40), `heroPassed` (scrollY > 560), `activeSection: string \| null` | PortfolioClient | → N10, U14 |
| N9 | `PortfolioClient` — `IntersectionObserver` array on `#audit #work #about #contact`; `rootMargin: '-70px 0px -55% 0px'`; sets `activeSection` | PortfolioClient | → N8 |
| N10 | `Header` props — receives `scrolled`, `heroPassed`, `isMobile`, `activeSection` | Header | → U8, U9, U5, U6 |
| N11 | `PainItem` — `useState(false)` drives `[data-open]` attribute on wrapper; no `useIsMobile()` | Problem | → U10 |
| N12 | `ProcessStep` — `useState(index === 0)` drives `[data-open]`; no `useIsMobile()` | Process | → U11 |
| N13 | `BottomBar` — `useIntersectionObserver` on `#contact` (50% threshold); hides BottomBar when contact in view | BottomBar | → U14 |
| N14 | `CaseStudyModal` — `useIsMobile()` gates full-screen vs centered layout | CaseStudyModal | → U15, U17 |
| N15 | `ContactModal` — `useIsMobile()` gates full-screen vs centered card; contrast-passing input styles; `outline: none` removed | ContactModal | → U16, U17, U19 |
| N16 | `WorkCard` — `<a href="#">` + `preventDefault` replaced with `<button type="button">` | Work | — |
| N17 | `PortfolioClient` — `<main>` landmark wraps page body between `<header>` and `<footer>` | PortfolioClient | — |
| N18 | `AuditFig` — `<img>` inside `<foreignObject>`: `loading="lazy"`, explicit `width`/`height`, WebP src; one `<Image priority />` on the LCP image | AuditOffer | — |
| N19 | All `fontFamily: 'var(--mono)'` call sites — replaced with `fontFamily: 'var(--display)'` + `textTransform: 'uppercase'` + `letterSpacing: '0.14em'` | Multiple | — |
| N20 | `ContactModal` input styles — `background: rgba(249,254,253,0.10)`, `color: var(--paper)`, `outline: none` removed | ContactModal | → U19 |

### Wiring Diagram

```mermaid
flowchart TB
  subgraph layout_g["PLACE: app/layout.tsx + globals.css"]
    N1["N1: next/font — Space Grotesk (5w) + Crimson Pro"]
    N2["N2: CSS tokens — fs-* rem · --mono → --display"]
    N3["N3: @container rules — nav 760px · accordion 520px · sidebars 640/700px"]
    N4["N4: .navlink--active CSS rule"]
    N5["N5: :focus-visible outline rule"]
  end

  subgraph lib_g["PLACE: lib/ + hooks/"]
    N6["N6: lib/cases.ts — CaseStudy[]"]
    N7["N7: useIsMobile — SSR-safe, threshold 1024px"]
  end

  subgraph root_g["PLACE: PortfolioClient"]
    N8["N8: scrolled · heroPassed · activeSection"]
    N9["N9: IntersectionObserver — #audit #work #about #contact"]
    N17["N17: main landmark wrapper"]
  end

  subgraph header_g["PLACE: Header"]
    N10["N10: props — scrolled · heroPassed · isMobile · activeSection"]
    U5["U5: hamburger — hidden @container ≥760px"]
    U6["U6: desktop nav + CTA — hidden @container <760px"]
    U7["U7: mobile overlay — fixed inset-0 --primary bg"]
    U8["U8: .navlink--active on current section"]
    U9["U9: CTA pill — opacity-0 mobile + !heroPassed"]
  end

  subgraph sections_g["PLACE: Sections (Hero · Audit · Problem · Work · About · Process)"]
    U1["U1: section wrappers — wrap-pad tokens · py-80→120"]
    U2["U2: card grids — auto-fit minmax(min(100%,Xpx),1fr)"]
    U3["U3: sidebar layouts — stacked → @container columns"]
    U4["U4: Hero — desc order-3 · CTA order-2 on mobile"]
    N11["N11: PainItem useState(false) → data-open"]
    U10["U10: pain accordion — toggle · 0fr→1fr"]
    N12["N12: ProcessStep useState(index===0) → data-open"]
    U11["U11: process accordion — step-0 open default"]
    N16["N16: WorkCard button not a-href"]
    N18["N18: AuditFig img — lazy · WebP · explicit w/h"]
    N19["N19: --mono call sites → --display + uppercase"]
  end

  subgraph contact_g["PLACE: Contact section"]
    U12["U12: mobile — full-width Contact us + quiet links"]
    U13["U13: desktop — three-card layout unchanged"]
  end

  subgraph modals_g["PLACE: CaseStudyModal + ContactModal"]
    N14["N14: CaseStudyModal — useIsMobile gates layout"]
    N15["N15: ContactModal — useIsMobile · inset-0 · contrast · labels"]
    U15["U15: CaseStudyModal full-screen / centered dialog"]
    U16["U16: ContactModal fixed inset-0 / centered card"]
    U17["U17: modal entrances — opacity/scale · no opacity:0 start"]
    U19["U19: form inputs — min-h 44px · visible label"]
    N20["N20: input contrast — rgba(249,254,253,0.10)"]
  end

  subgraph bottombar_g["PLACE: BottomBar"]
    N13["N13: useIntersectionObserver on #contact 50%"]
    U14["U14: fixed bottom 52px · Let's talk · safe-area · hides near contact"]
  end

  subgraph footer_g["PLACE: Footer"]
    U21["U21: footer overflow-x hidden"]
  end

  subgraph a11y_g["PLACE: a11y (globals.css + components)"]
    U18["U18: tap zones — min-h 44px on small interactives"]
    U20["U20: focus-visible ring on all interactives"]
  end

  N1 -->|font CSS vars| N2
  N9 -->|sets activeSection| N8
  N8 -->|scrolled · heroPassed · activeSection| N10
  N7 -->|isMobile| N10
  N7 -->|isMobile| N14
  N7 -->|isMobile| N15
  N7 -->|isMobile| U12
  N10 --> U9
  N10 --> U8
  N4 -.->|CSS| U8
  N3 -.->|@container 760px| U5
  N3 -.->|@container 760px| U6
  N3 -.->|@container| U3
  N3 -.->|@container 520px| U10
  N3 -.->|@container 520px| U11
  U5 -->|navOpen toggle| U7
  N11 -->|data-open| U10
  N12 -->|data-open| U11
  N6 -.->|cases data| N14
  N8 -->|heroPassed + isMobile| U14
  N13 -->|contact in view| U14
  N14 --> U15
  N14 --> U17
  N15 --> U16
  N15 --> U17
  N15 --> U19
  N20 -.->|styles| U19
  N5 -.->|CSS| U20
```

**Legend:**
- **Pink nodes (U)** = UI affordances (things users see/interact with)
- **Grey nodes (N)** = Code affordances (data, hooks, handlers)
- **Solid lines** = Wires Out (calls, triggers, writes)
- **Dashed lines** = Returns To / CSS influence (data reads, stylesheet rules)

---

## Verification

1. `pnpm run dev` → `localhost:3000`
2. DevTools → 375px, 640px, 768px, 1024px, 1440px
3. **375px: no horizontal scroll** — `document.documentElement.scrollWidth === clientWidth`
4. 375px: 1-col, 24px pad, hamburger
5. 640px: work/pain/process → 2-col
6. 768px: desktop nav, no hamburger
7. 1024px: all desktop grids, 56px pad
8. 1440px: pixel-identical to current + sticky header works
9. Case study modal → visible at opacity:1, full-screen at 375px
10. Contact modal → full-screen at 375px, visible, 44px close target
11. Network: no Google Fonts CDN requests
12. `pnpm tsc --noEmit` — no errors
