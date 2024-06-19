// src/components/LoadingSpinner.js
import React from 'react';
import { Circles } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <Circles
        height="20"
        width="20"
        color="#4fa94d"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
