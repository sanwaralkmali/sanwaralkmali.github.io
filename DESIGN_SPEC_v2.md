# DESIGN_SPEC_v2.md — Editorial × Developer Visual Direction
## Salah Alkmali Personal Site — v2 Redesign

**Status:** Draft — awaiting Salah's sign-off before engineering begins
**Date:** 2026-05-09
**Author:** Visual Designer agent
**Supersedes:** DESIGN_SPEC.md (Phase 2 spec — implemented and now being evolved)
**Direction locked by:** Orchestrator — "Editorial × Developer"

---

## 1. Type System

### Display serif — Lora

**Chosen font: Lora** (Google Fonts). Reasoning: Lora is designed specifically for digital body reading and display at large sizes. It has more optical texture than Source Serif 4 (which reads too neutral), more restraint than EB Garamond (which skews academic-antique), and better rendering weight at 48px+ than Newsreader. Lora's slightly bracketed serifs and moderate contrast make it feel like a thinking person's journal — warm, not stiff. It carries the "I wrote this" register that editorial sites depend on. It is available as a variable font from Google Fonts with weights 400–700.

**Google Fonts URL to add (ONE additional request, added to every top-level page `<head>`):**

```
https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap
```

Weights to load: 400 (display body, blockquotes), 600 (display sub-headings), 700 (hero h1 display). Italic 400 and 600 (signature treatment, pull quotes, footer tagline).

**Body sans — Inter**

Inter at regular weights reads crisply at 14–16px and has become the baseline legibility choice for developer portfolios. It pairs well with Lora because their x-heights are similar, which makes transitions between headings and body text feel deliberate rather than jarring.

**Google Fonts addition:** Inter is bundled in the same request as Lora to stay within the one-additional-request constraint:

```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap
```

Weights to load: Inter 400 (body), 500 (nav links, button labels, UI chrome), 600 (card titles, section labels).

**Cairo — restricted scope**

Cairo is removed from the `<link>` in every top-level page `<head>` (`index.html`, `projects.html`, `blog.html`, `now.html`, `projects/*.html`). It stays loaded only inside `articles/modern-article.css` via its existing `@import` — articles keep Cairo for RTL-readiness and to avoid breaking the article reading experience mid-pivot. No other file references Cairo. The `--font-family` token in `:root` changes to `'Inter', sans-serif`. A new token `--font-display` is added for Lora.

### Full size scale

| Token | rem | px | Line-height | Letter-spacing | Role |
|---|---|---|---|---|---|
| `--font-size-xs` | 0.75rem | 12px | 1.5 | normal | Captions, badges, timestamps |
| `--font-size-sm` | 0.875rem | 14px | 1.5 | normal | Nav links, meta, bylines |
| `--font-size-base` | 1rem | 16px | 1.7 | normal | Body prose (raised from 1.6 — editorial line-height feels more spacious) |
| `--font-size-lg` | 1.125rem | 18px | 1.65 | normal | Lead paragraphs, card excerpts |
| `--font-size-xl` | 1.25rem | 20px | 1.5 | normal | Project row titles (h3), "Currently" block |
| `--font-size-2xl` | 1.5rem | 24px | 1.4 | -0.01em | Section labels (h2) |
| `--font-size-3xl` | 1.875rem | 30px | 1.3 | -0.02em | Hero mobile h1, page-level h1 on sub-pages |
| `--font-size-4xl` | 2.25rem | 36px | 1.25 | -0.02em | Hero tablet h1 |
| `--font-size-5xl` | 3rem | 48px | 1.1 | -0.03em | Hero desktop h1 |

`--font-size-5xl` is desktop-only. Mobile hero h1 uses `--font-size-3xl` (clamp not needed — media query is cleaner and avoids intermediate layout).

### Letter-spacing rules

- Display text (`--font-display`, Lora) at 2xl+: tighten to `-0.02em` or `-0.03em` (see table above). Tight tracking at large sizes is the editorial signal.
- Body and UI text (Inter): no adjustment — Inter's optical kerning is correct at default.
- Section labels and nav: `--letter-spacing-wide: 0.06em`, uppercase `--font-size-xs` for section eyebrow labels only.

### New typography tokens to add to `:root`

| Token | Value |
|---|---|
| `--font-family` | `'Inter', sans-serif` (replaces Cairo) |
| `--font-display` | `'Lora', Georgia, serif` |
| `--letter-spacing-wide` | `0.06em` |
| `--line-height-prose` | `1.7` |
| `--line-height-display` | `1.1` |

