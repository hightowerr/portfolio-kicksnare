# Problem Diagnosis

## Problem Statement

The user (a PM-turned-AI/web agency founder running Kicksnare) has completed a full website rebuild for Evoltage UK — a local electrician — as an unsolicited redesign / mock project. The build is technically complete (18 phases, 13 pages, ~105 Playwright tests, deployed to Vercel staging). A detailed case study template mapping has been produced (`output/evoltage-case-study-template-mapping.md`) that maps every section of the Kicksnare case study page template to Evoltage-specific content.

**The core tension:** The case study template (modelled on the Halocrate example on kicksnare.digital) is structured around methodology, diagnostic rigour, and technical metrics (ICE scores, FR ratios, Lighthouse deltas, schema coverage). The user suspects this framing — while impressive to peers and other agencies — may not resonate with the actual target audience: **potential small business clients** (e.g., other local tradespeople, small e-commerce operators) who would hire Kicksnare.

**The specific worry:** A potential client visiting kicksnare.digital doesn't care about:
- Nielsen's 10 heuristics or Speero's 5-dimension framework
- ICE scoring methodology
- Friction-Reward ratios
- Tailwind v4 compose-first architecture decisions
- Neo4j graph claims or Playwright test counts

They care about:
- "Will this person get me more customers?"
- "How much does it cost?"
- "How long does it take?"
- "Does the result look professional?"
- "Has this worked for someone like me?"

**Compounding factor:** This is an unsolicited redesign with no live results — no conversion data, no traffic, no testimonial from JJ (the Evoltage owner). The template mapping acknowledges this but frames the gap with an "evidence plan" (what WOULD be measured). A potential client may not find predicted metrics or measurement frameworks compelling.

## Context

- **Target audience for the case study:** Small business owners (trades, local services, small e-commerce) considering a website rebuild. Budget range £500-2,000. Not technically sophisticated.
- **The case study's job:** Convert a visitor on kicksnare.digital into a lead (DM, email, or audit request). It must demonstrate capability and build trust within a 7-10 minute read.
- **Current framing:** Process-led (diagnosis → hypothesis → intervention → build → evidence plan). Seven sections following the Kickdrum template.
- **The Halocrate example:** Uses real results (−41% bounce, 2.6× demo bookings) as the anchor. Evoltage cannot replicate this.
- **Existing drafts:** S1 Diagnosis, S2 Hypothesis & Intervention, S3 Build & Evidence Plan — all written in agency/CRO professional language.

## Key Questions

1. What does a small business owner actually want to see in a case study before they trust an agency with their website?
2. How should the framing shift from "look at our methodology" to "look at the outcome for someone like you"?
3. Given no live results exist, what can substitute for conversion data as a trust anchor?
4. Is the 7-section Kickdrum template the right structure for this audience, or should it be simplified?
5. How do you balance demonstrating analytical depth (which differentiates from cheap freelancers) with speaking the client's language?
