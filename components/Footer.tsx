'use client';

import { Soundwave } from './icons';

type FontSet = { display: string; serif: string };

export default function Footer({ fonts, backHref = '#work' }: { fonts: FontSet; backHref?: string }) {
  return (
    <footer style={{ background: 'var(--primary)', color: 'rgba(249,254,253,0.55)', borderTop: '1px solid rgba(249,254,253,0.10)', padding: '52px 0 56px', overflowX: 'hidden' }}>
      <div className="wrap">
        <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 'clamp(5rem, 16vw, 16.25rem)', lineHeight: 0.85, letterSpacing: '-0.045em', color: 'var(--paper)', display: 'flex', alignItems: 'center', gap: '0.18em' }}>
          <Soundwave size={48} />
          <span>kicksnare</span>
        </div>
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontFamily: fonts.display, fontSize: 14 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a className="link-uline" href="https://x.com/kicksnare12" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 8px', margin: '0 -8px' }}>X / Twitter ↗</a>
            <a className="link-uline" href="/privacy" style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 8px' }}>Privacy</a>
          </div>
          <a className="link-uline" href={backHref} style={{ color: 'rgba(249,254,253,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 8px', margin: '0 -8px' }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
