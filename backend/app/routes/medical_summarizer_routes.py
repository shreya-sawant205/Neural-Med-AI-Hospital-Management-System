from flask import Blueprint,request,jsonify
import app.services.medical_summarizer_services as medical_summarizer_services


medical_summarizer_bp = Blueprint("medical_summarizer", __name__)


@medical_summarizer_bp.route("/summarize", methods=["POST"])
def medical_summarizer():
  result = medical_summarizer_services.medical_summarizer(request)

  return jsonify(result)
