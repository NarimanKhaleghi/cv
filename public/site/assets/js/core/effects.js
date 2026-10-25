/* ============================================================
   NK — THE PM · Effects v2
   reveals · counters · split text · scramble · magnetic · tilt
   journey rail fill · parallax · active chapter · confetti
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;
  var REDUCED = U.REDUCED;
  var FINE = U.FINE;

  var revealIO = null, countIO = null, chapterIO = null;

  NK.fx = {
    reduced: REDUCED,

    /* ---------------- reveal on scroll ---------------- */
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
        }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
      }
      nodes.forEach(function (n) { revealIO.observe(n); });
    },

    /* ---------------- stagger helper: set --rd on siblings ---------------- */
    stagger: function (list, step) {
      step = step || 0.07;
      (list || []).forEach(function (n, i) {
        if (!(n instanceof Element)) return;
        n.style.setProperty("--rd", (i * step).toFixed(2) + "s");
      });
    },

    /* ---------------- split text (word-safe for Arabic script) ---------------- */
    split: function (root) {
      var nodes = (root || document).querySelectorAll("[data-split]:not([data-split-done])");
      nodes.forEach(function (node) {
        node.setAttribute("data-split-done", "1");
        var text = node.textContent;
        var arabic = U.isArabicScript(text);
        var words = text.split(/\s+/).filter(Boolean);
        var i = 0;
        node.textContent = "";
        node.setAttribute("aria-label", text);
        words.forEach(function (w, wi) {
          var wrap = document.createElement("span");
          wrap.className = "w";
          wrap.setAttribute("aria-hidden", "true");
          var inner = document.createElement("i");
          inner.textContent = w;
          inner.style.setProperty("--i", i++);
          wrap.appendChild(inner);
          node.appendChild(wrap);
          if (wi < words.length - 1) {
            var sp = document.createElement("span");
            sp.className = "w";
            sp.setAttribute("aria-hidden", "true");
            sp.innerHTML = "&nbsp;";
            node.appendChild(sp);
          }
        });
        if (arabic) node.setAttribute("data-arabic", "1");
      });
    },

    /* ---------------- count-up numbers ---------------- */
    initCounters: function (root) {
      var nodes = (root || document).querySelectorAll("[data-count]:not([data-counted])");
      if (!nodes.length) return;
      function animate(node) {
        if (node.getAttribute("data-counted")) return;
        node.setAttribute("data-counted", "1");
        var target = parseFloat(node.getAttribute("data-count")) || 0;
        var suffix = node.getAttribute("data-suffix") || "";
        var lang = NK.i18n.lang;
        var span = node.querySelector(".n-val") || node;
        if (REDUCED) { span.textContent = U.num(target, lang) + suffix; return; }
        var dur = 1600, t0 = null;
        function frame(t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 4);
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
      if (!countIO) {
        countIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { animate(en.target); countIO.unobserve(en.target); }
          });
        }, { threshold: 0.4 });
      }
      nodes.forEach(function (n) { countIO.observe(n); });
    },

    /* ---------------- journey rail fill + station pass ---------------- */
    initJourney: function () {
      var wrap = document.querySelector(".journey-wrap");
      var fill = wrap ? wrap.querySelector(".journey-rail .fill") : null;
      if (!wrap || !fill || fill.__init) return;
      fill.__init = true;
      var stations = wrap.querySelectorAll(".station");
      var update = U.rafThrottle(function () {
        var r = wrap.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = r.height;
        var passed = U.clamp(vh * 0.55 - r.top, 0, total);
        fill.style.height = (total > 0 ? (passed / total) * 100 : 0) + "%";
        var lineY = r.top + passed;
        stations.forEach(function (st) {
          var sr = st.getBoundingClientRect();
          st.classList.toggle("is-passed", sr.top + 30 <= lineY);
        });
      });
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    },

    /* ---------------- active chapter (rail dots) ---------------- */
    initChapters: function () {
      var dots = document.querySelectorAll(".rail-dot[data-target]");
      if (!dots.length || !("IntersectionObserver" in window)) return;
      if (chapterIO) chapterIO.disconnect();
      var map = {};
      dots.forEach(function (d) { map[d.getAttribute("data-target")] = d; });
      chapterIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            dots.forEach(function (d) { d.classList.remove("is-active"); });
            var d = map[en.target.id];
            if (d) d.classList.add("is-active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) chapterIO.observe(sec);
      });
    },

    /* ---------------- top scroll progress ---------------- */
    initProgress: function () {
      var bar = document.querySelector(".progress .bar");
      if (!bar || bar.__init) return;
      bar.__init = true;
      var update = U.rafThrottle(function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var p = max > 0 ? h.scrollTop / max : 0;
        bar.style.transform = "scaleX(" + p + ")";
      });
      window.addEventListener("scroll", update, { passive: true });
      update();
    },

    /* ---------------- solid nav on scroll ---------------- */
    initNavSolid: function () {
      var nav = document.querySelector(".nav");
      if (!nav || nav.__solid) return;
      nav.__solid = true;
      var update = U.rafThrottle(function () {
        nav.classList.toggle("is-solid", window.scrollY > 30);
      });
      window.addEventListener("scroll", update, { passive: true });
      update();
    },

    /* ---------------- card tilt (desktop) ---------------- */
    initTilt: function (root) {
      if (!FINE || REDUCED) return;
      (root || document).querySelectorAll("[data-tilt]:not([data-tilt-on])").forEach(function (card) {
        card.setAttribute("data-tilt-on", "1");
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
        card.addEventListener("pointerleave", function () { card.style.transform = ""; });
      });
    },

    /* ---------------- magnetic buttons (desktop) ---------------- */
    initMagnets: function (root) {
      if (!FINE || REDUCED) return;
      (root || document).querySelectorAll("[data-magnet]:not([data-magnet-on])").forEach(function (el) {
        el.setAttribute("data-magnet-on", "1");
        el.addEventListener("pointermove", function (e) {
          var r = el.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          el.style.translate = (x * 10).toFixed(1) + "px " + (y * 8).toFixed(1) + "px";
        });
        el.addEventListener("pointerleave", function () { el.style.translate = ""; });
      });
    },

    /* ---------------- pointer parallax on [data-plx] ---------------- */
    initParallax: function (host) {
      if (!FINE || REDUCED || !host || host.__plx) return;
      host.__plx = true;
      var items = host.querySelectorAll("[data-plx]");
      if (!items.length) return;
      var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
      function loop() {
        cx += (tx - cx) * 0.07;
        cy += (ty - cy) * 0.07;
        items.forEach(function (s) {
          var depth = parseFloat(s.getAttribute("data-plx")) || 10;
          s.style.translate = (cx * depth) + "px " + (cy * depth) + "px";
        });
        if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) requestAnimationFrame(loop);
        else running = false;
      }
      host.addEventListener("pointermove", function (e) {
        tx = (e.clientX / window.innerWidth) - 0.5;
        ty = (e.clientY / window.innerHeight) - 0.5;
        if (!running) { running = true; requestAnimationFrame(loop); }
      });
      host.addEventListener("pointerleave", function () { tx = 0; ty = 0; if (!running) { running = true; requestAnimationFrame(loop); } });
    },

    /* ---------------- scroll-to helper ---------------- */
    goTo: function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
    },

    /* ---------------- confetti (easter egg) ---------------- */
    confetti: function (x, y) {
      if (REDUCED) return;
      var colors = [getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#fff", "#888", "#bbb"];
      for (var i = 0; i < 26; i++) {
        var bit = document.createElement("i");
        bit.className = "confetti-bit";
        bit.style.background = colors[i % colors.length];
        bit.style.left = x + "px";
        bit.style.top = y + "px";
        document.body.appendChild(bit);
        var ang = Math.random() * Math.PI * 2;
        var vel = 90 + Math.random() * 190;
        var dx = Math.cos(ang) * vel, dy = Math.sin(ang) * vel - 130;
        var rot = (Math.random() * 720 - 360);
        bit.animate([
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + dx + "px," + (dy + 260) + "px) rotate(" + rot + "deg)", opacity: 0 }
        ], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" })
          .onfinish = (function (b) { return function () { b.remove(); }; })(bit);
      }
    }
  };
})();
