/* portfolio-app.jsx — Kicksnare, mobile-first editorial single-page portfolio */

// ─── Soundwave mark ─────────────────────────────────────────────────────────
// 5 bars in a kick → decay → snare → decay → tail rhythm.
// Two accent-orange "hit" bars anchor the cadence; three currentColor bars decay.
function Soundwave({ size = 18, label = 'kicksnare' }) {
  const w = (size * 32) / 20;
  return (
    <svg className="sw" width={w} height={size} viewBox="0 0 32 20" role="img" aria-label={label}>
      <rect x="0"  y="0" width="4" height="20" rx="2" fill="var(--accent)"/>
      <rect x="7"  y="4" width="4" height="12" rx="2" fill="currentColor"/>
      <rect x="14" y="2" width="4" height="16" rx="2" fill="var(--accent)"/>
      <rect x="21" y="6" width="4" height="8"  rx="2" fill="currentColor"/>
      <rect x="28" y="8" width="4" height="4"  rx="2" fill="currentColor"/>
    </svg>
  );
}

// ─── Type pairing presets ───────────────────────────────────────────────────
const PAIRS = {
  'geist-instrument': { display: "'Geist', system-ui, sans-serif", serif: "'Instrument Serif', serif", label: 'Geist · Instrument' },
  'bricolage-newsreader': { display: "'Bricolage Grotesque', system-ui, sans-serif", serif: "'Newsreader', serif", label: 'Bricolage · Newsreader' },
  'space-crimson': { display: "'Space Grotesk', system-ui, sans-serif", serif: "'Crimson Pro', serif", label: 'Space Grotesk · Crimson' },
};

