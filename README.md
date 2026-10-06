# Taksu Tech

Monorepo untuk **Taksu Tech** (bagian dari Ezra Robotics): company profile dwibahasa, demo layar robot resepsionis **Timo** dan **Snow**, dan playground coding blok untuk robot edukasi SD/SMP/SMA. Kearifan lokal Bali (Aksara Bali, kalender Pawukon, salam dan tata krama) jadi bagian dari produk, bukan sekadar hiasan.

| App               | Port | Isi                                                                                                                                                                   |
| ----------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web`        | 3000 | Company profile: robot resepsionis, robot edukasi per jenjang, demo, tentang, kontak (WhatsApp/email)                                                                 |
| `apps/kiosk`      | 3001 | Layar sentuh robot: idle/attract, menu, petunjuk arah dengan peta dan rute, ambil antrean, struktur organisasi, asisten AI (suara), nama dalam Aksara Bali, adat Bali |
| `apps/playground` | 3002 | Coding blok (Blockly, renderer gaya Scratch/App Inventor) dengan simulator sawah, plus kode C++ dan Python yang dihasilkan                                            |

Semua app: Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, next-intl (ID/EN), mode terang/gelap, TypeScript strict.

## Struktur

```
taksu-tech/
├── apps/
│   ├── web/                 # company profile (SSG)
│   ├── kiosk/               # GUI robot + /api/assistant
│   └── playground/          # Blockly + simulator
├── packages/
│   ├── ui/                  # design tokens, komponen shadcn-style, brand (logo, wajah robot, ilustrasi, Aksara)
│   ├── bali/                # transliterasi Aksara Bali, angka Bali, kalender Pawukon (+ unit test)
│   ├── content/             # satu sumber data: brand, produk, jenjang, demo, sampel venue kiosk
│   ├── eslint-config/       # flat config: base, react, next
│   └── typescript-config/   # tsconfig base, react-library, nextjs
├── docker/Dockerfile        # satu Dockerfile untuk ketiga app (turbo prune + standalone)
├── docker-compose.yml       # self-host ketiga app
└── .github/                 # CI, CD (GHCR), dependabot, PR template
```

Kenapa monorepo, bukan multi-repo + submodule: ketiga app berbagi design system, data konten, dan logika Aksara/Pawukon. Satu perubahan (misalnya venue baru) cukup satu commit dan satu PR. Kalau suatu saat perlu dipisah, gunakan `git subtree split --prefix apps/kiosk`.

## Mulai

Butuh Node 22.12+ dan pnpm 10 (`corepack enable`).

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local       # opsional
cp apps/kiosk/.env.example apps/kiosk/.env.local   # opsional, untuk AI
pnpm dev            # ketiga app sekaligus
pnpm dev:kiosk      # satu app saja
```

Buka http://localhost:3000/id, http://localhost:3001/id, http://localhost:3002/id?track=sd.

## Script

| Perintah                            | Fungsi                                          |
| ----------------------------------- | ----------------------------------------------- |
| `pnpm dev`                          | Dev server semua app                            |
| `pnpm build`                        | Build produksi semua app (Turborepo, ter-cache) |
| `pnpm check`                        | Lint + typecheck + test                         |
| `pnpm test`                         | Vitest di semua package                         |
| `pnpm format` / `pnpm format:check` | Prettier (+ plugin Tailwind)                    |

Hook git (husky): `pre-commit` menjalankan Prettier pada file yang di-stage, `commit-msg` menjalankan commitlint.

## Environment

**web** (dibaca saat build): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_KIOSK_URL`, `NEXT_PUBLIC_PLAYGROUND_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (format `62812...`). Tanpa nomor WhatsApp, tombol WhatsApp nonaktif dan form memakai email.

**kiosk** (server runtime):

| Variabel        | Nilai                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| `AI_PROVIDER`   | `offline` (default), `anthropic`, atau `openai`                         |
| `AI_MODEL`      | Default `claude-haiku-4-5-20251001` untuk anthropic, wajib untuk openai |
| `AI_API_KEY`    | API key provider (tidak perlu untuk Ollama lokal)                       |
| `AI_BASE_URL`   | Override endpoint, misalnya `http://localhost:11434/v1` untuk Ollama    |
| `AI_TIMEOUT_MS` | Default 15000                                                           |

Mode `offline` menjawab dari FAQ dan daftar ruangan venue tanpa internet. Mode model memakai system prompt yang hanya berisi data venue, dan otomatis jatuh ke `offline` kalau API gagal atau timeout, jadi robot tidak pernah diam di depan tamu. Endpoint `/api/assistant` memvalidasi input dengan zod dan membatasi panjang riwayat. Endpoint ini juga punya rate limit per IP dan batas panggilan model bersamaan, jadi aman dibuka lewat tunnel di server rumahan.

