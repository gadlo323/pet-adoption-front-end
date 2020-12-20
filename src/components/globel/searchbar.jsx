import React, { useState } from "react";
import "./searchbar.css";
const Searchbar = () => {
  const [toggle, setToggle] = useState({
    state: false,
    text: "Advance",
  });
  const [status, setStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  // const [advanceSearch, setAdvanceSearch] = useState({
  //   status: "",
  //   height: "",
  //   weight: "",
  //   type: "",
  //   name: "",
  // });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const onToogle = () => {
    toggle.state
      ? setToggle({ state: false, text: "Advance" })
      : setToggle({ state: true, text: "Basic" });
  };
  const printform = (e) => {
    e.preventDefault();
    const dataSearch = {
      status: status,
      height: height,
      weight: weight,
      type: type,
      name: name,
    };
    // console.log(dataSearch);
  };
  return (
    <div className="serach-bar">
      <div className="forms">
        {toggle.state && (
          <div className="advance-search">
            <form className="form-search-advance" onSubmit={printform}>
              <select
                name="status"
                className="advance-input"
                id="status-pet"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="foster">foster</option>
                <option value="adopted">adopted</option>
              </select>
              <div className="input-group">
                <input
                  name="type"
                  type="text"
                  className="advance-input"
                  value={type}
                  placeholder="Type"
                  onChange={(e) => setType(e.target.value)}
                />
                <input
                  name="name"
                  type="text"
                  className="advance-input"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  name="height"
                  type="text"
                  className="advance-input"
                  value={height}
                  placeholder="Height"
                  onChange={(e) => setHeight(e.target.value)}
                />
                <input
                  name="weight"
                  type="text"
                  className="advance-input"
                  value={weight}
                  placeholder="Weight"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <button className="advance-search-btn" type="submit">
                Advance Search
              </button>
            </form>
          </div>
        )}
        {!toggle.state && (
          <form className="form-search" onSubmit={onSubmit}>
            <input
              type="search"
              className="search-input"
              value={search}
              placeholder="Type of animal..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        )}
      </div>

      <button type="button" className="toggle" onClick={onToogle}>
        {toggle.text}
      </button>
    </div>
  );
};

export default Searchbar;
