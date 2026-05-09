# DESIGN_SPEC.md — Phase 2 Visual Identity
## Salah Alkmali Personal Site Pivot

**Status:** Draft — awaiting Salah's sign-off before Phase 3 implementation
**Date:** 2026-05-09
**Author:** Visual Designer agent (Phase 2 of PIVOT_PLAN.md)
**Reference direction:** brianlovin.com / leerob.com — modern dev-personal, sharp dark, polished cards, indie-developer credibility

---

## 1. Palette

### What changes and why

The current three-accent system (indigo + amber + emerald) reads like an ed-tech dashboard — busy, multi-brand, product-y. The pivot to indie-developer-personal requires one confident accent that signals "I build things" without feeling like a startup color system. Amber and emerald are retired as accent roles; amber survives only as a warm data-point highlight (read time, dates), not as a CTA color.

**Chosen accent: Indigo `#6366f1` (kept).** It already exists in the system, reads as developer/technical without being cold, and has good contrast runway. The amber trio (`#f59e0b`, `#fbbf24`) is collapsed to a single warm neutral `#f59e0b`, used only for in-text callout labels and dates — not buttons or borders. Emerald `#10b981` is retired site-wide; it survives only as the "success" micro-state (e.g., form sent confirmation) under a new token name.

**Contrast audit fixes:**
- `--text-muted` (`#94a3b8`) on `--bg-secondary` (`#1e293b`) = approximately 3.8:1 — fails 4.5:1 for body-size text. Fix: raise muted text to `#a8b8cc` (~4.6:1 on `#1e293b`).
- `--text-secondary` (`#cbd5e1`) on `--bg-secondary` (`#1e293b`) = approximately 8.1:1 — passes comfortably. Keep.
- `--text-primary` (`#f8fafc`) on `--bg-primary` (`#0f172a`) = approximately 16.5:1 — passes.

**Article subsystem (`articles/modern-article.css`) resolution:** The sky-blue `--primary-color: #4bb3fd` stays. Articles are a distinct reading context — the cooler blue reduces eye strain on long-form text and signals "you are in reading mode, not portfolio mode." It is not unified with the site accent. The spec simply calls this out explicitly: articles have their own local accent, and it is intentional. No change to `modern-article.css`.

### Dark mode tokens

| Token | Hex | Contrast on bg-primary | Contrast on bg-secondary | Notes |
|---|---|---|---|---|
| `--bg-primary` | `#0f172a` | — | — | Keep. Slate-900. Page background. |
| `--bg-secondary` | `#1e293b` | — | — | Keep. Cards, nav surface. |
| `--bg-tertiary` | `#334155` | — | — | Keep. Elevated/hover surfaces. |
| `--text-primary` | `#f8fafc` | 16.5:1 | 10.1:1 | Keep. Body text. |
| `--text-secondary` | `#cbd5e1` | 11.2:1 | 8.1:1 | Keep. Secondary copy. |
| `--text-muted` | `#a8b8cc` | 7.1:1 | 4.6:1 | **Raised from `#94a3b8`.** Fixes WCAG AA fail. |
| `--accent-color` | `#6366f1` | 3.1:1 | 2.4:1 | Kept as interactive accent. Use only at 18px+ (large text rule, 3:1). Always pair with white label text inside buttons. |
| `--accent-hover` | `#818cf8` | 4.6:1 | 3.2:1 | New token. Hover state for accent. |
| `--accent-focus-ring` | `#6366f180` | — | — | New token. 50% opacity. Used only for `box-shadow` focus ring, not as text color. |
| `--warm-neutral` | `#f59e0b` | — | — | Kept from `--secondary-color`. Renamed role: callout text, dates, read-time badges only. |
| `--success-color` | `#10b981` | — | — | Kept but renamed role: form success state only. Not a general CTA accent. |
| `--border-color` | `#334155` | — | — | Keep. |
| `--border-light` | `#475569` | — | — | Keep. Hover borders. |

### Light mode tokens (new — for the toggle)

Light mode uses a near-white base with the same indigo accent. All contrast values computed against the new backgrounds.

