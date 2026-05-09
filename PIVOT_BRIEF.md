# Pivot brief — sanwaralkmali.github.io

> Hand this to your AI agent (e.g. start a new Claude Code session in the repo and paste this in). It assumes `CLAUDE.md` and `.claude/agents/` are already in place, and that you have the audit punch list from the last `/audit` run available to share when asked.

---

## Mission

Pivot **sanwaralkmali.github.io** from "the MATHLOGAME platform" to **Salah Alkmali's personal website**. MATHLOGAME has spun off to its own domain (`mathlogame.com`) and no longer needs to live here. From now on, this site exists to represent Salah — the developer, the teacher, the writer.

The end state: a small, refined personal site with three pillars — **About**, **Projects**, **Blog** — built to a craft level that would make a hiring manager, a fellow educator, and a curious student all stop and read.

## Outcomes I want

1. The site reads as Salah's personal home on the web. The MATHLOGAME pitch is gone from the front door.
2. MATHLOGAME is repositioned as **one project among several** on a new projects page, linking out to `mathlogame.com`.
3. Visual identity is refreshed — keep the warmth, drop the playground feel. Aim for "indie developer who teaches" rather than "ed-tech startup".
4. All four axes from `CLAUDE.md` §8 ship to a high standard (visual / perf / SEO / a11y).
5. The blog continues as a first-class section. Existing article URLs do **not** break.

## Information architecture (new)

| Path | Page | Purpose |
|---|---|---|
| `/` (index.html) | Landing | Brief hero, "what I do", 3 selected projects, latest articles, contact CTA |
| `/about.html` | About | Long-form bio + teaching philosophy + experience timeline (sourced from current `about.html`) |
| `/projects.html` | **NEW** Projects | Full portfolio grid using existing `assets/images/Projects/` thumbnails. MATHLOGAME is one card here. |
| `/blog.html` | Blog index | Keep, just rebrand chrome |
| `/articles/*.html` | Articles | Keep all existing files and slugs. Update header/footer chrome to drop MATHLOGAME. |

**Delete or relocate:**
- `mathlogame.html` — delete.
- `assets/css/mathlogame-brand.css` — delete (or fold the gradient into a project-card styling for the MATHLOGAME card on projects.html).
- `--mathlogame-gradient` token — keep only if used by the MATHLOGAME project card; otherwise delete.
- MATHLOGAME logos as the **site** logo — replace with a typographic "Salah Alkmali" wordmark in the nav (no new image asset needed).
- "Powered By MATHLOGAME" footer on articles — replace with a personal footer.

**Decide with me before touching:**
- `assets/Worksheet PDFs/`, `assets/More Examples/`, `assets/cheatsheet/` — `CLAUDE.md` says these are linked externally. Options: (a) keep at current paths, (b) move under `assets/teaching/` and set up redirects, (c) move to `mathlogame.com` entirely. I'll tell you which when you ask.

## Constraints (non-negotiable)

- Vanilla HTML / CSS / JS. No build step. (`CLAUDE.md` §2)
- GitHub Pages from `main`. Stays at `sanwaralkmali.github.io` unless I tell you otherwise.
- Don't break inbound links to existing articles.
- No commits, no pushes — stage suggestions and let me run `git`.
- Update `CLAUDE.md` itself as the project identity shifts (the "MATHLOGAME platform" framing in §1 needs rewriting).

## Quality bar

- Lighthouse ≥ 95 mobile across Performance, Accessibility, Best Practices, SEO.
- WCAG 2.1 AA — every CRITICAL and HIGH item from the audit must be resolved.
- Every page has the SEO baseline: title, meta description, canonical, OG, Twitter card, JSON-LD.
- `sitemap.xml`, `robots.txt`, `feed.xml` exist and are accurate.
- No render-blocking dead CDNs. No image > 200 KB on the critical path.

## Phased execution — checkpoint with me at every phase boundary

Run these as discrete phases. After each one, post a short report and **wait for my approval** before moving on. Use the subagents in `.claude/agents/` — don't try to do everything yourself.

### Phase 0 — Scope alignment (no code)
Before writing anything, ask me:
1. Custom domain, or stay on `sanwaralkmali.github.io`?
2. Visual direction — keep warm dark theme, or pivot more minimal/editorial? Drop me 2–3 reference sites and let me pick.
3. Project shortlist — which 5–8 projects headline `/projects.html`? (Pull candidates from `assets/images/Projects/`.)
4. What to do with the worksheet PDFs (see above).
5. Anything new I should add: newsletter signup, RSS, light-mode toggle, project case studies, "now" page?

