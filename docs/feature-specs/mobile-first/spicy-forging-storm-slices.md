# Kicksnare Responsive Layout — Slices

**Selected shape:** C — Tailwind arbitrary values + useIsMobile() for modals
**Shaping doc:** spicy-forging-storm.md
**Breadboard:** spicy-forging-storm.md § Detail C: Breadboard

---

## Sliced Breadboard

Affordances grouped by the slice that introduces them. Cross-slice wiring preserved.

```mermaid
flowchart TB

  subgraph v1["V1: FOUNDATION"]
    N6["N6: lib/cases.ts — CaseStudy[]"]
    N7["N7: useIsMobile — SSR-safe, threshold 1024px"]
    N1_f["N1: next/font — Space Grotesk + Crimson Pro (font mechanism)"]
    N2_f["N2: CSS token vars — --display · --serif · --mono aliases"]
  end

  subgraph v2["V2: INTRINSIC GRIDS"]
    U1["U1: section wrappers — wrap-pad tokens · py-80→120"]
    U2["U2: card grids — auto-fit minmax(min(100%,Xpx),1fr)"]
    U3["U3: sidebar layouts — stacked → @container columns"]
    N3_layout["N3a: @container sidebar + padding rules (globals.css)"]
    U21["U21: footer overflow-x hidden"]
  end

  subgraph v3["V3: NAVIGATION"]
    N8["N8: scrolled · heroPassed · activeSection states"]
    N9["N9: IntersectionObserver — #audit #work #about #contact"]
    N10["N10: Header props — scrolled · heroPassed · isMobile · activeSection"]
    N3_nav["N3b: @container nav collapse 760px (globals.css)"]
    N4["N4: .navlink--active CSS rule"]
    U5["U5: hamburger — hidden @container ≥760px"]
    U6["U6: desktop nav + CTA — hidden @container <760px"]
    U7["U7: mobile overlay — fixed inset-0 --primary bg"]
    U8["U8: .navlink--active on current section"]
    U9["U9: CTA pill — opacity-0 mobile + !heroPassed"]
  end

  subgraph v4["V4: HERO AND ACCORDIONS"]
    U4["U4: Hero — desc order-3 · CTA order-2 on mobile"]
    N3_acc["N3c: @container accordion 520px (globals.css)"]
    N11["N11: PainItem useState(false) → data-open"]
    U10["U10: pain accordion — toggle · 0fr→1fr"]
    N12["N12: ProcessStep useState(index===0) → data-open"]
    U11["U11: process accordion — step-0 open default"]
    U12["U12: mobile contact — full-width button + quiet links"]
    U13["U13: desktop contact — three-card unchanged"]
  end

  subgraph v5["V5: MODALS"]
    N14["N14: CaseStudyModal — useIsMobile gates layout"]
    N15["N15: ContactModal — useIsMobile · inset-0 · contrast · labels"]
    U15["U15: CaseStudyModal full-screen / centered"]
    U16["U16: ContactModal fixed inset-0 / centered"]
    U17["U17: modal entrances — opacity/scale · no opacity:0 start"]
    U19["U19: form inputs — min-h 44px · visible label"]
    N20["N20: input contrast — rgba(249,254,253,0.10)"]
  end

  subgraph v6["V6: BOTTOM BAR"]
    N13["N13: useIntersectionObserver on #contact 50%"]
    U14["U14: fixed bottom 52px · Let's talk · hides near contact"]
  end

  subgraph v7["V7: TYPOGRAPHY"]
    N1_ty["N1: next/font — drop JetBrains Mono · Space Grotesk 5 weights"]
    N2_ty["N2: CSS tokens — fs-* in rem · line-height audit"]
    N19["N19: --mono call sites → --display + uppercase"]
  end

  subgraph v8["V8: TOUCH AND FORMS"]
    U18["U18: tap zones — min-h 44px on small interactives"]
    N16["N16: WorkCard button not a-href"]
  end

  subgraph v9["V9: KEYBOARD AND ARIA"]
    N5["N5: :focus-visible outline rule (globals.css)"]
    U20["U20: focus-visible ring on all interactives"]
    N17["N17: main landmark wrapper"]
    N18["N18: AuditFig img — lazy · WebP · explicit w/h"]
  end

  %% Key cross-slice wires
  N6 -.->|data| N14
  N7 -->|isMobile| N10
  N7 -->|isMobile| N14
  N7 -->|isMobile| N15
  N7 -->|isMobile| U12
  N9 -->|activeSection| N8
  N8 -->|props| N10
  N10 --> U8
  N10 --> U9
  N4 -.->|CSS| U8
  N3_nav -.->|@container| U5
  N3_nav -.->|@container| U6
  N3_acc -.->|@container| U10
  N3_acc -.->|@container| U11
  U5 -->|toggle| U7
  N11 -->|data-open| U10
  N12 -->|data-open| U11
  N8 -->|heroPassed| U14
  N13 -->|contact in view| U14
  N14 --> U15
  N15 --> U16
  N5 -.->|CSS| U20

  %% Slice boundary colors
  style v1 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
  style v2 fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
  style v3 fill:#fff3e0,stroke:#ff9800,stroke-width:2px
  style v4 fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
  style v5 fill:#fff8e1,stroke:#ffc107,stroke-width:2px
  style v6 fill:#fce4ec,stroke:#e91e63,stroke-width:2px
  style v7 fill:#e0f7fa,stroke:#00bcd4,stroke-width:2px
  style v8 fill:#fbe9e7,stroke:#ff5722,stroke-width:2px
  style v9 fill:#f1f8e9,stroke:#8bc34a,stroke-width:2px
```

