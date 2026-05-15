
from app.config import Config
import app.utils.helpers as helpers


def medical_summarizer(request):
    """
    Accepts either:
      - JSON: {"text": "...", "params": {...optional overrides...}}
      - multipart/form-data: file=<PDF or TXT>, and optional form fields for params
    """
    # Parameter parsing helper
    def parse_params(source):
        def _parse_int(key, default):
            val = source.get(key, default)
            try:
                return int(val)
            except Exception:
                return default

        return {
            "max_input_tokens": _parse_int("max_input_tokens", Config.DEFAULT_MAX_INPUT_TOKENS),
            "summary_max_new_tokens": _parse_int("summary_max_new_tokens", Config.DEFAULT_SUMMARY_MAX_NEW_TOKENS),
            "summary_min_new_tokens": _parse_int("summary_min_new_tokens", Config.DEFAULT_SUMMARY_MIN_NEW_TOKENS),
        }

    text = None
    params = {}

    if request.content_type and "multipart/form-data" in request.content_type:
        # File upload flow
        file = request.files.get("file")
        if not file:
            return {"error": "No file provided. Use key 'file' in multipart/form-data."}

        filename = (file.filename or "").lower()
        data = file.read()

        if filename.endswith(".pdf"):
            text = helpers.extract_text_from_pdf(data)
        elif filename.endswith(".txt"):
            # Attempt utf-8; if fails, fallback latin-1
            try:
                text = data.decode("utf-8", errors="ignore")
            except Exception:
                text = data.decode("latin-1", errors="ignore")
        else:
            return {"error": "Unsupported file type. Please upload .pdf or .txt"}

        # Optional params via form fields
        params = parse_params(request.form)

    else:
        # JSON flow
        payload = request.get_json(silent=True) or {}
        text = payload.get("text")
        params = payload.get("params", {})
        # Allow flat overrides too
        params = {
            **{
                "max_input_tokens": payload.get("max_input_tokens", Config.DEFAULT_MAX_INPUT_TOKENS),
                "summary_max_new_tokens": payload.get("summary_max_new_tokens", Config.DEFAULT_SUMMARY_MAX_NEW_TOKENS),
                "summary_min_new_tokens": payload.get("summary_min_new_tokens", Config.DEFAULT_SUMMARY_MIN_NEW_TOKENS),
            },
            **params
        }

    if not text or not text.strip():
        return {"error": "No text content found to summarize."}

    try:
        summary = helpers.summarize_text(
            text=text,
            max_input_tokens=int(params.get("max_input_tokens", Config.DEFAULT_MAX_INPUT_TOKENS)),
            summary_max_new_tokens=int(params.get("summary_max_new_tokens", Config.DEFAULT_SUMMARY_MAX_NEW_TOKENS)),
            summary_min_new_tokens=int(params.get("summary_min_new_tokens", Config.DEFAULT_SUMMARY_MIN_NEW_TOKENS)),
        )
        return {
            "summary": summary,
            "meta": {
                "input_chars": len(text),
                "model_dir": Config.MODEL_DIR
            }
        }
    except Exception as e:
        return {"error": str(e)}
