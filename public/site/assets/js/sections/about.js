/* ============================================================
   NK — THE PM · Section: about (chapter 01 — who)
   Progressive disclosure: teaser → "read more" → full story.
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  function chapterHead(c, block) {
    return U.el("div", { class: "ch-head" }, [
      U.el("div", { class: "ch-eyebrow" }, [
        U.el("span", { class: "no", text: block.no, "data-reveal": "up" }),
        U.el("span", { class: "lbl mono", text: block.label, "data-reveal": "up", style: { "--rd": ".08s" } }),
        U.el("span", { class: "line", "aria-hidden": "true" })
      ]),
      U.el("h2", { class: "ch-title", html: block.title, "data-reveal": "up", style: { "--rd": ".15s" } })
    ]);
  }
  NK.chHead = chapterHead;

  NK.sections.about = {
    render: function (c) {
      var a = c.about;
      var sec = U.el("section", { class: "chapter chapter--tight about", id: "about" });
      var cont = U.el("div", { class: "container" });
      cont.appendChild(chapterHead(c, a));

      /* teaser — the only thing visible before clicking */
      cont.appendChild(U.el("p", { class: "about-lead", html: a.teaser, "data-reveal": "up" }));

      /* read-more toggle */
      var body = U.el("div", { class: "acc__body" });
      var inner = U.el("div", { class: "acc__inner" });
      var content = U.el("div", { class: "acc__content", style: { paddingInline: "0", borderTop: "0", marginTop: "0" } });

      a.paragraphs.forEach(function (p, i) {
        content.appendChild(U.el("p", { html: p, "data-reveal": "up" }));
      });

      /* facts grid */
      var facts = U.el("div", { class: "about-facts" });
      a.facts.forEach(function (f) {
        facts.appendChild(U.el("div", { class: "fact", "data-reveal": "pop" }, [
          U.el("div", { class: "k", text: f.k }),
          U.el("div", { class: "v", text: f.v })
        ]));
      });
      content.appendChild(U.el("h3", { class: "mono", text: a.factsTitle, style: { marginTop: "30px" } }));
      content.appendChild(facts);

      /* quote */
      content.appendChild(U.el("blockquote", { class: "about-quote", "data-reveal": "pop" }, [
        U.el("span", { text: "“" + a.quote + "”" }),
        U.el("span", { class: "by", text: a.quoteBy })
      ]));

      /* beyond */
      var beyond = U.el("div", { class: "about-beyond" }, [U.el("span", { class: "bt", text: a.beyondTitle })]);
      a.beyond.forEach(function (t) { beyond.appendChild(U.el("span", { class: "chip chip--pill", text: t })); });
      content.appendChild(beyond);

      inner.appendChild(content);
      body.appendChild(inner);

      var more = U.el("button", {
        class: "about-more", type: "button",
        "aria-expanded": "false",
        "data-reveal": "up",
        onclick: function () {
          var open = body.classList.toggle("is-open");
          more.setAttribute("aria-expanded", String(open));
          more.querySelector(".lbl-more").textContent = open ? c.ui.readLess : c.ui.readMore;
          if (open) NK.fx.initReveals(content);
        }
      }, [
        U.el("span", { class: "plus", text: "+", "aria-hidden": "true" }),
        U.el("span", { class: "lbl-more", text: c.ui.readMore })
      ]);

      cont.appendChild(more);
      cont.appendChild(body);
      sec.appendChild(cont);
      return sec;
    }
  };
})();
