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
export default function ViewHematology() {
  const [hematologies, setHematology] = useState([]);
  useEffect(() => {
    loadHematology();
  });
  const loadHematology = async () => {
    const result = await axios.get(`http://localhost:9000/hematologies`);
    setHematology(result.data);
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
    <TableContainer component={Paper} sx={{ width: 700, borderRadius: 3 }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">Leukocytes</StyledTableCell>
            <StyledTableCell align="center">Erythrocytes</StyledTableCell>
            <StyledTableCell align="center">Hemaglobin</StyledTableCell>
            <StyledTableCell align="center">Hematocrit</StyledTableCell>
            <StyledTableCell align="center">Platelets</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hematologies.map((hematology, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  color: provjeriGranice(hematology.leukocytes, 5.5, 9)
                    ? "red"
                    : "black",
                }}
              >
                {hematology.leukocytes}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  color: provjeriGranice(hematology.erythrocytes, 4, 10)
                    ? "red"
                    : "black",
                }}
              >
                {hematology.erythrocytes}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  color: provjeriGranice(hematology.hemaglobin, 7, 8)
                    ? "red"
                    : "black",
                }}
              >
                {hematology.hemaglobin}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  color: provjeriGranice(hematology.hematocrit, 7, 8)
                    ? "red"
                    : "black",
                }}
              >
                {hematology.hematocrit}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  color: provjeriGranice(hematology.platelets, 7, 8)
                    ? "red"
                    : "black",
                }}
              >
                {hematology.platelets}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function provjeriGranice(broj, a, b) {
  if (broj < a) return true;
  else if (broj > b) return true;
  else return false;
}