| Token | Dark value | Light value | Notes |
|---|---|---|---|
| `--bg-primary` | `#0f172a` | `#f8fafc` | Light: slate-50 |
| `--bg-secondary` | `#1e293b` | `#f1f5f9` | Light: slate-100 |
| `--bg-tertiary` | `#334155` | `#e2e8f0` | Light: slate-200 |
| `--text-primary` | `#f8fafc` | `#0f172a` | Swapped. 16.5:1 on light bg-primary. |
| `--text-secondary` | `#cbd5e1` | `#334155` | 7.9:1 on `#f8fafc`. |
| `--text-muted` | `#a8b8cc` | `#64748b` | 4.6:1 on `#f8fafc`. Passes. |
| `--accent-color` | `#6366f1` | `#4f46e5` | Darkened for light bg contrast. 4.6:1 on `#f8fafc`. |
| `--accent-hover` | `#818cf8` | `#6366f1` | |
| `--border-color` | `#334155` | `#cbd5e1` | Light: slate-300 |
| `--border-light` | `#475569` | `#94a3b8` | Light: slate-400 |
| `--warm-neutral` | `#f59e0b` | `#b45309` | Darkened amber for light bg. 4.5:1 on `#f1f5f9`. |

**Implementation mechanism:** A `[data-theme="light"]` attribute on `<html>`. The toggle JS writes `localStorage.getItem('theme')` on load and toggles the attribute. `prefers-color-scheme: light` is the default fallback when no localStorage value exists.

---

## 2. Typography

### Scale (Cairo, retained)

Drop the Cairo 800 and 900 weight imports in `modern-article.css` — they add ~30KB of font data and are used on fewer than 5 elements site-wide. Weight 700 is sufficient for all display headings.

| Token | rem | px equiv | Line-height | Use |
|---|---|---|---|---|
| `--font-size-xs` | 0.75rem | 12px | 1.5 | Captions, badges, timestamps |
| `--font-size-sm` | 0.875rem | 14px | 1.5 | Nav links, meta, card bylines |
| `--font-size-base` | 1rem | 16px | 1.6 | Body copy (unchanged) |
| `--font-size-lg` | 1.125rem | 18px | 1.55 | Lead paragraphs, card excerpts |
| `--font-size-xl` | 1.25rem | 20px | 1.5 | Sub-headings (h3) |
| `--font-size-2xl` | 1.5rem | 24px | 1.4 | Section titles (h2) |
| `--font-size-3xl` | 1.875rem | 30px | 1.3 | Page headings (h2 on hero sections) |
| `--font-size-4xl` | 2.25rem | 36px | 1.2 | Hero sub-headline |
| `--font-size-5xl` | 3rem | 48px | 1.1 | Hero display headline (desktop only) |

Drop `--font-size-5xl` from mobile hero. At 375px width, 3rem is too large; clamp to `--font-size-3xl` (1.875rem) on mobile.

### Weight assignments

| Role | Weight | Token |
|---|---|---|
| Display / hero headline | 700 | `--font-weight-bold: 700` (already exists) |
| Section headings (h2, h3) | 600 | Add `--font-weight-semibold: 600` |
| Nav links, button labels, card titles | 500 | Add `--font-weight-medium: 500` |
| Body copy, article prose | 400 | (default) |
| Captions, timestamps | 400 | (default) |
| Wordmark "Salah Alkmali" in nav | 700 | Use `--font-weight-bold` |

### Wordmark treatment

The nav wordmark `Salah Alkmali` uses Cairo 700, `--font-size-lg` (1.125rem), letter-spacing `-0.01em` (tight, modern-dev feel), color `--text-primary`. On hover, color shifts to `--accent-color` with `--transition-fast`. No gradient on the wordmark — gradients are retired from the nav entirely.

New token: `--letter-spacing-tight: -0.01em` (used only on the wordmark and hero headline).

### Article subsystem typography

