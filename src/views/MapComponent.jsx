import React, { useEffect, useState, useMemo } from 'react';
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
  const [vehicleCoordinates, setVehicleCoordinates] = useState([]);

  const vehicleCoordinatesArray = useMemo(() => [
    { latitude: -1.183178, longitude: 36.838275 },
    { latitude: -1.261438, longitude: 36.842226 }
    // Add more coordinates as needed for vehicle movement simulation
  ], []);

  useEffect(() => {
    // Simulate vehicle movement by updating coordinates from array
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * vehicleCoordinatesArray.length);
      const { latitude, longitude } = vehicleCoordinatesArray[randomIndex];
      setVehicleCoordinates([{ latitude, longitude }]);
    }, 2000); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, [vehicleCoordinatesArray]);

  useEffect(() => {
    // Send initial vehicle location to server
    if (vehicleCoordinates.length > 0) {
      const { latitude, longitude } = vehicleCoordinates[0];
      socket.emit('sendLocation', { latitude, longitude });
    }
  }, [vehicleCoordinates]);

  useEffect(() => {
    // Receive location data from server
    socket.on('receiveLocation', data => {
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
      onViewportChange={newViewport => setViewport(newViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {vehicleCoordinates.map((coords, index) => (
        <VehicleMarker key={index} latitude={coords.latitude} longitude={coords.longitude} />
      ))}
    </MapGL>
  );
};

export default MapComponent;
