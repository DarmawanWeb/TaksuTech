#!/usr/bin/env bash
# Adds the three Taksu hostnames to the existing, locally managed Cloudflare Tunnel:
# backs up config.yml, inserts rules before the catch-all, validates, routes DNS, restarts.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

CONFIG="${CLOUDFLARED_CONFIG:-$HOME/apps/cloudflared/config.yml}"
require cloudflared "Pasang: brew install cloudflared"
load_env

[ -f "$CONFIG" ] || die "Config tidak ditemukan: $CONFIG. Set CLOUDFLARED_CONFIG=/path/ke/config.yml"
tunnel="$(awk '/^tunnel:/ { print $2; exit }' "$CONFIG")"
[ -n "$tunnel" ] || die "Tidak ada baris 'tunnel:' di $CONFIG. Kalau tunnel dikelola dari dashboard, ikuti bagian 'Tunnel dari dashboard' di deploy/macmini/README.md."
grep -Eq '^[[:space:]]*-[[:space:]]*service:[[:space:]]*http_status:404' "$CONFIG" ||
  die "Aturan catch-all '- service: http_status:404' tidak ada di $CONFIG."

rules="$(mktemp)"
trap 'rm -f "$rules"' EXIT
for entry in "$WEB_HOSTNAME $WEB_PORT" "$KIOSK_HOSTNAME $KIOSK_PORT" "$PLAYGROUND_HOSTNAME $PLAYGROUND_PORT"; do
  host="${entry% *}"
  if grep -Eq "hostname:[[:space:]]*$host([[:space:]]|\$)" "$CONFIG"; then
    warn "$host sudah ada di config, dilewati"
  else
    printf '%s\n' "$entry" >>"$rules"
  fi
done

if [ -s "$rules" ]; then
  backup="$CONFIG.bak.$(date +%Y%m%d-%H%M%S)"
  cp "$CONFIG" "$backup"
  awk -v rules="$rules" '
    !inserted && /^[[:space:]]*-[[:space:]]*service:[[:space:]]*http_status:404/ {
      match($0, /^[[:space:]]*/)
      indent = substr($0, 1, RLENGTH)
      while ((getline line < rules) > 0) {
        split(line, field, " ")
        print indent "- hostname: " field[1]
        print indent "  service: http://127.0.0.1:" field[2]
      }
      inserted = 1
    }
    { print }
  ' "$backup" >"$CONFIG"
  if ! cloudflared tunnel --config "$CONFIG" ingress validate; then
    cp "$backup" "$CONFIG"
    die "Config baru tidak valid, dikembalikan dari $backup"
  fi
  ok "Ingress ditambahkan (backup: $backup)"
fi

for host in "$WEB_HOSTNAME" "$KIOSK_HOSTNAME" "$PLAYGROUND_HOSTNAME"; do
  if cloudflared tunnel route dns "$tunnel" "$host" >/dev/null 2>&1; then
    ok "DNS $host -> tunnel $tunnel"
  else
    warn "Route DNS $host gagal atau sudah ada. Cek di dashboard Cloudflare (butuh ~/.cloudflared/cert.pem dari 'cloudflared tunnel login')."
  fi
done

restart_tunnel() {
  pm2_name="${CLOUDFLARED_PM2_NAME:-cloudflared}"
  if command -v pm2 >/dev/null 2>&1 && pm2 describe "$pm2_name" >/dev/null 2>&1; then
    pm2 restart "$pm2_name" && return 0
  fi
  if launchctl list 2>/dev/null | grep -q com.cloudflare.cloudflared; then
    launchctl kickstart -k "gui/$(id -u)/com.cloudflare.cloudflared" && return 0
  fi
  if sudo -n launchctl list 2>/dev/null | grep -q com.cloudflare.cloudflared; then
    sudo -n launchctl kickstart -k system/com.cloudflare.cloudflared && return 0
  fi
  if command -v brew >/dev/null 2>&1 && brew services list 2>/dev/null | grep -q '^cloudflared'; then
    brew services restart cloudflared && return 0
  fi
  return 1
}
if restart_tunnel; then
  ok "cloudflared di-restart"
else
  warn "Tidak bisa mendeteksi cara cloudflared berjalan. Restart manual agar config baru terbaca."
fi

for host in "$WEB_HOSTNAME" "$KIOSK_HOSTNAME" "$PLAYGROUND_HOSTNAME"; do
  cloudflared tunnel --config "$CONFIG" ingress rule "https://$host" | sed 's/^/  /'
done
ok "Selesai. Tunggu sebentar untuk DNS, lalu buka https://$WEB_HOSTNAME"
