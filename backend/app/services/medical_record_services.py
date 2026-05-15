from app.utils.db import get_db_connection 
import os
from app.config import Config
from werkzeug.utils import secure_filename

def save_medical_record(data):

    patient_id = data.form["patientId"]
    title = data.form["title"]
    description = data.form["description"]
    comment = data.form["comment"]
    file = data.files["file"]

    if not file:
        return {"error": "No file uploaded"}

    if not os.path.exists(Config.UPLOAD_FOLDER):
        os.makedirs(Config.UPLOAD_FOLDER)

    filename = secure_filename(file.filename)
    filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
    file.save(filepath)

    conn = get_db_connection() 
    if conn is None: 
        return {"error": "Database connection failed"} 
    
    cursor = conn.cursor() 
    cursor.execute (
        """
        INSERT INTO medical_records (patient_id, title, description, comment, file_path,uploaded_at) 
        VALUES (%s,%s,%s, %s,%s,now())        
        """,
        (patient_id,title,description,comment,filepath)      
    ) 
    conn.commit() 
    cursor.close() 
    conn.close() 

    return {
        "response": True, 
        "message": "Medical records saved successfully"}

def get_medical_records_by_doctor_id(doctor_id):
 
    conn = get_db_connection() 
    if conn is None: 
        return {"error": "Database connection failed"} 
    
    cursor = conn.cursor() 

    cursor.execute (
     """select md.*, u.first_name, u.last_name from medical_records md
     inner join users u on u.user_id=md.patient_id
     where patient_id in (select patient_id from appointments where doctor_id=%s)
     order by md.uploaded_at desc""",(doctor_id,)
    )
    medical_records = cursor.fetchall()

    result = []

    for mr in medical_records:
        result.append(
            {
                "recordId":mr[0],
                "patientId":mr[1],
                "title":mr[2],
                "description":mr[3],
                "comment":mr[4],
                "fileURL":mr[5],
                "fileName":mr[5].split("\\")[1],
                "uploadedAt":mr[6],
                "patientName": mr[7] + " " + mr[8]
            }
        )
    cursor.close() 
    conn.close() 

    return result


def get_medical_records_by_patient_id(patient_id):
 
    conn = get_db_connection() 
    if conn is None: 
        return {"error": "Database connection failed"} 
    
    cursor = conn.cursor() 

    cursor.execute (
     """select title,description,comment,file_path,uploaded_at from medical_records 
     where patient_id=%s order by uploaded_at desc""",(patient_id,)
    )
    medical_records = cursor.fetchall()

    result = []

    for mr in medical_records:
        result.append(
            {
                "title":mr[0],
                "description":mr[1],
                "comment":mr[2],
                "fileURL":mr[3],
                "fileName":mr[3].split("\\")[1],
                "uploadedAt":mr[4]
            }
        )
    cursor.close() 
    conn.close() 

    return result