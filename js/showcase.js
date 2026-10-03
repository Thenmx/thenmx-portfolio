/* ============================================================
   THE CASES — showcase section driver.
   - Reveals the section on scroll (staggered entrance via CSS).
   - Drives the project selector: one showcase visible at a time,
     slides fade + slide horizontally in the direction of travel.
   - Everything else (monitor loops, metric stagger) is pure CSS
     keyed on .is-active, so animations restart on every switch.
   ============================================================ */

(function () {
  'use strict';

  const section = document.getElementById('showcase');
  if (!section) return;

  const slides = [...section.querySelectorAll('.sc-slide')];
  const tabs = [...section.querySelectorAll('.sc-tab')];

  let current = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));

  function select(i) {
    if (i === current || i < 0 || i >= slides.length) return;

    const forward = i > current;
    const out = slides[current];
    const inn = slides[i];

    // outgoing exits opposite to where the incoming enters from
    out.classList.remove('is-active');
    out.classList.toggle('pos-left', forward);

    // park the incoming slide on the correct side before activating
    inn.classList.toggle('pos-left', !forward);
    void inn.offsetWidth; // commit the start position
    inn.classList.add('is-active');

    tabs.forEach((t, ti) => {
      t.classList.toggle('active', ti === i);
      t.setAttribute('aria-selected', ti === i ? 'true' : 'false');
    });

    current = i;
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i)));

  /* ---------- reveal on scroll ---------- */

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add('revealed');
        io.disconnect();
      }
    });
  }, { threshold: 0.18 });

  io.observe(section);
})();
