import mysql.connector
from mysql.connector import Error
from app.config import Config

def get_db_connection():
    """Establish and return a MySQL database connection."""
    try:
        conn = mysql.connector.connect(
            host=Config.MYSQL_HOST,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            database=Config.MYSQL_DB,
            port=Config.MYSQL_PORT
        )
        if conn.is_connected():
            return conn
    except Error as e:
        print(f"Database connection failed: {e}")
        return None


def create_schema():
    try: 
        conn = get_db_connection()

        if conn is None: 
         return {"error": "Database connection failed"} 
            
        cursor = conn.cursor()

        cursor.execute (
            """
            CREATE TABLE IF NOT EXISTS `users` (
                `user_id` varchar(50) NOT NULL,
                `role` varchar(50) NOT NULL,
                `first_name` varchar(100) NOT NULL,
                `last_name` varchar(100) NOT NULL,
                `gender` varchar(25) NOT NULL,
                `dob` date DEFAULT NULL,
                `email` varchar(150) NOT NULL,
                `contact` varchar(15) DEFAULT NULL,
                `address` text,
                `password` varchar(255) NOT NULL,
                PRIMARY KEY (`user_id`),
                UNIQUE KEY `email` (`email`)
            )       
            """     
        ) 

        cursor.execute (
            """
            CREATE TABLE IF NOT EXISTS `appointments` (
                `appointment_id` varchar(50) NOT NULL,
                `patient_id` varchar(50) NOT NULL,
                `doctor_id` varchar(50) NOT NULL,
                `appointment_date` date NOT NULL,
                `appointment_time` varchar(50) NOT NULL,
                `appointment_type` varchar(50) DEFAULT  NULL,
                `visit_reason` text,
                `appointment_status` varchar(50) NOT NULL,
                `consultation_notes` text,
                PRIMARY KEY (`appointment_id`)
            )   
            """     
        )

        cursor.execute (
            """
            CREATE TABLE IF NOT EXISTS `prescriptions` (
                `prescription_id` int NOT NULL AUTO_INCREMENT,
                `appointment_id` varchar(50) NOT NULL,
                `patient_id` varchar(50) NOT NULL,
                `doctor_id` varchar(50) NOT NULL,
                `medicines` text,
                `instructions` text,
                `date` datetime DEFAULT NULL,
                PRIMARY KEY (`prescription_id`)
            )   
            """     
        )

        cursor.execute (
            """
            CREATE TABLE IF NOT EXISTS `medical_records` (
                `record_id` int NOT NULL AUTO_INCREMENT,
                `patient_id` varchar(50) NOT NULL,
                `title` varchar(250) NOT NULL,
                `description` text,
                `comment` text,
                `file_path` varchar(250) DEFAULT NULL,
                `uploaded_at` timestamp NULL DEFAULT NULL,
                PRIMARY KEY (`record_id`)
            )  
            """     
        )

        cursor.execute (
            """
            CREATE TABLE IF NOT EXISTS doctors_detail (
                doctor_id VARCHAR(50) PRIMARY KEY,
                availability_status varchar(50)NOT NULL,
                shift_start VARCHAR(50) NOT NULL,
                shift_end VARCHAR(50) NOT NULL,
                specialization VARCHAR(100) NOT NULL,
                salary DECIMAL(10,2) DEFAULT NULL
            )  
            """     
        )

        cursor.execute (
            """
            CREATE TABLE IF NOT EXISTS receptionists_detail (
                receptionist_id VARCHAR(50) PRIMARY KEY,
                shift_start VARCHAR(50) NOT NULL,
                shift_end VARCHAR(50) NOT NULL,
                salary DECIMAL(10,2) DEFAULT NULL
            )  
            """     
        )

        conn.commit() 
        cursor.close() 
        conn.close() 
        print("Database created successfuly!!")
    except Error as e:
        print(f"Database creation failed: {e}")  

    finally:
        cursor.close() 
        conn.close() 


