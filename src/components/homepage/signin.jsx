import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import Modal from "react-modal";
import "./signin.css";
import { useHistory } from "react-router-dom";
Modal.setAppElement("#root");
const formFields = {
  email: "",
  password: "",
};
const Signin = ({ show, setModel }) => {
  const { register, handleSubmit, errors } = useForm();
  const [formInfo, setFormInfo] = useState(formFields);
  const [error, setError] = useState("");
  const [hide, setHide] = useState({
    state: true,
    type: "password",
    text: "show",
  });
  const history = useHistory();
  const { hendaleLogin } = useAuth();

  const closeModel = () => {
    setModel(!show);
  };
  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    const res = await hendaleLogin(formInfo);
    if (res) {
      setModel(!show);
      if (res.role == 1) history.push("/deshborad");
      else if (res.role == 2) history.push("/admin/deshborad");
    }
    setError("You have entered an invalid email or password");
    return false;
  };

  const tooglePass = () => {
    hide.state
      ? setHide({ state: false, text: "hide", praesnt: "text" })
      : setHide({ state: true, text: "show", type: "password" });
  };

  return (
    <Modal className="model login-model" isOpen={show}>
      <div className="login-wrapeer">
        <div className="top-login">
          <i className="fa fa-times-circle " onClick={closeModel}></i>
          <h1 className="title-signin">Sign In</h1>
        </div>
        <div className="main-model">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-containter">
              <input
                name="email"
                type="email"
                className="input-login"
                placeholder="Email"
                onChange={handleChange}
                required
                ref={register({
                  pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                })}
              />
            </div>
            <div className="error-box">
              {errors.email && errors.email.type === "pattern" && (
                <p className="error-field">Invalid email</p>
              )}
            </div>
            <div className="input-containter">
              <input
                name="password"
                type={hide.type}
                className="input-login"
                placeholder="Passsword"
                autoComplete="on"
                onChange={handleChange}
                required
                ref={register({
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                })}
              />
              <button className="btn-hide" type="button" onClick={tooglePass}>
                {hide.state ? (
                  <i className="fa fa-eye-slash"></i>
                ) : (
                  <i className="fa fa-eye"></i>
                )}
              </button>
            </div>

            <div className="error-box">
              {errors.password && errors.password.type === "pattern" && (
                <p className="error-field">Invalid password</p>
              )}
            </div>
            <button className="login-btn" type="submit">
              Sign In
            </button>
          </form>
          <span className="error-field-login">{error}</span>
          <img className="login-img" src="./login_pets.png" alt="" />
        </div>
      </div>
    </Modal>
  );
};

export default Signin;
