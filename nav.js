// VitalPath — Shared navigation
(function () {

  var pages = [
    { label: 'Home',           href: 'index.html' },
    { label: 'Programs',       href: 'programs.html' },
    { label: 'App Experience', href: 'portal.html', badge: 'New' },
    { label: 'Competitive',    href: 'competitive.html' },
    { label: 'Architecture',   href: 'architecture.html' },
    { label: 'Patient Flow',   href: 'flow.html' },
  ];

  var portalCTA = {
    label: 'Member Portal',
    href:  'vitalpath-portal.html',
  };

  function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function buildNav() {
    var current = getCurrentPage();

    // Rename wordmark to VitalPath on any page
    var wordmark = document.querySelector('.site-wordmark');
    if (wordmark) {
      wordmark.innerHTML = '<span class="wm-dot"></span>VitalPath';
    }

    var nav = document.getElementById('site-nav');
    if (!nav) return;

    // ── Hamburger ──
    var hamburger = document.createElement('button');
    hamburger.id = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-dropdown');
    hamburger.innerHTML =
      '<span class="ham-bar"></span>' +
      '<span class="ham-bar"></span>' +
      '<span class="ham-bar"></span>';
    nav.appendChild(hamburger);

    // ── Dropdown ──
    var dropdown = document.createElement('div');
    dropdown.id = 'nav-dropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.setAttribute('aria-hidden', 'true');

    // Main nav links
    pages.forEach(function(p) {
      var a = document.createElement('a');
      a.href = p.href;
      a.className = (current === p.href || (current === '' && p.href === 'index.html'))
        ? 'nav-link active'
        : 'nav-link';
      a.setAttribute('role', 'menuitem');
      if (p.badge) {
        a.innerHTML = p.label + ' <span class="nav-badge-pill">' + p.badge + '</span>';
      } else {
        a.textContent = p.label;
      }
      dropdown.appendChild(a);
    });

    // Divider
    var divider = document.createElement('div');
    divider.className = 'nav-divider-rule';
    dropdown.appendChild(divider);

    // Member Portal CTA
    var portalLink = document.createElement('a');
    portalLink.href = portalCTA.href;
    portalLink.target = '_blank';
    portalLink.rel = 'noopener noreferrer';
    portalLink.className = (current === portalCTA.href)
      ? 'nav-link nav-link-portal active'
      : 'nav-link nav-link-portal';
    portalLink.setAttribute('role', 'menuitem');
    portalLink.innerHTML =
      '<span class="nav-portal-icon">' +
        '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">' +
          '<circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.3"/>' +
          '<path d="M1 12c0-3 2.5-4.5 5.5-4.5S12 9 12 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
        '</svg>' +
      '</span>' +
      'Member Portal';
    dropdown.appendChild(portalLink);

    // Append dropdown to body (not inside header) so it's never clipped
    document.body.appendChild(dropdown);
    nav.appendChild(hamburger);

    // ── Toggle ──
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

    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (dropdown.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    dropdown.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  document.addEventListener('DOMContentLoaded', buildNav);

})();
