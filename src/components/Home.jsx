// src/components/Home.jsx
import React, { useState } from "react";
import "../styles/Home.css";
import RandomOptionModal from "../components/modals/RandomOptionModal";
import Menu from './commons/Menu';
import useOptionsManager from "../hooks/useOptionsManager";

const Home = () => {
  const [input, setInput] = useState("");

  const {
    options,
    selected,
    showModal,
    registerOptions,
    showRandom,
    setShowModal,
    setOptions,
    errorMessages
  } = useOptionsManager();

  const handleRegister = () => {
    registerOptions(input);
    setInput("");
  };

  const handleRemoveOption = (optionToRemove) => {
    setOptions(prevOptions => prevOptions.filter(opt => opt !== optionToRemove));
  };

  return (
    <div className="home">
      <Menu />

      <div className="registered-options">
        {options.map((opt, index) => (
          <button
            key={index}
            className="btn option-btn"
            onClick={() => handleRemoveOption(opt)}
            title="Click to remove"
          >
            {opt}
          </button>
        ))}
      </div>

      <textarea
        className="option-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ENTER OPTIONS SEPARATED BY COMMAS OR NEW LINES"
      />

      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((msg, i) => (
            <p key={i} className="error-text">{msg}</p>
          ))}
        </div>
      )}

      <div className="button-group centered">
        <button className="btn bounce" onClick={handleRegister}>
          REGISTER
        </button>
        {options.length >= 2 && (
          <button className="btn bounce" onClick={showRandom}>
            RANDOM OPTION
          </button>
        )}
      </div>

      {showModal && (
        <RandomOptionModal
          option={selected}
          onClose={() => setShowModal(false)}
          options={options}
        />
      )}
    </div>
  );
};

export default Home;
