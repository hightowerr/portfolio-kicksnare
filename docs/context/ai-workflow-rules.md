# AI Workflow Rules

The Feature Engineering Loop (`AI engineering feature loop.md`) owns the build cycle. This file holds the scoping and delivery rules that apply inside every phase.

## Scoping
- Implement only what the spec describes. Do not refactor surrounding code, add abstractions, or design for hypothetical requirements.
- When you have enough information to act, act. Do not re-derive facts already established.
- Work on one slice at a time. Split a slice that mixes UI changes with data-model changes, or that cannot be verified end to end quickly.

## When to stop and ask
- A behaviour deviation on a spec-anchored slice is a decision owed. Stop and ask.
- A rule the spec does not state, that you would have to invent, is a decision owed.
- A requirement that is missing from the context files goes into `docs/context/current-issues.md` as an open question before work continues. Do not invent product behaviour.

## Delivery
- One slice, one agent, one worktree.
- Fast feedback after every slice, never at the end of a wave: `pnpm check` and `bash scripts/blocklist-grep.sh`.
- Protected foundation components stay default: `components/ui/*` and third-party library internals. Put project styling and feature logic in app-level components. Modify a foundation component only when a plan names it.

## Keeping docs in sync
- Update the relevant context file when implementation changes the architecture, boundaries, storage model, conventions or feature scope. RETRO applies anything queued.
- `docs/context/progress-tracker.md` reflects the actual state of the implementation, not the intended state.

## Pre-adoption history
- `docs/feature-specs/` holds the five features shaped before the loop (audit-fig, evoltage-case-study, hero-word-rotation, lets-talk-rework, mobile-first). They are plans by rule and read-only. New features start under `docs/shaping/<feature>/` from `prompts/04a-problem-space.md`.
