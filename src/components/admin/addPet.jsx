import React from "react";
import NavLogged from "../loggedIn/navLogged";
import "./addPet.css";

const AddPet = () => {
  return (
    <>
      <NavLogged />
      <section className="add-pet">
        <div className="add-pet-img">
          <img src="../admin1.jpg" alt="admin1-img" />
        </div>
        <div className="add-pet-form">
          <form className="add-pet-form">
            <div className="input-group">
              <input
                type="text"
                className="add-pet-input"
                placeholder="Type..."
              />
              <input
                type="text"
                className="add-pet-input"
                placeholder="Name..."
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="add-pet-input"
                placeholder="Adoption Status..."
              />
              <input
                type="text"
                className="add-pet-input"
                placeholder="Color..."
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="add-pet-input"
                placeholder="Height..."
              />
              <input
                type="text"
                className="add-pet-input"
                placeholder="Weight.."
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="add-pet-input"
                placeholder="Hypoallergenic...(yes || no)"
              />
              <input
                type="text"
                className="add-pet-input"
                placeholder="dietary restrictions"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="add-pet-input"
                placeholder="breed of animal..."
              />
              <input
                type="text"
                className="add-pet-input"
                placeholder="Bio...."
              />
            </div>
            <input type="file" name="pet" />
            <div className="btn-groupe">
              <button type="submit" className="btnpet add-pet-btn">
                Add pet
              </button>
              <button type="reset" className="btnpet add-pet-reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddPet;
