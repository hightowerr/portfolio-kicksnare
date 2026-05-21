# Kicksnare — Project Overview

## Company

**Kicksnare Digital**

- Small team of growth and design specialists
- Founder/operator: OO
- Based: Remote · GMT
- Contact: hi@kicksnare.studio · @kicksnare on X

## Product

A marketing portfolio site for a small team that helps businesses get more customers online. The site is the primary sales asset — it exists to generate qualified inbound enquiries from founders and operators who need websites, funnels, or growth experiments.

**Primary audience:** Small service businesses — consultants, coaches, local professionals — who have no website or a visibly outdated one, losing business to competitors with better sites. They cannot afford a 6-week agency engagement and will pay a premium for speed and done-for-you delivery. Secondary audience: DTC founders and operators who want measurable revenue outcomes — not a pretty site.

**Tagline (verbatim):** "We help businesses get _more customers_ online."

**Sub:** "A small team shipping websites, funnels and growth experiments that turn traffic into revenue. No long-term retainers."

**Revenue model:** Three-stage Money Model (Hormozi architecture):

| Stage | Offer | Price |
|---|---|---|
| Attraction | "The 48-Hour Launch Site" — 5-page site, all copy, mobile-ready, SEO-ready | £500–£1,000 |
| Upsell | SEO + Google Business Profile setup | £200–£500 |
| Continuity | Hosting + maintenance + 1 update/month | £99–£149/month |

**Lead magnet:** Free AI Website Audit — a personalised 5-minute screen-recording showing exactly what's wrong with the prospect's site and how to fix it. CTA → core offer. No form. Delivered via DM or email on request.

## Goals

1. Generate qualified inbound enquiries (DMs on X, email)
2. Demonstrate capability through concrete numbers, not adjectives
3. Position as the lean-agency alternative: direct access to senior work, sprint cadence, no account managers
4. Present the Grand Slam Offer on the page; drive free audit requests as the conversion action
5. Support ongoing SEO page generation via Claude Desktop Routines (separate system)

## Offer

### Grand Slam Offer — "The 48-Hour Launch Site"

Named using the MAGIC formula: Magnet (speed) + Avatar (service businesses) + Goal (professional presence that generates enquiries) + Interval (48 hours) + Container (Launch).

**What's included:**
- Professional 5-page website designed and built in 48 hours
- All copywriting (based on a single 30-minute call)
- Mobile-optimised, fast-loading, SEO-ready
- Google Business Profile setup (bonus — value £150)
- Basic SEO configuration (bonus — value £200)
- 30 days post-launch support (bonus)
- Hosting + domain setup handled

**Guarantee (unconditional):** "If you don't love it, you don't pay. No questions."

**Scarcity (real constraint):** 2 new projects per week maximum. The site must signal this without lying — "limited availability" is accurate.

### Value Equation positioning (Hormozi)

Every section of copy should reduce Time Delay and Effort — the bottom of the equation — since these are harder to fake and less crowded than big outcome claims:

| Driver | Copy direction |
|---|---|
| Dream Outcome ↑ | "Professional online presence that makes your business look credible and generates enquiries" |
| Perceived Likelihood ↑ | Case studies with real numbers; unconditional guarantee; named client testimonials |
| Time Delay ↓ | "48 hours, not 6 weeks" — the primary differentiator; lead with it everywhere |
| Effort & Sacrifice ↓ | "We write all the copy. One 30-minute call." — done-for-you framing |

## Voice & Copy Rules

- **First-person plural.** "We help…", "We ship…", "We rebuild…" — speaking as a small team of specialists. The prospect is "you".
- **Blunt and plain-spoken.** Specific numbers, named tools, calendar honesty
- **Contractions fine for the prospect.** "you're", "you've", "let's" — "we're" and "we've" are also encouraged for the team voice
- **No adjectives.** "A new homepage (5 sections, replaces 11)" not "a beautiful new homepage"
- **Italic accent per headline.** One or two words in Instrument Serif italic, mid-sentence
- **No emoji.** Ever. Inline SVG icons or unicode arrows (→ ↗ ↑) only
- **Sentence case.** ALL CAPS only on monospace eyebrows and meta labels
- **Section numbers in parens.** `(01) The problem`, `(02) Selected work`, etc.
- **Lead with time delay.** "48 hours, not 6 weeks" beats any quality claim. Put it first.
- **Guarantee is unconditional, not hedged.** "If you don't love it, you don't pay." Full stop. Never "we'll do our best to…"
- **Scarcity is stated as fact, not pressure.** "2 new projects a week" — not "limited time offer!!!"
- **Pain before solution.** Name the problem (losing business to competitors, 6-week agency timelines, copy nobody reads) before presenting the offer. "The pain is the pitch."

