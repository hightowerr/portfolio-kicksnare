# V4: Hero and Accordions — Implementation Plan

**Covers:** R14, R23, R25, R26, R28 (accordion mode)
**Prerequisite:** V2 (intrinsic grids) and V3 (navigation) complete — `container-type: inline-size` already on section wrappers, `useIsMobile()` hook exists, `@container` rules for sidebars and nav already in `globals.css`.

---

## 1. Overview

V4 makes four sections mobile-aware:

1. **Hero** — reorder headline/CTA/description via CSS `order` so headline + CTA appear above fold on mobile, with description below.
2. **Problem (pain cards)** — convert each pain card into an accordion item: tap to expand/collapse on narrow containers, always-open on wide containers.
3. **Process (steps)** — same accordion pattern; step "Look" (index 0) open by default.
4. **Contact** — on mobile, replace the three-card layout with a single full-width "Contact us" button + quiet text links; desktop unchanged.

The accordion mode switch is driven by `@container (min-width: 520px)` in CSS (per R28 and the spike findings). Individual item open/close state is managed by `useState` with deterministic initial values (per the spike). `useIsMobile()` is used only for the Contact section layout gate — not for any accordion logic.

---

## 2. Files to Modify

| File | Changes |
|------|---------|
| `components/PortfolioClient.tsx` | Hero `order` props on `<Reveal>` wrappers; extract `PainItem` inline component; extract `ProcessStep` inline component; Contact section mobile/desktop branch via `useIsMobile()` |
| `app/globals.css` | `@container (min-width: 520px)` rules for accordion mode; `.pain-item__body` and `.process-step__body` transition rules; `.pain-item__toggle` and `.process-step__toggle` rules |

No new files. Both components (`PainItem`, `ProcessStep`) are defined inline within `PortfolioClient.tsx`, co-located with their parent sections.

---

## 3. Hero Reorder (U4)

**Goal:** On mobile (narrow container), headline + CTA appear together above the fold. Description (P3) moves below CTA. On desktop, order is unchanged (headline, description, CTA top-to-bottom).

**Current structure** (Hero left column, starting at line 230):

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
  <Reveal delay={120}>        {/* Headline (P1) */}
    <h1>...</h1>
  </Reveal>
  <Reveal delay={240}>        {/* Description (P3) */}
    <p>We build everything from...</p>
  </Reveal>
  <Reveal delay={360}>        {/* CTA row (P1) */}
    <div>Request free audit + See selected work</div>
  </Reveal>
</div>
```

**Change:** Add `order` values to the `<Reveal>` `style` prop. The parent flex column already has `display: flex; flex-direction: column`, which respects `order`.

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
  <Reveal delay={120} style={{ order: 1 }}>
    <h1>...</h1>
  </Reveal>
  <Reveal delay={240} style={{ order: 3 }}>
    <p>We build everything from...</p>
  </Reveal>
  <Reveal delay={360} style={{ order: 2 }}>
    <div>Request free audit + See selected work</div>
  </Reveal>
</div>
```

**Result at all viewports:**
- **Mobile (narrow):** Headline (order 1), CTA (order 2), Description (order 3) — CTA is above fold with headline; description yields.
- **Desktop (wide):** Same visual order (1, 2, 3) — headline, CTA, description. This is a change from the current desktop order (headline, description, CTA), but the Content Priority Matrix (P1 > P3) says this order is correct at all sizes. The `order` values are static — no media query or container query needed.

**Note:** The `<Reveal>` component already accepts a `style` prop and spreads it onto its root `<div>`. The `order` property passes through without any component changes.

**Why not @container for this?** The hero section wrapper already has `container-type: inline-size` from V2 for the two-column layout switch. We could add `@container` rules to reset `order` at wide widths, but since the Content Priority Matrix prescribes the same priority order at all sizes (P1 headline > P1 CTA > P3 description), static `order` values produce the correct result everywhere. No conditional logic needed.

---

## 4. PainItem Component (N11, U10)

**Current structure** (Problem section, starting at line 373):

Each pain card is rendered inline in a `.map()` with a `<Reveal>` wrapper containing a static card with title, index number, a decorative `+` icon, heading, and description paragraph — all always visible.

**New structure:** Extract a `PainItem` component. Single always-rendered HTML structure. `useState(false)` drives `data-open`. Toggle button and body use CSS classes for the accordion behavior.

### 4.1 Component Definition

