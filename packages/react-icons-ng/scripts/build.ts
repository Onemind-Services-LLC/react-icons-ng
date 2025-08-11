import * as path from "path";
import { performance } from "perf_hooks";
import { icons } from "../src/icons";
import { ICON_CONCURRENCY } from "./concurrency";
import { createBar, runSequential, runConcurrentWithRunning } from "./progress";
import * as taskCommon from "./task_common";
import * as taskAll from "./task_all";
import * as taskFiles from "./task_files";

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
      const steps = [
        () => taskAll.dirInit(allOpt),
        () => taskCommon.writeEntryPoints(allOpt),
        () => taskCommon.writeIconsManifest(allOpt),
        () => taskCommon.writeLicense(allOpt),
        () =>
          taskCommon.writePackageJson(
            {
              name: "@onemind-services-llc/react-icons-ng",
              publishConfig: {
                registry: "https://npm.pkg.github.com",
              },
            },
            allOpt,
          ),
        () => taskCommon.copyReadme(allOpt),
      ];
      await runSequential("Initialize", steps);
    });
    await task("react-icons-ng write icons", async () => {
      await runConcurrentWithRunning(
        "Write Icons",
        icons,
        (icon) => taskAll.writeIconModule(icon, allOpt),
        ICON_CONCURRENCY,
        (icon) => icon.id,
      );
    });

    // react-icons-ng-pack
    const filesOpt = {
      rootDir: _rootDir,
      DIST: path.resolve(_rootDir, "../_react-icons-ng-pack"),
      LIB: path.resolve(_rootDir, "../_react-icons-ng-pack/lib"),
    };
    await task("react-icons-ng-pack initialize", async () => {
      const steps = [
        () => taskFiles.dirInit(filesOpt),
        () => taskCommon.writeEntryPoints(filesOpt),
        () => taskCommon.writeIconsManifest(filesOpt),
        () => taskCommon.writeLicense(filesOpt),
        () =>
          taskCommon.writePackageJson(
            {
              name: "@onemind-services-llc/react-icons-ng-pack",
              publishConfig: {
                registry: "https://npm.pkg.github.com",
              },
            },
            filesOpt,
          ),
        () => taskCommon.copyReadme(filesOpt),
      ];
      await runSequential("Initialize", steps);
    });
    await task("react-icons-ng-pack write icons", async () => {
      await runConcurrentWithRunning(
        "Write Pack Icons",
        icons,
        (icon) => taskFiles.writeIconModuleFiles(icon, filesOpt),
        ICON_CONCURRENCY,
        (icon) => icon.id,
      );
    });

    // write to VERSIONS file
    await task("react-icons-ng_builders write icon versions", async () => {
      const bar = createBar("Versions");
      bar.start(icons.length, 0);
      await taskCommon.writeIconVersions(filesOpt, (current) => bar.update(current));
      bar.stop();
    });

    // write to d.ts files
    await task("react-icons-ng_builders build common library", async () => {
      const steps = [
        () => taskCommon.buildLib(filesOpt),
        () => taskCommon.copyLib(allOpt),
        () => taskCommon.copyLib(filesOpt),
      ];
      await runSequential("Build", steps);
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
