/* eslint-disable no-unused-vars */
import axios from "axios";
import { Button, Radio, Form, Input, DatePicker, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../App.css";
export default function AddPatient() {
  const navigate = useNavigate();
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
  const {
    firstName,
    lastName,
    birthDate,
    jmbg,
    gender,
    address,
    phone,
    city,
    familyDoctor,
  } = patient;
  const onInputChange = (e) => {
    console.log(e);
    setPatient({ ...patient, [e.target.name]: e.target.value }); // nastavlja da dodaje nove objekte
    console.log(e.target.value);
  };

  const onFinish = async (e) => {
    console.log(patient);
    for (const key in patient) {
      if (patient[key] === "") {
        message.error("Potrebno je popuniti sva polja", 5);
        return;
      }
    }
    await axios.post("http://localhost:9000/patients", patient);
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Potrebno je popuniti sva polja",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const dateFormat = "YYYY-MM-DD";
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
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
        onFinish={(e) => onFinish(e)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Ime: "
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <Input
            name="firstName"
            value={firstName}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Prezime: "
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <Input
            name="lastName"
            value={lastName}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Datum rodjenja:"
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <DatePicker
            format={dateFormat}
            onChange={(e, date) => {
              patient.birthDate = date;
              console.log(patient);
            }}
          />
        </Form.Item>
        <Form.Item
          label="JMBG"
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
              maxLength: 13,
            },
          ]}
        >
          <Input name="jmbg" value={jmbg} onChange={(e) => onInputChange(e)} />
        </Form.Item>
        <Form.Item
          label="Pol"
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <Radio.Group
            name="gender"
            value={gender}
            onChange={(e) => onInputChange(e)}
          >
            <Radio value={"M"} style={{ fontSize: 14 }}>
              Musko
            </Radio>
            <Radio value={"Z"} style={{ fontSize: 14 }}>
              Zensko
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Adresa"
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <Input
            name="address"
            value={address}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Telefon"
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <Input
            name="phone"
            value={phone}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Item>
        <Form.Item
          label="Mjesto stanovanja"
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <Input name="city" value={city} onChange={(e) => onInputChange(e)} />
        </Form.Item>
        <Form.Item
          label="Porodicni doktor"
          rules={[
            {
              required: true,
              message: "Treba popuniti sva polja",
            },
          ]}
        >
          <Input
            name="familyDoctor"
            value={familyDoctor}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" onClick={onFinish}>
            Registruj
          </Button>
        </Form.Item>
      </Form>
    </Grid>
  );
}
