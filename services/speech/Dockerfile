# syntax=docker/dockerfile:1.7
# Speech service for the kiosk: Whisper STT + Piper TTS on CPU. Models download into /models.
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    SPEECH_MODELS_DIR=/models \
    HF_HOME=/models/hf

WORKDIR /srv
COPY requirements.txt .
RUN pip install --retries 10 --timeout 60 -r requirements.txt

COPY app ./app
RUN useradd --create-home --uid 10001 speech && mkdir -p /models && chown speech:speech /models
USER speech

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=3)"
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
