import React from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { AppURL } from "../../apis/AppURL";

function ProjectChoosed() {
    const projectsChoosed = useLoaderData();
  
    return (
      <Container className="my-5">
        <h2>Liste des Projets Choisis</h2>
        {projectsChoosed && projectsChoosed.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Etudiant</th>
                <th>Nom Etudiant</th>
                <th>Titre du Projet</th>
              </tr>
            </thead>
            <tbody>
              {projectsChoosed.map((choice) => (
                <tr key={choice.id}>
                  <td>{choice.user_id}</td>
                  <td>{choice.user.name}</td>
                  <td>{choice.project.project_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Aucun projet choisi par un étudiant.</p>
        )}
      </Container>
    );
  }
  
  export default ProjectChoosed;
  


  export const projectChoosedLoader = async () => {
    try {
      const response = await axios.get(AppURL.projectschoosed());
      console.log(response.data);
      const projectsChoosed = response.data.data;
      return projectsChoosed;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération des détails du projet :",
        error
      );
      return [];
    }
  };
  