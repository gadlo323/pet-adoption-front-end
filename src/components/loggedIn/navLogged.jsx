import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./navLogged.css";

const NavLogged = () => {
  const { currentUser, logOut } = useAuth();

  const onLogout = () => {
    logOut();
  };
  return (
    <header className="header">
      {currentUser.role == "1" && (
        <NavLink exact to="/deshborad">
          <h2 className="welcome-user">Hello {currentUser.name}</h2>
        </NavLink>
      )}
      {currentUser.role == "2" && (
        <NavLink exact to="/admin/deshborad">
          <h2 className="welcome-user">Hello {currentUser.name}</h2>
        </NavLink>
      )}

      <button type="button" className="log-out" onClick={onLogout}>
        LOGOUT
        <img className="log-icon" src="/log-out-icon.png" alt="login-icon" />
      </button>
    </header>
  );
};
export default NavLogged;
