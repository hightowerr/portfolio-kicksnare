'use client';

import { useState, useEffect } from 'react';

const MOBILE_THRESHOLD = 1024;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
    check(); // hydration-safe: runs only on client after mount
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}
