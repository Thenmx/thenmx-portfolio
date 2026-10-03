/* ============================================================
   RENDERERS — one function per screen type.
   Each receives (data, stage, T, project) where T is the
   engine's managed (pausable) setTimeout and project is the
   active project config.
   Screens split in two families:
   - RESULT screens  → shown while resting on a timeline dot
   - RUNNING screens → shown only during transitions (engines)
   To replace a visual later, only edit the matching function
   or the SVG constants below.
   ============================================================ */

/* ---------- PROPERTY PHOTOS ---------- */

const IMG_ENHANCED = 'assets/enhanced.jpg'; // IMAGE A — bright, AI-enhanced
const IMG_ORIGINAL = 'assets/original.jpg'; // IMAGE B — dark, noisy source

/* ---------- SVG ART ---------- */

/* Blueprint / wireframe house (enhancer RUNNING state) */
const SVG_HOUSE_WIREFRAME = `
<svg viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg" fill="none"
     stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
  <g opacity="0.9">
    <!-- ground -->
    <line class="draw" x1="20" y1="240" x2="400" y2="240"/>
    <!-- lower volume -->
    <rect class="draw" x="70" y="150" width="200" height="90" rx="2"/>
    <!-- upper volume (cantilevered) -->
    <rect class="draw" x="110" y="80" width="220" height="70" rx="2"/>
    <!-- roof overhang -->
    <line class="draw" x1="100" y1="80" x2="340" y2="80"/>
    <!-- support column -->
    <line class="draw" x1="318" y1="150" x2="318" y2="240"/>
    <!-- windows upper -->
    <rect class="draw" x="128" y="96" width="58" height="38" rx="1"/>
    <rect class="draw" x="200" y="96" width="50" height="38" rx="1"/>
    <rect class="draw" x="264" y="96" width="42" height="38" rx="1"/>
    <!-- windows / door lower -->
    <rect class="draw" x="90" y="170" width="52" height="48" rx="1"/>
    <rect class="draw" x="156" y="170" width="52" height="48" rx="1"/>
    <rect class="draw" x="228" y="178" width="26" height="62" rx="1"/>
    <!-- window mullions -->
    <line class="draw" x1="157" y1="96" x2="157" y2="134" opacity="0.5"/>
    <line class="draw" x1="116" y1="194" x2="142" y2="194" opacity="0.5"/>
    <line class="draw" x1="182" y1="194" x2="208" y2="194" opacity="0.5"/>
    <!-- tree -->
    <circle class="draw" cx="368" cy="200" r="24"/>
    <line class="draw" x1="368" y1="224" x2="368" y2="240"/>
    <!-- dimension marks (blueprint feel) -->
    <line class="draw" x1="70" y1="256" x2="270" y2="256" opacity="0.35"/>
    <line class="draw" x1="70" y1="252" x2="70" y2="260" opacity="0.35"/>
    <line class="draw" x1="270" y1="252" x2="270" y2="260" opacity="0.35"/>
    <line class="draw" x1="52" y1="150" x2="52" y2="240" opacity="0.35"/>
    <line class="draw" x1="48" y1="150" x2="56" y2="150" opacity="0.35"/>
    <line class="draw" x1="48" y1="240" x2="56" y2="240" opacity="0.35"/>
  </g>
</svg>`;

