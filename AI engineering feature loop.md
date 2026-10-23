 # Feature Engineering Loop v2.5

A closed engineering loop for building features with AI agents. Not a linear procedure — a cycle with a trigger, decision points, and an exit condition. Each run compounds into the next via shared signals and retrospectives.

**Premise: this loop never regenerates code from specifications.** Code persists across waves. Phase 2 implements new slices from new plans. An implemented slice's spec becomes a closed work order that must stay honest. An unimplemented spec stays an input that must stay true. Drift is therefore a ratio to watch here, not the defect it becomes in methods that re-execute a specification.

**Scaffold**: `starter-kit/` holds the executable form of this document — CLAUDE.md, the folder structure, and the signal schemas, ready to copy into a new project.

Sources (synthesis pages in the second-brain vault): Feature Loop Systems Review — analysis from loop engineering trilogy + Donella Meadows' systems dynamics. v2.2 folds in AIUP, use-case craft and the Definitive Guide. v2.3 (2026-09-24) applies the first project's feedback (MA Carlton): the feature brief is separated from slice specs, friction gains root cause LOOP with a `loop-upstream` path, and the starter kit ships templates and the blocklist script. v2.4 (2026-09-24) adds step 4b as `prompts/04b-design.md` (design reference once, board brief per wave), counts pattern reuse per slice so promotion can fire in a single-feature project, and makes the kit readable outside the vault. v2.5 (2026-09-24) states the brownfield condition once, grandfathers pre-v2.2 specs as plans, gives shaping heuristics a home and a prune rule, merges the work log entry by entry, and ships worked signal examples.

---

## Controlled Vocabulary

This document uses each term below with one meaning only. When you read or write content for this loop, use these terms — not synonyms.

| Term | Definition | Scope |
|------|-----------|-------|
| **phase** | One of the 5 stages of the loop: SHAPE, IMPLEMENT, VERIFY, DRIFT AUDIT, RETRO | Top-level loop stages only |
| **step** | A numbered action within a phase | Sub-actions inside a phase |
| **wave** | A batch of slices that the loop processes together in one cycle | Scheduling unit |
| **slice** | The smallest independently implementable unit of work. One slice = one plan file, one agent, one worktree | Work unit |
| **feature brief** | The problem-space output for one feature: goal, actors, flows, criteria and non-goals at feature level. SHAPE reads it and cuts it into slices. It is not a spec | `docs/shaping/<feature>/feature-brief.md` |
| **design reference** | [frontend/fullstack] The feature's tokens, screen inventory, states and copy bank in `docs/design-system/`, written once by `prompts/04b-design.md`. Boards cite its IDs | `docs/design-system/` |
| **spec** | A file that defines the **behaviour** of one slice: actors, flows, acceptance criteria, non-goals. Never files, props, or data shapes. Only SHAPE step 5 writes specs | `docs/shaping/<feature>/specs/` |
| **plan** | Implementation structure for one slice: files, components, props, data shapes. May adapt to code | `<slice-name>-plan.md` |
| **rigor** | `spec-first` or `spec-anchored`, set per feature at SHAPE | Phase 1 onward |
| **criterion** | One acceptance criterion. Spec-anchored criteria carry an ID `AC-<feature>-NNN` that is never reused | Specs and verify reports |
| **flow** | The main success flow, or a named alternative flow `A<n>`, inside a spec | Specs only |
| **use case** | [spec-anchored] One `UC-<n>` specification file in `docs/use-cases/`. System-level and permanent: it outlives the feature that introduced it, and a later feature edits it rather than replacing it | The unit a Status attaches to |
| **business rule** | A named, globally unique `BR-<n>` constraint, cited from the steps and flows that depend on it. Stated once | Spec-anchored specs |
| **postcondition** | Success and failure. The state the system guarantees when a flow ends | Seeds a persisted test's assertions |
| **status** | Per use case: Draft, Reviewed, Approved, Mid-life, Complete | Spec-anchored only |
| **gate** | The hand-edited `shape:approved` line in the loop contract | Between Phase 1 and Phase 2 |
| **verification command** | The command a verifier runs for one criterion. The exit code is the evidence | Written at SHAPE, run at VERIFY |
| **decision owed** | A rule the implementer would have to invent. Blocks a spec-anchored slice until the human answers | Phase 1 and Phase 2 |
| **signal** | A typed artifact (drift, friction, or pattern) that flows between loop iterations | Files in `docs/signals/` |
| **drift** | A divergence between a spec and the actual implementation | Measured in Phase 4 |
| **drift audit** | Phase 4: classifying every divergence by layer (PLAN or SPEC) and label (EVOLUTION or SHORTCUT), then applying the action each pair requires | Phase name only |
| **trajectory** | A qualitative assessment of how code was built — scope proportionality, pattern compliance, dependency hygiene, architectural alignment, and complexity | Phase 3, Step 3 only |
| **verify** | To confirm that implementation output meets acceptance criteria | Output correctness (Phase 3) |
| **check** | To inspect code quality or trajectory | Trajectory assessment (Phase 3, Step 3) |
| **issue** | An unresolved problem logged to `docs/context/current-issues.md` | All phases |
| **complete** | The state of a slice, wave, or feature after all exit conditions are met | Status label only |
| **run** | One full cycle of the loop (TRIGGER through RETRO) for a single wave | Loop iteration |
| **evolution** | A divergence where the implementation found a genuinely better approach | Phase 4 classification |
| **shortcut** | A divergence where the implementation took an easier path | Phase 4 classification |

---

## Writing Standard

All documentation this loop produces follows ASD-STE100 Simplified Technical English conventions:

1. **One meaning per term** — use only the terms in the Controlled Vocabulary table. Do not introduce synonyms.
2. **Sentence limits** — max 20 words for instructions (procedural). Max 25 words for explanations (descriptive).
3. **Active voice** — write "the agent verifies the output," not "the output is verified."
4. **One instruction per sentence** — do not bundle multiple actions. Use a vertical list if a step has sub-actions.
5. **Condition before command** — write "If the test fails, fix the issue." Not "Fix the issue if the test fails."
6. **Vertical lists** — when a sentence would list 3+ items, convert to a bulleted or numbered list.
7. **No contractions** — write "does not," not "doesn't."
8. **Acceptance criteria and flow steps are the exception to imperative form.** The first word names the actor — *System*, *User*, or a named external actor. Present tense. Max 20 words. Example: "System validates that the form is not empty." Reason: two agents read a criterion, and the imperative omits who holds the ball.

