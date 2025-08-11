import * as path from "path";
import { promises as fs } from "fs";
import { icons } from "../src/icons";
import { iconRowTemplate } from "./templates";
import { forEachIconEntry } from "./task_common";
import { initDistLib } from "./task_fs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function dirInit({ DIST, LIB, rootDir }) {
  const ignore = (err) => {
    if (err && (err.code === "EEXIST" || err.code === "ENOENT")) return;
    throw err;
  };
  await initDistLib({ DIST, LIB, rootDir }, { packLayout: false });
  // Add per-pack package.json files (kept from previous behavior)
  for (const icon of icons) {
    await fs
      .writeFile(
        path.resolve(DIST, icon.id, "package.json"),
        JSON.stringify(
          { sideEffects: false, module: "./index.esm.js" },
          null,
          2,
        ) + "\n",
        "utf8",
      )
      .catch(ignore);
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
