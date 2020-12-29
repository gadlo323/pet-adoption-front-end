import React, { useState, useEffect } from "react";
import Navhome from "../homepage/navhome";
import { NavLink } from "react-router-dom";
import NavLogged from "../loggedIn/navLogged";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import Searchbar from "./searchbar";
import "./search.css";
const Serach = () => {
  const { currentUser } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    const lastSearch = JSON.parse(localStorage.getItem("search"));
    setList(lastSearch);
  }, []);

  const slides = [];
  for (let i = 0; i < list.length; i++) {
    slides.push(
      <SwiperSlide key={`img${i}`}>
        <div className="card-pet search-card">
          <div className="pet-img">
            <img src={list[i].image_url} alt={list[i].image_name} />
          </div>
          <div className="pet-info">
            <div className="status-pet">
              <div className="info">
                <p>Type : {list[i].type}</p>
                <p>Name : {list[i].name}</p>
                <p>Status : {list[i].status}</p>
                <p>Height : {list[i].height}</p>
                <p>Weight : {list[i].weight}</p>
              </div>
              <NavLink
                className="btn-more"
                exact
                to={`/Petpage/${list[i]._id}`}
              >
                show more
              </NavLink>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  }
  return (
    <>
      {currentUser ? <NavLogged /> : <Navhome />}
      <section className="search-page">
        <Searchbar setList={setList} />
        <div className="crads-pets">
          <Swiper spaceBetween={20} slidesPerView={3} navigation>
            {slides}
          </Swiper>
          {list.length === 0 && <h1>No Result foud...</h1>}
        </div>
      </section>
      ;
    </>
  );
};

export default Serach;
