## R42 Spike: Active section highlighting — missing mechanism

### Context

R42 ("active state clearly visible on the current nav section — in-viewport section highlighted in hamburger menu and/or header nav") is marked ✅ for shape C in the fit check, but no C part (C14–C27) describes the mechanism. The mobile-first slice that implements the hamburger menu and/or the header nav will need this working — slicing cannot start without a concrete implementation path.

### Goal

Identify the concrete mechanism for tracking the in-viewport section and surfacing the active state in both the desktop header nav and the mobile hamburger menu.

### Questions

| # | Question |
|---|----------|
| **Q1** | Where does section-tracking state live — on `PortfolioClient`, in a dedicated hook, or directly in the nav component? |
| **Q2** | Which sections need IDs for targeting — what are the existing IDs in `PortfolioClient.tsx` (e.g. `#contact`, `#work`, etc.)? |
| **Q3** | Is an `IntersectionObserver` (multiple thresholds) or a `scroll` + `getBoundingClientRect` approach the right fit here — which avoids the most edge cases with the sticky header offset? |
| **Q4** | How does the active state feed into C19's container-driven nav? The desktop nav links and hamburger menu items are rendered from the same or different source — do they share the same active prop, or is there a separate highlight mechanism per context? |
| **Q5** | Does the hamburger menu need to remain open / reflect the active section while the user scrolls, or only show the active section at the moment it opens? |
| **Q6** | What change is needed in the existing `Header` component to accept and render an `activeSection` prop? |

### Acceptance

Spike is complete when all questions are answered and we can describe: which hook/state owns section tracking, which DOM IDs are observed, how the active value flows to both the header nav and the hamburger menu, and what concrete changes are needed to `PortfolioClient.tsx` and the `Header` component to wire it up.

---

## Findings

### Q1 — State location

`activeSection: string | null` lives on `PortfolioClient` as a `useState`, alongside the existing `scrolled` state. It is passed down as a prop to `Header`. This mirrors exactly what `scrolled` already does — same pattern, one more prop. No new abstraction layer needed.

Alternatively, a `useActiveSection(ids)` hook can be extracted from `PortfolioClient` to keep the root clean:

```ts
// hooks/useActiveSection.ts
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => { /* observers */ }, []);
  return active;
}
// PortfolioClient:
const activeSection = useActiveSection(['audit', 'work', 'about', 'contact']);
```

Both work. The hook form is cleaner for a standalone file; inlining in `PortfolioClient` saves a file. Either is fine.

### Q2 — Existing section IDs

Confirmed from `PortfolioClient.tsx`:

| Section | ID |
|---------|----|
| AuditOffer | `audit` |
| Work | `work` |
| About | `about` |
| Process | `process` |
| Contact | `contact` |

Hero has **no id**. Problem has **no id**. The nav links are: Work · Audit · About · Contact — no Process link. So we only need to observe and highlight 4 sections: `#audit`, `#work`, `#about`, `#contact`.

Process (`#process`) has an id but no nav link — it does not participate in R42.

### Q3 — IntersectionObserver vs scroll approach

Use **IntersectionObserver** with one observer per section and a rootMargin that compensates for the sticky header height and provides a clean centre-of-viewport trigger:

```ts
const rootMargin = '-70px 0px -55% 0px';
// "-70px top" = ignores the sticky header band
// "-55% bottom" = triggers when section top enters the upper 45% of viewport
```

Whichever section fires `isIntersecting: true` first (in document order) becomes active. When a section fires `isIntersecting: false`, clear active only if no other section is currently intersecting — this avoids flickering between sections while scrolling through overlap zones.

IntersectionObserver is the right call: no scroll listener, no layout-forcing `getBoundingClientRect`, passive by default.

### Q4 — Active state flow to desktop nav and hamburger menu

In `Header`, the nav links are currently hardcoded inline:

```tsx
function Header({ scrolled, fonts }: { scrolled: boolean; fonts: FontSet }) {
  // nav: <a href="#work">, <a href="#audit">, <a href="#about">, <a href="#contact">
}
```

The change is:
1. Add `activeSection: string | null` to the `Header` props signature
2. The same nav link array drives both desktop nav and the hamburger overlay (C19 rework will introduce a shared `navLinks` array)
3. A single helper decides active style: `href === '#' + activeSection`

Both desktop links and hamburger links render from the same source array — one `activeSection` prop satisfies both contexts. No separate mechanism per context.

### Q5 — Hamburger + live scroll

Since `activeSection` is reactive state on `PortfolioClient` and `Header` is always mounted, the hamburger overlay will automatically reflect the current active section at the instant it opens — and will update if the user scrolls while the menu is open. No special handling required.

### Q6 — Header changes

Concrete diff:

```tsx
// Before
function Header({ scrolled, fonts }: { scrolled: boolean; fonts: FontSet }) {
// After
function Header({ scrolled, fonts, activeSection }: {
  scrolled: boolean;
  fonts: FontSet;
  activeSection: string | null;
}) {
```

Nav link active style (desktop and hamburger):

```tsx
const navLinks = [
  { href: '#work',    label: 'Work' },
  { href: '#audit',   label: 'Audit' },
  { href: '#about',   label: 'About' },
  { href: '#contact', label: 'Contact' },
];

// Per link — add active class or ::after force
const isActive = link.href === '#' + activeSection;
// Option A: force underline via className
className={`navlink${isActive ? ' navlink--active' : ''}`}
// globals.css: .navlink--active::after { transform: scaleX(1); }
```

`.navlink--active` is a single CSS rule added to `globals.css` — the `::after` underline that currently only shows on hover is also shown when the class is present.

### New C part

This spike resolves the missing mechanism. A new C part should be added to the shaping doc:

**C28** — `activeSection` state (`string | null`) on `PortfolioClient`; `useEffect` sets up one `IntersectionObserver` per nav section (`#audit`, `#work`, `#about`, `#contact`) with `rootMargin: '-70px 0px -55% 0px'`; `activeSection` passed to `Header` as prop; `.navlink--active` CSS class in `globals.css` forces `::after` underline visible; same class applied to hamburger menu links via the shared `navLinks` array.

### Fit check impact

R42 was marked ✅ for C with no mechanism. C28 is now that mechanism. No fit check changes needed — the ✅ was correct, just unsupported. Add C28 to the shape C parts table.
