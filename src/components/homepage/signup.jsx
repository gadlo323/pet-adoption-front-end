import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import "./signup.css";

const override = css`
  position: fixed;
  top: 30%;
  left: 50%;
  border-color: red;
`;
Modal.setAppElement("#root");
const Signup = ({ show, setModel }) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repatePass, setRepatePass] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const { signupUser } = useAuth();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    const formSign = {
      uId: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      repeatPassword: repatePass,
    };
    if (compearPass()) {
      const res = await signupUser(formSign);
      if (res) history.push("/deshborad");
    } else notifyError("Password confirmation does not match to password !");

    setTimeout(() => {
      setLoading(false);
      setDisabled(false);
    }, 1000);

    // console.log(formSign, data);
  };

  const closeModel = () => {
    setModel(!show);
  };

  const notifyError = (error) =>
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const Errors = {
    patternEmial: "This email is invalid or already in use",
    patternPhone: "Invalid phone number",
  };
  const compearPass = () => {
    return password === repatePass ? true : false;
  };

  return (
    <Modal className="signup-model" isOpen={show}>
      <ToastContainer className="notification" />
      <div className="top-model">
        <i className="fa fa-times-circle" onClick={closeModel}></i>
        <h1 className="title-sign">Sign Up</h1>
      </div>
      <div className="wrapeer-model">
        <form className="model-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs-fields">
            <input
              name="FirstName"
              className="input-field"
              type="text"
              placeholder="First Name.."
              onChange={(e) => setFirstname(e.target.value)}
              minLength="2"
              maxLength="10"
              required
            />
            <input
              name="LastName"
              className="input-field"
              type="text"
              placeholder="Last Name.."
              onChange={(e) => setLastname(e.target.value)}
              minLength="2"
              maxLength="10"
              required
            />
          </div>
          <input
            name="Email"
            className="input-field"
            type="email"
            placeholder="exmple@exmple.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            ref={register({
              pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            })}
          />
          <div className="error-box">
            {errors.Email && errors.Email.type === "pattern" && (
              <p className="error-field">{Errors.patternEmial}</p>
            )}
          </div>
          <input
            name="Phone"
            className="input-field"
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            required
            ref={register({
              pattern: /^((\+|00)\-?972?|0)(([23489]|[57]\d)\-?\d{7})$/gm,
            })}
          />
          <div className="error-box">
            {errors.Phone && errors.Phone.type === "pattern" && (
              <p className="error-field">{Errors.patternPhone}</p>
            )}
          </div>
          <div className="inputs-fields">
            <input
              name="Password"
              className="input-field"
              type="password"
              placeholder="Password.."
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
              required
              ref={register({
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
              })}
            />
            <input
              name="RepeatPassword"
              className="input-field"
              type="password"
              placeholder="confirm password..."
              autoComplete="on"
              onChange={(e) => setRepatePass(e.target.value)}
              required
            />
          </div>
          <div className="error-box">
            {errors.Password && errors.Password.type === "pattern" && (
              <p className="error-field">
                Password must contain : <br />
                - at least 8 characters <br />
                - must contain at least 1 uppercase letter,
                <br />
                1 lowercase letter, and 1 number
                <br />- Can contain special characters
              </p>
            )}
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
            <button type="submit" className="signup-btn" disabled={disabled}>
              Sign Up
            </button>
          </div>
        </form>
        <img className="popy-cover" src="./popy.png" alt="popy" />
      </div>
      <GridLoader
        css={override}
        size={40}
        color={"#123abc"}
        loading={loading}
      />
    </Modal>
  );
};

export default Signup;
