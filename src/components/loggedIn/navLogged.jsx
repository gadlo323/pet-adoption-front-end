import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./navLogged.css";

const NavLogged = () => {
  const { currentUser, logOut } = useAuth();

  const onLogout = () => {
    logOut();
  };
  return (
    <header className="header">
      <h2 className="welcome-user">Hello {currentUser.name}</h2>
      <button type="button" className="log-out" onClick={onLogout}>
        Log Out
      </button>
    </header>
  );
};
export default NavLogged;
