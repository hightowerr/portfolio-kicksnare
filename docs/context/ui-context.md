# UI Context — Kicksnare

## Theme

Light. No dark mode. Editorial portfolio system — off-white paper backgrounds, near-black ink type, blaze-orange accent. Dark sections (About, Contact, Footer) invert to deep-forest green with paper-alpha text.

**The brand is *anti-agency, blunt, editorial*.** Inspired by editorial design studios and Vishnu-style portfolio sites. We use a first-person plural voice ("We help...") to signal a small team of experts. If any element looks like a SaaS dashboard or Bootstrap template, redesign it.

Full design tokens live in `app/globals.css`. All tokens are CSS custom properties on `:root`, consumed via `var()` in inline styles and the handful of utility classes defined there.

---

## Design Tokens (`app/globals.css`)

All values are defined as CSS custom properties on `:root`. Use `var(--token)` — no hardcoded hex values in component files.

```css
:root {
  /* ── Core brand ── */
  --ink:        #010b09;    /* near-black with green bias — body text, headlines */
  --paper:      #f9fefd;    /* off-white with green bias — default background */
  --primary:    #06372d;    /* deep forest green — About/Contact/Footer blocks, primary CTA */
  --accent:     #ff5e00;    /* blaze orange — punctuation dot, arrow rings, hover, stats */
  --secondary:  #fcd078;    /* butter yellow — case-study tone only, not a UI color */

  /* ── Neutrals ── */
  --muted:       #566B65;
  --line:        rgba(6, 55, 45, 0.10);   /* hairline borders, dividers */
  --line-strong: rgba(6, 55, 45, 0.25);
  --paper-2:     #EAF3EE;   /* striped placeholder tint */

  /* ── Case-study background tones (low-chroma, paired with diagonal stripes) ── */
  --tone-butter: #FBE9B8;
  --tone-sage:   #D9E8E2;
  --tone-peach:  #FCE0CC;

  /* ── Type families ── */
  --display: 'Geist', system-ui, -apple-system, sans-serif;
  --serif:   'Instrument Serif', 'Crimson Pro', Georgia, serif;
  --mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;

  /* ── Radii ── */
  --radius-xs:   6px;
  --radius-sm:   10px;
  --radius-md:   16px;
  --radius-lg:   22px;   /* case cards, "next case" */
  --radius-xl:   28px;   /* hero figures, modal */
  --radius-pill: 999px;  /* every button + chip */

  /* ── Shadows ── */
  --shadow-sm: 0 1px 2px rgba(6,55,45,0.06);
  --shadow-md: 0 10px 30px rgba(6,55,45,0.10);
  --shadow-lg: 0 30px 80px rgba(0,0,0,0.35);   /* case-study modal only */

  /* ── Motion ── */
  --ease-out-soft: cubic-bezier(.2, .7, .2, 1);   /* signature — slow-out, snap-in */
  --ease-out-fast: cubic-bezier(.3, .7, .4, 1);
  --dur-fast:   180ms;
  --dur-base:   350ms;
  --dur-slow:   600ms;
  --dur-reveal: 900ms;

  /* ── Layout ── */
  --wrap-max:         1440px;
  --wrap-pad-desktop: 56px;
  --wrap-pad-mobile:  24px;
}
```

---

## Fonts

### Loading

All seven font families are **vendored locally** in `public/fonts/` — no external CDN. Declared via `@font-face` in `app/globals.css` with `font-display: swap`.

| Family | Weights | Format | Role |
|---|---|---|---|
| Geist | 100–900 (static TTF per weight) | truetype | Primary display + UI |
| Instrument Serif | 400 regular + 400 italic | truetype | Italic accent — one or two words per headline |
| JetBrains Mono | 100–800 variable | truetype-variations | Eyebrows, meta, step numbers |
| Space Grotesk | 300–700 static | truetype | Alt pairing |
| Crimson Pro | 200–900 variable (roman + italic) | truetype-variations | Alt pairing serif |
| Bricolage Grotesque | 200–800 variable | truetype-variations | Alt pairing display |
| Newsreader | 200–800 variable (roman + italic) | truetype-variations | Alt pairing serif |

