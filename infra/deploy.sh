#!/usr/bin/env bash
# Build and (re)start the whole Taksu stack, then smoke-test it through Caddy.
#   infra/deploy.sh                 # uses infra/.env
#   ENV_FILE=~/web/taksu-tech.env infra/deploy.sh
# shellcheck source=infra/scripts/common.sh
source "$(dirname "$0")/scripts/common.sh"

require docker
require curl
require git
load_env
[[ "${MONITORING:-1}" != "1" || -n "${GRAFANA_ADMIN_PASSWORD:-}" ]] || die "Set GRAFANA_ADMIN_PASSWORD (or MONITORING=0)."

# Every commit here pins one commit of each app and of the speech service; build exactly those.
# A clone without --recursive, or a pull without --recurse-submodules, leaves them behind. The
# deploy workflow copies a full checkout over this folder without .git, so it is already in step.
# education-robot deploys itself (its own infra/deploy.sh), so it is left alone here.
apps=(apps/web apps/robot apps/kiosk services/speech)
if [[ -e "$ROOT/.git" ]] && git -C "$ROOT" submodule status -- "${apps[@]}" | grep -q '^[-+]'; then
  log "Checking out the pinned apps and speech service"
  git -C "$ROOT" submodule update --init -- "${apps[@]}"
fi

# The port must be free, or already held by our own Caddy container.
if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$CADDY_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  if ! docker ps --filter "name=taksu-caddy" --filter "publish=$CADDY_PORT" --format '{{.Names}}' | grep -q caddy; then
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
probe "$WEB_HOST" /en/about
probe "$WEB_HOST" /id/works
probe "$ROBOT_HOST" /id
probe "$ROBOT_HOST" /en/snow
probe "$KIOSK_HOST" /api/health
probe "$KIOSK_HOST" /id/kiosk/kantor-layanan/preview

# The old education hosts send visitors to the education-robot stack.
probe_redirect() {
  local host="$1" path="$2" target="$3" location
  location="$(curl -fsS -o /dev/null -w '%{redirect_url}' -H "Host: $host" "http://127.0.0.1:$CADDY_PORT$path")" ||
    die "$host$path did not answer through Caddy"
  [[ "$location" == "$target" ]] || die "$host$path redirects to '$location' instead of $target"
  ok "$host$path -> $target"
}
probe_redirect "$EDU_HOST" /id "https://$EDUCATION_HOST/id"
probe_redirect "$EDU_HOST" /en/kits/sd "https://$EDUCATION_HOST/en"
probe_redirect "$SIM_HOST" /id "https://$EDUCATION_SIM_HOST/id"

log "Assistant smoke test"
curl -fsS -H "Host: $KIOSK_HOST" -H 'content-type: application/json' \
  -d '{"robot":"kiosk","site":"kantor-layanan","locale":"id","messages":[{"role":"user","content":"Di mana ruang rapat?"}]}' \
  "http://127.0.0.1:$CADDY_PORT/api/assistant" | head -c 300 && echo
log "Speech status (models download on the first start, so false at first is normal)"
curl -fsS -H "Host: $KIOSK_HOST" "http://127.0.0.1:$CADDY_PORT/api/speech/health" && echo

docker image prune -f >/dev/null
compose ps
ok "Deployed. Point cloudflared at http://127.0.0.1:$CADDY_PORT (infra/scripts/cloudflare-ingress.sh)."
