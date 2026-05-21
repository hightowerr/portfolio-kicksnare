---
shaping: true
---

# Let's Talk — Slices

Derived from: `lets-talk-shaping.md` — Shape A (Inline modal + Formspree), all requirements pass.

---

## Slices

| # | Slice | Demo |
|---|-------|------|
| V1 | Replace right cards + full contact modal with form + Formspree | Contact section shows two clickable cards; Contact Us opens modal; form submits and shows success/error |

One slice — the modal without the form isn't a useful demo state.

---

## V1: Full Let's Talk Rework

### UI Affordances

| ID | Place | Affordance | Type | Wires Out |
|----|-------|-----------|------|-----------|
| U1 | Contact section | "Contact us" button card — eyebrow "Email", value "Contact us", 40×40 accent arrow circle | Button | → opens modal (N1) |
| U2 | Contact section | "Book a slot" link card — eyebrow "Availability", value "Book a slot", 40×40 accent arrow circle | Link | → `https://proj-astro-seven.vercel.app/book/kicksnare` (new tab) |
| U3 | Modal | Dark overlay backdrop | Backdrop | click → closes modal (N1) |
| U4 | Modal | Card — `--primary` bg, `var(--paper)` text, 28px radius, max-width 520px | Container | — |
| U5 | Modal | Close button (×) — top-right, 36×36, semi-transparent | Button | → closes modal (N1) |
| U6 | Modal | Eyebrow "Get in touch" + heading "Let's *talk.*" | Display | — |
| U7 | Modal | Name input — required, placeholder "Name" | Input | → N3 |
| U8 | Modal | Email input — required type=email, placeholder "Email" | Input | → N3 |
| U9 | Modal | Message textarea — required, 4 rows, placeholder "Message" | Textarea | → N3 |
| U10 | Modal | "Send message →" submit button — accent bg, pill shape | Button | → N4 |
| U11 | Modal | Loading state — button text "Sending…", opacity 0.7, disabled | State | — |
| U12 | Modal | Success state — accent check circle + "Message sent." + sub copy | State | replaces form |
| U13 | Modal | Error message — "Something went wrong — please try again." | State | inline below textarea |

### Non-UI Affordances

| ID | Affordance | Wires Out |
|----|-----------|-----------|
| N1 | `modalOpen: boolean` state in `Contact` | U3/U4/U5 render conditionally |
| N2 | Esc keydown listener — added/removed on modal mount | → closes modal (N1 = false) |
| N3 | Form field state — `name`, `email`, `message` strings | → N4 on submit |
| N4 | Submit status state — `'idle' \| 'loading' \| 'success' \| 'error'` | → U10/U11/U12/U13 |
| N5 | Body scroll lock — `document.body.style.overflow = 'hidden'` on mount, restored on unmount | — |
| N6 | Formspree handler — `fetch POST https://formspree.io/f/meedaznk` with `{name, email, message}` JSON body, `Accept: application/json` | → N4 = success \| error |

### Wiring by Place

```
Contact section
  U1 (Contact us card)
    onClick ──────────────────────────────► N1 = true (open modal)

  U2 (Book a slot card)
    href ─────────────────────────────────► booking URL (new tab)

Modal (renders when N1 = true)
  N2 (Esc listener)
    keydown:Escape ───────────────────────► N1 = false (close)

  N5 (scroll lock)
    mount ────────────────────────────────► body.overflow = hidden
    unmount ──────────────────────────────► body.overflow = ''

  U3 (backdrop)
    onClick ──────────────────────────────► N1 = false (close)

  U5 (close button)
    onClick ──────────────────────────────► N1 = false (close)

  U7/U8/U9 (form fields)
    onChange ─────────────────────────────► N3 (field state)

  U10 (submit button)
    onClick ──────────────────────────────► N4 = loading
                                            N6 (fetch POST)
                                              res.ok ─────► N4 = success → U12
                                              !res.ok ────► N4 = error  → U13
                                              catch ──────► N4 = error  → U13
```

### Affected Files

| File | Change |
|------|--------|
| `components/PortfolioClient.tsx` | Add `ContactModal` function above `Contact`; rewrite `Contact` function (lines 565–606) |
