import requests # For making HTTP requests
from config import API_KEY # Import the OpenWeather API key
import threading # For threading
# from datetime import datetime # For debugging
import globals# Import the global dictionary to store weather data

# Prometheus metrics (if used)
from prometheus_client import Gauge, Histogram

# Define Prometheus metrics
# Gauges are used for values that can go up and down
temperature_metric = Gauge('weather_temperature', 'Current temperature', ['city'])
humidity_metric = Gauge('weather_humidity', 'Current humidity', ['city'])
pressure_metric = Gauge('weather_pressure', 'Current pressure', ['city'])
wind_speed_metric = Gauge('weather_wind_speed', 'Current wind speed', ['city'])
wind_direction_metric = Gauge('weather_wind_direction', 'Current wind direction', ['city'])
wind_gust_metric = Gauge('weather_wind_gust', 'Current wind gust', ['city'])
cloudiness_metric = Gauge('weather_cloudiness', 'Current cloud coverage', ['city'])

# Event dictionary to stop weather fetching threads
stop_events = {}

CITIES = {
    'Houston': {"lon": -95.3676974, "lat": 29.7589382},
    'Los Angeles': {"lon": -118.242766, "lat": 34.0536909},
    'New York': {"lon": -74.0060152, "lat": 40.7127281},
    'Chicago': {"lon": -87.6244212, "lat": 41.8755616},
    'Miami': {"lon": -80.1917902, "lat": 25.7616798},
    'Phoenix': {"lon": -112.0740373, "lat": 33.4483766},
    'Philadelphia': {"lon": -75.163789, "lat": 39.9524152},
    'San Diego': {"lon": -117.1627728, "lat": 32.7174209},
    'Dallas': {"lon": -96.7968559, "lat": 32.7762719},
    'San Jose': {"lon": -121.8863286, "lat": 37.3382082},
    'Columbus': {"lon": -83.0007065, "lat": 39.9622601},
    'Charlotte': {"lon": -80.8431267, "lat": 35.2270869},
    'Indianapolis': {"lon": -86.158068, "lat": 39.7683331},
    'Seattle': {"lon": -122.3300624, "lat": 47.6038321},
    'Denver': {"lon": -104.9847185, "lat": 39.7392364},
}


# Dictionary to store threads
weather_threads = {}

def fetch_weather(lat:float, lon:float, stop_event)->None:
    """Fetches weather data and updates the global dictionary once per minute."""
    
    while not stop_event.is_set(): # Check if thread should stop (for debug purposes because reloader makes duplicaite threads)
        url = f"https://api.openweathermap.org/data/2.5/weather?appid={API_KEY}&lat={lat}&lon={lon}"
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
            
            # save_weather_data(weather_data) # Save the weather data to a file (this is our psuedo database)
            with globals.weather_data_lock:
                globals.all_weather_data[weather_data["city"]] = weather_data # Update the global dictionary with the new weather data

            # Update Prometheus metrics
            temperature_metric.labels(city=weather_data["city"]).set(weather_data["temperature"])
            humidity_metric.labels(city=weather_data["city"]).set(weather_data["humidity"])
            pressure_metric.labels(city=weather_data["city"]).set(weather_data["pressure"])
            wind_speed_metric.labels(city=weather_data["city"]).set(weather_data["wind_speed"])
            wind_direction_metric.labels(city=weather_data["city"]).set(weather_data["wind_direction"])
            wind_gust_metric.labels(city=weather_data["city"]).set(weather_data["wind_gust"])
            cloudiness_metric.labels(city=weather_data["city"]).set(weather_data["cloudiness"])
            
            # print(f"Updated weather data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} - {weather_data}")  # Debug log

        else:
            print(f"Failed to fetch weather data: {response.status_code}")

        stop_event.wait(60)  # Wait for 1 minute or until the event is set

weather_thread = None

# Start weather fetching in a background thread
def start_weather_threads():
    """Starts a weather thread for each city."""
    global weather_threads
    
    # Stop any existing threads
    stop_all_weather_threads()
    
    # Start new threads
    for city, coords in CITIES.items():
        # print(f"Starting weather thread for {city}...")
        # print(f"coords:{coords}")
        # print(f"Coordinates: lat:{coords["lat"]}, lon:{coords["lon"]}")
        stop_events[city] = threading.Event() # Create a stop event for each city
        weather_threads[city] = threading.Thread(target=fetch_weather, args=(coords["lat"], coords["lon"], stop_events[city]), daemon=True)
        weather_threads[city].start()
    
def stop_all_weather_threads():
    """Stops all weather threads."""
    for city, thread in weather_threads.items():
        print(f"Stopping weather thread for {city}...")
        stop_events[city].set() # Set the event to stop the thread
        thread.join() # Wait for the thread to finish
    weather_threads.clear() # Clear the dictionary
    stop_events.clear() # Clear the dictionary