```tsx
function PainItem({ pain, index }: { pain: { t: string; n: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 80}>
      <div
        className="pain-item"
        data-open={String(open)}
        style={{
          padding: '28px 24px 28px 0',
          borderTop: '1px solid var(--line)',
          borderBottom: index >= 2 ? '1px solid var(--line)' : 'none',
        }}
      >
        {/* Header row — always visible */}
        <div className="pain-item__header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '0.06em',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <button
            className="pain-item__toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => setOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 250ms ease',
              transform: open ? 'rotate(45deg)' : 'none',
            }}>
              <Plus size={12} />
            </span>
          </button>
        </div>

        {/* Title — always visible */}
        <h3 style={{
          margin: 0,
          fontFamily: 'var(--display)',   // uses fonts prop in real code
          fontWeight: 500,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
        }}>
          {pain.t}
        </h3>

        {/* Body — accordion wrapper */}
        <div className="pain-item__body">
          <div className="pain-item__inner">
            <p style={{
              margin: '12px 0 0',
              color: 'var(--muted)',
              fontSize: 15,
              lineHeight: 1.5,
            }}>
              {pain.n}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
```

### 4.2 Key Details

- **`data-open` attribute** — set to `"true"` or `"false"` via `String(open)`. CSS targets `[data-open="true"]` for the expand state.
- **Toggle button** — `<button>` with `aria-expanded`. The `<Plus>` icon rotates 45 degrees to form an `x` when open. The toggle button is hidden by `@container` at wide widths (see section 6).
- **Body wrapper** — `.pain-item__body` uses `display: grid; grid-template-rows: 0fr` by default; transitions to `1fr` when `[data-open="true"]`. Inner div has `overflow: hidden`.
- **No `useIsMobile()`** — the toggle is always rendered; CSS hides it on wide containers and forces the body open.
- **`useState(false)`** — all pain cards start closed. Deterministic initial value (does not depend on `window`).
- **`fonts` prop** — the real implementation passes `fonts.display` for `fontFamily` on the heading. Shown as `var(--display)` above for clarity.

### 4.3 Usage in Problem Section

Replace the current `.map()` block (lines 374-385):

```tsx
{/* Before */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
  {pains.map((p, i) => (
    <Reveal key={i} delay={i * 80}>
      <div style={{ ... }}>...</div>
    </Reveal>
  ))}
</div>

{/* After */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
  {pains.map((p, i) => (
    <PainItem key={i} pain={p} index={i} />
  ))}
</div>
```

Note: The grid `gridTemplateColumns` is `'1fr 1fr'` in the current code. V2 should have already converted this to `repeat(auto-fit, minmax(min(100%, 220px), 1fr))`. If V2 is not yet applied when V4 starts, apply the intrinsic grid here as well.

---

## 5. ProcessStep Component (N12, U11)

Same structural pattern as `PainItem`, with one difference: `defaultOpen` based on index.

### 5.1 Component Definition

```tsx
function ProcessStep({
  step,
  index,
  total,
  fonts,
}: {
  step: { t: string; d: string };
  index: number;
  total: number;
  fonts: FontSet;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal delay={index * 100}>
      <div
        className="process-step"
        data-open={String(open)}
        style={{
          padding: '32px 28px 32px 0',
          borderTop: '1px solid var(--line)',
          minHeight: 280,
          position: 'relative',
        }}
      >
        {/* Header row — always visible */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            color: 'var(--muted)',
          }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {index < total - 1 && <ArrowRight size={14} color="var(--muted)" />}
            <button
              className="process-step__toggle"
              type="button"
              aria-expanded={open}
              aria-label={open ? 'Collapse' : 'Expand'}
              onClick={() => setOpen(o => !o)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{
                display: 'inline-block',
                transition: 'transform 250ms ease',
                transform: open ? 'rotate(45deg)' : 'none',
              }}>
                <Plus size={12} />
              </span>
            </button>
          </div>
        </div>

        {/* Step title — always visible */}
        <h3 style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 34,
          lineHeight: 1,
          letterSpacing: '-0.022em',
        }}>
          {step.t}
        </h3>

        {/* Body — accordion wrapper */}
        <div className="process-step__body">
          <div className="process-step__inner">
            <p style={{
              margin: '16px 0 0',
              color: 'var(--muted)',
              fontSize: 15,
              lineHeight: 1.5,
              maxWidth: 260,
            }}>
              {step.d}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
```

### 5.2 Key Differences from PainItem

| Aspect | PainItem | ProcessStep |
|--------|----------|-------------|
| `defaultOpen` | `false` (all closed) | `index === 0` (step "Look" open) |
| CSS class prefix | `.pain-item__*` | `.process-step__*` |
| Toggle placement | Replaces the existing decorative `<Plus>` icon | Placed next to the existing `<ArrowRight>` indicator |
| Container `minHeight` | None (removed from current `minHeight: 200`) | `280` (matches current) |
| `total` prop | Not needed | Needed for "01 / 04" counter |