## Design System

Extracted from the Claude Design bundle at `https://api.anthropic.com/v1/design/h/62_VUFqegvYims3LW22KAA`. Full spec lives in the bundle README; summary:

| Token | Value |
|---|---|
| Paper | `#f9fefd` — every light surface |
| Ink | `#010b09` — body text and headlines |
| Primary | `#06372d` — deep forest green; section blocks, CTA |
| Accent | `#ff5e00` — blaze orange; punctuation, hover, stats |
| Secondary | `#fcd078` — butter yellow; case-study tones only |
| Display font | Geist 300–800 (vendored) |
| Serif accent | Instrument Serif italic 400 (vendored) |
| Mono | JetBrains Mono 400/500 (vendored) |

All fonts are vendored locally in `public/fonts/` — no external CDN.

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server Components default; `'use client'` only for interactivity |
| Styling | Tailwind CSS v4 + CSS custom properties | Design tokens as CSS vars; Tailwind for utilities |
| Fonts | Local TTF via `@font-face` in `globals.css` | No CDN dependency; brand fonts vendored from design bundle |
| Hosting | Vercel (planned) | Zero-config Next.js; branch previews; one-command deploy |
| Analytics | Vercel Analytics (planned) | Cookie-free, GDPR-compliant |

## Site Structure

Single long-scrolling page with anchor navigation. No CMS. No database. No auth.

| Section | Anchor | Notes |
|---|---|---|
| Hero | — | H1 + project list on right; Soundwave logo mark |
| Marquee | — | Forest-green bar, 28s loop: availability, stats, terms |
| Problem | `#problem` | 2-col grid: headline left, 4 pain-point cards right |
| Work | `#work` | 3 case cards (Halocrate, Northbeam DTC, Studio Mara) → modal |
| About | `#about` | Forest-green block; stats, services list |
| Process | `#process` | 4 steps: Audit → Plan → Ship → Measure |
| Contact | `#contact` | Forest-green block; primary CTA = "Get your free audit" (DM/email); secondary = book a call. State availability + 2-project/week cap. Guarantee visible. |
| Footer | — | Large Kicksnare wordmark with Soundwave mark |

**Case study modal:** Full-screen overlay (Problem → Approach → Solution → Result → CTA + Next case). Keyboard navigable (ESC, ← →). Scroll progress bar on modal chrome.

## Component Map

```
app/
  globals.css          — design tokens, @font-face, Tailwind, keyframes
  layout.tsx           — metadata, html/body
  page.tsx             — server entry
components/
  PortfolioClient.tsx  — 'use client'; full page: Header, Hero, Marquee, Problem, Work, About, Process, Contact, Footer
  CaseStudyModal.tsx   — 'use client'; modal with all 3 cases
  icons.tsx            — Soundwave, ArrowRight, ArrowLeft, ArrowDiag, Plus, Close, Check
public/
  fonts/               — all 7 font families (Geist, Instrument Serif, JetBrains Mono, Space Grotesk, Crimson Pro, Bricolage Grotesque, Newsreader)
  assets/              — logo-kicksnare-dark.svg, logo-kicksnare-light.svg, mark-soundwave.svg
```

## Case Studies

| ID | Client | Sector | Key metric |
|---|---|---|---|
| `halocrate` | Halocrate | B2B SaaS · Devtools | -41% bounce on /pricing, 2.6× demo bookings |
| `northbeam` | Northbeam DTC | DTC · Apparel | 3.1× ROAS, -34% CAC |
| `mara` | Studio Mara | Wellness · Multi-location | -26% no-shows, +38% local organic traffic |

## Development Commands

```bash
cd ~/kicksnare-site
npm run dev      # local dev server
npm run build    # production build
npm run lint     # ESLint
```

## Scope

### In Scope

- Full portfolio site (all sections above)
- Case study modal with all 3 cases
- Responsive design faithful to Claude Design system
- Local font serving (no CDN)
- Vercel deployment

### Out of Scope (for now)

- CMS of any kind — content lives in TSX
- Blog or articles section
- Client login / portal
- Automated SEO page generation (planned via Claude Desktop Routines — separate system)
- Lead magnet delivery backend — audit request is handled manually via DM/email; no form required
- Contact form backend (DM/email CTA is sufficient at current volume; form server action deferred)

## Success Criteria

- Qualified inbound enquiries via X DM or email
- Site loads in < 2s on mobile (fonts are the main risk — local TTFs are large)
- Pixel-faithful to Claude Design export
- Lighthouse mobile score ≥ 90
