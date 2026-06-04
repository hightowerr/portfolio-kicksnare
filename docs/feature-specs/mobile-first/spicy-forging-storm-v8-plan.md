# V8: Touch and Forms -- Implementation Plan

**Slice:** V8 from `spicy-forging-storm-slices.md`
**Requirements satisfied:** R33 (all interactive elements min 44x44px tappable area on mobile), R34 (invisible padding / minHeight to reach 44px; visual size unchanged; desktop untouched), R36 (min 8px spacing between adjacent tap targets on mobile), R38 (contact form inputs min height 44px + visible label), R39 (no double-tap for any primary action), R49 (WorkCard `<a href="#">` to `<button type="button">`)
**Affordances:** U18, N16

---

## 1. Overview

V8 makes every interactive element on the page comfortably tappable on mobile. The work splits into two tracks:

1. **WorkCard semantic fix (N16):** Replace the `<a href="#">` + `preventDefault` anti-pattern with a `<button type="button">`, eliminating the need for `preventDefault`, removing a keyboard-trap hazard, and ensuring single-tap activation (R39, R49).

2. **Tap zone inventory (U18):** Audit every small interactive element in the codebase. Any element whose rendered height is below 44px gets invisible padding via `display: inline-flex; align-items: center; min-height: 44px; padding: 0 8px` (or equivalent). The visual appearance and desktop layout must remain unchanged (R34). Large elements (CTA pills, contact cards, hero project rows) already exceed 44px and need no change.

V8 depends on prior slices having already delivered:
- V5: ContactModal form inputs already have `min-height: 44px` and visible `<label>` (U19) -- V8 verifies this, does not re-implement
- V5: ContactModal close button was sized to 44px in the mobile full-screen variant -- V8 verifies
- V3: Hamburger + mobile overlay delivered; nav links in overlay should already be large enough -- V8 verifies
- V6: BottomBar at 52px is already above 44px threshold -- no change needed

---

## 2. Files to Modify

| File | What changes |
|------|-------------|
| `components/PortfolioClient.tsx` | WorkCard: `<a href="#">` to `<button type="button">`; tap-zone styles on "See selected work" link, "Full case studies on request" link, footer links, contact secondary text links |
| `components/CaseStudyModal.tsx` | Tap-zone styles on Close button (34px to 44px), Previous/Next nav buttons (34px to 44px) |
| `app/globals.css` | (Optional) `.tap-zone` utility class if we centralize the pattern; `.navlink` min-height for mobile |

---

## 3. WorkCard Button Fix (N16)

### Current code (`PortfolioClient.tsx` line 397)

```tsx
<a href="#" onClick={(e) => { e.preventDefault(); onOpen(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
```

### Problem

- `<a href="#">` is semantically incorrect -- it declares navigation intent but performs none
- `e.preventDefault()` is required to suppress the browser's default anchor behavior (scroll to top / URL hash change)
- On mobile, some browsers may interpret `<a href="#">` as needing a double-tap to distinguish navigation from hover, violating R39
- Screen readers announce "link" when the element is not a link

### Replacement

```tsx
<button
  type="button"
  onClick={onOpen}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  style={{
    display: 'block',
    width: '100%',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    textAlign: 'left',
    color: 'inherit',
    cursor: 'pointer',
    font: 'inherit',
  }}
>
```

### Style changes required

The `<a>` tag had `textDecoration: 'none'` -- a `<button>` does not need this. The `<button>` inherits no font styles by default, so `font: 'inherit'` is added to preserve text rendering. `background: none; border: none; padding: 0` reset the browser's default button chrome. `width: '100%'` preserves the block-level layout the `display: 'block'` was providing.

The `e.preventDefault()` call is removed entirely -- `<button type="button">` has no default browser action to prevent.

### Impact on hover animation

The `onMouseEnter`/`onMouseLeave` handlers are preserved identically. The hover state drives the card lift (`translateY(-6px)`) and the arrow circle accent -- both reference the `hover` state variable which is unchanged. No visual difference on desktop.

---

## 4. Tap Zone Inventory

For each interactive element, the table below shows: current state, whether it needs the 44px treatment, and the exact change.

### 4.1 Elements that ALREADY meet 44px -- no change needed

