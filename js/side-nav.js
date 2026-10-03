/* ============================================================
   GLOBAL SIDE NAVIGATION — shared, framework-free.

   One component, three page configs:

   • HOMEPAGE      reads window.PF_SIDENAV_ITEMS (set inline in
                   index.html) and builds its own fixed left rail
                   shown on wide (>= 1640px, zoom-adjusted) screens.
   • CASE STUDIES  read the existing <aside class="cs-rail"> links
                   (single source of truth — destinations are never
                   duplicated); the in-grid rail itself is left to
                   css/case.css on large screens.

   Below that threshold the component adds a slim left-edge trigger
   + an overlay drawer (translateX, never pushes content). The state
   is driven by <html data-pf-snav="rail|drawer">, set from
   window.innerWidth / --pf-scale so turning the content scale up
   collapses the rail too.
   Active-section tracking, smooth scroll (native hashes, same as
   the case rail), ESC / outside-click / select to close, focus
   trap, and it plugs into the existing EN/IT dictionary because
   the labels are plain translatable text (no data-i18n-skip).
   ============================================================ */

(function () {
  'use strict';

  var SVG_RIGHT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg>';
  var SVG_LEFT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L5 8l5 5"/></svg>';

  function el(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }

  function init() {
    var railEl = document.querySelector('.cs-rail');   // case-study pages only
    var isHome = !railEl;
    var items = [];

    if (Array.isArray(window.PF_SIDENAV_ITEMS)) {
      items = window.PF_SIDENAV_ITEMS.map(function (it) {
        return {
          label: String(it.label || '').trim(),
          href: it.disabled ? null : (it.target || null),
          disabled: !!it.disabled,
          back: false
        };
      });
    } else if (railEl) {
      railEl.querySelectorAll('a').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        items.push({
          label: a.textContent.replace(/\s+/g, ' ').trim(),
          href: href || null,
          disabled: false,
          back: /cs-rail-back/.test(a.className)
        });
      });
    }

    items = items.filter(function (it) { return it.label; });
    if (!items.length) return;

    /* ---------- keep the topbar height in a CSS var ---------- */
    var topbar = document.querySelector('.cs-topbar');
    function syncTopbar() {
      if (!topbar) return;
      var h = Math.round(topbar.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--pf-topbar-h', h + 'px');
    }
    syncTopbar();

    /* ---------- build DOM ---------- */
    var trigger = el('button', 'pf-snav-trigger');
    trigger.type = 'button';
    trigger.innerHTML = SVG_RIGHT;
    trigger.setAttribute('aria-label', 'Open section navigation');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'pf-snav-drawer');

    var backdrop = el('div', 'pf-snav-backdrop');

    var drawer = el('nav', 'pf-snav-drawer');
    drawer.id = 'pf-snav-drawer';
    drawer.setAttribute('aria-label', 'Section navigation');

    var closeBtn = el('button', 'pf-snav-close');
    closeBtn.type = 'button';
    closeBtn.innerHTML = SVG_LEFT;
    closeBtn.setAttribute('aria-label', 'Close section navigation');
    drawer.appendChild(closeBtn);

    var rail = null;
    if (isHome) {
      rail = el('aside', 'pf-snav-rail');
      rail.setAttribute('aria-label', 'Section navigation');
    }

    var sections = [];   // { id, el, nodes:[] }

    function entry(it, cls) {
      var node;
      if (it.disabled || !it.href) {
        node = el('span', cls + (it.disabled ? ' is-disabled' : ''));
        if (it.disabled) node.setAttribute('aria-disabled', 'true');
      } else {
        node = el('a', cls + (it.back ? ' pf-snav-back' : ''));
        node.setAttribute('href', it.href);
      }
      /* label kept in its own span so the i18n engine translates the
         plain string (and the SOON chip separately) rather than the
         combined innerHTML */
      var label = el('span', 'pf-snav-label');
      label.textContent = it.label;
      node.appendChild(label);
      if (it.disabled) {
        var soon = el('span', 'pf-snav-soon');
        soon.textContent = 'SOON';
        node.appendChild(soon);
      }
      return node;
    }

    items.forEach(function (it) {
      var dNode = entry(it, 'pf-snav-item');
      drawer.appendChild(dNode);

      var rNode = null;
      if (rail) {
        rNode = entry(it, 'pf-snav-rail-link');
        rail.appendChild(rNode);
      }

      if (it.href && it.href.charAt(0) === '#') {
        var sec = document.getElementById(it.href.slice(1));
        if (sec) {
          var rec = { id: it.href.slice(1), el: sec, nodes: rNode ? [dNode, rNode] : [dNode] };
          sections.push(rec);
        }
      }
    });

    document.body.appendChild(trigger);
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
    if (rail) document.body.appendChild(rail);

    setInert(drawer, true);

    /* ---------- rail vs drawer, zoom-aware ---------- */
    var root = document.documentElement;
    var THRESHOLD = 1640;
    var isRail = false;

    function railMode() {
      var scale = parseFloat(getComputedStyle(root).getPropertyValue('--pf-scale')) || 1;
      return (window.innerWidth / (scale > 0 ? scale : 1)) >= THRESHOLD;
    }
    function syncState() {
      isRail = railMode();
      root.setAttribute('data-pf-snav', isRail ? 'rail' : 'drawer');
      if (isRail) closeDrawer(false);
      syncTopbar();
    }

    /* ---------- open / close ---------- */
    var HOVER_CLOSE_DELAY = 320;   /* ms — intentional pause before a hover-open drawer closes */
    var canHover = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    var open = false;
    var lastFocus = null;
    var openedByHover = false;
    var hoverSuppressed = false;   /* an explicit close blocks re-open-on-hover until the pointer leaves */
    var closeTimer = null;

    function stopCloseTimer() { if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; } }

    function setInert(node, on) {
      if ('inert' in node) node.inert = on;
      node.setAttribute('aria-hidden', String(on));
    }

    function closeDrawer(restoreFocus, suppressHover) {
      stopCloseTimer();
      if (!open) return;
      open = false;
      openedByHover = false;
      if (suppressHover) hoverSuppressed = true;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      trigger.classList.remove('is-hot');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = SVG_RIGHT;
      trigger.setAttribute('aria-label', 'Open section navigation');
      setInert(drawer, true);
      document.removeEventListener('keydown', onKey, true);
      if (restoreFocus) {
        var back = (lastFocus && lastFocus !== document.body && document.contains(lastFocus)) ? lastFocus : trigger;
        if (back && back.focus) back.focus();
      }
    }

    function openDrawer(viaHover) {
      stopCloseTimer();
      if (open || isRail) return;
      open = true;
      openedByHover = !!viaHover;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.innerHTML = SVG_LEFT;
      trigger.setAttribute('aria-label', 'Close section navigation');
      setInert(drawer, false);
      /* hover-open must not steal focus or scroll — only an explicit
         (click / keyboard) open moves focus into the drawer */
      if (!viaHover) {
        lastFocus = document.activeElement;
        (drawer.querySelector('a[href], button') || closeBtn).focus();
      }
      document.addEventListener('keydown', onKey, true);
    }

    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); closeDrawer(true, true); }
      else if (e.key === 'Tab' && open) {
        var f = drawer.querySelectorAll('a[href], button:not([disabled])');
        if (!f.length || !drawer.contains(document.activeElement)) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    trigger.addEventListener('click', function () { open ? closeDrawer(true, true) : openDrawer(); });
    closeBtn.addEventListener('click', function () { closeDrawer(true, true); });
    backdrop.addEventListener('click', function () { closeDrawer(true, true); });
    drawer.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (a) closeDrawer(false, true);   // let the native hash navigation take focus
    });

    /* ---------- auto-open / auto-close on hover (pointer devices only) ---------- */
    if (canHover) {
      var EDGE_X = 52;    /* comfortable invisible interaction zone, wider than the ~30px handle */
      var PAD_Y = 26;     /* extra reach above/below the visible trigger */
      var inRegion = false;

      function hitZone(x, y) {
        if (x <= EDGE_X) {
          var t = trigger.getBoundingClientRect();
          if (y >= t.top - PAD_Y && y <= t.bottom + PAD_Y) return true;
        }
        if (open) {
          var d = drawer.getBoundingClientRect();
          if (x >= d.left && x <= d.right && y >= d.top && y <= d.bottom) return true;
        }
        return false;
      }

      function scheduleClose() {
        stopCloseTimer();
        closeTimer = setTimeout(function () {
          closeTimer = null;
          if (open && openedByHover && !drawer.contains(document.activeElement)) closeDrawer(false, false);
        }, HOVER_CLOSE_DELAY);
      }

      document.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch' || isRail) {
          if (inRegion) { inRegion = false; trigger.classList.remove('is-hot'); }
          return;
        }
        var now = hitZone(e.clientX, e.clientY);
        if (now) {
          stopCloseTimer();
          if (!inRegion) {
            inRegion = true;
            trigger.classList.add('is-hot');
            if (!open && !hoverSuppressed) openDrawer(true);
          }
        } else if (inRegion) {
          inRegion = false;
          hoverSuppressed = false;
          trigger.classList.remove('is-hot');
          if (open && openedByHover) scheduleClose();
        }
      }, { passive: true });
    }

    /* ---------- active-section tracking ---------- */
    if (sections.length) {
      var current = null;
      function applyActive(id) {
        if (id === current) return;
        current = id;
        sections.forEach(function (s) {
          var on = s.id === id;
          s.nodes.forEach(function (n) {
            n.classList.toggle('active', on);
            if (n.tagName === 'A') n.setAttribute('aria-current', on ? 'true' : 'false');
          });
        });
      }
      applyActive(sections[0].id);

      if ('IntersectionObserver' in window) {
        var visible = {};
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) visible[en.target.id] = 1;
            else delete visible[en.target.id];
          });
          for (var i = 0; i < sections.length; i++) {
            if (visible[sections[i].id]) { applyActive(sections[i].id); return; }
          }
        }, { rootMargin: '-30% 0px -62% 0px', threshold: 0 });
        sections.forEach(function (s) { io.observe(s.el); });
      }
    }

    /* ---------- responsive housekeeping ---------- */
    syncState();

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(syncState, 120);
    }, { passive: true });

    /* the utility bar writes --pf-scale onto <html> inline style —
       recompute the rail/drawer state whenever the content scale changes */
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(syncState).observe(root, { attributes: true, attributeFilter: ['style'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
