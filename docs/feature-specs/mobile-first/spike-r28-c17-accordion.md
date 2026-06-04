## R28 × C17 Spike: Accordion mode switch — container query vs. useIsMobile()

### Context

R28 says: "Behavior mode switches (nav collapse, accordion vs. expanded) use `@container` queries — each component declares `container-type: inline-size` on its wrapper and reacts to its own available width."

C17 says: the `PainItem` accordion and Process steps use `useState(open)` for individual item state, and `useIsMobile()` to render a static always-open version on desktop.

These conflict for the **mode switch** (accordion mode vs. always-open mode). R28 requires `@container`; C17 uses `useIsMobile()`. The fit check marks C as ✅ for R28, but the mechanism in C17 doesn't actually satisfy it. The accordion slice needs a firm answer before implementation starts — otherwise R6 (no SSR hydration mismatch) may also be violated.

### Goal

Determine the concrete layer split: what `@container` owns vs. what JS owns; confirm the approach is SSR-safe; and decide whether R28 needs to be narrowed or C17 needs to be rewritten.

### Questions

| # | Question |
|---|----------|
| **Q1** | What is the HTML/CSS structure needed for the accordion? Specifically: can the description element be hidden/shown by CSS alone (e.g. `max-height`, `grid-template-rows`) in response to a `@container` query, while JS only toggles an `open` class? |
| **Q2** | Does rendering `useState(false)` as the initial server value (description collapsed) and then hydrating match what the browser renders at mobile widths — or does the `useIsMobile()` check cause a layout shift / hydration mismatch? |
| **Q3** | If `@container` drives the mode switch (accordion mode ↔ always-open), and `useState` drives which items are open within accordion mode — what is the component tree? Does `@container` hide the toggle button and force `display:block` on the description on wide containers? |
| **Q4** | "Process step 1 open by default" requires step 1 to render expanded while steps 2–4 render collapsed, on first paint at mobile width. Can this initial state be set server-side (via `useState(index === 0)`) without triggering a hydration mismatch? |
| **Q5** | Does the `@container` threshold for "accordion mode" (520px per the shaping doc) match the point at which the pain card / process step grid is 1-column? If not, could a card in a 2-column layout be in accordion mode — is that acceptable? |
| **Q6** | Should R28 be narrowed in the shaping doc? Specifically: does "accordion vs. expanded" mean the entire mode switch is container-driven, or only the structural/visual mode — with individual item open/close state remaining JS-only? |

### Acceptance

Spike is complete when all questions are answered and we can describe: the exact layer split between `@container` and `useState`, how the component avoids SSR hydration mismatch for both the mode switch and the per-item default open state, and whether R28 requires an amendment before slicing begins.

---

## Findings

### Q1 — HTML/CSS structure

The key insight: never conditionally render two different component trees based on `useIsMobile()`. Instead, render a **single accordion HTML structure always** — the same markup on server and client. CSS `@container` drives what is visible; JS drives which items are open.

```
<section class="pain-cards" style="container-type: inline-size">
  <div class="pain-item" data-open="true | false">
    <div class="pain-item__header">
      <h3>Title</h3>
      <button class="pain-item__toggle" aria-expanded="...">+</button>
    </div>
    <div class="pain-item__body">   ← overflow: hidden
      <div class="pain-item__inner">Description</div>
    </div>
  </div>
</section>
```

Collapse/expand via `grid-template-rows` (the C17 mechanism):
```css
.pain-item__body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 350ms ease;
}
.pain-item[data-open="true"] .pain-item__body {
  grid-template-rows: 1fr;
}
.pain-item__inner { overflow: hidden; }
```

Desktop override via `@container`:
```css
@container (min-width: 520px) {
  .pain-item__toggle { display: none; }
  .pain-item__body   { grid-template-rows: 1fr !important; }
}
```

This is the clean layer split:
- **`@container`** owns: whether the toggle button is shown, and whether the body is forced open
- **`data-open` attribute** (set by JS `useState`) owns: which individual items are open on narrow containers

### Q2 — `useIsMobile()` and hydration mismatch

