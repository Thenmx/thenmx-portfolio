/* ============================================================
   CASE STUDY — AI TRAVEL BRAIN
   06 · Working Output — map output viewer.

   TB_MAP_OUTPUTS is the single place where each country's map
   image lives. To add or replace a map, set its path here; a
   null entry renders the "MAP ASSET PENDING" placeholder. Keys
   match data-map on the slides and selectors in the HTML.
   ============================================================ */

var TB_MAP_OUTPUTS = {
  morocco:    'assets/travel/marocco_map.jpg',
  uzbekistan: 'assets/travel/uzbekistan_map.jpg',
  mexico:     'assets/travel/messico_map.jpg',
  china:      'assets/travel/cina_map.jpg',
  ireland:    'assets/travel/irlanda_map.jpg',
  spain:      'assets/travel/spain_map.jpg'
};

/* country shown when the page opens */
var TB_MAP_DEFAULT = 'spain';

(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tb-mv-tab'));
  var slides = document.querySelectorAll('.tb-mv-slide');
  if (!tabs.length) return;

  /* wire each slide to its configured source; fall back to the
     placeholder if the file is missing or fails to load */
  for (var i = 0; i < slides.length; i++) {
    (function (slide) {
      var src = TB_MAP_OUTPUTS[slide.getAttribute('data-map')];
      var img = slide.querySelector('img');
      if (!src || !img) return;
      img.addEventListener('error', function () { slide.classList.remove('has-asset'); });
      img.src = src;
      slide.classList.add('has-asset');
    })(slides[i]);
  }

  function select(key, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-map') === key;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    for (var j = 0; j < slides.length; j++) {
      slides[j].classList.toggle('is-active', slides[j].getAttribute('data-map') === key);
    }
  }

  tabs.forEach(function (t, idx) {
    t.addEventListener('click', function () { select(t.getAttribute('data-map'), false); });
    t.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      select(tabs[next].getAttribute('data-map'), true);
    });
  });

  select(TB_MAP_OUTPUTS[TB_MAP_DEFAULT] ? TB_MAP_DEFAULT : tabs[0].getAttribute('data-map'), false);
})();
