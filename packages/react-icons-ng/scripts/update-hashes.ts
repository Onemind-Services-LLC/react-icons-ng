/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";
import { execFileSync } from "child_process";
import { ICON_CONCURRENCY } from "./concurrency";
import { runConcurrentWithRunning } from "./progress";

const filePath = path.resolve(__dirname, "../src/icons/index.ts");

// Match each `source: { ... }` block non-greedily, then pick fields from inside.
const sourceRe = /source:\s*{[\s\S]*?}/g;

interface Item {
  start: number;
  end: number;
  block: string;
  url: string;
  branch: string;
  currentHash: string;
  localName?: string;
}

type Result = { start: number; end: number; text: string } | null;

async function main() {
  console.log(`[update-hashes] Scanning icon sources in: ${filePath}`);
  let src = fs.readFileSync(filePath, "utf8");

  let updated = 0;
  let scanned = 0;
  let unchanged = 0;
  let notFound = 0;
  let skippedNoBranch = 0;
  let errors = 0;

  const items: Item[] = [];
  let match: RegExpExecArray | null;
  while ((match = sourceRe.exec(src))) {
    const [block] = match;
    const url = (block.match(/url:\s*"([^"]+)"/) || [])[1];
    const branch = (block.match(/branch:\s*"([^"]+)"/) || [])[1];
    const currentHash = (block.match(/hash:\s*"([a-f0-9]+)"/) || [])[1];
    const localName = (block.match(/localName:\s*"([^"]+)"/) || [])[1];

    if (!url || !currentHash) continue;
    scanned += 1;
    if (!branch || !branch.trim()) {
      skippedNoBranch += 1;
      continue; // Only update when a branch is set
    }

    items.push({
      start: match.index,
      end: match.index + block.length,
      block,
      url,
      branch,
      currentHash,
      localName,
    });
  }

  const results: Result[] = [];
  const worker = async (item: Item) => {
    try {
      let newHash = "";
      // Prefer remote lookup so results are independent of local clone freshness
      try {
        const ref = execFileSync("git", ["ls-remote", item.url, item.branch], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        })
          .toString()
          .trim();
        if (ref) newHash = ref.split(/[\t\s]/)[0];
      } catch {
        // ignore; fallback to local clone if available
      }
      if (!newHash && item.localName) {
        const localRepoDir = path.resolve(
          __dirname,
          `../icons/${item.localName}`,
        );
        try {
          const rev = execFileSync(
            "git",
            ["rev-parse", `origin/${item.branch}`],
            {
              cwd: localRepoDir,
              encoding: "utf8",
              stdio: ["ignore", "pipe", "ignore"],
            },
          )
            .toString()
            .trim();
          newHash = rev.split(/[\t\s]/)[0];
        } catch {
          // ignore
        }
      }
      if (!newHash) {
        notFound += 1;
        results.push(null);
        return;
      }
      if (!newHash || newHash === item.currentHash) {
        unchanged += 1;
        results.push(null);
        return;
      }
      const newBlock = item.block.replace(
        new RegExp(`hash:\\s*"${item.currentHash}"`),
        `hash: "${newHash}"`,
      );
      updated += 1;
      results.push({ start: item.start, end: item.end, text: newBlock });
    } catch {
      errors += 1;
      results.push(null);
    }
  };

  if (items.length > 0) {
    await runConcurrentWithRunning(
      "Update Hashes",
      items,
      worker,
      ICON_CONCURRENCY,
      (it) => `${it.localName || it.url}#${it.branch}`,
    );
  }

  if (updated > 0) {
    const replacements = results.filter(Boolean) as Exclude<Result, null>[];
    // Apply replacements from the end to preserve indices
    replacements
      .sort((a, b) => b.start - a.start)
      .forEach(({ start, end, text }) => {
        src = src.slice(0, start) + text + src.slice(end);
      });
    fs.writeFileSync(filePath, src, "utf8");
    console.log(`[update-hashes] Wrote updates to ${filePath}`);
  }

  const summary = `[update-hashes] Summary: scanned=${scanned}, updated=${updated}, unchanged=${unchanged}, notFound=${notFound}, skippedNoBranch=${skippedNoBranch}, errors=${errors}`;
  console.log(summary);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
