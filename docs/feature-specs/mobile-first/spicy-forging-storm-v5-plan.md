# V5: Modals — Implementation Plan

**Slice:** V5 (Modals)
**Covers:** R8, R9, R10, R11, R13, R20, R40, R41, R48
**Affordances:** N14, N15, N20, U15, U16, U17, U19
**Depends on:** V1 (`useIsMobile` hook at `hooks/useIsMobile.ts`)

---

## 1. Overview

V5 makes both modals (CaseStudyModal and ContactModal) responsive. On mobile (below the `useIsMobile` 1024px threshold), each modal becomes a full-screen view with `fixed inset-0`. On desktop, the existing centered-dialog and centered-card layouts are preserved unchanged. The slice also fixes modal entrance animations (removing hidden-start `opacity:0` keyframes), raises input contrast on the contact form, adds visually-hidden labels to form fields, and enforces 44px minimum input height.

No new files are created. Two existing files are modified:
- `components/CaseStudyModal.tsx`
- `components/PortfolioClient.tsx` (ContactModal section)

---

## 2. Files to Modify

| File | What changes |
|------|-------------|
| `components/CaseStudyModal.tsx` | Import `useIsMobile`; gate layout between full-screen (mobile) and centered dialog (desktop); replace `cs-fade`/`cs-rise` keyframes with CSS transition; make close button fixed in viewport on mobile |
| `components/PortfolioClient.tsx` | Import `useIsMobile` inside `ContactModal`; gate layout between full-screen (mobile) and centered card (desktop); update `inputStyle` for contrast fix; add visually-hidden `<label>` elements; replace entrance animation; enforce 44px input height |

---

## 3. CaseStudyModal Changes

### 3a. Current structure

```
<div role="dialog">                    ← fixed inset-0, backdrop blur, animation: cs-fade
  <div>                                ← absolute top:24 right:24 bottom:24 left:24, rounded-[28px], animation: cs-rise
    <div>                              ← sticky top bar (prev/next/close buttons)
    <div ref={scrollRef}>              ← scrollable content area
      <CSHeader/> <CSProblem/> ...
    </div>
  </div>
  <style> @keyframes cs-fade ... cs-rise ... </style>
</div>
```

The current modal always uses `position: absolute` with 24px inset from all edges, `borderRadius: 28`, and `cs-rise` keyframe animation that starts at `opacity: 0`.

### 3b. New structure (N14, U15)

Import `useIsMobile` at the top of the file:

```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
```

Call the hook inside the component:

```tsx
const isMobile = useIsMobile();
```

Gate the inner dialog container styles:

**Mobile (`isMobile === true`):**
- `position: 'fixed'`, `inset: 0` (full screen, no margin)
- `borderRadius: 0` (no rounded corners)
- `overflow: 'hidden'` (on container), `overflowY: 'auto'` (on scroll area)
- Remove the outer backdrop div's background/blur entirely (the modal fills the screen, no backdrop is visible)
- Close button: `position: 'fixed'`, `top: 16`, `right: 16`, `zIndex: 110`, `width: 44`, `height: 44` (R41 -- always visible in viewport)

**Desktop (`isMobile === false`):**
- Keep current structure exactly: `position: 'absolute'`, `top: 24, right: 24, bottom: 24, left: 24`
- `borderRadius: 28`
- Backdrop with `rgba(6,55,45,0.55)` and blur preserved
- Close button size unchanged (34px)

### 3c. Concrete style changes

The outer backdrop div:
```tsx
style={{
  position: 'fixed', inset: 0, zIndex: 100,
  // Mobile: transparent bg (modal fills screen); Desktop: backdrop
  background: isMobile ? 'var(--paper)' : 'rgba(6,55,45,0.55)',
  backdropFilter: isMobile ? 'none' : 'blur(6px)',
  WebkitBackdropFilter: isMobile ? 'none' : 'blur(6px)',
  // No animation property -- transitions handle entrance (see section 7)
}}
```

