// src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonText from "../components/commons/ButtonText";
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/home');
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="creator-label">Created by @sebas0ne</div>
        <div className="center-content">
          <ButtonText className="btnEnter" title={'GO TO HOME'} onClick={handleNavigate}/>
          <div className="arrows">
            <span>&uarr;</span>
            <span>&uarr;</span>
            <span>&uarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
