import { SingleBar } from "cli-progress";
import PQueue from "p-queue";

export function createBar(label: string, extraFormat?: string) {
  const fmt =
    `${label} [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}` +
    (extraFormat ? ` | ${extraFormat}` : "");
  return new SingleBar({
    format: fmt,
    barCompleteChar: "#",
    barIncompleteChar: ".",
    hideCursor: true,
    stopOnComplete: true,
    barsize: 50,
    etaBuffer: 200,
    fps: 3,
    etaAsynchronousUpdate: true,
  });
}

export async function runSequential(
  label: string,
  steps: Array<() => Promise<unknown>>,
) {
  const bar = createBar(label);
  bar.start(steps.length, 0);
  for (const step of steps) {
    // eslint-disable-next-line no-await-in-loop
    await step();
    bar.increment();
  }
  bar.stop();
}

export async function runConcurrentWithRunning<T>(
  label: string,
  items: T[],
  worker: (item: T) => Promise<void>,
  concurrency: number,
  display?: (item: T) => string,
  runningLimit: number = 50,
) {
  const bar = createBar(label, "running: {running}");
  const queue = new PQueue({ concurrency });
  let done = 0;
  const running = new Set<string>();

  const update = () => {
    const list = Array.from(running).slice(0, concurrency).join(", ");
    const trimmed =
      list.length > runningLimit
        ? list.slice(0, runningLimit - 3) + "..."
        : list;
    bar.update(done, { running: trimmed });
  };

  bar.start(items.length, 0, { running: "" });
  await Promise.all(
    items.map((item) =>
      queue.add(async () => {
        const name = (display ? display(item) : String(item)) || "";
        if (name) running.add(name);
        update();
        await worker(item);
        done += 1;
        if (name) running.delete(name);
        update();
      }),
    ),
  );
  await queue.onIdle();
  bar.stop();
}

export async function timeTask<T>(label: string, fn: () => Promise<T>) {
  const start = Date.now();
  console.log(`================= ${label} =================`);
  const res = await fn();
  const end = Date.now();
  console.log(`${label}:`, Math.floor(end - start) / 1000, "sec\n\n");
  return res;
}

export async function forEachWithProgress<T>(
  label: string,
  items: T[],
  worker: (item: T) => Promise<void>,
  concurrency: number,
  key?: (item: T) => string,
) {
  await runConcurrentWithRunning(label, items, worker, concurrency, key);
}
