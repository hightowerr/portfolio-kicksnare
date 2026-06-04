# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

---

## Current Phase

Mobile-First Responsive — V7 Typography complete

---

## Current Goal

V6: Bottom bar (next slice in mobile-first feature).

---

## Completed

- Shaping: `docs/feature-specs/audit-fig-shaping.md`
- Slices: `docs/feature-specs/audit-fig-slices.md`
- Implementation plan: `docs/feature-specs/audit-fig-V1-plan.md`
- AuditFig V1 implemented in `components/PortfolioClient.tsx`
- Replaced broken-image X placeholder inside the SVG browser mockup with a real Unsplash tradesman photo via `<foreignObject>`
- Fixed "No hook" annotation overlap with photo — pill moved above the dashed box with downward arrow
- Photo sized to x=448, y=136, w=264, h=252 inside the SVG viewBox
- AuditFig container switched from fixed `height: 520` to `aspectRatio: '800 / 520'` so it scales naturally with the column width
- OQ-1 resolved in practice: AuditFig is an intentional illustration, not a placeholder — exception to Brand Non-Negotiable #5 is accepted
- Shaping: `docs/feature-specs/hero-word-rotation/hero-word-rotation-shaping.md`
- Slices: `docs/feature-specs/hero-word-rotation/hero-word-rotation-slices.md`
- Slice 1 plan: `docs/feature-specs/hero-word-rotation/hero-word-rotation-slice-1-plan.md`
- Slice 2 plan: `docs/feature-specs/hero-word-rotation/hero-word-rotation-slice-2-plan.md`
- Hero word rotation implemented — `components/RotatingWord.tsx` with clip-mask yPercent slide, dimension lock, GSAP timeline, and screen-reader accessibility
- Let's Talk rework V1 complete — `ContactModal` added to `PortfolioClient.tsx`; Contact right column replaced with "Contact us" (opens modal) + "Book a slot" (external link); Formspree POST handler (`meedaznk`); hover: orange wash `rgba(255,94,0,0.10)` + `translateY(-3px)` via `onMouseEnter`/`onMouseLeave` on all three cards
- Mobile-First V1 Foundation complete — `lib/cases.ts` (CaseStudy interface + typed arrays), `hooks/useIsMobile.ts` (SSR-safe hook), `next/font/google` for Space Grotesk + Crimson Pro in `app/layout.tsx`, CSS variables wired in `globals.css`, inline data arrays removed from `PortfolioClient.tsx` and `CaseStudyModal.tsx`
- Mobile-First V2 Intrinsic Grids complete — all 10 grid containers in `PortfolioClient.tsx` converted from hardcoded inline `gridTemplateColumns` to intrinsic CSS Grid layouts. Card grids (Work, Pain, Stats, Process steps) use Tailwind `auto-fit`/`minmax` arbitrary classes. Sidebar layouts (Hero, Audit, Problem, About, Process intro, Contact) use `@container` queries in `globals.css`. Section padding switched from hardcoded `56px` to `.wrap { padding-inline: var(--wrap-pad-mobile) }` with `@media (min-width: 1024px)` override to `var(--wrap-pad-desktop)`. Footer gets `overflow-x: hidden` to clip oversized wordmark.
- Mobile-First V5 Modals complete — both CaseStudyModal and ContactModal made responsive. Mobile: full-screen (fixed inset-0) with no backdrop/rounded corners. Desktop: centered dialog/card preserved. Entrance transitions: scale(0.98->1) on CaseStudyModal, opacity(0.85->1) on ContactModal — no hidden-start opacity:0. Removed @keyframes cs-fade/cs-rise. ContactModal: input bg raised to rgba(249,254,253,0.10), minHeight 44px on inputs, visually-hidden labels with htmlFor+id, 44px fixed close button on mobile, backdrop click disabled on mobile. `outline: none` removed from inputStyle. `isMobile` prop threaded through all CaseStudyModal sub-components (CSHeader, CSProblem, CSApproach, CSSolution, CSResult, CSCta) for responsive padding and grid layout.
- Mobile-First V3 Navigation complete — hamburger menu, mobile overlay, active section highlighting, and hero-scroll-gated CTA pill. Header inner div gets `.header-wrap` with `container-type: inline-size`. Below 760px container width: flex layout, hamburger visible, desktop nav + CTA hidden. Above 760px: grid `1fr auto 1fr`, desktop nav visible, hamburger hidden. `heroPassed` state (scrollY > 560) controls CTA pill opacity on mobile. `activeSection` state driven by IntersectionObserver (`rootMargin: '-70px 0px -55% 0px'`). `navOpen` locks body scroll. Mobile overlay: fixed inset-0, `--primary` bg, all 4 links + CTA, close button. All new states SSR-safe (false/null). No `@media` queries for nav collapse — pure `@container`.
- Mobile-First V7 Typography complete — Five streams implemented: (1) Font family cleanup: removed JetBrains Mono `@font-face` blocks from `globals.css`, replaced all 15 `var(--mono)` call sites in `PortfolioClient.tsx` and all 14+ in `CaseStudyModal.tsx` with `var(--display)`, normalized `letterSpacing` to `0.14em` and ensured `textTransform: 'uppercase'` on all eyebrow/chrome sites, updated `.eyebrow` class font-family to `var(--display)`, replaced 3 SVG `fontFamily="'JetBrains Mono'"` attributes with `'Space Grotesk'`. (2) rem token migration: converted all 11 `--fs-*` CSS tokens from `px` to `rem`, added `--fs-ui: 0.875rem`, updated `.navlink` font-size to `0.875rem`, converted all 8 inline `clamp()` expressions in `PortfolioClient.tsx` and all 5 in `CaseStudyModal.tsx` from px min/max to rem. (3) Line-height audit: fixed 1 violation in `PortfolioClient.tsx` (error message 1.4->1.5) and 5 in `CaseStudyModal.tsx` (tagline 1.3->1.5, problem lede 1.3->1.5, pain text 1.45->1.5, deliverable text 1.45->1.5, next case tagline 1.4->1.5). (4) Body copy 16px minimum: fixed 6 sites in `PortfolioClient.tsx` (hero link, pain desc, work blurb, process step desc, form input, DM card desc all from 15->16) and 4 in `CaseStudyModal.tsx` (meta value 15->16, approach step desc 14.5->16, deliverable text 15.5->16, email link 15->16). (5) StripedFig: replaced `h?: number` prop with `aspect?: string` defaulting to `'4 / 3'`, using `aspectRatio` instead of fixed `height`. `pnpm tsc --noEmit` passes clean.

