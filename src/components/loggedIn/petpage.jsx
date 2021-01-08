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
  const [disabled, setDisabled] = useState(false);
  const [petData, setPetData] = useState({});
  const petId = props.match.params.id;
  const owned = props.match.params.owned;

  const getPetData = async () => {
    const obj = await getPet(petId);
    if (obj) {
      setPetData(obj);
    }
  };

  useEffect(() => {
    getPetData();
  }, []);

  const adopteFoster = async (e) => {
    setLoading(true);
    setDisabled(true);
    const type = e.target.name;
    const result = await adopteOrFoster(petData, type);
    if (result) {
      notify(`The pet was ${type} successfully`);
      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 2500);
      reloadPage();
    }
  };

  const save = async (e) => {
    setLoading(true);
    setDisabled(true);
    const result = await savePet(petData);
    if (result) {
      notify(`The pet was saved successfully`);
      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 2500);
      reloadPage();
    }
  };

  const restorePet = async () => {
    setLoading(true);
    setDisabled(true);
    const result = await returnPet(petId);
    if (result) {
      notify("The pet was successfully returned to the shelter");
      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 2500);
      reloadPage();
    } else notify("Oops something was Wrong ");
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
                <span>{petData.weight} k.g</span>
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
                {!(petData.status === "adopted") && (
                  <div>
                    <button
                      name="adopted"
                      type="button"
                      className="pet-btn Adopet"
                      onClick={adopteFoster}
                      disabled={disabled}
                    >
                      Adopet
                      <img
                        className="log-icon"
                        src="/house-adopte.png"
                        alt="login-icon"
                      />
                    </button>
                    {!owned && (
                      <button
                        name="save"
                        type="button"
                        className="pet-btn save"
                        onClick={save}
                        disabled={disabled}
                      >
                        Save
                        <img
                          className="log-icon"
                          src="/protect.png"
                          alt="login-icon"
                        />
                      </button>
                    )}
                  </div>
                )}
                {!(petData.status === "fostered") &&
                  petData.status !== "adopted" && (
                    <button
                      name="fostered"
                      type="button"
                      className="pet-btn foster"
                      onClick={adopteFoster}
                      disabled={disabled}
                    >
                      Foster
                      <img
                        className="log-icon"
                        src="/foster-icon.png"
                        alt="foster-icon"
                      />
                    </button>
                  )}
                {petData.status === "fostered" ||
                  (petData.status === "adopted" && owned && (
                    <button
                      name="fostered"
                      type="button"
                      className="pet-btn return"
                      onClick={restorePet}
                      disabled={disabled}
                    >
                      Return Pet
                      <img
                        className="log-icon"
                        src="/easy-return.png"
                        alt="foster-icon"
                      />
                    </button>
                  ))}
                {petData.status === "fostered" && owned && (
                  <button
                    name="fostered"
                    type="button"
                    className="pet-btn return"
                    onClick={restorePet}
                    disabled={disabled}
                  >
                    Return Pet
                    <img
                      className="log-icon"
                      src="/easy-return.png"
                      alt="foster-icon"
                    />
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
