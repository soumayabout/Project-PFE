import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../../assets/img/logo.png";
import classes from "./PublicNavbar.module.css";

function PublicNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="school" className="img-fluid w-75" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </Nav>
          <Nav>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? classes.nav_link_active : classes.nav_link
              }
            >
              Se connecter
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.nav_link_active : classes.nav_link
              }
              style={{ marginLeft: "1rem" }}
            >
              S'incrire
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PublicNavbar;
