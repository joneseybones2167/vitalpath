// Shared navigation logic for Culmina Health site
(function () {
  const pages = [
    { label: 'Home', href: 'index.html' },
    { label: 'Competitive', href: 'competitive.html' },
    { label: 'Architecture', href: 'architecture.html' },
  ];

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function buildNav() {
    const current = getCurrentPage();
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    pages.forEach(p => {
      const a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.label;
      const isActive = current === p.href || (current === '' && p.href === 'index.html');
      a.className = isActive ? 'nav-link active' : 'nav-link';
      nav.appendChild(a);
    });
  }

  document.addEventListener('DOMContentLoaded', buildNav);
})();
