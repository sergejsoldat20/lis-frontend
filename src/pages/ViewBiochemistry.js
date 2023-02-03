/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const loadBiochemistry = async () => {
    const result = LoadData(`biochemistries/${props.id}`);
    setBiochemistry((await result).data);
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        textAlign: "center",
        // backgroundColor: "gray",
      }}
    >
      <b>Biohemija</b>
      <Table aria-label="simple table">
        <TableBody width="">
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            <TableCell align="left">s-creatinine</TableCell>
            <TableCell align="center">{biochemistry.screatinine}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">s-glucose</TableCell>
            <TableCell align="center">{biochemistry.sglucose}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">s-urea</TableCell>
            <TableCell align="center">{biochemistry.surea}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
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
