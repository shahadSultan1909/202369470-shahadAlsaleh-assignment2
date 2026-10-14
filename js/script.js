/* 
   script.js
   Handles: mobile nav toggle, smooth scrolling,
   time-based greeting, contact form validation,
   and footer year.
    */

document.addEventListener('DOMContentLoaded', () => {

  /*Mobile Navigation Toggle*/
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  /*Smooth Scrolling Between Sections */
  const navAnchors = document.querySelectorAll('a[href^="#"]');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;

  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });


  /*Greeting Message by Time of Day*/
  const greetingEl = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greetingText = 'Hello, welcome!';

  if (hour >= 5 && hour < 12) {
    greetingText = 'Good morning, welcome!';
  } else if (hour >= 12 && hour < 17) {
    greetingText = 'Good afternoon, welcome!';
  } else if (hour >= 17 && hour < 21) {
    greetingText = 'Good evening, welcome!';
  } else {
    greetingText = 'Working late? Welcome!';
  }

  greetingEl.textContent = greetingText;

  /*Contact Form Validation*/
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMsg = document.getElementById('form-success');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input, errorEl, condition, message) {
    if (!condition) {
      // Remove the class and force a reflow so the shake/slide
      // animations can restart on every failed submit
      input.classList.remove('invalid');
      errorEl.textContent = '';
      void input.offsetWidth;

      input.classList.add('invalid');
      errorEl.textContent = message;
      return false;
    } else {
      input.classList.remove('invalid');
      errorEl.textContent = '';
      return true;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.remove('show');

    const isNameValid = validateField(
      nameInput, nameError,
      nameInput.value.trim().length >= 2,
      'Please enter your name (at least 2 characters).'
    );

    const isEmailValid = validateField(
      emailInput, emailError,
      emailPattern.test(emailInput.value.trim()),
      'Please enter a valid email address.'
    );

    const isMessageValid = validateField(
      messageInput, messageError,
      messageInput.value.trim().length >= 10,
      'Message should be at least 10 characters.'
    );

    if (isNameValid && isEmailValid && isMessageValid) {
      successMsg.classList.add('show');
      form.reset();

      setTimeout(() => {
        successMsg.classList.remove('show');
      }, 4000);
    }
  });

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
    });
  });

  /*Expand / Collapse Project Details (remembered)*/
  const STORAGE_KEY = 'openProjects';

  function loadOpenProjects() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveOpenProjects(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      // Storage can be blocked (e.g. private mode); the toggles still work
    }
  }

  // Applies the open/closed look to one button + panel
  function setOpen(button, details, isOpen) {
    details.classList.toggle('open', isOpen);
    button.setAttribute('aria-expanded', isOpen);
    button.querySelector('.toggle-label').textContent = isOpen ? 'Show less' : 'Show more';
  }

  const openProjects = loadOpenProjects();

  document.querySelectorAll('.details-toggle').forEach((button) => {
    const id = button.getAttribute('aria-controls');
    const details = document.getElementById(id);

    // Restore the saved state when the page loads
    setOpen(button, details, openProjects.includes(id));

    button.addEventListener('click', () => {
      const isOpen = !details.classList.contains('open');
      setOpen(button, details, isOpen);

      // Keep the saved list in sync with what is open now
      const index = openProjects.indexOf(id);
      if (isOpen && index === -1) openProjects.push(id);
      if (!isOpen && index !== -1) openProjects.splice(index, 1);
      saveOpenProjects(openProjects);
    });
  });

  /* ---------- GitHub Repo Stats (GitHub API) ---------- */
  // Turns "2026-06-12T00:59:53Z" into "Jun 12, 2026"
  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Replaces the content of a box with one status message
  function showStatus(box, text, className) {
    const message = document.createElement('p');
    message.className = 'repo-status ' + className;
    message.textContent = text;
    box.textContent = '';
    box.appendChild(message);
  }

  async function loadRepoStats(box) {
    const repo = box.dataset.repo; // e.g. "shahad1233/File-System-Simulator"
    showStatus(box, 'Loading GitHub info…', 'loading');

    const response = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await response.json();

    // Build the list of details to show
    const details = [
      `Updated ${formatDate(data.pushed_at)}`,
      `★ ${data.stargazers_count}`
    ];
    if (data.language) {
      details.push(data.language); // some repos have no detected language (null)
    }

    const list = document.createElement('ul');
    list.className = 'repo-meta';
    details.forEach((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      list.appendChild(item);
    });

    box.textContent = '';
    box.appendChild(list);
  }

  document.querySelectorAll('.repo-stats').forEach(loadRepoStats); 

  /* Footer Year */
  document.getElementById('year').textContent = new Date().getFullYear();

});


