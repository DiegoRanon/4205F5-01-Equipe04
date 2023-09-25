import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";


import "./NavLinks.css";

function NavLinks(props) {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/home" exact>
          Home
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/listeStage">Liste Stages</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/creerStage">Créer Stages</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
         {auth.isLoggedIn && (
        <li>
          <NavLink to="/myProfile">Profile</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Déconnexion</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
