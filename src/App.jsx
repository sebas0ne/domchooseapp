// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import LoaderOverlay from './components/loaders/LoaderOverlay';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Favorites from "./components/Favorites";
import Contact from "./components/Contact";
import "../src/styles/Variables.css";

import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading && location.pathname === '/') {
    return <LoaderOverlay />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Favorites" element={<Favorites />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
