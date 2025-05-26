import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

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
    <>
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
          <li onClick={() => handleNavigate("/about")}>About</li>
          <li onClick={() => handleNavigate("/contact")}>Contact</li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
