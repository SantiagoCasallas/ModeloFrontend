// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import App from './App';
import "./index.css";

// Crea un root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);