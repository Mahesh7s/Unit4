// src/components/RecenterMap.jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RecenterMap = ({ latlng }) => {
  const map = useMap();

  useEffect(() => {
    if (latlng && Array.isArray(latlng)) {
      console.log("📍 Re-centering to:", latlng);
      map.flyTo(latlng, 14, { duration: 1.5 });
    }
  }, [latlng, map]);

  return null;
};

export default RecenterMap;
