# Architecture Context

**What it is:** A single-scroll marketing site for Kicksnare Digital — a growth-and-design studio. One long page (`/`) with anchor navigation. No CMS. No database. No auth. No form backend. Contact is a hyperlink CTA (mailto / DM) — no server involvement at runtime.

## Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | Next.js 15 (App Router) | Static page generation; Server Components default |
| Styling | Tailwind CSS v4 + CSS custom properties | Design tokens as CSS vars on `:root`; Tailwind for utilities |
| Fonts | Local TTF via `@font-face` in `globals.css` | 7 families vendored in `public/fonts/` — no external CDN; `font-display: swap` |
| Hosting | Vercel | Zero-config Next.js; automatic deploys on push; CDN-served static output |
| Analytics | Vercel Analytics (planned) | Cookie-free, GDPR-compliant page analytics |

**No CMS. No database. No email service. No form server action.** The site is entirely static. The only dynamic behaviour is client-side UI state (sticky header scroll, case study modal open/close).

## System Boundary

```
Developer pushes to Git
    └── Vercel builds & deploys
            └── Static page served from CDN (/)

Visitor clicks primary CTA ("Get your free audit")
    └── mailto:hi@kicksnare.studio  or  twitter.com/kicksnare DM
            └── No server involvement. No data captured. No persistence.
```

All pages are pre-rendered at build time. No ISR, no SSR, no revalidation, no API routes. If a contact form server action is introduced later, this boundary diagram and the Stack table must be updated before implementation begins.

## Site Structure

One route. All navigation is anchor-based within the single page.

| Route | Rendering | Source |
|---|---|---|
| `/` | Static (SSG) | `page.tsx` → `PortfolioClient.tsx` — all sections |
| `/case-studies/evoltage` | Static (SSG) | `page.tsx` → `CaseStudyClient.tsx` — 4-section case study |
| `/about` | Static (SSG) | `page.tsx` → `AboutClient.tsx` — bio + contact |
| `/privacy` | Static (SSG) | `page.tsx` — privacy policy |

**Section anchors on `/`:**

| Section | Anchor | Notes |
|---|---|---|
| Hero | — | No anchor; top of page |
| Marquee | — | No anchor; immediately below hero |
| Problem | `#problem` | 4 pain-point cards |
| Work | `#work` | 3 case cards → `CaseStudyModal` |
| About | `#about` | Stats + services list |
| Process | `#process` | 4 steps: Audit → Plan → Ship → Measure |
| Contact | `#contact` | Audit CTA + offer stack + availability signal |
| Footer | — | Wordmark + Soundwave mark |

## Content Model

### Home page (`app/page.tsx`)

`page.tsx` is a Server Component. It imports and renders `PortfolioClient`, which is the single `'use client'` boundary for the entire page. All interactive state (scroll position, modal open/close) lives inside `PortfolioClient`.

```
app/page.tsx                   # Server Component — shell only
  └── <PortfolioClient />      # 'use client' — full page content

PortfolioClient renders:
  <Header />                   # Sticky; transparent → frosted glass on scroll
  <Hero />                     # H1 + project list right; Soundwave logo mark
  <Marquee />                  # Forest-green bar; 28s loop; stats + offer claims
  <Problem />                  # 2-col grid; 4 specific pain-point cards
  <Work />                     # 3 case cards → triggers CaseStudyModal
  <About />                    # Forest-green block; stats + services list
  <Process />                  # 4 steps: Audit → Plan → Ship → Measure
  <Contact />                  # Forest-green; offer stack, guarantee, audit CTA
  <Footer />                   # Large Kicksnare wordmark + Soundwave mark
  <CaseStudyModal />           # 'use client' — full-screen overlay; conditionally rendered
```

All section content is hardcoded in TSX. A content change requires a code change. This is intentional — no editorial workflow exists and the content is unlikely to change frequently.

### Case studies

Four case studies are defined once in `lib/cases.ts` as a typed `CaseStudy[]` array. The `Work` section card data and `CaseStudyModal` both reference the same source. Case studies with an `href` field navigate to a dedicated page; those without open in the modal.

