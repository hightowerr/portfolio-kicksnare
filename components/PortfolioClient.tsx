'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Soundwave, ArrowRight, ArrowDiag, Plus, Check, Close } from './icons';
import CaseStudyModal from './CaseStudyModal';
import ContactModal from './ContactModal';
import BottomBar from './BottomBar';
import RotatingWord from './RotatingWord';
import Header from './Header';
import Footer from './Footer';
import { visibleCases, heroProjects, type CaseStudy } from '@/lib/cases';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type FontSet, PAIRS } from '@/lib/fonts';
import Reveal from './Reveal';

// ─── Striped placeholder ──────────────────────────────────────────────────────
function StripedFig({ aspect = '4 / 3', label = 'hero · 4:3', id = 'hero' }: { aspect?: string; label?: string; id?: string }) {
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

// ─── AuditFig ────────────────────────────────────────────────────────────────
function AuditFig() {
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: '800 / 520',
      borderRadius: 28, overflow: 'hidden',
      background: 'var(--paper-2)', border: '1px solid rgba(6,55,45,0.06)',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <pattern id="audit-fig-stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" style={{ stroke: 'var(--line)' }} strokeWidth="2" />
          </pattern>
          <filter id="audit-browser-shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="rgba(1,11,9,0.10)" />
          </filter>
          <clipPath id="audit-hero-clip">
            <rect x="80" y="98" width="640" height="342" />
          </clipPath>
        </defs>

        <rect width="800" height="520" fill="url(#audit-fig-stripes)" />

        {/* Browser card shell */}
        <rect x="80" y="60" width="640" height="380" rx="12" fill="white" filter="url(#audit-browser-shadow)" />
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
          clipPath="url(#audit-hero-clip)"
        />

        {/* Annotation 1 — No hook */}
        <rect x="210" y="310" width="380" height="80" rx="4" fill="rgba(255,94,0,0.12)" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeDasharray="5 3" />
        <rect x="342" y="277" width="116" height="30" rx="6" style={{ fill: 'var(--ink)' }} />
        <polygon points="400,310 394,307 406,307" style={{ fill: 'var(--ink)' }} />
        <text x="400" y="296" textAnchor="middle" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="9.5" fontWeight="500" style={{ fill: 'var(--paper)' }} letterSpacing="0.04em">No hook</text>

        {/* Fold line */}
        <line x1="80" y1="440" x2="720" y2="440" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
        <text x="724" y="443" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="8" fontWeight="500" style={{ fill: 'var(--accent)' }} opacity="0.7" letterSpacing="0.04em">↑ fold</text>

        {/* Annotation 2 — Weak CTA */}
        <rect x="290" y="410" width="220" height="36" rx="4" fill="rgba(255,94,0,0.12)" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeDasharray="5 3" />
        <rect x="180" y="408" width="100" height="30" rx="6" style={{ fill: 'var(--ink)' }} />
        <polygon points="280,420 290,414 290,426" style={{ fill: 'var(--ink)' }} />
        <text x="230" y="427" textAnchor="middle" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="9.5" fontWeight="500" style={{ fill: 'var(--paper)' }} letterSpacing="0.04em">Weak CTA</text>

        {/* Annotation 3 — Phone buried */}
        <rect x="440" y="98" width="280" height="24" rx="4" fill="rgba(255,94,0,0.12)" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeDasharray="5 3" />
        <rect x="480" y="126" width="130" height="30" rx="6" style={{ fill: 'var(--ink)' }} />
        <polygon points="545,126 539,122 551,122" style={{ fill: 'var(--ink)' }} />
        <text x="545" y="145" textAnchor="middle" fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="9.5" fontWeight="500" style={{ fill: 'var(--paper)' }} letterSpacing="0.04em">Phone buried</text>
      </svg>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ fonts, onOpenCase }: { fonts: FontSet; onOpenCase: (id: string) => void }) {
  return (
    <section className="wrap" style={{ containerType: 'inline-size', paddingBlock: '70px 100px' }}>
      <Reveal>
        <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 24, height: 1, background: 'currentColor' }} />
          Anti-agency agency
        </span>
      </Reveal>
      <div className="hero-grid" style={{ display: 'grid', gap: 80, alignItems: 'start', marginTop: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <Reveal delay={120} style={{ order: 1 }}>
            <h1 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(4rem, 8.5vw, 8rem)', lineHeight: 0.92, letterSpacing: '-0.035em', color: 'var(--ink)', textWrap: 'pretty' }}>
              We build the{' '}
              <RotatingWord serif={fonts.serif} />{' '}
              you need to grow.
            </h1>
          </Reveal>
          <Reveal delay={240} style={{ order: 3 }}>
            <p style={{ margin: 0, maxWidth: 560, color: 'var(--muted)', fontSize: 18, lineHeight: 1.5, letterSpacing: '-0.005em' }}>
              We build everything from landing pages that get leads to digital products, MVPs, and sales funnels. If it helps you grow, we&apos;ll ship it in weeks—not months.
            </p>
          </Reveal>
          <Reveal delay={360} style={{ order: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
              <a href="#audit" className="cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--primary)', color: 'var(--paper)', textDecoration: 'none', fontFamily: fonts.display, fontWeight: 500, fontSize: 16, padding: '16px 22px 16px 24px', borderRadius: 999 }}>
                Request free audit
                <span className="cta-arr" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, background: 'var(--accent)', color: '#06372d', transition: 'transform .25s ease' }}>
                  <ArrowRight size={13} />
                </span>
              </a>
              <a href="#work" className="link-uline" style={{ textDecoration: 'none', color: 'var(--ink)', fontFamily: fonts.display, fontSize: 16, fontWeight: 500, display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 8px', margin: '0 -8px' }}>See selected work</a>
            </div>
          </Reveal>
        </div>
        <div style={{ paddingTop: 40 }}>
          <Reveal delay={200}>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 18 }}>Selected projects</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {heroProjects.map((p, i) => {
                  const casesByid = Object.fromEntries(visibleCases.map(c => [c.id, c]));
                  const resolvedHref = p.id && casesByid[p.id]?.href;
                  const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid var(--line)', ...(i === heroProjects.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}), fontFamily: fonts.display, color: 'var(--ink)', textDecoration: 'none', fontSize: 19, fontWeight: 500, letterSpacing: '-0.015em', transition: 'padding .35s cubic-bezier(.2,.7,.2,1), color .25s', cursor: p.id ? 'pointer' : 'default' };
                  const inner = (
                    <>
                      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 14 }}>
                        <span style={{ fontFamily: 'var(--display)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>{String(i + 1).padStart(2, '0')}</span>
                        {p.name}
                      </span>
                      <span style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>{p.meta} {p.id ? '→' : '·'}</span>
                    </>
                  );
                  return (
                    <li key={i}>
                      {resolvedHref ? (
                        <Link href={resolvedHref} className="proj-row" style={rowStyle}>{inner}</Link>
                      ) : p.id ? (
                        <a href="#" onClick={(e) => { e.preventDefault(); onOpenCase(p.id!); }} className="proj-row" style={rowStyle}>{inner}</a>
                      ) : (
                        <a href="#work" className="proj-row" style={rowStyle}>{inner}</a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Open for work · Jun 2026', '48-hour delivery', '100% money-back guarantee', 'Direct access to senior team', 'Remote · GMT', '1-week sprints'];
  const loop = [...items, ...items];
  return (
    <div style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '20px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 56, whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite', fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 500, fontSize: 16, letterSpacing: '-0.005em' }}>
        {loop.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 56 }}>
            {t}
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Audit ────────────────────────────────────────────────────────────────────
function AuditOffer({ fonts }: { fonts: FontSet }) {
  return (
    <section id="audit" className="wrap" style={{ containerType: 'inline-size', paddingBlock: '110px 80px' }}>
      <div className="audit-grid" style={{ display: 'grid', gap: 80, alignItems: 'center' }}>
        <Reveal>
          <AuditFig />
        </Reveal>
        <div>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 24 }}>(01) Free audit</div>
            <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              We&apos;ll record a 5-minute{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>video audit</span>{' '}
              of your site or product.
            </h2>
            <p style={{ margin: '32px 0 0', color: 'var(--muted)', fontSize: 18, lineHeight: 1.55 }}>
              We&apos;ll send you a video walkthrough of your site or app, show you where users are getting stuck, and calculate the revenue you&apos;re losing as a result.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'A video walkthrough recorded just for your site—not a generic checklist.',
                'A clear look at exactly where your visitors are dropping off.',
                "A calculation of the revenue you're leaving on the table.",
                'Delivered to your inbox or DMs within 48 hours.'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fonts.display, fontSize: 16, fontWeight: 500 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 999, border: '1px solid var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--primary)', color: 'var(--paper)', textDecoration: 'none', fontFamily: fonts.display, fontWeight: 500, fontSize: 16, padding: '16px 22px 16px 24px', borderRadius: 999 }}>
              Request audit via DM
              <span className="cta-arr" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, background: 'var(--accent)', color: '#06372d', transition: 'transform .25s ease' }}>
                <ArrowDiag size={13} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── PainItem (accordion) ────────────────────────────────────────────────────
function PainItem({ pain, index, fonts }: { pain: { t: string; n: string }; index: number; fonts: FontSet }) {
  const [open, setOpen] = useState(true);

  return (
    <Reveal delay={index * 80}>
      <div
        className="pain-item"
        data-open={String(open)}
        style={{
          padding: open ? '28px 24px 28px 0' : '16px 24px 16px 0',
          borderTop: '1px solid var(--line)',
          borderBottom: index >= 2 ? '1px solid var(--line)' : 'none',
          transition: 'padding 350ms ease',
        }}
      >
        {/* Header row — always visible */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: open ? 18 : 8,
          transition: 'margin 350ms ease',
        }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '0.06em',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <button
            className="pain-item__toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => setOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              minWidth: 48,
              minHeight: 48,
              color: 'var(--accent)',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 250ms ease',
              transform: open ? 'rotate(45deg)' : 'none',
            }}>
              <Plus size={12} />
            </span>
          </button>
        </div>

        {/* Title — always visible */}
        <h3 style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
        }}>
          {pain.t}
        </h3>

        {/* Body — accordion wrapper */}
        <div className="pain-item__body">
          <div className="pain-item__inner">
            <p style={{
              margin: '12px 0 0',
              color: 'var(--muted)',
              fontSize: 15,
              lineHeight: 1.5,
            }}>
              {pain.n}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function Problem({ fonts }: { fonts: FontSet }) {
  const pains = [
    { t: 'Your site looks good. It just doesn’t sell.', n: "Designers get paid to make things look clean. They don’t get paid when you do. When visitors can’t instantly see what to do next, they leave—even if they were ready to pay. We restructure the pages where people are dropping off so the next step is obvious." },
    { t: 'You’re paying for clicks that never become customers.', n: "If you can’t trace a sale back to the ad that caused it, you’re flying blind. Every pound you spend on ads is a guess. We wire up your tracking so you know, with certainty, which campaigns are making you money—and kill the ones that aren’t." },
    { t: 'Traffic is a vanity metric. Revenue isn’t.', n: "A spike in your analytics looks good. It doesn’t pay the bills. We connect the dots between a visitor arriving and a sale completing—so you stop optimising for attention and start optimising for money." },
    { t: 'Your checkout is costing you sales right now.', n: "Every extra field, confusing step, or unclear button is a reason to quit. We run through your checkout as a customer would, find every point of friction, and remove it." },
  ];
  return (
    <section className="wrap" style={{ containerType: 'inline-size', paddingBlock: '80px' }}>
      <div className="problem-grid" style={{ display: 'grid', gap: 48, alignItems: 'start' }}>
        <Reveal>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>(02) The Problem</div>
            <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              Most small business websites convert{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>less than 1 in 100 visitors.</span>
            </h2>
            <p style={{ margin: '24px 0 0', maxWidth: 380, color: 'var(--muted)', fontSize: 16, lineHeight: 1.55 }}>
              That means 99 potential customers leave for every one who buys. We find exactly where they&apos;re walking out — and close the door.
            </p>
          </div>
        </Reveal>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]" style={{ gap: 0 }}>
          {pains.map((p, i) => (
            <PainItem key={i} pain={p} index={i} fonts={fonts} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────
function WorkCard({ c, index, fonts, onOpen }: { c: CaseStudy; index: number; fonts: FontSet; onOpen: () => void }) {
  const [hover, setHover] = useState(false);

  const cardVisual = (
    <>
      <div style={{ position: 'relative', width: '100%', aspectRatio: c.image ? undefined : '4 / 5', borderRadius: 22, overflow: 'hidden', background: c.image ? '#1a1a1a' : c.tone, border: '1px solid rgba(6,55,45,0.05)', transition: 'transform .6s cubic-bezier(.2,.7,.2,1)', transform: hover ? 'translateY(-6px)' : 'translateY(0)' }}>
        {c.image ? (
          <img
            src={c.image}
            alt={`${c.name} — shipped project`}
            loading="lazy"
            style={{ display: 'block', width: '100%', transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)', transform: hover ? 'scale(1.06)' : 'scale(1)' }}
          />
        ) : (
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true" style={{ transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)', transform: hover ? 'scale(1.06)' : 'scale(1)' }}>
            <defs>
              <pattern id={`work-stripes-${index}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(6,55,45,0.06)" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#work-stripes-${index})`} />
          </svg>
        )}
        <div style={{ position: 'absolute', top: 18, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--display)', fontSize: 11, color: c.image ? 'rgba(255,255,255,0.75)' : 'rgba(6,55,45,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          <span>case {String(index + 1).padStart(2, '0')}</span>
          <span>{c.figure}</span>
        </div>
        <div style={{ position: 'absolute', right: 18, bottom: 18, width: 52, height: 52, borderRadius: 999, background: hover ? 'var(--accent)' : 'rgba(255,255,255,0.92)', border: '1px solid rgba(6,55,45,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transform: hover ? 'translate(4px,-4px)' : 'translate(0,0)', transition: 'transform .35s cubic-bezier(.2,.7,.2,1), background .25s' }}>
          <ArrowDiag size={18} />
        </div>
      </div>
      <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--display)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          <span>{c.tag}</span><span>{c.meta}</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 30, lineHeight: 1.02, letterSpacing: '-0.025em' }}>{c.name}</h3>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 16, lineHeight: 1.5 }}>{c.blurb}</p>
      </div>
    </>
  );

  return (
    <Reveal delay={index * 100}>
      {c.href ? (
        <Link href={c.href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: 'block', width: '100%', textDecoration: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}>
          {cardVisual}
        </Link>
      ) : (
        <button type="button" onClick={onOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, margin: 0, textAlign: 'left' as const, color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
          {cardVisual}
        </button>
      )}
    </Reveal>
  );
}

function Work({ fonts, onOpenCase }: { fonts: FontSet; onOpenCase: (id: string) => void }) {
  return (
    <section id="work" style={{ padding: '110px 0 80px' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <Reveal>
            <div>
              <div className="eyebrow" style={{ marginBottom: 18 }}>(03) Selected work</div>
              <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Recent{' '}
                <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>projects.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <a href="#contact" className="link-uline" style={{ textDecoration: 'none', color: 'var(--ink)', fontFamily: fonts.display, fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 8px', margin: '0 -8px' }}>Full case studies on request →</a>
          </Reveal>
        </div>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 lg:gap-7">
          {visibleCases.map((c, i) => <WorkCard key={i} c={c} index={i} fonts={fonts} onOpen={() => onOpenCase(c.id)} />)}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ fonts }: { fonts: FontSet }) {
  const stats = [
    { n: '48 hrs', l: 'Brief to live site' },
    { n: '1 audit', l: 'Free, no obligation' },
  ];
  const services = ['Web design', 'Web development', 'MVP development', 'Product / UX design', 'SEO & content', 'Paid ads & growth', 'Data analysis', 'CRO experiments'];
  return (
    <section id="about" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '120px 0 100px' }}>
      <div className="wrap" style={{ containerType: 'inline-size' }}>
        <div className="about-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <div>
              <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)' }}>(04) About</div>
              <div style={{ marginTop: 28, padding: '16px 18px', borderRadius: 16, background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.1)', fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.65)', textTransform: 'uppercase' }}>
                {[['Based', 'UK · GMT', false], ['Reply', '< 48h', false]].map(([k, v, accent]) => (
                  <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span>{k}</span>
                    <span style={{ color: accent ? 'var(--accent)' : 'var(--paper)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 500, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.98, letterSpacing: '-0.03em', color: 'var(--paper)' }}>
                Most agencies take six months.{' '}
                <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>We&apos;re done in six weeks.</span>
              </h2>
              <p style={{ margin: '32px 0 0', maxWidth: 620, color: 'rgba(249,254,253,0.65)', fontSize: 18, lineHeight: 1.55 }}>
                No account managers. No six-month timelines. You talk to the people building your product, and most projects are live in 4–8 weeks.
              </p>
              <p style={{ margin: '20px 0 0', maxWidth: 620, color: 'rgba(249,254,253,0.65)', fontSize: 18, lineHeight: 1.55 }}>
                Founded by OO — seven years in retail as a product manager. The agency is new. The craft is proven.
              </p>
              <div style={{ marginTop: 40, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 24, color: 'var(--accent)', letterSpacing: '-0.01em' }}>
                &ldquo;If we miss the brief, we fix it free. If you still don&apos;t want it, you don&apos;t pay.&rdquo;
              </div>
            </div>
          </Reveal>
        </div>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-6" style={{ marginTop: 80 }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ paddingTop: 28, borderTop: '1px solid rgba(249,254,253,0.18)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 64, lineHeight: 1, letterSpacing: '-0.025em', color: 'var(--paper)' }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.55)', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
        {/* Services section hidden */}
      </div>
    </section>
  );
}

// ─── ProcessStep (accordion) ─────────────────────────────────────────────────
function ProcessStep({
  step,
  index,
  total,
  fonts,
}: {
  step: { t: string; d: string };
  index: number;
  total: number;
  fonts: FontSet;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal delay={index * 100}>
      <div
        className="process-step"
        data-open={String(open)}
        style={{
          padding: '32px 28px 32px 0',
          borderTop: '1px solid var(--line)',
          minHeight: 280,
          position: 'relative',
        }}
      >
        {/* Header row — always visible */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            color: 'var(--muted)',
          }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {index < total - 1 && <ArrowRight size={14} color="var(--muted)" />}
            <button
              className="process-step__toggle"
              type="button"
              aria-expanded={open}
              aria-label={open ? 'Collapse' : 'Expand'}
              onClick={() => setOpen(o => !o)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                minWidth: 48,
                minHeight: 48,
                color: 'var(--accent)',
              }}
            >
              <span style={{
                display: 'inline-block',
                transition: 'transform 250ms ease',
                transform: open ? 'rotate(45deg)' : 'none',
              }}>
                <Plus size={12} />
              </span>
            </button>
          </div>
        </div>

        {/* Step title — always visible */}
        <h3 style={{
          margin: 0,
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 34,
          lineHeight: 1,
          letterSpacing: '-0.022em',
        }}>
          {step.t}
        </h3>

        {/* Body — accordion wrapper */}
        <div className="process-step__body">
          <div className="process-step__inner">
            <p style={{
              margin: '16px 0 0',
              color: 'var(--muted)',
              fontSize: 15,
              lineHeight: 1.5,
              maxWidth: 260,
            }}>
              {step.d}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process({ fonts }: { fonts: FontSet }) {
  const steps = [
    { t: 'Look', d: "Before you commit to anything, we spend 24 hours in your analytics and pages. You get a plain-English breakdown of exactly where you're losing revenue — yours to keep regardless." },
    { t: 'Agree', d: 'One page. Fixed price. We define exactly what gets built and which number we expect to move. No surprises.' },
    { t: 'Build', d: "Weekly cycles. We review together on Friday, it's live by Monday. You talk directly to the people doing the work." },
    { t: 'Measure', d: "We track results for 30 days. If the number didn't move as expected, we go back in and fix it. We don't call it done until the results say so." },
  ];
  return (
    <section id="process" style={{ padding: '110px 0 80px', containerType: 'inline-size' }}>
      <div className="wrap">
        <div className="process-intro-grid" style={{ display: 'grid', gap: 80, alignItems: 'end', marginBottom: 56 }}>
          <Reveal>
            <div>
              <div className="eyebrow" style={{ marginBottom: 18 }}>(05) Process</div>
              <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.94, letterSpacing: '-0.03em' }}>
                How we{' '}
                <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>work.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 18, lineHeight: 1.55, maxWidth: 460 }}>
              We commit to a result — not just a list of tasks. If something isn&apos;t working, we change it until it does.
            </p>
          </Reveal>
        </div>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]" style={{ gap: 0 }}>
          {steps.map((s, i) => (
            <ProcessStep key={i} step={s} index={i} total={steps.length} fonts={fonts} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ fonts, isMobile }: { fonts: FontSet; isMobile: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="contact" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '120px 0 60px', containerType: 'inline-size' }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow" style={{ color: 'rgba(249,254,253,0.55)', marginBottom: 28 }}>
              (06) Let&apos;s talk
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 500, fontSize: 'clamp(4.5rem, 12vw, 10rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: 'var(--paper)', maxWidth: 1100 }}>
              Request your{' '}
              <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>
                free audit.
              </span>
            </h2>
          </Reveal>

          {isMobile ? (
            <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Full-width primary CTA — booking */}
              <Reveal delay={200}>
                <a
                  href="https://proj-astro-seven.vercel.app/book/kicksnare"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    borderRadius: 999,
                    background: 'var(--accent)',
                    border: 'none',
                    color: '#06372d',
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    fontSize: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    textDecoration: 'none',
                  }}
                >
                  Book a slot
                  <ArrowDiag size={14} />
                </a>
              </Reveal>

              {/* Quiet text links */}
              <Reveal delay={280}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                }}>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="link-uline"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(249,254,253,0.6)',
                      fontFamily: fonts.display,
                      fontSize: 15,
                      fontWeight: 400,
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 44,
                      padding: '0 8px',
                      margin: '0 -8px',
                      cursor: 'pointer',
                    }}
                  >
                    Contact us →
                  </button>
                  <a
                    href="https://x.com/kicksnare12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-uline"
                    style={{
                      color: 'rgba(249,254,253,0.6)',
                      textDecoration: 'none',
                      fontFamily: fonts.display,
                      fontSize: 15,
                      fontWeight: 400,
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 44,
                      padding: '0 8px',
                      margin: '0 -8px',
                    }}
                  >
                    DM @kicksnare ↗
                  </a>
                </div>
              </Reveal>
            </div>
          ) : (
            /* Desktop: existing three-card grid — UNCHANGED */
            <div className="contact-grid" style={{ marginTop: 56, display: 'grid', gap: 20, alignItems: 'stretch' }}>

              <Reveal delay={200}>
                <a
                  href="https://proj-astro-seven.vercel.app/book/kicksnare"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--paper)', padding: '36px 36px 36px 40px', borderRadius: 28, background: 'rgba(249,254,253,0.05)', border: '1px solid rgba(249,254,253,0.12)', transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', minHeight: 200 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,94,0,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(249,254,253,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <span style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase' }}>Primary · Book a call</span>
                    <span style={{ fontFamily: fonts.display, fontSize: 56, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>Book a slot</span>
                    <span style={{ color: 'rgba(249,254,253,0.6)', fontSize: 16, marginTop: 4 }}>Pick a time that works. 30 minutes, no obligation — we&apos;ll walk through your site and show you exactly where the opportunities are.</span>
                    <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 18, color: 'var(--accent)', marginTop: 12 }}>If you don&apos;t love it, you don&apos;t pay. No questions.</span>
                  </div>
                  <span style={{ width: 72, height: 72, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ArrowDiag size={26} />
                  </span>
                </a>
              </Reveal>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                <Reveal delay={280}>
                  <button
                    onClick={() => setModalOpen(true)}
                    style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'rgba(249,254,253,0.04)', border: '1px solid rgba(249,254,253,0.10)', borderRadius: 22, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--paper)', transition: 'background .3s, transform .35s cubic-bezier(.2,.7,.2,1)', flexGrow: 1 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,94,0,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(249,254,253,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--display)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.45)', textTransform: 'uppercase' }}>Email</span>
                      <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: 'var(--paper)', letterSpacing: '-0.015em' }}>Contact us</span>
                    </div>
                    <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--accent)', color: '#06372d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArrowRight size={14} />
                    </span>
                  </button>
                </Reveal>

                <Reveal delay={340}>
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

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} fonts={fonts} />}
    </>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function PortfolioClient() {
  const pair = PAIRS['geist-instrument'];
  const fonts: FontSet = { display: pair.display, serif: pair.serif };
  const [scrolled, setScrolled] = useState(false);
  const [openCase, setOpenCase] = useState<string | null>(null);
  const [heroPassed, setHeroPassed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40);
      setHeroPassed(window.scrollY > 560);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const ids = ['audit', 'work', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-70px 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
        heroPassed={heroPassed}
        isMobile={isMobile}
        activeSection={activeSection}
      />
      <main>
        <Hero fonts={fonts} onOpenCase={setOpenCase} />
        <Marquee />
        <AuditOffer fonts={fonts} />
        <Problem fonts={fonts} />
        <Work fonts={fonts} onOpenCase={setOpenCase} />
        <About fonts={fonts} />
        <Process fonts={fonts} />
        <Contact fonts={fonts} isMobile={isMobile} />
      </main>
      <Footer fonts={fonts} />
      <BottomBar isMobile={isMobile} heroPassed={heroPassed} fonts={fonts} />
      {openCase && (
        <CaseStudyModal
          caseId={openCase}
          fonts={fonts}
          onOpen={setOpenCase}
          onClose={() => setOpenCase(null)}
        />
      )}
    </div>
  );
}
