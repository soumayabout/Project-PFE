import React, { Fragment, useState, useEffect } from "react";
import { useLoaderData, json, Link } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { AppURL } from "../apis/AppURL";

function UserList() {
  const { users: initialUsers } = useLoaderData();
  const [users, setUsers] = useState(initialUsers ? initialUsers.data : []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(AppURL.deleteUser(id));
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h2>Liste des utilisateurs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="d-flex justify-content-around">
                  <Link to={`/admin/users/${user.id}/update`} variant="info">
                    Modifier
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default UserList;

export async function loader() {
  try {
    const response = await axios.get(AppURL.listUsers());
    const users = response.data;
    console.log(users);
    return json({ users }, { status: 200 });
  } catch (error) {
    return json(
      {
        users: [],
        message: "Une erreur est survenue lors de la récupération des utilisateurs.",
      },
      { status: 500 }
    );
  }
}
