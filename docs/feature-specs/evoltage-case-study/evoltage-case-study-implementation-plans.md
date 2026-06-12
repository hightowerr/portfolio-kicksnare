# Evoltage Case Study — Implementation Plans

Five slices, built sequentially. Each plan includes architecture decisions, component design, build sequence, and a self-testing checklist.

---

## V1: Shared Scaffold + Section 1

### Goal

Extract Header and Footer into shared components, create the `/case-studies/evoltage` route, and build Section 1 (The Problem).

### Architecture Decisions

**Header extraction:** `Header` uses `useState` (navOpen) and `useEffect` (body scroll lock), so `components/Header.tsx` must be `'use client'`. It gains a `navLinks?: { href: string; label: string }[]` prop (defaults to homepage anchors) and `ctaHref?: string` (defaults to `'#audit'`). This lets the case study page pass `[{ href: '/', label: '← Home' }]` without encoding page-specific logic into Header.

**Footer extraction:** `Footer` has no hooks but imports `Soundwave` from `icons.tsx` which has `'use client'`. Mark `Footer.tsx` as `'use client'` too — simplest fix, no Server Component benefit lost since Footer has no async data.

**FontSet duplication:** `type FontSet = { display: string; serif: string }` is re-declared locally in each new file for V1. Extracting to `lib/fonts.ts` is deferred to V4 when the about page needs it.

**PAIRS duplication:** The `PAIRS` constant is duplicated in `CaseStudyClient.tsx` for V1. Same rationale — moving it is a V4 concern.

**Reveal duplication:** The `Reveal` component (lines 20-41 of PortfolioClient) is copied into `S1TheProblem.tsx`. Extracting to `components/Reveal.tsx` is deferred until V2+ when multiple sections share it.

**Case study page architecture:** `page.tsx` is a Server Component (metadata export). It renders `CaseStudyClient.tsx` (`'use client'`), which manages scroll state, fonts, and isMobile — mirroring the `page.tsx` → `PortfolioClient.tsx` pattern exactly.

**No BottomBar on case study page.** It depends on `#contact` existing in the DOM.

### Files to Create

| File | Directive | Responsibility |
|------|-----------|---------------|
| `components/Header.tsx` | `'use client'` | Sticky header with frosted glass, desktop nav, hamburger overlay, CTA pill. Props: `scrolled`, `fonts`, `heroPassed`, `isMobile`, `activeSection`, `navLinks?`, `ctaHref?` |
| `components/Footer.tsx` | `'use client'` | Full-width primary-green footer with Kicksnare wordmark, social links, privacy, back-to-top. Props: `fonts` |
| `app/case-studies/evoltage/page.tsx` | Server Component | Metadata export, renders `<CaseStudyClient />` |
| `app/case-studies/evoltage/CaseStudyClient.tsx` | `'use client'` | Scroll state, fonts, isMobile. Renders Header (with `navLinks=[{href:'/', label:'← Home'}]`), `<main>` with S1, Footer |
| `app/case-studies/evoltage/S1TheProblem.tsx` | `'use client'` | Section 1 content. Contains inline `Reveal`, `EvoltageBeforeFig`, `InlineStat` |

### Files to Modify

| File | Change |
|------|--------|
| `components/PortfolioClient.tsx` | Delete inline Header (lines 188-379) and Footer (lines 1300-1319). Add `import Header from './Header'` and `import Footer from './Footer'`. All call sites unchanged. |
| `app/globals.css` | Add `.cs-section-grid` rule: default `1fr`, `@container (min-width: 760px)` switches to `1fr 2fr; gap: 80px` |

### S1: The Problem — Component Design

**Layout:** Standard `1fr 2fr` sidebar grid on desktop, single column mobile. Paper background, 110px vertical padding.

**Content (top to bottom):**

