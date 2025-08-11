import * as path from "path";
import findPackage from "find-package";
import { promisify } from "util";
const exec = promisify(require("child_process").exec);
import { IconDefinition } from "./_types";
import { getIconFiles } from "./logics";

export interface IconSetVersion {
  icon: IconDefinition;
  version: string;
  count: number;
}

export async function getVersionForDir(firstDir: string): Promise<string> {
  const pkg = findPackage(firstDir, true);
  if (pkg.version && !pkg.name.includes("react-icons-ng")) {
    return pkg.version;
  }
  const { stdout } = await exec(`git describe --tags || git rev-parse HEAD`, {
    cwd: firstDir,
  });
  return stdout.trim();
}

export async function computeIconVersions(
  icons: IconDefinition[],
  progress?: (current: number, total: number) => void,
): Promise<IconSetVersion[]> {
  const total = icons.length;
  let current = 0;
  const versions: IconSetVersion[] = [];
  for (const icon of icons) {
    const files = (
      await Promise.all(icon.contents.map((content) => getIconFiles(content)))
    ).flat();

    if (files.length === 0) {
      throw new Error(`Missing path for: ${icon.name}`);
    }

    const firstDir = path.dirname(files[0]);
    const version = await getVersionForDir(firstDir);
    versions.push({ icon, version, count: files.length });
    current += 1;
    if (progress) progress(current, total);
  }
  return versions;
}

export function renderVersionsTable(list: IconSetVersion[]): string {
  return (
    "| Icon Library | License | Version | Count |\n" +
    "|:---:|:---:|:---:|:---:|\n" +
    list
      .map(
        (v) =>
          `| ${[
            `[${v.icon.name}](${v.icon.projectUrl})`,
            `[${v.icon.license}](${v.icon.licenseUrl})`,
            v.version,
            v.count,
          ].join(" | ")} |`,
      )
      .join("\n") +
    "\n"
  );
}
