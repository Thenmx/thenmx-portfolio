/* ============================================================
   ABOUT / PROFILE — section driver.
   A reading section, not a live workflow: the only behavior is a
   one-shot entrance reveal on scroll (same IntersectionObserver
   pattern as js/cycle.js and js/interfaces.js). No autoplay, no
   loops — once revealed, the section stays settled.
   ============================================================ */

(function () {
  'use strict';

  const section = document.getElementById('about');
  if (!section) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add('revealed');
        io.unobserve(section);
      }
    });
  }, { threshold: 0.12 });

  io.observe(section);
})();
