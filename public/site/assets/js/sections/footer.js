/* ============================================================
   NK — THE PM · Section: footer
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.footer = {
    render: function (c) {
      var f = c.footer;
      var cfg = NK.i18n.config();
      var lang = NK.i18n.lang;

      var foot = U.el("footer", { class: "footer" });
      var cont = U.el("div", { class: "container" });

      cont.appendChild(U.el("span", { class: "f-brand", text: f.brand }));

      var sync = U.el("span", { class: "f-meta sync-meta" }, (function () {
        var txt = f.sync + ": —";
        if (NK.projectsData && NK.projectsData.generatedAt) {
          txt = f.sync + ": " + U.fmtDate(NK.projectsData.generatedAt, lang);
        }
        return [document.createTextNode(txt)];
      })());
      cont.appendChild(sync);

      var right = U.el("span", { class: "f-meta" }, [
        U.el("span", { text: f.built + "  ·  " }),
        U.el("a", { href: "https://github.com/" + (cfg.githubUser || ""), target: "_blank", rel: "noopener", text: "GitHub ↗" }),
        U.el("span", { text: "  ·  " + f.rights })
      ]);
      cont.appendChild(right);

      foot.appendChild(cont);
      return foot;
    }
  };
})();
