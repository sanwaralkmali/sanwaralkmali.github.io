# CLAUDE.md

> Project guide for Claude. Read this first, on every task. It is the source of truth for stack, conventions, brand, and the upgrade roadmap. If anything below contradicts code you find, the code is wrong — fix it (and update this file if the convention changed intentionally).

---

## 1. Project at a glance

- **Name:** Salah Alkmali — personal site (developer / math educator / writer)
- **URL:** https://sanwaralkmali.github.io
- **Repo:** `sanwaralkmali/sanwaralkmali.github.io` (GitHub Pages, `main` branch deploys)
- **Owner:** Salah Alkmali — full-stack developer & math teacher
- **Audience:** recruiters, fellow educators, students, parents
- **Purpose:**
  1. Represent Salah as a developer and educator (portfolio + bio)
  2. Showcase a curated set of projects — including MATHLOGAME, which now lives at https://mathlogame.com (separate site)
  3. Publish blog articles on math, learning, and ed-tech
- **Status:** v2 ready to ship. Pivot from "MATHLOGAME platform" → personal site is complete. See `PIVOT_BRIEF.md`, `PIVOT_PLAN.md`, `DESIGN_SPEC_v2.md` (current spec; v1 superseded). Phases 1–4 + about-merger + v2 visual redesign all landed in the working tree, uncommitted. Editorial × Developer direction: Lora display + Inter body, warm rust accent, ink-blue base, asymmetric hero, editorial project/writing rows.

## 2. Stack & constraints

**Hard constraint: stay vanilla.** Site is plain static HTML + CSS + JS, deployed by GitHub Pages from `main`. **Do not** introduce Node, npm, Vite, Astro, React, TypeScript, a CSS preprocessor, or any build step without the user explicitly asking. No `package.json`, no `dist/`, no compiled output.

- **Markup:** semantic HTML5, one file per page at the repo root (`index.html`, `about.html`, `projects.html`, `blog.html`, `tools.html`, `now.html`). Articles live under `articles/`, project case studies under `projects/`, interactive tools under `tools/`, Arabic content under `ar/`.
- **Styles:** plain CSS in `assets/css/`. Variables-first; `style.css` is the shared base, `tools.css` is the only per-page sheet. Article pages use `articles/modern-article.css`.
- **Scripts:** plain JS, no modules/bundler. `assets/js/main.js` is site-wide (nav + contact modal + theme toggle + subscribe). Article pages additionally load `articles/reader.js` (reading progress + theme toggle + subscribe).
- **Third-party (CDN only, no installs):**
  - Boxicons 2.1.1, Font Awesome (kit), KaTeX 0.16.11, Buttondown embed (no JS — form post), EmailJS browser SDK 3.x.
- **Fonts:** Google Fonts → **Inter** (body, 400/500/600) and **Lora** (display, 400/600/700 + italics) on root pages; **Cairo** (300/400/500/600/700) on article pages and Arabic pages only.

## 3. Repository layout

```
.
├── CLAUDE.md                 ← this file
├── .claude/                  ← agent config (settings, agents, commands)
├── index.html                ← home — personal landing + about + projects + writing teasers
├── about.html                ← meta-refresh stub → /#about (kept for inbound-link compat)
├── projects.html             ← 6-card projects grid
├── tools.html                ← interactive math tools index
├── blog.html                 ← article index ("Writing")
├── now.html                  ← /now page (current focus, updated manually)
├── projects/
│   ├── mathlogame.html       ← FULL case study (flagship — sourced from mathlogame.md)
│   ├── mithaq.html           ← FULL case study (sourced from Mithaq.md — five modes + tech stack)
│   ├── routiney.html         ← case study stub
│   ├── math-booklet.html     ← case study stub
│   ├── python-course.html    ← case study stub
│   └── book-design-web.html  ← case study stub
├── tools/
│   ├── quadratic.html        ← interactive parabola visualizer (vanilla SVG + sliders)
│   └── linear-equation.html  ← step-by-step linear-equation solver (KaTeX + templates)
├── ar/                       ← Arabic content (RTL — Cairo font, /ar/ URL prefix)
│   ├── index.html            ← Arabic landing / intro
│   └── articles/
│       └── better-marks.html ← translated article (draft, hreflang-linked to English)
├── articles/
│   ├── *.html                ← published articles (one file each)
│   ├── modern-article.css    ← shared article stylesheet
│   └── reader.js             ← article-page JS (reading progress + theme + subscribe)
└── assets/
    ├── css/                  ← style.css (base), tools.css (tools pages only)
    ├── js/                   ← main.js (site-wide)
    ├── images/
    │   ├── LOGO/             ← MATHLOGAME wordmarks (used on projects/mathlogame.html hero — light/dark variants)
    │   ├── Projects/         ← portfolio thumbnails
    │   └── profile/          ← profile.jpg
    ├── articles/<slug>/      ← cover + inline images for each article
    ├── Worksheet PDFs/       ← printable skill worksheets
    ├── More Examples/        ← printable example sets
    └── cheatsheet/           ← short-form skill PDFs
```

