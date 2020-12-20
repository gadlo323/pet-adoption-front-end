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
      type: "Dog",
      waight: "20Kg",
      Height: "130sm",
      status: "foster",
      color: "white",
      Bio: "next time...",
      hypoallergenic: "No",
      breed: "Brenner Zannenhund",
      dietary: "No",
      petImg: "./dogs/dog.jpg",
    },
    {
      id: 2,
      name: "Dj",
      type: "Dog",
      waight: "15Kg",
      Height: "120sm",
      status: "adopted",
      color: "white",
      Bio: "love to by up",
      hypoallergenic: "No",
      breed: "Labrador",
      dietary: "No",
      petImg: "./dogs/adorable.jpg",
    },
    {
      id: 3,
      name: "rambo",
      type: "Dog",
      waight: "3Kg",
      Height: "50sm",
      status: "adopted",
      color: "white",
      Bio: "love to play",
      hypoallergenic: "Yes",
      breed: "english-bulldog",
      dietary: "No milk",
      petImg: "./dogs/english-bulldog.jpg",
    },
    {
      id: 4,
      name: "dani",
      type: "Dog",
      waight: "2Kg",
      Height: "50sm",
      status: "adopted",
      color: "white",
      Bio: "love to cuddle",
      hypoallergenic: "No",
      breed: "pug",
      dietary: "No oil",
      petImg: "/dogs/pug1.jpg",
    },
    {
      id: 5,
      name: "shorty",
      type: "Dog",
      waight: "2Kg",
      Height: "50sm",
      status: "foster",
      color: "beige ",
      Bio: "love to sleep",
      hypoallergenic: "Yes",
      breed: "pug",
      dietary: "No meat",
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
                <span>{pet[0].type}</span>
              </div>
              <div className="colume">
                <strong>Waight</strong>
                <span>{pet[0].waight}</span>
              </div>
              <div className="colume">
                <strong>Height</strong>
                <span>{pet[0].Height}</span>
              </div>
            </div>
            <div className="row">
              <div className="colume">
                <strong>Adoption Status</strong>
                <span>{pet[0].status}</span>
              </div>
              <div className="colume">
                <strong>color</strong>
                <span>{pet[0].color}</span>
              </div>
              <div className="colume">
                <strong>Bio</strong>
                <span>{pet[0].Bio}</span>
              </div>
            </div>
            <div className="row">
              <div className="colume">
                <strong>Hypoallergenic</strong>
                <span>{pet[0].hypoallergenic}</span>
              </div>
              <div className="colume">
                <strong> breed of animal</strong>
                <span>{pet[0].breed}</span>
              </div>
              <div className="colume">
                <strong>dietary restrictions</strong>
                <span>{pet[0].dietary}</span>
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
