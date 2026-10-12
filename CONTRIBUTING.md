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
- **No Balinese ornament on the education line.** `apps/edu` and `apps/sim` use `edu.css`; Aksara Bali, poleng, and the Taksu palette stay on the company and robot sites.
- **Aksara Bali.** Use `<AksaraText latin="..." />`; write `é` for the taling sound. Official signage text must be reviewed by a Balinese language adviser.
- **Design tokens, not hex codes.** Use the semantic Tailwind tokens from `packages/ui/src/styles/theme.css` or `edu.css` (`bg-surface`, `text-primary`, `bg-level-sd`, ...). Raw colors are only allowed inside illustrations.
- **Accessibility.** Keyboard focus must stay visible, motion must respect `prefers-reduced-motion`, and decorative Aksara lines use `decorative` so screen readers skip them.
