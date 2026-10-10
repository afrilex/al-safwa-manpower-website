/* Al Safwa Manpower Limited — dependency-free interactive website.
   Recruitment enquiries are composed in the visitor's own WhatsApp or email app.
   NO form data is stored in this website or sent to a hidden third-party endpoint. */
(() => {
  'use strict';
  const WHATSAPP_NUMBER = '254755541141';
  const COMPANY_EMAIL = 'dennisogato325@gmail.com';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Header navigation
  const nav = $('#main-navigation');
  const menuButton = $('.mobile-menu-btn');
  const menuIcon = $('.mobile-menu-btn use');
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (menuIcon) menuIcon.setAttribute('href', '#i-menu');
    document.body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click', () => {
    const isOpening = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', isOpening);
    menuButton.setAttribute('aria-expanded', String(isOpening));
    menuButton.setAttribute('aria-label', isOpening ? 'Close navigation' : 'Open navigation');
    if (menuIcon) menuIcon.setAttribute('href', isOpening ? '#i-x' : '#i-menu');
    document.body.classList.toggle('menu-open', isOpening);
  });
  $$('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) closeMenu();
  });

  // Track the current page section for the navigation highlight.
  const navSections = $$('main section[id]');
  const navLinks = $$('.nav-link');
  if ('IntersectionObserver' in window && navSections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) {
        const id = visible[0].target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    }, { rootMargin: '-18% 0px -65% 0px', threshold: 0 });
    navSections.forEach(section => observer.observe(section));
  }
  // First-screen intro animations are only enabled with JS and when motion is allowed.
  const reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px 50px 0px' });
    reveals.forEach(element => revealObserver.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('revealed'));
  }

  // Country filter; opportunities are enquiries, not fake listed vacancies.
  const filterButtons = $$('.filter-pill');
  const cards = $$('.opportunity-card');
  function filterOpportunities(country) {
    const selected = country || 'all';
    filterButtons.forEach(button => {
      const active = button.dataset.filter === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.country !== selected; });
  }
  filterButtons.forEach(button => button.addEventListener('click', () => filterOpportunities(button.dataset.filter)));
  $$('[data-select-destination]').forEach(link => link.addEventListener('click', () => filterOpportunities(link.dataset.selectDestination)));

  const appForm = $('#application-form');
  const appError = $('#application-error');
  const appCountry = $('#app-country');
  const appRole = $('#app-role');
  $$('.card-arrow').forEach(button => button.addEventListener('click', () => {
    if (appCountry) appCountry.value = button.dataset.countryName;
    if (appRole) appRole.value = button.dataset.role;
    $('#application')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Focus after jumping. Avoid shifting the view again on supporting browsers.
    window.setTimeout(() => $('#app-name')?.focus({ preventScroll: true }), 450);
  }));

  function validate(form, errorElement) {
    if (errorElement) errorElement.textContent = '';
    const phone = $('#app-phone');
    if (form === appForm && phone) {
      const validPhone = /^[+\d\s()\-]{9,24}$/.test(phone.value.trim());
      phone.setCustomValidity(validPhone ? '' : 'Enter a valid phone number, including country code if possible.');
    }
    if (!form.checkValidity()) {
      const invalid = $(':invalid', form);
      if (invalid) {
        if (invalid.type === 'checkbox') {
          if (errorElement) errorElement.textContent = 'Please agree to the privacy notice before continuing.';
        } else if (errorElement) {
          errorElement.textContent = 'Please complete the required fields with valid information.';
        }
        invalid.focus();
        invalid.reportValidity();
      }
      return false;
    }
    return true;
  }
  $('#app-phone')?.addEventListener('input', event => event.target.setCustomValidity(''));
  function getApplicationMessage() {
    const data = new FormData(appForm);
    const text = (name) => String(data.get(name) || '').trim();
    return [
      'Hello Al Safwa Manpower Limited,',
      '',
      'I would like to register my interest in domestic/household support recruitment.',
      '',
      `Full name: ${text('name')}`,
      `Phone/WhatsApp: ${text('phone')}`,
      `Email: ${text('email') || 'Not provided'}`,
      `Preferred destination: ${text('country')}`,
      `Experience: ${text('experience')}`,
      `Role of interest: ${text('role')}`,
      `Additional information: ${text('message') || 'None'}`,
      '',
      'Please let me know about confirmed available roles, eligibility and the next steps.',
      'I understand this is an enquiry, not a confirmed job application or placement.'
    ].join('\n');
  }
  function openNewTab(url) {
    const newWindow = window.open(url, '_blank');
    if (newWindow) newWindow.opener = null;
    else window.location.href = url;
  }
  appForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!validate(appForm, appError)) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(getApplicationMessage())}`;
    openNewTab(url);
  });
  $('#application-email-btn')?.addEventListener('click', () => {
    if (!validate(appForm, appError)) return;
    const subject = 'Candidate interest enquiry — Al Safwa Manpower';
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getApplicationMessage())}`;
  });

  // This contact form composes a real message in the user's email client.
  // It is not a server submission (no backend has been configured).
  const contactForm = $('#contact-form');
  const contactError = $('#contact-error');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!validate(contactForm, contactError)) return;
    const data = new FormData(contactForm);
    const subject = `Al Safwa Website Enquiry — ${data.get('topic')}`;
    const body = [
      'Hello Al Safwa Manpower Limited,', '',
      `Name: ${String(data.get('name')).trim()}`,
      `Email: ${String(data.get('email')).trim()}`,
      `Enquiry type: ${data.get('topic')}`, '',
      `Message:\n${String(data.get('message')).trim()}`, '',
      'Thank you.'
    ].join('\n');
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  $('#footer-year')?.replaceChildren(String(new Date().getFullYear()));
})();
