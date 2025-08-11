import * as util from "node:util";
import { execFile as rawExecFile } from "node:child_process";

const execFile = util.promisify(rawExecFile);

export interface RunGitOptions {
  cwd?: string;
}

export async function runGit(args: string[], options: RunGitOptions = {}) {
  return execFile("git", args, options);
}

export async function gitLsRemote(
  url: string,
  ref: string,
): Promise<string | null> {
  try {
    const { stdout } = await runGit(["ls-remote", url, ref]);
    const s = stdout.trim();
    return s ? s.split(/\s|\t/)[0] : null;
  } catch {
    return null;
  }
}

export async function gitRevParse(
  cwd: string,
  ref: string,
): Promise<string | null> {
  try {
    const { stdout } = await runGit(["rev-parse", ref], { cwd });
    const s = stdout.trim();
    return s || null;
  } catch {
    return null;
  }
}

export async function gitFetchOrigin(cwd: string, branch?: string) {
  const args = ["fetch", "--prune", "--quiet", "origin"].concat(
    branch ? [branch] : [],
  );
  try {
    await runGit(args, { cwd });
  } catch {
    // ignore fetch failures (offline environments)
  }
}

export async function gitCloneNoCheckout(
  url: string,
  destDir: string,
  cwd: string,
) {
  await runGit(["clone", "--filter=tree:0", "--no-checkout", url, destDir], {
    cwd,
  });
}

export async function gitSparseCheckoutSet(cwd: string, remoteDir: string) {
  await runGit(
    ["sparse-checkout", "set", "--cone", "--skip-checks", remoteDir],
    { cwd },
  );
}

export async function gitCheckout(cwd: string, ref: string) {
  await runGit(["checkout", ref], { cwd });
}

export async function gitRevListCount(
  cwd: string,
  rangeFrom: string,
  rangeTo: string,
): Promise<number> {
  try {
    const { stdout } = await runGit(
      ["rev-list", "--count", `${rangeFrom}..${rangeTo}`],
      { cwd },
    );
    return Number(stdout.trim()) || 0;
  } catch {
    return 0;
  }
}
