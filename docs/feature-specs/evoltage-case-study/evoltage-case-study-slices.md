# Evoltage Case Study — Slices

## Sliced Breadboard

```mermaid
flowchart TB
    subgraph slice1["V1: SHARED SCAFFOLD + SECTION 1"]
        N5["N5: Header.tsx"]
        N6["N6: Footer.tsx"]
        N3["N3: page.tsx route"]
        U3cs["U3: Shared Header"]
        U4["U4: S1 The Problem\npathos + before screenshot + 3 stats"]
        U9cs["U9: Shared Footer"]
    end

    subgraph slice2["V2: SECTIONS 2 + 3"]
        U5["U5: S2 What We Built\nbefore/after + bullets + methodology"]
        U6["U6: S3 The Numbers\n4 stat blocks + what's next"]
    end

    subgraph slice3["V3: SECTION 4 + BYLINE"]
        U7["U7: S4 Your Turn\nlost-job CTA + risk reducer"]
        U8["U8: Byline strip\nBuilt by OO"]
    end

    subgraph slice4["V4: ABOUT PAGE"]
        N4["N4: about/page.tsx"]
        U10["U10: Shared Header"]
        U11["U11: OO bio section"]
        U12["U12: Contact links"]
        U13["U13: Shared Footer"]
    end

    subgraph slice5["V5: HOMEPAGE WIRING + OG"]
        N1["N1: CaseStudy.href field"]
        N2["N2: Evoltage case data"]
        N7["N7: OG image"]
        U1["U1: WorkCard Link"]
        U2["U2: HeroProject Link"]
    end

    %% Force slice ordering
    slice1 ~~~ slice2
    slice2 ~~~ slice3
    slice3 ~~~ slice4
    slice4 ~~~ slice5

    %% Cross-slice wiring
    N5 -.-> U3cs
    N5 -.-> U10
    N6 -.-> U9cs
    N6 -.-> U13
    U4 --> U5
    U5 --> U6
    U6 --> U7
    U8 -->|link| N4
    U1 -->|navigate| N3
    U1 -.-> N1
    N3 -.-> N7

    %% Slice styling
    style slice1 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style slice2 fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
    style slice3 fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    style slice4 fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    style slice5 fill:#fff8e1,stroke:#ffc107,stroke-width:2px

    %% Node styling
    classDef ui fill:#ffb6c1,stroke:#d87093,color:#000
    classDef nonui fill:#d3d3d3,stroke:#808080,color:#000
    class U1,U2,U3cs,U4,U5,U6,U7,U8,U9cs,U10,U11,U12,U13 ui
    class N1,N2,N3,N4,N5,N6,N7 nonui
```

**Legend:**

- **Pink nodes (U)** = UI affordances (things users see/interact with)
- **Grey nodes (N)** = Code affordances (data stores, handlers, services)
- **Solid lines** = Wires Out (calls, triggers, navigations)
- **Dashed lines** = Returns To (reads data from)

---

## Slices Grid

|  |  |  |
|:--|:--|:--|
| **V1: SHARED SCAFFOLD + SECTION 1**<br>✅ IMPLEMENTED<br><br>• Extract Header.tsx from PortfolioClient<br>• Extract Footer.tsx from PortfolioClient<br>• Create app/case-studies/evoltage/page.tsx<br>• S1: pathos headline, JJ intro, before screenshot (real desktop screenshot in browser mockup with annotations), 3 stats<br><br>*Demo: Navigate to /case-studies/evoltage, see S1 with header/footer* | **V2: SECTIONS 2 + 3**<br>✅ IMPLEMENTED<br><br>• S2: before/after real mobile screenshots (evoltage-before-mobile.png / evoltage-after-mobile.png)<br>• S2: plain-English bullet list + methodology sentence<br>• S3: 4 large stat blocks (5-second test delta)<br>• S3: "what's next" text block<br><br>*Demo: Scroll S1 through S3, full evidence arc* | **V3: SECTION 4 + BYLINE**<br>✅ IMPLEMENTED<br><br>• S4: lost-job framing copy<br>• S4: spec-work honesty line<br>• S4: CTA buttons (booking + contact + DM)<br>• Byline strip "Built by OO" with /about link<br><br>*Demo: Complete case study page end-to-end* |
| **V4: ABOUT PAGE**<br>✅ IMPLEMENTED<br><br>• Create app/about/page.tsx<br>• OO bio: name, background, positioning<br>• Photo placeholder<br>• Contact links (DM + email + booking)<br><br>*Demo: Click "Built by OO" on case study, see bio page* | **V5: HOMEPAGE WIRING + OG META**<br>✅ IMPLEMENTED<br><br>• Add href? to CaseStudy interface<br>• Evoltage entry in cases[] array<br>• WorkCard conditional Link vs button<br>• HeroProject row conditional<br>• OG metadata + social image<br><br>*Demo: Click evoltage card on homepage, navigates to case study* | |

