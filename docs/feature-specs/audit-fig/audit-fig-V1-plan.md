---
shaping: true
---

# V1 Implementation Plan — AuditFig

**Slice:** V1 — AuditFig complete  
**File:** `components/PortfolioClient.tsx`  
**Slices doc:** `docs/feature-specs/audit-fig-slices.md`

---

## Two changes, one file

| # | Location | What |
|---|----------|------|
| 1 | After `StripedFig` closing brace (line 54) | Insert `AuditFig` function |
| 2 | Inside `AuditOffer` (line 183) | Replace `<StripedFig h={520} label="loom audit · 16:9" id="audit-fig"/>` with `<AuditFig />` |

---

## Change 1 — Insert `AuditFig` after line 54

Insert the following block between the `StripedFig` closing brace and the `// ─── Header` comment:

```tsx
// ─── AuditFig ────────────────────────────────────────────────────────────────
function AuditFig() {
  return (
    <div style={{
      position: 'relative', width: '100%', height: 520,
      borderRadius: 28, overflow: 'hidden',
      background: 'var(--paper-2)', border: 'var(--border-hair)',
    }}>
      <svg
        width="100%" height="100%"
        viewBox="0 0 800 520"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <pattern id="audit-fig-stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" style={{stroke: 'var(--line)'}} strokeWidth="2"/>
          </pattern>
          {/* floodColor in SVG filter primitives does not reliably resolve CSS vars cross-browser */}
          <filter id="audit-browser-shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="rgba(1,11,9,0.10)"/>
          </filter>
        </defs>

        {/* Layer 1: stripe background */}
        <rect width="800" height="520" fill="url(#audit-fig-stripes)"/>

        {/* Layer 2: browser card */}
        <rect x="80" y="60" width="640" height="380" rx="12"
          fill="white" filter="url(#audit-browser-shadow)"/>

        {/* Chrome bar */}
        <rect x="80" y="60" width="640" height="38" rx="12" fill="#F2F2F2"/>
        <rect x="80" y="80" width="640" height="18" fill="#F2F2F2"/>

        {/* Layer 3: bad website content */}

        {/* Nav */}
        <rect x="96" y="114" width="44" height="8" rx="2" fill="#DDD"/>
        <rect x="506" y="114" width="34" height="8" rx="2" fill="#DDD"/>
        <rect x="548" y="114" width="34" height="8" rx="2" fill="#DDD"/>
        <rect x="590" y="114" width="34" height="8" rx="2" fill="#DDD"/>
        <rect x="632" y="108" width="72" height="22" rx="3" fill="#DDD"/>

        <line x1="80" y1="132" x2="720" y2="132" stroke="#EFEFEF" strokeWidth="1"/>

        {/* Hero — ragged headline */}
        <rect x="96" y="152" width="260" height="15" rx="3" fill="#C8C8C8"/>
        <rect x="96" y="173" width="400" height="15" rx="3" fill="#C8C8C8"/>
        <rect x="96" y="194" width="180" height="15" rx="3" fill="#C8C8C8"/>

        {/* Wall of subtext */}
        <rect x="96" y="222" width="340" height="9" rx="2" fill="#DDD"/>
        <rect x="96" y="235" width="310" height="9" rx="2" fill="#DDD"/>
        <rect x="96" y="248" width="280" height="9" rx="2" fill="#DDD"/>
        <rect x="96" y="261" width="320" height="9" rx="2" fill="#DDD"/>

        {/* Weak CTA */}
        <rect x="96" y="284" width="88" height="24" rx="3" fill="#C8C8C8"/>

        {/* Broken image placeholder */}
        <rect x="456" y="140" width="228" height="188" rx="4" fill="#EBEBEB"/>
        <line x1="472" y1="156" x2="668" y2="312" stroke="#D5D5D5" strokeWidth="2"/>
        <line x1="668" y1="156" x2="472" y2="312" stroke="#D5D5D5" strokeWidth="2"/>

        {/* Body text below hero */}
        <rect x="96" y="328" width="300" height="8" rx="2" fill="#E5E5E5"/>
        <rect x="96" y="341" width="260" height="8" rx="2" fill="#E5E5E5"/>
        <rect x="96" y="354" width="290" height="8" rx="2" fill="#E5E5E5"/>
        <rect x="96" y="367" width="220" height="8" rx="2" fill="#E5E5E5"/>

        {/* Footer */}
        <rect x="80" y="400" width="640" height="40" fill="#F5F5F5"/>
        <rect x="96" y="416" width="100" height="7" rx="2" fill="#DDD"/>
        <rect x="532" y="416" width="55" height="7" rx="2" fill="#DDD"/>
        <rect x="596" y="416" width="55" height="7" rx="2" fill="#DDD"/>
        <rect x="660" y="416" width="44" height="7" rx="2" fill="#DDD"/>

        {/* Layer 4: audit annotations */}

        {/* Annotation 1 — headline has no hook */}
        <rect x="90" y="146" width="416" height="70" rx="4"
          fill="rgba(255,94,0,0.08)" style={{stroke: 'var(--accent)'}} strokeWidth="1.5" strokeDasharray="5 3"/>
        <rect x="516" y="146" width="116" height="30" rx="6" style={{fill: 'var(--ink)'}}/>
        <polygon points="516,166 504,160 516,154" style={{fill: 'var(--ink)'}}/>
        <text x="574" y="165" textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace" fontSize="9.5"
          fontWeight="500" style={{fill: 'var(--paper)'}} letterSpacing="0.04em">
          No hook
        </text>

        {/* Annotation 2 — CTA is invisible */}
        <rect x="90" y="279" width="100" height="34" rx="4"
          fill="rgba(255,94,0,0.10)" style={{stroke: 'var(--accent)'}} strokeWidth="1.5" strokeDasharray="5 3"/>
        <rect x="204" y="280" width="148" height="30" rx="6" style={{fill: 'var(--ink)'}}/>
        <polygon points="204,299 192,293 204,287" style={{fill: 'var(--ink)'}}/>
        <text x="278" y="299" textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace" fontSize="9.5"
          fontWeight="500" style={{fill: 'var(--paper)'}} letterSpacing="0.04em">
          No clear action
        </text>

        {/* Cursor near CTA */}
        <g transform="translate(162, 308)">
          <path
            d="M0 0 L0 18 L4 14 L7 20 L9.5 19 L6.5 13 L12 13 Z"
            style={{fill: 'var(--paper)'}} stroke="#333" strokeWidth="1" strokeLinejoin="round"/>
        </g>

        {/* Layer 5: REC indicator */}
        <circle cx="666" cy="30" r="7" style={{fill: 'var(--accent)'}}/>
        <text x="679" y="35"
          fontFamily="'JetBrains Mono', monospace" fontSize="12"
          fontWeight="500" style={{fill: 'var(--ink)'}} letterSpacing="0.10em">
          REC
        </text>
      </svg>
    </div>
  );
}
```

---

## Change 2 — Swap JSX in `AuditOffer` (line 183)

```tsx
// Before
<StripedFig h={520} label="loom audit · 16:9" id="audit-fig"/>

// After
<AuditFig />
```

The `<Reveal>` wrapper stays unchanged.

---

## Verification

Run `pnpm dev` and check each item:

| # | Check | Pass condition |
|---|-------|---------------|
| 1 | No build errors | Terminal shows no TypeScript or JSX errors |
| 2 | Browser mockup visible | Scroll to `#audit` — browser window illustration replaces stripes |
| 3 | Annotation overlays | Two orange dashed boxes on headline area and CTA area |
| 4 | Callout bubbles | "No hook" and "No clear action" labels visible in dark bubbles |
| 5 | REC indicator | Orange circle + `REC` text in top-right, above browser card |
| 6 | Responsive | Narrow viewport — illustration scales without clipping or overflow |
| 7 | Token resolution | DevTools computed styles on branded elements show token values resolving correctly |
| 8 | No screen reader noise | Inspect SVG root — `aria-hidden="true"` present |
