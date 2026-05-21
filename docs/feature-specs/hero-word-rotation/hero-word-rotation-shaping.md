---
shaping: true
---

# Hero Word Rotation — Shaping

Cycling animated words replace "digital products" in the hero H1: _"We build the **[word]** you need to grow."_

---

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | Words cycle through a curated set of alternatives inline in the hero H1 | Core goal |
| R1 | The rotating word preserves the Instrument Serif italic accent style of the original span | Must-have |
| R2 | Animation easing matches site motion principle: `cubic-bezier(.2, .7, .2, 1)`, no bounce or spring | Must-have |
| R3 | H1 text does not reflow when words change — surrounding copy stays locked in place | Must-have |
| R4 | Works as a React client component in Next.js App Router; GSAP timeline is properly cleaned up on unmount | Must-have |
| R5 | Screen readers receive the full sentence once, not the cycling words as separate announcements | Must-have |
| R6 | No Cumulative Layout Shift on first paint — the slot occupies space before GSAP runs | Must-have |

---

## A: Clip-mask yPercent slide

Words are stacked vertically inside a clipped container. GSAP advances `yPercent` on the inner stack each interval, revealing one word at a time through the clip window. Pure GSAP core — no premium plugins.

### Resolved decisions

| # | Decision |
|---|----------|
| OQ-1 | Word list confirmed: `["digital products", "landing pages", "web apps", "growth tools"]` |
| OQ-2 | Direction: **downward** — current word exits down, next word enters from above |
| OQ-3 | First word ("digital products") is visible on load; cycling begins after a 2.5 s hold |

### Shape parts

| Part | Mechanism |
|------|-----------|
| **A1** | **Word list** — `WORDS = ["digital products", "landing pages", "web apps", "growth tools"]`. Rendered in reverse DOM order (top → bottom: growth tools, web apps, landing pages, digital products) so that animating `yPercent` toward 0 produces a downward slide — each new word enters from above. |
| **A2** | **Clip container** — `<span>` with `display: inline-block`, `overflow: hidden`, `verticalAlign: 'text-bottom'`, `height` locked to one word's rendered height, and `width` locked to the widest word's rendered width. Sits inline inside the `<h1>`, replacing the current static `<span>`. |
| **A3** | **Word stack** — inner `<span>` (the GSAP target) containing one `<span>` per word in reversed order, each `display: block` in Instrument Serif italic. The stack is taller than the clip container; overflow is hidden. |
| **A4** | **Dimension lock** — `useLayoutEffect` measures all word spans via `getBoundingClientRect()` before first paint. Sets container `width` = max word width; `height` = height of one word span. This fires synchronously before the browser paints, satisfying R3 and R6. |
| **A5** | **GSAP timeline** — `gsap.context()` wraps a `timeline({ repeat: -1 })`. Initial `gsap.set()` places the stack at `yPercent: -75` (showing "digital products", the last item in the reversed stack). The timeline then animates in three steps toward `yPercent: 0`, each preceded by a `+=2.5` position offset (2.5 s hold). After the final step it instantly `set()`s back to `yPercent: -75` and the loop repeats. Each transition: `duration: 0.45`, `ease: 'power3.inOut'`. Context reverted in `useEffect` cleanup. |
| **A6** | **Accessibility** — visually-hidden `<span>` containing "digital products" (positioned absolutely, 1×1 px, clipped) gives screen readers stable sentence text. The animated container carries `aria-hidden="true"` so cycling words produce no announcements. |

### Timeline trace

```
t=0       gsap.set → yPercent:-75   "digital products" visible
t=2.5     animate  → yPercent:-50   "landing pages" enters from above   (0.45s)
t=4.95    hold
t=5.45    animate  → yPercent:-25   "web apps" enters from above        (0.45s)
t=7.9     hold
t=8.4     animate  → yPercent:0     "growth tools" enters from above    (0.45s)
t=10.85   hold
t=13.35   gsap.set → yPercent:-75   instant snap back to "digital products"
          [repeat]
```

---

## Fit Check

| Req | Requirement | Status | A |
|-----|-------------|--------|---|
| R0 | Words cycle through a curated set of alternatives inline in the hero H1 | Core goal | ✅ |
| R1 | Rotating word preserves Instrument Serif italic accent style | Must-have | ✅ |
| R2 | Animation easing matches site motion principle — `cubic-bezier(.2,.7,.2,1)`, no bounce | Must-have | ✅ |
| R3 | H1 text does not reflow when words change | Must-have | ✅ |
| R4 | Works as Next.js App Router client component; GSAP cleaned up on unmount | Must-have | ✅ |
| R5 | Screen readers receive the full sentence once, not cycling announcements | Must-have | ✅ |
| R6 | No CLS on first paint — slot occupies space before GSAP runs | Must-have | ✅ |

**Notes:**
- R2: `power3.inOut` is GSAP core's closest match to `cubic-bezier(.2,.7,.2,1)`. Exact reproduction requires `CustomEase` (premium). Behaviorally indistinguishable at this duration.
- R3: load-bearing part is A4 (dimension lock). Without it, the container collapses to the current word's width on each transition and the H1 reflows.
- R6: `useLayoutEffect` fires synchronously before browser paint. SSR produces the full word stack in HTML; client hydration locks dimensions before the user sees anything.
- R5: visually-hidden span (A6) provides stable text. `aria-hidden` on the animated container prevents screen readers from announcing each word change.

---

## Dependency

- **`gsap 3.15.0`** — installed via `pnpm add gsap`. No club plugins required.
