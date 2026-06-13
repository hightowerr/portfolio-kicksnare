# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

---

## Current Phase

Evoltage Case Study — all 5 slices (V1–V5) complete

---

## Current Goal

None active. Evoltage case study feature implemented.

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
- Mobile-First V9 Keyboard & ARIA complete — global `:focus-visible` rule, `.navlink`/`.link-uline` focus underlines, `.sr-only` utility, `<main>` landmark, `aria-label="Main"` on nav, `role="dialog"` + `aria-modal` on ContactModal, visually-hidden form labels, AuditFig `<img>` WebP + lazy + explicit dimensions, `aria-hidden` on decorative SVGs, `outline: none` removed from ContactModal inputs
- Mobile-First V4 Hero & Accordions complete — Hero Reveal wrappers reordered via CSS `order` (headline 1, CTA 2, description 3). PainItem accordion component: `data-open` + `grid-template-rows: 0fr→1fr` transition + rotating `+` toggle + `aria-expanded`. ProcessStep accordion: same pattern, step-0 open by default. `@container (min-width: 520px)` hides toggles and forces bodies open. Contact section: `useIsMobile()` gates mobile layout (full-width button + quiet links) vs desktop three-card (R14 preserved). No `useIsMobile()` in accordions.
- Mobile-First V8 Touch & Forms complete — WorkCard `<a href="#">` → `<button type="button">`. Tap zone padding (minHeight 44px) on 7 small interactive elements. CaseStudyModal nav buttons responsive (44px mobile, 34px desktop). `.navlink` gets `min-height: 44px`. All adjacent tap target pairs verified ≥8px gap.
- Post-implementation fixes — BottomBar link `tabIndex={visible ? 0 : -1}` for keyboard safety; `.navlink` font-family `'Geist'` → `var(--display)`; Northbeam "established" → "Established" casing fix
- Mobile-First V7 Typography complete — Five streams implemented: (1) Font family cleanup: removed JetBrains Mono `@font-face` blocks from `globals.css`, replaced all 15 `var(--mono)` call sites in `PortfolioClient.tsx` and all 14+ in `CaseStudyModal.tsx` with `var(--display)`, normalized `letterSpacing` to `0.14em` and ensured `textTransform: 'uppercase'` on all eyebrow/chrome sites, updated `.eyebrow` class font-family to `var(--display)`, replaced 3 SVG `fontFamily="'JetBrains Mono'"` attributes with `'Space Grotesk'`. (2) rem token migration: converted all 11 `--fs-*` CSS tokens from `px` to `rem`, added `--fs-ui: 0.875rem`, updated `.navlink` font-size to `0.875rem`, converted all 8 inline `clamp()` expressions in `PortfolioClient.tsx` and all 5 in `CaseStudyModal.tsx` from px min/max to rem. (3) Line-height audit: fixed 1 violation in `PortfolioClient.tsx` (error message 1.4->1.5) and 5 in `CaseStudyModal.tsx` (tagline 1.3->1.5, problem lede 1.3->1.5, pain text 1.45->1.5, deliverable text 1.45->1.5, next case tagline 1.4->1.5). (4) Body copy 16px minimum: fixed 6 sites in `PortfolioClient.tsx` (hero link, pain desc, work blurb, process step desc, form input, DM card desc all from 15->16) and 4 in `CaseStudyModal.tsx` (meta value 15->16, approach step desc 14.5->16, deliverable text 15.5->16, email link 15->16). (5) StripedFig: replaced `h?: number` prop with `aspect?: string` defaulting to `'4 / 3'`, using `aspectRatio` instead of fixed `height`. `pnpm tsc --noEmit` passes clean.

---

## In Progress

Nothing active.

## Recently Completed — WorkCard Image CLS Fix

- Fixed WorkCard CLS issue: when `c.image` was present, `aspectRatio` was conditionally set to `undefined` and `<img>` had no `height`/`objectFit`, causing variable card heights and layout shift during image load
- `aspectRatio: '4 / 5'` now always applied to the card container regardless of image presence
- `<img>` now has `height: '100%'` + `objectFit: 'cover'` to fill the fixed-aspect container
- Grid layout stays consistent whether cards have images or striped placeholders

