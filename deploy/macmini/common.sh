# shellcheck shell=bash
# Shared helpers for the Mac mini scripts. Written for macOS /bin/bash 3.2.
set -euo pipefail

TAKSU_HOME="${TAKSU_HOME:-$HOME/apps/taksu-tech}"
ENV_FILE="${ENV_FILE:-$TAKSU_HOME/shared/.env.production}"
# Self-hosted runners and launchd jobs often start without Homebrew on PATH.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

log() { printf '\033[1;34m>\033[0m %s\n' "$*"; }
ok() { printf '\033[1;32mOK\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die() {
  printf '\033[1;31mGAGAL\033[0m %s\n' "$*" >&2
  exit 1
}

require() {
  command -v "$1" >/dev/null 2>&1 || die "Perintah '$1' tidak ditemukan. $2"
}

# Loads the production env file and derives the public URLs baked into the builds.
load_env() {
  [ -f "$ENV_FILE" ] || die "Env belum ada: $ENV_FILE. Salin deploy/macmini/env.production.example ke sana."
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a

  : "${WEB_HOSTNAME:?Isi WEB_HOSTNAME di $ENV_FILE}"
  : "${KIOSK_HOSTNAME:?Isi KIOSK_HOSTNAME di $ENV_FILE}"
  : "${PLAYGROUND_HOSTNAME:?Isi PLAYGROUND_HOSTNAME di $ENV_FILE}"
  WEB_PORT="${WEB_PORT:-4300}"
  KIOSK_PORT="${KIOSK_PORT:-4301}"
  PLAYGROUND_PORT="${PLAYGROUND_PORT:-4302}"

  for port in "$WEB_PORT" "$KIOSK_PORT" "$PLAYGROUND_PORT"; do
    [ "$port" != "80" ] || die "Port 80 sudah dipakai layanan lain. Pilih port lain di $ENV_FILE."
  done

  export WEB_PORT KIOSK_PORT PLAYGROUND_PORT TAKSU_HOME
  export NEXT_PUBLIC_SITE_URL="https://$WEB_HOSTNAME"
  export NEXT_PUBLIC_KIOSK_URL="https://$KIOSK_HOSTNAME"
  export NEXT_PUBLIC_PLAYGROUND_URL="https://$PLAYGROUND_HOSTNAME"
  export NEXT_PUBLIC_WHATSAPP_NUMBER="${WHATSAPP_NUMBER:-}"
}
