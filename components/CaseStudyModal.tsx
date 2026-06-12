'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, ArrowDiag, Close, Check } from './icons';
import { visibleCases as CASES, type CaseStudy } from '@/lib/cases';
import { useIsMobile } from '@/hooks/useIsMobile';

interface FontSet { display: string; serif: string }

function StripedFig({ tone = '#EAF3EE', label = 'figure', aspect = '16/9', id }: { tone?: string; label?: string; aspect?: string; id: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, borderRadius: 16, overflow: 'hidden', background: tone, border: '1px solid rgba(6,55,45,0.06)' }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <pattern id={`cs-stripes-${id}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(6,55,45,0.06)" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#cs-stripes-${id})`}/>
      </svg>
      <div style={{ position: 'absolute', left: 14, bottom: 12, fontFamily: 'var(--display)', fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function CSHeader({ c, fonts, index, total, isMobile }: { c: CaseStudy; fonts: FontSet; index: number; total: number; isMobile: boolean }) {
  return (
    <header style={{ padding: isMobile ? '28px 20px 40px' : '40px 56px 56px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--display)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 28 }}>
        <span>Case study {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <span>{c.year} · {c.duration}</span>
      </div>
      <h1 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(3.5rem, 7.5vw, 7rem)', lineHeight: 0.92, letterSpacing: '-0.035em', color: 'var(--ink)' }}>
        {c.name}<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{ margin: '20px 0 0', maxWidth: 720, fontFamily: fonts.display, fontSize: 22, lineHeight: 1.5, letterSpacing: '-0.012em', color: 'var(--ink)' }}>
        <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>{c.tagline}</span>
      </p>
      <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: 0, borderTop: '1px solid var(--line)' }}>
        {([['Sector', c.sector], ['Role', c.role], ['Duration', c.duration], ['Stack', c.stack], ['Services', c.services.join(' · ')]] as [string, string][]).map(([k, v], i) => (
          <div key={k} style={{ padding: '20px 16px 20px 0', borderRight: isMobile ? (i % 2 === 0 ? '1px solid var(--line)' : 'none') : (i < 4 ? '1px solid var(--line)' : 'none'), paddingLeft: isMobile ? (i % 2 === 0 ? 0 : 20) : (i === 0 ? 0 : 20), display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--display)', fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>{k}</span>
            <span style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 500, letterSpacing: '-0.005em', color: 'var(--ink)' }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 36 }}>
        <StripedFig tone={c.tone} label={`${c.name.toLowerCase()} · hero · 16:9`} aspect="16/9" id={`hero-${c.id}`}/>
      </div>
    </header>
  );
}

function CSSectionHead({ n, label, title, ital, lede, fonts, isMobile }: { n: string; label: string; title: string; ital?: string; lede?: string; fonts: FontSet; isMobile: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 20 : 80, marginBottom: 40 }}>
      <div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>({n}) {label}</div>
      </div>
      <div>
        <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 0.98, letterSpacing: '-0.025em' }}>
          {title}{' '}{ital && <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>{ital}</span>}
        </h2>
        {lede && <p style={{ margin: '22px 0 0', maxWidth: 640, color: 'var(--muted)', fontSize: 17, lineHeight: 1.55 }}>{lede}</p>}
      </div>
    </div>
  );
}

