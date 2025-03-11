import { useEffect, useState } from "react";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("http://api.revaturelearn.com/current_weather/all_cities");
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data); // Store the full JSON response
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!weatherData ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Object.entries(weatherData).map(([city, info]) => (
            <li key={city}>
              <h2>{info.city}</h2>
              <p><strong>Weather:</strong> {info.weather}</p>
              <p><strong>Temperature:</strong> {info.temperature} K</p>
              <p><strong>Humidity:</strong> {info.humidity}%</p>
              <p><strong>Wind Speed:</strong> {info.wind_speed} km/h</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeatherDashboard;


