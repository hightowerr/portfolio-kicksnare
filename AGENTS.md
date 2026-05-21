<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Application Building Context

Read these files **in order** before implementing or making any architectural decision:

1. `docs/context/project-overview.md` — product definition, goals, features, and scope
2. `docs/context/architecture-context.md` — system structure, boundaries, storage model, and invariants
   - `docs/context/thinking/architecture-report.md` — framing architecture decisions to drive decisions and learnings
3. `docs/context/ui-context.md` — theme, colors, typography, canvas design, and component conventions
4. `docs/context/code-standards.md` — implementation rules and conventions
5. `docs/context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `docs/context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `docs/context/progress-tracker.md` after each meaningful implementation change. If implementation changes the architecture, scope, or standards in the context files, update the relevant file before continuing.

The design system (CSS tokens, component previews, JSX examples) lives in `docs/context/design-system/project/`. The canonical CSS foundation is `docs/context/design-system/project/colors_and_type.css`. The full visual reference prototype is `docs/context/design-system/project/ui_kits/marketing/Momentum Capital.html`.

---