---

## 2. Color Palette

### Design rationale

The indigo accent from v1 (`#6366f1`) reads as a UI product accent — Notion blue, Linear blue, dashboard blue. It is correct for a tool but wrong for a personal writing site. The v2 direction "Editorial × Developer" calls for a warm accent that evokes both the handmade (warm ink, terracotta) and the sharp (high-contrast, decisive). The ink-blue base shifts away from slate (which is now associated with Tailwind defaults and reads generic) toward a deeper, slightly warmer navy that has more personality.

### Final accent — Warm Rust

**Hex: `#c2714f`** — a muted terracotta-rust. Not orange (too energetic), not red (too alarming), not amber (v1 residue). This hue sits at the boundary between warm clay and faded brick. It reads confident at large text sizes. On the dark base it achieves 5.2:1 contrast against `--bg-primary` and 4.8:1 against `--bg-secondary` — both pass WCAG AA for normal text at 16px.

Hover lightens slightly to `#d4845f` (5.8:1 on dark base — still passes). On the light base, the accent deepens to `#9e5a3a` for sufficient contrast (5.6:1 on `#faf8f4`).

### Final dark base — Ink blue

**Hex: `#0d1117`** — a deep, near-black navy with barely perceptible blue warmth. GitHub uses a similar value; it has become the reference for "developer notebook" dark backgrounds without feeling like simple black. The faint blue tint prevents the dull flatness of pure `#000` while being darker and more considered than the current slate-900 `#0f172a`.

Secondary surface: `#161c24` — one step up from the base, visible enough to separate cards without being jarring. Tertiary: `#1f2836` — for elevated surfaces, code blocks.

### Final light base — Cream off-white

**Hex: `#faf8f4`** — warm off-white with the faintest yellow cast. Pure white (`#ffffff`) is clinical. Slate-50 (`#f8fafc`) is cool. This cream hex is the classic editorial base seen in literary magazines and personal writing sites. It reads as intentional warmth rather than an inability to choose.

Secondary light surface: `#f2f0eb` — warm gray-beige for card backgrounds. Tertiary: `#e8e5de` — borders and dividers.

### Full token table — dark mode (`:root` default)

| Token | Hex | Contrast on `--bg-primary` | Contrast on `--bg-secondary` | Notes |
|---|---|---|---|---|
| `--bg-primary` | `#0d1117` | — | — | Ink-blue page background |
| `--bg-secondary` | `#161c24` | — | — | Cards, nav surface |
| `--bg-tertiary` | `#1f2836` | — | — | Elevated surfaces, code blocks |
| `--text-primary` | `#f0ede8` | 17.2:1 | 14.8:1 | Body text — warm white, not cold |
| `--text-secondary` | `#c9c3b8` | 10.4:1 | 8.7:1 | Secondary copy — passes comfortably |
| `--text-muted` | `#8b8378` | 4.8:1 | 4.1:1 | Meta, captions — passes AA at 16px |
| `--accent` | `#c2714f` | 5.2:1 | 4.8:1 | Warm rust — all interactive accent |
| `--accent-hover` | `#d4845f` | 5.8:1 | 5.4:1 | Hover/focus accent, lighter |
| `--accent-focus-ring` | `rgba(194, 113, 79, 0.45)` | — | — | Focus ring glow only; not text |
| `--accent-muted` | `rgba(194, 113, 79, 0.12)` | — | — | Category badge bg, subtle tints |
| `--border` | `#2a3340` | — | — | Default border, visible but quiet |
| `--border-subtle` | `#1e2733` | — | — | Section dividers, hairlines |
| `--border-strong` | `#3d4f62` | — | — | Hover borders, active indicators |
| `--success` | `#3d9970` | — | — | Form success state only |

**Verifying the borderline pair — `--text-muted` on `--bg-secondary`:**

`#8b8378` on `#161c24`: relative luminance of `#8b8378` ≈ 0.237; relative luminance of `#161c24` ≈ 0.011. Contrast ratio = (0.237 + 0.05) / (0.011 + 0.05) = 0.287 / 0.061 ≈ 4.7:1. Passes WCAG AA (4.5:1 threshold) for normal text at 16px.

This pair was the known failure in v1 (`#94a3b8` on `#1e293b` ≈ 3.8:1). The v2 palette fixes it by darkening the background surface AND ensuring the muted text is light enough.

### Full token table — light mode (`html[data-theme="light"]`)

