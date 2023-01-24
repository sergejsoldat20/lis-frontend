import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
export default function Navbar() {
  const navigate = useNavigate();
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

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{
          display: "block",
          fontSize: 25,
          background: " #D1D1D1",
          opacity: "0.8",
          margin: "25px",
          padding: "16px",
        }}
      >
        <Menu.SubMenu style={{ float: "left" }} title="Pacijenti">
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">
              <Link to="/add-patient">Dodaj</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/patients">Pregled</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu style={{ float: "left" }} title="Nalazi">
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">
              <Link style={{}} to="/add-medical-record">
                Dodaj
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/medical-records">Pregled</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu style={{ float: "left" }} title="Profil">
          <Menu.ItemGroup>
            <Menu.Item style={{ float: "left" }}>
              <Link to="/profile">Profil</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu
          style={{ float: "right" }}
          title={
            <span>
              <MenuOutlined />
            </span>
          }
        >
          <Menu.ItemGroup title="Menu">
            <Menu.Item key="setting:1">
              <Link to="/add-user">Dodaj korisnika</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/users">Pregled korisnika</Link>
            </Menu.Item>
            <Menu.Item key="setting:3">
              Dark Mode <Switch onChange={onChange} />
            </Menu.Item>
            <Menu.Item onClick={logout}>Log out</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </ThemeProvider>
  );
}
