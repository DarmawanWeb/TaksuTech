# Taksu

Named, numbered robots for children, teenagers, and competition teams, each sold with a free
online learning path.

| #  | Robot | Starts at | For                                            | Status            |
| -- | ----- | --------- | ---------------------------------------------- | ----------------- |
| 01 | Ciko  | age 7     | a first robot car, ready to program            | pre-order         |
| 02 | Momo  | age 11    | a modular ESP32 robot that rebuilds four ways  | pre-order         |
| 03 | Garu  | age 15    | a ROS 2 rover with a camera, LiDAR, and an arm | coming soon       |
| 04 | ??    |           | the next **Drop** from the R&D bench           | revealed at launch |

Drops continue the same number series, so every release gets the next number.

## What is in the repo

```
apps/
  web/        the store, port 3100: robots, Drops, accessories, cart, learning paths,
              guides, business (bulk orders and OEM), help
  sim/        the block simulator, port 3102: missions for Ciko and Momo, live C++ output
packages/
  catalog/    every product fact: brand, robots, prices, accessories, Drops, learning paths,
              guides, FAQ, business offers. The apps never hard-code these.
  ui/         the Taksu theme (taksu.css), wordmark, race-number plate, and shared components
  typescript-config/
docker/       one Dockerfile for both apps
infra/        Caddy, deploy and tunnel scripts for the Mac mini
```

### How buying works

There is no payment on the site. The store is a catalogue with a cart:

- **Direct:** the cart (`/keranjang`) turns the order and the buyer's address into one
  WhatsApp message (or an email when no number is set). We reply with the total, shipping, and
  how to pay.
- **Marketplaces:** Tokopedia and Shopee buttons appear wherever a link is set, either per
  product (`marketplace` in `packages/catalog`) or for the whole store (env below).
- **Business:** `/bisnis` covers bulk orders with training for instructors, and OEM at three
  depths (rebrand, light custom, full custom). Its quote form also opens as WhatsApp or email.

### Learning, not classes

Every robot has a learning path (`/belajar/<robot>`): short steps that each pair one idea with a
simulator mission or a guide, plus curated videos that load only after a click. Guides live at
`/belajar/panduan/<slug>`. Missions in the simulator link back to their step.

## Run it

Needs Node 22.12+ and pnpm 10 (`corepack enable`).

```bash
pnpm install
pnpm dev:web     # http://localhost:3100/id
pnpm dev:sim     # http://localhost:3102/id
pnpm check       # Biome, typecheck, tests
pnpm build
```

Copy `apps/web/.env.example` to `apps/web/.env.local` to try ordering with a WhatsApp number.

## Configuration

Everything public is inlined at build time, so change it and rebuild.

| Variable (web)                 | Set from `infra/.env` | What it does                                         |
| ------------------------------ | --------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_WEB_URL`          | `WEB_HOST`            | canonical links, sitemap, social cards               |
| `NEXT_PUBLIC_SIM_URL`          | `SIM_HOST`            | every "open in the simulator" link                   |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | `WHATSAPP_NUMBER`     | where orders and quotes go; empty means email only   |
| `NEXT_PUBLIC_EMAIL`            | `CONTACT_EMAIL`       | email orders; defaults to `brand.contact.email`      |
| `NEXT_PUBLIC_TOKOPEDIA_URL`    | `TOKOPEDIA_URL`       | our Tokopedia store; the button hides while empty    |
| `NEXT_PUBLIC_SHOPEE_URL`       | `SHOPEE_URL`          | our Shopee store; the button hides while empty       |

The simulator only needs `NEXT_PUBLIC_WEB_URL`, for its links back to the store.

## Deploy on the Mac mini

The stack runs next to Taksu as its own Compose project (`education-robot`): `web`, `sim`, and a Caddy that
listens on `127.0.0.1:4490` for the existing cloudflared tunnel.

```bash
cp infra/.env.example ~/web/education-robot.env        # fill in WHATSAPP_NUMBER and the hosts
ENV_FILE=~/web/education-robot.env infra/deploy.sh     # builds, starts, and smoke-tests through Caddy
ENV_FILE=~/web/education-robot.env infra/scripts/cloudflare-ingress.sh   # once: adds both hostnames
```

CI runs Biome, typecheck, tests, and builds on every push. `docker.yml` publishes images to GHCR;
`deploy-macmini.yml` deploys from a self-hosted runner when started by hand.

## Brand

- **Name:** `packages/catalog/src/brand.ts`, then redraw the logo with
  `python3 packages/ui/scripts/wordmark.py <name>` (needs `pip install fonttools brotli`).
- **Colours:** Ciko's livery. Merah `#e3262d` for actions, Aspal `#1f2228` for dark bands,
  Kapur `#f4f5f7` for the page, Mata cyan `#44ddeb` for learning, Sein amber `#ffb020` for
  Drops and "coming soon". Each robot owns a colour for its plate and its page.
- **Type:** Anybody (wide, heavy) for headlines and race numbers; Atkinson Hyperlegible Next for
  everything else.

Prices, ages, and the policies in the FAQ are starting points: review them in
`packages/catalog` before launch.

## Licence

Proprietary. Copyright (c) 2026 Taksu. All rights reserved.