| Element | Component | Current size | Why it passes |
|---------|-----------|-------------|---------------|
| **"Request free audit" CTA pill (Hero)** | `Hero` line 245 | `padding: '16px 22px 16px 24px'` = ~52px height | Well above 44px |
| **"Request audit via DM" CTA pill (Audit)** | `AuditOffer` line 337 | `padding: '16px 22px 16px 24px'` = ~52px height | Well above 44px |
| **"Free audit" CTA pill (Header)** | `Header` line 199 | `padding: '11px 16px 11px 18px'` = ~42px height + border gives ~44px | Borderline but acceptable; the pill is a large touch target in practice due to width. On mobile this becomes the BottomBar CTA (V6), so header pill is desktop-only. |
| **Hero project rows** | `Hero` lines 262-267 | `padding: '16px 0'` per row = 19px font + 32px padding = ~51px | Each row exceeds 44px |
| **Contact section DM card** | `Contact` line 766 | `minHeight: 200`, `padding: '36px 36px 36px 40px'` | Massive touch target |
| **Contact "Contact us" button** | `Contact` line 788 | `padding: 24` all sides, `flexGrow: 1` | Well above 44px |
| **Contact "Book a slot" link** | `Contact` line 806 | `padding: 24` all sides, `flexGrow: 1` | Well above 44px |
| **ContactModal close button** | `ContactModal` line 633 | `width: 36, height: 36` | Below 44px -- **but V5 already resizes this to 44px for mobile**. Verify only. |
| **ContactModal submit button** | `ContactModal` line 715 | `padding: '11px 20px'` = ~36px | Below 44px visually, but the full-width placement on mobile makes it easy to tap. V5 should have set min-height on this. Verify and add `minHeight: 44` if missing. |
| **BottomBar "Let's talk"** | `BottomBar` (from V6) | 52px fixed height | Above 44px |
| **Hamburger button** | `Header` (from V3) | Should be >= 44px by V3 spec | Verify only |
| **Mobile overlay nav links** | `Header` (from V3) | Full-width overlay links | Should be large targets. Verify only |
| **CaseStudy "DM @kicksnare on X" CTA** | `CaseStudyModal CSCta` line 327 | `padding: '14px 20px 14px 22px'` = ~48px | Above 44px |

### 4.2 Elements that NEED the 44px tap-zone treatment

---

#### 4.2.1 "See selected work" text link (Hero)

**Location:** `PortfolioClient.tsx` line 251, inside `Hero` component

**Current JSX:**
```tsx
<a href="#work" className="link-uline" style={{ textDecoration: 'none', color: 'var(--ink)', fontFamily: fonts.display, fontSize: 15, fontWeight: 500 }}>See selected work</a>
```

**Current rendered size:** Font size 15px, line-height ~1.2 = ~18px tall. No padding. Far below 44px.

**Change:** Add inline styles for mobile tap zone:
```tsx
<a href="#work" className="link-uline" style={{
  textDecoration: 'none',
  color: 'var(--ink)',
  fontFamily: fonts.display,
  fontSize: 15,
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  padding: '0 8px',
  margin: '0 -8px',  // negative margin offsets the padding so visual position unchanged
}}>See selected work</a>
```

**Visual impact:** None. The negative margin compensates for the horizontal padding, keeping the text in the same position. The 44px min-height is invisible -- the text is vertically centered within the taller hit area. Desktop is unaffected because the element was already inline-flex-friendly.

---

#### 4.2.2 "Full case studies on request" text link (Work section)

**Location:** `PortfolioClient.tsx` line 448, inside `Work` component

**Current JSX:**
```tsx
<a href="#contact" className="link-uline" style={{ textDecoration: 'none', color: 'var(--ink)', fontFamily: fonts.display, fontSize: 14, fontWeight: 500 }}>Full case studies on request →</a>
```

**Current rendered size:** Font size 14px, line-height ~1.2 = ~17px tall. No padding. Far below 44px.

**Change:**
```tsx
<a href="#contact" className="link-uline" style={{
  textDecoration: 'none',
  color: 'var(--ink)',
  fontFamily: fonts.display,
  fontSize: 14,
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  padding: '0 8px',
  margin: '0 -8px',
}}>Full case studies on request →</a>
```

**Visual impact:** None. Same negative-margin technique.

