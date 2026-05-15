from flask import Flask
from flask_cors import CORS
from .config import Config
from .routes.auth_routes import auth_bp
from .routes.registration_routes import registration_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(registration_bp, url_prefix="/api/registration")
    return app
