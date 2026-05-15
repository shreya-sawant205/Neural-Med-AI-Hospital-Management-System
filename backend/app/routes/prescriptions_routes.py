from flask import Blueprint, request, jsonify

import app.services.prescription_services as prescription_services

prescriptions_bp = Blueprint("prescription", __name__)

@prescriptions_bp.route("/saveprescription", methods=["POST"])
def save_prescription():

    data = request.json

    result = prescription_services.save_prescription(data)

    return jsonify(result), 200
    
    

@prescriptions_bp.route("/getprescriptions/<patient_id>", methods=["GET"])
def get_prescriptions(patient_id):

    result = prescription_services.get_prescriptions(patient_id)

    return jsonify(result), 200


@prescriptions_bp.route("/getallprescriptions", methods=["GET"])
def get_all_prescriptions():

    result = prescription_services.get_all_prescriptions()

    return jsonify(result), 200
