import re
from io import BytesIO
from PyPDF2 import PdfReader

from app.utils.medical_summarizer_model import load_summarizer

from app.config import Config


summarizer, tokenizer, model = load_summarizer(Config.MODEL_DIR)

# Determine model input token limit (fallback to a safe default if "very large")
try:
    MODEL_MAX_INPUT_TOKENS = int(getattr(tokenizer, "model_max_length", 1024))
    if MODEL_MAX_INPUT_TOKENS > 100_000_000:  # transformers uses big sentinel for "infinite"
        MODEL_MAX_INPUT_TOKENS = 1024
except Exception:
    MODEL_MAX_INPUT_TOKENS = 1024


# -------------------
# Helpers
# -------------------
_whitespace_re = re.compile(r"\s+")

def clean_text(text: str) -> str:
    # Normalize whitespace and strip
    return _whitespace_re.sub(" ", text).strip()

def tokenize_len(text: str) -> int:
    # Count tokens without truncation, excluding special tokens
    return len(tokenizer.encode(text, add_special_tokens=False))

def split_into_token_chunks(text: str, max_tokens: int, overlap_tokens: int = 64):
    """
    Splits text into chunks not exceeding max_tokens tokens, with overlaps between chunks.
    """
    # Tokenize upfront to avoid repeatedly encoding substrings
    input_ids = tokenizer.encode(text, add_special_tokens=False)
    if len(input_ids) <= max_tokens:
        yield text
        return

    step = max_tokens - overlap_tokens
    if step <= 0:
        step = max_tokens  # fallback

    for start in range(0, len(input_ids), step):
        end = min(start + max_tokens, len(input_ids))
        chunk_ids = input_ids[start:end]
        chunk_text = tokenizer.decode(chunk_ids, skip_special_tokens=True)
        yield chunk_text
        if end == len(input_ids):
            break

def summarize_text(
    text: str,
    max_input_tokens: int = None,
    summary_max_new_tokens: int = None,
    summary_min_new_tokens: int = None,
):
    """
    Hierarchical summarization:
    1) Chunk input to fit model context
    2) Summarize each chunk
    3) Concatenate chunk summaries and do a second-pass summary
    """
    text = clean_text(text)

    max_input_tokens = max_input_tokens or min(Config.DEFAULT_MAX_INPUT_TOKENS, MODEL_MAX_INPUT_TOKENS)
    summary_max_new_tokens = summary_max_new_tokens or Config.DEFAULT_SUMMARY_MAX_NEW_TOKENS
    summary_min_new_tokens = summary_min_new_tokens or Config.DEFAULT_SUMMARY_MIN_NEW_TOKENS

    token_count = tokenize_len(text)
    if token_count == 0:
        return ""

    # Step 1 & 2: Chunk + summarize per chunk
    per_chunk_summaries = []
    for chunk in split_into_token_chunks(text, max_tokens=max_input_tokens, overlap_tokens=Config.CHUNK_OVERLAP_TOKENS):
        out = summarizer(
            chunk,
            max_new_tokens=summary_max_new_tokens,
            min_new_tokens=summary_min_new_tokens,
            do_sample=False
        )
        per_chunk_summaries.append(out[0]["summary_text"].strip())

    if len(per_chunk_summaries) == 1:
        return per_chunk_summaries[0]

    # Step 3: Second-pass summary over concatenated chunk summaries
    joined = " ".join(per_chunk_summaries)
    # Keep second pass a bit tighter
    second_pass = summarizer(
        joined,
        max_new_tokens=max(128, summary_max_new_tokens // 2),
        min_new_tokens=min(60, summary_min_new_tokens),
        do_sample=False
    )
    return second_pass[0]["summary_text"].strip()

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extracts textual content from a PDF using PyPDF2.
    """
    reader = PdfReader(BytesIO(pdf_bytes))
    texts = []
    for page in reader.pages:
        try:
            txt = page.extract_text() or ""
        except Exception:
            txt = ""
        if txt:
            texts.append(txt)
    return "\n".join(texts)