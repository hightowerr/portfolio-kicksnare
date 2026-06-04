# V9: Keyboard and ARIA — Implementation Plan

**Covers:** R43, R44, R45, R50, R51, R52 (verify), R54, R55
**Affordances:** N5, N17, N18, U20
**Prerequisite slices:** V5 (modals), V7 (typography), V8 (touch and forms)

---

## 1. Overview

V9 is the final slice. It adds keyboard accessibility, ARIA semantics, and image optimisation to every interactive and visual element in the codebase. The four deliverables:

1. **Global `:focus-visible` rule** in `globals.css` (N5/U20) — visible focus ring on all interactives; `.navlink` and `.link-uline` underlines triggered on focus; bare `outline: none` removed.
2. **`<main>` landmark** in `PortfolioClient.tsx` (N17/R51) — wraps all page content between `<header>` and `<footer>`.
3. **Image audit** (R43/R44/R45/R50) — the one `<img>` tag (AuditFig foreignObject) gets `loading="lazy"`, explicit `width`/`height`, and WebP src; all decorative images get `alt=""`/`aria-hidden`; all non-decorative images get descriptive `alt`.
4. **ARIA audit** (R55) — contact form inputs get `<label htmlFor>` + `id`; icon-only buttons verified for `aria-label`; `<nav>` landmark gets `aria-label` if needed; decorative SVGs verified for `aria-hidden`.

---

## 2. Files to Modify

| File | Changes |
|------|---------|
| `app/globals.css` | Add `:focus-visible` rule, `.navlink:focus-visible::after`, `.link-uline:focus-visible::after` |
| `components/PortfolioClient.tsx` | Add `<main>` wrapper; remove `outline: none` from ContactModal inputs; add `<label>`+`id` to contact form fields; add `aria-label` to `<nav>`; fix AuditFig `<img>` attributes; verify StripedFig SVG `aria-hidden` |
| `components/CaseStudyModal.tsx` | Verify StripedFig SVG `aria-hidden` (already decorative); no other changes expected |
| `components/icons.tsx` | No changes needed (all decorative icons already have `aria-hidden="true"`; Soundwave has `role="img"` + `aria-label`) |

---

## 3. `:focus-visible` Rule (N5 / U20 / R54)

### 3.1 Add global `:focus-visible` to `globals.css`

Insert after the `.cta-primary:hover .cta-arr` / `.proj-row:hover` rules (after line 245), before the Animations section:

```css
/* ─── Focus ─────────────────────────────────────────────────────────────── */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.navlink:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}

.link-uline:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

This ensures:
- Every interactive element (buttons, links, inputs, textareas) gets a visible 2px orange outline when keyboard-focused.
- `.navlink` and `.link-uline` show their underline pseudo-element on focus, matching the existing hover behavior.
- Mouse clicks do not trigger the ring (`:focus-visible` only fires on keyboard navigation).

### 3.2 Remove bare `outline: none` declarations

There is exactly **one** bare `outline: none` in production code that must be removed:

| File | Location | Current code | Action |
|------|----------|-------------|--------|
| `components/PortfolioClient.tsx` | Line 605, `inputStyle` object inside `ContactModal` | `outline: 'none'` | **Remove this property entirely** |

The `outline: none` in `tweaks-panel.jsx` is prototype-only (R15 — do not port) and is irrelevant.

After removing the inline `outline: none`, the global `:focus-visible` rule will apply to all three contact form fields (name input, email input, message textarea). The `outline-offset: 2px` ensures the ring does not overlap the input border.

### 3.3 Verification

- Tab through the entire page: every button, link, input, and textarea shows a 2px `var(--accent)` (orange) focus ring.
- `.navlink` elements in the header nav show their underline pseudo-element on focus.
- `.link-uline` elements ("See selected work", "Full case studies on request", footer links) show their underline on focus.
- Contact form inputs in the ContactModal show focus rings (no `outline: none` suppressing them).

---

## 4. `<main>` Landmark (N17 / R51)

### 4.1 Where to add it

In `components/PortfolioClient.tsx`, the root `return` is currently (line 869):

```tsx
return (
  <div style={{ fontFamily: fonts.display }}>
    <Header scrolled={scrolled} fonts={fonts} />
    <Hero fonts={fonts} onOpenCase={setOpenCase} />
    <Marquee />
    <AuditOffer fonts={fonts} />
    <Problem fonts={fonts} />
    <Work fonts={fonts} onOpenCase={setOpenCase} />
    <About fonts={fonts} />
    <Process fonts={fonts} />
    <Contact fonts={fonts} />
    <Footer fonts={fonts} />
    {openCase && (
      <CaseStudyModal ... />
    )}
  </div>
);
```

### 4.2 Change

Wrap everything between `<Header>` and `<Footer>` (exclusive) in a `<main>` element:

```tsx
return (
  <div style={{ fontFamily: fonts.display }}>
    <Header scrolled={scrolled} fonts={fonts} />
    <main>
      <Hero fonts={fonts} onOpenCase={setOpenCase} />
      <Marquee />
      <AuditOffer fonts={fonts} />
      <Problem fonts={fonts} />
      <Work fonts={fonts} onOpenCase={setOpenCase} />
      <About fonts={fonts} />
      <Process fonts={fonts} />
      <Contact fonts={fonts} />
    </main>
    <Footer fonts={fonts} />
    {openCase && (
      <CaseStudyModal ... />
    )}
  </div>
);
```

The `<main>` element:
- Has no `id`, `className`, or `style` — it is a semantic wrapper only.
- Wraps all primary page content sections (Hero through Contact).
- Does **not** wrap `<Header>`, `<Footer>`, or `<CaseStudyModal>` — these are outside the main landmark per WCAG conventions.

### 4.3 Verification

- DevTools Accessibility tree shows a `main` landmark.
- Screen readers can "jump to main content" via their landmark navigation.
- No visual change.

---

## 5. Image Audit

### 5.1 Complete inventory of every `<img>` tag in production code

There is exactly **one** `<img>` tag in the production codebase:

| # | File | Line | Location | Current attributes | Decorative? | Changes needed |
|---|------|------|----------|-------------------|-------------|----------------|
| 1 | `components/PortfolioClient.tsx` | 119-123 | Inside `AuditFig`, within `<foreignObject x="448" y="136" width="264" height="252">` | `src="https://images.unsplash.com/..."`, `alt=""`, inline `style` (width/height 100%, objectFit cover, borderRadius 4) | **Yes** — decorative stock photo inside an illustration of a "bad website" | See section 5.2 |

**No other `<img>` or `<Image>` tags exist in production components.** StripedFig components are pure SVG (no `<img>` inside). CaseStudyModal figures use StripedFig (SVG only).

### 5.2 AuditFig `<img>` exception (R45 / N18)

The `<img>` inside `AuditFig` lives within an SVG `<foreignObject>`. Next.js `<Image>` **cannot** be used here because `<foreignObject>` does not support React component rendering of `next/image` (it requires standard HTML elements and has no layout context for Next.js image optimization).

**Current code** (PortfolioClient.tsx lines 118-124):
```tsx
<foreignObject x="448" y="136" width="264" height="252">
  <img
    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=456&q=80"
    alt=""
    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4, display: 'block' }}
  />
</foreignObject>
```

**Required changes:**

| Attribute | Current | New | Reason |
|-----------|---------|-----|--------|
| `loading` | (missing) | `loading="lazy"` | R45 — lazy-load since AuditFig is below the fold |
| `width` | (missing; CSS 100%) | `width={264}` | R45 — explicit intrinsic dimensions prevent layout shift |
| `height` | (missing; CSS 100%) | `height={252}` | R45 — explicit intrinsic dimensions prevent layout shift |
| `src` | Unsplash URL with `auto=format` | Unsplash URL with `&fm=webp` appended (or replace `auto=format` with `fm=webp`) | R45 — serve WebP manually |
| `alt` | `""` | `""` (unchanged) | R50 — decorative image inside a decorative illustration; `alt=""` is correct |
| `style` | Current inline styles | Keep, but `width: '100%'` and `height: '100%'` can coexist with explicit `width`/`height` attributes | Style overrides intrinsic size for layout |

**New code:**
```tsx
<foreignObject x="448" y="136" width="264" height="252">
  <img
    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?fm=webp&fit=crop&w=456&q=80"
    alt=""
    loading="lazy"
    width={264}
    height={252}
    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4, display: 'block' }}
  />