---

#### 4.2.3 Footer "X / Twitter" link

**Location:** `PortfolioClient.tsx` line 843, inside `Footer` component

**Current JSX:**
```tsx
<a className="link-uline" href="https://x.com/kicksnare12" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none' }}>X / Twitter ↗</a>
```

**Current rendered size:** Inherits `fontSize: 14` from the parent div (line 842). Line-height ~1.2 = ~17px. No padding. Below 44px.

**Change:**
```tsx
<a className="link-uline" href="https://x.com/kicksnare12" target="_blank" rel="noopener noreferrer" style={{
  color: 'rgba(249,254,253,0.7)',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  padding: '0 8px',
  margin: '0 -8px',
}}>X / Twitter ↗</a>
```

**Visual impact:** None.

---

#### 4.2.4 Footer "Back to top" link

**Location:** `PortfolioClient.tsx` line 844, inside `Footer` component

**Current JSX:**
```tsx
<a className="link-uline" href="#work" style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none' }}>Back to top ↑</a>
```

**Current rendered size:** Same as above -- 14px font, ~17px tall. Below 44px.

**Change:**
```tsx
<a className="link-uline" href="#work" style={{
  color: 'rgba(249,254,253,0.7)',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  padding: '0 8px',
  margin: '0 -8px',
}}>Back to top ↑</a>
```

**Visual impact:** None.

---

#### 4.2.5 CaseStudyModal Close button

**Location:** `CaseStudyModal.tsx` line 418, using `navBtnStyle` (lines 358-364)

**Current JSX:**
```tsx
<button aria-label="Close" onClick={onClose} style={{ ...navBtnStyle, background: 'var(--primary)', color: 'var(--paper)', border: '1px solid var(--ink)' }}>
  <Close size={13}/>
</button>
```

**Current `navBtnStyle`:**
```tsx
const navBtnStyle: React.CSSProperties = {
  appearance: 'none', cursor: 'pointer',
  width: 34, height: 34, borderRadius: 999,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: '#fff', border: '1px solid rgba(6,55,45,0.12)',
  color: 'var(--ink)',
};
```

**Current rendered size:** 34x34px. Below the 44px minimum.

**Change:** The `navBtnStyle` is shared between the Previous, Next, and Close buttons. All three are 34px. Rather than changing the visual size (which would alter the design), we apply a transparent tap-zone expansion. Two approaches:

**Approach A -- increase the shared style:** Change `width: 44, height: 44` in `navBtnStyle`. This changes the visual size of all three buttons. Simple but alters the design.

**Approach B -- invisible padding via pseudo-element or wrapper:** Keep the visual at 34px but add a `::before` pseudo-element or `position: relative` with a larger hit area. Since these are inline styles (no CSS class), the cleanest approach is to set `minWidth: 44, minHeight: 44` on each button and keep the inner content centered. The border-radius 999 means the visible circle grows from 34px to 44px. This is a 10px visual change.

**Recommended approach:** On mobile (gated by `isMobile` which is already available in CaseStudyModal via V5), override the button dimensions to 44px. On desktop, keep 34px. Since V5 already added `useIsMobile()` to CaseStudyModal (N14), we can conditionally apply sizing:

```tsx
const navBtnSize = isMobile ? 44 : 34;

const navBtnStyle: React.CSSProperties = {
  appearance: 'none', cursor: 'pointer',
  width: navBtnSize, height: navBtnSize, borderRadius: 999,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: '#fff', border: '1px solid rgba(6,55,45,0.12)',
  color: 'var(--ink)',
};
```

**Visual impact:** On mobile, the three toolbar buttons grow from 34px to 44px circles. This is a minor, acceptable visual change that improves usability. On desktop, unchanged.

---

#### 4.2.6 CaseStudyModal Previous button

**Location:** `CaseStudyModal.tsx` line 411

**Current JSX:**
```tsx
<button aria-label="Previous case" onClick={() => onOpen(CASES[(cIdx - 1 + CASES.length) % CASES.length].id)} style={navBtnStyle}>
  <ArrowLeft size={14}/>
</button>
```

**Current rendered size:** 34x34px via `navBtnStyle`.

**Change:** Covered by the `navBtnSize` change in 4.2.5 above. No additional work needed.

---

