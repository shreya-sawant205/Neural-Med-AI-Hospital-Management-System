from flask import Blueprint, request, jsonify
import app.services.appointment_services as appointment_services


appointments_bp = Blueprint("appointments", __name__)

@appointments_bp.route("/bookappointment", methods=["POST"])
def book_appointment():

    data = request.json
 
    appointment = {
        "patientId" : data["patientId"],
        "doctorId" : data["doctorId"],
        "appointmentDate" : data["appointmentDate"], 
        "appointmentTime" : data["appointmentTime"], 
        "visitReason" : data["visitReason"]
    }
 
    result = appointment_services.book_appointment_service(appointment)

    return jsonify(result)


@appointments_bp.route("/getappointments/<patient_id>",methods=["GET"])
def get_appointments(patient_id):

   result =  appointment_services.get_appointments_service(patient_id) 

   return jsonify(result),200

    

@appointments_bp.route("/getappointmentsbydoctorid/<doctor_id>",methods=["GET"])
def get_appointments_by_doctor_id(doctor_id):

    result = appointment_services.get_appointments_by_doctorid_service(doctor_id)

    return jsonify(result),200



@appointments_bp.route("/getpatientdatabyappointmentid/<appointment_id>",methods=["GET"])
def get_patient_data_by_appointment_id(appointment_id):

   result = appointment_services.get_patient_data_by_appointment_id_service(appointment_id)

   return jsonify(result),200







