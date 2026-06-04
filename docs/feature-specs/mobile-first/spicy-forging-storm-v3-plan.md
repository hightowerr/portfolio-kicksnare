# V3: Navigation — Implementation Plan

**Slice:** V3 from `spicy-forging-storm-slices.md`
**Covers:** R2, R6, R24, R28, R42
**Depends on:** V1 (useIsMobile hook, font vars), V2 (section container-type wrappers, @container sidebar rules in globals.css)

---

## 1. Overview

V3 adds the mobile hamburger menu, active section highlighting, and the hero-scroll-gated CTA pill. All structural changes (nav collapse, hamburger show/hide) are driven by `@container (min-width: 760px)` on the header wrapper — no `@media` queries, no `useIsMobile()` render branches. Two new scroll-derived states (`heroPassed`, `activeSection`) are added to `PortfolioClient` and passed as props to `Header`. The hamburger overlay is a `navOpen` local state inside `Header`.

---

## 2. Files to Create

None. `useIsMobile` already exists from V1 (`hooks/useIsMobile.ts`).

---

## 3. Files to Modify

| File | What changes |
|------|-------------|
| `components/PortfolioClient.tsx` | Add `heroPassed` state + scroll handler; add `activeSection` state + IntersectionObserver setup; pass new props to `Header`; update Header props interface |
| `app/globals.css` | Add `@container` rules for header nav collapse at 760px; add `.navlink--active` rule; add hamburger/overlay styles; add `.navlink-mobile` variant for overlay links |

---

## 4. Step-by-step Changes

### Step 1: Add `heroPassed` and `activeSection` states to PortfolioClient

**Where:** `PortfolioClient` function body (around line 852), alongside the existing `scrolled` state.

```tsx
// Existing
const [scrolled, setScrolled] = useState(false);
const [openCase, setOpenCase] = useState<string | null>(null);

// Add
const [heroPassed, setHeroPassed] = useState(false);
const [activeSection, setActiveSection] = useState<string | null>(null);
```

**Modify the existing scroll handler** to also set `heroPassed`:

```tsx
useEffect(() => {
  const on = () => {
    setScrolled(window.scrollY > 40);
    setHeroPassed(window.scrollY > 560);
  };
  window.addEventListener('scroll', on, { passive: true });
  return () => window.removeEventListener('scroll', on);
}, []);
```

Both `scrolled` and `heroPassed` initialize to `false` — matching what the server renders (scrollY is 0 on first paint). No hydration mismatch.

### Step 2: Wire IntersectionObserver for `activeSection`

**Where:** New `useEffect` in `PortfolioClient`, after the scroll handler effect.

```tsx
useEffect(() => {
  const ids = ['audit', 'work', 'about', 'contact'];
  const observers: IntersectionObserver[] = [];

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      },
      { rootMargin: '-70px 0px -55% 0px', threshold: 0 }
    );
    observer.observe(el);
    observers.push(observer);
  });

  return () => observers.forEach((o) => o.disconnect());
}, []);
```

**rootMargin explained:**
- `-70px` top: ignores the sticky header band (~70px tall with padding).
- `-55%` bottom: a section must enter the upper 45% of the viewport to become active. This prevents premature switching when a section barely peeks from the bottom.

`activeSection` initializes to `null` — no nav link highlighted on first paint. The observer fires only client-side after mount. No hydration mismatch.

### Step 3: Pass new props to Header

**Where:** The `<Header>` call in PortfolioClient's return JSX (line 871).

```tsx
// Before
<Header scrolled={scrolled} fonts={fonts} />

// After
<Header
  scrolled={scrolled}
  fonts={fonts}
  heroPassed={heroPassed}
  isMobile={isMobile}
  activeSection={activeSection}
/>
```

This requires calling `useIsMobile()` in `PortfolioClient`:

```tsx
import { useIsMobile } from '@/hooks/useIsMobile';
// ...
const isMobile = useIsMobile();
```

`useIsMobile` returns `false` on server — safe for SSR.

### Step 4: Update Header component props and introduce shared navLinks array

**Where:** Header function signature (line 183).