### Roles

| Role | Family | Weight | Style |
|---|---|---|---|
| Section headlines (H1/H2) | Geist (`--display`) | 600 | normal |
| Hero wordmark | Geist (`--display`) | 600 | normal |
| Contact display | Geist (`--display`) | 500 | normal |
| **Italic accent (one/two words per headline)** | Instrument Serif (`--serif`) | 400 | italic |
| Eyebrows, meta, step numbers | JetBrains Mono (`--mono`) | 400–500 | normal, uppercase |
| Body / UI / nav | Geist (`--display`) | 400–500 | normal |

**The single most distinctive type move:** every section headline contains exactly one or two italicised words in `Instrument Serif` mid-sentence. Never the whole headline.

---

## Type Scale

| Usage | Size | Weight | Tracking | Line-height | Family |
|---|---|---|---|---|---|
| Footer wordmark | `clamp(120px, 22vw, 160px)` | 500 | `-0.045em` | 0.85 | display |
| Contact headline | `clamp(72px, 12vw, 160px)` | 500 | `-0.04em` | 0.92 | display |
| Hero H1 | `clamp(64px, 8.5vw, 128px)` | 600 | `-0.035em` | 0.92 | display |
| About H2 | `clamp(48px, 6vw, 80px)` | 500 | `-0.03em` | 0.98 | display |
| Section H2 | `clamp(36px, 4vw, 64px)` | 600 | `-0.03em` | 0.95 | display |
| Work H2 | `clamp(40px, 5vw, 72px)` | 600 | `-0.03em` | 0.95 | display |
| H3 | `34px` | 500 | `-0.022em` | 1.0 | display |
| H4 / card title | `22px` | 500 | `-0.015em` | 1.2 | display |
| Lede / body-lg | `18px` | 400 | `-0.005em` | 1.55 | display |
| Body | `16px` | 400 | `-0.005em` | 1.55 | display |
| Body-sm | `14–15px` | 400 | — | 1.5 | display |
| Eyebrow | `11px` | 400–500 | `0.14em` | — | mono, uppercase |
| Meta / mono | `11–13px` | 400 | `0.06–0.08em` | — | mono, uppercase |
| Italic accent inline | inherits | 400 | `-0.015em` | — | serif italic |

Letter-spacing tightens with size. Line-height collapses toward `0.92` on display sizes.

### Eyebrow Convention

```tsx
<div style={{
  fontFamily: 'var(--mono)',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: 24,
}}>
  (01) Section label
</div>
```

Section numbers are wrapped in parens: `(01)`, `(02)`, etc. On dark sections, use `rgba(249,254,253,0.55)` instead of `var(--muted)`.

### Italic Accent Pattern

```tsx
<h2>
  Three recent{' '}
  <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.015em' }}>
    shipped
  </span>{' '}
  things.
</h2>
```

---

## Color Usage

### Light sections (paper background)

| Token | Value | Where |
|---|---|---|
| `var(--ink)` | `#010b09` | All headlines + strong text |
| `var(--muted)` | `#566B65` | Body copy, meta, secondary labels |
| `var(--line)` | `rgba(6,55,45,0.10)` | All hairline borders and dividers |
| `var(--accent)` | `#ff5e00` | Accent dot, arrow-ring inside CTA buttons, hover on case cards, stat numerals on dark, italic quote marks |
| `var(--paper-2)` | `#EAF3EE` | Striped figure fill |

### Dark sections (primary/forest background)

| Value | Where |
|---|---|
| `var(--paper)` / `rgba(249,254,253,0.xx)` | All text on dark. Use alpha for hierarchy: `0.65` body, `0.55` muted/meta, `0.18` hairlines |
| `var(--accent)` | Italic accent words on dark, stat numerals, italic quote marks — unchanged |
| `rgba(249,254,253,0.04–0.12)` | Card/box backgrounds on dark |

