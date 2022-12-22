import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
export default function Navbar() {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const onChange = (checked) => {
    checked = { darkMode };
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ display: "block", fontSize: 21 }}
      >
        <Menu.Item style={{ float: "left" }}>
          <Link class="btn btn-outline-light" to={"/home"}>
            LIS
          </Link>
        </Menu.Item>
        <Menu.SubMenu style={{ float: "left" }} title="Patients">
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">
              <Link to="/add-patient">Add</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/patients">View</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu style={{ float: "left" }} title="Medical Records">
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">Add</Menu.Item>
            <Menu.Item key="setting:2">View</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item style={{ float: "left" }}>
          <Link className="btn btn-outline-light" to="/home">
            Info
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          style={{ float: "right" }}
          title={
            <span>
              <MenuOutlined />
            </span>
          }
        >
          <Menu.ItemGroup title="Menu">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">
              Dark Mode <Switch onChange={onChange} />
            </Menu.Item>
            <Menu.Item>Log out</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </ThemeProvider>
  );
}
