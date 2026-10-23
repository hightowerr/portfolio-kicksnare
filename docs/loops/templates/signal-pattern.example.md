<!-- Worked example. Copy the shape to docs/signals/patterns/<pattern-name>.md; do not copy this file there.
     Source: MA Carlton, wave V2, 2026-09-18. Four slices in the Used in list, so RETRO step 8 promotes it. -->
# Pattern: tx-first services

- Pattern name: tx-first-services
- Problem it solves: A service that opens its own database connection cannot join a transaction that its caller opened.
- Solution: Every transactional service takes the transaction client as its first argument, and only the caller opens the transaction.

```ts
await db.transaction(async (tx) => {
  await rebuildSessions(tx, schoolId, dates);
  await recompute(tx, schoolId, studentIds);
});
```

- First used in: slice 2.04
- Used in: 2.04, 2.08, 2.09, 2.10
- Reusable? YES
- Promoted to: skill
