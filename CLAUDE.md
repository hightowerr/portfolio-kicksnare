@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Application Building Context

Read these files **in order** before implementing or making any architectural decision:

1. `docs/context/project-overview.md` — product definition, goals, features, and scope
2. `docs/context/architecture-context.md` — system structure, boundaries, storage model, and invariants
3. `docs/context/ui-context.md` — theme, colors, typography, canvas design, and component conventions
4. `docs/context/code-standards.md` — implementation rules and conventions
5. `docs/context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `docs/context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `docs/context/progress-tracker.md` after each meaningful implementation change. If implementation changes the architecture, scope, or standards in the context files, update the relevant file before continuing.

The design system (CSS tokens, component previews, JSX examples) lives in `docs/context/design-system/project/`.

---

## Environment

- **Platform:** WSL2 / Ubuntu on Windows — use bash/Unix commands only
- **Package manager:** `pnpm` (never `npm`)
- **Paths:** forward slashes; never Windows-style paths

---
