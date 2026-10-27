/* ============================================================
   NK — THE PM · Section: marquee (ticker strips)
   Reusable: NK.sections.marquee.render(c, { items, flat, bottom })
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  NK.sections.marquee = {
    render: function (c, opts) {
      opts = opts || {};
      var items = (opts.items && opts.items.length ? opts.items : c.marquee) || [];
      /* duplicate the sequence enough times for a seamless loop */
      var seq = [];
      for (var r = 0; r < 4; r++) items.forEach(function (t) { seq.push(t); });

      var chunk = function () {
        var d = document.createDocumentFragment();
        var el = document.createElement("div");
        el.className = "marquee-chunk";
        seq.forEach(function (t) {
          el.appendChild(NK.util.el("span", { class: "marquee-item", text: t }));
        });
        d.appendChild(el);
        return d;
      };

      var root = NK.util.el("div", {
        class: "marquee" + (opts.flat ? " marquee--flat" : ""),
        "aria-hidden": "true"
      });
      var track = NK.util.el("div", { class: "marquee-track" });
      track.appendChild(chunk());
      track.appendChild(chunk());
      root.appendChild(track);
      if (opts.bottom) root.style.marginTop = "auto";
      return root;
    }
  };
})();
