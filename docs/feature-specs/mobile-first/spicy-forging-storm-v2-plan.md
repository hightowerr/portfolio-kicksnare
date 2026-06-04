# V2: Intrinsic Grids -- Implementation Plan

**Slice:** V2 from spicy-forging-storm-slices.md
**Covers:** R0, R1, R3, R4, R5, R12, R21, R22, R27, R29

---

## 1. Overview

This slice converts every hardcoded grid in `PortfolioClient.tsx` from fixed-count `gridTemplateColumns` inline styles to intrinsic CSS Grid layouts. Card grids use `auto-fit`/`minmax` with content-derived floor widths so columns collapse naturally as space shrinks. Sidebar (asymmetric two-column) layouts use `@container` queries so they stack to 1-column when their own container is too narrow, then snap to side-by-side at a content-derived threshold. Section padding switches from hardcoded `56px` to the existing `--wrap-pad-mobile`/`--wrap-pad-desktop` tokens. The footer gets `overflow-x: hidden` to clip the oversized wordmark.

**After this slice:**
- 375px: every section is 1-column, 24px horizontal padding, no horizontal scroll
- 640px+: card grids begin gaining columns as space allows
- 1024px+: all sidebar sections snap to 2-column; layout is pixel-identical to the current desktop design

---

## 2. Files to Modify

| File | Changes |
|------|---------|
| `components/PortfolioClient.tsx` | Replace inline `gridTemplateColumns` on all 10 grid containers; replace inline `padding` on all section wrappers with wrap-pad token classes; add `container-type: inline-size` wrappers for sidebar sections; add CSS class names for `@container`-targeted elements |
| `app/globals.css` | Add `@container` rules for all 6 sidebar layouts; add `footer { overflow-x: hidden }` rule |

---

## 3. Step-by-Step Changes -- Each Grid Container

### 3.1 Header grid

**Current code** (line 186):
```tsx
<div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 56px', gap: 24 }}>
```

**Replacement:**
The header grid is not a card grid or a sidebar layout -- it is a fixed 3-column chrome element. Per the Detail C table, the header keeps `flex` on mobile and switches to `grid grid-cols-[1fr_auto_1fr]` via `@container` at 760px. However, the header `@container` nav collapse is **V3 scope** (N3b). In V2, we only need to update the padding token.

**V2 change:**
```tsx
<div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px var(--wrap-pad-desktop)', gap: 24 }}>
```

> Note: The header padding is a special case -- it does not use `py-[80px]`/`py-[120px]` section vertical padding. The horizontal padding moves from hardcoded `56px` to `var(--wrap-pad-desktop)`. The full mobile collapse to `flex` + `var(--wrap-pad-mobile)` happens in V3 when the `@container` nav rules are added.

---

### 3.2 Hero grid (sidebar layout)

**Current code** (line 229):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'start', marginTop: 28 }}>
```

**Replacement approach:** Wrap the Hero section in a container-query context. The inner grid starts as a single column and snaps to `1.4fr 1fr` at `@container (min-width: 700px)`.

**V2 changes in PortfolioClient.tsx:**

1. The `<section>` wrapper for Hero (line 222) gets `container-type: inline-size` and the wrap-pad token:
```tsx
<section className="wrap" style={{ containerType: 'inline-size', padding: '70px var(--wrap-pad-mobile) 100px' }}>
```

> Note: The `70px` top and `100px` bottom are hero-specific and not the standard section vertical padding, so they stay as-is. Horizontal padding moves from `56px` to `var(--wrap-pad-mobile)` -- the `@container` rule in globals.css will override to `var(--wrap-pad-desktop)` at the sidebar threshold.

2. The inner grid div (line 229) gets a CSS class `hero-grid` and removes the inline `gridTemplateColumns`:
```tsx
<div className="hero-grid" style={{ display: 'grid', gap: 80, alignItems: 'start', marginTop: 28 }}>
```

**globals.css rule:** The `@container` rule in Section 4 below sets `grid-template-columns: 1.4fr 1fr` at `min-width: 700px`.

---

### 3.3 AuditOffer grid (sidebar layout)

**Current code** (line 307):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }}>
```

