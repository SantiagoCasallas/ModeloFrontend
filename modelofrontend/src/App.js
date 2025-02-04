import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Inicio from "./Pages/Inicio";

import "./index.css";

function App() {
    return (
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
export default App;
