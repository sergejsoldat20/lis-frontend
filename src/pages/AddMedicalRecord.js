import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Form, Input, Button } from "antd";

export default function AddMedicalRecord() {
  /* const [medicalRecord, setMedicalRecord] = useState({
    icd: "",
    isValid: "",
    hematologyId: "",
    urineId: "",
    biochemistryId: "",
    patientId: "",
    userId: "",
  }); */
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

  const { surea, sglucose, screatinine } = biochemistry;
  const { leukocytes, erythrocytes, hemaglobin, hematocrit, platelets } =
    hematology;
  const { urineSediment, uproteins } = urine;
  /* const {
    icd,
    isValid,
    patientId,
    userId,
    biochemistryId,
    hematologyId,
    urineId,
  } = medicalRecord; */

  const onBiochemistryChange = (e) => {
    setBiochemistry({ ...biochemistry, [e.target.name]: e.target.value });
  };

  const onHematologyChange = (e) => {
    setHematology({ ...hematology, [e.target.name]: e.target.value });
  };

  const onUrineChange = (e) => {
    setUrine({ ...urine, [e.target.name]: e.target.value });
  };

  const onBiochemistrySubmit = async (e) => {
    const result = await axios.post(
      "http://localhost:9000/biochemistries",
      biochemistry
    );
    console.log(result.data);
  };

  const onHematologySubmit = async (e) => {
    const result = await axios.post(
      "http://localhost:9000/hematologies",
      hematology
    );
    console.log(result.data);
  };

  const onUrineSubmit = async (e) => {
    const result = await axios.post("http://localhost:9000/urines", hematology);
    console.log(result.data);
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

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
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
              <Button type="primary" onClick={onUrineSubmit}>
                Dodaj urin
              </Button>
            </Form>
          </Item>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          item
          xs={4}
        >
          Biochemija
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
              <Button type="primary" onClick={onBiochemistrySubmit}>
                Dodaj biohemiju
              </Button>
            </Form>
          </Item>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          item
          xs={4}
        >
          Hematologija
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
              <Button type="primary" onClick={onHematologySubmit}>
                Dodaj hematologiju
              </Button>
            </Form>
          </Item>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          item
          xs={4}
        >
          Urin
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
              <Button type="primary" onClick={onUrineSubmit}>
                Dodaj urin
              </Button>
            </Form>
          </Item>
        </Grid>
        <Grid>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}