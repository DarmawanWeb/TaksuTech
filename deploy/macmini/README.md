# Deploy ke Mac mini (PM2 + Cloudflare Tunnel + Ollama)

Panduan ini menaruh ketiga app Taksu Tech di Mac mini yang sudah menjalankan cloudflared dan Ollama, mengikuti pola server yang sudah ada: app Node lewat PM2 langsung di host, satu Cloudflare Tunnel untuk semua hostname, dan **tidak memakai port 80**.

```
Internet ── Cloudflare (DNS, TLS, WAF) ── cloudflared di Mac mini
  taksu.<domain>          -> 127.0.0.1:4300  PM2 taksu-web
  taksu-kiosk.<domain>    -> 127.0.0.1:4301  PM2 taksu-kiosk ──> Ollama 127.0.0.1:11434 (taksu-asisten)
  taksu-belajar.<domain>  -> 127.0.0.1:4302  PM2 taksu-playground
```

Semua server hanya listen di `127.0.0.1`, jadi tidak terbuka ke LAN. Ollama juga tetap di localhost dan tidak pernah dipasang di tunnel.

## Struktur di Mac mini

```
~/apps/taksu-tech/
├── source/                # kode (git clone, atau hasil sync dari GitHub runner)
├── shared/.env.production # konfigurasi produksi, di luar git
├── releases/<waktu>-<sha>/{web,kiosk,playground}/   # 3 release terakhir
├── current -> releases/...                           # release aktif, dibaca PM2
└── logs/                  # log PM2 per app (bisa di-scrape Promtail)
```

Build terjadi di `source/`, sedangkan PM2 berjalan dari `current`. Selama build, situs tetap online, dan rollback cukup memindahkan symlink.

## 1. Cek prasyarat

```bash
node -v            # 22.x disarankan (minimal 20.9)
pm2 -v
ollama --version
cloudflared --version
lsof -nP -iTCP:4300-4302 -sTCP:LISTEN   # harus kosong
```

Port 4300 sampai 4302 dipilih supaya tidak bentrok dengan Grafana (3000), Loki (3100), Prometheus (9090), node-exporter (9100), cAdvisor (8080), dan TimescaleDB (5432). Kalau ada yang terpakai, ganti di file env. Skrip deploy menolak port 80 dan port yang dipakai proses lain.

## 2. Ambil kode dan siapkan env

```bash
mkdir -p ~/apps/taksu-tech/shared
git clone git@github.com:DarmawanRobotics/taksu-tech.git ~/apps/taksu-tech/source
cp ~/apps/taksu-tech/source/deploy/macmini/env.production.example ~/apps/taksu-tech/shared/.env.production
nano ~/apps/taksu-tech/shared/.env.production   # ganti example.com dengan domain Anda
```

Pakai subdomain satu tingkat (`taksu-kiosk.domain.com`, bukan `kiosk.taksu.domain.com`), karena Universal SSL Cloudflare hanya mencakup `*.domain.com`.

## 3. Siapkan AI lokal (taksu-asisten)

```bash
~/apps/taksu-tech/source/deploy/macmini/ollama/setup.sh
```

Skrip ini menarik base model `gemma3:4b` (sekitar 3,3 GB), lalu membuat model sendiri bernama **`taksu-asisten`** dari `ollama/Modelfile`. Model ini punya persona resepsionis Bali, jawaban maksimal tiga kalimat tanpa markdown (karena dibacakan TTS), temperature rendah, dan konteks 4096. Setelah itu skrip langsung menguji jawabannya. Fakta tempat (jam layanan, ruangan, antrean, struktur organisasi) dikirim kiosk sebagai system prompt di setiap pertanyaan, jadi model tidak mengarang.

Catatan untuk RAM 16 GB:

- `AI_KEEP_ALIVE=30m` menahan model di memori 30 menit setelah pertanyaan terakhir. Gunakan `24h` saat pameran supaya tidak ada jeda memuat, atau `5m` kalau RAM sedang dibutuhkan Docker.
- `AI_MAX_CONCURRENCY=2`: kalau sedang ada dua pertanyaan diproses, tamu berikutnya langsung dijawab mode offline (dari FAQ) alih-alih menunggu.
- Jangan pakai model 12B ke atas di mesin ini selama TimescaleDB dan stack monitoring juga berjalan.
- Mau mencoba base lain: `BASE_MODEL=qwen2.5:7b ~/apps/taksu-tech/source/deploy/macmini/ollama/setup.sh`. Model yang mengeluarkan blok `<think>` tetap aman, karena blok itu dibuang sebelum dibacakan.

## 4. Deploy pertama

```bash
~/apps/taksu-tech/source/deploy/macmini/deploy.sh
```

Urutan kerjanya:

1. Cek port.
2. `pnpm install`.
3. Build ketiga app dengan URL publik dari env.
4. Rakit release standalone.
5. Arahkan `current`.
6. `pm2 startOrReload` dan `pm2 save`.
7. Health check ketiga app dan satu pertanyaan ke asisten AI. Hasil yang diharapkan: `OK Asisten AI menjawab dari model lokal`.

Kalau PM2 belum diset untuk hidup lagi setelah restart Mac, jalankan sekali:

```bash
pm2 startup   # jalankan perintah sudo yang dicetak
pm2 save
```

## 5. Tambahkan hostname ke Cloudflare Tunnel

### Tunnel dengan config.yml lokal (`~/apps/cloudflared/config.yml`)

```bash
~/apps/taksu-tech/source/deploy/macmini/cloudflare-ingress.sh
```

Skrip ini melakukan:

