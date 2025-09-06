import * as fs from "fs";
import * as path from "path";
import { gitFetchOrigin, gitLsRemote, gitRevParse } from "./git-utils";
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
      // Try local origin/<branch> first (aligns with check.ts)
      if (item.localName) {
        const localRepoDir = path.resolve(
          __dirname,
          `../icons/${item.localName}`,
        );
        const rev = await gitRevParse(localRepoDir, `origin/${item.branch}`);
        if (rev) newHash = rev.split(/[\t\s]/)[0];
      }
      // Fallback: remote lookup so results are independent of local clone freshness
      if (!newHash) {
        const ref = await gitLsRemote(item.url, item.branch);
        if (ref) newHash = ref;
      }
      if (!newHash && item.localName) {
        const localRepoDir = path.resolve(
          __dirname,
          `../icons/${item.localName}`,
        );
        await gitFetchOrigin(localRepoDir, item.branch);
        // Prefer origin/<branch> reference
        {
          const rev2 = await gitRevParse(localRepoDir, `origin/${item.branch}`);
          if (rev2) newHash = rev2.split(/[\t\s]/)[0];
        }
        // Fallback to FETCH_HEAD if available
        if (!newHash) {
          const fetched = await gitRevParse(localRepoDir, "FETCH_HEAD");
          if (fetched) newHash = fetched.split(/[\t\s]/)[0];
        }
      }
      if (!newHash) {
        notFound += 1;
        results.push(null);
        return;
      }
      // No-op: hash is already current
      if (newHash === item.currentHash) {
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