The inner dialog div:
```tsx
style={isMobile ? {
  // Mobile: full screen
  position: 'fixed', inset: 0,
  background: 'var(--paper)', color: 'var(--ink)',
  overflow: 'hidden', display: 'flex', flexDirection: 'column',
  // Entrance transition (see section 7)
  transform: 'scale(1)',
  transition: 'transform 350ms cubic-bezier(.2,.7,.2,1)',
} : {
  // Desktop: centered dialog (current)
  position: 'absolute', top: 24, right: 24, bottom: 24, left: 24,
  background: 'var(--paper)', color: 'var(--ink)',
  borderRadius: 28, overflow: 'hidden',
  display: 'flex', flexDirection: 'column',
  boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
  transform: 'scale(1)',
  transition: 'transform 350ms cubic-bezier(.2,.7,.2,1)',
}}
```

The top bar:
```tsx
// Mobile: the top bar stays as-is (it's at the top of the full-screen flex column)
// but simplify the info display since horizontal space is limited.
// The close button inside the top bar on mobile gets min 44px tap target (R41).
```

Close button on mobile:
```tsx
style={{
  ...navBtnStyle,
  background: 'var(--primary)', color: 'var(--paper)', border: '1px solid var(--ink)',
  // Mobile: 44px, fixed in viewport
  ...(isMobile ? { width: 44, height: 44, position: 'sticky' as const, top: 0, zIndex: 10 } : {}),
}}
```

Note: The top bar is already at the top of the flex column with `flexShrink: 0`, so it naturally stays fixed at the top of the scroll container. On mobile the close button remains accessible without scrolling (R41). We keep the top bar in the DOM flow (not `position: fixed`) because it's already pinned above the scrollable content div.

### 3d. Mobile header metadata

On mobile, the header metadata row (5-column grid: Sector / Role / Duration / Stack / Services) in `CSHeader` will need to wrap. Change from `gridTemplateColumns: 'repeat(5, 1fr)'` to a responsive approach. Since this is inside the modal (not a section with `@container`), use `useIsMobile`:

```tsx
gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)'
```

Pass `isMobile` as a prop to `CSHeader` (and other sub-components that need it). The `fonts` prop bag already flows down; add `isMobile` alongside it.

### 3e. Section padding inside modal on mobile

The inner sections (CSProblem, CSApproach, etc.) use `padding: '88px 56px'`. On mobile, reduce horizontal padding:

```tsx
padding: isMobile ? '48px 20px' : '88px 56px'
```

Pass `isMobile` down to each sub-component as a prop.

---

## 4. ContactModal Changes

### 4a. Current structure (PortfolioClient.tsx lines 566-739)

```
<div onClick={onClose}>                ← fixed inset-0, dark overlay rgba(1,11,9,0.72), flex center
  <div onClick={stopPropagation}>      ← relative, var(--primary) bg, rounded-[28px], maxWidth 520
    <button> Close (36px) </button>
    <form>
      <input name /> <input email /> <textarea message />
      <button submit />
    </form>
  </div>
</div>
```

### 4b. New structure (N15, U16)

Import `useIsMobile` inside `ContactModal`:

```tsx
const isMobile = useIsMobile();
```

Gate the layout:

**Mobile (`isMobile === true`):**
- Outer div: `fixed inset-0`, solid `var(--primary)` background (no semi-transparent overlay -- R9 specifies "no partial overlay"), `zIndex: 100`
- Inner div: `position: 'fixed'`, `inset: 0`, `background: 'var(--primary)'`, no `borderRadius`, no `maxWidth`, no `boxShadow`
- `padding: '24px 20px'` with `paddingTop: env(safe-area-inset-top, 24px)` and `paddingBottom: env(safe-area-inset-bottom, 24px)` via CSS (safe-area -- R9)
- `overflowY: 'auto'` to handle small screens where form content exceeds viewport
- Close button: `position: 'fixed'`, `top: 20px`, `right: 20px`, `width: 44`, `height: 44`, `zIndex: 110` (R41 -- always in viewport; R9 -- 44px)

**Desktop (`isMobile === false`):**
- Keep current structure exactly: overlay + centered card, `maxWidth: 520`, `borderRadius: 28`, `padding: '44px 44px 40px'`
- Close button: 36px (current)

