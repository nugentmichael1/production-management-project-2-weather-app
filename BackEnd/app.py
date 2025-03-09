from flask import Flask
from routes import routes # Import the routes Blueprint
from weather_fetcher import start_weather_thread
import os

app = Flask(__name__)

# Register the Blueprint with the Flask app
app.register_blueprint(routes)

# Run the app
if __name__ == "__main__":
    # Start the weather fetching thread
    if not os.environ.get("WERKZEUG_RUN_MAIN"):  # Prevent duplicate threads
        start_weather_thread()
    
    app.run(debug=True)