## 4. Brand & design system

The visual language is **dark, warm, editorial** — ink-blue backgrounds, warm rust accent, Lora display headings, Inter body text. Personal and credible, not flashy.

### Color tokens (defined in `assets/css/style.css`)

| Token | Value | Use |
|---|---|---|
| `--accent` | `#c2714f` (warm rust, dark mode) | primary actions, links, focus rings, active states |
| `--accent-hover` | `#d4845f` | hover state |
| `--accent-focus-ring` | `rgba(194,113,79,0.45)` | focus rings |
| `--accent-muted` | `rgba(194,113,79,0.12)` | active pill background |
| `--bg-primary` | `#0d1117` (ink blue) | page background |
| `--bg-secondary` | `#161c24` | nav, cards |
| `--bg-tertiary` | `#1f2836` | elevated surfaces, form inputs |
| `--text-primary` | `#f0ede8` (warm white) | body text on dark |
| `--text-secondary` | `#c9c3b8` | secondary copy |
| `--text-muted` | `#8b8378` | meta, captions |
| `--border` | `#2a3340` | default borders |
| `--border-subtle` | `#1e2733` | subtle dividers |
| `--border-strong` | `#3d4f62` | strong borders |

**Light-mode overrides** (`html[data-theme="light"]`):
- `--bg-primary: #faf8f4`, `--bg-secondary: #f2f0eb`, `--bg-tertiary: #e8e5de`
- `--text-primary: #1a1612`, `--text-secondary: #3d352c`, `--text-muted: #6b5f54`
- `--accent: #9e5a3a`, `--accent-hover: #8a4c30`
- `--border: #d4cfc7`, `--border-subtle: #e4e0d8`, `--border-strong: #b8b0a5`

**Legacy aliases** (preserved at bottom of `:root` — do not remove): `--primary-color: #6366f1`, `--font-primary: 'Cairo', Arial, sans-serif`, `--light-purple: var(--accent)`, etc. Articles and old components reference these.

**Note on the article subsystem:** `articles/modern-article.css` defines its own `--primary-color: #4bb3fd` (sky-blue) and loads Cairo. This is intentional. Don't touch it.

### Typography

| Role | Family | Token |
|---|---|---|
| Display / headings | `Lora` (Google Fonts, serif) | `--font-display` |
| Body / UI | `Inter` (Google Fonts, sans-serif) | `--font-family` |
| Articles only | `Cairo` (loaded in article `<head>`) | — |

- Root pages (`index.html`, `projects.html`, `blog.html`, `now.html`, `projects/*.html`) load Inter + Lora via Google Fonts.
- Articles load Cairo. Do not add Inter/Lora to article heads.
- Use the `--font-size-*` scale (xs → 5xl). `--line-height-prose: 1.7` on body, `--line-height-display: 1.1` on headings.

### Spacing, radius, shadow
Use the `--spacing-*` (xs → 4xl), `--radius-*` (sm → 2xl), and `--shadow-*` (sm → xl) tokens. If a value isn't in the scale, extend the scale rather than hardcoding.

### Key layout components

- `.container` — max-width 800px, centered, editorial width
- `.container-wide` — max-width 1000px, for wider layouts
- `.index-hero` — asymmetric CSS grid (55% text / 45% portrait, stacked on mobile)
- `.project-row` / `.writing-row` — editorial flex rows (image right on desktop, stacked on mobile)
- `.currently-block` — left border in `var(--accent)`, no card background
- `.fade-in` / `.fade-in--visible` — IntersectionObserver-driven reveal (JS in `main.js`, guarded by `prefers-reduced-motion`)
- `.hero-text-link` / `.prose-link` — underline-grow animation via `background-size` transition