```tsx
// Before
function Header({ scrolled, fonts }: { scrolled: boolean; fonts: FontSet }) {

// After
function Header({
  scrolled,
  fonts,
  heroPassed,
  isMobile,
  activeSection,
}: {
  scrolled: boolean;
  fonts: FontSet;
  heroPassed: boolean;
  isMobile: boolean;
  activeSection: string | null;
}) {
```

**Add `navOpen` local state and shared `navLinks` array inside Header:**

```tsx
const [navOpen, setNavOpen] = useState(false);

const navLinks = [
  { href: '#work',    label: 'Work' },
  { href: '#audit',   label: 'Audit' },
  { href: '#about',   label: 'About' },
  { href: '#contact', label: 'Contact' },
];
```

`navOpen` initializes to `false` — matches server render. No hydration mismatch.

### Step 5: Add hamburger button JSX

**Where:** Inside the Header return, after the desktop nav `<nav>` element.

```tsx
<button
  type="button"
  className="nav-hamburger"
  aria-label="Open menu"
  onClick={() => setNavOpen(true)}
  style={{
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  }}
>
  <span style={{ width: 22, height: 2, background: 'var(--ink)', borderRadius: 1 }} />
  <span style={{ width: 22, height: 2, background: 'var(--ink)', borderRadius: 1 }} />
  <span style={{ width: 16, height: 2, background: 'var(--ink)', borderRadius: 1 }} />
</button>
```

CSS visibility is handled by `@container` rules (step 8) — the hamburger button is rendered in all cases, but hidden via CSS when the container is wide enough.

### Step 6: Wrap desktop nav links with a className for container-query targeting

**Where:** The existing `<nav>` element in Header.

```tsx
// Before
<nav style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>
  <a className="navlink" href="#work">Work</a>
  ...
</nav>

// After
<nav className="nav-desktop" style={{ gap: 36, justifyContent: 'center' }}>
  {navLinks.map((link) => (
    <a
      key={link.href}
      className={`navlink${activeSection && link.href === '#' + activeSection ? ' navlink--active' : ''}`}
      href={link.href}
    >
      {link.label}
    </a>
  ))}
</nav>
```

Note: `display: flex` moves to CSS via `.nav-desktop` rule (shown/hidden by @container). The inline `style={{ display: 'flex' }}` is removed — CSS handles it.

### Step 7: Add mobile overlay JSX

**Where:** Inside Header return, at the end (before closing `</header>`).

```tsx
{navOpen && (
  <div
    className="nav-overlay"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99,
      background: 'var(--primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
    }}
  >
    <button
      type="button"
      aria-label="Close menu"
      onClick={() => setNavOpen(false)}
      style={{
        position: 'absolute',
        top: 20,
        right: 24,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 8,
        color: 'var(--paper)',
      }}
    >
      <Close size={24} />
    </button>

    {navLinks.map((link) => (
      <a
        key={link.href}
        className={`navlink-mobile${activeSection && link.href === '#' + activeSection ? ' navlink-mobile--active' : ''}`}
        href={link.href}
        onClick={() => setNavOpen(false)}
        style={{
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 28,
          color: 'var(--paper)',
          textDecoration: 'none',
        }}
      >
        {link.label}
      </a>
    ))}

    <a
      href="#audit"
      className="cta-primary"
      onClick={() => setNavOpen(false)}
      style={{
        marginTop: 16,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--accent)',
        color: 'var(--ink)',
        textDecoration: 'none',
        fontFamily: fonts.display,
        fontWeight: 500,
        fontSize: 16,
        padding: '14px 20px 14px 22px',
        borderRadius: 999,
      }}
    >
      Free audit
      <span className="cta-arr" style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderRadius: 999,
        background: 'var(--paper)',
        color: 'var(--primary)',
        transition: 'transform .25s ease',
      }}>
        <ArrowRight size={12} />
      </span>
    </a>
  </div>
)}
```

The overlay is only rendered when `navOpen === true`. Since `navOpen` initializes to `false`, the overlay never renders on the server. No hydration mismatch.

Click on any link inside the overlay calls `setNavOpen(false)` to close it.

### Step 8: Add CTA pill conditional classes

**Where:** The existing header CTA pill `<a href="#audit" className="cta-primary" ...>`.

