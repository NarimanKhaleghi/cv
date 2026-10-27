/* ============================================================
   NK — THE PM · Theme engine (light / dark)
   - initial theme applied by inline <head> script (no flash)
   - toggle: View Transitions circular wipe → fallback wipe overlay
   - persisted in localStorage("nk-theme")
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var KEY = "nk-theme";

  function current() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f2efe8" : "#0b0b0b");
    document.querySelectorAll("[data-theme-btn]").forEach(function (b) {
      b.setAttribute("aria-label", b.getAttribute("data-theme-label") || "");
      b.setAttribute("title", b.getAttribute("data-theme-label") || "");
    });
  }

  function toggle(x, y) {
    var next = current() === "dark" ? "light" : "dark";
    var vt = document.startViewTransition;

    if (NK.util.REDUCED) { apply(next); NK.util.store.set(KEY, next); return; }

    if (typeof vt === "function") {
      /* fancy circular reveal from the click point */
      document.documentElement.animate(
        { clipPath: ["circle(0% at " + x + "px " + y + "px)", "circle(140% at " + x + "px " + y + "px)"] },
        { pseudoElement: "::view-transition-new(root)", duration: 550, easing: "cubic-bezier(.16,1,.3,1)" }
      );
      vt.call(document, function () { apply(next); });
    } else {
      /* fallback: quick overlay wipe */
      var w = document.querySelector(".wipe");
      if (w) {
        var px = (x / window.innerWidth) * 100, py = (y / window.innerHeight) * 100;
        w.style.setProperty("--wx", px + "%");
        w.style.setProperty("--wy", py + "%");
        w.classList.remove("is-on");
        void w.offsetWidth;
        w.classList.add("is-on");
        setTimeout(function () { apply(next); }, 120);
        setTimeout(function () { w.classList.remove("is-on"); }, 620);
      } else {
        document.documentElement.classList.add("theme-anim");
        apply(next);
        setTimeout(function () { document.documentElement.classList.remove("theme-anim"); }, 320);
      }
    }
    NK.util.store.set(KEY, next);
  }

  NK.theme = {
    init: function () { apply(current()); },
    toggle: toggle,
    current: current
  };
})();
