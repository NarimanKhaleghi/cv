/* ============================================================
   NK — THE PM · Section: edu (chapter 06 — foundations)
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.edu = {
    render: function (c) {
      var e = c.edu;
      var sec = U.el("section", { class: "chapter chapter--tight edu", id: "edu" });
      var cont = U.el("div", { class: "container" });
      cont.appendChild(NK.chHead(c, e));

      var grid = U.el("div", { class: "edu-grid" });
      e.items.forEach(function (it, i) {
        grid.appendChild(U.el("div", { class: "edu-card", "data-reveal": "up", style: { "--rd": (i * 0.08).toFixed(2) + "s" } }, [
          U.el("div", { class: "deg", text: it.degree }),
          U.el("div", { class: "sch", text: it.school }),
          U.el("span", { class: "yrs", text: it.years })
        ]));
      });
      cont.appendChild(grid);

      var side = U.el("div", { class: "edu-side", "data-reveal": "up" }, [
        U.el("div", { class: "st-title", text: e.sideTitle })
      ]);
      e.side.forEach(function (s) {
        side.appendChild(U.el("div", { class: "side-row" }, [
          U.el("span", { class: "k", text: s.k }),
          U.el("span", { class: "v", text: s.v })
        ]));
      });
      cont.appendChild(side);

      cont.appendChild(U.el("p", { class: "edu-note", text: e.note, "data-reveal": "up" }));
      sec.appendChild(cont);
      return sec;
    }
  };
})();