#### 4.2.7 CaseStudyModal Next button

**Location:** `CaseStudyModal.tsx` line 414

**Current JSX:**
```tsx
<button aria-label="Next case" onClick={() => onOpen(CASES[(cIdx + 1) % CASES.length].id)} style={navBtnStyle}>
  <ArrowRight size={14}/>
</button>
```

**Current rendered size:** 34x34px via `navBtnStyle`.

**Change:** Covered by the `navBtnSize` change in 4.2.5 above. No additional work needed.

---

#### 4.2.8 CaseStudyModal "hi@kicksnare.studio" email link (CSCta section)

**Location:** `CaseStudyModal.tsx` line 331

**Current JSX:**
```tsx
<a href="mailto:hi@kicksnare.studio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fonts.display, fontWeight: 500, fontSize: 15, padding: '14px 4px', textDecoration: 'none', color: 'var(--ink)', borderBottom: '1px solid rgba(6,55,45,0.25)' }}>
  hi@kicksnare.studio
</a>
```

**Current rendered size:** `padding: '14px 4px'` gives 28px vertical padding + ~18px text = ~46px. This already exceeds 44px. **No change needed.**

---

#### 4.2.9 Header nav links (desktop)

**Location:** `PortfolioClient.tsx` lines 193-196

**Current JSX:**
```tsx
<a className="navlink" href="#work">Work</a>
<a className="navlink" href="#audit">Audit</a>
<a className="navlink" href="#about">About</a>
<a className="navlink" href="#contact">Contact</a>
```

**Current CSS** (from `globals.css` lines 209-216):
```css
.navlink {
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  position: relative;
}
```

**Current rendered size:** 14px font, no padding, ~17px tall. Below 44px.

**Context:** On mobile (post-V3), these desktop nav links are hidden behind `@container` rules. The hamburger overlay provides the mobile navigation with its own large touch targets. Therefore these desktop nav links do NOT need the 44px treatment -- they are never tappable on mobile. **No change needed for R33 compliance.** If the nav links are still visible at tablet widths between the `@container` breakpoint and 1024px, they should get the treatment. This is an edge case to verify during implementation.

**Conditional change (if visible at tablet):** Add to `globals.css`:
```css
.navlink {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}
```

This is safe for desktop too -- the text is simply vertically centered within a 44px hit area, which does not change the visible layout since the header has `alignItems: 'center'` and is already taller than 44px.

---

#### 4.2.10 ContactModal submit button (verify V5)

**Location:** `PortfolioClient.tsx` line 715 (ContactModal, inline component)

**Current JSX:**
```tsx
<button
  type="submit"
  disabled={status === 'loading'}
  style={{
    marginTop: 20,
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: 'var(--accent)',
    border: 'none',
    color: '#06372d',
    fontFamily: fonts.display, fontWeight: 500, fontSize: 14,
    padding: '11px 20px',
    borderRadius: 999,
    cursor: status === 'loading' ? 'default' : 'pointer',
    opacity: status === 'loading' ? 0.7 : 1,
    transition: 'opacity .2s',
  }}
>
```

**Current rendered size:** `padding: '11px 20px'` = 22px vertical padding + 14px font = ~36px. Below 44px.

**Change:** V5 (U19) specifies `min-height: 44px` for form inputs but does not explicitly cover the submit button. Add `minHeight: 44` to the submit button style:

```tsx
padding: '11px 20px',
minHeight: 44,
```

**Visual impact:** Minimal -- the button grows from ~36px to 44px tall. The border-radius 999 pill shape scales gracefully.

---

### 4.3 Contact section mobile text links (V4 dependency)

V4 (U12) introduces the mobile contact layout with "DM @kicksnare" and "Book a slot" as quiet text links. These elements do not exist in the current codebase -- they are created by V4. When V4 creates these links, they must include the tap-zone treatment from the start:

```tsx
<a href="..." style={{
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  padding: '0 8px',
  margin: '0 -8px',
  // ... other styles
}}>DM @kicksnare ↗</a>
```

**Action for V8:** Verify that V4's implementation of U12 included these styles. If not, add them.

---

## 5. Adjacent Spacing Audit (R36)

R36 requires minimum 8px spacing between all adjacent tap targets on mobile. Below is an audit of every pair of adjacent interactive elements.

