# Feature Loop Contract

## Goal
Implement all specs in momentum-case-study wave 1. Verify each independently.
Audit drift with zero unresolved divergences. Log the retrospective.

## Current state
- Feature: momentum-case-study
- Brief: `docs/feature-specs/momentum-case-study/A3.md` (A3 grilled and approved 2026-09-10). `docs/shaping/momentum-case-study/feature-brief.md` is owed by `prompts/04a-problem-space.md` step 4a before SHAPE.
- Surface: frontend
- Rigor: spec-first
- Spec-anchored domains: none. A static portfolio site with no stateful flow.
- Client build: no
- Brownfield: yes. Recovery not required: spec-first, no use cases, no entity model.
- Wave: 1 of ? (the A3 build sequence V0 to V5 is re-sliced at SHAPE)
- Phase: SHAPE (pending). TRIGGER ran 2026-10-23 at adoption.
- Specs in scope: none yet. SHAPE writes them to `docs/shaping/momentum-case-study/specs/`.
- Use cases in scope: none (spec-first)
- Loop copy: `AI engineering feature loop.md`, v2.5 amended 2026-10-11, source sha256 `f2086d99679c`
- Loop upstream: `/mnt/d/Dropbox/Obsidian/second-brain/docs/signals/friction/`, filed as `kicksnare--<topic>.md`
- Governed paths: `docs/shaping/`, `docs/loops/`, `docs/signals/`, `docs/context/`, `CLAUDE.md`
- Pre-adoption: `docs/feature-specs/` (audit-fig, evoltage-case-study, hero-word-rotation, lets-talk-rework, mobile-first). Plans by rule, read-only. Not covered by the blocklist grep.
- Wave base: set at SHAPE from the commit the adoption PR merges at.

## Gates
One line per spec-anchored slice. The human edits this line by hand.
Presence of a plan is not approval.

- none (spec-first feature)

## Backlog
- Waves remaining: the A3 build sequence names V0 Content, V1 Primitives, V2 Route + S1/S2, V3 S3/S4 + OG, V4 Register, V5 Publish. SHAPE cuts these into waves.
- Blocked specs: V0 copy waits on the Momentum testimonial wording (granted in person 2026-10-23, wording unconfirmed). See `docs/context/current-issues.md`.

## Timeline
| Date | Wave | Phase | Duration | Shaping min | Ambiguity stops | Notes |
|------|------|-------|----------|-------------|-----------------|-------|
| 2026-10-23 | 1 | TRIGGER | adoption session | 0 | 0 | Starter kit v2.5 adopted over the existing spec-driven repo. Readiness checklist passed. |

## References
- Loop: `AI engineering feature loop.md` · Problem space: `prompts/04a-problem-space.md` · Design: `prompts/04b-design.md`
- Architecture: `docs/context/architecture-context.md`
- Design system: `docs/context/design-system/project/`
- Progress: `docs/context/progress-tracker.md`
- Issues: `docs/context/current-issues.md`
- Signals: `docs/signals/`
- Work log: `docs/loops/work-log.md`
- Templates: `docs/loops/templates/` · Heuristics: `docs/shaping/shaping-heuristics.md`
- Glossary: `CONTEXT.md` · Decisions: `docs/adr/`
- Adoption record and copy check: `docs/loops/adoption.md` and `scripts/loop-copies.py` in the vault that owns the loop document
