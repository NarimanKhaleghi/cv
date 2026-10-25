/* Test: parse data/config.js exactly like scripts/fetch-projects.mjs does */
import { readFileSync } from "node:fs";

const src = readFileSync("/home/z/my-project/public/site/data/config.js", "utf8");
const m = src.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/m);
if (!m) throw new Error("config object not found");
const cleaned = m[1]
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|[^:"'\\])\/\/.*$/gm, "$1")
  .replace(/,(\s*[}\]])/g, "$1")
  .replace(/(^|[{,\n])\s*([A-Za-z_$][\w$]*)\s*:/g, '$1 "$2":');
const cfg = JSON.parse(cleaned);
console.log("OK keys:", Object.keys(cfg).join(", "));
console.log("githubUser:", cfg.githubUser);
console.log("featured:", cfg.featuredRepos.join(", "));
console.log("contact channels:", cfg.contact.length);
