# Taksu Tech

Monorepo **Taksu Tech** di bawah **Ezra Robotics**: satu company profile dan dua lini produk, masing-masing dengan situs sendiri karena pasarnya berbeda.

- **Company profile** (`apps/web`): siapa kami, dua lini produk, demo, kontak. Nuansa Bali.
- **NAMA Robot** (`apps/robot`, khusus Bali): Snow dan Timo **Edisi Bali** plus **Taksu Kiosk** buatan sendiri. Aksara Bali sesuai Pergub Bali 80/2018, cetak tiket dan kartu tamu, bisa diajak bicara.
- **NAMA Edu** (`apps/edu`, untuk sekolah di seluruh Indonesia, tanpa unsur Bali): kit **SD v1**, **SMP v1**, **SMA v1**, upgrade pack dan aksesori, simulator gratis, kurikulum per pertemuan, panduan.

Nama "NAMA Edu" dan "NAMA Robot" masih placeholder. Semua situs membacanya dari `packages/content/src/names.ts`, jadi mengganti nama cukup satu baris di sana.

| App / layanan     | Dev port | Isi                                                                                                      |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `apps/web`        | 3000     | Company profile, ID/EN, statis. Alamat lama `/reception/*` dan `/education/*` dialihkan ke situs produk  |
| `apps/kiosk`      | 3001     | Layar robot: ngobrol suara, antrean, buku tamu, petunjuk arah, cetak 80 mm dengan QR, Studio kios kustom |
| `apps/sim`        | 3002     | Simulator robot 2WD (fisika, sensor garis, sonar, servo, suhu, suara) + Blockly + pratinjau C++          |
| `apps/edu`        | 3003     | Situs edukasi: kit, upgrade, kurikulum, panduan, simulator, program sekolah, form proposal               |
| `apps/robot`      | 3004     | Situs robot resepsionis: line-up sesuai tinggi asli, detail robot, perbandingan, Aksara Bali, demo       |
| `services/speech` | 8000     | FastAPI: Whisper (faster-whisper) untuk STT, Piper untuk TTS Bahasa Indonesia dan Inggris                |
| `infra/`          | 4480     | Docker Compose, Caddy, Prometheus, Loki, Alloy, Grafana, skrip cloudflared dan Ollama                    |

```
taksu-tech/
├── apps/{web,edu,robot,kiosk,sim}
├── packages/
│   ├── content/      # satu sumber data: nama brand, robot, kit, upgrade pack, kurikulum, panduan, misi
│   ├── ui/           # komponen bersama + dua tema: theme.css (Taksu, Bali) dan edu.css (edukasi)
│   ├── bali/         # transliterasi Aksara Bali + kalender Pawukon
│   └── typescript-config
├── services/speech/  # Python, diuji dengan engine palsu
└── infra/            # caddy/, monitoring/, ollama/, scripts/, deploy.sh, .env.example
```

## Jalankan untuk pengembangan

```bash
pnpm install
pnpm dev                     # web :3000, kiosk :3001, sim :3002, edu :3003, robot :3004
pnpm dev:edu                 # satu app saja
pnpm check                   # Biome, typecheck, test
pnpm test:speech
```

