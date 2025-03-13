import React from "react";

const WeatherDashboard = ({ city, cityData }) => {
    if (!city || !cityData) {
      return null;
    }
  
  
    // Convert Kelvin to Celsius
    const temperatureC = (cityData.temperature - 273.15).toFixed(1);
    const feelsLikeC = (cityData.temperature_feels_like - 273.15).toFixed(1);
  
  
    // Weather icons mapping
    const weatherIcons = {
      "clear sky": "☀️",
      "few clouds": "🌤",
      "scattered clouds": "⛅",
      "broken clouds": "☁️",
      "overcast clouds": "☁️",
      "light rain": "🌦",
      "moderate rain": "🌧",
      "heavy rain": "⛈",
      "thunderstorm": "⛈",
      "snow": "❄️",
      "mist": "🌫",
    };
  
  
    // Example "last updated" time
    const lastUpdated = "00:09 - Monday, Sep 19";
  
  
    return (
        <div style={{ maxWidth: "700px" }}>
      {/* A flex container to arrange items horizontally */}
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "100px" }}>
        
        {/* Left: Temperature */}
        <div
          style={{
            fontSize: "130px",
            fontWeight: "300",
            marginRight: "20px",
          }}
        >
          {temperatureC}°C
        </div>

        {/* Middle: City + Time stacked */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px",
            paddingTop: "46px",
          }}
        >
          <span
            style={{
              fontSize: "40px",
              fontWeight: "300",
              marginBottom: "5px",
            }}
          >
            {city}
          </span>
          <span style={{ fontSize: "14px", opacity: 0.9 }}>
            {lastUpdated}
          </span>
        </div>

        {/* Right: Weather icon + label */}
        <div style={{ 
            display: "flex",
            flexDirection: "column",
            // fontSize: "20px",
            fontWeight: "300",
            paddingTop:"45px",
             }}
            >
                <span
                style={{fontSize: "40px"}}
                >
                {weatherIcons[cityData.weather] || "🌡"}
                </span>

                <span>
                {cityData.weather}
                </span>
        </div>
      </div>
    </div>
    );
  };
  
  
  export default WeatherDashboard;
  




