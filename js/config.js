/* ============================================================
   CONFIG — all projects, steps, timings, copy and console logs.
   To add a project: add an entry to PROJECTS and set locked:false.
   The engine (hero.js) and renderers (renderers.js) never need
   to change for content edits.

   TIMELINE LOGIC:
   - Every dot (kind:'step')       = FINAL RESULT of a phase.
   - Every transition between dots = the ENGINE RUNNING, building
     the next state.
   CONSOLE LOGIC: each phase owns the console. On every phase
   change the console is cleared and replaced with that phase's
   `log` lines (engine logs during transitions, result logs on
   dots). `at` is ms relative to the phase start.
   ============================================================ */

const PROJECTS = {

  'photo-wf': {
    id: 'photo-wf',
    name: 'AI PHOTO WF EVALUATION',
    button: 'AI PHOTO WF EVALUATION',
    locked: false,
    /* shows the "EXAMPLE RUN · ILLUSTRATIVE DATA" label in the panel head */
    exampleRun: true,

    problemShort:
      'AI image enhancement can <b>improve real-estate listings</b>, but not every model delivers the same <b>quality, fidelity or efficiency</b>. ' +
      'This workflow <b>compares multiple AI engines</b>, <b>rejects outputs that distort the original property</b>, and identifies the <b>best quality / cost / processing-time trade-off</b>.',

    problemDesk: [
      { n: '01', title: 'Input', text: 'A property photo enters the workflow and is prepared as a shared baseline for every AI engine.' },
      { n: '02', title: 'Enhancer', text: 'The same image is processed across multiple enhancement workflows to generate comparable candidates.' },
      { n: '03', title: 'Fidelity Judge', text: 'Each output is compared with the original. Altered geometry, materials, furniture or structural details trigger rejection.' },
      { n: '04', title: 'Quality Evaluator', text: 'Approved outputs are scored on lighting, sharpness, color balance and overall visual improvement.' },
      { n: '05', title: 'Recommendation', text: 'The system combines fidelity, quality, cost and processing time to select the best-performing workflow.' }
    ],

    /* Product Story — the narrative frame shown in the right column.
       Kept in sync with the project selector by hero.js. */
    story: {
      signal:
        'Visual quality matters in real-estate listings, but AI enhancement introduces a new risk: improving an image can also make it less representative of the actual property.',
      question:
        'Can AI improve listing photos at scale without making the property less representative?',
      whyMvp: [
        'Building another image enhancer would not answer the most important question: whether its outputs can actually be trusted.',
        'I built a comparison and evaluation workflow that measures both visual improvement and fidelity before recommending an AI workflow.'
      ],
      caseUrl: 'case-photo-evaluation.html'
    },

    /* Timeline dots — each one is a FINAL RESULT state.
       `short` is the compact label used on small screens. */
    steps: [
      { label: 'INPUT',          short: 'INPUT' },
      { label: 'ENHANCED IMAGE', short: 'ENHANCED IMAGE' },
      { label: 'FIDELITY SCORE', short: 'FIDELITY' },
      { label: 'QUALITY SCORE',  short: 'QUALITY' },
      { label: 'RECOMMENDATION', short: 'RESULT' }
    ],

    /* Enhancement parameters shared by the running + result screens */
    enhancerParams: [
      { name: 'Exposure',    value: 92 },
      { name: 'Lighting',    value: 94 },
      { name: 'Details',     value: 91 },
      { name: 'Noise',       value: 84 },
      { name: 'Composition', value: 89 }
    ],

    phases: [

      /* ══ DOT 01 · INPUT ══
         Idle state: source photo + CTA. The run never plays this phase —
         hero.js holds it until the CTA / header Play / 15s visible
         fallback, then starts straight at the 01 → 02 transition. */
      {
        kind: 'step', step: 0, duration: 3600,
        chip: '01 · INPUT',
        screen: { type: 'idle', image: 'assets/original.jpg', tag: 'ORIGINAL PHOTO', cta: 'Improve the photo →' },
        log: [
          { at: 150,  tag: 'SYS', text: 'boot sequence complete' },
          { at: 700,  tag: 'SYS', text: 'workflow ready: ai-photo-wf-evaluation v2.3' },
          { at: 1300, tag: 'IN',  text: 'awaiting property photo...' },
          { at: 2000, tag: 'IN',  text: 'webhook received' },
          { at: 2700, tag: 'IN',  text: 'image payload received (3.2 MB)' }
        ]
      },

      /* ── PROCESS · IMAGE ENHANCEMENT (same engine-core screen as Fidelity Analysis) ── */
      {
        kind: 'transition', from: 0, to: 1, duration: 5600,
        chip: 'IMAGE ENHANCEMENT',
        screen: {
          type: 'engineCore',
          title: 'ENHANCING PHOTO',
          sub: 'Optimizing visual quality and image details.'
        },
        log: [
          { at: 200,  tag: 'ENH', text: 'image enhancement started' },
          { at: 900,  tag: 'ENH', text: 'enhancement profile loaded: real_estate_v4' },
          { at: 1700, tag: 'ENH', text: 'preserve geometry: ON' },
          { at: 2500, tag: 'ENH', text: 'improve lighting: exposure +0.4 EV' },
          { at: 3300, tag: 'ENH', text: 'recovering shadow detail...' },
          { at: 4100, tag: 'ENH', text: 'denoise pass: low' },
          { at: 4900, tag: 'ENH', text: 'rendering enhanced output...' }
        ]
      },

      /* ══ DOT 02 · ENHANCED IMAGE RESULT ══ */
      {
        kind: 'step', step: 1, duration: 7200,
        chip: '02 · ENHANCED IMAGE',
        screen: { type: 'enhancerResult' },
        log: [
          { at: 300,  tag: 'SYS', text: 'Rendering results...' },
          { at: 1100, tag: 'SYS', text: 'Building enhanced image view...' },
          { at: 1900, tag: 'SYS', text: 'Building before/after comparison...' },
          { at: 2800, tag: 'SYS', text: 'Rendering completed.' }
        ]
      },

      /* ── PROCESS · FIDELITY ANALYSIS ── */
      {
        kind: 'transition', from: 1, to: 2, duration: 5600,
        chip: 'FIDELITY ANALYSIS',
        screen: {
          type: 'engineCore',
          title: 'FIDELITY ANALYSIS',
          sub: 'comparing enhanced output against source'
        },
        log: [
          { at: 200,  tag: 'FID', text: 'fidelity analysis started' },
          { at: 900,  tag: 'FID', text: 'initializing model...' },
          { at: 1700, tag: 'FID', text: 'analyzing structure...' },
          { at: 2500, tag: 'FID', text: 'comparing geometry...' },
          { at: 3300, tag: 'FID', text: 'evaluating materials...' },
          { at: 4100, tag: 'FID', text: 'checking objects...' },
          { at: 4900, tag: 'FID', text: 'calculating score...' }
        ]
      },

      /* ══ DOT 03 · FIDELITY SCORE RESULT ══ */
      {
        kind: 'step', step: 2, duration: 4800,
        chip: '03 · FIDELITY SCORE',
        screen: {
          type: 'scoreResult',
          label: 'FIDELITY SCORE',
          value: 0.91, decimals: 2, barPct: 91,
          mini: [
            { k: 'Structure', v: '0.93' },
            { k: 'Furniture', v: '0.88' },
            { k: 'Materials', v: '0.92' },
            { k: 'Objects',   v: '0.91' }
          ]
        },
        log: [
          { at: 300,  tag: 'SYS', text: 'Rendering results...' },
          { at: 1100, tag: 'SYS', text: 'Building Fidelity Score UI...' },
          { at: 1900, tag: 'SYS', text: 'Synchronizing metrics...' },
          { at: 2800, tag: 'SYS', text: 'Rendering completed.' }
        ]
      },

      /* ── PROCESS · QUALITY EVALUATION ── */
      {
        kind: 'transition', from: 2, to: 3, duration: 5600,
        chip: 'QUALITY EVALUATION',
        screen: {
          type: 'engineCore',
          title: 'QUALITY EVALUATION',
          sub: 'evaluating visual quality of enhanced output'
        },
        log: [
          { at: 200,  tag: 'QLT', text: 'quality evaluation started' },
          { at: 900,  tag: 'QLT', text: 'initializing quality model...' },
          { at: 1700, tag: 'QLT', text: 'analyzing visual quality...' },
          { at: 2500, tag: 'QLT', text: 'evaluating lighting...' },
          { at: 3300, tag: 'QLT', text: 'assessing sharpness...' },
          { at: 4100, tag: 'QLT', text: 'checking colors...' },
          { at: 4900, tag: 'QLT', text: 'calculating score...' }
        ]
      },

      /* ══ DOT 04 · QUALITY SCORE RESULT ══ */
      {
        kind: 'step', step: 3, duration: 4800,
        chip: '04 · QUALITY SCORE',
        screen: {
          type: 'qualityCompare',
          /* mobile fallback — the unchanged Quality Score screen */
          label: 'QUALITY SCORE',
          value: 8.8, decimals: 1, unit: '/10', barPct: 88,
          mini: [
            { k: 'Original Quality', v: '6.2' },
            { k: 'Enhanced Quality', v: '8.8' },
            { k: 'Improvement', v: '+2.6', cls: 'up' }
          ],
          /* desktop side-by-side comparison — same /10 scale as above,
             criterion values average to the overall 6.2 / 8.8 */
          compare: {
            original: {
              tag: 'ORIGINAL PHOTO',
              score: '6.2/10',
              metrics: [
                ['Exposure', 6.4], ['Lighting', 6.0], ['Details', 5.8],
                ['Sharpness', 6.1], ['Composition', 7.0], ['Noise', 5.9]
              ]
            },
            enhanced: {
              tag: 'AI ENHANCED PHOTO',
              score: '8.8/10',
              metrics: [
                ['Exposure', 8.9], ['Lighting', 9.1], ['Details', 8.7],
                ['Sharpness', 9.0], ['Composition', 8.6], ['Noise', 8.5]
              ]
            }
          }
        },
        log: [
          { at: 300,  tag: 'SYS', text: 'Rendering results...' },
          { at: 1100, tag: 'SYS', text: 'Building Quality Score UI...' },
          { at: 1900, tag: 'SYS', text: 'Synchronizing metrics...' },
          { at: 2800, tag: 'SYS', text: 'Rendering completed.' }
        ]
      },

      /* ── PROCESS · WORKFLOW SELECTION ── */
      {
        kind: 'transition', from: 3, to: 4, duration: 4200,
        chip: 'WORKFLOW SELECTION',
        screen: {
          type: 'engineCore',
          title: 'WORKFLOW SELECTION',
          sub: 'ranking candidate workflows on fidelity · quality · time · cost'
        },
        log: [
          { at: 200,  tag: 'REC', text: 'workflow selection started' },
          { at: 1000, tag: 'REC', text: 'collecting metrics: fidelity · quality · time · cost' },
          { at: 1900, tag: 'REC', text: 'comparing 3 candidate workflows...' },
          { at: 2800, tag: 'REC', text: 'ranking candidates...' },
          { at: 3600, tag: 'REC', text: 'selected: Nano Banana' }
        ]
      },

      /* ══ DOT 05 · RECOMMENDATION RESULT ══ */
      {
        kind: 'step', step: 4, duration: 7000,
        chip: '05 · RECOMMENDATION',
        screen: {
          type: 'recommendation',
          workflow: 'Nano Banana',
          metrics: [
            { icon: 'shield', k: 'Fidelity', v: '0.91' },
            { icon: 'star',   k: 'Quality',  v: '8.8/10' },
            { icon: 'clock',  k: 'Time',     v: '2.8 sec' },
            { icon: 'coin',   k: 'Cost',     v: '€0.05' }
          ],
          text: 'Best balance between fidelity preservation and quality enhancement.'
        },
        log: [
          { at: 400,  tag: 'SYS', text: 'Rendering results...' },
          { at: 1300, tag: 'SYS', text: 'Building recommendation card...' },
          { at: 2200, tag: 'SYS', text: 'Collecting workflow metrics...' },
          { at: 3200, tag: 'SYS', text: 'Rendering completed.' },
          { at: 5400, tag: 'SYS', text: 'run complete, restarting demo' }
        ]
      }
    ]
  },

  'travel-engine': {
    id: 'travel-engine',
    name: 'AI TRAVEL ENGINE',
    button: 'AI TRAVEL ENGINE',
    locked: false,

    problemShort:
      'Generative AI can create <b>visually compelling travel maps</b>, but a scalable process needs <b>control over structure and inputs</b>. ' +
      'As part of the <b>Travel Brain</b>, this workflow <b>separates knowledge from generation</b>: <b>verified coordinates define the route structure first</b>, ' +
      'while <b>AI handles the visual transformation</b>.',

    problemDesk: [
      { n: '01', title: 'Tour Input', text: 'An ordered list of tour stops enters the workflow and defines the route to generate.' },
      { n: '02', title: 'Travel Brain Lookup', text: 'The system retrieves the geographic coordinates associated with each destination from the Travel Brain.' },
      { n: '03', title: 'SVG Route Map', text: 'Coordinates and tour sequence are converted into a structured SVG, creating a geographically faithful route.' },
      { n: '04', title: 'AI Visual Generation', text: 'The validated SVG and a controlled prompt are sent to the generative model, which transforms the map visually without defining its geography.' },
      { n: '05', title: 'Travel Brain Storage', text: 'The generated map is stored with the tour in the Travel Brain, where future outputs such as stories, landing pages or emails could build on the same knowledge.' }
    ],

    /* Product Story — the narrative frame shown in the right column.
       Kept in sync with the project selector by hero.js. */
    story: {
      signal:
        'For travel agencies, tour operators and travel creators, travel content needs to inform and engage users from the discovery phase. AI accelerates visual production, but a scalable process still requires control over structure and inputs.',
      question:
        'Can structured travel knowledge become coherent, controllable and rapidly reusable AI outputs?',
      whyMvp: [
        'Instead of rebuilding the context inside every prompt, I separated knowledge from generation.',
        'The Travel Brain structures information from selected sources; the Map Engine is the first working output built on top of that layer.'
      ],
      caseUrl: 'case-travel-brain.html'
    },

    steps: [
      { label: 'TOUR INPUT',  short: 'INPUT' },
      { label: 'COORDINATES', short: 'COORDS' },
      { label: 'SVG MAP',     short: 'SVG MAP' },
      { label: 'AI MAP',      short: 'AI MAP' },
      { label: 'TRAVEL BRAIN', short: 'BRAIN' }
    ],

    tourName: 'Spain Highlights Tour',
    stops: ['Madrid', 'Toledo', 'Córdoba', 'Seville', 'Granada', 'Valencia', 'Barcelona'],

    coordinates: [
      { name: 'Madrid',    coord: '40.4168° N, 3.7038° W' },
      { name: 'Toledo',    coord: '39.8628° N, 4.0273° W' },
      { name: 'Córdoba',   coord: '37.8882° N, 4.7794° W' },
      { name: 'Seville',   coord: '37.3891° N, 5.9845° W' },
      { name: 'Granada',   coord: '37.1773° N, 3.5986° W' },
      { name: 'Valencia',  coord: '39.4699° N, 0.3763° W' },
      { name: 'Barcelona', coord: '41.3851° N, 2.1734° E' }
    ],

    phases: [

      /* ══ DOT 01 · TOUR INPUT ══
         Held idle state (`hold`): the pre-filled tour + CONFIRM TOUR CTA.
         hero.js waits here for the CTA / header Play / 15s visible
         fallback, then starts straight at the 01 → 02 transition. */
      {
        kind: 'step', step: 0, duration: 4200,
        chip: '01 · TOUR INPUT',
        screen: { type: 'tourInput', status: '7 STOPS READY', hold: true },
        log: [
          { at: 150,  tag: 'SYS', text: 'boot sequence complete' },
          { at: 650,  tag: 'SYS', text: 'workflow ready: ai-travel-engine v1.0' },
          { at: 1250, tag: 'IN',  text: 'tour draft loaded: Spain Highlights Tour' },
          { at: 1950, tag: 'IN',  text: '7 stops added' },
          { at: 2700, tag: 'SYS', text: 'awaiting tour confirmation...' }
        ]
      },

      /* ── PROCESS · BRAIN SEARCH ── */
      {
        kind: 'transition', from: 0, to: 1, duration: 5800,
        chip: 'BRAIN SEARCH',
        screen: {
          type: 'brainSearch',
          title: 'SEARCHING TRAVEL BRAIN',
          sub: 'Resolving destination coordinates from stored geographic knowledge...'
        },
        log: [
          { at: 150,  tag: 'SYS',   text: 'tour received, 7 stops' },
          { at: 650,  tag: 'BRAIN', text: 'matching destinations...' },
          { at: 1250, tag: 'GEO',   text: 'Madrid resolved' },
          { at: 1750, tag: 'GEO',   text: 'Toledo resolved' },
          { at: 2250, tag: 'GEO',   text: 'Córdoba resolved' },
          { at: 2750, tag: 'GEO',   text: 'Seville resolved' },
          { at: 3250, tag: 'GEO',   text: 'Granada resolved' },
          { at: 3750, tag: 'GEO',   text: 'Valencia resolved' },
          { at: 4250, tag: 'GEO',   text: 'Barcelona resolved' },
          { at: 4900, tag: 'DONE',  text: '7/7 coordinates found' }
        ]
      },

      /* ══ DOT 02 · COORDINATES RESULT ══ */
      {
        kind: 'step', step: 1, duration: 4600,
        chip: '02 · COORDINATES',
        screen: { type: 'coordinatesList', footer: 'COORDINATES FOUND, 7/7' },
        log: [
          { at: 300,  tag: 'SYS', text: 'Rendering results...' },
          { at: 1100, tag: 'SYS', text: 'Building coordinates view...' },
          { at: 1900, tag: 'GEO', text: 'Synchronizing destination data...' },
          { at: 2800, tag: 'SYS', text: 'Rendering completed.' }
        ]
      },

      /* ── PROCESS · SVG GENERATION ── */
      {
        kind: 'transition', from: 1, to: 2, duration: 5600,
        chip: 'SVG GENERATION',
        screen: {
          type: 'svgBuild',
          title: 'GENERATING ROUTE MAP',
          sub: 'Combining geographic coordinates and tour sequence into a faithful SVG map...'
        },
        log: [
          { at: 200,  tag: 'SVG',   text: 'loading Spain geometry' },
          { at: 1000, tag: 'SVG',   text: 'plotting 7 coordinates' },
          { at: 1900, tag: 'ROUTE', text: 'connecting tour sequence' },
          { at: 2800, tag: 'SVG',   text: 'generating labels' },
          { at: 3700, tag: 'ROUTE', text: 'route validation passed' },
          { at: 4600, tag: 'DONE',  text: 'SVG map ready' }
        ]
      },

      /* ══ DOT 03 · SVG MAP RESULT ══ */
      {
        kind: 'step', step: 2, duration: 4800,
        chip: '03 · SVG MAP',
        screen: {
          type: 'svgMap',
          meta: [
            { k: 'FORMAT', v: 'SVG' },
            { k: 'STOPS', v: '7' },
            { k: 'ROUTE', v: 'Validated' },
            { k: 'POSITION ACCURACY', v: 'High' }
          ],
          footer: '7/7 NODES MATCHED'
        },
        log: [
          { at: 300,  tag: 'SYS', text: 'Rendering results...' },
          { at: 1100, tag: 'SYS', text: 'Building SVG route view...' },
          { at: 1900, tag: 'SVG', text: 'Loading map metadata...' },
          { at: 2800, tag: 'SYS', text: 'Rendering completed.' }
        ]
      },

      /* ── PROCESS · AI GENERATION ── */
      {
        kind: 'transition', from: 2, to: 3, duration: 5600,
        chip: 'AI GENERATION',
        screen: {
          type: 'aiGenerate',
          title: 'GENERATING AI MAP',
          sub: 'Sending SVG geometry + visual prompt to the image model...'
        },
        log: [
          { at: 200,  tag: 'AI', text: 'SVG route attached' },
          { at: 1000, tag: 'AI', text: 'geographic constraints locked' },
          { at: 1800, tag: 'AI', text: 'visual prompt compiled' },
          { at: 2600, tag: 'AI', text: 'destination landmarks attached' },
          { at: 3500, tag: 'AI', text: 'rendering travel map...' },
          { at: 4400, tag: 'AI', text: 'validating route placement...' }
        ]
      },

      /* ══ DOT 04 · AI GENERATED MAP RESULT ══ */
      {
        kind: 'step', step: 3, duration: 7000,
        chip: '04 · AI MAP',
        screen: {
          type: 'aiMap',
          img: 'assets/travel/spain-ai-map.webp',
          meta: [
            { k: 'SOURCE', v: 'SVG Route' },
            { k: 'MODEL', v: 'GPT Image' },
            { k: 'STOPS', v: '7/7' },
            { k: 'ROUTE', v: 'Preserved' },
            { k: 'STATUS', v: 'Generated' }
          ],
          status: 'GEOGRAPHY PRESERVED'
        },
        log: [
          { at: 400,  tag: 'SYS',   text: 'Rendering results...' },
          { at: 1300, tag: 'AI',    text: 'map generated' },
          { at: 2200, tag: 'CHECK', text: 'route preserved' },
          { at: 3200, tag: 'SYS',   text: 'Rendering completed.' }
        ]
      },

      /* ── PROCESS · SAVE TO BRAIN ── */
      {
        kind: 'transition', from: 3, to: 4, duration: 4200,
        chip: 'SAVE TO BRAIN',
        screen: {
          type: 'saveToBrain',
          title: 'SAVING TO TRAVEL BRAIN',
          sub: 'Connecting the generated map to the tour knowledge entity...'
        },
        log: [
          { at: 200,  tag: 'STORE', text: 'preparing generated asset' },
          { at: 1000, tag: 'STORE', text: 'linking map to Spain Highlights Tour' },
          { at: 1900, tag: 'BRAIN', text: 'updating tour entity' },
          { at: 2800, tag: 'SYS',   text: 'upload completed' },
          { at: 3600, tag: 'DONE',  text: 'Travel Brain updated' }
        ]
      },

      /* ══ DOT 05 · TRAVEL BRAIN RESULT ══ */
      {
        kind: 'step', step: 4, duration: 7000,
        chip: '05 · TRAVEL BRAIN',
        screen: {
          type: 'travelBrain',
          tourName: 'Spain Highlights Tour',
          /* left column: what the map proves (no fake IDs / timestamps) */
          firstLabel: 'FIRST WORKING OUTPUT',
          firstText: 'The tour\'s structured knowledge is reused by the Map Engine to generate the asset.',
          /* the map is the only built + tested output; everything else is
             a planned application of the same knowledge layer (no metrics) */
          working: [
            { name: 'MAP', status: 'Generated / Tested' }
          ],
          plannedLabel: 'POSSIBLE OUTPUTS FROM THE SAME BRAIN',
          planned: ['STORY ENGINE', 'LANDING PAGE', 'ADS / CAMPAIGNS', 'EMAIL', 'OTHER'],
          cta: 'REGENERATE MAP →',
          concept: 'ONE KNOWLEDGE LAYER<br>MULTIPLE OUTPUTS BUILT ON TOP'
        },
        log: [
          { at: 400,  tag: 'SYS',   text: 'Rendering results...' },
          { at: 1300, tag: 'SYS',   text: 'Building Travel Brain view...' },
          { at: 2200, tag: 'READY', text: 'additional content modules available' },
          { at: 3200, tag: 'SYS',   text: 'Rendering completed.' },
          { at: 5400, tag: 'SYS',   text: 'run complete, restarting demo' }
        ]
      }
    ]
  },

  /* CASE 03 — reserved slot for a future project (in development) */
  'project-03': {
    id: 'project-03',
    name: 'JAN 2027',
    button: 'JAN 2027',
    locked: true
  }
};

const DEFAULT_PROJECT = 'photo-wf';
