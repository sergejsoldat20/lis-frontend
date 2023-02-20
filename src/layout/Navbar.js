import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CheckIfAdmin from "../utils/CheckIfAdmin";
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

  const checkIfAuthorized = () => {
    const token = localStorage.getItem("jwt");
    if (token) return true;
    else return false;
  };
  const onChange = (checked) => {
    checked = { darkMode };
    setDarkMode(!darkMode);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    navigate("/");
  };

  // const menuItems = [{ key: "records", label: }];

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
          margin: "20px",
          padding: "12px",
        }}
      >
        <Menu.Item
          key="item-1"
          style={{ float: "left", fontSize: 35, textDecoration: "none" }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "blue",
              fontFamily: "Sans-Serif",
              fontStyle: "italic",
            }}
            to="/medical-records"
          >
            LIS
          </Link>
        </Menu.Item>
        {checkIfAuthorized() && (
          <Menu.SubMenu
            key="submenu-1"
            style={{ float: "left", textDecoration: "none" }}
            title="Pacijenti"
          >
            <Menu.ItemGroup>
              <Menu.Item key="setting:1">
                <Link to="/add-patient">Dodaj</Link>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <Link to="/patients">Pregled</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        )}
        {checkIfAuthorized() && (
          <Menu.SubMenu
            key="submenu-2"
            style={{ float: "left" }}
            title="Nalazi"
          >
            <Menu.ItemGroup>
              <Menu.Item key="setting:3">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/add-medical-record"
                >
                  Dodaj
                </Link>
              </Menu.Item>
              <Menu.Item key="setting:4">
                <Link to="/medical-records">Pregled</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        )}
        {checkIfAuthorized() && (
          <Menu.Item style={{ float: "left" }} key="item-2">
            <Link style={{ textDecoration: "none" }} to="/profile">
              Profil
            </Link>
          </Menu.Item>
        )}
        {checkIfAuthorized() && (
          <Menu.SubMenu
            key="submenu-3"
            style={{ float: "right" }}
            title={
              <span>
                <MenuOutlined />
              </span>
            }
          >
            <Menu.ItemGroup title="Menu">
              {CheckIfAdmin() && (
                <Menu.Item key="setting:5">
                  <Link to="/add-user">Dodaj korisnika</Link>
                </Menu.Item>
              )}
              {CheckIfAdmin() && (
                <Menu.Item key="setting:6">
                  <Link to="/users">Pregled korisnika</Link>
                </Menu.Item>
              )}
              <Menu.Item key="setting:7">
                Dark Mode <Switch onChange={onChange} />
              </Menu.Item>
              <Menu.Item key="setting:8" onClick={logout}>
                Log out
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        )}
      </Menu>
    </ThemeProvider>
  );
}
