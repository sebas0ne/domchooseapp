// src/components/Home.jsx
import React, { useState } from "react";
import "../styles/Home.css";
import RandomOptionModal from "../components/modals/RandomOptionModal";
import ButtonText from "./commons/ButtonText";
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
          <ButtonText className="btnText" key={index} title={opt} onClick={() => handleRemoveOption(opt)}/>
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
        <ButtonText className="btnText" title={'REGISTER'} onClick={handleRegister}/>
        {options.length >= 2 && (
          <ButtonText className="btnText" title={'RANDOM OPTION'} onClick={showRandom}/>
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