1. **Eyebrow:** `(01) The problem` — `.eyebrow` class, `var(--muted)`, `marginBottom: 40`
2. **Headline:** "Nobody *in the dark* wants to read more." — "in the dark" in `var(--serif)` italic. Geist 600, `clamp(2.25rem, 4vw, 4rem)`, letterSpacing `-0.03em`, lineHeight `0.95`
3. **JJ paragraph:** "JJ runs Evoltage UK, a 24-hour electrician in Loughborough. When someone loses power at 9pm, they reach for their phone and search for an electrician. They land on JJ's site. The main call to action read: 'Read more...' Nobody in the dark wants to read more. They want a phone number." — 18px, lineHeight 1.55, `var(--muted)`, maxWidth 560
4. **Before screenshot SVG (`EvoltageBeforeFig`):** Adapted from `AuditFig` pattern. `viewBox="0 0 800 520"`, browser chrome, content blocks, three dashed-orange annotation boxes with dark pill callouts: "No hook", "No clear action", "Phone buried". SVG text uses `fontFamily="'Space Grotesk'"` (not CSS vars). Container: `borderRadius: 28`, `background: var(--paper-2)`, `aspectRatio: '800 / 520'`
5. **Three inline stats:** `repeat(3, 1fr)` grid, gap 0, hairline `borderTop` and `borderRight` dividers. Stats:
   - `10/100` / SEO score / Google Lighthouse
   - `15/40` / 5-Second Test / Original site
   - `15s` / Phone number / Seconds to find
   - Value: Geist 600, `clamp(2rem, 4vw, 3rem)`, `var(--ink)`. Label: 14px 500. Sub: 11px uppercase `var(--muted)`

### Metadata

```ts
export const metadata: Metadata = {
  title: 'Evoltage UK — Case Study | Kicksnare',
  description: "How we rebuilt a 24-hour electrician's website in 3 days. SEO 10→80+. 5-Second Test 15/40→9/10.",
  alternates: { canonical: '/case-studies/evoltage' },
  openGraph: {
    title: 'Evoltage UK — A website rebuild that actually mattered',
    description: 'Nobody in the dark wants to read more. We fixed that.',
    url: 'https://www.kicksnare.digital/case-studies/evoltage',
    type: 'article',
  },
}
```

### Build Sequence

1. **Phase 1 — Extract Header + Footer.** Create both files, update PortfolioClient imports, delete inline definitions. Run `pnpm tsc --noEmit`. Dev server: verify `/` renders identically.
2. **Phase 2 — Route scaffold.** Create `page.tsx` and `CaseStudyClient.tsx` with placeholder content. Run `pnpm tsc --noEmit`. Navigate to `/case-studies/evoltage` — Header shows "← Home", Footer renders, page title correct.
3. **Phase 3 — S1 section.** Add `.cs-section-grid` to globals.css. Create `S1TheProblem.tsx`. Wire into `CaseStudyClient`. Run `pnpm tsc --noEmit`.
4. **Phase 4 — Update progress tracker.**

### Self-Testing Plan

| Check | How |
|-------|-----|
| Homepage regression | Navigate `/`, scroll through all sections, verify header/footer identical to pre-extraction state. Hamburger works, scroll frosted glass works, active section underlines fire. |
| Route loads | Navigate `/case-studies/evoltage`. Browser tab: "Evoltage UK — Case Study \| Kicksnare". Header shows "← Home" link. |
| Back navigation | Click "← Home" → navigates to `/`. CTA pill "Free audit" visible. |
| S1 visual (1440px) | `1fr 2fr` grid. Eyebrow top-left. Headline right column with "in the dark" in serif italic. JJ paragraph in muted body. SVG figure with 3 annotations. 3-stat row with hairline dividers. |
| S1 visual (375px) | Single column. Eyebrow full-width. Stats stay 3-col. |
| Reveal animation | Scroll: sections fade in (opacity 0→1, translateY 20→0). |
| Metadata/OG | Inspect source: `<title>`, `og:title`, `og:description`, `canonical` all correct. |
| Build | `pnpm tsc --noEmit` clean. `pnpm next build` clean (two routes: `/` and `/case-studies/evoltage`). |

---

## V2: Sections 2 + 3

### Goal

Add S2 (What We Built) and S3 (The Numbers) to the case study page.

### Architecture Decisions

**Sections are inline function components** inside the case study client file — matching how `CSProblem`, `CSSolution`, `CSResult` are inline in `CaseStudyModal.tsx`. No new files.

**S3 uses light (paper) background, not dark.** The modal's `CSResult` uses dark — but S3 leads into S4 (dark CTA in V3). Using light here avoids two consecutive dark sections.

**Before/after figures are annotated SVGs** following the `AuditFig` pattern — purposeful illustrations, not real screenshots. `viewBox="0 0 390 680"` (mobile viewport proportions). Side-by-side on desktop (`1fr 1fr` gap 24), stacked on mobile.