function CSProblem({ c, fonts, isMobile }: { c: CaseStudy; fonts: FontSet; isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '48px 20px' : '88px 56px', borderBottom: '1px solid var(--line)' }}>
      <CSSectionHead n="01" label="The problem" title="What was leaking" ital="money." fonts={fonts} isMobile={isMobile}/>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 80, alignItems: 'start' }}>
        <p style={{ margin: 0, fontFamily: fonts.display, fontSize: 22, lineHeight: 1.5, letterSpacing: '-0.012em', color: 'var(--ink)' }}>{c.problem.lede}</p>
        <div>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 17, lineHeight: 1.6 }}>{c.problem.detail}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }}>
            {c.problem.pains.map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '18px 0', borderTop: '1px solid var(--line)', ...(i === c.problem.pains.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}) }}>
                <span style={{ fontFamily: 'var(--display)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.14em', minWidth: 28, paddingTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: fonts.display, fontSize: 18, lineHeight: 1.5, letterSpacing: '-0.008em', color: 'var(--ink)', flex: 1 }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CSApproach({ c, fonts, isMobile }: { c: CaseStudy; fonts: FontSet; isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '48px 20px' : '88px 56px', borderBottom: '1px solid var(--line)' }}>
      <CSSectionHead n="02" label="The approach" title="The" ital="thinking." lede={c.approach.lede} fonts={fonts} isMobile={isMobile}/>
      <div style={{ margin: '0 0 48px', padding: isMobile ? '24px 20px' : '28px 32px', borderRadius: 22, background: 'var(--primary)', color: 'var(--paper)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr', gap: isMobile ? 16 : 32, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{c.approach.insight.label} →</span>
        <p style={{ margin: 0, fontFamily: fonts.display, fontSize: isMobile ? 20 : 26, lineHeight: 1.25, letterSpacing: '-0.018em', color: 'var(--paper)' }}>
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>"</span>
          {c.approach.insight.body}
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>"</span>
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0 }}>
        {c.approach.steps.map((s, i) => (
          <div key={s.n} style={{ padding: '28px 24px 28px 0', borderTop: '1px solid var(--line)', paddingLeft: isMobile ? (i % 2 === 0 ? 0 : 20) : (i === 0 ? 0 : 20), borderLeft: isMobile ? (i % 2 > 0 ? '1px solid var(--line)' : 'none') : (i > 0 ? '1px solid var(--line)' : 'none'), minHeight: isMobile ? 160 : 220, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
              <span style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)' }}>{s.n}</span>
              {i < c.approach.steps.length - 1 && <ArrowRight size={13} color="var(--muted)"/>}
            </div>
            <h3 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 500, fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{s.t}</h3>
            <p style={{ margin: '12px 0 0', color: 'var(--muted)', fontSize: 16, lineHeight: 1.5, maxWidth: 240 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CSSolution({ c, fonts, isMobile }: { c: CaseStudy; fonts: FontSet; isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '48px 20px' : '88px 56px', borderBottom: '1px solid var(--line)' }}>
      <CSSectionHead n="03" label="The solution" title="What we" ital="shipped." fonts={fonts} isMobile={isMobile}/>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 32 : 80, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 18 }}>Deliverables</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {c.solution.shipped.map((s, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderTop: '1px solid var(--line)', ...(i === c.solution.shipped.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}) }}>
                <span style={{ width: 16, height: 16, borderRadius: 999, marginTop: 3, flexShrink: 0, border: '1px solid var(--accent)', background: 'rgba(255,94,0,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={9}/>
                </span>
                <span style={{ fontFamily: fonts.display, fontSize: 16, lineHeight: 1.5, color: 'var(--ink)' }}>{s}</span>
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

function CSResult({ c, fonts, isMobile }: { c: CaseStudy; fonts: FontSet; isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '48px 20px' : '88px 56px', background: 'var(--primary)', color: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 20 : 80, marginBottom: 56 }}>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(249,254,253,0.55)', marginBottom: 14 }}>(04) The result</div>
        </div>
        <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 500, fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 0.98, letterSpacing: '-0.025em', color: 'var(--paper)' }}>{c.result.lede}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0 }}>
        {c.result.stats.map((s, i) => (
          <div key={i} style={{ padding: '32px 24px 32px 0', borderTop: '1px solid rgba(249,254,253,0.18)', paddingLeft: isMobile ? (i % 2 === 0 ? 0 : 24) : (i === 0 ? 0 : 24), borderLeft: isMobile ? (i % 2 > 0 ? '1px solid rgba(249,254,253,0.10)' : 'none') : (i > 0 ? '1px solid rgba(249,254,253,0.10)' : 'none'), display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 'clamp(3rem, 6vw, 5.25rem)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--accent)' }}>{s.v}</div>
            <div style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 500, color: 'var(--paper)', letterSpacing: '-0.005em' }}>{s.l}</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.5)', textTransform: 'uppercase' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 64, padding: isMobile ? '28px 20px' : '36px 40px', borderRadius: 24, background: 'rgba(249,254,253,0.05)', border: '1px solid rgba(249,254,253,0.10)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 64, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 80, lineHeight: 0.8, color: 'var(--accent)' }}>"</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 500, color: 'var(--paper)' }}>{c.result.quote.who}</span>
            <span style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(249,254,253,0.55)', textTransform: 'uppercase' }}>{c.result.quote.role}</span>
          </div>
        </div>
        <p style={{ margin: 0, fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, fontSize: isMobile ? 22 : 28, lineHeight: 1.3, letterSpacing: '-0.012em', color: 'var(--paper)' }}>{c.result.quote.body}</p>
      </div>
    </section>
  );
}

