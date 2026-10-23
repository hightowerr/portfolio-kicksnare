<!-- Worked example. Copy the shape to docs/signals/drift/<spec-slug>.md; do not copy this file there.
     Source: MA Carlton, wave V3, 2026-09-20 — rewritten in the v2.2 schema (adds Layer and Action). -->
# Drift: the mobile home plan formats dates without Intl

- Date: 2026-09-20
- Spec or plan: `v3-mobile-home-plan.md`, criterion 16
- What diverged: The plan asked for locale-aware date formatting, and the code uses fixed English month and day arrays.
- Layer: PLAN
- Classification: EVOLUTION
- Action: plan edit
- Why: The Android JavaScript engine ships a partial Intl, so fixed arrays give the same output on every build.
