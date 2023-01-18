import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function UserView() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    specialization: "",
    role: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
    console.log(id);
  }, []);

  const loadUser = async () => {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const result = await axios.get(`http://localhost:9000/users/${id}`, config);
    setUser(result.data);
    console.log(result.data);
  };
  return (
    <div className="container">
      <div className="rom">
        <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow">
          <h2 className="text-center m-4">Informacije o korisniku</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Ime:</b>
                  {user.firstName}
                </li>
                <li className="list-group-item">
                  <b>Prezime:</b>
                  {user.lastName}
                </li>
                <li className="list-group-item">
                  <b>Korisnicko ime:</b>
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>Specijalijacija:</b>
                  {user.specialization}
                </li>
                <li className="list-group-item">
                  <b>Uloga:</b>
                  {user.role}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-danger my-2" to={"/users"}>
            Nazad
          </Link>
        </div>
      </div>
    </div>
  );
}
