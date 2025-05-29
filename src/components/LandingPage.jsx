 // src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/home');
  };

  return (
    <div className="center-content">
    <button className="enter-button" onClick={handleNavigate}>
      GO TO HOME
    </button>
    <div className="arrows">
      <span>&uarr;</span>
      <span>&uarr;</span>
      <span>&uarr;</span>
    </div>
  </div>
  );
};

export default LandingPage;
