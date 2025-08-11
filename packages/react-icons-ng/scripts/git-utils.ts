import * as util from "node:util";
import { execFile as rawExecFile } from "node:child_process";

const execFile = util.promisify(rawExecFile);

export interface RunGitOptions {
  cwd?: string;
  label?: string;
  retries?: number;
  retryDelayMs?: number;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function runGit(args: string[], options: RunGitOptions = {}) {
  const { cwd, label, retries = 2, retryDelayMs = 250 } = options;
  let attempt = 0;
  let lastErr: unknown = null;
  while (attempt <= retries) {
    try {
      return await execFile("git", args, { cwd });
    } catch (e: unknown) {
      lastErr = e;
      if (attempt === retries) break;
      await sleep(retryDelayMs * (attempt + 1));
      attempt += 1;
    }
  }
  // Construct helpful error message
  const pick = (k: "stderr" | "stdout"): string => {
    if (lastErr && typeof lastErr === "object") {
      const rec = lastErr as Record<string, unknown>;
      if (k in rec) {
        const v = rec[k];
        return typeof v === "string" ? v : String(v ?? "");
      }
    }
    return "";
  };
  const stderr = pick("stderr").trim();
  const stdout = pick("stdout").trim();
  const cmd = `git ${args.join(" ")}`;
  const ctx: string[] = [];
  if (label) ctx.push(`label=${label}`);
  if (cwd) ctx.push(`cwd=${cwd}`);
  ctx.push(`cmd=${cmd}`);
  if (stderr) ctx.push(`stderr=${stderr}`);
  if (stdout) ctx.push(`stdout=${stdout}`);
  const err: Error & { cause?: unknown } = new Error(
    `[git] command failed after ${retries + 1} attempt(s)\n${ctx.join("\n")}`,
  );
  err.cause = lastErr;
  throw err;
}

export async function gitLsRemote(
  url: string,
  ref: string,
): Promise<string | null> {
  try {
    const { stdout } = await runGit(["ls-remote", url, ref], {
      label: `ls-remote ${ref}`,
      retries: 2,
    });
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
    const { stdout } = await runGit(["rev-parse", ref], {
      cwd,
      label: `rev-parse ${ref}`,
      retries: 2,
    });
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
    await runGit(args, { cwd, label: `fetch origin ${branch ?? ""}` });
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
    label: `clone ${url} -> ${destDir}`,
    retries: 3,
  });
}

export async function gitSparseCheckoutSet(cwd: string, remoteDir: string) {
  await runGit(
    ["sparse-checkout", "set", "--cone", "--skip-checks", remoteDir],
    {
      cwd,
      label: `sparse-checkout set ${remoteDir}`,
    },
  );
}

export async function gitCheckout(cwd: string, ref: string) {
  await runGit(["checkout", ref], { cwd, label: `checkout ${ref}` });
}

export async function gitRevListCount(
  cwd: string,
  rangeFrom: string,
  rangeTo: string,
): Promise<number> {
  try {
    const { stdout } = await runGit(
      ["rev-list", "--count", `${rangeFrom}..${rangeTo}`],
      {
        cwd,
        label: `rev-list --count ${rangeFrom}..${rangeTo}`,
      },
    );
    return Number(stdout.trim()) || 0;
  } catch {
    return 0;
  }
}
