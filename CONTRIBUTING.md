# Contributing

## Repositories

This repository is the workspace; every app and the speech service is a submodule with its own
history, CI, and releases:

| Path | Repository |
|---|---|
| `apps/web` | [company-profile](https://github.com/DarmawanWeb/company-profile) |
| `apps/robot` | [reception-robot-web](https://github.com/DarmawanWeb/reception-robot-web) |
| `apps/kiosk` | [reception-robot-kiosk](https://github.com/DarmawanWeb/reception-robot-kiosk) |
| `apps/edu` | [education-robot-web](https://github.com/DarmawanWeb/education-robot-web) |
| `apps/sim` | [education-robot-sim](https://github.com/DarmawanWeb/education-robot-sim) |
| `services/speech` | [reception-robot-speech](https://github.com/DarmawanWeb/reception-robot-speech) |

Clone with `--recursive` (or run `git submodule update --init --recursive`), then `pnpm install`,
which also points every submodule's git hooks at this repository's. A change to an app is a commit
in its submodule: branch, commit, and open the pull request there. Once it is merged, commit the
new pointer here (`git add apps/kiosk`, `chore: update kiosk`), so every commit of this repository
pins the exact apps it deploys. A change that spans a package and an app lands in both: the app
first, then the package and the pointer here in one commit.

## Workflow

1. Branch from `main`: `feat/kiosk-hospital-sample`, `fix/edu-cart-total`, `docs/readme-deploy`.
2. Commit with [Conventional Commits](https://www.conventionalcommits.org); the `commit-msg` hook
   runs commitlint. Scopes: `web`, `edu`, `sim`, `robot`, `kiosk`, `speech`, `infra`, `ui`,
   `edu-ui`, `catalog`, `bali`, `content`, `config`, `deps`, `ci`, `docker`, `deploy`, `release`.
   Subjects start in lower case.
   ```
   feat(kiosk): add hospital sample venue
   feat(catalog): price the Remote Pack
   fix(ui): keep aksara lines from overlapping latin text
   ```
3. Run `pnpm check` before pushing (Biome, typecheck, tests), and `pnpm test:speech` for the
   speech service. CI also builds every app, here and in each app's repository.
4. Open a PR using the template.

## House rules

- **Both languages, always.** Every UI string lives in `apps/*/messages/{id,en}.json`. A test fails
  if the keys differ. Facts use `{ id, en }` pairs, also tested.
- **Facts in one place.** The company profile and the reception line read
  `packages/content` (brand, products, demos, works, kiosk venues); the education robots read
  `packages/catalog` (names, prices, ages, specs, learning paths, policies). Apps never type a
  product fact.
- **Names from one file.** Names that are not final (the reception line's) come from
  `packages/content/src/names.ts`. Never type them into components or messages; pass them in as
  `{brand}`.
- **Taksu Tech label only.** Public copy, specs, and images name products as Taksu Tech products.
  Do not add OEM brand names or model codes.
- **Honest copy.** We sell robots, not classes: the learning paths are free and self-paced, and
  bulk orders come with training for instructors. No invented reviews or testimonials. Anything
  still in development says so (`availability: 'soon'`, a design, not a promise).
- **Bali only where it belongs.** The reception robot site and the kiosk use `theme.css` with
  Aksara Bali and Balinese motifs. The company profile (`company.css`) is plain, and so are the
  education robots (`taksu.css` in `packages/edu-ui`), which are sold nationwide.
- **Aksara Bali.** Use `<AksaraText latin="..." />`; write `é` for the taling sound. Official
  signage text must be reviewed by a Balinese language adviser.
- **Design tokens, not hex codes.** Use the semantic Tailwind tokens from
  `packages/ui/src/styles/company.css` (company profile), `theme.css` (reception line), or
  `packages/edu-ui/src/styles/taksu.css` (store and simulator). Raw colours only inside
  illustrations and overlays on photos.
- **Accessibility.** Keyboard focus must stay visible, motion must respect
  `prefers-reduced-motion`, every image has an alt text in both languages (or `alt=""` when it is
  decorative), decorative Aksara lines use `decorative`, and pages work 360 px wide.

## Selling something new (`apps/edu`)

- **A robot:** add it to `robots` in `packages/catalog/src/robots.ts` with the next number, its
  colour to `taksu.css` and `apps/edu/src/lib/robot-style.ts`, its photo to
  `apps/edu/src/assets/robots/` and `apps/edu/src/lib/images.ts`, and a learning path to
  `learn.ts`. Render its social cards (below).
- **An accessory or upgrade pack:** add it to `products` in `shop.ts`. It goes on sale once it has
  a `price` and its `availability` is no longer `'soon'`.
- **A Drop:** add it to `drops` in `drops.ts` with the next number and `name: null`; the store
  shows the mystery plate until you set the name.

## Learning paths and simulator missions (`apps/edu`, `apps/sim`)

- A step (`packages/catalog/src/learn.ts`) explains one idea in a sentence or two and opens either
  a simulator mission or a guide. Videos are other people's YouTube videos, played from
  youtube-nocookie.com only after a click; check that each still exists before a release.
- A mission: add the arena, goals, starter blocks, and a reference `solution` to
  `apps/sim/src/features/engine/missions.ts` (the tests run every solution), its title and brief
  to `packages/catalog/src/sim-missions.ts`, and point a step at it with `mission:`.

## Adding a blog post (`apps/web`)

1. Create `apps/web/src/content/blog/<slug>/id.mdx` and `en.mdx`. Each file starts with
   `export const meta = { title, summary, date, minutes, topic, tags }` (see
   `src/content/blog/types.ts`).
2. List the post in `src/content/blog/index.ts`. The list page, the topic filter, the RSS feed
   (`/id/blog/feed.xml`), the home page's latest posts, and the sitemap pick it up from there.
3. Posts can use `<Note>`, `<Photo src={...} alt="..." caption="..." />`, `<SimMission id="..." />`,
   `<EduLink path="...">...</EduLink>`, and `<KioskDemo path="/studio" label="..." />` without
   importing them. Import images from `@/assets/...` at the top of the MDX file. A mission box
   names the robot and its step on the learning path, and links to both the simulator and the
   step in the store.
4. Write the way the team talks: concrete numbers, short sentences, no promises a product cannot
   keep yet. Anything still being tested is described as a design.

## Adding to the work page (`apps/web`)

1. Add an entry to `packages/content/src/works.ts`: what it is, a few facts, links to where people
   can try or buy it, and the services it shows. Only list things Taksu Tech made.
2. Put a WebP image in `apps/web/src/assets/works/` and map its key in `apps/web/src/lib/images.ts`.
   Photos use `fit: 'cover'`; screenshots use `fit: 'contain'` and sit on the light-table panel.
3. The content tests check both languages, the service ids, and that links point at real robots,
   learning paths, simulator missions (`packages/catalog`), and kiosk venues.

## Adding a kiosk venue (`apps/kiosk`)

Add a `KioskSite` under `packages/content/src/sites/` and list it in `sites/index.ts`; the
launcher, the kiosk and preview routes, Studio, and the assistant pick it up. The steps and what
the content tests check are in the kiosk's
[development guide](https://github.com/DarmawanWeb/reception-robot-kiosk/blob/main/docs/development.md#recipes).

## Brand files

- **Education wordmark:** `python3 packages/edu-ui/scripts/wordmark.py <name>` redraws
  `packages/edu-ui/src/brand/wordmark-path.ts` from the Anybody font in `node_modules`
  (`pip install fonttools brotli`).
- **Social cards:** `apps/edu/public/og/{site,ciko,momo,garu}-{id,en}.jpg` and
  `apps/{web,robot}/public/og/{id,en}.jpg`, 1200 x 630. They are static images: render new ones
  when a name or tagline changes.
