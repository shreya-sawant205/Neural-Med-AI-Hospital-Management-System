from werkzeug.security import check_password_hash
from app.utils.db import get_db_connection

def login_user(email,password):

    conn = get_db_connection() 
    if conn is None:
        return {"error": "Database connection failed"}
    
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT user_id, first_name, last_name, password,role FROM users WHERE email=%s",(email,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        return {"response": False, "message": "User not found"}

    # Step 3: Check password
    if not check_password_hash(user["password"], password):
        cursor.close()
        conn.close()
        return {"response": False, "message": "Incorrect password"}

    resp = {
            "user_id":user["user_id"],
            "first_name":user["first_name"],
            "last_name":user["last_name"],
            "role":user["role"],
           }

    cursor.close()
    conn.close()

    if user and check_password_hash(user["password"], password):
     return {"response": True, "user":resp}
    else:
     return {"response": False}
    
    
def get_user_details(user_id):

    conn = get_db_connection() 
    if conn is None:
        return {"error": "Database connection failed"}
    
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT user_id, first_name, last_name,role ,email,contact,address,gender,dob FROM users WHERE user_id=%s",(user_id,))

    user = cursor.fetchone()

    resp = {
            "user_id":user["user_id"],
            "first_name":user["first_name"],
            "last_name":user["last_name"],
            "role":user["role"],
            "email":user["email"],
            "contact":user["contact"],
            "address":user["address"],
            "gender":user["gender"],
            "dob":user["dob"],
           }

    cursor.close()
    conn.close()

    return resp

       