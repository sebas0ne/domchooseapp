// src/components/RandomOptionLogic.js
export function getRandomOption(options) {
    return options[Math.floor(Math.random() * options.length)];
  }
