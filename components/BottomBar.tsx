'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ArrowRight } from './icons';

interface BottomBarProps {
  isMobile: boolean;
  heroPassed: boolean;
  fonts: { display: string };
}

export default function BottomBar({ isMobile, heroPassed, fonts }: BottomBarProps) {
  const contactRef = useRef<Element | null>(null);

  // Lazily grab the #contact section from the DOM on first render.
  // Safe because: component is 'use client', #contact is rendered before
  // BottomBar in the DOM tree, and the guard prevents SSR crashes.
  if (typeof window !== 'undefined' && !contactRef.current) {
    contactRef.current = document.getElementById('contact');
  }

  const contactVisible = useIntersectionObserver(contactRef, { threshold: 0.5 });

  const visible = isMobile && heroPassed && !contactVisible;

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        height: 52,
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 350ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="lg:hidden"
    >
      <a
        href="#contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
          height: '100%',
          color: 'var(--ink)',
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 16,
          textDecoration: 'none',
          letterSpacing: '-0.005em',
        }}
      >
        Let&apos;s talk
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            borderRadius: 999,
            background: 'var(--ink)',
            color: 'var(--accent)',
          }}
        >
          <ArrowRight size={11} />
        </span>
      </a>
    </div>
  );
}
