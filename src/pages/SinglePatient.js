/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, ListItem, List } from "@mui/material";
import ReturnBiochemistryFunction from "../modules/ReturnBiochemistry";
import ReturnHematologyFunction from "../modules/ReturnHematology";
import ReturnUrineFunction from "../modules/ReturnUrine";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
export default function SinglePatient() {
  const [expanded, setExpanded] = useState([]);
  const [biochemistries, setBiochemistry] = useState([]);
  // const [hematologies, setHematology] = useState([]);
  // const [urines, setUrine] = useState([]);
  const handleExpandClick = (broj) => {
    if (expanded.includes(broj)) {
      const expandedCopy = expanded.filter((element) => {
        return element !== broj;
      });
      setExpanded(expandedCopy);
    } else {
      const expandedCopy = [...expanded];
      expandedCopy.push(broj);
      setExpanded(expandedCopy);
    }
  };
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
    loadBiochemistry();
    // loadHematology();
    // loadUrine();
  }, []);

  const loadPatientRecords = async () => {
    const result = await axios.get(
      `http://localhost:9000/patients/patient-records/${id}`
    );
    setMedicalRecords(result.data);
  };

  const loadPatient = async () => {
    const result = await axios.get(`http://localhost:9000/patients/${id}`);
    setPatient(result.data);
  };
  const loadBiochemistry = async () => {
    const result = await axios.get(`http://localhost:9000/biochemistries`);
    setBiochemistry(result.data);
    console.log(result.data);
    const bio = biochemistries.find((biochemistry) => biochemistry.id === 1);
    console.log(bio.screatinine + "ISPIS");
    console.log(bio.surea);
  };
  // const loadHematology = async () => {
  //   const result = await axios.get(`http://localhost:9000/hematologies`);
  //   setHematology(result.data);
  // };
  // const loadUrine = async () => {
  //   const result = await axios.get(`http://localhost:9000/urines`);
  //   setUrine(result.data);
  // };
  const valid = (x) => {
    if (x === "true") return "validan";
    else return "nije validan";
  };
  // function provjeriGranice(broj, a, b) {
  //   if (broj < a) return true;
  //   else if (broj > b) return true;
  //   else return false;
  //   sx={{  ide u celiju gdje se nalazi rezultat
  //     color: provjeriGranice(
  //       biochemistries.find(
  //         (biochemistry) =>
  //           biochemistry.id ===
  //           medicalRecord.biochemistryId
  //       ).sglucose,
  //       6,
  //       7
  //     )
  //       ? "red"
  //       : "black",
  //   }}
  // }
  // loadBiochemistry();
  return (
    <Grid container spacing={2}>
      <Card sx={{ minWidth: 600, minHeight: 500, maxHeight: 500 }}>
        <CardHeader title="Karton Pacijenta" />
        <CardContent sx={{ textAlign: "left" }}>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(1,1fr)",
            }}
          >
            <ListItem variant="body2">Ime: {patient.firstName}</ListItem>
            <ListItem variant="body2">Prezime: {patient.lastName}</ListItem>
            <ListItem variant="body2">
              Datum rodjenja: {patient.birthDate}
            </ListItem>
            <ListItem variant="body2">JMBG: {patient.jmbg}</ListItem>
            <ListItem variant="body2">Adresa: {patient.address}</ListItem>
            <ListItem variant="body2">Telefon: {patient.phone}</ListItem>
            <ListItem variant="body2">Grad: {patient.city}</ListItem>
            <ListItem variant="body2">
              Porodicni ljekar: {patient.familyDoctor}
            </ListItem>
          </Box>
        </CardContent>
      </Card>
      <List>
        {medicalRecords.map((medicalRecord, index) => (
          <Card sx={{ maxWidth: 600 }} key={index}>
            <CardContent sx={{ textAlign: "left" }}>
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: "repeat(3,1fr)",
                }}
              >
                <ListItem variant="body2">ICD: {medicalRecord.icd}</ListItem>
                <ListItem variant="body2">
                  Is Valid: {valid(medicalRecord.isValid)}
                </ListItem>
                <ListItem variant="body2">
                  Signed: {medicalRecord.userId}
                </ListItem>
              </Box>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: "space-evenly" }}>
              <IconButton
                onClick={() => handleExpandClick(index * 3)}
                sx={{
                  color: expanded.includes(index * 3) ? "blue" : "black",
                  fontSize: 16,
                  textDecoration: expanded.includes(index * 3)
                    ? "underline"
                    : "",
                }}
              >
                Biochemistry
              </IconButton>
              <IconButton
                onClick={() => handleExpandClick(index * 3 + 1)}
                aria-label="show more"
                sx={{
                  color: expanded.includes(index * 3 + 1) ? "blue" : "black",
                  fontSize: 16,
                  textDecoration: expanded.includes(index * 3 + 1)
                    ? "underline"
                    : "",
                }}
              >
                Hematology
              </IconButton>
              <IconButton
                onClick={() => handleExpandClick(index * 3 + 2)}
                aria-label="show more"
                sx={{
                  color: expanded.includes(index * 3 + 2) ? "blue" : "black",
                  fontSize: 16,
                  textDecoration: expanded.includes(index * 3 + 2)
                    ? "underline"
                    : "",
                }}
              >
                Urine
              </IconButton>
            </CardActions>
            <Collapse
              in={expanded.includes(index * 3)}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <ReturnBiochemistryFunction broj={444} />
              </CardContent>
            </Collapse>
            <Collapse
              in={expanded.includes(index * 3 + 1)}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {/* <ReturnHematologyFunction
                  hematology={hematologies.find(
                    (hematology) => hematology.id === medicalRecord.hematologyId
                  )}
                /> */}
              </CardContent>
            </Collapse>
            <Collapse
              in={expanded.includes(index * 3 + 2)}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {/* <ReturnUrineFunction
                  urine={urines.find(
                    (urine) => urine.id === medicalRecord.urineId
                  )}
                /> */}
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </List>
    </Grid>
  );
}
// eslint-disable-next-line no-lone-blocks
{
  /* <TableContainer component={Paper} sx={{ maxWidth: 200, textAlign: "center" }}>
  Biochemistry
  <Table aria-label="simple table">
    <TableBody>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" align="left">
          s-creatinine
        </TableCell>
        <TableCell align="center">
          {
            biochemistries.find(
              (biochemistry) => biochemistry.id === medicalRecord.biochemistryId
            ).screatinine
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">s-glucose</TableCell>
        <TableCell align="center">
          {
            biochemistries.find(
              (biochemistry) => biochemistry.id === medicalRecord.biochemistryId
            ).sglucose
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">s-urea</TableCell>
        <TableCell align="center">
          {
            biochemistries.find(
              (biochemistry) => biochemistry.id === medicalRecord.biochemistryId
            ).surea
          }
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>; */
}