Rule 5 (condition before command) survives inside a criterion as the flow **Trigger:** line.

These rules apply to: shaping documents, spike findings, slice plans, spec edits, signal logs (drift, friction, patterns), work-log entries, verification reports, and progress-tracker updates.

Code, commit messages, and inline code comments are exempt.

---

## Project Profile

Set once when you adopt the loop. Gates conditional sections throughout.

```
surface: frontend | backend | fullstack
rigor-default: spec-first
spec-anchored-domains: [payment state, payouts, tenancy, availability, auth]   ← edit per project
client-build: yes | no          ← yes = specs land as a PR the client approves
brownfield: yes | no            ← yes = code exists before the loop. TRIGGER runs the recovery step
                                   for each use case a wave touches that has no baseline review
loop-upstream: <path>           ← docs/signals/friction/ in the repo that owns this loop document
```

- **frontend** — browser-rendered UI (website, SPA, PWA). Verification = Playwright.
- **backend** — API, CLI, worker, data pipeline. No browser. Verification = test suite + API assertions.
- **fullstack** — both. Verification = Playwright + test suite + API assertions.

`loop-upstream` is where RETRO sends friction whose root cause is `LOOP`. The loop document, its prompts and the starter kit improve only from signals that reach it.

---

## Prerequisite Folder Structure

Scaffold this once before the first run. The loop assumes these paths exist. The executable form is `starter-kit/` — copy it rather than building this by hand.

```
project-root/
├── docs/
│   ├── context/
│   │   ├── architecture-context.md    ← system structure, boundaries, invariants
│   │   ├── code-standards.md          ← implementation rules, conventions
│   │   ├── ui-context.md              ← [frontend/fullstack] theme, colors, typography, components
│   │   ├── api-context.md             ← [backend/fullstack] endpoints, schemas, auth, error codes
│   │   ├── progress-tracker.md        ← current phase, completed work, open items
│   │   ├── current-issues.md          ← parking lot for unknowns and TODOs
│   │   └── anchored-criteria.md       ← registry: AC-ID → criterion → verification command → test path → feature
│   │
│   ├── use-cases/                     ← [spec-anchored/brownfield] UC-<n>-<kebab-name>.md, one per use case,
│   │                                     named verbatim after its goal. System-level and permanent: survives
│   │                                     feature close with Status moved to Complete. UC and BR numbering is
│   │                                     global. A later feature edits an existing UC, never opens a second one.
│   ├── entity-model.md                ← [spec-anchored] Mermaid ER diagram + attribute tables. Every noun a
│   │                                     spec-anchored spec uses must exist here. Extended, never rewritten.
│   │
│   ├── design-system/                 ← [frontend/fullstack] design reference from prompts/04b-design.md:
│   │                                     tokens.md, screens.md, states.md, copy.md
│   │
│   ├── adr/                           ← architecture decision records; structural decisions that outlive one wave
│   ├── wayfinder/                     ← fog-clearing maps for high-fog features (workflow step 3b)
│   │
│   ├── shaping/
│   │   ├── shaping-heuristics.md      ← lessons from RETRO steps 2 and 4. Project-wide, pruned at step 7
│   │   └── <feature-name>/
│   │       ├── feature-brief.md       ← problem-space output (04a): the whole feature, before slicing
│   │       ├── specs/                 ← one spec per spec-first slice, written at SHAPE step 5 only
│   │       │                             (spec-anchored behaviour lives in docs/use-cases/; the wave
│   │       │                             folder keeps only the plan)
│   │       └── shape/
│   │           ├── <feature>-shape.md         ← shaping document (Phase 1 output)
│   │           ├── spike-<topic>.md           ← spike findings (Phase 1 output)
│   │           ├── <feature>-slices.md        ← slicing document (Phase 1 output)
│   │           └── wave-<N>/                  ← per-wave implementation plans
│   │               ├── <slice-name>-plan.md   ← individual slice plans
│   │               └── wave-<N>-summary.md    ← wave completion summary
│   │
│   ├── loops/
│   │   ├── feature-loop-contract.md   ← active loop state (current wave, backlog, timeline)
│   │   ├── work-log.md                ← append-only structured log of agent sessions
│   │   ├── templates/                 ← use case, spec and plan templates, plus one worked example per
│   │   │                                 signal type. Copy, then fill
│   │   └── blocklist-allowlist.txt    ← phrases the blocklist grep skips, each with a reason
│   │
│   └── signals/
│       ├── README.md                  ← signal schema (what goes where, format)
│       ├── drift/                     ← spec divergence logs (WHY it diverged)
│       ├── friction/                  ← recurring implementation pain points
│       └── patterns/                  ← reusable solutions discovered during implementation
│
├── scripts/
│   ├── blocklist-grep.sh              ← mechanism blocklist over specs and use cases. Never plans
│   └── merge-work-log.py              ← git merge driver: appends each new work-log entry with its separator
│
├── tests/
│   └── anchored/                      ← persisted tests for spec-anchored criteria, filed by AC-ID
│
├── .claude/
│   └── skills/                        ← patterns promoted from docs/signals/patterns/ in RETRO
│
├── .gitattributes                     ← parallel waves: work-log.md merges by entry, current-issues.md by union
├── CLAUDE.md                          ← agent rules (must reference this loop). Start from starter-kit/CLAUDE.md
└── src/ or app/                       ← implementation code
```

`docs/design-system/`, `docs/context/ui-context.md` and `docs/context/api-context.md` are surface-conditional. Their absence on a project of the other surface is correct, not a defect.

### Codebase readiness checklist

Verify before the first run. If any fail, fix them first — the loop depends on these.

