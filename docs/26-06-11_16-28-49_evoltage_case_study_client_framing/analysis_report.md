# Analysis Report: Evoltage Case Study — Client Framing Problem

## Executive Summary

The Evoltage case study template mapping is analytically rigorous, well-sourced, and impressive to agency peers — but it is structurally misaligned with its primary audience. Three mental models converge on the same diagnosis: **the case study sells the methodology to experts instead of selling the transformation to clients.**

The core finding is simple: a local tradesperson deciding whether to hire Kicksnare does not need to understand ICE scoring, Friction-Reward ratios, or JSON-LD schema. They need to see (1) a business like theirs, (2) a dramatic before/after, (3) how much it costs and how long it takes, and (4) a reason to trust this person.

**The recommended fix is structural, not cosmetic:** replace the 7-section Kickdrum template with a 4-section client-focused structure, move the methodology depth to a separate "Our Process" page, and lead with the single most powerful line already written: *"Nobody in the dark wants to read more."*

---

## Problem Statement

Kicksnare has produced a detailed case study template mapping for the Evoltage UK website rebuild (`output/evoltage-case-study-template-mapping.md`). The mapping is comprehensive — it sources every data point from the wiki and Neo4j graph, covers all 9 sections of the Kicksnare case study template, and documents exactly what content exists, what can be measured, and what requires live traffic.

The user's concern: **from a potential client's perspective, this framing may not be compelling.** The case study reads like a methodology showcase aimed at agency peers, not a persuasion piece aimed at a tradesperson who wants more phone calls.

---

## Individual Model Analysis

### Model 1: Jobs To Be Done (JTBD)

**Rationale for Selection:** The case study is a product. Potential clients "hire" it to do a job. JTBD reveals what that job actually is — and whether the case study is delivering on it.

**Analysis & Findings:**

The client's Job Story is: *"When I realize my website is embarrassing or isn't bringing me work, I want to find someone who can build me a professional website quickly and affordably, so I can get more phone calls and stop worrying about my online presence."*

The job has three dimensions — and the case study's current performance against each:

| Dimension | What the client needs | Current case study performance |
|-----------|----------------------|-------------------------------|
| **Functional** | More phone calls, show up on Google | Moderate — the data exists but is buried in methodology language |
| **Emotional** | Pride, relief, confidence | Very weak — no emotional narrative, no "someone like me" story |
| **Social** | Look professional to customers | Moderate — the before/after delta is implied but not visually shown |

