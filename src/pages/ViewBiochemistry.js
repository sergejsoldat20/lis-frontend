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
import { Card as CardAntd } from "antd";
export default function ViewBiochemistry(id) {
  // id
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
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(
      `http://localhost:9000/biochemistries/${id}`,
      config
    );
    setBiochemistry(result.data);
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 200, textAlign: "center" }}
    >
      Naslov
      <Table aria-label="simple table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" align="left">
              s-creatinine
            </TableCell>
            <TableCell align="center">{biochemistry.screatinine}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">s-glucose</TableCell>
            <TableCell
              align="center"
              sx={{
                color: provjeriGranice(biochemistry.sglucose, 6, 7)
                  ? "red"
                  : "black",
              }}
            >
              {biochemistry.sglucose}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">s-urea</TableCell>
            <TableCell align="center">{biochemistry.surea}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
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
