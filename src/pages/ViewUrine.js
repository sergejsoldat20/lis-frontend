import React, { useEffect, useState } from "react";
import recordsService from "../services/recordsService.service";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
const ViewUrine = (props) => {
  const [urine, setUrine] = useState({
    urineSediment: "",
    uproteins: "",
  });
  useEffect(() => {
    loadUrine();
  });
  const loadUrine = () => {
    recordsService.getUrineById(props.id).then((result) => {
      setUrine(result.data);
    });
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        textAlign: "center",
        boxShadow: 6,
      }}
    >
      <b>Urin</b>
      <Table aria-label="simple table">
        <TableBody width="">
          <TableRow>
            <TableCell align="left">urine sediment</TableCell>
            <TableCell align="center">{urine.urineSediment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">u-proteins</TableCell>
            <TableCell align="center">{urine.uproteins}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
ViewUrine.propTypes = {
  id: PropTypes.number,
};
export default ViewUrine;
