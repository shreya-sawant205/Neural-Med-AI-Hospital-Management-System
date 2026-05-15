from flask import Blueprint, request, jsonify
import app.services.auth_services as auth_services 

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    result = auth_services.login_user(email,password)

    return jsonify(result)


@auth_bp.route("/getuserdetails/<user_id>", methods=["GET"])
def get_user_details(user_id):

    result = auth_services.get_user_details(user_id)

    return jsonify(result)
    