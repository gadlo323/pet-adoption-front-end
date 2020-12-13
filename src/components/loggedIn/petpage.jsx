import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavLogged from "./navLogged";
import "./petpage.css";

const Petpage = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  // console.log(id);
  const pets = [
    {
      id: 1,
      name: "bob",
      status: "foster",
      petImg: "./dogs/dog.jpg",
    },
    {
      id: 2,
      name: "Dj",
      status: "adopted",
      petImg: "./dogs/adorable.jpg",
    },
    {
      id: 3,
      name: "rambo",
      status: "foster",
      petImg: "./dogs/english-bulldog.jpg",
    },
    {
      id: 4,
      name: "dani",
      status: "adopted",
      petImg: "/dogs/pug1.jpg",
    },
    {
      id: 5,
      name: "shorty",
      status: "foster",
      petImg: "./dogs/pug2.jpg",
    },
  ];
  const pet = pets.filter((item) => item.id == id);

  return (
    <>
      <NavLogged />
      <section className="detalis">
        <div className="pet-detalis">
          <div className="pet-img">
            <h2>Hey, I'm {pet[0].name}</h2>
            <img src={pet[0].petImg} alt="" />
          </div>
          <div className="pet-info">
            <div className="row">
              <div className="colume">
                <strong>Name</strong>
                <span>{pet[0].name}</span>
              </div>
              <div className="colume">
                <strong>Type</strong>
                <span>Dog</span>
              </div>
              <div className="colume">
                <strong>Waight</strong>
                <span>12Kg</span>
              </div>
              <div className="colume">
                <strong>Height</strong>
                <span>120sm</span>
              </div>
            </div>
            <div className="row">
              <div className="colume">
                <strong>Adoption Status</strong>
                <span>{pet[0].status}</span>
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
                <strong>Hypoallergenic</strong>
                <span>Yes</span>
              </div>
              <div className="colume">
                <strong> breed of animal</strong>
                <span>Poodle</span>
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
    </>
  );
};

export default Petpage;
