---
description: Publish a new blog article — turn a markdown draft (or a topic) into a live HTML post with cover, blog-card, and SEO.
argument-hint: "<slug-or-topic> [--from nextArticle.md]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent
---

Publish a new article end-to-end. The argument is either:
- a **slug** like `why-students-quit-math` (use the existing draft in `nextArticle.md` if `--from nextArticle.md` is passed, or ask the user for the topic)
- a **topic phrase** — in which case derive a kebab-case slug from it

Pipeline (run these phases in order; each phase ends before the next begins):

**Phase 1 — Draft.** Delegate to `content-writer`:
- If `nextArticle.md` exists and the user wants it published, use that as the source.
- Otherwise draft fresh prose in Salah's voice. Get user sign-off on the headline + opening paragraph BEFORE proceeding.

**Phase 2 — Build the page.** Delegate to `frontend-engineer`:
- Copy `articles/better-marks.html` to `articles/<slug>.html`.
- Replace `<title>`, `<h1>`, meta block, cover image src, and body.
- Save the cover image to `assets/articles/<slug>/cover.png` (ask the user if they have one; otherwise placeholder + flag for follow-up).

**Phase 3 — Register in the index.** Edit `blog.html`:
- Insert a new `<article class="blog-card">` at the **top** of `.blog-grid` (newest first).
- Set `data-category` to one of `education`, `programming`, `technology` based on topic.
- Date chip uses today's day + 3-letter month.
- Tags reuse existing tag styles.

**Phase 4 — SEO.** Delegate to `seo-auditor`:
- Add `<meta name="description">`, OG, Twitter card, canonical.
- Add JSON-LD `Article` schema with proper author/publisher/datePublished.
- Update `sitemap.xml` (create it if missing) and `feed.xml` (create it if missing).

**Phase 5 — Cleanup.** If the source was `nextArticle.md`, empty its contents (don't delete the file — the user uses it as a scratchpad for the next idea).

**Phase 6 — Review.** Delegate to `code-reviewer` for a final pass before reporting.

Final report to the user must include: the new article URL (`https://sanwaralkmali.github.io/articles/<slug>.html`), the local file path, and a one-line summary of what the article is about.