**Stats on light background:** Values in `var(--accent)` orange (consistent with dark-section pattern), labels in `var(--ink)`, subs in `var(--muted)`.

### Key File

`app/case-studies/evoltage/CaseStudyClient.tsx` — all additions go here (or whichever file V1 established as the client boundary).

### S2: What We Built — Component Design

**Layout:** Eyebrow + headline in `1fr 2fr` sidebar grid (top row only). Figure pair + bullets + methodology are full-width below.

**Content:**

1. **Eyebrow:** `(02) What we built`
2. **Headline:** "The site we *shipped*." — "shipped" in serif italic
3. **Before/After figure grid:** Two annotated SVGs in `1fr 1fr` desktop / `1fr` mobile
   - **EvoltageBeforeFig** (`viewBox 0 0 390 680`): Stripe layer, browser chrome, nav, hero image placeholder, weak "Read more..." CTA, buried phone number. Three annotations: "No hook", "No clear action", "Phone buried". Label: `"BEFORE · MOBILE · 390"`. Pattern id: `"ev-before-stripes"`
   - **EvoltageAfterFig** (`viewBox 0 0 390 680`): Stripe layer, browser chrome, sticky green call bar with phone + accent CTA pill, trust badge row (5 pill rects), strong hero with bold CTA. No annotations. Label: `"AFTER · MOBILE · 390"`. Pattern id: `"ev-after-stripes"`
   - Each wrapped in `position: relative` container with "Before"/"After" label overlay (`position: absolute`, top-left, mono 11px)
4. **Bullet list (5 items with Check icons):**
   - "Phone number one tap away on every page"
   - "13 pages so Google finds you for 'electrician Loughborough'"
   - "Trust badges visible in 3 seconds — NAPIT, JIB, insured, Checkatrade 5.0"
   - "Real job photos, not stock"
   - "Built in 3 days"
   - Each `<li>`: 16x16 accent-border circle with `<Check size={9}/>`, text 16px, hairline `borderTop`, last item also `borderBottom`
5. **Methodology sentence:** "We ran three audits and diagnosed 10 problems before writing a line of code." — 17px, `var(--muted)`, maxWidth 640, marginTop 28

### S3: The Numbers — Component Design

**Layout:** Eyebrow + headline in sidebar grid (top). Stat grid + "what's next" are full-width below.

**Content:**

1. **Eyebrow:** `(03) The numbers`
2. **Headline:** "Evidence, not *promises.*" — "promises." in serif italic
3. **Stat grid:** `repeat(4, 1fr)` desktop / `repeat(2, 1fr)` mobile, gap 0, hairline `borderTop` + `borderLeft` dividers

| v | l | sub |
|---|---|-----|
| `9/10` | 5-Second Test | Was 15/40 — now instant |
| `80+` | SEO health | Was 10/100 |
| `13` | Indexed pages | Was 4 — 13 routes Google can rank |
| `0s` | Time to phone | Was 15 seconds of scrolling |

   - Value: `var(--accent)`, `clamp(3rem, 6vw, 5.25rem)`, weight 500
   - Label: `var(--ink)`, 16px, weight 500
   - Sub: `var(--muted)`, 10.5px, uppercase, letterSpacing 0.14em

4. **"What's next" block:** Mono eyebrow "What's next", then paragraph: "Analytics are wired. Once the site goes live, we'll track exactly how many people tap the call button, which service pages get the most visits, and where visitors come from." — 17px, `var(--muted)`, maxWidth 640. Separated by hairline `borderTop`, `marginTop: 56`.

### Build Sequence

1. Import `Check` from icons if not already imported.
2. Define `EvoltageBeforeFig` and `EvoltageAfterFig` (inline SVGs).
3. Define `EvoltageWhatWeBuilt` section component.
4. Define `EvoltageTheNumbers` section component.
5. Wire both into page JSX below S1.
6. `pnpm tsc --noEmit` + `pnpm next build`.

### Self-Testing Plan

