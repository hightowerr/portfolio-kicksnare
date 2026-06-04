# V7: Typography — Implementation Plan

**Slice:** V7 Typography
**Covers:** R18 (complete), R30, R31, R32, R52 (StripedFig), R53
**Files to modify:** `app/layout.tsx`, `app/globals.css`, `components/PortfolioClient.tsx`, `components/CaseStudyModal.tsx`

---

## 1. Overview

V7 is a mechanical, audit-heavy slice that finishes the font-loading migration started in V1 and enforces accessibility minimums across all typography. The work falls into five streams:

1. **Font family cleanup** — Drop JetBrains Mono; alias `--mono` to `--display`; update every `var(--mono)` call site to `var(--display)` with `textTransform: 'uppercase'` and `letterSpacing: '0.14em'`.
2. **rem token migration** — Convert all `--fs-*` CSS tokens from `px` to `rem`; convert all inline `clamp()` expressions to rem-based min/max values.
3. **Line-height audit** — Ensure every body/descriptive text has `lineHeight >= 1.5`.
4. **Body copy minimum 16px audit** — Ensure every body/descriptive `fontSize` is at least `16px` (1rem).
5. **StripedFig aspect-ratio** — Replace hardcoded `height` prop with `aspect-ratio`.

The scope explicitly includes `CaseStudyModal.tsx` — it has 19 `var(--mono)` call sites and multiple font-size / line-height values that need the same treatment.

---

## 2. Files to Modify

| File | Changes |
|------|---------|
| `app/layout.tsx` | Remove JetBrains Mono import (if V1 added it via `next/font`); confirm Space Grotesk has 5 explicit weights; remove `--font-mono` className from `<html>` |
| `app/globals.css` | Remove JetBrains Mono `@font-face` declarations; update `--mono` token; migrate `--fs-*` tokens to rem; update `.navlink` font-size to rem; update `.eyebrow` to reference `--display` |
| `components/PortfolioClient.tsx` | Replace all 15 `fontFamily: 'var(--mono)'` call sites; fix font-size / line-height violations; replace StripedFig `h` prop with `aspect-ratio` |
| `components/CaseStudyModal.tsx` | Replace all 19 `fontFamily: 'var(--mono)'` call sites; fix font-size / line-height violations |

---

## 3. Font Family Cleanup

### 3a. Remove JetBrains Mono @font-face declarations from globals.css

Remove these two blocks (lines 26–39 of current `globals.css`):

```css
/* REMOVE: */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 100 800;
  font-display: swap;
  src: url('/fonts/JetBrainsMono-VariableFont_wght.ttf') format('truetype-variations');
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: italic;
  font-weight: 100 800;
  font-display: swap;
  src: url('/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf') format('truetype-variations');
}
```

### 3b. Update --mono CSS token

```css
/* BEFORE: */
--mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;

/* AFTER: */
--mono: var(--font-display), system-ui, sans-serif;
```

Note: `--font-display` is the CSS variable injected by `next/font/google` for Space Grotesk (set up in V1). The `--mono` token is retained as an alias so any future reference resolves correctly, but all inline call sites are also updated directly.

### 3c. Update .eyebrow class in globals.css

```css
/* BEFORE: */
.eyebrow {
  font-family: var(--mono);
  ...
}

/* AFTER: */
.eyebrow {
  font-family: var(--display);
  ...
}
```

The `.eyebrow` class already has `text-transform: uppercase` and `letter-spacing: var(--tracking-eyebrow)` (0.14em), so no additional properties needed.

### 3d. All var(--mono) call sites in PortfolioClient.tsx (15 sites)

Every `fontFamily: 'var(--mono)'` is replaced with `fontFamily: 'var(--display)'`. Where `textTransform: 'uppercase'` and `letterSpacing: '0.14em'` are not already present on the same element, they are added. Size, weight, and color stay as-is at each site.