---

## Slices Grid

|  |  |  |
|:--|:--|:--|
| **[V1: FOUNDATION](./spicy-forging-storm-v1-plan.md)**<br>⏳ PENDING<br><br>• `lib/cases.ts` — `CaseStudy[]` typed<br>• `useIsMobile` hook (SSR-safe)<br>• `next/font/google` wired in `layout.tsx`<br>• `'use client'` audit on all new components<br><br>*Demo: App loads · DevTools Network shows no fonts.googleapis.com · zero console errors* | **[V2: INTRINSIC GRIDS](./spicy-forging-storm-v2-plan.md)**<br>⏳ PENDING<br><br>• All grid containers switched to `auto-fit/minmax`<br>• Sidebar sections wired to `@container` rules<br>• Section wrappers use `--wrap-pad-*` tokens<br>• Footer `overflow-x: hidden` clips wordmark<br><br>*Demo: 375px all sections 1-col · 1024px pixel-identical to current · no horizontal scroll* | **[V3: NAVIGATION](./spicy-forging-storm-v3-plan.md)**<br>⏳ PENDING<br><br>• Hamburger + mobile overlay via `@container`<br>• `heroPassed` + `activeSection` states added<br>• Section observer wired to nav highlight<br>• Header CTA pill gated on `heroPassed`<br><br>*Demo: Hamburger visible at 375px · tap to open overlay · active section highlights while scrolling* |
| **[V4: HERO AND ACCORDIONS](./spicy-forging-storm-v4-plan.md)**<br>⏳ PENDING<br><br>• Hero P3 description reordered below CTA<br>• Pain cards accordion (`data-open` + CSS transition)<br>• Process steps accordion (step-0 open default)<br>• Contact section: mobile primary CTA layout<br><br>*Demo: 375px — headline + CTA above fold together · tap pain card → description expands · Contact shows full-width button* | **[V5: MODALS](./spicy-forging-storm-v5-plan.md)**<br>⏳ PENDING<br><br>• CaseStudyModal full-screen on mobile<br>• ContactModal full-screen on mobile (`fixed inset-0`)<br>• Modal entrance transitions; no `opacity:0` start<br>• Form inputs 44px · visible labels · contrast fix<br><br>*Demo: 375px tap work card → full-screen modal · tap Contact us → full-screen form · both open at opacity:1* | **[V6: BOTTOM BAR](./spicy-forging-storm-v6-plan.md)**<br>⏳ PENDING<br><br>• `BottomBar` component — fixed bottom 52px<br>• Shown when `heroPassed && isMobile`<br>• `useIntersectionObserver` on `#contact` hides bar<br>• Header CTA pill hidden on mobile (desktop-only)<br><br>*Demo: Scroll past hero → bar slides in · scroll to contact → bar disappears · desktop shows header CTA* |
| **[V7: TYPOGRAPHY](./spicy-forging-storm-v7-plan.md)**<br>⏳ PENDING<br><br>• Drop JetBrains Mono; Space Grotesk 5 weights<br>• `--fs-*` tokens migrated to `rem`<br>• Body copy audited: ≥16px · line-height ≥1.5<br>• `--mono` call sites → `--display` + uppercase<br><br>*Demo: DevTools shows rem font sizes · no JetBrains Mono font file · no iOS zoom on form field focus* | **[V8: TOUCH AND FORMS](./spicy-forging-storm-v8-plan.md)**<br>⏳ PENDING<br><br>• Tap zone padding — `min-height: 44px` on small interactives<br>• `WorkCard` `<a href="#">` → `<button type="button">`<br>• 8px minimum spacing between adjacent tap targets<br>• One-handed reach satisfied: bottom bar + hamburger<br><br>*Demo: All small text links tappable with thumb · workcard opens on single tap via button* | **[V9: KEYBOARD AND ARIA](./spicy-forging-storm-v9-plan.md)**<br>⏳ PENDING<br><br>• Global `:focus-visible` ring in `globals.css`<br>• `<main>` landmark wraps page body<br>• ARIA labels, alt text, nav landmark label<br>• AuditFig `<img>` — `loading="lazy"` + WebP<br><br>*Demo: Tab through page — visible focus rings on every element · DevTools Accessibility tree shows landmarks · no missing alt text* |