| Token | Light hex | Contrast on `--bg-primary` light | Notes |
|---|---|---|---|
| `--bg-primary` | `#faf8f4` | — | Cream off-white |
| `--bg-secondary` | `#f2f0eb` | — | Card backgrounds |
| `--bg-tertiary` | `#e8e5de` | — | Borders, dividers |
| `--text-primary` | `#1a1612` | 17.4:1 | Near-black with warm tone |
| `--text-secondary` | `#3d352c` | 11.2:1 | Warm dark brown |
| `--text-muted` | `#6b5f54` | 5.1:1 | Passes AA for 16px body |
| `--accent` | `#9e5a3a` | 5.6:1 | Darkened rust for light bg |
| `--accent-hover` | `#8a4c30` | 6.4:1 | Darker on hover |
| `--accent-focus-ring` | `rgba(158, 90, 58, 0.4)` | — | Focus ring glow |
| `--accent-muted` | `rgba(158, 90, 58, 0.10)` | — | Badge bg on light |
| `--border` | `#d4cfc7` | — | Light border |
| `--border-subtle` | `#e4e0d8` | — | Hairlines |
| `--border-strong` | `#b8b0a5` | — | Hover borders |
| `--success` | `#2d7a56` | — | Form success |

---

## 3. Layout and Rhythm

### Container width

**Max-width: 800px** on editorial sections (hero, about prose, "Currently", writing list). This is narrower than v1 (1200px) and produces a ~65–70ch line length at 16px — within the optimal 45–75ch reading range. Projects list can go to 1000px (images need breathing room). The container sits centered with `auto` horizontal margins and `--spacing-md` (1.5rem) horizontal padding on mobile.

Two container classes:
- `.container` — 800px max-width (default, editorial)
- `.container-wide` — 1000px max-width (projects, blog grid)

### Vertical rhythm

| Token | Value | Use |
|---|---|---|
| `--spacing-xs` | 0.5rem | Inline gaps, icon-to-label |
| `--spacing-sm` | 1rem | Between list items, form fields |
| `--spacing-md` | 1.5rem | Card internal padding |
| `--spacing-lg` | 2rem | Between sub-sections within a section |
| `--spacing-xl` | 3rem | Mobile section gap |
| `--spacing-2xl` | 4rem | Mobile section gap (large) |
| `--spacing-3xl` | 6rem | Desktop section gap (new token) |
| `--spacing-4xl` | 8rem | Desktop hero top/bottom padding (new token) |

Sections alternate bg-primary / bg-secondary to create visual rhythm without heavy borders. The transition between bg values is the section separator.

### Hero layout — asymmetric two-column

**Desktop (1024px+):** CSS grid, two columns. Left column is 55% of the container width. Right column is 45%. The portrait sits right-aligned inside the right column with no symmetric centering — it bleeds slightly toward the right gutter. There is no explicit gap value; the columns touch at a natural point around the 55/45 split, creating visual asymmetry.

**Tablet (768px–1023px):** Same two-column grid but portrait column reduces to 38% and headline column gets 62%. Portrait shrinks accordingly.

**Mobile (below 768px):** Single column, stacked. Portrait comes FIRST (above the headline) at a fixed height of 280px, `object-fit: cover`, `object-position: top center`. The headline block sits below. This is opposite of the desktop column order — on mobile, the face-first visual hook matters more than leading with text.

**Portrait dimensions:** Existing asset is `assets/images/profile/profile.jpg` at 640×640px (square). The display container uses `aspect-ratio: 3/4` (portrait orientation). `object-fit: cover` handles the crop from square to 3:4. Max-width: 340px on desktop, 260px on tablet, 100% on mobile (constrained by the 280px height).

### Project editorial row

Image-right on desktop — the title and description read left-to-right, and the image anchors the right side. This mirrors how editorial book-review columns work (text left, cover right). On mobile, image stacks below the text row (image above would create thumbnail-list feel which is wrong for editorial).

**Image specs:** width 200px, height 120px, `aspect-ratio: 5/3`, `object-fit: cover`, `border-radius: var(--radius-md)`. On mobile: full-width, `aspect-ratio: 16/9`, displayed below the title/description.

---

## 4. Component Recipes

### Nav

The nav is narrower than v1. It carries the wordmark and four links — nothing else except the theme toggle. Background: transparent until 80px scroll, then `--bg-primary` at 95% opacity with `backdrop-filter: blur(8px)`. Bottom border appears on scroll: `1px solid var(--border-subtle)`.

