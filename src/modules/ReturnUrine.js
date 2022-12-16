import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function ReturnUrineFunction(property) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 200, textAlign: "center" }}
    >
      Urine
      <Table aria-label="simple table">
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" align="left">
              urine sediment
            </TableCell>
            <TableCell align="center">{property.urineSediment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">u-proteins</TableCell>
            <TableCell align="center">{property.uproteins}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
