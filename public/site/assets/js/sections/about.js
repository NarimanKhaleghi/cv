/* ============================================================
   NK — THE PM · Section: about
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.about = {
    render: function (c) {
      var a = c.about;
      var sec = U.el("section", { class: "sec", id: "about" });
      var cont = U.el("div", { class: "container" });

      var head = U.el("div", { class: "sec-head" }, [
        U.el("div", { class: "idx", text: a.idx + " / " + a.label }),
        U.el("h2", { text: a.title })
      ]);
      cont.appendChild(head);

      var grid = U.el("div", { class: "two-col" });
      grid.appendChild(U.el("div", { class: "col-label" }, [
        U.el("div", { class: "big-idx", text: a.idx }),
        U.el("div", { class: "lab-t", text: a.label })
      ]));

      var body = U.el("div", { class: "about-body" });
      a.paragraphs.forEach(function (p, i) {
        body.appendChild(U.el("p", { html: p, "data-reveal": i % 2 ? "right" : "left" }));
      });

      var q = U.el("div", { class: "about-quote", "data-reveal": "pop" }, [
        U.el("p", { text: "“" + a.quote + "”" }),
        U.el("div", { class: "by", text: a.quoteBy })
      ]);
      body.appendChild(q);

      /* quick facts */
      body.appendChild(U.el("div", { class: "mono", text: a.factsTitle, style: { fontSize: ".7rem", letterSpacing: ".28em", opacity: ".55", marginBottom: "12px" } }));
      var facts = U.el("div", { class: "facts" });
      a.facts.forEach(function (f, i) {
        var card = U.el("div", { class: "fact", "data-reveal": "", style: { "--d": (i * 0.06) + "s" } }, [
          U.el("div", { class: "k", text: f.k }),
          U.el("div", { class: "v", text: f.v })
        ]);
        facts.appendChild(card);
      });
      body.appendChild(facts);

      /* beyond the desk */
      var by = U.el("div", { class: "beyond", "data-reveal": "" }, [
        U.el("div", { class: "bt", text: a.beyondTitle })
      ]);
      var chips = U.el("div", { class: "chip-row" });
      a.beyond.forEach(function (b) { chips.appendChild(U.el("span", { class: "chip", text: b })); });
      by.appendChild(chips);
      body.appendChild(by);

      grid.appendChild(body);
      cont.appendChild(grid);
      sec.appendChild(cont);
      return sec;
    }
  };
})();