## Recently Completed — Issue Numbering Fix

- Renumbered Open items in `docs/context/current-issues.md`: #12 → #15 (PostHog), #13 → #16 (Clarity) to avoid collision with Solved #12 and #13
- Reordered Solved list so #13 (accordion toggles) comes before #14 (WorkCard CLS) — was out of sequence

## Recently Completed — Evoltage Hero Screenshot

- Replaced SVG wireframe in `EvoltageBeforeFig` (S1) with real desktop screenshot (`evoltage-hero-old.png`) inside browser mockup frame
- Screenshot copied to `public/images/evoltage-hero-old.png` for static serving
- SVG `<image>` element with `preserveAspectRatio="xMidYMin slice"` + `<clipPath>` to contain within browser content area
- Added browser dots (red/yellow/green) to mockup chrome
- Repositioned all 3 annotations to match real screenshot content: "Phone buried" over top-bar phone number, "No hook" over "Evoltage UK" headline, "No clear action" over "Read more..." button
- Updated current-issues.md issue #4 (partially resolved)
- Replaced S2 before/after SVG wireframes (`EvoltageBeforeMobileFig`, `EvoltageAfterMobileFig`) with real mobile screenshots
- `eVoltage image-home.png` → `public/images/evoltage-before-mobile.png` (before), `eVoltage new-home.png` → `public/images/evoltage-after-mobile.png` (after)
- SVG wireframes replaced with `<img>` elements (167×355px, lazy-loaded, descriptive alt text)
- Before/After labels preserved as positioned overlays
- current-issues.md issue #4 fully resolved — all case study figures now use real screenshots

## Recently Completed — Evoltage Case Study

- V1: Extracted `components/Header.tsx` and `components/Footer.tsx` from `PortfolioClient.tsx`. Created `/case-studies/evoltage` route with `page.tsx` (Server Component + metadata) and `CaseStudyClient.tsx` (`'use client'`). Built S1 (The Problem): pathos headline, JJ paragraph, annotated before-SVG (`EvoltageBeforeFig`), 3 inline stats. Header accepts `navLinks?`/`ctaHref?`/`ctaLabel?` props. Footer accepts `backHref?` prop. Added `.cs-section-grid` CSS rule.
- V2: Built S2 (What We Built): before/after mobile viewport SVGs (`EvoltageBeforeMobileFig`, `EvoltageAfterMobileFig`) with side-by-side layout on desktop, 5-item check bullet list, methodology sentence. Built S3 (The Numbers): 4 large stat blocks with accent orange values, "What's next" text block. All inline in `CaseStudyClient.tsx`.
- V3: Built S4 (Your Turn): dark section with lost-job framing, spec-work line, 3-tier CTA group (primary paper pill, outlined secondary, text link tertiary), guarantee in serif italic. Added byline strip ("Built by OO →" with `/about` link). Added `.cta-cs-primary` hover rule to `globals.css`.
- V4: Created `lib/fonts.ts` — exports `FontSet`, `PAIRS`, `defaultFonts`. Removed local `FontSet`/`PAIRS` from `PortfolioClient.tsx` and `CaseStudyClient.tsx`, replaced with imports. Created `/about` page: `app/about/page.tsx` (Server Component + metadata) and `components/AboutClient.tsx` (`'use client'`). Bio hero section with `StripedFig` photo placeholder + headline + credential + origin copy. Dark contact section with 3 card affordances (booking/email/DM) + mobile gate. Added `.about-bio-grid` CSS rule. Updated `app/sitemap.ts` with `/case-studies/evoltage` and `/about`. Added `url` to Person schema in `app/layout.tsx`.
- V5: Added `href?: string` to `CaseStudy` interface in `lib/cases.ts`. Added evoltage entry to `cases[]` (id `'evoltage'`, tone `#DDE8DF`, href `/case-studies/evoltage`) and `heroProjects[]` (after mara, before Lattice OS). Updated `WorkCard` to conditionally render `<Link>` when `c.href` exists, `<button>` otherwise. Updated hero project rows with three-branch conditional: `<Link>` for cases with href, `<a onClick>` for modal cases, `<a href="#work">` for placeholders. Created `app/case-studies/evoltage/opengraph-image.tsx` (edge runtime, 1200x630, dark background).

