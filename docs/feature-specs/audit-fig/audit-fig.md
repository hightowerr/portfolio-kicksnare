# Feature Spec: AuditFig — Recording-in-Progress SVG

## What and why

The `AuditOffer` section currently renders a generic striped placeholder adjacent to the copy "We'll record a 5-minute video audit of your site or product." The image should reinforce the mechanism — a real site being reviewed on a screen recording. This spec defines the replacement: a self-contained inline SVG component that reads as a browser window showing a broken website mid-audit.

## Location

**File:** `components/PortfolioClient.tsx`

**Two changes:**
1. Add `AuditFig` function after `StripedFig` (after line ~54)
2. In `AuditOffer` (~line 183), replace:
   ```tsx
   <StripedFig h={520} label="loom audit · 16:9" id="audit-fig"/>
   ```
   with:
   ```tsx
   <AuditFig />
   ```

No new files. No new imports.

---

## Visual structure

```
┌─────────────────────────────────────────────────────┐  ← outer div: borderRadius 28, bg --paper-2, 520px tall
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░  REC ●                 │  ← stripe bg + REC indicator (top-right margin)
│  ┌─────────────────────────────────────────────────┐ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │  ← plain chrome bar (F2F2F2) — no traffic lights, no URL bar
│  │─────────────────────────────────────────────────│ │
│  │  ░░░░             ░░░░  ░░░░  ░░░░░░  [░░░░░] │ │  ← schematic nav zone
│  │ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐ ╔═══════════════╗ │
│  │ │ ████████████               │ ║  ╲           ╱ ║ │  ← headline (ragged) + broken image
│  │ │ ████████████████████████   │ ║    ╲       ╱   ║ │
│  │ │ █████████                  │ ║      ╲   ╱     ║ │
│  │ └ ─ "No hook" ◄──────────── ┘ ╚═══════════════╝ │
│  │   ████████████████████          ← wall of text   │ │
│  │   ████████████████                               │ │
│  │  ┌──────────┐                                    │ │
│  │  │ [button] │ ◄── "No clear action"              │ │  ← weak CTA annotated
│  │  └──────────┘     ↑ cursor                       │ │
│  │  ──────────────────────────────────────────────  │ │
│  │  ████ footer ████████████████████████████████   │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## Component implementation

```tsx
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

        {/* Chrome bar — plain schematic bar, no traffic lights, no URL bar */}
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

## Design token compliance

Branded colors are applied via `style` prop (not SVG attribute form) so CSS vars resolve correctly in inline SVG.

| Element | CSS var | Applied via |
|---|---|---|
| Outer div background | `var(--paper-2)` | React `style` prop |
| Outer div border | `var(--border-hair)` | React `style` prop |
| Stripe line stroke | `var(--line)` | SVG `style` prop |
| Annotation rect stroke | `var(--accent)` | SVG `style` prop |
| Callout bubble fill | `var(--ink)` | SVG `style` prop |
| Callout text fill | `var(--paper)` | SVG `style` prop |
| REC circle fill | `var(--accent)` | SVG `style` prop |
| REC text fill | `var(--ink)` | SVG `style` prop |
| Cursor fill | `var(--paper)` | SVG `style` prop |

**Justified hardcoded values:**

| Value | Element | Reason |
|---|---|---|
| `rgba(1,11,9,0.10)` | `feDropShadow floodColor` | CSS vars unreliable in SVG filter primitives cross-browser |
| `rgba(255,94,0,0.08/0.10)` | Annotation rect `fill` | Semi-transparent derived value; no token for alpha variants |
| `#DDD`, `#F2F2F2`, `#C8C8C8`, etc. | Mockup content rects | Illustration-internal grays; not Kicksnare design tokens |
| `#333` | Cursor outline stroke | No cursor-outline token |
| `'JetBrains Mono', monospace` | SVG `fontFamily` attribute | CSS vars do not resolve in SVG `fontFamily` attribute form |

**Invariant #7 note:** `feDropShadow` is an SVG filter primitive, not a CSS `box-shadow`. `--shadow-lg` (reserved for the case-study modal) is a CSS property — structurally distinct. No violation.

## Verification

1. `pnpm dev` — no runtime errors
2. Scroll to AuditOffer section — browser mockup visible in place of stripes
3. Orange annotation boxes on headline and CTA areas
4. `REC` indicator in top-right corner of the striped background
5. Resize viewport — `preserveAspectRatio="xMidYMid meet"` maintains proportions
6. `aria-hidden="true"` — decorative, no screen reader noise
