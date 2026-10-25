/* ============================================================
   NK — THE PM · Section: journey (chapter 03 — career route map)
   A vertical rail fills as you scroll; stations are click-to-open
   accordion cards (progressive disclosure).
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.journey = {
    render: function (c) {
      var j = c.journey;
      var sec = U.el("section", { class: "chapter journey", id: "journey" });
      var cont = U.el("div", { class: "container" });
      var head = NK.chHead(c, j);
      if (j.sub) head.appendChild(U.el("p", { class: "ch-sub", html: j.sub, "data-reveal": "up", style: { "--rd": ".2s" } }));
      cont.appendChild(head);

      var wrap = U.el("div", { class: "journey-wrap" }, [
        U.el("div", { class: "journey-rail", "aria-hidden": "true" }, [
          U.el("span", { class: "fill" })
        ])
      ]);

      j.jobs.forEach(function (job, i) {
        var num = U.num(i + 1, NK.i18n.lang);
        var st = U.el("article", { class: "station" }, [
          U.el("span", { class: "node", "aria-hidden": "true" })
        ]);

        var acc = U.el("div", { class: "acc", "data-reveal": i % 2 ? "right" : "left" });

        /* head — the collapsed, minimal view */
        var metaBits = [];
        if (job.promo) metaBits.push(U.el("span", { class: "badge-promo", text: j.promoBadge }));

        var headBtn = U.el("button", {
          class: "acc__head", type: "button",
          "aria-expanded": "false",
          "data-cursor-link": ""
        }, [
          U.el("span", { class: "acc__idx", text: num }),
          U.el("span", { style: { minWidth: "0" } }, [
            U.el("span", { class: "acc__title role", text: job.role }),
            U.el("span", { class: "comp", text: job.company })
          ]),
          U.el("span", { class: "acc__meta" }, metaBits.concat([
            U.el("span", { class: "acc__period", text: job.period }),
            U.el("span", { class: "acc__toggle", text: "+", "aria-hidden": "true" })
          ]))
        ]);

        /* body — the full story */
        var content = U.el("div", { class: "acc__content" }, (function () {
          var kids = [];
          kids.push(U.el("p", { class: "j-company", text: job.companyDesc }));
          kids.push(U.el("p", { class: "j-intro", html: job.intro }));
          var ul = U.el("ul", { class: "j-bullets" });
          job.bullets.forEach(function (b) { ul.appendChild(U.el("li", { html: b })); });
          kids.push(ul);
          return kids;
        })());

        var body = U.el("div", { class: "acc__body" }, [
          U.el("div", { class: "acc__inner" }, [content])
        ]);

        headBtn.addEventListener("click", function () {
          var open = acc.classList.toggle("is-open");
          headBtn.setAttribute("aria-expanded", String(open));
          st.classList.toggle("is-open", open);
          if (open) {
            /* let the route know the layout changed */
            window.dispatchEvent(new Event("resize"));
            setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 620);
          }
        });

        acc.appendChild(headBtn);
        acc.appendChild(body);
        st.appendChild(acc);
        wrap.appendChild(st);
      });

      /* side trips note */
      wrap.appendChild(U.el("aside", { class: "side-trip", "data-reveal": "up" }, [
        U.el("div", { class: "st-title", text: j.sideTripTitle }),
        U.el("p", { html: j.alsoNote })
      ]));

      cont.appendChild(wrap);
      sec.appendChild(cont);
      return sec;
    }
  };
})();
