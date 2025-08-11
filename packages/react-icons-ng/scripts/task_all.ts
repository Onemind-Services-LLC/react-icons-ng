import * as path from "path";
import { promises as fs } from "fs";
import { icons } from "../src/icons";
import { iconRowTemplate } from "./templates";
import { forEachIconEntry } from "./task_common";
import { initDistLib } from "./task_fs";
import { loadPackCache, savePackCache } from "./cache";

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

  // Batch content and append once to reduce file I/O
  let modBuf = "";
  let comBuf = "";
  let dtsBuf = "";
  const cache = await loadPackCache(icon.id);
  const changedRef = { value: false };
  await forEachIconEntry(
    icon,
    ({ name, iconData }) => {
      modBuf += iconRowTemplate(icon, name, iconData, "module");
      comBuf += iconRowTemplate(icon, name, iconData, "common");
      dtsBuf += iconRowTemplate(icon, name, iconData, "dts");
    },
    { cache, changedRef },
  );
  await fs.appendFile(
    path.resolve(DIST, icon.id, "index.esm.js"),
    modBuf,
    "utf8",
  );
  await fs.appendFile(path.resolve(DIST, icon.id, "index.js"), comBuf, "utf8");
  await fs.appendFile(
    path.resolve(DIST, icon.id, "index.d.ts"),
    dtsBuf,
    "utf8",
  );
  if (changedRef.value) {
    await savePackCache(icon.id, cache);
  }
}
