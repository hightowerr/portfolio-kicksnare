# V1: Foundation -- Implementation Plan

**Slice:** V1 from `spicy-forging-storm-slices.md`
**Requirements satisfied:** R15 (tweaks panel NOT ported), R16 (prototype files to components), R17 (case data typed), R18 (font loading mechanism), R19 (`'use client'` audit)
**Affordances:** N6, N7, N1, N2

---

## 1. Overview

V1 extracts foundational infrastructure from the current monolithic `PortfolioClient.tsx` without changing any visual output. It delivers four things:

1. **Case study data module** (`lib/cases.ts`) -- a `CaseStudy` interface and typed `cases` array extracted from the inline `CASES` array currently duplicated in `CaseStudyModal.tsx` (lines 36-140) and the inline `cases` array in the `Work` component (`PortfolioClient.tsx` lines 428-432).
2. **SSR-safe `useIsMobile` hook** (`hooks/useIsMobile.ts`) -- `useState(false)` initial value, `useEffect` hydration-safe update, `< 1024` threshold. Not consumed by any component in V1, but wired for V2+.
3. **Font loading via `next/font/google`** -- Space Grotesk (5 weights) + Crimson Pro imported in `app/layout.tsx`; CSS variables `--font-display` and `--font-serif` injected on `<html>` className. Replaces current `@font-face` declarations for these two families only (Geist + Instrument Serif + JetBrains Mono + Bricolage + Newsreader font-faces remain in V1 -- they are removed in V7).
4. **CSS variable update** -- `--display`, `--serif`, and `--mono` in `globals.css` updated to reference `var(--font-display)` / `var(--font-serif)`, so the font mechanism is wired even though the full family consolidation happens in V7.

The app must render pixel-identically at all viewports after V1. No layout, styling, or behavioral changes.

---

## 2. Files to Create

### 2.1 `lib/cases.ts`

**Purpose:** Single source of truth for all case study data. Replaces inline arrays in both `PortfolioClient.tsx` and `CaseStudyModal.tsx`.

Contains:
- `CaseStudy` interface (matches the `Case` interface currently at `CaseStudyModal.tsx` lines 8-34)
- `HeroCaseStudy` interface for the lighter hero sidebar data (the `projects` array at `PortfolioClient.tsx` lines 213-219)
- `WorkCardCase` interface for the work section card data (the `cases` array at `PortfolioClient.tsx` lines 428-432)
- Exported `cases: CaseStudy[]` array (the full CASES data from `CaseStudyModal.tsx` lines 36-140)
- Exported `heroProjects: HeroCaseStudy[]` derived from the cases + supplementary non-case entries
- Exported `workCards: WorkCardCase[]` derived from the cases

### 2.2 `hooks/useIsMobile.ts`

**Purpose:** SSR-safe boolean hook. Not consumed in V1 but available for V2+.

Contains:
- `'use client'` directive as first line
- `useIsMobile()` function returning `boolean`
- `useState(false)` -- server renders as `false`, no hydration mismatch
- `useEffect` that reads `window.innerWidth < 1024` on mount and attaches a `resize` listener
- Cleanup removes the listener

---

## 3. Files to Modify

| File | What changes |
|------|-------------|
| `app/layout.tsx` | Add `next/font/google` imports for Space Grotesk + Crimson Pro; add font variable classNames to `<html>` |
| `app/globals.css` | Update `--display`, `--serif`, `--mono` CSS custom properties in `:root` to reference `var(--font-display)` / `var(--font-serif)` |
| `components/CaseStudyModal.tsx` | Remove inline `Case` interface and `CASES` array; import from `lib/cases.ts` |
| `components/PortfolioClient.tsx` | Remove inline `projects` array (Hero), inline `cases` array (Work), inline `pains` array (Problem); import from `lib/cases.ts`. Verify `'use client'` is already present (it is, line 1). |

---

## 4. Step-by-step Changes

### Step 1: Create `lib/cases.ts`

Create the file at `/home/yunix/learning-agentic/ideas/portfolio-kicksnare/lib/cases.ts`.

**1a. Define the `CaseStudy` interface**

This is a direct lift of the `Case` interface from `CaseStudyModal.tsx` lines 8-34, renamed to `CaseStudy` for clarity:

