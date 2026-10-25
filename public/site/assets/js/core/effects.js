/* ============================================================
   NK — THE PM · Effects
   reveals · counters · tilt · scroll progress · timeline · parallax
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  /* ---------------- reveal on scroll ---------------- */
  var revealIO = null;
  NK.fx = {
    reduced: REDUCED,

    initReveals: function (root) {
      var nodes = (root || document).querySelectorAll("[data-reveal]:not(.is-in)");
      if (!nodes.length) return;
      if (REDUCED || !("IntersectionObserver" in window)) {
        nodes.forEach(function (n) { n.classList.add("is-in"); });
        return;
      }
      if (!revealIO) {
        revealIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              revealIO.unobserve(en.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      }
      nodes.forEach(function (n) { revealIO.observe(n); });
    },

    /* ---------------- count-up numbers ---------------- */
    initCounters: function (root) {
      var nodes = (root || document).querySelectorAll("[data-count]");
      if (!nodes.length) return;
      function animate(node) {
        var target = parseFloat(node.getAttribute("data-count")) || 0;
        var suffix = node.getAttribute("data-suffix") || "";
        var lang = NK.i18n.lang;
        var span = node.querySelector(".n-val") || node;
        if (REDUCED) { span.textContent = U.num(target, lang) + suffix; return; }
        var dur = 1500, t0 = null;
        function frame(t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.round(target * eased);
          span.textContent = U.num(val, lang) + (p === 1 ? suffix : "");
          if (p < 1) requestAnimationFrame(frame);
          else span.textContent = U.num(target, lang) + suffix;
        }
        requestAnimationFrame(frame);
      }
      if (!("IntersectionObserver" in window) || REDUCED) {
        nodes.forEach(animate); return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      nodes.forEach(function (n) { io.observe(n); });
    },

    /* ---------------- top scroll progress ---------------- */
    initProgress: function () {
      var bar = document.querySelector(".progress .bar");
      if (!bar) return;
      var update = U.rafThrottle(function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var p = max > 0 ? h.scrollTop / max : 0;
        bar.style.transform = "scaleX(" + p + ")";
      });
      window.addEventListener("scroll", update, { passive: true });
      update();
    },

    /* ---------------- timeline vertical fill ---------------- */
    initTimeline: function () {
      var list = document.querySelector(".xp-list");
      var fill = list ? list.querySelector(".xp-rail .fill") : null;
      if (!list || !fill) return;
      var update = U.rafThrottle(function () {
        var r = list.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = r.height;
        var passed = U.clamp(vh * 0.62 - r.top, 0, total);
        fill.style.height = (total > 0 ? (passed / total) * 100 : 0) + "%";
      });
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    },

    /* ---------------- active nav link ---------------- */
    initActiveNav: function () {
      var links = document.querySelectorAll(".nav-link[data-sec]");
      if (!links.length || !("IntersectionObserver" in window)) return;
      var map = {};
      links.forEach(function (l) { map[l.getAttribute("data-sec")] = l; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("is-active"); });
            var l = map[en.target.id];
            if (l) l.classList.add("is-active");
          }
        });
      }, { rootMargin: "-38% 0px -55% 0px" });
      Object.keys(map).forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) io.observe(sec);
      });
    },

    /* ---------------- card tilt (desktop) ---------------- */
    initTilt: function (root) {
      if (!FINE || REDUCED) return;
      (root || document).querySelectorAll("[data-tilt]").forEach(function (card) {
        if (card.__tilt) return;
        card.__tilt = true;
        var raf = null;
        card.addEventListener("pointermove", function (e) {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            var r = card.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5;
            var y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform =
              "translate(-4px,-4px) perspective(700px) rotateX(" + (-y * 4).toFixed(2) +
              "deg) rotateY(" + (x * 4).toFixed(2) + "deg)";
            raf = null;
          });
        });
        card.addEventListener("pointerleave", function () {
          card.style.transform = "";
        });
      });
    },

    /* ---------------- hero sticker parallax ---------------- */
    initParallax: function (hero) {
      if (!hero || !FINE || REDUCED) return;
      var sticks = hero.querySelectorAll(".hero-stickers .sticker");
      if (!sticks.length) return;
      var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
      function loop() {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        sticks.forEach(function (s, i) {
          var depth = 14 + i * 9;
          s.style.translate = (cx * depth) + "px " + (cy * depth) + "px";
        });
        if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 || running) {
          requestAnimationFrame(loop);
        } else running = false;
      }
      hero.addEventListener("pointermove", function (e) {
        tx = (e.clientX / window.innerWidth) - 0.5;
        ty = (e.clientY / window.innerHeight) - 0.5;
        if (!running) { running = true; requestAnimationFrame(loop); }
      });
      hero.addEventListener("pointerleave", function () { tx = 0; ty = 0; if (!running) { running = true; requestAnimationFrame(loop); } });
    }
  };
})();
