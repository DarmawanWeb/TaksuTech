#!/usr/bin/env bash
# Creates the local "taksu-asisten" model from the Modelfile and checks that it answers.
# Usage: deploy/macmini/ollama/setup.sh          (BASE_MODEL=qwen2.5:7b to try another base)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../common.sh
. "$SCRIPT_DIR/../common.sh"

BASE_MODEL="${BASE_MODEL:-gemma3:4b}"
MODEL_NAME="${MODEL_NAME:-taksu-asisten}"
OLLAMA_URL="${OLLAMA_URL:-http://127.0.0.1:11434}"

require ollama "Unduh dari https://ollama.com/download"
version="$(curl -fsS "$OLLAMA_URL/api/version" 2>/dev/null || true)"
[ -n "$version" ] || die "Ollama tidak merespons di $OLLAMA_URL. Buka aplikasi Ollama, atau: brew services start ollama"
ok "Ollama aktif $version"

log "Mengunduh base model $BASE_MODEL"
ollama pull "$BASE_MODEL"

modelfile="$(mktemp)"
trap 'rm -f "$modelfile"' EXIT
sed "s|^FROM .*|FROM $BASE_MODEL|" "$SCRIPT_DIR/Modelfile" >"$modelfile"
log "Membuat model $MODEL_NAME"
ollama create "$MODEL_NAME" -f "$modelfile"

log "Uji jawaban (pertama kali butuh beberapa detik untuk memuat model)"
reply="$(curl -fsS "$OLLAMA_URL/api/chat" -H 'content-type: application/json' \
  -d "{\"model\":\"$MODEL_NAME\",\"stream\":false,\"keep_alive\":\"30m\",\"messages\":[{\"role\":\"user\",\"content\":\"Halo, kamu siapa?\"}]}")"
printf '%s\n' "$reply" | sed -n 's/.*"content":"\([^"]*\)".*/  \1/p'
ok "Model $MODEL_NAME siap. Pastikan AI_PROVIDER=ollama dan AI_MODEL=$MODEL_NAME di $ENV_FILE"
