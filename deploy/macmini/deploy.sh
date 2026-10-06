#!/usr/bin/env bash
# Builds the three apps and releases them to PM2 on the Mac mini.
# Usage: deploy/macmini/deploy.sh   (run from any directory)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$SCRIPT_DIR/../.." && pwd)"
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

APPS="web kiosk playground"
KEEP_RELEASES="${KEEP_RELEASES:-3}"

require node "Pasang Node 22: brew install node@22"
require pm2 "Pasang PM2: npm install -g pm2"
require rsync ""
require lsof ""
load_env

node_major="$(node -p 'process.versions.node.split(".")[0]')"
[ "$node_major" -ge 20 ] || die "Next.js 16 butuh Node 20.9 atau lebih baru (sekarang $(node -v))."

# A port is fine if it is free or already served by our own PM2 process.
check_port() {
  port="$1"
  name="$2"
  pid="$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null | head -n 1 || true)"
  [ -n "$pid" ] || return 0
  owner="$(pm2 pid "$name" 2>/dev/null | tr -d '[:space:]' || true)"
  [ "$pid" = "$owner" ] && return 0
  die "Port $port dipakai proses lain: $(ps -o pid=,command= -p "$pid"). Ganti ${name#taksu-} port di $ENV_FILE."
}
check_port "$WEB_PORT" taksu-web
check_port "$KIOSK_PORT" taksu-kiosk
check_port "$PLAYGROUND_PORT" taksu-playground
ok "Port $WEB_PORT, $KIOSK_PORT, $PLAYGROUND_PORT siap"

log "Install dependency"
cd "$REPO" || exit 1
corepack enable >/dev/null 2>&1 || true
HUSKY=0 pnpm install --frozen-lockfile

log "Build produksi (URL publik: $NEXT_PUBLIC_SITE_URL)"
NEXT_TELEMETRY_DISABLED=1 TURBO_TELEMETRY_DISABLED=1 pnpm turbo run build \
  --filter=@taksu/web --filter=@taksu/kiosk --filter=@taksu/playground

sha="${GITHUB_SHA:-$(git -C "$REPO" rev-parse HEAD 2>/dev/null || echo manual)}"
release="$TAKSU_HOME/releases/$(date +%Y%m%d-%H%M%S)-$(printf '%s' "$sha" | cut -c1-7)"
mkdir -p "$release" "$TAKSU_HOME/logs"
for app in $APPS; do
  src="$REPO/apps/$app"
  [ -f "$src/.next/standalone/apps/$app/server.js" ] || die "Build $app tidak menghasilkan server standalone."
  rsync -a "$src/.next/standalone/" "$release/$app/"
  rsync -a "$src/.next/static/" "$release/$app/apps/$app/.next/static/"
  rsync -a "$src/public/" "$release/$app/apps/$app/public/"
done
ln -sfn "$release" "$TAKSU_HOME/current"
ok "Release aktif: $release"

log "Start atau reload PM2"
# An empty RUNNER_TRACKING_ID keeps a freshly started PM2 daemon alive after a CI job ends.
RUNNER_TRACKING_ID="" pm2 startOrReload "$SCRIPT_DIR/ecosystem.config.cjs" --update-env
pm2 save >/dev/null

wait_for() {
  label="$1"
  url="$2"
  for _ in $(seq 1 30); do
    if curl -fsS -o /dev/null "$url"; then
      ok "$label merespons ($url)"
      return 0
    fi
    sleep 1
  done
  die "$label tidak merespons di $url. Cek: pm2 logs taksu-$label"
}
wait_for web "http://127.0.0.1:$WEB_PORT/id"
wait_for kiosk "http://127.0.0.1:$KIOSK_PORT/id"
wait_for playground "http://127.0.0.1:$PLAYGROUND_PORT/id"

answer="$(curl -fsS -X POST "http://127.0.0.1:$KIOSK_PORT/api/assistant" \
  -H 'content-type: application/json' \
  -d '{"robot":"timo","site":"kantor-layanan","locale":"id","messages":[{"role":"user","content":"Jam berapa kantor ini buka?"}]}' || true)"
case "$answer" in
  *'"source":"model"'*) ok "Asisten AI menjawab dari model lokal" ;;
  *'"source":"offline"'*) warn "Asisten menjawab offline. Cek Ollama: deploy/macmini/ollama/setup.sh" ;;
  *) warn "Asisten tidak merespons: $answer" ;;
esac

log "Menyimpan $KEEP_RELEASES release terakhir"
# Release folders start with a timestamp, so the glob's lexical order is chronological.
set -- "$TAKSU_HOME"/releases/*/
excess=$(($# - KEEP_RELEASES))
for old in "$@"; do
  [ "$excess" -gt 0 ] || break
  rm -rf "$old"
  excess=$((excess - 1))
done
ok "Deploy selesai: https://$WEB_HOSTNAME  https://$KIOSK_HOSTNAME  https://$PLAYGROUND_HOSTNAME"
