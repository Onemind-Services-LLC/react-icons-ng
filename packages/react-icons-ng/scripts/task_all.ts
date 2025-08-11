import * as path from "path";
import { promises as fs } from "fs";
import { icons } from "../src/icons";
import { iconRowTemplate } from "./templates";
import { rmDirRecursive } from "./logics";
import { forEachIconEntry } from "./task_common";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function dirInit({ DIST, LIB, rootDir }) {
  const ignore = (err) => {
    if (err.code === "EEXIST") return;
    throw err;
  };

  await rmDirRecursive(DIST);
  await fs.mkdir(DIST, { recursive: true }).catch(ignore);
  await fs.mkdir(LIB).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "esm")).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "cjs")).catch(ignore);

  const write = (filePath, str) =>
    fs.writeFile(path.resolve(DIST, ...filePath), str, "utf8").catch(ignore);

  const initFiles = ["index.d.ts", "index.esm.js", "index.js"];

  for (const icon of icons) {
    await fs.mkdir(path.resolve(DIST, icon.id)).catch(ignore);

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
    await write(
      [icon.id, "package.json"],
      JSON.stringify(
        {
          sideEffects: false,
          module: "./index.esm.js",
        },
        null,
        2,
      ) + "\n",
    );
  }

  for (const file of initFiles) {
    await write([file], "// THIS FILE IS AUTO GENERATED\n");
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function writeIconModule(icon, { DIST, LIB, rootDir }) {
  if (process.env.VERBOSE_ICON_LOG === "1") {
    console.log(`writeIconModule: ${icon.id} ${icon.name} ...`);
  }

  await forEachIconEntry(icon, async ({ name, iconData }) => {
    const modRes = iconRowTemplate(icon, name, iconData, "module");
    await fs.appendFile(
      path.resolve(DIST, icon.id, "index.esm.js"),
      modRes,
      "utf8",
    );
    const comRes = iconRowTemplate(icon, name, iconData, "common");
    await fs.appendFile(
      path.resolve(DIST, icon.id, "index.js"),
      comRes,
      "utf8",
    );
    const dtsRes = iconRowTemplate(icon, name, iconData, "dts");
    await fs.appendFile(
      path.resolve(DIST, icon.id, "index.d.ts"),
      dtsRes,
      "utf8",
    );
  });
}
