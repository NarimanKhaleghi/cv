/* ============================================================
   NK — THE PM · Custom cursor (desktop only)
   dot follows instantly · ring lerps · mix-blend difference
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  NK.cursor = {
    init: function () {
      var fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!fine || reduced) return;

      var dot = document.querySelector(".cursor-dot");
      var ring = document.querySelector(".cursor-ring");
      if (!dot || !ring) return;

      document.documentElement.classList.add("has-cursor");

      var x = -100, y = -100, rx = -100, ry = -100;
      var seen = false;

      document.addEventListener("pointermove", function (e) {
        x = e.clientX; y = e.clientY;
        if (!seen) { rx = x; ry = y; seen = true; }
        dot.style.left = x + "px";
        dot.style.top = y + "px";
      }, { passive: true });

      document.addEventListener("pointerdown", function () { ring.classList.add("is-press"); });
      document.addEventListener("pointerup", function () { ring.classList.remove("is-press"); });

      (function loop() {
        rx += (x - rx) * 0.16;
        ry += (y - ry) * 0.16;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(loop);
      })();

      // grow on interactive elements
      var HOVER = "a, button, [data-cursor='hover'], .chip, .proj-card, .c-item";
      document.addEventListener("pointerover", function (e) {
        if (e.target.closest && e.target.closest(HOVER)) ring.classList.add("is-hover");
      }, { passive: true });
      document.addEventListener("pointerout", function (e) {
        if (e.target.closest && e.target.closest(HOVER)) ring.classList.remove("is-hover");
      }, { passive: true });

      // hide when leaving the window
      document.addEventListener("mouseleave", function () {
        dot.style.opacity = 0; ring.style.opacity = 0;
      });
      document.addEventListener("mouseenter", function () {
        dot.style.opacity = ""; ring.style.opacity = "";
      });
    }
  };
})();
