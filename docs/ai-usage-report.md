# AI Usage Report — Assignment 2

**Student:** Shahad Sultan Alsaleh
**Student ID:** 202369470

---

## 1. Tools Used & Use Cases

### Claude (Anthropic), model: Claude Opus 5.5
I used Claude as a step-by-step tutor and coding assistant for the whole
assignment, in one long conversation (C01). I asked it to work with me
one step at a time and to explain every part, often in Arabic, because
I understand technical explanations better in my first language.

- **Planning:** I shared the Assignment 1 and Assignment 2 requirements
  and my Assignment 1 code, and planned all features with Claude before
  writing any code. I mapped each feature to the assignment sections
  (§2–§5) to make sure every requirement was covered.
- **Code suggestions:** Claude suggested the HTML, CSS, and JavaScript for
  each feature, split into small steps (HTML → CSS → JavaScript). I typed
  the code into my files myself, adapted it, and sent each file back for
  review before committing.
- **Code review and debugging:** Claude reviewed my files after each step
  and pointed out mistakes, such as misplaced elements, duplicated closing
  tags, and indentation problems.
- **Explanations:** I asked for line-by-line explanations of concepts I
  had not used before: CSS specificity, `@keyframes`, the
  `grid-template-rows: 0fr → 1fr` technique, `localStorage`, `fetch` with
  `async/await`, `try/catch/finally`, and `Array.filter`.
- **Git help:** copying my Assignment 1 repository into a new Assignment 2
  repository, commit message format, and how to credit AI in commits.
- **Documentation drafts:** Claude drafted the README, the technical
  documentation, and this report. I reviewed and edited them.

---

## 2. Benefits & Challenges

### Benefits
- **Learning while building:** instead of only receiving code, I got an
  explanation for every line. Explanations in Arabic, with analogies,
  helped me understand concepts like specificity and `localStorage`
  much faster.
- **Planning first:** planning the whole assignment before coding helped
  me choose features that cover all requirements without doing
  unnecessary work.
- **Fast feedback:** after each step, Claude reviewed my file and caught
  mistakes before I committed them.
- **Better code organization:** small commits for each step, comments for
  each feature, and reusable functions (for example, one validator per
  form field).

### Challenges
- **Placing code in the right spot:** several times I pasted code in the
  wrong place. I put the Pedestrian Crossing details inside the File
  System Simulator card, placed two details panels outside
  `project-body` (which would break the grid layout), and pasted extra
  closing tags (`</nav>`, `</div>`, `</header>`) that already existed in
  my file. I learned to check where each tag opens and closes before
  pasting.
- **Understanding new concepts:** some topics (keyframes, the
  `0fr → 1fr` trick, async code) were hard to understand at first. I asked
  Claude to explain them again in more detail, step by step, until they
  were clear.
- **Questioning the AI's assumptions:** Claude first described my
  Assignment 1 form as having a "bug" with the field border. I checked
  and explained that the bold border was actually the focus style, so it
  was not a bug. I also did not notice the "light flash" Claude described
  until I tested with a slow network in DevTools, so I asked why it
  happens before deciding to fix it.
- **Declaring AI use correctly:** at first I thought that if I typed the
  code myself, the commit did not need an AI credit. I learned that what
  matters is where the code came from, so every commit with AI-suggested
  code includes `Assisted-by: Claude (Opus 5.5)`.

---

## 3. Learning Outcomes

- **CSS:** specificity (and how it connects to what we studied in the
  lecture), CSS variables for theming, `@keyframes` vs `transition`,
  animating height with `grid-template-rows`, `transform` for smooth
  animations, and `prefers-reduced-motion`.
- **JavaScript:** event listeners (`click`, `input`, `blur`,
  `animationend`), `localStorage`, `fetch` with `async/await`, checking
  `response.ok`, `try/catch/finally`, template literals, `Array.filter`,
  and using `clearTimeout` to avoid an old timer hiding a new message.
- **Accessibility:** `aria-expanded`, `aria-controls`, `aria-label`,
  `aria-describedby`, `aria-live`, and keyboard-friendly buttons.
- **User experience:** always telling the user what happened and what to
  do next, and showing errors only after the user leaves a field, but
  clearing them as soon as they are fixed.
- **Workflow:** planning before coding, testing each step in the browser
  and DevTools before committing, and writing clear commit messages.