The `.mathlogame-logo` gradient-text span in article headers is replaced by plain Cairo 700, color `--primary-color` (which in the article scope resolves to `#4bb3fd`). No gradient clip. The font weights 800/900 are retired from the `@import` call. Existing article body elements (`<h2>`, `<p>`, `<blockquote>`, `<ul>`, `<ol>`, `.callout`, `.article-signature`) are layout-compatible — only the weight import line and the gradient span change.

---

## 3. Spacing, Radius, Shadow, Motion

### Spacing — keep as-is

The current `--spacing-*` scale (xs=0.5rem through 2xl=4rem) is already solid. No changes. Phase 3 should use these tokens consistently instead of ad-hoc `rem` values scattered through `index.css`.

### Radius — minor tightening

Current scale is fine but the site overuses `20px` and `border-radius: 1.5rem` as inline values in `index.css` instead of tokens. Phase 3 replaces all hardcoded `20px` border-radius with `var(--radius-xl)` (1rem). The `--radius-2xl` (1.5rem) is reserved for modals and the contact form only. Cards use `--radius-lg` (0.75rem).

### Shadow — darken for dark bg

Current shadows use `rgb(0 0 0 / 0.1)` which is nearly invisible on `#0f172a`. Replace with:

| Token | New value | Notes |
|---|---|---|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.2)` | Subtle separation |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.3)` | Cards default |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)` | Cards hover |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.45), 0 8px 10px -6px rgb(0 0 0 / 0.3)` | Modals |
| `--shadow-accent` | `0 0 0 3px var(--accent-focus-ring)` | **New.** Focus ring. |

### Focus ring (fixes audit items #46–47)

Current focus state: `outline: none` + a barely-visible 10%-opacity box-shadow. This fails WCAG 2.1 SC 2.4.11 (Focus Appearance) and SC 2.4.7 (Focus Visible).

Replacement strategy — per-component, not a universal `*{outline:none}` block:

```
:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  box-shadow: var(--shadow-accent);
}
```

Remove all `outline: none` declarations from `style.css` and `index.css`. Use `:focus-visible` (not `:focus`) so mouse clicks don't show the ring. The `var(--shadow-accent)` is the additional glow for extra visibility.

### Motion strategy

**Per-component, not a universal block.** A universal `@media (prefers-reduced-motion: reduce) { * { animation: none !important } }` is too blunt — it breaks scroll-linked JS behaviors and CSS transitions that serve as simple state feedback (e.g., nav link underline growing). Instead:

1. Every `@keyframes` block in `index.css` (currently: `float`, `pulse`, `subtlePulse`, `subtleGlow`) gets wrapped in `@media (prefers-reduced-motion: no-preference)`.
2. The hero animation JS (`CrazyMathAnimation` — which is being retired anyway) already exits when it encounters `window.matchMedia('(prefers-reduced-motion: reduce)')` — confirm this in Phase 3 and add the check if missing.
3. New hero motion flourish (see Section 4) is gated on `prefers-reduced-motion: no-preference` at the CSS level.
4. Transitions (`--transition-fast/normal/slow`) are not affected — they are state-change signals, not decorative animations.

---

## 4. Component Patterns

### Nav

**Layout:** Wordmark on the left, links + theme toggle on the right. One horizontal row on desktop. Hamburger icon (3 lines → X) replaces the current `<span>` spans on mobile — it must be a `<button>` element with `aria-expanded` and `aria-controls` for a11y (flag for a11y-auditor in Phase 4).

**Wordmark:** `Salah Alkmali`, Cairo 700, 1.125rem, letter-spacing -0.01em, color `--text-primary`. On hover: `--accent-color`, transition-fast.

**Links:** Cairo 500, `--font-size-sm` (0.875rem), `--text-secondary` at rest. On hover/active: `--text-primary`. Active state: a 2px bottom border in `--accent-color` (the `::after` pseudo-element already exists in `index.css` — keep this pattern, change the color from `--primary-color` to `--accent-color` to respect the new single-accent model).

**Sticky behavior:** Already fixed-position, backdrop-blur. Keep. On scroll, add a subtle `border-bottom: 1px solid var(--border-color)` to visually separate from page content — this is already in `index.css`, keep it.