- [ ] **Run command**: one command starts the app or test suite (`npm run dev`, `python manage.py runserver`, `go run .`, or equivalent). Agent must be able to spin up without cognitive load.
- [ ] **Lint + type-check**: `npm run lint` and `npm run type-check` (or equivalent) run clean with zero pre-existing errors. New errors must be attributable to new code only.
- [ ] **Verification tooling**:
  - *frontend/fullstack*: Playwright MCP installed and configured for browser automation.
  - *backend/fullstack*: test runner configured (`pytest`, `go test`, `npm test`, etc.) with a passing baseline. API client available (curl, httpie, or test framework HTTP assertions).
- [ ] **Git worktrees**: repo supports worktrees for parallel agent isolation. Parallel agents MUST NOT share a working directory.
- [ ] **Work-log merge driver**: run `git config merge.work-log.driver "python3 scripts/merge-work-log.py %O %A %B"` once per clone. Parallel waves then merge the work log with no conflict.
- [ ] **Blocklist grep available**: `bash scripts/blocklist-grep.sh` (shipped in `starter-kit/`) greps `docs/shaping/*/specs/` and `docs/use-cases/` for the mechanism blocklist — SMTP, JWT, token, bcrypt, hash, SHA, SQL, SELECT, INSERT, HTTP verbs, regex, stack names, exception names, identifiers, code spans, file paths. Edit its stack-name rule for your stack. It exits 0 on an empty `specs/`.
- [ ] **Pre-v2.2 specs moved**: specs written before the project adopted v2.2 mix behaviour with mechanism. They are plans by rule, not specs. Move each one out of `specs/` into `docs/shaping/<feature>/shape/` — its wave folder if it has one, else `shape/pre-adoption/`. Do not blocklist it. The blocklist covers specs written under v2.2 or later. The first run exits 0.
- [ ] **[brownfield]** Recovery complete: the use case diagram and the entity model are reverse-engineered from the running system into `docs/use-cases/` and `docs/entity-model.md`. Write full specifications only for the use cases about to change. Hold a baseline review with one engineer and one requirements owner. The diagram with empty boxes is the honest audit deliverable — a box with no specification behind it cannot be mistaken for one that has been reviewed.

---

## CLAUDE.md

The agent rules file must reference this loop, the context files, and the non-negotiable rules.

**Do not write it from scratch.** `starter-kit/CLAUDE.md` is the canonical file — copy it and fill
the placeholders. It is kept under 150 lines on purpose: an agent reads the first third of a long
hub, so Phase 5 prunes it every wave.

The rules below are reproduced here because this document argues for them. The starter kit is
where they are executed. If the two disagree, the starter kit is wrong and gets corrected.

### Non-negotiable rules

1. **NEVER self-verify.** Implementing agents do not test their own work. Verification is Phase 3, run by a separate agent in a fresh session.
2. **Spec = behaviour, plan = structure.** Never write files, props, or data shapes into a spec. [spec-anchored] the spec is a `UC-<n>` use case with Failure Postconditions and `BR-<n>` rules.
3. **Acceptance criteria name the actor as the first word** — *System*, *User*, or a named external actor. Present tense, max 20 words.
4. **A spec-anchored slice without `shape:approved` in the loop contract is not implemented.** Presence of a plan is not approval.
5. **A behaviour deviation on a spec-anchored slice is a decision owed.** Stop, log it to `docs/context/current-issues.md`, count it as an ambiguity stop, and ask.
6. **The verifier runs each criterion's verification command.** The exit code is the evidence. Trajectory flags are friction signals, not blockers — unless they are hallucinated dependencies, which are FAILs.
7. **Run lint, type-check and `bash scripts/blocklist-grep.sh` after EVERY slice**, not after the whole wave.
8. **Classify drift by layer and label in Phase 4.** Plans adapt to code. A spec changes only through EVOLUTION with re-approval, or sends a SHORTCUT back to IMPLEMENT. Shortcuts above 50% of divergences get flagged.
9. **Log friction to `docs/signals/friction/`.** Never silently accept a shortcut. Friction the loop itself caused is root cause LOOP — RETRO sends it to `loop-upstream`.
10. **Phase 1 (SHAPE) MUST invoke the `/shaping` skill.**
11. **Phase 5 (RETRO) MUST apply queued architecture updates.** Do not defer — the loop is not complete until the context files reflect the implementation.
12. **Append a work-log entry when your session ends**, including shaping minutes and ambiguity stops.
13. **STE for all documentation output.** Acceptance criteria and flow steps are the one exception (rule 3).
14. **Every base commit a Verify line names is the wave base.** TRIGGER asserts it against the contract. A guard anchored on an older commit reports other sessions' work. A guard that diffs a base against `HEAD` widens with every later commit, so scope it to the wave's own commits.
15. **A wave commit stages only the paths its plans name.** List the staged paths against the union of the slice plans' Files-to-modify and stop on anything outside it. On a shared working tree a path-scoped `git add` still takes another session's edits to the same file.

---

## Loop Contract

Update `docs/loops/feature-loop-contract.md` at the start and end of every run.

```markdown
# Feature Loop Contract

## Goal
Implement all specs in <feature-name> wave <N>. Verify each independently.
Audit drift with zero unresolved divergences. Log the retrospective.

## Current state
- Feature: <feature-name>
- Surface: frontend | backend | fullstack
- Rigor: spec-first | spec-anchored
- Client build: yes | no
- Wave: <N> of <total>
- Phase: SHAPE | IMPLEMENT | VERIFY | DRIFT AUDIT | RETRO | COMPLETE
- Specs in scope: <list or link to wave folder>
- Use cases in scope: <UC-<n> list — the Phase 4 audit covers these and no others>

## Gates
One line per spec-anchored slice. The human edits this line by hand.
Presence of a plan is not approval.

- <slice-name>: shape:pending | shape:approved

## Backlog
- Waves remaining: <list>
- Blocked specs: <list with reason>

## Timeline
| Date | Wave | Phase | Duration | Shaping min | Ambiguity stops | Notes |
|------|------|-------|----------|-------------|-----------------|-------|
| ...  | ...  | ...   | ...      | ...         | ...             | ...   |

## References
- Architecture: docs/context/architecture-context.md
- [frontend/fullstack] Design system: docs/design-system/
- [backend/fullstack] API context: docs/context/api-context.md
- Progress: docs/context/progress-tracker.md
- Issues: docs/context/current-issues.md
- Signals: docs/signals/
- Work log: docs/loops/work-log.md
- [spec-anchored] Use cases: docs/use-cases/ · Entity model: docs/entity-model.md
- [spec-anchored] Anchored criteria registry: docs/context/anchored-criteria.md
```

