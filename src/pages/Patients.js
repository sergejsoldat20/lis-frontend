/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import patientService from "../services/patientService.service";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [recordsSize, setRecordsSize] = useState(0);
  useEffect(() => {
    patientService.getAllPaginated(currentPage, pageSize).then((result) => {
      setPatients(result.data.content);
      setRecordsSize(result.data.totalElements);
    });
  }, [currentPage, recordsSize]);

  const loadPatients = () => {
    patientService.getAll().then((result) => {
      setPatients(result.data);
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        <Grid container item sx={{ justifyContent: "center" }}>
          <Button
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={(currentPage + 1) * pageSize >= recordsSize}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </Grid>
      </div>
    </div>
  );
}
