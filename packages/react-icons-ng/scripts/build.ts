import path from "path";
import { performance } from "perf_hooks";
import { icons } from "../src/icons";
import * as taskCommon from "./task_common";
import * as taskAll from "./task_all";

// file path
const _rootDir = path.resolve(__dirname, "../");

async function task(name, fn) {
  const start = performance.now();
  console.log(`================= ${name} =================`);
  await fn();
  const end = performance.now();
  console.log(`${name}: `, Math.floor(end - start) / 1000, "sec\n\n");
}

async function main() {
  try {
    // react-icons-ng/all
    const allOpt = {
      rootDir: _rootDir,
      DIST: path.resolve(_rootDir, "../_react-icons-ng"),
      LIB: path.resolve(_rootDir, "../_react-icons-ng/lib"),
    };
    await task("react-icons-ng initialize", async () => {
      await taskAll.dirInit(allOpt);
      await taskCommon.writeEntryPoints(allOpt);
      await taskCommon.writeIconsManifest(allOpt);
      await taskCommon.writeLicense(allOpt);
      await taskCommon.writePackageJson(
        {
          name: "@onemind-services-llc/react-icons-ng",
          publishConfig: {
            registry: "https://npm.pkg.github.com",
          },
        },
        allOpt,
      );
      await taskCommon.copyReadme(allOpt);
    });
    await task("react-icons-ng write icons", async () => {
      for (const icon of icons) {
        await taskAll.writeIconModule(icon, allOpt);
      }
    });

    // react-icons-ng-pack
    const filesOpt = {
      rootDir: _rootDir,
      DIST: path.resolve(_rootDir, "../_react-icons-ng-pack"),
      LIB: path.resolve(_rootDir, "../_react-icons-ng-pack/lib"),
    };
    await task("react-icons-ng-pack initialize", async () => {
      await taskAll.dirInit(filesOpt);
      await taskCommon.writeEntryPoints(filesOpt);
      await taskCommon.writeIconsManifest(filesOpt);
      await taskCommon.writeLicense(filesOpt);
      await taskCommon.writePackageJson(
        {
          name: "@onemind-services-llc/react-icons-ng-pack",
          publishConfig: {
            registry: "https://npm.pkg.github.com",
          },
        },
        filesOpt,
      );
      await taskCommon.copyReadme(filesOpt);
    });
    await task("react-icons-ng-pack write icons", async () => {
      for (const icon of icons) {
        await taskAll.writeIconModuleFiles(icon, filesOpt);
      }
    });

    // write to VERSIONS file
    await task("react-icons-ng_builders write icon versions", async () => {
      await taskCommon.writeIconVersions(allOpt);
    });

    // write to d.ts files
    await task("react-icons-ng_builders build common library", async () => {
      await taskCommon.buildLib(allOpt);
      await taskCommon.copyLib(allOpt);
    });

    console.log("done");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
