from flask import Blueprint, jsonify, request, abort
from flask_cors import cross_origin
import globals

weather_routes = Blueprint('weather_routes', __name__)
    
def check_session_cookie(request):
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        abort(401, description="Unauthorized")

@weather_routes.route("/current_weather/cities", methods=["POST"])
@cross_origin(supports_credentials=True)  # Enable CORS for this route
def list_current_weather():
    check_session_cookie(request)
    data = request.get_json() # Extract JSON payload
    if not isinstance(data, dict) or "cities" not in data or not isinstance(data["cities"], list):
        return jsonify({"error":"Invalid request format. Expected {'cities':['City1','City2',...]}"}), 400
    
    requested_cities = [city.title() for city in data["cities"]] # Capitalize for consistency]
    with globals.weather_data_lock:
        response_data = {city: globals.all_weather_data.get(city, "City not found") for city in requested_cities}
        
    return jsonify(response_data), 200

@weather_routes.route("/current_weather/all_cities", methods=["GET"])
@cross_origin(supports_credentials=True)  # Enable CORS for this route
def all_current_weather():
    check_session_cookie(request)
    with globals.weather_data_lock:
        return jsonify(globals.all_weather_data), 200