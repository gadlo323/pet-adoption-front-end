import React, { useState } from "react";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./searchbar.css";

const advanceSearch = {
  status: "",
  height: "",
  weight: "",
  type: "",
  name: "",
};

const Searchbar = ({ setList }) => {
  const [toggle, setToggle] = useState({
    state: false,
    text: "Advance",
  });
  const [advance, setAdvance] = useState(advanceSearch);
  const [search, setSearch] = useState("");
  const { currentUser, searchTypePet } = useAuth();

  const advSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };
  const simpleSearch = async (e) => {
    e.preventDefault();
    const result = await searchTypePet(search);
    setList(result);
    localStorage.setItem("search", JSON.stringify(result));
  };

  const handleOnchange = (e) => {
    setAdvance({
      [e.target.name]: e.target.value,
    });
  };

  const onToogle = () => {
    toggle.state
      ? setToggle({ state: false, text: "Advance" })
      : setToggle({ state: true, text: "Basic" });
  };
  return (
    <div className="serach-bar">
      <div className="forms">
        {toggle.state && (
          <div className="advance-search">
            <form className="form-search-advance" onSubmit={advSearch}>
              <select
                name="status"
                className="advance-input"
                id="status-pet"
                value={advance.status}
                onChange={handleOnchange}
              >
                <option value="foster">foster</option>
                <option value="adopted">adopted</option>
              </select>
              <div className="input-group">
                <input
                  name="type"
                  type="text"
                  className="advance-input"
                  value={advance.type}
                  placeholder="Type"
                  onChange={handleOnchange}
                />
                <input
                  name="name"
                  type="text"
                  className="advance-input"
                  value={advance.name}
                  placeholder="Name"
                  onChange={handleOnchange}
                />
              </div>
              <div className="input-group">
                <input
                  name="height"
                  type="number"
                  className="advance-input"
                  value={advance.height}
                  placeholder="Height"
                  onChange={handleOnchange}
                />
                <input
                  name="weight"
                  type="number"
                  className="advance-input"
                  value={advance.weight}
                  placeholder="Weight"
                  onChange={handleOnchange}
                />
              </div>
              <button className="advance-search-btn" type="submit">
                Advance Search
              </button>
            </form>
          </div>
        )}
        {!toggle.state && (
          <form className="form-search" onSubmit={simpleSearch}>
            <input
              type="search"
              className="search-input"
              value={search}
              placeholder="Type of animal..."
              onChange={(e) => setSearch(e.target.value)}
              required
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
