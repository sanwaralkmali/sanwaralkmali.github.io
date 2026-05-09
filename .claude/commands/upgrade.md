---
description: Pull the next item from the god-mode upgrade roadmap (CLAUDE.md §8) and execute it end-to-end.
argument-hint: "[axis: visual|perf|seo|a11y|content]"
allowed-tools: Read, Edit, Glob, Grep, Bash, Agent
---

The user wants to make progress on the upgrade roadmap defined in `CLAUDE.md` section 8.

If `$ARGUMENTS` names an axis (`visual`, `perf`, `seo`, `a11y`, `content`), pull the next unfinished item from that axis. Otherwise, look across all four axes and propose the highest-leverage next item.

Workflow:

1. **Read** `CLAUDE.md` section 8 in full.
2. **Pick** the next item. Tell the user which one and why ("highest-leverage given current state because…").
3. **Confirm** with the user before doing meaningful work — show the proposed scope and ask "ship this now, or pick a different item?".
4. **Execute** by delegating to the right specialist subagent(s) — typically `designer`/`frontend-engineer` for visual, `performance-optimizer` for perf, `seo-auditor` for SEO, `a11y-auditor` for a11y, `content-writer` for content.
5. **Review** with `code-reviewer` before reporting done.
6. **Update** the roadmap in `CLAUDE.md` — strike through or check off the completed item, and propose what should come next.

End with the suggested commit message and the exact `git` commands for the user to run (do not push yourself).
