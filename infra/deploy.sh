#!/usr/bin/env bash
# Build and (re)start ULIK, then smoke-test it through Caddy.
#   infra/deploy.sh                 # uses infra/.env
#   ENV_FILE=~/web/ulik.env infra/deploy.sh
# shellcheck source=infra/scripts/common.sh
source "$(dirname "$0")/scripts/common.sh"

require docker
require curl
load_env
[[ -n "${WHATSAPP_NUMBER:-}" ]] || warn "WHATSAPP_NUMBER is empty: orders and questions go by email only."

# The port must be free, or already held by our own Caddy container.
if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$CADDY_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  if ! docker ps --filter "name=ulik-caddy" --filter "publish=$CADDY_PORT" --format '{{.Names}}' | grep -q caddy; then
    die "Port $CADDY_PORT is used by another process. Pick another CADDY_PORT."
  fi
fi

log "Building images and starting containers"
compose up -d --build --remove-orphans
# Caddy keeps running across deploys, so load the current Caddyfile explicitly.
compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null ||
  die "Caddy rejected infra/caddy/Caddyfile"

probe() {
  local host="$1" path="$2"
  for _ in $(seq 1 40); do
    if curl -fsS -o /dev/null -H "Host: $host" "http://127.0.0.1:$CADDY_PORT$path"; then
      ok "$host$path"
      return 0
    fi
    sleep 3
  done
  die "$host$path did not answer through Caddy"
}

probe "$WEB_HOST" /id
probe "$WEB_HOST" /en/robot/ciko
probe "$WEB_HOST" /id/aksesori
probe "$WEB_HOST" /id/belajar/ciko
probe "$WEB_HOST" /id/bisnis
probe "$WEB_HOST" /id/keranjang
probe "$WEB_HOST" /sitemap.xml
probe "$SIM_HOST" /id
probe "$SIM_HOST" /en

docker image prune -f >/dev/null
compose ps
ok "Deployed. Point cloudflared at http://127.0.0.1:$CADDY_PORT (infra/scripts/cloudflare-ingress.sh)."
