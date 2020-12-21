import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import { useHistory } from "react-router-dom";
import NavLogged from "./navLogged";
import "./profilesettings.css";

const override = css`
  position: fixed;
  top: 40%;
  left: 20%;
  border-color: red;
`;
const ProfileSettings = () => {
  const { currentUser, hendlaUpdate } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  useEffect(() => {
    setProfile();

    return () => {
      setProfile();
    };
  }, []);

  const setProfile = () => {
    setFirstname(currentUser[0].firstName);
    setLastname(currentUser[0].lastName);
    setEmail(currentUser[0].email);
    setPhone(currentUser[0].phone);
    setBio(currentUser[0].bio);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    const updateData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      bio: bio,
    };
    const res = await hendlaUpdate(updateData, currentUser[0].uId);
    res
      ? notify("Your details have been successfully updated")
      : notify("Error updating! Please try again later");

    setTimeout(() => {
      setLoading(false);
      setDisabled(false);
    }, 2000);
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
  return (
    <>
      <NavLogged />
      <div className="profile">
        <ToastContainer className="notification" />
        <div className="settings-img">
          <img src="./profile.jpg" alt="profile-men" />
        </div>
        <div className="settings-form">
          <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="firstName"
              type="text"
              className="profile-input"
              placeholder="First Name..."
              minLength="2"
              maxLength="10"
              value={firstName || ""}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              name="lastName"
              type="text"
              className="profile-input"
              placeholder="Last Name..."
              minLength="2"
              maxLength="12"
              value={lastName || ""}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              name="email"
              type="text"
              className="profile-input"
              placeholder="Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
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
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
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
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
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