**V2 changes in PortfolioClient.tsx:**

1. The `<section>` wrapper (line 306) gets `container-type: inline-size` and wrap-pad tokens:
```tsx
<section id="audit" className="wrap" style={{ containerType: 'inline-size', padding: '110px var(--wrap-pad-mobile) 80px' }}>
```

2. The inner grid div (line 307) gets a CSS class `audit-grid` and removes inline `gridTemplateColumns`:
```tsx
<div className="audit-grid" style={{ display: 'grid', gap: 80, alignItems: 'center' }}>
```

**globals.css rule:** `@container (min-width: 640px)` sets `grid-template-columns: 1fr 1.2fr`.

---

### 3.4 Problem outer grid (sidebar layout)

**Current code** (line 360):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
```

**V2 changes in PortfolioClient.tsx:**

1. The `<section>` wrapper (line 359) gets `container-type: inline-size` and wrap-pad tokens:
```tsx
<section className="wrap" style={{ containerType: 'inline-size', padding: '80px var(--wrap-pad-mobile) 80px' }}>
```

2. The inner grid div (line 360) gets a CSS class `problem-grid` and removes inline `gridTemplateColumns`:
```tsx
<div className="problem-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
```

On mobile (default), this is a single-column stack with `gap: 48px` (reduced from 80px to avoid excessive whitespace when stacked). The `@container` rule overrides gap to 80px at the sidebar threshold.

**globals.css rule:** `@container (min-width: 640px)` sets `grid-template-columns: 1fr 2fr; gap: 80px`.

---

### 3.5 Pain cards grid (intrinsic card grid)

**Current code** (line 373):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
```

**Replacement:** Tailwind arbitrary value class for `auto-fit`/`minmax` with a 220px floor.

**V2 change in PortfolioClient.tsx:**
```tsx
<div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]" style={{ gap: 0 }}>
```

> `min(100%, 220px)` ensures that at narrow widths the column never exceeds 100% of the container, forcing a clean 1-col stack. At 220px+ per column, the grid gains columns as space allows. The `gap: 0` is preserved because the pain cards use internal padding and borders for spacing, not grid gap.

---

### 3.6 Work cards grid (intrinsic card grid)

**Current code** (line 451):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
```

**Replacement:** Tailwind arbitrary value class with a 300px floor.

**V2 change in PortfolioClient.tsx:**
```tsx
<div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 lg:gap-7">
```

> Note: `gap-5` = 20px (mobile), `lg:gap-7` = 28px (desktop). The `lg:` here is acceptable because it is a gap refinement, not a grid-column definition (R27 only prohibits `sm:`/`lg:` in grid-column definitions). However, to stay maximally compliant with R27's spirit, an alternative is to use a single `gap: 28px` inline style and accept the slightly wider gap on mobile. The shaping doc Detail C table shows `gap-5 lg:gap-7`, so we follow that exactly.

The Work section wrapper (line 434-435) also needs wrap-pad tokens:
```tsx
<section id="work" style={{ padding: '110px 0 80px' }}>
  <div className="wrap" style={{ padding: '0 var(--wrap-pad-mobile)' }}>
```

> Note: The Work section uses a nested `.wrap` div for padding rather than the section itself, because the section has `padding: '110px 0 80px'` for vertical spacing. The horizontal padding on the inner `.wrap` moves from `56px` to `var(--wrap-pad-mobile)`. The `@container` sidebar rule for the Work section is not needed -- it only contains the card grid, which handles its own column count intrinsically.

---

### 3.7 About outer grid (sidebar layout)

**Current code** (line 471):
```tsx
<div style={{ gridTemplateColumns: '1fr 2fr', display: 'grid', gap: 80, alignItems: 'start' }}>
```

**V2 changes in PortfolioClient.tsx:**

1. The About section is wrapped in a `<section>` (line 469) with `container-type: inline-size`. The inner `.wrap` div (line 470) provides horizontal padding:
```tsx
<section id="about" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '120px 0 100px', containerType: 'inline-size' }}>
  <div className="wrap" style={{ padding: '0 var(--wrap-pad-mobile)' }}>
