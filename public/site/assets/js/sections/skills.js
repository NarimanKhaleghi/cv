/* ============================================================
   NK — THE PM · Section: skills (paper band)
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.skills = {
    render: function (c) {
      var s = c.skills;
      var sec = U.el("section", { class: "sec sec--paper", id: "skills" });
      var cont = U.el("div", { class: "container" });

      var head = U.el("div", { class: "sec-head" }, [
        U.el("div", { class: "idx", text: s.idx + " / " + s.label }),
        U.el("h2", { text: s.title }),
        U.el("p", { class: "sub", text: s.sub })
      ]);
      cont.appendChild(head);

      var list = U.el("div", { class: "sk-list" });
      s.groups.forEach(function (g, gi) {
        var row = U.el("div", { class: "sk-row", "data-reveal": "" });
        row.appendChild(U.el("div", { class: "sk-name" }, [
          U.el("i", { text: U.num(gi + 1, NK.i18n.lang) }),
          U.el("span", { text: g.name })
        ]));
        var items = U.el("div", { class: "sk-items" });
        g.items.forEach(function (it) {
          items.appendChild(U.el("span", {
            class: "chip" + (it.key ? " is-key" : ""),
            text: it.t
          }));
        });
        row.appendChild(items);
        list.appendChild(row);
      });
      cont.appendChild(list);
      sec.appendChild(cont);
      return sec;
    }
  };
})();
