// Basic interaction: mobile nav toggle, current year, simple form handling
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle mobile nav
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.setAttribute('aria-hidden', String(expanded));
      // Toggle visible class for small screens
      if (!expanded) {
        nav.setAttribute('aria-hidden', 'false');
      } else {
        nav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (window.innerWidth <= 640 && navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');
        }
      }
    });
  });

  // Simple form submit handler (non-server)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || 'Guest';
      alert(`Thanks, ${name}! This demo form does not send data — add your backend or integrate with a service.`);
      form.reset();
    });
  }
});
