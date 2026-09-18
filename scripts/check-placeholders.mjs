#!/usr/bin/env node
/**
 * Placeholder guard (handoff §41, gap K-12).
 *
 * Scans content and config for markers that must never reach production:
 *   [ENTITY] [JURISDICTION] [ADDRESS] [CONTACT_EMAIL] [PRIVACY_EMAIL] [PROCESSORS]
 *   [RIGHTS_BY_JURISDICTION] [TRANSFER_MECHANISM] [DISPUTE_FORUM] [PLACEHOLDER] TBD Lorem
 *
 * Always warns. Fails the build when GDA_STRICT_CONTENT=1 or VERCEL_ENV=production,
 * so local builds work and production deploys do not ship placeholders.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const roots = ["src/content", "src/config"];
const markers = [/\[[A-Z][A-Z_]{2,}\]/g, /\bTBD\b/g, /\bLorem ipsum\b/gi, /\[PLACEHOLDER\]/g];
const strict = process.env.GDA_STRICT_CONTENT === "1" || process.env.VERCEL_ENV === "production";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|md|json)$/.test(name) && !/\.test\./.test(name)) out.push(p);
  }
  return out;
}

const findings = [];
for (const root of roots) {
  let files = [];
  try {
    files = walk(root);
  } catch {
    continue;
  }
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      // Ignore comment lines that merely document the markers.
      if (/^\s*(\*|\/\/|\/\*)/.test(line)) return;
      for (const re of markers) {
        re.lastIndex = 0;
        const m = line.match(re);
        if (m) findings.push({ file: relative(process.cwd(), file), line: i + 1, marker: m[0] });
      }
    });
  }
}

if (findings.length === 0) {
  console.log("check-placeholders: no placeholders found.");
  process.exit(0);
}

console[strict ? "error" : "warn"](`check-placeholders: ${findings.length} placeholder(s) found${strict ? " — failing production build" : ""}:`);
for (const f of findings) console[strict ? "error" : "warn"](`  ${f.file}:${f.line}  ${f.marker}`);
process.exit(strict ? 1 : 0);
