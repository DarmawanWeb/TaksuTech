#!/usr/bin/env bash
# Back up the Lab (class builds, forum, and photos) from the running edu container.
#   infra/scripts/lab-backup.sh                      # writes backups/lab-YYYY-MM-DD-HHMM.tgz
#   BACKUP_DIR=~/backups infra/scripts/lab-backup.sh
# Restore with infra/scripts/lab-restore.sh <archive>.
# shellcheck source=infra/scripts/common.sh
source "$(dirname "$0")/common.sh"

require docker
load_env
BACKUP_DIR="${BACKUP_DIR:-$ROOT/backups}"
mkdir -p "$BACKUP_DIR"
archive="$BACKUP_DIR/lab-$(date +%Y-%m-%d-%H%M).tgz"

log "Taking a consistent copy of the Lab database"
# VACUUM INTO writes a clean, complete copy while the site keeps taking posts.
compose exec -T -e NODE_NO_WARNINGS=1 edu node -e "
const { rmSync } = require('node:fs');
const { DatabaseSync } = process.getBuiltinModule('node:sqlite');
rmSync('/data/lab/backup.db', { force: true });
const db = new DatabaseSync('/data/lab/lab.db');
db.exec(\"VACUUM INTO '/data/lab/backup.db'\");
db.close();
" || die "Could not copy the Lab database. Is the edu container running?"

log "Packing the copy and the photos"
compose exec -T edu sh -c 'cd /data/lab && tar -czf - backup.db $([ -d media ] && echo media)' >"$archive"
compose exec -T edu rm -f /data/lab/backup.db
ok "Lab backup: $archive ($(du -h "$archive" | cut -f1))"
