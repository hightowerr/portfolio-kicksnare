# Current Issues

### Open

1. **Reveal component duplication** — `Reveal` is copy-pasted in `PortfolioClient.tsx`, `CaseStudyClient.tsx`, and `AboutClient.tsx`. Should be extracted to `components/Reveal.tsx` once a fourth consumer appears.
2. **PAIRS duplication** — `PAIRS` is defined in `lib/fonts.ts` (canonical) but the old `CaseStudyClient.tsx` was using a local copy. Cleaned up in V4, but verify no stale local `PAIRS` remain if new pages are added.
3. **No JJ testimonial** — Evoltage case study `result.quote` has empty strings. JJ has not been contacted about using his business as a case study. The case study CTA section omits a quote block accordingly. Add testimonial data to `lib/cases.ts` if/when obtained.
4. **No real photos (case study resolved, About page open)** — About page still uses `StripedFig` placeholder for OO photo. All three Evoltage case study figures now use real screenshots: S1 hero uses desktop screenshot in browser mockup with annotations; S2 before/after uses real mobile screenshots (`evoltage-before-mobile.png`, `evoltage-after-mobile.png`).
5. **Architecture context stale** — `architecture-context.md` says "'use client' is confined to PortfolioClient.tsx and CaseStudyModal.tsx" (Invariant #3) and "Case study data is defined once, in CaseStudyModal.tsx" (Invariant #6). Both are now inaccurate — client boundaries exist in Header, Footer, AboutClient, CaseStudyClient, and BottomBar; case study data lives in `lib/cases.ts`. Update the invariants.
6. **JJ review count missing** — Research gap: "5.0 across Checkatrade" but no review count. Volume matters for social proof credibility.
7. **Price expectation halo** — Research gap: the rebuilt site's premium design aesthetic may cause price-sensitive visitors to self-select out. The case study doesn't address this.
8. ~~**Low-res mobile screenshots**~~ — Resolved. Replaced 167×355px sources with 1290×2796px iPhone 14 Pro Max captures. Now 3.33x downscaled at display size — crisp on all screens including 3x retina.

### Solved

1. In the navBar hide the 'Open · 2 slots Jun' text. Not a feature or service I can support yet.
2. Change all relevant text from first person to third person voice - One person agency is not a USP and customers don't care.