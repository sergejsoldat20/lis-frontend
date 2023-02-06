/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Grid, List, Button } from "@mui/material";
import ViewMedicalRecord from "./ViewMedicalRecord";
import { DatePicker } from "antd";
import recordsService from "../services/recordsService.service";
export default function medicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [displayAllRecords, setDisplayAllRecords] = useState(true);
  const [datePicker, setDatePicker] = useState("");

  useEffect(() => {
    loadMedicalRecords();
  }, []);

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
  const dateFormat = "YYYY-MM-DD";
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <h3>Lista rezultata</h3>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          onClick={handleFilterInvalid}
          sx={{ height: 30, boxShadow: !displayAllRecords ? 1 : 0 }}
        >
          U procesu rada
        </Button>
        <Button
          onClick={handleShowAll}
          sx={{ height: 30, boxShadow: displayAllRecords ? 1 : 0 }}
        >
          Svi
        </Button>
        <DatePicker
          format={dateFormat}
          onChange={(e, date) => {
            setDatePicker(date);
          }}
        />
      </Grid>
      <List>
        {medicalRecords
          .filter((medicalRecord) => {
            return displayAllRecords ? true : medicalRecord.isValid === "false";
          })
          .filter((medicalRecord) => {
            return datePicker === ""
              ? true
              : medicalRecord.createdTime.split("T")[0].includes(datePicker);
          })
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
