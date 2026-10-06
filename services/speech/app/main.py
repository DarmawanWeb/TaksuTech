from __future__ import annotations

import logging
import threading
from contextlib import asynccontextmanager
from typing import Literal

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import Response
from pydantic import BaseModel, Field

from .engines import PiperEngine, SpeechToText, TextToSpeech, WhisperEngine
from .settings import Settings

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
log = logging.getLogger("taksu.speech")

Language = Literal["id", "en"]


class TtsRequest(BaseModel):
    text: str = Field(min_length=1, max_length=500)
    language: Language = "id"


def create_app(
    settings: Settings | None = None,
    stt: SpeechToText | None = None,
    tts: TextToSpeech | None = None,
) -> FastAPI:
    settings = settings or Settings.from_env()
    stt = stt or WhisperEngine(settings)
    tts = tts or PiperEngine(settings)

    def preload() -> None:
        for name, engine in (("stt", stt), ("tts", tts)):
            try:
                engine.load()
            except Exception:  # noqa: BLE001 - health reports what is missing
                log.exception("%s failed to load", name)

    @asynccontextmanager
    async def lifespan(_app: FastAPI):
        if settings.preload:
            # Models download on first start; serve /health meanwhile so Docker sees the container alive.
            threading.Thread(target=preload, name="preload", daemon=True).start()
        yield

    app = FastAPI(title="Taksu speech", version="1.0.0", docs_url=None, redoc_url=None, lifespan=lifespan)

    @app.get("/health")
    def health() -> dict:
        return {"stt": stt.ready, "tts": {"id": tts.has_voice("id"), "en": tts.has_voice("en")}}

    @app.post("/stt")
    async def speech_to_text(file: UploadFile = File(...), language: str = Form("id")) -> dict:
        if language not in ("id", "en"):
            raise HTTPException(status_code=400, detail="unsupported_language")
        audio = await file.read()
        if not audio:
            raise HTTPException(status_code=400, detail="empty_audio")
        if len(audio) > settings.max_audio_bytes:
            raise HTTPException(status_code=413, detail="audio_too_large")
        if not stt.ready:
            raise HTTPException(status_code=503, detail="stt_loading")
        try:
            text = await run_in_threadpool(stt.transcribe, audio, language)
        except Exception as error:  # noqa: BLE001 - undecodable audio and the like
            log.warning("transcription failed: %s", error)
            raise HTTPException(status_code=422, detail="unreadable_audio") from error
        return {"text": text, "language": language}

    @app.post("/tts")
    async def text_to_speech(request: TtsRequest) -> Response:
        if not tts.has_voice(request.language):
            raise HTTPException(status_code=503, detail="voice_unavailable")
        wav = await run_in_threadpool(tts.synthesize, request.text, request.language)
        return Response(content=wav, media_type="audio/wav", headers={"cache-control": "public, max-age=86400"})

    return app


app = create_app()
