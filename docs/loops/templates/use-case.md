# UC-<n>: <Goal as an active verb phrase, the actor's words>

> [spec-anchored] Behaviour only. No files, routes, codes, stack names, or data shapes — those go in the
> plan. `bash scripts/blocklist-grep.sh` must exit 0. Every noun comes from `docs/entity-model.md`,
> referenced by name and never described here.

## Overview

- **ID:** UC-<n>
- **Primary actor:** <a role, not a person>
- **Supporting actors:** <external systems or roles>
- **Goal:** <one sentence>
- **Status:** Draft | Reviewed | Approved | Mid-life | Complete — mirrors `## Gates` in the loop contract; the contract wins
- **Slices:** <slice names that implement this use case, filled at SHAPE>

## Preconditions

<Only conditions the system enforces and a higher-level use case establishes. Never re-checked in a flow.>

1. <condition>

## Main Success Scenario

<Numbered from 1, no gaps, 3–9 steps. Every step succeeds. The last step delivers the goal. Actor first.>

1. <Actor> <does something>.
2. System <responds>.

## Alternative Flows

<One per validation and per external-actor failure (no response, wrong response). Pass-1 failure sweep:
every "validates" or "checks" in the main flow names its failure here.>

### A1: <what went wrong>

- **Trigger:** step <n> — <condition>
- **Flow:**
  1. System <does>.
- **Ending:** resume at step <n> | the use case ends

## Postconditions

### Success

- <what is true after the last step>

### Failure

- <what rolls back>
- <what stays unchanged>

## Business Rules

<BR numbers are global across docs/use-cases/. Take the next number after the highest in use. A rule is
stated once and cited from steps and flows as (BR-<n>).>

- **BR-<n>:** <rule in business language>

## Acceptance criteria

<Actor-first, present tense, max 20 words. One per main-flow outcome and one per alternative flow.
Each line ends with `Verify:` and one command. "manual" is allowed and says so. Register each ID in
docs/context/anchored-criteria.md. The verifier writes tests/anchored/<AC-ID>.test.*.>

- **AC-<FEATURE>-NNN** — System <outcome>. Verify: `<command>`

## Decisions owed

<What rule would the implementer have to invent? One line per decision. The gate stays pending while
this list is not empty.>

- <question> — owner: <name>
