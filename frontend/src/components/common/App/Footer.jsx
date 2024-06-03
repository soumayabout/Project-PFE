import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>À Propos de Nous</h5>
            <p>
              Nous sommes une institution éducative de premier plan, engagée dans l'excellence de l'enseignement et de la recherche.
            </p>
          </Col>
          <Col md={6} className="text-md-right">
            <h5>Contactez-Nous</h5>
            <ul className="list-unstyled">
              <li>Email : contact@notreecole.edu</li>
              <li>Téléphone : +123 456 7890</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12} className="text-center">
            <p>&copy; 2024 Système de Gestion des PFE. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
