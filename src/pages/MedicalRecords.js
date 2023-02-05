/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, List } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import CheckIfNurse from "../utils/CheckIfNurse";
import ViewMedicalRecord from "./ViewMedicalRecord";
import recordsService from "../services/recordsService.service";
export default function medicalRecords() {
  // const navigate = useNavigate();
  const [expanded, setExpanded] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    loadMedicalRecords();
  });

  const loadMedicalRecords = async () => {
    recordsService
      .getAll()
      .then((result) => {
        setMedicalRecords(
          result.data.sort(
            (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const valid = (x) => {
    if (x === "true") return "validan";
    else return "nije validan";
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <h3>Lista rezultata</h3>
      <List>
        {medicalRecords.map((medicalRecord, index) => (
          <ViewMedicalRecord
            id={medicalRecord.id}
            key={index}
            sx={{ width: 1200 }}
          />
        ))}
      </List>
    </Grid>
  );
}
