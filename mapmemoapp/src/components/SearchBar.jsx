import React, { useState } from 'react';

const SearchBar = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      const coordinates = [parseFloat(lat), parseFloat(lon)];
      console.log("📍 Search result coordinates:", coordinates);
      onSelectLocation(coordinates); // ✅ call passed function
    } else {
      alert("No results found");
    }
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-2 rounded shadow flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a place"
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Go
      </button>
    </div>
  );
};

export default SearchBar;
