/* case-study.jsx — Case-study modal: Header → Problem → Approach → Solution → Result → CTA */

// ─── Data ───────────────────────────────────────────────────────────────────
// One fully-written case (Halocrate). The other two reuse the same shape with
// stubbed placeholder copy — swap in real numbers when the engagements ship.

const CASES = [
  {
    id: 'halocrate',
    name: 'Halocrate',
    tagline: 'Cutting bounce on a 1.2M-visit SaaS site by 41%.',
    sector: 'B2B SaaS · Devtools',
    year: '2025',
    duration: '6 weeks',
    role: 'Design + dev lead',
    stack: 'Next.js · Vercel · Framer',
    services: ['Web design', 'Web development', 'CRO'],
    tone: '#FBE9B8',

    problem: {
      lede: 'Halocrate was bringing 1.2M visitors a year to a site they had outgrown.',
      detail: "The marketing site had grown by accretion — a homepage written in 2021, a /pricing page added during a fundraise, four product pages built by four different freelancers. Bounce on /pricing was 73%. Demo bookings had been flat for three quarters while traffic climbed.",
      pains: [
        '/pricing was answering the wrong questions — features over outcomes',
        'Three competing CTAs above the fold, each going to a different funnel',
        'Mobile conversion was a third of desktop and nobody had noticed',
      ],
    },

    approach: {
      lede: 'I treat marketing sites like products. Same artifacts, same rigor.',
      steps: [
        { n: '01', t: 'Funnel teardown', d: 'Pulled 90 days of GA4 + Heap. Mapped every entry path → exit, sized each leak in dollars of CAC.' },
        { n: '02', t: '12 customer calls', d: '5 churned, 7 active. Asked what almost stopped them buying. Three answers came back over and over.' },
        { n: '03', t: 'Hypothesis matrix', d: 'Listed every change we could ship, scored each by expected lift × effort. Picked the top 6 for sprint one.' },
        { n: '04', t: 'Ship in 1-week sprints', d: 'New /pricing live in week 2. Homepage in week 4. Funnel handoff to sales in week 6.' },
      ],
      insight: {
        label: 'The bet',
        body: 'Halocrate\'s buyer is a senior eng who reads the docs before the pricing page. We rebuilt /pricing to lead with the integration matrix, not the tier ladder.',
      },
    },

    solution: {
      shipped: [
        'New homepage (5 sections, replaces 11)',
        'New /pricing — integration-first, ROI calculator inline',
        'New /docs landing with task-based nav',
        'Mobile redesign — site is now 60% lighter',
        'GA4 + Segment event spec + dashboard',
        'Sales handoff: Notion + Loom playbook',
      ],
      figures: [
        { label: '/pricing · before · after', aspect: '16/9' },
        { label: '/homepage · 5 sections', aspect: '4/5' },
        { label: 'ROI calculator · inline', aspect: '4/5' },
        { label: 'mobile · key flows', aspect: '9/19' },
      ],
    },

    result: {
      lede: 'Inside 60 days, Halocrate\'s funnel was a different shape.',
      stats: [
        { v: '-41%', l: 'Bounce on /pricing',     sub: '90-day rolling' },
        { v: '2.6×', l: 'Demo bookings · /pricing', sub: 'vs. prior quarter' },
        { v: '-23%', l: 'Blended CAC',            sub: 'paid + organic' },
        { v: '3.4×', l: 'Mobile conversion',      sub: 'previously broken' },
      ],
      quote: {
        body: 'The team treated our site like a product. We got back something we could actually iterate on — not a redesign we\'d have to redo in 18 months.',
        who: 'Maya O.',
        role: 'VP Growth, Halocrate',
      },
    },
  },
  {
    id: 'northbeam',
    name: 'Northbeam DTC',
    tagline: '3.1× ROAS on a $1.2M/yr paid account in one quarter.',
    sector: 'DTC · Apparel',
    year: '2025 · ongoing',
    duration: 'Ongoing retainer',
    role: 'Paid + UX lead',
    stack: 'Meta · Google · Shopify · Klaviyo',
    services: ['Paid growth', 'UX', 'CRO'],
    tone: '#D9E8E2',

    problem: {
      lede: 'Northbeam was spending $100k/mo on ads with no clear attribution.',
      detail: 'Spend was climbing month over month. ROAS was unclear, ad fatigue was setting in, and the landing page experience for cold traffic was the same as for warm. Nobody could say which channels paid back inside the return window.',
      pains: ['Ad fatigue on top 3 creative concepts', 'One landing page for every campaign', 'Klaviyo flows untouched since 2023'],
    },
    approach: {
      lede: 'Diagnose first. Spend second.',
      steps: [
        { n: '01', t: 'Attribution audit', d: 'Set up multi-touch attribution. Found 38% of "Meta sales" were re-credited organic.' },
        { n: '02', t: 'Creative teardown', d: 'Mapped 4 winning concepts, killed 11 underperformers, briefed 6 new variants per week.' },
        { n: '03', t: 'Funnel-matched LPs', d: 'Built 6 dedicated landing pages — one per audience × intent quadrant.' },
        { n: '04', t: 'Lifecycle rebuild', d: 'Rewrote welcome + abandoned cart + winback flows.' },
      ],
      insight: { label: 'The bet', body: 'Cold traffic doesn\'t want a homepage. Build it a page that answers the ad it just clicked, and nothing else.' },
    },
    solution: {
      shipped: ['Multi-touch attribution dashboard', '6 audience-matched landing pages', 'Weekly creative pipeline (12/wk)', 'Klaviyo welcome / abandoned / winback', 'Daily channel pacing report', 'Quarterly creative review cadence'],
      figures: [
        { label: 'attribution dashboard', aspect: '16/9' },
        { label: 'cold LP · variant A', aspect: '4/5' },
        { label: 'creative pipeline', aspect: '4/5' },
        { label: 'lifecycle flows', aspect: '16/9' },
      ],
    },
    result: {
      lede: 'One quarter in, ROAS more than tripled and CAC fell.',
      stats: [
        { v: '3.1×', l: 'Blended ROAS',         sub: 'Q1 vs Q4' },
        { v: '-34%', l: 'Blended CAC',          sub: 'Q1 vs Q4' },
        { v: '+58%', l: 'Email-attributed rev', sub: 'lifecycle' },
        { v: '12/wk', l: 'Creative throughput', sub: 'from 2/wk' },
      ],
      quote: { body: 'For the first time we can tell which ads actually paid. That changed how the entire team plans.', who: 'Tomás L.', role: 'CMO, Northbeam' },
    },
  },
  {
    id: 'mara',
    name: 'Studio Mara',
    tagline: 'Cut no-shows 26% across a 14-location wellness chain.',
    sector: 'Wellness · Multi-location',
    year: '2024',
    duration: '9 weeks',
    role: 'Product design + SEO',
    stack: 'React Native · Supabase · Webflow',
    services: ['App design', 'SEO', 'Brand'],
    tone: '#FCE0CC',

    problem: {
      lede: 'Studio Mara was losing 22% of bookings to no-shows and double-booking.',
      detail: 'A growing chain built on Mindbody had outgrown the platform. Bookings were leaking through unconfirmed slots, staff schedules drifted from the app, and SEO traffic to location pages had plateaued because every page was identical.',
      pains: ['No-show rate climbing as locations scaled', 'Staff schedule drift between app + ops', '14 near-duplicate location pages, no local SEO'],
    },
    approach: {
      lede: 'One app for clients. One ops view for managers. One programmatic SEO layer.',
      steps: [
        { n: '01', t: 'Booking-flow rewrite', d: 'Reduced steps from 7 → 3. Added confirm + reschedule from the home screen.' },
        { n: '02', t: 'Ops dashboard',         d: 'Single screen managers actually open. Real-time drift alerts.' },
        { n: '03', t: 'Programmatic location pages', d: '14 unique pages with neighborhood content, schema, and reviews.' },
        { n: '04', t: 'Quiet onboarding',      d: 'Phased rollout, 2 locations per week. Zero downtime cutover.' },
      ],
      insight: { label: 'The bet', body: 'Most no-shows are bookings the client forgot they made. A 24h SMS with a one-tap reschedule fixes most of them.' },
    },
    solution: {
      shipped: ['New booking flow (7 → 3 steps)', 'Manager ops dashboard', '14 programmatic location pages', '24h SMS reminder + reschedule', 'Local schema + reviews', 'Phased rollout playbook'],
      figures: [
        { label: 'booking flow · 3 steps', aspect: '9/19' },
        { label: 'ops dashboard', aspect: '16/9' },
        { label: 'location page · template', aspect: '4/5' },
        { label: 'SMS · reschedule flow', aspect: '9/19' },
      ],
    },
    result: {
      lede: 'Inside 90 days the chain shipped its highest-utilization month ever.',
      stats: [
        { v: '-26%', l: 'No-show rate',        sub: 'across 14 locations' },
        { v: '+38%', l: 'Local organic traffic', sub: '90-day rolling' },
        { v: '+19%', l: 'Slot utilization',    sub: 'chain-wide' },
        { v: '3 steps', l: 'New booking flow', sub: 'down from 7' },
      ],
      quote: { body: 'It feels like the app finally fits the business. We grew two more locations this year without the chaos.', who: 'Inez W.', role: 'Founder, Studio Mara' },
    },
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const CSArrowRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CSArrowDiag = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CSClose = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function StripedFig({ tone = '#EAF3EE', label = 'figure', aspect = '16/9', id }) {
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: aspect,
      borderRadius: 16, overflow: 'hidden',
      background: tone, border: '1px solid rgba(6,55,45,0.06)',
    }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern id={`cs-stripes-${id}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(6,55,45,0.06)" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#cs-stripes-${id})`}/>
      </svg>
      <div style={{
        position: 'absolute', left: 14, bottom: 12,
        fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.08em',
        color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

// ─── Section: Header ────────────────────────────────────────────────────────
function CSHeader({ c, fonts, index, total }) {
  return (
    <header style={{ padding: '40px 56px 56px', borderBottom: '1px solid var(--line)' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
        letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 28,
      }}>
        <span>Case study {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <span>{c.year} · {c.duration}</span>
      </div>

      <h1 style={{
        margin: 0, fontFamily: fonts.display, fontWeight: 600,
        fontSize: 'clamp(56px, 7.5vw, 112px)', lineHeight: 0.92,
        letterSpacing: '-0.035em', color: 'var(--ink)',
      }}>
        {c.name}
        <span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{
        margin: '20px 0 0', maxWidth: 720,
        fontFamily: fonts.display, fontSize: 22, lineHeight: 1.3,
        letterSpacing: '-0.012em', color: 'var(--ink)',
      }}>
        <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>{c.tagline}</span>
      </p>

      {/* Meta grid */}
      <div style={{
        marginTop: 44,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 0,
        borderTop: '1px solid var(--line)',
      }}>
        {[
          ['Sector',   c.sector],
          ['Role',     c.role],
          ['Duration', c.duration],
          ['Stack',    c.stack],
          ['Services', c.services.join(' · ')],
        ].map(([k, v], i) => (
          <div key={k} style={{
            padding: '20px 16px 20px 0',
            borderRight: i < 4 ? '1px solid var(--line)' : 'none',
            paddingLeft: i === 0 ? 0 : 20,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.08em',
              color: 'var(--muted)', textTransform: 'uppercase',
            }}>{k}</span>
            <span style={{
              fontFamily: fonts.display, fontSize: 15, fontWeight: 500,
              letterSpacing: '-0.005em', color: 'var(--ink)',
            }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Hero figure */}
      <div style={{ marginTop: 36 }}>
        <StripedFig tone={c.tone} label={`${c.name.toLowerCase()} · hero · 16:9`} aspect="16/9" id={`hero-${c.id}`}/>
      </div>
    </header>
  );
}

// ─── Section: Sectional eyebrow + title ─────────────────────────────────────
function CSSectionHead({ n, label, title, ital, lede, fonts }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 40 }}>
      <div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
          letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14,
        }}>({n}) {label}</div>
      </div>
      <div>
        <h2 style={{
          margin: 0, fontFamily: fonts.display, fontWeight: 600,
          fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 0.98, letterSpacing: '-0.025em',
        }}>
          {title}{' '}
          {ital && <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>{ital}</span>}
        </h2>
        {lede && (
          <p style={{
            margin: '22px 0 0', maxWidth: 640,
            color: 'var(--muted)', fontSize: 17, lineHeight: 1.55,
          }}>{lede}</p>
        )}
      </div>
    </div>
  );
}

// ─── Section: Problem ───────────────────────────────────────────────────────
function CSProblem({ c, fonts }) {
  return (
    <section style={{ padding: '88px 56px', borderBottom: '1px solid var(--line)' }}>
      <CSSectionHead n="01" label="The problem" title="What was leaking" ital="money." fonts={fonts}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
        <p style={{
          margin: 0, fontFamily: fonts.display, fontSize: 22, lineHeight: 1.3,
          letterSpacing: '-0.012em', color: 'var(--ink)',
        }}>{c.problem.lede}</p>
        <div>
          <p style={{
            margin: 0, color: 'var(--muted)',
            fontSize: 17, lineHeight: 1.6,
          }}>{c.problem.detail}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }}>
            {c.problem.pains.map((p, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 18,
                padding: '18px 0', borderTop: '1px solid var(--line)',
                ...(i === c.problem.pains.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}),
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)',
                  letterSpacing: '0.06em', minWidth: 28, paddingTop: 4,
                }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{
                  fontFamily: fonts.display, fontSize: 18, lineHeight: 1.45,
                  letterSpacing: '-0.008em', color: 'var(--ink)', flex: 1,
                }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Approach ──────────────────────────────────────────────────────
function CSApproach({ c, fonts }) {
  return (
    <section style={{ padding: '88px 56px', borderBottom: '1px solid var(--line)' }}>
      <CSSectionHead n="02" label="The approach" title="How I" ital="thought about it." lede={c.approach.lede} fonts={fonts}/>

      {/* Insight callout */}
      <div style={{
        margin: '0 0 48px',
        padding: '28px 32px', borderRadius: 22,
        background: 'var(--primary)', color: 'var(--paper)',
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
          color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>{c.approach.insight.label} →</span>
        <p style={{
          margin: 0, fontFamily: fonts.display, fontSize: 26, lineHeight: 1.25,
          letterSpacing: '-0.018em', color: 'var(--paper)',
        }}>
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>"</span>
          {c.approach.insight.body}
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>"</span>
        </p>
      </div>

      {/* Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
        {c.approach.steps.map((s, i) => (
          <div key={s.n} style={{
            padding: '28px 24px 28px 0',
            borderTop: '1px solid var(--line)',
            paddingLeft: i === 0 ? 0 : 20,
            borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
            minHeight: 220, position: 'relative',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 22,
            }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                color: 'var(--muted)',
              }}>{s.n}</span>
              {i < c.approach.steps.length - 1 && <CSArrowRight size={13} color="var(--muted)"/>}
            </div>
            <h3 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 500,
              fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>{s.t}</h3>
            <p style={{
              margin: '12px 0 0', color: 'var(--muted)',
              fontSize: 14.5, lineHeight: 1.5, maxWidth: 240,
            }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Solution ──────────────────────────────────────────────────────
function CSSolution({ c, fonts }) {
  return (
    <section style={{ padding: '88px 56px', borderBottom: '1px solid var(--line)' }}>
      <CSSectionHead n="03" label="The solution" title="What we" ital="shipped." fonts={fonts}/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 18,
          }}>Deliverables</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {c.solution.shipped.map((s, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '14px 0', borderTop: '1px solid var(--line)',
                ...(i === c.solution.shipped.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}),
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 999, marginTop: 3, flexShrink: 0,
                  border: '1px solid var(--accent)', background: 'rgba(255,94,0,0.12)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6.5 5 9.5 10 3.5" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span style={{
                  fontFamily: 'var(--display)', fontSize: 15.5, lineHeight: 1.45,
                  color: 'var(--ink)',
                }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {c.solution.figures.map((f, i) => (
            <StripedFig key={i} tone={c.tone} label={f.label} aspect={f.aspect} id={`sol-${c.id}-${i}`}/>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Result ────────────────────────────────────────────────────────
function CSResult({ c, fonts }) {
  return (
    <section style={{ padding: '88px 56px', background: 'var(--primary)', color: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 56 }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(249,254,253,0.55)', marginBottom: 14,
          }}>(04) The result</div>
        </div>
        <h2 style={{
          margin: 0, fontFamily: fonts.display, fontWeight: 500,
          fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 0.98,
          letterSpacing: '-0.025em', color: 'var(--paper)',
        }}>
          {c.result.lede}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
        {c.result.stats.map((s, i) => (
          <div key={i} style={{
            padding: '32px 24px 32px 0',
            borderTop: '1px solid rgba(249,254,253,0.18)',
            paddingLeft: i === 0 ? 0 : 24,
            borderLeft: i > 0 ? '1px solid rgba(249,254,253,0.10)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 500,
              fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: 1,
              letterSpacing: '-0.03em', color: 'var(--accent)',
            }}>{s.v}</div>
            <div style={{
              fontFamily: fonts.display, fontSize: 16, fontWeight: 500,
              color: 'var(--paper)', letterSpacing: '-0.005em',
            }}>{s.l}</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.08em',
              color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase',
            }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div style={{
        marginTop: 64, padding: '36px 40px', borderRadius: 24,
        background: 'rgba(249,254,253,0.05)',
        border: '1px solid rgba(249,254,253,0.10)',
        display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{
            fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400,
            fontSize: 80, lineHeight: 0.8, color: 'var(--accent)',
          }}>"</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 500, color: 'var(--paper)' }}>
              {c.result.quote.who}
            </span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
              color: 'rgba(249,254,253,0.55)', textTransform: 'uppercase',
            }}>{c.result.quote.role}</span>
          </div>
        </div>
        <p style={{
          margin: 0, fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400,
          fontSize: 28, lineHeight: 1.3, letterSpacing: '-0.012em',
          color: 'var(--paper)',
        }}>{c.result.quote.body}</p>
      </div>
    </section>
  );
}

// ─── Section: CTA + Next case ───────────────────────────────────────────────
function CSCta({ c, fonts, onOpen }) {
  const nextIdx = (CASES.findIndex(x => x.id === c.id) + 1) % CASES.length;
  const next = CASES[nextIdx];
  return (
    <section style={{ padding: '88px 56px 56px', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'stretch' }}>
        {/* Hire-me block */}
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 18,
          }}>(05) Have a project like this?</div>
          <h2 style={{
            margin: 0, fontFamily: fonts.display, fontWeight: 600,
            fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.94, letterSpacing: '-0.03em',
          }}>
            Let's{' '}
            <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>ship</span>{' '}
            something like it.
          </h2>
          <p style={{
            margin: '20px 0 28px', maxWidth: 560,
            color: 'var(--muted)', fontSize: 17, lineHeight: 1.55,
          }}>
            One slot opens in June. Tell me what you're trying to move and I'll tell you if I can help — usually within a day.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="https://x.com/kicksnare" target="_blank" rel="noopener" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: 'var(--primary)', color: 'var(--paper)', textDecoration: 'none',
              fontFamily: fonts.display, fontWeight: 500, fontSize: 16,
              padding: '14px 20px 14px 22px', borderRadius: 999,
            }}>
              DM @kicksnare on X
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 26, height: 26, borderRadius: 999, background: 'var(--accent)', color: '#06372d',
              }}><CSArrowDiag size={13}/></span>
            </a>
            <a href="mailto:hi@kicksnare.studio" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: fonts.display, fontWeight: 500, fontSize: 15,
              padding: '14px 4px', textDecoration: 'none', color: 'var(--ink)',
              borderBottom: '1px solid rgba(6,55,45,0.25)',
            }}>hi@kicksnare.studio</a>
          </div>
        </div>

        {/* Next case card */}
        <button onClick={() => onOpen(next.id)} style={{
          appearance: 'none', border: 0, padding: 0, cursor: 'pointer',
          textAlign: 'left', background: 'transparent', color: 'inherit',
          display: 'block', width: '100%',
        }}>
          <div className="cs-next" style={{
            position: 'relative', height: '100%', borderRadius: 22, overflow: 'hidden',
            background: next.tone, border: '1px solid rgba(6,55,45,0.05)',
            padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            transition: 'transform .35s cubic-bezier(.2,.7,.2,1)',
            minHeight: 360,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
              color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase',
            }}>
              <span>Next case study →</span>
              <span>{String(nextIdx + 1).padStart(2, '0')} / {String(CASES.length).padStart(2, '0')}</span>
            </div>
            <div>
              <h3 style={{
                margin: 0, fontFamily: fonts.display, fontWeight: 600,
                fontSize: 56, lineHeight: 0.96, letterSpacing: '-0.03em',
              }}>{next.name}</h3>
              <p style={{
                margin: '14px 0 0', maxWidth: 360,
                fontFamily: fonts.display, fontSize: 16, color: 'var(--muted)', lineHeight: 1.4,
              }}>
                <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>{next.tagline}</span>
              </p>
              <div style={{
                marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: fonts.display, fontSize: 14, fontWeight: 500,
              }}>
                Read case <CSArrowDiag size={12}/>
              </div>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

