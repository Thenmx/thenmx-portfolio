/* ============================================================
   THE CYCLE — methodology section driver.
   - Reveals the section on scroll (staggered entrance via CSS).
   - Steps a pulse through the nodes while the section is visible:
     PROBLEM → RESEARCH → HYPOTHESIS → OUTPUT → INSIGHT → return.
   - Continuously morphs the OUTPUT word; the card glows when a
     new output lands.
   - Subtle parallax on the stage; everything pauses off-screen
     and honors prefers-reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  const section = document.getElementById('cycle');
  if (!section) return;

  const stage = document.getElementById('cycleStage');
  const wordEl = document.getElementById('cycleWord');
  const outputCard = document.getElementById('cycleOutput');
  const nodes = [...section.querySelectorAll('.c-node')];

  const OUTPUTS = [
    'AI WORKFLOW', 'WEBSITE', 'MVP', 'DESIGN SYSTEM',
    'AI PRODUCT', 'DASHBOARD', 'FUNNEL', 'PROTOTYPE'
  ];

  const STEP_MS = 1250;   // pulse dwell time per node
  const WORD_MS = 1600;   // output rotation rhythm
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let stepTimer = null;
  let wordTimer = null;
  let stepIdx = -1;
  let wordIdx = 0;
  let revealed = false;

  /* ---------- pulse stepping ---------- */

  function step() {
    stepIdx = (stepIdx + 1) % (nodes.length + 1); // extra beat = the return
    nodes.forEach((n, i) => n.classList.toggle('current', i === stepIdx));
    section.classList.toggle('returning', stepIdx === nodes.length);
  }

  /* ---------- output rotation ---------- */

  function nextWord() {
    wordIdx = (wordIdx + 1) % OUTPUTS.length;
    wordEl.classList.remove('word-in');
    outputCard.classList.remove('pop');
    void wordEl.offsetWidth; // restart both animations
    wordEl.textContent = OUTPUTS[wordIdx];
    wordEl.classList.add('word-in');
    outputCard.classList.add('pop');
  }

  /* ---------- run only while visible ---------- */

  function start() {
    if (stepTimer || reduceMotion) return;
    stepTimer = setInterval(step, STEP_MS);
    wordTimer = setInterval(nextWord, WORD_MS);
  }

  function stop() {
    clearInterval(stepTimer);
    clearInterval(wordTimer);
    stepTimer = wordTimer = null;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!revealed) {
          revealed = true;
          section.classList.add('revealed');
          // let the entrance finish before the pulse starts moving
          setTimeout(start, reduceMotion ? 0 : 1500);
        } else {
          start();
        }
      } else {
        stop();
      }
    });
  }, { threshold: 0.3 });

  io.observe(section);

  /* ---------- subtle parallax ---------- */

  if (!reduceMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = section.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        // -1 … 1 as the section crosses the viewport
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        stage.style.transform = `translateY(${(p * 16).toFixed(1)}px)`;
      });
    }, { passive: true });
  }
})();
