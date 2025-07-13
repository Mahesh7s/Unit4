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
      const coords = [parseFloat(lat), parseFloat(lon)];
      console.log("📍 Search result coordinates:", coords);
      onSelectLocation(coords);
    } else {
      alert("No results found.");
    }
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-2 rounded shadow flex gap-2">
      <input
        type="text"
        placeholder="Search place (e.g. Delhi)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-2 py-1 rounded w-64"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Go
      </button>
    </div>
  );
};

export default SearchBar;
