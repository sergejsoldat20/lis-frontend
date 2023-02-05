/* eslint-disable no-unused-vars */
import axios from "axios";
import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../App.css";
import userService from "../services/userService.service";
import authService from "../services/authService.service";
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
  const loadUsernames = () => {
    userService.getAllUsernames().then((result) => {
      setUsernames(result.data);
    });
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
    authService.register(user).then((result) => {
      if (result.status === 200) {
        message.success("Dodali ste novog korisnika");
        navigate("/users");
      } else {
        message.error("Niste dodali novog korisnika");
        navigate("/users");git 
      }
    });
    // navigate("/users");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Grid alignItems="center" justifyContent="center" className="text-center">
      <div className="container">
        <div className="rom">
          <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow">
            <h2 className="text-center m-4">Registracija korisnika:</h2>

            <div className="card">
              <div className="card-header">
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
                            value: "DOCTOR",
                            label: "Ljekar",
                          },
                          {
                            value: "NURSE",
                            label: "Tehnicar",
                          },
                          {
                            value: "ADMIN",
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}
