from flask import Blueprint, jsonify, request, make_response
from flask_cors import cross_origin
import globals # Import the global dictionary to read weather data
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from google.oauth2 import id_token
from google.auth.transport import requests
from config import OAUTH_CLIENT_ID
import os

routes = Blueprint('routes',__name__)

routes.secret_key = os.urandom(24)

@routes.route("/auth/google", methods=["POST"])
@cross_origin(supports_credentials=True)  # Enable CORS for this route
def google_login():
    data = request.json
    token = data.get("idToken")
    
    try:
        user_info = id_token.verify_oauth2_token(token, requests.Request(), OAUTH_CLIENT_ID)
        
        # Generate a secure session token (can be JWT or a simple session ID)
        session_token = os.urandom(24).hex()
                
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
    
@routes.route("/protected_test", methods=["GET"])
def protected_test():
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        return jsonify({"error": "Unauthorized"}), 401
    
    return jsonify({"message": "You are authenticated."})

@routes.route("/logout", methods=["POST"])
@cross_origin(supports_credentials=True)  # Enable CORS for this route
def logout():
    response = make_response(jsonify({"message": "Logged out successfully"}))

    # Clear the cookie by setting max-age=0
    response.set_cookie("session_token", "", max_age=0, httponly=True)

    return response, 200

# Front End (React) Routes ------------------------------
# Home Route
@routes.route("/")
def home():
    return jsonify({"message": "Welcome to the Revature P2 Group 3's Weather API!"})

# Current Weather
@routes.route("/current_weather/cities", methods=["POST"])
def list_current_weather():
    data = request.get_json() # Extract JSON payload
    if not isinstance(data, dict) or "cities" not in data or not isinstance(data["cities"], list):
        return jsonify({"error":"Invalid request format. Expected {'cities':['City1','City2',...]}"}), 400
    
    requested_cities = [city.title() for city in data["cities"]] # Capitalize for consistency]
    with globals.weather_data_lock:
        response_data = {city: globals.all_weather_data.get(city, "City not found") for city in requested_cities}
        
    return jsonify(response_data), 200

@routes.route("/current_weather/all_cities", methods=["GET"])
@cross_origin(supports_credentials=True)  # Enable CORS for this route
def all_current_weather():
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        return jsonify({"error": "Unauthorized"}), 401
    with globals.weather_data_lock:
        return jsonify(globals.all_weather_data), 200

@routes.route("/debug")
def debug():
    return f"Memory address of weather_data in {__name__}: {id(globals.weather_data)}"

#  5 day / 3 hour forecast
@routes.route("/forecast")
def forecast():
    return jsonify({"message": "5 day / 3 hour forecast Route"})

#  Weather Maps
@routes.route("/weather_maps")
def weather_maps():
    return jsonify({"message": "Weather Maps Route"})

# Air Pollution
@routes.route("/air_pollution")
def air_pollution():
    return jsonify({"message": "Air Pollution Route"})

# Geocoding (Returns Coordinates By Location Name)
@routes.route("/geocoding")
def geocoding():
    return jsonify({"message": "Geocoding Route"})

# --------------------------------------------------------

# Prometheus Metrics Route 
@routes.route("/metrics")
def metrics():
    """Expose Prometheus Metrics"""
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}