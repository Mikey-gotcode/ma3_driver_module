import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import VehicleMarker from '../components/VehicleMarker';

const socket = io('https://10.53.42.138:5000');

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12,
  });
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    console.log('Requesting location permissions...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Initial position obtained:', { latitude, longitude });
          setLocation({ latitude, longitude });
          setViewport(v => ({
            ...v,
            latitude,
            longitude,
          }));
          // Send initial location to server
          socket.emit('sendLocation', { latitude, longitude });
        },
        error => {
          console.error('Error getting initial location:', error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
            default:
              console.error("An unspecified error occurred.");
              break;
          }
        },
        { enableHighAccuracy: true }
      );

      const watchId = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Updated position obtained:', { latitude, longitude });
          setLocation({ latitude, longitude });
          // Send updated location to server
          socket.emit('sendLocation', { latitude, longitude });
        },
        error => console.error('Error watching position:', error),
        { enableHighAccuracy: true }
      );

      return () => {
        console.log('Clearing watch position...');
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    console.log('Setting interval for sending location...');
    const intervalId = setInterval(() => {
      if (location.latitude && location.longitude) {
        console.log('Sending location to server:', { latitude: location.latitude, longitude: location.longitude });
        socket.emit('sendLocation', { latitude: location.latitude, longitude: location.longitude });
      }
    }, 5000); // Adjust the interval as needed (5000 ms = 5 seconds)

    return () => {
      console.log('Clearing location send interval...');
      clearInterval(intervalId);
    };
  }, [location]);

  useEffect(() => {
    socket.on('receiveLocation', data => {
      console.log('Received location data:', data);
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
      {location.latitude && location.longitude && (
        <VehicleMarker latitude={location.latitude} longitude={location.longitude} />
      )}
    </MapGL>
  );
};

export default MapComponent;