| # | Line | Component | Element description | Current letterSpacing | Action |
|---|------|-----------|--------------------|-----------------------|--------|
| 1 | 52 | StripedFig | Placeholder label | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 2 | 190 | Header | "digital" badge | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 3 | 258 | Hero | "Selected projects" label | `0.14em` | `fontFamily` → `'var(--display)'` (letterSpacing already `0.14em`) |
| 4 | 269 | Hero | Project row index ("01", "02", ...) | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'`, add `textTransform: 'uppercase'` |
| 5 | 272 | Hero | Project row meta ("B2B SaaS · 2025") | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |
| 6 | 378 | Problem | Pain card index ("01", "02", ...) | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'`, add `textTransform: 'uppercase'` |
| 7 | 407 | WorkCard | Card overlay labels ("case 01", figure) | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |
| 8 | 416 | WorkCard | Card footer meta (tag + meta) | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |
| 9 | 475 | About | Info card (Based/Reply) | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |
| 10 | 508 | About | Stat label (e.g. "Brief to live site") | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |
| 11 | 551 | Process | Step index ("01 / 04") | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'`, add `textTransform: 'uppercase'` |
| 12 | 650 | ContactModal | "Get in touch" eyebrow | `0.14em` | `fontFamily` → `'var(--display)'` (letterSpacing already `0.14em`, already has `textTransform: 'uppercase'`) |
| 13 | 774 | Contact | DM card eyebrow ("Primary · DMs open") | `0.12em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |
| 14 | 795 | Contact | "Email" card eyebrow | `0.12em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |
| 15 | 814 | Contact | "Availability" card eyebrow | `0.12em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` (already has `textTransform: 'uppercase'`) |

### 3e. All var(--mono) call sites in CaseStudyModal.tsx (19 sites)

Same rule: `fontFamily` → `'var(--display)'`, normalize `letterSpacing` → `'0.14em'`, ensure `textTransform: 'uppercase'` is present.

| # | Line | Component | Element description | Current letterSpacing | Action |
|---|------|-----------|--------------------|-----------------------|--------|
| 1 | 153 | StripedFig (CS) | Figure label | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 2 | 161 | CSHeader | "Case study 01 / 03" + year/duration row | `0.10em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 3 | 174 | CSHeader | Meta key labels (Sector, Role, etc.) | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 4 | 190 | CSSectionHead | Section number + label ("(01) The problem") | `0.14em` | `fontFamily` → `'var(--display)'` (letterSpacing already correct) |
| 5 | 213 | CSProblem | Pain index ("01", "02", "03") | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 6 | 229 | CSApproach | Insight label ("The bet →") | `0.12em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 7 | 240 | CSApproach | Step number ("01", "02", ...) | `0.06em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 8 | 258 | CSSolution | "Deliverables" label | `0.14em` | `fontFamily` → `'var(--display)'` (letterSpacing already correct) |
| 9 | 285 | CSResult | "(04) The result" label | `0.14em` | `fontFamily` → `'var(--display)'` (letterSpacing already correct) |
| 10 | 294 | CSResult | Stat sub-label (e.g. "90-day rolling") | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 11 | 303 | CSResult | Quote role label | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 12 | 319 | CSCta | "(05) Next steps" label | `0.14em` | `fontFamily` → `'var(--display)'` (letterSpacing already correct) |
| 13 | 338 | CSCta | Next case card overlay ("Next case study →" + index) | `0.08em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |
| 14 | 405 | CaseStudyModal | Top bar "Case · 01 / 03" label | `0.10em` | `fontFamily` → `'var(--display)'`, `letterSpacing` → `'0.14em'` |

*Note: Some lines contain multiple `var(--mono)` references on adjacent elements (e.g. lines 161, 338 have two spans in one container). The count of 19 includes every individual style object that references `var(--mono)` on that file.*

### 3f. AuditFig SVG text — special case

Lines 147, 158, 173 in PortfolioClient.tsx use `fontFamily="'JetBrains Mono', monospace"` as SVG attributes (not React style objects). Per R52, AuditFig SVG text at `fontSize="9.5"` is accepted as non-scalable illustration and does NOT need to meet the 16px minimum. However, the font-family reference must be updated:

