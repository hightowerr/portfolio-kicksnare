# 4a. Problem Space

> Prompt templates for the steps before shaping: define the problem, write the A3, score the fog, and clear it by grilling or by Wayfinder.

The end-to-end workflow has nine steps. Steps 5-9 are the loop proper, and their prompts live in `AI engineering feature loop.md` -- one per phase. This file covers steps 1-4, which the loop document does not: it begins at TRIGGER and assumes a feature brief already exists.

Step 4b (design, visual surfaces only) lives in `prompts/04b-design.md`.

| Step | Prompt | Home |
| ---- | ------ | ---- |
| 1. DEFINE | Define the Problem | this file |
| 2. A3 | A3 Problem Generator | this file |
| 3. DECISION GATE | Score the Fog | this file |
| 3a. GRILL | Grill to Brief (low fog) | this file |
| 3b. WAYFINDER | Open a Wayfinder Map (high fog) | this file |
| 4a. BRIEF | `feature-brief.md`, produced by 3a or 3b | -- |
| 4b. DESIGN | Design reference (visual surfaces only) | `prompts/04b-design.md` |
| 5-9. Loop | five phase prompts | `AI engineering feature loop.md` |

---

### Define the Problem

**When to use:** Before any A3, any brief, and any tool. The first articulation of what is wrong.
**Produces:** One paragraph stating the symptom, the sufferer, and the cost.

```
Write the problem statement for [THING]. One paragraph, maximum 80 words. No solutions.

State three things:
1. What is wrong -- the observable symptom, not the missing feature.
2. Who it happens to -- a named role or segment, not "users".
3. Why it matters -- the cost of leaving it alone.

Rules:
- Do not name a solution, a feature, or a technology.
- "Build X" is not a problem. Rewrite it as the condition that makes X seem necessary.
- If you cannot say who it happens to, stop and ask me.

After the paragraph, list every fact you asserted that you have not verified.
```

---

### A3 Problem Generator

**When to use:** The problem statement exists and needs structure before the fog is scored.
**Produces:** An A3 (sections A-I). Save it as `docs/shaping/[FEATURE-NAME]/a3.md` -- Score the Fog reads it.
**Shorthand:** `a3 - this problem from [PROBLEM]`

```
You are my Problem Definition assistant. Turn my messy description into a
clearly defined problem statement. Follow this process exactly.

## Core rule
A problem exists only if there is a GOAL and a BARRIER preventing that goal.
If there is no barrier, there is no problem. Do not propose solutions -- no
"fix", "should", "try", or "recommend".

## Process
1. Problem Identification -- detect whether a problem exists, identify its
   nature, define it clearly enough to share.
2. Problem Structuring -- ask for facts not opinions, replace subjective
   statements with measurable/observable facts, build a clear picture of
   both goals and barriers. If data is missing, propose a simple way to
   gather it (check sheet, time sampling).

## Output (all sections required)

### A) Goals
List objectives / desired state with measurable success criteria. Include
"avoid" goals if relevant.

### B) Barriers
List what prevents the goal. Label each as: knowledge gap | resource
constraint | process obstacle | technical limitation | people/coordination |
time constraint | external dependency.

### C) Current Situation (facts only)
Bullet only factual statements. Convert subjective phrasing into factual
equivalents. Mark unverifiable claims as "Needs evidence".

### D) Standard / Expectation
Define what "good" looks like. If none provided, propose 2-3 candidate
standards and ask me to choose.

### E) Discrepancy
Single sentence: "Standard: __. Current: __. Discrepancy: __."

### F) Extent
For each, provide best available info or "Unknown": when it happens, how
often, where, how long it has been happening, trend (better/worse/same),
what is affected, types of occurrences.

### G) Point of Cause
If obvious -- state the most likely POC and why. If not -- outline a
track-back plan: which steps to inspect, in what order, where the defect
first appears.

### H) Draft Problem Statement
1-3 neutral, measurable sentences containing: goal, barrier, discrepancy,
scope/extent.

### I) Clarifying Questions (only if needed)
Up to 7 questions, prioritised, each tied to a missing element above.

## My messy description
[PASTE MESSY PROBLEM HERE]
```

