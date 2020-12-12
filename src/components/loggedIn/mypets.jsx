import React, { useState } from "react";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "./mypets.css";

SwiperCore.use(Navigation);
const Mypets = () => {
  const pets = [
    {
      name: "bob",
      status: "foster",
      petImg: "./dogs/dog.jpg",
    },
    {
      name: "Dj",
      status: "adopted",
      petImg: "./dogs/adorable.jpg",
    },
    {
      name: "rambo",
      status: "foster",
      petImg: "./dogs/english-bulldog.jpg",
    },
    {
      name: "dani",
      status: "adopted",
      petImg: "/dogs/pug1.jpg",
    },
    {
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
            </div>
            <div className="show-more">
              <button type="button" className="btn-more">
                Show More
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  }
  return (
    <section className="my-pets">
      <div className="crads-pets">
        <Swiper spaceBetween={10} slidesPerView={3} navigation>
          {slides}
        </Swiper>
      </div>
    </section>
  );
};

export default Mypets;
