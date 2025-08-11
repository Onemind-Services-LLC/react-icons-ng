import * as path from "path";
import { type IconSetGitSource } from "./_types";
import { icons } from "../src/icons";
import { gitRevListCount, gitRevParse } from "./git-utils";

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
    const cwd = ctx.iconDir(source.localName);
    const currentHash =
      (await gitRevParse(cwd, `origin/${source.branch}`)) || "";
    const diffs = await gitRevListCount(cwd, source.hash, currentHash);
    return { current: currentHash, diffs };
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
