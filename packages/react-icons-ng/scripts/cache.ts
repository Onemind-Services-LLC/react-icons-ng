import * as fs from "fs";
import * as path from "path";
import { createHash } from "crypto";

export type PackCacheEntry = {
  svgHash: string;
  iconData: unknown;
};

export type PackCache = Record<string, PackCacheEntry>;

function cacheDir() {
  return path.resolve(__dirname, "../.cache/build");
}

function cacheFile(packId: string) {
  return path.join(cacheDir(), `${packId}.json`);
}

export async function loadPackCache(packId: string): Promise<PackCache> {
  try {
    const file = cacheFile(packId);
    const buf = await fs.promises.readFile(file, "utf8");
    return JSON.parse(buf) as PackCache;
  } catch {
    return {};
  }
}

export async function savePackCache(packId: string, cache: PackCache): Promise<void> {
  const dir = cacheDir();
  await fs.promises.mkdir(dir, { recursive: true });
  const file = cacheFile(packId);
  await fs.promises.writeFile(file, JSON.stringify(cache), "utf8");
}

export function hashString(input: string): string {
  return createHash("sha1").update(input).digest("hex");
}