### 5.1 Hero CTA area

**Elements:** "Request free audit" pill + "See selected work" text link (lines 244-252)

**Current spacing:** Parent flex has `gap: 22` (line 244). After the tap-zone treatment on "See selected work", the invisible padding extends 8px on each side, but the `gap: 22` between flex children still governs the visual gap. The actual tappable-area gap becomes `22px - 8px (right padding of pill area) = 14px`. Passes 8px minimum.

### 5.2 Footer links

**Elements:** "X / Twitter" + "Back to top" (lines 843-844)

**Current spacing:** Parent flex has `justifyContent: 'space-between'`, so the two links are at opposite ends of the footer width. On even the smallest viewport (375px), there is substantial space between them. No adjacency risk.

### 5.3 CaseStudyModal toolbar buttons

**Elements:** Previous button + Next button + Close button (lines 411-418)

**Current spacing:** Parent flex has `gap: 10` (line 410). After expanding buttons from 34px to 44px on mobile, the gap remains 10px between button edges. Passes 8px minimum.

### 5.4 CaseStudyModal CTA area

**Elements:** "DM @kicksnare on X" CTA pill + "hi@kicksnare.studio" email link (lines 327-333)

**Current spacing:** Parent flex has `gap: 14, flexWrap: 'wrap'` (line 326). At 14px gap, the two elements have adequate spacing. On mobile where they may wrap to separate lines, the vertical gap is also 14px. Passes.

### 5.5 Header nav links (desktop only)

**Elements:** "Work", "Audit", "About", "Contact" (lines 193-196)

**Current spacing:** Parent flex has `gap: 36` (line 192). Even with the optional 44px min-height treatment, horizontal gap is 36px. Passes by a wide margin.

### 5.6 Contact section mobile (V4)

**Elements:** Full-width "Contact us" button + "DM @kicksnare" text link + "Book a slot" text link

**Spacing:** This layout is created by V4. The text links should be in a flex row with `gap >= 8px`. V8 verifies this. The "Contact us" button and text links are in separate layout regions (button above, links below), so vertical spacing between them needs verification -- should be at least 8px.

### 5.7 Hero project list

**Elements:** Project rows (lines 260-276)

**Current spacing:** Each row has `padding: '16px 0'` and is separated by `borderTop: '1px solid var(--line)'`. Adjacent tap targets (rows) have zero gap between their borders but the padding provides internal spacing. The tappable area of each row is the row itself (51px+), and rows are visually delineated by the border. Since each row IS the tap target (not overlapping), there is no spacing issue -- the border between rows acts as the boundary. Passes by definition.

### 5.8 Pain card "+" icons (accordion triggers from V4)

**Elements:** Pain card toggle buttons

**Spacing:** Each pain card is in a grid cell. On mobile (1-column), cards stack vertically with their own padding. The toggle button is within the card, not adjacent to another interactive element. Passes.

---

## 6. Form Input Height Verification (R38)

R38 requires contact form inputs to have minimum height 44px with visible labels.

### Current state (pre-V5)

**ContactModal `inputStyle`** (`PortfolioClient.tsx` lines 595-607):
```tsx
const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1px solid rgba(249,254,253,0.18)',
  background: 'rgba(249,254,253,0.06)',
  color: 'var(--paper)',
  fontFamily: fonts.display,
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
};
```

**Current rendered height:** `padding: '12px 16px'` = 24px vertical padding + 15px font at ~1.2 line-height = ~42px. Just below 44px.

### V5 expectation

V5 (U19) should have:
1. Added `minHeight: 44` to `inputStyle`
2. Added visible `<label>` elements above each input
3. Raised background to `rgba(249,254,253,0.10)` (N20)
4. Removed `outline: 'none'` (deferred to V9 for the focus-visible ring)

### V8 action

Verify V5 delivered all four items. If `minHeight: 44` is missing from `inputStyle`, add it:

```tsx
const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  minHeight: 44,
  // ... rest unchanged
};
```

---

## 7. Double-Tap Prevention (R39)

R39 requires no double-tap for any primary action. The key risk factors:

1. **`<a href="#">` anti-pattern:** Eliminated by N16 (WorkCard button fix). This was the primary double-tap risk -- mobile Safari sometimes treats `<a href="#">` with `preventDefault` as needing a double-tap because the first tap triggers the `:hover` state.

