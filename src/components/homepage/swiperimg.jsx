import React from "react";
import "./swiperimg.css";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use(Navigation, Pagination, Autoplay);

const Swiperimg = () => {
  const img = [
    "./dogs/dog.jpg",
    "./dogs/adorable.jpg",
    "./dogs/dachshund.jpg",
    "./dogs/english-bulldog.jpg",
    "./dogs/pets.jpg",
    "./dogs/pug1.jpg",
    "./dogs/pug2.jpg",
  ];
  const slides = [];
  for (let i = 0; i < img.length; i++) {
    slides.push(
      <SwiperSlide key={`img${i}`} tag="li">
        <img className="dog-img" src={img[i]} alt={`dog${i}`} />
      </SwiperSlide>
    );
  }
  return (
    <section id="swiper">
      <Swiper
        tag="section"
        wrapperTag="ul"
        spaceBetween={20}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 1000 }}
        pagination={{ clickable: true }}
      >
        {slides}
      </Swiper>
    </section>
  );
};

export default Swiperimg;
