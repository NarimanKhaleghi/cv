/* ============================================================
   NK — THE PM · Section: stats (inverted paper band)
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.stats = {
    render: function (c) {
      var s = c.stats;
      var sec = U.el("section", { class: "sec sec--paper pat-dots", id: "stats" });
      var cont = U.el("div", { class: "container" });

      var head = U.el("div", { class: "sec-head" }, [
        U.el("div", { class: "idx", text: s.idx + " / " + s.label }),
        U.el("h2", { text: s.title })
      ]);
      cont.appendChild(head);

      var grid = U.el("div", { class: "stats-grid" });
      s.items.forEach(function (it, i) {
        var card = U.el("div", {
          class: "stat",
          "data-reveal": "pop",
          style: { "--d": (i * 0.07) + "s", "--rot": i % 2 ? "1.2deg" : "-1.2deg" }
        }, [
          U.el("div", {
            class: "n",
            "data-count": it.value,
            "data-suffix": it.suffix,
            "aria-label": it.label
          }, [U.el("span", { class: "n-val", text: "0" + (it.suffix || "") })]),
          U.el("div", { class: "l", text: it.label })
        ]);
        grid.appendChild(card);
      });
      cont.appendChild(grid);
      sec.appendChild(cont);
      return sec;
    },
    after: function () {
      NK.fx.initCounters(document);
    }
  };
})();