---

## The Loop

```
TRIGGER ──→ 1. SHAPE ──→ [gate] ──→ 2. IMPLEMENT ──→ 3. VERIFY ──→ 4. DRIFT AUDIT ──→ 5. RETRO
  ▲                          │                            │               │
  │              [spec-anchored:               per-slice: │          if divergences:
  │               human shape:approved]     lint + types  │      → plan drift: fix plans
  │                                        (fast feedback)│      → SPEC EVOLUTION: edit
  │                                                       │        criterion, re-approve
  │                                            if output FAIL:  → SPEC SHORTCUT: back to 2
  │                                            → fix issues     → if re-verify needed: back to 3
  │                                            → back to 2                    │
  └────────────────────────── next wave ◄───────────────────────────────────-─┘
                                                          EXIT when:
                                                          all waves complete
```

### TRIGGER

The human kicks off a wave. Update the loop contract with current state.

[brownfield] For each use case this wave touches that has no baseline review, run the recovery
step before SHAPE.

When an earlier SHAPE run wrote this wave's specs, re-check them against every heuristic added
to `docs/shaping/shaping-heuristics.md` since that run. A spec that breaks one gets a criterion
edit and re-approval before IMPLEMENT. Heuristics reach only the specs written after them.

---

### Phase 1 — SHAPE

**Purpose**: Plan the work. Highest-leverage phase — information flows before implementation.

**Prompt**:
```
Read docs/loops/feature-loop-contract.md to orient yourself.
Read docs/signals/ — check drift/, friction/, patterns/ for lessons from prior runs.
Read docs/loops/work-log.md — last 10 entries for recent context.

## Inputs
Read the feature brief: [docs/shaping/<feature>/feature-brief.md]
The brief covers the whole feature. It is not a spec. SHAPE writes the specs, one per slice, at step 5.

## Steps (follow in order)

### 0. Invoke the shaping skill
Run `/shaping` to activate the structured shaping methodology.
All shaping work in this phase MUST follow the `/shaping` skill's methodology:
- Requirements as numbered set (R0, R1, R2...)
- Shapes as lettered alternatives (A, B, C...)
- Fit checks as R × S decision matrices
- Breadboarding via `/breadboarding` skill
- Multi-level document consistency (Big Picture → Shaping doc → Slices doc → Slice plans)

### 1. Shape
- **Set the rigor for this feature.** Record `spec-first` or `spec-anchored` and the reason in the shaping document. Any slice touching a spec-anchored domain (Project Profile) is spec-anchored.
- **Run the decisions-owed check.** For each requirement, ask: what rule would an implementer have to invent? Each answer is a decision owed. List them and ask the human before slicing. A spec-anchored slice does not proceed while a decision is owed.
- Use `/shaping` to populate R from the feature brief, sketch shapes, run fit checks
- Map requirements against docs/context/architecture-context.md — identify conflicts, technical debts, patterns that drifted in prior waves (check docs/signals/drift/)
- Save shaping document to docs/shaping/<feature>/shape/<feature>-shape.md

### 2. Spike
- Identify technical unknowns from the shape
- Spin up parallel agents to run spikes
- Save findings as docs/shaping/<feature>/shape/spike-<topic>.md
- Update shape document with spike findings

### 3. Breadboard
- Evaluate shape options against [speed / risk / simplicity]
- Get user confirmation of recommended shape
- Use `/breadboarding` (invoked through `/shaping`) to detail the selected shape into concrete affordances and wiring

### 4. Flows, dependency graph, waves
- Cut slices by flow first: slice 1 is the main success flow, then alternative flows in business-value order. Then build the dependency graph.
- Record a Status per use case in the slices document.
- For each spec, extract explicit dependencies (Prerequisites, Depends on, Requires)
- Produce:
  1. Dependency graph
  2. Phased wave order where:
     - Each wave contains specs that can run IN PARALLEL (no inter-dependencies within wave)
     - Waves are sequential (each wave's deps satisfied by prior waves)
     - No wave exceeds ~10 specs
  3. Critical path (longest sequential chain)
- Output as markdown table per wave + critical path

### 5. Slice & plan
- Use `/shaping`'s slicing methodology — vertical slices with demo-able UI
- Create slicing document: docs/shaping/<feature>/shape/<feature>-slices.md
- Create individual implementation plans, one per slice, per the skill's document hierarchy (Slices doc → Slice plans)
- Split each slice into a **spec** (behaviour) and a **plan** (structure).

**Spec [spec-first]** — one file per slice in docs/shaping/<feature>/specs/<slice-name>.md,
from docs/loops/templates/spec.md:
  - Goal, actors, main success flow (3-9 steps)
  - Named alternative flows `A<n>`: trigger step, ending, failure postcondition
  - Acceptance criteria: actor-first grammar, max 20 words each
  - One criterion per main-flow outcome and one per alternative flow, or `no criterion: <reason>`
    beside the flow
  - Non-goals, each with the reason it is out
  - One verification command per criterion. "manual" is allowed and must say so.
  - [frontend/fullstack] A criterion about what the user sees is verified on the rendered page
    (a headless render that asserts visible text) or marked manual. A grep of the page source
    never verifies it.
  - A Verify line reads data a slice in the wave produces. Data only a person can produce is
    an input listed for the wave, and the criterion tests the behaviour on a fixture.

**Spec [spec-anchored]** — the same behaviour, written from docs/loops/templates/use-case.md to
docs/use-cases/UC-<n>-<kebab-name>.md, the system-level catalogue, NOT the wave folder.
If the behaviour already has a UC-<n>, edit that file. Do not open a second one.
Sections in order:
  - **Overview** — UC-<n>, name as the actor's goal in an active verb phrase, primary actor
    as a role, one-sentence goal, Status.
  - **Preconditions** — only conditions the system enforces and a higher-level use case
    establishes. Never re-checked inside a flow.
  - **Main Success Scenario** — numbered from 1, no gaps, 3-9 steps, ends with the goal
    delivered. Every step succeeds.
  - **Alternative Flows** — one per validation. `A<n>` with a step-anchored Trigger and one
    of two endings: resume at step N, or the use case ends. Open-ended flows are not allowed.
  - **Postconditions** — Success and Failure, both non-empty. The failure postcondition names
    what rolls back and what stays unchanged.
  - **Business Rules** — BR-<n>, globally unique, own section, cited from the steps and flows
    that depend on them. A rule is stated once.
  - Acceptance criteria carry AC-<feature>-NNN IDs and one verification command each: one per
    main-flow outcome and one per alternative flow. The spec-first rules on rendered pages and
    on data a slice produces apply here too.
  - Every noun exists in docs/entity-model.md, referenced by name and never described. If a
    noun is missing, extend the entity model first — that edit is part of the slice.

**Board brief [frontend/fullstack]** — for a wave with a visual surface, write
shape/wave-<N>/design-brief.md with the Board Brief prompt in prompts/04b-design.md:
  - One board per screen state this wave builds, each with an anchor ID from docs/design-system/
  - Every element on a board maps to a named field in the contract that feeds it
  - Anything the wave cannot feed goes on a board captioned with its wave, or is left out
  - The tokens board comes first

**Pass-1 failure sweep**: for every step containing "validates", name the failure. For every
external actor, name "no response" and "wrong response". Keep only failures the system can
detect and must handle.

**Plan** — in the wave folder, from docs/loops/templates/plan.md:
  - Files to create/modify (predicted), components, props, data shapes
  - Dependencies on other slices
  - `Implements: UC-<n> flows <main | A1 | A2 ...>` when spec-anchored
  - DO NOT include self-testing — verification is a separate phase

**Self-check before saving a spec**: could a stakeholder confirm this step? What would the AI
have to invent? Is it still true on a new stack? The blocklist grep passes.

[spec-anchored] Status moves on evidence: **Draft** while writing, **Reviewed** once the
specification checklist passes, **Approved** once the human edits the gate line. Status and the
gate are one decision recorded twice — **the `## Gates` line in the loop contract is
authoritative** and the Status field mirrors it. If they disagree, the contract wins and RETRO
logs the mismatch as friction.

