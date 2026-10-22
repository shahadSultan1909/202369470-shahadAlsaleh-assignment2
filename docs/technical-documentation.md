# Technical Documentation

## Overview
This document explains the technical structure, design decisions, and
implementation details of my portfolio website. Assignment 2 builds on
the Assignment 1 foundation and adds four interactive features:

1. Expandable project details
2. Dark / light theme toggle saved in `localStorage`
3. Live GitHub repository info from the GitHub REST API
4. Improved contact form feedback (live validation, shake animation,
   character counter, personalized success message)

---

## 1. Technology Stack
- **HTML5**: semantic page structure, plus ARIA attributes for accessibility.
- **CSS3**: custom properties (variables) for theming, Flexbox, Grid,
  transitions, and `@keyframes` animations.
- **JavaScript (ES6+)**: no frameworks or libraries. All interactivity uses
  plain DOM APIs, `localStorage`, and `fetch` with `async/await`.
- **GitHub REST API**: public, read-only endpoint for repository data
  (no authentication or API key needed).
- **Google Fonts**: Fraunces (headings) and Inter (body text), loaded via
  `<link>` in `<head>`.

No build tools, package managers, or external JS libraries are required.

---

## 2. File Structure

| File/Folder | Purpose |
|---|---|
| `index.html` | Main page with all sections (Navbar, Hero, About, Achievements, Projects, Contact, Footer) and a small inline script in `<head>` that applies the saved theme before the page is drawn. |
| `css/styles.css` | All styling, organized by section. Theme colors are CSS variables at the top, with a dark palette under `:root[data-theme="dark"]`. |
| `js/script.js` | All interactivity, inside one `DOMContentLoaded` listener and split into commented sections (one per feature). |
| `assets/images/` | Reserved for future images (kept in Git with an empty `.gitkeep` file). |
| `docs/ai-usage-report.md` | Documents all AI tool usage, with the usage log and declaration. |
| `docs/technical-documentation.md` | This file. |
| `.gitignore` | Excludes OS files, editor settings, and AI evidence files from the repository. |

---

## 3. Design System (CSS Variables)

All colors, radii, fonts, and shadows are defined once as CSS custom
properties in `:root`, so every component reads its colors from the same
place:

```css
:root {
  --bg: #fbf6f8;
  --surface: #ffffff;
  --ink: #2b2230;
  --rose-deep: #c76e8c;
  --nav-bg: rgba(251, 246, 248, 0.82);
  --error: #c15c73;
  --success-bg: #a9d2ba;
  --success-text: #3f6b52;
  ...
}
```

In Assignment 2, the few colors that were still hard-coded (navbar
background, form error and success colors) were moved into variables
(`--nav-bg`, `--error`, `--success-bg`, `--success-text`). This was
necessary for the dark theme: a hard-coded color does not change when
the variables change.

---

## 4. Responsive Design Approach
- **CSS Grid** is used for each project row (icon | text | link). It
  becomes two columns on tablet and a single column on mobile.
- **Flexbox** is used for the navbar, hero, About section, tag lists, and
  the contact form's error/counter row.
- Two breakpoints:
  - `@media (max-width: 768px)`, tablet: the nav links become a slide-in
    side menu opened by the hamburger button, and project rows switch to
    two columns.
  - `@media (max-width: 480px)`, mobile: project rows stack into one
    column, thumbnails get smaller, and achievements stack vertically.
- The new navbar layout uses `margin-left: auto` on `<nav>` so the links
  and the `.nav-actions` group (theme toggle + hamburger) sit on the right
  on every screen size.

---

## 5. Features Carried Over from Assignment 1

### 5.1 Smooth Scrolling
Internal links (`href="#section"`) are intercepted with a `click`
listener. JavaScript subtracts the sticky navbar's height from the target
position so section titles are never hidden behind the navbar.

### 5.2 Mobile Navigation Toggle
The hamburger button toggles an `.open` class on `.nav-links`, which
slides the side menu in and out with a CSS `transform` transition.

