# Loop templates

Copy a template into place, then fill every `<placeholder>`. These are the artifact formats the loop
document specifies in Phase 1 step 5. The phase prompts themselves stay in `AI engineering feature loop.md`
— do not copy them here, or they become one more copy that can drift.

| Template | Copy to | Phase | Written by |
|----------|---------|-------|------------|
| `use-case.md` | `docs/use-cases/UC-<n>-<goal-in-kebab-case>.md` | SHAPE step 5 | Shaping session. [spec-anchored] behaviour only. |
| `spec.md` | `docs/shaping/<feature>/specs/<slice>.md` | SHAPE step 5 | Shaping session. [spec-first] behaviour only, one file per slice. |
| `plan.md` | `docs/shaping/<feature>/shape/wave-<N>/<slice>-plan.md` | SHAPE step 5 | Shaping session. Structure for every slice. |

## Worked signal examples

| Example | Shape for | Written in |
|---------|-----------|------------|
| `signal-drift.example.md` | `docs/signals/drift/<spec-slug>.md` | DRIFT AUDIT |
| `signal-friction.example.md` | `docs/signals/friction/<topic>.md` | IMPLEMENT, relabelled in RETRO |
| `signal-pattern.example.md` | `docs/signals/patterns/<pattern-name>.md` | RETRO |

They live here, not in `docs/signals/`, because SHAPE reads every file in `docs/signals/` as a real signal.

The feature brief (`docs/shaping/<feature>/feature-brief.md`) is not a spec. It comes from
`prompts/04a-problem-space.md` and covers the whole feature. SHAPE cuts it into slices.

## Checks every shaping session runs

- `bash scripts/blocklist-grep.sh` exits 0. It covers `docs/use-cases/UC-*.md` and `docs/shaping/*/specs/`, never plans.
- [spec-anchored] Every noun in a use case exists in `docs/entity-model.md`. Extending the entity model is part of the slice.
- [spec-anchored] The decisions-owed list is empty for every slice before its gate is set.

Adapted from the templates MA Carlton wrote when it adopted loop v2.2 (2026-09-23).
