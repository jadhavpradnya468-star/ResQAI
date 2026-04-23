import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow,
         useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

export default function MapView() {
  const [vets, setVets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      setUserLocation({ lat, lng });
      try {
        const res = await axios.post('http://localhost:5000/api/vets', { lat, lng });
        setVets(res.data);
      } catch (err) {
        console.log('Could not fetch vets');
      }
    });
  }, []);

  if (!isLoaded)      return <p>Loading map...</p>;
  if (!userLocation)  return <p>📍 Getting your location...</p>;

  return (
    <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
      <h3 style={{ padding: '10px 0', color: '#FF6B35' }}>
        🏥 Nearby Veterinary Hospitals
      </h3>
      <GoogleMap
        center={userLocation}
        zoom={13}
        mapContainerStyle={{ width: '100%', height: '350px' }}>

        {/* User location */}
        <Marker position={userLocation}
          label={{ text: '📍 You', color: 'white' }} />

        {/* Vet markers */}
        {vets.map((vet, i) => (
          <Marker key={i}
            position={{
              lat: vet.geometry.location.lat,
              lng: vet.geometry.location.lng
            }}
            onClick={() => setSelectedVet(vet)} />
        ))}

        {/* Vet info popup */}
        {selectedVet && (
          <InfoWindow
            position={{
              lat: selectedVet.geometry.location.lat,
              lng: selectedVet.geometry.location.lng
            }}
            onCloseClick={() => setSelectedVet(null)}>
            <div>
              <h4>🏥 {selectedVet.name}</h4>
              <p>{selectedVet.vicinity}</p>
              <p>⭐ Rating: {selectedVet.rating || 'N/A'}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}