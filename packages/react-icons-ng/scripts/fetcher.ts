import { runConcurrentWithRunning } from "./progress";
import * as fs from "fs";
import * as path from "path";
import { type IconSetGitSource } from "./_types";
import { icons } from "../src/icons";
import { ICON_CONCURRENCY } from "./concurrency";
import {
  gitCheckout,
  gitCloneNoCheckout,
  gitSparseCheckoutSet,
} from "./git-utils";

interface Context {
  distBaseDir: string;
  iconDir(name: string): string;
}

async function main() {
  const distBaseDir = path.join(__dirname, "../icons");
  const ctx: Context = {
    distBaseDir,
    iconDir(name: string) {
      return path.join(distBaseDir, name);
    },
  };

  // Ensure base dir exists (avoid deleting to allow incremental fetch)
  await fs.promises.mkdir(distBaseDir, {
    recursive: true,
  });

  const items = icons.filter((icon) => icon.source);
  const worker = async (icon) => {
    try {
      await gitCloneIcon(icon.source as IconSetGitSource, ctx);
    } catch (e: unknown) {
      const label = `${icon.id} (${icon.source?.localName})`;
      const message = e instanceof Error ? e.message : String(e);
      throw new Error(`[clone] Failed for ${label}\n${message}`);
    }
  };
  await runConcurrentWithRunning(
    "Cloning Icons",
    items,
    worker,
    ICON_CONCURRENCY,
    (icon) => icon.id,
  );
}

async function gitCloneIcon(source: IconSetGitSource, ctx: Context) {
  const repoDir = ctx.iconDir(source.localName);
  const exists = await fs.promises
    .stat(repoDir)
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    // Fresh clone
    await gitCloneNoCheckout(source.url, source.localName, ctx.distBaseDir);
    await gitSparseCheckoutSet(repoDir, source.remoteDir);
  } else {
    // Repo exists: ensure sparse-checkout is set (idempotent) and fetch latest
    try {
      await gitSparseCheckoutSet(repoDir, source.remoteDir);
    } catch {
      // ignore sparse-checkout failures and continue
    }
    // Best-effort fetch to update local refs without recloning
    try {
      const { runGit } = await import("./git-utils");
      await runGit(["fetch", "--filter=tree:0", "--prune", "origin"], {
        cwd: repoDir,
        label: `${source.localName} fetch`,
        retries: 2,
      });
    } catch {
      // ignore fetch failures (e.g., offline); we'll still attempt checkout
    }
  }
  await gitCheckout(repoDir, source.hash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
