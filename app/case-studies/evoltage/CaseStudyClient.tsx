'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDiag, Check } from '@/components/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type FontSet, PAIRS } from '@/lib/fonts';
import Reveal from '@/components/Reveal';

// ─── EvoltageBeforeFig (Section 1 — hero viewport) ──────────────────────────
function EvoltageBeforeFig() {
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: '800 / 520',
      borderRadius: 28, overflow: 'hidden',
      background: 'var(--paper-2)', border: 'var(--border-hair)',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <pattern id="ev-hero-stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" style={{ stroke: 'var(--line)' }} strokeWidth="2" />
          </pattern>
          <filter id="ev-hero-shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="rgba(1,11,9,0.10)" />
          </filter>
          <clipPath id="ev-hero-clip">
            <rect x="80" y="98" width="640" height="342" rx="0" />
          </clipPath>
        </defs>

        <rect width="800" height="520" fill="url(#ev-hero-stripes)" />

        {/* Browser card shell */}
        <rect x="80" y="60" width="640" height="380" rx="12" fill="white" filter="url(#ev-hero-shadow)" />
        <rect x="80" y="60" width="640" height="38" rx="12" fill="#F2F2F2" />
        <rect x="80" y="80" width="640" height="18" fill="#F2F2F2" />

        {/* Browser dots */}
        <circle cx="100" cy="76" r="5" fill="#FF5F56" />
        <circle cx="116" cy="76" r="5" fill="#FFBD2E" />
        <circle cx="132" cy="76" r="5" fill="#27C93F" />

        {/* Real screenshot clipped to browser content area */}
        <image
          href="/images/evoltage-hero-old.png"
          x="80" y="98" width="640" height="342"
          preserveAspectRatio="xMidYMin slice"
          clipPath="url(#ev-hero-clip)"
        />

        {/* Annotation 1 — No hook (over "Evoltage UK" headline + subtitle) */}
        <rect x="210" y="310" width="380" height="80" rx="4" fill="rgba(255,94,0,0.12)" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeDasharray="5 3" />
        <rect x="342" y="277" width="116" height="30" rx="6" style={{ fill: 'var(--ink)' }} />
        <polygon points="400,310 394,307 406,307" style={{ fill: 'var(--ink)' }} />
        <text x="400" y="296" textAnchor="middle" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="9.5" fontWeight="500" style={{ fill: 'var(--paper)' }} letterSpacing="0.04em">No hook</text>

        {/* Fold line — bottom of browser viewport */}
        <line x1="80" y1="440" x2="720" y2="440" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
        <text x="724" y="443" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="8" fontWeight="500" style={{ fill: 'var(--accent)' }} opacity="0.7" letterSpacing="0.04em">↑ fold</text>

        {/* Annotation 2 — Weak CTA cut off at fold */}
        <rect x="290" y="410" width="220" height="36" rx="4" fill="rgba(255,94,0,0.12)" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeDasharray="5 3" />
        <rect x="180" y="408" width="100" height="30" rx="6" style={{ fill: 'var(--ink)' }} />
        <polygon points="280,420 290,414 290,426" style={{ fill: 'var(--ink)' }} />
        <text x="230" y="427" textAnchor="middle" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="9.5" fontWeight="500" style={{ fill: 'var(--paper)' }} letterSpacing="0.04em">Weak CTA</text>

        {/* Annotation 3 — Phone buried (tiny number in top-right bar) */}
        <rect x="440" y="98" width="280" height="24" rx="4" fill="rgba(255,94,0,0.12)" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeDasharray="5 3" />
        <rect x="480" y="126" width="130" height="30" rx="6" style={{ fill: 'var(--ink)' }} />
        <polygon points="545,126 539,122 551,122" style={{ fill: 'var(--ink)' }} />
        <text x="545" y="145" textAnchor="middle" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="9.5" fontWeight="500" style={{ fill: 'var(--paper)' }} letterSpacing="0.04em">Phone buried</text>
      </svg>
    </div>
  );
}

