import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import "./navLogged.css";

const NavLogged = () => {
  return (
    <header className="header">
      <h2 className="welcome-user">Hello Isayas Gadalo</h2>
      <button type="button" className="log-out">
        Log Out
      </button>
    </header>
  );
};
export default NavLogged;
