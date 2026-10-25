/* ============================================================
   NK — THE PM · main bootstrap
   ─────────────────────────────────────────────────────────
   MODULAR SECTION REGISTRY
   To add a section:  1) create assets/js/sections/<id>.js with
                         NK.sections.<id> = { render(c), after() }
                      2) add a <script> tag in index.html
                      3) add its id + nav label to data/content.*.js
   To remove one: comment out its line below (+ nav entry).
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  /* order matters — this IS the page */
  var SECTION_ORDER = [
    "hero",       // dark   — cinematic intro + NK monogram
    "marquee",    // paper  — skills ticker (uses c.marquee)
    "about",      // dark   — story, facts, quote
    "stats",      // paper  — animated counters
    "experience", // dark   — timeline
    "skills",     // paper  — toolbox table
    "projects",   // dark   — GitHub auto-sync
    "education",  // paper  — degrees
    "contact"     // dark   — mega CTA
  ];

  var app;

  function renderAll() {
    var c = NK.i18n.content();
    app.innerHTML = "";

    SECTION_ORDER.forEach(function (id) {
      var mod = NK.sections[id];
      if (!mod || typeof mod.render !== "function") return;
      var el = null;
      try {
        if (id === "marquee") {
          el = mod.render(c, { items: c.marquee });
          el.id = "marquee-1";
        } else {
          el = mod.render(c);
        }
      } catch (e) {
        console.error("[nk] section failed:", id, e);
        return;
      }
      app.appendChild(el);
      /* hero letters are triggered AFTER the loader finishes (see boot) */
      if (id !== "hero" && typeof mod.after === "function") {
        try { mod.after(el); } catch (e) { console.error("[nk] after failed:", id, e); }
      }
    });

    /* second marquee before footer */
    if (NK.sections.marquee) {
      app.appendChild(NK.sections.marquee.render(c, { items: c.marquee2, dark: true }));
    }
    if (NK.sections.footer) app.appendChild(NK.sections.footer.render(c));

    /* re-init per-render systems */
    NK.fx.initReveals(app);
    NK.fx.initCounters(app);
    NK.fx.initTilt(app);
    NK.fx.initActiveNav();
  }

  function rerender() {
    app.style.transition = "opacity .25s ease";
    app.style.opacity = "0";
    setTimeout(function () {
      renderAll();
      NK.sections.nav.render(NK.i18n.content());
      requestAnimationFrame(function () { app.style.opacity = "1"; });
      /* retrigger hero letters */
      var hero = document.querySelector(".hero");
      if (hero && NK.sections.hero.after) NK.sections.hero.after(hero);
    }, 260);
  }

  NK.switchLang = function (lang) {
    if (lang === NK.i18n.lang) return;
    NK.i18n.switchTo(lang, rerender);
  };

  function boot() {
    app = document.getElementById("app");
    NK.i18n.applyDoc();

    /* nav first so it's visible during load */
    NK.sections.nav.render(NK.i18n.content());
    renderAll();

    /* fixed layers */
    NK.fx.initProgress();
    NK.cursor.init();

    var loaderUi = NK.buildLoader(NK.i18n.content());
    NK.runLoader(loaderUi, function () {
      var hero = document.querySelector(".hero");
      if (hero) NK.sections.hero.after(hero);
      NK.fx.initReveals(document);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