// ─── Modal shell ────────────────────────────────────────────────────────────
function CaseStudyModal({ caseId, onClose, onOpen, fonts }) {
  const scrollRef = React.useRef(null);
  const [scrollPct, setScrollPct] = React.useState(0);
  const cIdx = Math.max(0, CASES.findIndex(c => c.id === caseId));
  const c = CASES[cIdx];

  // Lock body scroll, ESC to close, arrow keys to navigate
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onOpen(CASES[(cIdx + 1) % CASES.length].id);
      if (e.key === 'ArrowLeft')  onOpen(CASES[(cIdx - 1 + CASES.length) % CASES.length].id);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [cIdx, onClose, onOpen]);

  // Reset scroll when switching cases + track progress for top bar
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [caseId]);
  const onScroll = (e) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setScrollPct(max > 0 ? el.scrollTop / max : 0);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={`Case study: ${c.name}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(6,55,45,0.55)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        animation: 'cs-fade .25s ease',
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>

      <div style={{
        position: 'absolute', top: 24, right: 24, bottom: 24, left: 24,
        background: 'var(--paper)', color: 'var(--ink)',
        borderRadius: 28, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        animation: 'cs-rise .35s cubic-bezier(.2,.7,.2,1)',
      }}>

        {/* Sticky chrome */}
        <div style={{
          position: 'relative', flexShrink: 0,
          padding: '16px 24px 16px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)',
          background: 'rgba(249,254,253,0.85)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.10em',
              color: 'var(--muted)', textTransform: 'uppercase',
            }}>Case · {String(cIdx + 1).padStart(2, '0')} / {String(CASES.length).padStart(2, '0')}</span>
            <span style={{
              fontFamily: fonts.display, fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em',
            }}>{c.name}<span style={{ color: 'var(--accent)' }}>.</span></span>
            <span style={{
              fontFamily: fonts.display, fontSize: 14, color: 'var(--muted)',
            }}>—</span>
            <span style={{
              fontFamily: fonts.display, fontSize: 14, color: 'var(--muted)',
              maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{c.tagline}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* prev */}
            <button aria-label="Previous case" onClick={() => onOpen(CASES[(cIdx - 1 + CASES.length) % CASES.length].id)} style={navBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button aria-label="Next case" onClick={() => onOpen(CASES[(cIdx + 1) % CASES.length].id)} style={navBtn}>
              <CSArrowRight size={14}/>
            </button>
            <span style={{ width: 1, height: 22, background: 'var(--line)', margin: '0 4px' }}/>
            <button aria-label="Close" onClick={onClose} style={{
              ...navBtn, background: 'var(--primary)', color: 'var(--paper)', border: '1px solid var(--ink)',
            }}>
              <CSClose size={13}/>
            </button>
          </div>
          {/* scroll progress */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: -1, height: 2,
            background: 'transparent',
          }}>
            <div style={{
              height: '100%', width: `${scrollPct * 100}%`,
              background: 'var(--accent)',
              transition: 'width .08s linear',
            }}/>
          </div>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} onScroll={onScroll} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <CSHeader c={c} fonts={fonts} index={cIdx} total={CASES.length}/>
          <CSProblem c={c} fonts={fonts}/>
          <CSApproach c={c} fonts={fonts}/>
          <CSSolution c={c} fonts={fonts}/>
          <CSResult c={c} fonts={fonts}/>
          <CSCta c={c} fonts={fonts} onOpen={onOpen}/>
        </div>
      </div>

      <style>{`
        @keyframes cs-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cs-rise { from { opacity: 0; transform: translateY(20px) scale(.99) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .cs-next:hover { transform: translateY(-4px); }
      `}</style>
    </div>
  );
}

const navBtn = {
  appearance: 'none', cursor: 'pointer',
  width: 34, height: 34, borderRadius: 999,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: '#fff', border: '1px solid rgba(6,55,45,0.12)',
  color: 'var(--ink)',
};

Object.assign(window, { CaseStudyModal, CASES });
