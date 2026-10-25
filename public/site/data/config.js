/* ============================================================
   NK — THE PM · Site Configuration
   ─────────────────────────────────────────────────────────
   This is the ONLY file you need to touch for wiring:
   GitHub account, featured/excluded repos, contact channels.
   It is used by BOTH the website and the weekly updater
   (scripts/fetch-projects.mjs parses the object below).
   ============================================================ */

window.NK_CONFIG = {
  /* GitHub username whose public repos are synced */
  githubUser: "NarimanKhaleghi",

  /* Canonical site URL (used in meta/SEO) */
  siteUrl: "https://thepm.ir",

  /* Repos pinned to the top of the Projects section */
  featuredRepos: ["myip", "wallgold-management", "Markdown_Converter", "TaskFlow", "2048", "blog"],

  /* Repos that must NEVER be shown (e.g. the website repo itself) */
  excludeRepos: ["conf", "CF_WORKER", "nariman-portfolio", "thepm-website", "portfolio", "narimankhaleghi.github.io"],

  /* If non-empty, ONLY these repos are shown */
  includeOnlyRepos: [],

  /* Include forked repos? */
  includeForks: false,

  /* Skip repos with no code and no description */
  skipEmptyRepos: true,

  /* Contact channels — add telegram/whatsapp here and they appear automatically.
     Set "value" and "href"; leave href "" to build mailto:/tel: automatically. */
  contact: [
    { id: "email",    label: "Email",    value: "pm@thepm.ir",                  href: "mailto:pm@thepm.ir" },
    { id: "phone",    label: "Phone",    value: "+98 935 582 4252",             href: "tel:+989355824252" },
    { id: "linkedin", label: "LinkedIn", value: "in/NarimanKhaleghi",           href: "https://linkedin.com/in/NarimanKhaleghi" },
    { id: "github",   label: "GitHub",   value: "github.com/NarimanKhaleghi",   href: "https://github.com/NarimanKhaleghi" },
    { id: "website",  label: "Website",  value: "thepm.ir",                     href: "https://thepm.ir" }
  ]
};
