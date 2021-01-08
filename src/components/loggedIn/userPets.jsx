import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";
import PrartiClas from "../globel/Particles";
import NavLogged from "./navLogged";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import { ToastContainer, toast } from "react-toastify";
import "./mypets.css";
const UserPets = () => {
  const { getPets, returnsavePet } = useAuth();
  const [onPets, setOnPets] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [savedPets, setSavedPets] = useState([]);
  const [toggle, setToggle] = useState({
    state: false,
    text: "Saved",
    praesnt: [],
    icon: "./save-close.png",
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

  const removeSavePet = async (e) => {
    setDisabled(true);
    const petId = e.target.id;
    const result = await returnsavePet(petId);
    if (result) {
      notify("The pet was successfully removed");
      setTimeout(() => {
        setDisabled(false);
      }, 2500);
      reloadPage();
    }
  };

  const onToogle = () => {
    toggle.state
      ? setToggle({
          state: false,
          text: "saved",
          praesnt: onPets,
          icon: "./save-close.png",
        })
      : setToggle({
          state: true,
          text: "owned",
          praesnt: savedPets,
          icon: "./owned-folder.png",
        });
  };

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 2700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };
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
        <div className="cool">
          <PrartiClas colorPic={"#6f86d6"} distance={10} />
        </div>
        <ToastContainer className="notification" />
        <button
          disabled={disabled}
          className="pets"
          type="button"
          onClick={onToogle}
        >
          <img src={toggle.icon || "./save-close.png"} alt="icon-folder" />
        </button>
        <div
          className={
            toggle.text !== "owned" ? "card-pet save-btn" : "card-pet owned-btn"
          }
        >
          <Carousel showThumbs={false}>
            {toggle.praesnt.map((item, i) => {
              return (
                <div key={i} className="card-pet">
                  <div className="pet-img">
                    <img src={item.image_url} alt={item.image_name} />
                  </div>
                  <div className="pet-info">
                    <div className="status-pet">
                      <div className="info">
                        <p>name : {item.name}</p>
                        <p>status : {item.status}</p>
                        {item.status === "available" && (
                          <button
                            id={item._id}
                            className="delete-saved"
                            onClick={removeSavePet}
                          >
                            <img
                              className="trash-icon"
                              src="/trash-bin.png"
                              alt="trash-icon"
                            />
                          </button>
                        )}
                      </div>
                      <NavLink
                        className="btn-more"
                        exact
                        to={`/Petpage/${item._id}/true`}
                      >
                        <img
                          className="trash-icon"
                          src="/more-icon.png"
                          alt="more-info-icon"
                        />
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default UserPets;
