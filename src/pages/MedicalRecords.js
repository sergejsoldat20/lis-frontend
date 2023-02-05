/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Grid, List, Button } from "@mui/material";
import ViewMedicalRecord from "./ViewMedicalRecord";
import recordsService from "../services/recordsService.service";
export default function medicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [displayAllRecords, setDisplayAllRecords] = useState(true);

  useEffect(() => {
    loadMedicalRecords();
  }, [medicalRecords]);

  const loadMedicalRecords = async () => {
    recordsService
      .getAll()
      .then((result) => {
        setMedicalRecords(
          result.data.sort(
            (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterInvalid = () => {
    setDisplayAllRecords(false);
  };

  const handleShowAll = () => {
    setDisplayAllRecords(true);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <h3>Lista rezultata</h3>
      <div>
        <Button onClick={handleFilterInvalid}>U procesu rada</Button>
        <Button onClick={handleShowAll}>Svi</Button>
      </div>
      <List>
        {displayAllRecords
          ? medicalRecords.map((medicalRecord, index) => (
              <ViewMedicalRecord
                id={medicalRecord.id}
                key={index}
                sx={{ width: 1200 }}
              />
            ))
          : medicalRecords
              .filter((medicalRecord) => medicalRecord.isValid === "false")
              .map((medicalRecord, index) => (
                <ViewMedicalRecord
                  id={medicalRecord.id}
                  key={index}
                  sx={{ width: 1200 }}
                />
              ))}
      </List>
    </Grid>
  );
}
