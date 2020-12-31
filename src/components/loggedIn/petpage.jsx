import React, { useState, useEffect } from "react";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import NavLogged from "./navLogged";
import Navhome from "../homepage/navhome";
import "./petpage.css";

const override = css`
  position: fixed;
  top: 40%;
  left: 40%;
  border-color: red;
`;
const Petpage = (props) => {
  const { currentUser, getPet, adopteOrFoster, savePet, returnPet } = useAuth();
  const [loading, setLoading] = useState(false);
  const [petData, setPetData] = useState({});
  let mounted = true;
  const petId = props.match.params.id;
  const getPetData = async () => {
    if (mounted) {
      const obj = await getPet(petId);
      setPetData(obj);
    }
  };

  useEffect(() => {
    getPetData();

    return () => {
      mounted = false;
    };
  }, []);

  const adopteFoster = async (e) => {
    setLoading(true);
    const type = e.target.name;
    const result = await adopteOrFoster(petData, type);
    if (result) {
      notify(`The pet was ${type} successfully`);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const save = async (e) => {
    setLoading(true);
    const result = await savePet(petData);
    if (result) {
      notify(`The pet was saved successfully`);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const restorePet = async () => {
    const result = await returnPet(petId);
    if (result) notify("The pet was successfully returned to the shelter");
    else notify("Oops something was Wrong ");
  };

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      {currentUser ? <NavLogged /> : <Navhome />}
      <section className="detalis">
        <ToastContainer className="notification" />
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

            {currentUser && (
              <div className="pet-btns">
                {!(petData.status === "Adopted") && (
                  <div>
                    <button
                      name="Adopted"
                      type="button"
                      className="pet-btn Adopet"
                      onClick={adopteFoster}
                    >
                      Adopet
                    </button>
                    <button
                      name="save"
                      type="button"
                      className="pet-btn save"
                      onClick={save}
                    >
                      Save
                    </button>
                  </div>
                )}
                {!(petData.status === "Fostered") &&
                  petData.status !== "Adopted" && (
                    <button
                      name="Fostered"
                      type="button"
                      className="pet-btn return"
                      onClick={adopteFoster}
                    >
                      Foster
                    </button>
                  )}
                {petData.status === "Fostered" ||
                  (petData.status === "Adopted" && (
                    <button
                      name="Fostered"
                      type="button"
                      className="pet-btn return"
                      onClick={restorePet}
                    >
                      return Pet
                    </button>
                  ))}
                {petData.status === "Fostered" && (
                  <button
                    name="Fostered"
                    type="button"
                    className="pet-btn return"
                    onClick={restorePet}
                  >
                    return Pet
                  </button>
                )}
                {/* {petData.status === "Available" && (
                  <button
                    name="save"
                    type="button"
                    className="pet-btn save"
                    onClick={save}
                  >
                    Save
                  </button>
                )} */}
              </div>
            )}
          </div>
        </div>
        <GridLoader
          css={override}
          size={40}
          color={"#123abc"}
          loading={loading}
        />
      </section>
    </>
  );
};

export default Petpage;
