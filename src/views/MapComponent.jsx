import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import VehicleMarker from '../components/VehicleMarker';

const socket = io('https://backend-server-86l5.onrender.com/');

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12,
  });
  const [vehicleCoordinates, setVehicleCoordinates] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      // Request the device's location
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Update the vehicleCoordinates state with the current location
          setVehicleCoordinates({ latitude, longitude });

          // Update the map viewport to center on the current location
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => console.error('Error getting location:', error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    // Send location data to the server when it changes
    if (vehicleCoordinates) {
      socket.emit('sendLocation', vehicleCoordinates);
    }
  }, [vehicleCoordinates]);

  useEffect(() => {
    // Receive location data from the server
    socket.on('receiveLocation', (data) => {
      console.log('Received location data:', data);
      // Handle received location data as needed
    });

    return () => {
      socket.off('receiveLocation');
    };
  }, []);

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(newViewport) => setViewport(newViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {vehicleCoordinates && (
        <VehicleMarker
          latitude={vehicleCoordinates.latitude}
          longitude={vehicleCoordinates.longitude}
        />
      )}
    </MapGL>
  );
};

export default MapComponent;
