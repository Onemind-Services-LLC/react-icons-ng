import path from "path";
import { promises as fs } from "fs";
import camelcase from "camelcase";
import { icons } from "../src/icons";
import { iconRowTemplate } from "./templates";
import { getIconFiles, convertIconData, rmDirRecursive } from "./logics";
import { svgo } from "./svgo";

export async function dirInit({ DIST, LIB }) {
  const ignore = (err) => {
    if (err.code === "EEXIST") return;
    throw err;
  };

  const dirsToCreate = [
    DIST,
    LIB,
    path.resolve(LIB, "esm"),
    path.resolve(LIB, "cjs"),
  ];

  await rmDirRecursive(DIST);

  for (const dir of dirsToCreate) {
    await fs.mkdir(dir, { recursive: true }).catch(ignore);
  }

  const write = (filePath, str) =>
    fs
      .writeFile(path.resolve(DIST, ...filePath), `${str}\n`, "utf8")
      .catch(ignore);

  const AUTO_GEN_STR = "// THIS FILE IS AUTO GENERATED\n";

  const initFiles = ["index.d.ts", "index.esm.js", "index.js"];

  const fileContents = {
    "index.js": `${AUTO_GEN_STR}var GenIcon = require('../lib').GenIcon`,
    "index.esm.js": `${AUTO_GEN_STR}import { GenIcon } from '../lib';`,
    "index.d.ts": `${AUTO_GEN_STR}import { IconTree, IconType } from '../lib'`,
  };

  const allImports = [];

  for (const icon of icons) {
    await fs.mkdir(path.resolve(DIST, icon.id)).catch(ignore);

    for (const [file, content] of Object.entries(fileContents)) {
      await write([icon.id, file], content);
    }

    const pkgContent = JSON.stringify(
      {
        sideEffects: false,
        module: "./index.esm.js",
        types: "./index.d.ts",
        exports: {
          ".": {
            types: "./index.d.ts",
            import: "./index.esm.js",
            require: "./index.js",
          },
          "./package.json": "./package.json",
        },
      },
      null,
      2
    );

    await write([icon.id, "package.json"], pkgContent);

    allImports.push(`export * from './${icon.id}';`);
  }

  for (const file of initFiles) {
    await write([file], AUTO_GEN_STR);
  }

  const allFiles = ["all.js", "all.d.ts"];
  const allFilesContent = `${AUTO_GEN_STR}${allImports.join("\n")}`;

  for (const file of allFiles) {
    await write([file], allFilesContent);
  }
}

export async function writeIconModule(icon, { DIST }) {
  console.log(`writeIconModule: ${icon.id} ${icon.name} ...`);

  const exists = new Set(); // for remove duplicate
  for (const content of icon.contents) {
    const files = await getIconFiles(content);

    for (const file of files) {
      const svgStrRaw = await fs.readFile(file, "utf8");
      const svgStr = content.processWithSVGO
        ? await svgo.optimize(svgStrRaw).then((result) => result.data)
        : svgStrRaw;

      const iconData = await convertIconData(svgStr, content.multiColor);

      const rawName = path.basename(file, path.extname(file));
      const pascalName = camelcase(rawName, { pascalCase: true });
      const name =
        (content.formatter && content.formatter(pascalName, file)) ||
        pascalName;
      if (exists.has(name)) continue;
      exists.add(name);

      // write like: module/fa/index.esm.js
      const modRes = iconRowTemplate(icon, name, iconData, "module");
      await fs.appendFile(
        path.resolve(DIST, icon.id, "index.esm.js"),
        modRes,
        "utf8"
      );
      const comRes = iconRowTemplate(icon, name, iconData, "common");
      await fs.appendFile(
        path.resolve(DIST, icon.id, "index.js"),
        comRes,
        "utf8"
      );
      const dtsRes = iconRowTemplate(icon, name, iconData, "dts");
      await fs.appendFile(
        path.resolve(DIST, icon.id, "index.d.ts"),
        dtsRes,
        "utf8"
      );

      exists.add(file);
    }
  }
}
