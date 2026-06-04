# V6: Bottom Bar -- Implementation Plan

**Slice:** V6 -- Bottom Bar
**Covers:** R35, R37
**Depends on:** V3 (heroPassed + isMobile state on PortfolioClient, Header CTA pill)
**Affordances:** N13 (useIntersectionObserver), U14 (BottomBar component)

---

## 1. Overview

V6 adds a sticky bottom bar on mobile that gives users a persistent, thumb-reachable primary CTA ("Let's talk") without competing with the Contact section's own CTA. The bar appears once the hero scrolls out of viewport and hides when the Contact section is visible. On desktop, the bar never renders -- the header CTA pill handles the role instead.

Three changes:

1. A new `useIntersectionObserver` hook -- reusable, ~20 lines.
2. A new `BottomBar` component -- fixed at the bottom of the viewport.
3. A modification to the Header component -- hide the CTA pill on mobile (desktop-only via `hidden lg:flex`).

---

## 2. Files to Create

| File | Purpose |
|------|---------|
| `hooks/useIntersectionObserver.ts` | Generic hook: observe a DOM element, return `boolean` isIntersecting |
| `components/BottomBar.tsx` | Fixed bottom bar with full-width "Let's talk" pill |

## 3. Files to Modify

| File | Change |
|------|--------|
| `components/PortfolioClient.tsx` | Render `<BottomBar>` after `<Footer>`, pass `isMobile` and `heroPassed` props |
| `components/PortfolioClient.tsx` (Header) | Make Header CTA pill desktop-only (`hidden lg:flex`) |

---

## 4. useIntersectionObserver Hook

**File:** `hooks/useIntersectionObserver.ts`

```ts
'use client';

import { useEffect, useState, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { threshold = 0.5, rootMargin = '0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return isIntersecting;
}
```

**Key decisions:**

- Accepts a `RefObject<Element | null>` -- the caller creates the ref and attaches it to a DOM node.
- Returns a simple boolean `isIntersecting`.
- Default threshold `0.5` (50% of element visible) matches the N13 spec.
- SSR-safe: `useState(false)` initial value; `useEffect` only runs client-side.
- Single-observer pattern: one observer per hook call, disconnected on cleanup.
- No dependency on `useIsMobile` -- the hook is environment-agnostic.

---

## 5. BottomBar Component

**File:** `components/BottomBar.tsx`

```tsx
'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ArrowRight } from './icons';

interface BottomBarProps {
  isMobile: boolean;
  heroPassed: boolean;
  fonts: { display: string };
}

export default function BottomBar({ isMobile, heroPassed, fonts }: BottomBarProps) {
  const contactRef = useRef<Element | null>(null);

  // Lazily grab the #contact section from the DOM on first render
  // This avoids prop-drilling a ref from PortfolioClient
  if (typeof window !== 'undefined' && !contactRef.current) {
    contactRef.current = document.getElementById('contact');
  }

  const contactVisible = useIntersectionObserver(contactRef, { threshold: 0.5 });

  const visible = isMobile && heroPassed && !contactVisible;

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        height: 52,
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="lg:hidden"
    >
      <a
        href="#contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
          height: '100%',
          color: 'var(--ink)',
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 16,
          textDecoration: 'none',
          letterSpacing: '-0.005em',
        }}
      >
        Let's talk
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            borderRadius: 999,
            background: 'var(--ink)',
            color: 'var(--accent)',
          }}
        >
          <ArrowRight size={11} />
        </span>
      </a>
    </div>
  );
}
```

**Key decisions:**

- **Visibility logic:** `isMobile && heroPassed && !contactVisible`. All three must be true/false for the bar to show/hide as specced.
- **#contact ref strategy:** Rather than prop-drilling a ref from PortfolioClient, the component grabs `document.getElementById('contact')` itself. This is safe because:
  - The component is client-only (`'use client'`).
  - The `#contact` section is rendered before `BottomBar` in the DOM tree (BottomBar is after `<Footer>`).
  - The `typeof window !== 'undefined'` guard prevents SSR crashes.
- **Transition:** `translateY(100%)` slides the bar off-screen when hidden; `translateY(0)` slides it in. This is a GPU-composited transform (no layout thrash).
- **Safe-area:** `paddingBottom: env(safe-area-inset-bottom)` ensures the bar clears the home indicator on notched iPhones.
- **Desktop hide:** `className="lg:hidden"` ensures zero rendering on desktop even if `isMobile` is briefly false during hydration. Belt-and-suspenders with the JS `visible` check.
- **z-index: 90:** Below the header (z-50 -- wait, header is 50, modals are 100). Actually the bar needs to sit above normal content but below modals. z-90 is fine -- it sits below the modal overlay (z-100) and above section content.
- **aria-hidden:** Set to `true` when not visible so screen readers skip the off-screen bar.
- **Styling:** Accent background (`--accent`, blaze orange) with ink text (`--ink`), matching the brand CTA style. Full-width link wrapping the entire bar for maximum tap target.

---

## 6. Header CTA Change

**Current code** (Header component, around line 198-205 in `PortfolioClient.tsx`):

```tsx
<div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
  <a href="#audit" className="cta-primary" style={{ display: 'inline-flex', ... }}>
    Free audit
    <span className="cta-arr" ...>
      <ArrowRight size={11} />
    </span>
  </a>
</div>
```