```ts
export interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  year: string;
  duration: string;
  role: string;
  stack: string;
  services: string[];
  tone: string;
  // Work card fields (currently separate inline array in PortfolioClient)
  tag: string;
  blurb: string;
  meta: string;
  figure: string;
  problem: {
    lede: string;
    detail: string;
    pains: string[];
  };
  approach: {
    lede: string;
    steps: { n: string; t: string; d: string }[];
    insight: { label: string; body: string };
  };
  solution: {
    shipped: string[];
    figures: { label: string; aspect: string }[];
  };
  result: {
    lede: string;
    stats: { v: string; l: string; sub: string }[];
    quote: { body: string; who: string; role: string };
  };
}
```

The work card fields (`tag`, `blurb`, `meta`, `figure`) are merged into the main interface. Currently they exist only in `PortfolioClient.tsx` Work component (lines 429-431) but not in the CaseStudyModal `Case` interface. Merging avoids a second parallel data structure.

**1b. Define the `HeroProject` interface**

```ts
export interface HeroProject {
  id: string | null;
  name: string;
  meta: string;
}
```

This matches the shape of the `projects` array at `PortfolioClient.tsx` lines 213-219.

**1c. Export the `cases` array**

Merge data from both sources:
- Full case data from `CaseStudyModal.tsx` `CASES` array (lines 36-140) -- 3 entries: `halocrate`, `northbeam`, `mara`
- Work card fields from `PortfolioClient.tsx` `Work` component `cases` array (lines 429-431)

Each entry in the exported `cases: CaseStudy[]` array combines both. For example, `halocrate` gets:
- All existing fields from `CaseStudyModal.tsx` lines 38-73
- Plus `tag: 'Web design . Dev'`, `blurb: 'B2B SaaS marketing site rebuild...'`, `meta: '2025 . 6 wks'`, `figure: 'product . 4:3'` from `PortfolioClient.tsx` line 429

**1d. Export the `heroProjects` array**

```ts
export const heroProjects: HeroProject[] = [
  { id: 'halocrate', name: 'Halocrate', meta: 'B2B SaaS . 2025' },
  { id: 'northbeam', name: 'Northbeam DTC', meta: 'Paid growth . 2025' },
  { id: 'mara', name: 'Studio Mara', meta: 'Booking app . 2024' },
  { id: null, name: 'Lattice OS', meta: 'Web design . 2024' },
  { id: null, name: 'Vela Mobility', meta: 'Brand + site . 2024' },
];
```

Directly from `PortfolioClient.tsx` lines 213-219.

### Step 2: Create `hooks/useIsMobile.ts`

Create the file at `/home/yunix/learning-agentic/ideas/portfolio-kicksnare/hooks/useIsMobile.ts`.

```ts
'use client';

import { useState, useEffect } from 'react';

const MOBILE_THRESHOLD = 1024;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
    check(); // hydration-safe: runs only on client after mount
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}
```

Key design decisions:
- `useState(false)` ensures server render matches initial client render (no hydration mismatch -- R6)
- Threshold is `< 1024` (not `<=`), matching the slices doc N7 specification
- No debounce -- resize listener is cheap for a boolean check; later slices can add if needed
- `'use client'` as first line (R19)

### Step 3: Update `app/layout.tsx`

**3a. Add font imports**

At the top of `layout.tsx`, after the existing `Metadata` import (line 1), add:

```ts
import { Space_Grotesk, Crimson_Pro } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
});
```

This follows the exact specification from the shaping doc "Font Loading (R18 + R32)" section (lines 280-294).

**3b. Add font variable classNames to `<html>`**

Change line 16:
```tsx
// Before:
<html lang="en">

// After:
<html lang="en" className={`${spaceGrotesk.variable} ${crimsonPro.variable}`}>
```

This injects `--font-display` and `--font-serif` as CSS custom properties available globally.

### Step 4: Update `app/globals.css` -- CSS variable wiring

**4a. Update the font family tokens**

In the `:root` block (lines 111-113), change:

```css
/* Before (lines 111-113): */
--display: 'Geist', system-ui, -apple-system, sans-serif;
--serif:   'Instrument Serif', 'Crimson Pro', Georgia, serif;
--mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;

/* After: */
--display: var(--font-display), system-ui, sans-serif;
--serif:   var(--font-serif), Georgia, serif;
--mono:    var(--font-display), system-ui, sans-serif;
```

