/* ============================================================
   NK — THE PM · main bootstrap v2 — THE JOURNEY
   ─────────────────────────────────────────────────────────
   MODULAR CHAPTER REGISTRY
   To add a chapter: 1) create assets/js/sections/<id>.js with
                        NK.sections.<id> = { render(c) }
                     2) add a <script> tag in index.html
                     3) add { id, no, label } to data/content.*.js
   To remove one: comment out its line below (+ content entry).
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  /* order matters — this IS the journey */
  var CHAPTERS = [
    "cover",    // 00 — boarding pass intro (photo, name, minimal CTAs)
    "about",    // 01 — who (progressive disclosure: teaser → full story)
    "numbers",  // 02 — proof in counters
    "journey",  // 03 — career route map, click-to-open stations
    "toolbox",  // 04 — skill drawers
    "lab",      // 05 — GitHub auto-synced projects
    "edu",      // 06 — education + side quests
    "contact"   // 07 — destination (channels + résumé CTA)
  ];

  var app;

  function renderAll() {
    var c = NK.i18n.content();
    app.innerHTML = "";

    CHAPTERS.forEach(function (id) {
      var mod = NK.sections[id];
      if (!mod || typeof mod.render !== "function") return;
      try {
        app.appendChild(mod.render(c));
      } catch (e) {
        console.error("[nk] chapter failed:", id, e);
      }
    });

    NK.fx.initReveals(app);
    NK.fx.initCounters(app);
    NK.fx.initTilt(app);
    NK.fx.initMagnets(app);
    NK.fx.initParallax(app);
    NK.fx.initJourney();
    NK.fx.initChapters();
    NK.fx.initProgress();
    NK.fx.initNavSolid();
  }

  function rerender() {
    app.style.transition = "opacity .22s ease";
    app.style.opacity = "0";
    setTimeout(function () {
      renderAll();
      NK.sections.nav.render();
      requestAnimationFrame(function () {
        app.style.opacity = "1";
        /* replay cover name animation */
        var name = document.querySelector(".cover-name");
        if (name) {
          name.classList.remove("is-in");
          setTimeout(function () { name.classList.add("is-in"); }, 60);
        }
      });
    }, 240);
  }

  NK.switchLang = function (lang) {
    if (lang === NK.i18n.lang) return;
    NK.i18n.switchTo(lang, rerender);
  };

  function boot() {
    app = document.getElementById("app");
    NK.theme.init();
    NK.i18n.applyDoc();

    NK.sections.nav.render();
    renderAll();

    NK.cursor.init();

    /* loader: full boarding-pass on first visit of the session,
       quick curtain afterwards */
    var seen = false;
    try { seen = !!sessionStorage.getItem("nk-loaded"); } catch (e) {}
    var loaderUi = NK.buildLoader(NK.i18n.content(), !seen);
    NK.runLoader(loaderUi, !seen, function () {
      try { sessionStorage.setItem("nk-loaded", "1"); } catch (e) {}
      var name = document.querySelector(".cover-name");
      if (name) name.classList.add("is-in");
      NK.fx.initReveals(document);
    });
    if (!seen) document.body.classList.add("loader-lock");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
