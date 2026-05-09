---
description: Run an SEO audit + fix pass — meta tags, OG, JSON-LD, sitemap, robots, RSS.
argument-hint: "[page-name?]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent
---

Delegate to the `seo-auditor` subagent.

If `$ARGUMENTS` names a specific page, scope to that page; otherwise run a site-wide pass.

The agent will:
1. Verify every page has the SEO baseline: `<title>`, `<meta description>`, canonical, OG, Twitter card, favicon.
2. Add or fix JSON-LD structured data per page type (`WebSite`, `Person`, `Article`, `SoftwareApplication`, `Blog`).
3. Create or update `robots.txt` and `sitemap.xml` at the repo root.
4. Create or update `feed.xml` (RSS 2.0) listing every article in `articles/` newest first.
5. Unify favicon path (currently `mathlogame-favicon.ico` on home, `favicon.png` elsewhere — pick one).

After fixes, hand to `code-reviewer`. Report a before/after table showing which baseline items each page now satisfies.

If the user passes the `--validate` flag, additionally `WebFetch` a public meta-tag inspector to confirm tags render correctly.
