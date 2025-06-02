// src/components/commons/ButtonIcon.jsx
import React from "react";
import "../../styles/commons/ButtonIcon.css";

const ButtonIcon = ({ title, onClick, icon: Icon, className = "", size = 16 }) => {
  return (
    <button
      title={title}
      onClick={onClick || (() => {})}
      className={className}
    >
      <Icon size={size} />
    </button>
  );
};

export default ButtonIcon;
