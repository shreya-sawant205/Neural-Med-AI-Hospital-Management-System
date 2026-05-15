from flask import Blueprint, jsonify
import app.services.receptionist_services as receptionist_services

receptionist_bp = Blueprint("receptionist_bp", __name__)

@receptionist_bp.route("/getreceptionists", methods=["GET"])

def get_receptionists():
    try:

        receptionists = receptionist_services.get_receptionist()
        return jsonify(receptionists), 200
    
    except Exception as e:
        return jsonify({"error": "error, something went wrong!"}), 500
    
    