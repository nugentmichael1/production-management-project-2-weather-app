from flask import Flask, jsonify, request

app = Flask(__name__)

# Home Route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

# Current Weather Route
@app.route("/current_weather")
def current_weather():
    return jsonify({"message": "Current Weather Route"})


# Run the app
if __name__ == "__main__":
    app.run(debug=True)
