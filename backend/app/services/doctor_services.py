from app.utils.db import get_db_connection


def get_doctors():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT 
            u.user_id,
            concat(u.first_name, ' ', u.last_name) as name,
            u.email,
            u.contact,
            d.specialization,
            d.shift_start,
            d.shift_end,
            d.availability_status
        FROM users u
        LEFT JOIN doctors_detail d ON u.user_id = d.doctor_id
        WHERE u.role = 'doctor'
    """

    cursor.execute(query)
    doctors = cursor.fetchall()

    cursor.close()
    conn.close()

    return doctors