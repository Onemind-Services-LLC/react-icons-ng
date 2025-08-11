# Repository Guidelines

## Project Structure & Modules

- `packages/react-icons-ng/`: Icon builder scripts and sources (`src/`, `scripts/`, generated `icons/`, `build/`).
- `packages/_react-icons-ng/` and `packages/_react-icons-ng-pack/`: Generated icon distributions (packed via `npm pack`).
- Apps: `packages/preview/` (Next.js), `packages/demo/` (CRA), `packages/ts-test/`, `packages/webpack5-test/`.
- Config: root ESLint/Prettier, `lerna.json`, Yarn workspaces (`packages/*`).

## Build, Test, and Dev Commands

- Root housekeeping:
  - `yarn format` / `yarn format:ci`: Format or check formatting.
  - `yarn lint`: Lint all workspaces.
  - `./build-script.sh`: End‑to‑end: fetch → build → diff, pack outputs, build apps, and update `README.md` icon table.
- Builder package:
  - `cd packages/react-icons-ng && yarn fetch`: Pull icon sources.
  - `cd packages/react-icons-ng && yarn build`: Generate components.
  - `cd packages/react-icons-ng && yarn diff`: Check for changes.
  - Or via workspaces: `yarn workspace react-icons-ng_builders build`.
- App tests/build:
  - `yarn workspace demo test` | `yarn workspace demo build`.
  - `yarn workspace preview build && yarn workspace preview serve`.

## Coding Style & Naming

- Use Prettier (2‑space indent, standard width) and ESLint (React + TypeScript rules). Run `yarn format` and `yarn lint` before commits.
- TypeScript preferred where applicable; React function components.
- Icon components: PascalCase (e.g., `FaBeer`); import by pack folder (`@onemind-services-llc/react-icons-ng/fa`).

## Testing Guidelines

- Frameworks: Jest + React Testing Library in example apps (CRA/Next).
- Place tests as `*.test.tsx` near sources in app packages.
- CI‑like local check: run `./build-script.sh` to exercise builds and sample tests.

## Commit & PR Guidelines

- Commits: clear, scoped messages; include issue keys when relevant (e.g., `OMS-123: Update builder`) or Conventional Commits (e.g., `build(deps-dev): bump prettier`).
- PRs: include description, linked issues, and screenshots for UI changes (demo/preview). Note any icon source/version updates.
- Before opening: `yarn format:ci`, `yarn lint`, run builder `fetch`/`build`/`diff`, and ensure `README.md` icon table is updated (via `./build-script.sh`).

## Security & Environment

- Node 18+ and Yarn 1.x required; monorepo managed by Lerna + Yarn workspaces.
- Publishing uses GitHub Packages; local builds do not require auth. Do not commit packed tarballs.
