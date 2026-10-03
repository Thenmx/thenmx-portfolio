/* ============================================================
   CASE STUDY — NQUADRO · page driver (light).

   js/case.js already handles the shared case-study behaviour on
   this page: section reveal on scroll, .in-view on [data-watch],
   and the rail scroll-spy. This file only adds what is specific to
   NQUADRO: the hero screenshot slider — the same behaviour used by
   THE INTERFACES on the homepage (auto progression, smooth
   crossfade, pause on hover / off-screen / hidden tab, minimal
   slide indicator), rebuilt standalone so nothing on the homepage
   is touched.
   ============================================================ */

(function () {
  'use strict';

  var root = document.querySelector('[data-nq-slider]');
  if (!root) return;

  var slides = [].slice.call(root.querySelectorAll('.nq-slide'));
  /* the dots live in the frame footer (.nq-frame-foot), a sibling of
     the slider — look them up in the shared .nq-frame, not in root */
  var dotScope = root.closest('.nq-frame') || document;
  var dots = [].slice.call(dotScope.querySelectorAll('.nq-sdot'));
  if (slides.length < 2) return;

  var SLIDE_MS = 4800;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var idx = 0;
  var timer = null;
  var hovered = false;
  var visible = false;

  /* slides 2–3 ship with data-src / data-srcset so only slide 1 (the
     LCP image) loads with the page. They are hydrated once slide 1
     has loaded, and a slide is only ever shown after it has decoded —
     an auto-advance simply waits a tick, never fading to an empty frame. */
  function isReady(img) { return img.__nqReady === true; }

  function hydrate(img) {
    if (img.__nqLoading) return img.__nqLoading;
    if (img.dataset.srcset) { img.srcset = img.dataset.srcset; img.removeAttribute('data-srcset'); }
    if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
    img.__nqLoading = img.decode().then(function () { img.__nqReady = true; }, function () {});
    return img.__nqLoading;
  }

  function hydrateRest() {
    for (var i = 1; i < slides.length; i++) hydrate(slides[i]);
  }

  slides[0].__nqReady = true;
  if (slides[0].complete) hydrateRest();
  else {
    slides[0].addEventListener('load', hydrateRest, { once: true });
    slides[0].addEventListener('error', hydrateRest, { once: true });
  }

  function show(n) {
    var next = ((n % slides.length) + slides.length) % slides.length;
    if (next === idx && slides[idx].classList.contains('is-active')) return;
    slides[idx].classList.remove('is-active');
    if (dots[idx]) { dots[idx].classList.remove('is-active'); dots[idx].setAttribute('aria-selected', 'false'); }
    idx = next;
    slides[idx].classList.add('is-active');
    if (dots[idx]) { dots[idx].classList.add('is-active'); dots[idx].setAttribute('aria-selected', 'true'); }
  }

  function advance() {
    if (hovered || !visible || document.hidden) return;
    var next = slides[(idx + 1) % slides.length];
    if (!isReady(next)) { hydrate(next); return; }
    show(idx + 1);
  }

  function schedule() {
    clearInterval(timer);
    timer = (!reduceMotion && visible) ? setInterval(advance, SLIDE_MS) : null;
  }

  /* a dot click shows its slide once decoded; only the most recent
     click wins, so a slow slide can never land after a newer choice */
  var requested = -1;
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      requested = i;
      if (isReady(slides[i])) { show(i); schedule(); return; }
      hydrate(slides[i]).then(function () {
        if (requested === i && isReady(slides[i])) { show(i); schedule(); }
      });
    });
  });

  var frame = root.closest('.nq-hero-visual') || root;
  frame.addEventListener('pointerenter', function () { hovered = true; });
  frame.addEventListener('pointerleave', function () { hovered = false; });
  frame.addEventListener('focusin', function () { hovered = true; });
  frame.addEventListener('focusout', function () { hovered = false; });

  document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible = e.isIntersecting;
        schedule();
      });
    }, { threshold: 0.2 });
    io.observe(root);
  } else {
    visible = true;
    schedule();
  }

  show(0);
})();

/* ============================================================
   SECTION 07 — interactive final-UI selector.
   One large preview + 3 thumbnail buttons (PRODUCT / CATEGORY /
   MOBILE). Clicking a thumbnail swaps the large preview image with
   a short opacity crossfade — no navigation, no reload. Clicking the
   large preview itself opens the shared lightbox below (it carries
   the nq-zoomable class) — thumbnails never do, they only select.
   ============================================================ */
(function () {
  'use strict';

  var thumbs = [].slice.call(document.querySelectorAll('.nq-select-thumb'));
  if (!thumbs.length) return;

  var img = document.getElementById('nqSelectImg');
  var label = document.getElementById('nqSelectLabel');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FADE_MS = reduceMotion ? 0 : 200;

  function select(btn) {
    if (btn.classList.contains('is-selected')) return;

    thumbs.forEach(function (t) {
      var on = t === btn;
      t.classList.toggle('is-selected', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    var src = btn.dataset.nqSrc;
    var alt = btn.dataset.nqAlt || '';
    var text = btn.dataset.nqLabel || '';

    function apply() {
      img.src = src;
      img.alt = alt;
      if (label) label.textContent = text;
      img.style.opacity = '1';
    }

    if (!FADE_MS) { apply(); return; }

    img.style.opacity = '0';
    setTimeout(apply, FADE_MS);
  }

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () { select(btn); });
  });
})();

/* ============================================================
   IMAGE LIGHTBOX  ·  shared overlay for every img.nq-zoomable on
   this page (the section 05 wireframes, the section 06 category
   hero images, the section 07 large preview). Click, overlay click,
   ESC and focus return all close it; background scroll is locked
   while open. Reused pattern from the ELEMENTA case page
   (img.df-zoomable / .df-lightbox), kept self-contained here as
   .nq-zoomable / .nq-lightbox.
   ============================================================ */
(function () {
  'use strict';

  var imgs = [].slice.call(document.querySelectorAll('img.nq-zoomable'));
  if (!imgs.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'nq-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<button type="button" class="nq-lightbox-close" aria-label="Close image preview">' +
      '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>' +
    '</button>' +
    '<img class="nq-lightbox-img" alt="" />';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector('.nq-lightbox-img');
  var closeBtn = overlay.querySelector('.nq-lightbox-close');
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
    document.documentElement.classList.add('nq-scroll-lock');
    document.body.classList.add('nq-scroll-lock');
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
    document.documentElement.classList.remove('nq-scroll-lock');
    document.body.classList.remove('nq-scroll-lock');
    document.removeEventListener('keydown', onKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    imgEl.src = '';
  }

  imgs.forEach(function (image) {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.addEventListener('click', function () {
      show(image.currentSrc || image.src, image.alt, image);
    });
    image.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        show(image.currentSrc || image.src, image.alt, image);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close(); // click outside the image
  });
})();
