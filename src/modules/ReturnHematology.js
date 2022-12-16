import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function ReturnHematologyFunction(property) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 200, textAlign: "center" }}
    >
      Hematology
      <Table aria-label="simple table">
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" align="left">
              leukocytes
            </TableCell>
            <TableCell align="center">{property.leukocytes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">erythrocytes</TableCell>
            <TableCell align="center">{property.erythrocytes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">hemaglobin</TableCell>
            <TableCell align="center">{property.hemahlobin}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">hematrocit</TableCell>
            <TableCell align="center">{property.heamtrocit}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">platelets</TableCell>
            <TableCell align="center">{property.platelets}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