| ID | Client | Sector | Key metric | Route |
|---|---|---|---|---|
| `halocrate` | Halocrate | B2B SaaS · Devtools | -41% bounce on /pricing, 2.6× demo bookings | Modal |
| `northbeam` | Northbeam DTC | DTC · Apparel | 3.1× ROAS, -34% CAC | Modal |
| `mara` | Studio Mara | Wellness · Multi-location | -26% no-shows, +38% local organic traffic | Modal |
| `evoltage` | Evoltage UK | Trades · Local business | 5-Second Test 15/40→9/10, SEO 10→80+ | `/case-studies/evoltage` |

## File Structure

```
app/
├── globals.css                         # Design tokens, @font-face, Tailwind, keyframes
├── layout.tsx                          # <html><body>; metadata; JSON-LD; Vercel Analytics
├── page.tsx                            # Server Component entry — renders PortfolioClient
├── sitemap.ts                          # Dynamic sitemap
├── robots.ts                           # Robots.txt
├── about/
│   └── page.tsx                        # Server Component — renders AboutClient
├── case-studies/
│   └── evoltage/
│       ├── page.tsx                    # Server Component — renders CaseStudyClient
│       ├── CaseStudyClient.tsx         # 'use client' — 4-section case study
│       └── opengraph-image.tsx         # Edge runtime OG image
└── privacy/
    └── page.tsx                        # Privacy policy

lib/
├── cases.ts                            # CaseStudy + HeroProject interfaces + data arrays
└── fonts.ts                            # FontSet type, PAIRS, defaultFonts

components/
├── PortfolioClient.tsx                 # 'use client' — homepage client boundary
├── CaseStudyModal.tsx                  # 'use client' — full-screen overlay for modal cases
├── Header.tsx                          # 'use client' — shared sticky header
├── Footer.tsx                          # 'use client' — shared footer
├── AboutClient.tsx                     # 'use client' — /about page client boundary
├── BottomBar.tsx                       # 'use client' — mobile CTA bar
├── RotatingWord.tsx                    # 'use client' — hero word animation
└── icons.tsx                           # Inline SVG glyphs

hooks/
├── useIsMobile.ts                      # SSR-safe viewport hook
└── useIntersectionObserver.ts          # Generic IO hook

public/
├── fonts/                              # Vendored TTF / variable TTF
└── assets/                             # Static SVGs
```

## Exit / Handoff Checklist

When Kicksnare transfers the site to a new owner or developer:

1. **Git repository** — transfer ownership on GitHub/GitLab
2. **Vercel project** — transfer via Vercel dashboard (single action)
3. **Domain** — update nameservers or initiate registrar transfer

That is the complete list. No email service account, no CMS credentials, no database, no API keys to rotate, no webhook configuration.

## Invariants

1. **No user data is stored.** The audit CTA is a hyperlink (`mailto:` or social DM link). No form submission, no persistence, no on-site email capture. If this changes, update the System Boundary and Stack before writing any code.
2. **All fonts are local.** Never load from Google Fonts or any CDN. If a font isn't vendored in `public/fonts/`, it doesn't exist in the design. Font loading performance (large TTF files) is the primary mobile load-time risk.
3. **`'use client'` boundaries are explicit.** Each page has one client root (`PortfolioClient`, `CaseStudyClient`, `AboutClient`). Shared interactive components (`Header`, `Footer`, `BottomBar`, `CaseStudyModal`, `ContactModal`, `Reveal`, `RotatingWord`) are also `'use client'`. `page.tsx` and `layout.tsx` remain Server Components.
4. **Design tokens are CSS custom properties on `:root` in `globals.css`.** No hardcoded hex values in component files. Always `var(--token)`.
5. **Content lives in TSX.** A content change requires a code change. There is no editorial workflow and no CMS integration — this is a deliberate scope decision.
6. **Case study data is defined once, in `lib/cases.ts`.** Card display in the Work section, modal detail view, and hero project list all reference the same source. Cases with `href` navigate to a dedicated page; those without open in the modal.
7. **No shadows except the case-study modal.** `--shadow-lg` (`0 30px 80px rgba(0,0,0,0.35)`) is used on the modal shell only. All other visual separation uses hairline borders (`1px solid var(--line)`).
8. **First-person plural voice in all copy.** "We help…" — speaking as a team. The prospect is "you". This applies to JSX string literals in components, not just the design docs.
