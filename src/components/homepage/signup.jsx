import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import Modal from "react-modal";
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

const formFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  repatePass: "",
};
const Signup = ({ show, setModel, loginModel }) => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formInfo, setFormInfo] = useState(formFields);

  const history = useHistory();
  const { signupUser } = useAuth();

  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    setDisabled(true);
    if (compearPass()) {
      const res = await signupUser(formInfo);
      if (res.error === 1) notifyError(res.dataSevere);
      else {
        history.push("/deshborad");
      }
    } else {
      notifyError("Password confirmation does not match to password !");
      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 1000);
    }

    return false;
  };

  const closeModel = () => {
    setModel(!show);
  };
  const changeModel = () => {
    setModel(false);
    loginModel(true);
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
    patternEmial: "This email is invalid",
    patternPhone: "Invalid phone number",
  };
  const compearPass = () => {
    return formInfo.password === formInfo.repatePass ? true : false;
  };

  return (
    <Modal className="model signup-model" isOpen={show}>
      <ToastContainer className="notification" />
      <div className="top-model">
        <i className="fa fa-times-circle" onClick={closeModel}></i>
        <h1 className="title-sign">Sign Up</h1>
      </div>
      <div className="wrapeer-model">
        <form className="model-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="firstName"
            className="input-field"
            type="text"
            placeholder="First Name.."
            onChange={handleChange}
            minLength="2"
            maxLength="10"
            required
            ref={register({ pattern: /^[A-Za-z]+$/i })}
          />
          <div className="error-box">
            {errors.firstName && errors.firstName.type === "pattern" && (
              <p className="error-field">English letters only</p>
            )}
          </div>
          <input
            name="lastName"
            className="input-field"
            type="text"
            placeholder="Last Name.."
            onChange={handleChange}
            minLength="2"
            maxLength="10"
            required
            ref={register({
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          <div className="error-box">
            {errors.lastName && errors.lastName.type === "pattern" && (
              <p className="error-field">English letters only</p>
            )}
          </div>

          <input
            name="email"
            className="input-field"
            type="email"
            placeholder="exmple@exmple.com"
            onChange={handleChange}
            required
            ref={register({
              pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            })}
          />
          <div className="error-box">
            {errors.email && errors.email.type === "pattern" && (
              <p className="error-field">{Errors.patternEmial}</p>
            )}
          </div>
          <input
            name="phone"
            className="input-field"
            type="number"
            placeholder="Phone Number"
            onChange={handleChange}
            minLength="9"
            maxLength="10"
            required
            ref={register({
              pattern: /^((\+|00)\-?972?|0)(([23489]|[57]\d)\-?\d{7})$/gm,
            })}
          />
          <div className="error-box">
            {errors.phone && errors.phone.type === "pattern" && (
              <p className="error-field">{Errors.patternPhone}</p>
            )}
          </div>
          <div className="inputs-fields">
            <input
              name="password"
              className="input-field"
              type="password"
              placeholder="Password.."
              autoComplete="on"
              onChange={handleChange}
              required
              ref={register({
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
              })}
            />
            <input
              name="repatePass"
              className="input-field"
              type="password"
              placeholder="confirm password..."
              autoComplete="on"
              onChange={handleChange}
              required
            />
          </div>
          <div className="error-box">
            {errors.password && errors.password.type === "pattern" && (
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
                I agree to the Terms and Conditions.
              </label>
            </div>
            <button
              className="change-model"
              type="button"
              onClick={changeModel}
            >
              already have an account?
            </button>
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
