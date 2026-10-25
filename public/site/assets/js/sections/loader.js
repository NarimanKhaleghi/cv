/* ============================================================
   NK — THE PM · Section: cinematic loader
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  NK.sections = NK.sections || {};

  /* build loader DOM (called once at boot) */
  NK.buildLoader = function (c) {
    var root = document.getElementById("loader");
    if (!root) return null;
    root.innerHTML = "";
    var inner = NK.util.el("div", { class: "loader-inner" });
    var brand = NK.util.el("div", { class: "loader-brand" });
    c.loader.brand.forEach(function (w) {
      brand.appendChild(NK.util.el("span", { class: "w" }, [
        NK.util.el("span", { text: w })
      ]));
    });
    inner.appendChild(brand);
    inner.appendChild(NK.util.el("div", { class: "loader-name", text: c.loader.name }));
    var bar = NK.util.el("div", { class: "loader-bar" }, [NK.util.el("div", { class: "fill" })]);
    inner.appendChild(bar);
    var pct = NK.util.el("div", { class: "loader-pct", text: "0%" });
    inner.appendChild(pct);
    root.appendChild(inner);
    return { root: root, fill: bar.querySelector(".fill"), pct: pct };
  };

  /* run the loader sequence, then call done() */
  NK.runLoader = function (ui, done) {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ui || reduced) { if (ui) ui.root.style.display = "none"; done(); return; }

    var p = 0;
    var iv = setInterval(function () {
      p += Math.random() * 16 + 6;
      if (p >= 100) { p = 100; clearInterval(iv); finish(); }
      ui.fill.style.width = p + "%";
      ui.pct.textContent = Math.floor(p) + "% — " + (NK.i18n.lang === "fa" ? NK.util.faNum(Math.floor(p)) + "٪" : Math.floor(p) + "%");
    }, 110);

    function finish() {
      setTimeout(function () {
        ui.root.classList.add("is-done");
        document.body.classList.add("loaded");
        done();
        setTimeout(function () { ui.root.remove(); }, 1000);
      }, 260);
    }
  };
})();
