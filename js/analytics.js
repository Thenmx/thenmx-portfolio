/* =========================================================
   ANALYTICS — Google Analytics 4 (gtag.js), shared by every page.

   Loaded in <head> right after the async gtag.js loader. It owns
   the single gtag('config') call (page_view is sent by it on every
   full page load; the site has no SPA routing) and exposes
   window.pfTrack(name, params) for custom events.

   Tracked interactions (delegated, so dynamically rendered CTAs work):
     case_open          { case_name }                   link to a case-*.html page
     project_cta_click  { project_name, cta_location }  same links
     contact_click      { contact_type }                mailto / LinkedIn links
     language_change    { language }                    fired from utility-bar.js

   Consent (Google Consent Mode v2): every consent type defaults to
   denied before the config call. Advertising types are never
   granted. The visitor's analytics choice is kept in localStorage
   (portfolioAnalyticsConsent = "granted" | "denied"); without one,
   a small non-blocking banner asks once. window.pfConsent.open()
   reopens it (PRIVACY / ANALYTICS control in the utility bar).
   Banner clicks are never sent as events.

   Debug: open any page with ?pf_ga_debug=1 (remembered for the tab
   session; ?pf_ga_debug=0 turns it off). Events are then logged to
   the console and flagged debug_mode for GA4 DebugView. Nothing is
   ever shown in the UI.
   ========================================================= */
(function () {
  'use strict';

  if (window.__pfAnalytics) return;   /* never initialise twice */
  window.__pfAnalytics = true;

  var GA_ID = 'G-LHX9JL5MT3';
  var DEBUG_KEY = 'pfGaDebug';
  var CONSENT_KEY = 'portfolioAnalyticsConsent';

  var debug = false;
  try {
    var q = new URLSearchParams(window.location.search).get('pf_ga_debug');
    if (q === '1') sessionStorage.setItem(DEBUG_KEY, '1');
    if (q === '0') sessionStorage.removeItem(DEBUG_KEY);
    debug = sessionStorage.getItem(DEBUG_KEY) === '1';
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (typeof window.gtag !== 'function') window.gtag = gtag;

  var consent = null;   /* 'granted' | 'denied' | null (not asked yet) */
  try {
    var sc = localStorage.getItem(CONSENT_KEY);
    if (sc === 'granted' || sc === 'denied') consent = sc;
  } catch (e) {}

  try {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    if (consent === 'granted') window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    var cfg = {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    };
    if (debug) cfg.debug_mode = true;
    window.gtag('config', GA_ID, cfg);
  } catch (e) {}

  /* public helper — safe to call even when gtag.js is blocked
     (calls simply queue in dataLayer and go nowhere) */
  window.pfTrack = function (name, params) {
    try {
      params = params || {};
      if (debug) debugLog(name, params);
      window.gtag('event', name, params);
    } catch (e) {}
  };

  function debugLog(name, params) {
    try { console.info('[analytics]', name, params); } catch (e) {}
  }

  /* ---------- case-study links ---------- */
  var CASES = {
    'case-photo-evaluation.html': 'photo_ai',
    'case-travel-brain.html':     'travel_brain',
    'case-nquadro.html':          'nquadro',
    'case-elementa.html':         'elementa'
  };

  function ctaLocation(a) {
    if (a.classList.contains('story-cta'))   return 'hero_product_story';
    if (a.classList.contains('ui-cta'))      return 'interfaces_showcase';
    if (a.classList.contains('nq-nav-card')) return 'case_project_nav';
    return 'other';
  }

  document.addEventListener('click', function (e) {
    try {
      var a = e.target && e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href') || '';

      if (/^mailto:/i.test(href)) {
        window.pfTrack('contact_click', { contact_type: 'email' });
        return;
      }
      if (/linkedin\.com/i.test(a.hostname || '')) {
        window.pfTrack('contact_click', { contact_type: 'linkedin' });
        return;
      }

      var file = (a.pathname || '').split('/').pop();
      var caseName = CASES[file];
      if (!caseName || a.origin !== window.location.origin) return;
      if (a.pathname === window.location.pathname) return;   /* in-page anchors */
      window.pfTrack('case_open', { case_name: caseName });
      window.pfTrack('project_cta_click', {
        project_name: caseName,
        cta_location: ctaLocation(a)
      });
    } catch (err) {}
  }, true);

  /* ---------- consent banner ---------- */
  var banner = null;
  var returnFocus = null;

  /* on withdrawal, drop the GA cookies already set (_ga, _ga_<id>) */
  function clearGaCookies() {
    try {
      var host = window.location.hostname;
      var domains = ['', host, '.' + host.split('.').slice(-2).join('.')];
      document.cookie.split(';').forEach(function (c) {
        var name = c.split('=')[0].trim();
        if (!/^_ga(_|$)/.test(name)) return;
        domains.forEach(function (d) {
          document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
        });
      });
    } catch (e) {}
  }

  function choose(value) {
    var prev = consent;
    consent = value;
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    if (value !== prev) {
      try { window.gtag('consent', 'update', { analytics_storage: value }); } catch (e) {}
      if (value === 'denied' && prev === 'granted') clearGaCookies();
    }
    close();
  }

  function build() {
    banner = document.createElement('section');
    banner.className = 'pf-consent';
    banner.hidden = true;
    banner.setAttribute('aria-label', 'Analytics preferences');
    banner.innerHTML =
      '<div class="pf-consent-head">' +
        '<span class="pf-consent-dot" aria-hidden="true"></span>' +
        '<span class="pf-consent-title">ANALYTICS</span>' +
      '</div>' +
      '<p class="pf-consent-text">I use Google Analytics to understand how the portfolio is used and improve it. You can accept tracking or continue without analytics.</p>' +
      '<div class="pf-consent-actions">' +
        '<button type="button" class="pf-consent-btn" data-pf-consent="granted">ACCEPT</button>' +
        '<button type="button" class="pf-consent-btn" data-pf-consent="denied">CONTINUE WITHOUT</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-pf-consent]');
      if (b) choose(b.getAttribute('data-pf-consent'));
    });
    /* Esc only closes a reopened panel — a first-time choice is still owed */
    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && consent) { e.stopPropagation(); close(); }
    });
    document.body.appendChild(banner);
  }

  function open(fromControl) {
    if (!banner) build();
    banner.hidden = false;
    if (fromControl) {
      returnFocus = document.activeElement;
      var first = banner.querySelector('.pf-consent-btn');
      if (first) first.focus();
    }
  }

  function close() {
    if (!banner) return;
    var hadFocus = banner.contains(document.activeElement);
    banner.hidden = true;
    if (hadFocus && returnFocus && document.contains(returnFocus)) returnFocus.focus();
    returnFocus = null;
  }

  window.pfConsent = {
    get: function () { return consent; },
    open: function () { open(true); }
  };

  function boot() {
    try { if (!consent) open(false); } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
