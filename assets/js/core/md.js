/* ============================================================
   NK — THE PM · Tiny safe markdown renderer (for READMEs)
   Escapes raw HTML first → then applies md transforms.
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  NK.md = {
    render: function (src) {
      if (!src) return "";
      var text = String(src).replace(/\r\n/g, "\n");

      /* 1) fenced code blocks */
      var codes = [];
      text = text.replace(/```([\w-]*)\n?([\s\S]*?)```/g, function (_, lang, code) {
        codes.push({ lang: lang, code: code.replace(/\n$/, "") });
        return "\u0000CODE" + (codes.length - 1) + "\u0000";
      });

      /* 1.5) strip raw HTML tags (GitHub READMEs embed them) — keep inner text */
      text = text.replace(/<[^>\n]*>/g, "");

      /* 2) escape everything */
      text = esc(text);

      /* 3) inline transforms */
      function inline(s) {
        s = s.replace(/`([^`]+)`/g, function (_, c) { return "<code>" + c + "</code>"; });
        s = s.replace(/!\[([^\]]*)\]\((https?:[^)\s]+)[^)]*\)/g,
          function (_, alt, u) { return '<img src="' + u + '" alt="' + alt + '" loading="lazy" onerror="this.style.display=\'none\'">'; });
        s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)[^)]*\)/g,
          function (_, t, u) { return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + "</a>"; });
        s = s.replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g,
          function (_, pre, u) { return pre + '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + u + "</a>"; });
        s = s.replace(/\*\*\*([^*]+)\*\*\*/g, "<b><i>$1</i></b>");
        s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
        s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<i>$2</i>");
        s = s.replace(/~~([^~]+)~~/g, "<s>$1</s>");
        return s;
      }

      /* 4) block transforms */
      var lines = text.split("\n");
      var out = [], i = 0, inUl = false, inOl = false, inQ = false, para = [];

      function flushPara() {
        if (para.length) { out.push("<p>" + inline(para.join("<br>")) + "</p>"); para = []; }
      }
      function closeLists() {
        if (inUl) { out.push("</ul>"); inUl = false; }
        if (inOl) { out.push("</ol>"); inOl = false; }
        if (inQ) { out.push("</blockquote>"); inQ = false; }
      }

      while (i < lines.length) {
        var L = lines[i];

        var codeM = L.match(/^\u0000CODE(\d+)\u0000$/);
        if (codeM) {
          flushPara(); closeLists();
          var c = codes[+codeM[1]];
          out.push("<pre><code>" + esc(c.code) + "</code></pre>");
          i++; continue;
        }

        var h = L.match(/^(#{1,6})\s+(.*)$/);
        if (h) {
          flushPara(); closeLists();
          var lv = Math.min(h[1].length, 4);
          out.push("<h" + lv + ">" + inline(h[2]) + "</h" + lv + ">");
          i++; continue;
        }

        if (/^\s*([-*_])\s*\1\s*\1[\s\-*_]*$/.test(L)) { flushPara(); closeLists(); out.push("<hr>"); i++; continue; }

        if (/^\s*&gt;\s?/.test(L)) {
          flushPara(); closeLists();
          if (!inQ) { out.push("<blockquote>"); inQ = true; }
          out.push(inline(L.replace(/^\s*&gt;\s?/, "")));
          i++; continue;
        }

        var ul = L.match(/^\s*[-*+]\s+(.*)$/);
        var ol = L.match(/^\s*\d+[.)]\s+(.*)$/);
        if (ul) {
          flushPara();
          if (inQ) { out.push("</blockquote>"); inQ = false; }
          if (inOl) { out.push("</ol>"); inOl = false; }
          if (!inUl) { out.push("<ul>"); inUl = true; }
          out.push("<li>" + inline(ul[1]) + "</li>");
          i++; continue;
        }
        if (ol) {
          flushPara();
          if (inQ) { out.push("</blockquote>"); inQ = false; }
          if (inUl) { out.push("</ul>"); inUl = false; }
          if (!inOl) { out.push("<ol>"); inOl = true; }
          out.push("<li>" + inline(ol[1]) + "</li>");
          i++; continue;
        }

        if (/^\s*(<table|\|)/.test(L)) {
          flushPara(); closeLists();
          out.push("<p>" + inline(L.trim()) + "</p>");
          i++; continue;
        }

        if (L.trim() === "") { flushPara(); closeLists(); i++; continue; }

        para.push(L);
        i++;
      }
      flushPara(); closeLists();

      var html = out.join("\n");
      /* restore code blocks */
      html = html.replace(/\u0000CODE(\d+)\u0000/g, function (_, n) {
        var c = codes[+n];
        return "<pre><code>" + esc(c.code) + "</code></pre>";
      });
      return html;
    }
  };
})();
