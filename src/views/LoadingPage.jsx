import React, { useEffect, useState } from 'react';
import './LoadingPage.css';
import vehicleIcon from '../views/assets/Kampala-Matatu--1024x1024.png'; // Update with the correct path

const LoadingPage = ({ progress }) => {
  return (
    <div className="loading-container">
      <div className="loading-wrapper">
        <div
          className="loading-bar"
          style={{ height: `${progress}%` }}
        >
          <img src={vehicleIcon} alt="Loading" className="loading-icon" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
