/* portfolio-desktop-app.jsx — Kicksnare, desktop editorial single-page */

const PAIRS = {
  'geist-instrument':     { display: "'Geist', system-ui, sans-serif",              serif: "'Instrument Serif', serif", label: 'Geist · Instrument' },
  'bricolage-newsreader': { display: "'Bricolage Grotesque', system-ui, sans-serif", serif: "'Newsreader', serif",       label: 'Bricolage · Newsreader' },
  'space-crimson':        { display: "'Space Grotesk', system-ui, sans-serif",      serif: "'Crimson Pro', serif",      label: 'Space Grotesk · Crimson' },
};

// ─── Reveal ─────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 20, as: As = 'div', style = {}, ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setShown(true); }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <As ref={ref} {...rest} style={{
      ...style,
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 1s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</As>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────
// Soundwave mark — 5 bars in a kick → decay → snare → decay → tail rhythm.
// Two accent-orange "hit" bars anchor the cadence; three currentColor bars decay.
function Soundwave({ size = 20, label = 'kicksnare' }) {
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

// ─── Header ─────────────────────────────────────────────────────────────────
function Header({ scrolled, fonts }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      background: scrolled ? 'rgba(249,254,253,0.82)' : 'rgba(249,254,253,0)',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'background .3s, border-color .3s',
    }}>
      <div className="wrap" style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '20px 56px', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Soundwave size={22}/>
          <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em' }}>
            kicksnare
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginLeft: 4 }}>
            digital
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>
          <a className="navlink" href="#work">Work</a>
          <a className="navlink" href="#about">About</a>
          <a className="navlink" href="#process">Process</a>
          <a className="navlink" href="#contact">Contact</a>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Open · 2 slots Jun</span>
          <a href="#contact" className="cta-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'var(--primary)', color: 'var(--paper)', textDecoration: 'none',
            fontFamily: fonts.display, fontWeight: 500, fontSize: 14,
            padding: '11px 16px 11px 18px', borderRadius: 999,
          }}>
            Let's talk
            <span className="cta-arr" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, borderRadius: 999, background: 'var(--accent)', color: '#06372d',
              transition: 'transform .25s ease',
            }}><ArrowRight size={11}/></span>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero variants ──────────────────────────────────────────────────────────
