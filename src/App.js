import React from "react";
import Navbar from "./layout/Navbar";
import LogIn from "./pages/LogIn";
import Patients from "./pages/Patients";
import ViewBiochemistry from "./pages/ViewBiochemistry";
import ViewHematology from "./pages/ViewHematology";
import SinglePatient from "./pages/SinglePatient";
import AddPatient from "./pages/AddPatient";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewUrine from "./pages/ViewUrine";
import MedicalRecords from "./pages/MedicalRecords";

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
          <Route exact path="/patients" element={<Patients />} />
          <Route exact path="/single-patient/:id" element={<SinglePatient />} />
          <Route exact path="/add-patient" element={<AddPatient />} />
          <Route exact path="/medical-records" element={<MedicalRecords />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
