import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { AppURL } from "../apis/AppURL";
import { Link, json, useLoaderData } from "react-router-dom";
import { Button, Table, Form, Alert } from "react-bootstrap";
import { checkUserType, getUserId } from "../utils/auth";

function ProjectsList() {
  const userType = checkUserType();
  const userId = getUserId();
  const { projects } = useLoaderData() || {};
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (selectedSpecialty) {
      setFilteredProjects(
        projects.filter(
          (project) => project.specialty_id === parseInt(selectedSpecialty)
        )
      );
    } else {
      setFilteredProjects(projects);
    }
  }, [selectedSpecialty, projects]);

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(AppURL.deleteProject(projectId));
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  const handleChoose = async (projectId) => {
    try {
      const response = await axios.post(AppURL.projectChoice(), {
        user_id: userId,
        project_id: projectId,
      });

      if (response.status === 200) {
        setAlertMessage("Projet choisi avec succès.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAlertMessage(error.response.data.message);
      } else {
        setAlertMessage("Erreur lors du choix du projet.");
      }
    } finally {
      setShowAlert(true);
    }
  };

  return (
    <Fragment>
      <h2>Liste des projets</h2>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      {userType === "etudiant" && (
        <Form.Group controlId="specialtyFilter" className="mb-5">
          <Form.Label>Choisir Votre spécialité</Form.Label>
          <Form.Control
            as="select"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="" hidden>Choisir Votre spécialité</option>
            {projects
              .map((project) => project.specialty)
              .filter(
                (specialty, index, self) =>
                  self.findIndex((s) => s.id === specialty.id) === index
              )
              .map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.specialty_name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.project_name}</td>
                <td>{project.project_description}</td>
                <td>
                  {project.specialty
                    ? project.specialty.specialty_name
                    : "Non spécifié"}
                </td>
                <td className="d-flex justify-content-around">
                  {userType === "etudiant" ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handleChoose(project.id)}
                      >
                        Choisir
                      </Button>
                      <Link to={`/student/projects/${project.id}/edit`} className="btn btn-success" >
                        Modifier
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/teacher/projects/${project.id}/update`}
                        className="btn btn-info"
                      >
                        Modifier
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(project.id)}
                      >
                        Supprimer
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun projet trouvé</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default ProjectsList;

export async function projectsLoader() {
  try {
    const response = await axios.get(AppURL.listProjects());
    const projects = response.data.data;
    return json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return json(
      {
        projects: [],
        message: "Une erreur est survenue lors de la récupération des projets.",
      },
      { status: 500 }
    );
  }
}