- **Academic integrity:** how to document AI use honestly, including
  commit attribution, a usage log, and keeping the AI's original output.

---

## 4. Responsible Use & Modifications

I reviewed and understood every suggestion before using it, and made my
own decisions throughout:

- **Rejected an AI suggestion:** Claude first suggested a project filter.
  I rejected it because I only have three projects, and proposed the
  expandable "what I learned / challenges" panels instead.
- **Improved the AI's HTML:** I wrapped the button text in its own
  `<span class="toggle-label">` (so JavaScript can change the text without
  removing the icon), used descriptive ids (`details-fs`,
  `details-pedestrian`, `details-ml`) instead of numbers, and used a `+`
  icon that rotates into `×`.
- **Wrote my own content:** all "Biggest challenge" and "What I learned"
  texts for my projects are my own.
- **Proposed a feature:** the shake animation for invalid form fields
  was my idea.
- **Removed unnecessary work:** I dropped a planned scroll-animation
  feature after confirming it was not required.
- **Tested everything:** I tested each step in the browser before
  committing: keyboard navigation, mobile sizes, dark mode, slow network
  throttling, a wrong repository name to trigger the API error message,
  and the browser console for errors.
- **Reviewed the documentation drafts:** I read and checked the README,
  technical documentation, and this report against what I actually did,
  and edited them before committing.

---

## 5. AI Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude (Opus 5.5) | 2026-10-19 | Full step-by-step session: planning features, repository setup, code suggestions and reviews for all four features, explanations, Git help, and documentation drafts. | `index.html`, `css/styles.css`, `js/script.js`, `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md`, `.gitignore`, `assets/images/.gitkeep` | Replaced the suggested filter feature with my own idea (expandable details); improved the HTML structure; wrote all project reflections myself; fixed placement mistakes after review. Tested each step in Chrome DevTools before committing. |
| A01 | Claude (Opus 5.5) | 2026-10-19 | Code for Feature 1: expandable project details (HTML, CSS, JS). | `index.html`, `css/styles.css`, `js/script.js` | Added a separate label `<span>`, descriptive ids, and a `+` icon; wrote the panel text myself. Later made the slide faster (0.25s, ease-in-out), changed the row hover to a 10px shift with a soft background (tried rounded corners and removed them), and fixed a broken closing tag in project 2's button. Tested all three buttons. |
| A02 | Claude (Opus 5.5) | 2026-10-19 | Code for Feature 2: dark/light theme with `localStorage` and the anti-flash head script. | `index.html`, `css/styles.css`, `js/script.js` | Checked the saved value in DevTools and tested refresh. Added the anti-flash script after seeing the flash. Later lightened the dark `--bg-alt` so the project hover is visible in dark mode. |
| A03 | Claude (Opus 5.5) | 2026-10-19 | Code for Feature 3: live GitHub repository info (`fetch`, loading and error states). | `index.html`, `css/styles.css`, `js/script.js` | Tested loading and error states. Later rewrote the error message, changed dates to full month names, and tried showing each repo's language but removed it because the API returns `null` for all three. |
| A04 | Claude (Opus 5.5) | 2026-10-19 | Code for Feature 4: contact form improvements (shake, blur validation, counter, personalized success message). | `index.html`, `css/styles.css`, `js/script.js` | The shake idea was mine. Later rewrote all error and success messages and made the shake stronger (±8px, 0.7s) because it was easy to miss. Tested empty, invalid, and valid submissions. |
| A05 | Claude (Opus 5.5) | 2026-10-19 | Draft of `README.md`. | `README.md` | Reviewed it and updated it to match my code changes. |
| A06 | Claude (Opus 5.5) | 2026-10-19 | Draft of `docs/technical-documentation.md`. | `docs/technical-documentation.md` | Checked the technical details against my code and confirmed the testing claims before committing. |
| A07 | Claude (Opus 5.5) | 2026-10-19 | Draft of this report. | `docs/ai-usage-report.md` | Rewrote parts in my own words and checked that every statement reflects what actually happened. |

The full, unedited conversation (C01) and the original AI outputs before
my edits (A01–A07) are included in the AI Evidence ZIP submitted on
Blackboard.

---

## 6. Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Shahad Sultan Alsaleh
**Student ID:** 202369470
**Date:** 2026-10-22