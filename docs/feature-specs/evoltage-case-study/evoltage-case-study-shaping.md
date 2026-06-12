# Evoltage Case Study — Shaping Doc

## Source

> "here is the site I created for evoltage. what case study information can be gleaned? e.g results etc are not feasible as this isn't live?"

> Analysis report (`docs/26-06-11_16-28-49_evoltage_case_study_client_framing/analysis_report.md`): "The case study sells the methodology to experts instead of selling the transformation to clients."

> 5-Second Test #1 — original evoltageuk.co.uk: **15/40 FAIL** (WorkSpace `26-06-04`)
> 5-Second Test #2 — rebuilt evoltage site: **9/10 PASS** (WorkSpace `26-06-05`)

> Services business analysis (`26-06-01`): "Case studies = fuel for revenue flywheel. Case study #3 is where the flywheel has enough momentum to generate its own referrals."

> Reddit r/smallbusiness (2026): "A general description on how they approach the problem and what the end result was." — top response when asked "do you actually read agency case studies?"

---

## Frame

### Problem

- The Evoltage case study is written for agency peers (CRO professionals, PMs) not for the people who would hire Kicksnare (local tradespeople, small business owners)
- 15+ expert terms meaningless to the target audience (ICE scoring, FR ratios, JSON-LD, Playwright tests)
- Persuasive balance is ~80% logos / ~15% ethos / ~5% pathos; target audience needs ~40% pathos / ~35% logos / ~25% ethos
- No live results exist (no traffic, no conversions, no testimonial) — but the 5-second test delta (15/40 → 9/10) and build artifacts (SEO 10→80+, pages 4→13) ARE real, evidence-backed results
- "Unsolicited redesign" framing increases client anxiety rather than building trust
- The 7-section Kickdrum template targets a 7-10 minute read; the actual audience has a 2-3 minute attention span

### Outcome

- A potential small business owner reads the Evoltage case study and thinks: "My website is costing me customers and these people can fix it"
- The case study converts visitors into first-contact actions (DM, email, audit request)
- The case study works as standalone shareable content (LinkedIn/X)
- Methodology depth is preserved in compressed form — not lost, not separate-paged

---

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | Case study converts a small business owner into a first-contact action (DM, email, audit request) within a 2-3 minute read | Core goal |
| R1 | Lead with transformation: dramatic before/after visual dominates the page, answerable in 10 seconds (business like mine? what changed? how much? how long?) | Implemented |
| R2 | Zero jargon in the client-facing version — no CRO terms, framework names, technical metrics (FR ratio, ICE scores, JSON-LD, Playwright) | Implemented |
| R3 | Emotional hook first: open with pathos ("Nobody in the dark wants to read more"), then logos (simplified numbers), ethos throughout | Implemented |
| R4 | Lead with 5-second test delta (15/40 → 9/10) and measurable build artifacts (SEO 10→80+, pages 4→13, time-to-phone 15s→0s) as primary evidence — not as a substitute for missing data, but as the core proof | Implemented |
| R5 | Frame as "free audit and concept build" — honest about being spec work, positioned as proof of capability, aligned with anti-agency identity | Implemented |
| R6 | Methodology depth compressed to one sentence ("We ran three audits and diagnosed 10 problems before writing a line of code") — full deep-dive deferred unless secondary audience demand is proven | Implemented |
| R7 | Personal attribution for both sides: who is behind Kicksnare (OO) AND who is the business being helped (JJ, the electrician) — human faces, not just websites | Implemented |
| R8 | CTA is risk-reducing, not salesy — "Drop your URL, free 5-minute video audit within 24 hours" | Implemented |
| R9 | The case study page itself must pass a 5-second test: in 5 seconds a visitor sees (1) a business like mine, (2) a dramatic before/after, (3) cost/time, (4) reason to trust | Implemented |
| R10 | Case study must work as standalone shareable content — a LinkedIn/X post with the core transformation story, not just a portfolio page | Implemented |

---

## Research Evidence

### 5-Second Test Delta (primary evidence)