// ─── PhoneMockup — iPhone-style device frame ───────────────────────────────
function PhoneMockup({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Before/After label */}
      <div style={{
        position: 'absolute', top: -8, left: 8, zIndex: 2,
        fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--muted)',
        background: 'var(--paper)', padding: '4px 8px', borderRadius: 4,
      }}>{label}</div>

      {/* Device bezel */}
      <div style={{
        position: 'relative', width: '100%',
        background: '#1a1a1a', borderRadius: 32, padding: 8,
        boxShadow: '0 8px 30px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 72, height: 20, borderRadius: 12,
          background: '#000', zIndex: 2,
        }} />

        {/* Screen */}
        <div style={{
          position: 'relative', width: '100%',
          borderRadius: 24, overflow: 'hidden', background: '#000',
        }}>
          <img
            src={src}
            alt={alt}
            width={1290}
            height={2796}
            loading="lazy"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
          width: 80, height: 4, borderRadius: 2,
          background: 'rgba(255,255,255,0.35)',
        }} />
      </div>
    </div>
  );
}

// ─── EvoltageBeforeMobileFig (Section 2) ───────────────────────────────────
function EvoltageBeforeMobileFig() {
  return (
    <PhoneMockup
      src="/images/evoltage-before-mobile.png"
      alt="Old Evoltage UK mobile homepage — generic headline, no phone number visible, weak Read more CTA"
      label="Before"
    />
  );
}

// ─── EvoltageAfterMobileFig (Section 2) ─────────────────────────────────────
function EvoltageAfterMobileFig() {
  return (
    <PhoneMockup
      src="/images/evoltage-after-mobile.png"
      alt="Redesigned Evoltage UK mobile homepage — prominent Call 01509 421 600 button, Get a free quote form, trust badges, sticky bottom bar"
      label="After"
    />
  );
}

// ─── InlineStat ─────────────────────────────────────────────────────────────
function InlineStat({ value, label, sub, last, accent }: { value: string; label: string; sub: string; last?: boolean; accent?: boolean }) {
  return (
    <div style={{
      padding: '24px 20px',
      borderTop: '1px solid var(--line)',
      borderRight: last ? 'none' : '1px solid var(--line)',
    }}>
      <div style={{
        fontFamily: 'var(--display)', fontWeight: 600,
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: accent ? 'var(--accent)' : 'var(--ink)',
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--display)', fontWeight: 500,
        fontSize: 14, marginTop: 6, color: 'var(--ink)',
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--display)', fontSize: 11,
        letterSpacing: '0.14em', textTransform: 'uppercase' as const,
        color: 'var(--muted)', marginTop: 4,
      }}>{sub}</div>
    </div>
  );
}

// ─── Section 1: The Problem ─────────────────────────────────────────────────
function S1TheProblem({ fonts }: { fonts: FontSet }) {
  return (
    <section className="wrap" style={{ paddingBlock: '110px 80px', containerType: 'inline-size' }}>
      <div className="cs-section-grid" style={{ display: 'grid', gap: 48, alignItems: 'start' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 40, color: 'var(--muted)' }}>(01) The problem</div>
        </Reveal>
        <div>
          <Reveal>
            <h1 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 600,
              fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}>
              Nobody{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>in the dark</span>
              {' '}wants to read more.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              margin: '28px 0 0', maxWidth: 560, color: 'var(--muted)',
              fontSize: 18, lineHeight: 1.55,
            }}>
              JJ runs Evoltage UK, a 24-hour electrician in Loughborough. When someone
              loses power at 9pm, they reach for their phone and search for an
              electrician. They land on JJ&apos;s site. The main call to action
              read: &ldquo;Read more...&rdquo; Nobody in the dark wants to read more. They
              want a phone number.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ marginTop: 48 }}>
              <EvoltageBeforeFig />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 0, marginTop: 0,
            }}>
              <InlineStat value="10/100" label="SEO score" sub="Google Lighthouse" />
              <InlineStat value="15s" label="Phone number" sub="Seconds to find" last />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: What We Built ───────────────────────────────────────────────
