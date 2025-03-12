# Flask App - Weather API

## Available Routes

### **1. Get Current Weather for All 15 Cities**
- **Endpoint:**  
  ```
  GET http://api.revaturelearn.com/current_weather/all_cities
  ```
- **Method:** `GET`
- **Description:** Returns weather data for all 15 tracked cities.

---

### **2. Get Current Weather for Specific Cities**
- **Endpoint:**  
  ```
  POST http://api.revaturelearn.com/current_weather/cities
  ```
- **Method:** `POST`
- **Description:** Returns weather data for only the cities specified in the request body.

- **Request Body (JSON):**
  ```json
  {
    "cities": ["Houston", "Los Angeles", "Dallas"]
  }
  ```
- **Response Example (JSON):**
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

---

### **3. Prometheus Metrics Endpoint**
- **Endpoint:**  
  ```
  GET http://api.revaturelearn.com/metrics
  ```
- **Method:** `GET`
- **Description:**  
  - Exposes **real-time weather metrics** for Prometheus monitoring.
  - Returns **temperature, humidity, pressure, wind speed, wind direction, wind gust, and cloudiness** for each city.

- **Example Output (Prometheus Format):**
  ```
  # HELP weather_temperature Current temperature
  # TYPE weather_temperature gauge
  weather_temperature{city="Houston"} 85
  weather_temperature{city="Los Angeles"} 90

  # HELP weather_humidity Current humidity
  # TYPE weather_humidity gauge
  weather_humidity{city="Houston"} 70
  weather_humidity{city="Los Angeles"} 50
  ```

- **How to Use:**
  1. **Prometheus Setup**  
     Add this job to your `prometheus.yml` file:
     ```yaml
     scrape_configs:
       - job_name: "weather_api"
         metrics_path: "/metrics"
         static_configs:
           - targets: ["api.revaturelearn.com"] # No port number because web traffic defaults to port 80
     ```
  2. **Grafana Integration**  
     - Add Prometheus as a **data source**.
     - Query metrics like:
       ```promql
       weather_temperature{city="Houston"}
       ```

---


## ** Docker Deployment**

Use the prebuilt images for quick setup.

### **📝 ****************************`.env`**************************** File**

Ensure you have the **OpenWeather API key** set in `.env`:

```sh
OPENWEATHER_API_KEY=<Your OpenWeatherMap API Key>
```

### ** ****************************`docker-compose.yml`**************************** Configuration**

```yaml
services:
  flask:
    image: nugentmichael/weather-app-flask:latest
    restart: always
    ports:
      - "5000:5000"
    env_file:
      - .env
    networks:
      - app-network

  nginx:
    image: nugentmichael/nginx-flask:latest
    restart: always
    ports:
      - "80:80"
    depends_on:
      - flask
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

# Open Weather Map API
## Description
This is the API our server uses to fetch its data.  We query it once a minute for the latest updates to 15 cities.  This keeps up beneath the 23/calls per minute, but provides a large amount of data for it to serve to the front end, and for Prometheus and Grafana to analyze.
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


