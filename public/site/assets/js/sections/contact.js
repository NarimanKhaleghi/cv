/* ============================================================
   NK — THE PM · Section: contact (chapter 07 — destination)
   + shared toast helper
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.toast = function (msg) {
    var t = U.el("div", { class: "toast", text: msg });
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  };

  var ICONS = {
    email: "✉", phone: "☏", linkedin: "in", github: "⌥", resume: "≡", website: "⌂"
  };

  NK.sections.contact = {
    render: function (c) {
      var ct = c.contact;
      var cfg = NK.i18n.config();
      var sec = U.el("section", { class: "chapter contact grid-bg", id: "contact" });
      var cont = U.el("div", { class: "container" });

      cont.appendChild(U.el("div", { class: "ch-head" }, [
        U.el("div", { class: "ch-eyebrow" }, [
          U.el("span", { class: "no", text: ct.no, "data-reveal": "up" }),
          U.el("span", { class: "lbl mono", text: ct.label, "data-reveal": "up", style: { "--rd": ".08s" } })
        ]),
        U.el("h2", {
          class: "ch-title contact-big", "data-split": "",
          "aria-label": ct.title, "data-reveal": "up", style: { "--rd": ".15s" }
        }, [document.createTextNode(ct.title)]),
        U.el("p", { class: "contact-sub", html: ct.sub, "data-reveal": "up", style: { "--rd": ".25s" } })
      ]));

      /* résumé CTA card */
      cont.appendChild(U.el("div", { class: "contact-resume", "data-reveal": "pop", "data-magnet": "" }, [
        U.el("h3", { text: ct.resumeTitle }),
        U.el("p", { text: ct.resumeSub }),
        U.el("a", {
          class: "btn", href: cfg.resumeUrl || "#",
          target: "_blank", rel: "noopener noreferrer"
        }, [U.el("span", { text: ct.resumeBtn })]),
        U.el("span", { class: "hint", text: ct.resumeHint })
      ]));

      /* channels */
      cont.appendChild(U.el("div", { class: "mono", text: ct.channelsTitle, style: { marginTop: "46px", color: "var(--fg-faint)" }, "data-reveal": "up" }));
      var ch = U.el("div", { class: "channels" });
      (cfg.contact || []).forEach(function (k, i) {
        var href = k.href || (k.id === "email" ? "mailto:" + k.value : k.id === "phone" ? "tel:" + k.value.replace(/\s+/g, "") : "#");
        ch.appendChild(U.el("a", {
          class: "channel", href: href,
          target: /^https?:/.test(href) ? "_blank" : null,
          rel: "noopener noreferrer",
          "data-reveal": "up", style: { "--rd": (i * 0.05).toFixed(2) + "s" }
        }, [
          U.el("span", { class: "ic", text: ICONS[k.id] || "→", "aria-hidden": "true" }),
          U.el("span", {}, [
            U.el("span", { class: "lab", text: k.label }),
            U.el("span", { class: "val", text: k.value })
          ])
        ]));
      });
      cont.appendChild(ch);

      cont.appendChild(U.el("p", { class: "contact-note", text: ct.note, "data-reveal": "up" }));

      /* back to boarding gate */
      cont.appendChild(U.el("div", { style: { marginTop: "38px" }, "data-reveal": "up" }, [
        U.el("button", {
          class: "btn btn--ghost", type: "button", "data-magnet": "",
          onclick: function () { NK.fx.goTo("cover"); }
        }, [
          U.el("span", { text: c.ui.backTop }),
          U.el("span", { class: "ar", text: "↑" })
        ])
      ]));

      sec.appendChild(cont);

      /* footer */
      var foot = U.el("footer", { class: "footer" });
      foot.appendChild(U.el("div", { class: "container" }, [
        U.el("span", { class: "brand", text: c.footer.brand }),
        U.el("span", { class: "meta", text: c.ui.madeWith + " · " + c.footer.rights }),
        U.el("span", { class: "sync-meta", text: c.footer.sync })
      ]));
      sec.appendChild(foot);
      return sec;
    },
    after: function (sec) {
      var t = sec.querySelector(".contact-big");
      if (t) NK.fx.split(t);
    }
  };
})();