**Orange is punctuation, not fill.** It appears as: the period after `Kicksnare.`, arrow-ring fill inside pill buttons, hover state on case-card ring, stat numerals on dark sections, italic `"` marks in quotes, the dot in marquee separators, and text selection. Never as a hero background or a large block fill.

---

## Layout

### Container

```tsx
// Standard full-width section
<section className="wrap" style={{ padding: '110px 56px 80px' }}>

// .wrap in globals.css:
// .wrap { max-width: 1440px; margin-inline: auto; }
```

Mobile gutter: `24px`. Desktop gutter: `56px`.

### Section Spacing

| Section type | Padding |
|---|---|
| Standard light section | `110px` top + bottom |
| Dark sections (About, Contact) | `120px` top + bottom |
| Footer | `52px` top, `56px` bottom |

### Grid Patterns

| Pattern | Usage |
|---|---|
| `1fr 2fr` gap 80px | Label/eyebrow left, headline+body right — Problem, Process intro, About, Case Study sections |
| `1.4fr 1fr` gap 80px | Hero (headline left, project list right) |
| `1fr 2fr` gap 80px | Work section header (eyebrow+title left, link right) |
| `repeat(3, 1fr)` gap 28px | Work case cards |
| `repeat(4, 1fr)` gap 0 | Stats, Services, Process steps |
| `1fr 1fr` gap 0 | Problem pain cards |
| `1.6fr 1fr` gap 32px | Contact (DM card + meta cards) |
| `repeat(5, 1fr)` gap 0 | Case study meta grid |
| `repeat(4, 1fr)` gap 0 | Case study approach steps |

**Hairline row dividers:** `border-top: 1px solid var(--line)` on each row. Last item also gets `border-bottom`. No card backgrounds — rows float on the page color.

---

## Component Patterns

### Pill Button (primary CTA)

```tsx
<a href="#contact" className="cta-primary" style={{
  display: 'inline-flex', alignItems: 'center', gap: 10,
  background: 'var(--primary)', color: 'var(--paper)',
  fontFamily: 'var(--display)', fontWeight: 500, fontSize: 14,
  padding: '11px 16px 11px 18px', borderRadius: 999,
  textDecoration: 'none',
}}>
  Let&apos;s talk
  <span className="cta-arr" style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 20, height: 20, borderRadius: 999,
    background: 'var(--accent)', color: '#06372d',
    transition: 'transform .25s ease',
  }}>
    <ArrowRight size={11}/>
  </span>
</a>
```

On hover (`.cta-primary:hover .cta-arr`): `translateX(3px)`. The arrow drifts — the pill itself does not change.

**Every button is a pill (`borderRadius: 999`).** No square buttons. No border-radius 4 or 8.

### Case Card

```tsx
// Outer: aspect-ratio 4/5, border-radius 22, tone background, no shadow
// Hover: translateY(-6px), inner SVG scales 1.06x
// Ring button bottom-right: 52×52px pill, white-92% → accent on hover
```

Card hover does **not** add a shadow — `translateY` only.

### Project List Row

```tsx
<a className="proj-row" style={{
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '16px 0',
  borderTop: '1px solid var(--line)',
  fontFamily: 'var(--display)', fontSize: 19, fontWeight: 500,
  transition: 'padding .35s cubic-bezier(.2,.7,.2,1)',
}}>
```

Hover: `padding-left` grows from 0 to `16px`. No color change.

### Sticky Header

```tsx
<header style={{
  position: 'sticky', top: 0, zIndex: 50,
  backdropFilter: 'blur(20px) saturate(160%)',
  background: scrolled ? 'rgba(249,254,253,0.82)' : 'rgba(249,254,253,0)',
  borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
  transition: 'background .3s, border-color .3s',
}}>
```

Transparent before scroll. Frosted paper after.

### Nav Link

```css
.navlink::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 1px; background: var(--ink);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.25s var(--ease-out-soft);
}
.navlink:hover::after { transform: scaleX(1); transform-origin: left; }
```

1px underline grows left-to-right on hover, shrinks right-to-left on leave.

### Underline Link

