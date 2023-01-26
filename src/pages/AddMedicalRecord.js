/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function AddMedicalRecord() {
  /* const [biochemistryId, setBiochemistryId] = useState(null);
  const [hematologyId, setHematologyId] = useState(null);
  const [urineId, setUrineId] = useState(null); */
  const navigate = useNavigate();
  const [bioIsLocked, setBioIsLocked] = useState(false);
  const [hemIsLocked, setHemIsLocked] = useState(false);
  const [uriIsLocked, setUriIsLocked] = useState(false);

  const [medicalRecord, setMedicalRecord] = useState({
    icd: "",
    isValid: "",
    hematologyId: null,
    urineId: null,
    biochemistryId: null,
    patientId: null,
    userId: 1,
  });
  const [biochemistry, setBiochemistry] = useState({
    surea: "",
    sglucose: "",
    screatinine: "",
  });

  const [hematology, setHematology] = useState({
    leukocytes: "",
    erythrocytes: "",
    hemaglobin: "",
    hematocrit: "",
    platelets: "",
  });

  const [urine, setUrine] = useState({
    urineSediment: "",
    uproteins: "",
  });

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);
  const loadPatients = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get("http://localhost:9000/patients", config);
    setPatients(result.data);
  };

  const { icd, isValid } = medicalRecord;
  const { surea, sglucose, screatinine } = biochemistry;
  const { leukocytes, erythrocytes, hemaglobin, hematocrit, platelets } =
    hematology;
  const { urineSediment, uproteins } = urine;

  const onBiochemistryChange = (e) => {
    setBiochemistry({ ...biochemistry, [e.target.name]: e.target.value });
  };

  const onHematologyChange = (e) => {
    setHematology({ ...hematology, [e.target.name]: e.target.value });
  };

  const onUrineChange = (e) => {
    setUrine({ ...urine, [e.target.name]: e.target.value });
  };

  const onMedicalRecordChange = (e) => {
    setMedicalRecord({ ...medicalRecord, [e.target.name]: e.target.value });
  };

  const onMedicalRecordSubmit = async (e) => {
    console.log(medicalRecord.data);
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const response = await axios.post(
      "http://localhost:9000/medical-records",
      medicalRecord,
      config
    );
    if (response.status === 200) {
      message.success("Uspjesno ste dodali nalaz!");
      navigate("/medical-records");
    } else {
      message.error("Niste dodali nalaz");
      navigate("/");
    }
  };

  const onBiochemistrySubmit = async (e) => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const response = await axios.post(
      "http://localhost:9000/biochemistries",
      biochemistry,
      config
    );
    if (response.status === 201) {
      medicalRecord.biochemistryId = response.data.id;
      message.success("Uspjesno ste dodali biohemiju u nalaz.");
      if (!bioIsLocked) {
        // Perform the button's intended action
        console.log("Button clicked!");
        setBioIsLocked(true);
      }
    }
  };

  const onHematologySubmit = async (e) => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const response = await axios.post(
      "http://localhost:9000/hematologies",
      hematology,
      config
    );
    if (response.status === 201) {
      medicalRecord.hematologyId = response.data.id;
      message.success("Uspjesno ste dodali hematologiju u nalaz.");
      if (!hemIsLocked) {
        // Perform the button's intended action
        console.log("Button clicked!");
        setHemIsLocked(true);
      }
    }
  };

  const onUrineSubmit = async (e) => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const response = await axios.post(
      "http://localhost:9000/urines",
      urine,
      config
    );
    if (response.status === 201) {
      medicalRecord.urineId = response.data.id;
      message.success("Uspjesno ste dodali urin u nalaz.");
      if (!uriIsLocked) {
        // Perform the button's intended action
        console.log("Button clicked!");
        setUriIsLocked(true);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <div className="container">
          <div className="rom">
            <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow">
              <h2 className="text-center m-4">Dodaj nalaz:</h2>

              <div className="card">
                <div className="card-header">
                  <Grid>
                    <b>Biohemija</b>
                    <Item>
                      <Form
                        name="basic"
                        labelCol={{
                          span: 10,
                        }}
                        wrapperCol={{
                          span: 16,
                        }}
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={(e) => onBiochemistrySubmit(e)}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        requiredMark={false}
                      >
                        <Form.Item
                          label="s-urea: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="surea"
                            value={surea}
                            onChange={(e) => onBiochemistryChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="sglucose: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="sglucose"
                            value={sglucose}
                            onChange={(e) => onBiochemistryChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="s-creatinine: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="screatinine"
                            value={screatinine}
                            onChange={(e) => onBiochemistryChange(e)}
                          />
                        </Form.Item>
                        <Button
                          type="primary"
                          onClick={onBiochemistrySubmit}
                          disabled={bioIsLocked}
                          style={{ width: "150px" }}
                        >
                          Dodaj biohemiju
                        </Button>
                      </Form>
                    </Item>
                  </Grid>
                  <Grid>
                    <b>Hematologija</b>
                    <Item>
                      <Form
                        name="basic"
                        labelCol={{
                          span: 10,
                        }}
                        wrapperCol={{
                          span: 16,
                        }}
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={(e) => onHematologySubmit(e)}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        requiredMark={false}
                      >
                        <Form.Item
                          label="leukociti: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="leukocytes"
                            value={leukocytes}
                            onChange={(e) => onHematologyChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="eritrociti: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="erythrocytes"
                            value={erythrocytes}
                            onChange={(e) => onHematologyChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="hemoglobin: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="hemaglobin"
                            value={hemaglobin}
                            onChange={(e) => onHematologyChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="hematokrit: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="hematocrit"
                            value={hematocrit}
                            onChange={(e) => onHematologyChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="trombociti: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="platelets"
                            value={platelets}
                            onChange={(e) => onHematologyChange(e)}
                          />
                        </Form.Item>
                        <Button
                          type="primary"
                          onClick={onHematologySubmit}
                          disabled={hemIsLocked}
                          style={{ width: "150px" }}
                        >
                          Dodaj hematologiju
                        </Button>
                      </Form>
                    </Item>
                  </Grid>
                  <Grid>
                    <b>Urin</b>
                    <Item>
                      <Form
                        name="basic"
                        labelCol={{
                          span: 10,
                        }}
                        wrapperCol={{
                          span: 16,
                        }}
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={(e) => onUrineSubmit(e)}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        requiredMark={false}
                      >
                        <Form.Item
                          label="urine sediment: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="urineSediment"
                            value={urineSediment}
                            onChange={(e) => onUrineChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="u-proteins: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="uproteins"
                            value={uproteins}
                            onChange={(e) => onUrineChange(e)}
                          />
                        </Form.Item>
                        <Button
                          type="primary"
                          onClick={onUrineSubmit}
                          disabled={uriIsLocked}
                          style={{ width: "150px" }}
                        >
                          Dodaj urin
                        </Button>
                      </Form>
                    </Item>
                  </Grid>

                  <Grid>
                    <b>Nalaz</b>
                    <Item>
                      <Form
                        name="basic"
                        labelCol={{
                          span: 10,
                        }}
                        wrapperCol={{
                          span: 16,
                        }}
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={(e) => onMedicalRecordSubmit(e)}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        requiredMark={false}
                      >
                        <Form.Item
                          label="ICD: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="icd"
                            value={icd}
                            onChange={(e) => onMedicalRecordChange(e)}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Validan: "
                          rules={[
                            {
                              required: true,
                              message: "Treba popuniti sva polja",
                            },
                          ]}
                        >
                          <Input
                            name="isValid"
                            value={isValid}
                            onChange={(e) => onMedicalRecordChange(e)}
                          />
                        </Form.Item>
                        <Form.Item label="Pacijent :">
                          <Select
                            onChange={(selectedPatient) => {
                              medicalRecord.patientId = selectedPatient;
                            }}
                          >
                            {patients.map((patient, index) => (
                              <Select.Option key={index} value={patient.id}>
                                {patient.firstName} {patient.lastName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Button
                          type="primary"
                          onClick={onMedicalRecordSubmit}
                          style={{
                            width: "150px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          Dodaj nalaz
                        </Button>
                      </Form>
                    </Item>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Box>
  );
}
