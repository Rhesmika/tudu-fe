import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/tudu_logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        
        <NavLink to="/">
          <Navbar.Brand>
            <img className={styles.Logo} src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">


            <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
              >
                <i class="fa-solid fa-flag"></i>  Home
            </NavLink>

            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
                <i class="fa-solid fa-arrow-right-to-bracket"></i>  Sign in
            </NavLink>

            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
                <i class="fa-solid fa-plus"></i>  Sign up
            </NavLink>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;