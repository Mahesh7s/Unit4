// src/utils/fetchPOIs.js

/**
 * Fetch Points of Interest (amenities) around a given location
 * using the Overpass API.
 *
 * @param {[number, number]} userLocation — [latitude, longitude]
 * @param {number} radius — search radius in meters (default: 1000)
 * @returns {Promise<Array<{id: number, name: string, lat: number, lon: number}>>}
 */
export async function fetchPOIs(userLocation, radius = 1000) {
  if (!userLocation) return [];

  const [lat, lon] = userLocation;
  const query = `[out:json];node(around:${radius},${lat},${lon})[amenity];out;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.elements.map(el => ({
      id: el.id,
      name: el.tags.name || el.tags.amenity,
      lat: el.lat,
      lon: el.lon
    }));
  } catch (err) {
    console.error('Error fetching POIs:', err);
    return [];
  }
}
