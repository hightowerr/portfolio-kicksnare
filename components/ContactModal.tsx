'use client';

import { useEffect, useState } from 'react';
import { Check, Close } from '@/components/icons';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type FontSet } from '@/lib/fonts';

export default function ContactModal({ onClose, fonts }: { onClose: () => void; fonts: FontSet }) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [entered, setEntered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    fetch('https://formspree.io/f/meedaznk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(res => setStatus(res.ok ? 'success' : 'error'))
      .catch(() => setStatus('error'));
  }

  const srOnly: React.CSSProperties = {
    position: 'absolute',
    width: 1, height: 1,
    padding: 0, margin: -1,
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  };

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    minHeight: 44,
    borderRadius: 10,
    border: '1px solid rgba(249,254,253,0.18)',
    background: 'rgba(249,254,253,0.10)',
    color: 'var(--paper)',
    fontFamily: fonts.display,
    fontSize: 16,
    boxSizing: 'border-box' as const,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
      onClick={isMobile ? undefined : onClose}
      style={isMobile ? {
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'var(--primary)',
        overflowY: 'auto',
        opacity: entered ? 1 : 0.85,
        transition: 'opacity 300ms ease',
      } : {
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(1,11,9,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        opacity: entered ? 1 : 0.85,
        transition: 'opacity 300ms ease',
      }}
    >
      <div
        onClick={isMobile ? undefined : (e => e.stopPropagation())}
        style={isMobile ? {
          position: 'relative',
          background: 'var(--primary)', color: 'var(--paper)',
          padding: '60px 20px 40px',
          width: '100%',
          minHeight: '100%',
        } : {
          position: 'relative',
          background: 'var(--primary)',
          color: 'var(--paper)',
          borderRadius: 28,
          maxWidth: 520,
          width: '100%',
          padding: '44px 44px 40px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={isMobile ? {
            position: 'fixed', top: 20, right: 20, zIndex: 110,
            width: 44, height: 44, borderRadius: 999,
            background: 'rgba(249,254,253,0.10)',
            border: '1px solid rgba(249,254,253,0.15)',
            cursor: 'pointer',
            color: 'var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          } : {
            position: 'absolute', top: 20, right: 20,
            width: 36, height: 36, borderRadius: 999,
            background: 'rgba(249,254,253,0.10)',
            border: '1px solid rgba(249,254,253,0.15)',
            cursor: 'pointer',
            color: 'var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s',
          }}
        >
          <Close size={14} />
        </button>

        <div style={{
          fontFamily: 'var(--display)', fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(249,254,253,0.55)', marginBottom: 14,
        }}>
          Get in touch
        </div>
        <h2 style={{
          margin: '0 0 32px',
          fontFamily: fonts.display, fontWeight: 500,
          fontSize: 34, letterSpacing: '-0.022em', lineHeight: 1.0,
          color: 'var(--paper)',
        }}>
          Let&apos;s{' '}
          <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.015em' }}>
            talk.
          </span>
        </h2>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 999,
              background: 'var(--accent)', color: '#06372d',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Check size={20} />
            </div>
            <div style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 500, color: 'var(--paper)', marginBottom: 10 }}>
              Message sent.
            </div>
            <div style={{ fontSize: 14, color: 'rgba(249,254,253,0.6)', lineHeight: 1.5 }}>
              We&apos;ll get back to you within 24 hours.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-name" style={srOnly}>Name</label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
            <label htmlFor="contact-email" style={srOnly}>Email</label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ ...inputStyle, marginTop: 12 }}
            />
            <label htmlFor="contact-message" style={srOnly}>Message</label>
            <textarea
              id="contact-message"
              required
              rows={4}
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ ...inputStyle, marginTop: 12, resize: 'vertical' }}
            />
            {status === 'error' && (
              <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--accent)', lineHeight: 1.5 }}>
                Something went wrong — please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                marginTop: 20,
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--accent)',
                border: 'none',
                color: '#06372d',
                fontFamily: fonts.display, fontWeight: 500, fontSize: 14,
                padding: '11px 20px',
                minHeight: 44,
                borderRadius: 999,
                cursor: status === 'loading' ? 'default' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'opacity .2s',
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send message →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
