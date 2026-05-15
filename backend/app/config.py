import os

class Config:
    # MySQL Database Configuration
    MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
    MYSQL_USER = os.getenv("MYSQL_USER", "root")
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "root")
    MYSQL_DB = os.getenv("MYSQL_DB", "hospital_management_system")
    MYSQL_PORT = int(os.getenv("MYSQL_PORT", 3306))
    UPLOAD_FOLDER = "files"
    # MAX_CONTENT_LENGTH = int(os.getenv("MAX_CONTENT_MB", "20")) * 1024 * 1024  # MB
   
    # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # MODEL_DIR = os.getenv("MODEL_DIR", os.path.join(BASE_DIR, "models", "medical_summarization"))

    # CHUNK_OVERLAP_TOKENS = int(os.getenv("CHUNK_OVERLAP_TOKENS", "64"))
    # DEFAULT_MAX_INPUT_TOKENS = int(os.getenv("DEFAULT_MAX_INPUT_TOKENS", "1500"))  # soft cap
    # DEFAULT_SUMMARY_MAX_NEW_TOKENS = int(os.getenv("DEFAULT_SUMMARY_MAX_NEW_TOKENS", "256"))
    # DEFAULT_SUMMARY_MIN_NEW_TOKENS = int(os.getenv("DEFAULT_SUMMARY_MIN_NEW_TOKENS", "50"))

    # # Enforce offline if environment indicates
    # TRANSFORMERS_OFFLINE = os.getenv("TRANSFORMERS_OFFLINE", "0") == "1"
    # HF_HUB_OFFLINE = os.getenv("HF_HUB_OFFLINE", "0") == "1"
