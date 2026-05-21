---
shaping: true
slice: 1
---

# Let's Talk — V1 Implementation Plan

Full rework in one slice. Adds `ContactModal` component and rewrites the right half of the `Contact` section.

**Depends on:** Nothing — no new dependencies, no new files outside `PortfolioClient.tsx`.  
**Demo:** Contact section shows two clickable cards (Contact us → modal, Book a slot → new tab). Modal opens with a form; submits to Formspree; shows success or inline error state.

---

## Step 1 — Add `Close` to the icons import

`PortfolioClient.tsx` line 4 currently imports:

```tsx
import { Soundwave, ArrowRight, ArrowDiag, Plus, Check } from './icons';
```

Add `Close`:

```tsx
import { Soundwave, ArrowRight, ArrowDiag, Plus, Check, Close } from './icons';
```

`Close` exists in `icons.tsx` — no new file needed.

---

## Step 2 — Add `ContactModal` above the `Contact` function

Insert the following block immediately before the `// ─── Contact` comment at line 565.

### 2a — Component signature and state

```tsx
// ─── ContactModal ────────────────────────────────────────────────────────────
function ContactModal({ onClose, fonts }: { onClose: () => void; fonts: FontSet }) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
```

### 2b — N2: Esc listener

Added/removed on mount/unmount so it never leaks after the modal closes.

```tsx
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);
```

### 2c — N5: Body scroll lock

```tsx
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
```

### 2d — N6: Formspree submit handler

```tsx
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/meedaznk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }
```

### 2e — Shared input style (defined inside the component so it can reference `fonts.display`)

```tsx
  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid rgba(249,254,253,0.18)',
    background: 'rgba(249,254,253,0.06)',
    color: 'var(--paper)',
    fontFamily: fonts.display,
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
  };
```

### 2f — JSX return

