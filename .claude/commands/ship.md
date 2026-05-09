---
description: Pre-deploy checklist — review staged changes, run full audits, and produce a go/no-go report. Does NOT push.
argument-hint: ""
allowed-tools: Read, Glob, Grep, Bash, Agent
---

Pre-deploy gate. The user wants a final sanity check before pushing to `main` (which auto-deploys via GitHub Pages).

Execute these phases in order:

**Phase 1 — What changed.**
- `git status` and `git diff --stat` to inventory the changeset.
- `git diff` for the full diff. Read it.
- If the working tree is clean, stop and tell the user there's nothing to ship.

**Phase 2 — Parallel review.** Delegate in a single message to:
- `code-reviewer` — convention adherence, cross-page side effects, correctness
- `a11y-auditor` — regression check on changed pages
- `seo-auditor` — meta/OG/JSON-LD on changed pages
- `performance-optimizer` — weight regression, new CDN deps, image hygiene

**Phase 3 — Synthesize.** Produce a single go/no-go report:

```
VERDICT: GO  |  GO-WITH-FIXES  |  NO-GO

CHANGED FILES (n):
  - …

BLOCKERS (must fix before ship):
  - …

WARNINGS (ship is OK, but file follow-up):
  - …

POST-DEPLOY CHECKS (run after push):
  - Verify https://sanwaralkmali.github.io reflects the change
  - Re-run Lighthouse on the changed pages
  - Spot-check OG preview on a social card debugger
```

**Phase 4 — Hand-off.** Do NOT run `git commit` or `git push`. Print the exact commands for the user to run themselves:

```
git add -A
git commit -m "<suggested message>"
git push origin main
```

Suggested commit message follows Conventional Commits (`feat:`, `fix:`, `perf:`, `a11y:`, `seo:`, `content:`, `style:`, `refactor:`, `chore:`).