```

2. The inner grid div (line 471) gets a CSS class `about-grid` and removes inline `gridTemplateColumns`:
```tsx
<div className="about-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
```

**globals.css rule:** `@container (min-width: 640px)` sets `grid-template-columns: 1fr 2fr`.

---

### 3.8 Stats grid (intrinsic card grid)

**Current code** (line 503):
```tsx
<div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
```

**Replacement:** Tailwind arbitrary value class with a 160px floor.

**V2 change in PortfolioClient.tsx:**
```tsx
<div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-6" style={{ marginTop: 80 }}>
```

> `gap-6` = 24px. The original desktop gap was 32px (`gap: 32`). The Detail C table specifies `gap-6` for stats. At desktop widths, the 4 stats fit comfortably with 24px gap. The `marginTop: 80` stays as inline style.

---

### 3.9 Process intro grid (sidebar layout)

**Current code** (line 530):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'end', marginBottom: 56 }}>
```

**V2 changes in PortfolioClient.tsx:**

1. The Process section (line 528) gets `container-type: inline-size` on the `<section>`. The inner `.wrap` div (line 529) gets wrap-pad tokens:
```tsx
<section id="process" style={{ padding: '110px 0 80px', containerType: 'inline-size' }}>
  <div className="wrap" style={{ padding: '0 var(--wrap-pad-mobile)' }}>
```

2. The intro grid div (line 530) gets a CSS class `process-intro-grid` and removes inline `gridTemplateColumns`:
```tsx
<div className="process-intro-grid" style={{ display: 'grid', gap: 80, alignItems: 'end', marginBottom: 56 }}>
```

**globals.css rule:** `@container (min-width: 640px)` sets `grid-template-columns: 1fr 2fr`.

---

### 3.10 Process steps grid (intrinsic card grid)

**Current code** (line 546):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
```

**Replacement:** Tailwind arbitrary value class with a 220px floor.

**V2 change in PortfolioClient.tsx:**
```tsx
<div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]" style={{ gap: 0 }}>
```

> `gap: 0` preserved -- process steps use internal padding and top borders for visual separation.

---

### 3.11 Contact grid (sidebar layout)

**Current code** (line 762):
```tsx
<div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'stretch' }}>
```

**V2 changes in PortfolioClient.tsx:**

1. The Contact `<section>` (line 747) gets `container-type: inline-size`. The inner `.wrap` div (line 748) gets wrap-pad tokens:
```tsx
<section id="contact" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '120px 0 60px', containerType: 'inline-size' }}>
  <div className="wrap" style={{ padding: '0 var(--wrap-pad-mobile)' }}>
```

2. The contact grid div (line 762) gets a CSS class `contact-grid` and removes inline `gridTemplateColumns`:
```tsx
<div className="contact-grid" style={{ marginTop: 56, display: 'grid', gap: 32, alignItems: 'stretch' }}>
```

> On mobile (default), the contact cards stack in a single column with `gap: 20px`. The `@container` rule overrides to `1.6fr 1fr` at 640px. The Detail C table specifies `grid gap-5` (20px) for mobile stacking and `gap: 32px` at the sidebar threshold.

**globals.css rule:** `@container (min-width: 640px)` sets `grid-template-columns: 1.6fr 1fr; gap: 32px`.

---

### 3.12 Footer

**Current code** (line 836-837):
```tsx
<footer style={{ background: 'var(--primary)', color: 'rgba(249,254,253,0.55)', borderTop: '1px solid rgba(249,254,253,0.10)', padding: '52px 0 56px' }}>
  <div className="wrap" style={{ padding: '0 56px' }}>
```

**V2 change:** Add `overflow-x: hidden` to the footer, and use wrap-pad token:
```tsx
<footer style={{ background: 'var(--primary)', color: 'rgba(249,254,253,0.55)', borderTop: '1px solid rgba(249,254,253,0.10)', padding: '52px 0 56px', overflowX: 'hidden' }}>
  <div className="wrap" style={{ padding: '0 var(--wrap-pad-mobile)' }}>
