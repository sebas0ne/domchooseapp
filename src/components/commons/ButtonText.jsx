// src/components/commons/ButtonText.jsx
import React from "react";
import "../../styles/commons/ButtonText.css";

const ButtonText = ({ title, onClick, className = ""}) => {
  return (
    <button
      onClick={onClick || (() => {})}
      className={className}
    >
    {title}
    </button>
  );
};

export default ButtonText;
