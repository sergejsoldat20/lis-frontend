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

  const StyledTableRow = styled(TableRow)`
    background-color: lightgray;
  `;
  return (
    <StyledTableContainer
      component={Paper}
      sx={{
        textAlign: "center",
      }}
    >
      <b>Hematologija</b>
      <Table aria-label="simple table">
        <TableBody>
          <StyledTableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            <TableCell align="left">leukocytes</TableCell>
            <TableCell align="center">{hematology.leukocytes}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell align="left">erythrocytes</TableCell>
            <TableCell align="center">{hematology.erythrocytes}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell align="left">hemaglobin</TableCell>
            <TableCell align="center">{hematology.hemaglobin}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell align="left">hematocrit</TableCell>
            <TableCell align="center">{hematology.hematocrit}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell align="left">platelets</TableCell>
            <TableCell align="center">{hematology.platelets}</TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
ViewHematology.propTypes = {
  id: PropTypes.number,
};
export default ViewHematology;
