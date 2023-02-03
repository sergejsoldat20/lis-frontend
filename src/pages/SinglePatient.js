/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, ListItem, List } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
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
import ViewMedicalRecord from "./ViewMedicalRecord";
export default function SinglePatient() {
  const [expanded, setExpanded] = useState([]);
  const [biochemistries, setBiochemistry] = useState([]);
  const [hematologies, setHematology] = useState([]);
  const [urines, setUrine] = useState([]);
  const [users, setUsers] = useState([]);

  const handleExpandClick = (broj) => {
    if (expanded.includes(broj)) {
      const expandedCopy = expanded.filter((element) => {
        return element !== broj;
      });
      setExpanded(expandedCopy);
    } else {
      const expandedCopy = [...expanded];
      expandedCopy.push(broj);
      setExpanded(expandedCopy);
    }
  };
  const { id } = useParams();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    jmbg: "",
    gender: "",
    address: "",
    phone: "",
    city: "",
    familyDoctor: "",
  });

  useEffect(() => {
    loadPatient();
    loadPatientRecords();
    loadBiochemistry();
    loadHematology();
    loadUrine();
    loadUsers();
  }, []);

  const loadPatientRecords = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(
      `http://localhost:9000/patients/patient-records/${id}`,
      config
    );
    setMedicalRecords(result.data);
  };

  const loadPatient = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(
      `http://localhost:9000/patients/${id}`,
      config
    );
    setPatient(result.data);
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
  const loadUsers = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(`http://localhost:9000/users`, config);
    setUsers(result.data);
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
  function returnFullNameUser(id) {
    for (const key in users) {
      if (users[key].id === id) {
        return `${users[key].firstName} ${users[key].lastName}`;
      }
    }
    return "";
  }
  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <Card>
          {/* <div className="container"> */}
          {/* <div className="rom"> */}
          <div className="border rounder p-2 mt-2 shadow">
            <h4 className="text-center m-4">Informacije o pacijentu:</h4>
            <div className="card">
              <div className="card-header">
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1,
                      gridTemplateColumns: "repeat(1,1fr)",
                    }}
                  >
                    <ListItem variant="body2">
                      <b>Ime</b> : {patient.firstName}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Prezime</b>: {patient.lastName}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Datum rođenja</b>: {patient.birthDate}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>JMBG</b>: {patient.jmbg}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Adresa</b>: {patient.address}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Telefon</b>: {patient.phone}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Grad</b>: {patient.city}
                    </ListItem>
                    <ListItem variant="body2">
                      <b>Porodnicni ljekar</b>: {patient.familyDoctor}
                    </ListItem>
                  </Box>
                </CardContent>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <List>
          {medicalRecords.map((medicalRecord, index) => (
            <ViewMedicalRecord id={medicalRecord.id} key={index} />
          ))}
        </List>
        {/* <List>
          <div className="container"> 
           <div className="rom"> 
          <div className="border rounder p-2 shadow">
            <h4 className="text-center m-4">Nalazi:</h4>
            <div className="card">
              <div className="card-header">
                {medicalRecords.map((medicalRecord, index) => (
                  <Card sx={{ borderBottom: 1 }} key={index}>
                    <CardContent sx={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          display: "grid",
                          gap: 1,
                          gridTemplateColumns: "repeat(3,1fr)",
                        }}
                      >
                        <ListItem variant="body2">
                          ICD: {medicalRecord.icd}
                        </ListItem>
                        <ListItem variant="body2">
                          Is Valid: {valid(medicalRecord.isValid)}
                        </ListItem>
                        <ListItem variant="body2">
                          Validirao: {returnFullNameUser(medicalRecord.userId)}
                        </ListItem>
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
                          color: expanded.includes(index * 3)
                            ? "blue"
                            : "black",
                          fontSize: 16,
                          textDecoration: expanded.includes(index * 3)
                            ? "underline"
                            : "",
                          width: 180,
                        }}
                      >
                        Biohemija
                      </IconButton>
                      <IconButton
                        onClick={() => handleExpandClick(index * 3 + 1)}
                        aria-label="show more"
                        sx={{
                          color: expanded.includes(index * 3 + 1)
                            ? "blue"
                            : "black",
                          fontSize: 16,
                          textDecoration: expanded.includes(index * 3 + 1)
                            ? "underline"
                            : "",
                          width: 180,
                        }}
                      >
                        Hematologija
                      </IconButton>
                      <IconButton
                        onClick={() => handleExpandClick(index * 3 + 2)}
                        aria-label="show more"
                        sx={{
                          color: expanded.includes(index * 3 + 2)
                            ? "blue"
                            : "black",
                          fontSize: 16,
                          textDecoration: expanded.includes(index * 3 + 2)
                            ? "underline"
                            : "",
                          width: 180,
                        }}
                      >
                        Urin
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
                              return (
                                biochemistry.id === medicalRecord.biochemistryId
                              );
                            }) !== undefined ? (
                              <TableContainer
                                component={Paper}
                                sx={{
                                  textAlign: "center",
                                  // backgroundColor: "gray",
                                }}
                              >
                                Biohemija 
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
                                        s-creatinine
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          color: checkBoundaries(
                                            Object.values(
                                              biochemistries.find(
                                                (biochemistry) => {
                                                  return (
                                                    biochemistry.id ===
                                                    medicalRecord.biochemistryId
                                                  );
                                                }
                                              )
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
                                            biochemistries.find(
                                              (biochemistry) => {
                                                return (
                                                  biochemistry.id ===
                                                  medicalRecord.biochemistryId
                                                );
                                              }
                                            )
                                          )[1]
                                        }
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">
                                        s-glucose
                                      </TableCell>
                                      <TableCell align="center">
                                        {
                                          Object.values(
                                            biochemistries.find(
                                              (biochemistry) => {
                                                return (
                                                  biochemistry.id ===
                                                  medicalRecord.biochemistryId
                                                );
                                              }
                                            )
                                          )[2]
                                        }
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">s-urea</TableCell>
                                      <TableCell align="center">
                                        {
                                          Object.values(
                                            biochemistries.find(
                                              (biochemistry) => {
                                                return (
                                                  biochemistry.id ===
                                                  medicalRecord.biochemistryId
                                                );
                                              }
                                            )
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
                              return (
                                hematology.id === medicalRecord.hematologyId
                              );
                            }) !== undefined ? (
                              <TableContainer
                                component={Paper}
                                sx={{
                                  textAlign: "center",
                                  // backgroundColor: "gray",
                                }}
                              >
                                 Hematologija 
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
                                      <TableCell align="left">
                                        erythrocytes
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
                                          )[2]
                                        }
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">
                                        hemaglobin
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
                                          )[3]
                                        }
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">
                                        hematocrit
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
                                          )[4]
                                        }
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">
                                        platelets
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
                                 Urin 
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
                                              return (
                                                urine.id ===
                                                medicalRecord.urineId
                                              );
                                            })
                                          )[1]
                                        }
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">
                                        u-proteins
                                      </TableCell>
                                      <TableCell align="center">
                                        {
                                          Object.values(
                                            urines.find((urine) => {
                                              return (
                                                urine.id ===
                                                medicalRecord.urineId
                                              );
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
              </div>
            </div>
          </div>
          {/* </div> 
          {/* </div> 
        </List> */}
      </Grid>
    </Grid>
  );
}