---

## V1: Foundation

**Covers:** R15, R16, R17, R18 (font-loading mechanism), R19

### Affordances

| # | Affordance | Type | File |
|---|------------|------|------|
| N6 | `CaseStudy` interface + `cases: CaseStudy[]`; inline arrays removed from PortfolioClient | Non-UI | `lib/cases.ts` (new) |
| N7 | `useIsMobile()` — `useState(false)`, `useEffect` updates on mount + window resize; threshold `window.innerWidth < 1024` | Non-UI | `hooks/useIsMobile.ts` (new) |
| N1 | `next/font/google` — Space Grotesk + Crimson Pro imported, variables declared (`--font-display`, `--font-serif`); font variables added to `<html>` className | Non-UI | `app/layout.tsx` |
| N2 | `--display`, `--serif`, `--mono` CSS vars updated to reference `var(--font-display)` / `var(--font-serif)` | Non-UI | `app/globals.css` |
| — | All new component files get `'use client'` as first line if they use hooks | Non-UI | any new components this slice |

### Demo
- DevTools → Network tab: no `fonts.googleapis.com` requests
- `useIsMobile` hook resolves to `false` on server; no hydration warnings
- App renders identically to current at all viewports

---

## V2: Intrinsic Grids

**Covers:** R0, R1, R3, R4, R5, R12, R21, R22, R27, R29

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| U1 | Section wrappers — `px-[var(--wrap-pad-mobile)]` + `py-[80px]`; desktop: `px-[var(--wrap-pad-desktop)]` + `py-[120px]` | UI | All section components; inline `padding` props removed |
| U2 | Work cards grid — `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5` | UI | `Work` component |
| U2 | Pain cards grid — `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5` | UI | `Problem` component |
| U2 | Process steps grid — `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]` | UI | `Process` component |
| U2 | Stats grid — `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-6` | UI | `About` component |
| U3 | Hero section — `container-type: inline-size`; `@container (min-width: 700px)` → `grid-template-columns: 1.4fr 1fr; gap: 80px` | UI | `Hero` |
| U3 | Audit, About, Problem outer, Process intro, Contact — `container-type: inline-size`; `@container (min-width: 640px)` → respective 2-col definitions | UI | Each section wrapper |
| N3a | `@container` sidebar rules written in `globals.css` (all sidebar sections at 640px/700px) | Non-UI | `app/globals.css` |
| U21 | `footer { overflow-x: hidden }` added to `globals.css` | UI | `app/globals.css` |

### Demo
- 375px: every section 1-column; horizontal padding 24px; `scrollWidth === clientWidth`
- 640px: pain cards, process steps, work cards begin gaining columns as space allows
- 1024px+: all sidebar sections switch to 2-column; desktop design pixel-identical

---

## V3: Navigation

