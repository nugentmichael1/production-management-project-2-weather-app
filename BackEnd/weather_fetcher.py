import requests # For making HTTP requests
from config import API_KEY # Import the OpenWeather API key
import threading # For threading
from datetime import datetime
from weather_data_repo import save_weather_data # A psuedo database for storing weather data

# Prometheus metrics (if used)
from prometheus_client import Gauge

# Define Prometheus metrics
temperature_metric = Gauge('weather_temperature', 'Current temperature')
humidity_metric = Gauge('weather_humidity', 'Current humidity')
pressure_metric = Gauge('weather_pressure', 'Current pressure')

# Event to stop the weather fetching thread
stop_event = threading.Event()

def fetch_weather():
    """Continuously fetches weather data and updates the global dictionary."""
    global weather_data

    while not stop_event.is_set(): # Check if thread should stop (for debug purposes because reloader makes duplicaite threads)
        url = f"https://api.openweathermap.org/data/2.5/weather?appid={API_KEY}&lon=-95.3676974&lat=29.7589382"
        response = requests.get(url)

        if response.status_code == 200:
            # print(f"Memory address of weather_data in {__name__}: {id(weather_data)}")  # Debug log
            data = response.json()
            weather_data = {
                "city": data["name"],
                "temperature": data["main"]["temp"],
                "temperature_feels_like": data["main"]["feels_like"],
                "humidity": data["main"]["humidity"],
                "pressure": data["main"]["pressure"],
                "weather": data["weather"][0]["description"],
                "wind_speed": data["wind"]["speed"],
                "wind_direction": data["wind"]["deg"],
                "wind_gust": data["wind"].get("gust",0),
                "cloudiness": data["clouds"]["all"],
            }
            
            save_weather_data(weather_data) # Save the weather data to a file (this is our psuedo database)

            # Update Prometheus metrics
            temperature_metric.set(weather_data["temperature"])
            humidity_metric.set(weather_data["humidity"])
            pressure_metric.set(weather_data["pressure"])

            print(f"Updated weather data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} - {weather_data}")  # Debug log

        else:
            print(f"Failed to fetch weather data: {response.status_code}")

        stop_event.wait(60)  # Wait for 1 minute or until the event is set

weather_thread = None

# Start weather fetching in a background thread
def start_weather_thread():
    global weather_thread
    if weather_thread and weather_thread.is_alive():
        print("Stopping existing weather thread...")
        stop_event.set() # Set the event to stop the thread
        weather_thread.join() # Wait for the thread to finish
        stop_event.clear() # Reset the event
        
    print("Starting weather thread...")
    weather_thread = threading.Thread(target=fetch_weather, args=(), daemon=True)
    weather_thread.start()