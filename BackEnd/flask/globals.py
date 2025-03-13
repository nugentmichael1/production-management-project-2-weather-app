import threading

all_weather_data = {} # Global dictionary to store weather data
weather_data_lock = threading.Lock() # Lock to weather data