```tsx
  return (
    // U3: dark overlay backdrop — click closes modal
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(1,11,9,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* U4: modal card — stopPropagation prevents backdrop click from firing */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: 'var(--primary)',
          color: 'var(--paper)',
          borderRadius: 28,
          maxWidth: 520,
          width: '100%',
          padding: '44px 44px 40px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* U5: close button — 36×36, semi-transparent pill, top-right */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 36, height: 36, borderRadius: 999,
            background: 'rgba(249,254,253,0.10)',
            border: '1px solid rgba(249,254,253,0.15)',
            cursor: 'pointer',
            color: 'var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s',
          }}
        >
          <Close size={14} />
        </button>

        {/* U6: eyebrow + heading */}
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(249,254,253,0.55)', marginBottom: 14,
        }}>
          Get in touch
        </div>
        <h2 style={{
          margin: '0 0 32px',
          fontFamily: fonts.display, fontWeight: 500,
          fontSize: 34, letterSpacing: '-0.022em', lineHeight: 1.0,
          color: 'var(--paper)',
        }}>
          Let&apos;s{' '}
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.015em' }}>
            talk.
          </span>
        </h2>

        {/* U12: success state — replaces form entirely */}
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 999,
              background: 'var(--accent)', color: '#06372d',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Check size={20} />
            </div>
            <div style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 500, color: 'var(--paper)', marginBottom: 10 }}>
              Message sent.
            </div>
            <div style={{ fontSize: 14, color: 'rgba(249,254,253,0.6)', lineHeight: 1.5 }}>
              We&apos;ll get back to you within 24 hours.
            </div>
          </div>
        ) : (
          // U7 / U8 / U9 / U10 / U11 / U13
          <form onSubmit={handleSubmit} noValidate>
            {/* U7: name */}
            <input
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
            {/* U8: email */}
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ ...inputStyle, marginTop: 12 }}
            />
            {/* U9: message */}
            <textarea
              required
              rows={4}
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ ...inputStyle, marginTop: 12, resize: 'vertical' }}
            />
            {/* U13: error message — inline below textarea */}
            {status === 'error' && (
              <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--accent)', lineHeight: 1.4 }}>
                Something went wrong — please try again.
              </p>
            )}
            {/* U10 / U11: submit button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                marginTop: 20,
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--accent)',
                border: 'none',
                color: '#06372d',
                fontFamily: fonts.display, fontWeight: 500, fontSize: 14,
                padding: '11px 20px',
                borderRadius: 999,
                cursor: status === 'loading' ? 'default' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'opacity .2s',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Send message →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

### Constraints

- `e.stopPropagation()` on the card div is load-bearing — without it, any click inside the modal propagates to the backdrop and closes immediately.
- `onClose` is passed in from `Contact`; the `useEffect` dep array includes it so the ESC handler always calls the current reference.
- `boxShadow: 'var(--shadow-lg)'` is intentional — architecture invariant 7 explicitly permits `--shadow-lg` on modals.
- `noValidate` on `<form>` disables browser native validation bubbles; the `required` attributes remain for accessibility semantics. Formspree handles server-side validation.
- `inputStyle` is defined inside the component, not at module level, because it references `fonts.display` (a prop). Do not hoist it.
- The success state renders in place of the form; the modal heading stays visible above it. Do not unmount the whole modal on success.
- `<p>` for the error message (U13) uses `margin: '10px 0 0'` to avoid layout shift — the element is conditionally rendered but its space is below the textarea, not between fixed elements.

---

## Step 3 — Rewrite the `Contact` function (lines 565–606)

Replace the entire `Contact` function with the version below.

### Key changes vs. current

| What changes | Before | After |
|---|---|---|
| State | None | `modalOpen: boolean` (N1) |
| Right column children | Two info-only `<div>` cards (Email, Next slot) | `<button>` (U1) + `<a>` (U2) |
| Modal | Not rendered | `<ContactModal>` rendered when `modalOpen` |
| Outer wrapper | `<section>` only | `<>` fragment wrapping `<section>` + modal |

### Full replacement

```tsx
// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ fonts }: { fonts: FontSet }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="contact" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '120px 0 60px' }}>
        <div className="wrap" style={{ padding: '0 56px' }}>
          <Reveal>
            <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)', marginBottom: 28 }}>
              (06) Let&apos;s talk
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 500, fontSize: 'clamp(72px, 12vw, 160px)', lineHeight: 0.92, letterSpacing: '-0.04em', color: 'var(--paper)', maxWidth: 1100 }}>
              Request your{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>
                free audit.
              </span>
            </h2>
          </Reveal>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'stretch' }}>

            {/* ── Left: @kicksnare DM card — unchanged ── */}
            <Reveal delay={200}>
              <a
                href="https://x.com/kicksnare"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--paper)', padding: '36px 36px 36px 40px', borderRadius: 28, background: 'rgba(249,254,253,0.05)', border: '1px solid rgba(249,254,253,0.12)', transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', minHeight: 200 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase' }}>Primary · DMs open</span>
                  <span style={{ fontFamily: fonts.display, fontSize: 56, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>@kicksnare</span>
                  <span style={{ color: 'rgba(249,254,253,0.6)', fontSize: 15, marginTop: 4 }}>DM your URL to @kicksnare on X. You&apos;ll get a 5-minute video audit back within 48 hours.</span>
                  <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 18, color: 'var(--accent)', marginTop: 12 }}>If you don&apos;t love it, you don&apos;t pay. No questions.</span>
                </div>
                <span style={{ width: 72, height: 72, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowDiag size={26} />
                </span>
              </a>
            </Reveal>

            {/* ── Right: two interactive cards ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* U1: Contact us → opens modal */}
              <Reveal delay={280}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="contact-card"
                  style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.10)', borderRadius: 22, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--paper)', transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', flexGrow: 1 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase' }}>Email</span>
                    <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: 'var(--paper)', letterSpacing: '-0.015em' }}>Contact us</span>
                  </div>
                  <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ArrowRight size={14} />
                  </span>
                </button>
              </Reveal>

              {/* U2: Book a slot → external link */}
              <Reveal delay={340}>
                <a
                  href="https://proj-astro-seven.vercel.app/book/kicksnare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--paper)', background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.10)', borderRadius: 22, padding: 24, transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', flexGrow: 1 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase' }}>Availability</span>
                    <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: 'var(--paper)', letterSpacing: '-0.015em' }}>Book a slot</span>
                  </div>
                  <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ArrowDiag size={14} />
                  </span>
                </a>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* N1: render modal when open */}
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} fonts={fonts} />}
    </>
  );
}
```

### Constraints

- The outer fragment (`<>`) is necessary because `Contact` now returns two siblings: the `<section>` and the modal portal. The section's markup and styling are unchanged — only the right column children and the fragment wrapper are new.
- U2 uses `ArrowDiag` (external link convention) not `ArrowRight`, to match the existing `@kicksnare` card arrow pattern for outbound links.
- `flexGrow: 1` on both right cards ensures they fill available height equally when the left card is taller — the grid column uses `alignItems: 'stretch'`.
- The `contact-card` class is already defined in `globals.css` and provides the hover `transform` on `.contact-card:hover`. No new CSS needed.
- The `<button>` reset styles (no default browser styles) must be handled by existing global resets or added to `globals.css`. Check that `button { appearance: none; }` (or equivalent) is present before assuming the button renders border-free. If not, add `appearance: 'none'` to the button's inline style.

---

## Step 4 — Update `progress-tracker.md`

After verifying the demo, update `docs/context/progress-tracker.md`:

- Move "Let's Talk rework" into **Completed**
- Record the Formspree endpoint `meedaznk` in Session Notes (so it's findable without opening the spec)
- Update **Current Phase** to whatever comes next

---

## Step 5 — Demo checklist

Run `pnpm dev` and verify each affordance:

**Contact section**
- [ ] Right column shows two cards: "Contact us" (eyebrow "Email") and "Book a slot" (eyebrow "Availability")
- [ ] Both cards have a 40×40 accent circle on the right — `ArrowRight` on Contact us, `ArrowDiag` on Book a slot
- [ ] Hovering either right card applies the `contact-card` hover transform (matches left card behaviour)
- [ ] Clicking "Book a slot" opens `https://proj-astro-seven.vercel.app/book/kicksnare` in a new tab
- [ ] Left `@kicksnare` DM card is visually unchanged

**Modal — open/close**
- [ ] Clicking "Contact us" card opens the modal
- [ ] Modal renders over a dark semi-transparent overlay
- [ ] Clicking the backdrop (outside the card) closes the modal
- [ ] Clicking the × button closes the modal
- [ ] Pressing `Escape` closes the modal
- [ ] Body scroll is locked while modal is open; scroll is restored on close
- [ ] Modal heading reads "Let's *talk.*" — "talk." in Instrument Serif italic

**Form interaction**
- [ ] All three fields accept input
- [ ] Submitting with empty fields does not call Formspree (browser `required` blocks, or validate before fetch if needed)
- [ ] Clicking "Send message →" with valid inputs changes button text to "Sending…" and disables it
- [ ] On Formspree success: form replaced by check circle + "Message sent." + sub copy
- [ ] On Formspree error (test by temporarily breaking the endpoint URL): "Something went wrong — please try again." appears inline below the textarea; button re-enables
- [ ] No console errors or React warnings throughout

---

## Files touched

| File | Action |
|------|--------|
| `components/PortfolioClient.tsx` | Edit — add `Close` to import; insert `ContactModal` above `Contact`; rewrite `Contact` (lines 565–606) |
| `docs/context/progress-tracker.md` | Edit — record completion, Formspree endpoint, session note |
