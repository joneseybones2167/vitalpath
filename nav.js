// Shared navigation logic for Culmina Health site
(function () {
  const pages = [
    { label: 'Home', href: 'index.html' },
    { label: 'Programs', href: 'programs.html' },
    { label: 'Competitive', href: 'competitive.html' },
    { label: 'Architecture', href: 'architecture.html' },
    { label: 'Patient Flow', href: 'flow.html' },
  ];

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function buildNav() {
    const current = getCurrentPage();
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    // ── Hamburger button ──
    const hamburger = document.createElement('button');
    hamburger.id = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-dropdown');
    hamburger.innerHTML = `
      <span class="ham-bar"></span>
      <span class="ham-bar"></span>
      <span class="ham-bar"></span>
    `;
    nav.appendChild(hamburger);

    // ── Dropdown panel ──
    const dropdown = document.createElement('div');
    dropdown.id = 'nav-dropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.setAttribute('aria-hidden', 'true');

    pages.forEach(p => {
      const a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.label;
      const isActive = current === p.href || (current === '' && p.href === 'index.html');
      a.className = isActive ? 'nav-link active' : 'nav-link';
      a.setAttribute('role', 'menuitem');
      dropdown.appendChild(a);
    });

    nav.appendChild(dropdown);

    // ── Toggle logic ──
    function openMenu() {
      dropdown.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
      dropdown.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close when clicking a link
    dropdown.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  document.addEventListener('DOMContentLoaded', buildNav);
})();