| Dimension | Original site (Jun 4) | Rebuilt site (Jun 5) |
|---|---|---|
| **Overall score** | 15/40 — FAIL | 9/10 — PASS |
| What does it do? | 6/10 — inferred from image | 10/10 — instant comprehension |
| Who is it for? | 4/10 — "Midlands" buried in subtext | 9/10 — clear geographic + customer |
| What should I do? | 2/10 — "Read more..." | 9/10 — form + phone dual CTA |
| Do I trust it? | 3/10 — zero credentials above fold | 9/10 — "trust you can check" |
| CTA | "Read more..." (passive, directionless) | "Get a quote" + tap-to-call |
| Phone accessibility | 15 seconds of scrolling | Instant (sticky bar) |
| Trust signals above fold | 0 | 5 (NAPIT, JIB, insured, 10 yrs, 5.0) |
| FR ratio (planned quote, mobile) | 1.80 (high abandonment) | Not measured — structural friction eliminated |

Source: WorkSpace `26-06-04_23-01-43` (3 models: Cognitive Load, Trust, Friction) and `26-06-05_17-04-05` (9 models: Kahneman, Social Proof, Authority, Aesthetic-Usability, Cognitive Load, Framing, Banner Blindness, Halo, Anchoring)

### Build Artifacts (secondary evidence)

| Metric | Before | After |
|---|---|---|
| SEO health score | 10/100 | 80+ (measured) |
| Pages | 4 | 13 |
| Time to phone number | 15 seconds scrolling | 0 (sticky bar + hero) |
| Mobile CTA | None functional | Dual (form + tap-to-call) |
| Trust signals above fold | 0 | 5 verifiable credentials |
| Build phases | — | 18 phases, ~105 Playwright tests |
| Lighthouse performance | Unknown | Measurable now |

### Key Quotes from Research

- **The killer line:** "Nobody in the dark wants to read more." — from the original site's "Read more..." CTA analysis. The main CTA on an electrician's website asked users to read more. Their customers call at 9pm with no power.

- **The electrician analogy:** "When you hire an electrician, you don't want them to explain the wiring diagram and the BS 7671 regulations. You want the lights to work and the certificate in your hand." — Curse of Knowledge reasoning

- **The competitive set:** The case study competes against "do nothing" and "ask my nephew for £200," not other agency portfolios.

- **The trust architecture:** "Trust you can check — not just take our word for it" — the rebuilt site's framing, identified as "genuinely rare" in the 9-model analysis

- **The flywheel position:** This is case study #1 of the 3-5 needed for revenue flywheel credibility. It must be designed to make the next sale easier.

- **The Reddit validation:** Small business owners want "a general description on how they approach the problem and what the end result was." Not methodology. Not frameworks.

### Gaps Identified by Research

1. **No human face** — both 5-second test analyses flag JJ as named but invisible. The rebuilt site promises "JJ will call you back in 2 minutes" but JJ has no photo.
2. **No testimonial from JJ** — the case study is spec work; JJ hasn't been contacted about using his business as a case study.
3. **Price expectation halo** — the rebuilt site's premium design aesthetic may cause price-sensitive visitors to self-select out. The case study should address this.
4. **Review count missing** — "5.0 across Checkatrade" but from how many reviews? Volume matters for social proof.

---

## A: 4-section client-focused case study + OO bio page

