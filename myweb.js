// Theme Toggle Functionality - Only Dark & Beige
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Apply saved theme on page load (default to dark)
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (savedTheme === 'beige') {
    document.body.classList.add('beige-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
  } else {
    // Force dark theme if nothing is saved
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Theme toggle button click handler - only dark and beige
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      let newTheme = 'beige';
      let newIcon = '<i class="fas fa-palette"></i>';

      document.body.classList.remove('dark-theme', 'beige-theme');

      if (currentTheme === 'dark') {
        newTheme = 'beige';
        newIcon = '<i class="fas fa-palette"></i>';
        document.body.classList.add('beige-theme');
      } else {
        // default back to dark
        newTheme = 'dark';
        newIcon = '<i class="fas fa-sun"></i>';
        document.body.classList.add('dark-theme');
      }

      localStorage.setItem('theme', newTheme);
      themeToggle.innerHTML = newIcon;
    });
  }
});

// Navigation functionality (robust, guarded)
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navClose = document.querySelector('.nav-close');
  const mainNav = document.getElementById('mainNav');

  // if mainNav is missing, bail (prevents errors)
  if (!mainNav) {
    console.warn('mainNav element not found (id="mainNav"). Toggle will not work.');
    return;
  }

  const navLinks = mainNav.querySelectorAll('a');

  function openNav() {
    mainNav.classList.add('open');
    mainNav.setAttribute('aria-hidden', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mainNav.classList.remove('open');
    mainNav.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Toggle mobile navigation (toggle instead of only add)
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (mainNav.classList.contains('open')) closeNav(); else openNav();
    });
  } else {
    console.warn('.nav-toggle button not found.');
  }

  // Close mobile navigation
  if (navClose) {
    navClose.addEventListener('click', closeNav);
  }

  // Close mobile nav when clicking on a link (mobile)
  if (navLinks && navLinks.length) {
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 700) closeNav();
      });
    });
  }

  // Smooth scroll for navigation links (only for existing links)
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return; // external links proceed normally
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');

        // Scroll to section
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });

        // close nav on mobile after scroll
        if (window.innerWidth <= 700) closeNav();
      }
    });
  });

  // Active nav link on scroll (guard sections exist)
  const sections = document.querySelectorAll('main section');
  if (sections && sections.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
});