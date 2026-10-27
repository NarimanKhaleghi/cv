/* ============================================================
   NK — THE PM · Section: toolbox (chapter 04 — skill drawers)
   Eight drawers; click to unfold the chips of each group.
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.toolbox = {
    render: function (c) {
      var t = c.toolbox;
      var sec = U.el("section", { class: "chapter chapter--tight toolbox", id: "toolbox" });
      var cont = U.el("div", { class: "container" });
      var head = NK.chHead(c, t);
      if (t.sub) head.appendChild(U.el("p", { class: "ch-sub", html: t.sub, "data-reveal": "up", style: { "--rd": ".2s" } }));
      cont.appendChild(head);

      t.groups.forEach(function (g, i) {
        var acc = U.el("div", { class: "acc drawer", "data-reveal": "up", style: { "--rd": (i * 0.04).toFixed(2) + "s" } });

        var headBtn = U.el("button", {
          class: "acc__head", type: "button",
          "aria-expanded": "false",
          "data-cursor-link": ""
        }, [
          U.el("span", { class: "acc__idx", text: U.num(i + 1, NK.i18n.lang) }),
          U.el("span", { class: "acc__title", text: g.name }),
          U.el("span", { class: "acc__meta" }, [
            U.el("span", { class: "cnt", text: U.num(g.items.length, NK.i18n.lang) }),
            U.el("span", { class: "acc__toggle", text: "+", "aria-hidden": "true" })
          ])
        ]);

        var chips = U.el("div", { class: "drawer-chips" });
        g.items.forEach(function (s) {
          chips.appendChild(U.el("span", { class: "chip" + (s.key ? " chip--key" : ""), text: s.t }));
        });
        var body = U.el("div", { class: "acc__body" }, [
          U.el("div", { class: "acc__inner" }, [
            U.el("div", { class: "acc__content" }, [chips])
          ])
        ]);

        headBtn.addEventListener("click", function () {
          var open = acc.classList.toggle("is-open");
          headBtn.setAttribute("aria-expanded", String(open));
        });

        acc.appendChild(headBtn);
        acc.appendChild(body);
        cont.appendChild(acc);
      });

      sec.appendChild(cont);
      return sec;
    }
  };
})();
