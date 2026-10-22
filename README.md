# Shahad Sultan Alsaleh — Personal Portfolio (Assignment 2)

## Project Description

This is my personal portfolio website, built as Assignment 2 of the web
development course. It continues the responsive portfolio from
Assignment 1 and makes it **more interactive**: visitors can expand each
project to read what I learned, switch between light and dark themes,
see live data about my repositories from the GitHub API, and get clear,
animated feedback when filling in the contact form.

The site is built with plain **HTML, CSS, and JavaScript**, with no
frameworks, libraries, or backend.

### Sections
- **About Me**: a short introduction, background, skills, and hobbies.
- **Achievements**: academic honors and test scores.
- **Projects**: three featured projects with descriptions, live GitHub
  info, expandable details, and GitHub links.
- **Contact**: a form (Name, Email, Message) with client-side validation.

---

## What's New in Assignment 2

| Feature | What it does | How to try it |
|---|---|---|
| **Expandable project details** | Each project has a **Show more** button that opens a panel with my biggest challenge and what I learned. The panel slides open smoothly and the **+** icon turns into **×**. | Click **Show more** under any project, then click **Show less** to close it. |
| **Dark / light theme** | A 🌙 / ☀️ button in the navbar switches the theme. The choice is saved in `localStorage`, so it is remembered on the next visit. On a first visit, the site follows the device's theme setting. | Click the 🌙 button, then refresh the page: the dark theme stays. |
| **Live GitHub repo info** | Each project shows when its repository was created and last updated, fetched from the public GitHub API. A pulsing **Loading…** message appears while the data loads, and a friendly error message with a **Try again** button appears if the request fails. | Open the Projects section and watch the dates load under each title. |
| **Improved contact form** | Fields are checked when you leave them, errors disappear as soon as they are fixed, invalid fields shake on submit, a live counter shows the message length, and the success message greets you by name. | Leave a field empty or type an invalid email and press **Send Message**. |

### Features carried over from Assignment 1
- Fully responsive layout (desktop, tablet, mobile) using CSS Flexbox and Grid.
- Smooth scrolling navigation between sections.
- Time-of-day greeting message on the homepage.
- Mobile hamburger navigation menu.

### Accessibility
- All interactive elements are real `<button>` elements, so they work
  with the keyboard (Tab, then Enter or Space).
- `aria-expanded`, `aria-controls`, `aria-label`, and `aria-live` tell
  screen-reader users what each button does and when content changes.
- All animations are turned off for users who enable "reduce motion" in
  their device settings.

---

## Setup Instructions (Run Locally)

No installation or build tools are required. This is a static website.

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/shahadSultan1909/202369470-shahadAlsaleh-assignment2.git
   ```
2. **Navigate** into the project folder:
   ```bash
   cd 202369470-shahadAlsaleh-assignment2
   ```
3. **Open `index.html`** in your browser:
   - Double-click the file, **or**
   - Right-click it, choose "Open with", and pick your preferred browser, **or**
   - Use the VS Code **Live Server** extension for auto-reload while editing.

> **Note:** An internet connection is needed to load the Google Fonts
> and the live GitHub repository info. Without it, the site still works,
> and the projects show a friendly error message with a **Try again** button. with a **Try again** button.

---

## Project Structure

```
202369470-shahadAlsaleh-assignment2/
├── README.md
├── index.html
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
└── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md
```

---

## Technologies Used
- **HTML5**: semantic page structure and accessibility attributes.
- **CSS3**: custom properties (variables) for theming, Flexbox, Grid,
  transitions, and `@keyframes` animations.
- **JavaScript (ES6+)**: DOM events, `localStorage`, `fetch` with
  `async/await`, and `try/catch` error handling.
- **GitHub REST API**: public repository data (no authentication needed).
- **Google Fonts**: Fraunces (headings) and Inter (body text).

Full technical details are in
[`docs/technical-documentation.md`](docs/technical-documentation.md).

---

## AI Usage Summary

I used **Claude (Anthropic)** as a step-by-step tutor and coding assistant
throughout this assignment. It suggested code for each feature, and I
asked it to explain every part (often in Arabic) until I understood it.
I made my own decisions along the way, such as choosing the expandable
project details instead of a project filter, writing all the project
reflections myself, and suggesting the shake animation for form errors.
All AI-assisted commits are marked with `Assisted-by: Claude (Opus 5.5)`.

A full breakdown of tools used, benefits, challenges, learning outcomes,
and the usage log is available in
[`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## Author

**Shahad Sultan Alsaleh** (Student ID: 202369470)