| Check | How |
|-------|-----|
| Scroll continuity | Scroll S1→S2→S3. Hairline borders separate sections cleanly. No visual gap. |
| Before/after figures (1440px) | Side-by-side, "Before"/"After" labels visible top-left. Before has 3 annotations, After has none. |
| Before/after figures (375px) | Stacked vertically. Labels not clipped by overflow hidden. |
| Check icon alignment | 16x16 accent circle aligns to first line of text. No misalignment on multi-line bullets. |
| Stat readability (1440px) | Values ~84px, dominant orange, labels clearly below. |
| Stat readability (375px) | 2x2 grid, values ~48px, still readable without zoom. |
| Methodology sentence | Visually separated from last bullet by marginTop. Reads as a standalone conclusion. |
| Eyebrows present | `(02)` and `(03)` visible, `var(--muted)` color. |
| SVG pattern IDs | No console warnings about duplicate IDs. Both figures render stripes independently. |

---

## V3: Section 4 + Byline

### Goal

Add S4 (Your Turn — the conversion CTA) and a compact byline strip ("Built by OO") to complete the case study page end-to-end.

### Architecture Decisions

**S4 is a dark section** (`var(--primary)` background, 120px top padding). It matches the Contact section pattern on the homepage.

**CTA pill inverts on dark:** The homepage's `.cta-primary` is green-fill on paper. On the dark section it must be paper-fill on green. Add `.cta-cs-primary` and `.cta-cs-primary:hover .cta-cs-arr { transform: translateX(3px) }` to `globals.css` — keeps the page as a Server Component (no `onMouseEnter` state needed).

**CTA group is a compact pill row, not card tiles.** This is a secondary page — the Contact section on the homepage is the conversion centrepiece with large cards. The case study CTA is lighter.

**Byline strip shares the dark surface with S4** — no background switch. Separated by a hairline. It is a `<div>` inside S4's `<section>`, not a standalone section.

**Dead link to `/about` accepted** until V4. No `aria-disabled` needed.

### Key Files

| File | Change |
|------|--------|
| `app/globals.css` | Add `.cta-cs-primary` + hover rule |
| `app/case-studies/evoltage/CaseStudyClient.tsx` | Add S4 section + byline strip |

### S4: Your Turn — Component Design

**Dark section.** `background: var(--primary)`, `color: var(--paper)`, `padding: '120px 0 80px'`.

**Content:**

1. **Eyebrow:** `(04) Your turn` — `rgba(249,254,253,0.55)`
2. **Headline:** "Your website is costing you *customers.*" — "customers." in serif italic + accent orange. Geist 600, `clamp(2.25rem, 4vw, 4rem)`, maxWidth 720
3. **Lost-job paragraph:** "Every month a website like this stays live, potential customers land on it, can't find the phone number, and call someone else. Even one lost emergency call-out at ~£200 pays for the entire rebuild." — 18px, `rgba(249,254,253,0.65)`, maxWidth 640
4. **Spec-work line:** "We gave JJ a free audit and concept build to show what's possible." — 16px, `rgba(249,254,253,0.50)`, marginBottom 48
5. **CTA group** (`display: flex`, `flexWrap: wrap`, `gap: 12`):
   - **Primary:** Paper-fill pill, `className="cta-cs-primary"`, label "Get your free audit", `ArrowRight` in accent circle, `href="mailto:hi@kicksnare.studio?subject=Free audit request"`
   - **Secondary:** Outlined pill (`border: 1px solid rgba(249,254,253,0.30)`, transparent bg, paper text), label "Drop us an email", `href="mailto:hi@kicksnare.studio"`
   - **Tertiary:** Text link `.link-uline`, `rgba(249,254,253,0.6)`, "DM @kicksnare ↗", `href="https://x.com/kicksnare12"`, `target="_blank"`, minHeight 44
6. **Guarantee:** Hairline above (`rgba(249,254,253,0.18)`), paddingTop 20, marginTop 32. "*If you don't love it, you don't pay.*" in serif italic at `var(--paper)`. "No questions." in Geist at `rgba(249,254,253,0.65)`. No icon, no badge, no box.

### Byline Strip

Below S4 content, inside the same `<section>`. Hairline above, `padding: 24px 0`, `marginTop: 80`.

Text: "Built by OO →" — the "OO →" portion is an `<a href="/about" className="link-uline">`, `rgba(249,254,253,0.65)`, minHeight 44. The "Built by" prefix is `rgba(249,254,253,0.40)`, 13px, letterSpacing 0.06em.

### Build Sequence

1. Add `.cta-cs-primary` + hover rule to `globals.css`.
2. Add S4 section with eyebrow, headline, copy, CTA group, guarantee.
3. Add byline strip inside S4 section.
4. `pnpm tsc --noEmit` + `pnpm next build`.

### Self-Testing Plan

