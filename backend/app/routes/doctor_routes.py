from flask import Blueprint, jsonify
import app.services.doctor_services as doctor_services

doctor_bp = Blueprint("doctor_bp", __name__)

@doctor_bp.route("/getdoctors", methods=["GET"])
def get_doctors():
    try:
        
        doctors = doctor_services.get_doctors()
        return jsonify(doctors), 200
    
    except Exception as e:
        return jsonify({"error": "error, something went wrong"}), 500