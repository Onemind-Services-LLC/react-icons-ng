import * as path from "path";
import { promises as fs } from "fs";
import { icons } from "../src/icons";
import { iconRowTemplate } from "./templates";
import { rmDirRecursive } from "./logics";
import { forEachIconEntry } from "./task_common";
import { IconDefinition } from "./_types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function dirInit({ DIST, LIB, rootDir }) {
  const ignore = (err) => {
    if (err.code === "EEXIST") return;
    throw err;
  };

  await rmDirRecursive(DIST).catch((err) => {
    if (err.code === "ENOENT") return;
    throw err;
  });
  await fs.mkdir(DIST, { recursive: true }).catch(ignore);
  await fs.mkdir(LIB).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "esm")).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "cjs")).catch(ignore);

  const write = (filePath, str) =>
    fs.writeFile(path.resolve(DIST, ...filePath), str, "utf8").catch(ignore);

  const initFiles = ["index.d.ts", "index.esm.js", "index.js"];

  for (const icon of icons) {
    await fs.mkdir(path.resolve(DIST, icon.id)).catch(ignore);
  }

  for (const file of initFiles) {
    await write([file], "// THIS FILE IS AUTO GENERATED\n");
  }
}
export async function writeIconModuleFiles(
  icon: IconDefinition,
  { DIST, LIB, rootDir }, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (process.env.VERBOSE_ICON_LOG === "1") {
    console.log(`writeIconModuleFiles: ${icon.id} ${icon.name} ...`);
  }

  await forEachIconEntry(icon, async ({ name, iconData }) => {
    const modRes = iconRowTemplate(icon, name, iconData, "module");
    const modHeader =
      "// THIS FILE IS AUTO GENERATED\nimport { GenIcon } from '../lib';\n";
    await fs.writeFile(
      path.resolve(DIST, icon.id, `${name}.esm.js`),
      modHeader + modRes,
      "utf8",
    );
    const comRes = iconRowTemplate(icon, name, iconData, "common");
    const comHeader =
      "// THIS FILE IS AUTO GENERATED\nvar GenIcon = require('../lib').GenIcon\n";
    await fs.writeFile(
      path.resolve(DIST, icon.id, `${name}.js`),
      comHeader + comRes,
      "utf8",
    );
    const dtsRes = iconRowTemplate(icon, name, iconData, "dts");
    const dtsHeader =
      "// THIS FILE IS AUTO GENERATED\nimport { IconTree, IconType } from '../lib'\n";
    await fs.writeFile(
      path.resolve(DIST, icon.id, `${name}.d.ts`),
      dtsHeader + dtsRes,
      "utf8",
    );
  });
}
