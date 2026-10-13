# Contributing

## Workflow

1. Branch from `main`: `feat/kiosk-hospital-sample`, `fix/web-hero-spacing`, `docs/readme-deploy`.
2. Commit with [Conventional Commits](https://www.conventionalcommits.org). The `commit-msg` hook runs commitlint.
   Scopes: `web`, `edu`, `robot`, `kiosk`, `sim`, `speech`, `infra`, `ui`, `bali`, `content`, `config`, `deps`, `ci`, `docker`, `deploy`, `release`.
   ```
   feat(kiosk): add hospital sample venue
   fix(ui): keep aksara lines from overlapping latin text
   docs: explain how to add a locale
   ```
3. Run `pnpm check` before pushing (Biome, typecheck, tests). CI also builds every app on every PR.
4. Open a PR using the template.

## House rules

- **Both languages, always.** Every UI string lives in `apps/*/messages/{id,en}.json`. A test fails if the keys differ.
- **Content in one place.** Brand, products, education levels, demos, and kiosk venues live in `packages/content`. Apps never hard-code product facts.
- **Names from one file.** Brand names that are not final ("NAMA Edu", "NAMA Robot") come from `packages/content/src/names.ts`. Never type them into components or messages; pass them in as `{brand}`.
- **Taksu Tech label only.** Public copy, specs, and images name products as Taksu Tech products. Do not add OEM brand names or model codes.
- **Bali only where it belongs.** The robot site and the kiosk use `theme.css` with Aksara Bali and Balinese motifs. The company profile (`company.css`) is plain, and `apps/edu` and `apps/sim` (`edu.css`) are sold nationwide, so neither carries Balinese ornament.
- **Aksara Bali.** Use `<AksaraText latin="..." />`; write `é` for the taling sound. Official signage text must be reviewed by a Balinese language adviser.
- **Design tokens, not hex codes.** Use the semantic Tailwind tokens from `packages/ui/src/styles/company.css` (company profile), `theme.css` (reception line), or `edu.css` (`bg-surface`, `text-primary`, `bg-level-sd`, ...). Raw colors are only allowed inside illustrations and overlays on photos.
- **Accessibility.** Keyboard focus must stay visible, motion must respect `prefers-reduced-motion`, and decorative Aksara lines use `decorative` so screen readers skip them.

## Adding a blog post (`apps/web`)

The blog lives on the company profile. Old addresses on the education site redirect there.

1. Create `apps/web/src/content/blog/<slug>/id.mdx` and `en.mdx`. Each file starts with `export const meta = { title, summary, date, minutes, topic, tags }` (see `src/content/blog/types.ts`).
2. List the post in `src/content/blog/index.ts`. The list page, the topic filter, the RSS feed (`/id/blog/feed.xml`), the home page's latest posts, and the sitemap pick it up from there.
3. Posts can use `<Note>`, `<Photo src={...} alt="..." caption="..." />`, `<SimMission id="sd-garis" />`, `<EduLink path="/kits/sd">...</EduLink>`, and `<KioskDemo path="/studio" label="..." />` without importing them. Import images from `@/assets/...` at the top of the MDX file.
4. Write the way the team talks in class: concrete numbers, short sentences, no promises the kit cannot keep yet. Anything still being tested on the prototype is described as a design.

## Adding to the work page (`apps/web`)

1. Add an entry to `packages/content/src/works.ts`: what it is, a few facts, links to where people can try or buy it, and the services it shows. Only list things Taksu Tech made.
2. Put a WebP image in `apps/web/src/assets/works/` and map its key in `apps/web/src/lib/images.ts`. Photos use `fit: 'cover'`; screenshots use `fit: 'contain'` and sit on the light-table panel.
3. The content tests check both languages, the service ids, and that links point at real robots, kits, and venues.

## Lab moderation (`apps/edu`)

Every build, topic, and reply waits at `/id/lab/admin` until a moderator publishes it. Publish only what you would show a parent: no faces you were not given consent for, no phone numbers or addresses, no links to shops. Delete spam rather than leaving it pending; deleting a build also deletes its photos.

## Adding a simulator mission (`apps/sim`)

1. Add the arena, goals, starter blocks, and a reference `solution` to `apps/sim/src/features/engine/missions.ts`. The tests run every solution, so a mission that cannot be finished fails CI.
2. Add its title and brief to `packages/content/src/sim-missions.ts`, in the order the syllabus reaches it.
3. Point the meeting that uses it at the mission with the last argument of `m(...)` in `packages/content/src/curriculum.ts`. The module number and meeting numbers shown in the simulator come from there.

## Curriculum videos

Each module can have one YouTube video (`video` in `curriculum.ts`), played from youtube-nocookie.com only after a click. Before a release, check that every video still exists and can be embedded:

```bash
CHECK_VIDEOS=1 pnpm --filter @taksu/content test
```
