---
shaping: true
---

# Hero Word Rotation — Slices

Implements Shape A (clip-mask yPercent slide) from `hero-word-rotation-shaping.md`.

Two vertical slices. Slice 1 gives a demoed static shell with locked dimensions. Slice 2 adds motion and accessibility — the complete feature.

---

## Slice 1 — Static shell with dimension lock

**Goal:** `RotatingWord` renders in the H1, "digital products" is visible in correct Instrument Serif italic style, clip container dimensions are locked before first paint. No animation. Confirms structural correctness before adding GSAP.

**Parts covered:** A1, A2, A3, A4

### UI Affordances

| ID | Affordance | Place |
|----|-----------|-------|
| U1 | Clip container `<span>` — `display: inline-block`, `overflow: hidden`, `verticalAlign: text-bottom`, `width`/`height` set by A4 | `RotatingWord` |
| U2 | Word stack `<span>` — inner GSAP target, `display: inline-flex`, `flexDirection: column` | `RotatingWord` |
| U3 | Word `<span>` × 4 — reversed DOM order (growth tools → web apps → landing pages → digital products), each `display: block`, Instrument Serif italic | `RotatingWord` |

### Non-UI Affordances

| ID | Affordance | Place |
|----|-----------|-------|
| N1 | `WORDS` constant — `["digital products", "landing pages", "web apps", "growth tools"]` | `RotatingWord` |
| N2 | `containerRef` — ref on the clip container span | `RotatingWord` |
| N3 | `stackRef` — ref on the word stack span | `RotatingWord` |
| N4 | `useLayoutEffect` — measures all word spans via `getBoundingClientRect()`; sets container `width` = max word width, `height` = single word height | `RotatingWord` |

### Wiring

```
PortfolioClient (h1)
  └── <RotatingWord />                     ← replaces static <span>digital products</span>
        ├── clip container [U1]             ← containerRef [N2] sized by useLayoutEffect [N4]
        │     └── word stack [U2]           ← stackRef [N3]
        │           ├── <span>growth tools</span>    [U3] — index 0 (top of DOM)
        │           ├── <span>web apps</span>        [U3]
        │           ├── <span>landing pages</span>   [U3]
        │           └── <span>digital products</span>[U3] — index 3 (bottom; visible on load)
        └── (no a11y span yet — added in Slice 2)
```

### Demo check

- H1 reads: "We build the *digital products* you need to grow."
- Italic serif weight matches the pre-rotation static span
- No CLS: clip container holds its width/height from `useLayoutEffect` before paint
- No animation — word is static

---

## Slice 2 — GSAP animation + accessibility

**Goal:** Words cycle with the downward slide animation. Screen readers receive the stable full sentence. GSAP context is cleaned up on unmount.

**Parts covered:** A5, A6

**Depends on:** Slice 1 merged and demoed.

### UI Affordances

| ID | Affordance | Place |
|----|-----------|-------|
| U4 | Visually-hidden `<span>` — absolute position, 1×1 px, `clip: rect(0,0,0,0)`, contains "digital products"; gives screen readers a stable sentence | `RotatingWord` |
| U5 | Animated clip container — gains `aria-hidden="true"` to suppress cycling announcements | `RotatingWord` (update U1) |

### Non-UI Affordances

| ID | Affordance | Place |
|----|-----------|-------|
| N5 | `gsap.context()` — wraps timeline; reverted in `useEffect` cleanup | `RotatingWord` |
| N6 | `gsap.set()` on mount — positions stack at `yPercent: -75` (shows "digital products") | `RotatingWord` |
| N7 | `gsap.timeline({ repeat: -1 })` — three steps: `yPercent -75 → -50 → -25 → 0`, each preceded by a `+=2.5` hold, `duration: 0.45`, `ease: "power3.inOut"`; instant `set()` back to `-75` at end of each cycle | `RotatingWord` |

### Wiring

```
PortfolioClient (h1)
  └── <RotatingWord />
        ├── clip container [U1 + U5: aria-hidden]
        │     └── word stack [U2]             ← GSAP target [N6, N7]
        │           ├── growth tools  [U3]
        │           ├── web apps      [U3]
        │           ├── landing pages [U3]
        │           └── digital products [U3]
        └── visually-hidden span [U4]         ← "digital products" for screen readers

useEffect cleanup → gsap context [N5].revert()
```

### Timeline trace (from shaping doc)

```
t=0       gsap.set  → yPercent: -75   "digital products" visible
t=2.5     animate   → yPercent: -50   "landing pages" enters from above   (0.45s)
t=4.95    hold
t=5.45    animate   → yPercent: -25   "web apps" enters from above        (0.45s)
t=7.9     hold
t=8.4     animate   → yPercent:  0    "growth tools" enters from above    (0.45s)
t=10.85   hold
t=13.35   gsap.set  → yPercent: -75   instant snap back; loop repeats
```

### Demo check

- Words cycle: digital products → landing pages → web apps → growth tools → (repeat)
- Downward slide; easing matches `power3.inOut` (site motion principle)
- H1 does not reflow during transitions
- No GSAP warnings in console on fast-refresh unmount/remount

---

## File changes summary

| File | Action |
|------|--------|
| `components/RotatingWord.tsx` | **Create** — new `"use client"` component containing A1–A6 |
| `components/PortfolioClient.tsx` | **Edit** — replace static `<span>digital products</span>` with `<RotatingWord />` |
| `package.json` / `pnpm-lock.yaml` | **Edit** — `pnpm add gsap` (3.15.0); no premium plugins |
