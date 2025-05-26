// src/hooks/useOptionsManager.js
import { useState } from "react";

const useOptionsManager = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const registerOptions = (input) => {
    const splitOptions = input
      .split(/[\n,]/)
      .map(opt => opt.trim())
      .filter(opt => opt !== "");

    setOptions(prev => [...prev, ...splitOptions]);
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
    setOptions
  };
};

export default useOptionsManager;