## Side effects
- Append placeholders/unknowns to docs/context/current-issues.md
- Record shaping minutes in the loop contract timeline
- [spec-anchored] Ask the human to edit `<slice>: shape:approved` in the loop contract
- [client-build] Open the spec as a PR. The client's approval is the gate.
- Ask me if any decisions are unclear

## References
- Architecture: docs/context/architecture-context.md
- [frontend/fullstack] Design system: docs/design-system/
- [backend/fullstack] API context: docs/context/api-context.md
- Prior drift signals: docs/signals/drift/
- Prior friction signals: docs/signals/friction/

## Constraints
- DO NOT IMPLEMENT — planning and documents only
- Acceptance criteria use actor-first grammar, not imperative (Writing Standard rule 8)
- Write all output documents (shape, spikes, slices, plans) in STE:
  - Max 20 words per instruction sentence, 25 per descriptive sentence.
  - Active voice. One instruction per sentence. Condition before command.
  - Use terms from the Controlled Vocabulary table — no synonyms.
```

---

### Phase 2 — IMPLEMENT

**Purpose**: Build the wave. Separate agents per slice. Fast feedback per slice, NOT per wave.

**Key change from v1**: No self-testing. The implementing agent does NOT verify its own work. That is Phase 3.

**Prompt**:
```
Read docs/loops/feature-loop-contract.md to orient yourself.
Read docs/loops/work-log.md — last 5 entries.
Read docs/context/progress-tracker.md.

## Task
Implement [docs/shaping/<feature>/shape/wave-<N>/] in parallel.

## Rules
0. Read `## Gates` in the loop contract. Skip any spec-anchored slice without `shape:approved`.
1. Spin up one agent per slice (use worktrees for isolation)
2. Each agent reads these files before it starts:
   - Its slice plan
   - docs/context/architecture-context.md
   - [frontend/fullstack] docs/design-system/
   - [backend/fullstack] docs/context/api-context.md
3. After EACH slice completes:
   - Run these checks (fast feedback — catch issues immediately):
     - lint
     - type-check
     - build
     - [backend/fullstack] unit tests for changed modules
     - blocklist grep on the slice's spec
   - If any fail → fix before moving to next slice
   - DO NOT self-verify. These are the verifier's job (Phase 3):
     - Playwright browser testing
     - Manual API testing
     - Integration tests
4. When a slice is complete:
   - Mark it as implemented in docs/context/progress-tracker.md
   - Structural deviation → note it on the **plan**, with WHY
   - Behaviour deviation on a spec-first slice → note it on the spec for Phase 4
   - Behaviour deviation on a spec-anchored slice → that is a decision owed. Stop. Log it to
     docs/context/current-issues.md, count it as an ambiguity stop, and do not proceed.
5. Park any unclear detail or TODO in docs/context/current-issues.md
6. If implementation hits unexpected friction:
   - Log it in docs/signals/friction/<topic>.md with format:
     - Date
     - Spec
     - Description
     - Root cause: CODEBASE | AGENT | SPEC | LOOP
     - LOOP = the loop document, a phase prompt or the starter kit caused it
7. Append a work-log entry when complete:
   - What: which slices implemented
   - Result: pass/fail per slice, any deviations
   - Unresolved: what could not be completed
   - Ambiguity stops: <count>

## References
- Shape: docs/shaping/<feature>/shape/<feature>-shape.md
- Architecture: docs/context/architecture-context.md
- [frontend/fullstack] Design system: docs/design-system/
- [backend/fullstack] API context: docs/context/api-context.md

## Constraints
- DO NOT self-verify — a separate verifier handles that (Phase 3)
- DO NOT modify specs to match shortcuts — log deviations, the drift audit classifies them
- DO NOT edit a spec-anchored criterion. That is a Phase 4 EVOLUTION with human re-approval.
- Write all documentation updates (progress-tracker, spec deviation notes, friction signals, work-log entries) in STE:
  - Max 25 words per sentence. Active voice. No contractions.
  - Use terms from the Controlled Vocabulary table.