### 4c. Concrete style changes

Outer wrapper:
```tsx
style={isMobile ? {
  position: 'fixed', inset: 0, zIndex: 100,
  background: 'var(--primary)',
  overflowY: 'auto',
  // Entrance transition (see section 7)
  opacity: 1,
  transition: 'opacity 300ms ease',
} : {
  position: 'fixed', inset: 0, zIndex: 100,
  background: 'rgba(1,11,9,0.72)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 24,
  opacity: 1,
  transition: 'opacity 300ms ease',
}}
```

Inner card (only rendered on desktop):
```tsx
// On mobile, the content renders directly inside the outer div (no nested card)
// On desktop, keep the current nested div with maxWidth/borderRadius
```

Alternatively, simplify by keeping the two-div structure but changing styles:

```tsx
// Inner div
style={isMobile ? {
  position: 'relative',
  background: 'var(--primary)', color: 'var(--paper)',
  padding: '60px 20px 40px',  // 60px top to clear the fixed close button
  width: '100%',
  minHeight: '100%',
} : {
  position: 'relative',
  background: 'var(--primary)', color: 'var(--paper)',
  borderRadius: 28,
  maxWidth: 520, width: '100%',
  padding: '44px 44px 40px',
  boxShadow: 'var(--shadow-lg)',
}}
```

Close button:
```tsx
style={isMobile ? {
  position: 'fixed', top: 20, right: 20, zIndex: 110,
  width: 44, height: 44, borderRadius: 999,
  background: 'rgba(249,254,253,0.10)',
  border: '1px solid rgba(249,254,253,0.15)',
  cursor: 'pointer', color: 'var(--paper)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
} : {
  // Current 36px close button styles unchanged
  position: 'absolute', top: 20, right: 20,
  width: 36, height: 36, borderRadius: 999,
  background: 'rgba(249,254,253,0.10)',
  border: '1px solid rgba(249,254,253,0.15)',
  cursor: 'pointer', color: 'var(--paper)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background .2s',
}}
```

### 4d. Backdrop click behavior

- **Mobile:** No backdrop exists (solid bg fills screen). Remove the `onClick={onClose}` from the outer div on mobile, since the entire screen IS the modal. Only the close button dismisses.
- **Desktop:** Keep `onClick={onClose}` on the outer div (backdrop click to dismiss).

```tsx
onClick={isMobile ? undefined : onClose}
```

---

## 5. Input Contrast Fix (N20, R48)

### 5a. Current `inputStyle` (line 595-607)

```tsx
const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1px solid rgba(249,254,253,0.18)',
  background: 'rgba(249,254,253,0.06)',      // <-- fails 4.5:1 contrast
  color: 'var(--paper)',
  fontFamily: fonts.display,
  fontSize: 15,
  outline: 'none',                            // <-- WCAG violation (R49, handled in V9)
  boxSizing: 'border-box',
};
```

### 5b. Updated `inputStyle`

```tsx
const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  minHeight: 44,                               // U19 — 44px touch target
  borderRadius: 10,
  border: '1px solid rgba(249,254,253,0.18)',
  background: 'rgba(249,254,253,0.10)',        // N20 — raised from 0.06 to 0.10
  color: 'var(--paper)',                        // full opacity (already correct)
  fontFamily: fonts.display,
  fontSize: 15,                                 // Note: V7 will audit this to 16px/1rem
  outline: 'none',                              // Removed in V9 (not this slice)
  boxSizing: 'border-box' as const,
};
```

Changes:
1. `background` raised from `rgba(249,254,253,0.06)` to `rgba(249,254,253,0.10)` -- satisfies 4.5:1 contrast against `--primary` background
2. `minHeight: 44` added -- ensures 44px tap target on all inputs (U19)
3. `color: 'var(--paper)'` confirmed at full opacity (already correct, no change needed)
4. `outline: 'none'` -- left for now; removal is V9's responsibility (R54). Document this as a known V9 dependency.

---

## 6. Form Labels (U19, R55)