Same as nav link pattern. Class `.link-uline`.

### Marquee

```tsx
<div style={{ animation: 'marquee 28s linear infinite' }}>
  {[...items, ...items].map((t, i) => (
    <span key={i}>
      {t}
      <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}/>
    </span>
  ))}
</div>
```

`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`

28s linear infinite. Separator dot is `var(--accent)` orange.

**Marquee content order** — each item is a plain-language fact, no punctuation inside items:

1. "Available for new projects" (or current availability if slots are full)
2. "2 new projects per week"
3. "48 hours, not 6 weeks"
4. "If you don't love it, you don't pay"
5. Stat from a case study (e.g., "3.1× ROAS — Northbeam DTC")
6. Stat from a case study (e.g., "2.6× demo bookings — Halocrate")
7. "Based: Remote · GMT"

The guarantee and speed claim belong in the marquee — this is the first thing below the hero, so it does the trust/differentiation work early before the prospect reads the rest.

---

## Conversion Patterns

These component patterns exist specifically to support the offer architecture (Trim & Stack, guarantee, scarcity) without breaking the editorial register.

### CTA Hierarchy

Two tiers. Primary is the conversion action; secondary is the lower-commitment alternative.

| Tier | Label | Style | Destination |
|---|---|---|---|
| Primary | "Get your free audit →" | Filled green pill (existing `cta-primary`) | DM or email via `mailto:` / `@kicksnare` link |
| Secondary | "Let's talk" | Outlined pill — `border: 1px solid var(--line-strong)`, transparent background, `var(--ink)` text | `#contact` anchor |

**Outlined pill:**
```tsx
<a href="#contact" style={{
  display: 'inline-flex', alignItems: 'center', gap: 10,
  background: 'transparent',
  border: '1px solid var(--line-strong)',
  color: 'var(--ink)',
  fontFamily: 'var(--display)', fontWeight: 500, fontSize: 14,
  padding: '10px 18px', borderRadius: 999,
  textDecoration: 'none',
}}>
  Let&apos;s talk
</a>
```

On dark sections, swap `var(--ink)` → `var(--paper)` and `var(--line-strong)` → `rgba(249,254,253,0.30)`.

**Every hero and Contact CTA pair follows this hierarchy.** Never two filled pills together. Never the primary CTA without the audit framing.

### Offer Stack (Trim & Stack display)

Used in the Contact section (or a dedicated Offer section) to present the deliverable list with stated bonus values. Each row is a hairline-divided entry. The total stated value appears struck through above the asking price — this is the Trim & Stack mechanism: the gap between stated value and price makes the purchase feel like a deal.

```tsx
{/* Deliverable row — core included item */}
<div style={{
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '14px 0',
  borderTop: '1px solid rgba(249,254,253,0.18)',  // on dark bg
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Check size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
    <span style={{ fontFamily: 'var(--display)', fontSize: 15, fontWeight: 400, color: 'var(--paper)' }}>
      All copywriting — one 30-minute call
    </span>
  </div>
  <span style={{
    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.10em', textTransform: 'uppercase',
    color: 'rgba(249,254,253,0.45)',
  }}>
    incl.
  </span>
</div>

{/* Bonus row — item with stated value */}
<div style={{
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '14px 0',
  borderTop: '1px solid rgba(249,254,253,0.18)',
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Check size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
    <span style={{ fontFamily: 'var(--display)', fontSize: 15, fontWeight: 400, color: 'var(--paper)' }}>
      Google Business Profile setup
    </span>
  </div>
  <span style={{
    fontFamily: 'var(--mono)', fontSize: 11,
    color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase',
  }}>
    £150 value
  </span>
</div>

{/* Price comparison — total stated vs. asking */}
<div style={{ paddingTop: 24, borderTop: '1px solid rgba(249,254,253,0.35)', marginTop: 8 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(249,254,253,0.45)' }}>
      Total value
    </span>
    <span style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 500, color: 'rgba(249,254,253,0.45)', textDecoration: 'line-through' }}>
      £850
    </span>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--paper)' }}>
      Your price
    </span>
    <span style={{ fontFamily: 'var(--display)', fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--paper)' }}>
      £500
    </span>
  </div>
</div>
```

