import util from "node:util";
import { execFile as rawExecFile } from "node:child_process";
import path from "path";
import { type IconSetGitSource } from "./_types";
import { icons } from "../src/icons";
const execFile = util.promisify(rawExecFile);

interface Context {
  distBaseDir: string;
  iconDir(name: string): string;
}

// Check icon packages version
async function main() {
  const distBaseDir = path.join(__dirname, "../icons");
  const ctx: Context = {
    distBaseDir,
    iconDir(name: string) {
      return path.join(distBaseDir, name);
    },
  };

  const diffs: { id: string; name: string; diffs: number; current: string }[] =
    [];
  for (const icon of icons) {
    if (!icon.source) {
      continue;
    }
    const diff = await gitDiffCount(icon.source, ctx);
    if (diff.diffs > 0) {
      diffs.push({
        id: icon.id,
        name: icon.name,
        diffs: diff.diffs,
        current: diff.current,
      });
    }
  }

  if (diffs.length > 0) {
    console.log("Found diffs: ", diffs.length);
    console.table(diffs);
  } else {
    console.log("No diffs found");
  }
}

async function gitDiffCount(
  source: IconSetGitSource,
  ctx: Context,
): Promise<{ current: string; diffs: number }> {
  try {
    const hashRes = await execFile(
      "git",
      ["rev-parse", `origin/${source.branch}`],
      {
        cwd: ctx.iconDir(source.localName),
      },
    );
    const currentHash = hashRes.stdout.trim();

    const count = await execFile(
      "git",
      ["rev-list", "--count", `${source.hash}..${currentHash}`],
      {
        cwd: ctx.iconDir(source.localName),
      },
    );

    return {
      current: currentHash,
      diffs: +count.stdout.trim(),
    };
  } catch (e) {
    console.error('Error while checking icon "%s", %s', source.localName, e);
    return {
      current: "error",
      diffs: 0,
    };
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
