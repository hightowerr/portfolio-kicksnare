@AGENTS.md

# CLAUDE.md

## Application Building Context

<!-- PER PROJECT: edit the file list to match docs/context/. Keep the read-in-order instruction. -->

Read these files **in order** before implementing or making any architectural decision:

1. `docs/context/project-overview.md` — product definition, goals, features, and scope
2. `docs/context/architecture-context.md` — system structure, boundaries, storage model, and invariants
3. `docs/context/ui-context.md` — theme, colors, typography, canvas design, and component conventions
4. `docs/context/code-standards.md` — implementation rules and conventions
5. `docs/context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `docs/context/progress-tracker.md` — current phase, completed work, open questions, and next steps
7. `docs/context/current-issues.md` — the parking lot: open issues, decisions owed, baseline errors

Update `docs/context/progress-tracker.md` after each meaningful implementation change. If implementation changes the architecture, scope, or standards in the context files, update the relevant file before continuing.

The design system (CSS tokens, component previews, JSX examples) lives in `docs/context/design-system/project/`.
The domain glossary lives in `CONTEXT.md`. Structural decisions live in `docs/adr/`.

## Environment

<!-- PER PROJECT -->

- **Platform:** WSL2 / Ubuntu on Windows — use bash/Unix commands only
- **Package manager:** `pnpm` (never `npm`)
- **Check command:** `pnpm check` — lint and type-check in one command
- **Paths:** forward slashes; never Windows-style paths

## Feature Engineering Loop

<!-- FIXED: fill [SPEC-ANCHORED-DOMAINS] only. -->

Follow `AI engineering feature loop.md` for all feature builds. It defines a 5-phase cycle:
SHAPE → IMPLEMENT → VERIFY → DRIFT AUDIT → RETRO.

For the four steps *before* a spec exists — define the problem, run the A3, score the fog, then
grill or open a Wayfinder map — see `prompts/04a-problem-space.md`.

**Session start** — read these before doing anything:

1. `docs/loops/feature-loop-contract.md` — current wave, phase, gates, and backlog
2. `docs/loops/work-log.md` (last 10 entries) — what happened in recent sessions
3. `docs/signals/` — drift, friction, and patterns from prior runs

**Rigor**: each feature is set `spec-first` or `spec-anchored` at SHAPE, not per project.
Spec-anchored covers none at present: this is a static portfolio site with no stateful flow. Set it per feature at SHAPE if a contact, booking or payment flow ever carries state.
A spec-anchored slice is written as a use case in `docs/use-cases/`, carries stable `AC-` criterion
IDs, a verification command per criterion, a persisted test, and a human gate.

### Non-negotiable rules

<!-- FIXED: all 15 rules, verbatim. Fill [CHECK-COMMAND] only. Add project rules below, not here. -->

1. **NEVER self-verify.** Implementing agents do not test their own work. Verification is Phase 3, run by a separate agent in a fresh session.
2. **Spec = behaviour, plan = structure.** Never write files, props, or data shapes into a spec. [spec-anchored] the spec is a `UC-<n>` use case with Failure Postconditions and `BR-<n>` rules.
3. **Acceptance criteria name the actor as the first word** — *System*, *User*, or a named external actor. Present tense, max 20 words.
4. **A spec-anchored slice without `shape:approved` in the loop contract is not implemented.** Presence of a plan is not approval.
5. **A behaviour deviation on a spec-anchored slice is a decision owed.** Stop, log it to `docs/context/current-issues.md`, count it as an ambiguity stop, and ask.
6. **The verifier runs each criterion's verification command.** The exit code is the evidence. Trajectory flags are friction signals, not blockers — unless they are hallucinated dependencies, which are FAILs.
7. **Run `pnpm check` plus `bash scripts/blocklist-grep.sh` after EVERY slice**, not after the whole wave. Fast feedback catches issues before they compound.
8. **Classify drift by layer and label in Phase 4.** Plans adapt to code. A spec changes only through EVOLUTION with re-approval, or sends a SHORTCUT back to IMPLEMENT. If shortcuts exceed 50% of divergences, flag it — the system is drifting.
9. **Log friction to `docs/signals/friction/`** when implementation hits unexpected walls. Never silently accept a shortcut. Friction the loop itself caused is root cause LOOP — RETRO sends it to `loop-upstream`.
10. **Phase 1 (SHAPE) MUST invoke the `/shaping` skill.** All shaping work follows its methodology — R/S notation, fit checks, breadboarding, multi-level document consistency.
11. **Phase 5 (RETRO) MUST apply queued architecture updates.** Check the build order and specs for "Architecture Context Updates Needed" sections and apply them to the context files. Do not defer — the loop is not complete until the context files reflect the implementation.
12. **Append a work-log entry when your session ends**: what you picked up, what you did, what you could not resolve, shaping minutes, and ambiguity stops.
13. **STE for all documentation output** — max 20 words per instruction, 25 per explanation, active voice, no contractions, controlled vocabulary. Acceptance criteria and flow steps are the one exception (rule 3).
14. **Every base commit a Verify line names is the wave base.** TRIGGER asserts it against the contract. A guard anchored on an older commit reports other sessions' work. A guard that diffs a base against `HEAD` widens with every later commit, so scope it to the wave's own commits.
15. **A wave commit stages only the paths its plans name.** List the staged paths against the union of the slice plans' Files-to-modify and stop on anything outside it. On a shared working tree a path-scoped `git add` still takes another session's edits to the same file.

### Project rules

<!-- PER PROJECT: rules this codebase needs beyond the 15. Number them P1, P2, ... so they never
     renumber the non-negotiable rules. -->

- **P1. Pre-adoption features are history.** The five features under `docs/feature-specs/` were shaped before the loop. They are plans by rule, read-only. New features go under `docs/shaping/<feature>/`.
- **P2. Case study pages are hand-written TSX** composed from shared primitives (`docs/adr/0001`). Do not build a data-driven case study renderer.
- **P3. Do not modify foundation components** (`components/ui/*`, third-party internals) unless a plan names them.
- **P4. Playwright is the verifier's browser.** A verify report on a visual slice cites a Playwright run at 390, 1024 and 1440 px, not a description.

## Hub budget

<!-- FIXED -->

This file stays under 150 lines. RETRO prunes it: would removing this line cause the agent to make
mistakes? If no, remove it or move it to a spoke. The hard ceiling is 400 lines — an agent reads
the first third.

## When It Gets Long — Split It

<!-- PER PROJECT: list only spoke files that exist in this repo. -->

CLAUDE.md (the hub)
├── "See docs/context/project-overview.md for product definition and scope"
├── "See docs/context/architecture-context.md for system structure and invariants"
├── "See docs/context/code-standards.md for implementation rules"
├── "See docs/context/anchored-criteria.md for the AC-ID registry"
├── "See docs/context/design-system/project/ for UI components and tone of voice"
├── "See CONTEXT.md for the domain glossary and docs/adr/ for structural decisions"
├── "See AI engineering feature loop.md for the full build loop"
└── "See docs/loops/feature-loop-contract.md for current build state"
