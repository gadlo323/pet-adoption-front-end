import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import "./signup.css";

Modal.setAppElement("#root");
const Signup = ({ show, setModel }) => {
  // const [firstName, setFirstname] = useState("");
  // const [lastName, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  // const [repatePass, setRepatePass] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };

  const closeModel = () => {
    setModel(!show);
  };

  const Errors = {
    required: "This is required Field",
    minLength: "Minimum characters of 2",
    maxLength: "Minimum characters of 10",
    patternEmial: "This email is invalid or already in use",
    patternPhone: "Invalid phone number",
  };

  return (
    <Modal className="signup-model" isOpen={show}>
      <div className="top-model">
        <i className="fa fa-times-circle" onClick={closeModel}></i>
        <h1 className="title-sign">Sign Up</h1>
      </div>
      <div className="wrapeer-model">
        <form className="model-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs-fields">
            <input
              name="firstName"
              className="input-field"
              type="text"
              placeholder="First Name.."
              ref={register({ required: true, minLength: 2, maxLength: 10 })}
            />
            <input
              name="lastName"
              className="input-field"
              type="text"
              placeholder="Last Name.."
              ref={register({ required: true, minLength: 2, maxLength: 10 })}
            />
          </div>

          <div className="error-box">
            {errors.firstName && errors.firstName.type === "required" && (
              <p className="error-field">{Errors.required}</p>
            )}
            {errors.firstName && errors.firstName.type === "minLength" && (
              <p className="error-field">{Errors.minLength}</p>
            )}
            {errors.firstName && errors.firstName.type === "max" && (
              <p className="error-field">{Errors.maxLength}</p>
            )}
            {errors.lastName && errors.lastName.type === "required" && (
              <p className="error-field">{Errors.required}</p>
            )}
          </div>
          <input
            name="email"
            className="input-field"
            type="email"
            placeholder="exmple@exmple.com"
            ref={register({
              required: true,
              pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            })}
          />
          <div className="error-box">
            {errors.email && errors.email.type === "required" && (
              <p className="error-field">{Errors.required}</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="error-field">{Errors.patternEmial}</p>
            )}
          </div>
          <input
            name="phone"
            className="input-field"
            type="number"
            placeholder="Phone Number"
            ref={register({
              required: true,
              pattern: /^((\+|00)?972\-?|0)(([23489]|[57]\d)\-?\d{7})$/gm,
            })}
          />
          <div className="error-box">
            {errors.phone && errors.phone.type === "required" && (
              <p className="error-field">{Errors.required}</p>
            )}
            {errors.phone && errors.phone.type === "pattern" && (
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
              ref={register({
                required: true,
                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
              })}
            />
            <input
              name="reapetPassport"
              className="input-field"
              type="password"
              placeholder="confirm password..."
              autoComplete="on"
              ref={register({ required: true })}
            />
          </div>
          <div className="error-box">
            {errors.reapetPassport &&
              errors.reapetPassport.type === "required" && (
                <p className="error-field">{Errors.required}</p>
              )}
            {errors.Password && errors.Password.type === "required" && (
              <p className="error-field">{Errors.required}</p>
            )}
            {/* {errors.Password && errors.Password.type === "pattern" && (
              <p className="error-field">{Errors.password}</p>
            )} */}
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
