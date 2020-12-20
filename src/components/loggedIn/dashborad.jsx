import React from "react";
import { NavLink } from "react-router-dom";
import NavLogged from "./navLogged";
import "./dashborad.css";

const Dashborad = () => {
  return (
    <>
      <NavLogged />
      <div className="wrapper">
        <div className="cards">
          <div className="card">
            <div className="top-card">
              <h2>Search</h2>
            </div>
            <div className="crad-img">
              <img src="./linkscard/search.png" alt="search" />
            </div>
            <div className="crad-link">
              <NavLink exact to="/search">
                Go Search
              </NavLink>
            </div>
          </div>
          <div className="card">
            <div className="top-card">
              <h2>Profile Settings</h2>
            </div>
            <div className="crad-img">
              <img
                src="./linkscard/profileSettings.png"
                alt="profileSettings"
              />
            </div>
            <div className="crad-link">
              <NavLink exact to="/ProfileSettings">
                Go to settings
              </NavLink>
            </div>
          </div>
          <div className="card">
            <div className="top-card">
              <h2>My Pet</h2>
            </div>
            <div className="crad-img">
              <img src="./linkscard/myPets.png" alt="dogs" />
            </div>
            <div className="crad-link">
              <NavLink exact to="/Mypets">
                Go to my pet
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashborad;
