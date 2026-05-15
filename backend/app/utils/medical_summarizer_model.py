import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    pipeline
)


# -------------------
# Load Model
# -------------------
def load_summarizer(model_dir: str):
    """
    Load tokenizer and model from local disk only. Uses GPU if available.
    """
    device = 0 if torch.cuda.is_available() else -1
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    # Load tokenizer/model strictly from local files
    tokenizer = AutoTokenizer.from_pretrained(model_dir, local_files_only=True)

    # Many medical summarization models are seq2seq (T5/BART). Use AutoModelForSeq2SeqLM.
    model = AutoModelForSeq2SeqLM.from_pretrained(
        model_dir,
        local_files_only=True,
        torch_dtype=torch_dtype,
        device_map="auto" if device == 0 else None
    )

    summarizer = pipeline(
        task="summarization",
        model=model,
        tokenizer=tokenizer,
        device=device
    )
    return summarizer, tokenizer, model