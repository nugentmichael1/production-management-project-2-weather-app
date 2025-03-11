import { useEffect, useState } from "react";

const CitySelector = () => {
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch("http://api.revaturelearn.com/current_weather/all_cities");
      if (!response.ok) {
        throw new Error("Failed to fetch city list");
      }
      const data = await response.json();
      const cityNames = Object.keys(data); // Extracts city names
      console.log("Fetched Cities:", cityNames); // Debugging output
      setCityList(cityNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <div>
      <h2>City Selector</h2>
      <p>Check console (F12) for city names.</p>
    </div>
  );
};

export default CitySelector;
