import React, { useEffect, useState } from "react";
import recordsService from "../services/recordsService.service";
import { Paper, styled } from "@mui/material";
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

  const StyledTableContainer = styled(TableContainer)`
    background-color: lightgray;
    text-align: center;
  `;

  const StyledTableRow = styled(TableRow)`
    background-color: lightgray;
  `;

  return (
    <StyledTableContainer
      component={Paper}
      sx={{
        textAlign: "center",
        boxShadow: 6,
      }}
    >
      <b>Urin</b>
      <Table aria-label="simple table">
        <TableBody width="">
          <StyledTableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            <TableCell align="left">urine sediment</TableCell>
            <TableCell align="center">{urine.urineSediment}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell align="left">u-proteins</TableCell>
            <TableCell align="center">{urine.uproteins}</TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
ViewUrine.propTypes = {
  id: PropTypes.number,
};
export default ViewUrine;