1. Backup `config.yml`.
2. Menyisipkan tiga aturan ingress tepat sebelum catch-all `http_status:404`.
3. Menjalankan `cloudflared tunnel ingress validate`. Kalau tidak valid, config dikembalikan otomatis.
4. Membuat CNAME lewat `cloudflared tunnel route dns`.
5. Me-restart cloudflared, dengan deteksi otomatis apakah ia berjalan lewat PM2, launchd, atau brew services.

Kalau proses PM2-nya bernama lain, jalankan dengan `CLOUDFLARED_PM2_NAME=nama`. Kalau lokasi config-nya lain, pakai `CLOUDFLARED_CONFIG=/path/config.yml`.

Hasil yang ditambahkan ke config:

```yaml
- hostname: taksu.example.com
  service: http://127.0.0.1:4300
- hostname: taksu-kiosk.example.com
  service: http://127.0.0.1:4301
- hostname: taksu-belajar.example.com
  service: http://127.0.0.1:4302
- service: http_status:404
```

Selalu pakai `127.0.0.1`, bukan `localhost`. Di macOS, `localhost` bisa resolve ke `::1`, padahal app hanya listen di IPv4.

### Tunnel yang dikelola dari dashboard (jalan dengan `--token`)

Di Zero Trust buka Networks, lalu Tunnels, pilih tunnel Anda, lalu Public Hostname, dan tambahkan:

| Subdomain       | Service                 |
| --------------- | ----------------------- |
| `taksu`         | `HTTP` `127.0.0.1:4300` |
| `taksu-kiosk`   | `HTTP` `127.0.0.1:4301` |
| `taksu-belajar` | `HTTP` `127.0.0.1:4302` |

Tidak perlu restart. Perubahan langsung terkirim ke cloudflared.

## 6. Verifikasi

```bash
curl -sI https://taksu.example.com | head -n 1           # HTTP/2 307 (redirect ke /id)
curl -s -X POST https://taksu-kiosk.example.com/api/assistant \
  -H 'content-type: application/json' \
  -d '{"robot":"snow","site":"resort","locale":"en","messages":[{"role":"user","content":"When is breakfast?"}]}'
pm2 ls
```

Respons asisten harus berisi `"source":"model"`.

## 7. Auto-deploy dengan self-hosted runner

`.github/workflows/deploy-macmini.yml` berjalan setelah workflow CI di `main` sukses (atau lewat tombol Run workflow). Runner-nya adalah runner org yang sudah terpasang di Mac mini (label `self-hosted`, `macOS`, `ARM64`). Workflow ini:

1. Sync kode ke `~/apps/taksu-tech/source`. `node_modules`, `.next`, dan cache Turbo dipertahankan supaya build berikutnya cepat.
2. Menjalankan `deploy.sh`.

Supaya runner org bisa dipakai, repo harus berada di organisasi yang sama dengan runner, misalnya `DarmawanRobotics/taksu-tech`. Kalau `TAKSU_HOME` berbeda dari default, isi repository variable `TAKSU_HOME`.

## Operasional

| Kebutuhan        | Perintah                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lihat log        | `pm2 logs taksu-kiosk` atau `tail -f ~/apps/taksu-tech/logs/kiosk.err.log`                                                                                               |
| Restart satu app | `pm2 restart taksu-web`                                                                                                                                                  |
| Update manual    | `cd ~/apps/taksu-tech/source && git pull && deploy/macmini/deploy.sh`                                                                                                    |
| Rollback         | `~/apps/taksu-tech/source/deploy/macmini/rollback.sh` (atau sebut nama folder release)                                                                                   |
| Ganti setelan AI | Edit `.env.production`, lalu jalankan `deploy.sh` lagi (atau `pm2 reload taksu-kiosk --update-env` setelah `set -a; . ~/apps/taksu-tech/shared/.env.production; set +a`) |
| Perbarui model   | Edit `ollama/Modelfile`, lalu jalankan `ollama/setup.sh` lagi                                                                                                            |

Untuk Promtail atau Loki, tambahkan path `~/apps/taksu-tech/logs/*.log` dengan label `app=taksu`.

## Keamanan

- App dan Ollama hanya di `127.0.0.1`. Satu-satunya pintu masuk adalah tunnel.
- `/api/assistant` dibatasi 12 pertanyaan per IP per menit (`ASSISTANT_RATE_LIMIT`), memakai header `CF-Connecting-IP`. Untuk lapisan tambahan, buat aturan Rate limiting di Cloudflare WAF untuk path `/api/assistant`.
- Kalau demo kiosk hanya untuk klien tertentu, lindungi `taksu-kiosk.<domain>` dengan Cloudflare Access seperti Grafana.

## Troubleshooting

| Gejala                                        | Penyebab dan solusi                                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `GAGAL Port 4301 dipakai proses lain`         | Ubah `KIOSK_PORT` di env, lalu sesuaikan ingress tunnel.                                                   |
| Asisten selalu `offline`                      | Ollama mati atau model belum dibuat. Cek `curl 127.0.0.1:11434/api/tags`, lalu jalankan `ollama/setup.sh`. |
| Jawaban pertama lambat                        | Model sedang dimuat. Naikkan `AI_KEEP_ALIVE`.                                                              |
| 502 atau `Unable to reach the origin service` | App belum jalan, atau ingress memakai `localhost`. Cek `pm2 ls` dan ganti ke `127.0.0.1`.                  |
| Error SSL pada subdomain dua tingkat          | Pakai subdomain satu tingkat, atau aktifkan Advanced Certificate.                                          |
| Job runner selesai lalu app ikut mati         | Pastikan `RUNNER_TRACKING_ID=""` (sudah diset di workflow dan di `deploy.sh`).                             |
