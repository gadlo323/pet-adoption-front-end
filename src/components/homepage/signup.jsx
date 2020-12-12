import React, { useState } from "react";
import Modal from "react-modal";
import "./signup.css";

Modal.setAppElement("#root");
const Signup = ({ show, setModel }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repatePass, setRepatePass] = useState("");

  const closeModel = () => {
    setModel(!show);
  };

  return (
    <Modal className="signup-model" isOpen={show}>
      <div className="top-model">
        <i className="fa fa-times-circle" onClick={closeModel}></i>
        <h1 className="title-sign">Sign Up</h1>
      </div>
      <div className="wrapeer-model">
        <form className="model-form">
          <div className="inputs-fields">
            <input
              name="firstname"
              className="input-field"
              type="text"
              value={firstName}
              placeholder="First Name.."
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              name="lastname"
              className="input-field"
              type="text"
              value={lastName}
              placeholder="Last Name.."
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <input
            name="email"
            className="input-field"
            type="email"
            placeholder="exmple@exmple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="inputs-fields">
            <input
              name="Password"
              className="input-field"
              type="password"
              placeholder="Password.."
              value={password}
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              name="reapetPassport"
              className="input-field"
              type="password"
              placeholder="confirm password..."
              value={repatePass}
              autoComplete="on"
              onChange={(e) => setRepatePass(e.target.value)}
              required
            />
          </div>
          <div className="btn-Group">
            <div className="agree-terms">
              <input
                name="terms"
                className="input-terms"
                type="checkbox"
                required
              />
              <label htmlFor="terms">
                I agree to all the terms of the site
              </label>
            </div>
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </div>
        </form>
        <img className="popy-cover" src="./popy.png" alt="popy" />
      </div>
    </Modal>
  );
};

export default Signup;