The mismatch only occurs if you do:
```tsx
// WRONG — different HTML trees on server vs client
isMobile ? <AccordionItem /> : <StaticItem />
```

With the single-structure approach (Q1), there is **no conditional rendering** — the same HTML is always emitted. `data-open` is set from `useState`, which has the same initial value on server and client. No hydration mismatch.

`useIsMobile()` is **not needed at all** for the accordion. Remove it from C17. `@container` handles the mode switch entirely in CSS.

### Q3 — Component tree

```tsx
function PainItem({ pain, index, defaultOpen = false }: {...}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pain-item" data-open={String(open)}>
      <div className="pain-item__header">
        <h3>{pain.t}</h3>
        <button
          className="pain-item__toggle"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <span style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 250ms' }}>+</span>
        </button>
      </div>
      <div className="pain-item__body">
        <div className="pain-item__inner">
          <p>{pain.n}</p>
        </div>
      </div>
    </div>
  );
}
```

Pain cards section wrapper gets `container-type: inline-size`. Same pattern for process steps.

### Q4 — `useState(index === 0)` and SSR safety

Safe. The initial `open` value is deterministic at render time — it depends only on `index`, not on `window` width. Server renders step 1 with `data-open="true"`, steps 2–4 with `data-open="false"`. Client hydrates with identical values. No mismatch.

The only way this breaks is if `defaultOpen` depends on `window.innerWidth` (i.e. `useIsMobile()`). Since it does not — it depends only on array index — SSR is clean.

### Q5 — 520px threshold vs. grid wrap point

Pain card grid: `repeat(auto-fit, minmax(min(100%, 220px), 1fr))` → wraps to 1-column when the container is narrower than 440px (2 × 220px). Accordion threshold: 520px.

This means there is a **gap band at 440–520px** where the grid is already 1-column but the accordion toggle is still hidden (desktop mode). This is intentional and acceptable — the 520px threshold gives generous breathing room above the wrap point. A pain card in a 1-column layout above 520px shows its full description, which is the better experience.

For process steps: same grid floor (220px), same logic applies. Acceptable.

### Q6 — R28 amendment

**Yes, R28 should be narrowed in the shaping doc.** The current wording conflates two separate concerns:

| Layer | What it owns | Mechanism |
|-------|-------------|-----------|
| `@container` | Mode display — whether the toggle button is visible, whether descriptions are forced expanded | CSS `@container (min-width: 520px)` |
| `useState` | Item state — which individual items are open within accordion mode | JS, server-safe initial value |

Proposed R28 amendment:

> `@container` queries drive the **mode switch** for nav collapse and accordion/expanded display — each component declares `container-type: inline-size` on its wrapper and CSS reacts to its own available width. Individual accordion item open/close state is managed by `useState` with a deterministic server-safe initial value; `useIsMobile()` is not used for any structural render branch.

This eliminates the conflict with C17 without weakening R28's intent.

### C17 rewrite

C17 in the shaping doc should be updated to reflect the layer split:

**C17 (revised)** — `PainItem` and Process step accordion: each item is a single always-rendered structure; `useState(defaultOpen)` (pain cards: `false`; process step 0: `true`, steps 1–3: `false`) drives `data-open` attribute; `grid-template-rows: 0fr → 1fr` CSS transition on `.pain-item__body`; rotating `+` indicator via `transform: rotate(45deg)` on `data-open="true"`; `@container (min-width: 520px)` in `globals.css` sets `.pain-item__toggle { display: none }` and `.pain-item__body { grid-template-rows: 1fr !important }` — no `useIsMobile()` used.

### Tailwind v4 note

The project uses **Tailwind v4** (`@tailwindcss/postcss ^4.0.0`). Tailwind v4 supports `@container` queries natively without a plugin. The `container-type: inline-size` utility is available as `@container` in v4. The pain card grid column definition as a Tailwind arbitrary value (`[grid-template-columns:repeat(auto-fit,...)]`) is unchanged — that's a static CSS value, not a container query.

Container query rules (accordion hide/show, sidebar layout switches) go in `globals.css` as plain `@container` at-rules — they do not need Tailwind utility class syntax.