### 6a. Current state

Inputs use `placeholder` as the only label. No `<label>` elements exist. No `id` attributes on inputs.

### 6b. Changes

Add a visually-hidden `<label>` before each input. Use a `sr-only` style object (not Tailwind class, since this component uses inline styles):

```tsx
const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1, height: 1,
  padding: 0, margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};
```

Add labels and matching IDs:

```tsx
<label htmlFor="contact-name" style={srOnly}>Name</label>
<input
  id="contact-name"
  type="text"
  required
  placeholder="Name"
  value={name}
  onChange={e => setName(e.target.value)}
  style={inputStyle}
/>

<label htmlFor="contact-email" style={srOnly}>Email</label>
<input
  id="contact-email"
  type="email"
  required
  placeholder="Email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  style={{ ...inputStyle, marginTop: 12 }}
/>

<label htmlFor="contact-message" style={srOnly}>Message</label>
<textarea
  id="contact-message"
  required
  rows={4}
  placeholder="Message"
  value={message}
  onChange={e => setMessage(e.target.value)}
  style={{ ...inputStyle, marginTop: 12, resize: 'vertical' }}
/>
```

---

## 7. Entrance Transitions (U17, R20)

### 7a. Problem

Both modals currently use `@keyframes` that start at `opacity: 0`. The `cs-fade` and `cs-rise` keyframes in `CaseStudyModal` begin from `opacity: 0` and `translateY(20px)`. If the animation doesn't fire (browser quirk, reduced motion, etc.), the modal stays invisible.

The ContactModal has no explicit animation but relies on the browser's immediate render.

### 7b. CaseStudyModal entrance transition

**Remove:**
- The `<style>` block with `@keyframes cs-fade` and `@keyframes cs-rise`
- The `animation: 'cs-fade .25s ease'` on the outer backdrop div
- The `animation: 'cs-rise .35s cubic-bezier(.2,.7,.2,1)'` on the inner dialog div

**Replace with CSS transition on the inner dialog:**

Use a mount-state approach with `useState`:

```tsx
const [entered, setEntered] = useState(false);

useEffect(() => {
  // Trigger entrance transition on next frame
  requestAnimationFrame(() => setEntered(true));
}, []);
```

Inner dialog div style:

```tsx
transform: entered ? 'scale(1)' : 'scale(0.98)',
opacity: 1,                          // Always opacity:1 — never starts at 0 (R20)
transition: 'transform 350ms cubic-bezier(.2,.7,.2,1)',
```

Key principle: the modal base state is **always `opacity: 1`**. The scale transition is a subtle polish, not a visibility gate. If the transition doesn't fire, the modal is still fully visible at `scale(0.98)` -- barely noticeable, not invisible.

Outer backdrop (desktop only):

```tsx
opacity: entered ? 1 : 0,
transition: 'opacity 250ms ease',
```

On mobile, the backdrop is replaced by the full-screen solid background, so no backdrop fade is needed.

### 7c. ContactModal entrance transition

Same mount-state pattern:

```tsx
const [entered, setEntered] = useState(false);

useEffect(() => {
  requestAnimationFrame(() => setEntered(true));
}, []);
```

Outer wrapper:

```tsx
opacity: entered ? 1 : 0.85,         // Subtle fade, never fully invisible
transition: 'opacity 300ms ease',
```

This gives a gentle fade-in. The start value is `0.85` (not `0`), so even without the transition the modal is clearly visible. This satisfies R20 -- no hidden-start state.

### 7d. Reduced motion

Wrap the transition properties in a `prefers-reduced-motion` check:

```tsx
// In component:
const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In style:
transition: prefersReducedMotion ? 'none' : 'transform 350ms cubic-bezier(.2,.7,.2,1)',
```

Or simpler: just let the transition run -- it's short (300-350ms) and doesn't involve flashing or large motion. The `scale(0.98->1)` is 2% scale change. The opacity fade is subtle. Both are well within reduced-motion tolerance. If we want to be strict, add the check.

---

## 8. Verification

### 8a. Manual testing checklist