Rules:
- Check icon is always `var(--accent)` — the only accent in the stack
- "incl." label is muted mono; bonus value labels are accent mono — the visual hierarchy makes bonuses feel more valuable than included items
- The struck-through total uses the same `font-display` as the asking price but muted; never coloured or decorative

### Guarantee Display

Inline text block below the offer stack. Not a badge, not a box, not a bordered callout — it lives as a single line separated by a hairline. The guarantee is stated verbatim and never hedged.

```tsx
<div style={{
  borderTop: '1px solid rgba(249,254,253,0.18)',
  paddingTop: 20, marginTop: 4,
  fontFamily: 'var(--display)', fontSize: 15, fontWeight: 400,
  color: 'rgba(249,254,253,0.65)',
}}>
  <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--paper)' }}>
    If you don&apos;t love it, you don&apos;t pay.
  </span>{' '}
  No questions.
</div>
```

The guarantee phrase is in Instrument Serif italic — the same treatment as italic accent words in headlines. This gives it weight without adding a component. The "No questions." follow-on is in regular Geist, muted.

**Never** add a shield icon, a green tick badge, or a "money-back guarantee" label to this. Those read as SaaS trust-kit and break the editorial register.

### Availability Signal

A factual chip in the Contact section — not a countdown timer, not a "limited time!" callout. States the real constraint: 2 new projects per week.

```tsx
<div style={{
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '6px 14px 6px 10px',
  borderRadius: 999,
  border: '1px solid rgba(249,254,253,0.22)',
  fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'rgba(249,254,253,0.55)',
  marginBottom: 32,
}}>
  <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', flexShrink: 0 }} />
  2 projects / week · GMT
</div>
```

The accent dot is the pulse indicator — it is `var(--accent)` orange, same as the Soundwave mark and marquee dots, so it reads as "live" without animation. Do not add a CSS pulse animation — it breaks the stillness of dark sections.

---

## Visual Components

### Striped Placeholder

Used wherever a real image would go. Diagonal stripes for any image placeholder. Do not draw fake UI in SVG as a substitute for real photography or screenshots. Purposeful illustrations (e.g. diagrams, annotated mockups) are permitted.

```tsx
<div style={{ background: '#EAF3EE', borderRadius: 28, overflow: 'hidden' }}>
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(6,55,45,0.06)" strokeWidth="2"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#stripes)"/>
  </svg>
</div>
```

45° lines, `rgba(6,55,45,0.06)`, 2px wide on 4px pitch. Label in mono bottom-left: `UPPERCASE · ASPECT`.

### Soundwave Logo Mark

5-bar inline SVG. Two accent-orange bars (hits), three `currentColor` bars (decays). Animated with CSS `@keyframes sw-beat` — opacity pulses 1 → 0.4 on a staggered 1.6s loop. Respects `prefers-reduced-motion`.

---

## Borders & Corners

| Element | Radius |
|---|---|
| All buttons + chips | `999px` (pill) |
| Case cards | `22px` |
| Hero figures, modal shell | `28px` |
| Small callouts, insight block | `16–22px` |
| Everything else | `6px` or `10px` |

**No 4px or 8px radii.** They read as default Bootstrap and break the editorial register.

**Hairlines are the primary divider.** `1px solid var(--line)` (`rgba(6,55,45,0.10)`) on light; `rgba(249,254,253,0.18)` on dark. Cards get `rgba(6,55,45,0.05)`.

---

## Shadows & Elevation

