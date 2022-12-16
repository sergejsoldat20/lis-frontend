import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function ReturnBiochemistryFunction(property) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 200, textAlign: "center" }}
    >
      Biochemistry
      <Table aria-label="simple table">
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" align="left">
              s-creatinine
            </TableCell>
            <TableCell align="center">{property}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">s-glucose</TableCell>
            <TableCell align="center">2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">s-urea</TableCell>
            <TableCell align="center">3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
