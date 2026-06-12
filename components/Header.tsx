'use client';

import { useEffect, useState } from 'react';
import { Soundwave, ArrowRight, Close } from './icons';

type FontSet = { display: string; serif: string };

interface NavLink {
  href: string;
  label: string;
}

const defaultNavLinks: NavLink[] = [
  { href: '#work',    label: 'Work' },
  { href: '#audit',   label: 'Audit' },
  { href: '#about',   label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({
  scrolled,
  fonts,
  heroPassed,
  isMobile,
  activeSection,
  navLinks = defaultNavLinks,
  ctaHref = '#audit',
  ctaLabel = 'Free audit',
}: {
  scrolled: boolean;
  fonts: FontSet;
  heroPassed: boolean;
  isMobile: boolean;
  activeSection: string | null;
  navLinks?: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', background: scrolled ? 'rgba(249,254,253,0.82)' : 'rgba(249,254,253,0)', borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent', transition: 'background .3s, border-color .3s' }}>
      <div className="wrap header-wrap" style={{ alignItems: 'center', padding: '20px var(--wrap-pad-mobile)', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Soundwave size={22} />
          <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em' }}>kicksnare</span>
          <span style={{ fontFamily: 'var(--display)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginLeft: 4 }}>digital</span>
        </div>
        <nav className="nav-desktop" aria-label="Main" style={{ gap: 36, justifyContent: 'center' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={`navlink${activeSection && link.href === '#' + activeSection ? ' navlink--active' : ''}`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta-wrap" style={{ justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
          <a
            href={ctaHref}
            className="cta-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--primary)',
              color: 'var(--paper)',
              textDecoration: 'none',
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: 14,
              padding: '11px 16px 11px 18px',
              borderRadius: 999,
              opacity: isMobile && !heroPassed ? 0 : 1,
              pointerEvents: isMobile && !heroPassed ? 'none' : 'auto',
              transition: 'opacity 0.3s ease',
            }}
          >
            {ctaLabel}
            <span className="cta-arr" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: 999, background: 'var(--accent)', color: '#06372d', transition: 'transform .25s ease' }}>
              <ArrowRight size={11} />
            </span>
          </a>
        </div>
        <button
          type="button"
          className="nav-hamburger"
          aria-label="Open menu"
          onClick={() => setNavOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            minWidth: 48,
            minHeight: 48,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <span style={{ width: 22, height: 2, background: 'var(--ink)', borderRadius: 1 }} />
          <span style={{ width: 22, height: 2, background: 'var(--ink)', borderRadius: 1 }} />
          <span style={{ width: 16, height: 2, background: 'var(--ink)', borderRadius: 1 }} />
        </button>
      </div>

      {navOpen && (
        <div
          className="nav-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'var(--primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: 'var(--paper)',
            }}
          >
            <Close size={24} />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.href}
              className={`navlink-mobile${activeSection && link.href === '#' + activeSection ? ' navlink-mobile--active' : ''}`}
              href={link.href}
              onClick={() => setNavOpen(false)}
              style={{
                fontFamily: fonts.display,
                fontWeight: 500,
                fontSize: 28,
                color: 'var(--paper)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href={ctaHref}
            className="cta-primary"
            onClick={() => setNavOpen(false)}
            style={{
              marginTop: 16,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--accent)',
              color: 'var(--ink)',
              textDecoration: 'none',
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: 16,
              padding: '14px 20px 14px 22px',
              borderRadius: 999,
            }}
          >
            {ctaLabel}
            <span className="cta-arr" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 22,
              height: 22,
              borderRadius: 999,
              background: 'var(--paper)',
              color: 'var(--primary)',
              transition: 'transform .25s ease',
            }}>
              <ArrowRight size={12} />
            </span>
          </a>
        </div>
      )}
    </header>
  );
}
