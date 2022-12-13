import React from "react";
import Navbar from "./layout/Navbar";
import LogIn from "./pages/LogIn";
import ViewBiochemistry from "./pages/ViewBiochemistry";
import ViewHematology from "./pages/ViewHematology";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewUrine from "./pages/ViewUrine";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/bio" element={<ViewBiochemistry />} />
          <Route exact path="/hema" element={<ViewHematology />} />
          <Route exact path="/urine" element={<ViewUrine />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
