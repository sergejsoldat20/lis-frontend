import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { GlobalStyles } from "@mui/system";
import { Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LogIn() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        values
      );
      console.log(response.data.accessToken);
      const jwt = response.data.accessToken;
      localStorage.setItem("jwt", jwt);
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      const role = await axios.get(
        `http://localhost:9000/users/current-role`,
        config
      );
      localStorage.setItem("role", role.data);
      message.success("Uspjesno ste se ulogovali");
      navigate("/medical-records");
    } catch (error) {
      message.error("Niste se uspjesno ulogovali");
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <div style={{ height: 100 }}></div>
      <div
        className="col-md-6  border ronder p-4 mt-2 shadow"
        style={{ backgroundColor: " #D1D1D1" }}
      >
        <h3 className="text-center m-4">LABORATORIJSKI INFORMACIONI SISTEM</h3>
      </div>
      <div style={{ height: 50 }}></div>
      <div className="col-md-4 border rounder p-4 mt-2 shadow">
        <Form
          name="normal_login"
          className="login-form col-md-12 text-center p-1"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <GlobalStyles styles={{ Form: { width: 100, height: 150 } }} />
          <Form.Item
            style={{
              width: "100%",
            }}
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "100%",
            }}
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button md-4"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Grid>
  );
}