## Menambah sampel venue (use case kiosk)

1. Salin `packages/content/src/sites/resort.ts` menjadi file baru, misalnya `klinik.ts`, lalu isi `slug`, profil, `organization`, `services` (antrean), `map` (node, edge, ruangan), `faq`, dan `culture`.
2. Daftarkan di `packages/content/src/sites/index.ts` (`kioskSites`).
3. Jalankan `pnpm --filter @taksu/content test`. Test memastikan semua ruangan terjangkau dari posisi robot, ID unik, dan relasi org chart/layanan ke ruangan valid.

Venue baru otomatis muncul di launcher kiosk (setiap robot × venue). Untuk menampilkannya di halaman Demo compro, set `demoSite` pada robot di `packages/content/src/robots.ts` atau tambahkan entri di `demos.ts`.

Koordinat peta memakai unit bebas, dan `metersPerUnit` mengubahnya ke meter untuk petunjuk arah suara. Rute dihitung dengan Dijkstra. Belokan kiri/kanan diturunkan dari cross product segmen (sumbu y ke bawah).

## Menambah bahasa

1. Tambahkan kode di `packages/content/src/i18n.ts` (`locales`, `localeLabels`).
2. Tambahkan field bahasa itu di semua `Localized` pada `packages/content` (TypeScript akan menunjukkan yang kurang).
3. Buat `messages/<kode>.json` di tiap app. Test `messages.test.ts` memastikan key-nya lengkap.

## Kearifan lokal

- **Aksara Bali**: `@taksu/bali` mentransliterasi Latin ke Aksara Bali (adeg-adeg untuk gugus konsonan, cecek/surang/bisah untuk ng/r/h akhir, glide antarvokal). Huruf `e` dibaca pepet; tulis `é` untuk taling. Hasilnya otomatis, jadi teks untuk papan nama resmi perlu ditinjau penyuluh Bahasa Bali. Judul section memakai konvensi papan nama Bali: aksara di atas huruf Latin.
- **Pawukon**: wuku, saptawara, pancawara, dan rahinan (Galungan, Kuningan, Saraswati, Pagerwesi, Tumpek) dihitung dari siklus 210 hari dengan zona WITA. Divalidasi terhadap Galungan 28 Feb 2024, 25 Sep 2024, 23 Apr 2025, dan 19 Nov 2025.
- **Angka Bali** dipakai di tiket antrean, dan **Om Swastiastu** di layar idle robot.
- **Font**: Noto Serif Balinese, Plus Jakarta Sans (karya foundry Indonesia), dan Bricolage Grotesque, di-self-host lewat Fontsource. Kiosk tetap rapi tanpa akses Google Fonts.

## Deploy

**Docker (self-host)**

```bash
docker compose up --build -d     # web :3000, kiosk :3001, playground :3002
```

Atur `SITE_URL`, `KIOSK_URL`, `PLAYGROUND_URL`, `WHATSAPP_NUMBER`, dan `AI_*` di file `.env` di samping `docker-compose.yml`. Image memakai output `standalone` Next.js, user non-root, dan `turbo prune` agar build per app tetap kecil.

**CI/CD (GitHub Actions)**

- `ci.yml`: format check, lint, typecheck, test, build di setiap push/PR, plus commitlint untuk PR.
- `docker.yml`: setiap push ke `main` atau tag `v*` mem-publish `ghcr.io/<owner>/taksu-{web,kiosk,playground}`. Isi repository variables `SITE_URL`, `KIOSK_URL`, `PLAYGROUND_URL`, `WHATSAPP_NUMBER`.

**Mac mini (PM2 + Cloudflare Tunnel + Ollama)**: panduan lengkap di [deploy/macmini/README.md](deploy/macmini/README.md). Ketiga app jalan di `127.0.0.1:4300-4302` (tanpa port 80), asisten kiosk memakai model lokal `taksu-asisten`, dan deploy otomatis lewat self-hosted runner.

**Vercel**: impor repo tiga kali dengan root directory `apps/web`, `apps/kiosk`, `apps/playground`. Turborepo terdeteksi otomatis.

## Catatan konten

- Semua materi publik memakai label Taksu Tech.
- Spesifikasi Timo dan Snow di `packages/content/src/robots.ts` dirangkum dari listing distributor. Kapasitas baterai Snow berbeda antar sumber (15 atau 20 Ah), jadi cocokkan dengan datasheet pabrikan sebelum dipakai di penawaran.
- Ilustrasi robot adalah SVG orisinal sementara. Ganti dengan foto produk resmi saat tersedia.
- Nama orang, nomor, alamat, dan jadwal di sampel venue adalah data contoh, dan ditandai di UI.

## Lisensi

Proprietary. Lihat [LICENSE](LICENSE).
