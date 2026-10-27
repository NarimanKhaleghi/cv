/* ============================================================
   NK — THE PM · Section: lab (chapter 05 — GitHub auto-sync)
   Reads data/projects.json (written weekly by GitHub Action).
   README is fetched live from raw.githubusercontent.com on demand.
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});
  var U = NK.util;

  var state = { all: [], filter: "All" };

  function dataUrl() {
    /* relative → works on github.io subpaths, custom domains & /site/ preview */
    return "data/projects.json?v=" + (Date.now() - (Date.now() % 600000)); /* 10-min cache bust */
  }

  function descOf(r, c) {
    if (r.description && r.description.trim()) return r.description.trim();
    return c.lab.repo + " · " + r.name;
  }

  function card(r, c) {
    var lang = NK.i18n.lang;
    var desc = descOf(r, c);
    var d = U.el("article", {
      class: "proj-card" + (r.featured ? " is-feat" : ""),
      "data-reveal": "pop",
      "data-tilt": "",
      "data-repo": r.name
    });

    if (r.featured) d.appendChild(U.el("span", { class: "proj-feat", text: c.lab.featured }));

    var nameRow = U.el("h3", { class: "proj-name" }, [
      U.el("span", { text: r.name }),
      U.el("span", { class: "go", text: "↗", "aria-hidden": "true" })
    ]);
    d.appendChild(nameRow);

    d.appendChild(U.el("p", { class: "proj-desc" + (U.isRtlText(desc) ? " rtl" : ""), text: desc }));

    var tags = U.el("div", { class: "proj-tags" });
    if (r.language) tags.appendChild(U.el("span", { class: "tag", text: r.language }));
    (r.topics || []).slice(0, 4).forEach(function (t) {
      tags.appendChild(U.el("span", { class: "tag", text: t }));
    });
    if (tags.children.length) d.appendChild(tags);

    var foot = U.el("div", { class: "proj-foot" });
    foot.appendChild(U.el("span", { class: "star-w", text: "★ " + U.num(r.stars || 0, lang) }));
    foot.appendChild(U.el("span", { text: "·" }));
    foot.appendChild(U.el("span", { text: c.lab.updated + " " + U.fmtDate(r.pushed_at, lang) }));
    foot.appendChild(U.el("span", { class: "open", text: c.lab.open + " ↗" }));
    d.appendChild(foot);

    d.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      NK.openProject(r);
    });
    return d;
  }

  function skeletonCards(n) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var sk = U.el("div", { class: "proj-skel" });
      for (var j = 0; j < 4; j++) sk.appendChild(U.el("div", { class: "skel", style: { width: (90 - j * 17) + "%" } }));
      frag.appendChild(sk);
    }
    return frag;
  }

  NK.sections.lab = {
    render: function (c) {
      var p = c.lab;
      state.filter = "All";
      state.all = [];

      var sec = U.el("section", { class: "chapter chapter--tight lab", id: "lab" });
      var cont = U.el("div", { class: "container" });
      var head = NK.chHead(c, p);
      if (p.sub) head.appendChild(U.el("p", { class: "ch-sub", html: p.sub, "data-reveal": "up", style: { "--rd": ".2s" } }));
      cont.appendChild(head);

      var toolbar = U.el("div", { class: "lab-toolbar" });
      var counter = U.el("span", { class: "lab-count" });
      toolbar.appendChild(counter);
      cont.appendChild(toolbar);

      var grid = U.el("div", { class: "lab-grid" });
      grid.appendChild(skeletonCards(6));
      cont.appendChild(grid);

      var sync = U.el("div", { class: "proj-sync", style: { opacity: "0" } }, [
        U.el("span", { class: "pulse", "aria-hidden": "true" }),
        U.el("span", { class: "sync-txt", text: p.syncOn })
      ]);
      cont.appendChild(sync);
      sec.appendChild(cont);

      fetch(dataUrl(), { cache: "no-cache" })
        .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
        .then(function (json) {
          var repos = (json && json.repos) || [];
          state.all = repos;
          NK.projectsData = json;
          buildFilters(toolbar, counter, grid, c);
          applyFilter(grid, counter, c);
          if (json.generatedAt) {
            sync.querySelector(".sync-txt").textContent =
              p.syncAt + ": " + U.fmtDate(json.generatedAt, NK.i18n.lang) + " · " + p.syncOn;
            sync.style.opacity = "1";
            var fmeta = document.querySelector(".footer .sync-meta");
            if (fmeta) fmeta.textContent = p.syncAt + ": " + U.fmtDate(json.generatedAt, NK.i18n.lang);
          }
          NK.fx.initReveals(grid);
          NK.fx.initTilt(grid);
        })
        .catch(function () {
          grid.innerHTML = "";
          grid.appendChild(U.el("div", { class: "proj-empty" }, [
            U.el("p", { html: p.error + ' <a href="https://github.com/' + NK.i18n.config().githubUser + '" target="_blank" rel="noopener">github.com/' + NK.i18n.config().githubUser + "</a>" })
          ]));
        });

      return sec;
    }
  };

  function buildFilters(toolbar, counter, grid, c) {
    toolbar.querySelectorAll(".fchip").forEach(function (b) { b.remove(); });
    var langs = {};
    state.all.forEach(function (r) {
      var l = r.language || "Other";
      langs[l] = (langs[l] || 0) + 1;
    });
    var keys = Object.keys(langs).sort(function (a, b) { return langs[b] - langs[a]; });
    var mkBtn = function (label, val) {
      return U.el("button", {
        type: "button", class: "fchip" + (state.filter === val ? " is-on" : ""), text: label,
        onclick: function () {
          state.filter = val;
          toolbar.querySelectorAll(".fchip").forEach(function (x) { x.classList.remove("is-on"); });
          NK.util && null;
          this.classList.add("is-on");
          applyFilter(grid, counter, c);
        }
      });
    };
    toolbar.insertBefore(mkBtn(c.lab.filterAll, "All"), counter);
    keys.forEach(function (k) { toolbar.insertBefore(mkBtn(k, k), counter); });
  }

  function applyFilter(grid, counter, c) {
    var list = state.all.slice();
    if (state.filter !== "All") {
      list = list.filter(function (r) { return (r.language || "Other") === state.filter; });
    }
    counter.textContent = U.num(list.length, NK.i18n.lang) + " / " + U.num(state.all.length, NK.i18n.lang);
    grid.innerHTML = "";
    if (!list.length) {
      grid.appendChild(U.el("div", { class: "proj-empty" }, [U.el("p", { text: c.lab.empty })]));
      return;
    }
    var frag = document.createDocumentFragment();
    list.forEach(function (r) { frag.appendChild(card(r, c)); });
    grid.appendChild(frag);
  }

  /* ---------------- modal with live README ---------------- */
  NK.openProject = function (r) {
    var c = NK.i18n.content();
    var p = c.lab;
    var root = document.getElementById("modal");
    root.innerHTML = "";
    root.classList.add("is-open");
    document.body.classList.add("modal-lock");

    var veil = U.el("div", { class: "modal-veil", onclick: close });
    var panel = U.el("div", { class: "modal-panel", role: "dialog", "aria-modal": "true", "aria-label": r.name });

    panel.appendChild(U.el("div", { class: "modal-head" }, [
      U.el("span", { class: "m-name", text: r.name }),
      U.el("button", { class: "modal-close", type: "button", "aria-label": p.close, text: "✕", onclick: function (e) { e.stopPropagation(); close(); } })
    ]));

    var meta = U.el("div", { class: "modal-meta" });
    meta.appendChild(U.el("span", { class: "chip", text: "★ " + U.num(r.stars || 0, NK.i18n.lang) }));
    if (r.language) meta.appendChild(U.el("span", { class: "chip", text: r.language }));
    (r.topics || []).slice(0, 5).forEach(function (t) { meta.appendChild(U.el("span", { class: "chip", text: t })); });
    meta.appendChild(U.el("span", { class: "chip", text: p.updated + ": " + U.fmtDate(r.pushed_at, NK.i18n.lang) }));
    panel.appendChild(meta);

    var body = U.el("div", { class: "modal-body" });
    var mdBox = U.el("div", { class: "md" });
    body.appendChild(mdBox);
    panel.appendChild(body);

    var gh = "https://github.com/" + (r.full_name || (NK.i18n.config().githubUser + "/" + r.name));
    panel.appendChild(U.el("div", { class: "modal-meta", style: { borderTop: "2px solid var(--bd-c-soft)", marginTop: "10px", paddingBottom: "16px" } }, [
      U.el("a", { class: "btn btn--sm", href: gh, target: "_blank", rel: "noopener" }, [
        U.el("span", { text: p.github }),
        U.el("span", { class: "ar", text: "↗" })
      ]),
      r.homepage ? U.el("a", { class: "btn btn--sm btn--ghost", href: r.homepage, target: "_blank", rel: "noopener" }, [
        U.el("span", { text: p.visit + " ↗" })
      ]) : null
    ]));

    root.appendChild(veil);
    root.appendChild(panel);

    function close() {
      root.classList.remove("is-open");
      root.innerHTML = "";
      document.body.classList.remove("modal-lock");
    }
    NK.closeProject = close;
    document.addEventListener("keydown", escClose);
    function escClose(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", escClose); } }

    function skel() {
      mdBox.innerHTML = "";
      for (var i = 0; i < 7; i++) mdBox.appendChild(U.el("div", { class: "skel", style: { width: (95 - (i % 4) * 22) + "%" } }));
    }
    function tryBranch(branch) {
      var url = "https://raw.githubusercontent.com/" + (r.full_name || (NK.i18n.config().githubUser + "/" + r.name)) + "/" + branch + "/README.md";
      return fetch(url).then(function (res) { if (!res.ok) throw new Error("404"); return res.text(); });
    }
    skel();
    var branches = [];
    [r.default_branch || "main", "main", "master", "develop"].forEach(function (b) {
      if (b && branches.indexOf(b) === -1) branches.push(b);
    });
    var idx = 0;
    function attempt() {
      if (idx >= branches.length) {
        mdBox.innerHTML = "";
        mdBox.appendChild(U.el("p", { style: { color: "var(--fg-dim)" }, text: p.noReadme }));
        return;
      }
      tryBranch(branches[idx++])
        .then(function (txt) {
          mdBox.innerHTML = NK.md.render(txt);
          var rtl = U.isRtlText(txt.slice(0, 400));
          mdBox.setAttribute("dir", rtl ? "rtl" : "ltr");
          mdBox.classList.toggle("rtl", rtl);
        })
        .catch(attempt);
    }
    attempt();
  };
})();