function CSCta({ c, fonts, onOpen, isMobile }: { c: CaseStudy; fonts: FontSet; onOpen: (id: string) => void; isMobile: boolean }) {
  const nextIdx = (CASES.findIndex(x => x.id === c.id) + 1) % CASES.length;
  const next = CASES[nextIdx];
  return (
    <section style={{ padding: isMobile ? '48px 20px 40px' : '88px 56px 56px', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 56, alignItems: 'stretch' }}>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 18 }}>(05) Next steps</div>
          <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.94, letterSpacing: '-0.03em' }}>
            Request your{' '}<span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>free audit.</span>
          </h2>
          <p style={{ margin: '20px 0 28px', maxWidth: 560, color: 'var(--muted)', fontSize: 17, lineHeight: 1.55 }}>
            DM your URL to @kicksnare on X. You&apos;ll get a 5-minute video audit of your site or product and a clear breakdown of where you&apos;re losing revenue. Within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="https://x.com/kicksnare" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--primary)', color: 'var(--paper)', textDecoration: 'none', fontFamily: fonts.display, fontWeight: 500, fontSize: 16, padding: '14px 20px 14px 22px', borderRadius: 999 }}>
              DM @kicksnare on X
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, background: 'var(--accent)', color: '#06372d' }}><ArrowDiag size={13}/></span>
            </a>
            <a href="mailto:hi@kicksnare.studio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fonts.display, fontWeight: 500, fontSize: 16, padding: '14px 4px', textDecoration: 'none', color: 'var(--ink)', borderBottom: '1px solid rgba(6,55,45,0.25)' }}>
              hi@kicksnare.studio
            </a>
          </div>
        </div>
        <button onClick={() => onOpen(next.id)} style={{ appearance: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left', background: 'transparent', color: 'inherit', display: 'block', width: '100%' }}>
          <div style={{ position: 'relative', height: '100%', borderRadius: 22, overflow: 'hidden', background: next.tone, border: '1px solid rgba(6,55,45,0.05)', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform .35s cubic-bezier(.2,.7,.2,1)', minHeight: 360 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(6,55,45,0.55)', textTransform: 'uppercase' }}>
              <span>Next case study →</span>
              <span>{String(nextIdx + 1).padStart(2, '0')} / {String(CASES.length).padStart(2, '0')}</span>
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 600, fontSize: 56, lineHeight: 0.96, letterSpacing: '-0.03em' }}>{next.name}</h3>
              <p style={{ margin: '14px 0 0', maxWidth: 360, fontFamily: fonts.display, fontSize: 16, color: 'var(--muted)', lineHeight: 1.5 }}>
                <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400 }}>{next.tagline}</span>
              </p>
              <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fonts.display, fontSize: 14, fontWeight: 500 }}>
                Read case <ArrowDiag size={12}/>
              </div>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

