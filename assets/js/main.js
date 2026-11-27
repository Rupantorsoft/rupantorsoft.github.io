/**
 * Rupantorsoft site behaviour.
 * - Sticky header background on scroll
 * - Mobile navigation toggle
 * - Scroll-reveal animations
 * - Contact form submission via Formspree
 * - Copyright year in Bengali digits
 */
(() => {
  'use strict';

  const BENGALI_DIGITS = '০১২৩৪৫৬৭৮৯';
  const toBengaliDigits = (value) =>
    String(value).replace(/\d/g, (d) => BENGALI_DIGITS[Number(d)]);

  const MESSAGES = {
    sending: 'পাঠানো হচ্ছে...',
    success: 'ধন্যবাদ! আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব।',
    error: 'দুঃখিত, পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    menuOpen: 'মেনু খুলুন',
    menuClose: 'মেনু বন্ধ করুন',
  };

  function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const SCROLLED = ['bg-ink-950/80', 'backdrop-blur-lg', 'border-b', 'border-white/10'];
    const update = () => {
      const scrolled = window.scrollY > 10;
      SCROLLED.forEach((cls) => header.classList.toggle(cls, scrolled));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initMobileMenu() {
    const button = document.querySelector('[data-menu-toggle]');
    const menu = document.getElementById(button?.getAttribute('aria-controls') ?? '');
    if (!button || !menu) return;

    const iconOpen = button.querySelector('[data-icon-open]');
    const iconClose = button.querySelector('[data-icon-close]');

    const setOpen = (open) => {
      menu.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? MESSAGES.menuClose : MESSAGES.menuOpen);
      iconOpen?.classList.toggle('hidden', open);
      iconClose?.classList.toggle('hidden', !open);
    };

    button.addEventListener('click', () => setOpen(menu.hidden));
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !menu.hidden) {
        setOpen(false);
        button.focus();
      }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && setOpen(false));
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      observer.observe(el);
    });
  }

  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    const status = document.querySelector('[data-form-status]');
    if (!form || !status || !window.fetch) return;

    const submit = form.querySelector('[type="submit"]');
    const showStatus = (text, tone) => {
      status.textContent = text;
      status.dataset.tone = tone;
      status.hidden = false;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submit.disabled = true;
      showStatus(MESSAGES.sending, 'info');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
        form.reset();
        showStatus(MESSAGES.success, 'success');
      } catch (error) {
        console.error(error);
        showStatus(MESSAGES.error, 'error');
      } finally {
        submit.disabled = false;
      }
    });
  }

  function initYear() {
    const year = document.querySelector('[data-year]');
    if (year) year.textContent = toBengaliDigits(new Date().getFullYear());
  }

  initHeader();
  initMobileMenu();
  initReveal();
  initContactForm();
  initYear();
})();