---

## In Progress

Nothing active (V7 Typography complete, V6 next).

---

## Next Up

- Mobile-First V6: Bottom bar
- Review full section balance at various viewport widths
- Consider whether `ui-context.md` Brand Non-Negotiable #5 needs updating to document the illustration exception

---

## Open Questions

None active.

---

## Architecture Decisions

**AuditFig container sizing:** Uses `aspectRatio: '800 / 520'` + `width: 100%` rather than a fixed pixel height, so the card scales proportionally with the grid column. SVG uses `preserveAspectRatio="xMidYMid meet"` — no cropping.

**Unsplash photo in SVG:** Embedded via `<foreignObject>` + `<img>` rather than SVG `<image href>`, which is silently blocked by browsers for cross-origin URLs in inline SVGs.

---

## Session Notes

2026-05-18 — Shaping, spiking, breadboarding, and slicing completed for AuditFig. Implementation blocked on OQ-1.
2026-05-18 — AuditFig V1 implemented and iterated. Unsplash tradesman photo embedded in SVG mockup. Annotation overlap fixed. Container sizing corrected to aspect-ratio based.
2026-05-19 — Hero word rotation V1 implemented. RotatingWord component created. Cycling: digital products → landing pages → web apps → growth tools. GSAP power3.inOut, cleanup on unmount, aria-hidden + visually-hidden a11y span.
2026-05-19 — Updated AuditFig description copy in `components/PortfolioClient.tsx`: replaced "personalized Loom" framing with clearer outcome-first language.
2026-05-19 — Updated AuditFig deliverable bullets in `components/PortfolioClient.tsx`: reworded all four items for clarity and changed delivery window from 24 to 48 hours.
2026-05-19 — Revised first deliverable bullet: "A video walkthrough recorded just for your site—not a generic checklist."
2026-05-19 — Rewrote (02) Problem section in `components/PortfolioClient.tsx`: updated eyebrow label, heading, intro paragraph, and all four pain-point titles and descriptions with plain-language, outcome-first copy.
2026-05-19 — Second rewrite of (02) Problem section: heading changed to "Most small business websites convert less than 1 in 100 visitors." Intro reframed around the 99-out-of-100 stat. All four pain card titles and body copy replaced with sharper, two-beat narrative per card.
2026-05-19 — Removed "Next slot · Jun · 2 open" entry from the About section info card in `components/PortfolioClient.tsx`.
2026-05-19 — Rewrote About section body copy in `components/PortfolioClient.tsx`: split single paragraph into two, updated guarantee quote to "If we miss the brief, we fix it free. If you still don't want it, you don't pay."
2026-05-19 — Updated About section heading to "Most agencies take six months. We're done in six weeks."
2026-05-19 — Hidden the Services grid in the About section (`components/PortfolioClient.tsx`); markup preserved in a comment.
2026-05-19 — Rewrote (05) Process section: heading changed to "Four steps. You know the price, the timeline, and the target before we start." Intro updated. Step titles renamed Look / Agree / Build / Measure with new body copy per step.
2026-05-20 — Let's Talk rework V1 complete. `ContactModal` wired to Formspree (`meedaznk`). React 19 async handler bug fixed (sync `.then/.catch` pattern). Hover sourced from HTML prototype: orange wash + `translateY(-3px)` via inline `onMouseEnter`/`onMouseLeave`.
2026-06-04 — Mobile-First V1 Foundation implemented. Created `lib/cases.ts` with `CaseStudy` + `HeroProject` interfaces and exported typed arrays. Created `hooks/useIsMobile.ts` (SSR-safe, threshold < 1024). Added `next/font/google` imports for Space Grotesk (5 weights) + Crimson Pro in `app/layout.tsx`. Updated `--display`, `--serif`, `--mono` CSS vars and `html` font-family rule in `globals.css`. Removed inline data arrays from `PortfolioClient.tsx` and `CaseStudyModal.tsx`, replaced with imports from `lib/cases.ts`. All `@font-face` blocks preserved. PAIRS mechanism untouched. `pnpm tsc --noEmit` and `pnpm next build` pass clean.
2026-06-04 — Mobile-First V2 Intrinsic Grids implemented. Converted all 10 grid containers: 6 sidebar layouts use `@container` queries (hero-grid at 700px, audit/problem/about/process-intro/contact-grid at 640px), 4 card grids use Tailwind auto-fit/minmax. Removed all hardcoded `padding: '0 56px'` and `padding: 'Xpx 56px'` inline styles. Added `.wrap { padding-inline }` responsive rule. Footer gets `overflow-x: hidden`. Header grid-template-columns unchanged (V3 scope). Pre-existing TS errors in CaseStudyModal (isMobile prop) unrelated to V2 changes.
2026-06-04 — Mobile-First V5 Modals implemented. CaseStudyModal: imported `useIsMobile`, added `entered` state for entrance transition, gated outer backdrop (solid paper bg on mobile, blur+overlay on desktop), gated inner dialog (fixed inset-0 on mobile, absolute with 24px inset on desktop), removed @keyframes cs-fade/cs-rise, added scale(0.98->1) CSS transition, close button 44px on mobile, tagline hidden on mobile top bar, `isMobile` prop threaded to all 6 sub-components (CSHeader, CSProblem, CSApproach, CSSolution, CSResult, CSCta) for responsive padding (48px 20px vs 88px 56px) and grid columns (1fr/2-col vs multi-col). ContactModal: imported `useIsMobile`, added `entered` state, gated to full-screen solid `var(--primary)` on mobile vs centered card on desktop, close button fixed 44px on mobile, backdrop click disabled on mobile, `inputStyle` background raised from 0.06 to 0.10, minHeight 44px added, `outline: none` removed, `srOnly` style object added, visually-hidden `<label>` elements with `htmlFor`/`id` for all three form fields. `pnpm tsc --noEmit` passes clean.
2026-06-04 — Mobile-First V3 Navigation implemented. Added `heroPassed` + `activeSection` states to PortfolioClient, extended scroll handler, added IntersectionObserver effect. Called `useIsMobile()` (already imported). Updated Header props interface with `heroPassed`, `isMobile`, `activeSection`. Added `navOpen` state + body scroll lock effect. Replaced hardcoded nav links with `navLinks.map()` + `.navlink--active` class. Moved header inner div layout from inline grid to CSS `.header-wrap` with `container-type: inline-size`. Added hamburger button (`.nav-hamburger`), mobile overlay (`.nav-overlay`), desktop nav (`.nav-desktop`), CTA wrap (`.nav-cta-wrap`). Removed conflicting inline `display` styles from nav, CTA wrap, and hamburger. Added @container rules at 760px in globals.css. CTA pill conditional opacity/pointer-events on `isMobile && !heroPassed`. `pnpm tsc --noEmit` passes clean.
2026-06-04 — Mobile-First V7 Typography implemented. Removed JetBrains Mono @font-face blocks. Replaced all var(--mono) call sites (15 in PortfolioClient, 14+ in CaseStudyModal) with var(--display), normalized letterSpacing to 0.14em. Updated .eyebrow class. Replaced 3 SVG JetBrains Mono fontFamily refs with Space Grotesk. Converted 11 --fs-* tokens to rem, added --fs-ui. Converted .navlink font-size to rem. Converted 13 clamp() expressions to rem. Fixed 6 lineHeight violations (all raised to 1.5). Fixed 10 fontSize violations (body copy raised to 16). StripedFig h prop replaced with aspect prop. `pnpm tsc --noEmit` passes clean.
2026-06-04 — Mobile-First V6 Bottom Bar implemented. Created `hooks/useIntersectionObserver.ts` (generic, SSR-safe, RefObject-based). Created `components/BottomBar.tsx` (fixed bottom bar, accent bg, "Let's talk" CTA linking to #contact, 52px height, env(safe-area-inset-bottom) padding, translateY entrance transition 350ms, z-index 90, lg:hidden CSS safety net). Wired into PortfolioClient after Footer, before CaseStudyModal. Visibility: isMobile && heroPassed && !contactVisible. Contact section detected via useIntersectionObserver at threshold 0.5. Header CTA pill already hidden on mobile via existing @container(min-width:760px) rules from V3 — no change needed. `pnpm tsc --noEmit` passes clean.

