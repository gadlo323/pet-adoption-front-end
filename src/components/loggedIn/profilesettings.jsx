import React, { useState } from "react";
import "./profilesettings.css";

const ProfileSettings = () => {
  return (
    <div className="profile">
      <div className="settings-img">
        <img src="./profile.jpg" alt="profile-men" />
      </div>
      <div className="settings-form">
        <form className="profile-form">
          <input
            type="text"
            className="profile-input"
            placeholder="First Name..."
          />
          <input
            type="text"
            className="profile-input"
            placeholder="Last Name..."
          />
          <input type="text" className="profile-input" placeholder="Email" />
          <input type="text" className="profile-input" placeholder="Phone" />
          <input type="text" className="profile-input" placeholder="Password" />
          <input
            type="text"
            className="profile-input"
            placeholder="Short Bio.."
          />

          <div className="brn-groupe">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="reset" className="reset-btn">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
