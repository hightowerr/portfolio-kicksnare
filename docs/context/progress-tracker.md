# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

---

## Current Phase

Idle — Let's Talk Rework V1 complete

---

## Current Goal

None active.

---

## Completed

- Shaping: `docs/feature-specs/audit-fig-shaping.md`
- Slices: `docs/feature-specs/audit-fig-slices.md`
- Implementation plan: `docs/feature-specs/audit-fig-V1-plan.md`
- AuditFig V1 implemented in `components/PortfolioClient.tsx`
- Replaced broken-image X placeholder inside the SVG browser mockup with a real Unsplash tradesman photo via `<foreignObject>`
- Fixed "No hook" annotation overlap with photo — pill moved above the dashed box with downward arrow
- Photo sized to x=448, y=136, w=264, h=252 inside the SVG viewBox
- AuditFig container switched from fixed `height: 520` to `aspectRatio: '800 / 520'` so it scales naturally with the column width
- OQ-1 resolved in practice: AuditFig is an intentional illustration, not a placeholder — exception to Brand Non-Negotiable #5 is accepted
- Shaping: `docs/feature-specs/hero-word-rotation/hero-word-rotation-shaping.md`
- Slices: `docs/feature-specs/hero-word-rotation/hero-word-rotation-slices.md`
- Slice 1 plan: `docs/feature-specs/hero-word-rotation/hero-word-rotation-slice-1-plan.md`
- Slice 2 plan: `docs/feature-specs/hero-word-rotation/hero-word-rotation-slice-2-plan.md`
- Hero word rotation implemented — `components/RotatingWord.tsx` with clip-mask yPercent slide, dimension lock, GSAP timeline, and screen-reader accessibility
- Let's Talk rework V1 complete — `ContactModal` added to `PortfolioClient.tsx`; Contact right column replaced with "Contact us" (opens modal) + "Book a slot" (external link); Formspree POST handler (`meedaznk`); hover: orange wash `rgba(255,94,0,0.10)` + `translateY(-3px)` via `onMouseEnter`/`onMouseLeave` on all three cards

---

## In Progress

Nothing active.

---

## Next Up

- Review full section balance at various viewport widths
- Consider whether `ui-context.md` Brand Non-Negotiable #5 needs updating to document the illustration exception

---

## Open Questions

None active.

---

## Architecture Decisions

**AuditFig container sizing:** Uses `aspectRatio: '800 / 520'` + `width: 100%` rather than a fixed pixel height, so the card scales proportionally with the grid column. SVG uses `preserveAspectRatio="xMidYMid meet"` — no cropping.

**Unsplash photo in SVG:** Embedded via `<foreignObject>` + `<img>` rather than SVG `<image href>`, which is silently blocked by browsers for cross-origin URLs in inline SVGs.

---

## Session Notes

2026-05-18 — Shaping, spiking, breadboarding, and slicing completed for AuditFig. Implementation blocked on OQ-1.
2026-05-18 — AuditFig V1 implemented and iterated. Unsplash tradesman photo embedded in SVG mockup. Annotation overlap fixed. Container sizing corrected to aspect-ratio based.
2026-05-19 — Hero word rotation V1 implemented. RotatingWord component created. Cycling: digital products → landing pages → web apps → growth tools. GSAP power3.inOut, cleanup on unmount, aria-hidden + visually-hidden a11y span.
2026-05-19 — Updated AuditFig description copy in `components/PortfolioClient.tsx`: replaced "personalized Loom" framing with clearer outcome-first language.
2026-05-19 — Updated AuditFig deliverable bullets in `components/PortfolioClient.tsx`: reworded all four items for clarity and changed delivery window from 24 to 48 hours.
2026-05-19 — Revised first deliverable bullet: "A video walkthrough recorded just for your site—not a generic checklist."
2026-05-19 — Rewrote (02) Problem section in `components/PortfolioClient.tsx`: updated eyebrow label, heading, intro paragraph, and all four pain-point titles and descriptions with plain-language, outcome-first copy.
2026-05-19 — Second rewrite of (02) Problem section: heading changed to "Most small business websites convert less than 1 in 100 visitors." Intro reframed around the 99-out-of-100 stat. All four pain card titles and body copy replaced with sharper, two-beat narrative per card.
2026-05-19 — Removed "Next slot · Jun · 2 open" entry from the About section info card in `components/PortfolioClient.tsx`.
2026-05-19 — Rewrote About section body copy in `components/PortfolioClient.tsx`: split single paragraph into two, updated guarantee quote to "If we miss the brief, we fix it free. If you still don't want it, you don't pay."
2026-05-19 — Updated About section heading to "Most agencies take six months. We're done in six weeks."
2026-05-19 — Hidden the Services grid in the About section (`components/PortfolioClient.tsx`); markup preserved in a comment.
2026-05-19 — Rewrote (05) Process section: heading changed to "Four steps. You know the price, the timeline, and the target before we start." Intro updated. Step titles renamed Look / Agree / Build / Measure with new body copy per step.
2026-05-20 — Let's Talk rework V1 complete. `ContactModal` wired to Formspree (`meedaznk`). React 19 async handler bug fixed (sync `.then/.catch` pattern). Hover sourced from HTML prototype: orange wash + `translateY(-3px)` via inline `onMouseEnter`/`onMouseLeave`.

