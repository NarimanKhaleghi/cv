/* ============================================================
   NK — THE PM · Section: cover (chapter 00 — boarding)
   Minimal first view: photo + name + one line + 2 CTAs.
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  /* rotating circular text ring (SVG textPath) */
  function ring(text) {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");
    var defs = document.createElementNS(NS, "defs");
    var path = document.createElementNS(NS, "path");
    path.setAttribute("id", "ringPath");
    path.setAttribute("d", "M100,100 m-93,0 a93,93 0 1,1 186,0 a93,93 0 1,1 -186,0");
    defs.appendChild(path);
    svg.appendChild(defs);
    var t = document.createElementNS(NS, "text");
    var tp = document.createElementNS(NS, "textPath");
    tp.setAttribute("href", "#ringPath");
    tp.setAttribute("startOffset", "0");
    /* one repetition, tuned so it fills the circumference (r=93 → ~584 units) */
    tp.textContent = text;
    t.appendChild(tp);
    svg.appendChild(t);
    return svg;
  }

  NK.sections.cover = {
    render: function (c) {
      var cfg = NK.i18n.config();
      var cv = c.cover;

      var sec = U.el("section", { class: "chapter cover", id: "cover" });

      var grid = U.el("div", { class: "container" });

      /* ---------- text column ---------- */
      var txt = U.el("div", { class: "cover-txt" }, [
        U.el("div", { class: "cover-kicker mono", "data-reveal": "up" }, [
          U.el("span", { class: "dot", "aria-hidden": "true" }),
          U.el("span", { text: cv.kicker })
        ]),
        U.el("h1", {
          class: "cover-name",
          "aria-label": cv.nameLines.map(function (l) { return l.text; }).join(" ")
        }, cv.nameLines.map(function (l, i) {
          return U.el("span", {
            class: "row" + (l.style === "outline" ? " row--outline" : ""),
            text: l.text + (i < cv.nameLines.length - 1 ? " " : "")
          });
        })),
        U.el("div", { class: "cover-role", "data-reveal": "up", style: { "--rd": ".25s" } }, [
          U.el("span", { text: cv.role }),
          U.el("span", { class: "sep", "aria-hidden": "true" }),
          U.el("span", { text: cv.roleSep })
        ]),
        U.el("p", { class: "cover-pitch", html: cv.pitch, "data-reveal": "up", style: { "--rd": ".4s" } }),
        U.el("div", { class: "cover-ctas", "data-reveal": "up", style: { "--rd": ".55s" } }, [
          U.el("button", {
            class: "btn", type: "button", "data-magnet": "",
            onclick: function () { NK.fx.goTo("about"); }
          }, [
            U.el("span", { text: cv.ctaStart }),
            U.el("span", { class: "ar", text: NK.i18n.lang === "fa" ? "↓" : "↓" })
          ]),
          U.el("a", {
            class: "btn btn--ghost", href: cfg.resumeUrl || "#",
            target: "_blank", rel: "noopener noreferrer", "data-magnet": ""
          }, [U.el("span", { text: cv.ctaResume })]),
          U.el("span", { class: "cover-resume-hint", text: cv.ctaResumeHint })
        ])
      ]);

      /* ---------- photo column ---------- */
      var photo = U.el("div", { class: "cover-photo", "data-reveal": "pop", style: { "--rd": ".3s" } }, [
        U.el("div", { class: "photo-ring", "aria-hidden": "true", "data-plx": "6" }, [ring(cv.ring)]),
        U.el("div", { class: "photo-frame", "data-plx": "-4" }, [
          U.el("img", { src: "assets/img/profile.jpg", alt: cv.photoAlt, width: "460", height: "460" })
        ]),
        U.el("span", { class: "sticker stk-a", text: cv.stickerA, "data-plx": "12" }),
        U.el("span", { class: "sticker stk-b", text: cv.stickerB, "data-plx": "-10" })
      ]);

      /* easter egg: click a sticker 3× */
      var hits = 0;
      photo.addEventListener("click", function (e) {
        if (!e.target.closest(".sticker")) return;
        hits++;
        e.target.classList.add("badge-hit");
        setTimeout(function () { e.target.classList.remove("badge-hit"); }, 650);
        if (hits >= 3) {
          hits = 0;
          NK.fx.confetti(e.clientX, e.clientY);
          NK.toast(c.contact.toast);
        }
      });

      grid.appendChild(txt);
      grid.appendChild(photo);
      sec.appendChild(grid);

      /* scroll cue */
      sec.appendChild(U.el("button", {
        class: "cover-scroll", type: "button",
        onclick: function () { NK.fx.goTo("about"); },
        "aria-label": cv.scroll
      }, [
        U.el("span", { class: "txt", text: cv.scroll }),
        U.el("span", { class: "arrow", text: "↓", "aria-hidden": "true" })
      ]));

      /* departures ticker at the bottom edge */
      var items = [];
      for (var rep = 0; rep < 2; rep++) cv.ticker.forEach(function (t) { items.push(t); });
      sec.appendChild(NK.sections.marquee.render(c, { items: items, flat: false, bottom: true }));

      return sec;
    },
    after: function (sec) {
      /* split each display row into word masks (whole words — Persian-safe) */
      var idx = 0;
      sec.querySelectorAll(".cover-name .row").forEach(function (row) {
        var words = row.textContent.trim().split(/\s+/);
        row.textContent = "";
        words.forEach(function (w, wi) {
          var wrap = document.createElement("span");
          wrap.className = "w";
          wrap.setAttribute("aria-hidden", "true");
          var inner = document.createElement("i");
          inner.textContent = w;
          inner.style.setProperty("--i", idx++);
          wrap.appendChild(inner);
          row.appendChild(wrap);
          if (wi < words.length - 1) row.appendChild(document.createTextNode(" "));
        });
      });
    }
  };
})();
