from app.utils.db import get_db_connection

def save_prescription(data):

    patientId = data["patientId"]
    doctorId = data["doctorId"]
    appointmentId = data["appointmentId"] 
    medicines = data["medicines"]  
    instructions = data["instructions"] 

    conn = get_db_connection() 
    if conn is None:
        return {"error": "Database connection failed"}
     
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO prescriptions
        (appointment_id,patient_id,doctor_id,
        medicines,instructions,date)
        VALUES (%s, %s, %s, %s, %s, now())
        """,
        (
            appointmentId,
            patientId,
            doctorId,
            medicines,
            instructions
        )
    )
    conn.commit() 
    cursor.close()
    conn.close()
    return{
        "response": True
    }


def get_prescriptions(patient_id):

    conn = get_db_connection()
    if conn is None:
        return {"error": "Database connection failed"}

    cursor = conn.cursor()

    cursor.execute("""
        SELECT p.prescription_id,
               p.medicines,
               p.instructions,
               p.date,
               concat(u.first_name, ' ', u.last_name) as doctor_name
        FROM prescriptions p
        JOIN users u ON p.doctor_id = u.user_id
        WHERE p.patient_id = %s
        ORDER BY p.date DESC
    """, (patient_id,))

    prescriptions = cursor.fetchall()

    prescription_list = []

    for p in prescriptions:
        prescription_list.append({
            "prescription_id": p[0],
            "medicines": p[1],
            "instructions": p[2],
            "date": p[3],
            "doctor_name": p[4]
        })

    cursor.close()
    conn.close()
    return prescription_list


def get_all_prescriptions():

    conn = get_db_connection()
    if conn is None:
        return {"error": "Database connection failed"}

    cursor = conn.cursor()

    cursor.execute("""
        select p.prescription_id, concat(pu.first_name, ' ', pu.last_name) as patient_name,
        concat(du.first_name, ' ', du.last_name) as doctor_name,
        p.medicines, p.instructions, p.date
        from prescriptions p
        left join users pu on pu.user_id=p.patient_id
        left join users du on du.user_id = p.doctor_id
        order by p.date desc
    """)

    prescriptions = cursor.fetchall()

    prescription_list = []

    for p in prescriptions:
        prescription_list.append({
            "prescription_id": p[0],
            "patient_name": p[1],
            "doctor_name": p[2],
            "medicines": p[3],
            "instructions":p[4],
            "date": p[5]
        })

    cursor.close()
    conn.close()

    return prescription_list


