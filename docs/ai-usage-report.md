# AI Usage Report — Assignment 2

**Student:** Shahad Sultan Alsaleh
**Student ID:** 202369470

---

## 1. Tools Used & Use Cases

**Claude (Anthropic)** was the only AI tool I used for this assignment. It helped me most with writing code and explaining concepts. I used it as a step-by-step tutor, not as a tool that builds the whole project for me.

| Use case | How I used it |
|---|---|
| Planning | Compared the assignment requirements with what I had in Assignment 1 and decided which features to add: expand/collapse, `localStorage`, animated messages, and the GitHub API. |
| Code generation | Asked for each feature one step at a time (HTML, then CSS, then JS) so I could test it before moving on. |
| Explanations | Asked Claude to explain `localStorage` with `JSON.stringify`/`JSON.parse`, `fetch` with `async/await`, `try/catch`, `response.ok`, and why the grid-rows trick (`0fr` to `1fr`) animates height. |
| Debugging | Pasted my files after changes so Claude could find mistakes. |
| Documentation | Used Claude to help me structure the README and technical documentation. |

---

## 2. Benefits & Challenges

**Benefits**
- Working one step at a time let me test every feature (refresh, DevTools Offline mode, small screen) before committing it.
- Explanations in simple Arabic helped me understand concepts that are new to me, such as asynchronous code and browser storage.
- I shared the zyBooks material with Claude so it could explain concepts based on what we studied, which helped me understand the code more easily.

**Challenges and limitations**
- **Learning new concepts:** features like `localStorage` and `fetch` with `async/await` were new to me. I asked Claude to explain them in simple words and relate them to the zyBooks material, then I tested them in the browser until I understood how they work.
- **Too much code at once:** at the beginning, getting a lot of code in one go was hard to follow. I asked Claude to work one step at a time (HTML, then CSS, then JS) so I could understand and test each piece before moving on.
- **Syntax errors after pasting:** a missing `}` at the end of a function broke all the JavaScript on the page, and in another version a `}` was in the wrong place so the function was never called. I learned to check the Console and the structure of my braces after pasting code.

---

## 3. Learning Outcomes

Working with AI on this assignment helped me:

- **`localStorage`:** it only stores strings, so arrays must be converted with `JSON.stringify` and read back with `JSON.parse`. I wrapped access in `try/catch` because storage can be blocked.
- **`try/catch`:** how to show a friendly message and a **Try again** button instead of a blank card, while logging the technical error with `console.error`.
- **Safe DOM updates:** I used `createElement` and `textContent` instead of `innerHTML` for text coming from an API.
- **CSS animation:** `@keyframes` (`slide-in-up`, `shake`, `pulse`), why an animation only restarts when its class is added again, and how `void el.offsetWidth` forces that restart.
- **CSS specificity:** why `.repo-stats .repo-status` wins over `.project-body p`.
- **Accessibility:** `aria-expanded`, `aria-controls`, `aria-hidden`, and `prefers-reduced-motion`.
- **Workflow with AI:** step-by-step requests, testing after every step, and checking claims against the course material.

---

## 4. Responsible Use & Modifications

To ensure the submission reflects my own understanding and work:

- I did not paste the AI output without making sure that I understood it. I added each piece step by step, tested it in the browser, and asked questions until I understood what each line does.
- **My decisions:** I chose to use the GitHub API myself after comparing it with other options. I also changed the design and code: I asked for the "Live from GitHub" label, for hiding the star count when it is zero, and for limiting the message box to vertical resizing.
- **Checking against the course:** I went back to the zyBooks material to see which parts of the code are covered by the course.
- **Testing:** I tested expand/collapse, restoring state after refresh, repeated form errors, and the Loading/error/Try again behavior using DevTools offline mode.
- **Documentation:** I reviewed the README and the technical documentation against my real CSS and JS files and corrected the parts that were not accurate.
- I split my work into meaningful commits, one for each feature, with clear commit messages.
