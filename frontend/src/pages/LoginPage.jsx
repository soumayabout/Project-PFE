import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import LoginForm from "../components/auth/LoginForm";
import logo from "./../assets/img/logo.png";
import StudentImg from "./../assets/img/students.jpg";
import Card from "./../components/UI/cards/Card";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  background-color: #ffffff;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
`;

const HiddenImage = styled(Image)`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

function LoginPage() {
  return (
    <Container className="align-items-center mt-5">
      <StyledCard>
        <Row className="mb-4">
          <Col lg={4} className="text-center mb-3 mb-lg-0">
            <HiddenImage
              src={StudentImg}
              alt="Student"
              fluid
              className="rounded mb-3"
            />
          </Col>
          <Col lg={8} md={12} sm={12} className="text-center">
            <img src={logo} alt="Alkarama Logo" width={100} className="mb-4" />
            <LoginForm />
          </Col>
        </Row>
      </StyledCard>
    </Container>
  );
}

export default LoginPage;
