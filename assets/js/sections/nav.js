/* ============================================================
   NK — THE PM · Section: nav (top bar + side flight rail + menu)
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  var bar = null, menu = null;

  function themeBtn(c) {
    return U.el("button", {
      class: "icon-btn",
      type: "button",
      "data-theme-btn": "",
      "data-theme-label": c.ui.themeLabel,
      "aria-label": c.ui.themeLabel,
      onclick: function (e) { NK.theme.toggle(e.clientX || innerWidth - 40, e.clientY || 30); }
    }, [
      U.el("span", { class: "ic-moon", text: "☾", "aria-hidden": "true" }),
      U.el("span", { class: "ic-sun",  text: "☀", "aria-hidden": "true" })
    ]);
  }

  function langBtn(c) {
    return U.el("button", {
      class: "icon-btn lang-btn", type: "button",
      "aria-label": "Switch language",
      onclick: function () { NK.switchLang(NK.i18n.lang === "en" ? "fa" : "en"); }
    }, [U.el("span", { text: c.meta.switchLabel })]);
  }

  function burgerBtn(c) {
    return U.el("button", {
      class: "icon-btn burger", type: "button",
      "aria-label": c.ui.menu,
      "data-burger": "",
      onclick: function () { toggleMenu(); }
    }, [U.el("span", { class: "bars", "aria-hidden": "true" })]);
  }

  function toggleMenu(force) {
    if (!menu || !bar) return;
    var open = typeof force === "boolean" ? force : !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", open);
    var b = bar.querySelector("[data-burger]");
    if (b) b.classList.toggle("is-open", open);
    document.body.classList.toggle("modal-lock", open);
  }
  NK.closeMenu = function () { toggleMenu(false); };

  NK.sections = NK.sections || {};

  NK.sections.nav = {
    render: function () {
      var c = NK.i18n.content();
      var cfg = NK.i18n.config();

      /* ---- top bar ---- */
      if (!bar) { bar = document.querySelector(".nav"); }
      if (bar) {
        bar.innerHTML = "";
        bar.appendChild(U.el("div", { class: "container" }, [
          U.el("a", {
            class: "nav-logo", href: "#cover",
            onclick: function (e) { e.preventDefault(); NK.fx.goTo("cover"); }
          }, [
            U.el("span", { class: "logo-box", text: "NK" }),
            U.el("span", { class: "logo-sub", text: "/ THE PM" })
          ]),
          U.el("div", { class: "nav-actions" }, [
            U.el("a", {
              class: "cv-btn", href: cfg.resumeUrl || "#",
              target: "_blank", rel: "noopener noreferrer",
              "data-magnet": "", text: c.ui.resume + " ↗"
            }),
            themeBtn(c),
            langBtn(c),
            burgerBtn(c)
          ])
        ]));
      }

      /* ---- side rail (desktop) ---- */
      var old = document.querySelector(".rail");
      if (old) old.remove();
      var rail = U.el("nav", { class: "rail", "aria-label": "Chapters" }, [
        U.el("span", { class: "rail-line", "aria-hidden": "true" }),
        U.el("span", { class: "rail-fill", "aria-hidden": "true" })
      ]);
      c.chapters.forEach(function (ch) {
        rail.appendChild(U.el("button", {
          class: "rail-dot", type: "button",
          "data-target": ch.id,
          "aria-label": ch.label,
          onclick: function () { NK.fx.goTo(ch.id); }
        }, [U.el("span", { class: "tip", text: ch.no + " · " + ch.label })]));
      });
      document.body.appendChild(rail);

      /* ---- mobile menu ---- */
      if (!menu) { menu = document.getElementById("mmenu"); }
      if (menu) {
        menu.innerHTML = "";
        var list = U.el("nav", { class: "mmenu-list" });
        c.chapters.forEach(function (ch, i) {
          list.appendChild(U.el("a", {
            class: "mmenu-link", href: "#" + ch.id,
            style: { "--i": i },
            onclick: function (e) {
              e.preventDefault();
              toggleMenu(false);
              setTimeout(function () { NK.fx.goTo(ch.id); }, 60);
            }
          }, [
            U.el("span", { class: "n", text: ch.no }),
            U.el("span", { text: ch.label })
          ]));
        });
        menu.appendChild(list);
        menu.appendChild(U.el("div", { class: "mmenu-foot" }, [
          U.el("a", {
            class: "btn btn--sm", href: cfg.resumeUrl || "#",
            target: "_blank", rel: "noopener noreferrer", text: c.ui.resume + " ↗"
          }),
          U.el("span", { class: "mono", text: "THEPM.IR — EST. 2016" })
        ]));
      }
    }
  };
})();
