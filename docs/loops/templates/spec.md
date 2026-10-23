# Spec: <slice name>

> [spec-first] Behaviour of ONE slice. No files, routes, props, codes, or data shapes — those go in the plan.
> `bash scripts/blocklist-grep.sh` must exit 0.

- **Feature:** <feature> · **Slice:** <slice> · **Wave:** <N> · **Plan:** `shape/wave-<N>/<slice>-plan.md`
- **Brief:** `docs/shaping/<feature>/feature-brief.md` — the part of it this slice delivers: <one line>
- **Actors:** <roles named in docs/context/project-overview.md>
- **Goal:** <one sentence>

## Main success flow

<3-9 steps. Every step succeeds. Actor first.>

1. <Actor> <does something>.
2. System <responds>.

## Alternative flows

- **A1 — <what went wrong>.** Trigger: step <n>, <condition>. Ending: <resume at step n | ends>. Failure postcondition: <what stays unchanged>.

## Acceptance criteria

<Actor-first, present tense, max 20 words. One per main-flow outcome and one per alternative flow.
Each ends with `Verify:` and one command, or "manual" said plainly. A criterion about what the
user sees verifies the rendered page, never the page source.>

- **AC-<n>** — System <outcome>. Verify: `<command>`

## Non-goals

- <out of scope> — <why>
