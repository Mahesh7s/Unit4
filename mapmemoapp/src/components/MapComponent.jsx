import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import SearchBar from './SearchBar';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapRef = useRef(null);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => {
        console.error("Location error:", err);
        alert("Could not get location");
      }
    );
  }, []);

  // Fly to destination when updated
  useEffect(() => {
    if (destination && mapRef.current) {
      console.log("📍 Flying to destination:", destination);
      mapRef.current.flyTo(destination, 14, { duration: 1.5 });
    }
  }, [destination]);

  return (
    <div className="relative h-screen w-full">
      <SearchBar onSelectLocation={setDestination} />

      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User Marker */}
          <Marker position={userLocation} icon={defaultIcon}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Destination Marker */}
          {destination && (
            <>
              <Marker position={destination} icon={defaultIcon}>
                <Popup>Destination</Popup>
              </Marker>
              <Polyline positions={[userLocation, destination]} color="blue" />
            </>
          )}
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Getting current location...</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
