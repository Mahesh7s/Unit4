import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import fetchWeather from "./weather";

export default function City(){
	let {city} = useParams();
	let [weather,setWeather] = useState("")
	 const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchWeather(city);
        if (data.cod === 200) {
          setWeather(data);
        } else {
          setError(data.message || "City not found");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [city]);

	return(
		<>
	<h2>Here is the dats  for you your searched city{city}</h2>
	<h2>Weather for {city}</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && !error && (
        <div>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
		</>
	)
}
