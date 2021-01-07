import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import "./searchbar.css";

const override = css`
  position: fixed;
  top: 45%;
  left: 45%;
  border-color: red;
  z-index: 10;
`;
const advanceSearch = {
  status: "",
  height: "",
  weight: "",
  type: "",
  name: "",
};

const Searchbar = ({ setList, perPage, setTotalRows }) => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [toggle, setToggle] = useState({
    state: false,
    text: "Advance",
    icon: "/searchadvance.png",
  });
  const [advance, setAdvance] = useState(advanceSearch);
  const [search, setSearch] = useState("");
  const { currentUser, serach } = useAuth();

  const handleSearch = async (data, e) => {
    e.preventDefault();
    onSendForm(true);
    const searchType = e.nativeEvent.submitter.name;
    if (searchType === "advance") {
      removeEmpty(advance);
      var res = await serach(1, perPage, advance);
    } else {
      if (!search) var query = {};
      else var query = { type: search };
      var res = await serach(1, perPage, query);
    }
    if (res.error === 1) {
      notifyError(res.dataSevere);
    } else {
      const { result, data } = res.dataSevere;
      setList(result);
      setTotalRows(data.length);
      if (data.length < 1) notifyError("Oops information not found 🙅");
    }
    // localStorage.setItem("search", JSON.stringify(result));

    setTimeout(() => {
      onSendForm(false);
    }, 1000);
  };

  const onSendForm = (bool) => {
    setLoading(bool);
    setDisabled(bool);
  };

  const handleOnchange = (e) => {
    setAdvance({
      ...advance,
      [e.target.name]: e.target.value,
    });
  };

  const removeEmpty = (obj) => {
    Object.keys(obj).forEach(
      (key) => (obj[key] == null || obj[key] == "") && delete obj[key]
    );
  };

  const onToogle = () => {
    toggle.state
      ? setToggle({ state: false, text: "Advance", icon: "/searchadvance.png" })
      : setToggle({ state: true, text: "Basic", icon: "/find.png" });
  };

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
    <div className="serach-bar">
      <ToastContainer className="notification" />
      <div className="forms">
        {toggle.state && (
          <div className="advance-search">
            <form
              className="form-search-advance"
              onSubmit={handleSubmit(handleSearch)}
            >
              <select
                name="status"
                className="advance-input"
                id="status-pet"
                value={advance.status || "Available"}
                onChange={handleOnchange}
              >
                <option value="Available">Available</option>
                <option value="Fostered">Fostered</option>
                <option value="Adopted">Adopted</option>
              </select>
              <div className="input-group">
                <input
                  name="type"
                  type="text"
                  className="advance-input"
                  value={advance.type || ""}
                  placeholder="Type"
                  minLength="2"
                  maxLength="12"
                  onChange={handleOnchange}
                  ref={register({
                    pattern: /^[A-Za-z\s]+$/i,
                  })}
                />

                <input
                  name="name"
                  type="text"
                  className="advance-input"
                  value={advance.name || ""}
                  placeholder="Name"
                  minLength="2"
                  maxLength="12"
                  onChange={handleOnchange}
                  ref={register({
                    pattern: /^[A-Za-z\s]+$/i,
                  })}
                />
              </div>
              <div className="input-group err">
                <div className="error-box">
                  {errors.type && errors.type.type === "pattern" && (
                    <p className="error-field">English letters only</p>
                  )}
                </div>
                <div className="error-box">
                  {errors.name && errors.name.type === "pattern" && (
                    <p className="error-field">English letters only</p>
                  )}
                </div>
              </div>
              <div className="input-group numbers">
                <input
                  name="height"
                  type="number"
                  min={10}
                  max={250}
                  className="advance-input"
                  value={advance.height || ""}
                  placeholder="Height"
                  onChange={handleOnchange}
                />

                <input
                  name="weight"
                  type="number"
                  min={1}
                  max={200}
                  value={advance.weight || ""}
                  className="advance-input"
                  placeholder="Weight"
                  onChange={handleOnchange}
                />
              </div>
              <button
                name="advance"
                className="advance-search-btn"
                type="submit"
                disabled={disabled}
              >
                <img
                  className="serach-icon"
                  src="/searchadvance.png"
                  alt="search"
                />
              </button>
            </form>
          </div>
        )}
        {!toggle.state && (
          <>
            <form className="form-search" onSubmit={handleSubmit(handleSearch)}>
              <input
                name="search"
                type="search"
                className="search-input"
                value={search}
                placeholder="Type of animal..."
                minLength="2"
                maxLength="12"
                onChange={(e) => setSearch(e.target.value)}
                ref={register({
                  pattern: /^[A-Za-z\s]+$/i,
                })}
              />
              <button
                name="simpleSearch"
                type="submit"
                className="search-btn"
                disabled={disabled}
              >
                <img className="serach-icon" src="/find.png" alt="search" />
              </button>
            </form>
            <div className="error-box">
              {errors.search && errors.search.type === "pattern" && (
                <p className="error-field">English letters only</p>
              )}
            </div>
          </>
        )}
      </div>

      <button type="button" className="toggle" onClick={onToogle}>
        {toggle.text}
        <img className="serach-icon" src={toggle.icon} alt="search" />
      </button>

      <GridLoader
        css={override}
        size={50}
        color={"#162B32"}
        loading={loading}
      />
    </div>
  );
};

export default Searchbar;
