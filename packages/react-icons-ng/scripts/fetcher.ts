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

  // rm all icons and mkdir dist
  await fs.promises.rm(distBaseDir, {
    recursive: true,
    force: true,
  });
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
  await gitCloneNoCheckout(source.url, source.localName, ctx.distBaseDir);
  await gitSparseCheckoutSet(ctx.iconDir(source.localName), source.remoteDir);
  await gitCheckout(ctx.iconDir(source.localName), source.hash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
