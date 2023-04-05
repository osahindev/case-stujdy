from . import bp
from flask import request, jsonify
from flask_sieve import validate
from ...services.UserService import user_service
from .validators import LoginRequest

@bp.route("/login", methods=["POST"])
@validate(LoginRequest)
def login():
    data = request.get_json()
    
    email = data["email"]
    password = data["password"]
    
    user  = user_service.find_with_email(email)
    
    if user is not None:
        user_token = user_service.login(email=email, password=password)
        
        if user_token != False:
            return jsonify({"data": {"token": user_token.token}, "result": "OK"})
        
    return jsonify({"data": {"message": "Kullanıcı bulunamadı."}, "result": "NOTOK"})
        