from flask import Flask
from routes import routes # Import the routes Blueprint
from weather_fetcher import start_weather_thread

app = Flask(__name__)

# Register the Blueprint with the Flask app
app.register_blueprint(routes)

# Start the weather fetching thread
start_weather_thread()

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
