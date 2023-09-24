import React from "react";

import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"

import logo from "../assets/tudu_logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/boards">
        <i className="fa-solid fa-rectangle-list"></i>Boards   
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks">
        <i className="fa-solid fa-check"></i>Tasks   
      </NavLink>
      <NavLink
        className={styles.NavLink}
        // activeClassName={styles.Active}
        to="/"
        onClick={handleSignOut}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <img src={currentUser?.profile_image} alt="profile" height="35"/>
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
      >
        <i className="fa-solid fa-flag"></i>  Home

      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-arrow-right-to-bracket"></i>Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-plus"></i>  Sign up
      </NavLink>
    </>
  );

  const loggedOutLogo = (
    <>
        <NavLink to="/">
          <Navbar.Brand>
            <img className={styles.LogoOut} src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
    </>
  )
  const loggedInLogo = (
    <>
        <NavLink to="/boards">
          <Navbar.Brand>
            <img className={styles.Logo} src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
    </>
  )

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top" expanded={expanded}>
      <Container>

        {currentUser ? loggedInLogo : loggedOutLogo }

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} ref={ref}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">

            {currentUser ? loggedInIcons : loggedOutIcons}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;