### Motion
- Micro-interactions use CSS transitions (`--transition-fast/normal/slow`).
- `.fade-in` elements are wired by `main.js` IntersectionObserver. The observer skips animation when `prefers-reduced-motion: reduce` is set.
- Do NOT add a blunt `* { animation: none }` block. Gate per-animation.

### Brand voice
First-person ("I built…", "in my classroom…"), warm, direct, no jargon, no hype. Targets recruiters, educators, and students. Examples to match:
- Hero eyebrow: *"Developer · Educator · Writer"*
- Hero h1: *"Salah Alkmali"*
- Hero sub: *"I build tools for learning and teach high-school math."*
- Article excerpt: *"Stop memorizing and start understanding."*
- Footer location: *"Istanbul, 2026."*

## 5. Conventions

### HTML
- `<html lang="en" dir="ltr">` on every page (be ready to flip to `dir="rtl"` for Arabic content).
- Always include viewport meta and a real `<title>` of the form `<Page> - <Context>` (e.g. `Blog - Salah Alkmali`).
- Nav block is duplicated across pages — when you change it on one page, change it on all of them (`index.html`, `projects.html`, `blog.html`, `now.html`, `projects/*.html`, `tools/*.html`, `tools.html`). **Nav has 4 items: Home / About / Projects / Blog.** Tools pages are intentionally NOT linked from nav or footer — MATHLOGAME is the flagship and the small standalone tools (Quadratic Visualizer, Linear Equation Solver) shouldn't visually peer with it. The pages are still live and indexable; they just aren't promoted in chrome. The "About" nav link points to `/#about` — it's a same-page anchor on `index.html` and a cross-page anchor everywhere else. Skip `about.html` itself; it's a meta-refresh redirect stub. Set `class="nav-link active"` on the current page only.
- Footer block is also duplicated — same rule.
- Image `alt` is required, non-empty, and descriptive. Decorative bg-icons may use a short alt like `"Math symbol"`.
- Use semantic landmarks: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Don't wrap pages in stray `<div>`s.

### CSS
- Author in plain CSS. Variables first. New tokens go on `:root` in `assets/css/style.css`.
- File policy: shared rules in `style.css`; per-page rules only when the surface is genuinely distinct (currently just `tools.css` for `/tools/*.html`). Articles have their own subsystem in `articles/modern-article.css`. Don't add new per-page sheets without a real reason.
- Class names: kebab-case, BEM-ish (`.feature-card`, `.feature-icon`, `.nav-link.active`). Avoid utility-class spaghetti.
- Mobile-first. Breakpoints already used in the codebase: ~`768px` and `~1024px`. Match them.

