/* ============================================================
   NK — THE PM · Section: loader (boarding-pass intro)
   Full cinematic version on first visit of a session;
   fast curtain afterwards. Click anywhere to skip.
   ============================================================ */
(function () {
  "use strict";
  var NK = (window.NK = window.NK || {});

  NK.buildLoader = function (c, full) {
    var U = NK.util;
    var L = c.loader;
    var root = U.el("div", { class: "loader", id: "loader" });

    var pass = U.el("div", { class: "loader__pass" }, [
      U.el("div", { class: "loader__top" }, [
        U.el("span", { text: L.passTitle }),
        U.el("span", { text: L.doc })
      ]),
      U.el("div", { class: "loader__route" }, [
        U.el("div", {}, [
          U.el("div", { class: "loader__iata", text: L.from }),
          U.el("div", { class: "loader__city", text: L.fromName })
        ]),
        U.el("div", { class: "loader__plane", text: "✈", "aria-hidden": "true" }),
        U.el("div", { style: { textAlign: "end" } }, [
          U.el("div", { class: "loader__iata", text: L.to }),
          U.el("div", { class: "loader__city", text: L.toName })
        ])
      ]),
      U.el("div", { class: "loader__meta" }, [
        U.el("span", { text: L.flight }),
        U.el("span", { text: L.gate }),
        U.el("span", { text: L.seat })
      ]),
      U.el("div", { class: "loader__stub" }, [
        U.el("span", { text: L.name }),
        U.el("span", { text: "NK ✦ 2016" })
      ]),
      U.el("div", { class: "loader__stamp", text: L.stamp })
    ]);

    var bar = U.el("div", { class: "loader__bar" }, [U.el("i")]);
    root.appendChild(pass);
    if (full) root.appendChild(bar);
    root.appendChild(U.el("div", { class: "loader__skip", text: c.ui.skip }));
    return root;
  };

  NK.runLoader = function (root, full, done) {
    var finish = function () {
      if (root.__done) return;
      root.__done = true;
      root.classList.add("is-done");
      document.body.classList.remove("loader-lock");
      setTimeout(function () { root.remove(); }, 700);
      if (typeof done === "function") setTimeout(done, 120);
    };

    root.addEventListener("click", finish);
    document.body.appendChild(root);

    if (!full) { setTimeout(finish, 350); return; }

    /* full boarding-pass sequence */
    var bar = root.querySelector(".loader__bar i");
    var stamp = root.querySelector(".loader__stamp");
    var p = 0;
    var tick = setInterval(function () {
      p = Math.min(100, p + 7 + Math.random() * 16);
      if (bar) bar.style.width = p + "%";
      if (p >= 100) {
        clearInterval(tick);
        if (stamp) {
          stamp.classList.add("is-on");
          setTimeout(function () {
            if (NK.fx.confetti && !NK.util.REDUCED) {
              var r = stamp.getBoundingClientRect();
              NK.fx.confetti(r.left + r.width / 2, r.top + r.height / 2);
            }
          }, 240);
        }
        setTimeout(finish, 620);
      }
    }, 130);
  };
})();