</foreignObject>
```

### 5.3 R43 / R44 — next/image migration

**R43 (all `<img>` to `next/image`):** The only `<img>` in the codebase is the AuditFig foreignObject exception (R45). There are no other `<img>` tags to migrate. R43 is satisfied by the absence of other `<img>` elements.

**R44 (`<Image priority />` on LCP image):** There are currently no `<Image>` components and no photography on the page. The LCP element is text (the hero headline), not an image. If photography is introduced in the future (R46), the hero image would get `<Image priority />`. For now, R44 is satisfied — there is no image that qualifies as the LCP element.

### 5.4 Complete SVG inventory (R50 — decorative vs meaningful)

| # | Component | SVG element | Decorative? | Current ARIA | Changes needed |
|---|-----------|-------------|-------------|--------------|----------------|
| 1 | `Soundwave` (icons.tsx:6) | `<svg role="img" aria-label={label}>` | **No** — brand logo, meaningful | `role="img"` + `aria-label="kicksnare"` | **None** — correctly marked as meaningful image |
| 2 | `ArrowRight` (icons.tsx:18) | `<svg aria-hidden="true">` | Yes — decorative icon within labelled buttons/links | `aria-hidden="true"` | **None** |
| 3 | `ArrowLeft` (icons.tsx:26) | `<svg aria-hidden="true">` | Yes | `aria-hidden="true"` | **None** |
| 4 | `ArrowDiag` (icons.tsx:34) | `<svg aria-hidden="true">` | Yes | `aria-hidden="true"` | **None** |
| 5 | `Plus` (icons.tsx:42) | `<svg aria-hidden="true">` | Yes | `aria-hidden="true"` | **None** |
| 6 | `Close` (icons.tsx:50) | `<svg aria-hidden="true">` | Yes — icon within buttons that have `aria-label` | `aria-hidden="true"` | **None** |
| 7 | `Check` (icons.tsx:58) | `<svg aria-hidden="true">` | Yes | `aria-hidden="true"` | **None** |
| 8 | `StripedFig` (PortfolioClient.tsx:44) | Inner `<svg>` for stripe pattern | Yes — placeholder illustration | No `aria-hidden` on wrapper or SVG | **Add `aria-hidden="true"` to the outer `<svg>` element** |
| 9 | `AuditFig` (PortfolioClient.tsx:66) | `<svg aria-hidden="true">` | Yes — decorative illustration | `aria-hidden="true"` | **None** — already correct |
| 10 | `StripedFig` (CaseStudyModal.tsx:145) | Inner `<svg>` for stripe pattern | Yes — placeholder illustration | No `aria-hidden` on wrapper or SVG | **Add `aria-hidden="true"` to the outer `<svg>` element** |
| 11 | `RotatingWord` (RotatingWord.tsx:73) | Animated clip container `<span>` | Yes — decorative animation (screen-reader text provided separately) | `aria-hidden="true"` on clip container | **None** — already correct |
| 12 | WorkCard inner SVG (PortfolioClient.tsx:399) | `<svg>` stripe pattern inside work card thumbnail | Yes — decorative stripe pattern | No `aria-hidden` | **Add `aria-hidden="true"` to the `<svg>` element** |

### 5.5 StripedFig `aria-hidden` fix

**PortfolioClient.tsx StripedFig** (line 44):
The outer `<svg>` at line 44 currently has no `aria-hidden`. Add `aria-hidden="true"`:
```tsx
<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
```

**CaseStudyModal.tsx StripedFig** (line 145):
The outer `<svg>` at line 145 currently has no `aria-hidden`. Add `aria-hidden="true"`:
```tsx
<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
```

**WorkCard inner SVG** (PortfolioClient.tsx line 399):
The `<svg>` inside the work card thumbnail div. Add `aria-hidden="true"`:
```tsx
<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true" style={...}>
```

### 5.6 R52 — 200% zoom verification

R52 requires that hardcoded `height` values be replaced with `aspect-ratio`. This was addressed in V7 for `StripedFig` (h prop to aspect-ratio). In V9, verify:

- `StripedFig` in PortfolioClient.tsx (line 43): currently uses `height: h` (default 460px). If V7 has already converted this to `aspect-ratio`, no action needed. If V7 has not yet run, this is a V7 dependency — flag but do not implement in V9.
- `AuditFig` (line 61): already uses `aspectRatio: '800 / 520'` — correct, no change needed.

---

## 6. ARIA Audit

### 6.1 Icon-only buttons — `aria-label` check

| # | Component | Button | Current `aria-label` | Changes needed |
|---|-----------|--------|---------------------|----------------|
| 1 | `ContactModal` (PortfolioClient.tsx:632) | Close button (top-right) | `aria-label="Close"` | **None** — already correct |
| 2 | `CaseStudyModal` (CaseStudyModal.tsx:411) | Previous case button | `aria-label="Previous case"` | **None** |
| 3 | `CaseStudyModal` (CaseStudyModal.tsx:414) | Next case button | `aria-label="Next case"` | **None** |
| 4 | `CaseStudyModal` (CaseStudyModal.tsx:418) | Close button | `aria-label="Close"` | **None** |

All icon-only buttons in the codebase already have `aria-label`. No changes needed.

### 6.2 `<nav>` landmark — `aria-label` check (R55)

**Current state:** There is exactly **one** `<nav>` element in production code:

| File | Line | Element | Current attributes | Changes needed |
|------|------|---------|--------------------|----------------|
| `PortfolioClient.tsx` | 192 | `<nav style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>` | No `aria-label` | See below |

**Decision:** R55 says "if multiple `<nav>` landmarks exist, add `aria-label='Main'`". Currently there is only one `<nav>` in the rendered page. However, V3 (Navigation) will add a hamburger mobile overlay that may include a second `<nav>` element. To be safe and explicit:

- **Add `aria-label="Main"` to the existing `<nav>` in Header** (PortfolioClient.tsx line 192). This is harmless if there is only one `<nav>` and required if V3 introduces a second.

```tsx
<nav aria-label="Main" style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>
```

### 6.3 Contact form inputs — `<label htmlFor>` + `id` (R55)

**Current state** (PortfolioClient.tsx lines 686-708): The three form fields have no `<label>` elements and no `id` attributes. They use `placeholder` only:

| # | Field | Line | Current | Changes needed |
|---|-------|------|---------|----------------|
| 1 | Name input | 686-691 | `<input type="text" placeholder="Name" ...>` | Add `id="contact-name"` to input; add `<label htmlFor="contact-name" className="sr-only">Name</label>` above it |
| 2 | Email input | 692-698 | `<input type="email" placeholder="Email" ...>` | Add `id="contact-email"` to input; add `<label htmlFor="contact-email" className="sr-only">Email</label>` above it |
| 3 | Message textarea | 700-707 | `<textarea placeholder="Message" ...>` | Add `id="contact-message"` to textarea; add `<label htmlFor="contact-message" className="sr-only">Message</label>` above it |

**Implementation:** Add a visually-hidden label before each input. The `sr-only` utility class needs to be defined. Add to `globals.css`:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Then in the ContactModal form:

```tsx
<form onSubmit={handleSubmit} noValidate>
  <label htmlFor="contact-name" className="sr-only">Name</label>
  <input
    id="contact-name"
    type="text"
    required
    placeholder="Name"
    value={name}
    onChange={e => setName(e.target.value)}
    style={inputStyle}
  />
  <label htmlFor="contact-email" className="sr-only">Email</label>
  <input
    id="contact-email"
    type="email"
    required
    placeholder="Email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    style={{ ...inputStyle, marginTop: 12 }}
  />
  <label htmlFor="contact-message" className="sr-only">Message</label>
  <textarea
    id="contact-message"
    required
    rows={4}
    placeholder="Message"
    value={message}
    onChange={e => setMessage(e.target.value)}
    style={{ ...inputStyle, marginTop: 12, resize: 'vertical' }}
  />
  ...