| Line | Current | Replacement |
|------|---------|-------------|
| 147 | `fontFamily="'JetBrains Mono', monospace"` | `fontFamily="'Space Grotesk', system-ui, sans-serif"` |
| 158 | `fontFamily="'JetBrains Mono', monospace"` | `fontFamily="'Space Grotesk', system-ui, sans-serif"` |
| 173 | `fontFamily="'JetBrains Mono', monospace"` | `fontFamily="'Space Grotesk', system-ui, sans-serif"` |

These are SVG `<text>` elements rendered inside `<foreignObject>` — they reference the font by name, not CSS variable.

---

## 4. rem Token Migration

### 4a. CSS token updates in globals.css

| Token | Current (px) | New (rem) | Equivalent |
|-------|-------------|-----------|------------|
| `--fs-eyebrow` | `11px` | `0.6875rem` | 11px |
| `--fs-meta` | `13px` | `0.8125rem` | 13px |
| `--fs-body-sm` | `14px` | `0.875rem` | 14px |
| `--fs-body` | `16px` | `1rem` | 16px |
| `--fs-body-lg` | `18px` | `1.125rem` | 18px |
| `--fs-lede` | `22px` | `1.375rem` | 22px |
| `--fs-h4` | `22px` | `1.375rem` | 22px |
| `--fs-h3` | `34px` | `2.125rem` | 34px |
| `--fs-h2` | `64px` | `4rem` | 64px |
| `--fs-h1` | `112px` | `7rem` | 112px |
| `--fs-display` | `160px` | `10rem` | 160px |

Note: `--fs-h2`, `--fs-h1`, and `--fs-display` are decorative/display sizes. Per R53, these may keep px if purely decorative, but converting to rem is preferred for consistency. The shaping doc specifies rem for all.

### 4b. Add new token

Add `--fs-ui: 0.875rem` to the token block (same value as `--fs-body-sm`, used for UI chrome text like nav links and buttons).

### 4c. .navlink font-size in globals.css

```css
/* BEFORE: */
.navlink { font-size: 14px; ... }

/* AFTER: */
.navlink { font-size: 0.875rem; ... }
```

### 4d. clamp() expressions — inline styles in PortfolioClient.tsx

Each inline `clamp()` expression is converted from px min/max to rem equivalents (dividing by 16).

| Line | Component | Current | New |
|------|-----------|---------|-----|
| 232 | Hero h1 | `clamp(64px, 8.5vw, 128px)` | `clamp(4rem, 8.5vw, 8rem)` |
| 314 | Audit h2 | `clamp(40px, 5vw, 72px)` | `clamp(2.5rem, 5vw, 4.5rem)` |
| 364 | Problem h2 | `clamp(36px, 4vw, 64px)` | `clamp(2.25rem, 4vw, 4rem)` |
| 440 | Work h2 | `clamp(40px, 5vw, 72px)` | `clamp(2.5rem, 5vw, 4.5rem)` |
| 487 | About h2 | `clamp(48px, 6vw, 80px)` | `clamp(3rem, 6vw, 5rem)` |
| 534 | Process h2 | `clamp(48px, 6vw, 80px)` | `clamp(3rem, 6vw, 5rem)` |
| 755 | Contact h2 | `clamp(72px, 12vw, 160px)` | `clamp(4.5rem, 12vw, 10rem)` |
| 838 | Footer wordmark | `clamp(80px, 16vw, 260px)` | `clamp(5rem, 16vw, 16.25rem)` |

### 4e. clamp() expressions — inline styles in CaseStudyModal.tsx

| Line | Component | Current | New |
|------|-----------|---------|-----|
| 165 | CSHeader h1 | `clamp(56px, 7.5vw, 112px)` | `clamp(3.5rem, 7.5vw, 7rem)` |
| 193 | CSSectionHead h2 | `clamp(36px, 4vw, 56px)` | `clamp(2.25rem, 4vw, 3.5rem)` |
| 287 | CSResult h2 | `clamp(36px, 4vw, 56px)` | `clamp(2.25rem, 4vw, 3.5rem)` |
| 292 | CSResult stat value | `clamp(48px, 6vw, 84px)` | `clamp(3rem, 6vw, 5.25rem)` |
| 320 | CSCta h2 | `clamp(48px, 6vw, 88px)` | `clamp(3rem, 6vw, 5.5rem)` |

