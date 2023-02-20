import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import userService from "../services/userService.service";
import { message } from "antd";

export default function UsersView() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadUsers();
    console.log(id);
  }, []);

  const loadUsers = () => {
    userService.getAll().then((result) => {
      setUsers(result.data);
    });
  };

  const deleteUser = (id) => {
    userService.remove(id).then((result) => {
      if (result.status === 200) {
        message.success(`Korisnik je uspjesno obrisan`);
      } else {
        message.error("Korisnik nije uspjesno obrisan");
      }
    });
    /*  const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    await axios.delete(`http://localhost:9000/users/${id}`, config);
    loadUsers(); */
  };
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Korisnicko ime</th>
              <th scope="col">Ime</th>
              <th scope="col">Prezime</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/users/${user.id}`}
                  >
                    Pregled
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Obrisi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
