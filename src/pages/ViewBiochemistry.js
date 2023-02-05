/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import recordsService from "../services/recordsService.service";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import LoadData from "../utils/LoadData";
const ViewBiochemistry = (props) => {
  function provjeriGranice(broj, a, b) {
    if (broj < a) return true;
    else if (broj > b) return true;
    else return false;
  }
  const [biochemistry, setBiochemistry] = useState({
    screatinine: 0,
    sglucose: 0,
    surea: 0,
  });

  useEffect(() => {
    loadBiochemistry();
  });

  const loadBiochemistry = () => {
    recordsService.getBiochemistryById(props.id).then((result) => {
      setBiochemistry(result.data);
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
    <StyledTableContainer component={Paper}>
      <b>Biohemija</b>
      <Table
        aria-label="simple table"
        sx={{
          // textAlign: "center",
          backgroundColor: "gray",
        }}
      >
        <TableBody width="">
          <StyledTableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            <TableCell align="left">s-creatinine</TableCell>
            <TableCell align="center">{biochemistry.screatinine}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell align="left">s-glucose</TableCell>
            <TableCell align="center">{biochemistry.sglucose}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell align="left">s-urea</TableCell>
            <TableCell align="center">{biochemistry.surea}</TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
ViewBiochemistry.propTypes = {
  id: PropTypes.number,
};
export default ViewBiochemistry;
// sx={{
//   color: provjeriGranice(biochemistry.surea, 6, 8)
//     ? "red"
//     : "black",
// }}
// sx={{
//   color: provjeriGranice(biochemistry.screatinine, 7.5, 8)
//     ? "red"
//     : "black",
// }}
