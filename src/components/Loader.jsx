import React from "react";
import "../styles/Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <p className="loader-title">Welcome to domchooseapp</p>
      <div className="squares">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
    </div>
  );
}