---

## 5. Line-height Audit

### 5a. PortfolioClient.tsx — every lineHeight value

| Line | Component | Element | fontSize | Current lineHeight | Role | Verdict | Action |
|------|-----------|---------|----------|-------------------|------|---------|--------|
| 232 | Hero | h1 | clamp(64px..128px) | `0.92` | Display headline | OK — decorative display text, not body copy | No change |
| 239 | Hero | p (description) | 18 | `1.5` | Body | OK | No change |
| 314 | Audit | h2 | clamp(40..72px) | `0.95` | Heading | OK — heading, not body copy | No change |
| 319 | Audit | p (description) | 18 | `1.55` | Body | OK | No change |
| 364 | Problem | h2 | clamp(36..64px) | `0.95` | Heading | OK | No change |
| 368 | Problem | p | 16 | `1.55` | Body | OK | No change |
| 381 | Problem | h3 (pain title) | 22 | `1.2` | Heading | OK — this is a heading, not body copy | No change |
| 382 | Problem | p (pain detail) | 15 | `1.5` | Body/descriptive | **FLAG**: fontSize below 16px (see section 6) but lineHeight OK | fontSize fix only |
| 419 | WorkCard | h3 (card name) | 30 | `1.02` | Heading | OK — card heading | No change |
| 420 | WorkCard | p (blurb) | 15 | `1.5` | Body/descriptive | **FLAG**: fontSize below 16px (see section 6) but lineHeight OK | fontSize fix only |
| 440 | Work | h2 | clamp(40..72px) | `0.95` | Heading | OK | No change |
| 487 | About | h2 | clamp(48..80px) | `0.98` | Heading | OK | No change |
| 491 | About | p | 18 | `1.55` | Body | OK | No change |
| 494 | About | p | 18 | `1.55` | Body | OK | No change |
| 507 | About | stat number | 64 | `1` | Display stat | OK — decorative number | No change |
| 534 | Process | h2 | clamp(48..80px) | `0.94` | Heading | OK | No change |
| 541 | Process | p | 18 | `1.55` | Body | OK | No change |
| 554 | Process | h3 (step title) | 34 | `1` | Heading | OK — heading | No change |
| 555 | Process | p (step description) | 15 | `1.5` | Body/descriptive | **FLAG**: fontSize below 16px (see section 6) but lineHeight OK | fontSize fix only |
| 658 | ContactModal | h2 | 34 | `1.0` | Heading | OK — modal heading | No change |
| 680 | ContactModal | success subtext | 14 | `1.5` | UI text | lineHeight OK; fontSize below 16px — but this is a success confirmation, not body copy. Keep as-is per R30 scope (form inputs + body copy). | No change |
| 711 | ContactModal | error message | 14 | `1.4` | UI feedback | **FLAG**: `lineHeight: 1.4` on text — change to `1.5` | `lineHeight` → `1.5` |
| 755 | Contact | h2 | clamp(72..160px) | `0.92` | Display heading | OK | No change |
| 775 | Contact | @kicksnare12 handle | 56 | `1` | Display | OK — decorative element | No change |
| 838 | Footer | wordmark | clamp(80..260px) | `0.85` | Display | OK — decorative | No change |

### 5b. CaseStudyModal.tsx — every lineHeight value

