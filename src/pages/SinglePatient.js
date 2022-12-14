import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Descriptions } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  });

  const loadPatientRecords = async () => {
    const result = await axios.get(
      `http://localhost:9000/patients/patient-records/${id}`
    );
    setMedicalRecords(result.data);
  };

  const loadPatient = async () => {
    const result = await axios.get(`http://localhost:9000/patients/${id}`);
    console.log("aloeeeeee");
    console.log(result.data);
    setPatient(result.data);
  };

  const valid = (x) => {
    if (x === "true") return "validan";
    else return "nije validan";
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Item>
          <Descriptions title="Karton pacijenta">
            <Descriptions.Item label="Ime">
              {patient.firstName}
            </Descriptions.Item>
            <Descriptions.Item label="Prezime">
              {patient.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Datum rodjenja">
              {patient.birthDate}
            </Descriptions.Item>
            <Descriptions.Item label="JMBG">{patient.jmbg}</Descriptions.Item>
            <Descriptions.Item label="Adresa">
              {patient.address}
            </Descriptions.Item>
            <Descriptions.Item label="Telefon">
              {patient.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Grad">{patient.city}</Descriptions.Item>
            <Descriptions.Item label="Porodicni ljekar">
              {patient.familyDoctor}
            </Descriptions.Item>
          </Descriptions>
        </Item>
      </Grid>
      <Grid item xs={8}>
        <Item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="center">ICD</StyledTableCell>
                  <StyledTableCell align="center">Validacija</StyledTableCell>
                  <StyledTableCell align="center">Info</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalRecords.map((medicalRecord, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {medicalRecord.icd}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {valid(medicalRecord.isValid)}
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
    </Grid>
  );
}
