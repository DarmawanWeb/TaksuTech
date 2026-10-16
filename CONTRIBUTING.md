# Contributing

## Repositories

This repository is the workspace; the apps and the speech service are submodules with their own
history, CI, and releases:

| Path | Repository |
|---|---|
| `apps/web` | [company-profile](https://github.com/DarmawanWeb/company-profile) |
| `apps/robot` | [reception-robot-web](https://github.com/DarmawanWeb/reception-robot-web) |
| `apps/kiosk` | [reception-robot-kiosk](https://github.com/DarmawanWeb/reception-robot-kiosk) |
| `services/speech` | [reception-robot-speech](https://github.com/DarmawanWeb/reception-robot-speech) |
| `education-robot` | [education-robot](https://github.com/DarmawanWeb/education-robot), a workspace of its own |

Clone with `--recursive` (or run `git submodule update --init --recursive`), then `pnpm install`,
which also points each app's and the speech service's git hooks at this repository's. A change to
an app is a commit in its submodule: branch, commit, and open the pull request there. Once it is
merged, commit the new pointer here (`git add apps/kiosk`, `chore: update kiosk`), so every commit
of this repository pins the exact apps it deploys. A change that spans a package and an app lands
in both: the app first, then the package and the pointer here in one commit.

education-robot has its own packages, lockfile, and stack: run `pnpm install` inside it, follow
its contributing guide, and commit its new pointer here (`chore: update education-robot`).

## Workflow

1. Branch from `main`: `feat/kiosk-hospital-sample`, `fix/web-hero-spacing`, `docs/readme-deploy`.
2. Commit with [Conventional Commits](https://www.conventionalcommits.org); the `commit-msg` hook
   runs commitlint. Scopes: `web`, `robot`, `kiosk`, `speech`, `infra`, `ui`, `bali`, `content`,
   `config`, `deps`, `ci`, `docker`, `deploy`, `release`. Subjects start in lower case.
   ```
   feat(kiosk): add hospital sample venue
   fix(ui): keep aksara lines from overlapping latin text
   docs: explain how to add a locale
   ```
3. Run `pnpm check` before pushing (Biome, typecheck, tests), and `pnpm test:speech` for the
   speech service. CI also builds every app, here and in each app's repository.
4. Open a PR using the template.

## House rules

- **Both languages, always.** Every UI string lives in `apps/*/messages/{id,en}.json`. A test fails
  if the keys differ.
- **Content in one place.** Brand, products, demos, works, and kiosk venues live in
  `packages/content`. Apps never hard-code product facts.
- **Names from one file.** Names that are not final (the reception line's) come from
  `packages/content/src/names.ts`. Never type them into components or messages; pass them in as
  `{brand}`.
- **Taksu Tech label only.** Public copy, specs, and images name products as Taksu Tech products.
  Do not add OEM brand names or model codes.
- **Bali only where it belongs.** The reception robot site and the kiosk use `theme.css` with
  Aksara Bali and Balinese motifs. The company profile (`company.css`) is plain, and so are the
  education robots, which are sold nationwide.
- **Aksara Bali.** Use `<AksaraText latin="..." />`; write `é` for the taling sound. Official
  signage text must be reviewed by a Balinese language adviser.
- **Design tokens, not hex codes.** Use the semantic Tailwind tokens from
  `packages/ui/src/styles/company.css` (company profile) or `theme.css` (reception line). Raw
  colours are only allowed inside illustrations and overlays on photos.
- **Accessibility.** Keyboard focus must stay visible, motion must respect
  `prefers-reduced-motion`, and decorative Aksara lines use `decorative` so screen readers skip
  them.

## Adding a blog post (`apps/web`)

1. Create `apps/web/src/content/blog/<slug>/id.mdx` and `en.mdx`. Each file starts with
   `export const meta = { title, summary, date, minutes, topic, tags }` (see
   `src/content/blog/types.ts`).
2. List the post in `src/content/blog/index.ts`. The list page, the topic filter, the RSS feed
   (`/id/blog/feed.xml`), the home page's latest posts, and the sitemap pick it up from there.
3. Posts can use `<Note>`, `<Photo src={...} alt="..." caption="..." />`, `<SimMission id="..." />`,
   `<EduLink path="...">...</EduLink>`, and `<KioskDemo path="/studio" label="..." />` without
   importing them. Import images from `@/assets/...` at the top of the MDX file. Education links
   go through the old education hosts, which land on the education-robot store and simulator.
4. Write the way the team talks: concrete numbers, short sentences, no promises a product cannot
   keep yet. Anything still being tested is described as a design.

## Adding to the work page (`apps/web`)

1. Add an entry to `packages/content/src/works.ts`: what it is, a few facts, links to where people
   can try or buy it, and the services it shows. Only list things Taksu Tech made.
2. Put a WebP image in `apps/web/src/assets/works/` and map its key in `apps/web/src/lib/images.ts`.
   Photos use `fit: 'cover'`; screenshots use `fit: 'contain'` and sit on the light-table panel.
3. The content tests check both languages, the service ids, and that links point at real robots
   and venues.

## Adding a kiosk venue (`apps/kiosk`)

Add a `KioskSite` under `packages/content/src/sites/` and list it in `sites/index.ts`; the
launcher, the kiosk and preview routes, Studio, and the assistant pick it up. The steps and what
the content tests check are in the kiosk's
[development guide](https://github.com/DarmawanWeb/reception-robot-kiosk/blob/main/docs/development.md#recipes).
