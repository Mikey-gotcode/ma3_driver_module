import React from 'react';
import { Marker } from 'react-map-gl';

const VehicleMarker = ({ latitude, longitude }) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div style={{ background: 'red', borderRadius: '50%', width: '10px', height: '10px' }}></div>
    </Marker>
  );
};

export default VehicleMarker;
