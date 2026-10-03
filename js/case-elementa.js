/* ============================================================
   CASE STUDY — ELEMENTA · page driver (light).

   js/case.js already handles the shared case-study behaviour on
   this page: section reveal on scroll, .in-view on [data-watch],
   and the rail scroll-spy. This file only adds the diagram
   choreography — subtle, one pass per viewport entry, fully
   consistent with the calm motion language used elsewhere in the
   portfolio (LIVE AI stays the most animated part).

   Sequences (each re-runs whenever its section re-enters view):
   - #journey       phase rail DISCOVER→…→SUBSCRIBE + mapped steps
   - #signal        BEHAVIORAL SIGNAL → PRODUCT INSIGHT → DESIGN RESPONSE
   - #subscription  PLAN SELECTED → … → CONFIRMATION

   Also builds the shared image lightbox (img.df-zoomable) used by
   every real UI / wireframe screenshot on the page.

   Formerly js/case-docuflow.js. The system-states sequence was
   removed with that section during the 2026-09-14 content pass.
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* generic: light a NodeList one item at a time, then optionally
     run a per-step callback (used for the journey fill bar) */
  function sequence(items, stepMs, onStep) {
    var i = 0;
    (function next() {
      if (i >= items.length) return;
      items[i].classList.add('is-lit');
      if (onStep) onStep(i, items[i]);
      i++;
      setTimeout(next, stepMs);
    })();
  }

  function reset(items) {
    for (var i = 0; i < items.length; i++) items[i].classList.remove('is-lit');
  }

  /* wire one section: run `play` when it enters the viewport,
     clear `nodes` when it leaves so the next entry replays it */
  function onEnter(section, nodes, play) {
    if (!section) return;

    if (reduceMotion) {
      for (var i = 0; i < nodes.length; i++) nodes[i].classList.add('is-lit');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      play();
      return;
    }

    /* mirrors the shared reveal observer in js/case.js (threshold 0.12):
       low enough that sections taller than the viewport — the
       subscription flow, the system-state grid — still trigger, since
       their peak intersection ratio stays well below 0.5. Replays each
       time the section is scrolled fully away and re-entered. */
    var played = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!played) { played = true; play(); }
        } else if (e.intersectionRatio === 0) {
          played = false;
          reset(nodes);
        }
      });
    }, { threshold: 0.12 });

    io.observe(section);
  }

  /* ---------- #journey ---------- */
  (function () {
    var section = document.getElementById('journey');
    if (!section) return;

    var phases = [].slice.call(section.querySelectorAll('.df-phase'));
    var steps = [].slice.call(section.querySelectorAll('.df-map-step'));
    var fill = section.querySelector('.df-phases-fill');
    var all = phases.concat(steps);

    function play() {
      reset(all);
      if (fill) fill.style.width = '0px';

      sequence(phases, 340, function (idx) {
        if (!fill || !phases.length) return;
        var pct = phases.length > 1 ? idx / (phases.length - 1) : 1;
        // rail runs 40px inset on each side (see .df-phases::before)
        var row = section.querySelector('.df-phases');
        if (row) fill.style.width = ((row.clientWidth - 80) * pct) + 'px';
      });

      setTimeout(function () { sequence(steps, 300); }, 260);
    }

    onEnter(section, all, play);
  })();

  /* ---------- #signal ---------- */
  (function () {
    var section = document.getElementById('signal');
    if (!section) return;
    var nodes = [].slice.call(section.querySelectorAll('.df-chain-node'));
    function play() { reset(nodes); sequence(nodes, 460); }
    onEnter(section, nodes, play);
  })();

  /* ---------- #subscription ---------- */
  (function () {
    var section = document.getElementById('subscription');
    if (!section) return;
    var nodes = [].slice.call(section.querySelectorAll('.df-step'));
    function play() { reset(nodes); sequence(nodes, 300); }
    onEnter(section, nodes, play);
  })();

  /* ---------- image lightbox ----------
     One shared overlay, reused by every real UI / wireframe
     screenshot on the page (img.df-zoomable) — not a separate
     lightbox per section. Click, overlay click, ESC and focus
     return all close it; background scroll is locked while open. */
  (function () {
    var imgs = [].slice.call(document.querySelectorAll('img.df-zoomable'));
    if (!imgs.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'df-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button type="button" class="df-lightbox-close" aria-label="Close image preview">' +
        '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>' +
      '</button>' +
      '<img class="df-lightbox-img" alt="" />';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('.df-lightbox-img');
    var closeBtn = overlay.querySelector('.df-lightbox-close');
    var open = false;
    var lastFocus = null;

    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
    }

    function show(src, alt, trigger) {
      imgEl.src = src;
      imgEl.alt = alt || '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('df-scroll-lock');
      document.body.classList.add('df-scroll-lock');
      open = true;
      lastFocus = trigger || document.activeElement;
      closeBtn.focus();
      document.addEventListener('keydown', onKey, true);
    }

    function close() {
      if (!open) return;
      open = false;
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('df-scroll-lock');
      document.body.classList.remove('df-scroll-lock');
      document.removeEventListener('keydown', onKey, true);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      imgEl.src = '';
    }

    imgs.forEach(function (img) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.addEventListener('click', function () {
        show(img.currentSrc || img.src, img.alt, img);
      });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          show(img.currentSrc || img.src, img.alt, img);
        }
      });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close(); // click outside the image
    });
  })();
})();
