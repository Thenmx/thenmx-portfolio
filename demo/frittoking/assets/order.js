// Versione B (demo): richiesta d'ordine in cartoni, inviata come messaggio WhatsApp.
// Simulazione solo front-end: nessun collegamento a Shopify, magazzino, email o CRM.
// Si appoggia al catalogo di app.js senza modificarlo: aggiunge i controlli quantità
// alle righe che app.js disegna, una barra riepilogo fissa e il riepilogo della richiesta.
(function () {
  'use strict';

  var catalog = window.FRITTOKING_CATALOG;
  var site = window.FRITTOKING_SITE || {};

  // DA FORNIRE: numero WhatsApp aziendale, formato internazionale (es. "+39 333 1234567").
  // Non è presente nel progetto. Finché è vuoto il messaggio si apre senza destinatario
  // e WhatsApp chiede all'utente a quale contatto inviarlo.
  var WHATSAPP_NUMBER = site.whatsapp || '';

  // Demo pubblica: nessun destinatario aziendale, mai. Il messaggio porta l'etichetta
  // SIMULAZIONE, così anche se inoltrato non può essere scambiato per un ordine reale.
  // Va messo a false solo quando la versione B diventa un servizio vero.
  var DEMO_MODE = true;
  if (DEMO_MODE) WHATSAPP_NUMBER = '';

  var STORAGE_KEY = 'frittoking-versione-b-richiesta';
  // Limite tecnico del campo (3 cifre), non un vincolo commerciale.
  var MAX_CARTONS = 999;

  if (!catalog || !Array.isArray(catalog.prodotti)) return;

  var products = catalog.prodotti;
  var byCode = {};
  products.forEach(function (p) { byCode[p.codice] = p; });

  var list = document.getElementById('product-list');
  var bar = document.getElementById('order-bar');
  var barButton = document.getElementById('order-bar-button');
  var barCount = document.getElementById('order-bar-count');
  var barHint = document.getElementById('order-bar-hint');
  var status = document.getElementById('order-status');
  var dialog = document.getElementById('order-dialog');
  var linesList = document.getElementById('order-lines');
  var emptyMessage = document.getElementById('order-empty');
  var totals = document.getElementById('order-totals');
  var totalCartons = document.getElementById('order-total-cartons');
  var totalValue = document.getElementById('order-total-value');
  var totalNote = document.getElementById('order-total-note');
  var preview = document.querySelector('.order-preview');
  var previewText = document.getElementById('order-preview-text');
  var whatsappButton = document.getElementById('order-whatsapp');
  var whatsappTodo = document.getElementById('order-whatsapp-todo');
  var clearButton = document.getElementById('order-clear');
  var toast = document.getElementById('toast');

  var MINUS_SVG = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M4 10h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var PLUS_SVG = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M4 10h12M10 4v12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var TRASH_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M4 7h16M9 7V4.5h6V7m-8.5 0 1 12.5h9L17.5 7M10 11v5m4-5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var euro = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

  // Stato: { codice: cartoni }. Solo quantità > 0.
  var order = loadOrder();

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // ---- Prezzi -------------------------------------------------------------
  // I prezzi della fonte sono stringhe nel formato "48,00". Si convertono in centesimi
  // solo se il formato è esattamente quello atteso; altrimenti il prezzo è "non affidabile"
  // e non entra in nessun totale.
  function priceCents(value) {
    var match = /^(\d{1,3}(?:\.\d{3})+|\d+),(\d{2})$/.exec(String(value || '').trim());
    if (!match) return null;
    return parseInt(match[1].replace(/\./g, ''), 10) * 100 + parseInt(match[2], 10);
  }

  function formatCents(cents) {
    return '€ ' + euro.format(cents / 100);
  }

  function cartons(n) {
    return n + (n === 1 ? ' cartone' : ' cartoni');
  }

  function productsLabel(n) {
    return n + (n === 1 ? ' prodotto' : ' prodotti');
  }

  // ---- Stato --------------------------------------------------------------
  function loadOrder() {
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch (e) {
      saved = {};
    }
    var clean = {};
    Object.keys(saved).forEach(function (code) {
      var qty = parseInt(saved[code], 10);
      // Si scartano codici non più presenti nel catalogo.
      if (byCode[code] && qty > 0) clean[code] = Math.min(qty, MAX_CARTONS);
    });
    return clean;
  }

  function saveOrder() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch (e) { /* demo: senza storage la richiesta vive solo nella pagina */ }
  }

  function getQty(code) {
    return order[code] || 0;
  }

  function setQty(code, qty) {
    qty = Math.max(0, Math.min(MAX_CARTONS, Math.floor(qty) || 0));
    if (qty === getQty(code)) {
      refresh();
      return;
    }
    if (qty > 0) order[code] = qty;
    else delete order[code];
    saveOrder();
    refresh();
    announce();
  }

  // Righe nell'ordine del catalogo, con totali riga se il prezzo è affidabile.
  function getSummary() {
    var lines = products.filter(function (p) { return getQty(p.codice) > 0; }).map(function (p) {
      var qty = getQty(p.codice);
      var unit = priceCents(p.prezzo_cartone_eur);
      return { product: p, qty: qty, unit: unit, total: unit == null ? null : unit * qty };
    });
    var cartonCount = lines.reduce(function (sum, line) { return sum + line.qty; }, 0);
    var priced = lines.length > 0 && lines.every(function (line) { return line.total != null; });
    var value = priced ? lines.reduce(function (sum, line) { return sum + line.total; }, 0) : null;
    return { lines: lines, cartons: cartonCount, value: value };
  }

  // ---- Selettore quantità (riga prodotto e riepilogo) ---------------------
  function buildStepper(product, options) {
    var stepper = el('div', 'stepper');
    stepper.dataset.code = product.codice;

    var minus = el('button', 'stepper__button stepper__minus');
    minus.type = 'button';
    minus.innerHTML = MINUS_SVG;
    minus.setAttribute('aria-label', 'Togli un cartone: ' + product.descrizione);

    var input = el('input', 'stepper__input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.autocomplete = 'off';
    input.maxLength = String(MAX_CARTONS).length;
    input.setAttribute('pattern', '[0-9]*');
    input.setAttribute('aria-label', 'Cartoni di ' + product.descrizione + ' (Cod. ' + product.codice + ')');
    input.value = String(getQty(product.codice));

    var plus = el('button', 'stepper__button stepper__plus');
    plus.type = 'button';
    plus.innerHTML = PLUS_SVG;
    plus.setAttribute('aria-label', 'Aggiungi un cartone: ' + product.descrizione);

    minus.addEventListener('click', function () {
      if (options && options.beforeRemove && getQty(product.codice) === 1) options.beforeRemove();
      setQty(product.codice, getQty(product.codice) - 1);
    });
    plus.addEventListener('click', function () {
      setQty(product.codice, getQty(product.codice) + 1);
    });

    // Quantità libera ("N cartoni"): si accettano solo cifre. Mentre si scrive si aggiorna
    // subito ogni valore > 0; il campo vuoto o 0 viene applicato solo a fine modifica,
    // così cancellare il numero per riscriverlo non toglie il prodotto.
    input.addEventListener('focus', function () { input.select(); });
    input.addEventListener('input', function () {
      var digits = input.value.replace(/\D/g, '');
      if (digits !== input.value) input.value = digits;
      var qty = parseInt(digits, 10);
      if (qty > 0) setQty(product.codice, qty);
    });
    input.addEventListener('change', function () {
      var qty = parseInt(input.value, 10) || 0;
      if (qty === 0 && options && options.beforeRemove) options.beforeRemove();
      setQty(product.codice, qty);
      input.value = String(getQty(product.codice));
    });
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        input.blur();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        setQty(product.codice, getQty(product.codice) + (event.key === 'ArrowUp' ? 1 : -1));
      }
    });

    stepper.appendChild(minus);
    stepper.appendChild(input);
    stepper.appendChild(plus);
    return stepper;
  }

  function syncStepper(stepper) {
    var qty = getQty(stepper.dataset.code);
    var input = stepper.querySelector('.stepper__input');
    // Non si riscrive il campo mentre l'utente lo sta modificando.
    if (document.activeElement !== input) input.value = String(qty);
    stepper.querySelector('.stepper__minus').disabled = qty === 0;
    stepper.querySelector('.stepper__plus').disabled = qty >= MAX_CARTONS;
    stepper.classList.toggle('is-active', qty > 0);
  }

  function lineTotalText(product) {
    var qty = getQty(product.codice);
    if (!qty) return 'Nessun cartone';
    var unit = priceCents(product.prezzo_cartone_eur);
    return cartons(qty) + (unit == null ? ' · prezzo da confermare' : ' · ' + formatCents(unit * qty));
  }

  // ---- Righe del catalogo ---------------------------------------------------
  // app.js ridisegna la lista a ogni cambio di tipologia: a ogni nuova riga si aggiunge
  // il blocco "Cartoni", tra l'intestazione e la scheda espandibile.
  function enhanceItem(item) {
    if (item.querySelector('.order-line')) return;
    var product = byCode[item.dataset.code];
    if (!product) return;

    var line = el('div', 'order-line');
    var info = el('div', 'order-line__info');
    info.appendChild(el('span', 'order-line__label', 'Cartoni'));
    var total = el('span', 'order-line__total');
    total.setAttribute('aria-hidden', 'true'); // lo stato è già annunciato dalla regione live
    info.appendChild(total);
    line.appendChild(info);
    line.appendChild(buildStepper(product));

    item.insertBefore(line, item.querySelector('.product__details'));
    syncItem(item);
  }

  function syncItem(item) {
    var product = byCode[item.dataset.code];
    if (!product) return;
    item.classList.toggle('is-in-order', getQty(product.codice) > 0);
    item.querySelector('.order-line__total').textContent = lineTotalText(product);
    syncStepper(item.querySelector('.stepper'));
  }

  function enhanceList() {
    Array.prototype.forEach.call(list.children, enhanceItem);
  }

  // ---- Barra riepilogo ------------------------------------------------------
  function syncBar(summary) {
    var empty = summary.lines.length === 0;
    barButton.disabled = empty;
    bar.classList.toggle('is-empty', empty);
    if (empty) {
      barCount.textContent = 'Nessun prodotto selezionato';
      barHint.textContent = 'Usa + per aggiungere cartoni';
    } else {
      barCount.textContent = productsLabel(summary.lines.length) + ' · ' + cartons(summary.cartons);
      barHint.textContent = summary.value != null
        ? 'Totale indicativo ' + formatCents(summary.value)
        : 'Totale da confermare';
    }
  }

  var announceTimer = null;
  function announce() {
    clearTimeout(announceTimer);
    announceTimer = setTimeout(function () {
      var summary = getSummary();
      status.textContent = summary.lines.length
        ? 'Richiesta: ' + productsLabel(summary.lines.length) + ', ' + cartons(summary.cartons) + '.'
        : 'Richiesta vuota.';
    }, 400);
  }

  // ---- Riepilogo (dialog) ---------------------------------------------------
  function buildOrderLine(product) {
    var li = el('li', 'order-item');
    li.dataset.code = product.codice;

    var head = el('div', 'order-item__head');
    var info = el('div', 'order-item__info');
    info.appendChild(el('span', 'order-item__code', 'Cod. ' + product.codice));
    info.appendChild(el('span', 'order-item__name', product.descrizione));
    var unit = product.prezzo_cartone_eur ? '€ ' + product.prezzo_cartone_eur + ' / cartone' : 'Prezzo per cartone non disponibile';
    info.appendChild(el('span', 'order-item__unit', unit));
    head.appendChild(info);

    var remove = el('button', 'order-item__remove');
    remove.type = 'button';
    remove.innerHTML = TRASH_SVG + '<span>Rimuovi</span>';
    remove.setAttribute('aria-label', 'Rimuovi ' + product.descrizione + ' dalla richiesta');
    remove.addEventListener('click', function () {
      moveFocusFrom(li);
      setQty(product.codice, 0);
    });
    head.appendChild(remove);
    li.appendChild(head);

    var foot = el('div', 'order-item__foot');
    foot.appendChild(buildStepper(product, { beforeRemove: function () { moveFocusFrom(li); } }));
    foot.appendChild(el('span', 'order-item__total'));
    li.appendChild(foot);
    return li;
  }

  // Prima di togliere una riga, il fuoco passa alla riga successiva (o precedente, o al titolo).
  function moveFocusFrom(li) {
    var target = li.nextElementSibling || li.previousElementSibling;
    var focusTarget = target ? target.querySelector('.order-item__remove') : document.getElementById('order-dialog-close');
    // Il fuoco si sposta dopo l'aggiornamento, quando la riga è già stata rimossa.
    setTimeout(function () { if (focusTarget.isConnected) focusTarget.focus(); }, 0);
  }

  function renderDialog() {
    linesList.textContent = '';
    getSummary().lines.forEach(function (line) {
      linesList.appendChild(buildOrderLine(line.product));
    });
    syncDialog();
  }

  function syncDialog() {
    var summary = getSummary();
    var byLine = {};
    summary.lines.forEach(function (line) { byLine[line.product.codice] = line; });

    Array.prototype.slice.call(linesList.children).forEach(function (li) {
      var line = byLine[li.dataset.code];
      if (!line) {
        li.remove();
        return;
      }
      syncStepper(li.querySelector('.stepper'));
      li.querySelector('.order-item__total').textContent =
        line.total != null ? formatCents(line.total) : 'Prezzo da confermare';
    });

    var empty = summary.lines.length === 0;
    emptyMessage.hidden = !empty;
    totals.hidden = empty;
    preview.hidden = empty;
    whatsappButton.disabled = empty;
    clearButton.hidden = empty;

    totalCartons.textContent = cartons(summary.cartons);
    if (summary.value != null) {
      totalValue.textContent = formatCents(summary.value);
      totalNote.textContent = 'Calcolato sui prezzi per cartone del catalogo. Prezzi, IVA e disponibilità vengono confermati da Frittoking.';
    } else {
      totalValue.textContent = '—';
      totalNote.textContent = 'Totale non calcolabile: manca il prezzo per cartone di almeno un prodotto. Verrà indicato da Frittoking.';
    }
    previewText.textContent = buildMessage(summary);
  }

  function openDialog() {
    if (!getSummary().lines.length) return;
    renderDialog();
    dialog.showModal();
    document.documentElement.classList.add('order-dialog-open');
  }

  function closeDialog() {
    dialog.close();
  }

  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('order-dialog-open');
    if (barButton.disabled) {
      document.getElementById('product-panel').focus({ preventScroll: true });
    } else {
      barButton.focus({ preventScroll: true });
    }
  });
  // Tocco sullo sfondo scuro: chiude.
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) closeDialog();
  });
  document.getElementById('order-dialog-close').addEventListener('click', closeDialog);
  barButton.addEventListener('click', openDialog);

  // ---- WhatsApp -------------------------------------------------------------
  function buildMessage(summary) {
    var rows = ['Ciao Frittoking, vorrei inviare una richiesta d\'ordine (da confermare):', ''];
    if (DEMO_MODE) rows.unshift('[SIMULAZIONE DEMO – NON È UN ORDINE]', '');
    summary.lines.forEach(function (line) {
      var p = line.product;
      var row = '• Cod. ' + p.codice + ' – ' + p.descrizione + ': ' + cartons(line.qty);
      if (line.unit != null) row += ' × ' + formatCents(line.unit) + ' = ' + formatCents(line.total);
      rows.push(row);
    });
    rows.push('');
    rows.push('Totale: ' + productsLabel(summary.lines.length) + ', ' + cartons(summary.cartons));
    if (summary.value != null) {
      rows.push('Totale indicativo da listino: ' + formatCents(summary.value));
    }
    rows.push('');
    rows.push('Resto in attesa della vostra conferma su disponibilità, prezzi e consegna. Grazie!');
    return rows.join('\n');
  }

  function whatsappUrl(message) {
    var number = WHATSAPP_NUMBER.replace(/\D/g, '');
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  whatsappButton.addEventListener('click', function () {
    var summary = getSummary();
    if (!summary.lines.length) return;
    window.open(whatsappUrl(buildMessage(summary)), '_blank', 'noopener');
    showToast('Apertura di WhatsApp…');
  });

  whatsappTodo.hidden = DEMO_MODE || Boolean(WHATSAPP_NUMBER.replace(/\D/g, ''));

  // ---- Azzeramento demo -----------------------------------------------------
  function resetOrder() {
    order = {};
    saveOrder();
    if (dialog.open) closeDialog();
    refresh();
    announce();
    showToast('Richiesta azzerata');
  }
  clearButton.addEventListener('click', resetOrder);
  document.getElementById('order-reset-demo').addEventListener('click', resetOrder);

  // ---- Toast ----------------------------------------------------------------
  var toastTimer = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
  }

  // ---- Avvio ----------------------------------------------------------------
  function refresh() {
    Array.prototype.forEach.call(list.children, function (item) {
      if (item.querySelector('.order-line')) syncItem(item);
    });
    var summary = getSummary();
    syncBar(summary);
    if (dialog.open) syncDialog();
  }

  new MutationObserver(enhanceList).observe(list, { childList: true });
  enhanceList();
  refresh();

  // Espone l'API minima per test e presentazioni dalla console.
  window.FRITTOKING_ORDER_DEMO = {
    summary: getSummary,
    message: function () { return buildMessage(getSummary()); },
    whatsappUrl: function () { return whatsappUrl(buildMessage(getSummary())); },
    reset: resetOrder
  };
})();
