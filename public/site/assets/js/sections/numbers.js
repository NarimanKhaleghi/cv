/* ============================================================
   NK — THE PM · Section: numbers (chapter 02 — proof)
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.numbers = {
    render: function (c) {
      var n = c.numbers;
      var sec = U.el("section", { class: "chapter chapter--tight numbers grid-bg", id: "numbers" });
      var cont = U.el("div", { class: "container", style: { position: "relative" } });
      cont.appendChild(NK.chHead(c, n));

      var grid = U.el("div", { class: "numbers-grid" });
      n.items.forEach(function (it, i) {
        var cell = U.el("div", {
          class: "num-cell", "data-reveal": "up",
          style: { "--rd": (i * 0.06).toFixed(2) + "s" }
        }, [
          U.el("div", { class: "big" }, [
            U.el("span", { "data-count": it.value, "data-suffix": "" }, [U.el("span", { class: "n-val", text: "0" })]),
            it.suffix ? U.el("span", { class: "suffix", text: it.suffix }) : null
          ]),
          U.el("div", { class: "bar", "aria-hidden": "true" }),
          U.el("div", { class: "lbl", text: it.label })
        ]);
        grid.appendChild(cell);
      });
      cont.appendChild(grid);
      sec.appendChild(cont);
      return sec;
    }
  };
})();
