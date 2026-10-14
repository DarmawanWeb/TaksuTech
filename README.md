# Taksu Tech

Monorepo **Taksu Tech** di bawah **Ezra Robotics**: satu company profile dan dua lini produk, masing-masing dengan situs sendiri karena pasarnya berbeda.

- **Company profile** (`apps/web`): siapa kami, dua lini produk, layanan kustom (robot dan PCB, IoT, aplikasi web), karya, blog, demo, kontak. Umum dan polos, tanpa ornamen Bali; nuansa Bali hanya ada di situs robot resepsionis dan layar kios.
- **NAMA Robot** (`apps/robot`, khusus Bali): Snow dan Timo **Edisi Bali** plus **Taksu Kiosk** buatan sendiri. Aksara Bali sesuai Pergub Bali 80/2018, cetak tiket dan kartu tamu, bisa diajak bicara.
- **NAMA Edu** (`apps/edu`, untuk sekolah di seluruh Indonesia, tanpa unsur Bali): kit **SD v1**, **SMP v1**, **SMA v1**, upgrade pack dan aksesori, simulator gratis, kurikulum per pertemuan dengan video dan silabus yang bisa dicetak, panduan, dan Lab (karya kelas, tantangan, forum yang dimoderasi).

Nama "NAMA Edu" dan "NAMA Robot" masih placeholder. Semua situs membacanya dari `packages/content/src/names.ts`, jadi mengganti nama cukup satu baris di sana.

| App / layanan     | Dev port | Isi                                                                                                      |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `apps/web`        | 3000     | Company profile, ID/EN: layanan, karya, blog (MDX + RSS), demo. Alamat lama dialihkan ke situs produk    |
| `apps/kiosk`      | 3001     | Layar robot dan totem 24 inci tegak: suara, antrean, buku tamu, rute, cetak 80 mm, Studio, pratinjau     |
| `apps/sim`        | 3002     | Simulator SD v1 dan SMP v1 (gerak, sensor garis, sonar, servo, suhu, suara, Wi-Fi) + Blockly + C++      |
| `apps/edu`        | 3003     | Situs edukasi: kit, upgrade, kurikulum, panduan, Lab (SQLite + foto), simulator, program sekolah        |
| `apps/robot`      | 3004     | Situs robot resepsionis: line-up sesuai tinggi asli, detail robot, perbandingan, Aksara Bali, demo       |
| `services/speech` | 8000     | FastAPI: Whisper (faster-whisper) untuk STT, Piper untuk TTS Bahasa Indonesia dan Inggris                |
| `infra/`          | 4480     | Docker Compose, Caddy, Prometheus, Loki, Alloy, Grafana, skrip cloudflared dan Ollama                    |

