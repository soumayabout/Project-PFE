// src/pages/ListSpecialty.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, json } from 'react-router-dom';
import { AppURL } from '../apis/AppURL';

function ListSpecialty() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get(AppURL.listSpecialties());
      setSpecialties(response.data.data);
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const handleDelete = async (specialtyId) => {
    try {
      await axios.delete(AppURL.deleteSpecialty(specialtyId));
      fetchSpecialties();
    } catch (error) {
      console.error('Error deleting specialty:', error);
    }
  };

  return (
    <div>
      <h2>List of Specialties</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialties.map((specialty) => (
            <tr key={specialty.id}>
              <td>{specialty.name}</td>
              <td>{specialty.description}</td>
              <td>
                <Link to={`/admin/specialties/${specialty.id}/update`} className="btn btn-info">
                  Edit
                </Link>
                <Button variant="danger" onClick={() => handleDelete(specialty.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListSpecialty;

export async function loader() {
  try {
    const response = await axios.get(AppURL.listSpecialties());
    const specialties = response.data.data;
    return json({ specialties }, { status: 200 });
  } catch (error) {
    console.error('Error fetching specialties:', error);
    return json(
      {
        specialties: [],
        message: 'An error occurred while fetching specialties.',
      },
      { status: 500 }
    );
  }
}