// ─── Reveal: fade + lift on scroll ──────────────────────────────────────────
function Reveal({ children, delay = 0, y = 18, root, as: As = 'div', style = {}, ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setShown(true); });
    }, { root: root?.current ?? null, threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [root]);
  return (
    <As ref={ref} {...rest} style={{
      ...style,
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</As>
  );
}

// ─── Arrow primitives ───────────────────────────────────────────────────────
const ArrowRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowDiag = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Plus = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1v10M1 6h10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Topbar (sticky inside the phone) ───────────────────────────────────────
function TopBar({ scrollY }) {
  const compact = scrollY > 80;
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 20,
      backdropFilter: 'blur(18px) saturate(160%)',
      WebkitBackdropFilter: 'blur(18px) saturate(160%)',
      background: compact ? 'rgba(249,254,253,0.78)' : 'rgba(249,254,253,0)',
      borderBottom: compact ? '1px solid rgba(6,55,45,0.07)' : '1px solid transparent',
      transition: 'background .25s ease, border-color .25s ease',
      padding: '62px 20px 14px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <Soundwave size={18}/>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>
          kicksnare
        </span>
      </div>
      <a href="#contact" style={{
        textDecoration: 'none', color: 'var(--ink)',
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--display)', fontSize: 13, fontWeight: 500,
        padding: '8px 14px 8px 16px', borderRadius: 999,
        border: '1px solid rgba(6,55,45,0.14)',
        background: '#fff',
      }}>Get in touch <ArrowRight size={13}/></a>
    </div>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero({ layout, fonts }) {
  // Three variants — all editorial, big sans display + italic serif emphasis.
  // Headline: "I help businesses get more customers online."
  // We treat "more customers" as the italic-serif accent in all variants.

  const HL = ({ size = 56 }) => (
    <h1 style={{
      margin: 0,
      fontFamily: fonts.display, fontWeight: 600,
      fontSize: size, lineHeight: 0.94, letterSpacing: '-0.025em',
      color: 'var(--ink)', textWrap: 'pretty',
    }}>
      I help businesses get{' '}
      <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.01em' }}>
        more customers
      </span>{' '}
      online.
    </h1>
  );

  const Eyebrow = () => (
    <Reveal>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--muted)',
      }}>
        <span style={{ width: 18, height: 1, background: 'currentColor' }}/>
        Hello — I'm Kicksnare
      </div>
    </Reveal>
  );

  const Sub = ({ width = '100%' }) => (
    <Reveal delay={260}>
      <p style={{
        margin: 0, maxWidth: width, color: 'var(--muted)',
        fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.005em',
      }}>
        A small team shipping <span style={{ color: 'var(--ink)', fontWeight: 500 }}>websites, funnels and growth experiments</span> that turn traffic into revenue. No retainers you can't cancel.
      </p>
    </Reveal>
  );

  const Ctas = () => (
    <Reveal delay={380}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <a href="#contact" className="cta-primary" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'var(--primary)', color: 'var(--paper)',
          textDecoration: 'none', fontFamily: fonts.display, fontWeight: 500, fontSize: 15,
          padding: '13px 18px 13px 20px', borderRadius: 999,
        }}>
          Let's talk
          <span className="cta-arr" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 22, height: 22, borderRadius: 999, background: 'var(--accent)', color: '#06372d',
            transition: 'transform .25s ease' }}>
            <ArrowRight size={12}/>
          </span>
        </a>
        <a href="#work" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', color: 'var(--ink)',
          fontFamily: fonts.display, fontWeight: 500, fontSize: 14,
          padding: '13px 4px', borderBottom: '1px solid rgba(6,55,45,0.25)',
        }}>See selected work</a>
      </div>
    </Reveal>
  );

  // SVG placeholder — striped, monospace explainer
  const ImagePlaceholder = ({ h = 220 }) => (
    <div style={{
      position: 'relative', width: '100%', height: h, borderRadius: 18,
      overflow: 'hidden', background: '#EAF3EE',
      border: '1px solid rgba(6,55,45,0.06)',
    }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(6,55,45,0.06)" strokeWidth="2"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#stripes)"/>
      </svg>
      <div style={{
        position: 'absolute', left: 14, bottom: 12,
        fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.06em',
        color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase',
      }}>portrait · 4:5</div>
    </div>
  );

  if (layout === 'centered') {
    return (
      <section style={{ padding: '36px 22px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <Eyebrow/>
        <Reveal delay={120}><HL size={50}/></Reveal>
        <Sub width={330}/>
        <Ctas/>
      </section>
    );
  }
  if (layout === 'split') {
    return (
      <section style={{ padding: '24px 20px 18px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Eyebrow/>
        <Reveal delay={100}><ImagePlaceholder h={200}/></Reveal>
        <Reveal delay={180}><HL size={48}/></Reveal>
        <Sub/>
        <Ctas/>
      </section>
    );
  }
  // default: left-aligned
  return (
    <section style={{ padding: '32px 20px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Eyebrow/>
      <Reveal delay={120}><HL size={54}/></Reveal>
      <Sub/>
      <Ctas/>
    </section>
  );
}

// ─── Marquee (availability strip) ───────────────────────────────────────────
function Marquee() {
  const items = ['Open for work · Jun 2026', '17 clients · 9 countries', 'Avg. 2.4× conversion lift', 'Reply within 24h', 'Remote · GMT'];
  const loop = [...items, ...items, ...items];
  return (
    <div style={{
      background: 'var(--primary)', color: 'var(--paper)',
      padding: '14px 0', overflow: 'hidden', position: 'relative',
      borderTop: '1px solid rgba(6,55,45,1)', borderBottom: '1px solid rgba(6,55,45,1)',
    }}>
      <div style={{
        display: 'flex', gap: 36, whiteSpace: 'nowrap',
        animation: 'marquee 22s linear infinite',
        fontFamily: 'var(--display)', fontWeight: 500, fontSize: 13, letterSpacing: '-0.005em',
      }}>
        {loop.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 36 }}>
            {t}
            <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--accent)' }}/>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Problem ─────────────────────────────────────────────────────────────────
function Problem({ fonts }) {
  const pains = [
    'a site that looks good but doesn\'t convert',
    'ads burning cash with no clear ROAS',
    'analytics you can\'t actually read',
    'a funnel that leaks at every step',
  ];
  return (
    <section style={{ padding: '64px 20px 32px', background: 'var(--paper)', color: 'var(--ink)' }}>
      <Reveal>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em',
          color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 18,
        }}>(01) The problem</div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{
          margin: 0, fontFamily: fonts.display, fontWeight: 600,
          fontSize: 40, lineHeight: 0.98, letterSpacing: '-0.025em',
        }}>
          You're probably losing money to{' '}
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>one of these.</span>
        </h2>
      </Reveal>
      <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column' }}>
        {pains.map((p, i) => (
          <Reveal key={i} delay={i * 90} as="li" style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: '16px 0', borderTop: '1px solid var(--line)',
            ...(i === pains.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}),
          }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.04em',
              color: 'var(--muted)', minWidth: 24, paddingTop: 4,
            }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{
              fontFamily: fonts.display, fontSize: 19, lineHeight: 1.35, letterSpacing: '-0.01em',
              color: 'var(--ink)', flex: 1,
            }}>{p}</span>
            <span style={{ paddingTop: 6, color: 'var(--accent)' }}><Plus size={11}/></span>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={420}>
        <p style={{
          margin: '24px 0 0', color: 'var(--muted)',
          fontSize: 15, lineHeight: 1.55,
        }}>
          I rebuild the parts that matter — usually a homepage, a checkout, and an ad → page handoff — so you can <span style={{ color: 'var(--ink)' }}>see the lift in your dashboard</span>, not just in a deck.
        </p>
      </Reveal>
    </section>
  );
}

// ─── Work ────────────────────────────────────────────────────────────────────
function Work({ fonts }) {
  const cases = [
    {
      tag: 'Web design · Dev',
      name: 'Halocrate',
      blurb: 'B2B SaaS marketing site rebuild. Cut bounce on /pricing by 41%.',
      meta: '2025 · 6 wks',
      tone: '#FBE9B8',
      figure: 'product · 4:3',
    },
    {
      tag: 'Paid growth · UX',
      name: 'Northbeam DTC',
      blurb: 'Funnel teardown and Meta + Google rebuild. 3.1× ROAS in Q1.',
      meta: '2025 · ongoing',
      tone: '#D9E8E2',
      figure: 'dashboard · 16:10',
    },
    {
      tag: 'App design · SEO',
      name: 'Studio Mara',
      blurb: 'Booking app for a 14-location studio chain. Cut no-shows 26%.',
      meta: '2024 · 9 wks',
      tone: '#FCE0CC',
      figure: 'screens · 9:19',
    },
  ];
  return (
    <section id="work" style={{ padding: '64px 0 24px', background: 'var(--paper)', color: 'var(--ink)' }}>
      <div style={{ padding: '0 20px' }}>
        <Reveal>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: 22,
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em',
              color: 'var(--muted)', textTransform: 'uppercase' }}>(02) Selected work</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.04em',
              color: 'var(--muted)' }}>03 / 12</div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{
            margin: 0, fontFamily: fonts.display, fontWeight: 600,
            fontSize: 38, lineHeight: 0.98, letterSpacing: '-0.025em',
          }}>
            Three recent <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>shipped</span> things.
          </h2>
        </Reveal>
      </div>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' }}>
        {cases.map((c, i) => <WorkCard key={i} c={c} index={i} fonts={fonts}/>)}
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <Reveal>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            textDecoration: 'none', color: 'var(--ink)',
            fontFamily: fonts.display, fontSize: 14, fontWeight: 500,
            padding: '10px 0', borderBottom: '1px solid rgba(6,55,45,0.2)',
          }}>Full case studies on request <ArrowDiag size={12}/></a>
        </Reveal>
      </div>
    </section>
  );
}

