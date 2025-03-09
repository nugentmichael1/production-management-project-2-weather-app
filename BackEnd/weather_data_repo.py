import json

def save_weather_data(weather_data:str)->None:
    """Saves the weather data to a file."""
    with open("weather_data.txt", "w") as file:
        json.dump(weather_data, file)
        
def load_weather_data()->str:
    """Loads the weather data from a file."""
    with open("weather_data.txt", "r") as file:
        return file.read()