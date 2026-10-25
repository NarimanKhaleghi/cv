# Nariman Khaleghi — The PM · Portfolio & Journey (v2)

Bilingual (EN/FA) personal portfolio built as **a journey**: a minimal boarding cover, then chapters you click to unfold — career route map, skill drawers, auto-synced GitHub projects, and a résumé CTA.

**Zero frameworks. Zero build step. Pure HTML/CSS/JS.** Drop it on any static host and it runs.

---

## ✨ v2 — What's new

- 🌗 **Light + Dark mode** — toggle in the header, saved in `localStorage`, follows your OS preference on first visit, animated circular wipe.
- 🎫 **Journey experience** — boarding-pass loader, chapter flight-rail (side dots), route-map career timeline that draws itself on scroll.
- 🖱️ **Progressive disclosure** — the first screen is minimal; click any station / drawer / "read more" to unfold details.
- 🖼️ **Real photo hero** — B/W portrait (`assets/img/profile.jpg`) with rotating ring + stickers.
- 📄 **Résumé CTA** — everywhere (nav, cover, destination chapter) → <https://cv.thepm.ir> in a new tab (print / PDF-export ready).
- ✈️ Flight-themed micro-copy, custom cursor, magnetic buttons, confetti easter egg (click a sticker 3×).

## 📁 Structure

```
├── index.html                  ← shell; theme bootstrap; script order
├── 404.html                    ← friendly 404
├── robots.txt
├── data/
│   ├── config.js               ← ★ wiring: GitHub user, featured/excluded repos, résumé URL, contacts
│   ├── content.en.js           ← ★ every EN string (edit freely)
│   ├── content.fa.js           ← ★ every FA string (keep same keys)
│   └── projects.json           ← auto-written weekly by the GitHub Action
├── assets/
│   ├── css/  tokens|base|components|sections|effects .css
│   ├── js/
│   │   ├── core/   util · i18n · theme · effects · cursor · md
│   │   └── sections/ loader · nav · cover · marquee · about · numbers
│   │                  · journey · toolbox · lab · edu · contact
│   └── img/profile.jpg         ← replace with any square photo
├── scripts/fetch-projects.mjs  ← GitHub → projects.json syncer
└── .github/workflows/
    ├── deploy-pages.yml        ← deploy on push to main
    └── update-projects.yml     ← Mondays 04:30 UTC: refresh projects.json + redeploy
```

## 🧭 Edit the content

| Want to change…            | Open… |
|----------------------------|-------|
| Any visible text (EN / FA) | `data/content.en.js` / `data/content.fa.js` |
| GitHub username, featured/excluded repos, résumé URL, contacts | `data/config.js` |
| Add/remove a whole chapter | add/remove its `<script>` in `index.html` + its entry in `assets/js/main.js` (`CHAPTERS`) + a `{id,no,label}` row in both content files |
| Hero photo                 | overwrite `assets/img/profile.jpg` (square, ≥460px) |
| Colors / spacing / fonts   | `assets/css/tokens.css` |

Both languages must keep the same key structure — the site renders whichever one matches the visitor (`?lang=fa`, saved choice, or browser language).

## 🚀 Deploy (GitHub Pages — repo `cv`)

1. Push this folder's contents to `github.com/<you>/cv` (branch `main`). See **PUSH-GUIDE.fa.md** for the exact commands.
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Push already triggers *Deploy to GitHub Pages*. Run **Actions → Weekly projects sync → Run workflow** once to fetch your repos into `projects.json`.
4. Site: `https://<you>.github.io/cv/`

All internal links are **relative**, so the site also works from any other host or subdomain without edits.

### Optional: custom domain / subdomain
Add a `CNAME` file containing e.g. `www.thepm.ir`, then in DNS point that record to `<you>.github.io`. (Removed by default because `thepm.ir` root already serves another repo.)

## 🔄 Projects auto-sync

Every Monday 04:30 UTC (~08:00 Tehran), `update-projects.yml` runs `scripts/fetch-projects.mjs`, which reads `data/config.js`, filters out forks/empty/excluded repos, writes `data/projects.json`, commits it, and the same workflow redeploys the site. Run it manually anytime: **Actions → Weekly projects sync → Run workflow**.

## ♿ Notes

- Respects `prefers-reduced-motion`; keyboard navigable; skip-link included.
- Loader shows fully once per browser session, then a quick curtain.
- FA mode: RTL layout, Persian digits, Jalali dates via `Intl`.