| Line | Component | Element | fontSize | Current lineHeight | Role | Verdict | Action |
|------|-----------|---------|----------|-------------------|------|---------|--------|
| 165 | CSHeader | h1 | clamp(56..112px) | `0.92` | Display heading | OK | No change |
| 168 | CSHeader | p (tagline) | 22 | `1.3` | Lede/descriptive | **FLAG**: body/descriptive text at `1.3` | `lineHeight` → `1.5` |
| 193 | CSSectionHead | h2 | clamp(36..56px) | `0.98` | Heading | OK | No change |
| 196 | CSSectionHead | p (lede) | 17 | `1.55` | Body | OK | No change |
| 207 | CSProblem | p (lede) | 22 | `1.3` | Lede/descriptive | **FLAG**: body/descriptive text at `1.3` | `lineHeight` → `1.5` |
| 209 | CSProblem | p (detail) | 17 | `1.6` | Body | OK | No change |
| 214 | CSProblem | pain item text | 18 | `1.45` | Body/descriptive | **FLAG**: descriptive text at `1.45` | `lineHeight` → `1.5` |
| 230 | CSApproach | insight quote | 26 | `1.25` | Pull quote | OK — pull quote / display element, not body copy | No change |
| 243 | CSApproach | h3 (step title) | 22 | `1.1` | Heading | OK | No change |
| 244 | CSApproach | p (step desc) | 14.5 | `1.5` | Body/descriptive | **FLAG**: fontSize below 16px (see section 6) but lineHeight OK | fontSize fix only |
| 265 | CSSolution | deliverable text | 15.5 | `1.45` | Body/list item | **FLAG**: descriptive text at `1.45` + fontSize below 16px | `lineHeight` → `1.5`, fontSize fix in section 6 |
| 287 | CSResult | h2 (lede) | clamp(36..56px) | `0.98` | Heading | OK | No change |
| 292 | CSResult | stat value | clamp(48..84px) | `1` | Display stat | OK | No change |
| 300 | CSResult | decorative quote mark | 80 | `0.8` | Decorative | OK | No change |
| 306 | CSResult | quote body | 28 | `1.3` | Pull quote | OK — pull quote / display element | No change |
| 320 | CSCta | h2 | clamp(48..88px) | `0.94` | Heading | OK | No change |
| 323 | CSCta | p (description) | 17 | `1.55` | Body | OK | No change |
| 343 | CSCta | h3 (next case name) | 56 | `0.96` | Display heading | OK | No change |
| 344 | CSCta | p (next case tagline) | 16 | `1.4` | Body/descriptive | **FLAG**: `lineHeight: 1.4` on descriptive text | `lineHeight` → `1.5` |

### 5c. Summary of lineHeight fixes

| File | Line | Current | New |
|------|------|---------|-----|
| `PortfolioClient.tsx` | 711 | `1.4` | `1.5` |
| `CaseStudyModal.tsx` | 168 | `1.3` | `1.5` |
| `CaseStudyModal.tsx` | 207 | `1.3` | `1.5` |
| `CaseStudyModal.tsx` | 214 | `1.45` | `1.5` |
| `CaseStudyModal.tsx` | 265 | `1.45` | `1.5` |
| `CaseStudyModal.tsx` | 344 | `1.4` | `1.5` |

---

## 6. Body Copy Minimum 16px Audit

### 6a. PortfolioClient.tsx — every fontSize value on body/descriptive text

R30 scope: body copy, descriptive paragraphs, form inputs. Excludes: eyebrow/meta labels (decorative chrome at 11px), display headings, stat numbers, nav UI.

