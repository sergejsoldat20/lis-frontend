import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import recordsService from "../services/recordsService.service";
import patientService from "../services/patientService.service";
import ProvjeriGranice from "../utils/ProvjeriGranice";
const ViewHematology = (props) => {
  const [hematology, setHematology] = useState({
    leukocytes: 0,
    erythrocytes: 0,
    hemaglobin: 0,
    hematocrit: 0,
    platelets: 0,
  });
  const [borders, setBorders] = useState({
    erythrocytesHigh: 0,
    erythrocytesLow: 0,
    hemaglobinHigh: 0,
    hemaglobinLow: 0,
    hematocritHigh: 0,
    hematocritLow: 0,
    leukocytesHigh: 0,
    leukocytesLow: 0,
    plateletsHigh: 0,
    plateletsLow: 0,
  });
  useEffect(() => {
    loadHematology();
    loadBorders();
    // console.log("ViewHematology");
  }, []);
  const loadHematology = () => {
    recordsService.getHematologyById(props.id).then((result) => {
      setHematology(result.data);
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
      <b>Hematologija</b>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                hematology.leukocytes,
                borders.leukocytesLow,
                borders.leukocytesHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">leukocytes</TableCell>
            <TableCell align="center">
              {hematology.leukocytes} [10^9/L]
            </TableCell>
            <TableCell align="center">
              ({borders.leukocytesLow} - {borders.leukocytesHigh})
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                hematology.erythrocytes,
                borders.erythrocytesLow,
                borders.erythrocytesHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">erythrocytes</TableCell>
            <TableCell align="center">
              {hematology.erythrocytes} [10^12/L]
            </TableCell>
            <TableCell align="center">
              ({borders.erythrocytesLow} - {borders.erythrocytesHigh})
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                hematology.hemaglobin,
                borders.hemaglobinLow,
                borders.hemaglobinHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">hemaglobin</TableCell>
            <TableCell align="center">{hematology.hemaglobin} [g/L]</TableCell>
            <TableCell align="center">
              ({borders.hemaglobinLow} - {borders.hemaglobinHigh})
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                hematology.hematocrit,
                borders.hematocritLow,
                borders.hematocritHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">hematocrit</TableCell>
            <TableCell align="center">{hematology.hematocrit} [%]</TableCell>
            <TableCell align="center">
              ({borders.hematocritLow} - {borders.hematocritHigh})
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(
                hematology.platelets,
                borders.plateletsLow,
                borders.plateletsHigh
              )
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">platelets</TableCell>
            <TableCell align="center">
              {hematology.platelets} [10^9/L]
            </TableCell>
            <TableCell align="center">
              ({borders.plateletsLow} - {borders.plateletsHigh})
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
ViewHematology.propTypes = {
  id: PropTypes.number,
  idPatient: PropTypes.number,
};
export default ViewHematology;
