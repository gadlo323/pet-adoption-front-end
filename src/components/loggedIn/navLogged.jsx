import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./navLogged.css";

const NavLogged = () => {
  const { currentUser } = useAuth();
  return (
    <header className="header">
      <h2 className="welcome-user">
        Hello {currentUser[0].firstName + " " + currentUser[0].lastName}
      </h2>
      <button type="button" className="log-out">
        Log Out
      </button>
    </header>
  );
};
export default NavLogged;
