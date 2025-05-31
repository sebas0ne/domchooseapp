// src/components/modals/Modal.jsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import ButtonIcon from '../../components/commons/ButtonIcon';
import "../../styles/modals/RandomOptionModal.css";

const RandomOptionModal = ({ option, onClose, options }) => {
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
      <div className="modal-content-random" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header-random">
            <h2 className="modal-title-random">
              {isRevealing ? "Choosing for you..." : "You should go with:"}
            </h2>
            <ButtonIcon title="CLOSE" icon={X} onClick={onClose} size={16} className="close-button" />
          </div>

          <p className={`modal-option ${isRevealing ? "spinner-text" : "reveal-text"}`}>
            {displayText}
          </p>
      </div>
    </div>
  );
};

export default RandomOptionModal;