```

**Additionally in globals.css** (belt-and-suspenders):
```css
footer { overflow-x: hidden; }
```

> This clips the oversized wordmark (`clamp(80px, 16vw, 260px)` font-size) that bleeds past the viewport on mobile. Per R21, `overflow-x: hidden` goes on the footer element only -- NOT on `html`/`body`, which would break the sticky header.

---

## 4. @container Rules for globals.css

All rules below are added to `app/globals.css` after the existing utility classes section. Each sidebar section wrapper has `container-type: inline-size` set via inline style in JSX.

```css
/* ─── V2: @container sidebar rules ──────────────────────────────────────── */

/*
 * Sidebar layouts: stacked (1-col) by default, snap to 2-col when
 * the container is wide enough for both columns to be readable.
 *
 * Threshold derivations (R29):
 *   Hero 700px  = headline col ~430px + sidebar ~200px + gap 80px
 *   Others 640px = label col ~200px + content ~360px + gap 80px
 *   Contact 640px = form card ~380px + aside ~180px + gap 80px
 */

/* Hero: 1.4fr 1fr at 700px */
@container (min-width: 700px) {
  .hero-grid {
    grid-template-columns: 1.4fr 1fr;
  }
}

/* Audit: 1fr 1.2fr at 640px */
@container (min-width: 640px) {
  .audit-grid {
    grid-template-columns: 1fr 1.2fr;
  }
}