/* Enhanced dusk render of the same house (result states) */
const SVG_HOUSE_ENHANCED = `
<svg viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0c1729"/>
      <stop offset="0.65" stop-color="#14263f"/>
      <stop offset="1" stop-color="#1b3350"/>
    </linearGradient>
    <linearGradient id="win" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd9a0"/>
      <stop offset="1" stop-color="#ff9d3c"/>
    </linearGradient>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#232f42"/>
      <stop offset="1" stop-color="#161f2e"/>
    </linearGradient>
    <filter id="winGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="420" height="280" fill="url(#sky)"/>
  <!-- stars -->
  <g fill="#cfe4ff" opacity="0.6">
    <circle cx="48" cy="34" r="1"/><circle cx="120" cy="22" r="0.8"/>
    <circle cx="210" cy="40" r="1"/><circle cx="300" cy="26" r="0.8"/>
    <circle cx="370" cy="48" r="1"/><circle cx="260" cy="14" r="0.7"/>
  </g>
  <!-- ground -->
  <rect x="0" y="238" width="420" height="42" fill="#0d1420"/>

  <!-- house volumes -->
  <rect x="70" y="150" width="200" height="90" fill="url(#wall)" stroke="#3a4d68" stroke-width="1"/>
  <rect x="110" y="80" width="220" height="70" fill="#1d2839" stroke="#3a4d68" stroke-width="1"/>
  <rect x="100" y="76" width="240" height="6" rx="2" fill="#2b3a52"/>
  <rect x="316" y="150" width="5" height="90" fill="#1a2333"/>

  <!-- warm windows -->
  <g filter="url(#winGlow)">
    <rect x="128" y="96" width="58" height="38" rx="1" fill="url(#win)"/>
    <rect x="200" y="96" width="50" height="38" rx="1" fill="url(#win)" opacity="0.92"/>
    <rect x="264" y="96" width="42" height="38" rx="1" fill="url(#win)" opacity="0.85"/>
    <rect x="90" y="170" width="52" height="48" rx="1" fill="url(#win)" opacity="0.9"/>
    <rect x="156" y="170" width="52" height="48" rx="1" fill="url(#win)" opacity="0.95"/>
  </g>
  <!-- mullions -->
  <g stroke="#0d1420" stroke-width="2">
    <line x1="157" y1="96" x2="157" y2="134"/>
    <line x1="116" y1="170" x2="116" y2="218"/>
    <line x1="182" y1="170" x2="182" y2="218"/>
  </g>
  <!-- door -->
  <rect x="228" y="178" width="26" height="62" rx="1" fill="#11192a" stroke="#3a4d68" stroke-width="1"/>
  <circle cx="248" cy="210" r="1.6" fill="#ffcf8a"/>

  <!-- cyan rim light -->
  <line x1="70" y1="150" x2="70" y2="240" stroke="#38bdf8" stroke-width="1.2" opacity="0.5"/>
  <line x1="110" y1="80" x2="110" y2="150" stroke="#38bdf8" stroke-width="1.2" opacity="0.45"/>
  <line x1="100" y1="76" x2="340" y2="76" stroke="#38bdf8" stroke-width="1" opacity="0.35"/>

  <!-- trees -->
  <g fill="#101c22">
    <path d="M368 240 l-20 0 20 -52 20 52z"/>
    <rect x="365" y="228" width="6" height="12"/>
    <path d="M34 240 l-16 0 16 -40 16 40z"/>
  </g>
  <!-- warm light pool on ground -->
  <ellipse cx="170" cy="241" rx="110" ry="5" fill="#ff9d3c" opacity="0.12"/>
</svg>`;

/* ---------- SPAIN ROUTE MAP (travel engine) ----------
   Faithful silhouette (mainland + Balearics) traced from the
   supplied Spain reference outline + the 7-stop tour route.
   One geometry, reused by the SVG-build transition, the SVG
   Map result, the AI-generation transition and any thumbnail —
   so every stage visibly shares the same structural source.
   Stops are projected from their real coordinates with the
   reference's own calibration (fitted on capes + islands):
   x = 339.7 + 31.9·lon   y = 140 + 47.4·(42.32 − lat)       */

