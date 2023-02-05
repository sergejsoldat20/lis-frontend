/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, ListItem, List } from "@mui/material";
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

export default function medicalRecords() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState([]);
  const [biochemistries, setBiochemistry] = useState([]);
  const [hematologies, setHematology] = useState([]);
  const [urines, setUrine] = useState([]);
  const [patients, setPatients] = useState([]);
  const handleExpandClick = (number) => {
    if (expanded.includes(number)) {
      const expandedCopy = expanded.filter((element) => {
        return element !== number;
      });
      setExpanded(expandedCopy);
    } else {
      const expandedCopy = [...expanded];
      expandedCopy.push(number);
      setExpanded(expandedCopy);
    }
  };
  const [medicalRecords, setMedicalRecords] = useState([]);

  const validate = async (id) => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.post(
      `http://localhost:9000/medical-records/validate/${id}`,
      "",
      config
    );
    console.log(result.data);
    window.location.reload();
  };

  useEffect(() => {
    loadMedicalRecords();
    loadBiochemistry();
    loadHematology();
    loadUrine();
    loadPatients();
    //  loadUsers();
  }, medicalRecords);
  const onClickDeleteRecord = async (id) => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    await axios.delete(`http://localhost:9000/medical-records/${id}`, config);
    message.success("Uspjesno ste obrisali nalaz");
    navigate("/medical-records");
  };

  const loadMedicalRecords = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(
      "http://localhost:9000/medical-records",
      config
    );
    setMedicalRecords(
      result.data.sort(
        (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
      )
    );
  };
  const loadBiochemistry = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(
      `http://localhost:9000/biochemistries`,
      config
    );
    setBiochemistry(result.data);
  };
  const loadHematology = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(
      `http://localhost:9000/hematologies`,
      config
    );
    setHematology(result.data);
  };
  const loadUrine = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(`http://localhost:9000/urines`, config);
    setUrine(result.data);
  };
  const loadPatients = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(`http://localhost:9000/patients`, config);
    setPatients(result.data);
  };

  const valid = (x) => {
    if (x === "true") return "validan";
    else return "nije validan";
  };
  function checkBoundaries(broj, a, b) {
    if (broj < a) return true;
    else if (broj > b) return true;
    else return false;
  }
  function returnFullNamePatient(id) {
    for (const key in patients) {
      if (patients[key].id === id) {
        return `${patients[key].firstName} ${patients[key].lastName}`;
      }
    }
  }
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