/* Problem outer: 1fr 2fr at 640px */
@container (min-width: 640px) {
  .problem-grid {
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
}

/* About: 1fr 2fr at 640px */
@container (min-width: 640px) {
  .about-grid {
    grid-template-columns: 1fr 2fr;
  }
}

/* Process intro: 1fr 2fr at 640px */
@container (min-width: 640px) {
  .process-intro-grid {
    grid-template-columns: 1fr 2fr;
  }
}

/* Contact: 1.6fr 1fr at 640px */
@container (min-width: 640px) {
  .contact-grid {
    grid-template-columns: 1.6fr 1fr;
    gap: 32px;
  }
}

/* ─── V2: Section padding ───────────────────────────────────────────────── */

/*
 * Sections that use container-type: inline-size get their desktop
 * horizontal padding restored at the sidebar threshold. Vertical
 * padding scales: 80px mobile -> 120px desktop (R22).
 *
 * Note: The horizontal padding override uses the same @container
 * threshold as the sidebar column switch, since the container is
 * wide enough for desktop padding at the same point it's wide enough
 * for 2-col layout.
 */

@container (min-width: 640px) {
  .audit-grid,
  .problem-grid,
  .about-grid,
  .process-intro-grid,
  .contact-grid {
    /* gap is already set per-rule above where it differs from default */
  }
}

/* ─── V2: Footer overflow ──────────────────────────────────────────────── */

/*
 * R21: clip oversized footer wordmark bleed on mobile.
 * Applied to footer only -- NOT html/body (would break sticky header).
 */
footer {
  overflow-x: hidden;
}
```

### Complete @container rules summary

| CSS class | Container threshold | `grid-template-columns` value | Additional overrides |
|-----------|-------------------|-------------------------------|---------------------|
| `.hero-grid` | `@container (min-width: 700px)` | `1.4fr 1fr` | -- |
| `.audit-grid` | `@container (min-width: 640px)` | `1fr 1.2fr` | -- |
| `.problem-grid` | `@container (min-width: 640px)` | `1fr 2fr` | `gap: 80px` |
| `.about-grid` | `@container (min-width: 640px)` | `1fr 2fr` | -- |
| `.process-intro-grid` | `@container (min-width: 640px)` | `1fr 2fr` | -- |
| `.contact-grid` | `@container (min-width: 640px)` | `1.6fr 1fr` | `gap: 32px` |

---

## 5. Section Wrapper Padding Summary

Every section's horizontal padding moves from hardcoded `56px` to `var(--wrap-pad-mobile)` (24px). At desktop widths, the `@container` sidebar threshold kicks in and the wider container naturally provides more breathing room. Additionally, sections that have their own `@container` can also get desktop padding overrides.

However, since `--wrap-pad-mobile` is 24px and `--wrap-pad-desktop` is 56px, we need a mechanism to switch between them. The cleanest approach in V2 (without `@media` queries for grid columns, per R27/R28) is:

**Approach:** Use `padding-inline: clamp(var(--wrap-pad-mobile), 5vw, var(--wrap-pad-desktop))` as the section padding, which fluidly scales from 24px to 56px. This avoids any breakpoint-based padding switch and is purely fluid.

Alternatively, since V2 already uses `@container` on these section wrappers, we can set `padding: X var(--wrap-pad-mobile)` inline and add a `@container`-based override. But `@container` on the section itself cannot query the section's own width -- it queries the parent container. Since the sections are direct children of the page root (which is full-width), the simplest correct approach is:

**Final approach for padding (R4):**
- Use `padding-inline: var(--wrap-pad-mobile)` as the inline default on all `.wrap` inner divs and section wrappers
- Add a single `@media (min-width: 1024px)` rule in globals.css that overrides `.wrap` padding to `var(--wrap-pad-desktop)` -- this is allowed because R27 only prohibits `sm:`/`lg:` in **grid-column definitions**, not in padding rules
- Alternatively, add the padding override per-section inside each `@container` rule at the sidebar threshold

For maximum consistency, use the `.wrap` class approach:

```css
/* Already exists: .wrap { max-width: var(--wrap-max); margin-inline: auto; } */

/* V2: responsive wrap padding */
.wrap {
  padding-inline: var(--wrap-pad-mobile);
}

@media (min-width: 1024px) {
  .wrap {
    padding-inline: var(--wrap-pad-desktop);
  }
}
```

This means all inline `padding: '0 56px'` and `padding: 'Xpx 56px Ypx'` can be simplified. The `.wrap` class handles horizontal padding globally. Sections only need to set vertical padding inline.

**Revised section wrapper patterns:**

| Section | Current inline padding | V2 replacement |
|---------|----------------------|----------------|
| Hero `<section className="wrap">` | `padding: '70px 56px 100px'` | Remove horizontal pad from inline style; `.wrap` class handles it. `style={{ padding: '70px 0 100px' }}` |
| AuditOffer `<section className="wrap">` | `padding: '110px 56px 80px'` | `style={{ padding: '110px 0 80px' }}` |
| Problem `<section className="wrap">` | `padding: '80px 56px 80px'` | `style={{ padding: '80px 0' }}` |
| Work inner `<div className="wrap">` | `padding: '0 56px'` | Remove inline padding entirely (`.wrap` class provides it) |
| About inner `<div className="wrap">` | `padding: '0 56px'` | Remove inline padding entirely |
| Process inner `<div className="wrap">` | `padding: '0 56px'` | Remove inline padding entirely |
| Contact inner `<div className="wrap">` | `padding: '0 56px'` | Remove inline padding entirely |
| Footer inner `<div className="wrap">` | `padding: '0 56px'` | Remove inline padding entirely |
| Header inner `<div className="wrap">` | `padding: '20px 56px'` | `style={{ padding: '20px 0' }}` (horizontal from `.wrap`) |

---

## 6. Vertical Padding Scaling (R22)

Section vertical padding scales: 80px on mobile, 120px on desktop. This can be handled via the same `@media (min-width: 1024px)` rule or via `clamp()`.

**Approach:** Inline styles already specify section-specific vertical padding values. Rather than creating a one-size-fits-all rule, each section keeps its vertical padding inline but uses reduced values on mobile. Since `@container` on the section queries the parent (page root), and we need the section's own width context for padding, this is best handled with a global class:

```css
/* globals.css */
.section-pad-y {
  padding-block: 80px;
}

@media (min-width: 1024px) {
  .section-pad-y {
    padding-block: 120px;
  }
}
```

Sections that have non-standard vertical padding (Hero: 70px/100px, AuditOffer: 110px/80px, etc.) keep their specific values but scale them proportionally. For V2, we apply this only to sections that use the standard 80px/120px pattern and leave section-specific values as-is.

---

## 7. Container-Type Placement

`container-type: inline-size` must be set on the element whose width the `@container` rules should query. For sidebar sections, this goes on the **section element** (or the `.wrap` div, depending on which element constrains width).

Since `.wrap` has `max-width: var(--wrap-max)` and `margin-inline: auto`, and the `@container` query needs to fire based on the content area width, the `container-type` should go on the `.wrap` div or the section itself. The section is the direct child of the page root and has the padding applied, so the `.wrap` div (which is the section when `className="wrap"` is on the section, or a child div) is the right place.

**Pattern for sections where `className="wrap"` is on the `<section>`:**
```tsx
<section className="wrap" style={{ containerType: 'inline-size', padding: '80px 0' }}>
  <div className="problem-grid" style={{ display: 'grid', gap: 48, alignItems: 'start' }}>
```

**Pattern for sections where `.wrap` is an inner `<div>`:**
```tsx
<section id="about" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '120px 0 100px' }}>
  <div className="wrap" style={{ containerType: 'inline-size' }}>
    <div className="about-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