2. **`:hover`-gated content:** The WorkCard hover animation (`translateY(-6px)`) and arrow accent color are purely visual enhancements. No content or functionality is gated behind hover. After the `<button>` conversion, the `onMouseEnter`/`onMouseLeave` handlers are inert on touch devices. Safe.

3. **Contact section cards with `onMouseEnter`/`onMouseLeave`:** Lines 770-771 and 810-811 use inline `onMouseEnter`/`onMouseLeave` to change background color. These are `<a>` tags with real `href` attributes (external URLs), so the browser navigates on single tap. The hover effect is cosmetic. Safe.

4. **`<a>` tags with real hrefs:** All remaining `<a>` tags in the codebase have genuine `href` values (`#work`, `#audit`, `#contact`, external URLs). These respond to single tap natively. Safe.

**No additional changes needed for R39** beyond the WorkCard fix.

---

## 8. Implementation Order

1. **WorkCard button fix** -- `PortfolioClient.tsx` WorkCard component (line 397). Replace `<a href="#">` with `<button type="button">`. Update styles. Test that card opens on single tap.

2. **CaseStudyModal nav button sizing** -- `CaseStudyModal.tsx`. Make `navBtnStyle` dimensions responsive (34px desktop, 44px mobile via `isMobile`). Affects Close, Previous, and Next buttons.

3. **Tap zone: "See selected work"** -- `PortfolioClient.tsx` line 251. Add `display: inline-flex; align-items: center; min-height: 44px; padding: 0 8px; margin: 0 -8px`.

4. **Tap zone: "Full case studies on request"** -- `PortfolioClient.tsx` line 448. Same treatment.

5. **Tap zone: Footer links** -- `PortfolioClient.tsx` lines 843-844. Same treatment on both.

6. **Tap zone: `.navlink` CSS** -- `globals.css`. Add `display: inline-flex; align-items: center; min-height: 44px` to `.navlink` rule. This is safe for desktop (header is already taller than 44px).

7. **ContactModal submit button** -- `PortfolioClient.tsx` line 715. Add `minHeight: 44`.

8. **Verify V4/V5 deliverables** -- Check mobile contact text links (V4 U12) and form inputs (V5 U19) for tap-zone compliance.

---

## 9. Verification

| Check | How to verify |
|-------|---------------|
| **WorkCard single-tap opens modal** | 375px viewport in DevTools, click a work card -- modal opens immediately without delay or double-tap behavior |
| **WorkCard is `<button>` in DOM** | DevTools Elements panel: work card wrapper is `<button type="button">`, not `<a>` |
| **"See selected work" tap zone** | DevTools: inspect element, computed height >= 44px; padding visible in box model |
| **"Full case studies on request" tap zone** | Same as above |
| **Footer links tap zone** | DevTools: both footer links show computed height >= 44px |
| **CaseStudyModal Close button >= 44px on mobile** | Open a case study at 375px, inspect the Close button -- width and height should be 44px |
| **CaseStudyModal Prev/Next buttons >= 44px on mobile** | Same inspection on Previous and Next buttons |
| **Adjacent spacing >= 8px** | For each pair in the audit above, use DevTools to measure the gap between tappable areas |
| **Form inputs >= 44px** | Open ContactModal at 375px, inspect each input -- computed height >= 44px |
| **No visual regression on desktop** | 1024px+ viewport: all elements look identical to pre-V8 state. WorkCard card layout, footer, hero CTA area unchanged. |
| **`pnpm tsc --noEmit` passes** | TypeScript compiles without errors after `<a>` to `<button>` conversion |
| **No hover-gated functionality** | Tab through all interactive elements on desktop -- no content is only accessible via hover |

### Mobile device testing (physical or emulated)

1. Thumb-tap every small text link (hero, work section, footer) -- should activate on first tap
2. Thumb-tap WorkCard -- modal opens on first tap, no bounce or delay
3. Inside CaseStudyModal, tap Close / Previous / Next with thumb -- comfortable target size
4. In ContactModal, tap into each input field -- fields are tall enough to hit easily
5. Rapid-tap adjacent elements (e.g., Previous then Next) -- no accidental mis-taps