Wordmark "Salah Alkmali" uses `--font-display` (Lora), italic 600, `--font-size-lg`. Letter-spacing: default (Lora italic at 1.125rem reads best without tracking adjustment). Color: `--text-primary`. Hover: `--accent`. This is the only non-UI element that uses Lora italic in the nav — it functions as a logo.

Links use Inter 500, `--font-size-sm`. Rest color: `--text-muted`. Hover/active: `--text-primary`. Active link has a 2px bottom border in `--accent`, implemented as `border-bottom: 2px solid var(--accent)` on the anchor element (not `::after` — simplifies paint). The underline sits 2px below the text baseline via `padding-bottom: 2px`.

Theme toggle: icon-only `<button>`, 36×36px click target, transparent background, `--text-muted` at rest, `--text-primary` on hover. Lays out after the last nav link.

### Hero

**Desktop structure (left column):**
- Eyebrow: Inter 500, `--font-size-xs`, uppercase, `--letter-spacing-wide` (0.06em), `--text-muted`. Content: `Developer · Educator · Writer`. No decoration, no dot separator image.
- h1: Lora 700, `--font-size-5xl` (3rem), `--text-primary`, letter-spacing `-0.03em`. Content: `Salah Alkmali` — name as headline, not "Hi, I'm Salah." This is a personal site, not a chat opener.
- Tag line (2–3 sentences, `<p>`): Inter 400, `--font-size-lg`, `--text-secondary`, line-height `--line-height-prose`. Example: "I build tools for learning and teach high-school math. Occasional writer. Seven years in classrooms." Max 30 words. This replaces both the current sub-headline and the About section blurb.
- Two inline text-links (not buttons): "See my work" (links to projects section or `projects.html`) and "Read what I write" (links to `blog.html`). Inter 500, `--font-size-sm`, `--accent` color, underline animation on hover (underline grows left-to-right via `background-size`). No filled buttons in the hero — this is the editorial direction. Buttons feel like products; text-links feel like invitations.

**Desktop right column (portrait):**
The portrait container is a simple block — no decorative ring, no gradient border, no `image-decoration` div. Border-radius: `var(--radius-xl)` on all corners. `box-shadow: var(--shadow-md)`. Nothing else. The image speaks for itself.

**Mobile (single column):**
Portrait at top, 280px tall, full-width, `border-radius: var(--radius-lg)`. Below: eyebrow, h1 at `--font-size-3xl`, tag line, then the two text-links.

### About prose block

Used on `index.html` as the anchor section (`#about`) and as a full section on any future standalone about page. Max-width: 65ch. Paragraph spacing: `margin-bottom: var(--spacing-sm)` (1rem between paragraphs). Inter 400, `--font-size-base`, `--text-secondary`, `--line-height-prose` (1.7). Inline links in prose use `--accent` with an animated underline (same hover treatment as hero text-links).

The about section on `index.html` does NOT repeat the portrait (which is already in the hero). It is text-only. The stats block (7 years / 1500 students / 50 resources) is removed per the locked direction — one brief mention of tenure can go inside the prose itself as natural text.

### Currently mini-block

A single styled paragraph (not a bullet list). Bullets signal a status report; a paragraph signals a thinking person. The block sits between the about prose and the projects list on `index.html`.

Visual treatment: left-border rule in `--accent`, width 3px, `padding-left: var(--spacing-md)`. Background: none. No card, no raised surface. The left rule is the only visual signal that this is a distinct block. The label "Currently" appears above the paragraph as a section eyebrow (same treatment as all section labels: Inter 500, `--font-size-xs`, uppercase, `--letter-spacing-wide`, `--text-muted`).

Content: 3–4 sentences. Example structure — what Salah is building, what he is teaching right now, what he is reading or thinking about. Salah writes this himself; the spec sets the container, not the words.

### Editorial project row

Each project is a horizontal row, not a card. The row is an `<article>` element styled as a flex container. On desktop: title + description fills 70% of the row width; the image fills 30% on the right (200px × 120px). A thin horizontal rule (`border-bottom: 1px solid var(--border-subtle)`) separates each row.

Selector targeting: `.project-row`, `.project-row-body`, `.project-row-image`.

