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
      <div style={{ height: 200 }}></div>
      <h1>Laboratorijski informacioni sistem</h1>
      <div style={{ height: 50 }}></div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <GlobalStyles styles={{ Form: { width: 300, height: 700 } }} />
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
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
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Grid>
  );
}
