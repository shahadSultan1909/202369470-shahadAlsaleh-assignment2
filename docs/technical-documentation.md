# Technical Documentation — Assignment 2

## Overview
This document explains the structure, design decisions, and implementation details of the portfolio website. Assignment 2 adds interactivity and live data to the site built in Assignment 1.

---

## 1. Technology Stack
- **HTML5** — semantic structure; ARIA attributes for the expandable sections.
- **CSS3** — Flexbox and Grid layout, CSS custom properties (design tokens), transitions
  and `@keyframes` animations, media queries.
- **Vanilla JavaScript (ES6)** — DOM manipulation, `localStorage`, `fetch` with
  `async/await`, and `try/catch`. No frameworks or libraries.
- **Google Fonts** — Fraunces (headings) and Inter (body text).
- **GitHub REST API** — public endpoint `GET https://api.github.com/repos/{owner}/{repo}` (no API key required).

No build tools or package managers are needed.

---

## 2. File Structure

| File / Folder | Purpose |
|---|---|
| `index.html` | The page: navbar, intro, About, Achievements, Projects, Contact, footer. |
| `css/styles.css` | All styling, organized by section, with design tokens in `:root`. |
| `js/script.js` | All behavior: navigation, greeting, form validation, expand/collapse with `localStorage`, GitHub API. |
| `assets/images/` | Reserved for future images (the current design uses text and SVG icons). |
| `docs/ai-usage-report.md` | How AI tools were used. |
| `docs/technical-documentation.md` | This file. |

### 2.1 Design Tokens (CSS Variables)
All colors, radii, fonts, and the shadow are defined once as CSS custom properties in
`:root` at the top of `styles.css`, so the pastel theme can be adjusted in one place:

```css
:root {
  --bg: #fbf6f8;
  --rose: #e39ab2;
  --rose-deep: #c76e8c;
  --lilac: #cdb9e6;
  --sage: #a9d2ba;
  --line: #e6d6de;
  --radius-md: 16px;
  --font-display: 'Fraunces', serif;
  --font-body: 'Inter', sans-serif;
  /* ... */
}
```

The new Assignment 2 components reuse these tokens (for example `var(--rose-deep)` for the
buttons and `var(--muted)` for status text) instead of hard-coding most colors.

---

## 3. Features Added in Assignment 2

### 3.1 Expand / Collapse Project Details
**What it does:** each project has a "Show more" button that reveals its biggest
challenge and what I learned.

**How it works:**
- HTML: a `<button>` with `aria-expanded` (open or closed) and `aria-controls` (the `id`
  of the panel it controls), followed by a `.project-details` panel.
- CSS: the panel uses `display: grid` with `grid-template-rows: 0fr` (closed) and `1fr`
  (open). Animating between the two gives a smooth height transition without knowing the
  content height. The inner `.details-inner` has `min-height: 0; overflow: hidden`.
- JS: a click toggles the `.open` class, updates `aria-expanded`, and swaps the label
  between "Show more" and "Show less". The "+" icon rotates into a "×".

### 3.2 Remembered State (`localStorage`)
**What it does:** the page remembers which projects are open and restores them after a
refresh or later visit.

**How it works:**
- `localStorage` only stores strings, so the list of open panel `id`s (for example
  `["details-fs"]`) is saved with `JSON.stringify` and read back with `JSON.parse`.
- On load, each button checks whether its `id` is in the saved list and opens its panel if
  so. On every click the list is updated and saved.
- Reads and writes are inside `try/catch`, so if storage is blocked (for example in a
  private window) the site keeps working, it just doesn't remember.

### 3.3 Animated Success and Error Messages
**What it does:** invalid form fields shake and their error messages slide in; a successful
submit slides in a confirmation message.

**How it works:**
- Two `@keyframes` animations: `slide-in-up` and `shake`.
- A browser only restarts a CSS animation when a class is *added*. So `validateField`
  removes the `invalid` class, forces a reflow (`void input.offsetWidth`), and adds it
  again. This makes the shake replay on every failed submit.

### 3.4 GitHub API Integration
**What it does:** each project card shows when the repository was created and last
updated, its star count (only if above zero), and its main language (only if GitHub
reports one), labelled "Live from GitHub".

**How it works:**
1. Each `.repo-stats` box in the HTML has a `data-repo` attribute, for example
   `shahad1233/File-System-Simulator`.
2. `loadRepoStats(box)` reads that attribute and calls `fetch` on the API URL.
3. While waiting, the box shows a pulsing "Loading GitHub info…" message.
4. The response is checked with `response.ok`. A `429` (rate limit) or `403` (rate limit)
   does not make `fetch` fail by itself, so the code throws its own error.
5. On success, the JSON fields `created_at`, `pushed_at`, `stargazers_count` and `language`
   are turned into a list using `createElement` and `textContent` (not `innerHTML`, which
   keeps externally supplied text from being treated as HTML).
6. Any error goes to `catch`, which shows a friendly message and a **Try again** button.
   The technical error is logged with `console.error`.

---

## 4. Error Handling and User Feedback

| Situation | What the user sees |
|---|---|
| Empty or invalid form field | Field shakes, red border, and a message saying what to fix. |
| Valid form | Animated confirmation message (disappears after 4 seconds). |
| Waiting for GitHub | "Loading GitHub info…" (pulsing). |
| GitHub request fails (offline, rate limit, wrong repo) | "Couldn't load GitHub info right now." and a **Try again** button. |
| `localStorage` unavailable | Nothing; the toggles still work but aren't remembered. |

---

## 5. Accessibility
- Expand buttons use `aria-expanded` and `aria-controls`; decorative icons use
  `aria-hidden="true"`.
- Buttons are real `<button>` elements, so they work with the keyboard and show a visible
  focus style.
- `@media (prefers-reduced-motion: reduce)` turns off transitions and animations.

---

## 6. Responsive Design
Layout uses CSS Grid and Flexbox with two breakpoints: `768px` (tablet, slide-in mobile
menu) and `480px` (mobile, single-column project rows). The new buttons and GitHub
information wrap naturally on small screens. The message box can only be resized
vertically, with a minimum and maximum height, so it can't break the form layout.

---

## 7. Browser Compatibility
Developed and manually tested in **Microsoft Edge, Chrome**. The page uses standard features (`fetch`,
`async/await`, `localStorage`, CSS Grid, animations). The grid-rows height animation needs a reasonably modern browser.

---

## 8. Known Limitations and Future Improvements
- **GitHub rate limit:** anonymous API requests are limited per hour, so many quick reloads may show the "Try again" message.
- **Missing language:** some repositories return no language, so it isn't shown.
- **Contact form:** there is no backend, so messages are not actually sent.
- **Next steps (Assignment 3):** filter and sort the projects, and add a theme toggle and more saved preferences.