---

## SEO Fixes

- robots.txt added via `app/robots.ts` (Next.js Metadata Route) — allows all crawlers, includes sitemap URL. Addresses SEO audit finding #1 (Critical: no robots.txt).
- sitemap.xml added via `app/sitemap.ts` (Next.js Metadata Route) — single entry for homepage, monthly changeFrequency. Addresses SEO audit finding #2 (Critical: no sitemap.xml).
- Canonical URL added via `metadataBase` + `alternates.canonical` in `app/layout.tsx`. Addresses SEO audit finding #3 (Critical: no canonical URL).
- OG tags + Twitter Card meta added to `app/layout.tsx` metadata. Dynamic OG image via `app/opengraph-image.tsx` (1200x630, brand colors, edge runtime). Addresses SEO audit finding #9 (High: no OG/Twitter Card meta).
- H1 animation duplicate text fixed in `components/RotatingWord.tsx`. SSR renders single fallback word ("digital products"); animated stack injected client-side only. sr-only span reduced to single word. Addresses SEO audit finding #4 (Critical: garbled H1).
- Privacy policy page added at `app/privacy/page.tsx`. UK GDPR compliant: data collected, processors (Formspree, Vercel), retention, rights. Linked from footer. Added to sitemap. Addresses SEO audit finding #5 (Critical: missing privacy policy).
- JSON-LD structured data added to `app/layout.tsx`. `WebSite` + `ProfessionalService` schemas with service catalog, contact info, social links, and area served. `Person` schema included as `founder` on `ProfessionalService`. Addresses SEO audit findings #7 and #8 (High: zero structured data, no named founder).
- Founder named in About section (`components/PortfolioClient.tsx`): "Founded by OO" with credentials (7 years retail product management). `Person` schema added to JSON-LD with `name`, `jobTitle`, `knowsAbout`, and `worksFor` link. Addresses SEO audit finding #8 (High: no named individual/founder).
- Hamburger menu touch target raised from 38x32px to 48x48px minimum (`components/PortfolioClient.tsx`): added `minWidth: 48`, `minHeight: 48`, `alignItems: 'center'`, `justifyContent: 'center'` to hamburger button. Addresses SEO audit finding #11 (High: touch target below 48px minimum).
- Contact CTA hierarchy reordered (`components/PortfolioClient.tsx`): booking link promoted to primary CTA (hero card on desktop, full-width button on mobile), Contact us stays second, DM @kicksnare demoted to third. Addresses SEO audit finding #12 (High: DM on X as primary contact is high friction).
- `llms.txt` added at `public/llms.txt` — structured AI-readable site summary with about, services, case studies, contact, and guarantee sections. Served at `/llms.txt`. Addresses SEO audit finding #13 (Medium: no llms.txt file).
- Accordion toggle touch targets raised from 20x20px to 48x48px minimum (`components/PortfolioClient.tsx`): added `minWidth: 48`, `minHeight: 48` to both `pain-item__toggle` (4 buttons) and `process-step__toggle` (4 buttons). Addresses SEO audit finding #17 (Medium: carousel/slider dots at 20x20px, 8 interactive elements).
- Favicon and Apple Touch Icon added via Next.js icon convention. `app/icon.tsx` (32x32 PNG) and `app/apple-icon.tsx` (180x180 PNG) — Soundwave mark (accent orange + paper white bars) on primary green background. Addresses SEO audit finding #18 (Medium: no favicon or app icons).
- AuditFig image alt text fixed (`components/PortfolioClient.tsx`): `alt=""` replaced with descriptive `alt="Tradesman's website shown in a browser mockup before audit"`. Addresses SEO audit finding #19 (Medium: empty image alt text).

