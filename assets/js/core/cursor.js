/* ============================================================
   NK — THE PM · Custom cursor (desktop, pointer:fine)
   dot + lagging ring; ring reacts to links & expandable cards
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  NK.cursor = {
    init: function () {
      if (!NK.util.FINE || NK.util.REDUCED) {
        document.documentElement.setAttribute("data-cursor", "off");
        return;
      }
      var dot = document.querySelector(".cursor-dot");
      var ring = document.querySelector(".cursor-ring");
      if (!dot || !ring) return;

      var x = -100, y = -100, rx = -100, ry = -100, seen = false;

      document.addEventListener("pointermove", function (e) {
        x = e.clientX; y = e.clientY;
        if (!seen) { seen = true; rx = x; ry = y; }
        var t = e.target;
        var link = t.closest && t.closest("a, button, [data-cursor-link]");
        var read = t.closest && t.closest(".acc__head, .proj-card");
        ring.classList.toggle("is-link", !!link && !read);
        ring.classList.toggle("is-read", !!read);
      }, { passive: true });

      document.addEventListener("pointerleave", function () {
        dot.style.opacity = "0"; ring.style.opacity = "0";
      });
      document.addEventListener("pointerenter", function () {
        dot.style.opacity = "1"; ring.style.opacity = "1";
      });

      (function loop() {
        rx += (x - rx) * 0.16;
        ry += (y - ry) * 0.16;
        dot.style.transform = "translate(" + x + "px," + y + "px)";
        ring.style.transform = "translate(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px)" +
          (ring.classList.contains("is-read") ? " scale(2)" : "");
        requestAnimationFrame(loop);
      })();
    }
  };
})();
