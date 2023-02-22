/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Grid, List, Button } from "@mui/material";
import ViewMedicalRecord from "./ViewMedicalRecord";
import { DatePicker, Select } from "antd";
import recordsService from "../services/recordsService.service";
import { Label } from "@mui/icons-material";

export default function medicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [displayAllRecords, setDisplayAllRecords] = useState(true);
  const [datePicker, setDatePicker] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [deletedId, setDeletedId] = useState(0);
  const [validatedId, setValidatedId] = useState(0);
  const allPageSizes = [3, 5, 10];
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const [recordsSize, setRecordsSize] = useState(0);
  useEffect(() => {
    if (displayAllRecords === true) {
      loadMedicalRecords();
    } else {
      loadInvalidRecords();
    }
  }, [
    currentPage,
    datePicker,
    displayAllRecords,
    recordsSize,
    deletedId,
    validatedId,
    pageSize,
  ]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const loadMedicalRecords = () => {
    if (datePicker === "") {
      recordsService.getPaginated(currentPage, pageSize).then((result) => {
        setMedicalRecords(result.data.content);
        setRecordsSize(result.data.totalElements);
        // console.log(result.data.content);
      });
    } else {
      recordsService
        .getAllByDate(currentPage, pageSize, datePicker)
        .then((result) => {
          setMedicalRecords(result.data.content);
          setRecordsSize(result.data.totalElements);
        });
    }
  };
  const onChange = (value) => {
    setCurrentPage(0);
    setPageSize(value);
  };
  const loadInvalidRecords = () => {
    recordsService.getInvalidPaginated(currentPage, pageSize).then((result) => {
      setMedicalRecords(result.data.content);
      setRecordsSize(result.data.totalElements);
    });
  };
  const handleFilterInvalid = () => {
    setCurrentPage(0);
    setDisplayAllRecords(false);
  };

  const handleFilterByDate = () => {
    setCurrentPage(0);
  };

  const handleShowAll = () => {
    setCurrentPage(0);
    setDisplayAllRecords(true);
  };
  const deleteMedicalRecord = (id) => {
    setDeletedId(id);
    setMedicalRecords(
      medicalRecords.filter((medicalRecord) => medicalRecord.id !== id)
    );
  };
  const validateMedicalRecord = (id) => {
    if (!displayAllRecords) setValidatedId(id);
    setMedicalRecords(
      medicalRecords.map((medicalRecord) => {
        if (medicalRecord.id === id) {
          medicalRecord.isValid = true;
        }
        return medicalRecord;
      })
    );
  };
  const dateFormat = "YYYY-MM-DD";
  return (
    <Grid
      container
      sx={{
        spacing: 0,
        direction: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>Lista rezultata</h3>
      <Grid
        container
        item
        sx={{
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
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
        {displayAllRecords && (
          <DatePicker
            format={dateFormat}
            onChange={(e, date) => {
              setDatePicker(date);
              handleFilterByDate();
            }}
          />
        )}
      </Grid>
      <List>
        {medicalRecords.map((medicalRecord) => (
          <ViewMedicalRecord
            id={medicalRecord.id}
            handleDelete={deleteMedicalRecord}
            handleValidate={validateMedicalRecord}
            key={medicalRecord.id}
          />
        ))}
      </List>
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
        <Select
          defaultValue={allPageSizes[0]}
          placeholder="Velicina straince"
          optionFilterProp="children"
          style={{
            width: 60,
          }}
          onChange={onChange}
          options={allPageSizes.map((size) => ({
            label: size,
            value: size,
          }))}
        />
      </Grid>
    </Grid>
  );
}