### 5.3 Time-Based Greeting
`new Date().getHours()` picks a greeting ("Good morning", "Good
afternoon", etc.) for the hero badge.

---

## 6. New Features in Assignment 2

### 6.1 Expandable Project Details
**Requirement covered:** Dynamic Content (show/hide on click), Animation.

**HTML:** each project has a toggle button and a details panel, linked by
`aria-controls` → `id`:

```html
<button class="details-toggle" type="button"
        aria-expanded="false" aria-controls="details-fs">
  <span class="toggle-label">Show more</span>
  <span class="toggle-icon" aria-hidden="true">+</span>
</button>
<div class="project-details" id="details-fs">
  <div class="details-inner">...</div>
</div>
```

**CSS: the smooth slide.** CSS cannot animate `height: auto`, so the panel
is a one-row grid whose row animates from `0fr` (closed) to `1fr` (open,
full content height):

```css
.project-details { display: grid; grid-template-rows: 0fr; visibility: hidden;
                   transition: grid-template-rows 0.25s ease-in-out, visibility 0.25s; }
.project-details.open { grid-template-rows: 1fr; visibility: visible; }
.details-inner { overflow: hidden; min-height: 0; }
```

- `.details-inner` is the single grid item; `min-height: 0` lets it
  shrink to zero and `overflow: hidden` clips the text while it slides.
- `visibility: hidden` stops keyboard and screen-reader users from
  reaching the hidden text. Because it is transitioned too, the text
  stays visible until the closing slide finishes.
- The `+` icon rotates 45° into an `×` using the attribute selector
  `.details-toggle[aria-expanded="true"] .toggle-icon`, so the visual
  state and the accessibility state always match.

**JavaScript:** one `click` listener per button (added with `forEach`):

1. Find the panel with `document.getElementById(toggle.getAttribute('aria-controls'))`.
2. Read the current state from `aria-expanded`.
3. Flip `aria-expanded`, toggle the `.open` class on the panel, and switch
   the label between "Show more" and "Show less".

The label is in its own `<span>`, so changing its text does not remove
the `+` icon.

---

### 6.2 Dark / Light Theme Toggle (localStorage)
**Requirement covered:** Data Handling (save user preferences in
`localStorage`).

**How the theme switches:** the dark palette redefines the same variable
names under a more specific selector:

```css
:root[data-theme="dark"] {
  --bg: #1d1820;
  --ink: #f3eaf0;
  ...
  color-scheme: dark;
}
```

When `<html>` has `data-theme="dark"`, this rule wins by specificity
(pseudo-class + attribute selector beats pseudo-class alone), every
`var(...)` resolves to the dark value, and the whole site changes at
once. `color-scheme: dark` also makes browser-drawn parts such as
scrollbars dark.

**JavaScript logic:**

| Function / step | What it does |
|---|---|
| `applyTheme(theme)` | Adds or removes `data-theme="dark"` on `<html>`, and updates the button icon (🌙 / ☀️) and its `aria-label`. |
| `getSavedTheme()` | `localStorage.getItem('theme')`, which returns `'dark'`, `'light'`, or `null` on a first visit. |
| `saveTheme(theme)` | `localStorage.setItem('theme', theme)`. |
| On page load | Uses the saved theme first. If nothing is saved, follows the device setting with `window.matchMedia('(prefers-color-scheme: dark)')`. |
| On click | Flips the current theme, applies it, and saves it. |

Both storage functions are wrapped in `try/catch`: in some private
browsing modes, `localStorage` throws an error, and without the
`try/catch` the whole script would stop. In that case the theme still
works for the current visit; it just is not remembered.

**Preventing a light flash on load:** `script.js` runs at the end of the
page, so a dark-mode visitor could briefly see the light theme while the
page loads (most visible on slow connections). A small inline script in
`<head>` reads `localStorage` and sets `data-theme="dark"` **before** the
body is drawn. `script.js` still runs afterwards to update the icon and
label, because the button does not exist yet when the head script runs.

---

### 6.3 Live GitHub Repository Info (Public API)
**Requirements covered:** Data Handling (fetch from a public API), Error
Handling (loading indicator and friendly error message).

**HTML:** a placeholder under each project title stores the repository
name in a `data-repo` attribute and starts in a loading state:

```html
<p class="repo-meta is-loading" data-repo="shahad1233/File-System-Simulator">
  Loading GitHub info…
</p>
```

**Request flow (`loadRepoInfo`, an `async` function):**

```
fetch("https://api.github.com/repos/" + repo)
  ├─ response.ok is false (404, 403, 500…) → throw an Error
  └─ response.ok is true → response.json()
       → show "Created <date> · Updated <date>"
catch   → show a friendly red error message + a Try again button, and log details to the console
finally → remove the .is-loading class (stop the pulse)
```

- **`async/await`** lets the page stay responsive while waiting for the
  network. All three requests start at the same time (one per project).
- **`response.ok` check:** `fetch` only rejects on network failures, not
  on HTTP errors such as 404, so the code checks `response.ok` and throws
  its own error for those cases.
- **Dates:** `created_at` and `pushed_at` (the date of the last code
  push, which is more meaningful than `updated_at`, which also changes
  when a repo is starred). Dates are formatted with
  `toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })`,
  for example `Jun 12, 2026`.
- **Feedback states:**

| State | What the user sees | CSS |
|---|---|---|
| Loading | "Loading GitHub info…" | `.is-loading` → `pulse` animation (opacity 1 → 0.4 → 1, infinite) |
| Success | "Created June 12, 2026 · Updated June 12, 2026" | muted small text |
| Error | "We couldn't fetch GitHub data. Check your connection, then click Try again." plus a Try again button that reloads only that project | `.is-error` → `var(--error)` color |

- **Specificity note:** the selector is `.project-body .repo-meta`
  (two classes) so it overrides the existing `.project-body p` rule
  (one class + one element).
- Each project is handled independently, so one failed request does not
  affect the others.

---

### 6.4 Improved Contact Form Feedback
**Requirements covered:** Error Handling (form error messages),
Animation (animated success and error messages).

The Assignment 1 validation rules are unchanged (name ≥ 2 characters,
valid email pattern, message ≥ 10 characters). What changed is **when**
and **how** feedback is shown.

| Behavior | Implementation |
|---|---|
| One validator per field | `validateName()`, `validateEmail()`, `validateMessage()`, each reusing the original `validateField()` helper, so the same rules run on submit, on blur, and while typing. |
| Check on leaving a field | `blur` listener, only if the field is not empty, so tabbing through an empty form does not show errors. |
| Errors clear as soon as fixed | `input` listener that re-validates only while the field has the `.invalid` class. |
| Shake on submit | Invalid fields get a `.shake` class (`@keyframes shake`: ±6px horizontally over 0.7s). An `animationend` listener removes the class so the field can shake again on the next submit. |
| Focus the first error | `invalidFields[0].input.focus()` (uses `Array.filter` to collect the invalid fields). |
| Character counter | `input` listener updates "`n` / 10 characters minimum". It turns green (`.is-complete`) at 10. It uses `.trim().length`, the same as the validator. The minimum lives in one constant, `MIN_MESSAGE_LENGTH`. |
| Personalized success | "Thanks for reaching out, *FirstName*! I’ve received your message and will reply as soon as possible.". Inserted with `textContent` (never `innerHTML`) so user input cannot inject HTML. |
| Success entrance | `@keyframes fade-slide-in` (fade in + slide down 8px). An `animation` is used instead of a `transition` because the element changes from `display: none`, which transitions cannot animate. |
| Reliable auto-hide | The 5-second hide timer is stored in `successTimer` and cleared with `clearTimeout` on every submit, so an old timer cannot hide a newer message early. |
| Counter reset | `updateCounter()` is called after `form.reset()`, because `reset()` does not fire `input` events. |

---

## 7. Accessibility
- All interactive controls are real `<button>` elements (keyboard
  accessible by default).
- `aria-expanded` + `aria-controls` on the project toggles.
- `aria-label` on icon-only buttons (theme toggle, hamburger), updated by
  JavaScript when the theme changes.
- `aria-hidden="true"` on decorative icons and emojis.
- `aria-describedby` links the message field to its character counter.
- `role="status"` + `aria-live="polite"` on the success message, so
  screen readers announce it. (Not used on the counter, which would be
  announced on every keystroke.)
- `@media (prefers-reduced-motion: reduce)` disables all transitions
  **and** animations (`animation: none !important` was added in
  Assignment 2 for the new keyframe animations).

---

## 8. Error Handling Summary

| Situation | How the site responds |
|---|---|
| GitHub API unreachable, repo not found, or rate limit reached | Friendly message in red with a Try again button; details logged with `console.error`. Other projects still load. |
| `localStorage` unavailable | Caught with `try/catch`; theme still works for the current visit. |
| Invalid or empty form field | Inline error message, red border, shake, and focus moved to the first invalid field. |

---

## 9. Performance
- No frameworks or libraries; only three small files plus fonts.
- Only 3 small API requests per page load, sent in parallel.
- Animations use `transform` and `opacity`, which browsers can animate
  smoothly without recalculating the page layout.
- The inline theme script in `<head>` is a few lines, so it does not
  noticeably delay rendering.

---

## 10. Browser Compatibility
Tested manually in Chrome and Edge at desktop, tablet, and mobile sizes
using DevTools device emulation, in both light and dark themes. Slow
network conditions were tested with DevTools network throttling. All
features use standard, widely supported APIs (CSS variables, Grid,
Flexbox, `fetch`, `async/await`, `localStorage`). The grid-row slide
animation (`grid-template-rows: 0fr → 1fr`) needs a recent browser
version; older browsers still open and close the panel, just without
the slide.

---

## 11. Known Limitations / Future Improvements
- **GitHub API rate limit:** unauthenticated requests are limited to 60
  per hour per IP address. If the limit is reached, the friendly error
  message is shown.
- **No backend:** the contact form validates and confirms, but does not
  send the message anywhere (matches the assignment scope).
- **Future:** a project filter or search could be added once there are
  more projects