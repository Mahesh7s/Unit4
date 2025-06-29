import React, { use, useState } from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function Search(){
	let navigate = useNavigate();
	let [city,setCity] = useState("")
	useEffect(() => {
    // If city is empty, do nothing
    if (city.trim() === "") return;

    // Set a timeout to navigate after 800ms
    const delay = setTimeout(() => {
      navigate(`/weather/${city}`);
    }, 800);

    // Clear previous timeout if user types again
    return () => clearTimeout(delay);
  }, [city]);

  return (
    <div>
      <input
        type="text"
        placeholder="Start typing city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
  );
}