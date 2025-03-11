# Flask App - Weather API

## Available Routes

### **1. Get Current Weather for All 15 Cities**
- **Endpoint:**  http://api.revaturelearn.com/current_weather/all_cities
- **Method:** `GET`
- **Description:** Returns weather data for all 15 tracked cities.

---

### **2. Get Current Weather for Specific Cities**
- **Endpoint:**  http://api.revaturelearn.com/current_weather/cities
- **Method:** `POST`
- **Description:** Returns weather data for only the cities specified in the request body.

- **Request Body (JSON):**
```json
{
  "cities": ["Houston", "Los Angeles", "Dallas"]
}
```
Response Example (JSON):
```json
{
	"Dallas": {
		"city": "Dallas",
		"cloudiness": 0,
		"humidity": 30,
		"pressure": 1011,
		"temperature": 297.85,
		"temperature_feels_like": 297.16,
		"weather": "clear sky",
		"wind_direction": 190,
		"wind_gust": 10.8,
		"wind_speed": 5.14
	},
	"Houston": {
		"city": "Houston",
		"cloudiness": 0,
		"humidity": 46,
		"pressure": 1015,
		"temperature": 297.41,
		"temperature_feels_like": 297.09,
		"weather": "clear sky",
		"wind_direction": 171,
		"wind_gust": 4.02,
		"wind_speed": 2.24
	},
	"Los Angeles": {
		"city": "Los Angeles",
		"cloudiness": 100,
		"humidity": 69,
		"pressure": 1012,
		"temperature": 286.68,
		"temperature_feels_like": 285.89,
		"weather": "overcast clouds",
		"wind_direction": 90,
		"wind_gust": 0,
		"wind_speed": 5.66
	}
}
```

# Open Weather Map API

## Host
https://openweathermap.org

## Instructions
Must make an account.  There are free subscriptions.  Use provided API Key to make HTTP REST requests.  See individual request documentation at links below for specific syntaxes and response formats.

## Free Plan Allowance
60 API calls/minute (Burst)
1,000,000 calls/month (Sustained: about 23 calls/minute continuously)

## Free Plan API

| API Feature                          | Documentation |
|--------------------------------------|------|
| **Current Weather**                  | [OpenWeatherMap Current](https://openweathermap.org/current) |
| **5 day / 3 hour forecast**          | [OpenWeatherMap Forecast](https://openweathermap.org/forecast5) |
| **Weather Maps**                      | [OpenWeatherMap Maps](https://openweathermap.org/api/weathermaps) |
| **Air Pollution**                     | [OpenWeatherMap Air Pollution](https://openweathermap.org/api/air-pollution) |
| **Geocoding (Coordinates By Location Name)** | [OpenWeatherMap Geocoding](https://openweathermap.org/api/geocoding-api) |


