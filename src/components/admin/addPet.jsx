import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import NavLogged from "../loggedIn/navLogged";
import "./addPet.css";

const override = css`
  position: fixed;
  top: 40%;
  left: 20%;
  border-color: red;
`;
const formFields = {
  type: "",
  name: "",
  status: "",
  hypoallergenic: false,
  height: 0,
  weight: 0,
  breed: "",
  color: "",
  dietary: "",
  bio: "",
};
const types = ["image/png", "image/jpeg"];
const AddPet = () => {
  const { addPet } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formInfo, setFormInfo] = useState(formFields);
  const [file, setFile] = useState();
  const [petImag, setPetImag] = useState();
  const { register, handleSubmit, errors } = useForm();

  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    let formData = new FormData();
    formData.append("data", JSON.stringify(formInfo));
    formData.append("petImage", file);
    const result = await addPet(formData);
    if (result === true) notify("new pet add successfully 👌");
    else notifyError(result + "👎");
    setTimeout(() => {
      setLoading(false);
      setDisabled(false);
    }, 2000);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setFile(file);
      let reader = new FileReader();
      reader.onload = (e) => {
        setPetImag(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      notifyError("Please select an image file (png, jpeg)!");
    }
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
  const notifyError = (error) =>
    toast.error(error, {
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
      <NavLogged />
      <section className="add-pet">
        <ToastContainer className="notification" />
        <div className="add-pet-img">
          <img src="../admin1.jpg" alt="admin1-img" />
        </div>
        <div className="add-pet-form">
          <form
            method="POST"
            action="/addpet"
            encType="multipart/form-data"
            className="add-pet-form"
            onSubmit={(e) => handleSubmit(onSubmit(e))}
          >
            <div className="input-group">
              <input
                name="type"
                type="text"
                className="add-pet-input"
                value={formInfo.type || ""}
                placeholder="Type..."
                onChange={handleChange}
                minLength="2"
                maxLength="12"
                required
              />
              <input
                name="name"
                type="text"
                className="add-pet-input"
                value={formInfo.name || ""}
                placeholder="Name..."
                onChange={handleChange}
                minLength="2"
                maxLength="12"
                required
              />
            </div>
            <div className="input-group">
              <div className="select-input">
                <label htmlFor="status_id">Status</label>
                <select
                  name="status"
                  value={formInfo.status || ""}
                  className="add-pet-input"
                  id="status_id"
                  onChange={handleChange}
                  required
                >
                  <option value="Adopted">Adopted</option>
                  <option value="Fostered">Fostered</option>
                  <option value="Available">Available</option>
                </select>
              </div>
              <div className="select-input">
                <label htmlFor="Hypoallergenic_id">Hypoallergenic</label>
                <select
                  name="hypoallergenic"
                  value={formInfo.hypoallergenic || "No"}
                  className="add-pet-input"
                  id="Hypoallergenic_id"
                  required
                  onChange={handleChange}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <input
                name="height"
                type="number"
                value={formInfo.height || ""}
                className="add-pet-input"
                placeholder="Height...cm"
                onChange={handleChange}
                min="10"
                max="400"
                required
              />
              <input
                name="weight"
                type="number"
                value={formInfo.weight || ""}
                className="add-pet-input"
                placeholder="Weight..KG"
                min="0"
                max="400"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                name="color"
                type="text"
                value={formInfo.color || ""}
                className="add-pet-input"
                placeholder="color..."
                minLength="3"
                maxLength="12"
                onChange={handleChange}
                required
              />
              <input
                name="dietary"
                type="text"
                value={formInfo.dietary || ""}
                className="add-pet-input"
                placeholder="dietary restrictions"
                minLength="2"
                maxLength="200"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                name="breed"
                type="text"
                value={formInfo.breed || ""}
                className="add-pet-input"
                placeholder="breed of animal..."
                minLength="2"
                maxLength="20"
                onChange={handleChange}
                required
              />
              <input
                name="bio"
                type="text"
                value={formInfo.bio || ""}
                className="add-pet-input"
                placeholder="Bio...."
                minLength="2"
                maxLength="140"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group file-show">
              <input type="file" name="file_pet" onChange={handleFileUpload} />
              <img src={petImag} alt="" />
            </div>

            <div className="btn-groupe">
              <button type="submit" className="btnpet add-pet-btn">
                Add pet
              </button>
              <button
                type="reset"
                className="btnpet add-pet-reset"
                disabled={disabled}
              >
                Reset
              </button>
            </div>
          </form>
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

export default AddPet;
