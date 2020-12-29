import React, { useState, useEffect } from "react";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import NavLogged from "./navLogged";
import Navhome from "../homepage/navhome";
import "./petpage.css";

const Petpage = (props) => {
  const { currentUser, getPet } = useAuth();
  const [petData, setPetData] = useState({});

  const getPetData = async () => {
    const id = props.match.params.id;
    const obj = await getPet(id);
    if (obj) {
      setPetData(obj);
    }
  };
  useEffect(() => {
    getPetData();
  }, []);

  return (
    <>
      {currentUser ? <NavLogged /> : <Navhome />}
      <section className="detalis">
        <div className="pet-detalis">
          <div className="pet-img">
            <h2>Hey, I'm {petData.name}</h2>
            <img src={petData.image_url} alt={petData.image_name} />
          </div>
          <div className="pet-info">
            <div className="row">
              <div className="colume">
                <strong>Name</strong>
                <span>{petData.name}</span>
              </div>
              <div className="colume">
                <strong>Type</strong>
                <span>{petData.type}</span>
              </div>
              <div className="colume">
                <strong>Waight</strong>
                <span>{petData.weight}K.g</span>
              </div>
              <div className="colume">
                <strong>Height</strong>
                <span>{petData.height} c.m</span>
              </div>
            </div>
            <div className="row">
              <div className="colume">
                <strong>Adoption Status</strong>
                <span>{petData.status}</span>
              </div>
              <div className="colume">
                <strong>color</strong>
                <span>{petData.color}</span>
              </div>
              <div className="colume">
                <strong>Bio</strong>
                <span>{petData.bio}</span>
              </div>
            </div>
            <div className="row">
              <div className="colume">
                <strong>Hypoallergenic</strong>
                <span>{petData.hypoallergenic ? "Yes" : "No"}</span>
              </div>
              <div className="colume">
                <strong> breed</strong>
                <span>{petData.breed}</span>
              </div>
              <div className="colume">
                <strong>dietary restrictions</strong>
                <span>{petData.dietary}</span>
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
