import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavLogged from "./navLogged";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import SwiperCore, { Navigation } from "swiper";
import "./mypets.css";
SwiperCore.use(Navigation);
const Mypets = () => {
  const { currentUser, getPets } = useAuth();
  const [onPets, setOnPets] = useState([]);
  const [savedPets, setSavedPets] = useState([]);
  const [toggle, setToggle] = useState({
    state: false,
    text: "Saved",
    praesnt: [],
  });

  const myPets = async () => {
    const obj = await getPets();
    setOnPets(obj.adopted);
    setToggle({ praesnt: obj.adopted });
    setSavedPets(obj.saved);
  };
  useEffect(() => {
    myPets();
  }, []);

  const onToogle = () => {
    toggle.state
      ? setToggle({ state: false, text: "Saved", praesnt: onPets })
      : setToggle({ state: true, text: "Ownes", praesnt: savedPets });
  };
  const slides = [];
  {
  }
  for (let i = 0; i < toggle.praesnt.length; i++) {
    slides.push(
      <SwiperSlide key={`img${i}`}>
        <div className="card-pet">
          <div className="pet-img">
            <img
              src={toggle.praesnt[i].image_url}
              alt={toggle.praesnt[i].image_name}
            />
          </div>
          <div className="pet-info">
            <div className="status-pet">
              <div className="info">
                <p>name : {toggle.praesnt[i].name}</p>
                <p>status : {toggle.praesnt[i].status}</p>
              </div>
              <NavLink
                className="btn-more"
                exact
                to={`/Petpage/${toggle.praesnt[i]._id}`}
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
      {onPets.length === 0 && savedPets.length === 0 && (
        <div>
          <h1 className="no-pets">
            you currently do not own or foster any pets &#128562;
            <br /> Go get yourself some &#128062;
          </h1>
        </div>
      )}
      <section className="my-pets">
        <button
          className={
            toggle.text === "Saved" ? "pets save-btn" : "pets owned-btn"
          }
          type="button"
          onClick={onToogle}
        >
          {toggle.text || "Saved"}
        </button>
        <div
          className={
            toggle.text === "Saved" ? "card-pet save-btn" : "card-pet owned-btn"
          }
        >
          <Swiper spaceBetween={20} slidesPerView={3} navigation>
            {slides}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Mypets;
