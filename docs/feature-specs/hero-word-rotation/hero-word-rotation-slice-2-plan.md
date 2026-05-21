---
shaping: true
slice: 2
---

# Hero Word Rotation — Slice 2 Implementation Plan

GSAP animation + accessibility. Parts A5–A6.

**Depends on:** Slice 1 merged and demoed — `RotatingWord.tsx` exists with the clip container, word stack, and dimension lock in place.  
**Demo:** Words cycle downward through the four alternatives. H1 never reflows. Screen reader receives the static sentence.

---

## Step 1 — Add GSAP import and a stack ref to `RotatingWord.tsx`

GSAP is already installed (Slice 1). Add the import and promote the word-stack `<span>` to a named ref.

```tsx
import gsap from 'gsap';
```

Add `stackRef` alongside the existing refs:

```tsx
const stackRef = useRef<HTMLSpanElement>(null);
```

Attach it to the inner stack span:

```tsx
<span
  ref={stackRef}
  style={{ display: 'flex', flexDirection: 'column' }}
>
```

---

## Step 2 — Add the GSAP timeline in a `useEffect`

Add this effect **after** the existing `useLayoutEffect`. It depends on `dims` being set (dimension lock from Slice 1) — the timeline must not run before the container has its locked size.

```tsx
useEffect(() => {
  if (!dims || !stackRef.current) return;

  const ctx = gsap.context(() => {
    // Position the stack so "digital products" (last item, index 3) is visible.
    // With 4 words each occupying 25% of the stack height:
    //   yPercent -75 → top of item 3 aligns with top of clip window.
    gsap.set(stackRef.current, { yPercent: -75 });

    gsap.timeline({ repeat: -1 })
      // Hold on "digital products" for 2.5 s, then slide to "landing pages"
      .to(stackRef.current, { yPercent: -50, duration: 0.45, ease: 'power3.inOut' }, '+=2.5')
      // Hold on "landing pages" for 2.5 s, then slide to "web apps"
      .to(stackRef.current, { yPercent: -25, duration: 0.45, ease: 'power3.inOut' }, '+=2.5')
      // Hold on "web apps" for 2.5 s, then slide to "growth tools"
      .to(stackRef.current, { yPercent: 0,   duration: 0.45, ease: 'power3.inOut' }, '+=2.5')
      // Hold on "growth tools" for 2.5 s, then instant-snap back and loop
      .call(() => gsap.set(stackRef.current, { yPercent: -75 }), [], '+=2.5');
  }, stackRef);

  return () => ctx.revert();
}, [dims]);
```

### Timeline trace (for reference)

```
t=0       gsap.set  → yPercent: -75   "digital products" visible
t=2.5     animate   → yPercent: -50   "landing pages" enters from above   (0.45s)
t=4.95    hold
t=5.45    animate   → yPercent: -25   "web apps" enters from above        (0.45s)
t=7.9     hold
t=8.4     animate   → yPercent:  0    "growth tools" enters from above    (0.45s)
t=10.85   hold
t=13.35   gsap.set  → yPercent: -75   instant snap back; loop repeats
```

### Constraints

- The `useEffect` dependency array is `[dims]` — the timeline is created once after the dimension lock resolves and never re-created (font pair switches are a separate concern; ignore for now).
- `gsap.context(fn, stackRef)` scopes the context to the stack element. `ctx.revert()` in the cleanup tears down all tweens and timelines created inside it — satisfies R4 (no leak on unmount/fast-refresh).
- `power3.inOut` is GSAP core's behavioural equivalent of the site's `cubic-bezier(.2,.7,.2,1)` at this duration. `CustomEase` (club plugin) is not required.
- The instant snap-back uses `.call()` at `+=2.5` (after the last hold) rather than a zero-duration `.to()` — this avoids GSAP's minimum-duration rounding at very short durations.

---

## Step 3 — Add `aria-hidden` to the clip container

The clip container already exists. Add `aria-hidden="true"` so screen readers skip the cycling words entirely:

```tsx
<span
  ref={containerRef}
  aria-hidden="true"
  style={{ ... }}
>
```

---

## Step 4 — Add the visually-hidden accessible span

Add a sibling span **outside** the clip container (but inside the `RotatingWord` root fragment) that gives screen readers the stable sentence fragment "digital products".

The full component return should become a fragment:

```tsx
return (
  <>
    {/* visually hidden — screen reader reads "digital products" once */}
    <span
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
      }}
    >
      digital products
    </span>

    {/* animated clip container — hidden from screen readers */}
    <span
      ref={containerRef}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'text-bottom',
        width: dims ? dims.width : undefined,
        height: dims ? dims.height : undefined,
      }}
    >
      <span ref={stackRef} style={{ display: 'flex', flexDirection: 'column' }}>
        {WORDS_REVERSED.map((word, i) => (
          <span key={word} ref={el => { wordRefs.current[i] = el; }} style={wordStyle}>
            {word}
          </span>
        ))}
      </span>
    </span>
  </>
);
```

### Constraint

The visually-hidden span uses `position: absolute` — the parent `<h1>` is `position: static` by default, so the span pops out of flow and does not affect layout. This is correct and expected.

---

## Step 5 — Demo check

Run the dev server (`pnpm dev`) and verify:

- [ ] Words cycle in order: digital products → landing pages → web apps → growth tools → (repeat)
- [ ] Motion is a smooth downward slide — each word enters from above
- [ ] H1 surrounding text ("We build the" / "you need to grow.") does not shift during any transition
- [ ] Easing feels smooth, no bounce or spring
- [ ] Fast-refresh (edit and save any file): no GSAP console warnings about leaked contexts or orphaned tweens
- [ ] Open DevTools → Accessibility tree → the `<h1>` subtree shows "We build the digital products you need to grow." as a single readable string — no cycling words
- [ ] (Optional) Run axe DevTools: no violations on the hero section

---

## Files touched

| File | Action |
|------|--------|
| `components/RotatingWord.tsx` | Edit — add `stackRef`, `gsap` import, `useEffect` timeline, `aria-hidden`, visually-hidden span |
