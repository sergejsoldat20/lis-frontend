/* eslint-disable no-unused-vars */
import axios from "axios";
import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../App.css";
export default function AddUser() {
  const [usernames, setUsernames] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    specialization: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    loadUsernames();
  }, []);
  const loadUsernames = async () => {
    const result = await axios.get(`http://localhost:9000/users/usernames`);
    setUsernames(result.data);
  };
  const { username, firstName, lastName, specialization, password, role } =
    user;
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
    await axios.post("http://localhost:9000/users", user);
    console.log(usernames);
    navigate("/home");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Grid alignItems="center" justifyContent="center">
      <p className="naslov">Registracija korisnika</p>
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
          <Form.Item label="Uloga :">
            <Select
              style={{
                width: 120,
              }}
              onChange={(selectedRole) => {
                user.role = selectedRole;
              }}
              options={[
                {
                  value: "Ljekar",
                  label: "Ljekar",
                },
                {
                  value: "Tehnicar",
                  label: "Tehnicar",
                },
                {
                  value: "Admin",
                  label: "Admin",
                },
              ]}
            />
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
