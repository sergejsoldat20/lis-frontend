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
import ProvjeriGranice from "../utils/ProvjeriGranice";
const ViewBiochemistry = (props) => {
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
        boxShadow: 6,
      }}
    >
      <b>Biohemija</b>
      <Table aria-label="simple table">
        <TableBody width="">
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(biochemistry.screatinine, 7.5, 8)
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">s-creatinine</TableCell>
            <TableCell align="center">{biochemistry.screatinine}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(biochemistry.sglucose, 7.5, 8)
                ? "#FF695D"
                : "white",
            }}
          >
            <TableCell align="left">s-glucose</TableCell>
            <TableCell align="center">{biochemistry.sglucose}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: ProvjeriGranice(biochemistry.surea, 7.5, 8)
                ? "#FF695D"
                : "white",
            }}
          >
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
