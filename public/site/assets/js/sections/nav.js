/* ============================================================
   NK — THE PM · Section: nav + mobile menu
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.nav = {
    render: function (c) {
      var nav = document.getElementById("nav");
      nav.innerHTML = "";
      var cont = U.el("div", { class: "container" });

      var logo = U.el("a", {
        class: "nav-logo", href: "#top", "aria-label": "NK — home",
        "data-cursor": "hover"
      }, [
        U.el("span", { class: "logo-box", text: "NK" }),
        U.el("span", { text: "THE PM" })
      ]);
      cont.appendChild(logo);

      var links = U.el("nav", { class: "nav-links", "aria-label": "Primary" });
      c.nav.forEach(function (item) {
        links.appendChild(U.el("a", {
          class: "nav-link", href: "#" + item.id,
          "data-sec": item.id, text: item.label
        }));
      });
      cont.appendChild(links);

      /* lang switch */
      var ls = U.el("div", { class: "lang-switch", role: "group", "aria-label": "Language" });
      ls.appendChild(U.el("button", {
        type: "button", "data-lang-btn": "en",
        class: NK.i18n.lang === "en" ? "is-on" : "",
        text: "EN",
        onclick: function () { NK.switchLang("en"); }
      }));
      ls.appendChild(U.el("span", { class: "sep" }));
      ls.appendChild(U.el("button", {
        type: "button", "data-lang-btn": "fa",
        class: NK.i18n.lang === "fa" ? "is-on" : "",
        text: "FA",
        onclick: function () { NK.switchLang("fa"); }
      }));
      cont.appendChild(ls);

      /* burger */
      var burger = U.el("button", {
        class: "nav-burger", type: "button", id: "burger",
        "aria-label": "Menu", "aria-expanded": "false"
      }, [U.el("span"), U.el("span"), U.el("span")]);
      cont.appendChild(burger);
      nav.appendChild(cont);

      /* mobile menu overlay */
      var mm = document.getElementById("mmenu");
      mm.innerHTML = "";
      mm.setAttribute("dir", c.meta.dir);
      mm.appendChild(U.el("div", { class: "mmenu-title mono", text: c.navMenu.title, style: { marginBottom: "10px", opacity: ".5", fontSize: ".72rem", letterSpacing: ".3em" } }));
      c.nav.forEach(function (item, i) {
        var a = U.el("a", {
          href: "#" + item.id, style: { transitionDelay: (0.06 * i + 0.1) + "s" }
        }, [
          U.el("i", { text: "0" + (i + 1) }),
          U.el("span", { text: item.label })
        ]);
        a.addEventListener("click", function () { NK.closeMenu(); });
        mm.appendChild(a);
      });
      mm.appendChild(U.el("div", { class: "mmenu-foot", text: c.navMenu.foot }));

      burger.addEventListener("click", function () {
        var open = mm.classList.toggle("is-open");
        burger.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("modal-lock", open);
      });
    }
  };

  NK.closeMenu = function () {
    var mm = document.getElementById("mmenu");
    var burger = document.getElementById("burger");
    if (!mm) return;
    mm.classList.remove("is-open");
    if (burger) { burger.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
    document.body.classList.remove("modal-lock");
  };
})();