**Change:** Add `className="hidden lg:flex"` to the outer wrapper `<div>` to hide the entire CTA pill container on mobile. Desktop sees it unchanged.

```tsx
<div className="hidden lg:flex" style={{ justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
```

Note: since we're moving `display: flex` into the Tailwind class (`lg:flex`), we remove the `display: 'flex'` from the inline style to avoid the inline style overriding the `hidden` class. Tailwind's `hidden` sets `display: none`, but an inline `display: flex` would win specificity. So the inline `display` property must be removed; the `lg:flex` class handles it for desktop.

**Interaction with V3:** V3's `@container`-based nav collapse (N3b) may already handle hiding portions of the header at narrow widths. If V3 has already shipped by the time V6 runs, the `hidden lg:flex` here should align with whatever V3 established. If V3 used `@container (min-width: 760px)` for the CTA pill visibility, then V6 should use the same `@container` rule rather than `lg:` (which is a `@media` breakpoint at 1024px). The implementer should check the V3 state and use the matching mechanism.

If V3 is not yet shipped, `hidden lg:flex` is the correct standalone implementation per C21. Once V3 ships, the header CTA visibility will be governed by `@container` rules in `globals.css`, and this `hidden lg:flex` may be replaced or supplemented.

---

## 7. Integration -- Wiring BottomBar into PortfolioClient

**Location:** `components/PortfolioClient.tsx`, inside the `PortfolioClient` root component (line ~852).

### 7a. Prerequisite state

V6 depends on two pieces of state that V3 introduces:

- `heroPassed: boolean` -- `scrollY > 560`
- `isMobile: boolean` -- from `useIsMobile()` hook

If V3 has already been implemented, these exist. If not, V6 must add them:

```tsx
// In PortfolioClient, alongside existing scrolled state:
const [heroPassed, setHeroPassed] = useState(false);

// In the existing scroll effect:
useEffect(() => {
  const on = () => {
    setScrolled(window.scrollY > 40);
    setHeroPassed(window.scrollY > 560);
  };
  window.addEventListener('scroll', on, { passive: true });
  return () => window.removeEventListener('scroll', on);
}, []);
```

And for `isMobile`, import and call the hook from V1:

```tsx
import { useIsMobile } from '../hooks/useIsMobile';
// ...
const isMobile = useIsMobile();
```

If `useIsMobile` does not exist yet (V1 not shipped), a minimal inline version:

```tsx
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 1024);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);
```

### 7b. Render BottomBar

Add the BottomBar import and render it after `<Footer>` and before the CaseStudyModal conditional:

```tsx
import BottomBar from './BottomBar';

// In the return JSX, after <Footer fonts={fonts} />:
<BottomBar isMobile={isMobile} heroPassed={heroPassed} fonts={fonts} />
```

The full return block becomes:

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
    <BottomBar isMobile={isMobile} heroPassed={heroPassed} fonts={fonts} />
    {openCase && (
      <CaseStudyModal
        caseId={openCase}
        fonts={fonts}
        onOpen={setOpenCase}
        onClose={() => setOpenCase(null)}
      />
    )}
  </div>
);
```

### 7c. Create hooks directory

The `hooks/` directory does not currently exist at the project root. It must be created for `useIntersectionObserver.ts`. If V1 has already shipped, `hooks/useIsMobile.ts` already exists and the directory is there.

```
mkdir -p hooks
```

---

## 8. Verification

### Manual testing checklist

| # | Test | Expected |
|---|------|----------|
| 1 | DevTools 375px, page load | Bottom bar NOT visible (hero in viewport) |
| 2 | 375px, scroll past hero (~560px) | Bottom bar slides up from bottom edge with smooth transition |
| 3 | 375px, continue scrolling to Contact section | Bottom bar slides back down / hides when #contact is >=50% visible |
| 4 | 375px, scroll back up from Contact | Bottom bar reappears |
| 5 | 375px, check header | CTA pill ("Free audit") NOT visible |
| 6 | 1024px+ | No bottom bar at any scroll position; header CTA pill visible |
| 7 | 375px, tap "Let's talk" on bottom bar | Scrolls to #contact section |
| 8 | iPhone (or Safari simulator) | Bar clears the home indicator (safe-area-inset-bottom padding) |
| 9 | 375px, open CaseStudyModal | Bottom bar sits below the modal overlay (z-index ordering correct) |
| 10 | `pnpm tsc --noEmit` | Zero type errors |

### Automated / quick checks

```bash
# Type check
pnpm tsc --noEmit

# Verify no new dependencies added
git diff package.json  # should show no changes

# Verify new files created
ls hooks/useIntersectionObserver.ts
ls components/BottomBar.tsx
```

### Edge cases to verify

- **Fast scroll:** Rapidly scrolling past hero and into Contact -- bar should not flash. The `translateY` transition handles this because the transition duration (300ms) smooths out rapid state changes.
- **Resize from mobile to desktop:** Bar should disappear because `isMobile` flips to false. The `lg:hidden` class is a CSS safety net.
- **No #contact element in DOM:** If somehow `#contact` is not found, `contactRef.current` stays null, `useIntersectionObserver` returns false (never intersecting), so the bar stays visible when `isMobile && heroPassed`. This is acceptable -- the bar would be visible but the user can still scroll to contact.
