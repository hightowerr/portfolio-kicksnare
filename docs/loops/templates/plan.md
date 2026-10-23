# Plan <W.NN> — <slice name>

> Structure only. Behaviour lives in the use case or spec named below; do not restate it here.
> Plans adapt to code: the drift audit edits this file freely. The spec changes only through re-approval.
> No acceptance criteria here — the verifier reads them from the spec or use case.

**Slice:** <slice> · **Wave:** <N> · **Depends on:** <plans> · **Unblocks:** <plans>
**Implements:** UC-<n> flows <main | A1 | A2 …> — or spec `specs/<slice>.md`
**Rigor:** spec-first | spec-anchored (gate: `<slice>: shape:approved` in the loop contract)
**Criteria:** <AC IDs this plan satisfies>
**Read first:** <signals, patterns, code files, code-standards sections>

## Approach

<Numbered structural decisions: modules, seams, data shapes, message text, error codes, export names.
Fix names and codes here, or parallel agents invent different ones.>

1. <decision>

## Files to create

```
<path>
```

## Files to modify

```
<path>    <why>
```

## Packages

<Every package added, with the pinned version and the reason. "none" if none.>

## Environment and fixtures

<Env vars and what an unset value does. Seed rows. Fixture principals (id, credential, why that row).
Secrets, and whether the orchestrator or a human provides them.>

## Architecture context updates needed

<Queued for RETRO step 3b: invariants, flows, env vars, routes. "none" if none.>

## Deviations (implemented YYYY-MM-DD)

<Filled by the implementing agent. Every file touched outside the lists above, root config included.
Structural deviations land here. A behaviour deviation on a spec-anchored slice is a decision owed:
stop and log it in docs/context/current-issues.md instead.>

| # | File or decision | Deviation | Why | Pattern reused |
|---|------------------|-----------|-----|----------------|
| 1 | `docs/loops/work-log.md` | appended session entry | loop rule 12 | — |
