// src/components/Contact.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from './Menu';
import "../styles/Page.css";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
    <Menu />
      <div className="page-container">
        <h1>Contact</h1>
        <p>
          For suggestions, collaborations or support, feel free to reach out at:
        </p>
        <p><strong>Email:</strong> sebastian.alban.one@gmail.com</p>
        <p><strong>Twitter:</strong> @sebas0ne</p>
        <button className="btn bounce" onClick={() => navigate("/home")}>Go Back</button>
      </div>
    </div>
  );
};

export default Contact;
