import React, { useEffect, useState } from "react";
// import axios from "axios";
import { styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import ProvjeriGranice from "../utils/ProvjeriGranice";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import recordsService from "../services/recordsService.service";
import ProvjeriGranice from "../utils/ProvjeriGranice";
const ViewHematology = (props) => {
  const [hematology, setHematology] = useState({
    leukocytes: 0,
    erythrocytes: 0,
    hemaglobin: 0,
    hematocrit: 0,
    platelets: 0,
  });
  useEffect(() => {
    loadHematology();
  });
  const loadHematology = () => {
    recordsService.getHematologyById(props.id).then((result) => {
      setHematology(result.data);
    });
  };

  const StyledTableContainer = styled(TableContainer)`
    background-color: lightgray;
    text-align: center;
  `;

  return (
    <StyledTableContainer
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
              backgroundColor: ProvjeriGranice(hematology.leukocytes, 4, 8)
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">leukocytes</TableCell>
            <TableCell align="center">{hematology.leukocytes}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(hematology.erythrocytes, 4, 8)
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">erythrocytes</TableCell>
            <TableCell align="center">{hematology.erythrocytes}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(hematology.hemaglobin, 4, 8)
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">hemaglobin</TableCell>
            <TableCell align="center">{hematology.hemaglobin}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(hematology.hematocrit, 4, 8)
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">hematocrit</TableCell>
            <TableCell align="center">{hematology.hematocrit}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(hematology.platelets, 4, 8)
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">platelets</TableCell>
            <TableCell align="center">{hematology.platelets}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
ViewHematology.propTypes = {
  id: PropTypes.number,
};
export default ViewHematology;
