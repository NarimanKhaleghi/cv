/* ============================================================
   NK — THE PM · DOM utilities v2
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  var FA_DIGITS = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];

  NK.util = {
    /** create element: el("div", {class:"x", html:"<b>y</b>"}, [children]) */
    el: function (tag, attrs, kids) {
      var node = document.createElement(tag);
      if (attrs) {
        Object.keys(attrs).forEach(function (k) {
          var v = attrs[k];
          if (v === null || v === undefined || v === false) return;
          if (k === "class") node.className = v;
          else if (k === "html") node.innerHTML = v;
          else if (k === "text") node.textContent = v;
          else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
          else if (k.indexOf("on") === 0 && typeof v === "function") node.addEventListener(k.slice(2), v);
          else node.setAttribute(k, v);
        });
      }
      (kids || []).forEach(function (c) { if (c) node.appendChild(c); });
      return node;
    },

    /** escape HTML entities */
    esc: function (s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },

    /** Persian digits */
    faNum: function (input) {
      return String(input).replace(/[0-9]/g, function (d) { return FA_DIGITS[+d]; });
    },

    /** digits by language */
    num: function (input, lang) {
      return lang === "fa" ? NK.util.faNum(input) : String(input);
    },

    /** "2026-08-02T17:15:51Z" → localized date (Jalali for fa) */
    fmtDate: function (iso, lang) {
      if (!iso) return "—";
      try {
        var d = new Date(iso);
        if (lang === "fa") {
          return new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "long" }).format(d);
        }
        return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short" }).format(d);
      } catch (e) { return "—"; }
    },

    /** detect rtl text (for repo descriptions etc.) */
    isRtlText: function (s) {
      return /[\u0600-\u06FF]/.test(String(s || ""));
    },

    /** arabic-script detection (whole-word animation, never split letters) */
    isArabicScript: function (s) {
      return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(String(s || ""));
    },

    clamp: function (v, min, max) { return Math.min(max, Math.max(min, v)); },

    /** rAF throttle */
    rafThrottle: function (fn) {
      var ticking = false;
      return function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { ticking = false; fn(); });
      };
    },

    /** read/write localStorage safely */
    store: {
      get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    },

    FINE: window.matchMedia && window.matchMedia("(pointer: fine)").matches,
    REDUCED: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };
})();
