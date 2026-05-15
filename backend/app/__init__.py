from flask import Flask
from flask_cors import CORS
from app.config import Config
# from dotenv import load_dotenv

def create_app():

    # load_dotenv()

    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.registration_routes import registration_bp
    from app.routes.appointment_routes import appointments_bp
    from app.routes.prescriptions_routes import prescriptions_bp
    from app.routes.medical_records_routes import medical_records_bp
    from app.routes.doctor_routes import doctor_bp
    from app.routes.receptionist_routes import receptionist_bp
    from app.routes.ai_routes import ai_bp
    # from app.routes.medical_summarizer_routes import medical_summarizer_bp
    
 
    
    from app.utils.db import create_schema

    # Create database tables
    create_schema()

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(registration_bp, url_prefix="/api/registration")
    app.register_blueprint(appointments_bp, url_prefix="/api/appointments")
    app.register_blueprint(prescriptions_bp, url_prefix="/api/prescriptions")
    app.register_blueprint(medical_records_bp, url_prefix="/api/medicalrecords")
    app.register_blueprint(doctor_bp, url_prefix="/api/doctors")
    app.register_blueprint(receptionist_bp, url_prefix="/api/receptionists")
    app.register_blueprint(ai_bp, url_prefix="/api/ai")
    # app.register_blueprint(medical_summarizer_bp, url_prefix="/api/medicalsummarizer")

    return app