```

---

## 8. Complete globals.css Additions

```css
/* ═══════════════════════════════════════════════════════════════════════════
   V2: INTRINSIC GRIDS
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Responsive wrap padding (R4) ──────────────────────────────────────── */
.wrap {
  padding-inline: var(--wrap-pad-mobile);
}

@media (min-width: 1024px) {
  .wrap {
    padding-inline: var(--wrap-pad-desktop);
  }
}

/* ─── @container sidebar rules (R27, N3a) ───────────────────────────────── */
/*
 * Threshold derivations (R29):
 *   Hero 700px  = headline col ~430px + sidebar ~200px + gap 80px
 *   Others 640px = label col ~200px + content ~360px + gap 80px
 *   Contact 640px = form card ~380px + aside ~180px + gap 80px
 */

@container (min-width: 700px) {
  .hero-grid {
    grid-template-columns: 1.4fr 1fr;
  }
}

@container (min-width: 640px) {
  .audit-grid {
    grid-template-columns: 1fr 1.2fr;
  }

  .problem-grid {
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }

  .about-grid {
    grid-template-columns: 1fr 2fr;
  }

  .process-intro-grid {
    grid-template-columns: 1fr 2fr;
  }

  .contact-grid {
    grid-template-columns: 1.6fr 1fr;
    gap: 32px;
  }
}

/* ─── Footer overflow clip (R21, U21) ───────────────────────────────────── */
/*
 * Clips oversized wordmark bleed on mobile.
 * On footer only -- NOT html/body (breaks sticky header).
 * Verify: document.documentElement.scrollWidth === clientWidth at 375px.
 */