| Part | Mechanism | Flag |
|------|-----------|:----:|
| **A1** | **The Problem (pathos + before state)** — Opens with "Nobody in the dark wants to read more." One paragraph: who JJ is ("JJ runs Evoltage UK, a 24-hour electrician in Loughborough"), what's wrong with the original site, in client language. Before screenshot (mobile, annotated with "No hook" / "No clear action" callouts — reuses the `AuditFig` SVG annotation pattern). Three simple numbers: SEO 10/100, 5-Second Test 15/40, phone number buried 15 seconds down. | |
| **A2** | **What We Built (after state + compressed methodology)** — Side-by-side before/after screenshots (mobile viewport). 5-6 plain-English bullets: "Phone number one tap away on every page", "13 pages so Google finds you for 'electrician Loughborough'", "Trust badges visible in 3 seconds — NAPIT, JIB, insured, Checkatrade 5.0", "Real job photos, not stock", "Built in 3 days". One methodology sentence: "We ran three independent audits and diagnosed 10 problems before writing a line of code." | |
| **A3** | **The Numbers (5-second test delta + build metrics)** — 4 large stat blocks reusing existing result stats visual pattern from `CSResult`: 5-Second Test 15/40 → 9/10, SEO 10 → 80+, Pages 4 → 13, Time-to-phone 15s → 0s. Below stats: "what's next" block — "Analytics are wired. Once the site goes live, we'll track exactly how many people tap the call button, which service pages get the most visits, and where visitors come from." | |
| **A4** | **Your Turn (lost-job CTA + risk reducer)** — Lost-job framing: "Every month a website like this stays live, potential customers land on it, can't find the phone number, and call someone else. Even one lost emergency call-out at ~£200 pays for the entire rebuild." Spec-work honesty: "We gave JJ a free audit and concept build to show what's possible." Risk-reducing CTA: "Want to see what your website is costing you? Drop your URL — free 5-minute video audit within 24 hours." Reuses existing contact CTA pattern (DM + email + booking buttons). | |
| **A5** | **Personal attribution** — Case study names JJ as the business owner ("JJ, owner of Evoltage UK"). OO named as the person who built it: "Built by OO" with link to `/about` bio page. On the case study page itself, a compact byline strip — not a full bio. The human story is: a PM-turned-agency-founder rebuilt a tradesman's website to prove it could be done better. | |
| **A6** | **OO bio page (`/about`)** — Dedicated route with short bio. Content: OO's name, "seven years in retail product management" background, why Kicksnare exists ("The agency is new. The craft is proven."), anti-agency positioning ("No account managers. You talk to the person who builds it."), photo placeholder, contact links (DM + email). Linked from the main site's About section and from the case study byline. | |
| **A7** | **Dedicated case study route (`/case-studies/evoltage`)** — New page with its own 4-section layout (A1-A4). Add `href?: string` to `CaseStudy` interface in `lib/cases.ts`. `WorkCard` conditionally renders `<Link href={c.href}>` when `href` exists, `<button onClick={onOpen}>` when it doesn't. Same conditional for `heroProjects` rows. Extract `Header` and `Footer` from `PortfolioClient.tsx` into shared components (`components/Header.tsx`, `components/Footer.tsx`) for reuse on case study and about pages. Fictional cases stay modal. | |
| **A8** | **Shareable OG meta** — Page includes OpenGraph tags (title, description, image) optimized for LinkedIn/X. The OG image is the before/after side-by-side. Content works as a standalone read without requiring context from kicksnare.digital homepage. | |

---

## Fit Check: R x A

| Req | Requirement | Status | A |
|-----|-------------|--------|---|
| R0 | Case study converts a small business owner into a first-contact action (DM, email, audit request) within a 2-3 minute read | Core goal | ✅ |
| R1 | Lead with transformation: dramatic before/after visual dominates the page, answerable in 10 seconds (business like mine? what changed? how much? how long?) | Implemented | ✅ |
| R2 | Zero jargon in the client-facing version — no CRO terms, framework names, technical metrics (FR ratio, ICE scores, JSON-LD, Playwright) | Implemented | ✅ |
| R3 | Emotional hook first: open with pathos ("Nobody in the dark wants to read more"), then logos (simplified numbers), ethos throughout | Implemented | ✅ |
| R4 | Lead with 5-second test delta (15/40 → 9/10) and measurable build artifacts (SEO 10→80+, pages 4→13, time-to-phone 15s→0s) as primary evidence | Implemented | ✅ |
| R5 | Frame as "free audit and concept build" — honest about being spec work, positioned as proof of capability, aligned with anti-agency identity | Implemented | ✅ |
| R6 | Methodology depth compressed to one sentence ("We ran three audits and diagnosed 10 problems before writing a line of code") | Implemented | ✅ |
| R7 | Personal attribution for both sides: who is behind Kicksnare (OO) AND who is the business being helped (JJ, the electrician) — human faces, not just websites | Implemented | ✅ |
| R8 | CTA is risk-reducing, not salesy — "Drop your URL, free 5-minute video audit within 24 hours" | Implemented | ✅ |
| R9 | The case study page itself must pass a 5-second test: in 5 seconds a visitor sees (1) a business like mine, (2) a dramatic before/after, (3) cost/time, (4) reason to trust | Implemented | ✅ |
| R10 | Case study must work as standalone shareable content — a LinkedIn/X post with the core transformation story, not just a portfolio page | Implemented | ✅ |

**Notes:**

- All R's pass. No flagged unknowns remain.
- R7 resolved: A5 names JJ in the case study, A6 gives OO a dedicated bio page linked from the byline.
- A7 resolved via spike: add `href?: string` to `CaseStudy` interface, conditional `<Link>` vs `<button>` in `WorkCard`, extract shared Header/Footer.