### 5.3 Usage in Process Section

Replace the current `.map()` block (lines 547-558):

```tsx
{/* Before */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
  {steps.map((s, i) => (
    <Reveal key={i} delay={i * 100}>
      <div style={{ ... }}>...</div>
    </Reveal>
  ))}
</div>

{/* After */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
  {steps.map((s, i) => (
    <ProcessStep key={i} step={s} index={i} total={steps.length} fonts={fonts} />
  ))}
</div>
```

Same note as PainItem: V2 should convert the grid to `repeat(auto-fit, minmax(min(100%, 220px), 1fr))`.

---

## 6. @container Accordion CSS (N3c)

Add these rules to `app/globals.css`. They depend on the parent section wrappers already having `container-type: inline-size` (set in V2).

### 6.1 Base Accordion Styles (always active)

```css
/* ─── Accordion: PainItem ───────────────────────────────────────────────── */
.pain-item__body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 350ms ease;
}
.pain-item[data-open="true"] .pain-item__body {
  grid-template-rows: 1fr;
}
.pain-item__inner {
  overflow: hidden;
}

/* ─── Accordion: ProcessStep ────────────────────────────────────────────── */
.process-step__body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 350ms ease;
}
.process-step[data-open="true"] .process-step__body {
  grid-template-rows: 1fr;
}
.process-step__inner {
  overflow: hidden;
}
```

### 6.2 @container Override (wide containers)

```css
/* ─── Accordion: force open at >=520px container width ──────────────────── */
@container (min-width: 520px) {
  .pain-item__toggle       { display: none; }
  .pain-item__body         { grid-template-rows: 1fr !important; }
  .process-step__toggle    { display: none; }
  .process-step__body      { grid-template-rows: 1fr !important; }
}
```

### 6.3 How It Works

| Container width | Toggle visible? | Body state |
|-----------------|----------------|------------|
| < 520px | Yes | Controlled by `data-open` (0fr / 1fr) |
| >= 520px | No (`display: none`) | Forced `1fr` (always open) |

The `!important` on `grid-template-rows: 1fr` overrides the `[data-open="false"]` default of `0fr`. This means even if `useState` is `false` (which it will be for pain cards on initial render), the body is still visually open on wide containers.

### 6.4 Threshold Rationale (from spike)

The pain card grid uses `minmax(min(100%, 220px), 1fr)`. At 440px container width, the grid wraps to 1 column. The 520px accordion threshold is intentionally above the 440px wrap point — in the 440-520px gap band, cards are 1-column but descriptions are still fully visible. This provides generous breathing room and a better reading experience.

---

## 7. Contact Section Mobile Layout (U12, U13)

**Current structure** (lines 762-824): A two-column grid (`1.6fr 1fr`) containing:
- Left: Large DM @kicksnare card
- Right: Column with "Contact us" button + "Book a slot" link

**Mobile treatment (U12):** Replace the entire grid with a stacked layout:
1. Full-width "Contact us" `<button>` — opens the ContactModal
2. Below: quiet text links row — "DM @kicksnare ↗" and "Book a slot ↗"

**Desktop treatment (U13):** Three-card layout unchanged. R14 ("Book a slot" card preserved) is explicitly satisfied.

### 7.1 Implementation

The Contact component already has `setModalOpen` state for the ContactModal. Gate the layout with `useIsMobile()`:

```tsx
function Contact({ fonts, isMobile }: { fonts: FontSet; isMobile: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="contact" style={{ ... }}>
        <div className="wrap" style={{ padding: '0 56px' }}>
          {/* Eyebrow + Headline — unchanged */}
          <Reveal>...</Reveal>
          <Reveal delay={100}>...</Reveal>

          {/* Layout gate */}
          {isMobile ? (
            <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Full-width primary CTA */}
              <Reveal delay={200}>
                <button
                  onClick={() => setModalOpen(true)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    borderRadius: 999,
                    background: 'var(--accent)',
                    border: 'none',
                    color: '#06372d',
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    fontSize: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  Contact us
                  <ArrowRight size={14} />
                </button>
              </Reveal>

              {/* Quiet text links */}
              <Reveal delay={280}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                }}>
                  <a
                    href="https://x.com/kicksnare12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-uline"
                    style={{
                      color: 'rgba(249,254,253,0.6)',
                      textDecoration: 'none',
                      fontFamily: fonts.display,
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    DM @kicksnare ↗
                  </a>
                  <a
                    href="https://proj-astro-seven.vercel.app/book/kicksnare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-uline"
                    style={{
                      color: 'rgba(249,254,253,0.6)',
                      textDecoration: 'none',
                      fontFamily: fonts.display,
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    Book a slot ↗
                  </a>
                </div>
              </Reveal>
            </div>
          ) : (
            /* Desktop: existing three-card grid — UNCHANGED */
            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'stretch' }}>
              {/* ... existing DM card, Contact us button, Book a slot link ... */}
            </div>
          )}
        </div>
      </section>
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} fonts={fonts} />}
    </>
  );
}
```

