import io
import shutil
import wave

import pytest

from app.engines import SAMPLE_RATE, decode_audio

pytestmark = pytest.mark.skipif(shutil.which("ffmpeg") is None, reason="ffmpeg not installed")


def wav_bytes(seconds: float = 0.5, rate: int = 22050) -> bytes:
    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(rate)
        wav_file.writeframes(b"\x00\x10" * int(seconds * rate))
    return buffer.getvalue()


def test_resamples_to_16k_mono_float():
    samples = decode_audio(wav_bytes(0.5))
    assert samples.dtype.name == "float32"
    assert abs(len(samples) - SAMPLE_RATE // 2) < 200


def test_rejects_garbage():
    with pytest.raises(ValueError):
        decode_audio(b"not audio at all")
