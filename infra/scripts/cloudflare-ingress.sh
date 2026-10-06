#!/usr/bin/env bash
# Adds the Taksu hostnames to the existing cloudflared config, all pointing at Caddy.
# Caddy routes by Host, so cloudflared only ever needs one target.
# shellcheck source=infra/scripts/common.sh
source "$(dirname "$0")/common.sh"

require cloudflared
load_env
CONFIG="${CLOUDFLARED_CONFIG:-$HOME/apps/cloudflared/config.yml}"
[[ -f "$CONFIG" ]] || die "cloudflared config not found at $CONFIG (set CLOUDFLARED_CONFIG)"
[[ -n "${CLOUDFLARE_TUNNEL:-}" ]] || die "Set CLOUDFLARE_TUNNEL in $ENV_FILE"

target="http://127.0.0.1:$CADDY_PORT"
hosts=("$WEB_HOST" "$KIOSK_HOST" "$SIM_HOST")
[[ "${MONITORING:-1}" == "1" ]] && hosts+=("$GRAFANA_HOST")

backup="$CONFIG.bak.$(date +%Y%m%d%H%M%S)"
cp "$CONFIG" "$backup"
log "Backup: $backup"

for host in "${hosts[@]}"; do
  if grep -q "hostname: $host\$" "$CONFIG"; then
    warn "$host already present, leaving it as is"
    continue
  fi
  # Insert before the catch-all rule, which must stay last.
  awk -v host="$host" -v target="$target" '
    /^[[:space:]]*-[[:space:]]*service:[[:space:]]*http_status:404/ && !done {
      match($0, /^[[:space:]]*/); pad = substr($0, 1, RLENGTH)
      print pad "- hostname: " host
      print pad "  service: " target
      done = 1
    }
    { print }
  ' "$CONFIG" >"$CONFIG.tmp" && mv "$CONFIG.tmp" "$CONFIG"
  grep -q "hostname: $host\$" "$CONFIG" || die "Could not find the http_status:404 catch-all in $CONFIG"
  ok "Ingress for $host"
  cloudflared tunnel route dns "$CLOUDFLARE_TUNNEL" "$host" || warn "DNS route for $host may already exist"
done

cloudflared tunnel ingress validate --config "$CONFIG" || {
  cp "$backup" "$CONFIG"
  die "Invalid config; restored $backup"
}

if command -v pm2 >/dev/null 2>&1 && pm2 describe cloudflared >/dev/null 2>&1; then
  pm2 restart cloudflared
elif launchctl list 2>/dev/null | grep -q cloudflared; then
  sudo launchctl kickstart -k "system/$(launchctl list | awk '/cloudflared/ {print $3; exit}')" || warn "Restart cloudflared manually"
elif command -v brew >/dev/null 2>&1 && brew services list | grep -q cloudflared; then
  brew services restart cloudflared
else
  warn "Restart cloudflared yourself so it picks up the new hostnames."
fi
ok "Tunnel ready. Protect https://$GRAFANA_HOST with Cloudflare Access."
