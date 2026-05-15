from werkzeug.security import generate_password_hash 
from app.utils.db import get_db_connection 
import uuid 

def register_user(user):

    conn = get_db_connection() 
    if conn is None: 
        return {"error": "Database connection failed"} 
    
    cursor = conn.cursor() 
    cursor.execute (
        """
        INSERT INTO users (user_id,role, first_name, last_name,gender,dob, email,contact,address,password) 
        VALUES (%s,%s,%s,%s,%s, %s, %s,%s,%s,%s)        
        """,
        (str(uuid.uuid4()),user["role"], user["firstName"], user["lastName"],user["gender"],user["dob"],user["email"],user["contact"], user["address"],generate_password_hash(user["password"]))      
    ) 
    conn.commit() 
    cursor.close() 
    conn.close() 

    return {
        "response": True, 
        "message": "User registered successfully"}


def fetch_doctors():
    conn = get_db_connection() 
    if conn is None: 
        return {"error": "Database connection failed"}
    
    cursor = conn.cursor() 
    cursor.execute(
        "SELECT user_id, first_name, last_name FROM users WHERE role='doctor' order by first_name"
        ) 
    
    doctors = cursor.fetchall() 
    
    doctor_list = [] 
    
    for doctor in doctors: 
        doctor_list.append({ 
            "user_id": doctor[0], 
            "first_name": doctor[1], 
            "last_name": doctor[2] 
            })

    cursor.close()
    conn.close()
    return doctor_list

def update_profile(user):

    conn = get_db_connection() 
    if conn is None: 
        return {"error": "Database connection failed"} 
    
    cursor = conn.cursor() 
    cursor.execute (
        """
        UPDATE users set first_name=%s, last_name=%s, contact=%s,address=%s,gender=%s,dob=%s
        WHERE user_id=%s       
        """,
        (user["firstName"], user["lastName"],user["contactNo"], user["address"],user["gender"],user["dob"],user["userId"])      
    ) 

    if user["newPassword"] :
        cursor.execute (
            """
            UPDATE users set password=%s
            WHERE user_id=%s       
            """,
            (generate_password_hash(user["newPassword"]), user["userId"])      
        ) 
    
    conn.commit() 
    cursor.close() 
    conn.close() 

    return {
        "response": True, 
        "message": "Profile updated successfully"}