function Hero({ layout, fonts, onOpenCase }) {
  const HL = ({ size }) => (
    <h1 style={{
      margin: 0, fontFamily: fonts.display, fontWeight: 600,
      fontSize: size, lineHeight: 0.92, letterSpacing: '-0.035em',
      color: 'var(--ink)', textWrap: 'pretty',
    }}>
      I help businesses get{' '}
      <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.015em' }}>
        more customers
      </span>{' '}
      online.
    </h1>
  );

  const Sub = ({ maxW = 520 }) => (
    <p style={{
      margin: 0, maxWidth: maxW, color: 'var(--muted)',
      fontSize: 18, lineHeight: 1.5, letterSpacing: '-0.005em',
    }}>
      A one-person studio shipping{' '}
      <span style={{ color: 'var(--ink)', fontWeight: 500 }}>websites, funnels and growth experiments</span>{' '}
      that turn traffic into revenue. No retainers you can't cancel.
    </p>
  );

  const Ctas = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
      <a href="#contact" className="cta-primary" style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        background: 'var(--primary)', color: 'var(--paper)', textDecoration: 'none',
        fontFamily: fonts.display, fontWeight: 500, fontSize: 16,
        padding: '16px 22px 16px 24px', borderRadius: 999,
      }}>
        Let's talk
        <span className="cta-arr" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 26, height: 26, borderRadius: 999, background: 'var(--accent)', color: '#06372d',
          transition: 'transform .25s ease',
        }}><ArrowRight size={13}/></span>
      </a>
      <a href="#work" className="link-uline" style={{
        textDecoration: 'none', color: 'var(--ink)',
        fontFamily: fonts.display, fontSize: 15, fontWeight: 500,
      }}>See selected work</a>
    </div>
  );

  // SVG striped placeholder
  const Placeholder = ({ h = 460, label = 'hero · 4:3' }) => (
    <div style={{
      position: 'relative', width: '100%', height: h, borderRadius: 28, overflow: 'hidden',
      background: '#EAF3EE', border: '1px solid rgba(6,55,45,0.06)',
    }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern id="hero-stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(6,55,45,0.06)" strokeWidth="2"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#hero-stripes)"/>
      </svg>
      <div style={{
        position: 'absolute', left: 22, bottom: 18,
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
        color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );

  // Project list (Vishnu-style) — first 3 open the case study modal
  const projects = [
    { id: 'halocrate', name: 'Halocrate',     meta: 'B2B SaaS · 2025' },
    { id: 'northbeam', name: 'Northbeam DTC', meta: 'Paid growth · 2025' },
    { id: 'mara',      name: 'Studio Mara',   meta: 'Booking app · 2024' },
    { id: null,        name: 'Lattice OS',    meta: 'Web design · 2024' },
    { id: null,        name: 'Vela Mobility', meta: 'Brand + site · 2024' },
  ];

  const ProjectList = () => (
    <div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 18,
      }}>Selected projects</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {projects.map((p, i) => (
          <li key={i}>
            <a href={p.id ? '#' : '#work'}
              onClick={p.id ? (e) => { e.preventDefault(); onOpenCase?.(p.id); } : undefined}
              className="proj-row" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 0', borderTop: '1px solid var(--line)',
                ...(i === projects.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}),
                fontFamily: fonts.display, color: 'var(--ink)', textDecoration: 'none',
                fontSize: 19, fontWeight: 500, letterSpacing: '-0.015em',
                transition: 'padding .35s cubic-bezier(.2,.7,.2,1), color .25s',
                cursor: p.id ? 'pointer' : 'default',
              }}>
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 14 }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
                  letterSpacing: '0.06em',
                }}>{String(i + 1).padStart(2, '0')}</span>
                {p.name}
              </span>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                color: 'var(--muted)', textTransform: 'uppercase',
              }}>{p.meta} {p.id ? '→' : '·'}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  // LAYOUTS
  if (layout === 'centered') {
    return (
      <section className="wrap" style={{
        padding: '90px 56px 80px', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
      }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 24, height: 1, background: 'currentColor' }}/>
            Hello — I'm Kicksnare
            <span style={{ width: 24, height: 1, background: 'currentColor' }}/>
          </span>
        </Reveal>
        <Reveal delay={140}><HL size={140}/></Reveal>
        <Reveal delay={260}><Sub maxW={600}/></Reveal>
        <Reveal delay={380}><Ctas/></Reveal>
      </section>
    );
  }

  if (layout === 'split') {
    return (
      <section className="wrap" style={{ padding: '70px 56px 80px' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: 'currentColor' }}/>
            Hello — I'm Kicksnare
          </span>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 56, alignItems: 'center', marginTop: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <Reveal delay={120}><HL size={104}/></Reveal>
            <Reveal delay={240}><Sub/></Reveal>
            <Reveal delay={360}><Ctas/></Reveal>
          </div>
          <Reveal delay={120}><Placeholder h={520} label="portrait · 4:5"/></Reveal>
        </div>
      </section>
    );
  }

  // default: "left" — Vishnu-style split with project list on right
  return (
    <section className="wrap" style={{ padding: '70px 56px 100px' }}>
      <Reveal>
        <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 24, height: 1, background: 'currentColor' }}/>
          Hello — I'm Kicksnare
        </span>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'start', marginTop: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <Reveal delay={120}><HL size={128}/></Reveal>
          <Reveal delay={240}><Sub maxW={560}/></Reveal>
          <Reveal delay={360}><Ctas/></Reveal>
        </div>
        <div style={{ paddingTop: 40 }}>
          <Reveal delay={200}><ProjectList/></Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Open for work · Jun 2026', '17 clients · 9 countries', 'Avg. 2.4× conversion lift', 'Reply within 24h', 'Remote · GMT', 'Sprint or retainer'];
  const loop = [...items, ...items];
  return (
    <div style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '20px 0', overflow: 'hidden' }}>
      <div style={{
        display: 'flex', gap: 56, whiteSpace: 'nowrap',
        animation: 'marquee 28s linear infinite',
        fontFamily: 'var(--display)', fontWeight: 500, fontSize: 16, letterSpacing: '-0.005em',
      }}>
        {loop.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 56 }}>
            {t}
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}/>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Problem ────────────────────────────────────────────────────────────────
function Problem({ fonts }) {
  const pains = [
    { t: "A site that looks good but doesn't convert", n: 'Pages designed for awards, not for revenue.' },
    { t: 'Ads burning cash with no clear ROAS',         n: 'Spend climbing, attribution murky, no system.' },
    { t: "Analytics you can't actually read",          n: 'Dashboards full of vanity, useless for decisions.' },
    { t: 'A funnel that leaks at every step',          n: 'Visit → page → form → sale, all hemorrhaging.' },
  ];
  return (
    <section className="wrap" style={{ padding: '110px 56px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 24 }}>(01) The problem</div>
          <h2 style={{
            margin: 0, fontFamily: fonts.display, fontWeight: 600,
            fontSize: 64, lineHeight: 0.95, letterSpacing: '-0.03em',
          }}>
            You're losing money to{' '}
            <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>one of these.</span>
          </h2>
          <p style={{
            margin: '24px 0 0', maxWidth: 380,
            color: 'var(--muted)', fontSize: 16, lineHeight: 1.55,
          }}>
            I rebuild the parts that matter — usually a homepage, a checkout, and an ad → page handoff — so the lift shows up in your dashboard, not just in a deck.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                padding: '28px 24px 28px 0',
                borderTop: '1px solid var(--line)',
                borderBottom: i >= 2 ? '1px solid var(--line)' : 'none',
                paddingTop: 28, paddingRight: 24,
                minHeight: 200,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 18,
                }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
                    letterSpacing: '0.06em',
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ color: 'var(--accent)' }}><Plus size={12}/></span>
                </div>
                <h3 style={{
                  margin: 0, fontFamily: fonts.display, fontWeight: 500,
                  fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.015em',
                }}>{p.t}</h3>
                <p style={{
                  margin: '12px 0 0', color: 'var(--muted)',
                  fontSize: 15, lineHeight: 1.5,
                }}>{p.n}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Work ───────────────────────────────────────────────────────────────────
function Work({ fonts, onOpenCase }) {
  const cases = [
    { id: 'halocrate', tag: 'Web design · Dev',    name: 'Halocrate',     blurb: 'B2B SaaS marketing site rebuild. Cut bounce on /pricing by 41% and pushed demo bookings up 2.6×.', meta: '2025 · 6 wks',    tone: '#FBE9B8', figure: 'product · 4:3' },
    { id: 'northbeam', tag: 'Paid growth · UX',    name: 'Northbeam DTC', blurb: 'Funnel teardown and Meta + Google rebuild on a $1.2M/yr DTC account. 3.1× ROAS in Q1.',           meta: '2025 · ongoing', tone: '#D9E8E2', figure: 'dashboard · 16:10' },
    { id: 'mara',      tag: 'App design · SEO',    name: 'Studio Mara',   blurb: 'Booking app for a 14-location wellness chain. Cut no-shows 26% and added a programmatic SEO layer.', meta: '2024 · 9 wks', tone: '#FCE0CC', figure: 'screens · 9:19' },
  ];
  return (
    <section id="work" style={{ padding: '110px 0 80px' }}>
      <div className="wrap" style={{ padding: '0 56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 18 }}>(02) Selected work</div>
            <h2 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 600,
              fontSize: 72, lineHeight: 0.95, letterSpacing: '-0.03em',
            }}>
              Three recent{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>shipped</span>{' '}
              things.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <a href="#contact" className="link-uline" style={{
              textDecoration: 'none', color: 'var(--ink)',
              fontFamily: fonts.display, fontSize: 14, fontWeight: 500,
            }}>Full case studies on request →</a>
          </Reveal>
        </div>
      </div>

      <div className="wrap" style={{ padding: '0 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {cases.map((c, i) => <WorkCard key={i} c={c} index={i} fonts={fonts} onOpen={() => onOpenCase(c.id)}/>)}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ c, index, fonts, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const handleClick = (e) => { e.preventDefault(); onOpen?.(); };
  return (
    <Reveal delay={index * 100}>
      <a href="#" onClick={handleClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer',
      }}>
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '4 / 5', borderRadius: 22, overflow: 'hidden',
          background: c.tone, border: '1px solid rgba(6,55,45,0.05)',
          transition: 'transform .6s cubic-bezier(.2,.7,.2,1)',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        }}>
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100"
            style={{ transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)', transform: hover ? 'scale(1.06)' : 'scale(1)' }}>
            <defs>
              <pattern id={`work-stripes-${index}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(6,55,45,0.06)" strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#work-stripes-${index})`}/>
          </svg>
          <div style={{
            position: 'absolute', top: 18, left: 18, right: 18,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(6,55,45,0.55)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            <span>case {String(index + 1).padStart(2, '0')}</span>
            <span>{c.figure}</span>
          </div>
          <div style={{
            position: 'absolute', right: 18, bottom: 18,
            width: 52, height: 52, borderRadius: 999,
            background: hover ? 'var(--accent)' : 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(6,55,45,0.08)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            transform: hover ? 'translate(4px,-4px)' : 'translate(0,0)',
            transition: 'transform .35s cubic-bezier(.2,.7,.2,1), background .25s',
          }}>
            <ArrowDiag size={18}/>
          </div>
        </div>
        <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            <span>{c.tag}</span>
            <span>{c.meta}</span>
          </div>
          <h3 style={{
            margin: 0, fontFamily: fonts.display, fontWeight: 600,
            fontSize: 30, lineHeight: 1.02, letterSpacing: '-0.025em',
          }}>{c.name}</h3>
          <p style={{
            margin: 0, color: 'var(--muted)',
            fontSize: 15, lineHeight: 1.5,
          }}>{c.blurb}</p>
        </div>
      </a>
    </Reveal>
  );
}

// ─── About ──────────────────────────────────────────────────────────────────
function About({ fonts }) {
  return (
    <section id="about" style={{
      background: 'var(--primary)', color: 'var(--paper)',
      padding: '120px 0 100px',
      borderTop: '1px solid rgba(0,0,0,0)',
    }}>
      <div className="wrap" style={{ padding: '0 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)' }}>(03) About</div>
            <div style={{
              marginTop: 28, padding: '16px 18px', borderRadius: 16,
              background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.1)',
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
              color: 'rgba(249,254,253,0.65)', textTransform: 'uppercase',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>Based</span><span style={{ color: 'var(--paper)' }}>Remote · GMT</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>Reply</span><span style={{ color: 'var(--paper)' }}>&lt; 24h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>Next slot</span><span style={{ color: 'var(--accent)' }}>Jun · 2 open</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 500,
              fontSize: 80, lineHeight: 0.98, letterSpacing: '-0.03em',
              color: 'var(--paper)',
            }}>
              A studio of one, with the{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>output</span>{' '}
              of a small agency.
            </h2>
            <p style={{
              margin: '32px 0 0', maxWidth: 620,
              color: 'rgba(249,254,253,0.65)', fontSize: 18, lineHeight: 1.55,
            }}>
              Seven years across product design, growth and front-end. I take one project at a time, work directly with founders, and ship in weeks — not quarters. Past lives at three Y-Combinator startups and one Series-B SaaS.
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {[
            { n: '2.4×',  l: 'Avg conversion lift' },
            { n: '17',    l: 'Shipped engagements' },
            { n: '$3.1M', l: 'Tracked client revenue' },
            { n: '7 yrs', l: 'Design + growth' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                paddingTop: 28, borderTop: '1px solid rgba(249,254,253,0.18)',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 500,
                  fontSize: 64, lineHeight: 1, letterSpacing: '-0.025em',
                  color: 'var(--paper)',
                }}>{s.n}</div>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
                  color: 'rgba(249,254,253,0.55)', textTransform: 'uppercase',
                }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Services */}
        <div style={{ marginTop: 90 }}>
          <Reveal>
            <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)' }}>What I do</div>
          </Reveal>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              'Web design', 'Web development', 'Mobile app design',
              'Product / UX design', 'SEO & content', 'Paid ads & growth',
              'Data analysis', 'CRO experiments',
            ].map((s, i) => (
              <Reveal key={i} delay={i * 40}>
                <div style={{
                  padding: '24px 0', borderTop: '1px solid rgba(249,254,253,0.14)',
                  borderBottom: i >= 4 ? '1px solid rgba(249,254,253,0.14)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: fonts.display, fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em',
                  paddingRight: 24,
                }}>
                  <span>{s}</span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
                    color: 'rgba(249,254,253,0.4)',
                  }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ────────────────────────────────────────────────────────────────
function Process({ fonts }) {
  const steps = [
    { t: 'Audit',   d: 'Two days. I dig into your analytics, ads, and pages and write up exactly where the money is leaking.' },
    { t: 'Plan',    d: 'A one-page scope: what we ship, in what order, and the metric each thing is meant to move.' },
    { t: 'Ship',    d: 'I work in 1-week sprints. You review on Friday. We push by Monday. No agency-style ghosting.' },
    { t: 'Measure', d: 'After 30 days we look at the dashboard together. If a thing didn\'t move the metric, we change it.' },
  ];
  return (
    <section id="process" style={{ padding: '110px 0 80px' }}>
      <div className="wrap" style={{ padding: '0 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'end', marginBottom: 56 }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 18 }}>(04) How we work</div>
            <h2 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 600,
              fontSize: 80, lineHeight: 0.94, letterSpacing: '-0.03em',
            }}>
              Four steps.{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>No surprises.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{
              margin: 0, color: 'var(--muted)',
              fontSize: 18, lineHeight: 1.55, maxWidth: 460, justifySelf: 'end',
            }}>
              You'll know what's shipping, when, and what we're measuring before the engagement starts. If we hit the metric, great. If we don't, we change it.
            </p>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                padding: '32px 28px 32px 0',
                borderTop: '1px solid var(--line)',
                minHeight: 280,
                position: 'relative',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 28,
                }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                    color: 'var(--muted)',
                  }}>{String(i + 1).padStart(2, '0')} / 04</span>
                  {i < 3 && <ArrowRight size={14} color="var(--muted)"/>}
                </div>
                <h3 style={{
                  margin: 0, fontFamily: fonts.display, fontWeight: 500,
                  fontSize: 34, lineHeight: 1, letterSpacing: '-0.022em',
                }}>{s.t}</h3>
                <p style={{
                  margin: '16px 0 0', color: 'var(--muted)',
                  fontSize: 15, lineHeight: 1.5, maxWidth: 260,
                }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ────────────────────────────────────────────────────────────────
function Contact({ fonts }) {
  return (
    <section id="contact" style={{
      background: 'var(--primary)', color: 'var(--paper)',
      padding: '120px 0 60px',
    }}>
      <div className="wrap" style={{ padding: '0 56px' }}>
        <Reveal>
          <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)', marginBottom: 28 }}>(05) Let's talk</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 style={{
            margin: 0, fontFamily: fonts.display, fontWeight: 500,
            fontSize: 160, lineHeight: 0.92, letterSpacing: '-0.04em',
            color: 'var(--paper)', maxWidth: 1100,
          }}>
            Got a thing you{' '}
            <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>need shipped?</span>
          </h2>
        </Reveal>

        <div style={{
          marginTop: 56, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'stretch',
        }}>
          <Reveal delay={200}>
            <a href="https://x.com/kic_kdrum" target="_blank" rel="noopener" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              textDecoration: 'none', color: 'var(--paper)',
              padding: '36px 36px 36px 40px', borderRadius: 28,
              background: 'rgba(249,254,253,0.05)',
              border: '1px solid rgba(249,254,253,0.12)',
              transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)',
              minHeight: 200,
            }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,94,0,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(249,254,253,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
                  color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase' }}>Primary · DMs open</span>
                <span style={{ fontFamily: fonts.display, fontSize: 56, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>
                  @kicksnare
                </span>
                <span style={{ color: 'rgba(249,254,253,0.6)', fontSize: 15, marginTop: 4 }}>
                  Tell me what you're trying to move and I'll tell you if I can help.
                </span>
              </div>
              <span style={{
                width: 72, height: 72, borderRadius: 999, background: 'var(--accent)', color: '#06372d',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><ArrowDiag size={26}/></span>
            </a>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Reveal delay={280}>
              <div style={{
                padding: '24px 24px', borderRadius: 22,
                background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.10)',
                display: 'flex', flexDirection: 'column', gap: 8, flex: 1,
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em',
                  color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase',
                }}>Email</span>
                <span style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 500, color: 'var(--paper)' }}>
                  hi@kicksnare.studio
                </span>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div style={{
                padding: '24px 24px', borderRadius: 22,
                background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.10)',
                display: 'flex', flexDirection: 'column', gap: 8, flex: 1,
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em',
                  color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase',
                }}>Next slot</span>
                <span style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 500, color: 'var(--paper)' }}>
                  Jun · 2 open
                </span>
                <span style={{ color: 'rgba(249,254,253,0.5)', fontSize: 13 }}>
                  Sprint or retainer.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer({ fonts }) {
  return (
    <footer style={{
      background: 'var(--primary)', color: 'rgba(249,254,253,0.55)',
      borderTop: '1px solid rgba(249,254,253,0.10)',
      padding: '52px 0 56px',
    }}>
      <div className="wrap" style={{ padding: '0 56px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
          textTransform: 'uppercase', marginBottom: 36,
        }}>
          <span>© 2026 — Kicksnare</span>
          <span>v2.6 · May 26</span>
          <span>Made in Geist + Crimson</span>
        </div>
        <div style={{
          fontFamily: fonts.display, fontWeight: 500,
          fontSize: 'clamp(120px, 22vw, 320px)',
          lineHeight: 0.85, letterSpacing: '-0.045em', color: 'var(--paper)',
          display: 'flex', alignItems: 'center', gap: '0.18em',
        }}>
          <svg className="sw" viewBox="0 0 32 20" role="img" aria-label="kicksnare"
            style={{ height: '0.72em', width: 'auto', flexShrink: 0 }}>
            <rect x="0"  y="0" width="4" height="20" rx="2" fill="var(--accent)"/>
            <rect x="7"  y="4" width="4" height="12" rx="2" fill="currentColor"/>
            <rect x="14" y="2" width="4" height="16" rx="2" fill="var(--accent)"/>
            <rect x="21" y="6" width="4" height="8"  rx="2" fill="currentColor"/>
            <rect x="28" y="8" width="4" height="4"  rx="2" fill="currentColor"/>
          </svg>
          <span>kicksnare</span>
        </div>
        <div style={{
          marginTop: 28, display: 'flex', justifyContent: 'space-between',
          fontFamily: fonts.display, fontSize: 14,
        }}>
          <a className="link-uline" href="#" style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none' }}>X / Twitter ↗</a>
          <a className="link-uline" href="mailto:hi@kicksnare.studio" style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none' }}>hi@kicksnare.studio</a>
          <a className="link-uline" href="#work" style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none' }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const pair = PAIRS[t.typePair] || PAIRS['space-crimson'];
  const fonts = { display: pair.display, serif: pair.serif };
  const [scrolled, setScrolled] = React.useState(false);
  const [openCase, setOpenCase] = React.useState(null);

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Push CSS vars for fonts so utility classes pick up the pairing
  React.useEffect(() => {
    document.documentElement.style.setProperty('--display', fonts.display);
    document.documentElement.style.setProperty('--serif', fonts.serif);
  }, [fonts.display, fonts.serif]);

  return (
    <div style={{ fontFamily: fonts.display }}>
      <Header scrolled={scrolled} fonts={fonts}/>
      <Hero layout={t.heroLayout} fonts={fonts} onOpenCase={setOpenCase}/>
      <Marquee/>
      <Problem fonts={fonts}/>
      <Work fonts={fonts} onOpenCase={setOpenCase}/>
      <About fonts={fonts}/>
      <Process fonts={fonts}/>
      <Contact fonts={fonts}/>
      <Footer fonts={fonts}/>

      {openCase && (
        <CaseStudyModal
          caseId={openCase}
          fonts={fonts}
          onOpen={setOpenCase}
          onClose={() => setOpenCase(null)}
        />
      )}

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
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
