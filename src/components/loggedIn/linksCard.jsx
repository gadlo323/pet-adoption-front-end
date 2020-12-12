import React from "react";
import "./linksCard.css";

const LinksCard = () => {
  return (
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
            <a href="#">Go Search</a>
          </div>
        </div>
        <div className="card">
          <div className="top-card">
            <h2>Profile Settings</h2>
          </div>
          <div className="crad-img">
            <img src="./linkscard/profileSettings.png" alt="profileSettings" />
          </div>
          <div className="crad-link">
            <a href="#">Go to settings</a>
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
            <a href="#">Go to my pet</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksCard;