Notes:
- `--display` now references `var(--font-display)` which resolves to Space Grotesk (loaded by `next/font/google`)
- `--serif` now references `var(--font-serif)` which resolves to Crimson Pro
- `--mono` is aliased to `--font-display` (Space Grotesk) per R32 -- the mono role folds into the display font with uppercase + letter-spacing. The actual `fontFamily: 'var(--mono)'` call site updates happen in V7 (N19), not V1.
- `-apple-system` fallback dropped from `--display` (redundant with `system-ui`)

**4b. Update the `html` rule**

Change line 187:
```css
/* Before: */
html {
  font-family: 'Geist', system-ui, -apple-system, sans-serif;

/* After: */
html {
  font-family: var(--display);
```

This ensures the base font-family resolves through the CSS variable chain.

**Important:** Do NOT remove any `@font-face` declarations in V1. Geist, Instrument Serif, JetBrains Mono, Bricolage Grotesque, Newsreader, and the existing Space Grotesk / Crimson Pro `@font-face` blocks all remain. The `@font-face` declarations for Space Grotesk and Crimson Pro become redundant (next/font/google self-hosts the fonts), but removing them is deferred to V7 to avoid any visual regression risk. The `@font-face` blocks for other families (Geist, Instrument Serif, etc.) are needed until the PAIRS mechanism and tweaks panel references are cleaned up.

### Step 5: Update `components/CaseStudyModal.tsx` -- import shared data

**5a. Remove the local `Case` interface (lines 8-34)**

Delete the entire `interface Case { ... }` block.

**5b. Remove the local `CASES` array (lines 36-140)**

Delete the entire `const CASES: Case[] = [ ... ];` block.

**5c. Add import**

At the top (after existing imports on lines 1-4), add:

```ts
import { cases as CASES, type CaseStudy } from '@/lib/cases';
```

The import alias `cases as CASES` preserves the existing `CASES` variable name used throughout the file (lines 313, 369, 370, 377, 378, 405, etc.) so no other changes are needed in the file.

**5d. Update type references**

Replace all `Case` type annotations with `CaseStudy`:
- Line 158: `{ c: Case; fonts: FontSet; ... }` becomes `{ c: CaseStudy; fonts: FontSet; ... }` (CSHeader)
- Line 202: `{ c: Case; fonts: FontSet }` becomes `{ c: CaseStudy; fonts: FontSet }` (CSProblem)
- Line 224: same (CSApproach)
- Line 252: same (CSSolution)
- Line 280: same (CSResult)
- Line 312: same (CSCta)

### Step 6: Update `components/PortfolioClient.tsx` -- import shared data

**6a. Remove the inline `projects` array from Hero**

Delete lines 213-219 (the `projects` const inside the `Hero` function). Replace with an import reference.

Add to the file's imports:

```ts
import { cases, heroProjects } from '@/lib/cases';
```

**6b. Update Hero component**

Change the Hero component signature and body to use `heroProjects` instead of the local `projects` const. The `projects.map(...)` JSX (lines 260-276) references `p.id`, `p.name`, `p.meta` -- these match the `HeroProject` interface exactly, so no JSX changes needed. Just replace the local `const projects = [...]` with `heroProjects` in the map call, or rename the import:

```ts
import { cases, heroProjects as projects } from '@/lib/cases';
```

Actually, since `projects` is used only inside the Hero function and is a local const, the cleanest approach: import `heroProjects` at the top level and reference it inside Hero. Change the `projects.map(...)` on line 260 to `heroProjects.map(...)`.

**6c. Update Work component**

The Work component (lines 427-457) has an inline `cases` array on lines 428-432. Remove it and use the imported `cases` array. The work card data is accessed as `c.tag`, `c.blurb`, `c.meta`, `c.tone`, `c.figure` -- these fields must exist on the `CaseStudy` interface (which we added in Step 1a).

The `cases.map(...)` on line 452 will now iterate over the full `CaseStudy[]` from `lib/cases.ts`. The `WorkCard` component receives `c` which currently has shape `{ id, tag, name, blurb, meta, tone, figure }`. Since `CaseStudy` is a superset containing all these fields, the WorkCard JSX continues to work. However, the `WorkCard` component's `c` prop type annotation (line 393) must be updated:

