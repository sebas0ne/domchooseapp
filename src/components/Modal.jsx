// src/components/Modal.jsx
import React, { useEffect, useState } from "react";
import "../styles/Modal.css";

const Modal = ({ option, onClose, options }) => {
  const [isRevealing, setIsRevealing] = useState(true);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let interval;
    if (isRevealing && options.length > 0) {
      let i = 0;
      interval = setInterval(() => {
        setDisplayText(options[i % options.length].toUpperCase());
        i++;
      }, 120);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsRevealing(false);
        setDisplayText(option.toUpperCase());
      }, 2500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isRevealing, option, options]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">

          </div>
          <h2 className="modal-title">
              {isRevealing ? "Choosing for you..." : "You should go with:"}
            </h2>
            <button className="close-button" onClick={onClose}>×</button>

          <p className={`modal-option ${isRevealing ? "spinner-text" : "reveal-text"}`}>
            {displayText}
          </p>
      </div>
    </div>
  );
};

export default Modal;
