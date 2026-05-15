from app.utils.db import get_db_connection
import uuid
from app.services.ai_services import predict_category

def book_appointment_service(data):

    appointmentId = str(uuid.uuid4())

    predicted_category = predict_category({"symptoms":data["visitReason"]})

    patientId = data["patientId"]
    doctorId = data["doctorId"]
    appointmentDate = data["appointmentDate"] 
    appointmentTime = data["appointmentTime"]  
    appointmentType = predicted_category["category"]
    visitReason = data["visitReason"]
    appointmentStatus = "Booked"
    consultationNotes = None

    conn = get_db_connection() 
    if conn is None:
        return {"error": "Database connection failed"}
     
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO appointments
        (appointment_id, patient_id, doctor_id,
        appointment_date,appointment_time, appointment_type,
        visit_reason, appointment_status, consultation_notes)
        VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            appointmentId,
            patientId,
            doctorId,
            appointmentDate,
            appointmentTime,
            appointmentType,
            visitReason,
            appointmentStatus,
            consultationNotes
        )
    )
    conn.commit() 
    cursor.close()
    conn.close()
    return {
        "response": True,
        "appointmentId": appointmentId
    }


def get_appointments_service(patient_id):  

    conn = get_db_connection() 
    if conn is None:
        return {"error": "Database connection failed"}

    cursor = conn.cursor()

    cursor.execute("""
        SELECT a.appointment_id, u.first_name,u.last_name, 
               a.appointment_date, a.appointment_time,
               a.visit_reason, a.appointment_status
        FROM appointments a
        inner join users u on u.user_id=a.doctor_id
        WHERE patient_id = %s
        ORDER BY appointment_date DESC
    """, (patient_id,))

    appointments = cursor.fetchall()

    result = []

    for appt in appointments:
        result.append({
            "appointmentId": appt[0],
            "doctor": appt[1] + " " + appt[2],
            "date": appt[3],
            "time": appt[4],
            "reason": appt[5],
            "status": appt[6]
        })

    cursor.close()
    conn.close()

    return result


def get_appointments_by_doctorid_service(doctor_id):

    conn = get_db_connection() 
    if conn is None:
        return {"error": "Database connection failed"}

    cursor = conn.cursor()

    cursor.execute("""
        SELECT a.appointment_id, u.first_name,u.last_name, 
               a.appointment_date, a.appointment_time,
               a.visit_reason, a.appointment_status,  a.appointment_type
 
        FROM appointments a
        inner join users u on u.user_id=a.patient_id
        WHERE doctor_id = %s
        ORDER BY appointment_date DESC
    """, (doctor_id,))

    appointments = cursor.fetchall()

    result = []

    for appt in appointments:
        result.append({
            "appointmentId": appt[0],
            "patientName": appt[1] + " " + appt[2],
            "date": appt[3],
            "time": appt[4],
            "reason": appt[5],
            "status": appt[6],
            "appointmentType": appt[7]
        })

    cursor.close()
    conn.close()

    return result


def get_patient_data_by_appointment_id_service(appointment_id):

    conn = get_db_connection() 

    if conn is None:
        return {"error": "Database connection failed"}

    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT concat(u.first_name, ' ', u.last_name) as name,a.patient_id
        FROM appointments a
        inner join users u on u.user_id=a.patient_id
        WHERE a.appointment_id = %s
    """, (appointment_id,))

    result = cursor.fetchone()

    cursor.close()
    conn.close()

    if result:
     return {"patientName": result["name"], "patientId":result["patient_id"]}
    else:
     return {"message": "Appointment not found"}