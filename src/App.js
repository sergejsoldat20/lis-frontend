import React from "react";
import Navbar from "./layout/Navbar";
import LogIn from "./pages/LogIn";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
