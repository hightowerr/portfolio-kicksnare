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
