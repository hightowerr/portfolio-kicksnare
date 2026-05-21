'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const WORDS_REVERSED = ['growth tools', 'web apps', 'landing pages', 'digital products'];

interface Props {
  serif: string;
}

export default function RotatingWord({ serif }: Props) {
  const stackRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const spans = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!spans.length) return;

    let maxWidth = 0;
    let wordHeight = 0;

    spans.forEach(span => {
      const rect = span.getBoundingClientRect();
      if (rect.width > maxWidth) maxWidth = rect.width;
      wordHeight = rect.height;
    });

    setDims({ width: maxWidth, height: wordHeight });
  }, []);

  useEffect(() => {
    if (!dims || !stackRef.current) return;

    const n = WORDS_REVERSED.length;
    const step = 100 / n;

    const ctx = gsap.context(() => {
      gsap.set(stackRef.current, { yPercent: -(n - 1) * step });

      const tl = gsap.timeline({ repeat: -1 });
      for (let i = n - 2; i >= 0; i--) {
        tl.to(stackRef.current, { yPercent: -i * step, duration: 0.45, ease: 'power3.inOut' }, '+=2.5');
      }
      tl.call(() => gsap.set(stackRef.current, { yPercent: -(n - 1) * step }), [], '+=2.5');
    });

    return () => ctx.revert();
  }, [dims]);

  const wordStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: serif,
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-0.015em',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <span style={{
        position: 'absolute',
        width: 1,
        height: 1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
      }}>
        {WORDS_REVERSED.slice(0, -1).join(', ')}, and {WORDS_REVERSED[WORDS_REVERSED.length - 1]}
      </span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'text-bottom',
          visibility: dims ? 'visible' : 'hidden',
          width: dims?.width,
          height: dims?.height,
        }}
      >
        <span ref={stackRef} style={{ display: 'flex', flexDirection: 'column' }}>
          {WORDS_REVERSED.map((word, i) => (
            <span
              key={word}
              ref={el => { wordRefs.current[i] = el; }}
              style={wordStyle}
            >
              {word}
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
