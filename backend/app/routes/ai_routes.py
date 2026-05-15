from flask import Blueprint, request, jsonify
import app.services.ai_services as ai_services

ai_bp = Blueprint("ai_bp", __name__)

@ai_bp.route("/predictappointmentcategory", methods=["POST"])
def predict_category():
    data = request.get_json()
    result = ai_services.predict_category(data)
    return jsonify(result)
