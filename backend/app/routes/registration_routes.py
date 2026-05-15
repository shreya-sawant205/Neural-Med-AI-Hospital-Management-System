from flask import Blueprint, request, jsonify 
import app.services.registration_services as registration_services

registration_bp = Blueprint("registration", __name__) 

@registration_bp.route("/register", methods=["POST"]) 
def register(): 
    data = request.json 
    role = data["role"] 
    email = data["email"] 
    password = data["password"] 
    firstName = data["firstName"] 
    lastName = data["lastName"] 
    gender = data["gender"] 
    dob = data["dob"] 
    contact = data["contact"] 
    address = data["address"] 


    user = {
        "role":role,
        "email":email,
        "password":password,
        "firstName":firstName,
        "lastName":lastName,
        "gender":gender,
        "dob":dob,
        "contact":contact,
        "address":address
    } 
    
    result = registration_services.register_user(user)

    return jsonify(result) 

@registration_bp.route("/fetchdoctors", methods=["GET"]) 
def fetchDoctors(): 

    result = registration_services.fetch_doctors()

    return jsonify(result)

@registration_bp.route("/updateprofile", methods=["POST"]) 
def update_profile():
    user = request.json
    result = registration_services.update_profile(user)

    return jsonify(result) 