### 7.2 Passing `isMobile` to Contact

The `useIsMobile()` hook is already called in `PortfolioClient` (from V1). Pass `isMobile` as a prop to `Contact`:

```tsx
<Contact fonts={fonts} isMobile={isMobile} />
```

### 7.3 SSR Safety

`useIsMobile()` returns `false` on the server (SSR). This means the server always renders the **desktop** layout. On hydration, if the client is mobile, React will re-render with the mobile layout. This is the same pattern used for modals (V5) and is acceptable because:
- The Contact section is far below the fold — it is never part of the initial viewport on any device.
- The flash (if any) is invisible to the user.

This is why `useIsMobile()` is acceptable here but NOT for the accordion (which is above-fold on mobile and would cause a visible layout shift).

---

## 8. SSR Safety Summary

| Feature | Mechanism | SSR initial value | Hydration match? |
|---------|-----------|------------------|-----------------|
| Hero order | CSS `order` property (static) | Same on server and client | Yes — no JS dependency |
| PainItem accordion | `useState(false)` | `data-open="false"` | Yes — collapsed on server and client |
| ProcessStep accordion | `useState(index === 0)` | step 0: `data-open="true"`, rest: `"false"` | Yes — depends only on array index, not `window` |
| Accordion mode (toggle visible / body forced open) | `@container` in CSS | N/A — CSS-only | Yes — no JS render branch |
| Contact mobile/desktop | `useIsMobile()` | `false` (desktop) | Acceptable mismatch — section is below fold |

**Critical invariant:** The accordion components (`PainItem`, `ProcessStep`) never use `useIsMobile()`. The mode switch is 100% CSS via `@container`. The only data-dependent state is `useState(defaultOpen)` where `defaultOpen` is a static value (not derived from `window`). This satisfies R6 (no SSR hydration mismatch for above-the-fold layouts) and R28 (`@container` drives the mode switch).

---

## 9. Verification

### 9.1 Manual Checks

| Viewport | What to check |
|----------|--------------|
| **375px** | Hero: headline visible, then CTA directly below, then description below CTA |
| **375px** | Problem section: all 4 pain card titles visible; descriptions collapsed; tap a title -> description expands smoothly (grid-template-rows transition); tap again -> collapses; `+` icon rotates to `x` on open |
| **375px** | Process section: step "Look" is open by default; steps "Agree", "Build", "Measure" are collapsed; tap to expand each |
| **375px** | Contact section: single full-width "Contact us" button (accent background); below it: "DM @kicksnare ↗" and "Book a slot ↗" as quiet text links |
| **375px** | Tap "Contact us" button -> ContactModal opens |
| **520px** | Accordion toggles disappear; all pain card and process step descriptions visible (forced open) |
| **440-520px** | Pain cards in 1-column layout; descriptions still fully visible (no toggle); this is the intentional gap band |
| **1024px** | Hero: identical to current (headline, CTA, description in flex column) |
| **1024px** | Problem: 2-column pain card grid, all descriptions visible, no toggle buttons |
| **1024px** | Process: 4-column grid, all descriptions visible, no toggle buttons |
| **1024px** | Contact: three-card layout (DM card, Contact us, Book a slot) — unchanged from current |

### 9.2 SSR Verification

1. View page source (not DevTools Elements — actual server HTML)
2. Confirm pain cards render with `data-open="false"` on all 4 items
3. Confirm process steps render with `data-open="true"` on step 0 and `data-open="false"` on steps 1-3
4. Confirm no `useIsMobile` usage in PainItem or ProcessStep component code
5. Confirm zero hydration warnings in browser console

### 9.3 TypeScript

```bash
pnpm tsc --noEmit
```

Zero errors.

### 9.4 Transition Quality

- Expand/collapse animation is smooth (350ms ease) — no jump or flicker
- `+` icon rotation (250ms) feels snappy and completes before the body transition
- No layout shift when toggling (grid-template-rows approach prevents reflow of surrounding content)
