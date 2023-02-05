import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import LoadData from "../utils/LoadData";
const ViewUrine = (props) => {
  const [urine, setUrine] = useState({
    urineSediment: "",
    uproteins: "",
  });
  useEffect(() => {
    loadUrine();
  });
  const loadUrine = async () => {
    // const jwt = localStorage.getItem("jwt");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // };
    // const result = await axios.get(
    //   `http://localhost:9000/urines/${props.id}`,
    //   config
    // );
    // setUrine(result.data);
    const result = LoadData(`urines/${props.id}`);
    setUrine((await result).data);
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
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
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
