/* ============================================================
   THE INTERFACES — section driver (real client products).

   - Reveals the section on scroll (staggered entrance via CSS).
   - projectsData is the single source of truth: the selector
     cards are rendered from it and the project stage reads from
     it, so adding a project = one entry + assets.
   - Switching a project cross-fades the stage (preview + info)
     without touching the rest of the page. The existing
     data/state architecture is preserved.
   - This phase is STATIC: the preview shows one screenshot.
     .ui-preview-viewport is left as a clean mount point so a
     later phase can add hero sliders / hotspots / auto slides
     per project without touching this markup.

   NOTE: screen1 / screen2 / thumbnail / problem / solution /
   focus are kept on every entry even though the homepage no
   longer renders the full case. Dedicated case-study pages and
   later phases still rely on that data.
   ============================================================ */

(function () {
  'use strict';

  const section = document.getElementById('interfaces');
  if (!section) return;

  const TOTAL_LABEL = '03';

  /* screenshots ship as WebP: an 800w variant for phones, the full
     1440w file everywhere else (desktop sharpness is unchanged) */
  const SHOT_SIZES = '(max-width: 760px) 100vw, 1440px';
  const shot = (name) => ({
    src: 'assets/ui/' + name + '.webp',
    srcset: 'assets/ui/' + name + '-800.webp 800w, assets/ui/' + name + '.webp 1440w'
  });

  /* ---------- project registry ----------
     preview  : the single large homepage screenshot shown in the stage.
     scope    : real scope of work performed, left → right. Not a
                Design-Thinking diagram — just what was done.
     facts    : factual, verifiable notes only. No KPIs, no invented
                metrics. `screens` is only set where a real count exists.
     caseHref : dedicated case-study page. null while it does not exist
                yet — the CTA stays visible but inert. */
  const projectsData = [
    {
      id: 'nquadro',
      number: '01',
      name: 'NQUADRO',
      category: 'B2B Product Catalog',
      type: 'CLIENT PROJECT',
      catLine: 'B2B PRODUCT CATALOG · UX/UI · IA',
      headline: 'Reframing a complex catalog around product discovery.',
      shortDesc:
        'A broad product offering required a clearer way to understand, explore ' +
        'and navigate the catalog. The experience was reorganized around product ' +
        'use and context, making relevant products easier to discover.',
      scope: ['UX AUDIT', 'IA', 'WIREFRAMES', 'UI FUNDAMENTALS', 'UI'],
      facts: ['15+ SCREENS', 'DESKTOP + MOBILE', 'REAL CLIENT'],
      caseHref: 'case-nquadro.html',
      previewUrl: 'nquadro',
      preview: Object.assign(shot('nquadro-slide-1'), { label: '01 · HOMEPAGE', alt: 'NQUADRO, homepage interface design' }),
      /* three final hero states — the preview cycles through them.
         slide 1 doubles as the static poster (preview.src). */
      slides: [
        shot('nquadro-slide-1'),
        shot('nquadro-slide-2'),
        shot('nquadro-slide-3')
      ],

      description:
        'A B2B product catalog designed to make a large and complex offering easier ' +
        'to explore, combining clear navigation with a strong visual identity.',
      scopeCounts: { wireframes: '15', hifiScreens: '15', totalScreens: '30+' },
      problem: [
        'A large product range made discovery and navigation increasingly complex. ' +
        'Users needed a clearer way to understand the offering and quickly reach ' +
        'the products relevant to their needs.'
      ],
      solution: [
        'The catalog was reorganized into clear macro-categories based on product ' +
        'use and context, supported by strong visual references for faster ' +
        'recognition and navigation.',
        'The homepage was also redesigned as a product discovery hub: search, ' +
        'categories and key product information become immediately accessible ' +
        'instead of being buried deeper in the catalog.'
      ],
      thumbnail: 'assets/ui/nquadro-thumb.jpg',
      screen1: { src: 'assets/ui/nquadro-01.jpg', label: '01 · HOMEPAGE', alt: 'NQUADRO, homepage interface design' },
      screen2: { src: 'assets/ui/nquadro-02.jpg', label: '02 · CATALOG', alt: 'NQUADRO, product catalog interface design' }
    },
    {
      id: 'elementa',
      number: '02',
      name: 'Elementa',
      category: 'B2B SaaS',
      type: 'CLIENT PROJECT',
      catLine: 'B2B SAAS · UX/UI · CRO',
      headline: 'Turning a complex SaaS into a clear path to trial.',
      shortDesc:
        'A B2B SaaS experience designed to make a complex product easier to ' +
        'understand and create a clearer path from discovery to trial.',
      scope: ['UX AUDIT', 'IA', 'WIREFRAMES', 'UI', 'CRO'],
      facts: ['B2B SAAS', 'DESKTOP + MOBILE', 'REAL CLIENT'],
      caseHref: 'case-elementa.html',
      previewUrl: 'elementa',
      preview: Object.assign(shot('elementa-home-a'), { label: '01 · HOMEPAGE', alt: 'Elementa, homepage interface design' }),

      description:
        'A B2B SaaS experience designed to make a complex product easier to ' +
        'understand and create a clearer path from discovery to trial.',
      focus: 'Conversion · Information Architecture · Design System',
      problem: [
        'Product data showed that a significant share of subscribers had previously ' +
        'started with a free trial. Further research highlighted its role in helping ' +
        'users understand the platform\'s simplicity and experience its benefits ' +
        'before committing.'
      ],
      solution: [
        'The experience was reorganized around the free trial as a primary conversion ' +
        'path. Immediate access to the trial was brought into the homepage, supported ' +
        'by concise benefit-led messaging to communicate the product\'s value before ' +
        'asking users to commit.',
        'A dedicated Trial & Pricing experience then connects product discovery with ' +
        'plan comparison, creating a clearer path from evaluation to subscription.'
      ],
      thumbnail: 'assets/ui/elementa-home-a-thumb.webp',
      screen1: { src: 'assets/ui/elementa-home-a.png', label: '01 · HOMEPAGE', alt: 'Elementa, homepage interface design' },
      screen2: { src: 'assets/ui/elementa-product-a.png', label: '02 · TRIAL / PRICING', alt: 'Elementa, trial and pricing interface design' }
    }
  ];

  const el = {
    stage: section.querySelector('.ui-stage'),
    info: document.getElementById('uiInfo'),
    preview: section.querySelector('.ui-preview'),
    viewport: document.getElementById('uiViewport'),
    shot: document.getElementById('uiShot'),
    slides: document.getElementById('uiSlides'),
    sliderDots: document.getElementById('uiSliderDots'),
    previewUrl: document.getElementById('uiPreviewUrl'),
    previewLabel: document.getElementById('uiPreviewLabel'),
    index: document.getElementById('uiIndex'),
    type: document.getElementById('uiType'),
    name: document.getElementById('uiName'),
    cat: document.getElementById('uiCat'),
    headline: document.getElementById('uiHeadline'),
    desc: document.getElementById('uiDesc'),
    scope: document.getElementById('uiScope'),
    facts: document.getElementById('uiFacts'),
    ctaWrap: document.getElementById('uiCtaWrap')
  };

  const list = document.getElementById('uiProjects');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FADE_MS = 260;

  let current = projectsData[0].id;
  let swapping = false;

  const ARROW =
    '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M3 8h10M9 4l4 4-4 4"/></svg>';

  /* ---------- selector, built from the data ---------- */

  const cards = projectsData.map((p, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'ui-prj' + (i === 0 ? ' active' : '');
    card.dataset.project = p.id;
    card.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    card.innerHTML =
      '<span class="ui-prj-thumb">' +
        '<img src="' + p.thumbnail + '" alt="" width="520" height="370" loading="lazy" decoding="async" />' +
      '</span>' +
      '<span class="ui-prj-body">' +
        '<span class="ui-prj-num">' + p.number + ' / ' + TOTAL_LABEL + '</span>' +
        '<b>' + p.name + '</b>' +
        '<span class="ui-prj-cat">' + p.category.toUpperCase() + '</span>' +
      '</span>';
    card.addEventListener('click', () => setProject(p.id));
    list.appendChild(card);
    return card;
  });

  /* ---------- locked slot ----------
     A future project that exists in the portfolio system but is
     not unlocked yet (same ACTIVE / LOCKED convention as the Live
     AI project switch). Same card structure and dimensions, but a
     plain non-interactive element: no click, no focus, not part of
     `cards`, so it can never reach setProject / the stage. */
  const LOCK_ICON =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="5" y="10.5" width="14" height="10" rx="2"/>' +
    '<path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>' +
    '<path d="M12 14.6v2.2"/></svg>';

  const locked = document.createElement('div');
  locked.className = 'ui-prj ui-prj--locked';
  locked.setAttribute('aria-disabled', 'true');
  locked.innerHTML =
    '<span class="ui-prj-thumb ui-prj-lockart">' +
      '<span class="ui-prj-lock">' + LOCK_ICON + '</span>' +
      '<span class="ui-prj-lock-label">PROJECT LOCKED</span>' +
      '<span class="ui-prj-lock-date">NOV / DEC 2026</span>' +
    '</span>' +
    '<span class="ui-prj-body">' +
      '<span class="ui-prj-num">03 / ' + TOTAL_LABEL + '</span>' +
      '<b>PROJECT LOCKED</b>' +
      '<span class="ui-prj-cat">NOV / DEC 2026</span>' +
    '</span>';
  list.appendChild(locked);

  /* ---------- NQUADRO hero slider ----------
     Built once from the active project's `slides`, then reused for
     every transition (opacity crossfade + an almost imperceptible
     scale). Autoplay pauses on hover / focus, while the section is
     off-screen, and while the tab is hidden. The <img> nodes are
     real elements, so setting their src on build preloads all three.
     The build itself waits until the section approaches the viewport
     (NEAR_MARGIN); until then the static #uiShot stays as the poster
     and is only swapped out once slide 1 is decoded — the frame is
     never empty.
     ------------------------------------------------------------- */
  const slider = (function () {
    const wrap = el.slides;
    const dotsWrap = el.sliderDots;
    const SLIDE_MS = 4800;
    const NEAR_MARGIN = '1200px 0px';

    let imgs = [];
    let dots = [];
    let idx = 0;
    let timer = null;
    let built = false;
    let active = false;
    let hovered = false;
    let near = !('IntersectionObserver' in window);
    let pending = null;

    function build(sources) {
      built = true;
      sources.forEach((s, i) => {
        const img = new Image();
        img.className = 'ui-slide' + (i === 0 ? ' is-active' : '');
        img.decoding = 'async';
        img.alt = '';
        img.sizes = SHOT_SIZES;
        img.srcset = s.srcset;
        img.src = s.src; /* starts loading immediately → all three preloaded */
        wrap.appendChild(img);
        imgs.push(img);

        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'ui-sdot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Show slide ' + (i + 1));
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => { show(i); schedule(); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
      dotsWrap.setAttribute('aria-label', 'NQUADRO hero variations');
    }

    function show(n) {
      if (!imgs.length) return;
      const next = ((n % imgs.length) + imgs.length) % imgs.length;
      if (next === idx && imgs[idx].classList.contains('is-active')) return;
      imgs[idx].classList.remove('is-active');
      dots[idx].classList.remove('is-active');
      dots[idx].setAttribute('aria-selected', 'false');
      idx = next;
      imgs[idx].classList.add('is-active');
      dots[idx].classList.add('is-active');
      dots[idx].setAttribute('aria-selected', 'true');
    }

    function advance() {
      if (!active || hovered || document.hidden) return;
      if (!section.classList.contains('in-view')) return;
      show(idx + 1);
    }

    function schedule() {
      clearInterval(timer);
      timer = (active && imgs.length > 1) ? setInterval(advance, SLIDE_MS) : null;
    }

    function activate() {
      wrap.hidden = false;
      dotsWrap.hidden = false;
      el.shot.hidden = true;
      show(0);
      schedule();
    }

    function enable(sources) {
      active = true;
      if (built) { activate(); return; }
      pending = sources;
      if (!near) return; /* still far below: #uiShot remains the poster */
      build(sources);
      const first = imgs[0];
      const go = () => { if (active) activate(); };
      if (first.complete && first.naturalWidth) go();
      else first.decode().then(go, go);
    }

    if (!near) {
      const nearIO = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near = true;
        nearIO.disconnect();
        if (active && !built && pending) enable(pending);
      }, { rootMargin: NEAR_MARGIN });
      nearIO.observe(section);
    }

    function disable() {
      if (!built && !active) return;
      active = false;
      clearInterval(timer);
      timer = null;
      wrap.hidden = true;
      dotsWrap.hidden = true;
      el.shot.hidden = false;
    }

    /* hover / keyboard focus inside the preview pauses progression
       so a recruiter can study one state without fighting it */
    el.preview.addEventListener('pointerenter', () => { hovered = true; });
    el.preview.addEventListener('pointerleave', () => { hovered = false; });
    el.preview.addEventListener('focusin', () => { hovered = true; });
    el.preview.addEventListener('focusout', () => { hovered = false; });

    return { enable: enable, disable: disable, schedule: schedule };
  })();

  /* ---------- stage rendering ---------- */

  function renderScope(steps) {
    el.scope.textContent = '';
    if (!Array.isArray(steps) || !steps.length) { el.scope.hidden = true; return; }
    el.scope.hidden = false;
    steps.forEach((step, i) => {
      if (i > 0) {
        const arrow = document.createElement('span');
        arrow.className = 'ui-scope-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        el.scope.appendChild(arrow);
      }
      const chip = document.createElement('span');
      chip.className = 'ui-scope-step';
      chip.textContent = step;
      el.scope.appendChild(chip);
    });
  }

  function renderFacts(facts) {
    el.facts.textContent = '';
    if (!Array.isArray(facts) || !facts.length) { el.facts.hidden = true; return; }
    el.facts.hidden = false;
    facts.forEach((fact) => {
      const item = document.createElement('span');
      item.className = 'ui-fact';
      item.textContent = fact;
      el.facts.appendChild(item);
    });
  }

  /* the CTA stays visible even without a destination — it just
     can't be followed yet (no invented / broken link) */
  function renderCta(p) {
    el.ctaWrap.textContent = '';
    const hasHref = typeof p.caseHref === 'string' && p.caseHref.length > 0;
    const node = document.createElement(hasHref ? 'a' : 'span');
    node.className = 'ui-cta' + (hasHref ? '' : ' is-pending');
    if (hasHref) {
      node.href = p.caseHref;
    } else {
      node.setAttribute('aria-disabled', 'true');
    }
    node.innerHTML =
      '<span class="ui-cta-text">EXPLORE CASE STUDY</span>' +
      ARROW +
      (hasHref ? '' : '<span class="ui-cta-soon">SOON</span>');
    el.ctaWrap.appendChild(node);
  }

  function render(p) {
    el.index.textContent = p.number;
    el.type.textContent = p.type;
    el.name.textContent = p.name;
    el.cat.textContent = p.catLine;
    el.headline.textContent = p.headline;
    el.desc.textContent = p.shortDesc;
    el.previewUrl.textContent = p.previewUrl;
    el.previewLabel.textContent = p.preview.label;

    el.shot.sizes = SHOT_SIZES;
    el.shot.srcset = p.preview.srcset || '';
    el.shot.src = p.preview.src;
    el.shot.alt = p.preview.alt;
    el.viewport.dataset.project = p.id;

    if (Array.isArray(p.slides) && p.slides.length > 1) slider.enable(p.slides);
    else slider.disable();

    renderScope(p.scope);
    renderFacts(p.facts);
    renderCta(p);
  }

  /* the card lights up on click, before the stage catches up */
  function markActive(id) {
    cards.forEach((card) => {
      const on = card.dataset.project === id;
      card.classList.toggle('active', on);
      card.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* resolve once the preview image is decoded, so the incoming
     project never fades in on an empty frame — capped so a slow
     image can never hold the interaction hostage */
  function preload(p) {
    return Promise.race([
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.sizes = SHOT_SIZES;
        if (p.preview.srcset) img.srcset = p.preview.srcset;
        img.src = p.preview.src;
      }),
      new Promise((resolve) => setTimeout(resolve, 600))
    ]);
  }

  function setProject(id) {
    if (id === current) return;
    const p = projectsData.find((item) => item.id === id);
    if (!p) return;

    current = id;
    markActive(id);

    if (reduceMotion) {
      render(p);
      return;
    }

    el.stage.classList.add('is-swapping');

    /* a swap already running will pick up the newest selection itself */
    if (swapping) return;
    swapping = true;
    runSwap();
  }

  function runSwap() {
    const target = current;
    const p = projectsData.find((item) => item.id === target);

    Promise.all([
      preload(p),
      new Promise((resolve) => setTimeout(resolve, FADE_MS))
    ]).then(() => {
      if (current !== target) { runSwap(); return; }
      render(p);
      el.stage.classList.remove('is-swapping');
      swapping = false;
    });
  }

  /* ---------- initial paint ---------- */
  render(projectsData[0]);

  /* ---------- scroll reveal ---------- */

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      section.classList.toggle('in-view', entry.isIntersecting);
      if (entry.isIntersecting) {
        section.classList.add('revealed');
        slider.schedule(); /* restart the interval cleanly on re-entry */
      }
    });
  }, { threshold: 0.15 });

  io.observe(section);
})();