---

## V1: Shared Scaffold + Section 1

### Affordances

| ID | Type | Affordance |
|----|------|-----------|
| N5 | Non-UI | `components/Header.tsx` — extract from PortfolioClient lines 189-378. Props: `fonts`, `scrolled`, `heroPassed`, `isMobile`, `activeSection`. Homepage imports from new location. |
| N6 | Non-UI | `components/Footer.tsx` — extract from PortfolioClient lines 1301-1318. Props: `fonts`. |
| N3 | Non-UI | `app/case-studies/evoltage/page.tsx` — Server Component shell with metadata export. |
| U3 | UI | Shared Header on case study page |
| U4 | UI | S1: The Problem — `(01) The problem` eyebrow, pathos headline, JJ paragraph, annotated before SVG, 3 inline stats |
| U9 | UI | Shared Footer on case study page |

### Key files

- `components/PortfolioClient.tsx` — extract Header (lines 189-378) and Footer (lines 1301-1318) into separate files, replace inline definitions with imports
- `components/Header.tsx` — new file
- `components/Footer.tsx` — new file
- `app/case-studies/evoltage/page.tsx` — new file

---

## V2: Sections 2 + 3

### Affordances

| ID | Type | Affordance |
|----|------|-----------|
| U5 | UI | S2: What We Built — `(02) What we built` eyebrow, before/after screenshot pair, bullet list with check icons, methodology sentence |
| U6 | UI | S3: The Numbers — `(03) The numbers` eyebrow, 4 large stat blocks (value + label + sub), "what's next" text block |

### Key files

- `app/case-studies/evoltage/page.tsx` — add S2 and S3 sections below S1

---

## V3: Section 4 + Byline

### Affordances

| ID | Type | Affordance |
|----|------|-----------|
| U7 | UI | S4: Your Turn — `(04) Your turn` eyebrow, lost-job copy, spec-work line, CTA group (booking + contact + DM), guarantee |
| U8 | UI | Byline strip — "Built by OO" + link to `/about` (dead link until V4) |

### Key files

- `app/case-studies/evoltage/page.tsx` — add S4 and byline

---

## V4: About Page

### Affordances

| ID | Type | Affordance |
|----|------|-----------|
| N4 | Non-UI | `app/about/page.tsx` — Server Component with metadata |
| U10 | UI | Shared Header |
| U11 | UI | OO bio section — name, "seven years in retail PM", Kicksnare origin, anti-agency copy, photo placeholder |
| U12 | UI | Contact links — DM + email + booking, same visual pattern as case study CTA |
| U13 | UI | Shared Footer |

### Key files

- `app/about/page.tsx` — new file

---

## V5: Homepage Wiring + OG Meta

### Affordances

| ID | Type | Affordance |
|----|------|-----------|
| N1 | Non-UI | Add `href?: string` to `CaseStudy` interface in `lib/cases.ts` |
| N2 | Non-UI | Add evoltage entry to `cases[]` and `heroProjects[]` in `lib/cases.ts` |
| U1 | UI | `WorkCard` — conditional: render `<Link href={c.href}>` when href exists, `<button onClick={onOpen}>` otherwise |
| U2 | UI | `HeroProject` row — same conditional for hero project list |
| N7 | Non-UI | OG image — `app/case-studies/evoltage/opengraph-image.tsx` or static asset |

### Key files

- `lib/cases.ts` — add `href?` field, add evoltage entry
- `components/PortfolioClient.tsx` — update WorkCard and hero project row with conditional rendering
- `app/case-studies/evoltage/opengraph-image.tsx` — new file (or static `public/og/evoltage.png`)
