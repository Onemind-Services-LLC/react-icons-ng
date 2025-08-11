import * as path from "path";

export function getRootDir() {
  return path.resolve(__dirname, "../");
}

export function getDistDirs(kind: "all" | "pack") {
  const rootDir = getRootDir();
  if (kind === "all") {
    const DIST = path.resolve(rootDir, "../_react-icons-ng");
    const LIB = path.resolve(rootDir, "../_react-icons-ng/lib");
    return { rootDir, DIST, LIB };
  }
  const DIST = path.resolve(rootDir, "../_react-icons-ng-pack");
  const LIB = path.resolve(rootDir, "../_react-icons-ng-pack/lib");
  return { rootDir, DIST, LIB };
}