```ts
// Before (line 393):
{ c: { id: string; tag: string; name: string; blurb: string; meta: string; tone: string; figure: string }; ... }

// After:
{ c: CaseStudy; ... }
```

Add the type import:
```ts
import { cases, heroProjects, type CaseStudy } from '@/lib/cases';
```

**6d. Remove the `PAIRS` mechanism and `FontSet` type -- NOT in V1**

The `PAIRS` object (lines 10-14), `FontSet` type (line 8), and the font selection logic (lines 853-854) are part of the tweaks panel infrastructure (R15 says do NOT port). However, removing `PAIRS` would change how fonts resolve at runtime, which could cause visual differences. V1 must remain pixel-identical. Therefore:
- `PAIRS`, `FontSet`, and the font selection logic in `PortfolioClient` stay in V1
- They will be cleaned up in V7 when JetBrains Mono is dropped and font families are consolidated

**6e. Remove the inline `pains` array from Problem**

The `pains` array at `PortfolioClient.tsx` lines 352-357 is Problem section data. This data is NOT duplicated in `CaseStudyModal.tsx` and is not case-study-specific -- it's marketing copy for the Problem section. It should NOT be moved to `lib/cases.ts`.

Decision: Leave the `pains` array inline in the Problem component. It is page-level marketing content, not case study data. Only case study data goes to `lib/cases.ts`.

Similarly, the `stats` array (About component, lines 461-466), the `steps` array (Process component, lines 521-526), and the `items` array (Marquee component, line 287) are all marketing page content and remain inline.

**6f. Verify `'use client'` directive (R19)**

`PortfolioClient.tsx` already has `'use client'` on line 1. `CaseStudyModal.tsx` already has `'use client'` on line 1. The two new files:
- `lib/cases.ts` -- pure data, no hooks, does NOT need `'use client'`
- `hooks/useIsMobile.ts` -- uses `useState`/`useEffect`, DOES need `'use client'` (already specified in Step 2)

No existing component files need a `'use client'` directive added.

---

## 5. Verification

From the slices doc V1 Demo checklist:

| Check | How to verify |
|-------|---------------|
| **No `fonts.googleapis.com` requests** | DevTools > Network tab > filter "fonts.googleapis" -- should return zero results. The `next/font/google` mechanism self-hosts font files at build time. |
| **`useIsMobile` hook resolves to `false` on server; no hydration warnings** | Open DevTools console -- zero React hydration mismatch warnings. The hook is not yet consumed by any component in V1, but it can be tested by temporarily importing it. |
| **App renders identically to current at all viewports** | Compare screenshots at 375px, 1024px, 1440px before and after the changes. All sections, fonts, spacing, and colors must match exactly. |
| **`pnpm tsc --noEmit` passes with zero errors** | Run the command -- confirms the `CaseStudy` interface, imports, and type annotations are correct. |
| **`pnpm run dev` starts without errors** | Dev server boots cleanly, page loads at localhost:3000. |

Additional manual checks:
- Confirm the `PAIRS` font selection still works (the "geist-instrument" pair is hardcoded on `PortfolioClient.tsx` line 853) -- the Geist `@font-face` declarations are still present in `globals.css`
- Confirm `--display` / `--serif` / `--mono` CSS variables resolve correctly in DevTools > Elements > Computed
- Confirm `CaseStudyModal` still opens and navigates between all 3 cases
- Confirm `Work` section still shows all 3 cards with correct data

---

## Appendix: Data Flow After V1

```
lib/cases.ts
  exports: cases, heroProjects, CaseStudy, HeroProject
    |
    +-- components/PortfolioClient.tsx
    |     imports: cases (for Work section), heroProjects (for Hero sidebar)
    |
    +-- components/CaseStudyModal.tsx
          imports: cases as CASES, CaseStudy (replaces local Case + CASES)

hooks/useIsMobile.ts
  exports: useIsMobile
    |
    +-- (not consumed in V1 -- wired in V2+)

app/layout.tsx
  next/font/google: spaceGrotesk (--font-display), crimsonPro (--font-serif)
    |
    +-- <html className="..."> injects CSS custom properties
          |
          +-- app/globals.css :root
                --display: var(--font-display), ...
                --serif:   var(--font-serif), ...
                --mono:    var(--font-display), ...
```
