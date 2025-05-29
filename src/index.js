import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('body')).render(
  <React.StrictMode>
    <BrowserRouter basename="/domchooseapp">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
