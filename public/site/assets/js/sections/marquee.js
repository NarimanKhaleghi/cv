/* ============================================================
   NK — THE PM · Section: marquee band
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  NK.sections.marquee = {
    render: function (c, opts) {
      opts = opts || {};
      var items = opts.items || c.marquee;
      var dark = !!opts.dark;

      var band = U.el("div", { class: "marquee" + (dark ? " marquee--dark" : ""), "aria-hidden": "true" });
      var track = U.el("div", { class: "marquee-track" });
      /* two identical groups → seamless -50% loop */
      for (var g = 0; g < 2; g++) {
        items.forEach(function (t) {
          track.appendChild(U.el("span", {}, [
            U.el("span", { text: t }),
            U.el("span", { class: "star", text: "✦" })
          ]));
        });
      }
      band.appendChild(track);
      return band;
    }
  };
})();
