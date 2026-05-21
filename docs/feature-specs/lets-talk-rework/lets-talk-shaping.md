---
shaping: true
---

# Let's Talk Section — Shaping

## Source

> the lets talk section needs a rework. First the email should be replaced with a simple contact us CTA which when clicked opens a pop-up form for name, email, message and send CTA which send the email to 'info@kicksnare.digital'. Secondly the next slots section is replace by a link to book a slot. I will provide the link.

---

## Design Reference (from HTML prototype)

Screenshot captured from `Kicksnare Portfolio.html` — Contact section:

| Element | Prototype value | Current code |
|---------|----------------|--------------|
| Section eyebrow | `(06) Let's talk` | `(06) Let's talk` |
| Headline | "Request your *free audit.*" | "Request your *free audit.*" |
| X card copy | "Tell me what you're trying to move and I'll tell you if I can help." | Longer copy + guarantee quote |
| Email card | Static: eyebrow "EMAIL" + value "hi@kicksnare.studio" | Static: eyebrow "EMAIL" + value "info@kicksnare.digital" |
| Book slot card | Static: eyebrow "NEXT SLOT" + value "Jun · 2 open" + sub "Sprint or retainer." | "Book a 30 minute intro" |
| Right card arrow | None (static cards) | None (static cards) → **A1-β / A2-β add accent arrow circle** |

The new A1 and A2 cards match the right-card shell from the prototype (dark green bg, subtle border, ~22px radius) and add a 40×40 accent arrow circle on the right edge to signal interactivity — consistent with the X card pattern.

---

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | Replace static email display with a Contact Us CTA button | Core goal |
| R1 | CTA opens a modal popup with name, email, message fields + Send button | Core goal |
| R2 | Form submission sends email to `info@kicksnare.digital` via Formspree | Core goal |
| R3 | Replace "Next slot" card with a "Book a slot" link card | Core goal |
| R4 | Visual design stays consistent with the existing dark section aesthetic | Must-have |
| R5 | No backend required — form posts to Formspree API | Must-have |

---

## Selected Shape: A — Inline modal + Formspree

| Part | Mechanism |
|------|-----------|
| A1 | Contact card — full clickable `<button>` card (A1-β): eyebrow "Email" + value "Contact us" + accent arrow circle; `onClick` opens ContactModal |
| A2 | Book slot card — full clickable `<a>` card (A2-β): eyebrow "Availability" + value "Book a slot" + accent arrow circle; links to booking URL |
| A3 | Modal component — `ContactModal` rendered at root level, toggled by `useState` in `Contact`; backdrop click + Esc closes |
| A4 | Form fields — name, email, message (textarea); client-side required validation before submit |
| A5 | Formspree submit — `fetch POST` to `https://formspree.io/f/meedaznk` with JSON body; show success/error state inline |
| A6 | Modal styling — dark overlay, card matches `--primary` bg + `var(--paper)` text, same border radius/tokens as existing cards |

---

## Credentials & URLs

| Key | Value |
|-----|-------|
| Formspree endpoint | `https://formspree.io/f/meedaznk` |
| Booking URL | `https://proj-astro-seven.vercel.app/book/kicksnare` |
| Send-to address | `info@kicksnare.digital` (configured in Formspree dashboard) |

---

## Fit Check: R × A

| Req | Requirement | Status | A |
|-----|-------------|--------|---|
| R0 | Replace static email display with a Contact Us CTA button | Core goal | ✅ |
| R1 | CTA opens modal with name, email, message + Send | Core goal | ✅ |
| R2 | Sends to `info@kicksnare.digital` via Formspree (`meedaznk`) | Core goal | ✅ |
| R3 | Next slot replaced with Book a slot link | Core goal | ✅ |
| R4 | Consistent dark section visual design | Must-have | ✅ |
| R5 | No backend required | Must-have | ✅ |

**Shape A selected. All requirements pass.**

---

## Affected File

`components/PortfolioClient.tsx` — `Contact` function, lines 565–606.
New component: `ContactModal` added above `Contact`.
