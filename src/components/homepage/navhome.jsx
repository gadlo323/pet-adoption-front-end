import React from "react";
// import { NavLink } from "react-router-dom";
import "./navhome.css";

const Navhome = () => {
  return (
    <header className="header">
      <div className="left-nav">
        <div className="logo">
          <h1 className="logo-name"> Pet Adoption</h1>
          <img src="./dog.png" alt="" />
        </div>
        <div className="search-nav">
          <a className="search-link" href="#">
            Search
          </a>
          <img src="./Vector-search.png" alt="" />
        </div>
      </div>
      <div className="auth-user">
        <button className="btn btn-login" type="button">
          LogIn
        </button>
        <button className="btn btn-signup" type="button">
          SignUp
        </button>
      </div>
    </header>
  );
};

export default Navhome;
