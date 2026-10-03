/* ============================================================
   GLOBAL BOTTOM UTILITY BAR — the "anti-header".

   One shared, framework-free component, reused on every page:
     LEFT   ·  [ − ]  100%  [ + ]   controlled content scale
     RIGHT  ·  EN  /  IT            instant language switch

   • Language: no runtime AI, no network. All Italian copy lives
     in js/i18n-dict.js (window.PF_I18N). The engine walks the
     DOM, swaps visible text / translatable attributes, and can
     restore the exact English source. A MutationObserver keeps
     dynamically rendered content (hero timeline, showcase, case
     pipeline) translated while IT is active.
   • Scale: `zoom` on the root element via a CSS var. Fixed values
     90 / 100 / 110. The bar counter-scales itself back to 100%.
   • Both choices persist in localStorage and survive navigation:
       portfolioLanguage = "en" | "it"
       portfolioScale    = "90" | "100" | "110"
   ============================================================ */

(function () {
  'use strict';

  var LANG_KEY = 'portfolioLanguage';
  var SCALE_KEY = 'portfolioScale';
  var DEFAULT_LANG = 'en';
  var DEFAULT_SCALE = '100';
  var SCALES = ['90', '100', '110'];

  var DICT = (window.PF_I18N && window.PF_I18N.it) || {};
  var TITLES = (window.PF_I18N && window.PF_I18N.titles) || {};

  /* ---------------------------------------------------------
     STATE
     --------------------------------------------------------- */
  var lang = DEFAULT_LANG;
  var scale = DEFAULT_SCALE;
  var applying = false;
  var observer = null;
  var baseTitle = document.title;

  try {
    var sl = localStorage.getItem(LANG_KEY);
    if (sl === 'en' || sl === 'it') lang = sl;
    var ss = localStorage.getItem(SCALE_KEY);
    if (SCALES.indexOf(ss) !== -1) scale = ss;
  } catch (e) {}

  /* ---------------------------------------------------------
     i18n ENGINE
     --------------------------------------------------------- */
  var INLINE = {
    B: 1, STRONG: 1, EM: 1, I: 1, SPAN: 1, A: 1, BR: 1, SUP: 1,
    SUB: 1, SMALL: 1, U: 1, MARK: 1, CODE: 1, ABBR: 1, WBR: 1, TIME: 1
  };
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, SVG: 1, TEMPLATE: 1, IFRAME: 1, CANVAS: 1 };
  var ATTRS = ['aria-label', 'alt', 'title', 'placeholder'];
  var LETTER = /[A-Za-zÀ-ÖØ-öø-ÿ]/; /* letters only — excludes × ÷ */

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  /* an element is a translation "unit" when it carries real text
     directly and every element inside it is inline formatting that
     itself holds only text (e.g. <p>… <b>x</b> …</p>). Such an
     element is translated as one innerHTML string. */
  function isUnit(el) {
    var hasDirectText = false;
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && LETTER.test(n.nodeValue)) hasDirectText = true;
      else if (n.nodeType === 1) {
        if (!INLINE[n.tagName]) return false;
        for (var c = n.firstChild; c; c = c.nextSibling) {
          if (c.nodeType === 1) return false; // nested element inside the inline tag
        }
      }
    }
    return hasDirectText;
  }

  function translateUnit(el, to) {
    if (el.__i18nEN === undefined) el.__i18nEN = el.innerHTML;
    if (to === 'en') {
      if (el.innerHTML !== el.__i18nEN) el.innerHTML = el.__i18nEN;
      return;
    }
    var key = norm(el.__i18nEN);
    var t = DICT[key];
    if (t && norm(el.innerHTML) !== norm(t)) el.innerHTML = t;
  }

  function translateTextNode(node, to) {
    if (!LETTER.test(node.nodeValue)) return;
    if (node.__i18nEN === undefined) node.__i18nEN = node.nodeValue;
    var raw = node.__i18nEN;
    if (to === 'en') {
      if (node.nodeValue !== raw) node.nodeValue = raw;
      return;
    }
    var t = DICT[norm(raw)];
    if (!t) return;
    var lead = (raw.match(/^\s*/) || [''])[0];
    var trail = (raw.match(/\s*$/) || [''])[0];
    var next = lead + t + trail;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function translateTree(root, to) {
    if (!root || root.nodeType !== 1) return;
    if (SKIP[root.tagName] || root.hasAttribute('data-i18n-skip')) return;

    if (isUnit(root)) { translateUnit(root, to); return; }

    for (var n = root.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) translateTextNode(n, to);
      else if (n.nodeType === 1) translateTree(n, to);
    }
  }

  function translateAttrs(root, to) {
    if (!root || root.nodeType !== 1) return;
    var list = [root];
    var found = root.querySelectorAll('[aria-label],[alt],[title],[placeholder]');
    for (var i = 0; i < found.length; i++) list.push(found[i]);

    for (var j = 0; j < list.length; j++) {
      var el = list[j];
      if (el.closest && el.closest('[data-i18n-skip]')) continue;
      if (!el.__i18nAttr) el.__i18nAttr = {};
      for (var k = 0; k < ATTRS.length; k++) {
        var a = ATTRS[k];
        if (!el.hasAttribute(a)) continue;
        var cur = el.getAttribute(a);
        if (!LETTER.test(cur)) continue;
        if (!(a in el.__i18nAttr)) el.__i18nAttr[a] = cur;
        var raw = el.__i18nAttr[a];
        if (to === 'en') {
          if (cur !== raw) el.setAttribute(a, raw);
        } else {
          var t = DICT[norm(raw)];
          if (t && cur !== t) el.setAttribute(a, t);
        }
      }
    }
  }

  var OBS_OPTS = {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ATTRS
  };

  function startObserver() {
    if (observer || typeof MutationObserver === 'undefined') return;
    observer = new MutationObserver(function (muts) {
      if (applying || lang === 'en') return;
      applying = true;
      if (observer) observer.disconnect();
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData') {
          var tn = m.target;
          if (tn && tn.nodeType === 3) {
            tn.__i18nEN = undefined;           // content changed at the source
            translateTextNode(tn, 'it');
          }
        } else if (m.type === 'attributes') {
          if (m.target && m.target.nodeType === 1) {
            if (m.target.__i18nAttr) delete m.target.__i18nAttr[m.attributeName];
            translateAttrs(m.target, 'it');
          }
        } else {
          for (var a = 0; a < m.addedNodes.length; a++) {
            var node = m.addedNodes[a];
            if (node.nodeType === 1) { translateTree(node, 'it'); translateAttrs(node, 'it'); }
            else if (node.nodeType === 3) translateTextNode(node, 'it');
          }
        }
      }
      if (observer) observer.observe(document.body, OBS_OPTS);
      applying = false;
    });
    observer.observe(document.body, OBS_OPTS);
  }

  function applyLang() {
    applying = true;
    if (observer) observer.disconnect();

    translateTree(document.body, lang);
    translateAttrs(document.body, lang);
    document.documentElement.setAttribute('lang', lang);
    document.title = (lang === 'it' && TITLES[baseTitle]) ? TITLES[baseTitle] : baseTitle;

    if (observer) observer.observe(document.body, OBS_OPTS);
    applying = false;
  }

  /* ---------------------------------------------------------
     CONTENT SCALE  ·  `zoom` on the root, set through a CSS var
     (see css/utility-bar.css). The bar counter-scales itself.

     Large-desktop density: on pages that opt in with
     <html data-pf-screen-scale>, wide viewports multiply the
     reader's chosen scale by a capped factor, so a big monitor at
     100% reads like ~110% browser zoom. Laptops stay at ×1. The
     factor is folded into --pf-scale so the bar counter-zoom and
     the side-nav's zoom-adjusted rail threshold stay consistent;
     both steps keep innerWidth / scale above the 1640px rail line.
     --------------------------------------------------------- */
  var SCREEN_STEPS = [
    { mq: window.matchMedia('(min-width: 1920px)'), f: 1.1 },
    { mq: window.matchMedia('(min-width: 1800px)'), f: 1.05 }
  ];

  function screenFactor() {
    if (!document.documentElement.hasAttribute('data-pf-screen-scale')) return 1;
    for (var i = 0; i < SCREEN_STEPS.length; i++) {
      if (SCREEN_STEPS[i].mq.matches) return SCREEN_STEPS[i].f;
    }
    return 1;
  }

  function applyScale() {
    var root = document.documentElement;
    var next = String((+scale / 100) * screenFactor());
    if (root.style.getPropertyValue('--pf-scale') !== next) root.style.setProperty('--pf-scale', next);
  }

  SCREEN_STEPS.forEach(function (s) {
    if (s.mq.addEventListener) s.mq.addEventListener('change', applyScale);
    else if (s.mq.addListener) s.mq.addListener(applyScale);
  });
  /* fallback for engines that skip media-query change events;
     applyScale is a no-op unless the factor actually changes */
  window.addEventListener('resize', applyScale, { passive: true });

  /* ---------------------------------------------------------
     THE BAR
     --------------------------------------------------------- */
  var els = {};

  function buildBar() {
    var bar = document.createElement('div');
    bar.className = 'pf-ubar';
    bar.setAttribute('data-i18n-skip', '');
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Page view and language controls');

    bar.innerHTML =
      '<div class="pf-ubar-group" aria-label="Content scale">' +
        '<span class="pf-ubar-group-label">Scale</span>' +
        '<button type="button" class="pf-ubar-btn" id="pf-scale-down" aria-label="Decrease page scale">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 8h10"/></svg>' +
        '</button>' +
        '<span class="pf-ubar-value" id="pf-scale-value" aria-live="polite">100%</span>' +
        '<button type="button" class="pf-ubar-btn" id="pf-scale-up" aria-label="Increase page scale">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="pf-ubar-group" aria-label="Language">' +
        '<span class="pf-ubar-group-label">Lang</span>' +
        '<span class="pf-ubar-lang-wrap">' +
          '<button type="button" class="pf-ubar-lang" id="pf-lang-en" aria-label="Switch language to English">EN</button>' +
          '<span class="pf-ubar-lang-sep" aria-hidden="true">/</span>' +
          '<button type="button" class="pf-ubar-lang" id="pf-lang-it" aria-label="Switch language to Italian">IT</button>' +
        '</span>' +
      '</div>';

    document.body.appendChild(bar);

    els.down = bar.querySelector('#pf-scale-down');
    els.up = bar.querySelector('#pf-scale-up');
    els.value = bar.querySelector('#pf-scale-value');
    els.en = bar.querySelector('#pf-lang-en');
    els.it = bar.querySelector('#pf-lang-it');

    els.down.addEventListener('click', function () { stepScale(-1); });
    els.up.addEventListener('click', function () { stepScale(1); });
    els.en.addEventListener('click', function () { setLang('en'); });
    els.it.addEventListener('click', function () { setLang('it'); });

    /* analytics preferences — only where js/analytics.js is loaded */
    if (window.pfConsent && typeof window.pfConsent.open === 'function') {
      var privacy = document.createElement('button');
      privacy.type = 'button';
      privacy.className = 'pf-ubar-privacy';
      privacy.textContent = 'PRIVACY / ANALYTICS';
      privacy.addEventListener('click', function () { window.pfConsent.open(); });
      bar.insertBefore(privacy, bar.lastChild);
    }

    buildToTop();
  }

  /* ---------------------------------------------------------
     BACK TO TOP — small arrow suspended above the language
     switch (bottom-right). Lives outside the bar so the i18n
     engine translates its aria-label; fades in once scrolled.
     --------------------------------------------------------- */
  function buildToTop() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pf-totop';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML =
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5"/></svg>';
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    var shown = null;
    function sync() {
      var next = (window.scrollY || document.documentElement.scrollTop) > 320;
      if (next === shown) return;
      shown = next;
      btn.classList.toggle('is-visible', next);
      btn.tabIndex = next ? 0 : -1;
    }
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  function syncBar() {
    var idx = SCALES.indexOf(scale);
    els.value.textContent = scale + '%';
    els.down.disabled = idx <= 0;
    els.up.disabled = idx >= SCALES.length - 1;

    var it = lang === 'it';
    els.en.classList.toggle('is-active', !it);
    els.it.classList.toggle('is-active', it);
    els.en.setAttribute('aria-pressed', String(!it));
    els.it.setAttribute('aria-pressed', String(it));

    syncExternalLangControls();
  }

  /* ---------------------------------------------------------
     EXTERNAL LANGUAGE CONTROLS
     Any other element on the page can act as a language switch by
     carrying data-pf-lang="en"|"it" (e.g. the homepage intro's
     minimal ITA / ENG selector). They reuse this exact engine —
     no separate state, no separate translation logic.
     --------------------------------------------------------- */
  function syncExternalLangControls() {
    var it = lang === 'it';
    var extra = document.querySelectorAll('[data-pf-lang]');
    for (var i = 0; i < extra.length; i++) {
      var b = extra[i];
      var active = (b.getAttribute('data-pf-lang') === 'it') === it;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-pf-lang]');
    if (!btn) return;
    setLang(btn.getAttribute('data-pf-lang'));
  });

  /* ---------------------------------------------------------
     ACTIONS
     --------------------------------------------------------- */
  function setLang(next) {
    next = next === 'it' ? 'it' : 'en';
    if (next === lang) { syncBar(); return; }
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    applyLang();
    syncBar();
    if (typeof window.pfTrack === 'function') window.pfTrack('language_change', { language: lang });
  }

  function stepScale(dir) {
    var idx = SCALES.indexOf(scale);
    var nextIdx = Math.min(SCALES.length - 1, Math.max(0, idx + dir));
    if (nextIdx === idx) return;
    scale = SCALES[nextIdx];
    try { localStorage.setItem(SCALE_KEY, scale); } catch (e) {}
    applyScale();
    syncBar();
  }

  /* ---------------------------------------------------------
     BOOT
     --------------------------------------------------------- */
  function init() {
    applyScale();
    buildBar();
    syncBar();
    startObserver();
    if (lang === 'it') applyLang();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
