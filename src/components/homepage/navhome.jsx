import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin";
import "./navhome.css";

const Navhome = () => {
  const [modelSignup, setModelSignup] = useState();
  const [modelSignin, setModelSignin] = useState();

  const openModel = () => {
    setModelSignup(!modelSignup);
  };
  const openLogin = () => {
    setModelSignin(!modelSignin);
  };

  return (
    <header className="header">
      <div className="left-nav">
        <div className="logo">
          <h1 className="logo-name"> Pet Adoption</h1>
          <NavLink exact to="/">
            <img src="../dog.png" alt="logo" />
          </NavLink>
        </div>
        <div className="search-nav">
          <NavLink className="search-link" exact to="/search">
            <img src="../Vector-search.png" alt="search-icon" />
          </NavLink>
        </div>
      </div>
      <div className="auth-user">
        <button className="btn btn-login" type="button" onClick={openLogin}>
          LOGIN
          <img className="login-icon" src="/login-user.png" alt="login-icon" />
        </button>
        <button className="btn btn-signup" type="button" onClick={openModel}>
          SIGNUP
          <img className="signup-icon" src="/add-use.png" alt="signup-icon" />
        </button>
      </div>
      <Signup
        show={modelSignup}
        setModel={setModelSignup}
        loginModel={setModelSignin}
      />
      <Signin
        show={modelSignin}
        setModel={setModelSignin}
        signModel={setModelSignup}
      />
    </header>
  );
};

export default Navhome;
