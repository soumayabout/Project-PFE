import React from "react";
import { BiListUl } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";
import Logo from "./../../../assets/img/logo.png";
import avatar from "./../../../assets/img/avatar-01.jpg";
import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../redux/slices/sidebarSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // Récupérer les données de l'utilisateur depuis le stockage local
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData ? userData.name : "";
  const userRole = userData ? userData.role : "";

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fonction pour accéder au profil de l'utilisateur
  const profile = () => {
    navigate("/user/profile");
  };

  return (
    <div>
      <header
        id="header"
        className={`${classes.header} fixed-top d-flex align-items-center`}
      >
        <div
          className={`${classes.logo_title} d-flex align-items-center justify-content-between`}
        >
          {/* Lien vers la page d'accueil */}
          <Link to="/" className={`${classes.logo} d-flex align-items-center`}>
            <img src={Logo} alt="school-logo" />
            <span className="d-none d-lg-block">Ecole</span>
          </Link>
          {/* Bouton pour basculer la barre latérale */}
          <BiListUl
            onClick={onToggleSidebar}
            id="toggle_sidebar_btn"
            className={classes.toggle_sidebar_btn}
          />
        </div>

        {/* Navigation */}
        <nav className={`${classes.header_nav} ms-auto`}>
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <Dropdown>
                <Dropdown.Toggle
                  as={Nav.Link}
                  className={`nav-link ${classes.nav_profile} d-flex align-items-center pe-0`}
                  id="dropdown-basic"
                >
                  {/* Avatar de l'utilisateur et son nom */}
                  <img
                    src={avatar}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <span className="d-none d-md-block ps-2">{userName}</span>
                </Dropdown.Toggle>
                {/* Menu déroulant pour le profil de l'utilisateur */}
                <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow profile">
                  <Dropdown.Header className="text-center">
                    <h6 style={{ cursor: "pointer" }} onClick={profile}>
                      Mon profil
                    </h6>
                    <span>{userRole}</span>
                  </Dropdown.Header>
                  {/* Option pour se déconnecter */}
                  <Dropdown.Item
                    as="div"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    <span>Se déconnecter</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
