'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDiag } from './icons';
import Header from './Header';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type FontSet, PAIRS } from '@/lib/fonts';

// ─── Reveal ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 20, style = {} }: { children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setShown(true); }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      ...style,
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 1s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</div>
  );
}

// ─── StripedFig ─────────────────────────────────────────────────────────────
function StripedFig({ aspect = '3 / 4', label = 'OO · 3:4', id = 'about-photo' }: { aspect?: string; label?: string; id?: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, borderRadius: 28, overflow: 'hidden', background: '#EAF3EE', border: '1px solid rgba(6,55,45,0.06)' }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <pattern id={`stripes-${id}`} patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(6,55,45,0.06)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#stripes-${id})`} />
      </svg>
      <div style={{ position: 'absolute', left: 22, bottom: 18, fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

export default function AboutClient() {
  const pair = PAIRS['geist-instrument'];
  const fonts: FontSet = { display: pair.display, serif: pair.serif };
  const [scrolled, setScrolled] = useState(false);
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
        navLinks={[
          { href: '/#work', label: 'Work' },
          { href: '/#audit', label: 'Audit' },
          { href: '/#about', label: 'About' },
          { href: '/#contact', label: 'Contact' },
        ]}
        ctaHref="/#audit"
      />

      <main>
        {/* ── Bio Hero ─────────────────────────────────────────────────── */}
        <section className="wrap" style={{ padding: '110px 0 80px', containerType: 'inline-size' }}>
          <div className="about-bio-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
            <Reveal>
              <StripedFig />
            </Reveal>
            <div>
              <Reveal>
                <div className="eyebrow" style={{ marginBottom: 24 }}>(01) About</div>
                <h1 style={{
                  margin: 0, fontFamily: fonts.display, fontWeight: 600,
                  fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                }}>
                  Seven years in retail. Now I{' '}
                  <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>build</span>{' '}
                  the sites that close the deals.
                </h1>
              </Reveal>
              <Reveal delay={100}>
                <p style={{ margin: '28px 0 0', maxWidth: 560, color: 'var(--muted)', fontSize: 16, lineHeight: 1.55 }}>
                  Seven years as a product manager in retail. No startup history. Direct-to-client work from day one.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div style={{ borderTop: '1px solid var(--line)', marginTop: 32, paddingTop: 28 }}>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>
                    The agency is new. The craft is proven.
                  </p>
                  <p style={{ margin: '12px 0 0', color: 'var(--muted)', fontSize: 16, lineHeight: 1.55 }}>
                    No account managers. You talk to the person who builds it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Contact Links ────────────────────────────────────────────── */}
        <section style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '120px 0 60px', containerType: 'inline-size' }}>
          <div className="wrap">
            <Reveal>
              <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)', marginBottom: 28 }}>(02) Get in touch</div>
            </Reveal>

            {isMobile ? (
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Reveal delay={100}>
                  <a
                    href="https://proj-astro-seven.vercel.app/book/kicksnare"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%', padding: '18px 24px', borderRadius: 999,
                      background: 'var(--accent)', border: 'none', color: '#06372d',
                      fontFamily: fonts.display, fontWeight: 500, fontSize: 16,
                      cursor: 'pointer', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 10, textDecoration: 'none',
                    }}
                  >
                    Book a slot
                    <ArrowDiag size={14} />
                  </a>
                </Reveal>
                <Reveal delay={160}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                    <a href="mailto:hi@kicksnare.studio" className="link-uline" style={{
                      color: 'rgba(249,254,253,0.6)', textDecoration: 'none',
                      fontFamily: fonts.display, fontSize: 15, fontWeight: 400,
                      display: 'inline-flex', alignItems: 'center', minHeight: 44,
                      padding: '0 8px', margin: '0 -8px',
                    }}>Email us →</a>
                    <a href="https://x.com/kicksnare12" target="_blank" rel="noopener noreferrer" className="link-uline" style={{
                      color: 'rgba(249,254,253,0.6)', textDecoration: 'none',
                      fontFamily: fonts.display, fontSize: 15, fontWeight: 400,
                      display: 'inline-flex', alignItems: 'center', minHeight: 44,
                      padding: '0 8px', margin: '0 -8px',
                    }}>DM @kicksnare ↗</a>
                  </div>
                </Reveal>
              </div>
            ) : (
              <div className="contact-grid" style={{ marginTop: 56, display: 'grid', gap: 20, alignItems: 'stretch' }}>
                <Reveal delay={100}>
                  <a
                    href="https://proj-astro-seven.vercel.app/book/kicksnare"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--paper)', padding: '36px 36px 36px 40px', borderRadius: 28, background: 'rgba(249,254,253,0.05)', border: '1px solid rgba(249,254,253,0.12)', transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', minHeight: 160 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,94,0,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(249,254,253,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <span style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase' }}>Primary · Book a call</span>
                      <span style={{ fontFamily: fonts.display, fontSize: 42, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>Book a slot</span>
                    </div>
                    <span style={{ width: 60, height: 60, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArrowDiag size={22} />
                    </span>
                  </a>
                </Reveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Reveal delay={160}>
                    <a
                      href="mailto:hi@kicksnare.studio"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--paper)', background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.10)', borderRadius: 22, padding: 24, transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', flexGrow: 1 }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,94,0,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(249,254,253,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--display)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase' }}>Email</span>
                        <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: 'var(--paper)', letterSpacing: '-0.015em' }}>Email us</span>
                      </div>
                      <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ArrowRight size={14} />
                      </span>
                    </a>
                  </Reveal>
                  <Reveal delay={220}>
                    <a
                      href="https://x.com/kicksnare12"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--paper)', background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.10)', borderRadius: 22, padding: 24, transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', flexGrow: 1 }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,94,0,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(249,254,253,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--display)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase' }}>DMs open</span>
                        <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: 'var(--paper)', letterSpacing: '-0.015em' }}>@kicksnare12</span>
                      </div>
                      <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ArrowDiag size={14} />
                      </span>
                    </a>
                  </Reveal>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer fonts={fonts} backHref="/#work" />
    </div>
  );
}