**Covers:** R2, R6, R24, R28 (nav collapse), R42

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| N8 | `heroPassed` (`scrollY > 560`) and `activeSection: string \| null` states added to `PortfolioClient` alongside existing `scrolled` | Non-UI | `PortfolioClient` |
| N9 | `IntersectionObserver` array on `#audit`, `#work`, `#about`, `#contact`; `rootMargin: '-70px 0px -55% 0px'`; sets `activeSection` | Non-UI | `PortfolioClient` |
| N10 | `Header` props extended: `heroPassed`, `isMobile`, `activeSection` added; `navLinks` array shared between desktop and hamburger | Non-UI | `Header` |
| N3b | Header wrapper gets `container-type: inline-size`; `@container (min-width: 760px)` rules in `globals.css` show/hide nav links and hamburger | Non-UI | `app/globals.css` |
| N4 | `.navlink--active::after { transform: scaleX(1) }` added to `globals.css` | Non-UI | `app/globals.css` |
| U5 | Hamburger button rendered in Header; hidden via `@container (min-width: 760px)` | UI | `Header` |
| U6 | Desktop nav links + CTA pill rendered; hidden via `@container (< 760px)` | UI | `Header` |
| U7 | Mobile nav overlay — `fixed inset-0`, `var(--primary)` bg, `z-[99]`, all 4 nav links + CTA, close button; `navOpen` state controls visibility | UI | `Header` |
| U8 | `.navlink--active` class applied on nav link matching `'#' + activeSection` | UI | `Header` (desktop nav + hamburger overlay) |
| U9 | Header CTA pill — `opacity-0 pointer-events-none` class when `isMobile && !heroPassed`; transitions to `opacity-100` | UI | `Header` |

### Demo
- 375px: hamburger visible; desktop nav links hidden
- Tap hamburger → overlay covers screen; all 4 links reachable with thumb
- Scroll: active section nav link shows underline as each section enters view
- CTA pill: invisible on page load at 375px; fades in after scrolling past hero

---

## V4: Hero and Accordions

**Covers:** R14, R23, R25, R26, R28 (accordion mode)

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| U4 | Hero description `<Reveal>` wrapper gets `order-3` class; Hero CTA `<Reveal>` wrapper gets `order-2`; headline wrapper unchanged; parent flex column unchanged | UI | `Hero` |
| N3c | `@container (min-width: 520px)` rule in `globals.css`: `.pain-item__toggle { display: none }` + `.pain-item__body { grid-template-rows: 1fr !important }` | Non-UI | `app/globals.css` |
| N11 | `PainItem` extracted component — `useState(false)` → `data-open` attribute; always-rendered single structure | Non-UI | `Problem` (inline component) |
| U10 | Pain card accordion: toggle button with rotating `+` indicator; `.pain-item__body` with `grid-template-rows: 0fr → 1fr` CSS transition keyed on `[data-open="true"]` | UI | `PainItem` |
| N12 | `ProcessStep` extracted component — `useState(index === 0)` → `data-open`; step-0 renders open on first paint, SSR-safe | Non-UI | `Process` (inline component) |
| U11 | Process step accordion: same structure as U10; step-0 starts open; steps 1–3 start closed | UI | `ProcessStep` |
| U12 | Contact section mobile — `useIsMobile()` → full-width "Contact us" `<button>` + row of quiet text links ("DM @kicksnare ↗ · Book a slot ↗") | UI | `Contact` |
| U13 | Contact section desktop — three-card layout (DM @kicksnare · Contact us · Book a slot) unchanged; R14 explicitly preserved | UI | `Contact` |

### Demo
- 375px hero: headline visible above fold, CTA directly below headline, description below CTA
- 375px Problem section: tap a pain card title → description expands smoothly; tap again → collapses
- 375px Process section: step "Look" is open by default; tap others → expand
- 375px Contact section: single full-width "Contact us" button, quiet text links below
- 1024px: all sections pixel-identical to current; accordion toggles not visible; desktop contact unchanged

---

## V5: Modals

