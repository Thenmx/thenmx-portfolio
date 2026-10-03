/* ============================================================
   HERO ENGINE — autoplay timeline, console, playback control.
   Content lives in config.js, visuals in renderers.js.

   Dots are RESULTS, transitions are ENGINES:
   - kind:'step'       → hold a final result on a dot
   - kind:'transition' → engine-running screen while the
                         progress line travels to the next dot
   Every phase owns the console: it is cleared and replaced
   with that phase's `log` lines on each phase change.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- elements ---------- */
  const els = {
    hero: document.getElementById('hero'),
    title: document.getElementById('mainTitle'),
    note: document.getElementById('demoNote'),
    chip: document.getElementById('phaseChip'),
    stage: document.getElementById('stage'),
    fill: document.getElementById('tlFill'),
    dots: document.getElementById('tlDots'),
    transitions: document.getElementById('tlTransitions'),
    consoleLines: document.getElementById('consoleLines'),
    consoleStatus: document.getElementById('consoleStatus'),
    consoleStatusText: document.getElementById('consoleStatusText'),
    playBtn: document.getElementById('playBtn'),
    storyPanel: document.getElementById('storyPanel'),
    projectSwitch: document.getElementById('projectSwitch')
  };

  const ICON_PLAY = `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  const ICON_PAUSE = `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>`;

  let project = PROJECTS[DEFAULT_PROJECT];
  let dotEls = [];
  let paused = false;
  let phaseIndex = 0;
  let phaseEndsAt = 0;      // wall-clock end of the current phase
  let phaseRemaining = 0;   // ms left in the phase while paused
  let autoPauseAtStep = -1; // dot clicked by the user: pause after its result finishes building
  let pendingResume = null; // continuation to run when the user presses Play after an auto-pause
  let running = false;      // a run is in progress (guards against overlapping starts)
  let finished = false;     // run completed: result stays on screen, Play replays

  /* ---------- pausable scheduler ----------
     Everything time-based goes through T(). Pausing freezes all
     pending tasks with their remaining time; resuming reschedules
     them, so the run continues exactly where it stopped.        */
  let tasks = [];

  function T(fn, ms) {
    const task = { fn, remaining: ms, due: Date.now() + ms, id: null };
    if (!paused) task.id = setTimeout(() => fire(task), ms);
    tasks.push(task);
    return task;
  }
  function fire(task) {
    tasks = tasks.filter((t) => t !== task);
    task.fn();
  }
  function clearTimers() {
    tasks.forEach((t) => clearTimeout(t.id));
    tasks = [];
  }

  const stepCount = () => project.steps.length;
  const dotPos = (s) => (s / (stepCount() - 1)) * 100;

  /* ---------- timeline construction ---------- */

  function buildTimeline() {
    els.dots.innerHTML = '';
    els.transitions.innerHTML = '';
    dotEls = [];

    project.steps.forEach((step, i) => {
      const btn = document.createElement('button');
      btn.className = 'tl-dot';
      btn.style.left = dotPos(i) + '%';
      btn.setAttribute('aria-label', `Jump to step ${i + 1}: ${step.label}`);
      btn.innerHTML = `
        <span class="dot"></span>
        <span class="dot-label"><span class="dot-num">0${i + 1}&nbsp;</span><span class="lbl-full">${step.label}</span><span class="lbl-short">${step.short || step.label}</span></span>`;
      btn.addEventListener('click', () => jumpToStep(i));
      els.dots.appendChild(btn);
      dotEls.push(btn);

      if (i < stepCount() - 1) {
        const lbl = document.createElement('span');
        lbl.className = 'tl-transition-label';
        lbl.textContent = 'PROCESS';
        lbl.style.left = ((dotPos(i) + dotPos(i + 1)) / 2) + '%';
        els.transitions.appendChild(lbl);
      }
    });
  }

  /* ---------- progress line ---------- */

  function setFillInstant(pct) {
    els.fill.style.transition = 'none';
    els.fill.style.width = pct + '%';
    void els.fill.offsetWidth; // flush so a later transition animates from here
  }

  function animateFill(pct, dur) {
    els.fill.style.transition = `width ${dur}ms linear`;
    requestAnimationFrame(() => {
      els.fill.style.width = pct + '%';
    });
  }

  function freezeFill() {
    const w = els.fill.getBoundingClientRect().width;
    const trackW = els.fill.parentElement.getBoundingClientRect().width || 1;
    setFillInstant((w / trackW) * 100);
  }

  function updateDots(phase) {
    const reached = phase.kind === 'step' ? phase.step : phase.from;
    dotEls.forEach((d, i) => {
      d.classList.toggle('done', i <= reached);
      d.classList.toggle('current', phase.kind === 'step' && i === phase.step);
      d.classList.toggle('loading', phase.kind === 'transition' && i === phase.to);
    });
  }

  /* ---------- console (each phase replaces the content) ---------- */

  function logLine({ tag, text }) {
    if (!els.consoleLines) return; // execution log removed from the UI
    const line = document.createElement('div');
    line.className = 'cl';
    line.innerHTML = `<span class="ct ct-${tag}">${tag}</span><span>${text}</span>`;
    els.consoleLines.appendChild(line);
    els.consoleLines.scrollTop = els.consoleLines.scrollHeight;
  }

  function clearConsole() {
    if (!els.consoleLines) return;
    els.consoleLines.innerHTML = '';
    els.consoleLines.scrollTop = 0;
  }

  function logSeparator() {
    if (!els.consoleLines) return;
    const line = document.createElement('div');
    line.className = 'cl-sep';
    line.textContent = '────────────────────────';
    els.consoleLines.appendChild(line);
    els.consoleLines.scrollTop = els.consoleLines.scrollHeight;
  }

  /* ---------- screen rendering ---------- */

  function drawScreen(screen) {
    if (screen.type === 'sequence') {
      screen.frames.forEach((frame) => {
        if (frame.at > 0) T(() => drawScreen(frame.screen), frame.at);
        else drawScreen(frame.screen);
      });
      return;
    }
    const renderer = Screens[screen.type];
    if (renderer) renderer(screen, els.stage, T, project);
  }

  /* ---------- phase runner ---------- */

  function runPhase(index) {
    clearTimers();
    phaseIndex = index;
    const phase = project.phases[index];
    phaseEndsAt = Date.now() + phase.duration;

    els.chip.textContent = phase.chip;

    if (phase.kind === 'step') {
      setFillInstant(dotPos(phase.step));
    } else {
      setFillInstant(dotPos(phase.from));
      animateFill(dotPos(phase.to), phase.duration);
    }

    updateDots(phase);
    drawScreen(phase.screen);

    /* engine transitions own a fresh console; RESULT steps inherit the
       finished engine log and only append their rendering entries after
       a divider — the computation is never replayed. The run start
       (phase 0) begins a new history. */
    if (phase.kind === 'transition' || index === 0) {
      clearConsole();
    } else if (els.consoleLines && els.consoleLines.children.length) {
      logSeparator();
    }
    (phase.log || []).forEach((l) => T(() => logLine(l), l.at));

    T(() => {
      const next = index + 1;
      const go = () => {
        if (next < project.phases.length) runPhase(next);
        else finishRun();
      };
      /* user clicked this dot: its result has finished building —
         hold here so it can be read calmly; Play resumes via `go` */
      if (phase.kind === 'step' && phase.step === autoPauseAtStep) {
        autoPauseAtStep = -1;
        pendingResume = go;
        setPaused(true);
      } else {
        go();
      }
    }, phase.duration);
  }

  /* run complete: the final result stays visible (no auto-loop);
     the header Play control offers a replay */
  function finishRun() {
    running = false;
    finished = true;
    setPlayIcon(true);
  }

  function setPlayIcon(showPlay) {
    els.playBtn.innerHTML = showPlay ? ICON_PLAY : ICON_PAUSE;
    els.playBtn.setAttribute('aria-label', showPlay ? 'Play animation' : 'Pause animation');
  }

  /* ---------- start / idle / autoplay fallback ----------
     startWorkflow() is the ONLY entry point for a run: the idle CTA,
     the header Play control and the 15s fallback all use it. */

  /* step 01 IS the idle state (photo + CTA / pre-filled tour + CTA):
     the input is already provided, so a run starts directly on the
     01 → 02 transition. A project opts in with screen.type "idle" or
     screen.hold on its first phase. */
  const hasIdle = () => {
    const s = project.phases[0].screen;
    return s.type === 'idle' || s.hold === true;
  };

  function startWorkflow() {
    if (running) return; // never start a second overlapping run
    cancelAutoplay();
    running = true;
    finished = false;
    if (paused) setPaused(false);
    setPlayIcon(false);
    setFillInstant(0);
    runPhase(hasIdle() ? 1 : 0);
  }

  /* idle: step 01 screen + its CTA, timeline resting on dot 01 */
  function showIdle() {
    if (paused) setPaused(false);
    clearTimers();
    running = false;
    finished = false;
    phaseIndex = 0;
    const first = project.phases[0];
    els.chip.textContent = first.chip;
    setFillInstant(dotPos(0));
    updateDots(first);
    clearConsole();
    drawScreen(first.screen);
    const cta = els.stage.querySelector('.js-idle-start');
    if (cta) cta.addEventListener('click', () => {
      cta.disabled = true;
      startWorkflow();
    });
    setPlayIcon(true);
  }

  /* 15s fallback: the countdown only runs while the module is
     visible (held off-screen, resumed with the time left), so the
     visitor gets ~15s of real opportunity to press the CTA. */
  const AUTOPLAY_MS = 15000;
  let autoplayLeft = AUTOPLAY_MS;
  let autoplayTimer = null;
  let autoplayStartedAt = 0;
  let autoplayObserver = null;

  function resumeAutoplay() {
    if (autoplayTimer || running || finished) return;
    autoplayStartedAt = Date.now();
    autoplayTimer = setTimeout(() => {
      autoplayTimer = null;
      startWorkflow();
    }, autoplayLeft);
  }

  function holdAutoplay() {
    if (!autoplayTimer) return;
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
    autoplayLeft = Math.max(0, autoplayLeft - (Date.now() - autoplayStartedAt));
  }

  function cancelAutoplay() {
    if (autoplayTimer) clearTimeout(autoplayTimer);
    autoplayTimer = null;
    if (autoplayObserver) autoplayObserver.disconnect();
    autoplayObserver = null;
  }

  function armAutoplay() {
    cancelAutoplay();
    autoplayLeft = AUTOPLAY_MS;
    /* observe the interactive demo panel itself, not #hero (whose
       intro copy would count as exposure while the visitor is still
       reading the page intro above) */
    const target = els.stage.closest('.main-panel') || els.stage;
    if (!('IntersectionObserver' in window)) { resumeAutoplay(); return; }
    /* "really exposed" = ~75% of the panel visible, or — when the panel
       is taller than 75% of the viewport can show (short phones) — the
       panel filling most of the viewport. Scroll jitter never resets the
       countdown: it only holds / resumes the time already left, and
       resumeAutoplay() never arms a second timer. */
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    autoplayObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const vh = (e.rootBounds && e.rootBounds.height) || window.innerHeight;
        const exposed = e.isIntersecting &&
          (e.intersectionRatio >= 0.75 || e.intersectionRect.height >= vh * 0.7);
        if (exposed) resumeAutoplay();
        else holdAutoplay();
      });
    }, { threshold: thresholds });
    autoplayObserver.observe(target);
  }

  /* dot click: play the transition leading into that dot, let the
     result finish building, then auto-pause so it can be read.
     The user presses Play to resume the full autoplay timeline. */
  function jumpToStep(stepIndex) {
    const stepPhaseIdx = project.phases.findIndex(
      (p) => p.kind === 'step' && p.step === stepIndex
    );
    if (stepPhaseIdx === -1) return;
    pendingResume = null; // a new jump supersedes a previous auto-pause
    cancelAutoplay();     // a dot click is a user start: no fallback afterwards
    if (stepIndex === 0 && hasIdle()) { showIdle(); return; } // dot 01 = idle input + CTA
    running = true;
    finished = false;
    setPlayIcon(false);
    if (paused) setPaused(false);
    autoPauseAtStep = stepIndex;
    const transPhaseIdx = project.phases.findIndex(
      (p) => p.kind === 'transition' && p.to === stepIndex
    );
    runPhase(transPhaseIdx !== -1 ? transPhaseIdx : stepPhaseIdx);
  }

  /* ---------- playback control ---------- */

  function setPaused(next) {
    if (next === paused) return;
    paused = next;

    els.hero.classList.toggle('anim-paused', paused);
    setPlayIcon(paused);
    if (els.consoleStatus) els.consoleStatus.classList.toggle('is-paused', paused);
    if (els.consoleStatusText) els.consoleStatusText.textContent = paused ? 'PAUSED' : 'RUNNING';

    const phase = project.phases[phaseIndex];
    const now = Date.now();

    if (paused) {
      /* freeze pending tasks with their remaining time */
      tasks.forEach((t) => {
        clearTimeout(t.id);
        t.id = null;
        t.remaining = Math.max(0, t.due - now);
      });
      phaseRemaining = Math.max(0, phaseEndsAt - now);
      freezeFill(); // stop the progress line exactly where it is
    } else {
      /* reschedule everything with what was left */
      tasks.forEach((t) => {
        t.due = now + t.remaining;
        t.id = setTimeout(() => fire(t), t.remaining);
      });
      phaseEndsAt = now + phaseRemaining;
      if (phase.kind === 'transition') {
        animateFill(dotPos(phase.to), phaseRemaining);
      }
      /* held on a result after a dot click: continue the timeline */
      if (pendingResume) {
        const go = pendingResume;
        pendingResume = null;
        go();
      }
    }
  }

  /* idle → same start function as the CTA; run in progress → pause /
     resume as before; run finished → replay resets to photo + CTA */
  els.playBtn.addEventListener('click', () => {
    if (running) setPaused(!paused);
    else if (finished && hasIdle()) showIdle();
    else startWorkflow();
  });

  /* ---------- right column · PRODUCT STORY ----------
     Three concise modules (business/product signal · product question ·
     why this MVP) plus the case-study CTA. Rebuilt on every project
     switch so the panel always matches the selected workflow. */

  function buildSide() {
    const s = project.story;
    if (!els.storyPanel || !s) return;
    els.storyPanel.innerHTML = `
      <div class="story-mod">
        <div class="story-mod-head"><span class="story-mod-num">01</span><span class="story-mod-label">BUSINESS / PRODUCT SIGNAL</span></div>
        <p class="story-mod-text">${s.signal}</p>
      </div>
      <div class="story-mod story-mod-question">
        <div class="story-mod-head"><span class="story-mod-num">02</span><span class="story-mod-label">PRODUCT QUESTION</span></div>
        <p class="story-question">${s.question}</p>
      </div>
      <div class="story-mod">
        <div class="story-mod-head"><span class="story-mod-num">03</span><span class="story-mod-label">WHY THIS MVP</span></div>
        ${s.whyMvp.map((p) => `<p class="story-mod-text">${p}</p>`).join('')}
      </div>
      <a class="story-cta" href="${s.caseUrl}">
        <span class="story-cta-num">04</span>
        <span class="story-cta-label">VIEW CASE STUDY →</span>
      </a>`;
  }

  /* ---------- project switch ---------- */

  function buildProjectSwitch() {
    els.projectSwitch.innerHTML = '';

    /* mobile-only closing header: the end of one workflow is the
       invitation into the next (hidden on desktop via CSS) */
    const header = document.createElement('div');
    header.className = 'prj-header';
    header.innerHTML = `
      <span class="prj-header-eyebrow">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>
        WORKFLOW EXPLORED
      </span>
      <div class="prj-header-title">Continue with another AI workflow</div>`;
    els.projectSwitch.appendChild(header);

    Object.values(PROJECTS).forEach((p) => {
      const btn = document.createElement('button');
      btn.className = 'prj-btn' + (p.id === project.id ? ' active' : '') + (p.locked ? ' locked' : '');
      btn.innerHTML =
        `<span class="prj-dot"></span><span class="prj-name">${p.button}</span>` +
        (p.locked ? '<span class="prj-soon">SOON</span>' : '') +
        `<span class="prj-arrow"><svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5L10.5 8L6 12.5"/></svg></span>`;
      if (p.locked) {
        btn.setAttribute('aria-disabled', 'true');
        btn.title = 'Coming soon';
      } else {
        btn.addEventListener('click', () => switchProject(p.id));
      }
      els.projectSwitch.appendChild(btn);
    });
  }

  function switchProject(id) {
    if (id === project.id) return;
    project = PROJECTS[id];
    els.title.textContent = project.name;
    els.note.hidden = !project.exampleRun;
    if (paused) setPaused(false);
    cancelAutoplay();
    running = false;
    clearTimers();
    clearConsole();
    buildTimeline();
    buildSide();
    buildProjectSwitch();
    /* idle projects open on their step 01 + CTA; the 15s visible
       fallback is armed again for the newly selected workflow */
    if (hasIdle()) {
      showIdle();
      armAutoplay();
    } else {
      startWorkflow();
    }
  }

  /* ---------- boot ---------- */

  els.title.textContent = project.name;
  els.note.hidden = !project.exampleRun;
  buildTimeline();
  buildSide();
  buildProjectSwitch();
  if (hasIdle()) {
    showIdle();
    armAutoplay();
  } else {
    startWorkflow();
  }
})();