| Check | How |
|-------|-----|
| S3→S4 transition | Background switches cleanly from paper to primary. No border artifact. 120px breathing room at top of S4. |
| Eyebrow | `(04) Your turn` visible in muted paper alpha. |
| Headline | One italic accent word ("customers.") in serif + accent orange. |
| CTA 1 click | Opens mail client with `hi@kicksnare.studio` + subject "Free audit request". |
| CTA 1 hover | Arrow circle nudges `translateX(3px)`. Pill body unchanged. |
| CTA 2 click | Opens mail client, no subject. |
| CTA 3 click | Opens `x.com/kicksnare12` in new tab. |
| Guarantee text | Serif italic for the quote. Regular Geist for "No questions." Hairline above. No icon/badge. |
| Byline | "Built by OO →" visible. Click navigates to `/about` (404 expected until V4 — no JS error). |
| Mobile (390px) | CTA group stacks vertically. All touch targets ≥44px. |
| Complete scroll | S1→S2→S3→S4→byline→Footer. Full case study readable end-to-end. |
| Build | `pnpm tsc --noEmit` + `pnpm next build` clean. |

---

## V4: About Page

### Goal

Create `/about` — OO's bio page. The "Built by OO" byline link from V3 resolves.

### Architecture Decisions

**Font module extraction:** Move `FontSet` and `PAIRS` from `PortfolioClient.tsx` to `lib/fonts.ts`. Both `PortfolioClient` and `AboutClient` import from there. Export `defaultFonts: FontSet` (resolved geist-instrument pair). This eliminates duplication from V1.

**Header adaptation (finalized):** `navLinks` defaults to homepage anchors. The about page passes `[{ href: '/#work', label: 'Work' }, { href: '/#audit', label: 'Audit' }, { href: '/#about', label: 'About' }, { href: '/#contact', label: 'Contact' }]` — absolute paths that navigate home first. `ctaHref="/#audit"`.

**Footer adaptation:** Add `backHref?: string` prop (defaults to `'#work'`). About page passes `backHref="/#work"`.

**No ContactModal on about page.** Contact links go directly to mailto / booking URL / X DM. Simpler and lower friction for a bio page.

**`heroPassed={true}` always** on about page — CTA pill permanently visible (no hero to scroll past).

### Files to Create

| File | Directive | Responsibility |
|------|-----------|---------------|
| `lib/fonts.ts` | — | Exports `FontSet`, `PAIRS`, `defaultFonts` |
| `components/AboutClient.tsx` | `'use client'` | Scroll state, isMobile. Renders Header, bio section, contact section, Footer |
| `app/about/page.tsx` | Server Component | Metadata, renders `<AboutClient />` |

### Files to Modify

| File | Change |
|------|--------|
| `components/PortfolioClient.tsx` | Remove local `FontSet`/`PAIRS`, import from `lib/fonts.ts` |
| `components/Footer.tsx` | Add `backHref?: string` prop. Replace hardcoded `href="#work"` on "Back to top" with `backHref ?? '#work'` |
| `app/sitemap.ts` | Add `/about` entry |
| `app/layout.tsx` | Add `url: "https://www.kicksnare.digital/about"` to Person schema's founder node |

### Page Structure

**Section 1: Bio Hero (light, paper background)**

Grid: `1fr 2fr` gap 80px on desktop, single column on mobile (photo above text below 640px).

- **Left column:** `StripedFig` with `aspect="3/4"`, `label="OO · 3:4"`, `id="about-photo"`. Inlined if not already shared.
- **Right column:**
  - Eyebrow: `(01) About`
  - Headline: "Seven years in retail. Now I *build* the sites that close the deals." — "build" in serif italic
  - Credential line: "Seven years as a product manager in retail. No startup history. Direct-to-client work from day one." — 16px, `var(--muted)`
  - Hairline separator
  - Origin copy: "The agency is new. The craft is proven." / "No account managers. You talk to the person who builds it." — 18px lede weight

**Section 2: Contact Links (dark, primary background)**

- Eyebrow: `(02) Get in touch` — `rgba(249,254,253,0.55)`
- Three contact affordances (same pattern as homepage Contact):
  - **Booking card** (primary): "Book a slot", booking URL, `ArrowDiag` icon
  - **Email card** (secondary): "Email us", `mailto:hi@kicksnare.studio`, `ArrowRight` icon
  - **DM card** (tertiary): "DM @kicksnare12", X link, `ArrowDiag` icon
