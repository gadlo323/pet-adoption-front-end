import React, { useState } from "react";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import Modal from "react-modal";
import "./signin.css";
import { useHistory } from "react-router-dom";
Modal.setAppElement("#root");
const Signin = ({ show, setModel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { hendaleLogin } = useAuth();

  const closeModel = () => {
    setModel(!show);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await hendaleLogin(email, password);
    if (res) {
      if (res.role == 1) history.push("/deshborad");
      else if (res.role == 2) history.push("/admin/deshborad");
    }
    setError("Password or Email are incorrect !");
  };

  return (
    <Modal className="login-model" isOpen={show}>
      <div className="login-wrapeer">
        <div className="top-login">
          <i className="fa fa-times-circle " onClick={closeModel}></i>
          <h1 className="title-signin">Sign In</h1>
        </div>
        <div className="main-model">
          <form className="login-form" onSubmit={onSubmit}>
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
            <span className="error-field-login">{error}</span>
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
