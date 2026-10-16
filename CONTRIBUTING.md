# Contributing

## Three repositories

This repository is the workspace; the store and the simulator are submodules with their own
history, CI, and releases:

| Path | Repository |
|---|---|
| `apps/web` | [education-robot-web](https://github.com/DarmawanWeb/education-robot-web) |
| `apps/sim` | [education-robot-sim](https://github.com/DarmawanWeb/education-robot-sim) |

Clone with `--recursive` (or run `git submodule update --init --recursive`), then `pnpm install`,
which also points each submodule's git hooks at this repository's. A change to an app is a commit
in its submodule: branch, commit, and open the pull request there. Once it is merged, commit the
new pointer here (`git add apps/web`, `chore: update web`), so every commit of this repository
pins the exact apps it deploys. A change that spans a package and an app lands in both: the app
first, then the package and the pointer here in one commit.

[TaksuTech](https://github.com/DarmawanWeb/TaksuTech) pins this repository in turn, at
`education-robot`: once a change here is on `main`, commit the new pointer there as well
(`git add education-robot`, `chore: update education-robot`).

## Workflow

1. Branch from `main`: `feat/web-drop-05`, `fix/sim-signal-timing`, `docs/readme-deploy`.
2. Commit with [Conventional Commits](https://www.conventionalcommits.org); the `commit-msg` hook
   runs commitlint. Scopes: `web`, `sim`, `ui`, `catalog`, `config`, `deps`, `ci`, `docker`,
   `deploy`, `infra`, `release`. Subjects start in lower case.
   ```
   feat(catalog): price the Remote Pack
   fix(web): keep the cart total on one line
   ```
3. Run `pnpm check` before pushing. CI also builds both apps, here and in each submodule.
4. Open a PR with the template.

## House rules

- **Both languages, always.** Every UI string lives in `apps/*/messages/{id,en}.json`; a test
  fails when their keys differ. Catalogue text uses `{ id, en }` pairs, also tested.
- **Facts in one place.** Names, prices, ages, specs, and policies come from `packages/catalog`.
  Pages never type a price or a robot name.
- **Honest copy.** We sell robots, not classes: the learning paths are free and self-paced, and
  bulk orders come with training for instructors. No invented reviews or testimonials. Anything
  still in development says so (`availability: 'soon'`, `priceNote`).
- **Design tokens, not hex codes.** Use the tokens in `packages/ui/src/styles/taksu.css`
  (`bg-primary`, `bg-ink`, `asphalt`, `bg-robot-ciko`, `type-display`, `type-number`). Raw colours
  only inside illustrations and the dark bands.
- **Accessibility.** Keep keyboard focus visible, respect `prefers-reduced-motion`, give every
  image an alt text in both languages (or `alt=""` when it is decorative), and check 360 px wide.

## Selling something new

- **A robot:** add it to `robots` in `packages/catalog/src/robots.ts` with the next number,
  add its colour to `taksu.css` and `apps/web/src/lib/robot-style.ts`, its photo to
  `apps/web/src/assets/robots/` and `apps/web/src/lib/images.ts`, and a learning path to
  `learn.ts`. Render its social cards (below).
- **An accessory or upgrade pack:** add it to `products` in `shop.ts`. It goes on sale once it
  has a `price` and its `availability` is no longer `'soon'`.
- **A Drop:** add it to `drops` in `drops.ts` with the next number and `name: null`; the site
  shows the mystery plate until you set the name.

## Learning paths and guides

- A step (`packages/catalog/src/learn.ts`) explains one idea in a sentence or two and opens
  either a simulator mission or a guide. Its title comes from that mission or guide.
- Videos are other people's YouTube videos that explain the idea well. They play from
  youtube-nocookie.com only after a click; check that each one still exists before a release.
- Guides (`guides.ts`) are numbered steps grouped in sections, with an optional note.

## Simulator missions (`apps/sim`)

1. Add the arena, goals, starter blocks, and a reference `solution` to
   `apps/sim/src/features/engine/missions.ts`. The tests run every solution, so a mission that
   cannot be finished fails CI.
2. Add its title and brief to `packages/catalog/src/sim-missions.ts`.
3. Point a learning-path step at it with `mission:`. The simulator shows "step n of N" from there.

## Brand files

- **Wordmark:** `python3 packages/ui/scripts/wordmark.py <name>` redraws
  `packages/ui/src/brand/wordmark-path.ts` from the Anybody font in `node_modules`.
- **Social cards:** `apps/web/public/og/{site,ciko,momo,garu}-{id,en}.jpg`, 1200 x 630. They are
  static images: render new ones when a robot's name or tagline changes, and for every new robot.
