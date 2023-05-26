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

  await rmDirRecursive(DIST);
  await fs.mkdir(DIST, { recursive: true }).catch(ignore);
  await fs.mkdir(LIB).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "esm")).catch(ignore);
  await fs.mkdir(path.resolve(LIB, "cjs")).catch(ignore);

  const write = (filePath, str) =>
    fs.writeFile(path.resolve(DIST, ...filePath), str, "utf8").catch(ignore);

  const initFiles = ["index.d.ts", "index.esm.js", "index.js"];

  // Arrays to hold the import lines for each icon folder
  const allImports = [];

  for (const icon of icons) {
    await fs.mkdir(path.resolve(DIST, icon.id)).catch(ignore);

    await write(
      [icon.id, "index.js"],
      "// THIS FILE IS AUTO GENERATED\nvar GenIcon = require('../lib').GenIcon\n"
    );
    await write(
      [icon.id, "index.esm.js"],
      "// THIS FILE IS AUTO GENERATED\nimport { GenIcon } from '../lib';\n"
    );
    await write(
      [icon.id, "index.d.ts"],
      "// THIS FILE IS AUTO GENERATED\nimport { IconTree, IconType } from '../lib'\n"
    );
    await write(
      [icon.id, "package.json"],
      JSON.stringify(
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
      ) + "\n"
    );

    // Add the import lines to the 'allImports' and 'allTypes' arrays
    allImports.push(`export * from './${icon.id}';`);
  }

  for (const file of initFiles) {
    await write([file], "// THIS FILE IS AUTO GENERATED\n");
  }

  // Write the 'all.js' file
  await write(
    ["all.js"],
    `// THIS FILE IS AUTO GENERATED\n${allImports.join("\n")}\n`
  );

  // Write the 'all.d.ts' file
  await write(
    ["all.d.ts"],
    `// THIS FILE IS AUTO GENERATED\n${allImports.join("\n")}\n`
  );
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
