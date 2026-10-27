/* ============================================================
   NK — THE PM · Weekly GitHub Projects Sync
   ─────────────────────────────────────────────────────────
   Runs on GitHub Actions (cron) or manually: `node scripts/fetch-projects.mjs`
   - Reads data/config.js (single source of truth)
   - Fetches public repos from the GitHub API
   - Writes data/projects.json (site reads this file)
   ============================================================ */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- parse data/config.js (strip comments, tolerate trailing commas) ---------- */
function parseConfig() {
  const src = readFileSync(join(ROOT, "data", "config.js"), "utf8");
  const m = src.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/m);
  if (!m) throw new Error("Could not find window.NK_CONFIG object in data/config.js");
  const cleaned = m[1]
    .replace(/\/\*[\s\S]*?\*\//g, "")   /* block comments */
    .replace(/(^|[^:"'\\])\/\/.*$/gm, "$1") /* line comments */
    .replace(/,(\s*[}\]])/g, "$1")      /* trailing commas */
    .replace(/(^|[{,\n])\s*([A-Za-z_$][\w$]*)\s*:/g, '$1 "$2":'); /* quote keys */
  return JSON.parse(cleaned);
}

const cfg = parseConfig();
const TOKEN = process.env.GITHUB_TOKEN || "";
const API = `https://api.github.com/users/${cfg.githubUser}/repos?per_page=100&sort=pushed`;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "nk-portfolio-sync",
  "X-GitHub-Api-Version": "2022-11-28"
};
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

console.log(`→ Fetching public repos of @${cfg.githubUser} …`);

const res = await fetch(API, { headers });
if (!res.ok) {
  console.error(`✗ GitHub API responded ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const repos = await res.json();
console.log(`✓ Received ${repos.length} repositories`);

const exclude = new Set(cfg.excludeRepos || []);
const includeOnly = (cfg.includeOnlyRepos || []).filter(Boolean);

const kept = repos
  .filter((r) => (cfg.includeForks ? true : !r.fork))
  .filter((r) => (includeOnly.length ? includeOnly.includes(r.name) : true))
  .filter((r) => !exclude.has(r.name))
  .filter((r) => (cfg.skipEmptyRepos ? !(r.size === 0 && !r.description) : true))
  .map((r) => ({
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description || "",
    language: r.language || "",
    topics: r.topics || [],
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
    homepage: r.homepage || "",
    created_at: r.created_at,
    updated_at: r.updated_at,
    pushed_at: r.pushed_at,
    default_branch: r.default_branch,
    license: r.license ? r.license.spdx_id : null,
    featured: (cfg.featuredRepos || []).includes(r.name)
  }))
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (b.stars !== a.stars) return b.stars - a.stars;
    return new Date(b.pushed_at) - new Date(a.pushed_at);
  });

const out = {
  generatedAt: new Date().toISOString(),
  source: TOKEN ? "github-actions" : "local-run",
  user: cfg.githubUser,
  count: kept.length,
  repos: kept
};

writeFileSync(join(ROOT, "data", "projects.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`✓ Wrote data/projects.json — ${kept.length} projects listed`);
kept.forEach((r) => console.log(`   · ${r.featured ? "★" : " "} ${r.name} [${r.language || "-"}] ★${r.stars}`));
