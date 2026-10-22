/*
   script.js
   Handles: dark/light theme toggle (localStorage), mobile nav toggle,
   smooth scrolling, time-based greeting, contact form (validation, live feedback, animations),
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

    /* Contact Form: validation, live feedback, and animations */
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMsg = document.getElementById('form-success');
  const messageCounter = document.getElementById('message-counter');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_MESSAGE_LENGTH = 10;
  let successTimer;

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

  function validateName() {
    return validateField(
      nameInput, nameError,
      nameInput.value.trim().length >= 2,
      'Name must contain at least 2 characters.'
    );
  }

  function validateEmail() {
    return validateField(
      emailInput, emailError,
      emailPattern.test(emailInput.value.trim()),
      'Please provide a valid email.'
    );
  }

  function validateMessage() {
    return validateField(
      messageInput, messageError,
      messageInput.value.trim().length >= MIN_MESSAGE_LENGTH,
      `Your message must be at least ${MIN_MESSAGE_LENGTH} characters long.`
    );
  }

  // Shake an invalid field once (the class is removed when the animation ends)
  function shakeField(input) {
    input.classList.add('shake');
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('animationend', () => {
      input.classList.remove('shake');
    });
  });

  // Live character counter for the message field
  function updateCounter() {
    const length = messageInput.value.trim().length;
    messageCounter.textContent = `${length} / ${MIN_MESSAGE_LENGTH} characters minimum`;
    messageCounter.classList.toggle('is-complete', length >= MIN_MESSAGE_LENGTH);
  }

  messageInput.addEventListener('input', updateCounter);

  // Validate when the user leaves a field, and re-check live once a field has an error
  function addLiveValidation(input, validate) {
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        validate();
      }
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validate();
      }
    });
  }

  addLiveValidation(nameInput, validateName);
  addLiveValidation(emailInput, validateEmail);
  addLiveValidation(messageInput, validateMessage);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.remove('show');
    clearTimeout(successTimer);

    const fields = [
      { input: nameInput, isValid: validateName() },
      { input: emailInput, isValid: validateEmail() },
      { input: messageInput, isValid: validateMessage() }
    ];

    const invalidFields = fields.filter(field => !field.isValid);

    if (invalidFields.length > 0) {
      invalidFields.forEach(field => shakeField(field.input));
      invalidFields[0].input.focus();
      return;
    }

    const firstName = nameInput.value.trim().split(' ')[0];
    successMsg.textContent = `Thanks for reaching out, ${firstName}! I’ve received your message and will reply as soon as possible.`;
    successMsg.classList.add('show');

    form.reset();
    updateCounter();

    successTimer = setTimeout(() => {
      successMsg.classList.remove('show');
    }, 5000);
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
      metaEl.textContent = "We couldn't fetch GitHub data. Check your connection, then click Try again.";
      metaEl.classList.add('is-error');
      console.error(`Failed to load GitHub info for ${repo}:`, error);

      // Retry button: reloads only this project's GitHub info
      const retryBtn = document.createElement('button');
      retryBtn.type = 'button';
      retryBtn.className = 'retry-btn';
      retryBtn.textContent = 'Try again';

      retryBtn.addEventListener('click', () => {
        metaEl.classList.remove('is-error');
        metaEl.classList.add('is-loading');
        metaEl.textContent = 'Loading GitHub info…';
        loadRepoInfo(metaEl);
      });

      metaEl.append(' ', retryBtn);
    } finally {
      metaEl.classList.remove('is-loading');
    }
  }

  repoMetaEls.forEach(loadRepoInfo);

  /* Footer Year */
  document.getElementById('year').textContent = new Date().getFullYear();

});