export default function CaseStudyModal({ caseId, onClose, onOpen, fonts }: { caseId: string; onClose: () => void; onOpen: (id: string) => void; fonts: FontSet }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [entered, setEntered] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  // Navigate to dedicated page if case has one
  const openCase = (id: string) => {
    const target = CASES.find(c => c.id === id);
    if (target?.href) {
      onClose();
      router.push(target.href);
    } else {
      onOpen(id);
    }
  };

  const navBtnSize = isMobile ? 44 : 34;
  const navBtnStyle: React.CSSProperties = {
    appearance: 'none', cursor: 'pointer',
    width: navBtnSize, height: navBtnSize, borderRadius: 999,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: '#fff', border: '1px solid rgba(6,55,45,0.12)',
    color: 'var(--ink)',
  };
  const cIdx = Math.max(0, CASES.findIndex(c => c.id === caseId));
  const c = CASES[cIdx];

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') openCase(CASES[(cIdx + 1) % CASES.length].id);
      if (e.key === 'ArrowLeft')  openCase(CASES[(cIdx - 1 + CASES.length) % CASES.length].id);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [cIdx, onClose, onOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [caseId]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setScrollPct(max > 0 ? el.scrollTop / max : 0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${c.name}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: isMobile ? 'var(--paper)' : 'rgba(6,55,45,0.55)',
        backdropFilter: isMobile ? 'none' : 'blur(6px)',
        WebkitBackdropFilter: isMobile ? 'none' : 'blur(6px)',
        opacity: isMobile ? 1 : (entered ? 1 : 0),
        transition: isMobile ? 'none' : 'opacity 250ms ease',
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget && !isMobile) onClose(); }}
    >
      <div style={isMobile ? {
        position: 'fixed', inset: 0,
        background: 'var(--paper)', color: 'var(--ink)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column' as const,
        transform: entered ? 'scale(1)' : 'scale(0.98)',
        opacity: 1,
        transition: 'transform 350ms cubic-bezier(.2,.7,.2,1)',
      } : {
        position: 'absolute' as const, top: 24, right: 24, bottom: 24, left: 24,
        background: 'var(--paper)', color: 'var(--ink)',
        borderRadius: 28, overflow: 'hidden',
        display: 'flex', flexDirection: 'column' as const,
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        transform: entered ? 'scale(1)' : 'scale(0.98)',
        opacity: 1,
        transition: 'transform 350ms cubic-bezier(.2,.7,.2,1)',
      }}>
        <div style={{ position: 'relative', flexShrink: 0, padding: isMobile ? '12px 16px' : '16px 24px 16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', background: 'rgba(249,254,253,0.85)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 14, overflow: 'hidden', flex: 1, minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase', flexShrink: 0 }}>Case · {String(cIdx + 1).padStart(2, '0')} / {String(CASES.length).padStart(2, '0')}</span>
            <span style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em', flexShrink: 0 }}>{c.name}<span style={{ color: 'var(--accent)' }}>.</span></span>
            {!isMobile && <>
              <span style={{ fontFamily: fonts.display, fontSize: 14, color: 'var(--muted)' }}>—</span>
              <span style={{ fontFamily: fonts.display, fontSize: 14, color: 'var(--muted)', maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.tagline}</span>
            </>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <button aria-label="Previous case" onClick={() => openCase(CASES[(cIdx - 1 + CASES.length) % CASES.length].id)} style={navBtnStyle}>
              <ArrowLeft size={14}/>
            </button>
            <button aria-label="Next case" onClick={() => openCase(CASES[(cIdx + 1) % CASES.length].id)} style={navBtnStyle}>
              <ArrowRight size={14}/>
            </button>
            <span style={{ width: 1, height: 22, background: 'var(--line)', margin: '0 4px' }}/>
            <button aria-label="Close" onClick={onClose} style={{
              ...navBtnStyle,
              background: 'var(--primary)', color: 'var(--paper)', border: '1px solid var(--ink)',
            }}>
              <Close size={13}/>
            </button>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: 'transparent' }}>
            <div style={{ height: '100%', width: `${scrollPct * 100}%`, background: 'var(--accent)', transition: 'width .08s linear' }}/>
          </div>
        </div>
        <div ref={scrollRef} onScroll={onScroll} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <CSHeader c={c} fonts={fonts} index={cIdx} total={CASES.length} isMobile={isMobile}/>
          <CSProblem c={c} fonts={fonts} isMobile={isMobile}/>
          <CSApproach c={c} fonts={fonts} isMobile={isMobile}/>
          <CSSolution c={c} fonts={fonts} isMobile={isMobile}/>
          <CSResult c={c} fonts={fonts} isMobile={isMobile}/>
          <CSCta c={c} fonts={fonts} onOpen={openCase} isMobile={isMobile}/>
        </div>
      </div>
    </div>
  );
}
