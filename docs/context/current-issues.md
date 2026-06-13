# Current Issues

### Open

3. **No JJ testimonial** — Evoltage case study `result.quote` has empty strings. JJ has not been contacted about using his business as a case study. The case study CTA section omits a quote block accordingly. Add testimonial data to `lib/cases.ts` if/when obtained.
4. **About page photo blocked on content** — About page still uses `StripedFig` placeholder for OO photo. A real headshot is needed at `public/images/oo-portrait.jpg` (or similar). Once provided, replace `<StripedFig />` in `components/AboutClient.tsx` line 67 with a `next/image` or `<img>` element styled to match (3:4 aspect, 28px radius, overflow hidden). Case study figures are all resolved — real screenshots in S1 and S2.
12. Need to set up PostHog
13. Need to set up Microsoft Clarity

### Solved

1. In the navBar hide the 'Open · 2 slots Jun' text. Not a feature or service I can support yet.
2. Change all relevant text from first person to third person voice - One person agency is not a USP and customers don't care.
3. **Reveal component duplication** — Extracted to `components/Reveal.tsx` and imported in all three consumers.
4. **PAIRS duplication** — Verified: all consumers (`PortfolioClient.tsx`, `AboutClient.tsx`, `CaseStudyClient.tsx`) import from `lib/fonts.ts`. No stale local copies exist.
5. **Architecture context stale** — Invariant #3 updated to list all `'use client'` components (added `ContactModal`, `Reveal`). Invariant #6 already pointed to `lib/cases.ts`. Site Structure, File Structure, and Content Model sections were already accurate.
6. **JJ review count missing** — Checkatrade listing expired (404). Replaced with verifiable MyBuilder data: 5/5 rating, 59 reviews. Updated S2 bullet in `CaseStudyClient.tsx`. Note: if the Evoltage website still displays a Checkatrade badge, JJ should update it to MyBuilder or re-activate the Checkatrade listing.
7. **Price expectation halo** — Added a line in S2 (CaseStudyClient.tsx) addressing the objection: premium design is deliberate because emergency trades are trust-driven, not price-driven. A polished site filters for higher-value jobs.
8. **Low-res mobile screenshots** — Replaced 167×355px sources with 1290×2796px iPhone 14 Pro Max captures. Now 3.33x downscaled at display size — crisp on all screens including 3x retina.
9. **Section side padding missing** — Inline `padding` shorthand (e.g. `'70px 0 100px'`) was overriding the CSS `padding-inline` from `.wrap` by setting left/right to `0`. Changed to `paddingBlock` on 7 sections: Hero, Audit, Problem in `PortfolioClient.tsx`; S1, S2, S3 in `CaseStudyClient.tsx`; Bio Hero in `AboutClient.tsx`.
10. **Hamburger mobile overlay broken** — The nav overlay (`position: fixed`) was rendered inside `<header>` which has `backdrop-filter`. `backdrop-filter` creates a new containing block, so the overlay was constrained to the header's ~88px height instead of the viewport. Fix: moved the overlay out of `<header>` as a sibling via React fragment in `components/Header.tsx`.
11. **Problem accordions closed by default + white space** — `PainItem` in `PortfolioClient.tsx` now defaults to `useState(true)` (open). Padding transitions from `28px` (open) to `16px` (closed), header-to-title margin from `18px` to `8px`, both with `350ms ease` matching the body transition.
12. **Evoltage shipped screenshot** — Screenshot captured from `evoltage-uk.vercel.app` via shareable link, saved to `public/images/evoltage-shipped.png`. Added `image?: string` field to `CaseStudy` interface in `lib/cases.ts`. `WorkCard` in `PortfolioClient.tsx` now conditionally renders `<img>` when `c.image` exists, falls back to striped SVG placeholder otherwise. Label text color adjusts to white-alpha on image cards for readability.
13. **Accordion toggles broken on desktop** — Inline `display: 'flex'` on `.pain-item__toggle` and `.process-step__toggle` buttons overrode the CSS `@container (min-width: 520px) { display: none }` rule. Moved `display: flex` + alignment to CSS classes in `globals.css`, removed from inline styles in `PortfolioClient.tsx`. Desktop: toggles hidden, bodies always open. Mobile: toggles visible and functional.
