import React from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Input from "../UI/inputs/Input";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { AppURL } from "../../apis/AppURL";
import { getUserId } from "../../utils/auth";

function ProjectDetails() {
  const project = useLoaderData();

  if (!project) {
    return (
      <Container className="my-5">
        <Row>
          <Col md={12} className="mx-auto">
            <Alert variant="danger">
              Vous n'avez pas encore choisi de projet.
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={12} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Détails du Projet</Card.Title>
              <Input
                label="Nom du Projet"
                type="text"
                value={project.project_name}
                readOnly
              />
              <Input
                label="Description"
                textarea
                value={project.project_description}
                readOnly
              />
              <Input
                label="Spécialité"
                type="text"
                value={project.specialty}
                readOnly
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectDetails;

export const userProjectLoader = async () => {
  try {
    const userId = getUserId();
    const response = await axios.get(AppURL.userprojectChoice(userId));
    console.log(response.data);
    const projectDetails = response.data.data;
    return projectDetails;
    
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des détails du projet :",
      error
    );
    return null;
  }
};
