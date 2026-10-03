/* ============================================================
   CASE STUDY — page driver.
   - Reveals sections on scroll (staggered entrance via CSS).
   - Toggles .in-view on every [data-watch] container so CSS
     loops (.cs-loop) pause the moment they leave the viewport.
   - Scroll-spies the section rail.
   - Counts the result metrics up once, on first reveal.
   - Runs the architecture pipeline pulse: node by node, hold,
     reset, loop — fully stopped while the section is off-screen.
   ============================================================ */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- reveal + loop gating ---------- */

  const watched = [...document.querySelectorAll('[data-watch]')];

  const watchIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.12 });

  watched.forEach((el) => watchIO.observe(el));

  /* ---------- rail scroll spy ---------- */

  const links = [...document.querySelectorAll('.cs-rail-link')];
  const byId = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));

  const spyIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = byId.get(entry.target.id);
      if (!link) return;
      links.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spyIO.observe(section);
  });

  /* ---------- result counters (run once) ---------- */

  const counters = [...document.querySelectorAll('[data-count]')];

  function runCounter(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = +(el.dataset.decimals || 0);
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const t0 = performance.now();
    const duration = 1100;
    (function tick(now) {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countIO.unobserve(entry.target);
      runCounter(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach((c) => countIO.observe(c));

  /* ---------- architecture pipeline pulse ---------- */

  const pipe = document.getElementById('csPipe');
  if (!pipe) return;

  const nodes = [...pipe.querySelectorAll('.cs-node')];
  const fill = document.getElementById('csPipeFill');

  const STEP_MS = 620;   // per-node travel time
  const HOLD_MS = 2000;  // pause on the completed pipeline
  const GAP_MS = 500;    // dark gap before the next run

  let timer = null;
  let idx = 0;
  let running = false;

  /* fill width from track start to the center of a node,
     measured inside the (possibly scrolled) pipe element */
  function fillWidthTo(node) {
    const pipeRect = pipe.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const trackLeft = 46; // matches .cs-pipe-track left inset
    // rects are in zoomed px (root zoom from the content scale); the
    // fill width is set in the pipe's own CSS px, so undo the zoom first
    const zoom = pipeRect.width / (pipe.offsetWidth || pipeRect.width || 1) || 1;
    return Math.max(0, (nodeRect.left + nodeRect.width / 2 - pipeRect.left) / zoom - trackLeft);
  }

  function step() {
    if (!running) return;
    if (idx < nodes.length) {
      nodes[idx].classList.add('lit');
      fill.style.width = fillWidthTo(nodes[idx]) + 'px';
      idx++;
      timer = setTimeout(step, STEP_MS);
    } else {
      timer = setTimeout(reset, HOLD_MS);
    }
  }

  function reset() {
    if (!running) return;
    pipe.classList.add('resetting'); // fill fades out, no width tween
    nodes.forEach((n) => n.classList.remove('lit'));
    timer = setTimeout(() => {
      fill.style.width = '0px';
      // let the zero width land while invisible, then fade back in
      timer = setTimeout(() => {
        pipe.classList.remove('resetting');
        idx = 0;
        timer = setTimeout(step, GAP_MS);
      }, 60);
    }, 380);
  }

  function start() {
    if (running) return;
    running = true;
    idx = 0;
    timer = setTimeout(step, 400);
  }

  function stop() {
    running = false;
    clearTimeout(timer);
  }

  if (reduceMotion) {
    // static, completed pipeline — no loop at all
    nodes.forEach((n) => n.classList.add('lit'));
    fill.style.width = fillWidthTo(nodes[nodes.length - 1]) + 'px';
    return;
  }

  const pipeIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) start();
      else { stop(); nodes.forEach((n) => n.classList.remove('lit')); fill.style.width = '0px'; }
    });
  }, { threshold: 0.3 });

  pipeIO.observe(pipe);
})();
