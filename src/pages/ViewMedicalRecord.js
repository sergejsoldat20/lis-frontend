import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import { Grid, ListItem } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Button, Row, Col, message } from "antd";
import CheckIfNurse from "../utils/CheckIfNurse";
import ViewBiochemistry from "./ViewBiochemistry";
import ViewHematology from "./ViewHematology";
import ViewUrine from "./ViewUrine";
import LoadData from "../utils/LoadData";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
const ViewMedicalRecord = (props) => {
  const [expanded, setExpanded] = useState([]);
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
  const [medicalRecord, setMedicalRecord] = useState({
    id: 0,
    icd: "",
    isValid: "",
    hematologyId: 0,
    urineId: 0,
    biochemistryId: 0,
    patientId: 0,
    patientFirstName: "",
    patientLastName: "",
    userId: 0,
    createdTime: "",
  });
  useEffect(() => {
    loadMedicalRecord();
  });

  const onClickDeleteRecord = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    await axios.delete(
      `http://localhost:9000/medical-records/${props.id}`,
      config
    );
    message.success("Uspjesno ste obrisali nalaz");
  };
  const loadMedicalRecord = async () => {
    const result = LoadData(`medical-records/${props.id}`);
    setMedicalRecord((await result).data);
  };
  const valid = (x) => {
    if (x === "true") return true;
    else return false;
  };
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
  return (
    <Card
      sx={{
        borderBottom: 5,
        borderColor: "#D1D1D1",
      }}
    >
      <CardContent sx={{ textAlign: "left" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
          }}
        >
          <ListItem variant="body2">
            <b>{"Pacijent: "}</b>
            {medicalRecord.patientFirstName} {medicalRecord.patientLastName}
          </ListItem>
          <ListItem variant="body2">
            <b>ICD:</b> {medicalRecord.icd}
          </ListItem>
          <ListItem variant="body2">
            <b>Datum:</b> {medicalRecord.createdTime.split("T")[0]}
          </ListItem>
          <ListItem variant="body2">
            <b>Validan:</b>{" "}
            {valid(medicalRecord.isValid) === true ? (
              <CheckOutlined sx={{ color: "green" }} />
            ) : (
              <CloseOutlined sx={{ color: "red" }} />
            )}
          </ListItem>
        </Box>
      </CardContent>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          justifyContent: "space-between",
        }}
      >
        <ListItem variant="body2"></ListItem>
        <ListItem variant="body2">
          <CardActions
            disableSpacing
            sx={{
              display: "flex",

              margin: 0,
              spacing: 0,
            }}
          >
            <IconButton
              onClick={() => handleExpandClick(props.id)}
              sx={{
                color: expanded.includes(props.id) ? "blue" : "black",
                fontSize: 16,
                textDecoration: expanded.includes(props.id) ? "underline" : "",
              }}
            >
              <b>Pregledaj</b>
            </IconButton>
          </CardActions>
        </ListItem>
        <ListItem variant="body2">
          {!CheckIfNurse() && (
            <ListItem variant="body2">
              <Row gutter={8}>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => validate(medicalRecord.id)}
                  >
                    Validiraj
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    type="primary"
                    onClick={() => onClickDeleteRecord(medicalRecord.id)}
                  >
                    Obrisi
                  </Button>
                </Col>
              </Row>
            </ListItem>
          )}
        </ListItem>
      </Box>

      <Grid
        container
        spacing={0}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Grid item xs={4}>
          <Collapse
            in={expanded.includes(props.id)}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              {medicalRecord.biochemistryId != null ? (
                <ViewBiochemistry id={medicalRecord.biochemistryId} />
              ) : (
                <TableContainer></TableContainer>
              )}
            </CardContent>
          </Collapse>
        </Grid>
        <Grid item xs={4}>
          <Collapse
            in={expanded.includes(props.id)}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              {medicalRecord.hematologyId != null ? (
                <ViewHematology id={medicalRecord.hematologyId} />
              ) : (
                <TableContainer></TableContainer>
              )}
            </CardContent>
          </Collapse>
        </Grid>
        <Grid item xs={4}>
          <Collapse
            in={expanded.includes(props.id)}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              {medicalRecord.urineId != null ? (
                <ViewUrine id={medicalRecord.urineId} />
              ) : (
                <TableContainer></TableContainer>
              )}
            </CardContent>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
};
ViewMedicalRecord.propTypes = {
  id: PropTypes.number,
};
export default ViewMedicalRecord;
