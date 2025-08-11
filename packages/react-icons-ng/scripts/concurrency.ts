import * as os from "os";

// Resolves a sensible concurrency for icon tasks.
// - If ICON_CONCURRENCY env is a positive integer, use it.
// - Otherwise, use (cpu count - 1) with a minimum of 1.
export function resolveIconConcurrency(): number {
  const raw = process.env.ICON_CONCURRENCY?.trim();
  const n = raw ? Number.parseInt(raw, 10) : NaN;
  if (Number.isFinite(n) && n > 0) return n;
  const cores = os.cpus()?.length || 2;
  return Math.max(1, cores - 1);
}

export const ICON_CONCURRENCY = resolveIconConcurrency();

