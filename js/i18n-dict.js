/* ============================================================
   PORTFOLIO i18n DICTIONARY  ·  EN (source) → IT

   window.PF_I18N.it      keys are the NORMALISED English source
                          string (whitespace collapsed + trimmed).
                          For rich-text blocks the key/value is the
                          element innerHTML, so inline <b>/<span>/<br>
                          are kept verbatim.
   window.PF_I18N.titles  <title> per page.

   Translation policy (Product / UX / AI portfolio):
   • Natural, professional Italian — never literal machine copy.
   • Established English industry terms kept where that is how the
     Italian design/product world speaks: Product Designer, UX/UI,
     UX, workflow, MVP, design system, Fidelity Gate, dashboard,
     frontend, brief, provider, prompt, insight, layout…
   • NEVER translated: brand / project / product / model / tech
     names — OpenAI, Claude, Gemini, GPT Image, Supabase, n8n,
     Nano Banana, NQUADRO, Elementa, E-Roome, NOVA, Travel Brain,
     Perplexity, Midjourney, Figma, Webflow, SVG, JSON, API, AI,
     NMX, and the named system components (Fidelity Judge, Quality
     Evaluator, Enhancer, Knowledge Node, Story Engine…).
   • City / country / tour names on the geographic side are left as
     they render on the (untranslated) map, to stay consistent.
   Any string without an entry here simply stays in English.
   ============================================================ */