**Theme toggle:** An icon-only `<button>` positioned in the nav after the last link, before the hamburger. Icon: sun (Boxicons `bx-sun`) in dark mode, moon (`bx-moon`) in light mode. Size: 20px icon inside a 36x36 button. Color: `--text-muted` at rest, `--text-primary` on hover. No label text — add `aria-label="Switch to light mode"` / `aria-label="Switch to dark mode"` dynamically via JS.

**Mobile:** Below 768px, nav-menu slides down from the top (current pattern). Hamburger becomes an X. Theme toggle stays visible in the desktop-size nav row; on mobile it sits at the bottom of the open nav menu.

### Hero (index.html) — personal intro

The MATHLOGAME logo image, 12 floating math symbols, `CrazyMathAnimation`, and the product-pitch copy are all retired.

**New layout — two columns on desktop, stacked on mobile:**

- Left column (60% width on desktop): text content
- Right column (40% width on desktop): a static portrait placeholder or a code/terminal flourish (see Open Questions #1)

**Text content (left):**
- Eyebrow label (above h1): `Developer · Educator · Writer` — Cairo 400, `--font-size-sm`, `--text-muted`, letter-spacing `0.08em` uppercase
- h1: `Hi, I'm Salah` — Cairo 700, `--font-size-5xl` on desktop / `--font-size-3xl` on mobile, color `--text-primary`
- Sub-headline (p): `I build tools for learning and write about education, math, and code.` — Cairo 400, `--font-size-lg`, `--text-secondary`, max 25 words (this draft is 15 words — good)
- Two CTAs side by side: primary = "View Projects" (filled, `--accent-color` background, white text, `--radius-md`, padding 0.75rem 1.5rem, Cairo 500); secondary = "Read Blog" (outlined, 1px solid `--border-light`, `--text-secondary` text, same sizing)

**Motion flourish (optional, gated on `prefers-reduced-motion: no-preference`):** A single cursor blink (`|`) after the h1 text, implemented as a CSS `::after` pseudo-element with a 1s `step-end` `blink` keyframe. This replaces the 12-symbol chaos with a single subtle dev-personality signal. Remove entirely if Salah prefers the static version (see Open Questions #1).

**Right column:** Salah's portrait photo in a slightly clipped container (border-radius `--radius-xl`, `aspect-ratio: 4/5`, max-width 320px). Light inset box-shadow on the card container using `--shadow-md`. If no portrait is available, a typographic card showing `{ Salah }` in a code-block style (`bg: --bg-secondary`, `--radius-lg`, monospace fallback — but Cairo is the font, so use a styled `<pre>` block). See Open Questions #2.

### Project card (projects.html + index.html featured row)

**Layout:** Image on top (16:9 aspect ratio, `object-fit: cover`), text below. Full card is a link.

**Anatomy:**
- Image container: `aspect-ratio: 16/9`, `overflow: hidden`, `--radius-lg` top corners only
- Title: Cairo 600, `--font-size-lg`, `--text-primary`
- Tag line / short description: Cairo 400, `--font-size-sm`, `--text-secondary`, 2 lines max (`-webkit-line-clamp: 2`)
- Tech stack tags: `--font-size-xs`, `--text-muted`, `--bg-tertiary` pill background, `--radius-sm`, horizontal flex row
- CTA: "View case study →" or "Visit site →", Cairo 500, `--font-size-sm`, `--accent-color`

**Hover state:** Card lifts with `translateY(-4px)` + `--shadow-lg`. Image scales to 102% inside its overflow:hidden container. Transition: `--transition-normal`.

**MATHLOGAME card distinction:** Same structure, but the CTA label reads "Visit MATHLOGAME.com →" (external link, `target="_blank"`, `rel="noopener"`). Optionally, the card's top-border or tag can use a fragment of `--mathlogame-gradient` — a single 3px top border line in the gradient. No full gradient takeover of the card. This is the only place site-wide where `--mathlogame-gradient` is used in Phase 3+.

**Grid:** 3 columns on desktop (min 320px each), 2 columns at 768px, 1 column on mobile.

### Blog card (blog.html + index.html "Latest" row)

**Layout:** Horizontal on desktop (image left, text right at 40/60 split), stacked on mobile.

**Anatomy:**
- Cover image: `aspect-ratio: 16/9`, `object-fit: cover`, `--radius-md`, width 40% on desktop
- Category badge: uppercase, `--font-size-xs`, `--accent-color` background at 15% opacity, `--accent-color` text, `--radius-sm`, inside the text column
- Title: Cairo 600, `--font-size-xl`, `--text-primary`, 2-line clamp
- Excerpt: Cairo 400, `--font-size-sm`, `--text-secondary`, 3-line clamp
- Meta row: author avatar (24px circle) + "Salah Alkmali" + dot separator + date + dot + read time, all in `--font-size-xs`, `--text-muted`

**Hover:** Title shifts to `--accent-color`. Image scales 103%. No card lift — the horizontal layout already has visual weight.

**Index "Latest" section:** Shows 3 most recent cards in a vertical list (not grid), with a "View all posts →" link at the bottom.

### Article header + footer

**Header:**
- Category badge (same pill style as blog card)
- h1: Cairo 700, `--font-size-4xl` on desktop / `--font-size-3xl` on mobile
- Byline row: `Salah Alkmali` (Cairo 500, `--text-secondary`) + date + read time (`--text-muted`)
- Cover image below the byline: full-width, `aspect-ratio: 21/9`, `object-fit: cover`, `--radius-lg`

**Footer:**
- Author sign-off block: small avatar (40px), "Written by Salah Alkmali", Cairo 400, `--text-secondary`
- Signature line: `~ Salah Alkmali`, Cairo 400 italic, `--text-muted`
- Copyright: `© 2026 Salah Alkmali`, `--font-size-xs`, `--text-muted`
- Navigation links: `← Back to Blog` (left) and next/prev article links (right, Phase 4 addition)

### Light-mode toggle

**Component:** `<button class="theme-toggle" aria-label="Switch to light mode">` — icon-only, no text. 36×36 clickable area, transparent background, `--text-muted` at rest, `--text-primary` on hover, `--radius-md` for focus ring rect.

**Icon:** Boxicons `bxs-sun` (filled sun) when in dark mode (click = go light). `bxs-moon` (filled moon) when in light mode (click = go dark). Icon size: 20px.

**Position in nav:** After the last nav-link (`Blog`), before the hamburger on mobile. On desktop, always visible. On mobile, sits at the bottom of the slide-down menu.

---

## 5. Page-Level Recipes

### `/` (index.html) — Personal Landing

1. **Nav** (fixed, transparent until scroll)
2. **Hero** — two-column: left text (eyebrow + h1 + sub-headline + 2 CTAs), right portrait (or code block placeholder)
3. **"What I Do" strip** — 3 short blocks in a row: `Developer`, `Educator`, `Writer`, each with a Boxicons icon, a 1-line description. Light horizontal rule separates from hero. Background: `--bg-secondary`.
4. **Featured Projects** — section title "Projects", 3 selected cards from the 6, "View all projects →" link. Background: `--bg-primary`.
5. **Latest Writing** — section title "Writing", 3 most recent blog cards as a vertical list, "Read all posts →" link. Background: `--bg-secondary`.
6. **Contact CTA strip** — centered, single-column: headline "Let's talk.", sub-line (email address as a link + social icons). Background: `--bg-primary`.
7. **Footer** — copyright, nav links repeated, dark. Background: `--bg-secondary`.

### `/about.html` — About

1. **Nav**
2. **Page header** — h1 "About", 1-line sub-heading ("Developer, educator, and builder of things that help people learn.")
3. **Bio section** — long-form paragraphs, left-aligned, max-width 65ch, `--font-size-lg`
4. **Teaching philosophy** — a short blockquote or pull-quote, styled with the article `<blockquote>` pattern
5. **Experience timeline** — keep the existing structure, restyle the dots/lines to use `--accent-color`
6. **Skills/tools grid** — keep, clean up the layout to use the card token system
7. **Footer**

Drop: the MATHLOGAME promo blocks, the "Powered by MATHLOGAME" footer, the gradient-heavy `.mathlogame-logo` spans.

### `/projects.html` — Projects

1. **Nav**
2. **Page header** — h1 "Projects", 1-line sub: "Things I've built — from interactive math games to developer tools."
3. **Project grid** — 6 cards in display order: MATHLOGAME, Mithaq, Routiney, Math Booklet, Python Course, Book-design-web. Each card links to `/projects/<slug>.html` case study (Phase 3). MATHLOGAME card also has an "Visit site →" external link.
4. **Footer**

### `/blog.html` — Blog

1. **Nav**
2. **Page header** — h1 "Writing", sub: "Notes on math, education, and the craft of building things."
3. **Category filter buttons** — keep the existing JS filter; restyle buttons with `--accent-color` active state (filled pill), `--bg-tertiary` inactive state
4. **Blog card grid** — 2 columns on desktop, 1 on mobile. Newest first.
5. **Footer**

Slug compatibility is maintained — no HTML files renamed, no redirects needed.

### `/articles/*.html` — Existing Articles

1. Re-chromed header (new byline pattern, updated nav/footer chrome)
2. Body content untouched
3. New footer: "← Back to Blog" link + `© 2026 Salah Alkmali`
4. All class names in existing articles (`<h2>`, `<p>`, `<blockquote>`, `<ul>`, `<ol>`, `.callout`, `.article-signature`) continue to be styled by `modern-article.css` — no migration needed

### `/now.html` — New Page (minimal)

1. **Nav**
2. **Page header** — h1 "Now", sub: "What I'm focused on as of May 2026." (updated manually by Salah each time)
3. **Content** — a simple `<ul>` of 4–8 bullets (what I'm building, reading, teaching, thinking about). No images. Cairo 400, `--font-size-base`, `--text-secondary`, line-height 1.8.
4. **Footer**

This page is intentionally minimal. No cards, no grid. Maximum width 65ch.

---

## 6. Token Diff for CLAUDE.md §4

The following table is the Phase 3 deliverable for updating CLAUDE.md §4. The "Proposed value" column is what replaces the current value in `:root` of `style.css`. Legacy aliases at the bottom of `:root` are not changed.

| Token | Status | Current value | Proposed value | Notes |
|---|---|---|---|---|
| `--primary-color` | **kept** | `#6366f1` | `#6366f1` | Renamed role: now called "accent" in docs, but token name unchanged to preserve legacy aliases |
| `--primary-light` | **renamed role** | `#818cf8` | `#818cf8` | Now: `--accent-hover`. Token name kept for legacy compat. |
| `--primary-dark` | **kept** | `#4f46e5` | `#4f46e5` | Light-mode accent value |
| `--secondary-color` | **kept, role narrowed** | `#f59e0b` | `#f59e0b` | Role: callout text, dates, timestamps only. Not CTA color. |
| `--accent-color` | **repurposed** | `#10b981` | `#10b981` | Role: form success states only. Retired from general CTA use. |
| `--bg-primary` | **kept** | `#0f172a` | `#0f172a` | |
| `--bg-secondary` | **kept** | `#1e293b` | `#1e293b` | |
| `--bg-tertiary` | **kept** | `#334155` | `#334155` | |
| `--bg-card` | **kept** | `#1e293b` | `#1e293b` | Alias of `--bg-secondary` — keep for compat |
| `--bg-gradient` | **retired** | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` | _(remove usage; keep token with value until Phase 5 audit confirms nothing references it)_ | Used in old nav/header. Phase 1 should have removed the referencing selectors. |
| `--text-primary` | **kept** | `#f8fafc` | `#f8fafc` | |
| `--text-secondary` | **kept** | `#cbd5e1` | `#cbd5e1` | |
| `--text-muted` | **updated** | `#94a3b8` | `#a8b8cc` | WCAG AA fix: raises contrast on `--bg-secondary` from 3.8:1 to 4.6:1 |
| `--text-accent` | **kept, role clarified** | `#fbbf24` | `#fbbf24` | Callout/highlight text only |
| `--border-color` | **kept** | `#334155` | `#334155` | |
| `--border-light` | **kept** | `#475569` | `#475569` | |
| `--shadow-sm` | **updated** | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `0 1px 2px 0 rgb(0 0 0 / 0.2)` | More visible on dark bg |
| `--shadow-md` | **updated** | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | `0 4px 6px -1px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.3)` | |
| `--shadow-lg` | **updated** | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | `0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)` | |
| `--shadow-xl` | **updated** | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | `0 20px 25px -5px rgb(0 0 0 / 0.45), 0 8px 10px -6px rgb(0 0 0 / 0.3)` | |
| `--mathlogame-gradient` | **scoped** | `linear-gradient(135deg, #4BB3FD 0%, #10B981 50%, #4BB3FD 100%)` | `linear-gradient(135deg, #4BB3FD 0%, #10B981 50%, #4BB3FD 100%)` | Token kept; usage restricted to MATHLOGAME project card top-border only. Removed from all other contexts. |
| `--accent-focus-ring` | **new** | — | `rgba(99, 102, 241, 0.5)` | For `:focus-visible` box-shadow. Do not use as text color. |
| `--font-weight-semibold` | **new** | — | `600` | For h2/h3 headings |
| `--font-weight-medium` | **new** | — | `500` | For nav, buttons, card titles |
| `--letter-spacing-tight` | **new** | — | `-0.01em` | Wordmark and hero h1 only |
| `--shadow-accent` | **new** | — | `0 0 0 3px rgba(99, 102, 241, 0.5)` | Focus ring glow component |

### Light-mode additions (new tokens on `[data-theme="light"]` selector)

These are NOT added to `:root` — they go on `html[data-theme="light"]` and override the dark defaults.

| Token | Light value |
|---|---|
| `--bg-primary` | `#f8fafc` |
| `--bg-secondary` | `#f1f5f9` |
| `--bg-tertiary` | `#e2e8f0` |
| `--text-primary` | `#0f172a` |
| `--text-secondary` | `#334155` |
| `--text-muted` | `#64748b` |
| `--accent-color` | `#4f46e5` |
| `--accent-hover` | `#6366f1` |
| `--border-color` | `#cbd5e1` |
| `--border-light` | `#94a3b8` |
| `--warm-neutral` | `#b45309` |

---

## 7. Open Questions — for Salah

**1. Hero right column — portrait or code block?**
The two-column hero needs something on the right. Option A: a photo of Salah (best for personal brand credibility — recruiters and parents respond to it). Option B: a styled terminal/code block showing a snippet from one of his projects (stronger dev personality signal). Option C: no right column — centered text only, like leerob.com (simpler, mobile-first by default). Pick one. If Option A, drop a cropped portrait photo (at least 600×750px, ideally WebP) at `assets/images/salah-portrait.webp`.

**2. Hero headline copy — confirm or adjust.**
The spec proposes: `Hi, I'm Salah` + sub-line `I build tools for learning and write about education, math, and code.` This is 15 words, which is within the 25-word limit. Confirm this is the voice you want, or give me alternative phrasing. This is the only copy that needs your direct approval before Phase 3.

**3. `/now` page seed content.**
The `/now.html` page needs 4–6 bullets of what you're focused on right now (work, teaching, learning, reading). Can be a rough draft — I'll clean up formatting. Without this, the page ships as a visible placeholder, which is worse than not shipping it. Alternatively, defer `/now.html` to Phase 5 if you need time.

**4. Emerald `#10b981` — keep or drop from the token table?**
The current `--accent-color: #10b981` is the third accent. The spec repurposes it as form-success only and removes it from buttons and CTAs. If you've been using it for other things I haven't spotted (e.g., inside articles), tell me and I'll keep it as a true third accent. If success-only is fine, the token stays in `:root` but its documented role gets narrowed in CLAUDE.md.

---

*End of DESIGN_SPEC.md — Phase 2 complete. Awaiting sign-off to begin Phase 3.*
