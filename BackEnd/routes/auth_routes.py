from flask import Blueprint, jsonify, request, make_response
from flask_cors import cross_origin
from google.oauth2 import id_token
from google.auth.transport import requests
from config import OAUTH_CLIENT_ID
from os import urandom

auth_routes = Blueprint('auth_routes', __name__)

auth_routes.secret_key = urandom(24)

@auth_routes.route("/auth/google", methods=["POST"])
@cross_origin(supports_credentials=True)  # Enable CORS for this route
def google_login():
    data = request.json
    token = data.get("idToken")
    
    try:
        user_info = id_token.verify_oauth2_token(token, requests.Request(), OAUTH_CLIENT_ID)
        
        # Generate a secure session token (can be JWT or a simple session ID)
        session_token = urandom(24).hex()
                
        # Set HTTP-only cookie (fronend cannot access it)
        response = make_response(jsonify({"message":"Login successful"}))
        response.set_cookie(
            "session_token", # Name of the cookie
            session_token, # Store the secure session token
            httponly=True, # Prevents JavaScript access
            secure=False, # Hosted on a non secure server (http) because only school project
            samesite="Lax"
        )
        
        return response, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_routes.route("/logout", methods=["POST"])
@cross_origin(supports_credentials=True)  # Enable CORS for this route
def logout():
    response = make_response(jsonify({"message": "Logged out successfully"}))

    # Clear the cookie by setting max-age=0
    response.set_cookie("session_token", "", max_age=0, httponly=True)

    return response, 200