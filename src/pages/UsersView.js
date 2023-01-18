import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UsersView() {

    const [users, setUsers] = useState([])

    const { id } = useParams();
    useEffect(() => {
        loadUsers();
        console.log(id);
    }, [])

    const loadUsers = async () => {
        const jwt = localStorage.getItem("jwt");
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };
        const result = await axios.get("http://localhost:9000/users", config);
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        const jwt = localStorage.getItem("jwt");
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };
        await axios.delete(`http://localhost:9000/users/${id}`, config)
        loadUsers();
    }
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
                        {

                            users.map((user, index) => (
                                < tr >
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>

                                        <Link className="btn btn-outline-primary mx-2" to={`/users/${user.id}`} >Pregled</Link>
                                        < button className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(user.id)}
                                        >Obrisi</button>


                                    </td>


                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>

        </div >
    )
}
