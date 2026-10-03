/* ============================================================
   CONTACT — closing section driver.
   Two small responsibilities:

   1. Single source for the direct-contact channels. The email
      address and LinkedIn profile are declared once in
      window.PF_CONTACT (index.html) and rendered into both the
      visible value and the link target here — no duplication.
   2. One-shot entrance reveal on scroll (same IntersectionObserver
      pattern as js/about.js / js/cycle.js).

   Back-to-top is a native #hero link (smooth via the global
   scroll-behavior, disabled under prefers-reduced-motion in
   css/contact.css) — no script needed for it.
   ============================================================ */

(function () {
  'use strict';

  var section = document.getElementById('contact');
  if (!section) return;

  /* ---------- 1 · contact channels from a single source ---------- */
  var C = window.PF_CONTACT || {};

  function set(sel, fn) {
    var el = section.querySelector(sel);
    if (el) fn(el);
  }

  if (C.email) {
    set('#contactEmail', function (a) { a.setAttribute('href', 'mailto:' + C.email); });
    set('[data-contact="email"]', function (s) { s.textContent = C.email; });
  }
  if (C.linkedinUrl) {
    set('#contactLinkedin', function (a) { a.setAttribute('href', C.linkedinUrl); });
  }
  if (C.linkedinName) {
    set('[data-contact="linkedin"]', function (s) { s.textContent = C.linkedinName; });
  }

  /* ---------- 2 · entrance reveal ---------- */
  if (!('IntersectionObserver' in window)) {
    section.classList.add('revealed');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        section.classList.add('revealed');
        io.unobserve(section);
      }
    });
  }, { threshold: 0.12 });

  io.observe(section);
})();
