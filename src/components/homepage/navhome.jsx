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
            Search
          </NavLink>
          <img src="./Vector-search.png" alt="" />
        </div>
      </div>
      <div className="auth-user">
        <button className="btn btn-login" type="button" onClick={openLogin}>
          LogIn
        </button>
        <button className="btn btn-signup" type="button" onClick={openModel}>
          SignUp
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
