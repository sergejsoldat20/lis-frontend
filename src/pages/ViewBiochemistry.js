/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import recordsService from "../services/recordsService.service";
import patientService from "../services/patientService.service";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import ProvjeriGranice from "../utils/ProvjeriGranice";
const ViewBiochemistry = (props) => {
  const [biochemistry, setBiochemistry] = useState({
    screatinine: 0,
    sglucose: 0,
    surea: 0,
  });
  const [borders, setBorders] = useState({
    screatinineHigh: 0,
    screatinineLow: 0,
    sglucoseHigh: 0,
    sglucoseLow: 0,
    sureaHigh: 0,
    sureaLow: 0,
  });
  useEffect(() => {
    loadBiochemistry();
    loadBorders();
    // console.log("ViewBiochemistry");
  }, []);

  const loadBiochemistry = () => {
    recordsService.getBiochemistryById(props.id).then((result) => {
      setBiochemistry(result.data);
    });
  };
  const loadBorders = () => {
    patientService.getGenderById(props.idPatient).then((result) => {
      recordsService.getBordersById(result.data).then((result) => {
        setBorders(result.data);
      });
    });
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        textAlign: "center",
        boxShadow: 6,
      }}
    >
      <b>Biohemija</b>
      <Table aria-label="simple table" sx={{ fontSize: 12 }}>
        <TableBody width="" sx={{ fontSize: 12 }}>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                biochemistry.screatinine,
                borders.screatinineLow,
                borders.screatinineHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">s-kreatinin</TableCell>
            <TableCell align="center">
              {biochemistry.screatinine} [mmol/L]
            </TableCell>
            <TableCell align="center">
              ({borders.screatinineLow} - {borders.screatinineHigh})
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                biochemistry.sglucose,
                borders.sglucoseLow,
                borders.sglucoseHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">s-glukoza</TableCell>
            <TableCell align="center">
              {biochemistry.sglucose} [mmol/L]
            </TableCell>
            <TableCell align="center">
              ({borders.sglucoseLow} - {borders.sglucoseHigh})
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                biochemistry.surea,
                borders.sureaLow,
                borders.sureaHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">s-urea</TableCell>
            <TableCell align="center">{biochemistry.surea} [μmol/L]</TableCell>
            <TableCell align="center">
              ({borders.sureaLow} - {borders.sureaHigh})
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
ViewBiochemistry.propTypes = {
  id: PropTypes.number,
  idPatient: PropTypes.number,
};
export default ViewBiochemistry;
