import React, { useState } from "react";
import "./petpage.css";

const Petpage = () => {
  return (
    <section className="detalis">
      <div className="pet-detalis">
        <div className="pet-img">
          <img src="./popy.png" alt="" />
        </div>
        <div className="pet-info">
          <div className="row">
            <div className="colume">
              <strong>Name</strong>
              <span>Charaly</span>
            </div>
            <div className="colume">
              <strong>Type</strong>
              <span>Dog</span>
            </div>
            <div className="colume">
              <strong> breed of animal</strong>
              <span>Poodle</span>
            </div>
            <div className="colume">
              <strong>Hypoallergenic</strong>
              <span>Yes</span>
            </div>
          </div>
          <div className="row">
            <div className="colume">
              <strong>Adoption Status</strong>
              <span>Adopt</span>
            </div>
            <div className="colume">
              <strong>color</strong>
              <span>Black</span>
            </div>
            <div className="colume">
              <strong>Bio</strong>
              <span>"I love hotDogs"</span>
            </div>
          </div>
          <div className="row">
            <div className="colume">
              <strong>Height</strong>
              <span>120sm</span>
            </div>
            <div className="colume">
              <strong>Waight</strong>
              <span>12Kg</span>
            </div>
            <div className="colume">
              <strong>dietary restrictions</strong>
              <span>12Kg</span>
            </div>
          </div>

          <div className="pet-btns">
            <button type="button" className="pet-btn save">
              Save
            </button>
            <button type="button" className="pet-btn Adopet">
              Adopet
            </button>
            <button type="button" className="pet-btn return">
              Return peth
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Petpage;