Wrap the CTA pill's container div with a className and apply conditional opacity:

```tsx
<div className="nav-cta-wrap" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
  <a
    href="#audit"
    className="cta-primary"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--primary)',
      color: 'var(--paper)',
      textDecoration: 'none',
      fontFamily: fonts.display,
      fontWeight: 500,
      fontSize: 14,
      padding: '11px 16px 11px 18px',
      borderRadius: 999,
      opacity: isMobile && !heroPassed ? 0 : 1,
      pointerEvents: isMobile && !heroPassed ? 'none' : 'auto',
      transition: 'opacity 0.3s ease',
    }}
  >
    Free audit
    <span className="cta-arr" ...>
      <ArrowRight size={11} />
    </span>
  </a>
</div>
```

**SSR safety:** `isMobile` starts `false` on the server, so `opacity: 1` on server render. On mobile devices, after hydration, `useIsMobile` flips to `true` and the pill goes `opacity: 0` — but the pill is behind the hamburger button at narrow widths anyway (hidden by @container CSS), so there is no visible flash. On desktop, `isMobile` stays `false` and the pill is always visible.

### Step 9: Add `container-type: inline-size` to header wrapper

**Where:** The `.wrap` div inside `<header>` — add a className for targeting.

```tsx
<div className="wrap header-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 56px', gap: 24 }}>
```

The inline `gridTemplateColumns` style will be overridden at narrow widths by @container CSS that sets `display: flex` instead.

Alternatively, remove the inline grid style entirely and let CSS handle both the wide and narrow layouts:

```tsx
<div className="wrap header-wrap" style={{ alignItems: 'center', padding: '20px var(--wrap-pad-mobile)', gap: 24 }}>
```

The CSS in step 10 will apply `display: flex; justify-content: space-between` as the base, and `display: grid; grid-template-columns: 1fr auto 1fr; padding-inline: var(--wrap-pad-desktop)` inside the `@container (min-width: 760px)` rule.

### Step 10: Add @container and nav rules to globals.css

**Where:** After the existing `.cta-primary:hover .cta-arr` rule (line 244), before the Animations section.

```css
/* ─── Header container query — nav collapse at 760px ────────────────────── */

.header-wrap {
  container-type: inline-size;
  display: flex;
  justify-content: space-between;
}

/* Hamburger: visible by default (narrow), hidden when wide */
.nav-hamburger {
  display: flex;
}

/* Desktop nav: hidden by default (narrow), visible when wide */
.nav-desktop {
  display: none;
}

/* Desktop CTA wrapper: hidden by default (narrow), visible when wide */
.nav-cta-wrap {
  display: none;
}

@container (min-width: 760px) {
  .header-wrap {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding-inline: var(--wrap-pad-desktop);
  }

  .nav-hamburger {
    display: none;
  }

  .nav-desktop {
    display: flex;
  }

  .nav-cta-wrap {
    display: flex;
    justify-content: flex-end;
  }
}

/* ─── Active nav highlight ──────────────────────────────────────────────── */

.navlink--active::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* ─── Mobile overlay nav link ───────────────────────────────────────────── */

.navlink-mobile {
  position: relative;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.navlink-mobile--active {
  opacity: 1;
}

.navlink-mobile--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: var(--paper);
}
```

### Step 11: Remove conflicting inline display styles

Since CSS now controls `display` on `.nav-desktop`, `.nav-hamburger`, and `.nav-cta-wrap`, any inline `style={{ display: '...' }}` on those elements must be removed — inline styles have higher specificity than class rules, which would defeat the @container query.

Specifically:
- The `<nav>` element: remove `display: 'flex'` from its inline style (keep `gap` and `justifyContent` as they are non-conflicting).
- The CTA wrapper `<div>`: remove `display: 'flex'` from inline style.
- The hamburger `<button>`: remove `display: 'flex'` from inline style (but keep `flexDirection` and `gap` in a non-conflicting way by moving them to the CSS rule).

This is critical for R28 — if inline styles fight the @container rules, the nav won't collapse.

---

## 5. SSR Safety (R6)

Every new piece of state avoids hydration mismatch:

| State | Server value | Client initial | Why safe |
|-------|-------------|---------------|----------|
| `heroPassed` | `false` | `false` | `scrollY` is 0 at first paint; scroll handler updates after mount |
| `activeSection` | `null` | `null` | IntersectionObserver fires only in `useEffect`; null means no highlight |
| `isMobile` | `false` | `false` | `useIsMobile` returns `false` from `useState(false)`; updates in `useEffect` |
| `navOpen` | `false` | `false` | Menu starts closed; overlay conditionally rendered — no DOM on server |
| Nav collapse (hamburger vs desktop links) | Both rendered in HTML; CSS hides one | Same | `@container` query is CSS-only — the server HTML contains both hamburger and desktop nav; CSS hides the wrong one based on actual container width at paint time. No JS-dependent render branch. |

The key invariant from R28: the hamburger button and the desktop nav links are **both always in the DOM**. CSS `@container` controls visibility. This means the server-rendered HTML is identical regardless of viewport width — the browser's CSS engine resolves which to show. No hydration mismatch is possible for the nav collapse itself.

---

## 6. Verification

| Check | How to verify |
|-------|--------------|
| **R2: Hamburger visible on mobile** | DevTools 375px: hamburger button visible; desktop nav links hidden. Tap hamburger: overlay covers screen, all 4 links + CTA reachable. |
| **R6: No hydration mismatch** | Open DevTools console at 375px and 1024px: zero "hydration" warnings. SSR HTML contains both nav variants; CSS resolves which shows. |
| **R24: CTA pill hidden on mobile until hero passes** | At 375px, on page load: header CTA pill has `opacity: 0`. Scroll past 560px: pill fades to `opacity: 1`. At 1024px: pill always visible. |
| **R28: Nav collapse via @container** | Resize browser window (not DevTools device mode): nav collapses/expands at 760px container width. Inspect: no `@media` query drives the collapse. `container-type: inline-size` on `.header-wrap`. |
| **R42: Active section highlighting** | Scroll through page: the nav link matching the in-viewport section shows the `::after` underline. Open hamburger while scrolled to About: "About" link is highlighted. |
| **Desktop unchanged** | At 1024px+: header layout is grid `1fr auto 1fr`, desktop nav links visible, hamburger hidden, CTA pill visible. Pixel-identical to current. |
| **TypeScript** | `pnpm tsc --noEmit` passes with zero errors. |

---

## 7. Summary of all changes

**`components/PortfolioClient.tsx`:**
- Import `useIsMobile` from `@/hooks/useIsMobile`
- Add `heroPassed` state (`useState(false)`)
- Add `activeSection` state (`useState<string | null>(null)`)
- Extend scroll handler `useEffect` to also set `heroPassed`
- Add IntersectionObserver `useEffect` for `activeSection`
- Call `useIsMobile()` and store as `isMobile`
- Pass `heroPassed`, `isMobile`, `activeSection` props to `<Header>`
- Update `Header` props interface with new fields
- Add `navOpen` state inside `Header`
- Add shared `navLinks` array inside `Header`
- Replace hardcoded `<a>` nav links with `navLinks.map()` + `navlink--active` class
- Add `header-wrap` className to header inner div; add `container-type: inline-size`
- Add `nav-desktop` className to `<nav>`; remove inline `display: flex`
- Add `nav-cta-wrap` className to CTA wrapper div; remove inline `display: flex`
- Add hamburger `<button>` with `nav-hamburger` className
- Add mobile overlay JSX (conditional on `navOpen`)
- Add CTA pill opacity/pointer-events conditional on `isMobile && !heroPassed`

**`app/globals.css`:**
- Add `.header-wrap` rule with `container-type: inline-size`
- Add `.nav-hamburger` base rule (`display: flex`)
- Add `.nav-desktop` base rule (`display: none`)
- Add `.nav-cta-wrap` base rule (`display: none`)
- Add `@container (min-width: 760px)` block: header-wrap grid, hamburger hidden, desktop nav + CTA visible
- Add `.navlink--active::after` rule (forces underline visible)
- Add `.navlink-mobile` and `.navlink-mobile--active` rules for overlay styling
