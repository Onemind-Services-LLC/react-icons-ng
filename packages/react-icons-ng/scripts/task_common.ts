/* eslint-disable @typescript-eslint/no-unused-vars */

import * as path from "path";
import { promises as fs } from "fs";
import { promisify } from "util";
const exec = promisify(require("child_process").exec);
import { icons } from "../src/icons";
import {
  getIconFiles,
  copyRecursive,
  rmDirRecursive,
  convertIconData,
} from "./logics";
import { computeIconVersions, renderVersionsTable } from "./versions";
import { optimizeSVG } from "./svgo";
import camelcase from "camelcase";
import { IconDefinition } from "./_types";
import { PackCache, hashString } from "./cache";

export async function writeIconsManifest({ DIST, LIB, rootDir }) {
  const writeObj = icons.map((icon) => ({
    id: icon.id,
    name: icon.name,
    projectUrl: icon.projectUrl,
    license: icon.license,
    licenseUrl: icon.licenseUrl,
  }));
  const manifest = JSON.stringify(writeObj, null, 2);
  await fs.writeFile(
    path.resolve(LIB, "esm", "iconsManifest.js"),
    `export var IconsManifest = ${manifest}`,
    "utf8",
  );
  await fs.writeFile(
    path.resolve(LIB, "cjs", "iconsManifest.js"),
    `module.exports.IconsManifest = ${manifest}`,
    "utf8",
  );
  await fs.copyFile(
    "src/iconsManifest.d.ts",
    path.resolve(LIB, "esm", "iconsManifest.d.ts"),
  );
  await fs.copyFile(
    "src/iconsManifest.d.ts",
    path.resolve(LIB, "cjs", "iconsManifest.d.ts"),
  );
  await fs.copyFile("src/package.json", path.resolve(LIB, "package.json"));
}

export async function writeLicense({ DIST, LIB, rootDir }) {
  const iconLicenses =
    icons
      .map((icon) =>
        [
          `${icon.name} - ${icon.projectUrl}`,
          `License: ${icon.license} ${icon.licenseUrl}`,
        ].join("\n"),
      )
      .join("\n\n") + "\n";

  await fs.copyFile(
    path.resolve(rootDir, "LICENSE_HEADER"),
    path.resolve(DIST, "LICENSE"),
  );
  await fs.appendFile(path.resolve(DIST, "LICENSE"), iconLicenses, "utf8");
}

export async function writeEntryPoints({ DIST, LIB, rootDir }) {
  const generateEntryCjs = function () {
    return `module.exports = require('./lib/cjs/index.js');`;
  };
  const generateEntryMjs = function (filename = "index.js") {
    return `import * as m from './lib/esm/${filename}'
export default m
    `;
  };
  await fs.appendFile(
    path.resolve(DIST, "index.js"),
    generateEntryCjs(),
    "utf8",
  );
  await fs.appendFile(
    path.resolve(DIST, "index.esm.js"),
    generateEntryMjs(),
    "utf8",
  );
  await fs.appendFile(
    path.resolve(DIST, "index.d.ts"),
    generateEntryMjs("index"),
    "utf8",
  );
}

export async function writeIconVersions(
  { DIST, LIB, rootDir },
  progress?: (current: number, total: number) => void,
) {
  const versions = await computeIconVersions(icons, progress);
  const emptyVersions = versions.filter((v) => v.count === 0);
  if (emptyVersions.length !== 0) {
    throw Error(
      `empty icon sets: ${emptyVersions.map((v) => v.icon).join(", ")}`,
    );
  }
  const versionsStr = renderVersionsTable(versions);
  await fs.writeFile(path.resolve(rootDir, "VERSIONS"), versionsStr, "utf8");
}

// Shared iterator for icon entries that handles:
// - discovering files per content
// - reading + optional SVGO optimize
// - converting to tree data
// - computing the final export name (with formatter)
// - de-duplicating by final name
export async function forEachIconEntry(
  icon: IconDefinition,
  handler: (args: {
    name: string;
    iconData: unknown;
    file: string;
  }) => Promise<void> | void,
  opts?: { cache?: PackCache; changedRef?: { value: boolean } },
) {
  const seen = new Set<string>();
  for (const content of icon.contents) {
    const files = await getIconFiles(content);
    for (const file of files) {
      const svgStrRaw = await fs.readFile(file, "utf8");
      const svgStr = content.processWithSVGO
        ? optimizeSVG(svgStrRaw).data
        : svgStrRaw;

      const key = file;
      const svgHash = hashString(svgStr);
      let iconData: unknown;
      if (
        opts?.cache &&
        opts.cache[key] &&
        opts.cache[key].svgHash === svgHash
      ) {
        iconData = opts.cache[key].iconData;
      } else {
        iconData = await convertIconData(svgStr, content.multiColor);
        if (opts?.cache) {
          opts.cache[key] = { svgHash, iconData };
          if (opts.changedRef) opts.changedRef.value = true;
        }
      }

      const rawName = path.basename(file, path.extname(file));
      const pascalName = camelcase(rawName, { pascalCase: true });
      const name =
        (content.formatter && content.formatter(pascalName, file)) ||
        pascalName;
      if (seen.has(name)) continue;
      seen.add(name);

      await handler({ name, iconData, file });
    }
  }
}

export async function writePackageJson(override, { DIST, LIB, rootDir }) {
  const packageJsonStr = await fs.readFile(
    path.resolve(rootDir, "package.json"),
    "utf-8",
  );
  let packageJson = JSON.parse(packageJsonStr);

  delete packageJson.private;
  delete packageJson.dependencies;
  delete packageJson.devDependencies;
  delete packageJson.scripts;

  packageJson = {
    ...packageJson,
    ...override,
  };

  const editedPackageJsonStr = JSON.stringify(packageJson, null, 2) + "\n";
  await fs.writeFile(path.resolve(DIST, "package.json"), editedPackageJsonStr);
}

export async function copyReadme({ DIST, LIB, rootDir }) {
  await fs.copyFile(
    path.resolve(rootDir, "../../README.md"),
    path.resolve(DIST, "README.md"),
  );
}

export async function buildLib({ DIST, LIB, rootDir }) {
  await rmDirRecursive(path.resolve(rootDir, "build/lib"));

  const execOpt = {
    cwd: rootDir,
  };
  await Promise.all([
    exec("yarn tsc && yarn babel ./build/lib/esm -d ./build/lib/esm", execOpt),
    exec("yarn tsc -p ./tsconfig.commonjs.json", execOpt),
  ]);
}

export async function copyLib({ DIST, LIB, rootDir }) {
  await copyRecursive(path.resolve(rootDir, "build/lib"), LIB);
}