- Desktop: `1.6fr 1fr` grid with cards. Mobile: full-width booking button + quiet text links
- All cards: orange wash hover `rgba(255,94,0,0.10)` + `translateY(-3px)`

### Metadata

```ts
export const metadata: Metadata = {
  title: 'OO — About · Kicksnare',
  description: 'Seven years in retail product management. Now building websites that close deals. No account managers — you talk to the person who builds it.',
  alternates: { canonical: '/about' },
}
```

### Build Sequence

1. **Phase 1 — Font module.** Create `lib/fonts.ts`. Update `PortfolioClient.tsx` imports. `pnpm tsc --noEmit`.
2. **Phase 2 — Footer `backHref` prop.** Update `Footer.tsx`. `pnpm tsc --noEmit`.
3. **Phase 3 — About page scaffold.** Create `app/about/page.tsx` + `components/AboutClient.tsx` (placeholder). Navigate to `/about` — 200 response, correct title.
4. **Phase 4 — Bio section.** StripedFig + copy in `AboutClient`.
5. **Phase 5 — Contact section.** Dark section with 3 contact affordances + mobile gate.
6. **Phase 6 — Sitemap + JSON-LD.** Update `sitemap.ts` and `layout.tsx`.

### Self-Testing Plan

| Check | How |
|-------|-----|
| Byline link resolves | On `/case-studies/evoltage`, click "Built by OO →" → loads `/about`. |
| Header behavior | Transparent on load, frosted on scroll. "Free audit" CTA always visible. Click "Work" navigates to `/#work`. |
| Bio section (1440px) | `1fr 2fr` grid. Striped placeholder left. Headline with serif italic right. |
| Bio section (375px) | Single column. Photo placeholder above text. |
| Contact section | Dark green background. Booking card hover: orange wash + translateY(-3px). Email opens mail client. DM opens X in new tab. |
| Contact mobile | Full-width booking button + quiet text links. |
| Footer "Back to top" | Click → navigates to `/#work` (not dead `#work`). |
| Sitemap | `curl /sitemap.xml` includes both `/` and `/about`. |
| Font module | Homepage still renders identically after `FontSet`/`PAIRS` moved to `lib/fonts.ts`. |
| Build | `pnpm tsc --noEmit` + `pnpm next build` clean. `/about` in build output. |

---

## V5: Homepage Wiring + OG Meta

### Goal

Wire the Evoltage case study into the homepage (WorkCard links to the page instead of modal, hero project row navigates) and add social-sharing OG image.

### Architecture Decisions

**WorkCard conditional:** When `c.href` exists, render `<Link href={c.href}>` from `next/link`. When absent, keep the `<button onClick={onOpen}>`. Both receive identical visual markup and hover handlers. The `onOpen` prop is still passed but never called for linked cases.

**Hero project rows — three-branch conditional:**
- `resolvedHref` defined → `<Link>` (evoltage)
- `p.id` exists, no href → `<a href="#" onClick>` (modal cases)
- `p.id` null → `<a href="#work">` (placeholders)

Lookup: `const casesByid = Object.fromEntries(cases.map(c => [c.id, c]))` before `heroProjects.map()`.

**Evoltage modal fields populated minimally.** The `CaseStudy` interface requires `problem`, `approach`, `solution`, `result` objects. These are filled with real (simplified) content that satisfies TypeScript — but Evoltage will never open in modal because its `href` exists. `result.quote` has empty strings (no testimonial exists).

**OG image is dynamic** (`opengraph-image.tsx`), matching the homepage pattern. Same edge runtime, no font loading.

### Interface Change in `lib/cases.ts`

Add after `duration: string;`:

```ts
href?: string;
```

### Evoltage Data Entry

**Card-display fields (real values):**

| Field | Value |
|-------|-------|
| `id` | `'evoltage'` |
| `name` | `'Evoltage UK'` |
| `tagline` | `'Turned a 15/40 failing site into a 9/10 pass in 3 days.'` |
| `sector` | `'Trades · Local business'` |
| `year` | `'2025'` |
| `duration` | `'3 days'` |
| `href` | `'/case-studies/evoltage'` |
| `tone` | `'#DDE8DF'` (cool sage, distinct from existing three) |
| `tag` | `'Web design · SEO'` |
| `blurb` | `'Free audit and concept rebuild for a 24-hour electrician. 5-second test went from 15/40 to 9/10. SEO health from 10 to 80+.'` |
| `meta` | `'2025 · 3 days'` |
| `figure` | `'site · 9:19'` |

