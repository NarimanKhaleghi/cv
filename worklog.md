# Worklog

---
Task ID: 1
Agent: Main agent (Z.ai)
Task: Build "The PM" — Nariman Khaleghi's official bilingual portfolio/resume website with neubrutalist black & white design, auto-synced GitHub projects, deployable on GitHub Pages/Cloudflare.

Work Log:
- Loaded fullstack-dev skill; initialized Next.js 16 sandbox (dev server on :3000).
- Asked user 11 clarification questions via AskUserQuestion. Answers: dark-dominant B/W palette, maximum effects, NK monogram (no photo), hide salary/military info, auto language detection, weekly GitHub Action sync, exclude forks, dual-domain support (relative paths + CNAME), contact via links/mailto, stats counters module, "The PM" branding.
- Extracted complete bilingual resume content from upload/my-cv.html (EN fully, FA fully).
- Researched GitHub profile @NarimanKhaleghi: 18 public repos; pulled metadata via API (rate limits forced HTML/API workarounds); ran scripts/fetch-projects.mjs successfully → data/projects.json with 15 real projects (Markdown_Converter ★6, myip, TaskFlow, wallgold-management, 2048, blog, cv, ubuntu-dns-manager, resume, deep-research-os, opencode-RTL, opencode-hotkeys, Blueprint-Noir, qwen-youtube-summarizer-obsidian, hasto).
- Built static site in /home/z/my-project/public/site/ (GitHub-ready structure, no build step, vanilla ES5-style JS modules):
  - CSS design system: tokens/base/components/sections/effects (neubrutalism, hard shadows, alternating dark/paper sections, grid+halftone patterns, film grain).
  - Content files: data/content.en.js + data/content.fa.js (full resume: 8 jobs w/ all bullets, 9 skill groups, 6 stats, facts, quote, contact).
  - Core JS: util, i18n (auto-detect/URL/localStorage, RTL-LTR), effects (reveals, counters, tilt, timeline fill, progress, parallax), custom cursor, safe mini-markdown renderer.
  - Section modules: loader (cinematic), nav+mobile menu, hero (split-letter/whole-word for Persian), marquee×2, about, stats, experience timeline, skills, projects (filters, featured pins, README modal with live raw.githubusercontent fetch), education, contact, footer.
  - GitHub automation: .github/workflows/deploy-pages.yml (push→Pages), update-projects.yml (cron Monday 04:30 UTC + manual; commits JSON and redeploys in same workflow due to GITHUB_TOKEN no-trigger rule); scripts/fetch-projects.mjs (parses data/config.js, filters forks/empty/excluded, writes projects.json).
  - Extras: 404.html, CNAME (thepm.ir), favicon.svg, robots.txt, bilingual README.md (editing guide, deploy steps, domain, Cloudflare, section add/remove).
- Sandbox integration: next.config.ts redirect "/" → "/site/index.html".
- Verified with agent-browser (desktop 1440×900 + mobile 390×844, EN+FA): fixed bugs found:
  1) mobile-menu overlay content leaking into viewport (overflow/visibility fix),
  2) missing .container wrappers in 7 section modules (full-bleed layout bug),
  3) hero name breaking mid-word (font clamp resize),
  4) Persian cursive letters broken by per-letter animation (whole-word reveal for Arabic script),
  5) snake_case/camelCase mismatch for pushed_at/default_branch (dates showed "—"),
  6) raw HTML in GitHub READMEs displayed escaped (strip-tags in md.js),
  7) loader brand reversed in RTL + progress bar fill invisible (height fix),
  8) footer sync stamp not updating after JSON load.
- Verified: 15 project cards + language filters + count, README modal with shields.io badges, FA Jalali dates (مهر ۱۴۰۵) and Persian digits (۱۵/۱۵), RTL everywhere, mobile burger menu, no console errors.
- Packaged /home/z/my-project/download/nariman-thepm-portfolio.zip (45 files, 76KB, GitHub-ready).

