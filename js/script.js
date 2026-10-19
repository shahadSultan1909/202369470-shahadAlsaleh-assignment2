/*
   script.js
   Handles: dark/light theme toggle (localStorage), mobile nav toggle,
   smooth scrolling, time-based greeting, contact form validation,
   expandable project details, GitHub repo info (API), and footer year.
*/

document.addEventListener('DOMContentLoaded', () => {

    /* Dark/Light Theme Toggle (saved in localStorage) */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');

  function applyTheme(theme) {
    const isDark = theme === 'dark';

    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      // Storage unavailable (e.g. private browsing): theme still works for this visit
    }
  }

  // On page load: saved choice first, otherwise follow the device setting
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(getSavedTheme() || (prefersDark ? 'dark' : 'light'));

  // On click: switch theme and remember the choice
  themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    saveTheme(newTheme);
  });

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

  /* Expandable Project Details */
  const detailToggles = document.querySelectorAll('.details-toggle');

  detailToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const panel = document.getElementById(toggle.getAttribute('aria-controls'));
      const label = toggle.querySelector('.toggle-label');
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('open', !isOpen);
      label.textContent = isOpen ? 'Show more' : 'Show less';
    });
  });


    /* GitHub Repo Info (fetched from the public GitHub API) */
  const repoMetaEls = document.querySelectorAll('.repo-meta[data-repo]');

  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  async function loadRepoInfo(metaEl) {
    const repo = metaEl.dataset.repo;

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`);

      if (!response.ok) {
        throw new Error(`GitHub responded with status ${response.status}`);
      }

      const data = await response.json();
      metaEl.textContent = `Created ${formatDate(data.created_at)} · Updated ${formatDate(data.pushed_at)}`;
    } catch (error) {
      metaEl.textContent = "Couldn't load GitHub info. Please refresh the page or try again later.";
      metaEl.classList.add('is-error');
      console.error(`Failed to load GitHub info for ${repo}:`, error);
    } finally {
      metaEl.classList.remove('is-loading');
    }
  }

  repoMetaEls.forEach(loadRepoInfo);

  /* Footer Year */
  document.getElementById('year').textContent = new Date().getFullYear();

});
