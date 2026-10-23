# 4b. Design

> Prompt templates for step 4b: the design reference a visual feature needs before SHAPE, and the per-wave board brief SHAPE writes at step 5. Skip this file for APIs, business logic, backend services and infrastructure.

Design runs in two places, and they answer different questions.

| Prompt | When | Answers | Output |
| ------ | ---- | ------- | ------ |
| Design Reference | Once per feature, after the feature brief, before SHAPE | What does the whole feature look like, and what are its parts called? | `docs/design-system/` |
| Board Brief | Per wave, at SHAPE step 5 | Which boards does THIS wave's build need, fed by which fields? | `docs/shaping/[FEATURE]/shape/wave-[N]/design-brief.md` |
| Design Review | After each design turn | Did the turn answer the brief, and nothing wider? | `docs/shaping/[FEATURE]/shape/wave-[N]/design-review.md` |

Why two steps: a feature that ships over several waves grows its surface each wave. A design drawn once for the whole feature gives the build boards it cannot feed yet. A design briefed only per wave re-derives tokens and names every turn. The reference fixes names once; the brief fixes scope per wave.

---

### Design Reference

**When to use:** The feature brief exists and the feature has a visual surface.
**Produces:** `docs/design-system/` -- tokens, screen inventory, states, and copy bank. IMPLEMENT and VERIFY read it.

```
Read docs/shaping/[FEATURE-NAME]/feature-brief.md and docs/context/ui-context.md.
If docs/design-system/ already has files, extend them. Never rename an existing token or screen.

Write four files in docs/design-system/:

1. tokens.md -- every colour, type size, weight, radius and spacing value, as a table:
   | Name | Value | Lands on | Contrast |
   Name tokens by intent (ink, muted, accent, surface), never by hue.
   Give every text colour its contrast ratio against each background it lands on.
   A colour below 4.5:1 is marked "large text only" or replaced.

2. screens.md -- one row per screen the feature brief's flows reach:
   | Screen ID | Screen | Reached from (flow step) |
   Screen IDs are stable anchors. Boards, specs and reviews cite them.

3. states.md -- for every screen: empty, loading, error, and one state per named
   alternative flow in the brief. A state with no flow behind it is a question for me,
   not a state to draw.

4. copy.md -- every user-facing string, keyed by screen ID and state.

Rules:
- Every element names the field that feeds it, from the brief or docs/entity-model.md.
  An element with no field is a question for me, not an element.
- Do not assign screens or states to waves. Waves do not exist until SHAPE step 4.
  The Board Brief assigns them, one wave at a time.
- No boards yet. This file set is the vocabulary boards are drawn in.
```

---

### Board Brief

**When to use:** SHAPE step 5, once the wave's slices and their specs exist, for any slice with a visual surface.
**Produces:** One design brief per wave. The designer (a person, or a design tool such as Claude Design) draws boards from it.

```
Read the specs for wave [N] in docs/shaping/[FEATURE-NAME]/specs/ (or the UC-<n> files the
loop contract lists), their plans in shape/wave-[N]/, the wave order in
shape/[FEATURE-NAME]-slices.md, and docs/design-system/.

Write docs/shaping/[FEATURE-NAME]/shape/wave-[N]/design-brief.md:

1. Board list. One board per screen state this wave builds, each with an anchor ID
   (screen ID + state, e.g. home-waiting). Nothing else.
2. For each board: the screen ID, the state, the spec flow it shows, and the data
   contract that feeds it -- every field by name.
3. Draw the tokens board first. Every other board uses only its values.
4. Any element the wave's contract cannot feed goes on a separate board captioned
   "Wave [M]" -- or is left out. It never appears on a board this wave builds.
5. List what is NOT on any board this wave, with the wave that adds it. Take the wave
   from the slices document. If no slice in any wave reaches a state, ask.
6. Owner inputs. List each board whose fields today's data cannot fill, with the step a
   person takes to fill them (e.g. "run the Kelly notebook on one explored name"). Write
   "Owner inputs: none" when every board can be fed by the wave's build.

Rules the brief states to the designer, word for word:
- "Every element on a wave [N] board maps to a named field in the contract listed for it."
- "Anything else goes on a board captioned with its wave, or is left out."
- "Draw the tokens board first; the review reads values and contrast from it."
- "Return exactly the boards listed, by anchor. Name any board you add and why."
```

---

### Design Review

**When to use:** A design turn has come back.
**Produces:** A review that maps every returned board to the brief, and a greppable extract.

```
Read shape/wave-[N]/design-brief.md and the returned boards.

1. Extract first. A design canvas is often one bundled file that grep cannot read.
   Dump each board's visible text and the computed styles of its key elements to
   shape/wave-[N]/design/boards-extract.md, and commit it beside the canvas.
2. Map every board to a brief anchor. Report three lists:
   - Answered: anchor -> board.
   - Missing: anchors with no board. Ask for them by anchor in the next turn.
   - Extra: boards with no anchor. Each is either logged as drift against the
     design reference, or recorded as a later-wave board. Never built this wave.
3. For every element on an answered board, name its field. An element with no field
   is removed from this wave's board, not built.
4. Check every colour against tokens.md. A value outside the token sheet is a
   friction signal with root cause SPEC, or a token the reference must add.

Write shape/wave-[N]/design-review.md. Update docs/design-system/ only through a
decision I make on the review -- the reference changes on purpose, never by drift.
```

---

Origin: MA Carlton, Wave 0 (2026-09-13 to 2026-09-19). Four briefing rounds, one design turn that returned 14 boards for an 8-board brief, and a final turn spent removing elements the build could not feed. The rules above are its friction signals `design-turn-answers-wider-brief`, `design-board-colours-outside-tokens` and `design-canvas-not-greppable`, and its pattern `design-board-extract`.
