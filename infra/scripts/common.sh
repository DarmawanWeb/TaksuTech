#!/usr/bin/env bash
# Shared helpers for the Mac mini scripts.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT/infra/.env}"

log() { printf '\033[1;34m▸\033[0m %s\n' "$*"; }
ok() { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!\033[0m %s\n' "$*" >&2; }
die() {
  printf '\033[1;31m✗\033[0m %s\n' "$*" >&2
  exit 1
}
require() { command -v "$1" >/dev/null 2>&1 || die "$1 is required"; }

load_env() {
  [[ -f "$ENV_FILE" ]] || die "Missing $ENV_FILE. Copy infra/.env.example and fill it in."
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
  CADDY_PORT="${CADDY_PORT:-4480}"
  case "$CADDY_PORT" in
    80 | 8080) die "CADDY_PORT=$CADDY_PORT is reserved on this Mac mini (80 is taken, 8080 is cAdvisor)." ;;
  esac
}

compose() {
  local profiles=()
  [[ "${MONITORING:-1}" == "1" ]] && profiles=(--profile monitoring)
  docker compose --project-directory "$ROOT" --env-file "$ENV_FILE" "${profiles[@]}" "$@"
}