---

### Score the Fog

**When to use:** An A3 is complete and the route to a feature brief must be chosen.
**Produces:** A filled indicator table, a GRILL or WAYFINDER verdict, and the Wayfinder seed tickets if the verdict is WAYFINDER.

```
Read [A3-PATH]. Score the fog using only what the A3 states. Do not infer and do not fill gaps.

Fill this table from the A3:

| Indicator                              | Low fog          | High fog              | This A3 |
| "Needs evidence" markers in section C  | 0-2              | 3 or more             |         |
| Point of cause in section G            | clear, or 1-step | unclear, multi-step   |         |
| Clarifying questions in section I      | 3 or fewer       | 4 or more             |         |
| Competing approaches                   | 0-1              | 2 or more viable      |         |
| External dependencies to investigate   | 0                | 1 or more             |         |

Rule: any two high-fog indicators means WAYFINDER. Otherwise GRILL.

Output:
1. The filled table.
2. The verdict, with the high-fog count that produced it.
3. If the verdict is WAYFINDER, the seed tickets:
   - each section I question becomes a grilling ticket
   - each "needs evidence" marker becomes a research ticket
   - an unresolved section G becomes a research or prototype ticket
   - each competing approach becomes a prototype ticket -- build both, compare
   - each external dependency becomes a task ticket

Stop at the verdict. Do not write the brief and do not start either path.
```

---

### Grill to Brief (low fog)

**When to use:** The gate returned GRILL. One adversarial session, then the feature brief.
**Produces:** Either a feature brief, or a stop with zero code written.
**Shorthand:** `/grill-me`

```
/grill-me

Subject: [A3-PATH]

Interview me until every branch of the decision tree is resolved. Challenge the framing, not
only the details.

Stop conditions -- name which one fired:
- RESOLVED           no open branch remains
- PARADOX            the problem as stated cannot be satisfied. Stop. Zero code.
- SHOULD-NOT-EXIST   the feature is not worth building. Stop. Zero code.

On RESOLVED only, write the feature brief to docs/shaping/[FEATURE-NAME]/feature-brief.md containing:
- Goal -- one or two sentences defining done
- Actors
- Main success flow
- Named alternative flows, each with a trigger step and an ending
- Numbered acceptance criteria, each specific and verifiable
- Non-goals, each with the reason it is out

Do not write the brief before a stop condition fires. Do not split it into slices or write
files in specs/ -- SHAPE cuts the brief into slices and writes one spec per slice.
```

---

### Open a Wayfinder Map (high fog)

**When to use:** The gate returned WAYFINDER. Multi-session fog clearing before any brief exists.
**Produces:** A walked map, a fog-of-war metric at zero, and the feature brief it generates.

```
Open a Wayfinder map at docs/wayfinder/[FEATURE-NAME]/ from [A3-PATH] and the seed tickets in
[GATE-OUTPUT-PATH].

Rules:
- One agent session per ticket. Do not walk two tickets in one session.
- Set blocking relationships so that dependency order is enforced.
- Record the fog-of-war metric after each ticket: state what is still unknown.

Return condition: the fog-of-war metric is empty. Then run "to spec" and write the result to
docs/shaping/[FEATURE-NAME]/feature-brief.md in the same format the grill path produces.

A ticket that cannot be resolved is a finding, not a failure. Record it as a constraint in the
map, and carry it into the brief as a non-goal with its reason.
```

---

### Handing Over to the Loop

Once the feature brief exists, the problem space is finished. Step 4b (`prompts/04b-design.md`) applies only to
visual surfaces -- APIs, business logic, backend services and infrastructure go straight to SHAPE.

From SHAPE onward, use the phase prompts in `AI engineering feature loop.md`:

| Phase | Where |
| ----- | ----- |
| 1 SHAPE | loop document, Phase 1 -- the `/shaping` skill carries the R x S fit checks |
| 2 IMPLEMENT | loop document, Phase 2 |
| 3 VERIFY | loop document, Phase 3 -- run in a NEW session, fresh context |
| 4 DRIFT AUDIT | loop document, Phase 4 |
| 5 RETROSPECTIVE | loop document, Phase 5 |