window.PF_I18N = {

  titles: {
    'NMX, AI Workflow Portfolio': 'NMX, Portfolio Workflow AI',
    'NMX, Photo AI WF Evaluation · Case Study': 'NMX, Photo AI WF Evaluation · Case Study',
    'NMX, AI Travel Brain · Case Study': 'NMX, AI Travel Brain · Case Study',
    'NMX, NQUADRO · Case Study': 'NMX, NQUADRO · Case Study',
    'NMX, ELEMENTA · Case Study': 'NMX, ELEMENTA · Case Study'
  },

  it: {

    /* ================= GLOBAL / HEADER ================= */
    'NANDO MORI — PRODUCT DESIGNER — PORTFOLIO 2027': 'NANDO MORI — PRODUCT DESIGNER — PORTFOLIO 2027',
    'NANDO MORI — PRODUCT DESIGNER': 'NANDO MORI — PRODUCT DESIGNER',
    'BACK TO PROJECTS': 'TORNA AI PROGETTI',
    '← BACK TO PROJECTS': '← TORNA AI PROGETTI',
    'ALL PROJECTS': 'TUTTI I PROGETTI',
    'NMX © 2026': 'NMX © 2026',

    /* ---- global side navigation ---- */
    '01 / LIVE AI': '01 / LIVE AI',
    '02 / THE INTERFACES': '02 / LE INTERFACCE',
    '03 / THE CYCLE': '03 / IL CICLO',
    '04 / ABOUT ME': '04 / CHI SONO',
    '05 / CONTACT': '05 / CONTATTI',
    'Section navigation': 'Navigazione delle sezioni',
    'Open section navigation': 'Apri la navigazione delle sezioni',
    'Close section navigation': 'Chiudi la navigazione delle sezioni',

    /* ================= HOME · INTRO (positioning) ================= */
    /* "NANDO MORI — PRODUCT DESIGNER" is intentionally identical in both
       languages (see global header entry above). */
    'From product problems<br><span class="intro-title-accent">to working solutions.</span>':
      'Dai problemi di prodotto<br><span class="intro-title-accent">a soluzioni funzionanti.</span>',
    'I\'m a Product Designer using design, AI and technology to turn ideas into testable experiences and working prototypes, with UX/UI and visual craft as the foundation.':
      /* desktop-only breaks (hidden ≤1080px in css/intro.css) keep IT on
         the same 3 lines as EN so the ITA / ENG selector never moves */
      'Sono un Product Designer: uso design, AI e tecnologia per trasformare <br class="intro-br">idee in esperienze testabili e prototipi funzionanti, <br class="intro-br">con UX/UI e cura visiva come base.',
    /* process microcopy — kept in English in both languages by design */
    'UNDERSTAND · DESIGN · PROTOTYPE · BUILD · VALIDATE': 'UNDERSTAND · DESIGN · PROTOTYPE · BUILD · VALIDATE',

    /* ================= HOME · HERO ================= */
    'LIVE WORKFLOW DEMO': 'LIVE WORKFLOW DEMO',
    'AUTONOMOUS AI PIPELINE · REPLAYABLE': 'PIPELINE AI AUTONOMA · REPLAYABLE',
    'AI PHOTO WF EVALUATION': 'AI PHOTO WF EVALUATION',
    'EXAMPLE RUN · ILLUSTRATIVE DATA': 'ESECUZIONE ESEMPIO · DATI ILLUSTRATIVI',
    'AI TRAVEL ENGINE': 'AI TRAVEL ENGINE',
    'JAN 2027': 'GEN 2027',
    'SOON': 'PRESTO',
    'PROBLEM': 'PROBLEMA',
    'FULL PROBLEM DESK': 'PROBLEM DESK COMPLETO',
    'EXECUTION LOG': 'LOG DI ESECUZIONE',
    'RUNNING': 'IN ESECUZIONE',
    'PROCESS': 'PROCESSO',
    'Continue with another AI workflow': 'Continua con un altro workflow AI',
    'WORKFLOW EXPLORED': 'WORKFLOW ESPLORATO',

    /* ---- home · Live AI · section intro (narrative frame) ---- */
    'LIVE AI': 'LIVE AI',
    'FROM QUESTION TO WORKING PROTOTYPE': 'DALLA DOMANDA AL PROTOTIPO FUNZIONANTE',
    'Ideas become<br><span class="pf-shead-title-grad">testable systems.</span>':
      'Le idee diventano<br><span class="pf-shead-title-grad">sistemi testabili.</span>',
    'I use design, AI and technology to turn uncertain product questions into working prototypes, making ideas tangible enough to explore, test and evaluate before deeper investment.':
      'Uso design, AI e tecnologia per trasformare domande di prodotto incerte in prototipi funzionanti: rendo le idee abbastanza concrete da poter essere esplorate, testate e valutate prima di un investimento più consistente.',

    /* ---- home · Live AI · Product Story (right column) ---- */
    'BUSINESS / PRODUCT SIGNAL': 'SEGNALE DI BUSINESS / PRODOTTO',
    'PRODUCT QUESTION': 'DOMANDA DI PRODOTTO',
    'WHY THIS MVP': 'PERCHÉ QUESTO MVP',

    'Visual quality matters in real-estate listings, but AI enhancement introduces a new risk: improving an image can also make it less representative of the actual property.':
      'La qualità visiva conta negli annunci immobiliari, ma l\'enhancement AI introduce un nuovo rischio: migliorare un\'immagine può anche renderla meno rappresentativa dell\'immobile reale.',
    'Can AI improve listing photos at scale without making the property less representative?':
      'L\'AI può migliorare le foto degli annunci su larga scala senza rendere l\'immobile meno rappresentativo?',
    'Building another image enhancer would not answer the most important question: whether its outputs can actually be trusted.':
      'Costruire l\'ennesimo image enhancer non risponderebbe alla domanda più importante: se ci si possa davvero fidare dei suoi output.',
    'I built a comparison and evaluation workflow that measures both visual improvement and fidelity before recommending an AI workflow.':
      'Ho costruito un workflow di comparazione e valutazione che misura sia il miglioramento visivo sia la fedeltà prima di raccomandare un workflow AI.',

    'For travel agencies, tour operators and travel creators, travel content needs to inform and engage users from the discovery phase. AI accelerates visual production, but a scalable process still requires control over structure and inputs.':
      'Per agenzie, tour operator e travel creator, i contenuti di viaggio devono essere capaci di informare e coinvolgere già nella fase di scoperta. L\'AI accelera la produzione visiva, ma un processo scalabile richiede controllo sulla struttura e sugli input.',
    'Can structured travel knowledge become coherent, controllable and rapidly reusable AI outputs?':
      'Possiamo trasformare conoscenza di viaggio strutturata in output AI coerenti, controllabili e rapidamente riutilizzabili?',
    'Instead of rebuilding the context inside every prompt, I separated knowledge from generation.':
      'Invece di ricostruire ogni volta il contesto dentro un prompt, ho separato la conoscenza dalla generazione.',
    'The Travel Brain structures information from selected sources; the Map Engine is the first working output built on top of that layer.':
      'Il Travel Brain struttura le informazioni provenienti dalle fonti; il Map Engine è il primo output funzionante costruito sopra questo livello.',

    'AI image enhancement can <b>improve real-estate listings</b>, but not every model delivers the same <b>quality, fidelity or efficiency</b>. This workflow <b>compares multiple AI engines</b>, <b>rejects outputs that distort the original property</b>, and identifies the <b>best quality / cost / processing-time trade-off</b>.':
      'Il miglioramento AI delle immagini può <b>valorizzare gli annunci immobiliari</b>, ma non tutti i modelli offrono la stessa <b>qualità, fedeltà o efficienza</b>. Questo workflow <b>confronta più motori AI</b>, <b>scarta gli output che alterano l\'immobile originale</b> e individua il <b>miglior compromesso tra qualità / costo / tempo di elaborazione</b>.',

    '<b>Input</b>, A property photo enters the workflow and is prepared as a shared baseline for every AI engine.':
      '<b>Input</b>, Una foto dell\'immobile entra nel workflow e viene preparata come base comune per ogni motore AI.',
    '<b>Enhancer</b>, The same image is processed across multiple enhancement workflows to generate comparable candidates.':
      '<b>Enhancer</b>, La stessa immagine viene elaborata da più workflow di enhancement per generare candidati confrontabili.',
    '<b>Fidelity Judge</b>, Each output is compared with the original. Altered geometry, materials, furniture or structural details trigger rejection.':
      '<b>Fidelity Judge</b>, Ogni output viene confrontato con l\'originale. Geometrie, materiali, arredi o dettagli strutturali alterati ne causano lo scarto.',
    '<b>Quality Evaluator</b>, Approved outputs are scored on lighting, sharpness, color balance and overall visual improvement.':
      '<b>Quality Evaluator</b>, Gli output approvati vengono valutati su illuminazione, nitidezza, bilanciamento del colore e miglioramento visivo complessivo.',
    '<b>Recommendation</b>, The system combines fidelity, quality, cost and processing time to select the best-performing workflow.':
      '<b>Recommendation</b>, Il sistema combina fedeltà, qualità, costo e tempo di elaborazione per selezionare il workflow più performante.',

    '<b>Tour Input</b>, An ordered list of tour stops enters the workflow and defines the route to generate.':
      '<b>Tour Input</b>, Un elenco ordinato di tappe entra nel workflow e definisce l\'itinerario da generare.',
    '<b>Travel Brain Lookup</b>, The system retrieves the geographic coordinates associated with each destination from the Travel Brain.':
      '<b>Travel Brain Lookup</b>, Il sistema recupera dal Travel Brain le coordinate geografiche associate a ogni destinazione.',
    '<b>SVG Route Map</b>, Coordinates and tour sequence are converted into a structured SVG, creating a geographically faithful route.':
      '<b>SVG Route Map</b>, Coordinate e sequenza delle tappe vengono convertite in un SVG strutturato, creando un percorso geograficamente fedele.',
    '<b>AI Visual Generation</b>, The validated SVG and a controlled prompt are sent to the generative model, which transforms the map visually without defining its geography.':
      '<b>AI Visual Generation</b>, L\'SVG validato e un prompt controllato vengono inviati al modello generativo, che trasforma la mappa a livello visivo senza definirne la geografia.',
    '<b>Travel Brain Storage</b>, The generated map is stored with the tour in the Travel Brain, where future outputs such as stories, landing pages or emails could build on the same knowledge.':
      '<b>Travel Brain Storage</b>, La mappa generata viene archiviata insieme al tour nel Travel Brain, dove output futuri come storie, landing page o email potrebbero basarsi sulla stessa conoscenza.',

    'Generative AI can create <b>visually compelling travel maps</b>, but a scalable process needs <b>control over structure and inputs</b>. As part of the <b>Travel Brain</b>, this workflow <b>separates knowledge from generation</b>: <b>verified coordinates define the route structure first</b>, while <b>AI handles the visual transformation</b>.':
      'L\'AI generativa può creare <b>mappe di viaggio visivamente accattivanti</b>, ma un processo scalabile richiede <b>controllo sulla struttura e sugli input</b>. All\'interno del <b>Travel Brain</b>, questo workflow <b>separa la conoscenza dalla generazione</b>: <b>coordinate verificate definiscono prima la struttura del percorso</b>, mentre <b>l\'AI si occupa della trasformazione visiva</b>.',

    /* ---- hero screens / labels ---- */
    'INSERT PHOTO': 'INSERISCI FOTO',
    'Improve the photo →': 'Migliora la foto →',
    'Waiting for property photo...': 'In attesa della foto dell\'immobile...',
    'ENHANCING…': 'MIGLIORAMENTO…',
    'ENHANCED IMAGE': 'IMMAGINE MIGLIORATA',
    'ENHANCEMENT PARAMETERS': 'PARAMETRI DI ENHANCEMENT',
    'Exposure': 'Esposizione',
    'Lighting': 'Illuminazione',
    'Details': 'Dettagli',
    'Noise': 'Rumore',
    'Composition': 'Composizione',
    'Sharpness': 'Nitidezza',
    'INPUT': 'INPUT',
    'FIDELITY SCORE': 'FIDELITY SCORE',
    'FIDELITY': 'FIDELITY',
    'QUALITY SCORE': 'QUALITY SCORE',
    'QUALITY': 'QUALITY',
    'RECOMMENDATION': 'RECOMMENDATION',
    'RESULT': 'RISULTATO',
    'COORDINATES': 'COORDINATE',
    'COORDS': 'COORD',
    'SVG MAP': 'MAPPA SVG',
    'AI MAP': 'MAPPA AI',
    'BRAIN': 'BRAIN',
    'TOUR INPUT': 'TOUR INPUT',
    'TRAVEL BRAIN': 'TRAVEL BRAIN',
    '02 · ENHANCED IMAGE': '02 · IMMAGINE MIGLIORATA',
    '03 · FIDELITY SCORE': '03 · FIDELITY SCORE',
    '04 · QUALITY SCORE': '04 · QUALITY SCORE',
    '05 · RECOMMENDATION': '05 · RECOMMENDATION',
    '01 · TOUR INPUT': '01 · TOUR INPUT',
    '02 · COORDINATES': '02 · COORDINATE',
    '03 · SVG MAP': '03 · MAPPA SVG',
    '04 · AI MAP': '04 · MAPPA AI',
    '05 · TRAVEL BRAIN': '05 · TRAVEL BRAIN',
    '01 · INPUT': '01 · INPUT',
    'IMAGE ENHANCEMENT': 'IMAGE ENHANCEMENT',
    'FIDELITY ANALYSIS': 'FIDELITY ANALYSIS',
    'QUALITY EVALUATION': 'QUALITY EVALUATION',
    'WORKFLOW SELECTION': 'SELEZIONE DEL WORKFLOW',
    'ENHANCING PHOTO': 'MIGLIORAMENTO FOTO',
    'Optimizing visual quality and image details.': 'Ottimizzazione della qualità visiva e dei dettagli dell\'immagine.',
    'comparing enhanced output against source': 'confronto tra output migliorato e sorgente',
    'evaluating visual quality of enhanced output': 'valutazione della qualità visiva dell\'output migliorato',
    'ranking candidate workflows on fidelity · quality · time · cost': 'classifica dei workflow candidati per fedeltà · qualità · tempo · costo',
    'BRAIN SEARCH': 'RICERCA NEL BRAIN',
    'SVG GENERATION': 'GENERAZIONE SVG',
    'AI GENERATION': 'GENERAZIONE AI',
    'SAVE TO BRAIN': 'SALVA NEL BRAIN',
    'SEARCHING TRAVEL BRAIN': 'RICERCA NEL TRAVEL BRAIN',
    'GENERATING ROUTE MAP': 'GENERAZIONE MAPPA DEL PERCORSO',
    'GENERATING AI MAP': 'GENERAZIONE MAPPA AI',
    'SAVING TO TRAVEL BRAIN': 'SALVATAGGIO NEL TRAVEL BRAIN',
    'Resolving destination coordinates from stored geographic knowledge...': 'Risoluzione delle coordinate delle destinazioni dalla conoscenza geografica archiviata...',
    'Combining geographic coordinates and tour sequence into a faithful SVG map...': 'Combinazione di coordinate geografiche e sequenza del tour in una mappa SVG fedele...',
    'Sending SVG geometry + visual prompt to the image model...': 'Invio della geometria SVG + prompt visivo al modello di immagini...',
    'Connecting the generated map to the tour knowledge entity...': 'Collegamento della mappa generata all\'entità di conoscenza del tour...',
    'BEST WORKFLOW': 'MIGLIOR WORKFLOW',
    'Best balance between fidelity preservation and quality enhancement.': 'Miglior equilibrio tra preservazione della fedeltà e miglioramento della qualità.',
    'ORIGINAL PHOTO': 'FOTO ORIGINALE',
    'AI ENHANCED PHOTO': 'FOTO MIGLIORATA CON AI',
    'AI ENHANCED · VERIFIED': 'MIGLIORATA CON AI · VERIFICATA',
    'PIPELINE v2.3 · 3 AGENTS': 'PIPELINE v2.3 · 3 AGENTI',
    'SELECTED · <b>NANO BANANA</b>': 'SELEZIONATO · <b>NANO BANANA</b>',
    'AI-PHOTO-EVALUATION · LIVE RUN': 'AI-PHOTO-EVALUATION · RUN LIVE',
    '<span class="live-dot"></span>RUNNING': '<span class="live-dot"></span>IN ESECUZIONE',
    'TRAVEL-MAP-ENGINE · ROUTE PLOT': 'TRAVEL-MAP-ENGINE · TRACCIA PERCORSO',
    'SIMULATION': 'SIMULAZIONE',
    '4 STOPS · AUTO-ROUTED': '4 TAPPE · PERCORSO AUTOMATICO',
    'ENGINE · <b>PLANNING</b>': 'ENGINE · <b>PIANIFICAZIONE</b>',
    'TOUR NAME': 'NOME DEL TOUR',
    'AVAILABLE CONTENT': 'CONTENUTI DISPONIBILI',
    'REGENERATE MAP →': 'RIGENERA MAPPA →',
    'FIRST WORKING OUTPUT': 'PRIMO OUTPUT FUNZIONANTE',
    'The tour\'s structured knowledge is reused by the Map Engine to generate the asset.':
      'La conoscenza strutturata del tour viene riutilizzata dal Map Engine per generare l\'asset.',
    'Generated / Tested': 'Generata / Testata',
    'POSSIBLE OUTPUTS FROM THE SAME BRAIN': 'POSSIBILI OUTPUT DALLO STESSO BRAIN',
    'Planned': 'Pianificato',
    'LANDING PAGE': 'LANDING PAGE',
    'ADS / CAMPAIGNS': 'ADV / CAMPAGNE',
    'EMAIL': 'EMAIL',
    'ONE KNOWLEDGE LAYER<br>MULTIPLE OUTPUTS BUILT ON TOP': 'UN SOLO LIVELLO DI CONOSCENZA<br>PIÙ OUTPUT COSTRUITI SOPRA',
    'Generated': 'Generato',
    'Preserved': 'Preservato',
    'Validated': 'Validato',
    'High': 'Alta',
    'GEOGRAPHY PRESERVED': 'GEOGRAFIA PRESERVATA',
    'Map Generated': 'Mappa generata',
    'MAP GENERATED': 'MAPPA GENERATA',
    'AI MAP ASSET PENDING': 'ASSET MAPPA AI IN ATTESA',
    'SVG Route': 'Percorso SVG',
    '<span class="live-dot"></span>7 STOPS READY': '<span class="live-dot"></span>7 TAPPE PRONTE',
    '<span class="live-dot"></span>7/7 NODES MATCHED': '<span class="live-dot"></span>7/7 NODI ABBINATI',
    '<span class="live-dot"></span>COORDINATES FOUND, 7/7': '<span class="live-dot"></span>COORDINATE TROVATE, 7/7',
    '+ Add stop': '+ Aggiungi tappa',
    '7 stops added': '7 tappe aggiunte',
    '7/7 coordinates found': '7/7 coordinate trovate',
    'FORMAT': 'FORMATO',
    'STOPS': 'TAPPE',
    'ROUTE': 'PERCORSO',
    'POSITION ACCURACY': 'PRECISIONE POSIZIONE',
    'SOURCE': 'SORGENTE',
    'MODEL': 'MODELLO',
    'STATUS': 'STATO',
    'MAP': 'MAPPA',
    'TEXTS': 'TESTI',
    'IMAGES': 'IMMAGINI',
    'ADS': 'ADV',
    'EMAILS': 'EMAIL',
    'ROADPLAN': 'ROADPLAN',
    'CHECK': 'CHECK',
    'Fidelity': 'Fidelity',
    'Quality': 'Quality',
    'Time': 'Tempo',
    'Cost': 'Costo',
    'CONFIRM TOUR': 'CONFERMA TOUR',
    'Structure <b class="">0.93</b>': 'Struttura <b class="">0.93</b>',
    'Furniture <b class="">0.88</b>': 'Arredi <b class="">0.88</b>',
    'Materials <b class="">0.92</b>': 'Materiali <b class="">0.92</b>',
    'Objects <b class="">0.91</b>': 'Oggetti <b class="">0.91</b>',
    'QUALITY SCORE <b>6.2/10</b>': 'QUALITY SCORE <b>6.2/10</b>',
    'QUALITY SCORE <b>8.8/10</b>': 'QUALITY SCORE <b>8.8/10</b>',

    /* ---- hero console log lines ---- */
    'boot sequence complete': 'sequenza di avvio completata',
    'image enhancement started': 'enhancement immagine avviato',
    'enhancement profile loaded: real_estate_v4': 'profilo di enhancement caricato: real_estate_v4',
    'preserve geometry: ON': 'preserva geometria: ON',
    'improve lighting: exposure +0.4 EV': 'migliora illuminazione: esposizione +0.4 EV',
    'recovering shadow detail...': 'recupero dettaglio nelle ombre...',
    'denoise pass: low': 'passata di denoise: bassa',
    'rendering enhanced output...': 'rendering dell\'output migliorato...',
    'Rendering results...': 'Rendering dei risultati...',
    'Building enhanced image view...': 'Costruzione della vista immagine migliorata...',
    'Building before/after comparison...': 'Costruzione del confronto prima/dopo...',
    'Rendering completed.': 'Rendering completato.',
    'fidelity analysis started': 'analisi di fedeltà avviata',
    'initializing model...': 'inizializzazione del modello...',
    'analyzing structure...': 'analisi della struttura...',
    'comparing geometry...': 'confronto delle geometrie...',
    'evaluating materials...': 'valutazione dei materiali...',
    'checking objects...': 'controllo degli oggetti...',
    'calculating score...': 'calcolo del punteggio...',
    'Building Fidelity Score UI...': 'Costruzione della UI del Fidelity Score...',
    'Synchronizing metrics...': 'Sincronizzazione delle metriche...',
    'quality evaluation started': 'valutazione della qualità avviata',
    'initializing quality model...': 'inizializzazione del modello di qualità...',
    'analyzing visual quality...': 'analisi della qualità visiva...',
    'evaluating lighting...': 'valutazione dell\'illuminazione...',
    'assessing sharpness...': 'valutazione della nitidezza...',
    'checking colors...': 'controllo dei colori...',
    'Building Quality Score UI...': 'Costruzione della UI del Quality Score...',
    'workflow selection started': 'selezione del workflow avviata',
    'collecting metrics: fidelity · quality · time · cost': 'raccolta metriche: fedeltà · qualità · tempo · costo',
    'comparing 3 candidate workflows...': 'confronto di 3 workflow candidati...',
    'ranking candidates...': 'classifica dei candidati...',
    'selected: Nano Banana': 'selezionato: Nano Banana',
    'Building recommendation card...': 'Costruzione della card di raccomandazione...',
    'Collecting workflow metrics...': 'Raccolta delle metriche del workflow...',
    'run complete, restarting demo': 'run completata, riavvio della demo',
    'workflow ready: ai-travel-engine v1.0': 'workflow pronto: ai-travel-engine v1.0',
    'tour draft loaded: Spain Highlights Tour': 'bozza tour caricata: Spain Highlights Tour',
    'awaiting tour confirmation...': 'in attesa di conferma del tour...',
    'tour received, 7 stops': 'tour ricevuto, 7 tappe',
    'matching destinations...': 'abbinamento delle destinazioni...',
    'Madrid resolved': 'Madrid risolta',
    'Toledo resolved': 'Toledo risolta',
    'Córdoba resolved': 'Córdoba risolta',
    'Seville resolved': 'Seville risolta',
    'Granada resolved': 'Granada risolta',
    'Valencia resolved': 'Valencia risolta',
    'Barcelona resolved': 'Barcelona risolta',
    'Building coordinates view...': 'Costruzione della vista coordinate...',
    'Synchronizing destination data...': 'Sincronizzazione dei dati delle destinazioni...',
    'loading Spain geometry': 'caricamento della geometria della Spagna',
    'plotting 7 coordinates': 'tracciamento di 7 coordinate',
    'connecting tour sequence': 'collegamento della sequenza del tour',
    'generating labels': 'generazione delle etichette',
    'route validation passed': 'validazione del percorso superata',
    'SVG map ready': 'mappa SVG pronta',
    'Building SVG route view...': 'Costruzione della vista percorso SVG...',
    'Loading map metadata...': 'Caricamento dei metadati della mappa...',
    'SVG route attached': 'percorso SVG allegato',
    'geographic constraints locked': 'vincoli geografici bloccati',
    'visual prompt compiled': 'prompt visivo compilato',
    'destination landmarks attached': 'landmark delle destinazioni allegati',
    'rendering travel map...': 'rendering della mappa di viaggio...',
    'validating route placement...': 'validazione del posizionamento del percorso...',
    'map generated': 'mappa generata',
    'route preserved': 'percorso preservato',
    'Building Travel Brain view...': 'Costruzione della vista Travel Brain...',
    'additional content modules available': 'moduli di contenuto aggiuntivi disponibili',
    'preparing generated asset': 'preparazione dell\'asset generato',
    'linking map to Spain Highlights Tour': 'collegamento della mappa a Spain Highlights Tour',
    'updating tour entity': 'aggiornamento dell\'entità tour',
    'upload completed': 'upload completato',
    'Travel Brain updated': 'Travel Brain aggiornato',

    /* ================= HOME · THE CYCLE ================= */
    'THE CYCLE': 'IL CICLO',
    'SAME THINKING · EVERY PROJECT': 'STESSO APPROCCIO · OGNI PROGETTO',
    'Different outputs.<br><span class="cycle-title-grad">One design process.</span>':
      'Output diversi.<br><span class="cycle-title-grad">Un solo processo di design.</span>',
    'Every project starts with a problem. Research turns evidence into hypotheses, hypotheses become real products and experiences, and their results generate new insights. Those insights reveal what to improve next, and the cycle starts again.':
      'Ogni progetto parte da un problema. La ricerca trasforma le evidenze in ipotesi, le ipotesi diventano prodotti ed esperienze reali e i loro risultati generano nuovi insight. Quegli insight rivelano cosa migliorare, e il ciclo ricomincia.',
    '<span class="c-dot"></span>PROBLEM': '<span class="c-dot"></span>PROBLEMA',
    '<span class="c-dot"></span>RESEARCH': '<span class="c-dot"></span>RICERCA',
    '<span class="c-dot"></span>HYPOTHESIS': '<span class="c-dot"></span>IPOTESI',
    '<span class="c-dot"></span>INSIGHT': '<span class="c-dot"></span>INSIGHT',
    'OUTPUT': 'OUTPUT',
    'AI WORKFLOW': 'WORKFLOW AI',
    'WEBSITE': 'SITO WEB',
    'DESIGN SYSTEM': 'DESIGN SYSTEM',
    'UI FUNDAMENTALS': 'FONDAMENTA UI',
    'AI PRODUCT': 'PRODOTTO AI',
    'DASHBOARD': 'DASHBOARD',
    'FUNNEL': 'FUNNEL',
    'PROTOTYPE': 'PROTOTIPO',
    'EVERY INSIGHT REVEALS THE NEXT PROBLEM': 'OGNI INSIGHT RIVELA IL PROSSIMO PROBLEMA',

    /* ================= HOME · THE CASES ================= */
    'THE CASES': 'I CASI',
    'WHAT THE PROCESS ACTUALLY SHIPPED': 'CIÒ CHE IL PROCESSO HA EFFETTIVAMENTE PRODOTTO',
    'AI PROJECTS': 'PROGETTI AI',
    'The same loop, three products. Each case below entered the cycle as a problem, and left it as a working system you can inspect.':
      'Lo stesso ciclo, tre prodotti. Ogni caso qui sotto è entrato nel ciclo come problema, e ne è uscito come un sistema funzionante che puoi esaminare.',
    'CASE 01 / 03 <span class="sc-status">LIVE SYSTEM</span>': 'CASO 01 / 03 <span class="sc-status">SISTEMA LIVE</span>',
    'CASE 02 / 03 <span class="sc-status is-dev">IN DEVELOPMENT</span>': 'CASO 02 / 03 <span class="sc-status is-dev">IN SVILUPPO</span>',
    'CASE 03 / 03 <span class="sc-status is-dev">IN DEVELOPMENT</span>': 'CASO 03 / 03 <span class="sc-status is-dev">IN SVILUPPO</span>',
    'AI Photo Evaluation': 'AI Photo Evaluation',
    'An autonomous pipeline that enhances real-estate photos, verifies every result against the source with a <b>Fidelity Judge</b>, scores visual quality, and recommends the best enhancement workflow per photo, automatically.':
      'Una pipeline autonoma che migliora le foto immobiliari, verifica ogni risultato rispetto alla sorgente con un <b>Fidelity Judge</b>, valuta la qualità visiva, e raccomanda automaticamente il miglior workflow di enhancement per ogni foto.',
    'Travel Map Engine': 'Travel Map Engine',
    'A generative map engine that turns a plain-language trip brief into a <b>living route</b>, stops, timing and logistics resolved by AI agents and rendered as an interactive map.':
      'Un motore generativo che trasforma un brief di viaggio in linguaggio naturale in un <b>percorso vivo</b>, tappe, tempi e logistica risolti da agenti AI e resi come mappa interattiva.',
    /* CASE 03 — neutral placeholder for a future project (in development) */
    'New project currently in development.': 'Nuovo progetto attualmente in sviluppo.',
    'PROJECT IN DEVELOPMENT': 'PROGETTO IN SVILUPPO',
    'CASE 03 / 03': 'CASO 03 / 03',
    'STATUS · <b>IN DEVELOPMENT</b>': 'STATO · <b>IN SVILUPPO</b>',
    'VIEW CASE STUDY →': 'VEDI CASE STUDY →',
    'VIEW CASE STUDY <span class="sc-soon">SOON</span>': 'VEDI CASE STUDY <span class="sc-soon">PRESTO</span>',
    '<span class="sc-tab-dot"></span>AI PHOTO EVALUATION': '<span class="sc-tab-dot"></span>AI PHOTO EVALUATION',
    '<span class="sc-tab-dot"></span>TRAVEL MAP ENGINE': '<span class="sc-tab-dot"></span>TRAVEL MAP ENGINE',
    '<span class="sc-tab-dot"></span>JAN 2027<span class="sc-soon">SOON</span>': '<span class="sc-tab-dot"></span>GEN 2027<span class="sc-soon">PRESTO</span>',

    /* ================= HOME · THE INTERFACES ================= */
    'THE INTERFACES': 'LE INTERFACCE',
    'REAL CLIENT PRODUCTS': 'PRODOTTI PER CLIENTI REALI',
    'Designed for <span class="ui-title-grad">real products.</span><br>Shaped by <span class="ui-title-grad">real constraints.</span>':
      'Progettate per <span class="ui-title-grad">prodotti reali.</span><br>Plasmate da <span class="ui-title-grad">vincoli reali.</span>',
    'Selected client work across B2B products, SaaS, booking experiences and editorial platforms.':
      'Una selezione di lavori per clienti tra prodotti B2B, SaaS, esperienze di prenotazione e piattaforme editoriali.',
    'CLIENT PROJECT': 'PROGETTO CLIENTE',
    /* project category lines (stage) */
    'B2B PRODUCT CATALOG · UX/UI · IA': 'CATALOGO PRODOTTI B2B · UX/UI · IA',
    'B2B SAAS · UX/UI · CRO': 'SAAS B2B · UX/UI · CRO',
    'IMMERSIVE BOOKING · UX/UI · ART DIRECTION': 'BOOKING IMMERSIVO · UX/UI · ART DIRECTION',
    'EDITORIAL PLATFORM · UX/UI · IA': 'PIATTAFORMA EDITORIALE · UX/UI · IA',
    /* project headlines (stage) */
    'Reframing a complex catalog around product discovery.':
      'Ripensare un catalogo complesso attorno alla scoperta dei prodotti.',
    'Turning a complex SaaS into a clear path to trial.':
      'Trasformare un SaaS complesso in un percorso chiaro verso la prova.',
    'Making room discovery part of the booking experience.':
      'Rendere la scoperta delle stanze parte dell\'esperienza di prenotazione.',
    'Giving a growing editorial archive a clearer structure.':
      'Dare a un archivio editoriale in crescita una struttura più chiara.',
    'A broad product offering required a clearer way to understand, explore and navigate the catalog. The experience was reorganized around product use and context, making relevant products easier to discover.':
      'Un\'offerta di prodotti ampia richiedeva un modo più chiaro per comprendere, esplorare e navigare il catalogo. L\'esperienza è stata riorganizzata attorno all\'uso e al contesto dei prodotti, rendendo più semplice scoprire quelli rilevanti.',
    /* project facts (stage) */
    '15+ SCREENS': '15+ SCHERMATE',
    'REAL CLIENT': 'CLIENTE REALE',
    'CLIENT PROJECT · PORTFOLIO RECONSTRUCTION': 'PROGETTO CLIENTE · RICOSTRUZIONE PORTFOLIO',
    'Case study based on a real professional project. The identity, content and materials shown have been recreated and reworked specifically for this portfolio.':
      'Case study basato su un progetto professionale reale. Identità, contenuti e materiali mostrati sono stati ricreati e rielaborati appositamente per il portfolio.',
    'IMMERSIVE BOOKING': 'BOOKING IMMERSIVO',
    'IMMERSIVE BOOKING EXPERIENCE': 'ESPERIENZA DI BOOKING IMMERSIVA',
    'B2B SAAS': 'SAAS B2B',
    /* case-study CTA */
    'EXPLORE CASE STUDY': 'ESPLORA IL CASE STUDY',
    'SOON': 'PRESTO',
    /* locked selector slot ("PROJECT LOCKED" is identical in both languages) */
    'NOV / DEC 2026': 'NOV / DIC 2026',
    /* NQUADRO hero slider — accessibility labels only */
    'NQUADRO hero variations': 'Varianti della hero di NQUADRO',
    'Show slide 1': 'Mostra la slide 1',
    'Show slide 2': 'Mostra la slide 2',
    'Show slide 3': 'Mostra la slide 3',
    '01 · HOMEPAGE': '01 · HOMEPAGE',
    '02 · CATALOG': '02 · CATALOGO',
    '01 · HOMEPAGE / BOOKING': '01 · HOMEPAGE / PRENOTAZIONE',
    '02 · ROOMS': '02 · STANZE',
    '02 · TRIAL / PRICING': '02 · TRIAL / PREZZI',
    '02 · ARTICLE': '02 · ARTICOLO',
    'UI/UX · B2B PRODUCT CATALOG': 'UI/UX · CATALOGO PRODOTTI B2B',
    'UI/UX · B2B SAAS WEBSITE': 'UI/UX · SITO SAAS B2B',
    'UI/UX · IMMERSIVE WEB EXPERIENCE': 'UI/UX · ESPERIENZA WEB IMMERSIVA',
    'UI/UX · EDITORIAL PLATFORM': 'UI/UX · PIATTAFORMA EDITORIALE',
    'B2B PRODUCT CATALOG': 'CATALOGO PRODOTTI B2B',
    'B2B SAAS WEBSITE': 'SITO SAAS B2B',
    'IMMERSIVE WEB EXPERIENCE': 'ESPERIENZA WEB IMMERSIVA',
    'EDITORIAL PLATFORM': 'PIATTAFORMA EDITORIALE',
    'WIREFRAMES': 'WIREFRAME',
    'HI-FI SCREENS': 'SCHERMATE HI-FI',
    'TOTAL SCREENS': 'SCHERMATE TOTALI',
    'A B2B product catalog designed to make a large and complex offering easier to explore, combining clear navigation with a strong visual identity.':
      'Un catalogo prodotti B2B pensato per rendere più semplice esplorare un\'offerta ampia e complessa, unendo una navigazione chiara a una forte identità visiva.',
    'A large product range made discovery and navigation increasingly complex. Users needed a clearer way to understand the offering and quickly reach the products relevant to their needs.':
      'Una gamma di prodotti molto ampia rendeva sempre più complesse la scoperta e la navigazione. Gli utenti avevano bisogno di un modo più chiaro per comprendere l\'offerta e raggiungere rapidamente i prodotti rilevanti per le loro esigenze.',
    'The catalog was reorganized into clear macro-categories based on product use and context, supported by strong visual references for faster recognition and navigation.':
      'Il catalogo è stato riorganizzato in macro-categorie chiare basate su uso e contesto dei prodotti, supportate da forti riferimenti visivi per un riconoscimento e una navigazione più rapidi.',
    'The homepage was also redesigned as a product discovery hub: search, categories and key product information become immediately accessible instead of being buried deeper in the catalog.':
      'Anche la homepage è stata ridisegnata come hub di scoperta dei prodotti: ricerca, categorie e informazioni chiave diventano subito accessibili invece di restare nascoste in profondità nel catalogo.',
    'A B2B SaaS experience designed to make a complex product easier to understand and create a clearer path from discovery to trial.':
      'Un\'esperienza SaaS B2B pensata per rendere più comprensibile un prodotto complesso e creare un percorso più chiaro dalla scoperta alla prova.',
    'Product data showed that a significant share of subscribers had previously started with a free trial. Further research highlighted its role in helping users understand the platform\'s simplicity and experience its benefits before committing.':
      'I dati di prodotto mostravano che una quota significativa di abbonati aveva iniziato con una prova gratuita. Ulteriori ricerche ne hanno evidenziato il ruolo nell\'aiutare gli utenti a cogliere la semplicità della piattaforma e a sperimentarne i benefici prima di impegnarsi.',
    'The experience was reorganized around the free trial as a primary conversion path. Immediate access to the trial was brought into the homepage, supported by concise benefit-led messaging to communicate the product\'s value before asking users to commit.':
      'L\'esperienza è stata riorganizzata attorno alla prova gratuita come principale percorso di conversione. L\'accesso immediato alla prova è stato portato in homepage, supportato da messaggi concisi e orientati ai benefici per comunicare il valore del prodotto prima di chiedere un impegno.',
    'A dedicated Trial &amp; Pricing experience then connects product discovery with plan comparison, creating a clearer path from evaluation to subscription.':
      'Un\'esperienza dedicata di Trial &amp; Pricing collega poi la scoperta del prodotto al confronto tra i piani, creando un percorso più chiaro dalla valutazione all\'abbonamento.',
    'An immersive booking experience designed to turn room discovery into part of the entertainment, reducing the distance between exploration and reservation.':
      'Un\'esperienza di prenotazione immersiva pensata per trasformare la scoperta delle stanze in parte dell\'intrattenimento, riducendo la distanza tra esplorazione e prenotazione.',
    'Behavioral data showed that returning visitors represented a significant share of users, while room and booking pages were among the most visited areas of the experience.':
      'I dati comportamentali mostravano che i visitatori di ritorno rappresentavano una quota significativa degli utenti, mentre le pagine delle stanze e di prenotazione erano tra le aree più visitate dell\'esperienza.',
    'This highlighted an opportunity to shorten the path between discovering a room and booking it, without interrupting the user\'s momentum.':
      'Questo ha evidenziato l\'opportunità di accorciare il percorso tra la scoperta di una stanza e la sua prenotazione, senza interrompere lo slancio dell\'utente.',
    'Booking was integrated directly into the room experience, allowing users to choose date and time without leaving the page.':
      'La prenotazione è stata integrata direttamente nell\'esperienza della stanza, permettendo agli utenti di scegliere data e ora senza lasciare la pagina.',
    'At the same time, each room was given its own AI-assisted visual world, turning discovery into a more immersive preview of the experience while keeping the booking action immediately accessible.':
      'Allo stesso tempo, a ogni stanza è stato dato un proprio mondo visivo assistito dall\'AI, trasformando la scoperta in un\'anteprima più immersiva dell\'esperienza e mantenendo l\'azione di prenotazione sempre accessibile.',
    'A technology editorial platform redesigned to make a growing content archive easier to discover, navigate and read, through a clearer information architecture and contemporary visual system.':
      'Una piattaforma editoriale tech ridisegnata per rendere più semplici la scoperta, la navigazione e la lettura di un archivio di contenuti in crescita, grazie a un\'architettura dell\'informazione più chiara e a un sistema visivo contemporaneo.',
    'As the editorial archive grew, limited content categorization made older and less prominent articles increasingly difficult to discover.':
      'Con la crescita dell\'archivio editoriale, una categorizzazione dei contenuti limitata rendeva sempre più difficile scoprire gli articoli più datati e meno in evidenza.',
    'At the same time, the existing visual language no longer reflected the publication\'s technology-focused positioning or provided a strong hierarchy across dense editorial content.':
      'Allo stesso tempo, il linguaggio visivo esistente non rifletteva più il posizionamento tech della testata né offriva una gerarchia forte in contenuti editoriali densi.',
    'The content architecture was reorganized into clear thematic macro-categories, supported by a filtering system that allows users to explore the archive by topic, author, publication date and other relevant criteria.':
      'L\'architettura dei contenuti è stata riorganizzata in macro-categorie tematiche chiare, supportate da un sistema di filtri che permette agli utenti di esplorare l\'archivio per argomento, autore, data di pubblicazione e altri criteri rilevanti.',
    'A new editorial hierarchy and visual system were designed alongside it to improve scannability and readability across both content discovery and individual articles.':
      'Parallelamente sono stati progettati una nuova gerarchia editoriale e un sistema visivo per migliorare la scansionabilità e la leggibilità sia nella scoperta dei contenuti sia nei singoli articoli.',
    'Every project starts with <b>research</b> and ends with <b>results</b>.':
      'Ogni progetto inizia con la <b>ricerca</b> e finisce con i <b>risultati</b>.',
    'RESEARCH': 'RICERCA',
    'STRATEGY': 'STRATEGIA',
    'DESIGN': 'DESIGN',
    'DELIVER': 'CONSEGNA',
    'VIEW ALL PROJECTS': 'VEDI TUTTI I PROGETTI',
    'SOLUTION': 'SOLUZIONE',

    /* ================= HOME · ABOUT ================= */
    'ABOUT ME': 'CHI SONO',
    'THE PERSON BEHIND THE SYSTEMS': 'LA PERSONA DIETRO AI SISTEMI',
    'I design <span class="about-accent">the system.</span><br>Not just the screen.':
      'Progetto <span class="about-accent">il sistema.</span><br>Non solo la schermata.',
    'I design digital products starting from real problems, turning ideas and requirements into experiences, interfaces and working prototypes.':
      'Progetto prodotti digitali partendo da problemi reali, trasformando idee e requisiti in esperienze, interfacce e prototipi funzionanti.',
    'I work across product design, UX/UI and prototyping, using AI, automation and code as tools to explore and build faster.':
      'Lavoro tra product design, UX/UI e prototipazione, usando AI, automazione e codice come strumenti per esplorare e costruire più velocemente.',
    'Rome, Italy': 'Roma, Italia',
    'DIGITAL PRODUCTS / WEBSITES': 'PRODOTTI DIGITALI / SITI',
    '<span class="live-dot"></span>EDUCATION': '<span class="live-dot"></span>FORMAZIONE',
    '<span class="live-dot"></span>EXPERIENCE': '<span class="live-dot"></span>ESPERIENZA',
    'Bachelor\'s Degree in Communication Sciences,<br>Digital Cultures and Technologies':
      'Laurea in Scienze della Comunicazione,<br>Culture e Tecnologie Digitali',
    'La Sapienza University, Rome': 'Università La Sapienza, Roma',
    'Master in UX &amp; IA': 'Master in UX &amp; IA',
    'IULM University, Rome': 'Università IULM, Roma',
    'UI &amp; Product Designer': 'UI &amp; Product Designer',
    'Fitness Industry': 'Settore Fitness',
    '2024 – Present': '2024 – Oggi',
    'UX &amp; UI Designer': 'UX &amp; UI Designer',
    'Digital Marketing Agency': 'Agenzia di Digital Marketing',
    /* CAPABILITIES / HOW I WORK — CORE (practice) vs ENABLERS (leverage) */
    'CAPABILITIES': 'COMPETENZE',
    'HOW I WORK': 'COME LAVORO',
    'CORE': 'CORE',
    'ENABLERS': 'LEVE',
    'PRODUCT DESIGN': 'PRODUCT DESIGN',
    'UX/UI': 'UX/UI',
    'RAPID PROTOTYPING': 'PROTOTIPAZIONE RAPIDA',
    'PRODUCT BUILDING': 'PRODUCT BUILDING',
    'AI': 'AI',
    'AUTOMATION': 'AUTOMAZIONE',
    'CODE': 'CODICE',
    'DATA': 'DATI',
    'MY STACK': 'IL MIO STACK',
    'TOOLS I USE EVERY DAY': 'GLI STRUMENTI CHE USO OGNI GIORNO',
    'BUILD': 'BUILD',
    'AI &amp; RESEARCH': 'AI &amp; RICERCA',
    'HTML / CSS': 'HTML / CSS',
    /* MY STACK — DESIGN is covered above; tool names stay in English
       (product/technique names). 'OTHER' is still used by the
       Travel Brain case page. */
    'OTHER': 'ALTRO',

    /* ================= HOME · CONTACT ================= */
    /* section label '06 / CONTACT' → '06 / CONTATTI' is defined once in
       the side-navigation block above and reused here. */
    'LET\'S<br><span class="contact-accent">CONNECT.</span>':
      'PARLIAMONE<span class="contact-accent">.</span>',
    'Want to talk about product design, AI or the projects in this portfolio?<br>You can reach me directly here.':
      'Vuoi parlare di product design, AI o di uno dei progetti presenti nel portfolio?<br>Puoi contattarmi direttamente qui.',
    'SEND AN EMAIL': 'INVIA UN\'EMAIL',
    'VIEW PROFILE': 'VEDI PROFILO',
    '&gt; LET\'S TALK ABOUT': '&gt; PARLIAMO DI',
    '&gt; CURRENT FOCUS': '&gt; FOCUS ATTUALE',
    'Designing products where UX, AI and automation become one system.':
      'Progetto prodotti in cui UX, AI e automazione diventano un unico sistema.',
    ', THANKS FOR BEING HERE,': ', GRAZIE DI ESSERE ARRIVATO FIN QUI,',
    'BACK TO TOP': 'TORNA SU',
    'Send an email to Nando Mori': 'Invia un\'email a Nando Mori',
    'View Nando Mori on LinkedIn': 'Apri il profilo LinkedIn di Nando Mori',

    /* ================= CASE · PHOTO AI WF EVALUATION ================= */
    '01 / WORKFLOW EVALUATION': '01 / VALUTAZIONE DEL WORKFLOW',
    '01 / OVERVIEW': '01 / PANORAMICA',
    '02 / ENGINES': '02 / ENGINES',
    '03 / ARCHITECTURE': '03 / ARCHITETTURA',
    '04 / CHALLENGES': '04 / SFIDE',
    '05 / ROADMAP': '05 / ROADMAP',
    'Photo AI<br><span class="cs-title-grad">WF Evaluation</span>':
      'Photo AI<br><span class="cs-title-grad">WF Evaluation</span>',
    'An AI evaluation system designed to compare image-enhancement workflows, measure visual improvement without sacrificing property <b>fidelity</b>, and identify the best workflow according to shared evaluation criteria.':
      'Un sistema di valutazione AI progettato per confrontare i workflow di image enhancement, misurare il miglioramento visivo senza sacrificare la <b>fedeltà</b> dell\'immobile e individuare il workflow migliore in base a criteri di valutazione condivisi.',
    'IMAGES TESTED': 'IMMAGINI TESTATE',
    'WORKFLOW ENGINES': 'ENGINE DEL WORKFLOW',
    'EVALUATION DIMENSIONS': 'DIMENSIONI DI VALUTAZIONE',
    'EXECUTION MONITOR': 'MONITOR DI ESECUZIONE',
    'RUN COMPLETE': 'RUN COMPLETATA',
    'EXAMPLE RUN · ILLUSTRATIVE FLOW, NOT AGGREGATE RESULTS': 'RUN DI ESEMPIO · FLUSSO ILLUSTRATIVO, NON RISULTATI AGGREGATI',
    'Image uploaded': 'Immagine caricata',
    'ENHANCER': 'ENHANCER',
    'Enhancer': 'Enhancer',
    '3 variants': '3 varianti',
    'Gate passed': 'Gate superato',
    'Scored': 'Valutata',
    'Best selected': 'Migliore selezionato',
    'Input': 'Input',
    'Prepare': 'Preparazione',
    'Generate': 'Generazione',
    'Evaluate': 'Valutazione',
    'Rank': 'Classifica',
    'Return': 'Ritorno',
    'RECOMMEND': 'RECOMMEND',
    'LIVING ROOM': 'SOGGIORNO',
    'GATE PASSED': 'GATE SUPERATO',
    'ORIGINAL': 'ORIGINALE',
    'ENHANCED · BEST': 'MIGLIORATA · MIGLIORE',
    'WORKFLOW B': 'WORKFLOW B',
    'Workflow B · Gemini': 'Workflow B · Gemini',
    'VIEW FULL REPORT ↓': 'VEDI IL REPORT COMPLETO ↓',
    'FROM CONCEPT TO EVALUATION': 'DAL CONCEPT ALLA VALUTAZIONE',
    'The project started as a Photo Enhancer concept. After presenting the idea to a senior product stakeholder, one question reframed the exploration: how do you determine which AI workflow actually performs better?':
      'Il progetto è nato inizialmente come concept di Photo Enhancer. Dopo aver presentato l\'idea a un senior product stakeholder, una domanda ha cambiato la direzione dell\'esplorazione: come stabilire quale workflow AI funzioni realmente meglio?',
    'That feedback shifted the project from image generation to workflow evaluation, introducing explicit criteria for visual quality and fidelity.':
      'Quel feedback ha spostato il progetto dalla semplice generazione di immagini alla valutazione comparativa dei workflow, introducendo criteri espliciti per qualità visiva e fedeltà.',
    'EACH ENGINE OWNS ONE JUDGEMENT': 'OGNI ENGINE HA UN SOLO GIUDIZIO',
    'The four workflow <span class="cs-title-grad">engines</span>':
      'I quattro <span class="cs-title-grad">engine</span> del workflow',
    'Each engine owns a specific role inside the evaluation framework.':
      'Ogni engine ha un ruolo specifico all\'interno del framework di valutazione.',
    'IMAGE ENHANCEMENT ENGINE': 'IMAGE ENHANCEMENT ENGINE',
    'Generates enhanced versions of the original property image through interchangeable AI workflows.':
      'Genera versioni migliorate dell\'immagine originale dell\'immobile tramite workflow AI intercambiabili.',
    'Original image': 'Immagine originale',
    'Enhancement parameters': 'Parametri di enhancement',
    'Enhanced image': 'Immagine migliorata',
    'Processing metadata': 'Metadati di elaborazione',
    'Fidelity Judge': 'Fidelity Judge',
    'STRUCTURAL FIDELITY ENGINE': 'STRUCTURAL FIDELITY ENGINE',
    'Checks whether the enhanced image still represents the original property accurately.':
      'Verifica che l\'immagine migliorata rappresenti ancora fedelmente l\'immobile originale.',
    'Structure consistency': 'Coerenza della struttura',
    'Furniture consistency': 'Coerenza degli arredi',
    'Object preservation': 'Preservazione degli oggetti',
    'Material consistency': 'Coerenza dei materiali',
    'Quality Evaluator': 'Quality Evaluator',
    'VISUAL QUALITY ENGINE': 'VISUAL QUALITY ENGINE',
    'Measures whether the enhanced result actually improves the visual quality of the source image.':
      'Misura se il risultato migliorato aumenta davvero la qualità visiva dell\'immagine sorgente.',
    'Visibility': 'Visibilità',
    'Clarity': 'Nitidezza',
    'Overall quality score': 'Punteggio di qualità complessivo',
    'Recommendation': 'Recommendation',
    'DECISION ENGINE': 'DECISION ENGINE',
    'Ranks eligible workflows using fidelity, visual quality, cost and processing time according to configurable business priorities.':
      'Classifica i workflow idonei in base a fedeltà, qualità visiva, costo e tempo di elaborazione, secondo priorità di business configurabili.',
    'Fidelity results': 'Risultati di fedeltà',
    'Quality results': 'Risultati di qualità',
    'Cost data': 'Dati di costo',
    'Processing-time data': 'Dati sul tempo di elaborazione',
    'Recommended workflow': 'Workflow raccomandato',
    'Comparative evaluation': 'Valutazione comparativa',
    'Structure': 'Struttura',
    'LIVE ORCHESTRATION · LOOPING': 'ORCHESTRAZIONE LIVE · IN LOOP',
    'System <span class="cs-title-grad">architecture</span>': 'Architettura <span class="cs-title-grad">del sistema</span>',
    'The workflow orchestrated with n8n and frontier AI models, watch one execution travel the pipeline.':
      'Il workflow orchestrato con n8n e modelli AI di frontiera, osserva una singola esecuzione attraversare la pipeline.',
    'WEBHOOK': 'WEBHOOK',
    'PARSER': 'PARSER',
    'RESPOND': 'RISPONDI',
    'ORCHESTRATION': 'ORCHESTRAZIONE',
    'IMAGE GENERATION': 'GENERAZIONE IMMAGINI',
    'AI EVALUATION': 'VALUTAZIONE AI',
    'DATA / RESULTS STORAGE': 'ARCHIVIAZIONE DATI / RISULTATI',
    'WHAT THE SYSTEM HAD TO SOLVE': 'COSA IL SISTEMA DOVEVA RISOLVERE',
    'CHALLENGES SOLVED': 'SFIDE RISOLTE',
    'WHAT THE TESTS REVEALED': 'COSA HANNO RIVELATO I TEST',
    'Preserving property fidelity': 'Preservare la fedeltà dell\'immobile',
    'Comparing different workflows': 'Confrontare workflow diversi',
    'Turning evaluation into a recommendation': 'Trasformare la valutazione in una raccomandazione',
    'APPROACH': 'APPROCCIO',
    'FINDING': 'EVIDENZA',
    'CURRENT STATE': 'STATO ATTUALE',
    'AI enhancement can improve visual quality while silently altering geometry, materials, furniture or objects.':
      'L\'enhancement AI può aumentare la qualità visiva alterando in modo silenzioso geometrie, materiali, arredi o oggetti.',
    'Every enhanced image is compared with the original across four structural dimensions before entering the recommendation stage.':
      'Ogni immagine migliorata viene confrontata con l\'originale su quattro dimensioni strutturali prima di entrare nella fase di raccomandazione.',
    'Tests identified visually improved outputs that were not sufficiently faithful to the source property and were therefore rejected.':
      'I test hanno individuato output visivamente migliori ma non sufficientemente fedeli all\'immobile di partenza, che sono stati quindi scartati.',
    'Different AI enhancement workflows can produce significantly different results from the same source image.':
      'Workflow di enhancement AI diversi possono produrre risultati molto diversi a partire dalla stessa immagine sorgente.',
    'Every candidate is evaluated through the same shared framework using Fidelity, Quality Improvement, Cost and Processing Time.':
      'Ogni candidato viene valutato con lo stesso framework condiviso, su Fedeltà, Miglioramento della Qualità, Costo e Tempo di Elaborazione.',
    'The evaluation layer can compare different enhancement workflows without changing the underlying assessment logic.':
      'Il livello di valutazione può confrontare workflow di enhancement diversi senza modificare la logica di valutazione sottostante.',
    'There is no universally best workflow: the optimal choice depends on the business context.':
      'Non esiste un workflow migliore in assoluto: la scelta ottimale dipende dal contesto di business.',
    'The Recommendation Engine combines fidelity, visual quality, cost and processing time after candidates pass the Fidelity Gate.':
      'Il Recommendation Engine combina fedeltà, qualità visiva, costo e tempo di elaborazione dopo che i candidati hanno superato il Fidelity Gate.',
    'The engine is functional, while criterion weighting is still being calibrated around different business priorities.':
      'L\'engine è funzionante, mentre la ponderazione dei criteri è ancora in fase di calibrazione rispetto alle diverse priorità di business.',
    'Real-estate interior images tested across the evaluation framework':
      'Immagini di interni immobiliari testate con il framework di valutazione',
    'Shared evaluation dimensions applied to every candidate workflow: fidelity, quality improvement, cost and processing time':
      'Dimensioni di valutazione condivise applicate a ogni workflow candidato: fedeltà, miglioramento della qualità, costo e tempo di elaborazione',
    'FIDELITY GATE': 'FIDELITY GATE',
    'Outputs that looked visually improved but were not faithful enough to the original property were detected and rejected':
      'Output visivamente migliori ma non abbastanza fedeli all\'immobile originale sono stati rilevati e scartati',
    'COST TESTING': 'TEST SUI COSTI',
    'OpenAI and Gemini generation costs were compared during workflow evaluation':
      'I costi di generazione di OpenAI e Gemini sono stati confrontati durante la valutazione dei workflow',
    'WHERE THE SYSTEM GOES NEXT': 'DOVE VA IL SISTEMA',
    'Next <span class="cs-title-grad">steps</span>': 'Prossimi <span class="cs-title-grad">passi</span>',
    'Fidelity Calibration': 'Fidelity Calibration',
    'Validate and refine the Fidelity Gate on a larger property dataset.':
      'Validare e affinare il Fidelity Gate su un dataset immobiliare più ampio.',
    'Business Profiles': 'Profili di Business',
    'Define recommendation weights for different business priorities.':
      'Definire i pesi della raccomandazione per diverse priorità di business.',
    'Provider Expansion': 'Espansione dei Provider',
    'Compare additional enhancement models through the provider-agnostic architecture.':
      'Confrontare ulteriori modelli di enhancement tramite l\'architettura provider-agnostic.',
    'Real Telemetry': 'Telemetria Reale',
    'Integrate real provider-level cost and processing-time tracking.':
      'Integrare il tracciamento reale di costi e tempi di elaborazione a livello di provider.',
    'Batch &amp; B2B Analytics': 'Analytics Batch &amp; B2B',
    'Extend evaluation to multi-image processing and aggregated workflow monitoring.':
      'Estendere la valutazione all\'elaborazione multi-immagine e al monitoraggio aggregato dei workflow.',
    'See the system think<br>in real time.': 'Guarda il sistema ragionare<br>in tempo reale.',
    'This case documents a working evaluation framework, from enhancement and fidelity control to quality assessment and workflow recommendation.':
      'Questo caso documenta un framework di valutazione funzionante, dall\'enhancement e dal controllo di fedeltà fino alla valutazione della qualità e alla raccomandazione del workflow.',
    'AI WORKFLOW PORTFOLIO · CASE 01 / 03': 'PORTFOLIO WORKFLOW AI · CASO 01 / 03',
    '<span class="live-dot"></span>END OF CASE 01': '<span class="live-dot"></span>FINE DEL CASO 01',

    /* ================= CASE · AI TRAVEL BRAIN ================= */
    '01 / KNOWLEDGE-DRIVEN GENERATION': '01 / GENERAZIONE GUIDATA DALLA CONOSCENZA',
    '02 / KNOWLEDGE PIPELINE': '02 / KNOWLEDGE PIPELINE',
    '04 / FROM BRAIN TO OUTPUT': '04 / DAL BRAIN ALL\'OUTPUT',
    '05 / WHY NOT JUST AI?': '05 / PERCHÉ NON SOLO AI?',
    '06 / WORKING OUTPUT': '06 / OUTPUT FUNZIONANTE',
    '07 / BUILD · TEST · LEARN': '07 / BUILD · TEST · LEARN',
    '08 / NEXT STEPS': '08 / PROSSIMI PASSI',
    'AI Travel<br><span class="cs-title-grad">Brain</span>': 'AI Travel<br><span class="cs-title-grad">Brain</span>',
    'A source-grounded travel knowledge system that transforms selected web sources into <b>structured destination data</b>, creating a reusable factual layer for AI-powered travel experiences.':
      'Un sistema di conoscenza di viaggio ancorato alle fonti che trasforma fonti web selezionate in <b>dati strutturati sulle destinazioni</b>, creando un livello fattuale riutilizzabile per esperienze di viaggio basate sull\'AI.',
    'MULTI-SOURCE INPUT': 'INPUT MULTI-SORGENTE',
    'SOURCE-LINKED KNOWLEDGE': 'CONOSCENZA COLLEGATA ALLE FONTI',
    '20 MAPS TESTED': '20 MAPPE TESTATE',
    '<span class="live-dot"></span>20 MAPS TESTED': '<span class="live-dot"></span>20 MAPPE TESTATE',
    'SOURCES': 'FONTI',
    'OUTPUTS': 'OUTPUT',
    'WEB SOURCE': 'FONTE WEB',
    'DOCUMENT': 'DOCUMENTO',
    'KNOWLEDGE SOURCE': 'FONTE DI CONOSCENZA',
    '+ MORE': '+ ALTRO',
    'STRUCTURED<br>DESTINATION KNOWLEDGE': 'CONOSCENZA STRUTTURATA<br>SULLE DESTINAZIONI',
    'STORY ENGINE': 'STORY ENGINE',
    'LANDING PAGES': 'LANDING PAGE',
    'ADV / CAMPAIGN': 'ADV / CAMPAGNE',
    'MORE': 'ALTRO',
    'PLANNED': 'PIANIFICATO',
    'PROJECT CONTEXT': 'CONTESTO DEL PROGETTO',
    'The journey starts<br>before <span class="cs-title-grad">departure</span>.':
      'Il viaggio inizia<br>prima della <span class="cs-title-grad">partenza</span>.',
    'For travel agencies and tour operators, the travel experience begins during discovery. Destinations, itineraries and places need to become material that can inform, engage and help travelers imagine the journey before it begins.':
      'Per agenzie e tour operator, l\'esperienza di viaggio comincia già nella fase di scoperta. Destinazioni, itinerari e luoghi devono diventare materiali capaci di informare, coinvolgere e far immaginare il viaggio prima ancora della partenza.',
    'The project explores how selected travel sources can become a structured, reusable knowledge layer capable of supporting multiple AI-assisted outputs without rebuilding the context from scratch each time.':
      'Il progetto nasce per esplorare come trasformare fonti di viaggio selezionate in una base di conoscenza strutturata e riutilizzabile, capace di supportare più output AI senza ricostruire ogni volta il contesto da zero.',
    'One knowledge layer.': 'Un solo livello di conoscenza.',
    'Multiple experiences built on top.': 'Più esperienze costruite sopra.',
    'ROUTE AND STRUCTURE BEFORE GENERATION': 'PERCORSO E STRUTTURA PRIMA DELLA GENERAZIONE',
    'From sources to <span class="cs-title-grad">structured knowledge</span>.':
      'Dalle fonti alla <span class="cs-title-grad">conoscenza strutturata</span>.',
    'Selected travel sources are transformed into reusable destination knowledge while preserving their provenance.':
      'Le fonti di viaggio selezionate vengono trasformate in conoscenza riutilizzabile sulle destinazioni, preservandone la provenienza.',
    'Source Ingestion': 'Source Ingestion',
    'TOUR + SOURCES IN': 'TOUR + FONTI IN INGRESSO',
    'Selected travel sources enter the pipeline together with the tour structure.':
      'Le fonti di viaggio selezionate entrano nella pipeline insieme alla struttura del tour.',
    'Tour stops': 'Tappe del tour',
    'Selected sources': 'Fonti selezionate',
    'Raw destination content': 'Contenuto grezzo sulla destinazione',
    'Source Relevance': 'Source Relevance',
    'SOURCE RELEVANCE': 'SOURCE RELEVANCE',
    'TRAVEL MAP ENGINE': 'TRAVEL MAP ENGINE',
    'PLACE / SOURCE MATCHING': 'ABBINAMENTO LUOGO / FONTE',
    'Each source is evaluated against every requested destination before extraction.':
      'Ogni fonte viene valutata rispetto a ciascuna destinazione richiesta prima dell\'estrazione.',
    'Requested stops': 'Tappe richieste',
    'Source documents': 'Documenti sorgente',
    'Relevant source IDs per place': 'ID delle fonti rilevanti per luogo',
    'Knowledge Extraction': 'Knowledge Extraction',
    'SOURCE-GROUNDED EXTRACTION': 'ESTRAZIONE ANCORATA ALLE FONTI',
    'Relevant sources are converted into structured facts without using external model knowledge.':
      'Le fonti rilevanti vengono convertite in fatti strutturati senza usare la conoscenza esterna del modello.',
    'Destination': 'Destinazione',
    'Relevant sources': 'Fonti rilevanti',
    'Identity': 'Identità',
    'Highlights': 'Punti salienti',
    'Experiences': 'Esperienze',
    'Knowledge Node': 'Knowledge Node',
    'REUSABLE KNOWLEDGE OBJECT': 'OGGETTO DI CONOSCENZA RIUTILIZZABILE',
    'Extracted information is consolidated into a reusable destination object with source references and completeness status.':
      'Le informazioni estratte vengono consolidate in un oggetto destinazione riutilizzabile con riferimenti alle fonti e stato di completezza.',
    'Structured JSON': 'JSON strutturato',
    'Source references': 'Riferimenti alle fonti',
    'Missing information': 'Informazioni mancanti',
    'Status': 'Stato',
    'SELECTED SOURCES': 'FONTI SELEZIONATE',
    'KNOWLEDGE EXTRACTION': 'KNOWLEDGE EXTRACTION',
    'KNOWLEDGE NODE': 'KNOWLEDGE NODE',
    'STORAGE': 'ARCHIVIAZIONE',
    'DOWNSTREAM USE': 'USO A VALLE',
    'RETRIEVAL SEPARATED FROM GENERATION': 'RECUPERO SEPARATO DALLA GENERAZIONE',
    'The Brain separates knowledge retrieval from content generation.':
      'Il Brain separa il recupero della conoscenza dalla generazione dei contenuti.',
    'INPUT': 'INPUT',
    'Tour + Sources': 'Tour + Fonti',
    'FETCH': 'FETCH',
    'Read Sources': 'Lettura fonti',
    'MATCH': 'MATCH',
    'EXTRACT': 'EXTRACT',
    'Place Knowledge': 'Conoscenza del luogo',
    'STRUCTURE': 'STRUTTURA',
    'Knowledge Nodes': 'Knowledge Node',
    'STORE': 'STORE',
    'Reusable Data': 'Dati riutilizzabili',
    'RETURN': 'RETURN',
    'KNOWLEDGE PROCESSING': 'ELABORAZIONE DELLA CONOSCENZA',
    'STRUCTURED STORAGE': 'ARCHIVIAZIONE STRUTTURATA',
    'Other Tools': 'Altri strumenti',
    'SOURCE / DATA UTILITIES': 'UTILITY PER FONTI / DATI',
    'ONE KNOWLEDGE LAYER · MULTIPLE OUTPUTS': 'UN LIVELLO DI CONOSCENZA · PIÙ OUTPUT',
    'One Brain. <span class="cs-title-grad">Multiple applications</span>.':
      'Un solo Brain. <span class="cs-title-grad">Molteplici applicazioni</span>.',
    'The structured knowledge layer is designed to become reusable infrastructure for different travel experiences.':
      'Il livello di conoscenza strutturata è progettato per diventare un\'infrastruttura riutilizzabile per diverse esperienze di viaggio.',
    'BUILT &amp; TESTED': 'REALIZZATO &amp; TESTATO',
    'TRAVEL KNOWLEDGE BRAIN': 'TRAVEL KNOWLEDGE BRAIN',
    'STATUS: WORKING': 'STATO: FUNZIONANTE',
    'Transforms selected travel sources into structured, source-linked destination knowledge.':
      'Trasforma le fonti di viaggio selezionate in conoscenza sulle destinazioni strutturata e collegata alle fonti.',
    'AI TRAVEL MAP': 'AI TRAVEL MAP',
    'STATUS: 20 MAPS TESTED': 'STATO: 20 MAPPE TESTATE',
    'Transforms verified geographic structure into visually consistent travel maps while preserving route and stop fidelity.':
      'Trasforma una struttura geografica verificata in mappe di viaggio visivamente coerenti, preservando la fedeltà di percorso e tappe.',
    'DESIGNED NEXT': 'PROGETTATO PER IL FUTURO',
    'TRAVEL STORY ENGINE': 'TRAVEL STORY ENGINE',
    'LANDING GENERATOR': 'LANDING GENERATOR',
    'ADV / CAMPAIGN OUTPUT': 'OUTPUT ADV / CAMPAGNE',
    'PLANNED APPLICATION': 'APPLICAZIONE PIANIFICATA',
    'AI Travel Map': 'AI Travel Map',
    'FIRST WORKING MODULE': 'PRIMO MODULO FUNZIONANTE',
    'STATUS: WORKING / TESTED': 'STATO: FUNZIONANTE / TESTATO',
    'Transforms selected travel sources into structured destination knowledge, connected to the sources it comes from.':
      'Trasforma le fonti di viaggio selezionate in conoscenza strutturata sulle destinazioni, collegata alle fonti da cui proviene.',
    'Transforms verified geographic data into structured map references before the AI visual transformation.':
      'Trasforma dati geografici verificati in riferimenti cartografici strutturati, prima della trasformazione visiva AI.',
    'DESIGNED FOR FUTURE USE': 'PROGETTATO PER IL FUTURO',
    'Planned applications of the same knowledge layer. Not built yet.':
      'Applicazioni pianificate dello stesso livello di conoscenza. Non ancora realizzate.',
    'BRAIN / DATA LOOKUP': 'LOOKUP BRAIN / DATI',
    'SVG STRUCTURE': 'STRUTTURA SVG',
    'AI TRANSFORMATION': 'TRASFORMAZIONE AI',
    'Route geometry': 'Geometria del percorso',
    'Ordered stops': 'Tappe ordinate',
    'Visual layer only': 'Solo livello visivo',
    'Route preserved': 'Percorso preservato',
    'GEOGRAPHIC DATA': 'DATI GEOGRAFICI',
    'AI VISUAL TRANSFORMATION': 'TRASFORMAZIONE VISIVA AI',
    'WHAT STRUCTURED KNOWLEDGE SOLVES': 'COSA RISOLVE LA CONOSCENZA STRUTTURATA',
    'Why not just <span class="cs-title-grad">ask AI</span>?': 'Perché non <span class="cs-title-grad">chiedere all\'AI</span>?',
    'Because generation and factual grounding are two different problems.':
      'Perché generazione e ancoraggio ai fatti sono due problemi diversi.',
    'Route control': 'Controllo del percorso',
    'Knowledge without provenance': 'Conoscenza senza provenienza',
    'Inconsistent outputs': 'Output incoerenti',
    'SYSTEM RESPONSE': 'RISPOSTA DEL SISTEMA',
    'When the route lives only inside a prompt, stop placement and sequence are harder to control and to reproduce consistently across maps.':
      'Quando il percorso esiste solo dentro un prompt, posizione e sequenza delle tappe sono più difficili da controllare e da riprodurre in modo coerente tra una mappa e l\'altra.',
    'Coordinates and geographic structure are defined before generation.':
      'Coordinate e struttura geografica vengono definite prima della generazione.',
    'AI transforms the visual layer, not the underlying geography.':
      'L\'AI trasforma il livello visivo, non la geografia sottostante.',
    'A generated travel answer can mix model knowledge with information from unknown origins.':
      'Una risposta di viaggio generata può mescolare la conoscenza del modello con informazioni di origine sconosciuta.',
    'The Brain extracts only from supplied sources and preserves source references for each destination.':
      'Il Brain estrae solo dalle fonti fornite e conserva i riferimenti alle fonti per ogni destinazione.',
    'Generated experiences can be built on traceable structured knowledge.':
      'Le esperienze generate possono basarsi su conoscenza strutturata e tracciabile.',
    'Independent prompts can produce different structures, terminology and levels of detail.':
      'Prompt indipendenti possono produrre strutture, terminologia e livelli di dettaglio diversi.',
    'Knowledge is normalized into a shared schema before downstream generation.':
      'La conoscenza viene normalizzata in uno schema condiviso prima della generazione a valle.',
    'Different outputs can consume the same structured destination layer.':
      'Output diversi possono attingere allo stesso livello strutturato sulle destinazioni.',
    'DESIGN PRINCIPLE': 'PRINCIPIO DI DESIGN',
    'In this system, AI transforms a trusted structure instead of inventing the structure it depends on.':
      'In questo sistema, l\'AI trasforma una struttura affidabile invece di inventare la struttura da cui dipende.',
    'AI MAP ENGINE': 'AI MAP ENGINE',
    'From verified stops<br>to <span class="cs-title-grad">generated maps</span>.':
      'Da tappe verificate<br>a <span class="cs-title-grad">mappe generate</span>.',
    'The map engine separates geographic truth from visual generation: coordinates define the structure, AI defines the visual language.':
      'Il map engine separa la verità geografica dalla generazione visiva: le coordinate definiscono la struttura, l\'AI definisce il linguaggio visivo.',
    'Generated across multiple countries to evaluate geographic fidelity and visual consistency.':
      'Generate su più paesi per valutare la fedeltà geografica e la coerenza visiva.',
    'MOROCCO': 'MAROCCO',
    'ITALY': 'ITALIA',
    'UZBEKISTAN': 'UZBEKISTAN',
    'MEXICO': 'MESSICO',
    'CHINA': 'CINA',
    'IRELAND': 'IRLANDA',
    'SPAIN': 'SPAGNA',
    'GEOGRAPHY': 'GEOGRAFIA',
    'GENERATION': 'GENERAZIONE',
    'Retrieve or provide verified coordinates for each tour stop.':
      'Recuperare o fornire coordinate verificate per ogni tappa del tour.',
    'Build the route and geographic structure before AI generation.':
      'Costruire il percorso e la struttura geografica prima della generazione AI.',
    'Transform the structured reference into a visual travel map while preserving the underlying route.':
      'Trasformare il riferimento strutturato in una mappa di viaggio visiva, preservando il percorso sottostante.',
    'VIEW WORKING PROTOTYPE': 'VEDI IL PROTOTIPO FUNZIONANTE',
    'TRAVEL MAP GENERATOR': 'TRAVEL MAP GENERATOR',
    'PROTOTYPE': 'PROTOTIPO',
    'MAP OUTPUT VIEWER': 'VISUALIZZATORE OUTPUT MAPPE',
    '6 EXAMPLES': '6 ESEMPI',
    'MAP ASSET PENDING': 'MAPPA IN ATTESA DI CARICAMENTO',
    'Generated map examples': 'Esempi di mappe generate',
    'AI-generated travel map output: Morocco': 'Mappa di viaggio generata con AI: Marocco',
    'AI-generated travel map output: Uzbekistan': 'Mappa di viaggio generata con AI: Uzbekistan',
    'AI-generated travel map output: Mexico': 'Mappa di viaggio generata con AI: Messico',
    'AI-generated travel map output: China': 'Mappa di viaggio generata con AI: Cina',
    'AI-generated travel map output: Ireland': 'Mappa di viaggio generata con AI: Irlanda',
    'AI-generated travel map output: Spain': 'Mappa di viaggio generata con AI: Spagna',
    'PROJECT MATURITY, MADE TRANSPARENT': 'MATURITÀ DEL PROGETTO, RESA TRASPARENTE',
    'Built. <span class="cs-title-grad">Learned</span>.':
      'Realizzato. <span class="cs-title-grad">Appreso</span>.',
    'AI Travel Map based on verified coordinates': 'AI Travel Map basata su coordinate verificate',
    'BUILT': 'REALIZZATO',
    'LEARNED': 'APPRESO',
    'Multi-source ingestion': 'Ingestione multi-sorgente',
    'Source relevance matching': 'Abbinamento della rilevanza delle fonti',
    'Structured place extraction': 'Estrazione strutturata dei luoghi',
    'Source-linked Knowledge Nodes': 'Knowledge Node collegati alle fonti',
    'Structured JSON output': 'Output JSON strutturato',
    'AI Travel Map pipeline': 'Pipeline AI Travel Map',
    'Coordinate-driven map structure': 'Struttura della mappa guidata dalle coordinate',
    'AI visual transformation': 'Trasformazione visiva AI',
    'Source grounding requires explicit architecture': 'L\'ancoraggio alle fonti richiede un\'architettura esplicita',
    'Long multi-source prompts do not scale efficiently': 'I prompt multi-sorgente lunghi non scalano in modo efficiente',
    'Fixing geography before generation gave more control over the route': 'Definire la geografia prima della generazione ha dato più controllo sul percorso',
    'Separating structure from visual generation made control and repeatability explicit parts of the workflow': 'Separare la struttura dalla generazione visiva ha reso controllo e ripetibilità parti esplicite del workflow',
    'Reusable structured data is more valuable than isolated prompts': 'I dati strutturati riutilizzabili valgono più dei prompt isolati',
    'Source-by-source scalable extraction': 'Estrazione scalabile fonte per fonte',
    'Travel Story Engine': 'Travel Story Engine',
    'Landing generation': 'Generazione di landing',
    'ADV / campaign outputs': 'Output adv / campagne',
    'Additional downstream experiences': 'Ulteriori esperienze a valle',
    'Expanded destination knowledge base': 'Knowledge base delle destinazioni ampliata',
    'WHERE THE BRAIN GOES NEXT': 'DOVE VA IL BRAIN',
    'What\'s next for the <span class="cs-title-grad">Travel Brain</span>.':
      'Il futuro del <span class="cs-title-grad">Travel Brain</span>.',
    'Scale Sources': 'Scalare le Fonti',
    'Move fully to source-by-source extraction and consolidation.':
      'Passare completamente all\'estrazione e al consolidamento fonte per fonte.',
    'Expand Knowledge': 'Espandere la Conoscenza',
    'Build a reusable destination knowledge base beyond individual tours.':
      'Costruire una knowledge base delle destinazioni riutilizzabile oltre i singoli tour.',
    'Validate Maps': 'Validare le Mappe',
    'Expand geographic testing across more route types and destinations.':
      'Estendere i test geografici a più tipi di percorso e destinazioni.',
    'Story Engine': 'Story Engine',
    'Connect structured Knowledge Nodes to itinerary and destination storytelling.':
      'Collegare i Knowledge Node strutturati allo storytelling di itinerari e destinazioni.',
    'Multi-Output System': 'Sistema Multi-Output',
    'Use the same trusted knowledge layer across maps, landing pages and campaign content.':
      'Usare lo stesso livello di conoscenza affidabile per mappe, landing page e contenuti di campagna.',
    'Ground the facts.<br>Then let AI create.': 'Ancora i fatti.<br>Poi lascia creare l\'AI.',
    'The Travel Brain creates a reusable factual layer from selected sources. The Map Engine shows how that structured foundation can drive generative outputs without giving AI control over the underlying truth.':
      'Il Travel Brain crea un livello fattuale riutilizzabile a partire da fonti selezionate. Il Map Engine mostra come quella base strutturata possa guidare output generativi senza dare all\'AI il controllo sulla verità sottostante.',
    'AI WORKFLOW PORTFOLIO · CASE 02 / 03': 'PORTFOLIO WORKFLOW AI · CASO 02 / 03',
    '<span class="live-dot"></span>END OF CASE 02': '<span class="live-dot"></span>FINE DEL CASO 02',
    'Barcelona <b>41.38, 2.17</b>': 'Barcelona <b>41.38, 2.17</b>',
    'Valencia <b>39.47, -0.38</b>': 'Valencia <b>39.47, -0.38</b>',
    'Granada <b>37.18, -3.60</b>': 'Granada <b>37.18, -3.60</b>',
    'Seville <b>37.39, -5.98</b>': 'Seville <b>37.39, -5.98</b>',
    'Madrid <b>40.42, -3.70</b>': 'Madrid <b>40.42, -3.70</b>',

    /* ================= CASE · NQUADRO ================= */
    /* rail */
    '01 / NQUADRO': '01 / NQUADRO',
    '02 / THE CONTEXT': '02 / IL CONTESTO',
    '03 / EVIDENCE & INPUTS': '03 / EVIDENZE & INPUT',
    '03 / EVIDENCE &amp; INPUTS': '03 / EVIDENZE &amp; INPUT',
    '04 / DESIGN DECISION 01': '04 / DECISIONE DI DESIGN 01',
    '05 / WIREFRAMES TO UI': '05 / DAI WIREFRAME ALLA UI',
    '07 / FINAL EXPERIENCE': '07 / ESPERIENZA FINALE',
    '08 / WHAT IT PROVES': '08 / COSA DIMOSTRA',

    /* 01 · hero */
    '01 / CLIENT PROJECT': '01 / PROGETTO CLIENTE',
    'Reframing a complex catalog around product discovery.':
      'Ripensare un catalogo complesso attorno alla scoperta dei prodotti.',
    'A B2B product catalog redesign focused on making a broad offering easier to understand, explore and navigate through a clearer information architecture and a visual-first discovery experience.':
      'Il redesign di un catalogo prodotti B2B pensato per rendere un\'offerta ampia più semplice da comprendere, esplorare e navigare, grazie a un\'architettura dell\'informazione più chiara e a un\'esperienza di scoperta visual-first.',
    'B2B PRODUCT CATALOG': 'CATALOGO PRODOTTI B2B',
    'DESIGN SYSTEM': 'DESIGN SYSTEM',
    'WIREFRAMES': 'WIREFRAME',
    'REAL CLIENT': 'CLIENTE REALE',
    '<b>15+</b> SCREENS': '<b>15+</b> SCHERMATE',
    'DESKTOP + MOBILE': 'DESKTOP + MOBILE',
    'HOMEPAGE · CATEGORY HERO STATES': 'HOMEPAGE · STATI HERO DI CATEGORIA',
    'NQUADRO hero variations': 'Varianti della hero di NQUADRO',
    'Show slide 1': 'Mostra la slide 1',
    'Show slide 2': 'Mostra la slide 2',
    'Show slide 3': 'Mostra la slide 3',
    'NQUADRO, school category hero, homepage interface design': 'NQUADRO, hero categoria scuola, design dell\'interfaccia della homepage',
    'NQUADRO, office category hero, homepage interface design': 'NQUADRO, hero categoria ufficio, design dell\'interfaccia della homepage',
    'NQUADRO, work category hero, homepage interface design': 'NQUADRO, hero categoria lavoro, design dell\'interfaccia della homepage',

    /* 02 · the context */
    'A LARGE OFFERING, HARD TO NAVIGATE': 'UN\'OFFERTA AMPIA, DIFFICILE DA NAVIGARE',
    'From a large offering<br>to a <span class="cs-title-grad">discovery problem</span>.':
      'Da un\'offerta ampia<br>a un <span class="cs-title-grad">problema di scoperta</span>.',
    'The existing experience had to accommodate a broad catalog of products, services and editorial content, but the digital structure made it difficult to understand the offering and quickly reach the most relevant products.':
      'L\'esperienza esistente doveva contenere un catalogo ampio di prodotti, servizi e contenuti editoriali, ma la struttura digitale rendeva difficile comprendere l\'offerta e raggiungere rapidamente i prodotti più rilevanti.',
    'The problem wasn\'t quantity.<br><span>It was discovery.</span>':
      'Il problema non era la quantità.<br><span>Era la scoperta.</span>',
    'PREVIOUS WEBSITE<br>SCREENSHOT': 'SCREENSHOT DEL<br>SITO PRECEDENTE',
    'PREVIOUS WEBSITE': 'SITO PRECEDENTE',
    'PRE-REDESIGN · DESKTOP': 'PRIMA DEL REDESIGN · DESKTOP',
    'NQUADRO, previous website homepage, catalog and product listings':
      'NQUADRO, homepage del sito precedente, cataloghi ed elenco prodotti',
    'FINAL ASSET PENDING': 'ASSET FINALE IN ATTESA',
    'KEY ISSUES IDENTIFIED': 'PROBLEMI CHIAVE INDIVIDUATI',
    'Fragmented navigation': 'Navigazione frammentata',
    'Low product discoverability': 'Bassa scopribilità dei prodotti',
    'Overlapping content and catalogs': 'Contenuti e cataloghi sovrapposti',
    'Unclear category structure': 'Struttura delle categorie poco chiara',

    /* 03 · evidence & inputs */
    'WHAT SHAPED THE DESIGN HYPOTHESES': 'COSA HA DEFINITO LE IPOTESI DI DESIGN',
    'Design didn\'t start<br>from the <span class="cs-title-grad">interface</span>.':
      'Il design non è partito<br>dall\'<span class="cs-title-grad">interfaccia</span>.',
    'The project started from an analysis of the existing experience. An external UX audit, available behavioral data and the reorganization of the architecture provided the inputs used to define the first design hypotheses and translate them into wireframes.':
      'Il progetto è partito dall\'analisi dell\'esperienza esistente. Un audit UX esterno, i dati comportamentali disponibili e la riorganizzazione dell\'architettura hanno fornito gli input per definire le prime ipotesi di design e tradurle nei wireframe.',
    'UX Audit': 'UX Audit',
    'Behavioral Evidence': 'Evidenza Comportamentale',
    'An external UX analysis highlighted issues in navigation, content hierarchy and access to product areas.':
      'Un\'analisi UX esterna ha evidenziato criticità nella navigazione, nella gerarchia dei contenuti e nell\'accesso alle aree di prodotto.',
    'Available data on the existing experience showed interactions concentrated heavily in the upper part of pages, providing further input for rethinking product discovery.':
      'I dati disponibili sull\'esperienza esistente hanno mostrato una forte concentrazione delle interazioni nella parte iniziale delle pagine, fornendo ulteriori input per ripensare la product discovery.',
    'The insights gathered converged into a shared reorganization of content and user journeys, later translated at the page level through wireframes.':
      'Gli insight raccolti sono confluiti in una riorganizzazione condivisa di contenuti e percorsi, poi tradotta a livello di pagina attraverso i wireframe.',

    /* 04 · design decision 01 */
    'STRUCTURE BEFORE SCREENS': 'LA STRUTTURA PRIMA DELLE SCHERMATE',
    'Restructuring<br><span class="cs-title-grad">product discovery</span>.':
      'Ristrutturare la<br><span class="cs-title-grad">scoperta dei prodotti</span>.',
    'The broad catalog structure made the offering difficult to interpret quickly. Instead of simply reproducing the existing catalog structure, product discovery was reorganized around macro-categories based on use and context.':
      'La struttura ampia del catalogo rendeva difficile interpretare rapidamente l\'offerta. Invece di riprodurre semplicemente la struttura esistente, la scoperta dei prodotti è stata riorganizzata attorno a macro-categorie basate su uso e contesto.',
    'FROM / OLD LOGIC': 'PRIMA / VECCHIA LOGICA',
    'TO / NEW LOGIC': 'DOPO / NUOVA LOGICA',
    'Catalogs': 'Cataloghi',
    'Products': 'Prodotti',
    'Services': 'Servizi',
    'Editorial content': 'Contenuti editoriali',
    'Products for education': 'Prodotti per la scuola',
    'Products for workspace': 'Prodotti per l\'ufficio',
    'Products for professional contexts': 'Prodotti per contesti professionali',
    'INFORMATION ARCHITECTURE': 'ARCHITETTURA DELL\'INFORMAZIONE',
    'CATEGORIES': 'CATEGORIE',
    'Use-oriented grouping': 'Raggruppamento orientato all\'uso',
    'PRODUCT DETAIL': 'DETTAGLIO PRODOTTO',
    'Explanatory portfolio visualization of the proposed IA, not an original project artifact.':
      'Visualizzazione esplicativa dell\'IA proposta per il portfolio, non un artefatto originale di progetto.',

    /* 05 · wireframes to UI */
    'STRUCTURE, REFINED, THEN STYLED': 'STRUTTURA, RIFINITA, POI STILATA',
    'Shaping the experience<br><span class="cs-title-grad">step by step</span>.':
      'Dare forma all\'esperienza<br><span class="cs-title-grad">passo dopo passo</span>.',
    'The structure was explored through high-fidelity wireframes and refined through stakeholder discussions before being translated into a consistent visual system.':
      'La struttura è stata esplorata con wireframe ad alta fedeltà e rifinita attraverso discussioni con gli stakeholder prima di essere tradotta in un sistema visivo coerente.',
    'WIREFRAMES / SELECTED SCREENS': 'WIREFRAME / SCHERMATE SELEZIONATE',
    'HOMEPAGE WIREFRAME': 'WIREFRAME HOMEPAGE',
    'CATEGORY WIREFRAME': 'WIREFRAME CATEGORIA',
    'CATALOG WIREFRAME': 'WIREFRAME CATALOGO',
    'PRODUCT DETAIL WIREFRAME': 'WIREFRAME DETTAGLIO PRODOTTO',
    'NQUADRO, homepage wireframe': 'NQUADRO, wireframe della homepage',
    'NQUADRO, category page wireframe': 'NQUADRO, wireframe della pagina categoria',
    'NQUADRO, product page wireframe': 'NQUADRO, wireframe della pagina prodotto',
    'UI FOUNDATION / VISUAL RULES': 'UI FOUNDATION / REGOLE VISIVE',
    'TYPOGRAPHY': 'TIPOGRAFIA',
    'TYPOGRAPHY / BARLOW': 'TIPOGRAFIA / BARLOW',
    'COLORS': 'COLORI',
    'CORE UI PALETTE': 'PALETTE UI PRINCIPALE',
    'BUTTONS': 'PULSANTI',
    'PRIMARY': 'PRIMARIO',
    'SECONDARY': 'SECONDARIO',
    'INPUTS': 'INPUT',
    'Search field': 'Campo di ricerca',
    'ICONS': 'ICONE',
    'CORE UI COMPONENTS': 'COMPONENTI UI PRINCIPALI',
    'CARD': 'CARD',
    'NAV': 'NAV',
    'FILTER': 'FILTRO',
    'PRICE TAG': 'PREZZO',
    'STAKEHOLDER REFINEMENT': 'STAKEHOLDER REFINEMENT',
    'IA refinement with client stakeholders': 'Rifinitura dell\'IA con gli stakeholder del cliente',
    'The information architecture and key page structures were refined with client stakeholders, using their knowledge of the product offering and business context to improve the proposed structure.':
      'L\'architettura dell\'informazione e le strutture delle pagine chiave sono state rifinite con gli stakeholder del cliente, usando la loro conoscenza dell\'offerta di prodotto e del contesto di business per migliorare la struttura proposta.',
    'FINAL UI': 'UI FINALE',

    /* 06 · category art direction */
    'VISUAL IDENTITY &amp; PRODUCT DISCOVERY': 'IDENTITÀ VISIVA E PRODUCT DISCOVERY',
    'One visual language.<br><span class="cs-title-grad">Different commercial contexts</span>.':
      'Un solo linguaggio visivo.<br><span class="cs-title-grad">Contesti commerciali diversi</span>.',
    'The catalog\'s three core areas, School, Office and Work, needed an identity that felt immediately recognizable without fragmenting the brand\'s visual language.':
      'Le tre aree principali del catalogo, School, Office e Work, richiedevano un\'identità immediatamente riconoscibile senza frammentare il linguaggio del brand.',
    'I built a coherent hero system, differentiating each category through distinct subjects and compositions. Product modules embedded in the imagery connect the scenic storytelling to the catalog, previewing the offering and creating fast entry points into the products.':
      'Ho costruito un sistema di hero coerente, differenziando ogni categoria attraverso soggetti e composizioni specifiche. I moduli prodotto integrati nell\'immagine collegano la componente scenica al catalogo, anticipando l\'offerta e creando punti di accesso rapidi ai prodotti.',
    'CATEGORY HERO': 'HERO DI CATEGORIA',
    'AI-assisted imagery · Interface design and composition in Figma':
      'Immagini prodotti e cataloghi generate con AI · Design e composizione dell\'interfaccia in Figma',
    'NQUADRO, AI-generated school category hero composition': 'NQUADRO, composizione hero categoria scuola generata dall\'AI',
    'NQUADRO, AI-generated office category hero composition': 'NQUADRO, composizione hero categoria ufficio generata dall\'AI',
    'NQUADRO, AI-generated work category hero composition': 'NQUADRO, composizione hero categoria lavoro generata dall\'AI',

    /* 07 · final experience */
    'A complete, coherent<br><span class="cs-title-grad">digital product</span>.':
      'Un prodotto digitale<br><span class="cs-title-grad">completo e coerente</span>.',
    'The final interface brings together a clearer information architecture, a consistent visual system and a product-focused discovery experience across desktop and mobile.':
      'L\'interfaccia finale unisce un\'architettura dell\'informazione più chiara, un sistema visivo coerente e un\'esperienza di scoperta centrata sul prodotto su desktop e mobile.',
    'NQUADRO, product page, final interface design': 'NQUADRO, pagina prodotto, design dell\'interfaccia finale',
    'NQUADRO, category page, final interface design': 'NQUADRO, pagina categoria, design dell\'interfaccia finale',
    'NQUADRO, mobile homepage, final interface design': 'NQUADRO, homepage mobile, design dell\'interfaccia finale',
    'Select NQUADRO screen to preview': 'Seleziona la schermata NQUADRO da visualizzare',
    'Show NQUADRO product page': 'Mostra la pagina prodotto di NQUADRO',
    'Show NQUADRO category page': 'Mostra la pagina categoria di NQUADRO',
    'Show NQUADRO mobile interface': 'Mostra l\'interfaccia mobile di NQUADRO',

    /* 08 · what this project proves */
    'Not just a <span class="cs-title-grad">redesign</span>.': 'Non solo un <span class="cs-title-grad">redesign</span>.',
    'A real client project shaped by existing-product constraints, external inputs, stakeholder knowledge and design decisions translated into a complete digital experience.':
      'Un progetto reale per un cliente, plasmato dai vincoli di un prodotto esistente, da input esterni, dalla conoscenza degli stakeholder e da decisioni di design tradotte in un\'esperienza digitale completa.',
    'UX Inputs': 'UX Input',
    'External audit and analysis': 'Audit e analisi esterni',
    'Information Architecture': 'Architettura dell\'Informazione',
    'Use-oriented structure': 'Struttura orientata all\'uso',
    'Stakeholder Refinement': 'Stakeholder Refinement',
    'Business-aligned decisions': 'Decisioni allineate al business',
    'Design System': 'Design System',
    'Consistent and scalable UI': 'UI coerente e scalabile',
    'Final Interface': 'Interfaccia Finale',
    'A complete responsive experience': 'Un\'esperienza responsive completa',

    /* project navigation */
    'Project navigation': 'Navigazione dei progetti',
    'PREVIOUS PROJECT': 'PROGETTO PRECEDENTE',
    'NEXT PROJECT': 'PROGETTO SUCCESSIVO',
    'ALL PROJECTS': 'TUTTI I PROGETTI',
    'CLIENT PROJECT · NQUADRO': 'PROGETTO CLIENTE · NQUADRO',

    /* ---- section rail (case pages) ---- */
    '02 / KNOWLEDGE PIPELINE ': '02 / KNOWLEDGE PIPELINE',

    /* ================= ATTRIBUTES ================= */
    'Pause animation': 'Metti in pausa l\'animazione',
    'Play animation': 'Riprendi l\'animazione',
    'Expand execution log': 'Espandi il log di esecuzione',
    'Collapse execution log': 'Comprimi il log di esecuzione',
    'Select project': 'Seleziona progetto',
    'Select interface project': 'Seleziona progetto di interfaccia',
    'Page sections': 'Sezioni della pagina',
    'Coming soon': 'In arrivo',
    'Jump to step 1: INPUT': 'Vai al passo 1: INPUT',
    'Jump to step 2: ENHANCED IMAGE': 'Vai al passo 2: IMMAGINE MIGLIORATA',
    'Jump to step 3: FIDELITY SCORE': 'Vai al passo 3: FIDELITY SCORE',
    'Jump to step 4: QUALITY SCORE': 'Vai al passo 4: QUALITY SCORE',
    'Jump to step 5: RECOMMENDATION': 'Vai al passo 5: RECOMMENDATION',
    'Jump to step 1: TOUR INPUT': 'Vai al passo 1: TOUR INPUT',
    'Jump to step 2: COORDINATES': 'Vai al passo 2: COORDINATE',
    'Jump to step 3: SVG MAP': 'Vai al passo 3: MAPPA SVG',
    'Jump to step 4: AI MAP': 'Vai al passo 4: MAPPA AI',
    'Jump to step 5: TRAVEL BRAIN': 'Vai al passo 5: TRAVEL BRAIN',
    'AI-enhanced property photo': 'Foto dell\'immobile migliorata con AI',
    'AI-enhanced property photo under evaluation': 'Foto dell\'immobile migliorata con AI in fase di valutazione',
    'AI-enhanced property photo selected as best result': 'Foto dell\'immobile migliorata con AI selezionata come risultato migliore',
    'Original property photo': 'Foto originale dell\'immobile',
    'Original property photo before enhancement': 'Foto originale dell\'immobile prima dell\'enhancement',
    'AI-generated illustrated map of the Spain Highlights Tour route': 'Mappa illustrata generata dall\'AI del percorso dello Spain Highlights Tour',
    'AI-generated illustrated map of the Spain route, with stops and connecting route preserved from the SVG structure': 'Mappa illustrata generata dall\'AI del percorso spagnolo, con tappe e percorso di collegamento preservati dalla struttura SVG',
    'Generated route map preview inside the Travel Map Generator prototype': 'Anteprima della mappa del percorso generata nel prototipo Travel Map Generator',
    'Generated Spain Highlights Tour map': 'Mappa generata dello Spain Highlights Tour',
    'Portrait of the designer': 'Ritratto del designer',
    'NQUADRO, homepage interface design': 'NQUADRO, design dell\'interfaccia della homepage',
    'NQUADRO, product catalog interface design': 'NQUADRO, design dell\'interfaccia del catalogo prodotti',
    'Elementa, homepage interface design': 'Elementa, design dell\'interfaccia della homepage',
    'Elementa, trial and pricing interface design': 'Elementa, design dell\'interfaccia di trial e prezzi',
    'E-Roome, homepage and booking interface design': 'E-Roome, design dell\'interfaccia di homepage e prenotazione',
    'E-Roome, rooms listing interface design': 'E-Roome, design dell\'interfaccia dell\'elenco stanze',
    'NOVA, magazine homepage interface design': 'NOVA, design dell\'interfaccia della homepage del magazine',
    'NOVA, article page interface design': 'NOVA, design dell\'interfaccia della pagina articolo',

    /* ================= CASE · ELEMENTA ================= */
    /* rail + shared section labels (also reused verbatim by the
       matching in-section eyebrow, where the text is identical) */
    '02 / ELEMENTA': '02 / ELEMENTA',
    '03 / THE PROBLEM': '03 / IL PROBLEMA',
    '04 / DISCOVERY': '04 / RICERCA',
    '05 / BEHAVIORAL SIGNAL': '05 / SEGNALE COMPORTAMENTALE',
    '06 / PRODUCT JOURNEY': '06 / PERCORSO DI PRODOTTO',
    '07 / INFORMATION ARCHITECTURE': '07 / ARCHITETTURA DELL\'INFORMAZIONE',
    '08 / HOME REDESIGN': '08 / REDESIGN DELLA HOME',
    '09 / PRODUCT PAGE': '09 / PAGINA PRODOTTO',
    '10 / SUBSCRIPTION FLOW': '10 / FLUSSO DI ABBONAMENTO',
    '11 / FINAL EXPERIENCE': '11 / ESPERIENZA FINALE',
    '12 / WHAT CHANGED': '12 / COSA È CAMBIATO',
    '13 / WHAT IT PROVES': '13 / COSA DIMOSTRA',
    '13 / WHAT THIS PROJECT PROVES': '13 / COSA DIMOSTRA QUESTO PROGETTO',

    /* 02 · hero */
    '02 / CLIENT PROJECT': '02 / PROGETTO CLIENTE',
    'From a crowded software catalog to a structured product journey.':
      'Da un catalogo software affollato a un percorso di prodotto strutturato.',
    'A B2B SaaS redesign focused on clarifying product value, making the free trial easier to discover and creating a more structured path from product exploration to subscription.':
      'Il redesign di un SaaS B2B focalizzato sul chiarire il valore del prodotto, rendere la prova gratuita più facile da scoprire e creare un percorso più strutturato dall\'esplorazione del prodotto all\'abbonamento.',
    'FREE TRIAL': 'PROVA GRATUITA',
    'SUBSCRIPTION FLOW': 'FLUSSO DI ABBONAMENTO',
    'HOMEPAGE · FINAL UI': 'HOMEPAGE · UI FINALE',
    'Elementa, final homepage interface design': 'Elementa, design dell\'interfaccia finale della homepage',

    /* 03 · the problem */
    'A DENSE INTERFACE, MANY COMPETING ACTIONS': 'UN\'INTERFACCIA DENSA, MOLTE AZIONI IN COMPETIZIONE',
    'Too much information.<br>Too little <span class="cs-title-grad">clarity</span>.':
      'Troppe informazioni.<br>Troppo poca <span class="cs-title-grad">chiarezza</span>.',
    'The existing experience presented multiple software products, features and actions within a dense interface. The amount of competing information made product value harder to scan and created a fragmented path toward trial and subscription.':
      'L\'esperienza esistente presentava più prodotti software, funzionalità e azioni all\'interno di un\'interfaccia densa. La quantità di informazioni in competizione rendeva più difficile cogliere il valore del prodotto e creava un percorso frammentato verso la prova e l\'abbonamento.',
    'PREVIOUS EXPERIENCE': 'ESPERIENZA PRECEDENTE',
    'OLD CATALOG UI': 'VECCHIA UI DEL CATALOGO',
    'Elementa, previous landing page, dense product catalog UI': 'Elementa, landing page precedente, UI del catalogo prodotti densa',
    'DESIGN OBSERVATIONS': 'OSSERVAZIONI DI DESIGN',
    'Landing page created visual noise.': 'La landing page creava rumore visivo.',
    'Too many competing icons.': 'Troppe icone in competizione tra loro.',
    'Product value wasn\'t immediately clear.': 'Il valore del prodotto non era immediatamente chiaro.',
    'Confusing CTAs.': 'CTA poco chiare.',
    'Long path to subscription.': 'Percorso lungo verso l\'abbonamento.',
    'DESIGN OBSERVATIONS FROM REVIEWING THE EXISTING EXPERIENCE, NOT USABILITY-TEST FINDINGS':
      'OSSERVAZIONI DI DESIGN DALL\'ANALISI DELL\'ESPERIENZA ESISTENTE, NON RISULTATI DI TEST DI USABILITÀ',

    /* 04 · discovery */
    'Before the interface,<br>the <span class="cs-title-grad">research</span>.':
      'Prima dell\'interfaccia,<br>la <span class="cs-title-grad">ricerca</span>.',
    'The redesign started from a review of the existing product, competitor benchmarking and an information-architecture pass, combined into design hypotheses before any screen was drawn.':
      'Il redesign è partito da una revisione del prodotto esistente, da un benchmark dei competitor e da un\'analisi dell\'architettura dell\'informazione, combinati in ipotesi di design prima di disegnare qualunque schermata.',
    'Audit': 'Audit',
    'Stakeholder conversations to understand their problems, needs and product know-how.':
      'Conversazioni con gli stakeholder per comprendere i loro problemi, bisogni e know-how di prodotto.',
    'Analysis of available analytics data to identify insights from the previous website.':
      'Analisi dei dati analytics disponibili per individuare insight dal sito precedente.',
    'Analysis of solutions adopted by the strongest direct competitors.':
      'Analisi delle soluzioni adottate dai principali competitor diretti.',
    'Analysis of established SaaS interaction and UX patterns, including widely known products such as Adobe.':
      'Analisi di pattern di interazione e UX diffusi nei prodotti SaaS affermati, inclusi prodotti noti come Adobe.',
    'Reorganizing content and journeys to separate product discovery, evaluation and conversion.':
      'Riorganizzazione dei contenuti e dei percorsi per separare scoperta, valutazione del prodotto e conversione.',

    /* 05 · behavioral signal */
    'WHAT THE PRODUCT DATA POINTED TO': 'COSA INDICAVANO I DATI DI PRODOTTO',
    'The free trial wasn\'t<br>just another <span class="cs-title-grad">feature</span>.':
      'La prova gratuita non era<br>solo un\'altra <span class="cs-title-grad">funzionalità</span>.',
    'BEHAVIORAL SIGNAL': 'SEGNALE COMPORTAMENTALE',
    'A significant share of users who eventually subscribed had previously started with a free trial.':
      'Una quota significativa degli utenti che si sono poi abbonati aveva iniziato con una prova gratuita.',
    'ADDITIONAL RESEARCH': 'RICERCA AGGIUNTIVA',
    'Further research suggested that the trial helped people understand the software\'s ease of use and its benefits before committing to a subscription.':
      'Ulteriori ricerche suggerivano che la prova aiutasse le persone a comprendere la semplicità d\'uso del software e i suoi benefici prima di impegnarsi in un abbonamento.',
    'Subscribers frequently passed through a free trial first.': 'Gli abbonati passavano spesso prima da una prova gratuita.',
    'PRODUCT INSIGHT': 'INSIGHT DI PRODOTTO',
    'The trial played an important role in helping potential customers evaluate the product before subscription.':
      'La prova aveva un ruolo importante nell\'aiutare i potenziali clienti a valutare il prodotto prima dell\'abbonamento.',
    'DESIGN RESPONSE': 'RISPOSTA DI DESIGN',
    'Make the free trial a primary product-discovery path instead of treating it as a secondary action.':
      'Rendere la prova gratuita un percorso primario di scoperta del prodotto invece di trattarla come un\'azione secondaria.',

    /* 06 · product journey + hypotheses */
    'From one dense experience<br>to a clearer <span class="cs-title-grad">progression</span>.':
      'Da un\'unica esperienza densa<br>a una <span class="cs-title-grad">progressione</span> più chiara.',
    'After the initial analysis and benchmark review, the information was reorganized into multiple levels to create a more structured path through product discovery, evaluation and subscription.':
      'Dopo l\'analisi iniziale e la revisione dei benchmark, le informazioni sono state riorganizzate su più livelli per creare un percorso più strutturato attraverso scoperta del prodotto, valutazione e abbonamento.',
    'PRODUCT JOURNEY, DISCOVERY TO SUBSCRIPTION': 'PERCORSO DI PRODOTTO, DALLA SCOPERTA ALL\'ABBONAMENTO',
    'DISCOVER': 'SCOPRI',
    'UNDERSTAND': 'COMPRENDI',
    'TRY': 'PROVA',
    'CHOOSE': 'SCEGLI',
    'SUBSCRIBE': 'ABBONATI',
    'HOME': 'HOME',
    'PRODUCT': 'PRODOTTO',
    'PLANS': 'PIANI',
    'CHECKOUT': 'CHECKOUT',
    'FROM': 'DA',
    'TO': 'A',
    'DESIGN PRINCIPLES': 'PRINCIPI DI DESIGN',
    'Structural Clarity': 'Chiarezza',
    'Hierarchy and information distributed across the journey.':
      'Gerarchia e informazioni distribuite lungo il percorso.',
    'Trial before commitment': 'Prova prima della scelta',
    'The free trial becomes a primary path for understanding the product before subscribing.':
      'La prova gratuita diventa un percorso primario per comprendere il prodotto prima dell\'abbonamento.',
    'Progressive path': 'Percorso progressivo',
    'Discovery, evaluation, selection and purchase become distinct moments.':
      'Scoperta, valutazione, scelta e acquisto diventano momenti distinti.',

    /* 07 · information architecture */
    'ONE DENSE EXPERIENCE, BROKEN INTO LAYERS': 'UN\'ESPERIENZA DENSA, SUDDIVISA IN LIVELLI',
    'Breaking one dense experience<br>into purposeful <span class="cs-title-grad">layers</span>.':
      'Scomporre un\'esperienza densa<br>in <span class="cs-title-grad">livelli</span> con uno scopo.',
    'Instead of concentrating product information, trial access, pricing and subscription actions in the same experience, the journey was distributed across pages with clearer responsibilities.':
      'Invece di concentrare informazioni di prodotto, accesso alla prova, prezzi e azioni di abbonamento nella stessa esperienza, il percorso è stato distribuito su pagine con responsabilità più chiare.',
    'MODULAR ARCHITECTURE': 'ARCHITETTURA MODULARE',
    'Discovery + benefits + trial entry': 'Scoperta + benefici + accesso alla prova',
    'Product value + benefits + trial': 'Valore del prodotto + benefici + prova',
    'Subscription comparison': 'Confronto degli abbonamenti',
    'Registration + payment': 'Registrazione + pagamento',
    'SYSTEM STATES': 'STATI DEL SISTEMA',
    'Progress + success + error + abandonment': 'Avanzamento + successo + errore + abbandono',
    'SELECTED WIREFRAMES': 'WIREFRAME SELEZIONATI',
    'Two wireframes, each split across two 1440 × 900 presentation screens.':
      'Due wireframe, ciascuno suddiviso in due schermate di presentazione 1440 × 900.',
    '01 / HOME': '01 / HOME',
    'PRODUCT POSITIONING → SOFTWARE DISCOVERY → PRODUCT PROOF → BENEFIT POSITIONING → KEY BENEFITS → PRODUCT IN USE':
      'POSIZIONAMENTO PRODOTTO → SCOPERTA SOFTWARE → PROVA PRODOTTO → POSIZIONAMENTO BENEFICI → BENEFICI CHIAVE → PRODOTTO IN USO',
    '02 / SOFTWARE PRODUCT': '02 / PRODOTTO SOFTWARE',
    'PRODUCT CONTEXT → PRODUCT VALUE → TRIAL ENTRY → CORE CAPABILITIES → PRODUCT IN USE → PLAN SELECTION':
      'CONTESTO PRODOTTO → VALORE PRODOTTO → INGRESSO ALLA PROVA → FUNZIONALITÀ PRINCIPALI → PRODOTTO IN USO → SCELTA DEL PIANO',
    'Elementa, home wireframe, part 1': 'Elementa, wireframe home, parte 1',
    'Elementa, home wireframe, part 2': 'Elementa, wireframe home, parte 2',
    'Elementa, software product wireframe, part 1': 'Elementa, wireframe pagina software, parte 1',
    'Elementa, software product wireframe, part 2': 'Elementa, wireframe pagina software, parte 2',
    'CLICK TO VIEW CLOSER': 'CLICCA PER VEDERE PIÙ DA VICINO',
    'Close image preview': 'Chiudi anteprima immagine',
    'Back to top': 'Torna all\'inizio',

    /* 08 · home redesign */
    'TWO REAL SCREENS, ONE CLEARER ENTRY POINT': 'DUE SCHERMATE REALI, UN INGRESSO PIÙ CHIARO',
    'Two real screens.<br>One clearer <span class="cs-title-grad">entry point</span>.':
      'Due schermate reali.<br>Un ingresso più <span class="cs-title-grad">chiaro</span>.',
    'The homepage now leads with a single value statement and direct access to the five product categories, then unfolds into benefits, proof points and a dedicated trial call to action further down the page.':
      'La homepage parte ora da un\'unica affermazione di valore e dall\'accesso diretto alle cinque categorie di prodotto, per poi svilupparsi in benefici, prove concrete e una call to action dedicata alla prova più in basso nella pagina.',
    'HOME · HERO': 'HOME · HERO',
    'HOME · BENEFITS': 'HOME · BENEFICI',
    'Elementa, homepage hero, final interface design': 'Elementa, hero della homepage, design dell\'interfaccia finale',
    'Elementa, homepage benefits section, final interface design': 'Elementa, sezione benefici della homepage, design dell\'interfaccia finale',
    'DESIGN DECISION': 'DECISIONE DI DESIGN',
    'The homepage leads with one outcome-driven statement and a single primary action, instead of splitting attention across every category at once. Scrolling then reveals the supporting evidence, benefits, proof metrics and a dashboard preview, in a clear, scannable order.':
      'La homepage parte da un\'unica affermazione orientata al risultato e da un\'unica azione primaria, invece di dividere l\'attenzione su tutte le categorie contemporaneamente. Scorrendo la pagina emergono poi le prove a supporto, benefici, metriche e un\'anteprima della dashboard, in un ordine chiaro e scansionabile.',

    /* 09 · product page */
    'VALUE FIRST, DETAIL SECOND': 'PRIMA IL VALORE, POI IL DETTAGLIO',
    'Explain the value<br>before the <span class="cs-title-grad">detail</span>.':
      'Spiegare il valore<br>prima del <span class="cs-title-grad">dettaglio</span>.',
    'Each software category, Acqua, Fuoco, Aria, Chimica, Rifiuti, now opens with a focused value statement and an immediate free-trial path, before introducing benefits and deeper functionality.':
      'Ogni categoria di software, Acqua, Fuoco, Aria, Chimica, Rifiuti, si apre ora con un\'affermazione di valore mirata e un percorso immediato verso la prova gratuita, prima di introdurre benefici e funzionalità più approfondite.',
    'PRODUCT · HERO + TRIAL CTA': 'PRODOTTO · HERO + CTA PROVA',
    'PRODUCT · BENEFITS + DASHBOARD': 'PRODOTTO · BENEFICI + DASHBOARD',
    'Elementa, product page hero and free-trial CTA, final interface design': 'Elementa, hero della pagina prodotto e CTA di prova gratuita, design dell\'interfaccia finale',
    'Elementa, product page benefits and dashboard preview, final interface design': 'Elementa, benefici della pagina prodotto e anteprima dashboard, design dell\'interfaccia finale',
    'The page leads with a stronger, outcome-focused value proposition and puts the free trial one click away instead of leaving it buried in navigation. Benefits are explained before functionality, and the messaging is written for the specific software category rather than the platform as a whole.':
      'La pagina parte da una value proposition più forte e orientata al risultato, e porta la prova gratuita a un click di distanza invece di lasciarla nascosta nella navigazione. I benefici vengono spiegati prima delle funzionalità, e il messaggio è scritto per la specifica categoria di software piuttosto che per la piattaforma nel suo insieme.',

    /* 10 · subscription flow */
    'PLANS, ACCESS, PAYMENT, ONE SEQUENCE': 'PIANI, ACCESSO, PAGAMENTO, UNA SOLA SEQUENZA',
    'Designing a smoother<br>path to <span class="cs-title-grad">subscription</span>.':
      'Un percorso più fluido<br>verso l\'<span class="cs-title-grad">abbonamento</span>.',
    'The redesign reduces friction from plan selection to payment by keeping the chosen plan visible, introducing Google and Facebook sign-in, and simplifying the checkout form. This describes a UX redesign, not measured conversion results.':
      'Il redesign riduce l\'attrito dalla scelta del piano al pagamento, mantenendo visibile il piano selezionato, introducendo l\'accesso con Google e Facebook e semplificando il modulo di checkout. Questo descrive un redesign UX, non risultati di conversione misurati.',
    'PLAN SELECTED': 'PIANO SELEZIONATO',
    'The chosen plan carries into the flow.': 'Il piano scelto viene mantenuto nel flusso.',
    'ACCOUNT': 'ACCOUNT',
    'Create the account with minimal required fields.': 'Creare l\'account con i campi obbligatori ridotti al minimo.',
    'AUTHENTICATION': 'AUTENTICAZIONE',
    'Email, or a faster social sign-in path.': 'Email, o un accesso social più rapido.',
    'PAYMENT': 'PAGAMENTO',
    'Confirm the plan and enter payment details.': 'Confermare il piano e inserire i dati di pagamento.',
    'CONFIRMATION': 'CONFERMA',
    'Clear confirmation of the active subscription.': 'Conferma chiara dell\'abbonamento attivo.',
    'PLANS · BASIC / STANDARD / PREMIUM': 'PIANI · BASIC / STANDARD / PREMIUM',
    'ACCESS': 'ACCESSO',
    'Elementa, subscription plans, Basic, Standard and Premium, final interface design': 'Elementa, piani di abbonamento, Basic, Standard e Premium, design dell\'interfaccia finale',
    'Elementa, access modal with Google and Facebook sign-in, final interface design': 'Elementa, modale di accesso con login Google e Facebook, design dell\'interfaccia finale',
    'Elementa, payment modal with plan summary, final interface design': 'Elementa, modale di pagamento con riepilogo del piano, design dell\'interfaccia finale',
    'The selected software, plan, price and the features it includes stay visible throughout the flow, so the choice can always be verified without leaving the process, reducing uncertainty and unnecessary backward navigation right before payment. This is a design hypothesis behind the recap, not a measured outcome.':
      'Il software selezionato, il piano, il prezzo e le funzionalità incluse restano visibili durante tutto il flusso, così da poter sempre verificare la propria scelta senza uscire dal processo, riducendo l\'incertezza e la navigazione all\'indietro non necessaria appena prima del pagamento. È un\'ipotesi di design alla base del riepilogo, non un risultato misurato.',
    'The flow was designed to reduce unnecessary steps and make plan, access and payment feel like one sequence.':
      'Il flusso è stato progettato per ridurre i passaggi non necessari e far percepire piano, accesso e pagamento come un\'unica sequenza.',

    /* 11 · final experience (also carries the closing reflection copy) */
    'PRODUCT TO SUBSCRIPTION': 'DAL PRODOTTO ALL\'ABBONAMENTO',
    'Not only a<br>cleaner <span class="cs-title-grad">interface</span>.':
      'Non solo un\'interfaccia<br>più <span class="cs-title-grad">pulita</span>.',
    'This project evolved from reorganizing a crowded landing page into redesigning an entire acquisition journey, from discovery to subscription, while keeping the free trial as the primary decision-making path.':
      'Questo progetto si è evoluto dalla riorganizzazione di una landing page affollata alla riprogettazione dell\'intero percorso di acquisizione, dalla scoperta all\'abbonamento, mantenendo la prova gratuita come principale leva decisionale.',
    'Elementa, final homepage interface': 'Elementa, interfaccia finale della homepage',
    'MOBILE EXPERIENCE': 'ESPERIENZA MOBILE',
    'RESPONSIVE PRODUCT UI': 'UI DI PRODOTTO RESPONSIVE',
    'SYSTEM FEEDBACK': 'FEEDBACK DI SISTEMA',
    'ERROR · SUCCESS · UPLOAD · WARNING': 'ERRORE · SUCCESSO · UPLOAD · AVVISO',
    'Elementa, error feedback message, final interface design': 'Elementa, messaggio di errore, design dell\'interfaccia finale',
    'Elementa, success feedback message, final interface design': 'Elementa, messaggio di successo, design dell\'interfaccia finale',
    'Elementa, upload feedback message, final interface design': 'Elementa, messaggio di caricamento file, design dell\'interfaccia finale',
    'Elementa, upload progress feedback message, final interface design': 'Elementa, messaggio di avanzamento caricamento, design dell\'interfaccia finale',
    'Elementa, warning feedback message, final interface design': 'Elementa, messaggio di avviso, design dell\'interfaccia finale',
    'Elementa, mobile homepage interface, final interface design': 'Elementa, interfaccia mobile della homepage, design dell\'interfaccia finale',
    'Elementa, mobile benefits interface, final interface design': 'Elementa, interfaccia mobile dei benefici, design dell\'interfaccia finale',

    /* 12 · what changed */
    'Not just a <span class="cs-title-grad">visual redesign</span>.':
      'Non solo un <span class="cs-title-grad">redesign visivo</span>.',
    'These describe changes in the designed experience, how information, communication and flow were restructured. They are not business-performance results.':
      'Descrivono cambiamenti nell\'esperienza progettata, come sono stati ristrutturati informazioni, comunicazione e flusso. Non sono risultati di performance di business.',
    'Information hierarchy': 'Gerarchia delle informazioni',
    'Competing information': 'Informazioni in competizione',
    'Clearer content levels': 'Livelli di contenuto più chiari',
    'Product communication': 'Comunicazione del prodotto',
    'Feature-heavy presentation': 'Presentazione centrata sulle funzionalità',
    'Benefit-oriented hierarchy': 'Gerarchia orientata ai benefici',
    'Free trial': 'Prova gratuita',
    'Secondary action': 'Azione secondaria',
    'Primary product path': 'Percorso primario di prodotto',
    'Subscription': 'Abbonamento',
    'Fragmented actions': 'Azioni frammentate',
    'Structured subscription flow': 'Flusso di abbonamento strutturato',
    'Interaction design': 'Interaction design',
    'Primary happy path': 'Happy path primario',
    'Explicit system states': 'Stati del sistema espliciti',

    /* 13 · what this project proves */
    'A structured <span class="cs-title-grad">product journey</span>.':
      'Un <span class="cs-title-grad">percorso di prodotto</span> strutturato.',
    'A real client SaaS project shaped by behavioral inputs, a structured discovery-to-subscription path, a modular architecture and an explicit interaction-state system.':
      'Un progetto SaaS reale per un cliente, plasmato da input comportamentali, da un percorso strutturato dalla scoperta all\'abbonamento, da un\'architettura modulare e da un sistema esplicito di stati di interazione.',
    'Behavioral Inputs': 'Input Comportamentali',
    'Evidence-informed design decisions': 'Decisioni di design informate dalle evidenze',
    'Product Journey': 'Percorso di Prodotto',
    'Structured discovery-to-subscription path': 'Percorso strutturato dalla scoperta all\'abbonamento',
    'Modular product experience': 'Esperienza di prodotto modulare',
    'Subscription UX': 'UX dell\'Abbonamento',
    'Authentication, plans and payment flow': 'Flusso di autenticazione, piani e pagamento',
    'System States': 'Stati del Sistema',
    'Success, error, loading and abandonment': 'Successo, errore, caricamento e abbandono',

    /* project navigation + footer */
    'COMING SOON <span class="nq-nav-soon">SOON</span>': 'PRESTO DISPONIBILE <span class="nq-nav-soon">PRESTO</span>',
    'CLIENT PROJECT · ELEMENTA': 'PROGETTO CLIENTE · ELEMENTA',

    /* analytics consent banner (js/analytics.js) */
    'I use Google Analytics to understand how the portfolio is used and improve it. You can accept tracking or continue without analytics.': 'Uso Google Analytics per capire come viene utilizzato il portfolio e migliorarlo. Puoi accettare il tracciamento oppure continuare senza analytics.',
    'ACCEPT': 'ACCETTA',
    'CONTINUE WITHOUT': 'CONTINUA SENZA',
    'Analytics preferences': 'Preferenze analytics'
  }
};
