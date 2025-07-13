import { useEffect } from 'react';
import L from 'leaflet';

const useGeofence = (userLoc, targetLoc, radius) => {
  useEffect(() => {
    if (!userLoc || !targetLoc) return;
    const dist = L.latLng(userLoc).distanceTo(L.latLng(targetLoc));
    if (dist <= radius) {
      alert('🔔 Entered geofence area!');
    }
  }, [userLoc, targetLoc, radius]);
};

export default useGeofence;