Produce a one-page **Pivot Plan** doc summarizing my answers, and have me sign off on it.

### Phase 1 — De-MATHLOGAME (cleanup, low-risk)
- Delete `mathlogame.html`.
- Strip the MATHLOGAME logo from nav across `index.html`, `about.html`, `blog.html`, plus every article. Replace with the typographic "Salah Alkmali" wordmark.
- Update nav links: `Home / About / Projects / Blog` (Projects is a stub for now — it'll be built in Phase 3).
- Replace article footers ("Powered By MATHLOGAME") with a personal footer.
- Drop the three dead CDNs (anime.js, animate.css, lordicon) — Top-5 win #1 from the audit.
- Strip the 21 `console.log` debug statements from `main.js`.
- Fix the obvious bugs: `.copy-rights{background:red}`, `#spotlight{width:250}` missing `px`, `--border-radius-sm` typo (audit items #26–28, #58).

Commit suggestion: `chore: remove MATHLOGAME branding and dead deps`.

### Phase 2 — New visual identity (delegate to `designer`)
- Pick a tighter palette: keep the slate dark base; replace the indigo + amber + emerald trio with a single confident accent + one warm neutral. Indigo or a deeper teal both work.
- New typographic logo/wordmark for the nav.
- Define a refreshed hero for `/` — personal intro, not a product pitch.
- Tighten the type scale.
- Document the new tokens in `CLAUDE.md` §4 — replace, don't append.

Output of this phase is a **design spec + token diff**, not code.

### Phase 3 — Restructure pages (delegate to `frontend-engineer`)
- New `index.html` landing using the spec from Phase 2.
- New `projects.html` with the portfolio grid (use existing thumbnails).
- Trim `about.html` to a focused long-form bio. Keep the experience/skills sections; drop the MATHLOGAME promo blocks.
- Update `blog.html` chrome to match the new identity.
- Walk every article and update header/footer chrome.
- Verify nav consistency across all pages.

### Phase 4 — Quality passes (parallel — single message, three agents)
Delegate concurrently to:
- `a11y-auditor` — ship every CRITICAL + HIGH a11y item from the audit (skip-link, nav-toggle button semantics, modal ARIA + focus trap, real form labels, focus-visible rings, `prefers-reduced-motion` guard).
- `seo-auditor` — meta + OG + Twitter card + canonical on every page; create `sitemap.xml`, `robots.txt`, `feed.xml`; add JSON-LD (`Person` on about, `Article` on every post, `WebSite` on index, `BreadcrumbList` on articles).
- `performance-optimizer` — convert the 6 oversized cover PNGs to WebP with PNG fallback (audit items #4–7, #36–37); add `loading="lazy"` and intrinsic `width`/`height` to all `<img>`; defer the Font Awesome kit; self-host or properly preload Cairo.

### Phase 5 — Final review (delegate to `code-reviewer`, then run `/ship`)
- `code-reviewer` does a full read of the diff against the original audit punch list — every CRITICAL must be closed or explicitly accepted.
- Run `/ship` to produce the go/no-go report.
- Print the exact `git` commands for me to run. Don't push.

## How to work with me

- Small, reviewable commits per phase. Conventional Commits prefix (`feat:`, `chore:`, `perf:`, `a11y:`, `seo:`, `style:`, `refactor:`, `content:`).
- Branch name: `pivot/personal-site`.
- One concern per edit. If you find a tangential issue, surface it as a follow-up — don't rope it into the current phase.
- After each phase, post: what changed (file list), what I should review, what's next, what I need to decide.
- If you discover something the audit missed, flag it. Don't silently fix.
- Read `CLAUDE.md` before every phase. Update it when the project identity or conventions change.

## Reference material

- `CLAUDE.md` — project guide (already updated; you may need to edit §1 once the pivot lands).
- `.claude/agents/` — full subagent roster.
- `.claude/commands/` — `/audit`, `/optimize`, `/a11y-pass`, `/seo-pass`, `/new-article`, `/upgrade`, `/ship`.
- The audit punch list (90 items, with a Top 5 wins section) — I'll paste it when you start Phase 4.

---

**Start with Phase 0. Ask me the five questions, wait for answers, produce the Pivot Plan, and stop.**
