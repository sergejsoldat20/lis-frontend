/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../App.css";
export default function AddUser() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);
  const loadPatients = async () => {
    const result = await axios.get("http://localhost:9000/patients");
    setPatients(result.data);
  };
  const [usernames, setUsernames] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    specialization: "",
    password: "",
    role: "",
    patientId: 0,
  });
  useEffect(() => {
    loadUsernames();
  }, []);
  const loadUsernames = async () => {
    const result = await axios.get(`http://localhost:9000/users/usernames`);
    setUsernames(result.data);
  };
  const { username, firstName, lastName, specialization, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value }); // nastavlja da dodaje nove objekte
  };

  const onFinish = async (e) => {
    console.log(user);
    for (const key in usernames) {
      if (usernames[key] === user.username) {
        message.error("Korsinicko ime vec postoji", 5);
        return;
      }
    }
    for (const key in user) {
      if (user[key] === "") {
        message.error("Potrebno je popuniti sva polja", 5);
        return;
      }
    }
    // await axios.post("http://localhost:9000/users", user);
    console.log(user);
    console.log(usernames);
    navigate("/info");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Grid alignItems="center" justifyContent="center">
      <p className="naslov">Dodaj nalaz</p>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        paddingRight={12}
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
          <Form.Item label="Ime: ">
            <Input
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
          <Form.Item label="Prezime: ">
            <Input
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
          <Form.Item label="Specijalizacija: ">
            <Input
              name="specialization"
              value={specialization}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
          <Form.Item label="Pacijent :">
            <Select
              onChange={(selectedPatient) => {
                user.patientId = selectedPatient;
              }}
            >
              {patients.map((patient, index) => (
                <Select.Option key={index} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Korisnicko ime :">
            <Input
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
          <Form.Item label="Lozinka: ">
            <Input
              name="password"
              value={password}
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
    </Grid>
  );
}
