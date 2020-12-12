import React, { useState } from "react";
import Modal from "react-modal";
import "./signin.css";

Modal.setAppElement("#root");
const Signin = ({ show, setModel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const closeModel = () => {
    setModel(!show);
  };

  return (
    <Modal className="login-model" isOpen={show}>
      <div className="login-wrapeer">
        <div className="top-login">
          <i className="fa fa-times-circle " onClick={closeModel}></i>
          <h1 className="title-signin">Sign In</h1>
        </div>
        <div className="main-model">
          <form className="login-form">
            <input
              type="email"
              className="input-login"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-login"
              placeholder="Passsword"
              value={password}
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-btn" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Signin;