footer {
  overflow-x: hidden;
}
```

---

## 9. Tailwind Arbitrary Class Reference (Card Grids)

These are the exact Tailwind classes applied directly in JSX -- no globals.css rule needed.

| Grid | Tailwind class string | Floor | Derivation (R29) |
|------|-----------------------|-------|-------------------|
| Pain cards | `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]` | 220px | Title-only cards wrap gracefully at ~220px |
| Work cards | `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 lg:gap-7` | 300px | Card holds thumbnail + title + 2-line description at ~300px |
| Stats | `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-6` | 160px | Number + label pair minimum readable at ~160px |
| Process steps | `grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]` | 220px | Title-only cards wrap gracefully at ~220px |

---

## 10. Summary of All Inline Style Removals

For each container, the following inline style properties are **removed** (replaced by CSS classes or @container rules):

| Container | Removed inline property | Replaced by |
|-----------|------------------------|-------------|
| Hero grid | `gridTemplateColumns: '1.4fr 1fr'` | `@container (min-width: 700px) { .hero-grid { grid-template-columns: 1.4fr 1fr } }` |
| Audit grid | `gridTemplateColumns: '1fr 1.2fr'` | `@container (min-width: 640px) { .audit-grid { ... } }` |
| Problem outer | `gridTemplateColumns: '1fr 2fr'` | `@container (min-width: 640px) { .problem-grid { ... } }` |
| Pain cards | `gridTemplateColumns: '1fr 1fr'` | Tailwind `[grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]` |
| Work cards | `gridTemplateColumns: 'repeat(3, 1fr)'` | Tailwind `[grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]` |
| About grid | `gridTemplateColumns: '1fr 2fr'` | `@container (min-width: 640px) { .about-grid { ... } }` |
| Stats | `gridTemplateColumns: 'repeat(4, 1fr)'` | Tailwind `[grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))]` |
| Process intro | `gridTemplateColumns: '1fr 2fr'` | `@container (min-width: 640px) { .process-intro-grid { ... } }` |
| Process steps | `gridTemplateColumns: 'repeat(4, 1fr)'` | Tailwind `[grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]` |
| Contact grid | `gridTemplateColumns: '1.6fr 1fr'` | `@container (min-width: 640px) { .contact-grid { ... } }` |
| All `.wrap` elements | `padding: '0 56px'` (horizontal) | `.wrap { padding-inline: var(--wrap-pad-mobile) }` + `@media` override |

---

## 11. Verification Checklist

After implementing all changes, verify:

- [ ] **375px -- 1-col stacking:** Every section renders as a single column. No sidebar sections show 2 columns.
- [ ] **375px -- 24px padding:** DevTools computed styles show `padding-left: 24px` and `padding-right: 24px` on all `.wrap` elements.
- [ ] **375px -- no horizontal scroll:** `document.documentElement.scrollWidth === document.documentElement.clientWidth` returns `true`.
- [ ] **375px -- footer wordmark clipped:** The oversized "kicksnare" wordmark does not bleed past the right edge.
- [ ] **640px -- card grids gain columns:** Pain cards (220px floor), process steps (220px floor), and stats (160px floor) show 2+ columns when viewport provides enough space.
- [ ] **640px -- sidebar sections remain 1-col:** Sidebar sections (hero, audit, etc.) are still 1-col because the `.wrap` container at 640px viewport minus padding is below their 640px/700px container thresholds.
- [ ] **1024px -- sidebar sections snap to 2-col:** Hero shows `1.4fr 1fr`, Audit shows `1fr 1.2fr`, Problem/About/Process-intro show `1fr 2fr`, Contact shows `1.6fr 1fr`.
- [ ] **1024px -- 56px padding:** DevTools shows `padding-left: 56px` and `padding-right: 56px` on `.wrap` elements.
- [ ] **1024px -- pixel-identical:** Desktop layout matches the pre-refactor design exactly. Work cards 3-col, stats 4-col, pain cards 2-col, process steps 4-col.
- [ ] **1440px -- max-width:** `.wrap` constrains content to 1440px with auto margins.
- [ ] **Headlines clamp() preserved (R3):** All `clamp()` font-size values unchanged.
- [ ] **CSS token palette preserved (R12):** No token values modified.
- [ ] **Section vertical padding scales (R22):** Sections have 80px vertical padding on mobile, 120px on desktop (for standard sections).
- [ ] **No `sm:grid-cols-*` or `lg:grid-cols-*` in any grid-column definition (R27):** Only `auto-fit`/`minmax` and `@container` rules control grid columns.

---

## 12. Risk Notes

1. **Tailwind arbitrary values with `min()` function:** The syntax `[grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]` contains nested parentheses and commas. Tailwind v4 handles this correctly, but verify the generated CSS is valid.

2. **Container query cascade:** `container-type: inline-size` on a section changes its formatting context. Verify that existing `position: relative` or `overflow` properties on children are not disrupted.

3. **`.wrap` padding conflict:** The existing `.wrap` class only sets `max-width` and `margin-inline: auto`. Adding `padding-inline` to `.wrap` in globals.css means any element with `className="wrap"` AND an inline `padding` style will have the inline style win for the padding shorthand. This is why we remove horizontal padding from inline styles and let the class handle it. Sections that have inline `padding: 'Xpx 0 Ypx'` (vertical only) will not conflict because `padding-inline` and `padding-block` are separate longhands.

4. **`gap` on mobile stacked layouts:** When sidebar grids stack to 1-col, the `gap: 80px` may be excessive. The Problem grid addresses this by defaulting to `gap: 48px` and overriding to `80px` at the `@container` threshold. Other sidebar grids (Audit, About, Process-intro) should be checked -- their 80px gap may look fine vertically, or may need a mobile reduction.
