import * as path from "path";
import { promises as fs } from "fs";
import { icons } from "../src/icons";
import { rmDirRecursive } from "./logics";

interface DistCtx {
  DIST: string;
  LIB: string;
  rootDir: string;
}

interface InitOptions {
  packLayout: boolean; // true for per-file pack, false for aggregated per-pack index files
}

export async function initDistLib(ctx: DistCtx, opts: InitOptions) {
  const { DIST, LIB } = ctx;
  const ignore = (err: unknown) => {
    const e = err as NodeJS.ErrnoException | undefined;
    if (e && (e.code === "EEXIST" || e.code === "ENOENT")) return;
    throw err;
  };

  await rmDirRecursive(DIST).catch(ignore);
  await fs.mkdir(DIST, { recursive: true }).catch(ignore);
  await fs.mkdir(LIB).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "esm")).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "cjs")).catch(ignore);

  const write = (filePath: string[], str: string) =>
    fs.writeFile(path.resolve(DIST, ...filePath), str, "utf8").catch(ignore);

  const initFiles = ["index.d.ts", "index.esm.js", "index.js"];
  for (const file of initFiles) {
    await write([file], "// THIS FILE IS AUTO GENERATED\n");
  }

  // Create pack directories
  for (const icon of icons) {
    await fs.mkdir(path.resolve(DIST, icon.id)).catch(ignore);
    if (!opts.packLayout) {
      // Aggregated mode: create per-pack index files with standard headers
      await write(
        [icon.id, "index.js"],
        "// THIS FILE IS AUTO GENERATED\nvar GenIcon = require('../lib').GenIcon\n",
      );
      await write(
        [icon.id, "index.esm.js"],
        "// THIS FILE IS AUTO GENERATED\nimport { GenIcon } from '../lib';\n",
      );
      await write(
        [icon.id, "index.d.ts"],
        "// THIS FILE IS AUTO GENERATED\nimport { IconTree, IconType } from '../lib'\n",
      );
    }
  }
}
