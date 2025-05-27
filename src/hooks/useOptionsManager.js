// src/hooks/useOptionsManager.js
import { useState } from "react";

const useOptionsManager = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const registerOptions = (input) => {
    const splitOptions = input
      .split(/[\n,]/)
      .map(opt => opt.trim())
      .filter(opt => opt !== "");

    const currentOptionsLower = options.map(opt => opt.toLowerCase());
    const uniqueInput = [];
    const seen = new Set();
    const duplicates = [];

    for (let opt of splitOptions) {
      const lowerOpt = opt.toLowerCase();
      if (!seen.has(lowerOpt) && !currentOptionsLower.includes(lowerOpt)) {
        seen.add(lowerOpt);
        uniqueInput.push(opt);
      } else {
        duplicates.push(opt);
      }
    }

    if (uniqueInput.length > 0) {
      setOptions(prev => [...prev, ...uniqueInput]);
    }

    if (duplicates.length > 0) {
      const messages = duplicates.map(opt => `This option has already been registered: ${opt.toUpperCase()}`);
      setErrorMessages(messages);
    } else {
      setErrorMessages([]);
    }
  };

  const showRandom = () => {
    if (options.length < 2) return;
    const randomIndex = Math.floor(Math.random() * options.length);
    setSelected(options[randomIndex]);
    setShowModal(true);
  };

  return {
    options,
    selected,
    showModal,
    registerOptions,
    showRandom,
    setShowModal,
    setOptions,
    errorMessages,
  };
};

export default useOptionsManager;
