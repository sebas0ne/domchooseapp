// src/components/commons/Menu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/commons/Menu.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };


  const handleNavigate = (path) => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <div className="menu-content" role="button">
      <div
        className={`menu-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`overlay-menu ${isOpen ? "active" : ""}`}>
        <ul>
          <li onClick={() => handleNavigate("/home")}>Home</li>
          <li onClick={() => handleNavigate("/favorites")}>Favorites</li>
          <li onClick={() => handleNavigate("/contact")}>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
