/* ============================================================
   NK — THE PM · Section: education (paper band)
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.education = {
    render: function (c) {
      var e = c.education;
      var sec = U.el("section", { class: "sec sec--paper", id: "education" });
      var cont = U.el("div", { class: "container" });

      var head = U.el("div", { class: "sec-head" }, [
        U.el("div", { class: "idx", text: e.idx + " / " + e.label }),
        U.el("h2", { text: e.title })
      ]);
      cont.appendChild(head);

      var grid = U.el("div", { class: "edu-grid" });
      e.items.forEach(function (it, i) {
        var card = U.el("div", {
          class: "edu-card", "data-reveal": "pop",
          style: { "--d": (i * 0.08) + "s", "--rot": i % 2 ? "1deg" : "-1deg" }
        }, [
          U.el("h3", { class: "deg", text: it.degree }),
          U.el("p", { class: "sch", text: it.school }),
          U.el("span", { class: "yrs", text: it.years })
        ]);
        grid.appendChild(card);
      });
      cont.appendChild(grid);

      cont.appendChild(U.el("p", { class: "edu-note", text: e.note, "data-reveal": "" }));
      sec.appendChild(cont);
      return sec;
    }
  };
})();
