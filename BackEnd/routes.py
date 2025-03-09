from flask import Blueprint, jsonify
from globals import weather_data

routes = Blueprint('routes',__name__)

# Home Route
@routes.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

# Front End (React) Routes ------------------------------
# Current Weather
@routes.route("/current_weather")
def current_weather():
    return jsonify(weather_data)

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
    return jsonify(weather_data)