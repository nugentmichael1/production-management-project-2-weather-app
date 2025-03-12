from flask import Blueprint, jsonify, request
import globals # Import the global dictionary to read weather data
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

routes = Blueprint('routes',__name__)

# Home Route
@routes.route("/")
def home():
    return jsonify({"message": "Welcome to the Revature P2 Group 3's Weather API!"})

# Front End (React) Routes ------------------------------
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
def all_current_weather():
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