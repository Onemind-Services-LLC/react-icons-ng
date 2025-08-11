/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const filePath = path.resolve(__dirname, "../src/icons/index.ts");
console.log(`[update-hashes] Scanning icon sources in: ${filePath}`);
let src = fs.readFileSync(filePath, "utf8");

// Match each `source: { ... url: "..." ... branch: "..." ... hash: "..." ... }` block
// and capture url, branch, and hash. Non-greedy to avoid spanning multiple blocks.
const sourceRe =
  /source:\s*{[\s\S]*?url:\s*"([^"]+)"[\s\S]*?branch:\s*"([^"]+)"[\s\S]*?hash:\s*"([a-f0-9]+)"[\s\S]*?}/g;

let updated = 0;
let scanned = 0;
let unchanged = 0;
let notFound = 0;
let skippedNoBranch = 0;
let errors = 0;
let match: RegExpExecArray | null;
const replacements: { start: number; end: number; text: string }[] = [];

while ((match = sourceRe.exec(src))) {
  const [block, url, branch, currentHash] = match;
  scanned += 1;
  if (!branch || !branch.trim()) {
    skippedNoBranch += 1;
    console.log(`[update-hashes] Skipping (no branch): ${url}`);
    continue; // Only update when a branch is set
  }

  try {
    console.log(
      `[update-hashes] Checking ${url}#${branch} (current: ${currentHash})`,
    );
    const ref = execSync(`git ls-remote ${url} ${branch}`, {
      encoding: "utf8",
    }).trim();
    if (!ref) {
      notFound += 1;
      console.log(
        `[update-hashes] No ref found for ${url}#${branch}; skipping`,
      );
      continue; // No match for that branch
    }
    const newHash = ref.split(/[\t\s]/)[0];
    if (!newHash || newHash === currentHash) {
      unchanged += 1;
      console.log(`[update-hashes] Up-to-date ${url}#${branch}`);
      continue;
    }

    // Replace only the hash inside this matched block to avoid accidental global changes.
    const blockStart = match.index;
    const blockEnd = match.index + block.length;
    const newBlock = block.replace(
      new RegExp(`hash:\\s*"${currentHash}"`),
      `hash: "${newHash}"`,
    );
    replacements.push({ start: blockStart, end: blockEnd, text: newBlock });
    updated += 1;
    console.log(
      `[update-hashes] Updated ${url}#${branch}: ${currentHash} -> ${newHash}`,
    );
    // Move regex lastIndex forward according to the original text length only (handled below after applying replacements)
  } catch (err) {
    errors += 1;
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[update-hashes] Failed to resolve ${url}#${branch}: ${message}`,
    );
    // Ignore network/auth errors; leave hash as-is
    continue;
  }
}

if (updated > 0) {
  // Apply replacements from the end to preserve indices
  replacements
    .sort((a, b) => b.start - a.start)
    .forEach(({ start, end, text }) => {
      src = src.slice(0, start) + text + src.slice(end);
    });
  fs.writeFileSync(filePath, src, "utf8");
  console.log(`[update-hashes] Wrote updates to ${filePath}`);
  console.log(
    `[update-hashes] Summary: scanned=${scanned}, updated=${updated}, unchanged=${unchanged}, notFound=${notFound}, skippedNoBranch=${skippedNoBranch}, errors=${errors}`,
  );
} else {
  console.log(
    `[update-hashes] No hash updates required. Summary: scanned=${scanned}, unchanged=${unchanged}, notFound=${notFound}, skippedNoBranch=${skippedNoBranch}, errors=${errors}`,
  );
}
