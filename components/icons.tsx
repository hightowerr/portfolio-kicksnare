'use client';

export function Soundwave({ size = 20, label = 'kicksnare' }: { size?: number; label?: string }) {
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

export function ArrowRight({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ArrowLeft({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M11 19l-7-7 7-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ArrowDiag({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Plus({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 1v10M1 6h10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function Close({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function Check({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 6.5 5 9.5 10 3.5" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
