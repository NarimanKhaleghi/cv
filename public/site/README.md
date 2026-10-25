# NK — THE PM · Personal Site / Portfolio

<div dir="rtl">

وبسایت رسمی و رزومه‌ای **نریمان خالقی (The PM)** — طراحی نئوبروتالیسم سیاه‌وسفید، تماماً دست‌ساز با جاوااسکریپت خالص (بدون فریم‌ورک و بدون مرحله build)، دوزبانه (فارسی/انگلیسی) با تشخیص خودکار زبان، و بخش پروژه‌هایی که **هفته‌ای یک‌بار به‌صورت خودکار از گیت‌هاب همگام می‌شود**.

</div>

The official site & resume of **Nariman Khaleghi (The PM)** — black & white neubrutalism, hand-built with vanilla JS (zero frameworks, zero build step), fully bilingual (FA/EN with auto-detection), with a Projects section that **auto-syncs from GitHub every week**.

---

## ✨ Features

- 🖤 Strict black & white **neubrutalist** design system (hard shadows, thick borders, marquee bands, stickers)
- 🎬 **Maximum motion**: cinematic loader, split-letter hero, custom cursor, count-up stats, scroll reveals, card tilt, film grain, parallax stickers — auto-toned-down on mobile & `prefers-reduced-motion`
- 🌐 **Bilingual FA/EN** with RTL/LTR switching, browser auto-detection, saved preference (`?lang=fa` also works)
- 📦 **Projects from GitHub** — weekly sync via GitHub Actions, language filters, featured pins, README rendered in a modal (fetched live from `raw.githubusercontent.com`)
- 🧩 **Modular architecture** — every section is a self-contained module; content lives in two files
- 📱 Fully responsive (mobile menu, fluid type with `clamp()`)
- ⚡ No build step — push and it's live

## 📁 Structure

```
.
├── index.html                  ← thin shell (metas + script order)
├── 404.html                    ← brutalist 404
├── CNAME                       ← custom domain (edit or delete)
├── favicon.svg / robots.txt
├── data/
│   ├── config.js               ← ⭐ site wiring: GitHub user, featured/excluded repos, contact channels
│   ├── content.en.js           ← ⭐ ALL English copy (edit freely)
│   ├── content.fa.js           ← ⭐ ALL Persian copy (edit freely)
│   └── projects.json           ← ⚙ generated weekly (seeded manually)
├── assets/
│   ├── css/                    ← tokens · base · components · sections · effects
│   └── js/
│       ├── main.js             ← ⭐ section registry (add/remove sections here)
│       ├── core/               ← i18n · effects · cursor · markdown · utils
│       └── sections/           ← hero, about, stats, experience, skills,
│                                  projects, education, contact, footer, …
├── scripts/
│   └── fetch-projects.mjs      ← weekly sync script (no dependencies)
└── .github/workflows/
    ├── deploy-pages.yml        ← deploys the site on every push
    └── update-projects.yml     ← ⏰ every Monday 04:30 UTC: sync repos → redeploy
```

<div dir="rtl">

## ✏️ ویرایش محتوا (مهم‌ترین بخش)

| می‌خواهم… | کجا؟ |
|---|---|
| متن‌های شغلی، خلاصه، بولت‌های تجربه | `data/content.fa.js` و `data/content.en.js` → بخش `experience.jobs` |
| دستاوردهای عددی (شمارنده‌ها) | همان فایل‌ها → بخش `stats.items` |
| مهارت‌ها و چیپ‌ها | همان فایل‌ها → بخش `skills.groups` |
| راه‌های تماس (ایمیل/تلگرام/واتساپ…) | `data/config.js` → `contact` (کانال جدید خودکار نمایش داده می‌شود) |
| ریپوی منتخب (پین‌شده) | `data/config.js` → `featuredRepos` |
| مخفی‌کردن یک ریپو | `data/config.js` → `excludeRepos` |
| اضافه/حذف کردن یک سکشن | `assets/js/main.js` → `SECTION_ORDER` |
| رنگ‌ها، فاصله‌ها، فونت | `assets/css/tokens.css` |

بعد از هر push، سایت به‌صورت خودکار deploy می‌شود.

</div>

## 🚀 Deploy on GitHub Pages (3 steps)

1. Create a repository (e.g. `nariman-portfolio`) and push **this folder's contents** to the `main` branch:
   ```bash
   git init && git add -A && git commit -m "feat: THE PM site"
   git remote add origin https://github.com/NarimanKhaleghi/<repo>.git
   git branch -M main && git push -u origin main
   ```
2. Repo → **Settings → Pages** → Source: **GitHub Actions**.
3. Done. `deploy-pages.yml` deploys on every push. Run **Actions → Weekly projects sync → Run workflow** once to pull the full repo list immediately (otherwise wait for Monday's cron).

> If you deploy to a **project page** (`username.github.io/<repo>/`), everything works out of the box — all paths are relative.

## 🌐 Custom domain (thepm.ir)

1. Edit `CNAME` → put your domain (`thepm.ir`).
2. DNS at your provider: `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (apex) and/or `CNAME` `www` → `<username>.github.io`.
3. Settings → Pages → Custom domain → `thepm.ir` → enable **Enforce HTTPS**.
4. Update `siteUrl` in `data/config.js`.

> **Note:** thepm.ir currently serves your `blog` repo. You can instead use a subdomain (e.g. `www.thepm.ir` or `me.thepm.ir`) — same steps with a `CNAME` record pointing to `<username>.github.io`.

## ☁️ Cloudflare Pages (alternative)

Dashboard → Workers & Pages → Create → Pages → **Connect to Git** → pick the repo →
Build command: *(empty)* — Output directory: `/` → Save. For the weekly sync, keep the GitHub Action enabled (it commits `data/projects.json`; Cloudflare auto-rebuilds on new commits).

## 🧪 Local preview

```bash
python3 -m http.server 8000   # or: npx serve .
# → http://localhost:8000
```

(Opening `index.html` directly via `file://` also works — even the README modal, thanks to CORS-friendly raw.githubusercontent fetches.)

## 🔁 How the weekly sync works

```
GitHub Action (cron, Mondays) → scripts/fetch-projects.mjs
  → reads data/config.js (exclude/featured/…)
  → GET api.github.com/users/<you>/repos
  → filters (forks, empty, excluded)
  → writes data/projects.json → commit → redeploy
```

The README of every project is NOT stored — it is fetched **live** from `raw.githubusercontent.com` when a visitor opens the docs modal, so docs are always up to date.

## 🧩 Add your own section (example)

```js
/* assets/js/sections/certificates.js */
(function () {
  NK.sections.certificates = {
    render: function (c) { /* return a <section> element */ }
  };
})();
```
1. Add `<script src="assets/js/sections/certificates.js">` to `index.html` (before `main.js`)
2. Add `"certificates"` to `SECTION_ORDER` in `assets/js/main.js`
3. Add its nav label to `nav` in both content files — done.

---

Built by hand with vanilla JS · © 2026 Nariman Khaleghi — [thepm.ir](https://thepm.ir)