</form>
```

### 6.4 Decorative SVGs — `aria-hidden` verification summary

| SVG | `aria-hidden="true"` present? | Action |
|-----|-------------------------------|--------|
| `Soundwave` (icons.tsx) | No — uses `role="img"` + `aria-label` instead (correct for meaningful logo) | **None** |
| `ArrowRight` | Yes | **None** |
| `ArrowLeft` | Yes | **None** |
| `ArrowDiag` | Yes | **None** |
| `Plus` | Yes | **None** |
| `Close` | Yes | **None** |
| `Check` | Yes | **None** |
| `AuditFig` outer SVG | Yes (line 69) | **None** |
| `StripedFig` (PortfolioClient) inner SVG | **No** | **Add `aria-hidden="true"`** |
| `StripedFig` (CaseStudyModal) inner SVG | **No** | **Add `aria-hidden="true"`** |
| WorkCard thumbnail SVG | **No** | **Add `aria-hidden="true"`** |
| `RotatingWord` clip container | Yes (span, not SVG) | **None** |

### 6.5 CaseStudyModal `role="dialog"` verification

The CaseStudyModal (CaseStudyModal.tsx line 396) already has:
- `role="dialog"`
- `aria-modal="true"`
- `aria-label={`Case study: ${c.name}`}`

No changes needed.

### 6.6 ContactModal missing `role="dialog"`

The ContactModal (PortfolioClient.tsx line 610) outer `<div>` has **no** `role="dialog"`, `aria-modal`, or `aria-label`. Add:

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-label="Contact form"
  onClick={onClose}
  style={{ ... }}
>
```

---

## 7. Implementation Order