| Token | Value | Where |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(6,55,45,0.06)` | Not used in current build |
| `--shadow-md` | `0 10px 30px rgba(6,55,45,0.10)` | Not used in current build |
| `--shadow-lg` | `0 30px 80px rgba(0,0,0,0.35)` | Case-study modal only |

Case cards on hover do **not** get a shadow — `translateY(-6px)` only.

---

## Icons

Six glyphs, all inline SVG, no icon font, no emoji, no third-party set.

| Icon | Stroke | Used for |
|---|---|---|
| `ArrowRight` | 1.8px round | Buttons, next/prev in modal, process steps |
| `ArrowLeft` | 1.8px round | Modal nav |
| `ArrowDiag` | 1.8px round | Case card ring, Contact DM, external links |
| `Plus` | 1.5px round | Problem pain card affordance |
| `Close` | 2px round | Modal close |
| `Check` | 2px round | Deliverables list bullets (accent stroke) |

All `currentColor` by default. `var(--accent)` for check glyphs and hover/active states. Stroke: 1.5–2px, round caps, round joins, no fills. Sized at call site (12–26px range).

Unicode arrows (`→`, `↗`, `↑`) appear in text — treat as type, not icons.

---

## Animations

### Reveal on Scroll

```tsx
function Reveal({ children, delay = 0, y = 20 }) {
  // IntersectionObserver: threshold 0.12, rootMargin '0px 0px -8% 0px'
  // On intersect: opacity 0→1, translateY(20px)→0
  // Duration: 900ms opacity, 1000ms transform
  // Easing: cubic-bezier(.2, .7, .2, 1)
}
```

Stagger via `delay` prop (80–100ms increments between siblings).

### Motion Principle

**`cubic-bezier(.2, .7, .2, 1)` on everything** — slow-out, snap-in. No bounces, no springs, no overshoot. No micro-interactions that aren't pointer-driven.

| Duration | Use |
|---|---|
| `180ms` | Fast UI (arrow nudge) |
| `250–350ms` | Hover states, nav transitions |
| `600ms` | Case card lift, ring button |
| `900ms–1s` | Scroll reveal |
| `28s linear` | Marquee loop |

### Hover Transforms

| Element | Hover |
|---|---|
| CTA pill arrow | `translateX(3px)` |
| Case card | `translateY(-6px)` |
| Case card inner image | `scale(1.06)` |
| Case card ring button | `translate(4px, -4px)` + background → accent |
| Project list row | `paddingLeft` 0 → 16px |
| Nav/body links | underline scaleX 0 → 1 |
| Modal next-case card | `translateY(-4px)` |

---

## Selection

```css
::selection { background: var(--accent); color: var(--paper); }
```

The only place orange floods as a large fill.

---

## Brand Non-Negotiables

1. **Every section headline has one or two words in Instrument Serif italic.** Never the whole headline. Never zero.
2. **Orange is punctuation, not fill.** A dot, an arrow circle, a check, a stat numeral — never a hero background or large block.
3. **Pill buttons only.** `borderRadius: 999`. No square buttons.
4. **Hairline borders, not shadows.** `1px solid var(--line)` is the divider. Shadow is reserved for the case-study modal.
5. **Diagonal stripes for any image placeholder.** Do not draw fake UI in SVG.
6. **No emoji. Ever.** Inline SVG icons only. Six total.
7. **First-person plural.** "We help…", "We ship…" — speaking as a team. The prospect is "you".
8. **No gradients.** No glassmorphism washes. No textures or paper grain.
9. **No photography yet.** The brand currently uses striped placeholders as its honest stand-in.
10. **All easing: `cubic-bezier(.2, .7, .2, 1)`.** Never `ease-in-out`.
11. **The guarantee is verbatim and unconditional.** "If you don't love it, you don't pay. No questions." — in Instrument Serif italic. Never paraphrased, never weakened, never in a badge or callout box.
12. **The primary CTA is always the audit, not "let's talk".** "Get your free audit" is the conversion action. "Let's talk" is the secondary, outlined pill. Never reverse the hierarchy.
13. **Pain cards name specific pains, not categories.** "You're invisible on Google" not "SEO problems". Specific → credible. Vague → generic agency copy.
14. **The offer stack uses hairline rows, not a table or card grid.** Check icon + deliverable name + value label per row. No backgrounds, no borders around the block, no shadows.
15. **Small team framing.** Position as the lean-agency alternative: direct access, no overhead.
