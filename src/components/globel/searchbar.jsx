import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [toggle, setToggle] = useState({
    state: false,
    text: "Advance",
  });
  const [advance, setAdvance] = useState(advanceSearch);
  const [search, setSearch] = useState("");
  const { currentUser, serach } = useAuth();

  const handleSearch = async (e) => {
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
    setList(res.result);
    setTotalRows(res.data.length);
    // localStorage.setItem("search", JSON.stringify(result));
    if (res.data.length < 1) notifyError("Oops information not found 🙅");

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
      ? setToggle({ state: false, text: "Advance" })
      : setToggle({ state: true, text: "Basic" });
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
            <form className="form-search-advance" onSubmit={handleSearch}>
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
                  onChange={handleOnchange}
                />
                <input
                  name="name"
                  type="text"
                  className="advance-input"
                  value={advance.name || ""}
                  placeholder="Name"
                  onChange={handleOnchange}
                />
              </div>
              <div className="input-group">
                <input
                  name="height"
                  type="number"
                  className="advance-input"
                  value={advance.height || ""}
                  placeholder="Height"
                  onChange={handleOnchange}
                />
                <input
                  name="weight"
                  type="number"
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
                Advance Search
              </button>
            </form>
          </div>
        )}
        {!toggle.state && (
          <form className="form-search" onSubmit={handleSearch}>
            <input
              type="search"
              className="search-input"
              value={search}
              placeholder="Type of animal..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              name="simpleSearch"
              type="submit"
              className="search-btn"
              disabled={disabled}
            >
              Search
            </button>
          </form>
        )}
      </div>

      <button type="button" className="toggle" onClick={onToogle}>
        {toggle.text}
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