**Covers:** R8, R9, R10, R11 (verify), R13, R20, R40, R41, R48

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| N14 | `CaseStudyModal` updated — `useIsMobile()` gates `fixed inset-0 overflow-y-auto` (mobile) vs `max-w-4xl mx-auto rounded-[28px]` (desktop) | Non-UI | `components/CaseStudyModal.tsx` |
| U15 | CaseStudyModal mobile: full-screen, scrollable, no border-radius; desktop: centered dialog with backdrop | UI | `CaseStudyModal` |
| N15 | `ContactModal` updated — `useIsMobile()` gates full-screen vs centered card; same props interface | Non-UI | `ContactModal` (inline in `PortfolioClient`) |
| U16 | ContactModal mobile: `fixed inset-0`, solid `var(--primary)` background, 44px close button fixed at top-right; desktop: centered card unchanged | UI | `ContactModal` |
| U17 | CaseStudyModal: `transition: transform 350ms; scale(0.98) → scale(1)` on open. ContactModal: `transition: opacity 300ms; 0 → 1` on open. Hidden-start `opacity: 0` keyframes removed | UI | Both modals |
| N20 | ContactModal input background raised to `rgba(249,254,253,0.10)`; input `color: var(--paper)` at full opacity; `outline: none` removed from inputs | Non-UI | `ContactModal` |
| U19 | ContactModal form inputs: `min-height: 44px`; visually-hidden `<label htmlFor>` added above each input | UI | `ContactModal` |

### Demo
- 375px: tap a work card → modal fills entire screen; tap close → dismisses cleanly
- 375px: tap "Contact us" → full-screen contact form over solid green; close button fixed top-right
- 1024px: both modals open as centered dialogs with backdrop
- Both modals: open at full opacity immediately; no invisible flash
- Soundwave animation verified untouched

---

## V6: Bottom Bar

**Covers:** R35, R37

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| N13 | `useIntersectionObserver` custom hook — `IntersectionObserver` on a target element; `threshold: 0.5`; returns boolean | Non-UI | `hooks/useIntersectionObserver.ts` (new) |
| U14 | `BottomBar` component — `position: fixed; bottom: 0; left: 0; right: 0; height: 52px; padding-bottom: env(safe-area-inset-bottom)`; full-width "Let's talk" pill (accent background, `var(--ink)` text); hidden via `hidden lg:hidden`; visible when `isMobile && heroPassed && !contactVisible` | UI | `components/BottomBar.tsx` (new) |
| — | `BottomBar` rendered in `PortfolioClient` after `<footer>`; receives `isMobile` + `heroPassed` from existing state; `useIntersectionObserver` called on `#contact` ref inside BottomBar | Non-UI | `PortfolioClient`, `BottomBar` |
| — | Header CTA pill gets `hidden lg:flex` — desktop-only; replaced on mobile by BottomBar | UI | `Header` |

### Demo
- 375px: at page load — bottom bar not visible (hero in viewport)
- Scroll past hero — bottom bar slides up from bottom edge
- Continue scrolling to Contact section — bottom bar hides
- Scroll back up — bottom bar reappears; hides again near contact
- 1024px: no bottom bar; header CTA pill visible

---

## V7: Typography

**Covers:** R18 (complete), R30, R31, R32, R52 (StripedFig), R53

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| N1 | `JetBrains_Mono` removed from font imports; `Space_Grotesk` added with explicit `weight: ['300','400','500','600','700']`; `Crimson_Pro` retained | Non-UI | `app/layout.tsx` |
| N2 | `--fs-body: 1rem`, `--fs-body-sm: 0.875rem`, `--fs-eyebrow: 0.6875rem`, `--fs-ui: 0.875rem`; `clamp()` expressions updated to rem min/max (e.g. `clamp(4rem, 8.5vw, 8rem)` for H1); `--mono` updated to `var(--font-display), system-ui, sans-serif` | Non-UI | `app/globals.css` |
| N19 | All `fontFamily: 'var(--mono)'` inline style call sites replaced with `fontFamily: 'var(--display)', textTransform: 'uppercase', letterSpacing: '0.14em'`; size, weight, and color unchanged at each call site | Non-UI | `PortfolioClient.tsx` (multiple locations) |
| — | All body and descriptive text audited: minimum `font-size: 1rem` (16px equivalent); `line-height` ≥ 1.5 on all body copy, form fields, and descriptive paragraphs; `1.4` values replaced | Non-UI | `PortfolioClient.tsx`, `ContactModal` |
| — | `StripedFig` hardcoded `h` prop / `height` → `aspectRatio` equivalent | Non-UI | `StripedFig` component |

### Demo
- DevTools → Network: no `JetBrainsMono` font file request
- DevTools → Computed styles on body text: font-size in rem, line-height ≥ 1.5
- Focus any contact form input on iOS → no zoom (font-size ≥ 16px enforced)
- Eyebrow labels still visually uppercase mono-style; rendered in Space Grotesk