### JavaScript
- Plain ES2017+ in script tags, no modules, no bundler.
- New behavior goes in `assets/js/main.js` (site-wide) or a new `assets/js/<feature>.js` loaded only on the page that needs it. Don't add inline `<script>` for non-trivial logic — the hero animation is the one grandfathered exception.
- Guard all DOM lookups (`if (el) { … }`) — same script runs on pages that may not contain the element.
- No frameworks. No jQuery (it isn't loaded).

### Articles (the most common content task)
A new article = a new `articles/<slug>.html` + a new card in `blog.html` + (usually) a cover image in `assets/articles/<slug>/`.

- Use `articles/modern-article.css` (already linked in `articles/better-marks.html` — copy that file as your template, not the older `whyMath.html`).
- Frontmatter-style header in HTML: title, author (`Salah Alkmali`), ISO-style date, read-time (`<n> min read`).
- Cover image lives at `assets/articles/<slug>/cover.png` (or similar). Reference relatively as `../assets/articles/<slug>/cover.png`.
- Add the matching card to `blog.html` at the **top** of `.blog-grid` (newest first), with `data-category="education|programming|technology"` so the filter buttons keep working.
- Add the new URL to `sitemap.xml` (top of the Articles section) and `feed.xml` (top item, bump `lastBuildDate`).

## 6. Things Claude should never do

- ❌ Introduce a build step, package manager, or framework (see §2).
- ❌ Rewrite the CSS variable system or rename tokens — downstream pages depend on the legacy aliases at the bottom of `:root`.
- ❌ Touch `.git/`, `desktop.ini`, or anything in `.git/hooks/`.
- ❌ Commit or push on the user's behalf. Stage suggestions in chat; let Salah run `git`.
- ❌ Pull in new CDN dependencies casually. Ask first — the dependency list is already long.
- ❌ Edit one page's nav/footer without updating the other pages.
- ❌ Convert articles in `articles/` to a generator/templating system without an explicit ask.
- ❌ Delete `assets/Worksheet PDFs/`, `assets/More Examples/`, `assets/cheatsheet/` — those are linked from outside the site.

## 7. Things Claude should do, by default

- ✅ Use the existing design tokens. If a value isn't tokenized and should be, add the token.
- ✅ Run an a11y + SEO sanity check on any page you touch (alt text, heading order, `<title>`, meta description, og tags).
- ✅ Optimize images you add (target ≤ 200KB for hero/cover PNGs; prefer `.webp` with `.png` fallback if introducing new assets).
- ✅ Keep changes small and reviewable. One concern per edit.
- ✅ Verify in a browser-style read of the file after editing — re-open it, spot-check the diff in context.
- ✅ Mirror nav/footer changes across all top-level pages.
- ✅ For any non-trivial task, delegate to the right subagent in `.claude/agents/` — don't try to be designer + engineer + reviewer in one pass.

## 8. Upgrade roadmap (god-mode targets)

The user wants this site upgraded across four axes. Treat these as the standing backlog; pull from it whenever the user asks "what's next?".

### A. Visual redesign & polish
- Tighten the home hero — the floating math-symbols animation is fun but can feel busy on small screens; gate its density on viewport width and `prefers-reduced-motion`.
- Add a real `og:image` per page; the social preview is currently weak.
- Audit color contrast against WCAG AA (text-secondary on bg-secondary is the borderline pair).
- Consider a subtle light-mode toggle (defer until asked — current dark-only is intentional).
- Replace the kit.fontawesome.com kit URL with self-hosted icons or downsize to only used icons (perf + reliability).

### B. Performance & SEO
- Add `<meta name="description">`, Open Graph, and Twitter card tags to **every** page (most are missing them).
- Add `sitemap.xml` and `robots.txt` at repo root.
- Add JSON-LD structured data: `Person` on `about.html`, `Article` on each post, `WebSite` on `index.html`.
- Lazy-load below-the-fold images (`loading="lazy"`).
- Convert hero/cover PNGs to WebP with PNG fallback.
- Inline critical CSS for the hero; defer the rest.
- Trim unused CDN deps (do we really need both anime.js and animate.css and lordicon? answer in an audit before removing).
- Set explicit `width`/`height` on `<img>` to eliminate CLS.

### C. Accessibility (a11y)
- Heading hierarchy audit — only one `<h1>` per page; no skipped levels.
- Keyboard-only nav pass: focus rings, tab order, modal trap on contact form.
- ARIA: contact modal needs `role="dialog"` + `aria-modal="true"` + labelled-by.
- Form inputs need real `<label>` elements (placeholders aren't labels).
- Color contrast pass against WCAG AA.
- Add a "skip to main content" link.
- Test with VoiceOver / NVDA mentally before shipping.

### D. Content & blog system
- Add reading-progress bar and per-article TOC for long posts.
- Add prev/next article links at the bottom of each post.
- RSS feed at `/feed.xml` (hand-authored XML is fine; no build step).
- Tag pages (programming / education / technology) — currently filter is client-side only; consider real per-tag URLs for SEO.
- Tag pages with real per-tag URLs (currently client-side filter only).

## 9. Workflow & local preview

- Local preview: VS Code Live Server on port **5501** (already configured in `.vscode/settings.json`).
- Deploy: `git push origin main` → GitHub Pages rebuilds automatically.
- Branching: `main` is production. For larger upgrades, create a feature branch and have the user review before merging.

## 10. When in doubt

1. Re-read this file.
2. Check `.claude/agents/` — there's likely a specialist for what you're doing.
3. Read the existing analogous code (e.g. for a new article, copy `articles/better-marks.html`).
4. If still unsure, ask the user one focused question rather than guessing.
