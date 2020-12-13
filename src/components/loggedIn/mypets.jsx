import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavLogged from "./navLogged";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "./mypets.css";

SwiperCore.use(Navigation);
const Mypets = () => {
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
  const slides = [];
  for (let i = 0; i < pets.length; i++) {
    slides.push(
      <SwiperSlide key={`img${i}`}>
        <div className="card-pet">
          <div className="pet-img">
            <img src={pets[i].petImg} alt={pets[i].name} />
          </div>
          <div className="pet-info">
            <div className="status-pet">
              <p>name : {pets[i].name}</p>
              <p>status : {pets[i].status}</p>
              <NavLink
                className="btn-more"
                exact
                to={`/Petpage?id=${pets[i].id}`}
              >
                Show More
              </NavLink>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  }
  return (
    <>
      <NavLogged />
      <section className="my-pets">
        <div className="crads-pets">
          <Swiper spaceBetween={20} slidesPerView={3} navigation>
            {slides}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Mypets;
