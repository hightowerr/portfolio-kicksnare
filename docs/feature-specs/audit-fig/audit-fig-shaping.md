---
shaping: true
---

# AuditFig — Shaping

**Source spec:** `docs/feature-specs/audit-fig.md`

---

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | Replace the generic striped placeholder in `AuditOffer` with a visual that reads as "site audit recording in progress" | Core goal |
| R1 | Visual reinforces the lead magnet mechanism — a real broken site being reviewed on a screen recording | Must-have |
| R2 | Self-contained — no new files, no new imports beyond what already exists in the codebase | Must-have |
| R3 | Uses design token values throughout; no hardcoded hex values in component files (invariant #4) | Must-have |
| R4 | Does not use CSS `box-shadow` or `--shadow-lg`, which are reserved for the case-study modal shell (invariant #7) | Must-have |
| R5 | Decorative only — `aria-hidden="true"`; produces no screen reader noise | Must-have |
| R6 | Scales responsively across viewport widths without breaking layout or clipping content | Must-have |
| R7 | Introduces no architecture invariant violations (no new `'use client'` boundaries, no external assets, no new dependencies) | Must-have |
| 🟡 R8 | Reads as a purposeful illustration — not a pixel-level imitation of real UI or photography (`ui-context.md` rule) | Must-have |

---

## A: Inline SVG Illustration

A self-contained React function (`AuditFig`) rendering an inline SVG. No new file. No import. Dropped in immediately after `StripedFig` in `PortfolioClient.tsx`, then substituted for `<StripedFig>` inside `AuditOffer`.

| Part | Mechanism |
|------|-----------|
| A1 | Outer `<div>` wrapper — `background: 'var(--paper-2)'`, `border: 'var(--border-hair)'`, 520px tall, `borderRadius: 28`, `overflow: hidden` |
| A2 | Stripe pattern via `<pattern>` + `<defs>` — diagonal lines via `style={{stroke: 'var(--line)'}}`. Token `--line` = `rgba(6,55,45,0.10)`; spec used `0.06` but no token exists at that alpha. `--line` is the correct token; visual delta is negligible. |
| A3 | Browser chrome card — white `<rect>` with `<feDropShadow>` SVG filter (not CSS `box-shadow`). Plain grey header bar only — no traffic lights, no URL bar. `floodColor` stays hardcoded (`rgba(1,11,9,0.10)`) — CSS vars unreliable in SVG filter primitives cross-browser. |
| A4 | Schematic page content — abstract rects for nav zone, headline zone, body text zone, footer zone; broken image placeholder (X lines). No element mimics a specific OS or browser UI detail. Grays are illustration-internal, not Kicksnare tokens. |
| A5 | Audit annotation overlays — two dashed `<rect>` highlights (`fill="rgba(255,94,0,0.08/0.10)"` kept as attribute; semi-transparent derived values have no token) with `style={{stroke: 'var(--accent)'}}`. Dark callout bubbles via `style={{fill: 'var(--ink)'}}`. Callout text via `style={{fill: 'var(--paper)'}}`. |
| A6 | Cursor glyph — `<path>` with `style={{fill: 'var(--paper)'}}`. Outline `stroke="#333"` stays hardcoded (no cursor-outline token). |
| A7 | REC indicator — `<circle style={{fill: 'var(--accent)'}}/>` + `<text style={{fill: 'var(--ink)'}}/>` in top-right margin above browser card. |

**Removed (R8 violations):**
- Traffic lights (`#FF5F56`, `#FFBD2E`, `#27C93F` circles) — literal macOS UI; imitation not illustration
- URL bar rect + `yoursite.com` text — literal browser chrome detail; same reason

**Alternatives considered and set aside:**
- **B: Static raster image** — requires a new file in `public/assets/`. Fails R2.
- **C: Annotated StripedFig** — no browser frame; stripes don't signal "screen recording." Fails R1.

---

## Fit Check: R × A

| Req | Requirement | Status | A |
|-----|-------------|--------|---|
| R0 | Replace striped placeholder with "audit in progress" visual | Core goal | ✅ |
| R1 | Reinforces lead magnet — broken site under screen recording | Must-have | ✅ |
| R2 | No new files; no new imports | Must-have | ✅ |
| R3 | No hardcoded hex values; design tokens only (invariant #4) | Must-have | ✅ |
| R4 | No CSS `box-shadow` / `--shadow-lg` (reserved for modal) | Must-have | ✅ |
| R5 | `aria-hidden="true"`; silent to screen readers | Must-have | ✅ |
| R6 | Responsive scaling across viewport widths | Must-have | ✅ |
| R7 | No invariant violations | Must-have | ✅ |
| 🟡 R8 | Reads as purposeful illustration, not fake UI imitation | Must-have | ✅ |

**Notes:**
- R3: Branded colors applied via `style` prop. Illustration-internal grays are not design tokens. `floodColor` in `feDropShadow` stays hardcoded — CSS vars unreliable in SVG filter primitives. Semi-transparent annotation fills have no token equivalent.
- R4: `feDropShadow` is an SVG filter primitive, not the CSS `box-shadow` / `--shadow-lg` restricted by invariant #7.
- R6: `preserveAspectRatio="xMidYMid meet"` on SVG root. Outer wrapper `width: 100%` + fixed `height: 520`.
- R8: Traffic lights and URL bar removed. Browser frame is a plain schematic outline + header bar — reads as diagram, not screenshot.

---

## Shape is ready to implement

All requirements pass. No open items.
