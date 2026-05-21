---
shaping: true
slice: 1
---

# Hero Word Rotation — Slice 1 Implementation Plan

Static shell with dimension lock. Parts A1–A4. No animation.

**Depends on:** Nothing — this is the first slice.  
**Demo:** H1 renders "We build the *digital products* you need to grow." — identical in appearance to current, but the word sits inside a locked clip container. No reflow on inspect or resize.

---

## Step 1 — Install GSAP

```bash
pnpm add gsap
```

Install now (even though GSAP is not used until Slice 2) so the package is available for import in Slice 2 without a second install step.

**Verify:** `package.json` shows `"gsap": "^3.15.0"` in dependencies.

---

## Step 2 — Create `components/RotatingWord.tsx`

Create a new file. This is a `"use client"` component — it uses `useLayoutEffect` and `useRef`.

```tsx
'use client';

import { useLayoutEffect, useRef, useState } from 'react';

const WORDS_REVERSED = ['growth tools', 'web apps', 'landing pages', 'digital products'];
// Reversed so that animating yPercent toward 0 (in Slice 2) produces a
// downward slide — each new word enters from above.

interface Props {
  serif: string;
}

export default function RotatingWord({ serif }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
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
      wordHeight = rect.height; // all words are same font/size — any one will do
    });

    setDims({ width: maxWidth, height: wordHeight });
  }, []);

  const wordStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: serif,
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-0.015em',
    whiteSpace: 'nowrap',
  };

  return (
    <span
      ref={containerRef}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'text-bottom',
        width: dims ? dims.width : undefined,
        height: dims ? dims.height : undefined,
      }}
    >
      <span /* word stack — GSAP target in Slice 2 */
        style={{ display: 'flex', flexDirection: 'column' }}
      >
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
  );
}
```

### Constraints

- `WORDS_REVERSED` order is load-bearing for the Slice 2 animation. Do not change it.
- `useLayoutEffect` fires synchronously before the browser paints — this is intentional (satisfies R6). The `dims` state being `null` on the server (SSR) is fine: the server renders without explicit width/height, and the client locks dimensions before the first visible frame.
- `wordHeight` can be taken from any one span because all words share the same `fontFamily`, `fontSize` (inherited from the `<h1>`), and `lineHeight`.
- Do not add `width: 100%` or any flex-grow on the clip container — it must shrink to the measured word width.

---

## Step 3 — Wire `RotatingWord` into `Hero` in `PortfolioClient.tsx`

`RotatingWord` needs `serif` (the current font stack string) passed as a prop. `Hero` already receives `fonts: FontSet`.

### 3a — Import the component

At the top of `PortfolioClient.tsx`, add:

```tsx
import RotatingWord from './RotatingWord';
```

### 3b — Replace the static span in `Hero`

Current code (~line 232–234):

```tsx
We build the{' '}
<span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.015em' }}>digital products</span>{' '}
you need to grow.
```

Replace with:

```tsx
We build the{' '}
<RotatingWord serif={fonts.serif} />{' '}
you need to grow.
```

The `{' '}` spacing tokens on either side must be preserved — they prevent the word from collapsing against "the" and "you".

---

## Step 4 — Demo check

Run the dev server (`pnpm dev`) and verify:

- [ ] H1 reads "We build the *digital products* you need to grow." — visually identical to before
- [ ] Italic serif weight and letter-spacing match the previous static span
- [ ] No CLS: open DevTools → Performance → record page load → CLS score is 0 (or unchanged from before)
- [ ] Inspect the clip container in DevTools: it has an explicit `width` and `height` in px (not `auto`) — confirms `useLayoutEffect` ran
- [ ] Resize the viewport: H1 wraps naturally, clip container holds its measured width
- [ ] No console errors or React warnings

---

## Files touched

| File | Action |
|------|--------|
| `components/RotatingWord.tsx` | Create |
| `components/PortfolioClient.tsx` | Edit — import + swap static span |
| `package.json`, `pnpm-lock.yaml` | Edit — gsap added |
