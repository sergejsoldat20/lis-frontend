/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "antd/es/typography/Link";
export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    specialization: "",
    role: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(
      `http://localhost:9000/users/current-user`,
      config
    );
    console.log(result.data);
    setUser(result.data);
  };
  const broj = null;
  return (
    <div className="container">
      <div className="rom">
        <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow">
          <h2 className="text-center m-4">Informacije o profilu:</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Ime: </b>
                  {user.firstName}
                </li>
                <li className="list-group-item">
                  <b>Prezime: </b>
                  {user.lastName}
                </li>
                <li className="list-group-item">
                  <b>Korisnicko ime: </b>
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>Specijalijacija: </b>
                  {user.specialization}
                </li>
                <li className="list-group-item">
                  <b>Uloga: </b>
                  {user.role}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary mx-2" to={"/users"}>
            Izmjeni
          </Link>
        </div>
      </div>
    </div>
  );
}