**Four Forces analysis** reveals the critical gap: the case study is moderate at **Push** (showing what's wrong) and weak at **Pull** (creating desire for the new site), while actively increasing **Anxiety** (jargon signals "this person speaks a different language") and doing little to overcome **Inertia** (no urgency to act now).

The case study's real competitive set is not other agency portfolios — it's **"do nothing"** and **"ask my nephew for £200."** Against these alternatives, diagnostic methodology is irrelevant. What wins is: "Look at this transformation. 3 days. £500. Your turn."

**Key finding:** The case study is delivering on the wrong job. It delivers "demonstrate analytical rigour" when the job is "give me confidence my phone will ring more."

---

### Model 2: Curse of Knowledge

**Rationale for Selection:** The user has deep expertise in CRO, SEO, and frontend engineering. This expertise is the likely cause of the audience-framing misalignment — the curse of knowledge makes it impossible to see the case study through a non-expert's eyes without deliberate debiasing.

**Analysis & Findings:**

A jargon audit of the current template mapping identified **15+ expert terms that are meaningless to the target audience**, including: CRO heuristic audit, Nielsen's 10 usability heuristics, Speero's 5-dimension framework, ICE scoring, Friction-Reward ratio, LocalBusiness JSON-LD, BreadcrumbList, AggregateRating, compose-first Tailwind v4, Playwright tests, container query sidebar, env(safe-area-inset-bottom), GA4 custom events.

Many of these should be **omitted entirely**, not translated. The reader doesn't need simplified versions of JSON-LD schema types — they need to not encounter them at all.

The most actionable thinking step: **"Show, don't tour your analysis."** The current case study walks the reader through the entire diagnostic process (audit → hypotheses → interventions → build → evidence plan). This is touring the backstage. The reader wants to see the show: Before → After → What changed.

**The electrician analogy is the killer reframe** and should be used explicitly: *"When you hire an electrician, you don't want them to explain the wiring diagram and the BS 7671 regulations. You want the lights to work and the certificate in your hand. When you hire us, you don't need to understand our diagnostic process. You need your phone to ring."*

The diagnostic depth should be **implied by the quality of the result**, not explained in the narrative. One sentence communicates all the rigour a client needs: *"We diagnosed 10 problems with your website before writing a single line of code."*

**Key finding:** The case study contains 15+ expert terms meaningless to the audience, follows the expert's logical order instead of the client's decision order, and tours the analysis instead of showing the transformation.

---

### Model 3: Aristotle's Rhetorical Triangle

**Rationale for Selection:** The case study's persuasive balance is visibly skewed. The Rhetorical Triangle diagnoses exactly how and prescribes the structural fix.

**Analysis & Findings:**

**Current balance:** ~80% Logos (analytical reasoning — methodology, data, frameworks), ~15% Ethos (credibility — diagnostic depth, technical competence), ~5% Pathos (emotion — one good line buried in section 1 of 7).

**Target balance for this audience:** ~40% Pathos, ~35% Logos (simplified), ~25% Ethos.

**Ethos (currently WEAK):**
- No real client testimonial (JJ hasn't been contacted)
- No personal attribution (who is behind Kicksnare?)
- "Unsolicited redesign" framing reads as inexperienced, not rigorous
- No recognisable trust markers for this audience

**Logos (currently STRONG but MISDIRECTED):**
- Abundant data, but for the wrong audience
- 3-4 universally understood metrics exist (SEO score 10→80+, pages 4→13, time-to-phone 15s→0s)
- The rest (FR ratios, ICE scores, Playwright counts) should be removed from the client-facing case study

**Pathos (currently VERY WEAK):**
- The "Nobody in the dark wants to read more" line is emotionally powerful — but buried in methodology text
- No lost-job framing ("every month this website stays live, potential customers call a competitor instead")
- No pride moment ("what if your website looked as professional as the work you do?")
- No human story about JJ or the business

**Key finding:** The case study is catastrophically imbalanced toward misdirected logos. The single best line ("Nobody in the dark wants to read more") should open the page, not be hidden in section 1 of 7. Pathos must increase dramatically; logos must be simplified; ethos needs human attribution and risk-reduction.

---

## Synthesis & Integrated Insights

The three models converge on five integrated findings:

### 1. The case study serves the wrong audience

All three models identify the same structural problem: the case study is written for agency peers (CRO professionals, PMs, developers) rather than for the people who would actually hire Kicksnare (local tradespeople, small business owners). JTBD shows the "job" is wrong. Curse of Knowledge explains why. The Rhetorical Triangle quantifies the imbalance.

### 2. Methodology depth is a differentiator — but only when compressed

The diagnostic rigour (three independent audits, ICE scoring, competitor benchmarking) IS what separates Kicksnare from "my nephew for £200." But the differentiator must be communicated in one sentence, not seven sections. **"We diagnosed 10 problems before writing a line of code"** communicates the same rigour as three pages of methodology — without requiring the reader to understand any of it.

### 3. The case study needs two versions, not one

The 7-section Kickdrum template is excellent for the secondary audience (peers, sophisticated buyers, potential collaborators). The primary audience needs a 4-section version. These are not compromises — they are different products for different jobs.

### 4. Emotion must lead, not follow

Every model points to the same structural change: **pathos first, logos second, ethos throughout.** The "Read more..." story, the lost-job framing, the pride moment — these are what a tradesperson responds to. The data confirms the emotional hook. Currently the structure inverts this: data first, emotion nowhere.

### 5. The "unsolicited redesign" framing needs a total rethink

JTBD's anxiety analysis shows "unsolicited" increases client anxiety. Curse of Knowledge shows the author doesn't realise how this sounds to a non-expert ("why did they do this without asking?"). The Rhetorical Triangle shows it undermines ethos. **Reframe as: "We gave this electrician a free audit and concept build to show what's possible."** Same facts, completely different emotional register.

---

## Actionable Options & Recommendations

### Option A — Restructure the Primary Case Study (RECOMMENDED)

Replace the 7-section Kickdrum template on the main case study page with a 4-section client-focused structure:

**Section 1 — The Problem (Pathos + Logos)**
- Open with: *"The main button on this electrician's website said 'Read more...' Their customers call at 9pm with no power. Nobody in the dark wants to read more."*
- One paragraph: who the business is, what's wrong, in client language
- Before screenshot (mobile, annotated — "phone number here, 15 seconds of scrolling away")
- Three simple numbers: SEO score 10/100, 5-Second Test fail, phone number buried

**Section 2 — What We Built (Logos + Ethos)**
- After screenshot (side-by-side or slider with before)
- 5-6 plain-English bullets:
  - "Phone number one tap away on every page"
  - "7 new service pages so Google can find you for 'electrician Loughborough'"
  - "Real job photos instead of stock images"
  - "Trust credentials (NAPIT, JIB, 5-star reviews) visible within 3 seconds"
  - "Works perfectly on every phone and tablet"
  - "Built in 3 days"
- One sentence of methodology compression: *"We ran three independent audits and diagnosed 10 problems before writing a single line of code."*

**Section 3 — The Numbers (Logos)**
- 3-4 large visual metrics:
  - SEO health: 10 → [measured score]
  - Pages: 4 → 13
  - Time to phone: 15 seconds → instant
  - (If available) Lighthouse performance score
- Below: brief "what's next" block — *"Analytics are wired. Once the site goes live, we'll track exactly how many people tap the call button, which service pages get the most visits, and where visitors come from."*

**Section 4 — Your Turn (Ethos + Pathos)**
- Lost-job framing: *"Every month a website like this stays live, potential customers land on it, can't find the phone number, and call someone else. Even one lost emergency call-out at £200 pays for the entire rebuild."*
- Risk-reducer CTA: *"Want to see what your website is costing you? Drop your URL and we'll send a free 5-minute video audit within 24 hours."*
- DM and email buttons

### Option B — Create a Methodology Deep-Dive Page

Move the 7-section Kickdrum analysis to a separate page: `/case-studies/evoltage-uk/methodology` or a blog post. This serves:
- Agency peers evaluating Kicksnare's analytical depth
- PMs and CRO professionals who might refer clients
- Content marketing (shareable on LinkedIn/X for credibility)
- The user's portfolio of analytical work

Link from the main case study: *"Want to see the full diagnostic behind this rebuild? [Read the methodology →]"*

### Option C — Fix the Ethos Gap

Three actions to address the weakest appeal:
1. **Add personal attribution** — "Built by [name], product manager turned web agency founder" + brief credential
2. **Reframe language** — "free audit and concept build" not "unsolicited redesign"
3. **Get testimonial data** — even if not from JJ: test the staging site with 3 tradespeople, collect one quote. "I showed this to a plumber in Leicester. He said: 'That looks proper professional. Way better than my site.'" This is lightweight social proof but infinitely better than none.

### Implementation Priority

1. **Restructure the case study page** (Option A) — this is the highest-impact change
2. **Fix the ethos gap** (Option C) — can be done in parallel
3. **Create the methodology page** (Option B) — recycles existing content, adds a layer for the secondary audience

---

## References

- Reddit r/smallbusiness (2026): "Small business owners, do you actually read agency case studies?" — Top response: "A general description on how they approach the problem and what the end result was." https://www.reddit.com/r/smallbusiness/comments/1m0djak/
- Rooks Agency: "Case Study: Web Site Redesign for Higher Conversions" — comparable case study for Happy Helpers Moving Co (local trades). Structure: Company → Challenges → Solution → Results. Zero methodology exposition. https://rooksagency.com/case-study-web-site-redesign-for-higher-conversions/
- Mental model files: `Mental_Models/Mental_Model_Strategic-Thinking/jobs-to-be-done.md`, `Mental_Models/Mental_Model_HumanNature/m99_curse_of_knowledge.md`, `Mental_Models/Mental_Model_HumanNature/m102_aristotles_rhetorical_triangle.md`
- Wiki sources: `wiki/pipeline/projects/evoltage-uk-build.md`, `wiki/pipeline/prospects/evoltage-uk.md`, `wiki/concepts/case-study-architecture.md`, `output/evoltage-case-study-s1-diagnosis.md`, `output/evoltage-case-study-s2-hypothesis-intervention.md`, `output/evoltage-case-study-s3-build-evidence.md`, `output/evoltage-case-study-template-mapping.md`
- Neo4j claims: 19 claims across `evoltage-uk-5-second-test`, `evoltage-uk-design-session`, `evoltage-uk-seo-audit`
