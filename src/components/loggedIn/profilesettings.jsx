import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import NavLogged from "./navLogged";
import "./profilesettings.css";

const override = css`
  position: fixed;
  top: 40%;
  left: 20%;
  border-color: red;
`;
const formFields = {
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  password: null,
  bio: null,
};
const ProfileSettings = () => {
  const { currentUser, hendlaUpdate, getUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formInfo, setFormInfo] = useState(formFields);
  const { register, handleSubmit, errors } = useForm();

  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    removeEmpty(formInfo);
    const res = await hendlaUpdate(formInfo, currentUser.uId);
    res === true
      ? notify("Your details have been successfully updated")
      : notifyError(res);

    setTimeout(() => {
      setLoading(false);
      setDisabled(false);
    }, 2000);
  };

  const removeEmpty = (obj) => {
    Object.keys(obj).forEach(
      (key) => (obj[key] == null || obj[key] == "") && delete obj[key]
    );
  };

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return (
    <>
      <NavLogged />
      <div className="profile">
        <ToastContainer className="notification" />
        <div className="settings-img">
          <img src="./profile.jpg" alt="profile-men" />
        </div>
        <div className="settings-form">
          <form
            className="profile-form"
            onSubmit={(e) => handleSubmit(onSubmit(e))}
          >
            <input
              name="first_name"
              type="text"
              className="profile-input"
              placeholder="First Name..."
              value={formInfo.first_name || ""}
              minLength="2"
              maxLength="10"
              onChange={handleChange}
            />
            <input
              name="last_name"
              type="text"
              className="profile-input"
              placeholder="Last Name..."
              value={formInfo.last_name || ""}
              minLength="2"
              maxLength="12"
              onChange={handleChange}
            />
            <input
              name="email"
              type="text"
              className="profile-input"
              placeholder="Email"
              value={formInfo.email || ""}
              onChange={handleChange}
              ref={register({
                pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
              })}
            />
            <div className="error-box">
              {errors.email && errors.email.type === "pattern" && (
                <p className="error-field">invaild email!</p>
              )}
            </div>
            <input
              name="phone"
              type="text"
              className="profile-input"
              placeholder="Phone"
              value={formInfo.phone || ""}
              onChange={handleChange}
              ref={register({
                pattern: /^((\+|00)\-?972?|0)(([23489]|[57]\d)\-?\d{7})$/gm,
              })}
            />
            <div className="error-box">
              {errors.phone && errors.phone.type === "pattern" && (
                <p className="error-field">invaild Phone NUmber</p>
              )}
            </div>
            <input
              name="password"
              type="password"
              className="profile-input"
              placeholder="Password"
              value={formInfo.password || ""}
              onChange={handleChange}
              ref={register({
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
              })}
            />
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
            <input
              name="bio"
              type="text"
              className="profile-input"
              placeholder="Short Bio.."
              value={formInfo.bio || ""}
              onChange={handleChange}
            />

            <div className="brn-groupe">
              <button type="submit" className="save-btn" disabled={disabled}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <GridLoader
          css={override}
          size={40}
          color={"#123abc"}
          loading={loading}
        />
      </div>
    </>
  );
};

export default ProfileSettings;
