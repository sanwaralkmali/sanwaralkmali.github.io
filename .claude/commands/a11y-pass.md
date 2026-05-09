---
description: Run an accessibility audit + fix pass against WCAG 2.1 AA.
argument-hint: "[page-name?]"
allowed-tools: Read, Edit, Glob, Grep, Bash, Agent
---

Delegate to the `a11y-auditor` subagent.

If `$ARGUMENTS` names a specific page, scope to that page; otherwise audit every `.html` page at the repo root and under `articles/`.

The agent will:
1. Run the full a11y checklist (structure, images, interactive, forms, contrast, motion, language).
2. Fix every **critical** and **serious** finding in-place.
3. Surface **moderate** and **minor** findings as a punch list for the user to triage.
4. Specifically verify:
   - The contact modal in `index.html` has `role="dialog"`, `aria-modal`, focus trap, ESC-to-close, focus restoration.
   - The hamburger nav button toggles `aria-expanded`.
   - The hero's `CrazyMathAnimation` checks `prefers-reduced-motion` before starting.
   - Form inputs have real `<label>` elements, not just placeholders.
   - A "skip to main content" link is present.

After the agent's fixes, hand to `code-reviewer` to confirm no regressions, then report:
- Findings by severity, before vs after
- Files changed
- Any moderate/minor items the user still needs to decide on
