import * as path from "path";
import { promises as fs } from "fs";
import { iconRowTemplate } from "./templates";
import { forEachIconEntry } from "./task_common";
import { IconDefinition } from "./_types";
import { initDistLib } from "./task_fs";
import { loadPackCache, savePackCache } from "./cache";

export async function dirInit({ DIST, LIB, rootDir }) {
  await initDistLib({ DIST, LIB, rootDir }, { packLayout: true });
}
export async function writeIconModuleFiles(
  icon: IconDefinition,
  { DIST, LIB, rootDir }, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (process.env.VERBOSE_ICON_LOG === "1") {
    console.log(`writeIconModuleFiles: ${icon.id} ${icon.name} ...`);
  }

  const cache = await loadPackCache(icon.id);
  const changedRef = { value: false };
  await forEachIconEntry(
    icon,
    async ({ name, iconData }) => {
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
    },
    { cache, changedRef },
  );
  if (changedRef.value) {
    await savePackCache(icon.id, cache);
  }
}
