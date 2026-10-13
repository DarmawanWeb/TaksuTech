#!/usr/bin/env bash
# Put a Lab backup back in place. Replaces the current Lab data.
#   infra/scripts/lab-restore.sh backups/lab-2026-10-13-0900.tgz
# shellcheck source=infra/scripts/common.sh
source "$(dirname "$0")/common.sh"

require docker
load_env
archive="${1:-}"
[[ -f "$archive" ]] || die "Usage: infra/scripts/lab-restore.sh <backup.tgz>"
archive="$(cd "$(dirname "$archive")" && pwd)/$(basename "$archive")"

read -r -p "This replaces every Lab post and photo with the backup. Type RESTORE to go on: " answer
[[ "$answer" == "RESTORE" ]] || die "Nothing changed."

log "Stopping the edu site"
compose stop edu
log "Unpacking $(basename "$archive") into the edu_lab volume"
docker run --rm -v taksu_edu_lab:/data -v "$archive:/backup.tgz:ro" alpine:3.22 sh -c '
  set -e
  mkdir -p /data/lab && cd /data/lab
  rm -rf lab.db lab.db-wal lab.db-shm media backup.db
  tar -xzf /backup.tgz
  mv backup.db lab.db
  chown -R 1001:1001 /data
'
log "Starting the edu site"
compose start edu
ok "Lab restored from $(basename "$archive")"
