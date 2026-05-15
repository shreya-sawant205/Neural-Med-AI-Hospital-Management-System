from app.utils.db import get_db_connection

def get_receptionist():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT 
            u.user_id,
            concat(u.first_name, ' ', u.last_name) as name,
            u.email,
            u.contact,
            r.shift_start,
            r.shift_end
        FROM users u
        LEFT JOIN receptionists_detail r ON u.user_id = r.receptionist_id
        WHERE u.role = 'receptionist'
    """

    cursor.execute(query)
    receptionists = cursor.fetchall()

    cursor.close()
    conn.close()

    return receptionists