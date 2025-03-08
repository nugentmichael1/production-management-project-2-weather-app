from flask import Flask, jsonify, request

app = Flask(__name__)

# Home Route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

# Front End (React) Routes ------------------------------
# Current Weather
@app.route("/current_weather")
def current_weather():
    return jsonify({"message": "Current Weather Route"})

#  5 day / 3 hour forecast
@app.route("/forecast")
def forecast():
    return jsonify({"message": "5 day / 3 hour forecast Route"})

#  Weather Maps
@app.route("/weather_maps")
def weather_maps():
    return jsonify({"message": "Weather Maps Route"})

# Air Pollution
@app.route("/air_pollution")
def air_pollution():
    return jsonify({"message": "Air Pollution Route"})

# Geocoding (Returns Coordinates By Location Name)
@app.route("/geocoding")
def geocoding():
    return jsonify({"message": "Geocoding Route"})

# --------------------------------------------------------

# Prometheus Metrics Route 
@app.route("/metrics")
def metrics():
    return jsonify({"message": "Prometheus Metrics Route"})


# Run the app
if __name__ == "__main__":
    app.run(debug=True)
