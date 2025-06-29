import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchWeather from "./weather";

export default function City() {
  const { city } = useParams();
  const mapAPi = 'AIzaSyDPDNG8q8UaaSXrU3ZrNMfGALp8TLjDtpM';

  const [weather, setWeather] = useState(null);
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

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${mapAPi}&q=${city}`;

  return (
    <div>
      <h2>Here is the data for your searched city: {city}</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && !error && (
        <>
          <div>
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {weather.weather[0].main}</p>
            <p>Description: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>

          <h3>Map of {city}</h3>
          <iframe
            title={`Map of ${city}`}
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
          ></iframe>
        </>
      )}
    </div>
  );
}