const TA_VIEWBOX = '31 50 461 401';
const TA_OUTLINE =
  'M76,62 L103,64 L108,67 L110,73 L121,74 L145,73 L155,68 L160,74 L179,75 L197,82 L215,81 L225,78 L226,76 L229,76 L230,78 L242,84 L250,81 L258,81 L268,87 L278,86 L282,82 L286,82 L299,89 L297,99 L311,104 L318,103 L319,107 L322,110 L333,110 L340,116 L361,115 L361,108 L364,108 L366,110 L386,116 L388,129 L402,127 L407,131 L407,133 L414,130 L421,134 L428,134 L429,130 L434,127 L441,127 L447,131 L449,140 L448,142 L443,142 L444,146 L446,147 L445,157 L440,166 L431,175 L426,178 L416,180 L413,185 L402,192 L379,199 L378,201 L370,205 L370,207 L366,210 L366,212 L372,214 L372,217 L360,223 L351,239 L349,240 L347,246 L345,247 L334,273 L334,285 L336,287 L337,296 L343,304 L351,307 L351,309 L343,319 L330,326 L316,356 L317,360 L322,361 L322,363 L310,369 L298,368 L285,391 L273,407 L271,407 L271,404 L268,401 L260,401 L257,405 L257,409 L248,408 L246,405 L201,405 L191,417 L183,416 L177,419 L176,422 L172,425 L168,436 L161,439 L152,431 L146,430 L138,414 L140,413 L140,411 L135,409 L134,403 L136,401 L127,390 L118,385 L103,385 L101,374 L102,357 L106,348 L116,341 L116,338 L112,338 L112,335 L106,325 L106,314 L110,307 L117,301 L118,296 L116,294 L112,294 L104,275 L97,266 L116,266 L117,264 L119,257 L119,246 L116,246 L115,239 L122,235 L122,210 L120,204 L114,199 L122,199 L126,194 L127,189 L130,189 L138,181 L141,174 L138,170 L134,170 L133,172 L131,171 L129,156 L112,156 L111,160 L107,162 L102,162 L100,160 L88,160 L85,161 L80,167 L77,155 L79,154 L81,148 L71,152 L70,154 L55,162 L55,147 L61,144 L60,142 L57,145 L57,135 L61,131 L57,133 L58,124 L56,124 L55,129 L48,128 L49,120 L52,115 L47,115 L47,108 L43,108 L43,100 L47,93 L52,89 L61,85 L76,83 Z ' +
  'M440,250 L446,252 L444,256 L444,261 L447,262 L447,260 L449,259 L455,266 L453,267 L449,278 L441,287 L439,287 L436,282 L432,282 L429,280 L427,273 L423,275 L423,280 L422,280 L414,271 L428,256 Z ' +
  'M463,247 L476,247 L477,249 L480,249 L480,261 L477,261 L471,255 L468,255 L468,257 L463,257 L462,256 L462,248 Z ' +
  'M390,292 L393,292 L393,294 L394,294 L393,299 L386,307 L384,307 L384,306 L382,306 L379,303 L379,301 L386,294 L388,294 Z';
/* label sits above the node unless `label: 'left'` (Toledo sits
   just below Madrid, so its label goes to the side) */
const TA_STOPS = [
  { name: 'Madrid',    x: 221.5, y: 230.2 },
  { name: 'Toledo',    x: 211.2, y: 256.5, label: 'left' },
  { name: 'Córdoba',   x: 187.2, y: 350.1 },
  { name: 'Seville',   x: 148.8, y: 373.7 },
  { name: 'Granada',   x: 224.9, y: 383.8 },
  { name: 'Valencia',  x: 327.7, y: 275.1 },
  { name: 'Barcelona', x: 409.0, y: 184.3 }
];
const TA_ROUTE = TA_STOPS.map((s, i) => `${i === 0 ? 'M' : 'L'}${s.x},${s.y}`).join(' ');

