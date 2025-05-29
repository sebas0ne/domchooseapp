import React from "react";
import "../../styles/loaders/LoaderOverlay.css";

const LoaderOverlay = () => {
  return (
    <div className="loader-overlay">
      <div className="circle outer">
        <div className="circle middle">
          <div className="circle inner"></div>
        </div>
      </div>
    </div>
  );
};

export default LoaderOverlay;
