/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";

import CheckIfAdmin from "../utils/CheckIfAdmin";
export default function Navbar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const checkIfAuthorized = () => {
    const token = localStorage.getItem("jwt");
    if (token) return true;
    else return false;
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    navigate("/");
  };
  const guestItems = [
    {
      label: (
        <a href="/medical-records" style={{ textDecoration: "none" }}>
          LIS
        </a>
      ),
      key: "home",
      style: {
        color: "blue",
        fontFamily: "Sans-Serif",
        fontStyle: "italic",
        float: "left",
        fontSize: 35,
        textDecoration: "none",
      },
    },
  ];
  const userItems = [
    {
      label: (
        <a href="/medical-records" style={{ textDecoration: "none" }}>
          LIS
        </a>
      ),
      key: "home",
      style: {
        color: "blue",
        fontFamily: "Sans-Serif",
        fontStyle: "italic",
        float: "left",
        fontSize: 35,
        textDecoration: "none",
      },
    },
    {
      label: "Pacijenti",
      key: "submenu:1",
      style: { float: "left" },
      children: [
        {
          label: (
            <a href="/add-patient" style={{ textDecoration: "none" }}>
              Dodaj
            </a>
          ),
          key: "setting:1",
        },
        {
          label: (
            <a href="/patients" style={{ textDecoration: "none" }}>
              Pregled
            </a>
          ),
          key: "setting:2",
        },
      ],
    },
    {
      label: "Nalazi",
      key: "submenu:2",
      style: { float: "left" },
      children: [
        {
          label: (
            <a href="/add-medical-record" style={{ textDecoration: "none" }}>
              Dodaj
            </a>
          ),
          key: "setting:3",
        },
        {
          label: (
            <a href="/medical-records" style={{ textDecoration: "none" }}>
              Pregled
            </a>
          ),
          key: "setting:4",
        },
      ],
    },
    {
      label: (
        <a href="/profile" style={{ textDecoration: "none" }}>
          Profil
        </a>
      ),
      key: "submenu:3",
      style: { float: "left" },
    },
    {
      key: "submenu:4",
      style: { float: "right" },
      icon: <MenuOutlined />,
      children: [
        CheckIfAdmin() && {
          label: (
            <a href="/add-user" style={{ textDecoration: "none" }}>
              Dodaj korisnika
            </a>
          ),
          key: "setting:5",
        },
        CheckIfAdmin() && {
          label: (
            <a href="/users" style={{ textDecoration: "none" }}>
              Pregled korisnika
            </a>
          ),
          key: "setting:6",
        },
        {
          label: (
            <a onClick={logout} style={{ textDecoration: "none" }}>
              Log out
            </a>
          ),
          key: "setting:7",
        },
      ],
    },
  ];
  const navbarItems = checkIfAuthorized() ? userItems : guestItems;
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={navbarItems}
      style={{
        display: "block",
        fontSize: 25,
        background: " #D1D1D1",
        opacity: "0.8",
        margin: "20px",
        padding: "12px",
      }}
    />
    // <Menu
    //   onClick={onClick}
    //   selectedKeys={[current]}
    //   mode="horizontal"
    //   style={{
    //     display: "block",
    //     fontSize: 25,
    //     background: " #D1D1D1",
    //     opacity: "0.8",
    //     margin: "20px",
    //     padding: "12px",
    //   }}
    // >
    //   <Menu.Item
    //     key="item-1"
    //     style={{ float: "left", fontSize: 35, textDecoration: "none" }}
    //   >
    //     <Link
    //       style={{
    //         textDecoration: "none",
    //         color: "blue",
    //         fontFamily: "Sans-Serif",
    //         fontStyle: "italic",
    //       }}
    //       to="/medical-records"
    //     >
    //       LIS
    //     </Link>
    //   </Menu.Item>
    //   {checkIfAuthorized() && (
    //     <Menu.SubMenu
    //       key="submenu-1"
    //       style={{ float: "left", textDecoration: "none" }}
    //       title="Pacijenti"
    //     >
    //       <Menu.ItemGroup>
    //         <Menu.Item key="setting:1">
    //           <Link to="/add-patient">Dodaj</Link>
    //         </Menu.Item>
    //         <Menu.Item key="setting:2">
    //           <Link to="/patients">Pregled</Link>
    //         </Menu.Item>
    //       </Menu.ItemGroup>
    //     </Menu.SubMenu>
    //   )}
    //   {checkIfAuthorized() && (
    //     <Menu.SubMenu key="submenu-2" style={{ float: "left" }} title="Nalazi">
    //       <Menu.ItemGroup>
    //         <Menu.Item key="setting:3">
    //           <Link style={{ textDecoration: "none" }} to="/add-medical-record">
    //             Dodaj
    //           </Link>
    //         </Menu.Item>
    //         <Menu.Item key="setting:4">
    //           <Link to="/medical-records">Pregled</Link>
    //         </Menu.Item>
    //       </Menu.ItemGroup>
    //     </Menu.SubMenu>
    //   )}
    //   {checkIfAuthorized() && (
    //     <Menu.Item style={{ float: "left" }} key="item-2">
    //       <Link style={{ textDecoration: "none" }} to="/profile">
    //         Profil
    //       </Link>
    //     </Menu.Item>
    //   )}
    //   {checkIfAuthorized() && (
    //     <Menu.SubMenu
    //       key="submenu-3"
    //       style={{ float: "right" }}
    //       title={
    //         <span>
    //           <MenuOutlined />
    //         </span>
    //       }
    //     >
    //       <Menu.ItemGroup title="Menu">
    //         {CheckIfAdmin() && (
    //           <Menu.Item key="setting:5">
    //             <Link to="/add-user">Dodaj korisnika</Link>
    //           </Menu.Item>
    //         )}
    //         {CheckIfAdmin() && (
    //           <Menu.Item key="setting:6">
    //             <Link to="/users">Pregled korisnika</Link>
    //           </Menu.Item>
    //         )}
    //         <Menu.Item key="setting:7" onClick={logout}>
    //           Log out
    //         </Menu.Item>
    //       </Menu.ItemGroup>
    //     </Menu.SubMenu>
    //   )}
    // </Menu>
  );
}
