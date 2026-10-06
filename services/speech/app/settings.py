from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    models_dir: Path = Path("/models")
    whisper_model: str = "small"
    whisper_compute: str = "int8"
    cpu_threads: int = 4
    # Piper voice ids, e.g. "id_ID-news_tts-medium". Empty disables that language.
    voices: dict[str, str] = field(default_factory=lambda: {"id": "id_ID-news_tts-medium", "en": "en_US-lessac-medium"})
    max_audio_bytes: int = 4 * 1024 * 1024
    preload: bool = True

    @classmethod
    def from_env(cls) -> "Settings":
        env = os.environ
        return cls(
            models_dir=Path(env.get("SPEECH_MODELS_DIR", "/models")),
            whisper_model=env.get("WHISPER_MODEL", "small"),
            whisper_compute=env.get("WHISPER_COMPUTE", "int8"),
            cpu_threads=int(env.get("WHISPER_CPU_THREADS", "4")),
            voices={
                "id": env.get("PIPER_VOICE_ID", "id_ID-news_tts-medium"),
                "en": env.get("PIPER_VOICE_EN", "en_US-lessac-medium"),
            },
            max_audio_bytes=int(env.get("MAX_AUDIO_BYTES", str(4 * 1024 * 1024))),
            preload=env.get("SPEECH_PRELOAD", "1") != "0",
        )
