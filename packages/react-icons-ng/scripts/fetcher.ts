import { runConcurrentWithRunning } from "./progress";
import * as util from "node:util";
import { execFile as rawExecFile } from "node:child_process";
import * as fs from "fs";
import * as path from "path";
import { type IconSetGitSource } from "./_types";
import { icons } from "../src/icons";
import { ICON_CONCURRENCY } from "./concurrency";
const execFile = util.promisify(rawExecFile);

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
    await gitCloneIcon(icon.source as IconSetGitSource, ctx);
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
  await execFile(
    "git",
    ["clone", "--filter=tree:0", "--no-checkout", source.url, source.localName],
    {
      cwd: ctx.distBaseDir,
    },
  );

  await execFile(
    "git",
    ["sparse-checkout", "set", "--cone", "--skip-checks", source.remoteDir],
    {
      cwd: ctx.iconDir(source.localName),
    },
  );

  await execFile("git", ["checkout", source.hash], {
    cwd: ctx.iconDir(source.localName),
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