function S2WhatWeBuilt({ fonts }: { fonts: FontSet }) {
  const bullets = [
    'Phone number one tap away on every page',
    "13 pages so Google finds you for 'electrician Loughborough'",
    'Trust badges visible in 3 seconds — NAPIT, JIB, insured, 5/5 on MyBuilder (59 reviews)',
    'Real job photos, not stock',
    'Built in 3 days',
  ];

  return (
    <section className="wrap" style={{ paddingBlock: '80px', containerType: 'inline-size' }}>
      <div className="cs-section-grid" style={{ display: 'grid', gap: 48, alignItems: 'start' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 40, color: 'var(--muted)' }}>(02) What we built</div>
        </Reveal>
        <div>
          <Reveal>
            <h2 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 600,
              fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}>
              The site we{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>shipped.</span>
            </h2>
          </Reveal>

          {/* Before/After figure pair */}
          <Reveal delay={100}>
            <div style={{
              marginTop: 48, display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 24,
            }}>
              <EvoltageBeforeMobileFig />
              <EvoltageAfterMobileFig />
            </div>
          </Reveal>

          {/* Bullet list */}
          <Reveal delay={200}>
            <ul style={{ listStyle: 'none', padding: 0, margin: '48px 0 0' }}>
              {bullets.map((text, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 0',
                  borderTop: '1px solid var(--line)',
                  borderBottom: i === bullets.length - 1 ? '1px solid var(--line)' : 'none',
                  fontSize: 16, lineHeight: 1.5,
                }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 999,
                    border: '1px solid var(--accent)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Check size={9} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Methodology sentence */}
          <Reveal delay={250}>
            <p style={{
              margin: '28px 0 0', maxWidth: 640, color: 'var(--muted)',
              fontSize: 17, lineHeight: 1.55,
            }}>
              We ran three audits and diagnosed 10 problems before writing a line of code.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p style={{
              margin: '12px 0 0', maxWidth: 640, color: 'var(--muted)',
              fontSize: 17, lineHeight: 1.55,
            }}>
              The polished finish is deliberate. Homeowners with a tripped fuse board
              pick the electrician who looks trustworthy, not the cheapest. A professional
              site filters for the jobs worth taking.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: The Numbers ─────────────────────────────────────────────────
function S3TheNumbers({ fonts }: { fonts: FontSet }) {
  const stats = [
    { v: '80+',   l: 'SEO health',     sub: 'Was 10/100' },
    { v: '13',    l: 'Indexed pages',   sub: 'Was 4 — 13 routes Google can rank' },
    { v: '0s',    l: 'Time to phone',   sub: 'Was 15 seconds of scrolling' },
  ];

  return (
    <section className="wrap" style={{ paddingBlock: '80px', containerType: 'inline-size' }}>
      <div className="cs-section-grid" style={{ display: 'grid', gap: 48, alignItems: 'start' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 40, color: 'var(--muted)' }}>(03) The numbers</div>
        </Reveal>
        <div>
          <Reveal>
            <h2 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 600,
              fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}>
              Evidence, not{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>promises.</span>
            </h2>
          </Reveal>

          {/* Stat grid */}
          <Reveal delay={100}>
            <div style={{
              marginTop: 48, display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: 0,
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding: '28px 20px',
                  borderTop: '1px solid var(--line)',
                  borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 500,
                    fontSize: 'clamp(3rem, 6vw, 5.25rem)',
                    color: 'var(--accent)', lineHeight: 1,
                  }}>{s.v}</div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 500,
                    fontSize: 16, marginTop: 8, color: 'var(--ink)',
                  }}>{s.l}</div>
                  <div style={{
                    fontFamily: 'var(--display)', fontSize: 10.5,
                    letterSpacing: '0.14em', textTransform: 'uppercase' as const,
                    color: 'var(--muted)', marginTop: 6,
                  }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* What's next */}
          <Reveal delay={200}>
            <div style={{
              borderTop: '1px solid var(--line)',
              marginTop: 56, paddingTop: 28,
            }}>
              <div style={{
                fontFamily: 'var(--display)', fontSize: 11,
                letterSpacing: '0.14em', textTransform: 'uppercase' as const,
                color: 'var(--muted)', marginBottom: 12,
              }}>What&apos;s next</div>
              <p style={{
                margin: 0, maxWidth: 640, color: 'var(--muted)',
                fontSize: 17, lineHeight: 1.55,
              }}>
                Analytics are wired. Once the site goes live, we&apos;ll track exactly
                how many people tap the call button, which service pages get the most
                visits, and where visitors come from.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Your Turn ───────────────────────────────────────────────────
function S4YourTurn({ fonts, onContact }: { fonts: FontSet; onContact: () => void }) {
  return (
    <section style={{
      background: 'var(--primary)', color: 'var(--paper)',
      padding: '120px 0 80px',
    }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)', marginBottom: 40 }}>
            (04) Your turn
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            margin: 0, fontFamily: fonts.display, fontWeight: 600,
            fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 0.95,
            letterSpacing: '-0.03em', maxWidth: 720,
          }}>
            Your website is costing you{' '}
            <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>
              customers.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p style={{
            margin: '28px 0 0', maxWidth: 640,
            color: 'rgba(249,254,253,0.65)', fontSize: 18, lineHeight: 1.55,
          }}>
            A single emergency call-out is worth ~&pound;200. How many lost calls
            would you accept before rebuilding?
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            margin: '16px 0 48px', color: 'rgba(249,254,253,0.50)',
            fontSize: 16,
          }}>
            We gave JJ a free audit and concept build to show what&apos;s possible.
          </p>
        </Reveal>

        {/* CTA group */}
        <Reveal delay={250}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <a
              href="https://proj-astro-seven.vercel.app/book/kicksnare"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-cs-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--paper)', color: 'var(--ink)',
                textDecoration: 'none',
                fontFamily: fonts.display, fontWeight: 500, fontSize: 14,
                padding: '13px 18px 13px 20px', borderRadius: 999,
              }}
            >
              Book your free audit
              <span className="cta-cs-arr" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: 999,
                background: 'var(--accent)', color: '#06372d',
                transition: 'transform .25s ease',
              }}>
                <ArrowDiag size={11} />
              </span>
            </a>
            <button
              onClick={onContact}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '13px 18px', borderRadius: 999,
                border: '1px solid rgba(249,254,253,0.30)',
                background: 'transparent', color: 'var(--paper)',
                fontFamily: fonts.display, fontWeight: 500, fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Drop us an email
            </button>
            <a
              href="https://x.com/kicksnare12"
              target="_blank"
              rel="noopener noreferrer"
              className="link-uline"
              style={{
                color: 'rgba(249,254,253,0.6)', textDecoration: 'none',
                fontFamily: fonts.display, fontSize: 14, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center',
                minHeight: 44, padding: '0 8px', margin: '0 -8px',
              }}
            >
              DM @kicksnare ↗
            </a>
          </div>
        </Reveal>

        {/* Guarantee */}
        <Reveal delay={300}>
          <div style={{
            borderTop: '1px solid rgba(249,254,253,0.18)',
            paddingTop: 20, marginTop: 32,
          }}>
            <span style={{
              fontFamily: fonts.serif, fontStyle: 'italic',
              fontSize: 18, color: 'var(--paper)',
            }}>
              If you don&apos;t love it, you don&apos;t pay.
            </span>{' '}
            <span style={{ color: 'rgba(249,254,253,0.65)', fontSize: 16 }}>
              No questions.
            </span>
          </div>
        </Reveal>

        {/* Byline strip */}
        <Reveal delay={350}>
          <div style={{
            borderTop: '1px solid rgba(249,254,253,0.18)',
            padding: '24px 0', marginTop: 80,
          }}>
            <span style={{
              color: 'rgba(249,254,253,0.40)', fontSize: 13,
              letterSpacing: '0.06em',
            }}>
              Built by{' '}
            </span>
            <a
              href="/about"
              className="link-uline"
              style={{
                color: 'rgba(249,254,253,0.65)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center',
                minHeight: 44,
              }}
            >
              OO →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Client root ────────────────────────────────────────────────────────────
export default function CaseStudyClient() {
  const pair = PAIRS['geist-instrument'];
  const fonts: FontSet = { display: pair.display, serif: pair.serif };
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--display', fonts.display);
    document.documentElement.style.setProperty('--serif', fonts.serif);
  }, [fonts.display, fonts.serif]);

  return (
    <div style={{ fontFamily: fonts.display }}>
      <Header
        scrolled={scrolled}
        fonts={fonts}
        heroPassed={true}
        isMobile={isMobile}
        activeSection={null}
        navLinks={[{ href: '/', label: '← Home' }]}
        ctaHref="/#audit"
        ctaLabel="Free audit"
      />
      <main>
        <S1TheProblem fonts={fonts} />
        <S2WhatWeBuilt fonts={fonts} />
        <S3TheNumbers fonts={fonts} />
        <S4YourTurn fonts={fonts} onContact={() => setContactOpen(true)} />
      </main>
      <Footer fonts={fonts} backHref="/#work" />
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} fonts={fonts} />}
    </div>
  );
}