function buildSpainMap({ building = false, showLabels = true } = {}) {
  const nodes = TA_STOPS.map((s, i) => `
    <g class="tm-node" style="animation-delay:${building ? 1.7 + i * 0.2 : i * 0.07}s">
      <circle class="tm-node-ring" cx="${s.x}" cy="${s.y}" r="11" />
      <circle class="tm-node-dot" cx="${s.x}" cy="${s.y}" r="3.4" />
      <text class="tm-node-num" x="${s.x}" y="${s.y + 3.5}">${i + 1}</text>
      ${!showLabels ? '' : s.label === 'left'
        ? `<text class="tm-node-label" x="${s.x - 16}" y="${s.y + 3.5}" style="text-anchor:end">${s.name}</text>`
        : `<text class="tm-node-label" x="${s.x}" y="${s.y - 16}">${s.name}</text>`}
    </g>`).join('');

  /* pathLength = the previous geometry's real lengths, so the CSS
     draw-in dashes (1700 / 900) progress exactly as before */
  return `
    <svg class="tm-svg${building ? ' tm-building' : ''}" viewBox="${TA_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path class="tm-outline" d="${TA_OUTLINE}" pathLength="1125" />
      <path class="tm-route" d="${TA_ROUTE}" pathLength="473" />
      ${nodes}
    </svg>`;
}

/* ---------- icons ---------- */

const ICONS = {
  upload: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 16V4m0 0l-4.5 4.5M12 4l4.5 4.5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 21h8m-4-4v4m-5-17h10v6a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a1 1 0 0 0-1 1c0 2.5 2 4 4 4M17 6h3a1 1 0 0 1 1 1c0 2.5-2 4-4 4"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3l2.7 5.6 6.3.9-4.5 4.3 1 6.2-5.5-3-5.5 3 1-6.2L3 9.5l6.3-.9L12 3z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  coin: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M15 9a3.5 3.5 0 0 0-6 2.5A3.5 3.5 0 0 0 15 15M7.5 12h5"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12.5l5 5L20 6.5"/></svg>`
};

/* ---------- helpers ---------- */

function countUp(el, to, decimals, dur, unit, T) {
  const steps = 36;
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  for (let s = 1; s <= steps; s++) {
    T(() => {
      const v = (to * ease(s / steps)).toFixed(decimals);
      el.innerHTML = v + (unit ? `<span class="unit">${unit}</span>` : '');
    }, (dur * s) / steps);
  }
}

function paramBars(params, delayBase) {
  return params
    .map((p, i) => `
      <div class="param-row">
        <div class="param-head"><span>${p.name}</span><span class="pv">${p.value}%</span></div>
        <div class="param-track">
          <div class="param-fill" style="--w:${p.value}%; animation-delay:${delayBase + i * 0.22}s"></div>
        </div>
      </div>`)
    .join('');
}

/* ---------- screen registry ---------- */

