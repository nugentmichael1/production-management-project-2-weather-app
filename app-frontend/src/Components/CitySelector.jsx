import React, { useState, useEffect, useContext } from "react";
import WeatherDashboard from "./WeatherDashboard";
import apiClient from "../apiClient";
import sunset from "../images/sunset1.jpg";
import thunderstorm from "../images/thunderstorm.jpg";
import summer from "../images/summer.jpg"
import sky from "../images/sky.jpg"
import { AuthContext } from "../context/AuthContext";


// Example background image URL (replace with your own if you like)
const BACKGROUND_IMAGE_URL = sunset;

const CitySelector = () => {
  const [citiesData, setCitiesData] = useState({});
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("New York");

    // Fetch weather data 
    useEffect(() => {
        apiClient
            .get("/current_weather/all_cities")
            .then((response) => setCitiesData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

  useEffect(() => {
    if (selectedCity && citiesData[selectedCity]) {
      const condition = citiesData[selectedCity].weather;
      let bgImage = "";
      if (condition === "clear sky") {
        bgImage = `url(${sky})`;
      } else if (condition === "few clouds") {
        bgImage = `url(${summer})`;
      } else if (condition === "scattered clouds") {
        bgImage = `url(${thunderstorm})`;
      } else {
        // default background
        bgImage = `url(${thunderstorm})`;
      }
      document.body.style.background = `${bgImage} no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
    }
  }, [selectedCity, citiesData]);
  

  // Filter city names based on user input
  useEffect(() => {
    if (selectedCity && search.toLowerCase() === selectedCity.toLowerCase()) {
      setFilteredCities([]);
    } else if (search.length > 0) {
      const filtered = Object.keys(citiesData).filter((city) =>
        city.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [search, citiesData, selectedCity]);

  // Helper function for clickable city links
  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
    // setSearch(cityName);
  };

  return (
    <div
      style={{
        width: "98%",
        minHeight: "calc(100vh - 305px)",
        position: "relative",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
        zIndex: 1,
      }}
    >
      {/* Left side: Weather info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {selectedCity && (
          <WeatherDashboard
            city={selectedCity}
            cityData={citiesData[selectedCity]}
          />
        )}
      </div>

      {/* Right side: Translucent overlay with search, city list, details */}
      <div
        style={{
          width: "350px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          backdropFilter: "blur(5px)",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Heading (Another location) */}
        <h2 style={{ marginBottom: "20px", fontWeight: "normal" }}>
          Another location
        </h2>

        {/* Search input + results */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a city..."
            style={{
              boxSizing: "border-box",
              width: "100%",
              padding: "10px 40px 10px 10px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              outline: "none",
              color: "#333",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666",
            }}
          >
            🔍
          </div>

          {/* Dropdown list of filtered cities */}
          {filteredCities.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                background: "#fff",
                borderRadius: "5px",
                listStyleType: "none",
                padding: "5px",
                marginTop: "5px",
                maxHeight: "150px",
                overflowY: "auto",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                color: "#000",
                zIndex: 1000,
              }}
            >
              {filteredCities.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearch(city);
                    setFilteredCities([]);
                  }}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* City links above the line */}
        <div
          style={{

            // borderTop: "2px solid rgba(255, 255, 255, 0.2)",
            marginTop:"30px",
            display: "flex",
            flexDirection:"column",
            gap: "25px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          <span onClick={() => handleCityClick("New York")}>New York</span>
          <span onClick={() => handleCityClick("Miami")}>Miami</span>
          <span onClick={() => handleCityClick("Houston")}>Houston</span>
        </div>

        {/* Weather Details Section */}
        <div
          style={{
            borderTop: "2px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "20px",
            marginTop: "auto",
          }}
        >
          <h3 style={{ fontWeight: "normal" }}>Weather Details</h3>
          {selectedCity && (
            <>
              {/* Condition */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <span>Condition:</span>
                <span>{citiesData[selectedCity]?.weather}</span>
              </div>

              {/* Feels Like */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <span>Feels Like:</span>
                <span>
                  {(
                    (citiesData[selectedCity]?.temperature_feels_like ?? 0) -
                    273.15
                  ).toFixed(1)}
                  °C
                </span>
              </div>

              {/* Humidity */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <span>Humidity:</span>
                <span>{citiesData[selectedCity]?.humidity}%</span>
              </div>

              {/* Wind Speed */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <span>Wind Speed:</span>
                <span>{citiesData[selectedCity]?.wind_speed} km/h</span>
              </div>

              {/* Cloudiness */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Cloudiness:</span>
                <span>{citiesData[selectedCity]?.cloudiness}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
