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
import recordsService from "../services/recordsService.service";

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

  const validate = (id) => {
    recordsService.validate(id).then(function (response) {
      console.log(response.data);
      window.location.reload();
    });
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
    recordsService.deleteRecord(id).then((response) => {
      if (response.status === 200) {
        message.success("Uspjesno ste obrisali nalaz");
        navigate("/medical-records");
      }
    });
    /* const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    await axios.delete(`http://localhost:9000/medical-records/${id}`, config);
    message.success("Uspjesno ste obrisali nalaz");
    navigate("/medical-records"); */
  };

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
  const loadBiochemistry = () => {
    recordsService.getBiochemistries().then((result) => {
      setBiochemistry(result.data);
    });
    /* const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result =  axios.get(
      `http://localhost:9000/biochemistries`,
      config
    );
    setBiochemistry(result.data); */
  };
  const loadHematology = () => {
    recordsService.getHematologies().then((result) => {
      setHematology(result.data);
    });
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
          <Card sx={{ width: 1200, borderBottom: 1 }} key={index}>
            <CardContent sx={{ textAlign: "left" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                }}
              >
                <ListItem variant="body2">
                  <b>{"Pacijent: "}</b>
                  {returnFullNamePatient(medicalRecord.patientId)}
                </ListItem>
                <ListItem variant="body2">
                  <b>ICD: </b> {medicalRecord.icd}
                </ListItem>
                <ListItem variant="body2">
                  <b>Stanje: </b>
                  {valid(medicalRecord.isValid)}
                </ListItem>
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
              </Box>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                justifyContent: "space-around",
                margin: 0,
                spacing: 0,
              }}
            >
              <IconButton
                onClick={() => handleExpandClick(index * 3)}
                sx={{
                  color: expanded.includes(index * 3) ? "blue" : "black",
                  fontSize: 16,
                  textDecoration: expanded.includes(index * 3)
                    ? "underline"
                    : "",
                  width: 180,
                }}
              >
                <b>Biohemija</b>
              </IconButton>
              <IconButton
                onClick={() => handleExpandClick(index * 3 + 1)}
                aria-label="show more"
                sx={{
                  color: expanded.includes(index * 3 + 1) ? "blue" : "black",
                  fontSize: 16,
                  textDecoration: expanded.includes(index * 3 + 1)
                    ? "underline"
                    : "",
                  width: 180,
                }}
              >
                <b>Hematologija</b>
              </IconButton>
              <IconButton
                onClick={() => handleExpandClick(index * 3 + 2)}
                aria-label="show more"
                sx={{
                  color: expanded.includes(index * 3 + 2) ? "blue" : "black",
                  fontSize: 16,
                  textDecoration: expanded.includes(index * 3 + 2)
                    ? "underline"
                    : "",
                  width: 180,
                }}
              >
                <b>Urin</b>
              </IconButton>
            </CardActions>
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
              <Grid item xs>
                <Collapse
                  in={expanded.includes(index * 3)}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    {biochemistries.find((biochemistry) => {
                      return biochemistry.id === medicalRecord.biochemistryId;
                    }) !== undefined ? (
                      <TableContainer
                        component={Paper}
                        sx={{
                          textAlign: "center",
                          // backgroundColor: "gray",
                        }}
                      >
                        {/* Biohemija */}
                        <Table aria-label="simple table">
                          <TableBody width="">
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                s-creatinine
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  color: checkBoundaries(
                                    Object.values(
                                      biochemistries.find((biochemistry) => {
                                        return (
                                          biochemistry.id ===
                                          medicalRecord.biochemistryId
                                        );
                                      })
                                    )[1],
                                    6.1,
                                    6.6
                                  )
                                    ? "red"
                                    : "black",
                                }}
                              >
                                {
                                  Object.values(
                                    biochemistries.find((biochemistry) => {
                                      return (
                                        biochemistry.id ===
                                        medicalRecord.biochemistryId
                                      );
                                    })
                                  )[1]
                                }
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">s-glucose</TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    biochemistries.find((biochemistry) => {
                                      return (
                                        biochemistry.id ===
                                        medicalRecord.biochemistryId
                                      );
                                    })
                                  )[2]
                                }
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">s-urea</TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    biochemistries.find((biochemistry) => {
                                      return (
                                        biochemistry.id ===
                                        medicalRecord.biochemistryId
                                      );
                                    })
                                  )[3]
                                }
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <TableContainer></TableContainer>
                    )}
                  </CardContent>
                </Collapse>
              </Grid>
              <Grid item xs>
                <Collapse
                  in={expanded.includes(index * 3 + 1)}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    {hematologies.find((hematology) => {
                      return hematology.id === medicalRecord.hematologyId;
                    }) !== undefined ? (
                      <TableContainer
                        component={Paper}
                        sx={{
                          textAlign: "center",
                          // backgroundColor: "gray",
                        }}
                      >
                        {/* Hematologija */}
                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                leukocytes
                              </TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    hematologies.find((hematology) => {
                                      return (
                                        hematology.id ===
                                        medicalRecord.hematologyId
                                      );
                                    })
                                  )[1]
                                }
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">erythrocytes</TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    hematologies.find((hematology) => {
                                      return (
                                        hematology.id ===
                                        medicalRecord.hematologyId
                                      );
                                    })
                                  )[2]
                                }
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">hemaglobin</TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    hematologies.find((hematology) => {
                                      return (
                                        hematology.id ===
                                        medicalRecord.hematologyId
                                      );
                                    })
                                  )[3]
                                }
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">hematocrit</TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    hematologies.find((hematology) => {
                                      return (
                                        hematology.id ===
                                        medicalRecord.hematologyId
                                      );
                                    })
                                  )[4]
                                }
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">platelets</TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    hematologies.find((hematology) => {
                                      return (
                                        hematology.id ===
                                        medicalRecord.hematologyId
                                      );
                                    })
                                  )[5]
                                }
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <TableContainer></TableContainer>
                    )}
                  </CardContent>
                </Collapse>
              </Grid>
              <Grid item xs>
                <Collapse
                  in={expanded.includes(index * 3 + 2)}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    {urines.find((urine) => {
                      return urine.id === medicalRecord.urineId;
                    }) !== undefined ? (
                      <TableContainer
                        component={Paper}
                        sx={{
                          textAlign: "center",
                          // backgroundColor: "gray",
                        }}
                      >
                        {/* Urin */}
                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                urine sediment
                              </TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    urines.find((urine) => {
                                      return urine.id === medicalRecord.urineId;
                                    })
                                  )[1]
                                }
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">u-proteins</TableCell>
                              <TableCell align="center">
                                {
                                  Object.values(
                                    urines.find((urine) => {
                                      return urine.id === medicalRecord.urineId;
                                    })
                                  )[2]
                                }
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <TableContainer></TableContainer>
                    )}
                  </CardContent>
                </Collapse>
              </Grid>
            </Grid>
          </Card>
        ))}
      </List>
    </Grid>
  );
}
