# Taksu Tech

Monorepo **Taksu Tech**, robotika karya anak Bali di bawah **Ezra Robotics**. Dua lini produk dengan rasa berbeda:

- **Taksu Reception** (khusus Bali): Snow dan Timo **Edisi Bali** plus **Taksu Kiosk** buatan sendiri. Aksara Bali sesuai Pergub Bali 80/2018, cetak tiket dan kartu tamu, dan bisa diajak bicara.
- **Taksu Edu** (umum, untuk sekolah di mana saja): Robot Pintar SD, Robot Modular ESP32 SMP, dan Robot Advanced ROS 2 SMA, dengan simulator gratis, kurikulum per pertemuan, dan panduan.

| App / layanan     | Dev port | Isi                                                                                                      |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `apps/web`        | 3000     | Company profile + area `/reception` (nuansa Bali) + area `/education` (tema netral), ID/EN, statis       |
| `apps/kiosk`      | 3001     | Layar robot: ngobrol suara, antrean, buku tamu, petunjuk arah, cetak 80 mm dengan QR, Studio kios kustom |
| `apps/sim`        | 3002     | Simulator robot 2WD (fisika, sensor garis, sonar, servo, suhu, suara) + Blockly + pratinjau C++          |
| `services/speech` | 8000     | FastAPI: Whisper (faster-whisper) untuk STT, Piper untuk TTS Bahasa Indonesia dan Inggris                |
| `infra/`          | 4480     | Docker Compose, Caddy, Prometheus, Loki, Alloy, Grafana, skrip cloudflared dan Ollama                    |

```
taksu-tech/
├── apps/{web,kiosk,sim}
├── packages/
│   ├── content/      # satu sumber data: robot, perbandingan, kurikulum 32/36/36, panduan, misi simulator
│   ├── ui/           # design system, RobotFace (lip-sync), ilustrasi robot termasuk Taksu Kiosk
│   ├── bali/         # transliterasi Aksara Bali + kalender Pawukon
│   └── eslint-config, typescript-config
├── services/speech/  # Python, diuji dengan engine palsu
└── infra/            # caddy/, monitoring/, ollama/, scripts/, deploy.sh, .env.example
```

## Jalankan untuk pengembangan

```bash
pnpm install
pnpm dev                     # web :3000, kiosk :3001, sim :3002
pnpm test && pnpm test:speech
```

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
git clone <repo> ~/apps/taksu-tech/app && cd ~/apps/taksu-tech/app
cp infra/.env.example ~/apps/taksu-tech/.env       # isi domain, CLOUDFLARE_TUNNEL, GRAFANA_ADMIN_PASSWORD
infra/ollama/setup.sh                               # sekali: membuat model taksu-asisten
ENV_FILE=~/apps/taksu-tech/.env infra/deploy.sh     # build, start, smoke test lewat Caddy
ENV_FILE=~/apps/taksu-tech/.env infra/scripts/cloudflare-ingress.sh
```

| Hostname                          | Ke                                         |
| --------------------------------- | ------------------------------------------ |
| `taksu.agus-darmawan.com`         | web (compro, edu, resepsionis)             |
| `taksu-kiosk.agus-darmawan.com`   | kiosk (mikrofon diizinkan)                 |
| `taksu-sim.agus-darmawan.com`     | simulator                                  |
| `taksu-grafana.agus-darmawan.com` | Grafana, lindungi dengan Cloudflare Access |

Semua hostname di cloudflared mengarah ke satu target `http://127.0.0.1:4480`; Caddy yang memilah per domain. Skrip ingress membuat cadangan `config.yml`, menyisipkan aturan sebelum `http_status:404`, memvalidasi, membuat CNAME, lalu me-restart cloudflared.

Deploy otomatis: `.github/workflows/deploy-macmini.yml` berjalan di runner self-hosted setelah CI hijau, menyalin repo ke `~/apps/taksu-tech/app`, lalu menjalankan `infra/deploy.sh`.

### Suara

Saat pertama start, service speech mengunduh model Whisper `small` dan suara Piper `id_ID-news_tts-medium` serta `en_US-lessac-medium` ke volume `speech_models`. Selama itu `/api/speech/health` bernilai false dan kiosk memakai suara browser. Setelah siap, mulut robot bergerak mengikuti suara asli (lip-sync). Ganti ke `WHISPER_MODEL=base` bila ingin lebih cepat.

### Monitoring

`MONITORING=1` menjalankan profil `monitoring`: Prometheus (scrape Caddy dan probe blackbox ke web, kiosk, sim, speech, Ollama), Loki + Alloy (log semua kontainer proyek `taksu`), dan Grafana dengan dasbor **Taksu Tech: layanan** yang langsung terpasang. Jika ingin memakai stack monitoring yang sudah ada di `~/apps/monitoring`, set `MONITORING=0` lalu tambahkan target probe dari `infra/monitoring/prometheus.yml`.

## Catatan konten

- Materi publik hanya memakai label Taksu Tech, tanpa nama OEM.
- Persentase TKDN Taksu Kiosk tidak diklaim sebelum ada sertifikat; situs menulis "disiapkan untuk sertifikasi TKDN".
- Aksara Bali dihasilkan otomatis. Papan nama resmi tetap ditinjau penyuluh Bahasa Bali.
- Spesifikasi kit SD dan SMP mengikuti dokumen konsep (tahap validasi prototipe). Gambar produk yang dipakai adalah poster dan render milik Taksu Tech; foto komponen dari pemasok tidak dipublikasikan.
- `piper-tts` 1.3 berlisensi GPL-3.0 dan berjalan sebagai layanan terpisah. Periksa lisensi tiap suara Piper di model card-nya sebelum dipakai komersial.
