#!/usr/bin/env bash
# Switches `current` back to an earlier release and reloads PM2.
# Usage: deploy/macmini/rollback.sh [release-folder-name]
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"
require pm2 "Pasang PM2: npm install -g pm2"
load_env

active="$(basename "$(readlink "$TAKSU_HOME/current")")"
target="${1:-}"
if [ -z "$target" ]; then
  # Folders sort chronologically; pick the newest one older than the active release.
  for dir in "$TAKSU_HOME"/releases/*/; do
    name="$(basename "$dir")"
    [ "$name" = "$active" ] && break
    target="$name"
  done
fi
if [ -z "$target" ] || [ ! -d "$TAKSU_HOME/releases/$target" ]; then
  die "Release tujuan tidak ditemukan. Pilihan: $(cd "$TAKSU_HOME/releases" && printf '%s ' */)"
fi

ln -sfn "$TAKSU_HOME/releases/$target" "$TAKSU_HOME/current"
RUNNER_TRACKING_ID="" pm2 startOrReload "$SCRIPT_DIR/ecosystem.config.cjs" --update-env
pm2 save >/dev/null
ok "Rollback dari $active ke $target"