| Test | Expected |
|------|----------|
| 375px: tap a work card | CaseStudyModal fills entire screen, no rounded corners, no backdrop visible behind it |
| 375px: CaseStudyModal close button | 44px target, visible without scrolling at all times (fixed at top) |
| 375px: scroll CaseStudyModal content | Content scrolls; top bar with close button stays pinned |
| 375px: tap "Contact us" | ContactModal fills entire screen with solid `var(--primary)` background |
| 375px: ContactModal close button | 44px, fixed top-right, visible without scrolling |
| 375px: contact form inputs | Min-height 44px, `rgba(249,254,253,0.10)` background, `var(--paper)` text color |
| 375px: submit contact form | Form submits to Formspree (`https://formspree.io/f/meedaznk`) -- verify `info@kicksnare.digital` endpoint preserved (R13) |
| 1024px: tap work card | CaseStudyModal opens as centered dialog with 24px inset, backdrop blur, rounded-[28px] |
| 1024px: tap "Contact us" | ContactModal opens as centered card, maxWidth 520, rounded-[28px] |
| 1024px: backdrop click | Both modals dismiss on backdrop click |
| Both viewports: modal opens | Full opacity immediately -- no flash of invisible content (R20) |
| Both viewports: CaseStudyModal entrance | Subtle scale(0.98 -> 1) over 350ms |
| Both viewports: ContactModal entrance | Subtle opacity transition over 300ms |
| Both viewports: Soundwave animation | `.sw rect` animation still playing in header behind modal (R11) |
| Keyboard: Escape key | Both modals close |
| Keyboard: Arrow Left/Right in CaseStudyModal | Navigate between cases |
| Screen reader: form labels | Each input has an associated `<label>` (visually hidden) |
| Nav depth | From any page state, maximum 2 taps to reach content (nav -> modal). No third level introduced (R40) |

### 8b. Automated checks

```bash
pnpm tsc --noEmit    # Zero type errors
```

### 8c. Specific things NOT to change in this slice

- `outline: 'none'` on inputs -- removed in V9, not V5
- Font sizes to rem -- handled in V7
- WorkCard `<a href="#">` to `<button>` -- handled in V8
- Bottom bar -- handled in V6
- Tap zone padding on small interactives -- handled in V8
- `<main>` landmark -- handled in V9

---

## 9. Implementation Order

1. **CaseStudyModal.tsx** -- import `useIsMobile`, add `entered` state, gate layout, remove keyframes, pass `isMobile` to sub-components, adjust mobile padding/grid
2. **PortfolioClient.tsx / ContactModal** -- import `useIsMobile`, add `entered` state, gate layout (full-screen vs card), update `inputStyle` (contrast + minHeight), add `srOnly` label styles, add `<label>` elements with `htmlFor`/`id`
3. **Test** -- verify at 375px and 1024px per the checklist above
4. **Update progress tracker** -- mark V5 affordances as complete in `docs/context/progress-tracker.md`

---

## 10. Risk Notes

| Risk | Mitigation |
|------|-----------|
| `useIsMobile` returns `false` on SSR; mobile layout flickers on hydration | Acceptable: modal is only rendered after user interaction (click), so `useIsMobile` has already resolved by the time the modal mounts. No SSR hydration mismatch possible. |
| `requestAnimationFrame` for entrance transition doesn't fire in time | Base state is always visible (`opacity: 1` or `opacity: 0.85`). Worst case: no transition plays, modal appears instantly. This is fine. |
| ContactModal Formspree endpoint changed | Verify the `fetch` URL `https://formspree.io/f/meedaznk` is unchanged. Do not modify it. |
| CaseStudyModal sub-components (CSHeader, CSProblem, etc.) need `isMobile` prop threading | Straightforward prop addition. Consider a `ModalContext` if prop drilling becomes excessive, but for 5-6 components it's fine to pass directly. |
| Mobile close button `position: fixed` may conflict with scroll behavior | Test on real device / iOS Safari simulator. The close button sits above the scroll container in the flex layout, so `position: sticky` on the top bar may be sufficient instead of `fixed`. Test both approaches. |