| Line | Component | Element | Current fontSize | Role | Verdict | Action |
|------|-----------|---------|-----------------|------|---------|--------|
| 52 | StripedFig | label | 11 | Decorative label on placeholder | OK — decorative chrome | No change |
| 147, 158, 173 | AuditFig | SVG text | 9.5, 9.5, 12 | SVG illustration annotation | OK — accepted as non-scalable illustration (R52) | No change |
| 189 | Header | "kicksnare" wordmark | 18 | Logo/brand | OK | No change |
| 190 | Header | "digital" badge | 11 | Eyebrow/chrome | OK — decorative | No change |
| 199 | Header | CTA "Free audit" | 14 | Button text / UI chrome | OK — button label, not body copy; but note for R30 form input scope: this is a nav CTA, not a form input | No change |
| 232 | Hero | h1 | clamp(64px..128px) | Headline | OK | clamp rem conversion only |
| 239 | Hero | p (description) | 18 | Body | OK (>= 16) | No change |
| 245 | Hero | CTA button text | 16 | Button | OK | No change |
| 251 | Hero | "See selected work" link | 15 | Body/descriptive link | **FLAG**: below 16px | `fontSize` → `16` |
| 258 | Hero | "Selected projects" label | 11 | Eyebrow | OK — decorative chrome | No change |
| 266 | Hero | Project row name | 19 | UI list | OK | No change |
| 269 | Hero | Project row index | 11 | Eyebrow/index | OK — decorative chrome | No change |
| 272 | Hero | Project row meta | 11 | Eyebrow/meta | OK — decorative chrome | No change |
| 291 | Marquee | Marquee text | 16 | Body | OK | No change |
| 314 | Audit | h2 | clamp(40..72px) | Heading | OK | clamp rem only |
| 319 | Audit | p (description) | 18 | Body | OK | No change |
| 329 | Audit | list items | 16 | Body | OK | No change |
| 337 | Audit | CTA button | 16 | Button | OK | No change |
| 364 | Problem | h2 | clamp(36..64px) | Heading | OK | clamp rem only |
| 368 | Problem | p | 16 | Body | OK | No change |
| 378 | Problem | pain index | 11 | Eyebrow | OK | No change |
| 381 | Problem | h3 (pain title) | 22 | Heading | OK | No change |
| 382 | Problem | p (pain description) | 15 | Body/descriptive | **FLAG**: below 16px | `fontSize` → `16` |
| 407 | WorkCard | card overlay label | 11 | Eyebrow | OK | No change |
| 416 | WorkCard | card meta | 11 | Eyebrow | OK | No change |
| 419 | WorkCard | h3 | 30 | Heading | OK | No change |
| 420 | WorkCard | p (blurb) | 15 | Body/descriptive | **FLAG**: below 16px | `fontSize` → `16` |
| 440 | Work | h2 | clamp | Heading | OK | clamp rem only |
| 448 | Work | "Full case studies" link | 14 | UI link | Borderline — this is a navigation/UI link, not body copy. Keep as-is. | No change |
| 475 | About | info card | 11 | Eyebrow/meta | OK | No change |
| 487 | About | h2 | clamp | Heading | OK | clamp rem only |
| 491 | About | p | 18 | Body | OK | No change |
| 494 | About | p | 18 | Body | OK | No change |
| 497 | About | italic quote | 24 | Pull quote | OK | No change |
| 507 | About | stat number | 64 | Display | OK | No change |
| 508 | About | stat label | 11 | Eyebrow | OK | No change |
| 534 | Process | h2 | clamp | Heading | OK | clamp rem only |
| 541 | Process | p | 18 | Body | OK | No change |
| 551 | Process | step index | 11 | Eyebrow | OK | No change |
| 554 | Process | h3 (step title) | 34 | Heading | OK | No change |
| 555 | Process | p (step description) | 15 | Body/descriptive | **FLAG**: below 16px | `fontSize` → `16` |
| 604 | ContactModal | input font-size | 15 | Form input | **FLAG**: below 16px — causes iOS auto-zoom | `fontSize` → `16` |
| 650 | ContactModal | "Get in touch" eyebrow | 11 | Eyebrow | OK | No change |
| 658 | ContactModal | h2 | 34 | Heading | OK | No change |
| 677 | ContactModal | "Message sent." | 20 | UI text | OK | No change |
| 680 | ContactModal | success subtext | 14 | UI confirmation | Borderline — small UI text, not body copy. Keep. | No change |
| 711 | ContactModal | error message | 14 | UI feedback | Keep — this is error feedback text, not body copy | No change |
| 724 | ContactModal | submit button | 14 | Button | OK — button label | No change |
| 755 | Contact | h2 | clamp | Heading | OK | clamp rem only |
| 774 | Contact | DM card eyebrow | 11 | Eyebrow | OK | No change |
| 775 | Contact | @kicksnare12 | 56 | Display | OK | No change |
| 776 | Contact | DM card description | 15 | Body/descriptive | **FLAG**: below 16px | `fontSize` → `16` |
| 777 | Contact | italic guarantee | 18 | Body | OK | No change |
| 795 | Contact | "Email" eyebrow | 10 | Eyebrow | OK | No change |
| 796 | Contact | "Contact us" label | 22 | Heading/label | OK | No change |
| 814 | Contact | "Availability" eyebrow | 10 | Eyebrow | OK | No change |
| 815 | Contact | "Book a slot" label | 22 | Heading/label | OK | No change |
| 838 | Footer | wordmark | clamp(80..260px) | Display | OK | clamp rem only |
| 842 | Footer | links | 14 | UI link (nav) | Keep — footer nav links, not body copy | No change |

