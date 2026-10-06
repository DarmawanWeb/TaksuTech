import io
import wave

import pytest
from fastapi.testclient import TestClient

from app.engines import voice_files
from app.main import create_app
from app.settings import Settings


class FakeStt:
    def __init__(self, ready=True):
        self.ready = ready
        self.calls = []

    def load(self):
        self.ready = True

    def transcribe(self, audio, language):
        self.calls.append((len(audio), language))
        return "di mana ruang rapat"


class FakeTts:
    def __init__(self, languages=("id",)):
        self.languages = set(languages)

    def has_voice(self, language):
        return language in self.languages

    def load(self):
        pass

    def synthesize(self, text, language):
        buffer = io.BytesIO()
        with wave.open(buffer, "wb") as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(22050)
            wav_file.writeframes(b"\x00\x00" * 220)
        return buffer.getvalue()


def client(stt=None, tts=None):
    settings = Settings(preload=False, max_audio_bytes=1024)
    return TestClient(create_app(settings, stt or FakeStt(), tts or FakeTts()))


def test_health_reports_each_language():
    assert client(tts=FakeTts(("id",))).get("/health").json() == {"stt": True, "tts": {"id": True, "en": False}}


def test_transcribes_uploaded_audio():
    stt = FakeStt()
    response = client(stt=stt).post("/stt", files={"file": ("speech", b"abc", "audio/webm")}, data={"language": "id"})
    assert response.status_code == 200
    assert response.json() == {"text": "di mana ruang rapat", "language": "id"}
    assert stt.calls == [(3, "id")]


@pytest.mark.parametrize(
    ("payload", "language", "status"),
    [(b"", "id", 400), (b"x" * 2048, "id", 413), (b"abc", "fr", 400)],
)
def test_rejects_bad_audio(payload, language, status):
    response = client().post("/stt", files={"file": ("speech", payload, "audio/webm")}, data={"language": language})
    assert response.status_code == status


def test_reports_loading_whisper():
    response = client(stt=FakeStt(ready=False)).post("/stt", files={"file": ("speech", b"abc", "audio/webm")})
    assert response.status_code == 503


def test_synthesizes_wav():
    response = client().post("/tts", json={"text": "Om Swastiastu", "language": "id"})
    assert response.status_code == 200
    assert response.headers["content-type"] == "audio/wav"
    assert response.content.startswith(b"RIFF")


def test_tts_validation_and_missing_voice():
    assert client().post("/tts", json={"text": "", "language": "id"}).status_code == 422
    assert client().post("/tts", json={"text": "Hello", "language": "en"}).status_code == 503


def test_piper_voice_urls():
    model, config = voice_files("id_ID-news_tts-medium")
    assert model == "https://huggingface.co/rhasspy/piper-voices/resolve/main/id/id_ID/news_tts/medium/id_ID-news_tts-medium.onnx"
    assert config.endswith("id_ID-news_tts-medium.onnx.json")
