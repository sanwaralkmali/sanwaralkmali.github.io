---
description: Run a full multi-axis audit of the site (visual, perf, SEO, a11y) and return a prioritized punch list.
argument-hint: "[page-name?]"
allowed-tools: Read, Glob, Grep, Bash, Agent
---

Run a full audit of the site. If the user passed a specific page in `$ARGUMENTS`, scope to that page only; otherwise audit every `.html` page at the repo root and under `articles/`.

For each page, run **four parallel checks** by delegating to the corresponding subagents in a single message:

1. `designer` — visual polish, brand consistency, layout issues
2. `seo-auditor` — meta tags, OG, JSON-LD, canonical, sitemap coverage
3. `a11y-auditor` — WCAG 2.1 AA findings with severity
4. `performance-optimizer` — image weight, render-blocking, CDN bloat

Each agent returns its own findings list. Then YOU consolidate into a single prioritized punch list with these columns:

```
| # | Severity | Axis | Page | Finding | Suggested fix | Estimated effort |
```

Severity scale: critical → high → medium → low.
Estimated effort: S (≤15 min) / M (≤1 hr) / L (multi-hour).

End with a "**Top 5 wins**" section: the items that give the most value for least effort. Present these as the recommended next sprint.

Do NOT apply any fixes during the audit — this is read-only diagnosis. The user picks what to ship after seeing the punch list.
