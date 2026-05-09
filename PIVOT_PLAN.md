# Pivot Plan — sanwaralkmali.github.io

> Phase 0 sign-off doc. Captures Salah's answers from the Phase 0 questionnaire and locks the scope before any code change. Source brief: `PIVOT_BRIEF.md`.

**Status:** awaiting sign-off
**Date:** 2026-05-09
**Branch (when work starts):** `pivot/personal-site`

---

## Mission (locked)

Pivot the site from "the MATHLOGAME platform" to **Salah Alkmali's personal website** — three pillars: About, Projects, Blog. MATHLOGAME becomes one project card linking out to `mathlogame.com`.

## Decisions from Phase 0

| # | Question | Decision |
|---|---|---|
| 1 | Domain | **Stay on `sanwaralkmali.github.io`.** No DNS work. GitHub Pages keeps deploying from `main`. |
| 2 | Visual direction | **Modern dev-personal.** Sharp dark, polished cards, indie-developer feel. Tight grid, clean type, subtle gradients. References: brianlovin.com, leerob.io. |
| 3 | Project shortlist | 6 projects (see below) |
| 4 | Worksheet PDFs | **Keep at current paths.** Zero risk to inbound links. Revisit later. |
| 5 | New additions | **Per-project case studies**, **light-mode toggle**, **`/now` page**. (Newsletter signup deferred.) |

## Project shortlist for `/projects.html` (in display order)

| # | Title | Tagline (draft — I'll refine in Phase 3) | Thumb | Links to |
|---|---|---|---|---|
| 1 | **MATHLOGAME** | Math games platform — sister site | `assets/images/Projects/mathlogame.jpeg` | `mathlogame.com` |
| 2 | **Mithaq** *(NEW)* | A Quran companion app for Muslim students. Read · Listen · Reflect · Understand · Memorize. Next.js · TS · Supabase. | `assets/images/Projects/mithaq.png` | https://mithaq-vert.vercel.app/ + [github.com/sanwaralkmali/Mithaq](https://github.com/sanwaralkmali/Mithaq) |
| 3 | **Routiney** | Habit / routine app | `assets/images/Projects/Routiney.png` | TBD |
| 4 | **Math Booklet** | Printable / digital math booklet | `assets/images/Projects/math-booklet.png` | TBD |
| 5 | **Python Course / Book** | Python educational content | `assets/images/Projects/Python-book.png` | TBD |
| 6 | **Book-design-web** | Book-design site | `assets/images/Projects/Book-design-web.png` | TBD |

Per the Phase-5 add-on choice, each card links to `/projects/<slug>.html` (case-study sub-pages), which in turn deep-link to the live project / repo / mathlogame.com.

## Open content gaps (need from you before Phase 3)

Flagging now so we have answers by the time we restructure pages:

1. **Mithaq thumbnail.** Drop a screenshot (~1200×750) at `assets/images/Projects/mithaq.png`. Without one I'll use a typographic placeholder.
2. **One-liner for Book-design-web** (#6) — what is it, what role did you have, link target?
3. **External links** for Routiney, Math Booklet, Python Course/Book, Book-design-web — live URL or GitHub repo for each (or "no link, case study only").
4. **Mithaq URL** — confirm `mithaq.app` is live and public, or give me the right link.
5. **`/now` page seed** — 4–6 bullets on what you're focused on right now (work, teaching, learning, reading). Can be skeletal; the page is meant to be casual.
6. **Personal hero copy** — one or two sentences. The new landing replaces "Where Learning Can Be Fun!" with something that reads as you, not a product. I'll draft a few options in Phase 2 if you'd rather react than write from scratch.

## Phase plan (locked, summarized)

| Phase | What | Output |
|---|---|---|
| **0** | Scope alignment | This doc — **awaiting sign-off** |
| **1** | De-MATHLOGAME cleanup | Drops mathlogame.html, dead CDNs, debug logs, obvious bugs (audit #26–28, #58). Commit: `chore: remove MATHLOGAME branding and dead deps` |
| **2** | New visual identity (designer agent) | Design spec + token diff (no code yet). Tokens land in `CLAUDE.md` §4 as a replacement, not append |
| **3** | Restructure pages (frontend-engineer) | New index, new projects.html, trimmed about.html, rebranded blog chrome, every article header/footer updated |
| **4** | Quality passes (a11y + SEO + perf, parallel) | Closes every CRITICAL + HIGH from the audit |
| **5** | Final review (`code-reviewer` → `/ship`) | Go/no-go. I print git commands; you push |

## Constraints I'm honoring

- Vanilla HTML/CSS/JS, no build step.
- Zero broken article URLs.
- Light-mode toggle ships in Phase 2 (token system) + Phase 3 (toggle UI). I'll respect `prefers-color-scheme` and persist the user choice.
- I won't commit or push. After each phase: file list, what to review, what's next, what I need from you.
- I'll update `CLAUDE.md` §1 (project framing) at the end of Phase 1, and §4 (design tokens) at the end of Phase 2.

## Out of scope (deliberately deferred)

- Newsletter signup
- Custom domain migration
- Restructuring teaching PDFs
- Tag pages with real per-tag URLs (audit roadmap §8.D)

---

## Sign-off

Reply **"plan approved"** (or call out edits) and I'll start Phase 1. If you'd rather work the open content gaps first, tell me which — I can proceed with placeholders and you fill in copy as we go.