```
taksu-tech/
├── apps/{web,edu,robot,kiosk,sim}
├── packages/
│   ├── content/      # satu sumber data: nama brand, robot, kit, upgrade pack, kurikulum, panduan, misi
│   ├── ui/           # komponen bersama + tiga tema: company.css, theme.css (resepsionis, Bali), edu.css
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
cp infra/.env.example ~/web/taksu-tech.env          # isi domain, CLOUDFLARE_TUNNEL, GRAFANA_ADMIN_PASSWORD, LAB_*
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

### Lab di situs edukasi

Lab menyimpan karya kelas, topik forum, dan foto di SQLite pada volume `edu_lab` (`/data/lab` di kontainer edu), jadi tetap ada setelah deploy ulang. Semua kiriman menunggu persetujuan di `/id/lab/admin`.

- `LAB_ADMIN_PASSWORD` membuka halaman moderasi. Tanpa ini halaman moderasi terkunci dan tidak ada kiriman yang terbit.
- `LAB_SECRET` menandatangani cookie sesi moderator. Buat dengan `openssl rand -hex 32`.
- `LAB_NOTIFY_URL` (opsional) menerima pesan singkat setiap ada kiriman baru, misalnya topik ntfy.
- Foto diubah ke WebP (1600 px dan 640 px) dan data lokasinya dibuang saat diunggah. Caddy menerima unggahan sampai 40 MB.

```bash
ENV_FILE=~/web/taksu-tech.env infra/scripts/lab-backup.sh                 # backups/lab-YYYY-MM-DD-HHMM.tgz
ENV_FILE=~/web/taksu-tech.env infra/scripts/lab-restore.sh backups/lab-2026-10-13-0900.tgz
```

### Monitoring

`MONITORING=1` menjalankan profil `monitoring`: Prometheus (scrape Caddy dan probe blackbox ke web, edu, robot, kiosk, sim, speech, Ollama), Loki + Alloy (log semua kontainer proyek `taksu`), dan Grafana dengan dasbor **Taksu Tech: layanan** yang langsung terpasang. Jika ingin memakai stack monitoring yang sudah ada di `~/apps/monitoring`, set `MONITORING=0` lalu tambahkan target probe dari `infra/monitoring/prometheus.yml`.

## Simulator dan kurikulum

- Robot di arena digambar seperti kit aslinya. SD v1: bodi merah bergaris putih, visor hitam dengan mata OLED, sensor ultrasonik di bumper depan, dua sensor garis di bawahnya, dan lampu sein oranye di kedua sudut depan. SMP v1: rangka merah, bar IR 5-in-1, HC-SR04 di atas servo, ESP32, TB6612FNG, AHT10, mikrofon. Roda berputar sesuai motor, lensa IR menyala saat melihat lakban, sonar tampil sebagai kerucut, buzzer sebagai gelombang suara, dan lampu sein berkedip dengan bunyi tik seperti di mobil. Tombol "Ikuti robot" memperbesar arena di sekitar robot.
- Setiap misi terhubung ke pertemuan tertentu di silabus (`m(..., 'id-misi')` di `curriculum.ts`). Simulator menampilkan "Modul n, pertemuan x" dan tautan balik ke silabus; halaman silabus menampilkan "Coba di simulator" di baris pertemuannya. Misi yang selesai diingat di browser.
- Ada 18 misi: 10 untuk SD v1 dan 8 untuk SMP v1, termasuk lampu sein sebelum belok (SD modul 2), input-proses-output dengan tangan yang mendekat (SMP modul 1) dan telemetri Wi-Fi dengan dasbor lokal dan mode luring (SMP modul 7).
- Setiap modul SD dan SMP punya satu video YouTube dengan catatan cara memakainya di kelas. Video baru dimuat dari youtube-nocookie.com setelah diklik. ID video dicek lewat halaman kanal dan daftar resminya, belum lewat oEmbed; jalankan `CHECK_VIDEOS=1 pnpm --filter @taksu/content test` sekali dari jaringan biasa.
- Pemetaan KKA memakai nama elemen resmi mapel Koding dan Kecerdasan Artifisial dan fasenya (C, D, E dan F).
- Silabus bisa dicetak dari tombol "Cetak silabus"; versi cetak selalu hitam di atas putih.
- Blog pindah ke company profile (`apps/web/src/content/blog`); alamat blog lama di situs edukasi dialihkan ke sana. Cara menambah tulisan ada di `CONTRIBUTING.md`. Tanggal tulisan contoh perlu disesuaikan saat benar-benar terbit.

## Layar kios

- Satu aplikasi untuk tiga layar. Ukurannya mengikuti sisi pendek layar: 16 px di layar 13,3 inci Snow dan Timo (mendatar), 24 px di totem 24 inci (tegak). Di layar tegak, papan nama, wajah, dan isi ada di atas; tombol menu, bahasa, dan suara di bawah agar terjangkau.
- Papan nama digital memakai Aksara Bali di atas huruf Latin. Layar tunggu berdiri di antara dua belahan candi bentar dan bisa langsung dimulai dalam bahasa Indonesia atau Inggris. Ganti bahasa di tengah tugas tidak mengembalikan ke layar awal.
- Tiket, kartu tamu, slip rute, dan kenang-kenangan nama dicetak untuk kertas termal 80 mm (lebar cetak 72 mm).
- Pratinjau totem untuk demo di laptop: `/id/kiosk/kantor-layanan/preview`. Di HP yang tegak, pratinjau langsung membuka layar kios.

## Catatan konten

- Company profile memakai tema `company.css`: putih dan petrol (#12343b) dengan cyan (#1fb0cf) hanya untuk aksen kecil, font Hubot Sans untuk judul dan Mona Sans untuk teks. Logonya huruf T dari jalur PCB yang berbelok 45° dan berakhir di via. Foto hero adalah papan kendali SMP v1 dengan keterangan bagian; koordinatnya ada di `apps/web/src/components/home/board-figure.tsx`.
- Situs edukasi sengaja tanpa unsur Bali (pasarnya nasional): tema `edu.css`, font Archivo dan Atkinson Hyperlegible, simulator ikut tema yang sama.
- Kit diberi nama per jenjang dan versi (`SD v1`, `SMP v1`, `SMA v1`). Upgrade pack dan aksesori ditandai "Segera" sampai siap dijual.
- Materi publik hanya memakai label Taksu Tech, tanpa nama OEM.
- Halaman Karya (`/works`) hanya memuat produk buatan sendiri, datanya di `packages/content/src/works.ts`. Tangkapan layar di `apps/web/src/assets/works` diambil dari demo yang sedang berjalan.
- Persentase TKDN Taksu Kiosk tidak diklaim sebelum ada sertifikat; situs menulis "disiapkan untuk sertifikasi TKDN".
- Aksara Bali dihasilkan otomatis. Papan nama resmi tetap ditinjau penyuluh Bahasa Bali.
- Spesifikasi kit SD dan SMP mengikuti dokumen konsep (tahap validasi prototipe). Gambar produk adalah render konsep milik Taksu Tech.
- `piper-tts` 1.3 berlisensi GPL-3.0 dan berjalan sebagai layanan terpisah. Periksa lisensi tiap suara Piper di model card-nya sebelum dipakai komersial.
