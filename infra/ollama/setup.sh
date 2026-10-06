#!/usr/bin/env bash
# Creates the taksu-asisten model in the Ollama that already runs natively on the Mac mini.
#   BASE_MODEL=qwen2.5:7b infra/ollama/setup.sh   # optional larger base
set -euo pipefail
command -v ollama >/dev/null || { echo "ollama is not installed" >&2; exit 1; }
here="$(cd "$(dirname "$0")" && pwd)"
base="${BASE_MODEL:-gemma3:4b}"
model="${MODEL_NAME:-taksu-asisten}"

ollama pull "$base"
sed "s|^FROM .*|FROM $base|" "$here/Modelfile" >"$here/.Modelfile.tmp"
ollama create "$model" -f "$here/.Modelfile.tmp"
rm -f "$here/.Modelfile.tmp"
echo "Test:"
ollama run "$model" "Om Swastiastu, di mana loket layanan KTP?" --keepalive 30m