Stage Summary:
- Site preview: served at /site/index.html (root redirects there).
- Deliverables: public/site/* (source of truth), download/nariman-thepm-portfolio.zip (push to GitHub → Settings→Pages→GitHub Actions → run "Weekly projects sync" once).
- Key decisions: no framework/no build (user maintainability + GitHub Pages), data-driven sections registry (add/remove in main.js SECTION_ORDER), README fetched live from raw.githubusercontent.com so docs are always fresh, single config source (data/config.js) shared by site + updater.
- User follow-ups: optionally add Telegram/WhatsApp to data/config.js contact array; adjust excludeRepos (e.g. "resume", "cv") if unwanted; thepm.ir currently hosts blog repo — site works on any domain/subdomain via relative paths.

---
Task ID: 2
Agent: Main agent (Z.ai)
Task: v2 "Journey" redesign per user feedback — light/dark themes, progressive disclosure (minimal first view, click-to-read), exciting animations, hero photo from GitHub profile, résumé CTA → cv.thepm.ir, push guide for github.com/narimankhaleghi/cv, content re-verified against upload/my-cv.html.

Work Log:
- Re-extracted resume text (scripts/cv-text.txt) and diffed against site data — content already faithful; fixed two small mismatches ("45% of online sales leads", added trader/photographer side-quests to edu chapter).
- Downloaded GitHub avatar → assets/img/profile.jpg (460×460 B/W portrait). Verified cv.thepm.ir live (resume repo page).
- Full rebuild of the site (kept zero-framework architecture):
  - Theme engine (assets/js/core/theme.js + tokens.css): data-theme dark/light, localStorage "nk-theme", system-preference default, no-FOUC inline head script, View Transitions circular wipe w/ fallback, theme-color meta sync.
  - New chapter set (main.js CHAPTERS + content.*.js "chapters"): cover(00) about(01) numbers(02) journey(03) toolbox(04) lab(05) edu(06) contact(07); side flight-rail with dots+tooltips; mobile fullscreen menu.
  - Progressive disclosure: about teaser→"read more", journey stations (8 accordion cards with full resume bullets), toolbox drawers (8), projects cards→README modal. Accordion = grid-template-rows 0fr→1fr.
  - Journey signature: vertical rail fill synced to scroll, station nodes light up as passed, plane icon marker, promo badges.
  - Effects: boarding-pass loader with stamp slam + confetti (once/session, click-to-skip), word-mask name reveal (Persian-safe whole words), rotating SVG ring around photo, float/hover photo frame, stickers parallax, magnetic buttons, tilt cards, marquees, custom cursor, count-up counters, grain, easter egg (3× sticker click).
  - Résumé CTA everywhere: nav chip, cover ghost button, destination card → config.resumeUrl (https://cv.thepm.ir), target _blank.
  - config.js: siteUrl → narimankhaleghi.github.io/cv/, resumeUrl added, excludeRepos += cv, resume; contact += Résumé. projects.json refiltered → 13 repos (API rate-limited so filtered locally; Action will regenerate on GitHub).
  - Removed CNAME (thepm.ir root is taken by blog repo); documented optional subdomain path. Fixed deploy-pages.yml broken YAML (branches: ain] → [main]).
- Browser QA (agent-browser, 1440×900 + 390×844, EN/FA, light/dark): found & fixed:
  1) SVG textPath ring invisible under RTL (inherited direction) → direction:ltr + unicode-bidi:isolate;
  2) ring text unreadable over photo frame → paint-order stroke halo (bg-colored) + radius 93 + single repetition tuned to circumference (12px/.32em);
  3) phone number bidi ("4252 582 935 98+") → unicode-bidi:plaintext on .channel .val;
  4) LTR README content right-aligned in RTL page → .md[dir=ltr]{text-align:left};
  5) deploy workflow YAML typo (would block deploys).
- Verified: 8 chapters/8 stations/8 drawers/13 projects/8 rail dots, no console errors; loader, menu, modal, filters, count-ups, both themes, both languages, mobile menu & journey.
- Packaged download/nariman-thepm-journey.zip (47 files, 94KB). Wrote PUSH-GUIDE.fa.md (3 push methods, token help, Pages setup, sync run, troubleshooting, custom subdomain) + rewrote README.md (v2 structure/editing docs).

Stage Summary:
- Deliverables: public/site/* (source of truth), download/nariman-thepm-journey.zip, PUSH-GUIDE.fa.md inside the zip.
- Key decisions: theme = user-toggleable B/W neubrutalism (both modes hard-shadow); first screen minimal with click-to-expand everywhere; journey metaphor carried by loader/rail/stations vocabulary; résumé stays on its own domain (cv.thepm.ir) rather than embedding.
- User next steps: push zip contents to github.com/NarimanKhaleghi/cv (guide inside), Settings→Pages→GitHub Actions, run "Weekly projects sync" once; optionally add subdomain CNAME (e.g. me.thepm.ir).
