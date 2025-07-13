import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useCurrentLocation from '../hooks/useCurrentLocation';
import useGeofence from '../hooks/useGeoFence';
import SearchBar from './SearchBar';
import { fetchPOIs } from '../utils/fetchPOIs';

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
  const userLocation = useCurrentLocation();
  const [destination, setDestination] = useState(null);
  const [poiList, setPoiList] = useState([]);
  const mapRef = useRef(null);

  // Fetch POIs when userLocation changes
  useEffect(() => {
    const loadPOIs = async () => {
      if (userLocation) {
        const pois = await fetchPOIs(userLocation, 1000);
        setPoiList(pois);
      }
    };
    loadPOIs();
  }, [userLocation]);

  // Recenter map when destination changes
  useEffect(() => {
    if (destination && mapRef.current) {
      console.log('📍 flyTo triggered:', destination);
      mapRef.current.flyTo(destination, 14, { duration: 1.5 });
    }
  }, [destination]);

  // Geofence logic
  useGeofence(userLocation, destination, 200);

  const routePath = useMemo(() => {
    return userLocation && destination ? [userLocation, destination] : [];
  }, [userLocation, destination]);

  return (
    <div className="relative h-screen w-full">
      <SearchBar onSelectLocation={(coords) => {
        console.log("✅ Destination selected:", coords);
        setDestination(coords);
      }} />
      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(map) => {
            mapRef.current = map;
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={userLocation} icon={defaultIcon}>
            <Popup>Your Location</Popup>
          </Marker>
          {destination && (
            <>
              <Marker position={destination} icon={defaultIcon}>
                <Popup>Destination</Popup>
              </Marker>
              <Polyline positions={routePath} color="blue" />
            </>
          )}
          {poiList.map((poi) => (
            <Marker key={poi.id} position={[poi.lat, poi.lon]} icon={defaultIcon}>
              <Popup>{poi.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>📍 Getting your current location...</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
