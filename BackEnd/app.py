from flask import Flask
from flask_cors import CORS
from routes import routes # Import the routes Blueprint
from weather_fetcher import start_weather_threads
import os

app = Flask(__name__)
CORS(app) # Enable CORS for all domains & routes (Not good production practice!)

# Register the Blueprint with the Flask app
app.register_blueprint(routes)

# Run the app
if __name__ == "__main__":
    # Start the weather fetching thread
    if not os.environ.get("WERKZEUG_RUN_MAIN"):  # Prevent duplicate threads
        start_weather_threads()
    
    app.run(debug=False, host="0.0.0.0", port=5000) #debug=True will auto-reload the server when changes are made
