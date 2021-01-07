import React, { useState, useEffect, useRef } from "react";
import PrartiClas from "../globel/Particles";
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
  z-index: 100;
`;
const formFields = {
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  password: null,
  password_repeat: null,
  bio: null,
};
const ProfileSettings = () => {
  const { currentUser, hendlaUpdate, userInfo } = useAuth();
  const [loading, setLoading] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [formInfo, setFormInfo] = useState(formFields);
  const [infoLogged, setInfoLogged] = useState({});
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password");

  const info = async () => {
    const data = await userInfo(currentUser.uId);
    if (data) setInfoLogged(data);
  };

  useEffect(() => {
    info();

    return () => {
      info();
    };
  }, []);

  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    removeEmpty(formInfo);
    const size = Object.keys(formInfo).length;
    if (size) {
      setLoading(true);
      setDisabled(true);

      const res = await hendlaUpdate(formInfo);
      res === true
        ? notify("Your details have been successfully updated")
        : notifyError(res);

      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 2000);
    } else {
      notifyError(
        "Come on man, this page is for updating your user account..."
      );
    }
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
        <div className="cool">
          <PrartiClas colorPic={"#AA424C"} />
        </div>
        <ToastContainer className="notification" />
        <div className="settings-img">
          <img src="./profile.png" alt="profile-men" />
        </div>
        <div className="settings-form">
          <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="profile-lable" htmlFor="first_name">
              First Name
            </label>
            <input
              name="first_name"
              type="text"
              className="profile-input"
              placeholder={infoLogged.first_name}
              minLength="2"
              maxLength="15"
              onChange={handleChange}
              ref={register({ pattern: /^[A-Za-z]+$/i })}
            />
            <div className="error-box">
              {errors.first_name && errors.first_name.type === "pattern" && (
                <p className="error-field">English letters only</p>
              )}
            </div>
            <label className="profile-lable" htmlFor="last_name">
              Last Name
            </label>
            <input
              name="last_name"
              type="text"
              className="profile-input"
              placeholder={infoLogged.last_name}
              minLength="2"
              maxLength="15"
              onChange={handleChange}
              ref={register({ pattern: /^[A-Za-z]+$/i })}
            />
            <div className="error-box">
              {errors.last_name && errors.last_name.type === "pattern" && (
                <p className="error-field">English letters only</p>
              )}
            </div>
            <label className="profile-lable" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="profile-input"
              placeholder={infoLogged.email}
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
            <label className="profile-lable" htmlFor="phone">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              className="profile-input"
              placeholder={infoLogged.phone}
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
            <label className="profile-lable" htmlFor="bio">
              Bio
            </label>
            <input
              name="bio"
              type="text"
              className="profile-input"
              placeholder={infoLogged.bio || "Short Bio.."}
              minLength="2"
              maxLength="140"
              onChange={handleChange}
              ref={register({ pattern: /^[A-Za-z\s]+$/i })}
            />
            <div className="error-box">
              {errors.bio && errors.bio.type === "pattern" && (
                <p className="error-field">
                  Bio should consist of English letters only and up to 140
                  characters.
                </p>
              )}
            </div>
            <input
              name="password"
              type="password"
              className="profile-input"
              placeholder="Password"
              onChange={handleChange}
              ref={register({
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
              })}
            />
            <input
              name="password_repeat"
              type="password"
              className="profile-input"
              placeholder="confirm password..."
              onChange={handleChange}
              ref={register({
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.password_repeat && (
              <p className="error-field">{errors.password_repeat.message}</p>
            )}

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
