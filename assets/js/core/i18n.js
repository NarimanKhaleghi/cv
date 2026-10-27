/* ============================================================
   NK — THE PM · i18n engine
   Auto-detect (browser) → URL ?lang= → saved preference.
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var STORE_KEY = "nk-lang";

  function readStore(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function writeStore(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function detect() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "fa" || q === "en") return q;
    var saved = readStore(STORE_KEY);
    if (saved === "fa" || saved === "en") return saved;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("fa") === 0 ? "fa" : "en";
  }

  NK.i18n = {
    lang: detect(),
    content: function () {
      return window.NK_CONTENT[this.lang] || window.NK_CONTENT.en;
    },
    config: function () { return window.NK_CONFIG || {}; },

    /** apply language to <html> + document meta */
    applyDoc: function () {
      var c = this.content();
      var html = document.documentElement;
      html.setAttribute("lang", c.meta.htmlLang);
      html.setAttribute("dir", c.meta.dir);
      html.setAttribute("data-lang", this.lang);
      document.title = c.meta.title;
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", c.meta.description);
      writeStore(STORE_KEY, this.lang);
    },

    /** switch language and re-render the whole site via callback */
    switchTo: function (lang, rerender) {
      if (lang !== "fa" && lang !== "en") return;
      this.lang = lang;
      this.applyDoc();
      if (typeof rerender === "function") rerender();
      // update both switch states
      document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
        b.classList.toggle("is-on", b.getAttribute("data-lang-btn") === lang);
      });
    }
  };
})();
