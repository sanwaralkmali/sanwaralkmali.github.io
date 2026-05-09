---
description: Run a performance pass on the site or a specific page — image weight, render-blocking, CDN bloat, Core Web Vitals.
argument-hint: "[page-name?]"
allowed-tools: Read, Edit, Glob, Grep, Bash, Agent
---

Delegate to the `performance-optimizer` subagent.

If `$ARGUMENTS` names a specific page, scope the optimization to that page; otherwise do a site-wide pass.

The agent will:
1. Inventory CDN dependency usage and recommend deletions for any unused dep.
2. Add `width`, `height`, `loading="lazy"`, `decoding="async"` to `<img>` tags.
3. Add `defer`/`async` to `<script>` tags.
4. Convert hero/cover PNGs > 200KB to WebP with PNG fallback (or surface them as a follow-up if the conversion needs the user to provide the WebP).
5. Self-host or trim the Cairo font import.

After the agent's pass, hand to `code-reviewer` for a regression check, then report a before/after summary:
- Total page weight (KB)
- Number of HTTP requests
- LCP element + estimated LCP delta
- Critical CSS size

Do not push, commit, or deploy — present the diff for the user to review.