---

## Next Up

- Replace StripedFig photo placeholder with real OO headshot (About page) — blocked on content; see current-issues.md #4
- ~~Replace S2 before/after mobile wireframes with real mobile screenshots of evoltageuk.co.uk~~ ✅ Done
- ~~Extract `Reveal` component to `components/Reveal.tsx` shared module (currently duplicated in PortfolioClient, CaseStudyClient, AboutClient)~~ ✅ Done
- Add real JJ testimonial quote to evoltage case study when available
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
2026-06-04 — Mobile-First V9 Keyboard & ARIA implemented. Added global `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }` to `globals.css`. Added `.navlink:focus-visible::after` and `.link-uline:focus-visible::after` rules. Added `.sr-only` utility class. Wrapped Hero through Contact in `<main>` landmark. Added `aria-label="Main"` to `<nav>`. Added `role="dialog"`, `aria-modal="true"`, `aria-label="Contact form"` to ContactModal. Added visually-hidden `<label htmlFor>` + `id` to all 3 contact form fields. Updated AuditFig `<img>`: `fm=webp`, `loading="lazy"`, explicit `width`/`height`. Added `aria-hidden="true"` to decorative SVGs (StripedFig, WorkCard). Removed `outline: 'none'` from ContactModal inputStyle.
2026-06-04 — Mobile-First V4 Hero & Accordions implemented. Hero reorder: CSS `order` on Reveal wrappers (headline order-1, CTA order-2, description order-3). Extracted `PainItem` component with accordion structure: `data-open` attribute, `grid-template-rows: 0fr → 1fr` transition, rotating `+` toggle, `aria-expanded`. Extracted `ProcessStep` component with same pattern, `useState(index === 0)` so step "Look" starts open. Added `@container (min-width: 520px)` rules in `globals.css` to hide toggles and force bodies open on wide containers. Contact section: `useIsMobile()` gates mobile layout (full-width "Contact us" button + quiet text links) vs desktop three-card layout (R14 preserved). No `useIsMobile()` in accordions — pure CSS `@container` mode switch.
2026-06-04 — Mobile-First V8 Touch & Forms implemented. WorkCard `<a href="#">` + `preventDefault` replaced with `<button type="button">` + reset styles. Tap zone padding (`minHeight: 44`, `display: 'inline-flex'`, `alignItems: 'center'`) added to: "See selected work" link, "Full case studies on request" link, footer "X / Twitter" link, footer "Back to top" link, contact mobile "DM @kicksnare" link, contact mobile "Book a slot" link, ContactModal submit button. CaseStudyModal nav buttons made responsive (44px on mobile, 34px on desktop). `.navlink` rule in `globals.css` gets `min-height: 44px`. Adjacent spacing audit: all pairs pass 8px minimum.
2026-06-04 — Post-implementation fixes: BottomBar `<a>` gets `tabIndex={visible ? 0 : -1}` so hidden link is unfocusable via keyboard. `.navlink` font-family changed from hardcoded `'Geist'` to `var(--display)`. Northbeam case study casing fix: "established" → "Established" in `lib/cases.ts`.
2026-06-05 — SEO audit performed (score 34/100). Added `app/robots.ts` via Next.js Metadata Route API — allows all user agents, points to sitemap URL. Fixes critical finding #1 from audit. Added `app/sitemap.ts` — single homepage entry with monthly changeFrequency. Fixes critical finding #2. Added `metadataBase` + `alternates.canonical` to layout.tsx metadata. Fixes critical finding #3. Added OpenGraph + Twitter Card meta to layout.tsx and `app/opengraph-image.tsx` for dynamic OG image generation. Fixes high finding #9. Fixed H1 duplicate text in RotatingWord — SSR fallback is single word, animated stack client-only. Fixes critical finding #4. Added `/privacy` page (UK GDPR compliant) with footer link and sitemap entry. Fixes critical finding #5.
2026-06-06 — Added JSON-LD structured data to `app/layout.tsx`: `WebSite` schema + `ProfessionalService` schema with `hasOfferCatalog` (two services), `knowsAbout`, `areaServed`, `sameAs`, and contact info. Fixes high finding #7.
2026-06-06 — Named founder OO in About section body copy with credentials (7 years retail product management). Added `Person` schema as `founder` property on `ProfessionalService` JSON-LD with `name`, `jobTitle`, `knowsAbout` (Product Management, Retail, Web Design, Growth Marketing), `worksFor`. Fixes high finding #8.
2026-06-06 — Hamburger menu touch target enlarged from 38x32px to 48x48px minimum via `minWidth`/`minHeight` + flex centering on the button in `components/PortfolioClient.tsx`. Fixes high finding #11.
2026-06-06 — Contact CTA hierarchy reordered in `components/PortfolioClient.tsx`. Desktop: booking link promoted to hero card (primary), Contact us second, DM third. Mobile: booking link is full-width primary button, Contact us and DM are quiet text links. Fixes high finding #12.
2026-06-06 — Added `public/llms.txt` with structured AI-readable summary: about, services, case studies, contact info, guarantee. Served statically at `/llms.txt`. Fixes medium finding #13.
2026-06-06 — Accordion toggle buttons (pain items + process steps) enlarged from 20x20px to 48x48px minimum via `minWidth`/`minHeight` in `components/PortfolioClient.tsx`. 8 buttons total (4 pain + 4 process). Fixes medium finding #17.
2026-06-06 — Added `app/icon.tsx` (32x32 PNG favicon) and `app/apple-icon.tsx` (180x180 Apple Touch Icon). Both render the Soundwave mark (accent + paper bars on primary green bg) via Next.js `ImageResponse`. Fixes medium finding #18.
2026-06-06 — AuditFig Unsplash image `alt=""` replaced with descriptive alt text in `components/PortfolioClient.tsx`. Fixes medium finding #19.
2026-06-12 — Evoltage Case Study feature implemented (5 slices). V1: Extracted Header.tsx and Footer.tsx from PortfolioClient, created /case-studies/evoltage route with S1. V2: Added S2 (before/after SVGs + bullets + methodology) and S3 (4 stat blocks + what's next). V3: Added S4 (dark CTA section) and byline strip. V4: Created /about page with OO bio, extracted FontSet/PAIRS to lib/fonts.ts, updated sitemap + JSON-LD. V5: Added evoltage to cases[] + heroProjects[], WorkCard conditional Link vs button, hero project row three-branch conditional, OG image. `pnpm tsc --noEmit` + `pnpm next build` clean with 5 routes.
2026-06-12 — Replaced S1 `EvoltageBeforeFig` wireframe SVG with real desktop screenshot (`evoltage-hero-old.png`). Image embedded via SVG `<image>` + `<clipPath>` inside browser mockup frame with traffic-light dots. All 3 annotations repositioned to match real content: "Phone buried" (top bar), "No hook" (headline), "Weak CTA" at fold line. `pnpm tsc --noEmit` clean.
2026-06-12 — Replaced S2 before/after SVG wireframes with real mobile screenshots in iPhone device mockups. Upgraded to 1290×2796px iPhone 14 Pro Max captures. `PhoneMockup` component: dark bezel, Dynamic Island, home indicator, drop shadow. `pnpm tsc --noEmit` clean.
2026-06-12 — Removed all 5-Second Test references (subjective internal metric). S1 inline stats now 2-col (SEO score + Phone number). S3 stats now 3 items. Updated page.tsx description, OG alt, lib/cases.ts blurb/lede/steps/stats.
2026-06-12 — S4 copy rewrite: replaced explanatory paragraph with rhetorical question — "A single emergency call-out is worth ~£200. How many lost calls would you accept before rebuilding?"