function WorkCard({ c, index, fonts }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Reveal delay={index * 80}>
      <a href="#" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'block', textDecoration: 'none', color: 'inherit',
          padding: '20px', borderTop: '1px solid var(--line)',
          ...(index === 2 ? { borderBottom: '1px solid var(--line)' } : {}),
          position: 'relative', overflow: 'hidden',
          transition: 'background .3s ease',
          background: hover ? '#F4F2EB' : 'transparent',
        }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.06em',
          color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10,
        }}>
          <span>{c.tag}</span>
          <span>{c.meta}</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        }}>
          <h3 style={{
            margin: 0, fontFamily: fonts.display, fontWeight: 600,
            fontSize: 30, lineHeight: 1, letterSpacing: '-0.025em',
          }}>
            {c.name}
          </h3>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 38, height: 38, borderRadius: 999, background: hover ? 'var(--accent)' : '#fff',
            border: '1px solid rgba(6,55,45,0.12)',
            transform: hover ? 'translate(2px,-2px)' : 'translate(0,0)',
            transition: 'transform .3s cubic-bezier(.2,.7,.2,1), background .25s',
            flexShrink: 0,
          }}>
            <ArrowDiag size={14} color="#06372d"/>
          </span>
        </div>
        <p style={{
          margin: '10px 0 14px', maxWidth: 320,
          fontFamily: fonts.display, fontSize: 15, lineHeight: 1.45, color: 'var(--muted)',
        }}>{c.blurb}</p>

        {/* Thumb */}
        <div style={{
          position: 'relative', width: '100%', height: 150, borderRadius: 14, overflow: 'hidden',
          background: c.tone, border: '1px solid rgba(6,55,45,0.05)',
          transition: 'transform .6s cubic-bezier(.2,.7,.2,1)',
          transform: hover ? 'scale(1.015)' : 'scale(1)',
        }}>
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <pattern id={`stripes-w-${index}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(6,55,45,0.05)" strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#stripes-w-${index})`}/>
          </svg>
          <div style={{
            position: 'absolute', left: 12, bottom: 10,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
            color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase',
          }}>{c.figure}</div>
          {/* Index ticker top-right */}
          <div style={{
            position: 'absolute', right: 12, top: 10,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em',
            color: 'rgba(6,55,45,0.5)', textTransform: 'uppercase',
          }}>case {String(index + 1).padStart(2, '0')}</div>
        </div>
      </a>
    </Reveal>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About({ fonts }) {
  return (
    <section style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '72px 20px 56px' }}>
      <Reveal>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em',
          color: 'rgba(249,254,253,0.55)', textTransform: 'uppercase', marginBottom: 18,
        }}>(03) About</div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{
          margin: 0, fontFamily: fonts.display, fontWeight: 500,
          fontSize: 36, lineHeight: 1.04, letterSpacing: '-0.022em',
          color: 'var(--paper)',
        }}>
          A small team, with the <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>output</span> of a small agency.
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p style={{
          margin: '22px 0 0', maxWidth: 360,
          color: 'rgba(249,254,253,0.65)', fontSize: 15.5, lineHeight: 1.55,
        }}>
          Seven years across product design, growth and front-end. I take one project at a time, work directly with founders, and ship in weeks — not quarters. Past lives at three Y-Combinator startups and one Series-B SaaS.
        </p>
      </Reveal>

      {/* Stats */}
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
        {[
          { n: '2.4×', l: 'Avg conversion lift' },
          { n: '17', l: 'Shipped engagements' },
          { n: '$3.1M', l: 'Tracked client revenue' },
          { n: '7 yrs', l: 'Design + growth' },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{
              padding: '20px 4px', borderTop: '1px solid rgba(249,254,253,0.14)',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 500,
                fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em',
                color: 'var(--paper)',
              }}>{s.n}</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.06em',
                color: 'rgba(249,254,253,0.55)', textTransform: 'uppercase',
              }}>{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────
function Process({ fonts }) {
  const steps = [
    { t: 'Audit', d: 'Two days. I dig into your analytics, ads, and pages and write up where the money is leaking.' },
    { t: 'Plan', d: 'A one-page scope with what we ship, in what order, and the metric each thing is meant to move.' },
    { t: 'Ship', d: 'I work in 1-week sprints. You review on Friday. We push by Monday. No agency-style ghosting.' },
    { t: 'Measure', d: 'After 30 days we look at the dashboard together. If a thing didn\'t move the metric, we change it.' },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: '64px 20px', background: 'var(--paper)', color: 'var(--ink)' }}>
      <Reveal>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em',
          color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 18,
        }}>(04) How we work</div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{
          margin: 0, fontFamily: fonts.display, fontWeight: 600,
          fontSize: 38, lineHeight: 0.98, letterSpacing: '-0.025em',
        }}>
          Four steps. <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>No surprises.</span>
        </h2>
      </Reveal>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 70}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                textAlign: 'left', appearance: 'none', border: 0, background: 'transparent',
                width: '100%', cursor: 'pointer', padding: '18px 0',
                borderTop: '1px solid var(--line)',
                ...(i === steps.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}),
                color: 'inherit',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.04em',
                    color: 'var(--muted)', minWidth: 22,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{
                    fontFamily: fonts.display, fontSize: 24, fontWeight: 500,
                    letterSpacing: '-0.02em', flex: 1, color: 'var(--ink)',
                  }}>{s.t}</span>
                  <span style={{
                    width: 30, height: 30, borderRadius: 999,
                    border: '1px solid rgba(6,55,45,0.15)', background: '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform .3s cubic-bezier(.2,.7,.2,1)',
                  }}>
                    <Plus size={11}/>
                  </span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows .35s cubic-bezier(.2,.7,.2,1)',
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{
                      margin: '12px 0 4px 36px', maxWidth: 320,
                      fontFamily: fonts.display, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)',
                    }}>{s.d}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact({ fonts }) {
  return (
    <section id="contact" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '72px 20px 28px' }}>
      <Reveal>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em',
          color: 'rgba(249,254,253,0.55)', textTransform: 'uppercase', marginBottom: 22,
        }}>(05) Let's talk</div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{
          margin: 0, fontFamily: fonts.display, fontWeight: 500,
          fontSize: 54, lineHeight: 0.96, letterSpacing: '-0.03em', color: 'var(--paper)',
        }}>
          Got a thing you{' '}
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>need shipped?</span>
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p style={{
          margin: '20px 0 28px', maxWidth: 340,
          color: 'rgba(249,254,253,0.6)', fontSize: 15.5, lineHeight: 1.55,
        }}>
          DMs are open on X. I read every one and reply within a day. Tell me what you're trying to move and I'll tell you if I can help.
        </p>
      </Reveal>

      <Reveal delay={260}>
        <a href="https://x.com/kic_kdrum" target="_blank" rel="noopener" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          textDecoration: 'none', color: 'var(--paper)',
          padding: '18px 18px 18px 22px', borderRadius: 18,
          background: 'rgba(249,254,253,0.05)',
          border: '1px solid rgba(249,254,253,0.12)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.12em',
              color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase' }}>Primary</span>
            <span style={{ fontFamily: fonts.display, fontSize: 21, fontWeight: 500, letterSpacing: '-0.015em' }}>
              @kicksnare
            </span>
          </div>
          <span style={{
            width: 44, height: 44, borderRadius: 999, background: 'var(--accent)', color: '#06372d',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><ArrowDiag size={16}/></span>
        </a>
      </Reveal>

      {/* Secondary row */}
      <Reveal delay={340}>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <a href="https://x.com/kic_kdrum" style={infoCardStyle}>
            <span style={infoLab}>Reply time</span>
            <span style={infoVal}>&lt; 24 hours</span>
          </a>
          <a href="#" style={infoCardStyle}>
            <span style={infoLab}>Next slot</span>
            <span style={infoVal}>Jun · 2 open</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
const infoCardStyle = {
  textDecoration: 'none', color: 'inherit',
  padding: '14px 14px', borderRadius: 14,
  background: 'rgba(249,254,253,0.05)', border: '1px solid rgba(249,254,253,0.10)',
  display: 'flex', flexDirection: 'column', gap: 6,
};
const infoLab = {
  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.10em',
  color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase',
};
const infoVal = {
  fontFamily: 'var(--display)', fontSize: 15, fontWeight: 500, letterSpacing: '-0.005em',
  color: 'var(--paper)',
};

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ fonts }) {
  return (
    <footer style={{
      background: 'var(--primary)', color: 'rgba(249,254,253,0.5)',
      padding: '36px 20px 56px', borderTop: '1px solid rgba(249,254,253,0.10)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.08em',
        textTransform: 'uppercase', marginBottom: 22,
      }}>
        <span>© 2026 — Kicksnare</span>
        <span>v2.6</span>
      </div>
      <div style={{
        fontFamily: fonts.display, fontSize: 56, fontWeight: 500,
        lineHeight: 0.95, letterSpacing: '-0.035em', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', gap: '0.2em',
      }}>
        <svg className="sw" viewBox="0 0 32 20" role="img" aria-label="kicksnare"
          style={{ height: '0.7em', width: 'auto', flexShrink: 0 }}>
          <rect x="0"  y="0" width="4" height="20" rx="2" fill="var(--accent)"/>
          <rect x="7"  y="4" width="4" height="12" rx="2" fill="currentColor"/>
          <rect x="14" y="2" width="4" height="16" rx="2" fill="var(--accent)"/>
          <rect x="21" y="6" width="4" height="8"  rx="2" fill="currentColor"/>
          <rect x="28" y="8" width="4" height="4"  rx="2" fill="currentColor"/>
        </svg>
        <span>kicksnare</span>
      </div>
      <div style={{
        marginTop: 14, fontFamily: fonts.display, fontSize: 13, color: 'rgba(249,254,253,0.45)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>X / Twitter ↗</a>
        <a href="mailto:hi@kicksnare.studio" style={{ color: 'inherit', textDecoration: 'none' }}>hi@kicksnare.studio</a>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const pair = PAIRS[t.typePair] || PAIRS['geist-instrument'];
  const fonts = { display: pair.display, serif: pair.serif };
  const scrollRef = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);

  // The IOSDevice's children land inside a flex column where the SECOND child
  // (after the optional NavBar) is the scrollable area. We mount our content
  // and attach scroll listener via a ref to a wrapper inside it.
  React.useEffect(() => {
    const el = scrollRef.current?.parentElement;
    if (!el) return;
    const on = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(255,94,0,0.18); }
          50% { box-shadow: 0 0 0 7px rgba(255,94,0,0.06); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .cta-primary:hover .cta-arr { transform: translateX(2px); }
        body, html { overscroll-behavior: none; }
      `}</style>

      <IOSDevice width={402} height={874}>
        <div ref={scrollRef} style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100%', fontFamily: fonts.display }}>
          <TopBar scrollY={scrollY}/>
          <Hero layout={t.heroLayout} fonts={fonts}/>
          <Marquee/>
          <Problem fonts={fonts}/>
          <Work fonts={fonts}/>
          <About fonts={fonts}/>
          <Process fonts={fonts}/>
          <Contact fonts={fonts}/>
          <Footer fonts={fonts}/>
          <div style={{ height: 40 }}/>
        </div>
      </IOSDevice>

      <TweaksPanel>
        <TweakSection label="Hero layout">
          <TweakRadio
            label="Composition"
            value={t.heroLayout}
            options={[
              { value: 'left', label: 'Left' },
              { value: 'centered', label: 'Center' },
              { value: 'split', label: 'Split' },
            ]}
            onChange={(v) => setTweak('heroLayout', v)}
          />
        </TweakSection>
        <TweakSection label="Typography">
          <TweakSelect
            label="Pairing"
            value={t.typePair}
            options={Object.entries(PAIRS).map(([v, p]) => ({ value: v, label: p.label }))}
            onChange={(v) => setTweak('typePair', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('phone-mount'));
root.render(<App/>);
