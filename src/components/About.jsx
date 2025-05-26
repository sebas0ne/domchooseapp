// src/components/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from './Menu';


const About = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Menu />
      <div className="page-container">
        <h1>About domchooseapp</h1>
        <p>
          domchooseapp is a minimalist decision helper where you register options and let the app choose one randomly for you. Built with love using React.
        </p>
        <p>Created by <strong>@sebas0ne</strong></p>
        <button className="btn bounce" onClick={() => navigate("/home")}>Go Back</button>
      </div>
    </div>
  );
};

export default About;