```

---

### Phase 3 — VERIFY

**Purpose**: Verify the output (does it work?) and the trajectory (was it built well?). A fresh agent does this verification. The verifier has no access to the implementer's reasoning.

**Key change from v1**: A separate read-only agent with fresh context verifies the output. The implementer NEVER judges its own output.

**v2.1 addition**: The verifier also evaluates trajectory — HOW the code was built, not just WHETHER it works.

**Prompt** (run in a NEW session — fresh context):
```
You are a verifier. You did NOT implement this code. Your job is to verify it works AND that it was built well.

## Inputs
- Specs: [spec-first] docs/shaping/<feature>/specs/ — the slices in this wave.
  [spec-anchored] the UC-<n> files the loop contract lists.
- Plans: [docs/shaping/<feature>/shape/wave-<N>/] — structure only, for the trajectory check
- Files changed: [list from git diff or progress-tracker]
- Git diff: [git diff main..HEAD or equivalent — the actual changes]
- Surface: [frontend | backend | fullstack]
- Verification commands per criterion (from the spec)
- [spec-anchored] Registry: docs/context/anchored-criteria.md
- [frontend/fullstack] Design reference: docs/design-system/ — the states and copy each screen must show
- [frontend/fullstack] App URL: [localhost:XXXX]
- [backend/fullstack] API base URL: [localhost:XXXX] or test command: [npm test / pytest / go test]
- Known patterns: docs/signals/patterns/

## Steps

### Step 1 — Read acceptance criteria
Read each slice's acceptance criteria from its spec or use case. A plan holds no criteria.

### Step 2 — Output evaluation (does it work?)

**[frontend] — Browser verification via Playwright MCP:**
- Start the app if not running
- Navigate to every affected route/component
- Interact with every UI element specified in the acceptance criteria
- Test these edge cases:
  - Empty states
  - Error states
  - Loading states
  - Responsive breakpoints

**[backend] — API and logic verification:**
- Run the full test suite (`pytest`, `go test`, `npm test`, or equivalent) — report pass/fail per test file
- For each new/changed endpoint: call it with valid input, invalid input, and missing auth
- Verify response shape matches docs/context/api-context.md (status codes, fields, error format)
- Check database state after write operations (row created/updated/deleted as expected)
- For CLI tools: run with expected args, bad args, and `--help` — verify output matches spec
- For workers/pipelines: trigger the job, verify output artifact or side effect

**[fullstack] — Both of the above.** Run backend verification first (API must work before UI can).

For each acceptance criterion:
1. Run its verification command. The exit code is the evidence. Do not invent a check.
2. If the criterion says "manual", verify by hand and state plainly that it was manual.
3. Confirm every named alternative flow has a criterion that passed.
4. Any empty, error or loading state with no named flow → log SPEC friction. Do not guess the
   correct behaviour. [spec-anchored] A step citing a BR-<n> with no matching flow is the same defect.

Report per criterion:
- PASS: criterion met (exit code, plus screenshot evidence [frontend])
- FAIL: criterion not met (with what happened vs what was expected)
- BLOCKED: could not test (with reason)

### Step 3 — Trajectory evaluation (was it built well?)
Review the git diff and slice plans. For each slice, check:

1. **Scope proportionality** — Is the diff size proportionate to the spec scope?
   Flag: large diffs for small specs, or files changed that were not predicted in the slice plan.
2. **Pattern compliance** — Does the code reuse patterns from docs/signals/patterns/?
   Flag: reimplemented solutions that already exist as documented patterns.
   Name each pattern the slice reused in the Finding column. RETRO counts reuse from it.
3. **Dependency hygiene** — Were new dependencies added? Are they necessary?
   Flag: hallucinated packages (do not exist on npm/pypi), unnecessary dependencies for simple tasks.
4. **Architectural alignment** — Does the code follow docs/context/architecture-context.md?
   Flag: new patterns that contradict documented conventions, wrong directory placement, bypassed abstractions.
5. **Complexity check** — Is the solution appropriately simple for the requirement?
   Flag: over-engineered abstractions for one-time operations, premature generalization.

For each check, report:
- OK: no concerns
- FLAG: issue found (with what and why)
- N/A: not applicable to this slice

## Output
Write verification report to docs/shaping/<feature>/shape/wave-<N>/wave-<N>-verify.md:

### Output Evaluation
| Slice | Criterion | Command | Exit code | Status | Evidence |
|-------|-----------|---------|-----------|--------|----------|

### Trajectory Evaluation
| Slice | Check | Status | Finding |
|-------|-------|--------|---------|

### Summary
- Output: <X>/<Y> criteria passed
- Trajectory: <X> flags raised
- Verdict: PASS | PASS WITH FLAGS | FAIL

## Step 2b — Persist [spec-anchored]
Write one browserless or integration test per criterion under tests/anchored/<AC-ID>.test.*.
Register the path in docs/context/anchored-criteria.md.
A test for a criterion on an alternative flow asserts that flow's **failure postcondition**, not
only the error message. What rolled back and what stayed unchanged is the part that regresses
silently.

## If any output FAIL
Create a fix issue per failure in docs/context/current-issues.md with:
- What failed
- Expected vs actual behavior
- Suggested fix (read-only observation — do not implement)

→ Return to Phase 2 (IMPLEMENT) to fix the issues. Then re-verify.

## If trajectory FLAGS but output PASS
Do NOT block the wave. Log flags to docs/signals/friction/<topic>.md with root cause: AGENT.
These feed into Phase 5 (RETRO) for harness improvement — not into immediate rework.
Exception: hallucinated dependencies are treated as output FAILs (they will break in production).

## Constraints
- READ-ONLY on src/. The verifier writes only the report and tests/anchored/.
- Do not access the implementing agent's reasoning or conversation
- Output eval: test only against acceptance criteria — nothing more, nothing less
- Trajectory eval: assess against slice plans, architecture docs, and known patterns — not personal preference
- Write the verification report in STE:
  - Table cells (Evidence, Finding): one sentence, max 25 words, active voice.
  - Fix issues in current-issues.md: one sentence per field, active voice.