Format dan lint memakai [Biome](https://biomejs.dev) (`biome.json` di root). Hook pre-commit merapikan file yang di-stage, dan commitlint memeriksa pesan commit.

Tanpa service suara, kiosk otomatis memakai suara dan pengenalan suara bawaan browser. Untuk mencoba Whisper dan Piper di laptop:

```bash
cd services/speech && pip install -r requirements.txt
SPEECH_MODELS_DIR=./models uvicorn app.main:app --port 8000
# apps/kiosk/.env.local
SPEECH_URL=http://localhost:8000
```

## Deploy di Mac mini (Docker + Caddy + cloudflared)

Semua app dan layanan berjalan di Docker. Hanya Caddy yang membuka port, yaitu `127.0.0.1:4480`. Port 80 (sudah terpakai), 8080 (cAdvisor), 3000, 3100, 5432, 9090, dan 9100 tidak disentuh. Ollama tetap native di macOS agar memakai GPU Metal; kontainer menjangkaunya lewat `host.docker.internal:11434`.

```bash
cd ~/web/taksu-tech
cp infra/.env.example ~/web/taksu-tech.env          # isi domain, CLOUDFLARE_TUNNEL, GRAFANA_ADMIN_PASSWORD
infra/ollama/setup.sh                                # sekali: membuat model taksu-asisten
ENV_FILE=~/web/taksu-tech.env infra/deploy.sh        # build, start, smoke test lewat Caddy
ENV_FILE=~/web/taksu-tech.env CLOUDFLARED_CONFIG=~/.cloudflared/config.yml infra/scripts/cloudflare-ingress.sh
```

| Hostname                          | Ke                                         |
| --------------------------------- | ------------------------------------------ |
| `taksu.agus-darmawan.com`         | web (company profile)                      |
| `taksu-edu.agus-darmawan.com`     | edu (situs edukasi)                        |
| `taksu-robot.agus-darmawan.com`   | robot (situs robot resepsionis)            |
| `taksu-kiosk.agus-darmawan.com`   | kiosk (mikrofon diizinkan)                 |
| `taksu-sim.agus-darmawan.com`     | simulator                                  |
| `taksu-grafana.agus-darmawan.com` | Grafana, lindungi dengan Cloudflare Access |

Hostname diatur lewat `WEB_HOST`, `EDU_HOST`, `ROBOT_HOST`, `KIOSK_HOST`, `SIM_HOST`, dan `GRAFANA_HOST` di file env; yang tidak diisi memakai nilai di atas. Semua hostname di cloudflared mengarah ke satu target `http://127.0.0.1:4480`; Caddy yang memilah per domain. Skrip ingress membuat cadangan `config.yml`, menyisipkan aturan sebelum `http_status:404`, memvalidasi, membuat CNAME, lalu me-restart cloudflared.

Deploy otomatis: `.github/workflows/deploy-macmini.yml` berjalan di runner self-hosted setelah CI hijau, menyalin repo ke `~/web/taksu-tech`, lalu menjalankan `infra/deploy.sh` dengan `~/web/taksu-tech.env`.

### Suara

Saat pertama start, service speech mengunduh model Whisper `small` dan suara Piper `id_ID-news_tts-medium` serta `en_US-lessac-medium` ke volume `speech_models`. Selama itu `/api/speech/health` bernilai false dan kiosk memakai suara browser. Audio dari browser diubah ke 16 kHz mono dengan ffmpeg sebelum masuk Whisper. Setelah siap, mulut robot bergerak mengikuti suara asli (lip-sync). Ganti ke `WHISPER_MODEL=base` bila ingin lebih cepat.

### Monitoring

`MONITORING=1` menjalankan profil `monitoring`: Prometheus (scrape Caddy dan probe blackbox ke web, edu, robot, kiosk, sim, speech, Ollama), Loki + Alloy (log semua kontainer proyek `taksu`), dan Grafana dengan dasbor **Taksu Tech: layanan** yang langsung terpasang. Jika ingin memakai stack monitoring yang sudah ada di `~/apps/monitoring`, set `MONITORING=0` lalu tambahkan target probe dari `infra/monitoring/prometheus.yml`.

## Catatan konten

- Situs edukasi sengaja tanpa unsur Bali (pasarnya nasional): tema `edu.css`, font Archivo dan Atkinson Hyperlegible, simulator ikut tema yang sama.
- Kit diberi nama per jenjang dan versi (`SD v1`, `SMP v1`, `SMA v1`). Upgrade pack dan aksesori ditandai "Segera" sampai siap dijual.
- Materi publik hanya memakai label Taksu Tech, tanpa nama OEM.
- Persentase TKDN Taksu Kiosk tidak diklaim sebelum ada sertifikat; situs menulis "disiapkan untuk sertifikasi TKDN".
- Aksara Bali dihasilkan otomatis. Papan nama resmi tetap ditinjau penyuluh Bahasa Bali.
- Spesifikasi kit SD dan SMP mengikuti dokumen konsep (tahap validasi prototipe). Gambar produk adalah render konsep milik Taksu Tech.
- `piper-tts` 1.3 berlisensi GPL-3.0 dan berjalan sebagai layanan terpisah. Periksa lisensi tiap suara Piper di model card-nya sebelum dipakai komersial.
