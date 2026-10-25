/* ============================================================
   NK — THE PM · Section: experience timeline
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.experience = {
    render: function (c) {
      var x = c.experience;
      var sec = U.el("section", { class: "sec", id: "experience" });
      var cont = U.el("div", { class: "container" });

      var head = U.el("div", { class: "sec-head" }, [
        U.el("div", { class: "idx", text: x.idx + " / " + x.label }),
        U.el("h2", { text: x.title }),
        U.el("p", { class: "sub", text: x.sub })
      ]);
      cont.appendChild(head);

      var list = U.el("div", { class: "xp-list" });
      list.appendChild(U.el("div", { class: "xp-rail", "aria-hidden": "true" }, [
        U.el("div", { class: "fill" })
      ]));

      x.jobs.forEach(function (j, i) {
        var item = U.el("div", { class: "xp-item" });
        item.appendChild(U.el("div", { class: "xp-node", "aria-hidden": "true" }));

        var card = U.el("article", { class: "xp-card", "data-reveal": "", "data-tilt": "" });

        var top = U.el("div", { class: "xp-top" }, [
          U.el("h3", { class: "xp-role", text: j.role }),
          U.el("span", { class: "xp-period", text: j.period })
        ]);
        if (j.promo) {
          top.appendChild(U.el("span", { class: "promo-badge", text: x.promoBadge }));
        }
        card.appendChild(top);

        card.appendChild(U.el("p", { class: "xp-co" }, [
          U.el("b", { text: j.company }),
          U.el("span", { class: "od", text: " — " + j.companyDesc })
        ]));
        card.appendChild(U.el("p", { class: "xp-meta", text: j.meta }));
        card.appendChild(U.el("p", { class: "xp-intro", html: j.intro }));

        var ul = U.el("ul", { class: "xp-bullets" });
        j.bullets.forEach(function (b) {
          ul.appendChild(U.el("li", { html: b }));
        });
        card.appendChild(ul);

        item.appendChild(card);
        list.appendChild(item);
      });

      cont.appendChild(list);
      cont.appendChild(U.el("p", { class: "xp-also", html: x.alsoNote, "data-reveal": "" }));
      sec.appendChild(cont);
      return sec;
    },
    after: function () {
      NK.fx.initTimeline();
    }
  };
})();