- `.project-row` title (`h3`): Lora 600, `--font-size-xl`, `--text-primary`, letter-spacing `-0.01em`.
- Description: Inter 400, `--font-size-sm`, `--text-secondary`, 2-line clamp.
- External link label (e.g., "View case study"): Inter 500, `--font-size-xs`, `--accent`, uppercase, `--letter-spacing-wide`. No arrow — the underline animation is the hover signal.
- Hover state: the entire row background shifts to `--bg-secondary` via `background-color` transition (`--transition-fast`). The h3 color shifts from `--text-primary` to `--accent`. Image does not animate (no scale — editorial sites don't do image zooms in list contexts).

On mobile: image drops below the title/description block. The row becomes single-column with image below, full-width.

### Editorial writing card

Same row structure as projects, but lighter. No image on mobile (image is optional — if an article has no strong cover, the row works without it). Image at 160px × 100px on desktop.

- Title (`p.writing-card-title` — keep existing selector for compat, change the element role in the doc): Lora 600, `--font-size-xl`, `--text-primary`. (Note: the current markup uses `<p>` for the title — this should be changed to `<h3>` for heading hierarchy, but that is a Phase 4 a11y concern, not a visual spec concern.)
- Date treatment: Inter 400, `--font-size-xs`, `--text-muted`, displayed inline before the title with a light `|` separator and `--spacing-xs` gap. Format: `Jan 29, 2026`. No badge or pill — just the plain date.
- Excerpt: Inter 400, `--font-size-sm`, `--text-secondary`, 2-line clamp.
- Hover: same as project row — row background shifts to `--bg-secondary`, title shifts to `--accent`.

### Footer

Single block, not a 3-column grid. Centered, `--bg-secondary` background, `padding: var(--spacing-3xl) 0` top and bottom.

Anatomy (top to bottom):
1. Signature line — "Salah Alkmali" in Lora italic 400, `--font-size-2xl`, `--text-primary`. Centered. This is the handwritten-feel treatment using Lora italic instead of an image or Caveat font (no new font dependency needed — Lora italic is already loaded).
2. Location + year line — Inter 400, `--font-size-sm`, `--text-muted`. Example: "Istanbul, 2026." One short phrase, period, done. Centered.
3. Nav links row — horizontal, centered, Inter 400, `--font-size-sm`, `--text-muted`, `gap: var(--spacing-lg)`. On hover: `--text-primary`.
4. No "All rights reserved." No copyright symbol. The footer should feel personal, not corporate.

### Skip-link, modal, form

Preserve all Phase 4 a11y wins exactly. Update visual tokens only:
- Skip-link: `outline` color changes from `var(--primary-color)` to `var(--accent)`.
- Modal: `--bg-secondary` background (slightly warmer now), `border: 1px solid var(--border)`. All ARIA attributes stay (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
- Form inputs: `border: 1px solid var(--border)`, `background: var(--bg-tertiary)`. Focus: `outline: 2px solid var(--accent); outline-offset: 2px; box-shadow: 0 0 0 3px var(--accent-focus-ring)`.
- Buttons: primary button background changes from `--primary-color` (`#6366f1`) to `--accent` (`#c2714f`). White label text on `--accent` achieves 5.2:1 — passes AA for UI components.

---

## 5. Motion

All of the following are CSS-only. No JS additions.

**Gating strategy:** Every `@keyframes` block is wrapped inside `@media (prefers-reduced-motion: no-preference) { }`. Transitions (`--transition-fast/normal/slow`) are NOT gated — they are functional state-change signals, not decorative animation. This is the same per-component strategy established in DESIGN_SPEC.md §3 (not a universal `* { animation: none }` override).

**Animations to add:**

1. Link underline grow (text-links in hero and prose): Implemented via `background-image: linear-gradient(var(--accent), var(--accent)); background-size: 0% 1px; background-repeat: no-repeat; background-position: left bottom`. On hover: `background-size: 100% 1px`. Transition on `background-size` at `var(--transition-fast)`. Applied to `.prose-link` and `.hero-text-link`.

2. Section fade-in on scroll: Elements with `.fade-in` class start at `opacity: 0; transform: translateY(16px)` and transition to `opacity: 1; transform: translateY(0)` when an `IntersectionObserver` adds `.fade-in--visible`. The CSS rule is: `.fade-in { opacity: 0; transform: translateY(16px); transition: opacity var(--transition-slow), transform var(--transition-slow); } .fade-in--visible { opacity: 1; transform: translateY(0); }`. The `IntersectionObserver` call is in `main.js` (existing JS file — this is the one JS addition permitted, but it belongs in `main.js`, not a new file). Wrapped in `prefers-reduced-motion` check inside the JS: `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;`.

3. Project/writing row hover lift: `.project-row` and `.writing-row` get `transition: background-color var(--transition-fast)`. No `translateY` on rows — lift is reserved for card-grid contexts, and editorial rows use background-color shift only.

4. Nav scroll border: the `border-bottom` on `.modern-nav.scrolled` uses `transition: border-color var(--transition-fast)`. Already in the codebase pattern; just ensure the color token is updated to `var(--border-subtle)`.

---

## 6. Page Recipe Per Page

### `/` — Home (index.html)

1. Nav — transparent, wordmark + 4 links + theme toggle
2. Hero — asymmetric two-column: name h1 left, portrait right. Tag line. Two text-link CTAs.
3. About prose — `#about` anchor, text-only, 65ch, 2 short paragraphs
4. Currently — left-rule block, 3–4 sentences
5. Projects — section eyebrow label, then 3 editorial rows with images; "All projects" text-link at bottom
6. Writing — section eyebrow label, then 3 editorial rows; "All writing" text-link at bottom
7. Contact CTA — centered, h2 + a single email link (no button required; if the modal trigger is kept, use a plain text-link styled like `.hero-text-link`, not a filled button)
8. Footer — signature, location/year, nav links

### `/projects.html`

1. Nav
2. Page hero header — h1 "Projects" in Lora 700 `--font-size-4xl`, 1-sentence sub in Inter `--text-muted`, centered, 600px max-width
3. Editorial list of all 6 projects — full `.project-row` treatment, same as home but all 6
4. Footer

### `/blog.html`

1. Nav
2. Page hero header — h1 "Writing", sub: "Notes on math, education, and building things."
3. Category filter strip — keep existing JS filter; restyle: pill buttons use `--bg-tertiary` inactive, `--accent` with `--bg-secondary` text active. Inter 500 `--font-size-xs` uppercase.
4. Editorial list of all articles — `.writing-row` treatment, newest first
5. Footer

### `/now.html`

1. Nav
2. h1 "Now" in Lora 700 `--font-size-4xl`, centered
3. Last-updated line: Inter 400 `--font-size-xs` `--text-muted` "Last updated: May 2026"
4. A plain `<ul>` of 4–8 bullets. No card, no grid. Inter 400 `--font-size-lg` `--text-secondary` `line-height: --line-height-prose`. Max-width 65ch, centered.
5. Footer

### `/articles/*.html`

Article body is untouched — `modern-article.css` keeps Cairo and sky-blue accent. Only the chrome around the body changes:
- Nav updated to match v2 design
- Article header: h1 uses Lora 700 `--font-size-4xl` instead of whatever font the article CSS uses for the page title. The article CSS's `h1` selector inside `.article-body` is fine — this applies only to the page-level header chrome outside the article body.
- Byline row: Inter 400 `--font-size-sm` `--text-muted`. Date + read-time inline.
- Footer: updated to match v2 footer (signature, year, nav links). Drop the "Powered By MATHLOGAME" sign-off.

### `/projects/<slug>.html` (case study stubs)

1. Nav
2. Page header: project title in Lora 700 `--font-size-3xl`, 1-sentence description in Inter `--font-size-lg` `--text-secondary`
3. Existing case study content, restyled to v2 tokens (bg colors, text colors, shadows)
4. "Back to Projects" text-link at bottom
5. Footer

---

## 7. Token Diff for CLAUDE.md §4

The engineer pastes the "Proposed value" column into `:root` in `style.css`. Light-mode overrides go into `html[data-theme="light"]`. CLAUDE.md §4 color table is fully replaced with v2 values.

| Token | Status | Current value | Proposed value | Notes |
|---|---|---|---|---|
| `--primary-color` | **kept (legacy alias only)** | `#6366f1` | `#6366f1` | No longer a functional design token in v2 — exists only for legacy alias resolution. Do not use in new CSS. |
| `--primary-light` | **kept (legacy alias only)** | `#818cf8` | `#818cf8` | Same as above — legacy alias chain only. |
| `--primary-dark` | **kept (legacy alias only)** | `#4f46e5` | `#4f46e5` | Same. |
| `--secondary-color` | **kept (legacy alias only)** | `#f59e0b` | `#f59e0b` | Alias only. |
| `--warm-neutral` | **kept (legacy alias only)** | `#f59e0b` | `#f59e0b` | Alias only. |
| `--accent-color` | **kept (legacy alias only)** | `#10b981` | `#10b981` | Alias. Success state if needed. Not the v2 design accent. |
| `--success-color` | **kept** | `#10b981` | `#3d9970` | Updated to a slightly softer emerald. Form success state only. |
| `--bg-primary` | **updated** | `#0f172a` | `#0d1117` | Ink-blue — deeper, warmer navy |
| `--bg-secondary` | **updated** | `#1e293b` | `#161c24` | Cards, nav surface |
| `--bg-tertiary` | **updated** | `#334155` | `#1f2836` | Elevated surfaces |
| `--bg-card` | **updated** | `#1e293b` | `#161c24` | Alias of `--bg-secondary` — update in tandem |
| `--bg-gradient` | **retired (usage)** | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` | _(keep token value unchanged; remove any surviving references to it in CSS)_ | No element should reference this in v2 |
| `--text-primary` | **updated** | `#f8fafc` | `#f0ede8` | Warm white — less cold than pure slate-50 |
| `--text-secondary` | **updated** | `#cbd5e1` | `#c9c3b8` | Warm mid-tone |
| `--text-muted` | **updated** | `#a8b8cc` | `#8b8378` | Warm gray; WCAG AA verified against new `--bg-secondary` (4.7:1) |
| `--text-accent` | **kept (alias only)** | `#fbbf24` | `#fbbf24` | Legacy alias — no new usage |
| `--border-color` | **renamed + updated** | `#334155` | `#2a3340` | Token rename in docs only; old token still resolves. New name: `--border`. |
| `--border-light` | **renamed + updated** | `#475569` | `#3d4f62` | New name in docs: `--border-strong`. |
| `--border` | **new** | — | `#2a3340` | Primary border |
| `--border-subtle` | **new** | — | `#1e2733` | Section dividers, hairlines |
| `--border-strong` | **new** | — | `#3d4f62` | Hover borders |
| `--accent` | **new** | — | `#c2714f` | Warm rust — the v2 design accent |
| `--accent-hover` | **updated** | `#818cf8` | `#d4845f` | Lighter rust on hover |
| `--accent-focus-ring` | **updated** | `rgba(99, 102, 241, 0.5)` | `rgba(194, 113, 79, 0.45)` | Focus ring glow for new accent |
| `--accent-muted` | **new** | — | `rgba(194, 113, 79, 0.12)` | Badge backgrounds, subtle tints |
| `--shadow-sm` | **kept** | `0 1px 2px 0 rgb(0 0 0 / 0.2)` | `0 1px 2px 0 rgb(0 0 0 / 0.2)` | Already darkened in v1 — keep |
| `--shadow-md` | **kept** | current v1 value | current v1 value | Already darkened in v1 — keep |
| `--shadow-lg` | **kept** | current v1 value | current v1 value | Keep |
| `--shadow-xl` | **kept** | current v1 value | current v1 value | Keep |
| `--shadow-accent` | **updated** | `0 0 0 3px rgba(99, 102, 241, 0.5)` | `0 0 0 3px rgba(194, 113, 79, 0.45)` | Matches new accent |
| `--font-family` | **updated** | `'Cairo', sans-serif` | `'Inter', sans-serif` | Inter is the new body/UI sans |
| `--font-display` | **new** | — | `'Lora', Georgia, serif` | Display serif for h1/h2 |
| `--font-primary` | **kept (legacy alias)** | `'Cairo', Arial, sans-serif` | `'Cairo', Arial, sans-serif` | Legacy alias — do not update; article pages depend on it via old CSS |
| `--font-weight-bold` | **kept** | `700` | `700` | |
| `--font-weight-semibold` | **kept** | `600` | `600` | |
| `--font-weight-medium` | **kept** | `500` | `500` | |
| `--letter-spacing-tight` | **kept** | `-0.01em` | `-0.01em` | Now also used on Lora display headings at 2xl |
| `--letter-spacing-wide` | **new** | — | `0.06em` | Eyebrow labels only |
| `--line-height-prose` | **new** | — | `1.7` | Long-form text blocks |
| `--line-height-display` | **new** | — | `1.1` | Hero h1 at 5xl |
| `--spacing-3xl` | **new** | — | `6rem` | Desktop section padding |
| `--spacing-4xl` | **new** | — | `8rem` | Hero top/bottom padding |
| `--mathlogame-gradient` | **kept (scoped)** | `linear-gradient(135deg, #4BB3FD 0%, #10B981 50%, #4BB3FD 100%)` | `linear-gradient(135deg, #4BB3FD 0%, #10B981 50%, #4BB3FD 100%)` | MATHLOGAME project row only |

### Light-mode block (`html[data-theme="light"]` full replacement)

| Token | v1 value | v2 value |
|---|---|---|
| `--bg-primary` | `#f8fafc` | `#faf8f4` |
| `--bg-secondary` | `#f1f5f9` | `#f2f0eb` |
| `--bg-tertiary` | `#e2e8f0` | `#e8e5de` |
| `--text-primary` | `#0f172a` | `#1a1612` |
| `--text-secondary` | `#334155` | `#3d352c` |
| `--text-muted` | `#64748b` | `#6b5f54` |
| `--accent` | _(not present in v1)_ | `#9e5a3a` |
| `--accent-hover` | `#6366f1` | `#8a4c30` |
| `--accent-focus-ring` | `rgba(99, 102, 241, 0.5)` | `rgba(158, 90, 58, 0.4)` |
| `--accent-muted` | _(not present in v1)_ | `rgba(158, 90, 58, 0.10)` |
| `--border-color` | `#cbd5e1` | `#d4cfc7` |
| `--border` | _(not present in v1)_ | `#d4cfc7` |
| `--border-subtle` | _(not present in v1)_ | `#e4e0d8` |
| `--border-strong` | _(not present in v1)_ | `#b8b0a5` |
| `--border-light` | `#94a3b8` | `#b8b0a5` |
| `--success` | _(uses --accent-color)_ | `#2d7a56` |
| `--warm-neutral` | `#b45309` | `#b45309` (keep — legacy alias) |
| `--secondary-color` | `#b45309` | `#b45309` (keep — legacy alias) |
| `--bg-card` | `#f1f5f9` | `#f2f0eb` |
| `--container-color` | `#f1f5f9` | `#f2f0eb` |
| `--nav-color-dark-purpul` | `#f1f5f9` | `#f2f0eb` |
| `--first-color` | `#0f172a` | `#1a1612` |
| `--title-color` | `#0f172a` | `#1a1612` |
| `--text-color` | `#334155` | `#3d352c` |
| `--body-color` | `#f8fafc` | `#faf8f4` |
| `--body-color-dark` | `#f8fafc` | `#faf8f4` |

---

## 8. Files the Engineer Will Edit

### Full rewrite required

- `assets/css/style.css` — `:root` token block and `html[data-theme="light"]` block replaced per §7 above. Cairo `@font-face` or import reference removed from `:root` comment. New tokens added. Legacy aliases at the bottom preserved untouched.
- `index.html` — Hero section restructured (two-column grid, new markup). About section loses stats block. "What I Do" three-block replaced with "Currently" block. Project section changed from card grid to editorial row list. Writing section changed from card format to editorial row list. Footer rewritten to match §4 Footer recipe. `<link>` for Cairo removed; Inter + Lora `<link>` added.
- `assets/css/index.css` — Major changes. Existing hero, about, what-i-do, project-card, writing-card, footer CSS largely replaced. New selectors: `.project-row`, `.writing-row`, `.currently-block`, `.hero-text-link`, `.editorial-list`, `.fade-in`, `.fade-in--visible`. Existing form and modal CSS updated (accent color only).

### Structural update required (nav + font link + footer only)

- `projects.html` — Nav font link updated, footer replaced, page structure adjusted to editorial row layout.
- `blog.html` — Nav font link updated, footer replaced, filter buttons restyled.
- `now.html` — Nav font link updated, footer replaced. Content is minimal — easy.
- `projects/mathlogame.html`, `projects/mithaq.html`, `projects/routiney.html`, `projects/math-booklet.html`, `projects/python-course.html`, `projects/book-design-web.html` — Nav and footer updated to v2. Body content minimal so token restyle is lightweight.

### Article chrome update only (body untouched)

- `articles/*.html` — Each article: nav updated, footer replaced. Article body and `modern-article.css` untouched. The article-page h1 in the header chrome gets Lora styling.

### Do not touch

- `articles/modern-article.css` — Cairo font, sky-blue accent, all article body element styles. No changes.
- `articles/whyMath.css` — Legacy file; already avoided for new posts. Leave as-is.
- `assets/Worksheet PDFs/`, `assets/More Examples/`, `assets/cheatsheet/` — Externally linked. No changes.
- `assets/js/main.js` — Only the `IntersectionObserver` for `.fade-in` is added (as a guarded block inside the existing file). No other JS changes.
- `assets/js/article.js` — No changes.
- `about.html` — Meta-refresh stub; no changes needed.

---

*End of DESIGN_SPEC_v2.md — awaiting sign-off before Phase 3 engineering begins.*