```

---

### Phase 4 — DRIFT AUDIT

**Purpose**: Align remaining specs with reality. Classify every divergence as evolution or shortcut.

**Key change from v1**: Classification prevents drift-to-low-performance. The audit flags shortcuts — it does not silently accept them.

**Prompt**:
```
Read docs/loops/feature-loop-contract.md.

## Task
Compare the current implementation in src/ (or app/) and docs/context/progress-tracker.md
against the REMAINING (unimplemented) **plans** (structure) and **specs** (behaviour).

Scope: only the plans and use cases the loop contract lists for this feature. NOT the whole of
docs/use-cases/. A permanent catalogue is not a standing audit surface — a use case at Status
Complete that this feature does not touch is out of scope.

For each remaining artifact, check whether:
1. A PLAN references files, exports, props, or data shapes that have changed
2. A PLAN assumes a component API or pattern that was implemented differently
3. It depends on a slice whose implementation deviated from its plan or spec
4. A SPEC's flow or criterion is no longer true given the implemented behaviour

## For each divergence found
1. State: the file, the divergent assumption, what actually exists now
2. Name the LAYER: PLAN or SPEC
3. CLASSIFY the divergence:
   - (a) EVOLUTION — the implementation found a genuinely better approach
     (simpler API, better pattern, architectural improvement)
   - (b) SHORTCUT — the implementation took an easier path
     (skipped edge cases, simplified component API, fewer states)
4. Apply the action for that layer and label:
   - **PLAN drift, either label** → minimal plan edit. Plans adapt to code.
   - **SPEC EVOLUTION** → edit the criterion, never append a note. Set the use case Status to
     Reviewed. [spec-anchored] reset the gate to `shape:pending` for human re-approval.
   - **SPEC SHORTCUT** → create a fix issue. [spec-anchored] the wave returns to IMPLEMENT
     before it closes. [spec-first] may park as tech debt, with the reason recorded.
5. Log to docs/signals/drift/<spec-slug>.md with format:
   - Date
   - Spec or plan
   - What diverged
   - Layer: PLAN | SPEC
   - Classification: EVOLUTION | SHORTCUT
   - Action: plan edit | criterion edit + re-approval | fix issue | tech debt
   - Why (one sentence)

## Quality ratchet
After classifying all divergences, report the evolution/shortcut ratio for this wave.
Report the ratio separately for the PLAN and SPEC layers.
If shortcuts > 50%, flag this explicitly — the system may be drifting toward lower quality.

## Constraints
- This phase changes no code. Plans adapt to code. Specs change only through EVOLUTION with
  re-approval, or send a SHORTCUT back to IMPLEMENT.
- If any divergences require re-verification → return to Phase 3 (VERIFY)
- Write drift signals in STE:
  - Each field (What diverged, Why): one sentence, max 25 words, active voice.
  - Spec edits follow STE sentence rules.
```

---

### Phase 5 — RETROSPECTIVE

**Purpose**: Extract compound value from this wave. This is the reinforcing loop — without it, the system maintains but does not grow.

**Prompt**:
```
Read docs/loops/feature-loop-contract.md.
Read docs/signals/ — all files created during this wave.
Read docs/loops/work-log.md — entries from this wave.
Read the verification report: docs/shaping/<feature>/shape/wave-<N>/wave-<N>-verify.md

## Extract and log

### 1. Patterns
What reusable solutions were discovered during implementation?
→ Save each as docs/signals/patterns/<pattern-name>.md with:
  - Pattern name
  - Problem it solves
  - Solution (code snippet or approach)
  - Where it was first used (spec reference)
  - Used in: the slices and features that use it, starting with the first
→ For each existing pattern this wave reused, append the slice to its Used in list. Sources:
  the Pattern reused column of each plan's deviation table, and the verify report's
  pattern-compliance findings. Reuse that no one records cannot trigger promotion.

### 2. Friction analysis
Review docs/signals/friction/ entries from this wave.
- Which friction was the agent's fault? → Improve CLAUDE.md or agent rules
- Which was the codebase's fault? → Create a refactoring issue
- Which was the spec's fault? → Add or edit a heuristic in `docs/shaping/shaping-heuristics.md`
- Which was the loop's fault (root cause LOOP)? → Copy the file to `loop-upstream` (Project
  Profile) as `<project>--<topic>.md`. Do not patch the local copy of the loop document.
- Is a SPEC friction really the loop's fault? Ask: would the same failure recur on another
  project that follows the loop exactly? If yes, re-label it LOOP and copy it upstream.

### 3. Drift analysis
Review docs/signals/drift/ entries from this wave.
- Legitimate evolutions → update docs/context/architecture-context.md
- [spec-first] Shortcuts → add to docs/context/current-issues.md as tech debt
- [spec-anchored] Shortcuts → confirm each one returned to IMPLEMENT before the wave closed
- Confirm every use case Status matches its `## Gates` line. A mismatch is friction — log it.

### 3b. Apply queued architecture updates
Check the build order / specs for any "Architecture Context Updates Needed" sections
(invariants, key flow changes, env vars, new routes, cron jobs, etc.).
These are planned updates documented during SHAPE — not drift.
Apply them to the relevant context files now:
- New invariants → append to docs/context/architecture-context.md § Invariants
- Flow changes → update docs/context/architecture-context.md § Key Flows
- New env vars → update docs/context/architecture-context.md § Environment & Config
- New routes → update docs/context/architecture-context.md § Non-Obvious Routes
If no queued updates exist, skip this step.

### 4. Shaping improvements
What spikes were wasted? → Note for future spike selection
What was shaped well? → Add it to `docs/shaping/shaping-heuristics.md`

### 5. Update loop contract
- Update the timeline table
- Advance wave counter
- Update backlog

### 6. Update progress tracker
- Mark wave as complete
- Update docs/context/progress-tracker.md

