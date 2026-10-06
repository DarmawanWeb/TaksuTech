"""Model wrappers. Heavy libraries are imported lazily so tests run without them."""

from __future__ import annotations

import io
import logging
import threading
import urllib.request
import wave
from pathlib import Path
from typing import Protocol

from .settings import Settings

log = logging.getLogger("taksu.speech")

VOICE_URL = "https://huggingface.co/rhasspy/piper-voices/resolve/main/{family}/{code}/{name}/{quality}/{voice}{suffix}"


class SpeechToText(Protocol):
    @property
    def ready(self) -> bool: ...

    def load(self) -> None: ...

    def transcribe(self, audio: bytes, language: str) -> str: ...


class TextToSpeech(Protocol):
    def has_voice(self, language: str) -> bool: ...

    def load(self) -> None: ...

    def synthesize(self, text: str, language: str) -> bytes: ...


class WhisperEngine:
    """faster-whisper on CPU with int8 weights: fast enough for short kiosk questions."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._model = None
        self._lock = threading.Lock()

    @property
    def ready(self) -> bool:
        return self._model is not None

    def load(self) -> None:
        from faster_whisper import WhisperModel

        self._model = WhisperModel(
            self._settings.whisper_model,
            device="cpu",
            compute_type=self._settings.whisper_compute,
            cpu_threads=self._settings.cpu_threads,
            download_root=str(self._settings.models_dir / "whisper"),
        )
        log.info("whisper model %s ready", self._settings.whisper_model)

    def transcribe(self, audio: bytes, language: str) -> str:
        if self._model is None:
            raise RuntimeError("whisper model is not loaded")
        with self._lock:
            segments, _info = self._model.transcribe(
                io.BytesIO(audio),
                language=language,
                beam_size=1,
                vad_filter=True,
                condition_on_previous_text=False,
            )
            return " ".join(segment.text.strip() for segment in segments).strip()


def voice_files(voice: str) -> tuple[str, str]:
    """Download URLs for a Piper voice id such as ``id_ID-news_tts-medium``."""
    code, name, quality = voice.split("-", 2)
    family = code.split("_", 1)[0]
    base = dict(family=family, code=code, name=name, quality=quality, voice=voice)
    return VOICE_URL.format(suffix=".onnx", **base), VOICE_URL.format(suffix=".onnx.json", **base)


class PiperEngine:
    """Piper voices, downloaded once into the models volume."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._voices: dict[str, object] = {}
        self._lock = threading.Lock()

    def has_voice(self, language: str) -> bool:
        return language in self._voices

    def _ensure(self, voice: str) -> Path:
        folder = self._settings.models_dir / "piper"
        folder.mkdir(parents=True, exist_ok=True)
        model_url, config_url = voice_files(voice)
        model = folder / f"{voice}.onnx"
        for url, target in ((model_url, model), (config_url, folder / f"{voice}.onnx.json")):
            if not target.exists():
                log.info("downloading %s", url)
                partial = target.with_suffix(target.suffix + ".part")
                urllib.request.urlretrieve(url, partial)
                partial.rename(target)
        return model

    def load(self) -> None:
        from piper import PiperVoice

        for language, voice in self._settings.voices.items():
            if not voice:
                continue
            try:
                self._voices[language] = PiperVoice.load(str(self._ensure(voice)))
                log.info("piper voice %s ready for %s", voice, language)
            except Exception:  # noqa: BLE001 - one missing voice must not stop the other
                log.exception("piper voice %s unavailable", voice)

    def synthesize(self, text: str, language: str) -> bytes:
        voice = self._voices[language]
        buffer = io.BytesIO()
        with self._lock, wave.open(buffer, "wb") as wav_file:
            if hasattr(voice, "synthesize_wav"):  # piper-tts >= 1.3
                voice.synthesize_wav(text, wav_file)
            else:  # piper-tts 1.2
                voice.synthesize(text, wav_file)
        return buffer.getvalue()
