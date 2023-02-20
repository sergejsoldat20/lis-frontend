/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Form, Input, Button, Select, message, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import CheckIfNurse from "../utils/CheckIfNurse";
import patientService from "../services/patientService.service";
import userService from "../services/userService.service";
import recordsService from "../services/recordsService.service";

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
    isValid: "false",
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
    patientService.getAll().then((result) => {
      setPatients(result.data);
    });
  };

  const { icd, isValid, userId } = medicalRecord;
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
    for (const key in medicalRecord) {
      if (medicalRecord[key] === "") {
        message.error("Potrebno je popuniti sva polja u nalazu!", 5);
        return;
      }
    }
    userService.getCurrentId().then((result) => {
      medicalRecord.userId = result.data;
    });

    recordsService.insertRecord(medicalRecord).then((result) => {
      if (result.status === 200) {
        message.success("Uspjesno ste dodali nalaz!");
        navigate("/medical-records");
      } else {
        message.error("Niste dodali nalaz");
        navigate("/medical-records");
      }
    });
  };
  const onBiochemistrySubmit = async (e) => {
    for (const key in biochemistry) {
      if (biochemistry[key] === "") {
        message.error("Potrebno je popuniti sva polja za biohemiju!", 5);
        return;
      }
    }
    recordsService.insertBiochemistry(biochemistry).then((result) => {
      if (result.status === 201) {
        medicalRecord.biochemistryId = result.data.id;
        message.success("Uspjesno ste dodali biohemiju u nalaz.");
        if (!bioIsLocked) {
          // Perform the button's intended action
          console.log("Button clicked!");
          setBioIsLocked(true);
        }
      }
    });
  };

  const onHematologySubmit = async (e) => {
    for (const key in hematology) {
      if (hematology[key] === "") {
        message.error("Potrebno je popuniti sva polja za hematologiju!", 5);
        return;
      }
    }
    recordsService.insertHematology(hematology).then((result) => {
      if (result.status === 201) {
        medicalRecord.hematologyId = result.data.id;
        message.success("Uspjesno ste dodali hematologiju u nalaz.");
        if (!hemIsLocked) {
          // Perform the button's intended action
          console.log("Button clicked!");
          setHemIsLocked(true);
        }
      }
    });
  };

  const onUrineSubmit = async (e) => {
    for (const key in urine) {
      if (urine[key] === "") {
        message.error("Potrebno je popuniti sva polja za urin", 5);
        return;
      }
    }

    recordsService.insertUrine(urine).then((result) => {
      if (result.status === 201) {
        medicalRecord.urineId = result.data.id;
        message.success("Uspjesno ste dodali urin u nalaz.");
        if (!uriIsLocked) {
          // Perform the button's intended action
          console.log("Button clicked!");
          setUriIsLocked(true);
        }
      }
    });
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
      <Grid container rowSpacing={3}>
        <div className="container">
          <div className="rom">
            <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow">
              <h2 className="text-center m-4">Dodaj nalaz:</h2>

              <div className="card">
                <div className="card-header">
                  <Grid
                    sx={{ height: 265 }}
                    alignitems="center"
                    justifycontent="center"
                    marginTop={2}
                    borderBottom={3}
                    borderColor="#D1D1D1"
                  >
                    <b>Biohemija</b>
                    <Grid sx={{ height: 15 }}></Grid>
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
                      <Form.Item label="s-urea: ">
                        <Input
                          name="surea"
                          value={surea}
                          onChange={(e) => onBiochemistryChange(e)}
                        />
                      </Form.Item>
                      <Form.Item label="sglucose: ">
                        <Input
                          name="sglucose"
                          value={sglucose}
                          onChange={(e) => onBiochemistryChange(e)}
                        />
                      </Form.Item>
                      <Form.Item label="s-creatinine: ">
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
                        style={{ width: "175px" }}
                      >
                        Dodaj biohemiju
                      </Button>
                    </Form>
                  </Grid>
                  <Grid
                    sx={{ height: 380 }}
                    alignitems="center"
                    justifycontent="center"
                    marginTop={2}
                    borderBottom={3}
                    borderColor="#D1D1D1"
                  >
                    <b>Hematologija</b>
                    <Grid sx={{ height: 15 }}></Grid>

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
                      <Form.Item label="leukociti: ">
                        <Input
                          name="leukocytes"
                          value={leukocytes}
                          onChange={(e) => onHematologyChange(e)}
                        />
                      </Form.Item>
                      <Form.Item label="eritrociti: ">
                        <Input
                          name="erythrocytes"
                          value={erythrocytes}
                          onChange={(e) => onHematologyChange(e)}
                        />
                      </Form.Item>
                      <Form.Item label="hemoglobin: ">
                        <Input
                          name="hemaglobin"
                          value={hemaglobin}
                          onChange={(e) => onHematologyChange(e)}
                        />
                      </Form.Item>
                      <Form.Item label="hematokrit: ">
                        <Input
                          name="hematocrit"
                          value={hematocrit}
                          onChange={(e) => onHematologyChange(e)}
                        />
                      </Form.Item>
                      <Form.Item label="trombociti: ">
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
                        style={{ width: "175px" }}
                      >
                        Dodaj hematologiju
                      </Button>
                    </Form>
                  </Grid>
                  <Grid
                    sx={{ height: 210 }}
                    alignitems="center"
                    justifycontent="center"
                    marginTop={2}
                    borderBottom={3}
                    borderColor="#D1D1D1"
                  >
                    <b>Urin</b>
                    <Grid sx={{ height: 15 }}></Grid>
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
                      <Form.Item label="urine sediment: ">
                        <Input
                          name="urineSediment"
                          value={urineSediment}
                          onChange={(e) => onUrineChange(e)}
                        />
                      </Form.Item>
                      <Form.Item label="u-proteins: ">
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
                        style={{ width: "175px" }}
                      >
                        Dodaj urin
                      </Button>
                    </Form>
                  </Grid>
                  <Grid
                    sx={{ height: 265 }}
                    alignitems="center"
                    justifycontent="center"
                    marginTop={2}
                  >
                    <b>Nalaz</b>
                    <Grid sx={{ height: 15 }}></Grid>

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
                      <Form.Item label="ICD: ">
                        <Input
                          name="icd"
                          value={icd}
                          onChange={(e) => onMedicalRecordChange(e)}
                        />
                      </Form.Item>
                      {!CheckIfNurse() && (
                        <Form.Item
                          label="Validan:"
                          alignitems="left"
                          justifycontent="left"
                        >
                          <Radio.Group
                            name="isValid"
                            value={isValid}
                            onChange={(e) => onMedicalRecordChange(e)}
                            optionType="button"
                          >
                            <Radio
                              value={"true"}
                              style={{
                                fontSize: 14,
                                width: "164px",
                                fontWeight: "bold",
                              }}
                            >
                              DA
                            </Radio>
                            <Radio
                              value={"false"}
                              style={{
                                fontSize: 14,
                                width: "164px",
                                fontWeight: "bold",
                              }}
                            >
                              NE
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                        // </Form>
                      )}
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
                          width: "175px",
                          backgroundColor: "green",
                          color: "white",
                        }}
                      >
                        Dodaj nalaz
                      </Button>
                    </Form>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Box>
    /* <Grid>
      <b>Biohemija</b>
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
        <Form.Item label="s-urea: ">
          <Input
            name="surea"
            value={surea}
            onChange={(e) => onBiochemistryChange(e)}
          />
        </Form.Item>
        <Form.Item label="sglucose: ">
          <Input
            name="sglucose"
            value={sglucose}
            onChange={(e) => onBiochemistryChange(e)}
          />
        </Form.Item>
        <Form.Item label="s-creatinine: ">
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
    </Grid>
    */
  );
}
