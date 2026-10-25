/* ============================================================
   NK — THE PM · Section: hero
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.hero = {
    render: function (c) {
      var sec = U.el("section", { class: "hero pat-grid", id: "top" });
      sec.setAttribute("aria-label", c.hero.role);

      /* giant background mark */
      sec.appendChild(U.el("div", { class: "hero-mark", "aria-hidden": "true", text: "PM" }));

      var cont = U.el("div", { class: "container" });

      /* ------ text column ------ */
      var txt = U.el("div", { class: "hero-txt" });
      var kick = U.el("div", { class: "hero-kicker" });
      c.hero.kicker.forEach(function (k, i) {
        var st = U.el("span", { class: "sticker", text: k, style: { "--rot": (i % 2 ? "2deg" : "-3deg") } });
        kick.appendChild(st);
      });
      txt.appendChild(kick);

      /* split-letter name (Latin) — whole-word reveal for Arabic script
         (per-letter spans break cursive letter joining) */
      var name = U.el("h1", { class: "hero-name" });
      c.hero.nameLines.forEach(function (line, li) {
        var wrap = U.el("span", { class: li === 0 ? "" : "row2 " + (line.style === "outline" ? "outline-txt" : "") });
        var isCursive = /[\u0600-\u06FF]/.test(line.text);
        if (isCursive) {
          var wOuter = U.el("span", { class: "hl" });
          var wInner = U.el("span", { text: line.text });
          wInner.style.setProperty("--d", (li * 0.18) + "s");
          wOuter.appendChild(wInner);
          wrap.appendChild(wOuter);
        } else {
          Array.from(line.text).forEach(function (ch, i) {
            var outer = U.el("span", { class: "hl" });
            var inner = U.el("span", { text: ch === " " ? "\u00A0" : ch });
            inner.style.setProperty("--d", (li * 0.16 + i * 0.035) + "s");
            outer.appendChild(inner);
            wrap.appendChild(outer);
          });
        }
        name.appendChild(wrap);
      });
      txt.appendChild(name);

      var role = U.el("p", { class: "hero-role" }, [
        U.el("span", { text: c.hero.role }),
        U.el("span", { class: "sep", "aria-hidden": "true" }),
        U.el("span", { text: c.hero.roleSep }),
        U.el("span", { class: "caret", "aria-hidden": "true" })
      ]);
      txt.appendChild(role);

      txt.appendChild(U.el("p", { class: "hero-pitch", html: c.hero.pitch }));

      var cta = U.el("div", { class: "hero-cta" });
      cta.appendChild(U.el("a", { class: "btn", href: "#projects" }, [
        U.el("span", { text: c.hero.ctaProjects }),
        U.el("span", { class: "ar", text: NK.i18n.lang === "fa" ? "↓" : "↓", "aria-hidden": "true" })
      ]));
      cta.appendChild(U.el("a", { class: "btn btn--ghost", href: "#contact" }, [
        U.el("span", { text: c.hero.ctaContact }),
        U.el("span", { class: "ar", text: NK.i18n.lang === "fa" ? "←" : "→", "aria-hidden": "true" })
      ]));
      txt.appendChild(cta);
      cont.appendChild(txt);

      /* ------ visual column: NK monogram board ------ */
      var vis = U.el("div", { class: "hero-vis" });
      var mg = U.el("div", { class: "monogram", "data-tilt": "" });
      mg.appendChild(U.el("div", { class: "m-top" }, [
        U.el("span", { text: c.hero.monogram.top1 }),
        U.el("span", { text: c.hero.monogram.top2 })
      ]));
      mg.appendChild(U.el("div", { class: "halftone", "aria-hidden": "true" }));
      mg.appendChild(U.el("div", { class: "m-nk", text: "NK", "aria-hidden": "true" }));
      mg.appendChild(U.el("div", { class: "m-bot" }, [
        U.el("span", { text: c.hero.monogram.bot1 }),
        U.el("span", { text: c.hero.monogram.bot2 })
      ]));
      vis.appendChild(mg);

      var stw = U.el("div", { class: "hero-stickers", "aria-hidden": "true" });
      c.hero.stickers.forEach(function (s) {
        stw.appendChild(U.el("span", {
          class: "sticker floaty " + s.cls,
          text: s.text,
          style: { "--rot": s.rot, "--fd": s.fd }
        }));
      });
      vis.appendChild(stw);
      cont.appendChild(vis);

      sec.appendChild(cont);

      /* ------ bottom row ------ */
      var foot = U.el("div", { class: "hero-foot" });
      foot.appendChild(U.el("span", { class: "loc", text: c.hero.location }));
      foot.appendChild(U.el("span", { class: "scroll-hint" }, [
        U.el("span", { class: "wheel", "aria-hidden": "true" }),
        U.el("span", { text: c.hero.scroll })
      ]));
      sec.appendChild(foot);

      return sec;
    },
    after: function (sec) {
      requestAnimationFrame(function () { sec.classList.add("is-in"); });
      NK.fx.initParallax(sec);
    }
  };
})();
