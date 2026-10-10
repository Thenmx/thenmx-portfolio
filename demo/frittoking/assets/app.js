(function () {
  'use strict';

  var catalog = window.FRITTOKING_CATALOG;
  var TYPES = ['BIANCHE', 'FARCITE'];

  // Campi mostrati solo nella scheda espansa (non ripetono quelli della riga compatta).
  // Per mostrare un altro campo della fonte basta aggiungerlo qui.
  var DETAIL_FIELDS = [
    { key: 'misure', label: 'Misure' },
    { key: 'iva', label: 'IVA' },
    { key: 'shelf_life', label: 'Shelf life' }
  ];

  var IMAGE_WIDTH = 1200;
  var IMAGE_HEIGHT = 1500;

  var list = document.getElementById('product-list');
  var emptyMessage = document.getElementById('product-list-empty');
  var panel = document.getElementById('product-panel');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.type-selector__tab'));
  var toast = document.getElementById('toast');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Dispositivi touch: condivisione nativa; desktop: copia del link.
  var coarsePointer = window.matchMedia('(pointer: coarse)');
  var site = window.FRITTOKING_SITE || {};

  var currentType = null;
  var openItem = null; // un solo prodotto aperto alla volta

  var CHEVRON_SVG =
    '<svg viewBox="0 0 16 10" width="16" height="10" aria-hidden="true" focusable="false">' +
    '<path d="M1.5 1.5 8 8l6.5-6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SHARE_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">' +
    '<path d="M12 15V4m0 0L8 8m4-4 4 4M6 11H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // Valore vuoto nella fonte -> trattino visibile + testo per screen reader.
  function valueOrDash(value) {
    var span = el('span', value ? null : 'is-missing');
    if (value) {
      span.textContent = value;
    } else {
      span.innerHTML = '<span aria-hidden="true">—</span><span class="visually-hidden">non disponibile</span>';
    }
    return span;
  }

  // I prezzi arrivano dalla fonte già nel formato "48,00": li si mostra invariati con il simbolo €.
  function price(value) {
    return value ? '€ ' + value : '€ —';
  }

  function fileName(path) {
    return path.split('/').pop();
  }

  function buildImage(product) {
    var figure = el('figure', 'product-image');
    figure.style.aspectRatio = IMAGE_WIDTH + ' / ' + IMAGE_HEIGHT;

    var placeholder = el('div', 'product-image__placeholder');
    placeholder.appendChild(el('span', 'product-image__code', 'Cod. ' + product.codice));
    placeholder.appendChild(el('span', 'product-image__file', fileName(product.immagine)));
    placeholder.appendChild(el('span', 'product-image__size', IMAGE_WIDTH + ' × ' + IMAGE_HEIGHT + ' px · 4:5'));
    figure.appendChild(placeholder);
    return figure;
  }

  // L'immagine viene richiesta solo alla prima apertura; se manca resta il segnaposto.
  function loadImage(item, product) {
    if (item.dataset.imageRequested) return;
    item.dataset.imageRequested = 'true';
    var figure = item.querySelector('.product-image');
    var img = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);
    img.className = 'product-image__img';
    img.alt = product.descrizione;
    img.decoding = 'async';
    img.addEventListener('load', function () {
      figure.classList.add('has-image');
    });
    img.addEventListener('error', function () {
      img.remove();
    });
    img.src = product.immagine;
    figure.appendChild(img);
  }

  function buildItem(product, index) {
    var id = 'prodotto-' + index;
    var item = el('li', 'product');
    item.dataset.code = product.codice;

    // Riga compatta
    var heading = el('h2', 'product__heading');
    var toggle = el('button', 'product__toggle');
    toggle.type = 'button';
    toggle.id = id + '-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', id + '-details');

    var summary = el('span', 'product__summary');

    var info = el('span', 'product__info');
    info.appendChild(el('span', 'product__code', 'Cod. ' + product.codice));
    info.appendChild(el('span', 'product__name', product.descrizione));
    var meta = el('span', 'product__meta');
    var weight = el('span', 'product__meta-item', 'Peso ');
    weight.appendChild(valueOrDash(product.peso));
    var pieces = el('span', 'product__meta-item', 'Cartone ');
    pieces.appendChild(valueOrDash(product.pezzi_per_cartone));
    pieces.appendChild(document.createTextNode(' pezzi'));
    var dot = el('span', 'product__meta-sep', '·');
    dot.setAttribute('aria-hidden', 'true');
    meta.appendChild(weight);
    meta.appendChild(dot);
    meta.appendChild(pieces);

    var prices = el('span', 'product__prices');
    var carton = el('span', 'price-carton');
    carton.appendChild(el('span', 'price-carton__value', price(product.prezzo_cartone_eur)));
    carton.appendChild(el('span', 'price-carton__unit', '/ cartone'));
    prices.appendChild(carton);
    prices.appendChild(el('span', 'price-piece', price(product.prezzo_pezzo_eur) + ' / pezzo'));

    summary.appendChild(info);
    summary.appendChild(prices);
    // Peso e pezzi su tutta la larghezza: su schermi stretti non vanno a capo accanto ai prezzi.
    summary.appendChild(meta);
    toggle.appendChild(summary);

    var chevron = el('span', 'product__chevron');
    chevron.innerHTML = CHEVRON_SVG;
    toggle.appendChild(chevron);

    heading.appendChild(toggle);
    item.appendChild(heading);

    // Scheda espansa
    var details = el('div', 'product__details');
    details.id = id + '-details';
    details.setAttribute('role', 'region');
    details.setAttribute('aria-labelledby', toggle.id);
    details.inert = true;

    var inner = el('div', 'product__details-inner');
    var body = el('div', 'product__body');
    body.appendChild(buildImage(product));
    // Descrizione breve da data-source/descrizioni-brevi.txt: mostrata solo se presente.
    if (product.descrizione_breve) {
      body.appendChild(el('p', 'product__description', product.descrizione_breve));
    }

    var specs = el('dl', 'product__specs');
    DETAIL_FIELDS.forEach(function (field) {
      var group = el('div', 'product__spec');
      group.appendChild(el('dt', null, field.label));
      var dd = el('dd');
      dd.appendChild(valueOrDash(product[field.key]));
      group.appendChild(dd);
      specs.appendChild(group);
    });
    body.appendChild(specs);

    var share = el('button', 'button button--secondary product__share');
    share.type = 'button';
    share.setAttribute('aria-label', 'Condividi ' + product.descrizione);
    share.innerHTML = SHARE_SVG + '<span>Condividi</span>';
    share.addEventListener('click', function () { shareProduct(product); });
    body.appendChild(share);

    var close = el('button', 'product__close');
    close.type = 'button';
    close.setAttribute('aria-label', 'Chiudi dettagli ' + product.descrizione);
    close.innerHTML = CHEVRON_SVG;
    body.appendChild(close);

    inner.appendChild(body);
    details.appendChild(inner);
    item.appendChild(details);

    toggle.addEventListener('click', function () {
      setOpen(item, product, toggle.getAttribute('aria-expanded') !== 'true');
    });
    close.addEventListener('click', function () {
      setOpen(item, product, false);
      // Il fuoco torna all'intestazione; se è uscita dallo schermo la si riporta in vista.
      toggle.focus({ preventScroll: true });
      var top = toggle.getBoundingClientRect().top;
      if (top < 0) {
        window.scrollBy({ top: top - 12, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      }
    });

    return item;
  }

  function applyOpenState(item, open, instant) {
    var details = item.querySelector('.product__details');
    if (instant) item.classList.add('no-anim');
    item.querySelector('.product__toggle').setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-open', open);
    details.inert = !open;
    if (instant) {
      void details.offsetHeight; // applica subito la nuova altezza, senza transizione
      item.classList.remove('no-anim');
    }
  }

  function setOpen(item, product, open, options) {
    var instant = options && options.instant;
    if (open && openItem && openItem !== item) {
      // Chiude il prodotto aperto in precedenza. Se sta sopra, lo chiude senza animazione e
      // compensa lo scroll, così l'intestazione toccata resta ferma sotto il dito.
      var previous = openItem;
      var above = previous.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_FOLLOWING;
      var toggle = item.querySelector('.product__toggle');
      var before = toggle.getBoundingClientRect().top;
      applyOpenState(previous, false, above || instant);
      if (above) window.scrollBy(0, toggle.getBoundingClientRect().top - before);
    }
    applyOpenState(item, open, instant);
    if (open) {
      openItem = item;
      loadImage(item, product);
    } else if (openItem === item) {
      openItem = null;
    }
    syncUrl();
  }

  // URL sempre allineato allo stato: ?prodotto=<codice> se un prodotto è aperto, #tipologia per la scheda.
  function syncUrl() {
    var url = location.pathname;
    if (openItem) url += '?prodotto=' + encodeURIComponent(openItem.dataset.code);
    url += '#' + currentType.toLowerCase();
    if (url !== location.pathname + location.search + location.hash) {
      history.replaceState(null, '', url);
    }
  }

  // Link stabile del prodotto: la pagina p/<codice>/ contiene l'anteprima (Open Graph)
  // e reindirizza al catalogo con il prodotto aperto.
  function productUrl(product) {
    var base = site.sito_url || new URL('./', location.href).href;
    return new URL(product.pagina_condivisione, base).href;
  }

  function shareProduct(product) {
    var url = productUrl(product);
    var data = {
      title: product.descrizione + ' · Frittoking',
      text: product.descrizione + ' (Cod. ' + product.codice + ') · Catalogo Frittoking',
      url: url
    };
    var canNativeShare = coarsePointer.matches && typeof navigator.share === 'function' &&
      (typeof navigator.canShare !== 'function' || navigator.canShare(data));
    if (!canNativeShare) {
      copyLink(url);
      return;
    }
    navigator.share(data).catch(function (error) {
      // Annullato dall'utente: nessuna azione. Altri errori: si ripiega sulla copia del link.
      if (!error || error.name !== 'AbortError') copyLink(url);
    });
  }

  function copyLink(url) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () {
        showToast('Link copiato');
      }, function () {
        legacyCopy(url);
      });
    } else {
      legacyCopy(url);
    }
  }

  function legacyCopy(url) {
    var field = el('textarea');
    field.value = url;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (e) { copied = false; }
    field.remove();
    if (copied) showToast('Link copiato');
    else window.prompt('Copia il link del prodotto:', url);
  }

  var toastTimer = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  function render(type) {
    var products = catalog.prodotti.filter(function (p) { return p.tipologia === type; });
    openItem = null;
    list.textContent = '';
    var fragment = document.createDocumentFragment();
    products.forEach(function (product) {
      fragment.appendChild(buildItem(product, catalog.prodotti.indexOf(product)));
    });
    list.appendChild(fragment);
    emptyMessage.hidden = products.length > 0;
  }

  function selectType(type, options) {
    currentType = type;
    tabs.forEach(function (tab) {
      var selected = tab.dataset.type === type;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) panel.setAttribute('aria-labelledby', tab.id);
    });
    render(type);
    if (options && options.updateHash) syncUrl();
  }

  // Apertura da link condiviso: ?prodotto=<codice> (o la cartella p/<codice>/ equivalente).
  function openFromQuery() {
    var code = new URLSearchParams(location.search).get('prodotto');
    if (!code) return false;
    var product = catalog.prodotti.filter(function (p) {
      return p.codice === code || p.pagina_condivisione === 'p/' + code + '/';
    })[0];
    if (!product || TYPES.indexOf(product.tipologia) < 0) {
      selectType(typeFromHash(), { updateHash: true });
      showToast('Prodotto non trovato');
      return true;
    }
    selectType(product.tipologia);
    var item = Array.prototype.filter.call(list.children, function (li) {
      return li.dataset.code === product.codice;
    })[0];
    setOpen(item, product, true, { instant: true });
    var scrollToItem = function () {
      window.scrollTo(0, item.getBoundingClientRect().top + window.scrollY - 8);
    };
    scrollToItem();
    // Il caricamento del font può spostare il layout: si riallinea una volta pronto.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scrollToItem);
    return true;
  }

  // Contatti da data-source/sito.txt. Se mancano, i pulsanti restano visibili ma disattivati
  // e un avviso indica cosa va fornito.
  function setupContacts() {
    var phone = document.getElementById('contact-phone');
    var email = document.getElementById('contact-email');
    var todo = document.getElementById('contact-todo');
    var missing = [];
    if (site.telefono_href) {
      phone.href = site.telefono_href;
      phone.setAttribute('aria-label', 'Chiamaci: ' + site.telefono);
    } else {
      phone.setAttribute('aria-disabled', 'true');
      phone.classList.add('is-placeholder');
      missing.push('numero di telefono');
    }
    if (site.email) {
      email.href = 'mailto:' + site.email;
      email.setAttribute('aria-label', 'Inviaci una email: ' + site.email);
    } else {
      email.setAttribute('aria-disabled', 'true');
      email.classList.add('is-placeholder');
      missing.push('indirizzo email');
    }
    if (missing.length) {
      todo.textContent = 'Da completare: ' + missing.join(' e ') + ' (data-source/sito.txt).';
      todo.hidden = false;
    }
  }

  function typeFromHash() {
    var hash = decodeURIComponent(location.hash.slice(1)).toUpperCase();
    return TYPES.indexOf(hash) >= 0 ? hash : TYPES[0];
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      selectType(tab.dataset.type, { updateHash: true });
    });
    tab.addEventListener('keydown', function (event) {
      var next = null;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      else if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      else if (event.key === 'Home') next = tabs[0];
      else if (event.key === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      event.preventDefault();
      next.focus();
      selectType(next.dataset.type, { updateHash: true });
    });
  });

  window.addEventListener('hashchange', function () {
    selectType(typeFromHash(), { updateHash: true });
  });

  setupContacts();

  if (!catalog || !Array.isArray(catalog.prodotti)) {
    emptyMessage.textContent = 'Catalogo non disponibile.';
    emptyMessage.hidden = false;
    return;
  }

  var unclassified = catalog.prodotti.filter(function (p) { return TYPES.indexOf(p.tipologia) < 0; });
  if (unclassified.length) {
    console.warn('Prodotti senza tipologia (non mostrati):', unclassified.map(function (p) { return p.codice; }));
  }

  if (!openFromQuery()) selectType(typeFromHash());
})();