### 6b. CaseStudyModal.tsx — every fontSize value on body/descriptive text

| Line | Component | Element | Current fontSize | Role | Verdict | Action |
|------|-----------|---------|-----------------|------|---------|--------|
| 153 | StripedFig | label | 10.5 | Decorative chrome | OK | No change |
| 161 | CSHeader | case/date row | 11 | Eyebrow | OK | No change |
| 165 | CSHeader | h1 | clamp | Heading | OK | clamp rem only |
| 168 | CSHeader | tagline p | 22 | Lede | OK | No change |
| 174 | CSHeader | meta key | 10.5 | Eyebrow | OK | No change |
| 175 | CSHeader | meta value | 15 | Body/descriptive | **FLAG**: below 16px — this is readable content | `fontSize` → `16` |
| 190 | CSSectionHead | section label | 11 | Eyebrow | OK | No change |
| 193 | CSSectionHead | h2 | clamp | Heading | OK | clamp rem only |
| 196 | CSSectionHead | lede p | 17 | Body | OK (>= 16) | No change |
| 207 | CSProblem | lede p | 22 | Lede | OK | No change |
| 209 | CSProblem | detail p | 17 | Body | OK | No change |
| 213 | CSProblem | pain index | 11 | Eyebrow | OK | No change |
| 214 | CSProblem | pain text | 18 | Body | OK | No change |
| 229 | CSApproach | insight label | 11 | Eyebrow | OK | No change |
| 230 | CSApproach | insight body | 26 | Pull quote | OK | No change |
| 240 | CSApproach | step number | 11 | Eyebrow | OK | No change |
| 243 | CSApproach | step title h3 | 22 | Heading | OK | No change |
| 244 | CSApproach | step description p | 14.5 | Body/descriptive | **FLAG**: below 16px | `fontSize` → `16` |
| 258 | CSSolution | "Deliverables" label | 11 | Eyebrow | OK | No change |
| 265 | CSSolution | deliverable text | 15.5 | Body/list | **FLAG**: below 16px | `fontSize` → `16` |
| 285 | CSResult | result label | 11 | Eyebrow | OK | No change |
| 287 | CSResult | h2 | clamp | Heading | OK | clamp rem only |
| 292 | CSResult | stat value | clamp | Display stat | OK | clamp rem only |
| 293 | CSResult | stat label | 16 | Body | OK | No change |
| 294 | CSResult | stat sub | 10.5 | Eyebrow | OK | No change |
| 300 | CSResult | decorative quote mark | 80 | Decorative | OK | No change |
| 302 | CSResult | quote author name | 16 | Body | OK | No change |
| 303 | CSResult | quote role | 11 | Eyebrow | OK | No change |
| 306 | CSResult | quote body | 28 | Pull quote | OK | No change |
| 319 | CSCta | section label | 11 | Eyebrow | OK | No change |
| 320 | CSCta | h2 | clamp | Heading | OK | clamp rem only |
| 323 | CSCta | description p | 17 | Body | OK | No change |
| 327 | CSCta | CTA button | 16 | Button | OK | No change |
| 331 | CSCta | email link | 15 | UI link | **FLAG**: below 16px | `fontSize` → `16` |
| 338 | CSCta | next card overlay | 11 | Eyebrow | OK | No change |
| 343 | CSCta | next case h3 | 56 | Display heading | OK | No change |
| 344 | CSCta | next case tagline p | 16 | Body | OK | No change |
| 347 | CSCta | "Read case" text | 14 | UI link/button | Borderline — small call-to-action text. Keep. | No change |
| 405 | Top bar | case label | 11 | Eyebrow | OK | No change |
| 406 | Top bar | case name | 15 | UI chrome | Borderline — toolbar text. Keep. | No change |
| 407-408 | Top bar | tagline/dash | 14 | UI chrome | OK — toolbar, not body copy | No change |