### 7. Prune
The hub only grows unless something removes from it. For CLAUDE.md and each docs/context/ file,
ask of every line: would removing this line cause the agent to make mistakes?
- No → remove it, or move it to a spoke file
- For `docs/shaping/shaping-heuristics.md`, also remove each heuristic that restates a rule in
  this loop document. The loop document is the authority; a heuristic adds to it or does not exist
- Report the line count per file
- FLAG if CLAUDE.md exceeds 150 lines. The hard ceiling is 400 — an agent reads the first third.

### 8. Promote
Any pattern marked `Reusable? YES` whose Used in list names 3 or more slices, or 2 or more
features, becomes a skill. A single-feature project promotes on slices.
- Create .claude/skills/<pattern>/SKILL.md
- Mark the pattern file `Promoted to: skill`

## Append work-log entry
- Wave: <N>
- Duration: <time>
- Shaping minutes: <count>
- Ambiguity stops: <count>
- Evolution/shortcut ratio: <X>/<Y> (PLAN and SPEC layers separately)
- Patterns extracted: <count>
- Patterns promoted: <count>
- Anchored criteria added: <count>
- Tests persisted: <count>
- CLAUDE.md lines: <count>
- Friction logged: <count>
- LOOP friction sent upstream: <count>
- Key learning: <one sentence>

## Constraints
- Write all signal files and work-log entries in STE:
  - Pattern descriptions: one sentence per field, max 25 words.
  - Friction analysis: active voice, one issue per sentence.
  - Work-log entry: max 25 words per bullet.
```

---

### EXIT CONDITION

The loop exits when ALL of these are true:
1. All waves in the feature are implemented
2. All waves are independently verified (Phase 3 passed)
3. All drift is audited with zero unresolved divergences
4. Every wave has a logged retrospective
5. Loop contract shows Phase: COMPLETE
6. [spec-anchored] Every criterion has a passing test in tests/anchored/ and a registry row, and
   every use case has non-empty Success and Failure Postconditions
7. [spec-anchored] Every use case the feature touched has its Status moved, and every noun it
   uses exists in docs/entity-model.md
8. [spec-anchored] All gates read `shape:approved`
9. [client-build] The close-out carries an honest-limits note: what was measured, what was not,
   and what the operator brought that the method did not

If waves remain → return to TRIGGER for the next wave.

---

## Signal Schemas

### docs/signals/README.md

```markdown
# Shared Signal Architecture

Signals are typed artifacts that flow between loop iterations.
Each run's outputs become the next run's inputs — this is what makes it a loop, not a procedure.

## Types

### drift/<spec-slug>.md
Spec divergence log. Created during Phase 4 (Drift Audit).
- Date:
- Spec or plan:
- What diverged:
- Layer: PLAN | SPEC
- Classification: EVOLUTION | SHORTCUT
- Action: plan edit | criterion edit + re-approval | fix issue | tech debt
- Why:

Format: Each field value is one sentence, max 25 words, active voice.

### friction/<topic>.md
Recurring implementation pain point. Created during Phase 2 (Implement).
- Date:
- Spec:
- Description:
- Root cause: CODEBASE | AGENT | SPEC | LOOP
- Suggested fix:

Format: Description and Suggested fix are each one sentence, max 25 words, active voice.
LOOP means the loop document, a phase prompt or the starter kit caused the friction. RETRO copies
LOOP friction to the loop's upstream repo (Project Profile `loop-upstream`).

### patterns/<pattern-name>.md
Reusable solution discovered during implementation. Created during Phase 5 (Retro).
- Pattern name:
- Problem it solves:
- Solution:
- First used in:
- Used in: <slice list, appended in RETRO>
- Reusable? YES | MAYBE | NO
- Promoted to: skill | none

Format: Problem and Solution are each one sentence, max 25 words. Solution may include a code snippet after the sentence.

## Rules
- One signal per file (not appended to a master list)
- Filename = slugified topic, no dates in filename
- Signals are never deleted — they accumulate
- Phase 1 (Shape) MUST read signals/ before planning
- A pattern whose Used in list reaches 3 slices or 2 features is promoted to a skill in RETRO
- LOOP friction is copied upstream in RETRO, named `<project>--<topic>.md`
- All signal prose follows STE: active voice, max 25 words per sentence, controlled vocabulary
```

---

## Work Log Format

### docs/loops/work-log.md

```markdown
# Work Log

Append-only. Every agent reads the last 10 entries at session start for context.
Each bullet value is one sentence, max 25 words, active voice. Use terms from the Controlled Vocabulary.

---

## [YYYY-MM-DD HH:MM] <agent-role> | <feature> wave <N>

- **Picked up**: <what this agent was tasked with>
- **Result**: <what was completed, pass/fail>
- **Unresolved**: <what could not be completed, or "none">
```

---

## Quick Reference

| Phase | Who | Input | Output | Decision point |
|-------|-----|-------|--------|----------------|
| SHAPE | Human + agent | Feature brief (feature-brief.md), signals/ | Specs (one per slice), waves, slice plans | User confirms shape; [spec-anchored] user sets shape:approved |
| IMPLEMENT | Parallel agents (worktrees) | Slice plans | Code, friction signals | Per-slice: lint/type-check pass? |
| VERIFY | Separate fresh agent | Specs + changed files + git diff + patterns + verification commands | Verify report (command + exit code per criterion) + tests/anchored/ | Any FAIL → back to IMPLEMENT; flags → friction signals |
| DRIFT AUDIT | Agent | Remaining plans and specs in scope vs reality | Plan drift patched; SPEC EVOLUTION re-approved; SPEC SHORTCUT → IMPLEMENT | Any divergences → back to VERIFY |
| RETRO | Agent | All signals from wave | Patterns, skills, pruned hub, LOOP friction sent upstream | Waves remaining → next TRIGGER |

<!-- provenance -->
---

*Vendored copy. Source: `AI engineering feature loop.md` at the root of the second-brain vault. Do not edit this copy — change the source, re-copy, then run `python3 scripts/loop-copies.py --stamp` in the vault. The hash below is the content this copy was taken from; the check script uses it to tell a stale copy from an edited one.*

sha256: f2086d99679c16d18e0052266c9680c7ca89c911d3a5eaae93452d0226f6e783 · checked: 2026-10-11
<!-- /provenance -->