const Screens = {

  /* RESULT · dot 01 — futuristic input slot */
  upload(data, stage) {
    stage.innerHTML = `
      <div class="screen s-upload">
        <div class="up-slot">
          <span class="corner c1"></span><span class="corner c2"></span>
          <span class="corner c3"></span><span class="corner c4"></span>
          <div class="up-icon">${ICONS.upload}</div>
          <div class="up-title">INSERT PHOTO</div>
          <div class="up-wait"><span class="live-dot"></span>Waiting for property photo...</div>
        </div>
      </div>`;
  },

  /* IDLE · before the first run — source photo + start CTA.
     hero.js binds the CTA to its single start function. */
  idle(data, stage) {
    stage.innerHTML = `
      <div class="screen s-idle">
        <div class="enh-left enh-img idle-img">
          <img src="${data.image}" alt="Original property photo" />
          <div class="img-tag">${data.tag}</div>
        </div>
        <button type="button" class="tour-cta tour-cta-start idle-cta js-idle-start">${data.cta}</button>
      </div>`;
  },

  /* generic between-step construction screen (available for future projects) */
  transition(data, stage) {
    const subs = (data.subs || [])
      .map((s, i) => `<div class="tr-sub" style="animation-delay:${0.35 + i * 0.45}s">${s}</div>`)
      .join('');
    stage.innerHTML = `
      <div class="screen s-trans">
        <div class="scanline"></div>
        <div class="loader-ring"></div>
        <div class="tr-title">${data.title}</div>
        <div class="tr-subs">${subs}</div>
      </div>`;
  },

  /* RUNNING · transition 1→2 — blueprint being enhanced */
  enhancerRunning(data, stage, T, project) {
    const params = data.params || project.enhancerParams || [];
    stage.innerHTML = `
      <div class="screen s-enh">
        <div class="enh-left">
          <div class="enh-badge"><span class="spinner"></span>ENHANCING…</div>
          ${SVG_HOUSE_WIREFRAME}
          <div class="scanbar"></div>
        </div>
        <div class="enh-right">
          <div class="mini-label">ENHANCEMENT PARAMETERS</div>
          ${paramBars(params, 0.3)}
        </div>
      </div>`;
  },

  /* RESULT · dot 02 — before / after comparison, no metrics.
     Enhanced photo underneath, original on top clipped at --pos.
     The reveal is a CSS keyframe on --pos (so the header Pause
     freezes it); once it ends the divider becomes draggable. */
  enhancerResult(data, stage) {
    stage.innerHTML = `
      <div class="screen s-cmp">
        <div class="cmp-frame">
          <img class="cmp-img" src="${IMG_ENHANCED}" alt="AI-enhanced property photo" draggable="false" />
          <span class="cmp-tag cmp-tag-r">ENHANCED IMAGE</span>
          <div class="cmp-top">
            <img class="cmp-img" src="${IMG_ORIGINAL}" alt="Original property photo" draggable="false" />
            <span class="cmp-tag cmp-tag-l">ORIGINAL PHOTO</span>
          </div>
          <div class="cmp-divider">
            <span class="cmp-handle">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5"/></svg>
            </span>
          </div>
        </div>
      </div>`;

    const frame = stage.querySelector('.cmp-frame');

    const enableDrag = () => {
      if (frame.classList.contains('is-live')) return;
      frame.style.setProperty('--pos', getComputedStyle(frame).getPropertyValue('--pos').trim() || '50%');
      frame.classList.add('is-live'); // drops the keyframe, --pos is now inline
      let dragging = false;
      const setFromX = (x) => {
        const r = frame.getBoundingClientRect();
        const pct = Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100));
        frame.style.setProperty('--pos', pct.toFixed(2) + '%');
      };
      frame.addEventListener('pointerdown', (e) => {
        dragging = true;
        frame.setPointerCapture(e.pointerId);
        setFromX(e.clientX);
      });
      frame.addEventListener('pointermove', (e) => { if (dragging) setFromX(e.clientX); });
      const stop = () => { dragging = false; };
      frame.addEventListener('pointerup', stop);
      frame.addEventListener('pointercancel', stop);
    };

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) enableDrag();
    else frame.addEventListener('animationend', (e) => { if (e.animationName === 'cmpReveal') enableDrag(); });
  },

  /* RUNNING · engine transitions — rotating AI core */
  engineCore(data, stage) {
    stage.innerHTML = `
      <div class="screen s-core">
        <div class="core">
          <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
          <div class="core-center"></div>
        </div>
        <div class="core-title">${data.title}</div>
        <div class="core-sub">${data.sub || ''}</div>
      </div>`;
  },

  /* RESULT · dots 03 & 04 — image + one score + one bar (+ mini rows) */
  scoreResult(data, stage, T) {
    const mini = data.mini
      ? `<div class="quality-mini">${data.mini
          .map((m) => `<span>${m.k} <b class="${m.cls || ''}">${m.v}</b></span>`)
          .join('')}</div>`
      : '';
    stage.innerHTML = `
      <div class="screen s-result">
        <div class="result-img">
          <img src="${IMG_ENHANCED}" alt="AI-enhanced property photo" />
          <div class="img-tag">ENHANCED IMAGE</div>
        </div>
        <div class="result-score">
          <div class="score-block">
            <div class="mini-label">${data.label}</div>
            <div class="big-num js-num">0${data.decimals ? '.' + '0'.repeat(data.decimals) : ''}</div>
          </div>
          <div class="score-bar"><div class="score-fill" style="--w:${data.barPct}%"></div></div>
        </div>
        ${mini}
      </div>`;

    countUp(stage.querySelector('.js-num'), data.value, data.decimals, 1500, data.unit, T);
  },

  /* RESULT · dot 04 (QUALITY SCORE, DESKTOP ONLY) — original vs
     enhanced comparison. On mobile it falls back to the untouched
     scoreResult screen so the mobile experience stays identical. */
  qualityCompare(data, stage, T, project) {
    if (window.matchMedia('(max-width: 1080px)').matches) {
      return Screens.scoreResult(data, stage, T, project);
    }

    const col = (side, img, alt, extraCls) => `
      <div class="q-col ${extraCls}">
        <div class="q-tag">${side.tag}</div>
        <div class="q-img"><img src="${img}" alt="${alt}" /></div>
        <div class="q-score">QUALITY SCORE <b>${side.score}</b></div>
        <div class="q-metrics">
          ${side.metrics
            .map(
              ([name, val], i) => `
            <div class="q-metric">
              <div class="q-metric-head"><span>${name}</span><span class="qv">${val.toFixed(1)}</span></div>
              <div class="q-track"><div class="q-fill" style="--w:${val * 10}%; animation-delay:${0.25 + i * 0.12}s"></div></div>
            </div>`
            )
            .join('')}
        </div>
      </div>`;

    stage.innerHTML = `
      <div class="screen s-qcompare">
        ${col(data.compare.original, IMG_ORIGINAL, 'Original property photo', '')}
        <div class="q-vs">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 6l6 6-6 6M13 6l6 6-6 6"/>
          </svg>
        </div>
        ${col(data.compare.enhanced, IMG_ENHANCED, 'AI-enhanced property photo', 'q-col-enhanced')}
      </div>`;
  },

  /* RESULT · dot 05 — final recommendation card */
  recommendation(data, stage) {
    const rows = data.metrics
      .map((m, i) => `
        <div class="rec-metric" style="animation-delay:${0.5 + i * 0.28}s">
          <span class="mk">${ICONS[m.icon] || ''}${m.k}</span>
          <span class="mv">${m.v}</span>
        </div>`)
      .join('');
    stage.innerHTML = `
      <div class="screen s-rec">
        <div class="rec-card">
          <div class="rec-chip">${ICONS.check}RECOMMENDATION</div>
          <div class="rec-trophy">${ICONS.trophy}</div>
          <div class="mini-label">BEST WORKFLOW</div>
          <div class="rec-name">${data.workflow}</div>
          <div class="rec-metrics">${rows}</div>
          <p class="rec-text">${data.text}</p>
        </div>
      </div>`;
  },

  /* ══════════ AI TRAVEL ENGINE (project 2) ══════════ */

  /* RESULT · dot 01 — populated tour-builder interface */
  tourInput(data, stage, T, project) {
    const stops = project.stops || [];
    const rows = stops
      .map((name, i) => `
        <div class="tour-stop" style="animation-delay:${0.25 + i * 0.09}s">
          <span class="ts-num">${i + 1}</span>
          <span class="ts-name">${name}</span>
          <span class="ts-remove" aria-hidden="true">&times;</span>
        </div>`)
      .join('');

    stage.innerHTML = `
      <div class="screen s-tour">
        <div class="tour-card">
          <div class="tour-field">
            <span class="mini-label">TOUR NAME</span>
            <div class="tour-name">${project.tourName}</div>
          </div>
          <div class="tour-stops">
            <span class="mini-label">STOPS</span>
            <div class="tour-stop-list">
              ${rows}
              <div class="tour-add">+ Add stop</div>
            </div>
          </div>
          <button class="tour-cta tour-cta-start js-idle-start" type="button">
            CONFIRM TOUR
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5L10.5 8L6 12.5"/></svg>
          </button>
          <div class="tour-status"><span class="live-dot"></span>${data.status}</div>
        </div>
      </div>`;
  },

  /* RUNNING · transition 1→2 — Travel Brain coordinate lookup */
  brainSearch(data, stage) {
    const sats = TA_STOPS.map((s, i) => {
      const angle = (i / TA_STOPS.length) * Math.PI * 2 - Math.PI / 2;
      const r = 62;
      return { x: (90 + Math.cos(angle) * r).toFixed(1), y: (90 + Math.sin(angle) * r).toFixed(1), i };
    });
    const links = sats.map((s) => `<line class="brain-link" x1="90" y1="90" x2="${s.x}" y2="${s.y}" style="animation-delay:${s.i * 0.16}s" />`).join('');
    const nodes = sats.map((s) => `<circle class="brain-node" cx="${s.x}" cy="${s.y}" r="5" style="animation-delay:${0.3 + s.i * 0.16}s" />`).join('');

    stage.innerHTML = `
      <div class="screen s-brainsearch">
        <svg class="brain-net" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          ${links}
          <circle class="brain-hub-ring" cx="90" cy="90" r="28" />
          <circle class="brain-hub" cx="90" cy="90" r="15" />
          ${nodes}
        </svg>
        <div class="core-title">${data.title}</div>
        <div class="core-sub">${data.sub || ''}</div>
      </div>`;
  },

  /* RESULT · dot 02 — resolved destination coordinates */
  coordinatesList(data, stage, T, project) {
    const rows = (project.coordinates || [])
      .map((c, i) => `
        <div class="coord-row" style="animation-delay:${0.2 + i * 0.09}s">
          <span class="coord-name">${c.name}</span>
          <span class="coord-val">${c.coord}</span>
          <span class="coord-check">${ICONS.check}</span>
        </div>`)
      .join('');

    stage.innerHTML = `
      <div class="screen s-coords">
        <div class="coord-card">
          <div class="coord-list">${rows}</div>
          <div class="coord-footer"><span class="live-dot"></span>${data.footer}</div>
        </div>
      </div>`;
  },

  /* RUNNING · transition 2→3 — SVG geometry under construction */
  svgBuild(data, stage) {
    stage.innerHTML = `
      <div class="screen s-svgbuild">
        <div class="svgbuild-frame">
          <div class="scanline"></div>
          ${buildSpainMap({ building: true, showLabels: true })}
        </div>
        <div class="core-title">${data.title}</div>
        <div class="core-sub">${data.sub || ''}</div>
      </div>`;
  },

  /* RESULT · dot 03 — validated SVG route map */
  svgMap(data, stage) {
    const meta = (data.meta || [])
      .map((m) => `<div class="tm-meta-row"><span class="tm-meta-k">${m.k}</span><span class="tm-meta-v">${m.v}</span></div>`)
      .join('');

    stage.innerHTML = `
      <div class="screen s-svgmap">
        <div class="svgmap-frame">${buildSpainMap({ building: false, showLabels: true })}</div>
        <div class="svgmap-meta">
          <div class="tm-meta-grid">${meta}</div>
          <div class="tm-footer"><span class="live-dot"></span>${data.footer}</div>
        </div>
      </div>`;
  },

  /* RUNNING · transition 3→4 — SVG geometry sent to the image model */
  aiGenerate(data, stage) {
    stage.innerHTML = `
      <div class="screen s-aigen">
        <div class="aigen-row">
          <div class="aigen-svg">${buildSpainMap({ building: false, showLabels: false })}</div>
          <div class="aigen-flow">
            <span class="aigen-packet"></span>
            <span class="aigen-packet" style="animation-delay:0.6s"></span>
            <span class="aigen-packet" style="animation-delay:1.2s"></span>
          </div>
          <div class="core">
            <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
            <div class="core-center"></div>
          </div>
        </div>
        <div class="core-title">${data.title}</div>
        <div class="core-sub">${data.sub || ''}</div>
      </div>`;
  },

  /* RESULT · dot 04 — the AI-generated map (visual payoff) */
  aiMap(data, stage) {
    const meta = (data.meta || [])
      .map((m) => `<div class="aimap-meta-row"><span class="aimap-meta-k">${m.k}</span><span class="aimap-meta-v">${m.v}</span></div>`)
      .join('');

    /* map + metadata form ONE output block: .aimap-output sets the
       shared width, so the meta row spans exactly the map's edges */
    stage.innerHTML = `
      <div class="screen s-aimap">
        <div class="aimap-output">
        <div class="aimap-frame">
          <img src="${data.img}" alt="AI-generated illustrated map of the Spain Highlights Tour route"
               onerror="this.closest('.aimap-frame').classList.add('is-placeholder')" />
          <div class="aimap-placeholder">
            ${buildSpainMap({ building: false, showLabels: false })}
            <span class="aimap-placeholder-tag">AI MAP ASSET PENDING</span>
          </div>
          <div class="aimap-status">${ICONS.check}${data.status}</div>
        </div>
        <div class="aimap-meta-grid">${meta}</div>
        </div>
      </div>`;
  },

  /* RUNNING · transition 4→5 — asset linked back to the Travel Brain */
  saveToBrain(data, stage) {
    stage.innerHTML = `
      <div class="screen s-savebrain">
        <div class="savebrain-row">
          <div class="up-icon savebrain-thumb">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M4 16l4-5 3 3 5-7 4 5"/></svg>
          </div>
          <div class="aigen-flow">
            <span class="aigen-packet"></span>
            <span class="aigen-packet" style="animation-delay:0.6s"></span>
          </div>
          <div class="up-icon savebrain-db">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
            </svg>
          </div>
        </div>
        <div class="core-title">${data.title}</div>
        <div class="core-sub">${data.sub || ''}</div>
      </div>`;
  },

  /* RESULT · dot 05 — Travel Brain: the platform view */
  travelBrain(data, stage) {
    /* built + tested output(s) — full-strength rows */
    const working = (data.working || [])
      .map((m, i) => `
        <div class="tb-module tb-module-done" style="animation-delay:${0.4 + i * 0.12}s">
          <span class="tb-module-name">${m.name}</span>
          <span class="tb-module-status">${ICONS.check}<span>${m.status}</span></span>
        </div>`)
      .join('');

    /* future applications of the same knowledge layer — secondary,
       dashed, never shown as available */
    const planned = (data.planned || [])
      .map((name, i) => `
        <div class="tb-module tb-module-planned" style="animation-delay:${0.7 + i * 0.1}s">
          <span class="tb-module-name">${name}</span>
          <span class="tb-module-status">Planned</span>
        </div>`)
      .join('');

    stage.innerHTML = `
      <div class="screen s-brainfinal">
        <div class="tb-left">
          <div class="tb-map-thumb">
            <img src="assets/travel/spain-ai-map.webp" alt="Generated Spain Highlights Tour map"
                 onerror="this.closest('.tb-map-thumb').classList.add('is-placeholder')" />
            <div class="tb-map-placeholder">${buildSpainMap({ building: false, showLabels: false })}</div>
            <span class="tb-map-tag">${ICONS.check} Map Generated</span>
          </div>
          <div class="tb-tour-name">${data.tourName}</div>
          <div class="tb-first">
            <span class="mini-label">${data.firstLabel}</span>
            <p class="tb-first-text">${data.firstText}</p>
          </div>
        </div>
        <div class="tb-right">
          <span class="mini-label">AVAILABLE CONTENT</span>
          <div class="tb-modules">${working}</div>
          <span class="mini-label tb-planned-label">${data.plannedLabel}</span>
          <div class="tb-planned">${planned}</div>
          <button class="tour-cta tb-cta" type="button">${data.cta}</button>
          <div class="tb-concept">${data.concept}</div>
        </div>
      </div>`;
  }
};
