from flask import Flask
from flask_cors import CORS
from routes import register_routes # Import the routes Blueprint
from weather_fetcher import start_weather_threads
import os

app = Flask(__name__)
CORS(app, supports_credentials=True) # Enable CORS for all domains & routes (Not good production practice!)

register_routes(app)

# Run the app
if __name__ == "__main__":
    # Start the weather fetching thread
    if not os.environ.get("WERKZEUG_RUN_MAIN"):  # Prevent duplicate threads
        start_weather_threads()
    
    #debug=False prevents auto-reloads when codes changes are made
    app.run(debug=False, host="0.0.0.0", port=5000) 
