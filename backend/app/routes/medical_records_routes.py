from flask import Blueprint, request, jsonify
import app.services.medical_record_services as medical_record_services

medical_records_bp = Blueprint("medical_records_bp", __name__)


@medical_records_bp.route("/savemedicalrecord", methods=["POST"])
def save_medical_record():
 
    result = medical_record_services.save_medical_record(request)

    if "error" in result:
        return jsonify(result), 400
    
    return jsonify(result), 200


@medical_records_bp.route("/getmedicalrecordsbydoctorid/<doctor_id>", methods=["GET"])
def get_medical_records_by_doctor_id(doctor_id):
   
    result = medical_record_services.get_medical_records_by_doctor_id(doctor_id)

    return jsonify(result), 200


@medical_records_bp.route("/getmedicalrecordsbypatientid/<patient_id>", methods=["GET"])
def get_medical_records_by_patient_id(patient_id):
   
    result = medical_record_services.get_medical_records_by_patient_id(patient_id)

    return jsonify(result), 200