### 6c. Summary of fontSize fixes (body/descriptive text only)

| File | Line | Element | Current | New | Notes |
|------|------|---------|---------|-----|-------|
| `PortfolioClient.tsx` | 251 | "See selected work" link | `15` | `16` | Hero body link |
| `PortfolioClient.tsx` | 382 | Pain description p | `15` | `16` | Problem section body |
| `PortfolioClient.tsx` | 420 | Work card blurb p | `15` | `16` | Card body text |
| `PortfolioClient.tsx` | 555 | Process step description p | `15` | `16` | Process section body |
| `PortfolioClient.tsx` | 604 | ContactModal input fontSize | `15` | `16` | Form input — iOS zoom fix |
| `PortfolioClient.tsx` | 776 | DM card description | `15` | `16` | Contact section body |
| `CaseStudyModal.tsx` | 175 | Meta value text | `15` | `16` | Header meta values |
| `CaseStudyModal.tsx` | 244 | Approach step description | `14.5` | `16` | Step body text |
| `CaseStudyModal.tsx` | 265 | Deliverable list item text | `15.5` | `16` | Solution list body |
| `CaseStudyModal.tsx` | 331 | Email link text | `15` | `16` | CTA section link |

---

## 7. StripedFig — hardcoded height to aspect-ratio (R52)

### Current (PortfolioClient.tsx, line 41–55)

```tsx
function StripedFig({ h = 460, label = 'hero · 4:3', id = 'hero' }: { h?: number; ... }) {
  return (
    <div style={{ ..., height: h, ... }}>
```

The `h` prop is used directly as a pixel height. At 200% zoom this means the element cannot scale with the layout.

### Replacement

```tsx
function StripedFig({ aspect = '4 / 3', label = 'hero · 4:3', id = 'hero' }: { aspect?: string; label?: string; id?: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, borderRadius: 28, overflow: 'hidden', background: '#EAF3EE', border: '1px solid rgba(6,55,45,0.06)' }}>
```

Changes:
- Type signature: `h?: number` → `aspect?: string` with default `'4 / 3'`
- Style: `height: h` removed → `aspectRatio: aspect` added
- Everything else (SVG, label overlay) stays the same

The only call site for this StripedFig in PortfolioClient is line 42 (default params — used by the Hero section). It currently renders with `h=460`. The new default `aspect='4 / 3'` produces visually similar proportions at typical container widths.

Note: The `StripedFig` in `CaseStudyModal.tsx` (line 142) already uses `aspectRatio: aspect` and does not have an `h` prop — no change needed there.

---

## 8. Verification

After all changes, verify:

### Build check
```bash
pnpm tsc --noEmit  # zero errors
pnpm run dev       # launches without errors
```

### DevTools — Network tab
- [ ] No `JetBrainsMono` font file request (any variant)
- [ ] No `fonts.googleapis.com` CDN request (V1 already handled this)

### DevTools — Computed styles
- [ ] Body text elements show `font-size` in rem (computed value in px should still resolve correctly)
- [ ] All body/descriptive text `line-height` >= 1.5 (check Problem pains, Work blurbs, Process steps, case-study sections)
- [ ] Form inputs show `font-size: 16px` or greater (prevents iOS auto-zoom on focus)

### Visual check
- [ ] Eyebrow labels render in Space Grotesk, uppercase, with 0.14em letter-spacing — visually similar to previous JetBrains Mono appearance
- [ ] AuditFig SVG annotations render in Space Grotesk instead of JetBrains Mono
- [ ] StripedFig placeholder in hero maintains 4:3 proportions
- [ ] All `clamp()` headings scale smoothly from mobile to desktop
- [ ] Footer wordmark does not break layout

### Zoom check (R52)
- [ ] Browser zoom to 200% — StripedFig scales with container (no clipped/overflowing content due to fixed height)

### Content check
- [ ] No text content has changed — only font-family, font-size, line-height, letter-spacing, and text-transform properties were modified
