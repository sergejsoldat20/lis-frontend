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
export default function ViewBiochemistry() {
  const [biochemistries, setBiochemistry] = useState([]);
  useEffect(() => {
    loadBiochemistry();
  });
  const loadBiochemistry = async () => {
    const result = await axios.get(
      `http://localhost:9000/results/biochemistry`
    );
    setBiochemistry(result.data);
  };

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">S-Glucose</StyledTableCell>
            <StyledTableCell align="center">S-Urea</StyledTableCell>
            <StyledTableCell align="center">S-Creatinine</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {biochemistries.map((biochemistry, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                {biochemistry.sglucose}
              </StyledTableCell>
              <StyledTableCell align="center">
                {biochemistry.surea}
              </StyledTableCell>
              <StyledTableCell align="center">
                {biochemistry.screatinine}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
