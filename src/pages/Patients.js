import React, { useEffect, useState } from "react";
import patientService from "../services/patientService.service";
import { Link } from "react-router-dom";
export default function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, patients);

  const loadPatients = () => {
    patientService.getAll().then((result) => {
      setPatients(result.data);
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"> Ime</th>
              <th scope="col">Prezime</th>
              <th scope="col">Info</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/single-patient/${patient.id}`}
                  >
                    Karton
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