---

## V8: Touch and Forms

**Covers:** R33, R34, R36, R38, R39, R49

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| U18 | Invisible tap-zone padding on small interactives: "See selected work" text link, "DM @kicksnare ↗" and "Book a slot ↗" contact links, footer links, case-study modal Close button — `display: inline-flex; align-items: center; min-height: 44px; padding: 0 8px`; visual size unchanged | UI | Various in `PortfolioClient`, `CaseStudyModal` |
| N16 | `WorkCard` — `<a href="#">` + `e.preventDefault()` replaced with `<button type="button" onClick={onOpen}>` | Non-UI | `WorkCard` component |
| — | Adjacent tap target spacing audited: minimum 8px gap between all interactive pairs on mobile verified | — | Various |
| — | All primary CTAs and nav links confirm reachable one-handed: bottom bar (thumb zone) + hamburger overlay (thumb zone) | — | `Header`, `BottomBar` |

### Demo
- 375px: tap "See selected work" easily without precision — large invisible tap zone
- 375px: work card opens on single tap
- 375px: contact text links ("DM @kicksnare ↗", "Book a slot ↗") tappable without precision

---

## V9: Keyboard and ARIA

**Covers:** R43, R44, R45, R50, R51, R52 (verify), R54, R55

### Affordances

| # | Affordance | Type | Detail |
|---|------------|------|--------|
| N5 | Global `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }` added to `globals.css`; `.navlink:focus-visible::after` and `.link-uline:focus-visible::after` also trigger underline; bare `outline: none` removed from ContactModal inputs | Non-UI | `app/globals.css` |
| U20 | Visible focus ring on every interactive element when keyboard-navigating | UI | globals.css (applies globally) |
| N17 | `<main>` element wraps all page content between `<header>` and `<footer>` in `PortfolioClient` | Non-UI | `PortfolioClient` |
| N18 | AuditFig `<img>` (in `<foreignObject>`) — `loading="lazy"`, explicit `width={264}` `height={252}`, WebP src; one hero-area `<Image priority />` tag if photography is introduced | Non-UI | `AuditFig` component |
| — | `<nav aria-label="Main">` added to the header nav if a second nav landmark is introduced | Non-UI | `Header` |
| — | All decorative SVGs confirm `aria-hidden="true"` (Soundwave, StripedFig, AuditFig) | Non-UI | `icons.tsx`, `PortfolioClient` |
| — | Any non-decorative image `alt` text present; decorative images have `alt=""` | Non-UI | All `<img>` / `<Image>` tags |
| — | Icon-only interactive elements (hamburger close, modal close) have `aria-label` | Non-UI | `Header`, `CaseStudyModal`, `ContactModal` |

### Demo
- Tab through page — every button, link, and input shows a 2px orange focus ring
- DevTools → Accessibility panel: `main` landmark present; `nav` labelled
- Keyboard only: open and close both modals; submit contact form; navigate all nav links
- No WCAG contrast errors in DevTools Issues tab

---

## Verification Checklist

Run after all slices are complete:

1. `pnpm run dev` → `localhost:3000`
2. DevTools viewport: 375px · 640px · 768px · 1024px · 1440px
3. **375px: no horizontal scroll** — `document.documentElement.scrollWidth === document.documentElement.clientWidth`
4. 375px: all sections 1-col · 24px horizontal pad · hamburger visible · bottom bar appears post-hero
5. 640px: work/pain/process cards gain columns via `auto-fit`
6. 1024px: all desktop grids · 56px pad · pixel-identical to pre-refactor screenshots
7. 1440px: sticky header works (not broken by any `overflow: hidden` on html/body)
8. CaseStudyModal: full-screen at 375px · centered dialog at 1024px · opens at opacity:1
9. ContactModal: full-screen `fixed inset-0` at 375px · opens at opacity:1 · 44px close target
10. Active section: nav link underline follows scroll
11. Bottom bar: appears → hides near contact → reappears on scroll up
12. Network: no `fonts.googleapis.com` · no `JetBrainsMono` font request
13. Keyboard: tab to every interactive → visible focus ring
14. `pnpm tsc --noEmit` — zero errors
