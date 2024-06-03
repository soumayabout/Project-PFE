import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { Container } from "react-bootstrap";

function RegisterPage() {
  return (
    <Container>
      <h2>Inscription</h2>
      <RegisterForm />
    </Container>
  );
}

export default RegisterPage;