Execute changes in this order to minimise conflicts:

| Step | File | Change | Req |
|------|------|--------|-----|
| 1 | `app/globals.css` | Add `.sr-only` utility class | R55 |
| 2 | `app/globals.css` | Add `:focus-visible` rule + `.navlink:focus-visible::after` + `.link-uline:focus-visible::after` | R54, N5, U20 |
| 3 | `components/PortfolioClient.tsx` | Remove `outline: 'none'` from `inputStyle` in ContactModal (line 605) | R49, R54 |
| 4 | `components/PortfolioClient.tsx` | Add `<main>` wrapper around Hero through Contact sections | R51, N17 |
| 5 | `components/PortfolioClient.tsx` | Add `aria-label="Main"` to `<nav>` in Header (line 192) | R55 |
| 6 | `components/PortfolioClient.tsx` | Add `role="dialog"`, `aria-modal="true"`, `aria-label="Contact form"` to ContactModal outer div | R55 |
| 7 | `components/PortfolioClient.tsx` | Add `<label htmlFor>` + `id` to all three ContactModal form fields | R55 |
| 8 | `components/PortfolioClient.tsx` | AuditFig `<img>`: add `loading="lazy"`, `width={264}`, `height={252}`; change src to `fm=webp` | R45, N18 |
| 9 | `components/PortfolioClient.tsx` | Add `aria-hidden="true"` to StripedFig inner SVG (line 44) | R50 |
| 10 | `components/PortfolioClient.tsx` | Add `aria-hidden="true"` to WorkCard thumbnail SVG (line 399) | R50 |
| 11 | `components/CaseStudyModal.tsx` | Add `aria-hidden="true"` to StripedFig inner SVG (line 145) | R50 |

---

## 8. Verification

### 8.1 Keyboard navigation test

1. Load `localhost:3000` in Chrome.
2. Press Tab repeatedly through the entire page.
3. **Expected:** Every interactive element (nav links, CTA buttons, "See selected work", work cards, contact cards, footer links) shows a 2px orange (`var(--accent)`) outline ring with 2px offset.
4. `.navlink` elements show underline pseudo-element on focus (same as hover).
5. `.link-uline` elements show underline pseudo-element on focus (same as hover).
6. Contact modal: Tab to each input — focus ring visible (no `outline: none` suppression).
7. Mouse click on an input — no focus ring visible (`:focus-visible` does not trigger on mouse).

### 8.2 Accessibility tree (DevTools)

1. Open DevTools > Accessibility panel.
2. Verify `main` landmark is present and wraps all section content.
3. Verify `nav` landmark has `aria-label="Main"`.
4. Verify `header` and `footer` landmarks are outside `main`.
5. Open ContactModal > verify `dialog` role with `aria-label="Contact form"`.
6. Open CaseStudyModal > verify `dialog` role with `aria-label="Case study: Halocrate"` (already present).

### 8.3 Image / alt text check

1. DevTools > Elements: search for `<img>`. Only one result (AuditFig foreignObject).
2. Verify it has `loading="lazy"`, `width="264"`, `height="252"`, `alt=""`, and `fm=webp` in src.
3. All decorative SVGs: verify `aria-hidden="true"` attribute present.
4. Soundwave SVG: verify `role="img"` + `aria-label="kicksnare"`.

### 8.4 Screenreader smoke test

1. VoiceOver (macOS) or NVDA (Windows): navigate by landmarks.
2. "Main" landmark should be announced; "Navigation: Main" for the nav.
3. Contact form fields should announce their labels ("Name", "Email", "Message").
4. Decorative SVGs should be silent.

### 8.5 `pnpm tsc --noEmit`

Run after all changes. Zero errors expected — all changes are additive HTML attributes and CSS rules.

---

## 9. Summary of all changes

| File | Lines affected | What changes |
|------|---------------|--------------|
| `app/globals.css` | +15 lines (new rules) | `.sr-only` class; `:focus-visible` rule; `.navlink:focus-visible::after`; `.link-uline:focus-visible::after` |
| `components/PortfolioClient.tsx` | ~20 lines modified | Remove `outline: 'none'`; add `<main>` wrapper; `aria-label` on `<nav>`; `role`/`aria-*` on ContactModal; `<label>`+`id` on form fields; AuditFig `<img>` attributes; `aria-hidden` on StripedFig SVG + WorkCard SVG |
| `components/CaseStudyModal.tsx` | 1 line modified | `aria-hidden="true"` on StripedFig SVG |
| `components/icons.tsx` | 0 lines | No changes (all icons already correct) |
