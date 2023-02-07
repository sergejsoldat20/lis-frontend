import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, ListItem, List } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import ViewMedicalRecord from "./ViewMedicalRecord";
import patientService from "../services/patientService.service";
export default function SinglePatient() {
  const { id } = useParams();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    jmbg: "",
    gender: "",
    address: "",
    phone: "",
    city: "",
    familyDoctor: "",
  });

  useEffect(() => {
    loadPatient();
    loadPatientRecords();
  }, []);

  const loadPatientRecords = async () => {
    patientService.getAllRecordsByPatientId(id).then((result) => {
      setMedicalRecords(result.data);
    });
  };

  const loadPatient = async () => {
    patientService.getById(id).then((result) => {
      setPatient(result.data);
    });
  };
  const deleteMedicalRecord = (id) => {
    setMedicalRecords(
      medicalRecords.filter((medicalRecord) => medicalRecord.id !== id)
    );
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <Card>
          <div className="border rounder p-2 mt-2 shadow">
            <h4 className="text-center m-4">Informacije o pacijentu:</h4>
            <div className="card">
              <div className="card-header">
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1,
                      gridTemplateColumns: "repeat(1,1fr)",
                    }}
                  >
                    <ListItem variant="body2">
                      <b>Ime</b> : {patient.firstName}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Prezime</b>: {patient.lastName}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Datum rođenja</b>: {patient.birthDate}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>JMBG</b>: {patient.jmbg}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Adresa</b>: {patient.address}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Telefon</b>: {patient.phone}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Grad</b>: {patient.city}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Porodnicni ljekar</b>: {patient.familyDoctor}
                    </ListItem>
                  </Box>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <List>
          {medicalRecords.map((medicalRecord, index) => (
            <ViewMedicalRecord
              id={medicalRecord.id}
              key={index}
              handleDelete={deleteMedicalRecord}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
