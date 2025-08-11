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

async function runGit(label: string, args: string[], options: { cwd: string }) {
  try {
    return await execFile("git", args, options);
  } catch (e: unknown) {
    const pick = (k: "stderr" | "stdout"): string => {
      if (typeof e === "object" && e && k in (e as Record<string, unknown>)) {
        const v = (e as Record<string, unknown>)[k];
        return typeof v === "string" ? v : String(v ?? "");
      }
      return "";
    };
    const stderr = pick("stderr");
    const stdout = pick("stdout");
    const cmd = `git ${args.join(" ")}`;
    const details = [
      `label=${label}`,
      `cwd=${options.cwd}`,
      `cmd=${cmd}`,
      stderr && `stderr=${String(stderr).trim()}`,
      stdout && `stdout=${String(stdout).trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    throw new Error(`[fetch] git command failed\n${details}`);
  }
}

async function gitCloneIcon(source: IconSetGitSource, ctx: Context) {
  const label = `${source.localName} (${source.url}#${source.branch}@${source.hash})`;
  await runGit(
    label,
    ["clone", "--filter=tree:0", "--no-checkout", source.url, source.localName],
    { cwd: ctx.distBaseDir },
  );

  await runGit(
    label,
    ["sparse-checkout", "set", "--cone", "--skip-checks", source.remoteDir],
    { cwd: ctx.iconDir(source.localName) },
  );

  await runGit(label, ["checkout", source.hash], {
    cwd: ctx.iconDir(source.localName),
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