**Modal-detail fields:** Populated with real content summarized from the shaping doc. `result.quote` is `{ body: '', who: '', role: '' }`.

**Hero project entry:** `{ id: 'evoltage', name: 'Evoltage UK', meta: 'Website rebuild · 2025' }` — inserted after `mara`, before `Lattice OS`.

### WorkCard Conditional

```
c.href
  ? <Link href={c.href} style={linkResetStyles} onMouseEnter=... onMouseLeave=...>
      card visual + text
    </Link>
  : <button type="button" onClick={onOpen} style={buttonResetStyles} onMouseEnter=... onMouseLeave=...>
      card visual + text
    </button>
```

`linkResetStyles`: `display: 'block'`, `width: '100%'`, `textDecoration: 'none'`, `color: 'inherit'`, `padding: 0`, `cursor: 'pointer'`.

### OG Image

File: `app/case-studies/evoltage/opengraph-image.tsx`

- `export const runtime = 'edge'`
- `export const size = { width: 1200, height: 630 }`
- `export const contentType = 'image/png'`
- `export const alt = 'Evoltage UK — website rebuild. 5-second test 15/40 → 9/10 in 3 days.'`
- Layout: dark background `#0a1a14`, "Kicksnare" eyebrow in orange, headline "A 15/40 failing site rebuilt in 3 days. Now 9/10.", sub "Evoltage UK · Trades · Local business", footer "kicksnare.digital"

Next.js auto-links collocated `opengraph-image.tsx` to the route's metadata. Remove any hardcoded `openGraph.images` from V1's metadata if present.

### Build Sequence

1. Add `href?: string` to `CaseStudy` in `lib/cases.ts`. `pnpm tsc --noEmit`.
2. Add evoltage entry to `cases[]` + `heroProjects[]`. `pnpm tsc --noEmit`.
3. Add `import Link from 'next/link'` to `PortfolioClient.tsx`. Implement WorkCard ternary. `pnpm tsc --noEmit`.
4. Add `casesByid` lookup + three-branch conditional in hero rows. `pnpm tsc --noEmit`.
5. Create `opengraph-image.tsx`. `pnpm next build`.
6. Update progress tracker.

### Self-Testing Plan

| Check | How |
|-------|-----|
| Evoltage card click | On `/`, click the 4th card (sage-green) → navigates to `/case-studies/evoltage`. No modal. No `#` hash in URL. |
| Evoltage card hover | `translateY(-6px)` lift + ring button accent. Identical to other cards. |
| Existing cards → modal | Click Halocrate → modal opens. Click Northbeam → modal opens. Click Mara → modal opens. No navigation. |
| Hero project rows | 6 rows visible. Evoltage click → page navigation. Halocrate/Northbeam/Mara click → modal. Lattice/Vela → no action (or #work scroll). `→` suffix on first four, `·` on last two. |
| Evoltage row hover | `paddingLeft` animates 0→16px. |
| OG image | Navigate `/case-studies/evoltage/opengraph-image` → 1200x630 PNG renders. Or use social card debugger. |
| TypeScript | `pnpm tsc --noEmit` clean. |
| Build | `pnpm next build` clean. Four routes: `/`, `/case-studies/evoltage`, `/about`, `/privacy`. |

---

## Cross-Slice Dependencies

```
V1 (scaffold + S1)
  ├── extracts Header.tsx, Footer.tsx
  ├── creates /case-studies/evoltage route
  └── builds S1
        ↓
V2 (S2 + S3)
  └── adds sections to existing route
        ↓
V3 (S4 + byline)
  └── completes the case study page end-to-end
  └── byline links to /about (dead until V4)
        ↓
V4 (about page)
  ├── extracts FontSet/PAIRS to lib/fonts.ts (cleans V1 duplication)
  ├── adds backHref to Footer
  ├── creates /about route
  └── byline link resolves
        ↓
V5 (homepage wiring)
  ├── adds href to CaseStudy interface
  ├── adds evoltage data
  ├── WorkCard conditional Link vs button
  ├── HeroProject row conditional
  └── OG image
```

Each slice is independently demoable. V1-V3 complete the case study page. V4 completes the bio page. V5 wires everything to the homepage.
